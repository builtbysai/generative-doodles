# №96 · Kinetic Word - process notes

## Concept
After cristiania's kinetic type study. The word is the piece: MOTION in a bold grotesque, broken into its 6 glyphs, each pulsing in sequence left to right, scale rising and settling, then the whole word breathes once and the 7 second cycle repeats. Black glyphs on cream, no other text anywhere.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 6 glyphs (asserted). Word centred and sized to fill 80% of the frame width on any screen: glyph widths are measured per glyph with ctx.measureText and the font size is solved from the measured total, tracking included.
- Font route, per the spec flag: no external font is loaded. The stack actually used is "Helvetica Neue", Helvetica, Arial, "Noto Sans", "DejaVu Sans", sans-serif at weight 800, so the piece stays self-contained and the node-canvas QA renders the same layout a browser does. The prompt's p5.js route was not taken.
- Loop: seamless 7s on wrapped cycle time. Per-glyph raised-cosine pulses staggered across the first two thirds of the cycle, glyph scale 1 to 1.25 and rise proportional to font size, then one whole-word breath (scale to 1.05) late in the cycle. Dragging horizontally scrubs the cycle phase by hand; on release the phase eases back and the loop resumes. Never click-to-reload.
- Palette only: ground #F5EFE0, glyphs #141210. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; full width on phones, centred square composition on desktop. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. First frame is set mid-ripple so the stagger is visible in stills: the I sits scaled up and risen while its neighbours rest. Word width verified at 80% of the frame on desktop and mobile renders. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short. The word MOTION is the prompt's own content, the one permitted on-canvas text; no title or label is drawn.
- Files: `96/index.html`, `96/thumb.png` (720x720, rendered from the live script), `96/process.md`. Gallery entry added to pieces.json with the formula date.
