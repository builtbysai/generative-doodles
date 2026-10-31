# No.807 "A to Dot to Ring"

EXPANSION #98 olivier-mosset, prompt block PP8 "A to Dot to Ring".

## Concept

Mosset's 1965-66 reduction laid out as one strip of three square panels:
the letter A in black on white (1965), the black dot, and the centered
black ring on the 100x100 square (1966). One palette, three decisions.
The panels are distinct frames with hard edges and hairline dividers:
nothing morphs, nothing blends, there is no timeline UI and no year
label. The sequence is the argument. Dragging sideways scrubs the strip
from A to dot to ring; dragging backward re-asks the reduction. Idle,
the view holds the ring.

## Construction

- Palette, strict: ink #141414 on ground #F4F2EC for all three panels.
  The dividers are a hairline mix of the two: ink stroked at 0.30 alpha
  over the ground. Page ground is the panel white.
- The strip: three square panels of equal side, adjacent, drawn every
  frame directly (no offscreen canvas). Panel side = 0.78 x min(frame
  width, frame height), 0.84 on phones, so roughly one panel fills the
  view and slivers of the neighbouring panels at the frame edges hint
  that the strip runs on. Hairlines are drawn at each panel's left edge
  and at the strip's closing right edge, spanning the strip's height.
- Panel 1 (scroll 0): the letter A, the piece's one sanctioned piece of
  text, because the prompt makes the letter itself the motif. Drawn with
  fillText in a heavy grotesk stack ('Helvetica Neue', Helvetica, Arial,
  sans-serif) at weight 700, font size 0.58 x panel side, centered.
- Panel 2 (scroll 1): the dot, a filled circle of diameter 0.20 x panel
  side, centered: a modest black disc, the zero between letter and ring.
- Panel 3 (scroll 2): the ring, a stroked circle outline of radius
  0.31 x panel side and stroke width 3.3% of the panel side, matching
  the ring construction used across this study (PP1, PP2).
- Scroll mechanics: the scroll position s is continuous in panel units,
  0 = A centered, 1 = dot, 2 = ring. All interaction is a recorded event
  list (grab / move / release with times and x positions); scrollAt(t)
  is a pure closed-form function of that list and t. While dragging, the
  content follows the pointer 1:1 (s = scroll at grab - (pointer x -
  grab x) / panel side), clamped hard to [0, 2]: no overshoot, no
  rubber-banding, the ends of the strip are ends.
- Rest behavior: the rest position is the ring (s = 2), as the prompt
  states ("Idle: holds the ring"). On release, wherever the drag ended,
  the view returns to the ring with a critically damped settle,
  s(t) = 2 + (s0 - 2) x (1 + u/tau) x exp(-u/tau), tau = 0.8 s: monotone,
  no overshoot, the motion mostly spent in about three seconds. A new
  grab freezes whatever position the settle had reached at that instant.
  Before any touch the scroll sits at 2 and nothing moves: the piece is
  still at rest, and all motion is the visitor's.
- Determinism: frame one is the synchronous draw at t = 0 with an empty
  event list, i.e. scroll position 2, the ring panel centered. The
  drawing never reads Date.now(); the interaction clock only timestamps
  recorded samples, and the rAF loop is anchored to load and
  typeof-guarded, so the QA renderer (no rAF) captures exactly frame one.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned
  in px inside draw(); phone detection via window.screen (min dimension
  < 700 px) with the h > w x 1.15 aspect fallback. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no audio. No visible
  text except the title and the panel A the prompt specifies.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Read-back: desktop and thumb show the ring panel in view: a clean
  black ring outline centered on the white ground, hairline panel edges
  standing inside the frame on both sides, and a sliver of the dot just
  entering at the desktop frame's left edge, the strip hinting that it
  continues. Mobile shows the ring centered with both panel edges
  inside the narrow frame and nothing clipped.
- Throwaway verification (patched copies with the rest position set to
  0 and 1, rendered in /tmp, inspected, then deleted): the A panel shows
  the bold grotesk A centered between its hairlines, a sliver of the dot
  at the right edge; the dot panel shows the filled black dot centered,
  with the A's edge at the left of frame and the ring's arc entering at
  the right. All three panels verified as distinct, hard-edged frames.
- Deviations: none from the prompt. Two recorded choices: the return to
  the ring on release follows the prompt's "Idle: holds the ring" as a
  slow critically damped ease rather than an instant hold, so a finished
  scrub visibly re-settles on the ring over a few seconds; and the
  strip's two outer edges are drawn as hairlines alongside the internal
  dividers, so each panel reads as a bounded canvas, the same edge
  language as the internal joins.
