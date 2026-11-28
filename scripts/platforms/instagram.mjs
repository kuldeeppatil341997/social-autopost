// Instagram Reels via the official Graph API (resumable upload, so no public video URL is needed).
import fs from 'node:fs';
import {graph, log, RUPLOAD, GRAPH_VERSION, secret, sleep} from '../lib.mjs';

export const name = 'instagram';
export const credentials = (ch) => ({userId: secret(ch.instagram.userIdSecret), token: secret(ch.instagram.tokenSecret)});
export const missing = (c) => !c.userId || !c.token;

export async function post(item, {userId, token}, {coverUrl, videoUrl}) {
  const caption = item.meta.caption || '';
  const base = {media_type: 'REELS', upload_type: 'resumable', caption, share_to_feed: 'true'};
  const frame = {...base, thumb_offset: String(item.meta.thumbOffsetMs ?? 1000)};
  const variants = coverUrl ? [{...base, cover_url: coverUrl}, frame] : [frame];
  // Last resort when Meta's upload server rejects the bytes: let Instagram fetch the video from the public repo.
  if (videoUrl) variants.push({media_type: 'REELS', video_url: videoUrl, caption, share_to_feed: 'true', ...(coverUrl ? {cover_url: coverUrl} : {thumb_offset: '1000'})});
  let lastErr;
  for (const params of variants) {
    try {
      const c = await graph('POST', `${userId}/media`, params, token);
      log(`  [instagram] container ${c.id}${params.video_url ? ' (video from URL)' : params.cover_url ? ' (custom cover)' : ' (frame cover)'}`);
      if (!params.video_url) {
      const bytes = fs.readFileSync(item.video);
      const up = await fetch(`${RUPLOAD}/ig-api-upload/${GRAPH_VERSION}/${c.id}`, {
        method: 'POST',
        headers: {Authorization: `OAuth ${token}`, offset: '0', file_size: String(bytes.length)},
        body: bytes,
      });
      const upJson = await up.json().catch(() => ({}));
      if (!up.ok || upJson.success === false) throw new Error(`video upload failed (${up.status}): ${JSON.stringify(upJson)}`);
      }
      let ready = false;
      for (let i = 0; i < 60 && !ready; i++) {
        const s = await graph('GET', c.id, {fields: 'status_code,status'}, token);
        if (s.status_code === 'FINISHED') ready = true;
        else if (s.status_code === 'ERROR' || s.status_code === 'EXPIRED') throw new Error(`processing ${s.status_code}: ${s.status || ''}`);
        else await sleep(+process.env.POLL_MS || 10000);
      }
      if (!ready) throw new Error('processing timed out');
      const pub = await graph('POST', `${userId}/media_publish`, {creation_id: c.id}, token);
      const info = await graph('GET', pub.id, {fields: 'permalink'}, token).catch(() => ({}));
      return {id: pub.id, url: info.permalink || null};
    } catch (e) {
      lastErr = e;
      log(`  [instagram] attempt failed: ${e.message}`);
    }
  }
  throw lastErr;
}
