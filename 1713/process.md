# №1713 "Bright Intruder" (PP960, EXPANSION #225 goodbad-png) - process.md

Built 2026-11-11 (22:45 run) from ~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/BATCH-1712-1716-SPEC.md, №1713 section verbatim. Template: live №1711 index.html fetched via fetch-blob (sha f851d5dcf94df927374d9a4d65796f1a365448c8).

## Prompt (verbatim from spec)
A slow dark contour terrain of concentric grey rings sits on charcoal, and through it cuts a second system of sharp coral-orange spiky polygons that ignore the terrain entirely, arcing across the frame like thrown wire.

## Build
- Canvas 2D only (p5.js-to-2D substitution per house rules).
- Terrain: 15 nested contour rings, closed-form radius `base * (1 + a3*sin(3θ+φ3) + a5*sin(5θ+φ5))` around an off-center center (0.40, 0.56 stage fractions). Breathing is a closed-form function of piece time: ring scale `1 + 0.035*sin(2πt/16 + k*0.35)` and slow phase drift of the wobble terms.
- Intruder: one closed 26-spike star polygon (52 vertices, alternating outer/inner radii with seeded per-vertex jitter 0.86-1.14), center (0.66, 0.36), radii scaled to the stage min dimension so it reads on phones. Rotation `0.35 + (2π/16*0.25)*t` and a slow closed-form center drift; it never samples the terrain field, so it can never follow it. Miter joins, sharp vertices, coral stroke #FF6B35 at 0.95 alpha with a 0.05-alpha coral fill for presence.
- Exactly two systems: terrain rings and the intruder polygon. No third system.
- Watch-only; no pointer interaction, never click-to-reload.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension < 700px) with aspect fallback (h > w*1.15); terrain fills the frame on desktop and phone; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; reduced-motion respected; title/date/hint plates drawn on canvas; no em dashes in visible copy.

## Palette (hand-picked from the prompt's named colors)
- Charcoal ground #1B1B1D; slate-grey contours #6E757F / #555B63 / #454A52 / #828A94 (four greys, one contour system); single coral-orange intruder #FF6B35.

## Deviations recorded
- studies/goodbad-png.md does not exist in the repo, so the prompt's palette has no study file to resolve from; hexes are hand-picked from the prompt's named colors (charcoal ground, slate-grey contours, single coral-orange intruder), as the spec directs and as №1704-1711 did for aaron-penne. No study file was invented.
- p5.js-to-2D substitution per the spec's technical approach (node-canvas has no WebGL; the 2D build is the piece, not a fallback).

## Frame one (fixed phase)
- `FRAME_T = 4.2s`, period 16s. At frame one the terrain breathes at `sin(2π*4.2/16)`, and the intruder sits at rotation `0.35 + (2π/64)*4.2 ≈ 0.76 rad`, arcing off-center across the terrain, entering from the top edge and exiting the right and bottom edges. Seeded RNG only (mulberry32(1713)); no Date.now() or Math.random() affects frame one.

## QA (node-canvas, from the actual script)
- 1280x900 desktop: nested slate contour rings fill the charcoal frame around an off-center center; the coral spiky polygon cuts diagonally across, sharp vertices, ignoring the terrain. Plates legible: "Bright Intruder", "2006 · 09 · 20", "Watch only."
- 390x844 mobile: same two systems, intruder fully legible as a spiky ring in the upper half, contours nested below; plates legible.
- 720x720 thumb (thumb.png IS this render): same composition as desktop, legible at small size.
- Two fix rounds: (1) first gate showed contour wobble too large (rings crossed, spaghetti look) and the intruder scaled to stage height so it was mostly off-frame on phones; reduced wobble amplitudes and scaled intruder radii to the stage min dimension. (2) Second gate still showed slight outer-ring crossings; reduced wobble further (a3 0.04-0.09, a5 0.02-0.05). Re-gated after each edit; final renders inspected above.

## Gallery entry (for the parent push)
- n: 1713, title: "Bright Intruder", date: "2006 · 09 · 20", note: "A coral intruder cuts across a breathing grey terrain. Watch only."

## md5s
- index.html: 87ceff6886efb714c5bad56a1afde3a0
- thumb.png: 2eb681549232cf2fb0c1b0a2c2969bf6
