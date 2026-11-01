# №1336 "Unbranded" — process

Hank Willis Thomas, HT1 (PP511). A vintage-style print advertisement in warm
1970s colors: teal hero image (a suited figure gesturing toward a gold bottle
on a side table), red headline zone, body copy, gold logo plate, fine print —
all text zones rendered as invented glyph dashes, never real slogans or real
brand logos. The point is the absence.

## Loop (34 s, phase-shifted)

Frame one opens on the COMPLETED ad (loop phase 0 = built hold), so the ad is
built completely before any erasure begins and the gate holds. Then:

- 0–8 s: built hold.
- 8–18 s: erasure cascade, headline → logo → body copy → fine print
  (2.5 s each). Each erased zone keeps its exact shape as a pale #DCD6C6
  rectangle with a faint ghost-glyph texture; the voids ARE the composition.
- 18–26 s: naked hold. The hero image never moves.
- 26–34 s: rebuild in reverse order (fine print → body → logo → headline),
  ending back at the completed ad.

## Interaction

Drag horizontally scrubs the erasure timeline (0.04 s per pixel): the visitor
re-applies and removes the words themselves. On release the loop resumes from
that state (phase offset = scrubbed time minus elapsed time). Drag state is
closed-form from recorded pointer events, never frame-integrated.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop (plain function declaration behind a typeof
guard). All glyph patterns, paper flecks, and layout come from seeded
mulberry32 streams (seed 1336000), never Math.random.

## House rules

Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen physical size (min dimension < 700 px) with aspect fallback.
Centered panel keeps its shape; the page ground takes the darker cream tone.
No gradients, no shadowBlur, no filters, no offscreen canvas, no AudioContext,
no getUserMedia. No visible text except <title>.

## Fix rounds

1. Erasure-window logic rewritten: the first version returned 0 for zones
   during the rebuild lead-in (before their own rebuild window), which would
   have snapped erased zones back to full text mid-cycle. The fixed function
   is a clean four-branch ramp (before cascade → cascade → held erased →
   rebuild → 0).
2. A raised glass floated detached from the figure's hand in the first render;
   removed, so the arm now reads as a presenting gesture toward the tabled
   product.

## Verification

Rendered at 1280×900 desktop, 390×844 mobile, 720×720 thumb; all three
inspected. Thumb rendered three times, all byte-identical. Forced-time probes
on discarded temp copies confirmed every phase: t = 12 shows the headline
fully erased, the logo half-erased, body and fine print still present;
t = 22 shows all zones as pale rectangles with faint ghost glyphs and the
hero image unchanged.
