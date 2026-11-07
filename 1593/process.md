# №1593 One Hundred Eighty Degrees

Driver: a single translucent ribbon tumbles through space, and the whole piece is the one place where it twists 180 degrees and the gradient flips.

## Mechanism

Canvas 2D only. A parametric Mobius strip (256 segments along U, 8 across V, one twist) is projected with a simple 3D rotation plus mild perspective, and its 2,048 quads are painter-sorted back to front each frame so the translucent band (alpha 0.5) shows itself passing behind itself. Per-segment color along U runs the spec rainbow (teal #2EE8C8 to cyan #7AE8F0 to yellow #E8E84A to pink #F05AA8). The seam sits at U = 0, where the gradient wraps pink back to teal: the seam quads are brightened toward white and a 2px white notch with a soft halo is drawn across the band there, so the flip is the point of the piece. A soft white edge glow follows both long edges, dimming on the far side by depth. Every grid vertex carries a small hand jitter from a seeded mulberry32 (seed 1593); the wrap rule copies jitter from (0, NV-j) to (NU, j) so the seam never cracks. Motion is watch-only by default: a slow autonomous tumble (spin 0.12 rad/s plus gentle tilt oscillation). Drag anywhere tilts the ring plane while pressed (pointer events adjust tiltX/tiltY); release resumes the tumble. Frame one is fixed-phase (t = 52.36, spin angle back to 2pi) so the ring faces the viewer, the seam sits at the right edge where teal meets pink, and the twist pinches the band to an edge at lower left. Reduced motion renders the static frame only. Title, date (2006 · 05 · 23), and hint (Drag to tilt.) are drawn in monospace on the black ground.

## Deviations

None from the spec. Two fix rounds during QA: (1) the first frame-one phase put the ring edge-on, reading as a vertical blade, and the phase was moved so the ring faces the viewer at ~70% of frame; (2) hairline seams showed between adjacent translucent quads, so each quad is now stroked with its own fill color, which also reads as a fine pen-line mesh across the ribbon.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Ring reads as a Mobius band with a visible twist and seam notch, the full rainbow runs along the band, translucency shows where the band passes behind itself, mobile keeps the ring shape on black ground. Drag probed in a harness: pointerdown/move changed tilt from 0,0 to 0.3,0.6 and the frame changed, pointerup released. Thumb re-rendered twice, md5 identical both times.
