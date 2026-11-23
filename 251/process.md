# No.492 — Exploded Serif

EXPANSION #59 eugenio-bertozzi, prompt EB4. After his exploded "A" (2023/24).

## Concept

One giant serif capital, white on black, broken into its construction fragments
and displaced along seeded axes like a technical exploded diagram. Sharp,
architectural, quiet. The letter always stays readable: the fragments hover
near their assembled positions, and dragging pulls them further out along
their own displacement vectors before they snap back on elastic springs.

## Construction

- Single self-contained `index.html`, canvas 2D only. Palette is exactly
  black #0A0A0A and white #FFFFFF (axis line and hint use white at low alpha).
- Parametric serif-capital constructor in a local letter space (y 0 at cap
  top, 1 at baseline): vertical stems are slab-serif polygons with bracketed
  flares, diagonals are width-tapered polygons with flared ends, arms and
  bars are plain rects with a slight serif point. Each letter decomposes
  into fragments (A: apex cap, left leg, right leg, crossbar; E: spine and
  three arms; H: two stems and crossbar; M: two stems and two diagonals;
  R: spine, bowl with an even-odd counter, leg; T: two bar halves and stem).
- Each fragment has a seeded exploded home: a hand-set base direction per
  fragment with seeded angular jitter (±0.55 rad) and seeded magnitude
  (roughly 4–18% of letter height). Fragments translate only, never rotate.
- Interaction: DRAG. Fragments are spring-anchored at their exploded homes
  (underdamped spring-damper integration, stiffness 130, damping 8.5, so
  release snaps back with an elastic ease). While dragging, each fragment's
  target moves further out along its home vector, scaled by drag distance
  and by how well the drag direction aligns with that fragment's axis, plus
  a small follow of the pointer delta. Double-tap reseeds: a new capital is
  chosen from A, E, H, M, R, T (never the same one twice in a row), new
  seeded offsets are drawn, and the fragments fly out from the assembled
  letter. The first capital is fixed as A by the seed (mulberry32, 49204).
- One optional 1px axis line crosses the displacement origin (frame center)
  at white 0.16 alpha. One lowercase "drag" hint, bottom-left, white at
  0.32 alpha. Nothing else on the canvas.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; `canvas.style.width/height`
  pinned in px every draw; phone detection via `window.screen` (min
  dimension < 700px) with the h > w*1.15 aspect fallback; page ground is
  the piece's black. Letter scale is the smaller of 80% of canvas height
  and a width budget that reserves room for exploded offsets and serif
  flares, so no fragment can leave the frame on narrow screens.
- Determinism: the first frame is drawn synchronously at load with the
  fragments resting exactly at their seeded exploded homes; nothing in
  frame one reads the clock. `requestAnimationFrame` is typeof-guarded
  and only drives the spring physics after load.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with `cmp`:
  identical. Second render deleted after the check, and the gate was
  re-run after the fix below.
- First pass issue: at desktop and thumb sizes the composition was right,
  but on the 390-wide mobile render the exploded leg offsets pushed the
  foot serifs past the left and right edges. Fixed by shrinking the letter
  through the width budget above (letter height unchanged on desktop) and
  reducing the A legs' end flare from 0.035 to 0.025; all three sizes
  re-rendered and re-inspected.
- Final read-back: desktop shows the A at ~80% of frame height, apex cap
  floated above the apex, crossbar dropped below its seat, legs pushed
  outward, axis line faint through the counter; the letter reads instantly.
  Thumb keeps the same read at 720x720. Mobile keeps the whole exploded
  letter in frame with margin on all sides, nothing clipped.

## Deviations

- None against the prompt's letter. Two construction choices worth noting:
  the drag pull is weighted per fragment by alignment between the drag
  direction and the fragment's own displacement axis (fragments mostly
  travel along their diagram axes rather than chasing the pointer), and
  on double-tap reseed the new letter's fragments start assembled and fly
  outward to their new homes instead of appearing already exploded.
