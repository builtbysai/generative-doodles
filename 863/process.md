# №863 Inside the Crowd

ZW1 / PP1263, study #263 zach-wolfe. Formula date 2004 · 05 · 23.

The driver, as a felt phenomenon: the stage is only ever glimpsed
between swaying heads. You are standing in the crowd, not watching
it; the red performer, the beams, the haze are rumors that reach
you through the gaps, and the occlusion IS the image. Clearing the
view would break it, so nothing ever clears: the heads stay, the
stage stays half-seen, and the only motion is the room breathing
around you.

## Build

- First frame: FIRST_T = 5 s into a 24 s cycle. The beat pulse is
  2 s, the head sway 12 s, the haze drift 24 s; every period divides
  24, so frame one is deterministic and the frame at FIRST_T + 24
  equals the frame at FIRST_T.
- Three depth planes, drawn far to near. Far: a saturated red stage
  wash centred on the performer, two amber-cored light beams
  converging from the top corners, PA stacks to the right with
  amber-edged speaker rings, and the performer as a small glowing
  red glyph with a mic stand and an amber rim on the lit side of
  the head. Mid: twelve seeded haze wisps, each three faint
  overlapping lobes, drifting across the frame once per cycle and
  bobbing on the 12 s sway period, amber where the edge-light
  catches them, red where the wash does. Near: three rows of
  near-black silhouetted heads (9 back, 7 mid, 5 front), the front
  row large, cropped at the bottom edge, and softened with a faint
  halo so it reads out of focus near the lens. Back-row shoulders
  stay narrow so the red wash shows between the distant heads;
  the front rows close up into a solid crowd.
- Motion: the haze drifts, the red light pulses with an implied
  beat (2 s period, quick attack, slow decay, 0.5 Hz, well under
  the flicker limit), and the heads sway almost imperceptibly
  (12 s period, a few pixels at most, growing toward the lens).
  A thin wisp of haze drifts in front of the heads for depth.
- Watch-only, per the brief: no click, no tap, no clearing. The
  immersion is the system. Visual-only: no WebAudio, no autoplay
  audio, per the Franke rule.
- Caption plate, in the template's place: "№863 · Inside the
  Crowd", date "2004 · 05 · 23", hint "Watch the haze drift."

## QA

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png;
  all three inspected visually. Desktop renders as a square stage
  centred on the near-black ground; mobile is full-bleed portrait.
- Probe renders at FIRST_T = 5 and FIRST_T + 12 = 17 differ in
  the moving elements (haze positions, beat brightness) while the
  heads stay anchored: measured mean per-pixel difference 1.29
  (max 13) in the upper haze/beat zone versus 0.32 (max 6.7) in
  the head zone, and 0.0 in the caption zone.
- Cycle check: the render at FIRST_T + 24 = 29 is byte-identical
  to the first frame (md5 077fbbdb5521bb9743492b7bbad257a3 in the
  first pass, 2bdd6aeff9d6a29115d26df40510178e after the final
  fix round), so frame one reproduces exactly.
- Fix round 1: the first haze pass read as flat solid discs
  (flying-saucer ellipses); rebuilt as smaller, rotated,
  three-lobe wisps at lower alpha. The head rim-light arcs were
  drawn with a mismatched moveTo that left a floating hook
  across each head; the arc now starts exactly at its own first
  point and hugs the head edge. The PA speaker rings overflowed
  their cabinets on narrow portrait phones; radii are now sized
  to the cabinet.
- Fix round 2: the back-row shoulders merged into a solid dark
  band that hid the wash between the distant heads; back-row
  shoulders are now narrower (1.20 head radii) so the red shows
  through, with the front rows still closing into a solid crowd.
- Known warts, minor: the performer is a deliberately simple
  glowing glyph, a stick figure with a mic stand, not a detailed
  body; the red wash falls off to a dark band just above the
  crowd, which reads as the gap between stage and audience; on
  the thumb the front-row heads are very large and black, which
  is the intended out-of-focus foreground. Nothing flashes above
  14 Hz; prefers-reduced-motion renders a still first frame.
