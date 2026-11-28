// Posts the next queued reel for every enabled channel, to each of its platforms (Instagram, YouTube).
// Usage: node scripts/post.mjs [--channel kaalchitra] [--dry-run]
// Secrets come from env vars or SECRETS_JSON (GitHub Actions). REPO_RAW_BASE gives a public URL for the Instagram cover.
import path from 'node:path';
import {channels, isDone, log, platformsFor, postedLogPath, postedOn, queueItems, readJSON, ROOT, writeJSON} from './lib.mjs';
import * as instagram from './platforms/instagram.mjs';
import * as youtube from './platforms/youtube.mjs';

const PLATFORMS = {instagram, youtube};
const args = process.argv.slice(2);
const only = args.includes('--channel') ? args[args.indexOf('--channel') + 1] : null;
const dryRun = args.includes('--dry-run') || process.env.DRY_RUN === 'true';
const rawBase = process.env.REPO_RAW_BASE || '';
const publicUrl = (abs) => `${rawBase}/${path.relative(ROOT, abs).split(path.sep).map(encodeURIComponent).join('/')}`;

// Posting slot: 6 PM IST. GitHub's scheduler can start runs many hours late, so unless FORCE=true a run
// only posts inside the slot window, and only once per day per channel.
const SLOT_START = Number(process.env.SLOT_START_IST ?? 18); // hour, IST
const SLOT_HOURS = Number(process.env.SLOT_WINDOW_HOURS ?? 3);
const force = process.env.FORCE === 'true' || dryRun;
const ist = new Date(Date.now() + 5.5 * 36e5); // shifted so getUTC* reads IST
const istHour = ist.getUTCHours() + ist.getUTCMinutes() / 60;
const slotStartUtc = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), SLOT_START) - 5.5 * 36e5;
if (!force && (istHour < SLOT_START || istHour >= SLOT_START + SLOT_HOURS)) {
  log(`Outside the posting window (${SLOT_START}:00-${SLOT_START + SLOT_HOURS}:00 IST, now ${ist.toISOString().slice(11, 16)} IST). Nothing posted. Run with force to post anyway.`);
  process.exit(0);
}

let failures = 0;
for (const ch of channels()) {
  if (!ch.enabled || (only && ch.name !== only)) continue;
  const logPath = postedLogPath(ch.name);
  const posted = readJSON(logPath, []);
  // A reel already started in today's slot (any platform)? Then only finish its missing platforms.
  const today = new Set(posted.filter((p) => new Date(p.postedAt).getTime() >= slotStartUtc).map((p) => p.slug));
  const pending = queueItems(ch.name).filter((it) => it.video && !isDone(ch, posted, it.slug) && (force || !today.size || today.has(it.slug)));
  if (!force && today.size && !pending.length) { log(`[${ch.name}] already posted today, skipping`); continue; }
  const batch = pending.slice(0, ch.postsPerRun || 1);
  const platforms = platformsFor(ch);
  log(`[${ch.name}] ${pending.length} reel(s) in queue, platforms: ${platforms.join(', ')}`);

  for (const item of batch) {
    const already = postedOn(posted, item.slug);
    for (const pl of platforms) {
      if (already.has(pl)) continue; // e.g. Instagram worked yesterday but YouTube failed: only retry YouTube
      const P = PLATFORMS[pl];
      const cred = P.credentials(ch);
      log(`[${ch.name}] ${pl}: ${item.slug}`);
      if (dryRun) {
        const extra = pl === 'youtube' ? `title="${youtube.buildMeta(item).title}"` : `cover=${item.cover && rawBase ? publicUrl(item.cover) : 'frame'}`;
        log(`  DRY RUN ${pl}: ${path.basename(item.video)} ${extra}${P.missing(cred) ? ' (secrets NOT set)' : ''}`);
        continue;
      }
      if (P.missing(cred)) {
        log(`  ${pl}: secrets not set, skipping`);
        failures++;
        continue;
      }
      try {
        const res = await P.post(item, cred, {coverUrl: item.cover && rawBase ? publicUrl(item.cover) : null, videoUrl: rawBase ? publicUrl(item.video) : null});
        posted.push({slug: item.slug, platform: pl, mediaId: res.id, permalink: res.url, postedAt: new Date().toISOString()});
        writeJSON(logPath, posted);
        log(`  ${pl}: published ${res.url || res.id}`);
      } catch (e) {
        failures++;
        log(`  ${pl}: FAILED ${e.message}`);
      }
    }
  }
}
if (failures) process.exit(1);
