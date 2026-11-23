# №122 · Rule Weather - process notes

## Concept
After Iskra Velitchkova's remark that organic quality emerges from allowing rules to interact. Two dead-simple systems share one canvas: a grid of dots, each orbiting its home point, and a slow diagonal wave field that pushes the dots off orbit. Neither system is organic alone; the weather is in the interference, like wind over water.

## Construction
- Single self-contained page, no libraries. 2D canvas. Dot grid of 55 rows with the column count following the frame aspect (78 columns at 1280x900, about 90x55 in spirit) so cells stay near-square on any screen. Dots are drawn as small fillRects, crisp, no trails, no fading.
- System A: each dot orbits its home on its own phase. System B: the wave is a sum of two traveling sines whose phase lives in grid-index space, so the diagonal weather scales identically to any frame. Displacement is along the diagonal; dots under strong displacement shift colour from bone #E8E2D2 toward amber #E8A33D through a 16-step precomputed ramp. Ground #0C0B09. Nothing else exists in the piece: no third system.
- Interaction: pressing or dragging injects a gust, a local radial wave source at the fingertip that ripples outward through the field and dissipates over about two seconds after release. Never click-to-reload.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px each frame; phone detection via window.screen with aspect fallback. Full-bleed on phones. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting.
- Two fixes during QA: the first build computed wave phase from pixel coordinates, which collapsed the diagonal weather into horizontal stripes on the tall phone frame; the phase now lives in grid-index space. The first grid also used a fixed 90 columns, making cells 4x15 px on phones; columns now follow the aspect. Final renders show diagonal amber weather fronts sweeping the bone field on both desktop and mobile. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `122/index.html`, `122/thumb.png` (720x720, rendered from the live script), `122/process.md`. Gallery entry to be added to pieces.json by fly with the formula date 2002 · 05 · 13.
