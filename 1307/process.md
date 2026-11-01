# №1307 "Zero State" (kristan-horton KH4, PP474)

## Source
Kristan Horton's Sligo Heads: digitally distorted self-portraits from a residency
in Sligo, Ireland. The "zero state" is an instantaneous impression of literal and
emotional isolation; layered, rotated, light-streaked copies become "a still,
warped impression of a face in movement, like a beast." Nothing starting to
produce something.

## What frame one shows
A cold empty dark field (cold slate #23272E) with a single cold portrait at
60% height: a tall head ellipse in ice outline over a faint steel wash, bone
eye ellipses with ice dots, brow arcs, one long nose arc, one shallow mouth
arc. No real face anywhere: the abstraction is built from ellipses and arcs
only. Faint ice dots speckle the field and flat-alpha light-bleed streaks
radiate inward from the edges. No visible text except the title.

## Motion (watch-only, 28 s loop, closed-form over piece time)
- 0-16 s, accretion: one distorted copy fades in every 2 s, up to 8. Each copy
  is the same ellipse/arc portrait rotated, stretched, and offset by amounts
  that grow with copy index; later copies render more translucent, like
  layered exposures. Copies 6-8 carry one small blood-red streak each: the
  beast's mark, never gore.
- 16-22 s, hold: the full stack breathes and twists slightly (sine warp), the
  warped beast impression.
- 22-28 s, collapse: copies fade out in reverse order, one per 0.75 s, back to
  the single cold portrait. The loop then reseeds.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
performance.now() clock starts only with the rAF loop. All loop reseeds use a
seeded mulberry32 PRNG (seed 1307 + loop x 7919), never Math.random. The rAF
loop is a plain function declaration behind a typeof guard.

## House rules applied
Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen physical size (min dimension < 700 px) with aspect fallback;
field-like composition, full-bleed on phones, page ground in the piece's own
slate. No audio, no microphone, no gradients, no shadowBlur, no filters, no
offscreen canvas; dots drawn as paired arcs with moveTo before every batched
arc. No AI-signature copy.

## QA
Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb; all three inspected. Thumb rendered three
times at 720x720, cmp byte-identical. Forced-time probes (temp copies,
discarded): t = 5 differs from frame one by 56,764 px (accretion underway),
t = 18 by 69,350 px (full warped stack, inspected: multiplied eyes and mouths
inside layered rotated head ellipses), t = 25 by 58,666 px (collapse underway).

## Fix rounds
1. Portrait unit raised from 0.52 to 0.60 of min(W,H) after the first desktop
   and mobile renders read too small, especially at thumb scale.
