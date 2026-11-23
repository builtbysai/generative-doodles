# №93 · Tunnel Run - process notes

## Concept
After cristiania's tunnel motion study. Concentric rounded squares in alternating coral and cream rush toward the viewer on a near black ground, accelerating on a real ease-in as they approach, wrapping seamlessly like a train arriving.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 24 rounded squares (asserted), drawn back to front, phase per shape mapped through a cubic ease-in; stroke weight scales with shape size; seamless 6 second loop on a wrapped virtual clock. Palette only: ground #141210, coral #FF6B4A, cream #F5EFE0. Pressing speeds the tunnel up to three times while held, easing back on release.
- Motion and interaction per the prompt, never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `93/index.html`, `93/thumb.png` (720x720, rendered from the live script), `93/process.md`. Gallery entry added to pieces.json with the formula date.
