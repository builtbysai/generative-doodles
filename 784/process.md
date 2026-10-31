# No.784 "Two Plateaux"

EXPANSION #96 daniel-buren, prompt block PP1 "Two Plateaux" (verified
verbatim from TASKS.md). Les Deux Plateaux (1985-86, Palais Royal)
reduced to its flat essentials: a diagonal field of black-and-white
striped columns, water pools with coin glints at the lowest bases,
and the classical colonnade behind everything as a whisper.

## Concept

Buren's courtyard is a measuring instrument laid over a classical
site: identical striped columns whose heights fall away across the
grid, some sinking below the visible level into the hidden lower
court. The piece keeps that structure and nothing else. No stone
texture, no sky, no color beyond the specced pool water and coin
glint. The field breathes on a slow tide and answers a drag with
depth parallax; left alone, the tide runs by itself.

## Construction

- **Module.** Every stripe pair (one white band + one black band)
  is frame height / 34, the 8.7cm ratio. A single band is half of
  that, realized in whole pixels (round(frame height / 68)): a
  fractional band height cannot rasterize to the same pixel height
  twice, and Buren's module is absolute, so the band is a whole
  pixel count and every full band in the render measures exactly
  that height. The pair size is derived from the frame on every
  layout, so the module holds at any size.
- **Lattice.** Columns stand on a diamond lattice: two diagonal
  step vectors (0.92s, 0.52s) and (-0.92s, 0.52s), s = frame
  width / 8, crossing at the field's center. Columns are drawn in
  painter's order by base height (far bases first).
- **Diagonal height field.** A column's base height comes from the
  diagonal coordinate d, the projection of its base point onto the
  (1,1) diagonal normalized to [-1, 1] over the frame's half
  diagonal: hNorm = 0.06 + 0.94 * (1 - |d|)^2, with a seeded
  per-column jitter of +/-8% from a stable index hash (identical at
  any frame size). Height peaks on the center diagonal and falls
  along it to stumps at both ends. Base height = hNorm * 0.58 *
  frame height.
- **Edge discipline.** Columns are culled so none crosses the left,
  right, or top edge, even at maximum parallax shift: horizontal
  culling carries a margin larger than the parallax clamp, and each
  column's height is capped by a per-column headroom margin (5-10%
  of frame height, hashed, so capped tops never align into a false
  ceiling). Crossing the bottom edge is allowed and intended: the
  lowest columns run off the frame into the hidden lower level.
- **Stripes counted from the base (deviation, recorded).** The
  prompt's technical note implies one shared stripe measure; a
  first build anchored band phase to absolute frame y, and stacked
  columns at the same x fused into continuous dashed lines, erasing
  the height field entirely. Stripes are therefore counted from
  each column's own base, the way the courtyard columns themselves
  are striped from the ground each one stands on. The module size
  is unchanged; only the phase origin moved. This keeps every
  column a separate object and the diagonal falloff legible. Each
  column is drawn as one continuous count from its base to its
  top, with no segment joins and no phase resets; a top partial
  band is clipped by the column's top edge, never resized. So that
  columns stacked at the same x still agree where their bands
  meet, every base is snapped to an even band index of the shared
  grid counted from the frame's bottom edge (a shift of at most
  one band): any two bases then differ by whole stripe pairs, so
  the same stretch of the shared grid is the same colour in every
  column, and a rear column's surviving bands above a front
  column's clipped top continue the front column's rhythm exactly.
- **Tide.** Height multiplier 1 + 0.16 * sin(2*pi*t/40 - 2.3*d):
  a 40 s wave traveling along the diagonal coordinate, so columns
  rise and fall in sequence down the diagonal. Closed form in
  (d, t); frame one is the synchronous draw at t = 0 with the tide
  at phase 0 and parallax neutral.
- **Parallax.** Three depth layers by base height (near = tallest,
  factor 1.0; mid 0.55; far 0.22). Drag records a target offset
  (pointer displacement * 0.30, clamped to +/-5% of width, +/-3% of
  height); the rendered offset is the exact closed-form integral of
  a first-order lag (tau 0.5 s) over the recorded target spans, the
  same span machinery as the sibling pieces. On release the target
  returns to (0,0) and the field settles back to neutral. No
  frame-integrated state anywhere.
- **Pools and glints.** Up to seven pools sit at the bases of the
  lowest short columns (base between 0.82 and 1.05 frame heights,
  height under 0.34 frame heights), spread evenly across the width
  by x order. Each pool is two flat ellipses of pool water (rim at
  45% alpha, body at 92%) and carries 2-3 coin glints placed beside
  the column, seeded. Glint alpha shimmers on a 7 s cycle, capped
  at 70%.
- **Colonnade whisper.** Three thin horizontal bands of the whisper
  tone at 30% alpha across the upper frame, behind everything.
- **House rules.** Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in px inside draw();
  phone detection via window.screen (min dimension < 700px) with
  the aspect fallback; page ground is the Carrara white. No
  gradients, no shadowBlur, no offscreen canvas, no ctx.filter, no
  audio, no text beyond the title. rAF is typeof-guarded; the QA
  renderer (no rAF) receives the synchronous t = 0 frame.

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with
  cmp: identical. Duplicate deleted.
- First build failed the read-back: frame-anchored stripe phase
  fused stacked columns into continuous full-height dashed lines
  and the height field was invisible; colonnade bands also read as
  solid gray bars. Fixed by counting stripes from each column's
  base, steepening the height falloff (power 2.0, floor 0.06),
  widening the lattice's vertical step, thinning the colonnade to
  three bands at 30% alpha, and spreading pool selection evenly
  across the width. Second pass folded hair-thin top bands into
  the band below to remove sliver artifacts at column tops.
- Final read-back: desktop and thumb show a diagonal field of
  distinct striped columns, tall on the center diagonal falling to
  stumps at the lower right, pools with gold coin glints spread
  across the bottom, the colonnade a faint rumor behind. Columns
  clip only at the bottom edge. Mobile keeps the full field in the
  tall frame, pools and glints visible, nothing clipped at the
  sides or top.
- Gate fix round (fly's gate): the desktop render showed black
  bands of 20-24px against 13px nominal, white runs of 15-20px,
  and hairline slivers at column junctions. Three causes, fixed
  together. (1) The old fold rule: a top partial band under 0.3 of
  a band was folded into the band below, growing that band by up
  to 30%. (2) Stacked columns at the same x each counted from
  their own base, so at a junction a rear column's band remnant
  met a front column's top band at mismatched phases, merging
  into double-thick runs or splitting into slivers. (3) Once
  bases were aligned to the shared grid, a parity defect
  remained: bases differing by an odd number of bands assign
  opposite colours to the same grid stretch, so a rear column's
  bands above a front column's top alternated against the front
  column's own. Fixes: the fold is removed (top partials are
  clipped, never resized); every column is one continuous count
  from its own base; every base is snapped to an even band index
  of the shared grid; the band height is a whole pixel count.
  Also removed a +0.5px fillRect overhang that bled fractional
  rows into bands below.
- Fix verification: column scans of the final renders. Desktop
  (band 13px): seven scan columns, 212 black runs; every full
  black band exactly 13px and every full white band exactly 13px.
  The only sub-height black runs are clipped top partials at
  column tops (9px, 12px, 6px, 10px, each traced to a single
  column's clipped top band); remaining flags are frame margins,
  empty ground between stacks, and pool rims. Thumb (band 11px):
  scanned columns clean, full bands 11px. Mobile (band 12px):
  scanned columns clean, full bands 12px. Determinism re-checked
  after the fix: thumb.png rendered twice, byte-identical.
  Read-back confirms the field, tide phase, pools and glints are
  unchanged; only the band rhythm is now exact.
