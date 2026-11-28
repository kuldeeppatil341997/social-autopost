"""Aman voice (Indic Parler-TTS) for each script line. Usage: python tts/gen.py <reel-id> [...]  (run from studio/)"""
import json, os, sys, torch, soundfile as sf
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer
torch.set_num_threads(int(os.environ.get("TTS_THREADS", os.cpu_count() or 2)))
mid = "ai4bharat/indic-parler-tts"
model = ParlerTTSForConditionalGeneration.from_pretrained(mid).eval()
tok = AutoTokenizer.from_pretrained(mid)
dtok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
desc = ("Aman speaks with a deep, confident and engaging voice at a slightly fast pace, with expressive intonation, "
        "in a close-sounding studio environment with very clear audio and no background noise.")
d = dtok(desc, return_tensors="pt")
for v in sys.argv[1:]:
    lines = json.load(open(f"videos/{v}/script.json"))
    os.makedirs(f"build/tts/{v}", exist_ok=True)
    for i, l in enumerate(lines):
        out = f"build/tts/{v}/l{i:02d}.wav"
        if os.path.exists(out):
            continue
        torch.manual_seed(7)
        p = tok(l["hi"], return_tensors="pt")
        with torch.no_grad():
            a = model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                               prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
        sf.write(out, a.cpu().numpy().squeeze(), model.config.sampling_rate)
        print("voice", v, i, flush=True)
