# №1195 — GlitcHorses

joncates study block JC4 (PP354), grounded in *II glitcHorses II* (2024):
AI-generated horses, re-broken with analog artifacts. The piece is silent —
the gallop is drawn, not heard.

## The piece

Two black horse silhouettes (#0D0D0F) — a mare at 35% of the frame width, a
foal at 25% — gallop left to right across a field of fire and wrap. The
explosion is built from flat shapes only, no gradients: the #1A0B2E sky, then
three concentric ellipses (#FF7A00, #FFE45C, #FFFFFF core) that breathe on a
slow pulse (±2% at 0.5 rad/s). A dark ground band carries a thin line of
firelight at its top edge; the horses run on that line.

The horse is one glyph, drawn fresh at two scales. The body is a single
closed polygon — long stretched face, low poll, streaming tail — designed
over three QA iterations until the profile read unmistakably as a galloping
horse rather than a dog. The legs are separate tapered polygons pivoted at
shoulder and hip, posed by a 4-frame cycle (extension, landing, push,
folded suspension) stepped at 6 fps, with a per-frame body bob. Far legs use
slightly different angles than near legs, so the stride has depth.

Inside each silhouette lives a neural network: 26 nodes rejection-sampled
inside the body polygon with a seeded RNG (each horse gets its own graph),
joined by edges between near neighbours, and drawn clipped to the body path.
A brightness wave travels nose-to-tail — brightness is a cubed sine of
(gallop time × 0.9 − x/115) — so the pattern pulses like circuitry or flame
veins, red #FF2B4E at rest, pink #FF7AD9 at the crest. The original AI image
was "re-broken"; here the break is procedural and continuous.

Every 20 seconds a glitch burst hits for 1.6 seconds. The gallop clock
freezes — effective gallop time is piece time minus the total burst time
elapsed, computed closed-form over all burst windows, so position, stride
frame and neural wave all hold mid-stride and resume exactly where they
stopped, seamlessly across loop seams. During the burst each horse is drawn
three times: a magenta #FF2BD1 ghost at −6 px, a cyan #00E5FF ghost at
+6 px (both silhouette-only, 55% alpha), and the true horse redrawn in 12
horizontal slices, each slice shifted by a hash of (row, burst step) for the
scanline rake, with six thin white scan lines sweeping the horse's box.

The one interference: drag. Pointer contact lays down shockwave rings
(recorded as events, throttled to one per 0.12 s); a ring expands at
260 px/s for 1.2 s, and any neural node within 20 px of the ring front gets
a brightness boost as it passes — the viewer excites the circuitry where
the wave crosses a horse, but never steers, slows or stops the gallop.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; CSS size pinned in `fit()` and re-pinned
  in `draw()`.
- Phone detection via `window.screen` (min dimension < 700) with aspect
  fallback; the composition is a centered field, so the fire and the ground
  line simply rescale on portrait screens.
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 20.8 s — mid-burst: both horses frozen in the extension stride,
  ghosts split, slices raked, scan lines up, neural webs lit. The rAF loop
  (typeof-guarded) is anchored as T0 + elapsed-since-load.
- Seeded hashes only (integer mix + mulberry32); no `Math.random`, no
  gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
  ImageData/offscreen canvas, no audio, no microphone.
- No visible text; the title lives in `<title>` only.
- Silent by design.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile)
and 720×720 (thumb). The thumb was rendered twice and byte-compared with
`cmp` — identical; the duplicate was deleted. The horse polygon went
through three render-and-read iterations before the profile carried.
