# №79 · Refraction Wedge - process notes

## Concept
After stevefortier_art's Refraction series. Striped concentric circles: 8 rings, each striped with 24 radial wedges (192 segments, asserted by construction) in cobalt, emerald, vermilion and ochre. One 90 degree wedge mirrors the stripe order, bounded by two hairline ink rays.

## Construction
- Single self-contained page, canvas 2D, no libraries. Shared batch palette only: ground #F3EDE1, ink #141414, cobalt #1F4ED8, emerald #2E9E5B, vermilion #E03A1F, ochre #D9A02B. Flat hard-edge work throughout, no gradients, no alpha blending, no texture, no numerals.
- The refracting wedge rotates one full revolution on a seamless 24 second loop. Drag sets the wedge angle directly from the centre; release resumes the sweep after four seconds. Hard mirror boundary only, no gradients, no blur.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed on phones and a centred square composition on desktop per the spec; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `79/index.html`, `79/thumb.png` (720x720, rendered from the live script), `79/process.md`. Gallery entry added to pieces.json with the formula date.
