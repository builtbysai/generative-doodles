# No.742 Rose Window

EXPANSION #90 spencer-finch, prompt block 7 "Rose Window". Based on Rose
Window at Saint-Denis (morning effect) (2022): a radial mandala of glowing
LED tubes, five blues, three yellows, two reds, one pink, reproducing the
morning light of a Gothic rose window.

## Concept

Twelve LED tubes radiate from a dark center hub on a near-black wall,
diameter 85% of the frame's smaller side. The tubes are honest material:
thick glowing lines, no stained-glass leading, no tracery. Their colored
light washes the wall behind them. The mandala is ordered and stays
ordered; the play is rotation. Drag and the whole wheel turns slowly,
wash and all. Tap a tube and it pulses and retunes one step, but only
inside its own color family: a blue stays blue, a yellow stays yellow,
the pink stays pink. At idle the whole window breathes, barely.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Palette, strict: blues #2E5FA3, #4A7DBE, #6BA3D8, #1E3E73, #8FB8E8;
  yellows #E8C547, #D9A441, #F2D878; reds #C0392B, #E06A5A; pink #E8A0B4;
  hub #14161A; ground #0A0B0D. Nothing else.
- Arrangement: the twelve slots carry 5 blue, 3 yellow, 2 red, 1 pink,
  and 1 spare. The spare's family and tone, each tube's starting tone
  within its family, the family order around the wheel, and each tube's
  small length jitter (plus/minus 2.5%) all come from one mulberry32
  stream seeded at load (seed 742005), so the wheel is fixed and
  reproducible. In this seed's arrangement the spare lands in the yellow
  family, so the wheel runs 5 blue, 4 yellow, 2 red, 1 pink.
- Layered-glow tube rendering: the renderer has no reliable shadowBlur
  or gradients, so each tube's glow is five stroked passes of the same
  segment, widening and fading: widths 6.0 / 3.6 / 2.2 / 1.35 / 1.0 times
  the core width at alphas 0.045 / 0.085 / 0.15 / 0.30 / 0.96, round caps.
  The bright core pass is the tube itself; the wider passes are its halo.
- Wall wash: behind the tubes, each tube lays nine soft discs (three
  stations along its direction, three concentric radii each) in its own
  color at alphas 0.030 to 0.055. The wash is computed from the same
  rotated angles as the tubes, so it rotates with the mandala.
- Rotation control: rotation is a closed-form function of recorded drag
  samples. Each trusted pointer-move sample pushes an easing segment
  {t0, rot0, target} and rot(t) = target + (rot0 - target) *
  exp(-(t - t0) / 0.45). Moves inside 8% of the smaller side from center
  are ignored for angle, since angles there are noise. No integration,
  no velocity state.
- Retune and pulse: a tap hit-tests the pointer angle against the
  twelve slot angles at the current rotation. The hit tube's tone index
  advances by one inside its family array (mod family length; pink has
  one tone, so it only pulses) and its pulse start time is recorded.
  Pulse brightness is exp(-(t - t0) / 0.6), lifting alpha and core width.
- Breathing: overall intensity multiplier 1 + 0.045 * sin(2 pi t / 11),
  applied to wash and tube alphas. Phase 0 at t = 0.
- Determinism: frame one is the synchronous draw(0): rotation 0, breath
  at phase 0, no pulses. It is a pure function of the seed and is never
  derived from a wall clock. The animation clock is elapsed time from
  the first requestAnimationFrame timestamp; rAF is typeof-guarded.
- Sizing: Visual Viewport API with resize listeners on visualViewport
  and window; canvas.style.width/height pinned in px inside draw();
  phone detection via window.screen (min dimension under 700px) with
  aspect fallback (h > w*1.15). Diameter is 85% of the smaller dimension
  at every size, so the wheel fits phones whole.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical.
- Desktop read-back: twelve radiant tubes from a dark hub, blues
  dominant, three yellows, two reds, one pink visible, soft blended
  color wash on the wall behind, nothing clipped.
- Mobile read-back: full mandala inside the tall frame at 85% of the
  390px width, hub centered, no tube cut off.
- Grep audit of index.html: no Date.now, no Math.random, no
  createElement, no AudioContext, no gradient or shadowBlur calls, no
  external URLs, no em dashes.

## Deviations

- The prompt allows "shadowBlur or layered strokes" for tube glow; this
  build uses layered strokes only, per the house rule that shadowBlur
  and gradients are unreliable in the QA renderer. The visible read is
  the same: a bright core with a soft halo.
- The twelfth "spare" tube takes a seeded family (yellow, in the
  shipped seed's stream) rather than a fixed thirteenth color, since
  the palette admits no color outside the four families.
- No hint text: the house visible-text rule allows no text in the piece
  beyond the title, so the drag/tap gestures are left undiscovered,
  as on other interactive pieces in the series.
