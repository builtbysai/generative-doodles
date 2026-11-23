# №1993 Built Around the Crack: process notes

SN2 / PP1240, study #260 syd-nuku. Drag-earned.
Gallery date: 2007 · 06 · 27. Hint: "Drag to tilt the room. Release to let it settle."

## Build

- Template: live `1991/index.html` structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, full-bleed room on phones / square on desktop, one
  synchronous frame at load, requestAnimationFrame guarded by typeof check).
- The room is a mesh of quads: ceiling, floor, two side walls and a back
  wall meeting at corners that shift with the drag lean (up to about 5%
  of the stage). Posters, the door and the hanging lamp are placed by
  bilinear interpolation inside their wall quads, so they warp with the
  room. The bed and armchair are fixed in stage space, and all four
  figures are anchored in stage fractions, so a drag leans the walls
  while the figures stay crammed in place.
- The crack is a jagged glowing polyline (wide soft glow, medium seam,
  bright core) running from the top edge across the ceiling, over the
  back-wall top edge, then down the left wall seam to the floor. Its
  endpoints are recomputed from the warped back-wall corners every
  frame, so the seam re-fits the wall under drag. It is light only: no
  horror cues, nothing supernatural.
- Four figures in pyjamas: A on the bed left holding a small keyboard
  (dark slab, nine white keys); B on the bed right with one red leg
  sliding off the bed edge; C upright at the right with bent yellow
  legs and bare feet up on the door panels; D folded into the armchair
  with knees drawn up. Palette: small-blue paint, warm lamp tungsten,
  toy reds and yellows, the crack glowing pale.
- Motion: slow breathing per figure on 4.4 to 5.9 s sines, one knee
  sliding off the bed over seconds 8 to 16 and pulled back over 16 to
  26, 22 seeded dust motes drifting in the crack light. No flashing
  anywhere; all motion is slow.
- Drag: pointer down and move set the lean target from the pointer
  position (clamped to 0.9); the warp eases toward it at 0.18 per draw
  and snaps when within 0.0005. Release returns the target to rest and
  the room eases back. No click-to-reload. No audio. No em dashes in
  visible copy.
- Title/date plate drawn on canvas: "№1993 · Built Around the Crack"
  and "2007 · 06 · 27" top left, hint bottom center.

## Determinism

- FIRST_T = 12 s, cycle = 60 s.
- At t = 12 the knee slide factor is 0.50 (mid-slide, halfway off the
  bed) and breathing is mid-cycle, so frame one shows the room caught
  mid-breath with the knee already slipping.
- No wall-clock or random seed at load; all motion is a pure function
  of t, and the warp is a pure function of the drag target.
- Determinism check: rendering t = 12 twice gives identical md5
  (c9766a5f2ed3acfa4ea9bb8559b22f4d).

## Probe results (probe-1993.js, desktop 1280x900 renders)

- t = 12 md5 c9766a5f2ed3acfa4ea9bb8559b22f4d (twice, identical);
  t = 42 md5 3da6d92c9f85ddf46b917fe52d3f2d0c.
- Pixel diffs (threshold > 8 per channel, 1,152,000 px total): t12 vs
  t42 4,309 px changed (0.37%). Knee slide factor 0.500 at t = 12,
  0.000 at t = 42: the knee is off the bed at frame one and back at
  rest by t = 42.
- Drag probe (pointer to stage 0.85, 0.20, 25 frames): warp eased to
  (0.626, -0.536) against a target of (0.63, -0.54); rest vs dragged
  79,705 px changed (6.9%). All 10 sampled figure anchor pixels
  (heads, torsos, keyboard, sliding knee) were byte-identical under
  drag, while back-wall corner, crack-top and poster samples all
  changed: the walls lean and the figures stay put.
- Release probe (pointerup, 60 frames at t = 12): warp returned to
  (0, 0) and the render md5 matched frame one exactly
  (c9766a5f2ed3acfa4ea9bb8559b22f4d), 0 px differ.

## Fix rounds

1. First gate: the hanging lamp overlapped the red striped poster and
   read as part of it; figure C's legs read as two thin poles; figure D
   was mostly hidden behind the armchair back; the rug sat under the
   hint. Moved the lamp to the clear ceiling span between the posters,
   gave figure C bent legs with visible knee joints, raised figure D so
   head and shoulders read over the chair back, and moved the rug left.
2. Re-gated fully after the fix: desktop, mobile and thumb re-rendered
   and inspected; probes re-run on the final file. No edits since.

## Deviations from the prompt

- None in content. The bed and armchair are fixed in stage space
  rather than warped with the floor, so the figures sitting on them
  never shift under drag; the floor warp is small enough that the seam
  between furniture and floor stays plausible at full lean.
- The date line "2007 · 06 · 27" is drawn under the title as part of
  the title plate (house rule), though the prompt itself carries no
  date text.

## Known visual warts (honest)

- On phones the portrait stage stretches the figures taller, so heads
  read small against long torsos and the keyboard reads small.
- Figure C's raised legs still cross the front of the red torso; the
  knee joints now read, but at thumb size the legs can still suggest
  sticks before the feet on the door register.
- The rug is mostly hidden behind the bed on tall phones, and the hint
  sits over its edge on desktop.
- The crack glow wash is a soft radial disc, so at desktop size a
  faint pale halo is visible around the seam's middle.
