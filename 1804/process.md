# №1804 The Moving Photograph (SC5, PP1051)

EXPANSION #236 robin-rimbaud. Gallery date 2006 · 12 · 20.
Gallery note: "One photograph, always whole, never the same twice. Watch only."

## Build

One full-frame archival photograph of a hall: three tall arched windows on a
warm sepia wall, two posters with text-like marks, a boarded floor in
perspective, and a crowd of eight figures in dark coats. The photograph is
built from eight fixed authored procedural regions, each on its own long
closed-form clock. Morphs are per-region low-alpha crossfades only; there
are no global transforms, no slideshow cuts, no ken-burns pan, and no film
grain. Watch-only: no pointer or keyboard handlers are registered.

Template: live №1799 index.html, fetched fresh and mirrored for sizing,
plates, probe, and the fixed-phase first frame.

## Region table and staggered clocks

Morph parameter m(t): rest at state A while the cycle fraction is below
0.55, smooth morph A to B over 0.55 to 0.75, rest at B to 0.90, morph back
to A over 0.90 to 1.00. Colour bloom envelope: rise 0.55 to 0.65, full
0.65 to 0.80, fall 0.80 to 0.90, zero elsewhere. All clocks are closed-form
functions of piece time; layout jitter comes from mulberry32(1804) only.

| Region | What it is | Period | Offset | State at t = 60 s |
| --- | --- | --- | --- | --- |
| R1 | Face, second figure from left | 300 s | 0 s | frac 0.200, m 0.000, at rest, face A |
| R2 | Face, sixth figure | 280 s | 120 s | frac 0.643, m 0.447, MID-MORPH, face A dissolving into face B |
| R3 | Right opening, window to doorway | 360 s | 20 s | frac 0.222, m 0.000, at rest, window |
| R4 | Left poster, three decades | 420 s | 200 s | frac 0.619, m 0.275, MID-MORPH, 1920s poster dissolving into the 1950s poster |
| R5 | Right poster, two states | 320 s | 90 s | frac 0.469, m 0.000, at rest, rules poster |
| R6 | Centre figure coat, faded rust bloom | 300 s | 150 s | frac 0.700, bloom 1.000, MID-BLOOM, coat fully rust at frame one |
| R7 | Small sign under right poster, faded teal bloom | 360 s | 100 s | frac 0.444, bloom 0.000, at rest, no colour |
| R8 | Figure stepping through the doorway | 240 s | 200 s | frac 0.083, m 0.000, at rest, no figure visible |

Scan line at frame one: (60 mod 240) / 240 = 0.25, one quarter down the
frame, visible as a faint band with a thin brighter core. The left poster
state index at frame one is cycle 0, morphing state 0 to state 1.

## Frame one (fixed phase t = 60 s)

Verified numerically from the shipped script: R2 mid-morph at m 0.447,
R4 mid-morph at m 0.275, R6 coat at full faded-rust bloom, scan line at
0.25 of frame height, every other region at rest. The photograph reads as
one whole image: the morphs are small, scattered, and slow.

## Deviations from the prompt

None material. The prompt says no border and no caption for the photograph
itself; the small title, date, and hint plates are the house template and
sit as unobtrusive plates, same as every other piece. Faces and posters are
procedural marks, not photographic imagery, which is the only way the
morphing photograph can be built as a self-contained canvas piece.

## QA

Rendered from the actual shipped script with node-canvas
(~/workspace/tools/render-piece.js):

- Desktop 1280x900: square field centred on a dark sepia ground. Three
  arched windows, two posters clear of the window frames, eight crowd
  figures, floor boards converging, scan line faint at one quarter height,
  centre figure coat in faded rust. Title and date plates top left, "Watch
  only." bottom left.
- Mobile 390x844: full-bleed portrait field, same scene, plates legible,
  scan line visible, rust coat visible.
- Thumb 720x720: square field, same composition as desktop, plates legible.

One fix round: the left poster first sat 0.005 of field width over the
first window frame; moved it to x 0.252 so it clears the window, then
re-gated all three sizes. Final files re-rendered after the edit.
