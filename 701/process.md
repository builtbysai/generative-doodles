# No.701 Petal Shroud

EXPANSION #85 doris-salcedo, prompt block 6 "Petal Shroud" (TASKS.md, verified verbatim).

## Concept

Salcedo's A Flor de Piel (2012): a shroud sewn from hundreds of rose
petals, each one sutured to its neighbours, laid over the dead like a
second skin. This piece renders it as a breathing cloth: a large,
irregular red shroud on a near-black floor, built from flat notched
petals with a single vein line each, stitched together with short
pale thread dashes along the seams. A slow wave travels the cloth
once every 25 seconds, lifting the petals a few pixels as it passes,
the way breath disturbs a sheet. A pointer moving close stirs the
petals near it; they settle when it leaves. A tap reseeds the
arrangement. No roses drawn whole, no drips, no gore: the red is
petal-red, flat and matte.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
  Palette is strict: petal reds interpolated flat between #7A1F1F
  and #A83232 (24 precomputed shades, no gradients), vein #5C1616,
  thread #D8C9A8, ground #0D0C0B. The page background is the ground
  tone, so on phones the floor continues past the canvas edge.
- Shroud outline: a superellipse (exponent 3.2, an irregular rounded
  rectangle) whose boundary radius is modulated by three seeded
  low-frequency sines (3, 7, and 11 cycles around), giving the frayed
  organic edge. A cloth underlay in the darkest petal shade at alpha
  0.32 follows the same boundary, so the gaps between petals read as
  shadowed cloth rather than holes in the floor. Sixteen loose petals
  sit just outside the edge as fray, clamped inside the frame.
- Petal count handling: petals are placed on a loose jittered grid
  (brick-offset rows, jitter plus/minus 0.30 of pitch, 3% of cells
  left empty as hand-placed gaps). Nominal petal length is tied to
  the smaller viewport dimension (0.022 of it, clamped 11-22 px, so
  desktop petals sit in the specced 14-22 px band) and the grid pitch
  is 1.02 lengths. That lands the count at 1,274 petals at 1280x900,
  about 1,000 at 720x720, and about 1,390 smaller petals on a
  390x844 phone, near the specced ~1,200 without hard-coding a count
  that would break at other sizes. Per-petal length varies 0.74-1.14
  of nominal, so neighbours overlap unevenly as hand-sewn work does.
  Each petal is drawn in unit space: a bezier ellipse with a small
  V-notch at the tip and one vein line; base orientation comes from a
  slow seeded flow field over the cloth, with the specced plus/minus
  25 degrees of rotation jitter (wider for edge petals). Draw order
  is sorted back-to-front (top rows first) once per seed.
- Stitches: along each grid seam, where both petals survive, 60% of
  seams (seeded) carry the specced stitch: three short thread dashes
  along the middle of the centre-to-centre line. Stitches are drawn
  after the petals, using the same per-frame draw states, so they
  ride the lift with the petals they join.
- Wave and pointer lift model: all lift is a closed-form function of
  petal position, elapsed time, and the recorded pointer state; no
  integration, no per-frame accumulation. The breathing wave is a
  Gaussian bump in normalised x (sigma 0.10) whose centre sweeps
  from -0.15 to 1.15 of the cloth width over the 25 s period, so at
  t = 0 it is just entering at the left edge and frame one shows the
  first lift only there. Lift maps to scale 1.0-1.12, a 2 px rise,
  and a slight tilt; nothing else about the petal changes. Pointer
  lift: pointer position is recorded with anchored-clock timestamps
  on every pointer event; while the pointer is present its envelope
  is 1, and after it leaves the envelope decays with a 0.45 s time
  constant. Petals within 60 px get a smoothstep proximity weight,
  lifting up to scale +0.10, shifting up to 1.6 px toward the
  pointer, and tilting their tips toward it. Loose fray petals do
  not respond to the pointer. There is no drag: the cloth stays
  where it lies, as specced.
- Interaction: a tap (under 0.3 s, under 6 px of travel) reseeds:
  epoch increments, the whole arrangement rebuilds from the new
  epoch stream, the clock re-anchors. Tapping never reloads.
- Determinism: frame one is the synchronous draw(0) at load, the
  wave evaluated at phase 0. The animation clock is anchored on
  first use (performance.now minus a start stamp) and never read
  from Date. Arrangement, boundary fray, shades, stitches, wave,
  and pointer response (from recorded pointer state) are all pure
  functions of the epoch seed and elapsed time. requestAnimationFrame
  is typeof-guarded; without it the piece simply holds frame one.
- Sizing: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style width/height
  pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700 px), tall aspect as fallback
  only; on phones the shroud widens (0.90 of width, 0.60 of height)
  to fit the tall frame and the frayed outline is kept.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism: thumb.png rendered twice and cmp-compared
  byte-identical; the second render was deleted. Re-verified after
  each of the two fix rounds below.
- Read-backs: desktop frame one shows a large red shroud with an
  irregular frayed outline on the dark floor; individual notched
  petals with vein lines are legible, pale three-dash stitches run
  along the seams, the underlay binds the cloth in the gaps, and
  loose petals sit outside the edge. Mobile refits the shroud to
  the tall frame with smaller petals; nothing is clipped. The thumb
  reads as the same cloth at square size.
- Phase check via the inert ?seed=tNN hook (scratch render at
  t = 11 s, read back, deleted): the wavefront sits mid-cloth and
  the petals in its band are visibly a touch larger and raised,
  confirming the travelling lift; the effect is deliberately a few
  pixels, as specced.
- Petal counts measured with a stub-context runner (scratch,
  deleted): 1,274 at 1280x900, about 1,000 at 720x720, 1,388 at
  390x844.
- Code audit: no Date calls, no Math.random, no createElement, no
  AudioContext, no external URLs, no microphone, no visible text
  besides the title.

## Deviations

- Two small additions, both within the specced palette: a cloth
  underlay in the darkest petal shade (#7A1F1F) at alpha 0.32 under
  the petals, so the loose grid reads as one shroud rather than
  scattered petals; and 16 loose petals placed just outside the
  outline to make the fray literal. Neither introduces a new colour.
- Petal count is approximate by construction (see Construction):
  pitch is derived from petal length rather than solving for an
  exact 1,200, so the count moves with viewport size, landing at
  1,274 on the desktop reference frame.
- The unit petal path runs from y +0.5 to a notched tip at y -0.46,
  so the drawn length is 0.96 of the nominal per-petal length; the
  specced size band is unaffected in practice.
