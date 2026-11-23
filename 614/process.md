# №1941 Melting Ice, Microscope

Prompt block: KD6 / PP1188, study #253 kit-downes.

Driver, in one sentence: a field of melting ice seen through a microscope in icy blues, with translucent pools breathing open, dark speck clusters drifting low like sediment, thin white thread-lines sweeping diagonally, and a faint cold glow where the melt is most advanced, while a drag stirs the melt warm under the hand and a tap freezes one irregular crystalline bloom at the tap point that stays as a permanent record in the melt.

## Palette

The study file studies/kit-downes.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: ice blue #b3d4e6 deepening to #8fbcd8 at the bottom of the field, pale cyan #dceef5 at the top and #cfe8f2 for the translucent pools, deep indigo #232a4d for the speck clusters with pale specks #7fa8c8, thread-lines in white #f4f8fb, the glow in cold white #eef6fa. Plate ink is deep indigo #1e2a5a on the light field; the hint sits on a cold-white pill #eef6fa so it stays legible over the sediment specks.

## Mechanism

- Melt field: a temperature per cell in spirit, realized as a global melt factor plus local drag heat. The melt factor breathes 0.32 to 0.68 on a slow 0.03 rad/s sine, so the field never fully melts and never fully freezes; pool radii and the glow track it.
- Specks: 140 particles with seeded anchors and five sediment cluster centers low in the frame (y 0.62 to 0.90). Each speck's position is a pure function of t: it drifts between its anchor and its cluster center on a clump factor of 0.5 plus 0.3 sin(t * 0.045 + phase), with a small slow wobble.
- Threads: 8 thread agents on slow diagonal drift, near -32 or +38 degrees, each a 6-segment polyline swaying at 0.08 rad/s with a whole-thread drift at 0.02 rad/s.
- Glow: a radial cold-white gradient at the hotspot (0.36, 0.70), alpha 0.10 plus 0.14 times the melt factor, brightest where the melt is most advanced.
- Interaction, drag: pointer movement drops heat events along the path (capped at 60). Heat at a point decays over 9 s and falls off with distance; it swells nearby pools, adds a soft local glow, and scatters specks away from the path with a push that decays over 3.5 s, after which the specks re-clump toward their clusters. The field warms under the hand.
- Interaction, tap: a pointer down and up with under 8 px of movement seeds a crystal growth agent at the tap point with a fixed radius of 0.075 times the smaller stage dimension and indefinite persistence (capped at 12 blooms, oldest dropped). The bloom is an irregular five-branch dendrite with varied branch angles and lengths from a seeded PRNG, so it reads as a crystalline bloom under glass, not a snowflake.
- Audio: visual only, no WebAudio. No click-to-reload; neither interaction reloads.

## Determinism

- FIRST_T = 20. At t = 20 the melt factor is 0.60, so the pools are open but the field is nowhere near fully melted; specks sit partway clumped toward their sediment clusters; the glow is visible at the hotspot; threads are mid-drift across the diagonals.
- Seeded PRNG mulberry32(1941), one fresh instance per draw for speck, pool, and thread placement; every frame is a pure function of t plus the interaction state, which starts empty, so frame one is fully reproducible. Drag heat and tap blooms are the only state, and they only exist after interaction.
- All motion runs under 0.12 rad/s, far under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?seed= to vary the field, and ?sx= with ?sy= together to freeze one bloom at that fractional position at load. window.__draw is exposed so a probe harness can drive draw() with a virtual clock, and window.__piece1941 exposes crystals(), heatEvents(), redraw(), and firstT.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its pill on all sizes, field full-bleed on the phone and square on desktop, speck clusters sit low, threads cross diagonally, glow visible low left of center.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 528f235ee3fffe77953e85cdcc158b1e). The probe harness default render reproduces the same md5.
- Drag probe (probe harness evals the actual script, dispatches pointer events through its own canvas listeners, advances the virtual clock via window.__draw): no interaction md5 528f235ee3fffe77953e85cdcc158b1e; drag from (360,360) to (500,300) with 10 heat events, redrawn at t = 22, md5 4e1ff32ef964bd1410552c5428ec0bba, with a warm glow along the drag path, swollen pools, and scattered specks. Different from the default frame.
- Tap-freeze probe: tap at (450,450), redrawn at t = 21, md5 c33acc66aa86059d516aa183201d2006 with one locked crystal at the tap point; redrawn again at t = 60, md5 7baff2ac3d966885d7421436014db947, the crystal still locked at the same spot while the field moved on. ?sx=0.62&sy=0.42 probe md5 bbe99e443ef5807ac6f7d347040dfb9f with one bloom at load. ?seed=7 md5 bd8cf2dbf34c87ab37f6843b06bbbf38, a different field from the default.
- No em dashes in visible copy or in this file.

## Fix rounds

1. The first tap-freeze probe showed a perfect six-fold dendrite that read as a snowflake pictogram, which the prompt forbids. The crystal is now an irregular five-branch dendrite with varied branch angles, lengths, and side-branch stations from the seeded PRNG, so it reads as a crystalline bloom under glass. Re-probed; the bloom is visibly irregular and the thumb md5 is unchanged, so frame one was unaffected.
2. The first drag probe showed an oversized washed-out bright blob: ten overlapping heat glows at radius 130 and pools swelling by up to 0.5 times the local heat. Heat glow alpha dropped from 0.14 to 0.10 and radius from 130 to 110, and the pool heat factor dropped from 0.5 to 0.35. Re-probed; the warming is now localized along the drag path and the thumb md5 is unchanged.

## Deviations from the prompt

- The prompt calls for a melt field with temperature per cell. The piece implements temperature as a global breathing melt factor plus per-point drag heat rather than a simulated cell grid; the visible behavior matches the prompt (pools open where warm, glow where melt is most advanced, drag warms locally) without a grid that would add nothing the eye can see.
- The prompt names no pool positions, cluster positions, thread paths, or crystal shape; the seven pools, five sediment clusters, eight thread paths, and the irregular dendrite form are invented staging for the named colors and composition.

## Known warts

- The drag-warmth glow is still a broad soft band along a long drag path, since ten overlapping glow spots merge; it reads as warming, not as a sharp trail.
- On desktop the square stage blends into the page ground at the top, since the body background matches the field's pale cyan; the piece has no visible frame edge on the top side.
- A thread passes close under the title on the phone size, though it does not strike through the text.
