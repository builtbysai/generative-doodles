# №1176 — No-Media Pairing

Jason Soliday study block SD1 (PP335), grounded in Soliday's NO-MEDIA format
(GLI.TC/H 2112): "no preparation, random pairing, 10 minutes, NO
documentation." Two performers are thrown together mid-evening, improvise for
ten minutes, and leave no record. The piece keeps the discipline exactly:
a random pair, a strict clock, and nothing kept.

## The piece

A dark stage (#0A0A0C). Twelve candidate "voices" — small geometric glyphs
(triangle, square, wave, blob, ring, cross, bars, diamond, spiral-arc, dots,
zigzag, crescent), each with a one-word name and a neon color from the
six-color cycle — ring the stage edge on a faint ellipse. Every round, one
pair is spotlighted (flat #F5F0E6 cones at 25% alpha from the top corners) and
moved center-stage at large scale, where the two improvise together for one
compressed ten minutes: 60 seconds of piece time under a big countdown that
runs 10:00 → 0:00. At 0:00 the pair vanishes — no replay, no history list,
no residue — the stage wipes black for 2 seconds, and a new pair takes the
stage. The new pair is never the same pair twice in a row. Watch-only; the
viewer has no say in the pairing. Silent: the voices are visual.

Frame one (T0 = 23 s into round 0) catches the first pair mid-improvisation:
**pel** (violet, dots glyph) raining streaks on the left, **rin** (cyan,
diamond glyph) drifting cloudy blobs on the right, the countdown at 6:10,
their ring glyphs dimmed and haloed at the edge.

## Cross-modulation

Each voice runs its own procedural sketch, and each bends the other — that
interference is the improvisation:

- Each voice has an analytic amplitude signal `amp(t)` (two detuned sines
  from its round parameters, clamped to 0..1).
- Voice B's center drifts by `(ampA − 0.5) · wAB` and its energy — spike
  lengths, blob radii and pulse, ring reach, rain speed, mesh warp, orbit
  size — is rescaled by A's amplitude through the round's seeded weights
  `wAB` / `wBA`. Symmetrically for A.
- Four tendrils (#B8FF2E, stepped alphas) join the two centers as quadratic
  curves whose control points ride the difference of the two amplitude
  signals, so the coupling itself is visible.

The six sketch vocabularies: **spikes** (14-ray line eruptions with a jagged
tip outline), **blobs** (seven drifting, pulsing cloudy circles), **rings**
(three expanding pulses), **rain** (24 depth-weighted falling streaks),
**mesh** (a 6×6 grid warping on sine fields), **orbits** (three orbiters with
trails). Voice v uses sketch v mod 6 and glyph v. History and trails are the
same closed-form function evaluated at earlier times (spike ghosts at
−0.35 s / −0.7 s, a blob ghost at −0.45 s, orbit trails at −0.07 s steps) —
there is no canvas-fade anywhere in the piece.

## The continuum

One seeded stream (mulberry32, master seed 1176001) drives everything, but
rounds are addressed, not accumulated: round r's pair, sketch parameters and
modulation weights are hashed directly from r, so any round is computable on
demand. The stream effectively never repeats — there is no loop point — yet
the first frame is exactly reproducible. Pair selection draws from round r's
own stream and rejects a repeat of round r−1's unordered pair. A new pair
fades in over the first 2 seconds of its round in four stepped alpha levels;
during the 2-second gap only the dimmed ring and a held 0:00 remain.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px in
  `fit()`; phone detection via `window.screen` physical size (min dimension
  < 700 px) with the `h > w·1.15` aspect fallback. On phones the ring
  ellipse narrows and the voices sit closer, tendrils intact.
- First frame drawn synchronously at the fixed phase T0 = 23 s; the rAF loop
  is `typeof`-guarded and anchored as T0 + elapsed since load.
- mulberry32 only — no `Math.random`. No gradients, no `ctx.filter`, no
  shadowBlur, no offscreen canvas, no ImageData, no `createElement`, no
  audio, no microphone. Every arc is drawn as its own path with a `moveTo`
  before it (the node-canvas batched-subpath lesson); the ring guide is a
  segmented polyline rather than a batched ellipse.

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp` identical);
  the duplicate was deleted.
- Desktop (1280×800) and mobile (390×844) renders read by eye. First pass:
  the spotlight cones were too wide and swallowed the stage, and the
  tendrils were too faint to read — cones narrowed (base half-width
  1.02R → 0.85R, base drop 0.8R → 0.6R) and tendrils strengthened
  (lineWidth 2, alphas 0.3/0.45/0.6/0.75); all renders redone after the fix
  and the thumb byte-compare re-run clean.
- Frame one verified against the brief: dark stage, ring of 12 labeled
  glyphs, round-0 pair (pel + rin) center-stage mid-improvisation with
  visible tendrils, active ring glyphs haloed, countdown reading 6:10
  (= ⌈(60 − 23) · 10⌉ = 370 s of compressed time).
