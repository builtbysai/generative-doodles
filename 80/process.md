# №84 · Palette Breath - process notes

## Concept
After marioecg's Somethinggreater loop. A full-frame slow gradient field, domain-warped, cycling through three palette moods one at a time: ember night, teal abyss, magenta dusk. Colour weather at a walking pace.

## Construction
- Single self-contained page, no libraries. Canvas 2D software shader for the same QA reason as No.81. Value-noise fbm with 4 octaves (asserted) drives a three-stop palette; exactly 3 palette sets (asserted), crossfaded on a sine schedule. Warp scale is large so only two to three colour masses show at once. Seamless 24s loop, the slowest of the set; horizontal drag scrubs the palette position and release resumes the drift.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed field on phones (square nest centred for No.85 with white ground edge to edge), Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `84/index.html`, `84/thumb.png` (720x720, rendered from the live script), `84/process.md`. Gallery entry added to pieces.json with the formula date.
