# Nine Sound-Paintings (No.1892)

## Source

TASKS.md prompt block BA5, PP1139, study #247 beatrice-arrigoni.
Gallery date 2007 · 03 · 18 (formula date 2002-01-10 + 1893 days).
The study file studies/beatrice-arrigoni.md does not exist in the
muse-soul repo, so accent hexes were hand-picked from the prompt's
named colors, as with the #246 builds.

## Driver

Nine short vignettes play in sequence, each about forty seconds, each
with its own visual rule set. Each vignette dissolves fully to black
before the next begins. Together they form one piece; no vignette is
a song, each is a painting that makes sound. The sequence runs 360
seconds, then holds on the final painting. A small roman numeral marks
the current painting in the top right corner, then fades before the
dissolve.

## The nine vignettes

| No. | Painting | Accent | Mechanism |
|-----|----------|--------|-----------|
| I | Charcoal Drift | ochre #C07A1F | 220 soft grey smudges drift on slow sine paths, 70 ochre grain specks shimmer |
| II | Rotating Letterforms | rust #B4552D | 12 pseudo-script glyphs, each a cluster of 3 to 5 line and arc strokes, rotate slowly above faint baselines |
| III | Pulsing Dots | teal #2E7F7A | 16 by 16 dot field, radius and alpha pulse on a traveling wave |
| IV | Ink Clouds | bone #EDE6D6 | 14 radial-gradient ink clouds scale up on a slow zoom, bone dust motes drift through |
| V | Falling Staves | violet #7D3C98 | 90 short vertical dashes fall at varied speeds with a sideways sway |
| VI | Tide Lines | olive #6B7A2A | 9 horizontal contour lines undulate on two summed sine waves |
| VII | Copper Rings | copper #B87333 | 8 centers emit expanding rings that fade as they grow |
| VIII | Pale Blue Grid | pale blue #A8C4D4 | 8 by 8 squares rotate on a traveling wave, some fill solid as the wave passes |
| IX | Crimson Field | crimson #A93226 | 5 large radial blooms breathe slowly, held at the end |

Monochrome base #111111 across all nine. The nine sketches are
genuinely distinct mechanisms, not palette swaps. Letterforms are
abstract pseudo-script built from seeded strokes, never readable
real words.

## Mechanism

A vignette sequencer holds nine independent render functions in the
VIGS array. Each vignette lasts 40 seconds. Its alpha envelope fades
in over the first 2 seconds, holds, and dissolves over the last 4
seconds to full black before the next painting begins. After t = 360
seconds the sequencer holds vignette IX fully present. All geometry
is precomputed at load from mulberry32(1892); every animation is a
pure function of the phase time, so the piece is deterministic.

## Frame one phase

Fixed phase t = 12 seconds, inside vignette I with the charcoal drift
already underway and the ochre grain shimmering. No wall clock or
random seed at frame one; all randomness is seeded from 1892.

## Interaction

WATCH ONLY. No skip buttons, no chapter select, no playlist UI.
Taps do nothing. Skipping between vignettes would break the cycle
premise. Visual only: no WebAudio, since a watch-only piece cannot
autoplay audio. Hint plate reads "Watch nine paintings pass."

## Technical

2D canvas, self-contained, no external assets. Visual Viewport
sizing with resize listened to on visualViewport and window; canvas
element pinned in draw() via canvas.style.width and height in px;
phone detection via window.screen (min dimension under 700px) with
aspect fallback (h > w*1.15); field-like composition full-bleed on
phones, centered square on desktop, page ground set to the piece's
own near-black. One synchronous frame is drawn at load and
requestAnimationFrame calls are guarded with a typeof check so
node-canvas QA works. Flicker stays at or below 14 Hz by
construction: the fastest oscillation is the 0.5 rad/s dash shimmer,
well under the limit. prefers-reduced-motion freezes at frame one.

A QA hook only: ?t=SECONDS, ?v=N, or ?seed=N in the URL jumps the
sequencer to a later phase for rendering checks. No link in the piece
uses it.

## Deviations from the prompt

None. The five invented vignettes (V through IX) follow the prompt's
instruction to invent five more in the same spirit, each with its own
named accent from the prompt list.

## QA

Rendered from the actual script with node-canvas and inspected
visually: desktop 1280x900, mobile 390x844, thumb 720x720, all at
frame one. Vignette I charcoal texture legible with ochre specks,
roman numeral I present, plates clean, mobile full-bleed with no
clipping. All nine vignettes were also rendered at mid-phase
(t = 52, 92, 132, 172, 212, 252, 292, 340) and inspected: each is
visibly distinct from vignette I and from each other. No fix rounds
were needed. No em dashes in visible copy.
