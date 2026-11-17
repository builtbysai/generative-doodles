# Density, Drawn, No. 1858

Driver: two funnels face each other across a dark room, nearly touching at the narrow ends, and the ink inside them breathes like a tide, one filling with dense black scratches while the other thins to a few loose threads, then the tide turns and they trade places.

## Mechanism

Two funnel shapes are drawn on a charcoal ground in a centered square field, wide openings at the outer edges and narrow tips nearly touching at the center, with a small chalk tick marking the gap between the tips. Each funnel holds a field of up to 240 hand-scribbled loops, precomputed once from seeded PRNGs (mulberry32, seeds 1858 and 2858), each loop drawn as two overlapping open ellipse arcs with jittered tilt and offset so the marks read as hand loops rather than clean petals. A slow density tide with a 53 second period drives how many loops are shown: density is 0.55 plus 0.45 times a sine of time, with the two funnels in opposite phase, so the count rises and falls like a tide and the funnels trade dense and sparse states. At the fixed first frame (t = 60.0 s) the left funnel is dense and the right funnel sparse, mid-breath. Loops are clamped inside the funnel walls. The left funnel sits on a slightly lighter charcoal wash, the right funnel is washed in oxide red, and each loop is stroked first in faint chalk and then in ink black so the black ink reads on the dark ground. The label DYNAMICS DENSITY sits small and unassuming beneath the funnels in spaced capitals. The title and formula date are drawn on a plate on the canvas. The piece draws one synchronous frame at load, advances from the fixed phase only through requestAnimationFrame guarded by a typeof check, renders a still frame under prefers-reduced-motion, and keeps its flicker far below 14 Hz by construction since the only motion is the 53 second tide.

## Palette

Charcoal ground #262422, lighter charcoal wash #2E2B28, ink black scribble #0E0D0C, chalk white labels and outlines #EDEAE3, chalk soft #C9C4BA, oxide red wash #A63E28, oxide deep #7E2E1E, plate #EDEAE3, title ink #1A1816, hint ink #4A463F. Hexes were hand-picked from the prompt's named colors, since the reference study file studies/carla-kihlstedt.md does not exist in the repo.

## Interaction

Watch only. The drawing plays itself; there is no pointer interaction, no click-to-reload, and no sound toggle.

## Deviations from the prompt

The piece is visual only, with no WebAudio at all: a watch-only piece cannot autoplay audio, and no sound toggle is wanted here, so the prompt's drone ensemble and density driven voice count are represented visually only, by the rising and falling loop count. Nothing is counted, per the prompt: no numbers, staff lines, notation, or volume meter appear anywhere. The study file was unavailable, so the palette hexes above are hand-picked from the prompt's named colors rather than sampled from the study.

Gallery note: two funnels face each other on charcoal, one dense with black scribbles and one washed in oxide red and sparse, trading fullness on a slow tide beneath a small DYNAMICS DENSITY label. Watch the density breathe.
