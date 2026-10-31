# No.714 Slumber Weave

EXPANSION #87 janine-antoni, prompt block 3, "Slumber Weave". Slumber (1993/94): 28 days of EEG-recorded sleep woven into a blanket. The piece is the weaving, not the bed: no literal bed, no person, no EEG machine, no text.

## Concept

A dark night field split in two. Left third: the sleeper, an abstract luminous form (layered flat discs in the sleeper-glow tone, never a gradient) drifting slowly through a field of faint seeded specks, the noise space. Right two-thirds: a loom, a static warp grid between two beams. Across the loom a glowing trace line in the EEG tone is woven row by row into a textile: each trace becomes one weft row of a blanket, 40 rows in all. When the blanket is finished it lifts off the warp, slides left over the sleeper zone under a rising cover shadow, rests, fades, and the sleeper dreams the next blanket.

## Construction

Single self-contained index.html, canvas 2D, strict six-colour palette (night #0E1016, EEG trace #7FD4C1, warp #2A2E3A, weft #8A93A8, sleeper glow #BFD8D2, cover shadow #05070A). Composition lives in a 1000x1000 design space scaled by the smaller viewport dimension, so the left/right split holds at every size.

The sleep signal is the heart of the piece. Per cycle, a seeded mulberry32 stream builds one signal: a sum of four sines with jittered frequencies, amplitudes and phases, normalised to about [-1, 1]. Everything derives from that one function, evaluated, never integrated:

- The sleeper's vertical wander is the signal sampled slowly (plus a two-sine horizontal drift).
- Row i of the blanket is the signal segment recorded over [4i, 4i+4] seconds, drawn across the loom width with amplitude 0.42 of the row height. Adjacent rows join up as one continuous recorded night.
- The sleeper's trail is the same position function sampled at earlier times.

Phase design, one seamless 90 s loop, all phases closed-form functions of cycle time:

- DREAM (0-24 s): the sleeper drifts; the trace records across row 0 in the EEG tone, its drawn fraction equal to dream progress. Frame one is the first instant of this: sleeper at its start position, loom empty, a single trace point at row 0's left edge.
- WEAVE (24-66 s): 40 rows at 1.05 s each. Row 0, already recorded, settles from EEG tone into weft over its slot. Each later row arrives as a shuttle pass: its trace draws across in glowing EEG tone over the first 55% of the slot, then settles into weft #8A93A8 as the glow fades. Completed rows hold at weft alpha 0.88 over the warp.
- COVER (66-78 s): a smoothstep slides the whole blanket 348 design units left off the loom and over the sleeper zone; the bare warp stays behind. A cover-shadow field (#05070A, alpha to 0.62) rises over the sleeper zone and the sleeper's glow dims to 45% beneath it.
- REST (78-90 s): the blanket fades out, the shadow lifts, the sleeper returns to full glow, and the cycle index advances the seed so the next blanket is a different night.

Tap reseeds: the epoch increments, the clock re-anchors, and a fresh sleeper path and trace begin. No drag; never click-to-reload.

Sizing uses the Visual Viewport API with resize listeners on both visualViewport and window; the canvas is pinned in px inside draw() every frame. Phone detection follows the house rule (window.screen minimum dimension under 700 px, aspect fallback). The rAF loop is typeof-guarded; frame one is the synchronous draw at cycle t=0 and is never derived from Date.now(). All state is a pure function of anchored time, epoch and cycle index, so any frame can be reproduced exactly.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Desktop and thumb: night field, layered sleeper glow at left with faint noise specks around it, empty warp grid with beams at right, one EEG point at the trace origin. Matches the frame-one spec.
- Mobile: zones keep their left/right split scaled to the tall frame; sleeper and loom fully in frame, nothing clipped.
- No audio, no microphone, no gradients, no text anywhere except the title.

## Deviations

- The prompt's technical note suggests the sleeper be drawn as a radial glow; the house renderer has no gradients, so the glow is built from five concentric flat discs at falling alpha (0.05 to 0.36) with a slight vertical squash, plus a three-step position trail. Same read, flat colour only.
- The prompt separates the phases as dream, weave, cover; the recording of rows 1-39 happens inside the weave phase as visible shuttle passes rather than during the dream, because the dream phase only has room to record one row at watchable speed. The dream records row 0 live; every later row is still the same sleep signal, recorded segment by segment as it is laid down.
