// Shows each channel's queue and recent posts.  Usage: node scripts/status.mjs
import {channels, isDone, platformsFor, postedLogPath, queueItems, readJSON} from './lib.mjs';

for (const ch of channels()) {
  const posted = readJSON(postedLogPath(ch.name), []);
  const q = queueItems(ch.name).filter((i) => !isDone(ch, posted, i.slug));
  console.log(`\n${ch.name} (${ch.enabled ? 'enabled' : 'paused'}; ${platformsFor(ch).join(' + ') || 'no platforms'})`);
  console.log(`  next up: ${q.map((i) => i.slug).join(', ') || '(queue empty)'}`);
  for (const p of posted.slice(-6)) console.log(`  ${p.postedAt.slice(0, 10)}  ${(p.platform || 'instagram').padEnd(9)} ${p.slug}  ${p.permalink || p.mediaId}`);
}
