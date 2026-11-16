# №1808 "The Long Wire", PH1 (PP1055), #237 paul-panhuysen

Date: 2006 · 12 · 24. Gallery note: "Drag along the wire; it answers lengthwise, never plucked."

## Build

A dim chapel interior in Canvas 2D. Near-black room with a stone floor (perspective seams converging on a vanishing point left of center), a high dark ceiling band, a tall rounded arch in the back wall left of center, and a far column on the right. Two tungsten light pools sit on the floor with faint warm shafts falling from the ceiling fixtures. One cold-silver wire spans the room diagonally from lower left to upper right, with a bolt in the wall at the lower anchor and a bracket on the far column at the upper anchor. Three dimmer background wires cross behind, unplayed. Seeded dust motes drift in the light.

Wire geometry (room fractions): lower anchor (0.07, 0.84), upper anchor (0.93, 0.16). The room is a centered 5:4 interior on desktop and full-bleed on phones.

## Interaction and the shimmer/glow laws

Drag is the instrument. Pointer events project the pointer onto the wire segment; a press more than 26 px from the wire is ignored, and a move that drifts more than 40 px off the wire injects nothing, so sideways drag does nothing. Only lengthwise travel along the wire records samples.

Each recorded drag sample holds its time, its position along the wire (0 to 1), and the accumulated stroke length at that moment. Shimmer and glow are closed-form functions of piece time and those samples:

- Shimmer: for each sample, wavefronts travel away from the fingertip in both directions along the wire. Wavefront distance is speed times age, with speed 0.30 / (1 + 2 * stroke length) wire fractions per second, so longer strokes slow the wave. The envelope width is 0.03 + 0.10 * stroke length, so longer strokes widen it. A near-field term hugs the fingertip and fades in about two seconds; the travelling term decays over about five seconds.
- Glow: a dull-amber accumulation field, sum over samples of 0.8 * exp(-distance / 0.06) * exp(-age / 4), so it builds where the finger lingers and decays over several seconds after lift.
- The fingertip itself draws as a small dull-amber radial glow while the finger is down.

The wire never vibrates transversely. There is no pluck, no performer, no click-to-reload, and no audio.

## Deviations from the prompt

None in behavior. Per the spec's adaptation flag, there is no live wave-solver integration: shimmer envelopes and glow are closed-form functions of piece time and recorded drag positions, so frame one stays byte-comparable. The prompt's "one primary wire as a line primitive with a longitudinal wave solver" is realized as the closed-form travelling-envelope sum described above, drawn as 240 wire segments whose brightness varies along the length.

## Frame one

Fixed phase at t = 60 s, pre-drag: no fingertip, no shimmer, no glow. The wire sits quiet in its ambient state. All randomness is seeded (mulberry32, seed 1808); no Date.now or Math.random affects frame one.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script:

- Desktop 1280x900: dim chapel reads clearly, tungsten pools on the stone floor, cold-silver wire diagonal lower-left to upper-right with bolt and bracket anchors visible, three dimmer background wires, arch and column giving depth, title and date top-left, hint bottom-center.
- Mobile 390x844: full-bleed room, wire diagonal steep across the frame, anchors visible, plates fit, no clipping.
- Thumb 720x720: same composition as desktop, wire and anchors legible at small size.

One fix round: the first gate showed the warm light shafts as heavy solid trapezoids with hard bottom edges on the floor, so their alpha was cut from 0.035 to 0.022, they were narrowed, and they now end at the floor line. All three sizes were re-gated after the edit.

Determinism: the 1280x900 render was produced twice from the final file and the PNG bytes matched.
