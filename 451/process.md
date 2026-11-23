# №1458 "Festival of the Ugly" (ulrike-ottinger UO3, PP705)

A procession of extravagantly costumed figures crosses a town square toward a
dais: a dwarf, a bearded lady, a two-headed figure, a punk in leather, a giant.
On the dais stands the most beautiful figure of all, in a bunny costume,
holding a trophy. In a competition of the ugly, the beautiful is the freak.

## Composition

Dusk sky (#e8c9a8) above, square stone (#c9bfae) below. The procession runs
diagonally from the lower left to a plum dais with a gold base at the upper
right, where the large ivory bunny figure stands holding a gold trophy.
Generous sky. Costumes use only the prompt's flat tones: scarlet #c1272d,
gold #d9a441, teal #2e6f6a, plum #5b2a4a, ivory #f2ead8. No gradients, no
shading, no visible text except `<title>`.

## Motion

42 s loop, one figure at a time, fixed 8 s slots: walk in along the diagonal
(4 s, easing, shrinking slightly as the figure recedes), bow at the dais
(2 s, forward tilt that rises and falls), exit to the right (2 s). When the
last figure bows, the bunny raises the trophy (2 s, arm lifts, gold sparkles
around the cup), and the loop reseeds with a new procession order. Tap
anywhere reseeds the order of the figures not yet started in the current
loop immediately; the figure currently walking, bowing, or exiting is never
paused, moved, or restarted by the tap.

## Figures

Flat costume silhouettes with distinct accessories, stylised and dignified,
never mocking caricature:

- Dwarf: short figure, plum coat, tall pointed gold hat.
- Bearded lady: scarlet gown, ivory beard strands below the chin.
- Two-headed figure: teal coat, two ivory heads side by side.
- Punk in leather: plum coat, gold mohawk spikes and shoulder spikes.
- Giant: tall figure, broad gold coat.
- Bunny (dais): large ivory costume, long ears, gold trophy in hand.

## Adaptations

- Parade as a timed queue with fixed spacing; trophy-raise as a timed pose
  at loop end; tap as a seeded reseed of the not-yet-started order only.
- Loop order from a mulberry32 PRNG (seed 1458000 + loop index * 7919);
  tap reseeds use a deterministic function of loop, tap index, and tap time,
  so every frame is a closed-form function of piece time and the recorded
  tap list. No Math.random anywhere in code (the single token hit is a
  comment stating it is never used).
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
- Fading alphas are literal fixed decimals; dots are own-beginPath arcs
  (node-canvas quirks). Every shape gets its own beginPath.
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px; phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback; field-like composition goes full-bleed on
  phones.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, which is a
  plain function declaration behind a typeof guard).

## Fix rounds

1. Mobile clip: the entering figure's head was cut at the left edge on the
   390-wide render (start x 6% of width, figure half-width wider). The
   walk-in x is now clamped to at least 0.24 * figure height, keeping the
   entering figure inside the frame on narrow phones. Desktop frame one
   unchanged by the clamp; all renders re-done after the fix.

## Verification (forced-time probe harness, tmp/probe1458.js)

- Two fresh instances byte-identical at t = 0; thumb byte-identical across
  repeated renders.
- Loop order at t = 0 is [2,3,4,0,1], a permutation of all five figures;
  order at t = 42 (new loop) is [4,1,2,3,0] — the loop reseeds.
- t = 0 vs t = 2 differs by 22,166 px (walk live).
- At each slot's bow window (t = k*8+5) a figure stands at the dais
  approach zone: 18,995 / 18,620 / 25,671 / 14,868 / 19,759 figure px.
- Trophy raise: gold top of the trophy moves from y = 149 at t = 0 to
  y = 48 at t = 41 — the bunny genuinely lifts the trophy at loop end.
- Tap at t = 3 leaves the t = 5 frame pixel-identical (current figure never
  paused); order at t = 10 changes from [2,3,4,0,1] to [2,0,3,1,4] with the
  first figure unchanged.
- Token scan clean apart from the Math.random comment.
