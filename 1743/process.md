# The Bad Speaker, No. 1743

TD8 / PP990, study #228 taylor-deupree. Drag-interaction piece.

Gallery note: "One small mic over a speaker cone. Drag the mic across the cone."

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim: a near-black frame with
one small circle, a warm lo-fi texture shimmering inside it, the texture
changing character as the circle is dragged across the cone.

## Decisions

- Driver: a mic moved across a small speaker cone. The circle is the mic,
  the texture under it is the cone, and dragging is placement, not gain.
- Circle: radius 5 percent of the frame short side, so the diameter is about
  a tenth of the frame, the smallness the prompt insists on. Frame one puts
  it off-center at (0.38, 0.40).
- Texture: a virtual cone field of 90 seeded soft radial-gradient blobs in
  warm amber and muted gold plus 420 low-alpha grain dots, all drawn through
  the circle mask only. The circle is a window into the field: blob screen
  positions are computed from the mic position, so dragging slides a
  different patch of the field under the grille and the texture character
  changes with position. Soft gradients and low alphas are the band-limiting:
  reduced contrast, softened edges, nothing sharp inside the circle.
- Grille: four concentric rings of perforation holes plus a center hole and
  an amber rim, drawn in circle-local coordinates so the pattern stays
  fixed to the circle while the texture slides under it.
- Shimmer: a warm radial glow over the cone pulsing at 0.25 Hz by
  construction (20 second cycle), well under the 14 Hz ceiling.
- Interaction: pointer and touch drag set the target; the mic eases toward
  it at 0.18 per frame. No click-to-reload anywhere.
- Determinism: mulberry32 seed 1743 for every blob and grain dot, frame one
  fixed at t = 10.0 s of the 20 second cycle. The thumb re-rendered
  byte-identical across runs.
- Plates: title, formula date 2006-10-20 and hint on dark plates with an
  amber rule, top-left and bottom-left, ink readable on the near-black
  ground. The centered circle keeps its shape on phones with the piece's
  own ground color.

## Deviations

None from the prompt.
