# №1954 Considered Return

Prompt block: TC3 / PP1201, study #255 tom-challenger.

Driver, in one sentence: a long brown tape strip scrolls slowly with a gold played line glowing along it while the same gestures return above the strip as cold blue ghosts, stretched, folded, and reversed by an invisible editor, and tapping a moment on the strip sends it to the editor, so the played moment and the returned-to moment interfere in one frame.

## Palette

Named colors from the prompt, hand-picked hexes: tape brown #7a5636 with dark edge #5d3f24 and light rim #8f6c42; played gold #e8b23a with bright core #f6cf6e; edited ice blue #7fc4e8 with bright core #b5ddf2; playhead white #ffffff; ground dark brown #2a1d12 to #1a120b; plate ink warm off-white #f2e8d5 with muted #c9b896; hint pill pale parchment #e8dcc8 with dark brown ink #2b2118.

## Mechanism

- Tape strip: a brown band across the full width at y 0.36 to 0.64, with dark sprocket holes along both edges, a light top rim, and faint frame seams every twelfth of the width, like film frames. Field-like composition: full-bleed on phones, square on desktop.
- Played line: a closed-form gesture, a sum of three sines over one cycle of tape, drawn in gold with a glow pass, a mid pass, and a bright core. The strip shows one full cycle, twelve seconds of playing, and the tape scrolls at 0.015 cycles per second, so the line drifts slowly left under the fixed playhead.
- Edited layer: every edit ghosts above the strip in ice blue, with a thin connector down to the moment it came from and a small blue marker at its center. Stretch spreads the segment 1.6 times wider, fold mirrors both halves onto one span centered on the ghost, reverse runs the segment backwards. The newest edit draws last, so it sits on top.
- Playhead: a thin white vertical line at x 0.62 through the strip and the ghost layer, with a small white triangle at the top of the strip.
- Lag gauge: a small timeline below the strip with a gold tick for the playhead and a blue tick for the last edit, plus text stating how far behind the edit lags, in seconds.
- Interaction: tap a moment on the strip to send it to the editor. The kind cycles stretch, fold, reverse with each new edit, so the blue layer gathers all three treatments. At most eight edits; beyond that the oldest drops off. Tap is the edit decision, not a reseed; the strip never restarts, and taps outside the strip band are ignored.
- Audio: visual only, no WebAudio. The improvisation and its edit are a closed-form visual sound model, per the Franke audio rule. No click-to-reload; tap never reloads.

## Determinism

- FIRST_T = 10. At t = 10 the tape has scrolled 0.15 of a cycle, the playhead sits at gesture position 0.77, and two edits are already in the blue layer: a stretch at 0.30 and a fold at 0.62, so the edit lags 1.8 s behind the playhead and the piece reads at once.
- Seeded PRNG mulberry32(1954), fresh instances per draw from the piece number and a fixed salt, used only for the faint ground speckle; the gesture is a closed-form sum of sines, so every frame is a pure function of t plus the edit state, which only changes through interaction, so frame one is fully reproducible.
- Motion is slow: the tape scrolls at 0.015 cycles per second, the ghosts drift with it, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?edit=<x>:<y> to send the moment at normalized (x, y) to the editor at load, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1954 exposes edit(nx, ny), editCount(), lag(t), kinds(), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 10, edits 2, kinds stretch and fold, lag 1.8 s, playhead at gesture position 0.77. Second 720x720 render byte-identical to thumb.png, md5 0cb7dad15f23a54694048a62c8106332.
- Time probe: ?t=14 at 720x720, lag 2.52 s, md5 682441051f7f71aa972ba4bf780795d6, different from frame one.
- Tap probe: pointerdown dispatched at page (245, 360) on 720x720, normalized (0.30, 0.50) on the strip, edits 2 to 3, kinds stretch, fold, reverse, lag 1.8 s to 3.84 s, plate reads Edits 3 of 8, md5 7fb1d32532296e0e5388acb82834879f, different from frame one; the render shows a third blue ghost at the tap point and the blue lag tick moved.
- Second tap probe: pointerdown at page (500, 360), normalized x 0.74, edits 2 to 3, lag 10.52 s, md5 a1c535a79936eb4b392d224a85f63111, different from frame one.
- Off-strip tap probe: pointerdown at (360, 100), above the strip, edits stay 2, md5 0cb7dad15f23a54694048a62c8106332, identical to frame one.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its pill on all sizes, strip full-bleed on the phone and square on desktop, gold played line glowing along the strip, two blue ghosts above it with connectors, white playhead with triangle, lag gauge reading edit lags 1.8 s behind.
- Tap probe render inspected: third ghost appears at the tap point, Edits 3 of 8, lag text reads 3.8 s, blue tick moved left of the gold tick.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render showed the stretch ghost clipped at the left edge, its center at x 0.10 with a half-width of 0.15, and the fold ghost drawn entirely to the right of its marker dot, so the dot floated detached from the loop. Moved the opening stretch edit from gesture position 0.25 to 0.30, narrowed the stretch spread from 1.9 to 1.6, and recentered the fold so both halves mirror onto one span centered on the ghost. Re-rendered: both ghosts sit whole and centered on their dots at all three sizes.
2. The first tap probe harness returned a page rect of (0, 0) for the centered square stage, so a tap at page (216, 360) was read as normalized x 0.375 instead of 0.30 and the reported lag did not match the hand calculation. The harness now mirrors the piece layout when computing the rect. Re-probed: tap at page (245, 360) maps to normalized (0.30, 0.50), lag 3.84 s exactly as computed by hand.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The opening state (stretch at 0.30, fold at 0.62, lag 1.8 s), the scroll rate 0.015 cycles per second, the twelve-second tape cycle, the eight-edit cap, the kind cycle stretch, fold, reverse, and the sprocket-hole and frame-seam dressing are invented staging for the named mechanism, so frame one already reads as an improvisation mid-edit.
- The prompt calls for the edited layer to ghost above the strip and a small marker showing how far behind the edit lags. The marker is realized as a lag gauge with gold and blue ticks plus a text readout in seconds, and the playhead is fixed at x 0.62 while the tape scrolls under it, which keeps the lag readable as a distance.
- The prompt calls for a tape strip of an improvisation with real playing and editing. The piece realizes both as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (gold played line, blue edited ghosts, tap as the edit decision) without sound.

## Known warts

- A ghost whose center scrolls near the left or right edge can still clip slightly at the frame edge before it wraps, since ghosts are pinned to gesture positions that scroll with the tape; the opening stretch edit was placed to avoid this at frame one, but later edits near the edges will clip for a few seconds.
- The fold ghost reads as a small loop rather than an obviously folded line at thumb size; the kind only becomes clear when the visitor taps and compares the three treatments.
- The ghost layer is sparse at frame one, two ghosts in a wide dark band, so the top of the piece reads as mostly empty ground until more edits accumulate.
- The lag gauge ticks sit on a long thin track that is easy to miss at thumb size; the text readout carries the lag more clearly than the ticks do.
