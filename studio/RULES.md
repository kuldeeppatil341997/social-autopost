# Kaalchitra reel rules (copy of the project's workflow doc, 27 Nov 2026)

Channel: Kaalchitra (कालचित्र), @kaalchitra.verse on Instagram, plus YouTube Shorts.
Format: Hindi mythology story reels, flat-puppet animated style, deep "Aman" voice (Indic Parler-TTS).

## Topics
- Answer a "why" about something viewers already know or do, or a shocking twist about a famous figure.
  Hits: Ekadashi pe chawal kyon nahi? (4.5M), Krishna ko kisne mara? (3M), Saanp ki jeebh do hisson mein kyon? (2M),
  Shani dev ko ek bachche ne giraya, Agar Ram 1 din late hote…
- 2 of every 3 reels about famous figures (Ram, Krishna, Shiva, Hanuman, Shani, Ganesh) or a ritual/practice.
  Lesser-known heroes only occasionally, and viewers must care first.
- Tie into the calendar when possible (Diwali, Shivratri, Ekadashi, Shanivaar, Navratri, Janmashtami, Gita Jayanti); post 2–5 days before.
- Conflict hooks work ("Pita vs Putra").

## Hook (first 3 s)
- Line 1: a shocking claim with stakes, one breath, with an "aaj bhi" link if possible.
- Frame 1 shows the claim visually. No title card, no still image. Voice starts at 0.0 s.
- Line 1 also appears as big gold Devanagari text (cfg.hook).

## Structure (60–70 s, 12–15 sentences, none longer than ~3 s of speech)
1. Hook claim  2. Context in one line  3. Setup/tension (vow, curse, condition)
4. Twist or emotional peak (dialogue line, face close-up)  5. Payoff with the source named ("Bhavishya Puran kehta hai…")
6. Bring it to today ("Agli baar Shanivaar ko…", "Is Diwali ek diya…")
7. One-word comment question with two choices, then the CTA line:
   "ऐसी ही अनसुनी कथाओं के लिए, फॉलो करें कालचित्र।"
- Name a scripture source at least once; if the story is folk, say so honestly (लोककथा / लोक रामायण).

## Visuals
- A new shot every 3–5 s (one scene per line), push-in on every shot (cfg.pushIn = true).
- Symbolic shots, not only characters standing: paths splitting, shields with arrows, time wheels, empty thrones.
- Face close-up in a gold ring at the emotional beat (CloseUp in src/videos/batch5.tsx).
- Warm god-rays on divine moments; cool dark palette for curses and conflict.
- Last scene = the opening scene again, so the reel loops.

## On-screen text (Devanagari)
- cfg.hook: the hook line, big gold, top third, word by word.
- cfg.titles: short Devanagari title per line (pill + title).
- cfg.fx: label chips (places/objects), a quote box for dialogue, big numbers ("14 साल").
- End card: pill कालचित्र, title "ऐसी ही\nअनसुनी कथाएँ", sub "फॉलो करें @kaalchitra.verse".

## Cover
- Huge Devanagari question or claim (कृष्ण को किसने मारा?), bright saturated background, one big face (use the close-up scene). No English titles.

## Caption (post.json "caption")
- Question line, one-line teaser of the answer, then:
  "Comment mein 'Jai Shri ___' likhein aur apnon ke saath share karein 🙏"
- 4–6 hashtags (#mahabharat #shrikrishna #sanatandharma #hindumythology #kaalchitra …).

## YouTube title (post.json "title")
- Must stay under 100 characters INCLUDING the " #shorts" the poster adds, so keep it ≤ 90.

## Pre-publish checklist
- [ ] Famous figure or ritual, with a "why" or twist angle
- [ ] Line 1 is a shocking claim, shown as big Hindi text from frame 1
- [ ] A new shot every 3–5 s
- [ ] Labels, a quote box and a face close-up at the emotional beat
- [ ] Scripture source named
- [ ] Link to today (festival, weekday or ritual)
- [ ] Follow CTA with the channel name; last shot loops to the first
- [ ] Devanagari question cover
- [ ] Caption with a "Jai Shri ___" comment CTA plus a share ask
