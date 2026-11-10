# One Hundred Iterations, No Traits, No. 1676

Driver: soft geometric masses drift, split and rejoin so slowly that no shape ever settles into a type; the viewer notices only minutes later that everything has changed.

Study: #220 tyler-hobbs, prompt TH5 (PP923). Gallery date: 2006 · 08 · 14. Interaction: watch only, no interaction.

## Mechanism

Fourteen flat masses in the middle band (base y 0.34 to 0.66 of viewport height, generous breathing room above and below, nothing centered, nothing framed): blobs, wedges, smudged bars and arc bands, cycled by kind (i mod 4). Every live parameter, position, scale, rotation and colour weight, is a sum of two slow sines with fixed seeded phases. Painter's algorithm sorts the masses by a slowly drifting depth value each frame, so forms pass in front of and behind each other without ever snapping.

Periods, all 3 to 9 minutes and incommensurate: motion periods 197, 239, 311, 389, 463 and 541 seconds, assigned per blob in rotation so no two parameters share a short common multiple. Master palette weather: rust 417 s, indigo 523 s, sand 359 s, each raised to the sixth power of its positive sine half so the transient colour is absent most of the time and passes through briefly like weather. Each blob carries a fixed seeded affinity to rust, indigo and sand, cubed in use, so only the few masses strongly tuned to the passing colour shift with it; its flat fill is its base (warm cream or charcoal) mixed toward the currently strongest transient colour by that effective affinity, capped at 0.65.

Edges carry plotter wobble: each shape vertex gets a fixed seeded radial jitter, so outlines are soft and hand plotted rather than mathematically clean. Flat fills only, no gradients.

## Determinism

Frame one is draw(0) evaluated at a fixed PHASE of 211 seconds into the cycles, so the composition is already mid morph and never empty. All motion is a closed form function of piece time t plus that fixed phase; there is no unseeded Math.random, no performance.now and no Date dependent layout. Base geometry and phases come from mulberry32(1676). The thumb re-renders byte identical from the same fixed frame. A ?seed=N query, used only by the QA renderer, adds N seconds to the evaluated time so a later phase can be rendered; in the browser the query is empty and the offset is zero.

## Deviations

None from the prompt. The wedge and arc span breathe on the same slow sine schedules as the other parameters, per the prompt's "every parameter drifts" rule. Cream masses carry a faint charcoal outline (rgba 0.28) so they read against the cream ground; this is a legibility measure, not a new colour.

## QA

Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile and 720x720 thumb, plus a second phase at seed 300 (five minutes later). See report for what each render shows.
