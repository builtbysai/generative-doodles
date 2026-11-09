# №1647 — Living Caustics (KT8, PP894)

Study #216 kazuhiro-tanimoto, completing EXPANSION #216. Gallery date
2006 · 07 · 16 (formula 2002-01-10 + 1648 days). Gallery note draft:
"Pale water computes its own light through drifting bells. Hold to
read the same water as collage."

## Driver

Interference you can see. Light bends through moving forms under pale
water, and the water itself computes the pattern in real time.

## The piece

A closed-form wave field fills the frame: four moving point sources
emit sine waves across pale blue water while six dark translucent
jellyfish bells drift beneath the surface on slow Lissajous paths,
each bell subtracting a Gaussian bump from the field so caustic rings
form around it. The caustic web is drawn live from the field gradient:
where the gradient is strong, a short line is drawn along the ridge,
with cyan and magenta edges offset 1.6 px either side of a white core,
so the refraction fringes read as spectral color. Bells are drawn as
dark translucent domes with an inner cap and five swaying skirt
threads. Soft white light pools sit under each wave source.

Holding the pointer pulls the renderer into collage mode: the SAME
field is quantized into 24 px blocks in cyan, magenta, yellow, and
black, each block carrying a halftone dot whose size follows the local
field intensity, and the largest bell becomes a bright yellow mass.
The hold crossfades over 0.5 s; the simulation never pauses or
restarts, and releasing returns to water.

## Interaction

Watch-first and autonomous. The earned interaction is the mode pull:
HOLD (pointerdown) to read the same water as collage; release returns
to water. There is no click-to-reload, no settings panel, and the hold
is the only control.

## Determinism

Frame one is drawn synchronously at fixed phase t = 6 s: the bells
are spread, the caustic web is developed, and the thumb shows the
water mode. All randomness comes from mulberry32 with fixed seeds
(1647001); no Math.random anywhere; the rAF loop is anchored as the
fixed phase plus elapsed time since load, never Date.now(). Thumb
rendered twice with the QA harness: byte-identical
(md5 16e96b8f1d6b573d486a961ead614919).

## Acceptance criteria

1. Frame one (t = 6 s) shows pale water, six drifting bells, and a
   developed caustic web with cyan/magenta fringing; the thumb
   re-renders byte-identical.
2. The web is computed live from the moving field, not a looped
   texture; a frame at t = 30 s shows bells in new positions and a
   different web, with the field still developed.
3. Holding crossfades to collage in about 0.5 s; the collage reads
   the same field (web bands visible as yellow/magenta/cyan blocks,
   largest bell as a bright yellow mass); releasing returns to water.
4. No click-to-reload; no em dashes in visible copy; motion is slow
   and flicker safe; reduced-motion visitors get the fixed frame.

## Deviations from the prompt

- The spec calls the bells "dark translucent forms (jellyfish bells,
  drifting rule-blobs)"; only jellyfish bells are drawn, all six of
  them, since the bell domes plus skirts already carry the drifting
  dark-form role and a second form type would split the reading.
- The collage band thresholds were tuned to the measured field range
  (gradient max about 0.105 at t = 30): yellow above 0.058, magenta
  above 0.042, cyan above 0.028, pale above 0.016, black below. The
  bands are documented here because the numbers are calibration, not
  spec text.
- The title/date plate sits top-left and the hint plate bottom-left,
  per the house rule for plates, rather than centered as in the
  previous KT pieces.

## What was avoided

No looping water video; no decorative lens flares; the two modes are
one field read two ways, never two unrelated visuals. No gradients,
no shadowBlur, no offscreen canvas, no audio.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Water mode
reads clearly at all sizes: pale field, six bells with skirts, web
lines with visible cyan/magenta fringes, title/date and hint
("Hold to read the same water as collage.") legible. Interaction
probe (vm-isolated instance, stubbed rAF, piece driven via
window.__probe): hold steps the blend to 1 over 0.8 s and the
collage render shows CMYK blocks with halftone dots and the yellow
mass at the largest bell; a frame at t = 30 s differs from frame one
(motion live) with bells in new positions. Two fresh thumb renders
are byte-identical.

## Fix rounds

None. The first build passed the visual check and the interaction
probe with no changes.
