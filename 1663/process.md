# No.1663 - Infinite Piece, Study in Wax

Study #218 eric-de-giuli, prompt PP910 EDG8. Completes #218.
Date: 2006 · 08 · 01. Silent. Watch-only.

## Driver

Warm wax keeps pouring, folding and splitting, and never finishes.

## Mechanism

A closed-form viscous-flow field advects a layered color texture
downward; nothing is frame-integrated, so every frame is a pure
function of piece-time t and frame one (t = 0) is a fixed, reproducible
phase.

- Ground masses: a 3-octave value-noise field (seed 1663) picks through
  a five-stop warm palette (peach, salmon, pink, amber, cream) as it
  scrolls downward at one frame-height per 260 s.
- Drips: a vertically stretched noise field (x * 6.0, y * 1.15) makes
  elongated masses that lengthen as they fall; it also shifts the
  palette position and shades mass cores warm and bright.
- Fold ridges: a second noise field acts as a height field; a cream
  highlight band sits on its crests and valleys are shaded darker.
- Veins: thin hot red-orange channels, `pow(1 - |sin(pi * w)|, 18)`
  on a flow-warped coordinate, gated by a slow mask so veins appear,
  stretch and fade with the flow.
- Pours: where a separate slow field exceeds threshold, the ground
  blends toward deep purple-black (two near-black stops).
- Eroded-stone edges: where the mass field changes fastest (the edges
  of the pours), seeded stipple from a fixed hash darkens or lightens
  individual cells.
- All fields are drawn directly from JS arrays into per-cell fillRect
  calls; no offscreen canvases, no sprites, no images.

## Closed-form periods (seconds)

Wobble 47, sway 61, drift 83, fold 97, vein 113, pour 149. All prime
and incommensurate, so the field as a whole repeats only at their
least common multiple, far beyond any watchable span. The downward
scroll itself never repeats, because the hash noise it scrolls through
is aperiodic in y.

## Deviations from the prompt

The "never repeats" clause is adapted, not copied literally: true
non-repetition is impossible in a deterministic closed-form field, so
the piece uses the long incommensurate periods above plus the
aperiodic scroll, and no seam is visible inside any watchable span.
No other deviations. Palette, portrait full-bleed composition with no
horizon, watch-only interaction, and the molten (not lava-lamp) weight
are all as specified.

## Interaction

Watch-only. No pointer handlers, no click-to-reload, no
click-to-restart. Reduced-motion renders a still developed frame.

## House rules

- Self-contained single index.html, canvas 2D only, no external
  assets, silent.
- Canvas sized from the Visual Viewport API, resize listened to on
  visualViewport and window; canvas.style.width/height pinned in px
  every frame in draw().
- Phone detection via window.screen physical size (min dimension
  < 700 px), aspect fallback h > w * 1.15. Field-like composition:
  full-bleed on phones and desktop, flow fills the frame top to
  bottom, no horizon.
- First frame drawn synchronously at t = 0; rAF loop anchored as
  offset + elapsed-since-load, guarded by a typeof check. Seeded
  values from fixed hash functions only; no Math.random, no Date.now.
- Title/date/hint plates in the No.1662 style. No artist signature,
  no em dashes, no AI-signature copy. Flicker well under 14 Hz by
  construction (all motion is slow drift at prime periods).

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900
desktop, 390x844 mobile, and 720x720 thumb; all three inspected.
Frame probes at t = 60 and t = 600 (via window.__probe.drawAt)
confirm the field keeps evolving without degenerating. Thumb
rendered twice, byte-identical (md5 ea1bdbd25557ebb98be5ecec371f71f5).
No fix rounds needed.
