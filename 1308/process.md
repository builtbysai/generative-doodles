# №1308 "Potato-Bag Automatism" (kristan-horton KH5, PP475)

## What it is

A continuous line walker on kraft paper, drawing itself endlessly.
Black ink on a kraft ground, with faint blue wrinkle-creases, rice-glue
sheen tabs at the margins, dashed suture seams at panel boundaries,
and occasional circular gaps where the line detours around the studio
water pipe. The drawing never ends and never closes into anything
recognizable: whenever the walker nears a shape approaching closure,
it visibly bends away.

## Frame one

Kraft ground fills the frame. A single black ink line wanders across
the full width, starting at the left edge and ending in a pen dot near
the right edge: the drawing already in progress, not a blank page.
Faint blue crease polylines cross the field, sheen tabs sit at the
top and bottom margins, dashed seams mark the panel boundaries, and
one pipe ring sits mid-field with the line passing around it, not
through it. Mobile holds the same read full-bleed.

## Mechanics

- Walker: step 7 px in drawing space (y normalized to a 900-unit
  band so the path is viewport-independent). Heading wanders by a
  seeded turn each step, with a weak pull to the middle band and to
  the current panel's target mean, so each panel references the
  previous panel's ending height (paratactic continuity).
- Closure deflection: each candidate step is checked against sampled
  history (every 3rd point, older than 80 steps, last 500 samples);
  coming within 30 px of an old point kinks the heading by 0.9 rad
  away from it. The bend is visible, the line never closes.
- Pipes: seeded circles (radius 18-32 px) every 900-1400 px of drawing
  x. A candidate step entering a pipe steers onto the tangent with a
  forward x component and is pushed out radially, leaving a circular
  gap in the line. Rings are drawn in faint blue crease color.
- Panels: 520 px of drawing x. Each panel gets 2-3 faint blue crease
  polylines, 1-2 rice-glue sheen tabs at the margins, and dashed
  suture seams at its boundaries (top and bottom margins only).
- Sheen dashes: every 170th walker step lays a short rice-glue dash
  along the line.
- Scroll: the view drifts left at 40 px/s in drawing space; the pen
  dot rides 30 px in from the right edge, so new line always emerges
  at the right and drifts left. The rightmost 30 px stays blank kraft:
  the paper ahead of the pen.
- Scrub: horizontal drag accumulates into a scrub offset (1.5x drag
  px). View position is a closed-form function of piece time and
  recorded drag events: viewX = 40t - scrubTotal, clamped at 0.
  Dragging right scrubs back along the accumulated timeline;
  releasing resumes the forward drift from the scrubbed offset.
  Never click-to-reload.

## Determinism

Frame one is drawn synchronously at exactly t=0 via a boot flag;
the rAF clock starts only with the loop. All generation (walker,
creases, pipes, panels, sheen) draws from a single seeded mulberry32
stream in a fixed order (panels, then pipes, then path steps per
frame), never Math.random, so repeated loads produce the same
drawing. Heading is clamped to +/-1.45 rad so drawing x is strictly
increasing, which keeps the visible-window binary search valid.

## House-rule compliance

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px, backing
store at capped devicePixelRatio; phone detection via window.screen
physical size with aspect fallback; field composition full-bleed on
phones, page ground in the piece's own kraft. No requestAnimationFrame,
AudioContext, document.createElement, WebGL, offscreen canvas,
ctx.filter, shadowBlur, or gradients in the QA path (rAF behind a
typeof guard, plain function declaration). Dots drawn as single arcs
inside fresh beginPath calls. No visible text except title. No audio,
no microphone. Palette only: kraft #B98F5E, ink #14100C, sheen
#D6C199, crease blue #7A8CA3.

## QA

Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all
three inspected. Thumb rendered three times, cmp byte-identical, and
matching the shipped thumb. Forced-time probes (temp copies,
discarded): t=0 vs t=30 differ by 31,603 px (drift moves the
drawing); t=30 vs t=30 with a 400-unit scrub offset differ by
32,936 px (scrub moves the view). Token scan clean except one
comment stating no Math.random is used.

## Fix rounds

1. Strict-mode ReferenceError caught before QA: the pipe loop in
   draw() assigned to an undeclared `p` (declared only inside
   step()). Fixed by declaring `var p` in draw().
