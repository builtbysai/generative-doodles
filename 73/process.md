# №77 · Sortation Pass - process notes

## Concept
After stevefortier_art's Sortations series. A 10x10 grid of flat colour cells on cream (100 cells, asserted by construction), reorganised by one continuous bubble-sort pass so colours migrate toward spectral order within each column.

## Construction
- Single self-contained page, canvas 2D, no libraries. Shared batch palette only: ground #F3EDE1, ink #141414, cobalt #1F4ED8, emerald #2E9E5B, vermilion #E03A1F, ochre #D9A02B. Flat hard-edge work throughout, no gradients, no alpha blending, no texture, no numerals.
- The 20 second loop staggers one full bubble-sort pass through the ten columns, holds on the sorted field, then re-seeds through a one second fade to ground, the only fade in the batch. Vertical drag scrubs the sort progress; release resumes after four seconds. Vertical swaps only, 2px ink gutters, no gradients, no labels.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed on phones and a centred square composition on desktop per the spec; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `77/index.html`, `77/thumb.png` (720x720, rendered from the live script), `77/process.md`. Gallery entry added to pieces.json with the formula date.
