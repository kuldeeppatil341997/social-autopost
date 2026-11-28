// YouTube Shorts via the YouTube Data API v3 (OAuth refresh token + resumable upload).
import fs from 'node:fs';
import {log, secret} from '../lib.mjs';

const OAUTH = process.env.GOOGLE_OAUTH_BASE || 'https://oauth2.googleapis.com';
const UPLOAD = process.env.YT_UPLOAD_BASE || 'https://www.googleapis.com/upload/youtube/v3';
const API = process.env.YT_API_BASE || 'https://www.googleapis.com/youtube/v3';

export const name = 'youtube';
export const credentials = (ch) => ({
  clientId: secret(ch.youtube.clientIdSecret),
  clientSecret: secret(ch.youtube.clientSecretSecret),
  refreshToken: secret(ch.youtube.refreshTokenSecret),
  privacy: ch.youtube.privacy || 'public',
  categoryId: String(ch.youtube.categoryId || 24),
});
export const missing = (c) => !c.clientId || !c.clientSecret || !c.refreshToken;

async function accessToken({clientId, clientSecret, refreshToken}) {
  const res = await fetch(`${OAUTH}/token`, {
    method: 'POST',
    body: new URLSearchParams({client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token'}),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || !j.access_token) throw new Error(`token refresh failed (${res.status}): ${j.error_description || j.error || JSON.stringify(j)}`);
  return j.access_token;
}

// Title: post.json "title", else the caption's first line. Shorts get #shorts appended; max 100 chars.
export const buildMeta = (item) => {
  const caption = item.meta.caption || '';
  const first = (item.meta.title || caption.split('\n').find((l) => l.trim()) || item.slug).trim();
  const title = (first.length > 90 ? first.slice(0, 89) + '…' : first) + ' #shorts';
  const tags = [...new Set((caption.match(/#[\p{L}\p{N}_]+/gu) || []).map((t) => t.slice(1)))].slice(0, 15);
  return {title: title.slice(0, 100), description: item.meta.youtubeDescription || caption, tags};
};

export async function post(item, cred) {
  const token = await accessToken(cred);
  const meta = buildMeta(item);
  const bytes = fs.readFileSync(item.video);
  const body = {
    snippet: {title: meta.title, description: meta.description, tags: meta.tags, categoryId: cred.categoryId},
    status: {privacyStatus: cred.privacy, selfDeclaredMadeForKids: false},
  };
  const init = await fetch(`${UPLOAD}/videos?uploadType=resumable&part=snippet,status`, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': String(bytes.length)},
    body: JSON.stringify(body),
  });
  const location = init.headers.get('location');
  if (!init.ok || !location) throw new Error(`upload init failed (${init.status}): ${await init.text()}`);
  const up = await fetch(location, {method: 'PUT', headers: {'Content-Type': 'video/mp4', 'Content-Length': String(bytes.length)}, body: bytes});
  const j = await up.json().catch(() => ({}));
  if (!up.ok || !j.id) throw new Error(`upload failed (${up.status}): ${JSON.stringify(j.error || j)}`);
  log(`  [youtube] uploaded ${(bytes.length / 1e6).toFixed(1)} MB as ${j.status?.privacyStatus || cred.privacy}`);
  // Custom thumbnails need a phone-verified channel; try, but don't fail the post if it's refused.
  if (item.cover) {
    const img = fs.readFileSync(item.cover);
    const t = await fetch(`${UPLOAD}/thumbnails/set?videoId=${j.id}`, {method: 'POST', headers: {Authorization: `Bearer ${token}`, 'Content-Type': item.cover.endsWith('.png') ? 'image/png' : 'image/jpeg'}, body: img});
    if (!t.ok) log(`  [youtube] custom thumbnail skipped (${t.status})`);
  }
  return {id: j.id, url: `https://youtube.com/shorts/${j.id}`};
}
void API;
