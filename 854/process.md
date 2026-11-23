# №854 Paradise Plot

IA8 / PP1254, study #261 iso-attrill. Formula date 2004 · 05 · 14.

The driver, as a felt phenomenon: a small garden plot sits at the
center of the frame like a portrait, growing slowly and continuously
in daylight, foraged things drifting into place around the bed, while
the visitor's drag gently moves the sun across it.

## Build

- First frame: FIRST_T = 15 s into a 120 s cycle. Growth, object
  drift and the sun's loop path are closed-form functions of t, so
  frame one is deterministic.
- Nine plants in three rows on a soil bed, heights following a slow
  sine over the 120 s cycle (0.55 to 1.0 of full height, staggered
  by phase). Four are flowering (pink, yellow, white, orange).
- Eight foraged objects around the bed: two mushrooms, two shells,
  four seeds. Each drifts slowly and fades in and out on the cycle,
  staggered, so the arrangement is never quite the same twice.
- The surround is a soft out-of-focus green built from large
  low-alpha radial blobs, so the bed reads as the in-focus subject.
- Interaction: drag moves the sun; plant shadows lean away from
  the sun. On release the sun eases back to its loop path.
- Watch-only otherwise. No gardener, no meters, no gamified copy.
- Caption plate top left (№854 · Paradise Plot, 2004 · 05 · 14)
  and hint bottom center (Drag to move the sun.), drawn in-canvas
  in the template's place.
- Canvas 2D only. No click-to-reload. No em dashes in visible copy.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected.
- Time probes (node harness, /tmp/probe854.js): plant 0 growth
  0.999 at t=15, 0.752 at t=45, 0.551 at t=75, 0.798 at t=105;
  object 0 appearance 1.000 / 0.423 / 0.000 / 0.577 over the same
  times; sun loop x 0.500 / 0.800 / 0.500 / 0.200. Pixel diff
  between t=15 and t=75 frames: 5.86% of pixels.
- Drag probe: drag(+0.30, -0.05) moves the sun +0.30 in x exactly
  (0.500 to 0.800 at t=15); release returns it to the loop path.
- Determinism: two draws at t=15 differ in 0 pixels.
- Fix round: shells redrawn as domes (first build read as pale
  half-discs); bed widened to 0.07-0.93 on phones so the
  full-bleed mobile frame is not mostly empty green.
