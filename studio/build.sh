#!/bin/bash
# Builds one reel end to end and adds it to the posting queue.
# Usage (from studio/): ./build.sh <reel-id>
# Needs videos/<id>/script.json and videos/<id>/post.json:
#   {"name": "Sahadev", "num": 19, "comp": "Sahadev", "music": "tense|calm|epic", "caption": "...", "title": "... (YouTube, under 92 chars)"}
set -euo pipefail
v=$1
M=videos/$v/post.json
name=$(node -p "require('./$M').name"); num=$(node -p "require('./$M').num"); comp=$(node -p "require('./$M').comp || require('./$M').name")
music=music/$(node -p "require('./$M').music || 'tense'").mp3
mkdir -p build/out
python tts/gen.py "$v"
python tts/assemble.py "$v"
npx remotion render src/Root.tsx "$comp" build/out/${v}_raw.mp4 --log=error
ffmpeg -v error -y -i build/out/${v}_raw.mp4 -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p -c:a aac -b:a 192k build/out/${v}_v.mp4
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 build/out/${v}_v.mp4); st=$(python -c "print($d-2.5)")
ffmpeg -v error -y -i build/out/${v}_v.mp4 -stream_loop -1 -i "$music" -filter_complex "[1:a]aresample=44100,atrim=0:$d,volume=0.22,afade=t=in:d=1.5,afade=t=out:st=$st:d=2.5[m];[0:a]asplit[v1][v2];[m][v1]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=400[md];[v2][md]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest build/out/${v}_m.mp4
ffmpeg -v error -y -i build/out/${v}_m.mp4 -loop 1 -i logo/wm_handle.png -filter_complex_script watermark_filter.txt -map 0:a -c:v libx264 -preset veryfast -crf 22 -pix_fmt yuv420p -c:a copy -movflags +faststart build/out/${v}.mp4
npx remotion still src/Root.tsx "Cover-$comp" build/out/${v}_cover.png --log=error
ffmpeg -v error -y -i build/out/${v}_cover.png -q:v 2 build/out/${v}_cover.jpg
node -e "const m=require('./$M');require('fs').writeFileSync('build/out/${v}_caption.txt', m.caption)"
slug=$(printf "%03d-%s" "$num" "$v")
(cd .. && node scripts/add-reel.mjs kaalchitra "$slug" "studio/build/out/${v}.mp4" "studio/build/out/${v}_cover.jpg" --caption-file "studio/build/out/${v}_caption.txt")
node -e "const f='../queue/kaalchitra/$slug/post.json',m=require('./$M'),p=JSON.parse(require('fs').readFileSync(f));if(m.title)p.title=m.title;require('fs').writeFileSync(f,JSON.stringify(p,null,2))"
rm -f build/out/${v}_raw.mp4 build/out/${v}_v.mp4 build/out/${v}_m.mp4 build/out/${v}_cover.png
echo built > videos/$v/BUILT
echo "BUILT $slug ($(printf '%.0f' $d) s)"
