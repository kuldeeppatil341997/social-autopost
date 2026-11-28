"""Trims, speeds up (1.07x) and joins the line clips into public/<id>.wav and writes videos/<id>/timings.json."""
import json, os, subprocess, sys
v = sys.argv[1]
n = len(json.load(open(f"videos/{v}/script.json")))
t = float(os.environ.get("START", "0.05")); GAP = float(os.environ.get("GAP", "0.3"))
T, parts = [], []
for i in range(n):
    o = f"build/tts/{v}/p{i:02d}.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"build/tts/{v}/l{i:02d}.wav", "-af",
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo=1.07,aresample=44100",
                    "-ac", "1", o], check=True)
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", o]))
    T.append({"s": round(t, 3), "e": round(t + d, 3)}); parts.append((o, t)); t += d + GAP
ins = sum([["-i", o] for o, _ in parts], [])
flt = "".join(f"[{k}]adelay={int(s*1000)}|{int(s*1000)}[d{k}];" for k, (_, s) in enumerate(parts)) + \
      "".join(f"[d{k}]" for k in range(len(parts))) + \
      f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={t+3.5:.2f},loudnorm=I=-16:TP=-1.5[o]"
os.makedirs("public", exist_ok=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *ins, "-filter_complex", flt, "-map", "[o]", "-ar", "44100", "-ac", "1", f"public/{v}.wav"], check=True)
json.dump(T, open(f"videos/{v}/timings.json", "w"))
print(v, "voice", round(t, 1), "s")
