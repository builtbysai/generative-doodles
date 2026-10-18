# №136 · Olympic Form - process notes

## Concept
After Char Stiles's September 2024 "Olympic Form" typeface, which matched Olympians' body outlines to letterforms: a single continuous bone-white contour of a contorted athlete resolves into a glyph, holds, then melts into the next figure, spelling her name C H A R S T one letter at a time. Museum-label restraint; the contour is the whole piece.

## Construction
- Single self-contained page, 2D canvas. Palette is two values only: ground #0B0B0D, contour #EDE6D6, with the previous figure replayed as a morph ghost at 18% alpha. One 3px stroke, round joins, no fill, single figure centered at 70% of frame height (fit shrinks on narrow frames so the contour is never cropped).
- Six figures (backbend, hurdler, lifter, sprinter, gymnast, crucifix) and six glyph outlines are hand-authored as closed control loops. C and S are built as stroked outlines of a spine curve; H, A, R and T are explicit outline polygons with doubled corner points to keep their corners through smoothing. Every contour is Catmull-Rom smoothed, arc-length resampled to exactly 120 points, winding-normalized and rotated to a topmost start point, so figure and glyph correspond point for point.
- A 48s seamless loop, 8s per letter: 2s figure, 2s eased morph into the glyph, 3s glyph hold, 1s melt into the next figure. Morphs are pure point interpolation between the two 120-point loops.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px inside draw; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load (opened in the C glyph hold, with the crucifix figure ghosting behind it) and requestAnimationFrame is guarded so node-canvas QA works.

## Interaction
- Horizontal drag scrubs the letter sequence; the morph follows the finger because the whole timeline is a function of sequence time. On release, playback resumes from the nearest letter boundary.
- Never click-to-reload. No sports iconography, no filled silhouettes, no text but the contour itself.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting; the shipped frame shows the C glyph held with the previous figure (crucifix) ghosting at 18% behind it.
- Because one frame shows only one letter, every figure and every glyph was additionally verified by rendering the piece at each segment's figure phase and glyph phase (twelve extra frames): all six figures read as contorted athlete contours (hurdler and crucifix clearest, the rest deliberately abstract) and all six glyphs read unmistakably as C, H, A, R, S, T.
- One fix during QA: the first framing scaled by height alone and cropped the contour on portrait panes; scale now fits both axes (70% of height, at most 92% of width).
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short ("drag to scrub the letters").
- Files: `136/index.html`, `136/thumb.png` (720x720, rendered from the live script), `136/process.md`. Gallery entry for the parent to add: №136, title "Olympic Form", formula date 2002 · 05 · 27, note ending "Drag to scrub the letters."
