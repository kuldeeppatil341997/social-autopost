// Deletes queue folders whose reel has been posted on every platform the channel uses.
// Usage: node scripts/cleanup.mjs  -> prints REMOVED=<count>
import fs from 'node:fs';
import {channels, isDone, log, postedLogPath, queueItems, readJSON} from './lib.mjs';

let removed = 0;
for (const ch of channels()) {
  const posted = readJSON(postedLogPath(ch.name), []);
  for (const it of queueItems(ch.name)) {
    if (isDone(ch, posted, it.slug)) {
      fs.rmSync(it.dir, {recursive: true, force: true});
      log(`[${ch.name}] removed posted ${it.slug}`);
      removed++;
    }
  }
}
console.log(`REMOVED=${removed}`);
