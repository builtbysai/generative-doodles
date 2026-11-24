# №858 Cursive Over the Gate

CK4 / PP1258, study #262 colton-kempf. Formula date 2004 · 05 · 18.

The driver, as a felt phenomenon: the camera walks a dark street
toward a lit venue while gold names drift past like credits that
cannot decide what they are.

## Build

- First frame: FIRST_T = 15 s into a 120 s cycle. The approach
  parameter u is a closed-form loop over t (0.5 + 0.48 sin), so
  frame one is deterministic. Drag adds an offset to u; on release
  it eases back to the loop with a 1.5 s time constant.
- Layers by depth: night sky with 42 slow-twinkling stars and a
  distant rooftop silhouette (barely moves), brick railway arch
  (half-width 188 px at u = 0.02 growing to 491 px at u = 0.98 on
  the 828 px desktop stage), venue facade inside the arch, spiked
  fence in the mid layer, gold cursive names in the foreground.
- The venue: two door panels standing ajar late in the approach
  (gap 0 at u = 0.5, 117.6 px at u = 0.98), warm light spilling
  from the gap onto the street, one lamp over the doors whose glow
  grows with u. No interior is ever shown, only light.
- Names: "Mara Voss" (u 0.05 to 0.45), "The Low Frequencies"
  (u 0.35 to 0.70), "A. K. Bell" (u 0.60 to 0.90), each sweeping
  right to left at its own depth and height, fading in and out at
  its window edges. "The Arches" arrives last, large, over the open
  doors, alpha 0 below u = 0.85 and 1.00 at u = 0.98.
- Hand-painted placard fixed to the arch pier ("TONIGHT / doors 8
  o'clock"), readable mid-approach, fading in after u = 0.12 and
  out past u = 0.68 as the camera passes it.
- The spiked fence passes across the frame with u and clears
  entirely as the camera reaches the doors.
- Caption plate top left (№858 · Cursive Over the Gate, 2004 · 05 ·
  18) and hint bottom center (Drag to walk to the doors.), drawn
  in-canvas in the template's place.
- Canvas 2D only. Audio is visual-only in this gallery: no real
  WebAudio anywhere in the piece. No click-to-reload. No em dashes
  in visible copy. Star twinkle runs on a 7 s period, far below the
  14 Hz flicker limit.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected, plus a 1280x900 frame at
  t = 45 (u = 0.98) to check the open doors and venue name.
- Time probes (node harness, /tmp/probe858.js): loop u 0.500 at
  t = 15, 0.980 at t = 45, 0.500 at t = 75, 0.020 at t = 105;
  door gap 0.0 / 117.6 px and venue-name alpha 0.000 / 1.000
  between t = 15 and t = 45. Pixel diff between t = 15 and t = 45
  frames: 53.60%.
- Name probes at t = 15: at u = 0.2 only "Mara Voss" is visible
  (alpha 1.00, x = 0.28); at u = 0.5 only "The Low Frequencies"
  (alpha 1.00, x = 0.35); at u = 0.75 only "A. K. Bell" (alpha
  1.00, x = 0.39); at u = 0.95 only "The Arches" (alpha 0.93).
- Drag probe: drag to u = 0.02 sets u = 0.020 with arch half-width
  188 px; drag to u = 0.98 sets u = 0.980 with arch half-width 491
  px, door gap 117.6 px, venue-name alpha 1.00. Pixel diff between
  u = 0.02 and u = 0.98 frames at the same t: 55.19%.
- Release probe: after release, 2.5 s of easing moves u from 0.98
  to 0.591 toward the loop value 0.5, offset 0.091 and falling.
- Determinism: two draws at t = 15 differ in 0 pixels.
- Fix round: the first build drew the arch with a broken path
  (a stray lineTo from the end of the crown arc to the opposite
  base corner), which put a diagonal cut across the brickwork and
  the facade clip. Rebuilt archPath as one continuous path (up the
  left pier, over the crown, down the right pier) and re-gated.
  The placard was also moved from y = 0.44 to y = 0.52 so the
  drifting names no longer strike through its text.

## Deviations

- The script font stack (Snell Roundhand, Segoe Script, Brush
  Script MT) has no installed match in node-canvas, so the QA
  renders show the names in a serif fallback. In a browser the
  stack resolves to a real script face where one is installed.
- At u near 1 the venue name sits over the bright door gap, so
  "The Arches" reads gold on gold for a moment; a dim gold glow
  underlay keeps it legible, and the effect is kept as drawn.
