# №1787 "Four Hundred and Ninety Objects" (SR4, PP1034): process notes

The driver is the translation rule itself: each moon-map name is parsed at a chalk-white reading line, its vowels counted, and a wooden object is carved whose height is exactly proportional to that count and whose tint follows the vowels it contains.

## Prompt source

EXPANSION #234 steve-roden, prompt SR4 (PP1034), from TASKS.md prompt blocks (steve-roden PP1031-PP1038, 2026-10-31, TASKS lines 23277-23358), as carried verbatim into BATCH-1786-1790-SPEC.md. Gallery date 2006 · 12 · 03. Gallery note: "Moon names become wooden objects, height by vowel count. Watch only."

Prompt in brief: a dim workshop surface; a typewritten list of moon-map names (craters, mountains) scrolls slowly on the left; each name, as it passes a reading line, is parsed, its vowels counted, and a small wooden object is carved and placed on the right, its height exactly proportional to the vowel count, its material tint shifting with which vowels it contains; the objects accumulate into a dense field of 490 small forms, twine and wood shavings drifting between them; watch-only; names arrive steadily; objects are placed with a small settling motion; the full cycle runs all 490 before a quiet reset.

## Build

Canvas 2D only, built on the live №1785 template structure (plates, Visual Viewport sizing, phone detection, guarded requestAnimationFrame). One synchronous frame at load; frame one is fixed phase t = 60 s.

Name list: a fixed authored table of 285 real moon-map names (193 craters, 23 maria and oceanus, 9 sinus/lacus/palus features, 13 montes, 28 mons, 8 valles, 11 rimae), verified unique by script. Vowel counts across the table run 1 to 8, none zero.

Vowel-to-height mapping: object height = row pitch * (0.55 + 0.13 * v), where v is the vowel count (a, e, i, o, u only), so height is exactly proportional to the count. Tint: pale wood #D9C49A mixed 55/45 toward the average of the per-vowel tints a #C98A3D, e #D9B45B, i #E3D98F, o #8A5A2B, u #7A6A58.

Timing: one name per second crosses the reading line; the full cycle is 490 s, then a quiet reset (field fades out over the last 3 s, back in over the first 4 s). Objects fill the field bottom-up, 14 columns on desktop and 8 on phones, back rows drawn first so nearer objects overlap farther ones. Each placement carries a settling motion (scale and drop over 0.8 s) and carved jitter (width, lean, flat/rounded/pointed top, grain) seeded from the placement index. A dotted chalk thread runs from the reading line to the slot of the object being carved, fading over 3 s. The rule is stated in the field legend: "HEIGHT BY VOWEL COUNT · TINT BY THE VOWELS".

Frame one (t = 60 s): 60 names parsed (indices 0 to 59 placed, 60 objects on the field in the bottom rows); name 60, MANNERS, is mid-parse at the reading line with its vowels lit amber and the breakdown "a e · 2 vowels" below the line; object 60 is mid-settle in row 4, column 4; the tally reads "OBJECTS 60 / 490". All parsing, placement, shaving drift and twine are closed-form functions of piece time on seeded tables, so frame one is byte-comparable.

## Deviations from the prompt

1. The name table holds 285 real moon-map names, not 490. The 490-object cycle runs through the table and then repeats it; repeat passes carve a fresh object for the same name with fresh placement-seeded jitter, so the field still reaches 490 distinct forms. No names were invented.
2. Names are spelled without diacritics (Stofler, Konig, Schrodinger, Poincare, Rumker, Ampere, Andre), as a typewriter would set them.
3. Phone adaptation: the list panel is 42 percent of viewport width on phones (rather than one third) so long names stay legible, and the object grid is 8 columns on phones versus 14 on desktop.
4. A field legend stating the rule was added at the top of the object field; it splits to two lines on narrow fields.
5. No audio: the prompt does not call for it. Watch-only, no pointer handlers.
6. First gate showed the twine strands as oversized swooping arcs across the empty upper field; they were shortened to lazy loops in the lower field near the objects and re-gated.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile and 720x720 thumb; all three PNGs inspected visually. First gate found three defects: the field legend was hidden behind the title plate on the 720 square and truncated on mobile, the tally was covered by the hint plate on mobile, and the twine arcs were oversized. All three were fixed (legend repositioned below the plate zone and split to two lines when narrow; tally raised 40 px on phones with the list clip shortened to clear it; twine shortened) and all three sizes were re-rendered and re-inspected. Final renders pass: desktop shows the dim workshop surface, the scrolling list with MANNERS mid-parse at the chalk line, the dotted thread to the settling object, and the growing object field; mobile shows the same composition legibly with the tally clear of the hint plate; thumb is the 720x720 render. No post-gate edits. thumb.png IS the 720x720 render.

md5 index.html: 3c3d357d99979e5df4c8f837742e2057
md5 thumb.png: 601d0c7feaffe6348c08d1129bdddd2b
