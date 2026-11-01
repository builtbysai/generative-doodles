# №1463 "Calligrammes Bookshop" (ulrike-ottinger UO8, PP710)

A Paris bookshop interior: tall shelves of books fill the background, a wood
counter runs across the lower third, a window onto a street sits upper right.
Above the counter, on a paper panel, loose words arrange themselves into
shapes: a tower, a bird, a staircase. Text drawn as image, the way a
calligram works. The words drift, settle into a shape, hold, then drift into
the next shape.

## Palette (prompt, no other color)

Shop wood #6b4a2f; shelves #3a2e28; book spines muted flat tones (ochre
#d9a441, teal #2e6f6a, rust #a34a24, plum #5b2a4a); paper #efe6d0; word-ink
#1e1e24; window light #d8e2dc.

## Composition

Shelves fill the background (four seeded rows of book spines with wood shelf
boards). Counter lower third, wood, with a small stack of three books at its
right end. Window upper right: light pane with dark building silhouettes and
a wood mullion. Paper panel centered above the counter, with a flat offset
edge (no shadowBlur) and a wood border, carries the word-shape, large and
legible as a shape first, as words second.

## Motion (36 s seamless loop, closed-form over piece time)

Three 12 s segments: tower, bird, staircase. Within each segment words
settle in over the first 4 s (per-word delay, smoothstep ease from seeded
scatter positions), hold for 5 s with a gentle per-word bob, then dissolve
over 3 s back toward scatter. Frame one is phase-shifted +4 s so it opens on
the tower held, not mid-drift. The loop closes exactly at t = 36 s
(probe-verified 0 px difference).

Words (15, short common words only, never sentences, never captions):
book, leaf, light, door, wind, star, rain, song, sea, moon, stone, fire,
tree, road, home.

- Tower: rows bottom to top of 3, 3, 2, 2, 2, 2, 1 words, wide base
  narrowing to one word at the top.
- Bird: one head word upper right, a body mass of three rows, two tail
  words at left.
- Staircase: five columns of 1, 2, 3, 4, 5 words, bottom-aligned, ascending
  left to right.

## Interaction

Drag a word to pull it out of the shape; releasing it lets it drift back
to its place (exponential decay, tau 1.5 s). Drag never resets the shop
and never restarts the sequence. Never click-to-reload.

## Adaptations

- Words as text sprites with per-shape target positions; easing toward
  targets with slight per-word delay; drag offset decaying on release.
- Text is used only because the calligram mechanism is the subject
  (scoped exception): short common words only, never sentences, never
  captions, never paragraphs. No other visible text besides the word-shape
  and <title>.
- Paper panel behind the word-shape so the ink words stay legible against
  the dark shelves; the panel is a flat paper rect with a flat offset edge,
  never a gradient or blur.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text measurement
  (positions are fixed layout, so rendering is font-independent).
- Fading alphas rounded to 4 decimals (node-canvas quirk); dots as filled
  rects (no dots needed beyond book spines).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from seeded mulberry32 (books 1463000, scatter 1463000+101),
  never Math.random.

## Verification

Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness
(vm-isolated instance, stubbed rAF driving the piece's own loop, pointer
events to its own listeners): t = 0 tower held (book bottom row, home at
top); t = 16 bird held (26,012 px different from t = 0); t = 28 staircase
held (25,032 px different); t = 36 vs t = 0 = 0 px (loop closes exactly);
drag moves a word 170 px to the pointer, release holds, 4 s later it sits
12 px from its base (decayed); untouched words unaffected.

## Fix rounds (1)

First bird render put the two tail words at fx -0.95 / -1.0, which pushed
them past the paper panel's left edge onto the books behind. Tail moved
to -0.78 / -0.82 so the whole bird sits inside the panel. All renders
re-done after the fix; frame one (tower) unchanged.
