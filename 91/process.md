# №95 · Primitive Ballet - process notes

## Concept
After cristiania's primitive study. Five primitives, three boxes and two spheres, drift in a shallow space on warm grey, flat studio colours, turning slowly and bobbing on independent sine paths like a mobile over a crib, never colliding.

## Construction
- Single self-contained page, no libraries. Canvas 2D projection of the five flat filled primitives (route per the run 18 decision, so thumbnails are true node-canvas renders; no WebGL). Exactly 5 primitives asserted: 3 boxes drawn as depth sorted flat faces with palette shading, 2 spheres as flat discs with a rotating marker dot. Seamless 18 second loop, all phases wrapped. Palette only: ground #E8E2D4, rust #C4502E, teal #2FA3A0, cream #F5EFE0, black #1A1A18, mustard #D9A419. Drag orbits the camera up to 15 degrees per axis, easing back on release.
- Motion and interaction per the prompt, never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `95/index.html`, `95/thumb.png` (720x720, rendered from the live script), `95/process.md`. Gallery entry added to pieces.json with the formula date.
