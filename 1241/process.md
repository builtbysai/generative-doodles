# №1241 — Uncontrollable Misinterpretation

Adán De La Garza study block ADG2, after his 2011 *Time Spent Pondering the
Absurdity of Being Censored While Talking About Being Censored* — the talk he
made by editing out ALL the words, in response to his piñata piece being pulled
for "uncontrollable misinterpretation." A speech about censorship that censors
itself live.

## What it is

A transcript scrolls bottom-to-top in a centered typewriter column on archive
paper (#E4DCC8, text #33302A). As it scrolls, black bars (#0C0C0C) slam down
over words — one flicker frame of pale paper, a 2px slam overshoot, then the
steady bar with a ±1px hash jitter. The speech loops; every pass deletes more.
A grey gasp waveform runs along the bottom edge: hashed room tone with a notch
for every deletion in the last five seconds, newest at the right, depth fading
with age. A quiet tally in the corner counts "words removed: N" over a thin
pencil-red (#B04A3A) underline. Nothing is ever restored.

Interaction: tap any surviving word to force-censor it (complicit, counted,
never restored). Double-tap reseeds the deletion schedule and restarts the run —
a different run deletes a different speech. The piece is watch-only otherwise;
the scroll never stops.

## The speech

Thirty short lines in the plain register of an artist talk, 266 tokens. Each
token is tagged in the data by class — `p` proper noun, `v` verb, `o` other —
shown here as (PN)/(V):

1. i want(V) to talk(V) about the piece they took(V) down
2. it was(V) a pinata, paper and candy and string
3. Denver(PN) had(V) asked(V) for something cheerful for the hall
4. Maria(PN) signed(V) the letter on a Friday(PN)
5. they said(V) the meaning could(V) not be(V) controlled(V)
6. they used(V) the word uncontrollable in the memo
7. a work leaves(V) the room and belongs(V) to strangers
8. i cannot(V) follow(V) it around explaining(V) myself
9. the children hit(V) it until the sweets fell(V) out
10. nobody was(V) hurt(V) , nobody was(V) even offended(V) in person
11. the complaint came(V) later , by telephone , in writing
12. i keep(V) the letter in a drawer with the photographs
13. sometimes i read(V) it aloud to the empty studio
14. the sentence i remember(V) is(V) the one about risk
15. risk is(V) the material i actually work(V) with
16. if you remove(V) the risk you remove(V) the work
17. they offered(V) me another wall in another building
18. a smaller wall , near the offices , near the guards
19. i said(V) thank you and i meant(V) only half of it
20. this talk is(V) the piece now , i suppose(V)
21. you are(V) hearing(V) the part they could(V) not hang(V)
22. every room decides(V) what it can(V) hold(V)
23. the Flinching(PN) Eye(PN) printed(V) the program that night
24. the gallery held(V) the ladder and the broom
25. the candy is(V) still in a bag in my kitchen
26. i drove(V) back to Arizona(PN) with the ladder in the truck
27. i am(V) still deciding(V) what it meant(V) myself
28. perhaps a pinata is(V) only ever a promise
29. it breaks(V) , and everyone decides(V) what fell(V) out
30. thank you for listening(V) to the missing parts

Six proper nouns (Denver, Maria, Friday, Flinching, Eye, Arizona), 56 verbs,
204 others (including 19 free-standing comma tokens, which the schedule
swallows like any other word).

## Deletion schedule

All state is a function of run time and the seed salt (mulberry-style integer
hashes only; no Math.random). One pass = 68 s of scrolling. A word's deletion
time is set by its class, relative to the moment its line scrolls into the frame
in the pass that targets it:

- **Proper nouns — pass 1.** Delete at line entry + 0.25–1.85 s.
- **First casualty — pass 1.** One word per line, chosen by hash regardless of
  class, deletes at entry + 0.25–1.45 s. This is the guarantee that no line is
  ever fully intact once it has entered: surviving text is always fragments.
- **Verbs — pass 2** (entry + 0.3–2.5 s), with a 15% early scatter into pass 1.
- **Everything else — passes 3 and 4**, split by hash (roughly half at entry +
  0–4 s in pass 3, the rest in pass 4), with an 8% early scatter into pass 1.

By the end of the fourth pass all 266 tokens are barred; the column of bars
keeps scrolling until a double-tap reseeds. Deletion times are precomputed per
(pass, word) from the salt — the visible state at any time t is derived by
comparing t against that table plus the visitor's tap events.

## House adaptations

- **Silent.** The prompt's filtered-noise gasps (the audio dropping out where
  words were removed) ship as the visual gasp waveform only. No audio APIs
  exist in the file; the waveform's notches are the dropouts, made visible.
- **Distinction from №1236 (Battle CB5, "Wandering Through Secret Storms").**
  №1236 is a static triptych: a redacted *document* whose bars breathe and slip
  on a cycle, survivors fixed fragments chosen by reseed. This piece is a
  *scrolling speech* that deletes itself in reading order, class by class —
  proper nouns first, then verbs, then everything — with a running tally and a
  complicity tap that lets the visitor personally censor a word. Different
  mechanic, different temporality: there the redaction is a state; here it is
  an event that keeps happening to a text trying to be heard.

## Determinism

Synchronous first frame at fixed phase T0 = 26 s (late pass 1), rAF anchored
as T0 + elapsed and typeof-guarded. Canvas sized from the Visual Viewport API
with resize listeners on both visualViewport and window; canvas CSS size pinned
in draw(); phone detection via window.screen physical size (min dimension
< 700 px) with aspect fallback. No gradients, no ctx.filter, no shadowBlur, no
offscreen canvas, no ImageData, no microphone. Layout (font size, line height,
scroll speed) derives from the viewport, so the tally at T0 differs honestly by
size: 35 on desktop (1280×800), 34 on the square thumb, 50 on mobile
(390×844, smaller type scrolls faster in seconds-per-line).

## Frame-one read (T0 = 26 s, desktop)

Tally: **words removed: 35**. The visible window holds lines 1–18, every one
already broken. All three proper nouns in view are barred — [Denver], [Maria],
[Friday] — and the survivors are fragments:

- "i want to talk about the [—] they [—] down"
- "it was [—] pinata, paper [—] candy and string"
- "[—] had [—] for something cheerful for the hall"
- "[—] [—] the letter on a [—]"
- "they said the meaning [—] not be controlled"
- "they used the word uncontrollable in [—] memo"
- "a work [—] the room and belongs to [—]"
- "[—] cannot follow it around explaining myself"
- "the children hit it until [—] [—] fell out"
- "[—] [—] hurt , nobody was even offended in person"
- "the [—] [—] later , by telephone , in writing"
- "i keep the letter in a drawer with [—] photographs"
- "sometimes i read it [—] to the empty studio"
- "the sentence i remember [—] the one about [—]"
- "[—] is the [—] [—] [—] work [—]"
- "if you [—] the [—] you remove the work"
- "they offered [—] another [—] in another building"
- "a smaller [—] , near the offices , near the guards"

The gasp strip shows two deep fresh notches at the right (deletions within the
last second: line 15's cluster). Verified by construction via a seeded state
dump and against the rendered frames at all three QA sizes; no full sentence is
readable in any of them.

## QA

Rendered with the house renderer (node-canvas) at 1280×800, 390×844 and
720×720. Thumb rendered twice and byte-compared: identical. Token scan clean:
no Math.random, gradients, ctx.filter, shadowBlur, createElement, ImageData,
offscreen canvas, or audio/mic APIs. index.html md5 4ea247697a7ad5d6f367e6c9918f8a9c.
