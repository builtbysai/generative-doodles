# No.630 "Five Wanderers, One Night"

EXPANSION #76 soledad-romero, prompt block 6 "Los Cinco Itinerarios": her DETECTIVE EN PARIS book as an observation game.

## Concept

A stylized night city fills the frame: dark blue building blocks with warm lit windows, streets as the dark gaps between them, and a river running diagonally across the lower third with one bridge. Five wanderers (amber, coral, moss, violet, cream) walk closed looping routes through the streets, each at its own slow speed. Where routes cross, the crossing point pulses softly as one of its wanderers approaches. The viewer's job is to notice where the routes cross. Tap a wanderer to focus it: the others dim to shadows and its full route draws itself as a glowing thread with its stops ringed. Press and hold to rewind the night: every wanderer slides backward along its route at 3x while held, then resumes forward from there. No labels, no street names, no UI chrome anywhere.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. Sizing from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw() every frame; phone detection via window.screen (min dimension < 700px) with aspect fallback; on phones the same unit-space city refits the tall frame and wanderer dots grow slightly.
- City: a 7x7 street-line grid in unit space. Blocks occupy the cells between street lines, inset by the half street width, seeded per block (mulberry32, SEED 630076): two tone strengths, a 4x3 window grid per block with seeded lit/unlit state and seeded twinkle phase and speed. Blocks whose center falls inside the river band are never built (the river shows through). The static city is precomputed as data arrays and redrawn from them each frame; there is no offscreen canvas.
- Landmarks: cafe (cell 1,0; striped warm awning at its base), museum (cell 4,1; pediment outline and four columns), market (cell 1,5; striped canopy with a scalloped edge), tower (cell 5,0; lighter tone, antenna with a warm tip), bridge (a lighter river-tone deck with warm rails and lamp dots across the river on street SX[3]).
- River: a diagonal band (line from (0, 0.79) to (1, 0.60), half width 0.046) filled in the river hex, with 30 seeded shimmer strokes in a lighter strength of the same hex, breathing slowly on the anchored clock.
- Route model: each route is a closed loop of street intersections; consecutive waypoints always share a street line, so every segment runs along a street and wanderers never leave the streets. Segment lengths are precomputed; a wanderer's position is a pure function of the global route-time: pointAt(route, startS + speed * rt). Speeds: amber 0.030, coral 0.040, moss 0.027, violet 0.046, cream 0.034 unit/s. Starts are five distinct points found by an arc-length lookup on each route; amber starts on its row-3 segment just east of its crossing with cream, so one crossing pulse is faintly visible in frame one. The moss route is the only one that crosses the river, and it crosses on the bridge street (column SX[3]); all other routes stay on dry streets (verified against the river band geometry when the waypoint lists were fixed).
- Crossing model: crossings are precomputed once from route geometry: every intersection between segments of two different routes, including shared intersections and collinear overlaps (a shared street stretch counts once, at its midpoint). Each crossing stores its two wanderer indices. At draw time a crossing's pulse alpha is 0.05 + 0.50 * proximity, where proximity is the stronger of the two wanderers' closeness (1 - distance / radius, radius 14% of the smaller frame dimension, floored at 60px); the ring also breathes slowly. Crossings are drawn in cream at that alpha, under the wanderers.
- Focus: a tap (press released within 0.30 s, movement under 14px) hit-tests the nearest wanderer within a threshold. The focused route's thread draws itself over 1.2 s (arc-length partial polyline, eased) as a wide low-alpha pass under a thin bright pass in the wanderer's color; its three stop waypoints get rings once the thread is mostly drawn. Non-focused wanderers are drawn as shadow cores with barely-there halos. Tapping the focused wanderer releases focus; tapping another switches.
- Rewind: while the pointer is held beyond 0.30 s, route-time advances at -3x; on release it resumes at +1x from the rewound value. Route-time is a single global offset, so a rewind moves everyone coherently and never resets anything; routes never change shape.
- Clock: anchored elapsed time (performance.now at load), rAF typeof-guarded. Frame one is the synchronous draw at route-time 0: seeded city, wanderers at their fixed starts, no focus.

Palette (strict): night city #1A2440, window warm #E8B93B, river #2B4D8C, wanderers #E8B93B / #E2725B / #6A9A5B / #7A4E8C / #F5F1E8. Block faces, unlit windows, the bridge deck, shimmer and shadow cores are tone-family strengths of those same hexes (the prompt fixes a single night hex; same pigment, other strengths, as in earlier pieces of this series). No text anywhere except the page title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Desktop read-back: night city grid with lit and unlit windows, river diagonal across the lower third with the bridge deck and lamp dots at center, museum pediment and columns at upper right, cafe awning at top, market canopy at bottom, tower antenna at top right. Five wanderers at five distinct starts (violet top, coral right, moss center right, amber center, cream left edge). A faint crossing ring shows just west of amber, as designed; other crossings read as faint rings at shared intersections.
- Mobile read-back: the same city refit to the tall frame; blocks and windows stay legible, all five wanderers visible, bridge and river diagonal intact, nothing clipped.
- Thumb read-back: same fixed first frame at square format; city, river, bridge, landmarks and all five wanderers read clearly.
- Code checks: grep confirms no Date.now, no Math.random, no document.createElement, no AudioContext, no ctx.filter, no shadowBlur, no external URLs, no em dashes. All randomness is mulberry32 with fixed seeds; all motion derives from the anchored clock and route-time.
- One build fix before QA: the coral route's closing segment was diagonal in the first draft of the waypoint list; a waypoint was added so every segment is axis-aligned along a street.

## Deviations

- Rewind engages only after a 0.30 s hold (the brief allows "hold or move" to rewind). This keeps a focus tap from also rewinding a little of the night; a held press, moving or still, rewinds as specced.
- Collinear route overlaps (two wanderers sharing a stretch of street) are represented as a single crossing at the overlap's midpoint, rather than a pulsing stretch; the pulse law is otherwise exactly as specced.
- When three routes share one intersection, the crossing keeps the first pair found; the pulse still fires for that pair. Recorded here because the prompt does not address multi-route junctions.
