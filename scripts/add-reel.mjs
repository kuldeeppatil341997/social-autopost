// Adds a reel to a channel's queue.
// Usage: node scripts/add-reel.mjs <channel> <slug> <video.mp4> [cover.jpg] --caption "text"   (or --caption-file caption.txt)
// The slug decides posting order (folders are posted alphabetically), e.g. 014-sudama.
import fs from 'node:fs';
import path from 'node:path';
import {queueDir, writeJSON} from './lib.mjs';

const a = process.argv.slice(2);
const flag = (n) => (a.includes(n) ? a[a.indexOf(n) + 1] : null);
const [channel, slug, video, cover] = a.filter((x, i) => !x.startsWith('--') && !(i > 0 && a[i - 1].startsWith('--')));
if (!channel || !slug || !video) {
  console.error('Usage: node scripts/add-reel.mjs <channel> <slug> <video.mp4> [cover.jpg] --caption "..."');
  process.exit(1);
}
const caption = flag('--caption') ?? (flag('--caption-file') ? fs.readFileSync(flag('--caption-file'), 'utf8').trim() : '');
const dir = path.join(queueDir(channel), slug);
fs.mkdirSync(dir, {recursive: true});
fs.copyFileSync(video, path.join(dir, 'reel' + path.extname(video).toLowerCase()));
if (cover) fs.copyFileSync(cover, path.join(dir, 'cover' + path.extname(cover).toLowerCase()));
writeJSON(path.join(dir, 'post.json'), {caption});
console.log(`queued ${channel}/${slug}`);
