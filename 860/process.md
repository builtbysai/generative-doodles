# №860 Fly in the Face

CK6 / PP1260, study #262 colton-kempf. Formula date 2004 · 05 · 20.

The driver, as a felt phenomenon: extreme closeness, hands cueing
vinyl on a turntable in warm lamplight, a performer's face
half-filling the frame, the camera so near the subject can feel it.
Trust, not trickery. The subject fills the frame edge to edge; no
context, no room. Drag pushes the camera nearer, toward the haptic
edge where the image almost touches. Release lets it settle back.
The closeness is a contract: the subject never flinches.

## Build

- First frame: FIRST_T = 10 s into a 60 s cycle. Every motion
  period (60, 30, 20, 15, 12, 10, 6 s) divides the 60 s cycle, so
  frame one is deterministic and the frame at FIRST_T + 60 equals
  the frame at FIRST_T.
- One intimate scene, edge to edge: a large three-quarter face
  cropped by the right and top edges, closed eye that never opens,
  still lips, hair mass with an amber rim; below it a vinyl black
  turntable with groove rings, an amber label, a tonearm, and two
  abstract hands cueing the record, fingertips on the grooves.
  Palette is warm lamplight amber, skin tones, vinyl black.
- The platter turns one full revolution per 60 s cycle, with a
  soft sheen wedge riding the rotation. The face breathes on a
  slow 30 s drift and the hands sway on a 20 s drift.
- The dolly: drag in any direction pushes the camera nearer, up
  to 1.45x zoom toward the face, with 320 px of drag reaching the
  haptic edge. At closest range a slow 6 s focus breathing swells
  the zoom by 0.012 and a warm glow pulses over the face. Release
  returns the target to 0 and the camera eases back. Dolly is
  interaction state only and never enters draw() except as the
  current value, so two draws at the same time and dolly are
  pixel-identical and the resting loop closes.
- Watch the motion, drag the camera. Audio is visual-only in this
  gallery: the turning vinyl IS the cue, no real WebAudio, per the
  Franke rule. No click-to-reload, no reseed, no wide shot, no
  camera in frame, no surveillance coldness.
- Caption plate top left (№860 · Fly in the Face,
  2004 · 05 · 20) and hint bottom center (Drag to draw nearer.),
  drawn in-canvas in the template's place.
- Canvas 2D only. No em dashes in visible copy. Flicker at or
  below 14 Hz by construction: the fastest motion is the 6 s
  focus breathing, about 0.17 Hz. Reduced motion is respected.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected, plus a 720x720 frame at
  t=40 and a dolly=1 near frame.
- Time probes (node harness, /tmp/probe860.js): dollyScale 1.0000
  at rest, 1.4500 at full dolly; breatheGlow 0.108 at t=10, 0.892
  at t=13; pixel diff t=10 vs t=25 is 0.82%, t=10 vs t=40 is
  0.56% (slow intimate motion: breathing, sway, rotating sheen).
- Determinism: two draws at t=10 differ in 0 pixels.
- Seamless loop: frames at t=10 and t=70 (FIRST_T + 60) differ
  in 0 pixels.
- Drag probe (real pointer listeners): a 320 px drag raises the
  dolly to 0.717 and the near frame differs from the resting
  frame in 61.21% of pixels; after release the dolly eases back,
  reaching 0.0005 after 123 ease steps with the settled frame
  differing from the resting frame in 0.12%, converging to the
  resting frame as the dolly reaches 0.
- Fix rounds: 4. Round 1, the cheek shadow read as a separate
  oval on the face, so it was shrunk. Round 2, the nose read as
  a thin vertical streak and the hand floated off the record, so
  the nose became a broad soft wedge with no nostril dot, the
  cheek shadow was removed, and the hand was rebuilt in one
  rotated frame with fingers reaching the label. Round 3, the
  fingertips read as pale beads, so they were toned to skin color
  and tucked under the palm edge. Round 4, the rotating sheen
  used half the rotation angle, so its frame at FIRST_T + 60 was
  flipped and the loop seam differed in 0.56% of pixels; it now
  turns one full revolution per cycle and the seam is 0 pixels.

## Deviations

- None from the brief. The face and hands are abstract soft
  shapes, not detailed anatomy, per the piece's close, warm
  treatment. The drag works in any direction, not one fixed
  axis, since the prompt says drag pushes the camera nearer
  without naming a direction.

## Known warts

- On the 390x844 mobile frame the turntable is small at the
  bottom left and the second hand is mostly hidden behind the
  face; the face and the cueing hand still read.
- At full dolly the hint sits over the lower face; it stays
  readable in cream on the warm skin.
- The nose is a faint soft wedge by design; at thumb size it
  nearly disappears, which suits a face at this closeness.
