# No.903 — Em_p/t.'y

Study #110 sakrmusic, PP64 "Ink River Terrain". Sakr's "Em_p/t.'y" (2026-09-01): a cool pale blue-grey marbled terrain threaded by thick black ribbon forms, ink rivers seen from the air. The terrain's beauty is the subject; the ribbons are ink, not water.

## Concept

A precomputed seeded heightfield renders as blue-grey marble: contour-banded, hillshaded, with mist pooled in the valleys. Five black ribbon agents flow downhill across it, slithering and re-contouring without pause. The visitor carves valleys with a drag and the rivers re-route into them; a fast drag is a flood; a tap is a spring; a double-tap is a drought. Blue-grey and black only: the one permitted color world beyond Sakr's pure black-and-white.

## Construction

- Terrain: 2D value-noise fbm (integer-hash lattice, 4 octaves) with domain warping for the marbled veining, normalized to 0..1. Rendered on a 168-column cell grid (rows follow aspect) batched by tone: a 64-step LUT interpolated only between the palette anchors (mist #D2DADF at the valley floor, shade #8A979E on the slopes, ground #B9C4C9 on the plains, light #DCE4E8 on the ridges). Each cell's tone also carries a precomputed north-west hillshade shift and a contour-band darkening at 11 bands, so the undulation reads topographically. Low heights take the mist stop, so valley floors sit pale under fog.
- Ribbons: each is a head plus a 40-point follow-the-leader chain (spacing 0.02 of the min dimension). The head steers by rate-limited turns toward the downhill direction of the effective field (analytic gradient, converted to pixel space), with a seeded wobble; speed scales with slope and drops inside carved depressions, so rivers pool in valleys. Width is per-ribbon (0.030–0.082 of the min dimension, about 20–60 px at 720) with a profile that ramps up behind the head and tapers to the tail, breathing slightly over time. Drawing is three passes per ribbon: a wide low-alpha #3A4348 pass for the soft edge, a solid #101314 core, and a thin #3A4348 contour line offset along the left edge of travel. No canvas gradients, no shadowBlur, no filter, no offscreen canvas.
- Motion model: fixed-timestep simulation (1/60 s accumulator, capped catch-up) from a seeded initial state. Frame one is laid out by pre-rolling each ribbon's head along its downhill course at init and sampling the trail into the chain; a spawn search tries up to 8 seeded births and keeps the course whose head ends comfortably inside the frame with at least 34 of 40 chain points on the real trail. Retired rivers (off-frame or stalled) are replaced by fresh rivers entering from a seeded edge point.
- Carving: drags write into a 120x120 depression grid over normalized space, deeper where the hand moves slowly (pooling), shallower at speed. The effective height is base minus carve, sampled analytically per terrain cell each frame and by the ribbons' gradient, so a carved valley re-routes rivers and re-shades the marble. Carving is interaction state only; frame one has none.
- Flood and drought: drag speed above 0.9 domain units/s sets a 1.2 s flood (head speed x1.8, width x1.3). Tap spawns a spring ribbon at the tap point once the 0.35 s double-tap window passes (cap 8 ribbons, oldest retires). Double-tap runs the drought timeline: 1 s fade-out, 6 s of bare terrain (rivers are re-laid underneath at the fade), 1.5 s fade-in.
- Audio: created lazily inside the first pointerdown, typeof-guarded. A looped seeded brown-noise buffer through a lowpass plus a 40 Hz sub sine form the deep current; the lowpass cutoff (110–540 Hz) and noise gain follow the mean ribbon speed the visuals compute. A spring tap fires a gurgle: a sine dropping 270 to 78 Hz over 0.38 s. Silent in the QA harness; no microphone.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, style width/height pinned in px inside draw(), phone detection via window.screen min dimension under 700 with the aspect fallback, page ground is the terrain ground tone and the terrain fills the frame at all sizes. One seeded mulberry32 stream drives every random choice; frame one never reads Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean render in silence; listeners registered for pointer and both resize sources.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Read-back, desktop and thumb: pale blue-grey marbled terrain with readable undulation, contour banding, hillshade and pale mist in the valleys; five thick black ribbons at varied widths crossing the field, soft #3A4348 edge halo and contour line visible along them.
- Read-back, mobile: terrain fills the tall frame, ribbons cross it, nothing clipped.
- Fix round (recorded): the first build's ribbons read as short tapering worms anchored at the frame edges, because pre-rolled heads exited the domain before the chain was sampled and the chain spacing (0.011) made rivers only ~300 px long. Fixes: chain spacing raised to 0.02, the pre-roll now stops at the frame boundary, initial and drought-reset spawns go through the scored spawn search (head inside, trail coverage), the width profile peaks just behind the head instead of at it, and terrain resolution rose from 132 to 168 columns with a 64-step LUT to soften the marble's blockiness. Re-rendered and re-verified after the fix.

## Deviations

- Live replacements for retired rivers enter from an edge point and grow their chain inward over the first seconds, rather than appearing pre-laid; only frame one and the post-drought return use the pre-laid spawn, since those are the two moments the whole scene is composed at once.
- The contour line runs along the left edge of travel only, per the brief, rather than outlining both sides; the soft wide edge pass supplies the other side's falloff.
- Carved valleys do not heal. The prompt gives the drought as the only reset and says release lets the terrain settle, so carving persists for the life of the page; depth is capped at 0.55 so the marble cannot be dug through.
