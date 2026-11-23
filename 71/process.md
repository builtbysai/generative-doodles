# №75 · Plus Minus - process notes

## Concept
After gabi_mitterer's PLUS_GW / MINUS_GW. A minimal diptych as a live pair: two tall panels, left on bone and right on near black, each holding a form built from the same flat grey module. A minus is one horizontal bar; a plus is that bar plus a vertical bar. Across the loop the two forms swap identities.

## Construction
- Single self-contained page, canvas 2D, no libraries. Two panels split the canvas at the middle with a one pixel hairline. Bars have flat caps and hard edges, no rounding, no labels, no extra modules.
- Perfect 12 second loop: in the first five seconds the left plus retracts its vertical bar into a minus while the right minus grows into a plus, with a crisp ease; they hold for two seconds, then morph back over the last five. The right panel morph is always one minus the left.
- The vertical bar height is the morph value times the bar length, centered on the horizontal bar, which is always drawn.
- Motion loop with touch and drag interaction, never click-to-reload: a vertical drag over a panel sets that panel's morph directly, up for plus and down for minus; release resumes the loop after four seconds idle.
- Full-bleed on both layouts with the same split layout on desktop and phone; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `75/index.html`, `75/thumb.png` (720x720, rendered from the live script), `75/process.md`. Gallery entry added to pieces.json with the formula date.
