# №83 · Interference Bloom - process notes

## Concept
After marioecg's Bloss and Leaf loops. Two slow wave systems cross over a dark ground and their interference blooms into petal-like forms that open and close on a twenty second breath.

## Construction
- Single self-contained page, no libraries. Canvas 2D software shader for the same QA reason as No.81. Exactly 2 wave systems (asserted), their product sharpened into fringes, a radial mask opening and closing with a sine envelope. Palette only: near black #060809, ember #FF7A2F, teal #2FD8C0, bloom white #FFF8EC. Seamless 20s loop; drag sets the interference centre and release recentres.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed field on phones (square nest centred for No.85 with white ground edge to edge), Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `83/index.html`, `83/thumb.png` (720x720, rendered from the live script), `83/process.md`. Gallery entry added to pieces.json with the formula date.
