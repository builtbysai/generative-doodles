# №112 · Palindrome - process notes

## Concept
After Lammetje's Orix and his mirror-symmetric palette notes. One hundred forty concentric circles are stroked from a point offset from centre (0.62w, 0.42h), expanding past the frame edges. Colour is sampled by angle from a palindromic palette, maroon, signal red, sand, teal-grey, then mirrored back, so the colour wheel cycles with no seam. The palette phase rotates very slowly while the circles themselves stay still, and the fine striations shimmer with moire.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 140 circles (asserted), each drawn as 120 arc segments (96 on phones), segment colour from a 720-entry look-up table built over the mirrored stops. Same-colour runs are batched into one path per run for speed. Alpha 0.9, line width min(3, r times 0.012), clamped to at least 0.75.
- Palette exactly #6B0C22, #D9042B, #F4CB89, #588C8C mirrored, on ground #0E0C0A. No radial-gradient fills anywhere; every tone is stroked arcs.
- Drag moves the circle origin (eased follow); on release it eases back to its seeded home. Double-tap reseeds the palette order while keeping the mirror structure. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px every frame; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. All three show the off-centre origin, seamless mirrored colour cycling and fine striation moire. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `112/index.html`, `112/thumb.png` (720x720, rendered from the live script), `112/process.md`. Gallery entry for pieces.json: title "Palindrome", date 2002 · 05 · 03, note "One hundred forty stroked circles from an off-centre point, coloured by a mirrored palette that turns very slowly. Drag to move the center."
