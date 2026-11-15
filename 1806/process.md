# №1806 The Serial Collaborator (SC7, PP1053)

EXPANSION #236 robin-rimbaud. Gallery date 2006 · 12 · 22.
Gallery note: "One field, four hands, each playing it differently. Watch only."

## Prompt source

TASKS.md, robin-rimbaud #236, SC7 PP1053, mechanism 6, serial
collaboration: one seed system, a slowly turning field of drifting forms,
rendered through a sequence of distinct hands (strict geometric, painterly,
archival, digital), each taking the same underlying field and playing it
differently, with slow dissolves between eras that each last long enough to
settle. No labels naming the hands, no chapter cards, watch-only, never
click-to-reload.

## Driver

One seeded field of drifting forms, played in turn by four genuinely
different rendering hands on a slow schedule.

## Build

One shared seeded field: 26 drifting forms (circle, square, triangle, bar)
from mulberry32(1806), with closed-form positions at any time t, so the
field is continuous across eras and frame one is deterministic. Four full
render pipelines read the same forms:

- Hand 0 geometric (t 0 to 75 s): white ground, hard black grid, flat
  black and white shapes with crisp strokes, one red accent form in five.
- Hand 1 painterly (t 75 to 150 s): paper ground, soft washes built from
  layered translucent ellipses in ochre and umber, wavy overlaid strokes,
  long dry-brush strokes, no hard outlines.
- Hand 2 archival (t 150 to 225 s): grey photocopy ground, halftone dot
  field, ink and rust shapes, 420 seeded grain speckles, torn paper edges
  on all four sides, caption-like ruled marks bottom left, no words.
- Hand 3 digital (t 225 to 300 s): dark grey gradient ground, phosphor
  green forms built from pixel blocks on a fixed cell grid with quantized
  centres and angles, scanlines every 4 px, precise grid lines.

Scheduler: each era lasts 75 s (inside the 60 to 90 s band), cycle 300 s.
The dissolve runs over the last 12 s of each era, crossfading the full
next pipeline over the current one with a smoothstep blend. No era labels
or chapter cards anywhere on screen. Watch-only: no pointer or keyboard
handlers are registered.

Template: live №1804 index.html, fetched fresh and mirrored for sizing,
plates, probe, and the fixed-phase first frame.

## Frame one (fixed phase t = 37.5 s)

Mid-era 0, the geometric hand: white field with black grid, hard-edged
black and white circles, squares, triangles and bars, red accents, the
drifting field clearly readable. Verified numerically: eraAt(37.5) = 0,
local fraction 0.5, blend 0, so frame one is pure geometric.

## Acceptance criteria

1. One seeded field shared by all four hands, positions closed-form in t.
2. Four genuinely different render pipelines, not palette swaps of one
   renderer: flat vector shapes, layered washes, grain and halftone,
   pixel blocks and scanlines.
3. Each era 75 s, inside the 60 to 90 s band, with a slow dissolve in the
   last 12 s.
4. Frame one deterministic at fixed phase t = 37.5 s, mid-era 0,
   geometric hand, field forms fully inside the field.
5. No era labels, chapter cards, or "now featuring" text on screen.
6. Watch-only, no click-to-reload, no pointer or keyboard handlers.
7. Flicker at or below 14 Hz by construction: drift and dissolves are
   slow, no flashing; prefers-reduced-motion renders a static frame.
8. House rules: Visual Viewport sizing with resize on visualViewport and
   window, canvas pinned in draw(), phone detection via window.screen
   with aspect fallback, full-bleed field on phones, square on desktop,
   one synchronous frame at load, requestAnimationFrame guarded.

## Deviations from the prompt

None material. The prompt says no title cards for the eras; the small
title, date, and hint plates are the house template and sit as
unobtrusive plates, same as every other piece. The painterly hand renders
every form as a wash rather than preserving hard shapes, which is the
point of a genuinely different pipeline.

## QA

Rendered from the actual shipped script with node-canvas
(~/workspace/tools/render-piece.js):

- Desktop 1280x900: square field centred on a dark ground, strict
  geometric hand, grid, black and white shapes, red accents, plates
  legible, no clipping.
- Mobile 390x844: full-bleed portrait field, same geometric hand,
  plates legible, no clipping.
- Thumb 720x720: square field, same composition as desktop.

All four hands and the dissolve were also probed directly through
window.__probe.drawAt at t = 112.5 (painterly), 187.5 (archival), 262.5
(digital), and 70 (dissolve): each era reads as a different pipeline over
the same field, and the dissolve shows geometric shapes fading into
painterly washes.

Two fix rounds. First: forms near the field edge were clipped at frame
one, so form positions now wrap inside [0.10, 0.90] of the field, keeping
every form fully inside; re-gated all three sizes. Second: the probe
caught a runtime error in the painterly hand, a pre-stringified alpha
passed to rgba(), which then called toFixed on a string; the alpha is now
passed as a number and rgba() stringifies it. Final files re-rendered
after the edit; frame-one output is byte-identical to the gated renders
(md5 of thumb.png unchanged).
