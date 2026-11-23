# №72 · Twenty-Two Stripes - process notes

## Concept
After gabi_mitterer's 22 Stripes (2005). Exactly twenty two vertical stripes span the canvas edge to edge, each a flat grey from an eleven step achromatic ramp. A travelling glitch band re-quantizes the greys as it passes.

## Construction
- Single self-contained page, canvas 2D, no libraries. Stripe count is asserted at 22 in the construction. Stripe widths are seeded but even, between 85 and 115 percent of the average, so the field reads as composed.
- Base ramp positions run monotonic dark to light with a few seeded adjacent swaps. The glitch band is invisible: stripes inside it shift one ramp step up or down in a seeded direction and snap back as the band passes. The band wraps toroidally on a 16 second loop.
- Motion loop with touch and drag interaction, never click-to-reload. Dragging horizontally scrubs the band position directly; release resumes auto travel after four seconds idle.
- Full-bleed on both layouts; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `72/index.html`, `72/thumb.png` (720x720, rendered from the live script), `72/process.md`. Gallery entry added to pieces.json with the formula date.
