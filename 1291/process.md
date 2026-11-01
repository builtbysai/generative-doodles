# №1291 "Suspended Canopy" (swapnaa-tamhane ST4, PP458)

## Prompt

3-5 long indigo-dyed cloths hanging from the top of the frame, draping down
and folding at the floor like the Achadiya II/III/IV gallery installation
(Sobey 2025, NGC photo). The cloths carry ghost-resist marks and mirror
dots; the whole piece is a drawing made of hanging fabric.

Palette (verbatim): deep indigo #1E3A5F; pale ghost #B9C8DA; dark fold
shadow #101F36; mirror glint #E8EEF4; raw cotton #E7DCC6 (a hem here and
there); cable/rod black #14161A.

## Build

- Four cloths hang from a single suspension line at 15% of frame height,
  with thin black cables from each cloth top edge to the frame top. Width
  units 1, 2, 1, 1.2, so one cloth is double-width. Ends pool and fold on
  the floor line at 84%.
- Each cloth is a verlet ribbon mesh (8 columns x 24 rows). The top row is
  pinned to the suspension line. Ghost-resist marks (diamond outlines,
  crosses, dash clusters, rings in pale ghost at low alpha) and mirror dots
  (flat diamonds, 2-4 per cloth) are stored in mesh (u, v) coordinates and
  interpolated bilinearly, so they deform with the cloth.
- Fold shading is translucent dark strips following interior mesh columns;
  pooled tails get shallow dark ellipses hugging the floor line. Raw cotton
  hems run along the last mesh row of two cloths. Everything matte and
  flat: no gradients, no shadowBlur, no filters, no offscreen canvas.
- Motion: fixed-timestep (1/60 s) verlet simulation in the rAF loop from
  the seeded initial state. Horizontal drags record wind impulses that
  decay exponentially (tau 1.5 s); a slow idle sway (sine wind per cloth
  phase) continues otherwise. Hems lift slightly under air current and
  settle with damped oscillation. Floor collision clamps pooled tails to
  the floor line with friction.
- Determinism: frame one draws synchronously at exactly t = 0 via a boot
  flag; the performance.now() clock starts only with the rAF loop
  (typeof-guarded, never reaches frame one). Seeded mulberry32 RNG (seed
  1291); no Math.random anywhere.

## House adaptations

- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; field-like composition goes full-bleed on phones
  with the page ground in the piece's own background color.
- Dots drawn as paired arcs with a moveTo first, and mirrors as paths
  (node-canvas batched-arc quirk avoided).
- No visible text except `<title>`; silent; no getUserMedia/microphone;
  never click-to-reload.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected.
- Frame one: four indigo cloths (one double-width) hanging from the
  suspension line with cables to the frame top, ghost marks and mirror
  diamonds across the cloths, pooled tails and shallow fold shadows at
  the floor line. Mobile holds the same read full-bleed.
- Thumb rendered three times at 720x720, `cmp` byte-identical, and
  re-verified after the fix round.
- Fix round: the first pooled-tail fold shadows were full circles that
  read as giant blobs on the floor; replaced with shallow ellipses
  (vertical scale 0.08) hugging the floor line, re-rendered and
  re-inspected at all three sizes.
- Physics probe (node harness with a fake rAF clock): 200+ simulated
  frames ran without error; a horizontal drag injected through the
  piece's own pointer handlers; the simulated frame shows gentle sway,
  hems lifting slightly, ghost marks deforming with the mesh, and no
  cloth interpenetration or explosion.
- Token scan clean except a comment stating no Math.random is used and
  the typeof-guarded performance.now() calls inside the rAF loop only.
