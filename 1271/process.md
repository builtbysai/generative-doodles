# №1271 "Mamabot Assembly" (sdk-forsale SF8, PP430)

## Prompt
A tender, awkward robot assembled from picture frames, each holding a
procedural memory panel (a sepia interior, a child's crayon drawing, a
folded letter), tea-stained and edged with sumi ink. The whole body is
wrapped in paper skin that breathes. It performs caretaking motions —
tidying, reaching, rocking — on loop, automatic, a little weary.
Palette: frame walnut #5A4632, print sepia #C9B48A, paper-skin #E4D9BE,
sumi #26241F, tea #A87F3F, ground #17140F. Square, robot centered, full
body visible, dark ground with a soft spotlight pool.

## What was built
A single self-contained index.html, silent, no external assets. The robot
is drawn from walnut frames: head frame holding a crayon panel (sun,
house, wobbly ground line), torso frame holding a sepia interior panel
(window, table, rug), two arm frames holding folded-letter panels
(fold lines, tea stain, stamp), and walnut leg struts. A small tea-colored
book sits on the ground to the right, the thing being tidied toward.
The spotlight pool is layered flat-alpha ellipses, never a gradient.

## Mechanics (all closed-form over piece time and recorded events)
- Caretaking loop, 36 s: 0–12 s reach (right arm swings out toward the
  book), 12–24 s tidy (both arms sweep inward across the torso), 24–36 s
  rock (whole body leans ±0.035 rad with a small vertical bob). Phase
  weights ramp over 1 s at each boundary so the cycle joins seamlessly.
- Breathing paper skin: a translucent #E4D9BE shell with stitch dots is
  drawn over head, torso, and both arms, its alpha (0.10 ± 0.035) and
  scale (1 ± 0.012) driven by a 4.5 s sine.
- Drag a limb: pointerdown near an arm starts recording the pointer path
  relative to that arm's anchor; on release (if moved more than 12 px)
  the path becomes that limb's motion clip, replayed on a 6 s loop as a
  positional offset. The limb's cyclic angle is suppressed while a clip
  is active.
- Double-tap: appends a new small memory frame stacked along the
  torso's right side (panel type cycles sepia interior / crayon / letter
  by seed; capped at 4, oldest replaced past the cap).
- Frame one is drawn at a constant phase (t = 0): reach weight 0, arms at
  their weary base angles, skin at mid-breath. The rAF loop is anchored
  as offset + elapsed-since-load; nothing in frame one reads the clock.

## House adaptations
- No visible text except `<title>`: the prompt specs no text, so there
  is no hint line. No typed input exists in a canvas piece, so no
  typed-name or typed-word mechanic is needed here.
- No audio anywhere; no getUserMedia; no gradients, filters, shadowBlur,
  offscreen canvas, or element creation (node-canvas QA constraints).
  All randomness is a seeded integer hash; dots are paired arcs with a
  moveTo before each batched arc (node-canvas ellipse/arc quirk).
- Phone: centered geometric piece keeps its shape; page ground is the
  piece's own background #17140F. Verified whole at 390 wide.

## QA
Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Thumb rendered
twice and byte-compared identical, re-verified after the final edit.
Token scan: 0 hits for Math.random, createElement, AudioContext,
getUserMedia, shadowBlur, gradients. Mid-cycle probes (temp copies,
discarded) confirmed the motion: t = 15 shows both arms swung inward in
the tidy phase, t = 27 shows the whole body leaned in the rock phase.
The first t = 18 / t = 30 probes landed on sine zero-crossings and read
as still, which is the cycle working as designed, not a stall.
