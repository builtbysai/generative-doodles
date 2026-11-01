# №1110 — Deep Time Archive

Daniel Franke study block DF7 (Planned Deep Time, 2021–ongoing). Title per the block's Title suggestion: "Deep Time Archive".

## The piece

A vertical archive of generated strata that fills the frame full-bleed on archive black `#07080A`: horizontal bands in rust, ash, mineral teal and bone, each band a seeded mineral/organic texture (warped horizontal strips, a speckle field, vein polylines, posterized tone steps), every band edge ruled with a dark hairline. The dataset is messed up and wears it openly: near the top of the archive — the recent, technological strata — bands are cut into horizontal slices that sit at shifted x-offsets and mismatched tone steps, one slice smeared horizontally, one strip ghost-repeated at low alpha, thin banding lines and gold `#E8A020` glitch ticks scattered through. Corruption density is a falling function of band depth, so the deeper (older, more geological) strata run stranger in tone but cleaner in signal. A tiny mono readout bottom-left gives the current depth in years (`−18,576 yr` at frame one), mid-window.

## Mechanism (closed form in t + recorded events, no frame-integrated state)

- The archive is an infinite seeded band sequence. Thicknesses repeat with a 64-band period (cumulative table, ≈0.125 stage units per band, boundaries roughly every 1/8 of frame height); any material coordinate resolves to a band by period arithmetic, valid in both directions forever. Textures are hashed from the absolute band index, so nothing visibly repeats.
- Depth U(t) is closed form: a slow idle sink (the present sinking into the past, 0.001 material units/s, floored) plus the drag offset. Drag deltas are recorded as step events whose contribution is `d · (1 − exp(−(t−tᵢ)/0.15))` — an analytic ease, summed over the event list; fully-ramped events fold into a base constant so the list stays short. Years = material × 10,800.
- Band textures are pure functions of (band, rect, warp), warp phase driven by U so contents subtly morph while scrolling. Corruption artifacts (slice count/offsets/steps, smear slice, ghost strip, banding lines, tick count/placement) are hashed from (band, slice, corruptGen).
- Frame one is a synchronous draw at fixed phase t = 60 s: eight-plus bands visible, the upper ones (rust, bone, ash) visibly sliced, stepped and gold-ticked, the deeper teal running cleaner, readout at −18,576 yr.

## Interaction

- DRAG vertically = scrub deep time: drag up to go deeper (further back), drag down to return toward the present; the readout counts in years as you go. Depth is time.
- TAP = core sample: the stratum under the tap is extracted as a floating tile, center-right, its face re-rendered from the same band texture function at tile scale (no snapshot, no offscreen canvas), slowly swaying/rotating, labeled beneath in tiny mono with its depth (`SAMPLE −… yr`); it fades after ~24 s or on the next tap.
- DOUBLE-TAP = mess the dataset: bumps the corruption generation, re-hashing every artifact placement in the visible archive. Never click-to-reload.

## Sound

A low geological drone (two sines through a 240 Hz lowpass) whose pitch deepens with depth (`f = 30 + 38·exp(−U/9)`) starts lazily inside the first visitor gesture, typeof-guarded WebAudio, never autoplay. The visuals are complete without it.

## House compliance

Visual Viewport canvas sizing with resize listeners on visualViewport and window; canvas CSS size pinned in draw(); phone detection via window.screen (min dimension < 700) with aspect fallback; strata full-bleed across the square stage. No offscreen canvas, no canvas gradients, no ctx.filter, no shadowBlur, no createElement, no microphone. Visible text limited to the depth readout and the sample label.

## QA

Rendered with the house renderer at 1280×800, 390×844, and 720×720. Frame one read: full-bleed strata (rust / bone / ash stack / bone / teal / bone), slice seams and posterized steps legible in the upper bands, gold glitch ticks present and thinning with depth, tiny gray readout bottom-left; mobile holds the same square composition centered. One refinement round: slice offsets were raised, per-slice tone steps and seams added, the ghost strip strengthened, and band-boundary hairlines ruled in, after the first render's slice shifts read too faintly. Thumb rendered twice and byte-compared with cmp: identical; duplicate deleted.
