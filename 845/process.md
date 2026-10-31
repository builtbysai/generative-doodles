# No.845 — Multiply-Exposed

EXPANSION #103 lou-reed, PP6. An original composite portrait (no reference
photograph, nothing recognisable as Reed) held in several breathing
exposures inside the Magic and Loss reliquary frame: the words
MAGIC AND LOSS repeated along all four edges, alchemical glyph marks in
red at the corners.

## Concept

The source portraits (Magic and Loss, Songs for Drella) show a face that
will not sit still in one exposure: hand on heart, sunglasses, a ruin of
stripped paint behind. The piece rebuilds that as procedure. One flat-tone
portrait — brow plane, sunglasses band, nose wedge, jaw, a hand resting on
the chest, vertical ruin stripes behind the head — is drawn four times,
slightly offset, each copy breathing on its own slow sine. The lead keeps
passing from exposure to exposure and the face never resolves into a
single image. A tap shifts which exposure leads, but the shift eases in
over four seconds; nothing in the piece is ever snappy.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no
  sound, no microphone. Sizing from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style pinned in px
  inside `draw()`; phone detection via `window.screen` min dimension
  (< 700 px) with the `h > w*1.15` aspect test as fallback only. On phones
  the whole composition scales to 0.92 so the framing stays whole.
- Palette is strict: sepia-black #141210, bone #D8CFC0, glyph red #8A1F1F.
  Every portrait tone is a mix between the ground and bone (stripes 0.30,
  chest 0.36, brow 0.40, skull 0.52, nose 0.60, lit face plane 0.68, hand
  0.78; sunglasses band and collar 0.13). No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas.
- Portrait geometry is fixed polygon data in unit space (u = min(W, H)),
  drawn identically by all four exposures; only the registration offsets
  ((0,0), (+0.012,-0.006), (-0.014,+0.008), (+0.006,+0.014) of u), tiny
  seeded rotations (±0.01 rad), and per-part-group emphasis multipliers
  differ. Ruin stripes are seeded data (mulberry32, seed 845006): bars of
  random width, gap and weight spanning the band behind the head.
  Emphases: exposure 1 leans on the stripes (1.45), exposure 2 on the dark
  band (1.45) and the hand (1.30), exposure 3 on the face planes (1.40).
- Exposure model (closed form): opacity of exposure i at time t is
  `0.44 + 0.30 * sin(2*pi*t/T_i + phi_i + Phi_i(t))`, periods
  T = 30 / 38 / 26 / 34 s. Opacity is confined to [0.14, 0.74], so no
  exposure can ever reach full strength — the never-resolving face is a
  property of the constants, not of the timing. Frame-one phases
  phi = 0.823 / -0.486 / 0.134 / -0.201 give t=0 opacities of
  0.66 / 0.30 / 0.48 / 0.38: exposure 0 slightly leading, all mid-breath.
- Tap re-phasing: taps are recorded as events. A tap advances the lead to
  the next exposure; at tap time the phase delta that puts that exposure
  at its breathing peak at tap+4 s is computed and stored, and Phi_i(t)
  is the sum of stored deltas eased by smootherstep((t - tau)/4). Any
  frame is therefore a pure function of (recorded tap events, t); the
  shift is a slow re-phase, never a cut.
- Clock: elapsed time from `performance.now()` only, never `Date.now()`;
  frame one is the synchronous `draw(0)` at load. rAF is typeof-guarded.
- Border: `MAGIC AND LOSS · ` repeated by measured text width along all
  four sides (sides rotated), in bone at alpha 0.82. Corner glyphs are
  stroke-drawn in glyph red: triangle (top-left), circle-with-cross
  (top-right), triangle-over-cross sulfur (bottom-left), mercury
  crescent/circle/cross (bottom-right). The border phrase is the only
  visible text besides the `<title>`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with
  `cmp` — identical, before and after the fix below; duplicate deleted.
- First read-back failed the gate visually: the polygon parts of the
  portrait (skull, face planes, chest, collar, nose, jaw shadow) were
  missing; only the parts drawn with explicit pixel-scaled calls showed
  (stripes, sunglasses band, hand, mouth). Cause: the `poly()` helper
  plotted unit-space coordinates as raw pixels, collapsing those shapes
  to sub-pixel size at the centre. Fix: `poly()` now scales its points by
  u. All renders redone and re-verified.
- Final read-back: desktop and thumb show the sepia-black field, the
  MAGIC AND LOSS border on all four sides, red glyphs in the four
  corners, and the ghost portrait at centre — ruin stripes behind the
  head, brow plane and dark sunglasses band across the eyes, nose wedge,
  lit face plane, chest block with dark collar V, and the pale hand with
  four fingers resting on the chest; the four registrations are visible
  as soft double edges. Mobile (390x844) holds the full frame with
  nothing clipped.
- Deviations: none from the brief. Two recorded choices: (1) tones are
  ground-to-bone mixes of the three palette colours rather than flat
  single-alpha bone, because four exposures of one flat tone cannot read
  as distinct planes; (2) the tap cycles the lead exposure in fixed
  order (1-2-3-4) instead of choosing by tap position, keeping the
  re-phase rule simple and predictable.
