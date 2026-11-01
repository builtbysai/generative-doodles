# №1244 — Lurkin' Hard

Adán De La Garza study block ADG5 (PP403), after his ongoing zine *Lurkin' Hard*:
35mm film found in used cameras, rescued from abandoned cameras, and never
processed — "I have a garbage bag full of 35mm film to process."

## The piece

Someone else's abandoned camera roll, browsed as a film strip. Sprocket holes
run along both edges of the frame; below the strip sit a film-edge frame number
and the counter, in amber typewriter type on black:

> garbage bag: 214 rolls unprocessed

The counter never changes and never decreases. That is the joke, and the truth
of it.

Frames auto-advance every 4.5 seconds (no image lingers longer than 6) with a
stepped zine-flip: the outgoing frame slides and skews away while the next one
slides in, with a seam shadow between them. Swipe left/right flips forward or
back through the roll and resets the auto timer. Double-tap reseeds the roll
(the same frame indices generate different photographs). The roll is endless —
every frame is generated from its index, not stored.

## Roll generation

Frame type is fixed by `index mod 8`, so every roll of eight has the same
bones: 0 blurry dog · 1 party · 2 motel pool at dusk · 3 birthday cake
mid-collapse · 4 landscape · 5 interior with cat · 6 the thumb frame ·
7 blank amber leader (frame number only). Within that, each frame's
particulars — horizon tilt, figure positions, which windows are lit, speckle —
come from a seeded integer hash of the frame index and the reseed salt.

Every snapshot carries one to three amateur errors, hashed per frame:

- **Crooked horizon** — the whole scene rotated a degree or two, scaled up to
  cover the corners.
- **Motion blur** — the scene redrawn once, offset, at low alpha. (The dog is
  always blurry.)
- **Flash blowout** — a flat white blob at partial alpha.
- **Light leak** — a flat polygon wedge from a corner: magenta from the top
  right, leader amber from the bottom left.
- **Red-eye** — two small red dots on the dog's and the party figures' eyes.
- **Thumb over the lens** — a skin-tone blob with a knuckle crease over one
  corner. Mandatory: the cake frame (index mod 8 = 3) always carries it, and
  frame 6 of every roll is the thumb frame proper — a dim street almost
  entirely covered by the photographer's thumb, thumbnail and all.

## House adaptations

Per the house rules for the doodles series: light leaks are **flat alpha
polygons** (no canvas gradients anywhere); motion blur is an **offset
double-draw** (no `ctx.filter`); the page flip is a **skewed-quad slide**
(no 3D texture work, no offscreen canvas). No ImageData, no `createElement`,
no audio, no `Math.random` — all variation is seeded hashes. Canvas is sized
from the Visual Viewport API with resize listeners on both the viewport and
the window; the CSS size is pinned in draw; phones are detected via
`window.screen` (min dimension < 700) with an aspect fallback. The first frame
is drawn synchronously at a fixed phase — piece time 10 s, frame index 2 (the
pool) settled — and the rAF loop (typeof-guarded) anchors from there, so the
first frame is reproducible exactly.

Visible text is only what belongs to the object: the frame numbers and the
garbage-bag counter.

## QA

Rendered with the house node-canvas renderer:

- `qa-desktop.png` (1280×800) and `qa-mobile.png` (390×844): frame one is the
  motel pool at dusk — dusky sky bands, motel block with lit windows (one
  dark), deck, pale water with lane line, diving board, a figure at the edge,
  flash haze over the building, amber leak in the lower corner; frame number
  "02" bottom-left; counter "garbage bag: 214 rolls unprocessed" bottom-right.
- `thumb.png` (720×720) rendered twice and byte-compared: identical.
- Off-phase checks (temp copies, discarded): frame index 6 renders the thumb
  frame — dim street and buildings behind a huge skin-tone thumb with pale
  thumbnail and crease lines; frame index 7 renders the blank leader — clean
  amber with faint streaks and speckle, edge print "07A".
