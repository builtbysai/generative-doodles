# №124 · Daily Lines - process notes

## Concept
After Yazid's daily Lines series: a piece that behaves like a practice. Each day it generates one line-study, a single continuous line exploring one idea, and keeps the last seven days visible as fading ghosts behind today's line. The piece is always a week of practice.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seven seeded line generators, one picked per day by a hash of the date: a spiral that forgets its center; a wave that argues with itself; a grid that melts (one continuous snake through sagging rows); squares rounding off into a circle as they spiral; a zigzag easing into a wave; a row of loops like cursive e's; a fan that opens and closes with its tips connected.
- Today's line draws itself over about 60 seconds from page load, then holds while faintly breathing. At local midnight it becomes a ghost and a new line begins (the date is checked every frame and the week rebuilds itself). Ghosts are drawn in greys from #8A877C down to #D8D4C6 by age, under today's ink #161511 on paper #F3EFE4. No two lines are ever fully opaque at once; today owns the frame. No date text appears on the piece.
- A double-tap starts a fresh line now; the fresh seed is kept in localStorage for that date (all storage access is guarded, the piece runs identically without it).
- Interaction: drag horizontally to scan the week; the day under your finger redraws itself in full ink over its grey ghost while the others stay faded, and on release the week settles back to today. Never click-to-reload.
- Full-bleed on phones. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px each frame; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. The QA frame catches today mid-drawing (about three quarters drawn, as expected from the load clock) with six grey ghosts behind it; on mobile today's spiral stretches to the tall frame while the ghosts stay legible. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `124/index.html`, `124/thumb.png` (720x720, rendered from the live script), `124/process.md`. Gallery entry to be added to pieces.json by fly with the formula date 2002 · 05 · 15.
