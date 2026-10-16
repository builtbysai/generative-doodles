# №76 · Rig Divide - process notes

## Concept
After stevefortier_art's Rig Divide / Ringed Divisions series. Seven concentric rings on a cream ground, each divided into 12 equal arc segments (84 total, asserted by construction), filled in flat jewel colours cycling around each ring. Every segment in the northeast quadrant is displaced outward and rotated one segment, breaking the target into a displaced system.

## Construction
- Single self-contained page, canvas 2D, no libraries. Shared batch palette only: ground #F3EDE1, ink #141414, cobalt #1F4ED8, emerald #2E9E5B, vermilion #E03A1F, ochre #D9A02B. Flat hard-edge work throughout, no gradients, no alpha blending, no texture, no numerals.
- A seamless 16 second loop eases the displacement parameter from aligned to fully displaced and back with smoothstep easing. Drag angle scrubs the displacement directly, clockwise deepening the shift; release eases back to the loop after four seconds. Flat hard-edge fills only, ink-thin gaps between segments, no gradients, no alpha, no text beyond the hint.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed on phones and a centred square composition on desktop per the spec; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `76/index.html`, `76/thumb.png` (720x720, rendered from the live script), `76/process.md`. Gallery entry added to pieces.json with the formula date.
