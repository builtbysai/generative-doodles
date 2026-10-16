# №80 · Pixel Resolve - process notes

## Concept
After stevefortier_art's pixelated reconstruction paintings. A coarse grid of flat circles and squares on cream whose colours sample a radial eight-petal blossom field, resolving into the blossom as the grid refines.

## Construction
- Single self-contained page, canvas 2D, no libraries. Shared batch palette only: ground #F3EDE1, ink #141414, cobalt #1F4ED8, emerald #2E9E5B, vermilion #E03A1F, ochre #D9A02B. Flat hard-edge work throughout, no gradients, no alpha blending, no texture, no numerals.
- A seamless 22 second loop steps the resolution from 12x12 to 48x48 and back, stepping rather than sliding. Drag outward sets a finer resolution directly; release resumes the cycle after four seconds. Crisp flat shapes only, no gradients, ink reserved for a few accent cells.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed on phones and a centred square composition on desktop per the spec; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `80/index.html`, `80/thumb.png` (720x720, rendered from the live script), `80/process.md`. Gallery entry added to pieces.json with the formula date.
