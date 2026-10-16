# №116 Driftsquare - process

## Concept
From Lammetje's SquareDrift, his "One Shape, One Color" Genuary piece. A
single square drawn 400 times with progressive rotation and translation.
One ink, warm black #1A1512 on warm paper #F2EDE4, alpha 0.05, no fill, no
second color, no exceptions. The density variation of the overlapping
strokes is the only shading; the stack builds a twisted ribbon loop out of
pure moire.

## Construction
- Canvas 2D, single self-contained page. Square centres walk a small ring
  (radius 0.15 of the frame's smaller side, side length 0.335) while the
  rotation twists by pi/88 per step, so the stack precesses into a closed
  rosette ribbon occupying about 70 percent of the frame, centred with
  generous paper margins at every size.
- The drift parameter rides a seamless 40 second loop. Horizontal drag
  scrubs the drift directly, the form following the finger through its
  metamorphosis; on release the loop resumes from the scrubbed phase.
- House scaffold: Visual Viewport sizing with resize listeners on
  visualViewport and window, canvas pinned by style width and height each
  frame, phone check via window.screen with aspect fallback, one
  synchronous frame at load, requestAnimationFrame typeof-guarded.

## QA log
- Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
  inspected. Desktop and thumb show the twisted rosette ribbon with fine
  moire density building toward the rim and a small paper eye at the
  centre. Mobile keeps the shape centred on the paper ground in portrait.
- First pass accepted without changes; the form, margins and single-ink
  restraint matched the prompt on the first render.
