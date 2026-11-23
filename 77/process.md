# №81 · Wormhole Study - process notes

## Concept
After marioecg's Wormhole. A full-bleed tunnel of colour pulling toward frame centre: concentric bands of saturated magenta, teal and amber fold inward with a slow recursive wobble, deep near-black at the mouth, luminous at the rim.

## Construction
- Single self-contained page, no libraries. Canvas 2D software shader (per-cell polar field, chosen so thumbnails are true renders of the actual script; the spec's WebGL route cannot be rendered by the node-canvas QA path). Polar transform, depth 1/r scrolled by wrapped time, 3 folding passes (asserted), fbm-style sine domain warp, cosine palette sampled by folded radius. 16 visible rings (asserted in range 14 to 20). Palette only: ground #05070D, magenta #E040FB, teal #18E0C8, amber #FFB13D, core #FFF6E8. Seamless 12s loop; drag offsets the warp centre and eases back on release.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed field on phones (square nest centred for No.85 with white ground edge to edge), Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `81/index.html`, `81/thumb.png` (720x720, rendered from the live script), `81/process.md`. Gallery entry added to pieces.json with the formula date.
