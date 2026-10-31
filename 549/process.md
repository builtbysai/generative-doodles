# No.549 Where the Smile Isn't

EXPANSION #66 cristina-daura, prompt CD5 (Smiley Decoy). From her rule
(AIGA): the girl in the smiley mask is "all of us hiding our true
selves" — here the smile is a decoy placed where a face isn't.

## Concept

A flat black ground holds twelve everyday objects in a loose 3x4 grid,
each drawn in two or three flat neon colors with heavy black outlines:
a soda can, a potted plant, a kebab spit, a balloon, a cup, a doorway,
a palm tree, a duck, a shoe, a radio, a fish, a house. Exactly three of
them wear the yellow smiley face, and never the ones with faces: the
smileys sit on non-face spots — the plant's tendril, the kebab stack,
the balloon's string knot, the radio dial. The smiley is always the
same simple design: two dot eyes, one arc mouth, never winking, never
frowning. No object gains a real face, and there are no labels.

Between taps the piece is watch-only: the objects bob gently on
staggered sines and the three smileys rotate slowly, a full turn over
20 seconds, like stickers. Tap anywhere and the three smileys migrate
to three new random eligible objects with a quick flat pop. Never
click-to-reload. A subtle lowercase "tap" sits in the bottom-right
corner.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Strict palette, nothing else: black ground #111111, smiley yellow
  #FFD400, objects in pink #F0438F, cyan #00AEEF, green #2AA37A, red
  #E63B2E, white #FFFFFF. Flat fills only; no gradients anywhere, and
  no grain layer — the prompt's flat neon read is kept clean.
- Design space 1080x1080; cells 270x360. Each object is a flat-shape
  draw function in local coords centred on its cell, with a seeded
  scale jitter (0.92–1.08) multiplied by a uniform 1.22 presence
  scale, and a seeded bob (amplitude 5–8.5px, period 12/14/16/18s,
  own phase).
- Smiley hosts: the eligible set is fixed at nine — can, plant, kebab,
  balloon, cup, doorway, palm, shoe, radio. Excluded: the duck (the
  prompt names it), the fish (drawn with an eye, so face-bearing), and
  the house (two windows over a door read as a face). Hosts are dealt
  by a Fisher-Yates shuffle of the eligible list off a mulberry32
  stream; each host also gets a seeded rotation offset.
- Initial deal, seed 549066 (mulberry32, fixed): the smileys open on
  the kebab (side of the meat stack), the radio (on the dial), and the
  palm (under the crown).
- Tap: a fresh deal replaces the three hosts, the new smileys pop in
  over 0.3s (scale 0.25 → 1.18 → 1.0) and take new rotation offsets.
  Tap handling is on pointerdown/touchstart with a 400ms dedupe so one
  physical tap cannot register twice; taps outside the square stage
  are ignored.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style width/height pinned in px
  inside draw(). Phone detection via window.screen physical size
  (min dimension under 700px), aspect ratio only as fallback; on
  phones the square stage spans the full width, page ground black.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 1.3, with the initial deal placed, objects at their
  seeded bob phases, and no pop active. The animation loop is
  typeof-guarded and anchored as PHASE0 + elapsed since the first
  rAF timestamp, never derived from Date.now().

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844 and
  720x720.
- thumb.png rendered twice and byte-compared with cmp: identical after
  each fix pass; the second render was deleted each time.
- First pass read-back: composition correct (three smileys on kebab,
  palm, radio; none on the duck) but the objects sat small in their
  cells, and two ink-stroked details vanished against the black
  ground: the balloon's string and the radio's antenna, leaving the
  antenna's white tip floating as a stray dot. Fixed by drawing the
  string and antenna in palette white and adding the uniform 1.22
  presence scale; re-rendered.
- Final desktop and thumb: twelve neon objects on black in a loose
  grid, all twelve identifiable, exactly three yellow smileys, all on
  non-face spots; white balloon string and radio antenna read; "tap"
  hint bottom-right in cyan; nothing clipped.
- Final mobile: grid spans the full 390px width, stage centred on the
  black ground, all twelve objects whole and legible, all three
  smileys visible, nothing clipped.

## Deviations

- The prompt and brief fix the eligible count at nine hosts without
  naming all three exclusions. The duck is named; the other two are
  resolved here as the fish (it is drawn with an eye, making it
  face-bearing under the prompt's own rule) and the house (two square
  windows over a centred door read as a face). The nine eligible hosts
  are listed under Construction.
- The balloon's string and the radio's antenna are stroked in palette
  white rather than ink: on the black ground an ink stroke is
  invisible, and the antenna's tip otherwise floats as a stray dot.
  Both stay inside the strict palette.
- A uniform 1.22 presence scale multiplies each object's seeded
  jitter. The prompt's grid is loose with generous black space, which
  is kept; the scale only keeps the objects from sitting small in
  their cells at gallery sizes.
- If a tap's fresh deal exactly repeats the current three hosts, it
  re-deals (up to eight tries), so a tap always visibly migrates the
  smileys, as the prompt's "migrate to three new random objects"
  requires.
