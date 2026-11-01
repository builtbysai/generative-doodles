# No.1053 "Whatever Moves, Light Rides"

Study #129 katsuhiko-harada, PP214 "The Light Payload".

## Concept

The constant across Harada's whole line: drones carry glowing orbs, carts carry lighting equipment, platforms carry projection screens. Whatever moves, the light rides. Nine movers cross a near-black field on their own schedules. The movers are drawn plain, dark and minimal (the machine, quiet); their cargo is the only brightness in the frame (the passenger, loud). The vehicle is the means, the light is the cargo.

## Construction

Single self-contained canvas 2D piece. All motion is closed-form in piece time on a 60 s loop (every period divides 60), drawn in a unit-square world, contain-fit and centered.

Three kinematics, one fleet:

- Drones (3): elliptical closed paths in the upper field, periods 60 / 30 / 20 s, alternating direction, seeded centers, radii and phases. The body is a tiny quad outline (bar + four rotor nubs); the orb (#DCE9FF) rides above it.
- Carts (4): axis-aligned rectangular waypoint circuits on the floor, periods 30 / 60 / 20 / 15 s. Position is an arc-length walk around the rectangle perimeter at constant speed from a seeded phase offset. The body is a small dark rectangle with two wheel ticks; the lamp (#FFE9B8) is a glowing dome on top.
- Platforms (2): slow horizontal triangle-wave glides in the mid-field, periods 60 / 30 s, with a slight vertical sine breathing. The body is a low dark slab on two feet; the screen (#E8EAEE) is a glowing translucent panel standing above it.

Cargo rendering: glow is layered flat alpha (three halo discs plus core for orbs and lamps; four nested alpha rectangles for screens). No gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

Trails: each light leaves a trail in its cargo color at base alpha 0.35, sampled analytically from the same closed-form position functions at 16 past instants (0.32 s spacing, ~5 s of record), alpha and radius shrinking with age. Platform trails are small fading rectangles. Where paths cross, halos stack and the lights mingle.

Interaction (all state is recorded events; every frame remains a function of piece time plus the event lists):

- Drag = a shadow: pointer samples are recorded with piece-time stamps; each mover's light dims by proximity to samples younger than 1.6 s (up to 55% dim), then recovers as the samples age out.
- Tap a mover = its light flares: a flare event raises that light's brightness and size over 3 s (fast attack, slow release).
- Double-tap = new fleet: the seed advances (LCG) and the fleet is rebuilt; flares and drag samples clear.

Sound (first gesture only, lazy and typeof-guarded): six quiet looped voices (a mechanical tone per mover type, a luminous tone per cargo type) plus a short detuned shimmer when any two lights cross within range, detected from draw state in the animation loop. Silent in the QA renderer.

House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px every draw; phone detection via window.screen physical size (min dimension < 700 px) with aspect fallback; page ground is the field tone. Frame one is the synchronous draw at fixed phase T0 = 20 s; the rAF loop is anchored as T0 + elapsed-since-load, never derived from Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence (no rAF, no AudioContext in the renderer).
- Determinism: thumb.png rendered twice and cmp byte-compared identical; duplicate deleted.
- Read-back: desktop shows cool orbs on elliptical paths in the upper field, warm lamps riding the rectangular floor circuits, two pale screens gliding mid-field, trails weaving at crossings, movers small and dark beneath their cargo. Mobile keeps the whole unit-square world in frame, nothing clipped.

## Deviations

- None from the brief. Trail history is computed analytically from the closed-form schedules rather than stored in a runtime buffer, which is the brief's own wording ("stored position buffers sampled analytically from the closed-form schedules") and is what keeps frame one fully developed at load.
