# №9004 · Tidepool — process

Date: 2026-09-05. A Gray-Scott reaction-diffusion simulation: two chemicals,
U and V, reacting and diffusing across a grid. The V field is rendered as
ink on warm paper, so the chemistry reads like something growing in a
tidepool rather than a screensaver.

## Algorithm (own implementation)

Vanilla canvas, Float32Array grids, no libraries. Each step applies the
standard Gray-Scott update with Du 0.16, Dv 0.08 and a 9-point Laplacian
(0.2 orthogonal, 0.05 diagonal). Grid is 176 cells a side on desktop,
128 on phones, upscaled with smoothing so the field stays soft and organic.
Iterations per frame adapt to a measured millisecond budget, so the sim
stays smooth without hogging the frame.

Seeding is deterministic (mulberry32). The field starts as pure U with a
handful of V colonies scattered across it plus a whisper of background
noise. The colonies bloom into growth centers within the first seconds.

## Rendering

V concentration maps through a smoothstep tone curve into a three-stop
ink ramp: warm paper, then umber, then near-black ink. Low V stays clean
paper, so the background never turns to mush. The U field faintly tints
the paper where it is depleted, which gives the background a little depth.
A blurred copy of the field is laid under the crisp one at low alpha for
an ink-bleed halo, then paper grain (multiply, 6 percent) and a gentle
vignette finish the print feel. Palette committed early: black ink on warm
paper, nothing neon anywhere near it.

## Regimes

Six feed/kill pairs, all verified with a headless parameter sweep before
any of them shipped:

- coral labyrinth · F 0.035, k 0.060 (the default)
- mitosis · F 0.014, k 0.054
- wavelets · F 0.030, k 0.062
- tide stripes · F 0.025, k 0.055
- turing field · F 0.010, k 0.047
- spots and rings · F 0.014, k 0.049

Clicking resows the field with a new seed and a new regime, never the
same regime twice in a row. After each regime reaches maturity, feed and
kill drift inside a narrow 5 percent band, so the pattern keeps breathing
instead of freezing into a final state.

## What the iteration taught

My first regime list was half remembered and half wrong. The classic
"coral" pair F 0.035, k 0.065 decayed to a blank page in this
implementation, and a 12-candidate sweep showed why: at these diffusion
rates the living region sits a little lower, at k 0.060. Same sweep
rejected a mazur pair that saturated the whole field into grey mush and
two worm pairs that died outright. The winners were picked by looking,
not by reputation.

A 40,000-iteration drift test confirmed the long-run behavior: the
labyrinth slowly reorganizes into flowing stripes, stays dense and alive
the whole way, and never collapses or goes noisy. That is the piece doing
exactly what it should.

Default seed 9004, coral labyrinth. It won because the labyrinth reads as
living tissue at every scale I checked, from the first bloom to deep
drift. Click for a new tide; the seed and regime live in the URL.
`?still=N` freezes a frame after N iterations for testing, `?bare=1`
hides the caption. prefers-reduced-motion renders one mature frame.
