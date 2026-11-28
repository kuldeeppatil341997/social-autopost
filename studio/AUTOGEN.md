# Keeping the Kaalchitra queue full (instructions for the daily scheduled task)

Goal: there should always be at least **3** Kaalchitra reels waiting to post (one posts daily at 6 PM IST).

## 1. Check the stock
From the repo root:
- Ready to post: folders in `queue/kaalchitra/`
- Being built: folders in `studio/videos/` that have `post.json` but no `BUILT` file
- stock = ready + being built

If stock ≥ 3, stop. Nothing to do.

## 2. Plan new reels
Make `3 - stock + 2` new reels (so it refills to about 5).
- Read `studio/RULES.md` and follow it exactly (topic mix, hook, structure, text layers, cover, caption, title).
- Avoid topics already made: see `studio/TOPICS.md` and the folder names in `studio/videos/`.
- Check the Hindu calendar for festivals in the next 1–2 weeks (web search) and use one if it fits.
- Reel number = highest number used in `studio/TOPICS.md` + 1.

## 3. Write each reel (copy the pattern of `sahadev`, `jarasandh`, `urmila` in `src/videos/batch5.tsx`)
For a reel id like `ekadashi`:
1. `studio/videos/<id>/script.json`: list of `{"hi": "<Hindi line>", "cap": "<romanized caption>"}`. Caption markup: `^WORD` = yellow, `*phrase*` = gold italic.
   Last line is always the CTA: `{"hi": "ऐसी ही अनसुनी कथाओं के लिए, फॉलो करें कालचित्र।", "cap": "aisi hi ^ANSUNI kathaon ke liye, follow karein *Kaalchitra.*"}`
2. `studio/videos/<id>/timings.json`: placeholder, one `{"s": i*4.5+0.05, "e": i*4.5+4.2}` per line (the build replaces it with real timings).
3. A new file `studio/src/videos/auto-<YYYYMMDD>.tsx` with the scenes and the `Cfg` (hook, pushIn, scenes one per line, Devanagari titles, fx, end card, last scene = first scene). Reuse characters from `src/people.tsx` (add new looks there if needed) and helpers from `src/kit.tsx`, `src/videos/batch4.tsx`, `src/videos/batch5.tsx`.
4. Register it in `studio/src/videos/all.tsx` and add a Devanagari cover in `COVERS` in `studio/src/Root.tsx` (use the close-up scene, bright background).
5. `studio/videos/<id>/post.json`:
   `{"name": "<CompId>", "comp": "<CompId>", "num": <n>, "music": "tense|calm|epic", "caption": "<caption per RULES>", "title": "<YouTube title, ≤ 90 chars>"}`
   Write post.json LAST: pushing it starts the build.
6. Append `<n>. <Topic> (<id>)` to `studio/TOPICS.md`.

## 4. Check before pushing
In `studio/`: `npm ci`, then `npx tsc --noEmit -p .` must pass.
Create a silent placeholder voice so stills render: `mkdir -p public && ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 70 public/<id>.wav`
Render 4–5 stills per reel (`npx remotion still src/Root.tsx <CompId> /tmp/x.png --frame=N --scale=0.3`) and the cover (`Cover-<CompId>`), look at them, and fix overlaps or empty frames.
Do not commit `public/`, `build/` or `node_modules/`.

## 5. Push
Commit and push to main. The "Build reels" GitHub workflow then makes the voice, renders, adds music, watermark and cover, and puts each reel in `queue/kaalchitra/` (about 20–25 min per reel). Report the topics made.
