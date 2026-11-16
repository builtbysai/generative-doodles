# No.1815 This Is Not a Triangle of Pascal

## Prompt source

TASKS.md, study #237 paul-panhuysen, prompt PP1062 (verbatim build spec):

Title: PH8 This Is Not a Triangle of Pascal. Visual description: A museum hall, high ceiling, quiet. From the ceiling hang dozens of strings, each carrying colored discs at measured intervals, forming a great triangle in the air: rows of discs widening downward, red, yellow, blue, green, like a Pascal triangle made physical. Below, tripod-mounted devices with small resonators point up at the discs. Slow air currents move through the hall; the strings sway almost imperceptibly, the discs turning to catch the light in sequence, so the triangle shimmers in slow waves. The devices below answer with tiny visible pulses when a wave passes. Palette: White hall, daylight from skylights, discs in saturated primary and secondary colors, tripods in dark metal, strings near-invisible except where they catch light. Composition: The triangle of discs centered, apex near the ceiling, base wide above the floor. Tripods in a loose arc below. The hall's architecture frames the sides. Motion/interaction: Watch-only. Air currents drift through on slow irregular cycles; the disc waves and device pulses follow. The piece is walked around in spirit but the viewpoint is fixed; stillness dominates. Never click-to-reload. Technical approach: Strings as catenary curves with disc sprites at fixed intervals; a slow noise field drives sway phase offsets down the rows so waves travel through the triangle. Discs are billboards that flash as they turn toward the light. Tripod devices pulse on a delay after the wave passes their position. All ambient, all slow. What to avoid: Do not label the rows with numbers or draw the triangle's outline; the numbers are the discs, not text. Do not speed up the air; the shimmer must stay barely perceptible.

## Palette

White hall (#F7F5F0, daylight gradient from #FBFAF7), skylight band, pale columns (#E3DFD6), floor (#D9D4C9). Discs in six saturated colors cycled diagonally by (row + col): red #D7263D, orange #F07F13, yellow #F2C200, green #2E9E5B, blue #1D4ED8, purple #7B2FBE. Tripods in dark metal #2B2B2E with #55555A highlights; strings near-invisible grey #8A8578 at 0.28 alpha. Plates are dark #232326 with pale ink #F7F5F0.

## Behavior

Watch-only; no pointer or keyboard handlers are registered. Frame one is a fixed phase at t = 75 s: the shimmer wave peaks at rows 5-6 (flash 0.99), so the mid-triangle discs catch the light, and tripod 0 pulses (0.62) with its gold ring visible. Air currents are two incommensurate slow sines (47 s and 83 s periods) with phase offsets growing down the rows, so sway waves travel through the triangle; the light wave runs on a 120 s cycle, its phase lagging 0.45 radians per row so the shimmer travels downward. Each tripod pulses on a delay after the wave passes the base row (phase lag 0.35 radians per tripod). Strings are drawn as faint quadratic catenaries from the ceiling to each disc. Reduced motion renders a still frame at t = 75 s. Flicker is by construction far below 14 Hz: the fastest motion is the 47 s sway sine.

## Enumeration

Rows of 1, 2, 3, ... 12 discs, 78 discs total, verified by a node harness that stubs the DOM and canvas, evaluates the piece script, and asserts the per-row counts via window.__probe.discRows(). Harness output: rows [1,2,3,4,5,6,7,8,9,10,11,12], total 78, tripods 5. No row numbers are drawn and no triangle outline is drawn, per the prompt.

## Deviations from the prompt

None material. Two small adaptations: the "slow noise field" is realized as two closed-form incommensurate sines with seeded per-disc phases, which keeps frame one deterministic for the byte gate; the disc flash is a bright crescent plus a soft halo rather than a billboard turn, which reads the same in 2D. On phones the triangle is widened (widest row spans 0.88 of the width instead of 0.68) so the piece fills the tall viewport; the triangle is moved slightly up (apex 0.14 of field height) so the five tripods stand clearly below the base row instead of overlapping it.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three renders inspected visually. Desktop: full triangle, wave band visible mid-triangle, tripods clear of the base row, plates legible, no clipping. Mobile: triangle fills the width, apex clear of the title plate, hint plate legible. Thumb: reads at first glance, wave partway through, one tripod pulsing. Thumb byte-identical across two independent renders (md5 c77bbd29e0084a1c0f0bdac4d2c4e3e0 before the layout fix; final thumb md5 700b90a5a3f6fe49c6d43018bd69bf29, also verified identical across two renders). One fix round: tripods overlapped the base row and the phone triangle was too narrow; triangle raised, phone column gap widened, tripod height reduced; re-rendered and re-checked at all three sizes. One harness bug found and fixed during QA: the piece passed pre-stringified alphas into rgba(), which re-called toFixed; call sites now pass numbers.
