# No.1890 Voice Into Wire

- Study: #247 beatrice-arrigoni
- Prompt: BA3, PP1137 (TASKS.md)
- Gallery date: 2007 · 03 · 16 (formula date 2002-01-10 + 1891 days)
- Palette: ground #0C0C0E, copper #B87333, electric blue #3A7BFF, magenta #D63384, white #FFFFFF

## Driver

A vocal signal trace spirals from a central mouth-point into a live-electronics tangle. The clean trace is a warm copper line; as it passes through eight processing nodes it frays into delays, granulated sparks and feedback blooms. The loop is closed: voice feeds electronics, electronics feed back into the voice's timing, and a thin dashed copper thread runs from the mouth to the listener node to show the loop closing through where you listen.

## Mechanism

2D canvas with a closed-form model. The copper spiral is an Archimedean spiral (3.4 turns, radius growing to 0.44 of the frame) with a slow wobble, plus a fainter echo trace one breath behind. Eight processing nodes sit on the spiral; each sheds 3 to 5 frayed blue and magenta strands and a cluster of granulated sparks. Three feedback blooms, white-hot centers ringed in magenta and blue, pulse deep in the tangle. All randomness is seeded from 1890 (mulberry32); node, strand, spark and bloom positions are fixed at load.

The listener node starts at (0.68, 0.48), marked by a soft double white ring with a copper core. Feedback depth is a smoothstep of distance from the mouth-point; mix is a linear ramp of horizontal position. Both drive the visuals (bloom size and alpha, the dashed thread, the Mix/Fb readout plate) and, once audio is started, the WebAudio graph.

## Audio

Breathy generated tone source, granulated in real time: a low sawtooth (174 Hz) through a bandpass plus looped filtered noise for breath, feeding a feedback delay (0.18 to 0.40 s) whose feedback gain (0.15 to 0.70) follows the listener's depth in the tangle. Audio is created lazily inside the first drag only, never autoplay; visuals run on the closed-form sound model before any gesture.

## Frame one

Fixed phase t = 12 s, hard-coded. At frame one the trace is mid-spiral with nodes already fraying and blooms already glowing. No wall-clock or random seed at frame one; all randomness seeds from 1890. Animation advances phase from 12 s; all oscillation is slow (0.6 to 1.4 rad/s), so flicker stays well below 14 Hz by construction. Prefers-reduced-motion freezes at frame one.

## Interaction

Drag earned. Pointer down anywhere moves the listener node there and starts a drag; moving it through the processing field changes the mix and the feedback character, like a hand on a mixer. The first drag also starts the breathy audio. The loop keeps running without input. Never click-to-reload. No DJ controller skin, no preset buttons, no master volume as the only control.

## Deviations from the prompt

None material. The study file studies/beatrice-arrigoni.md does not exist in the repo, so hexes were hand-picked from the named colors in the prompt (ground, copper, electric blue, magenta, white) as the task brief directed. The mix and feedback state is shown in a small readout plate at bottom right, which doubles as the sound indicator; the mouth-point sits slightly left of center at (0.45, 0.54) and the tangle fills the right two thirds as specified. Fix round: the drawn content was pulled inside the square with a 4% margin (uniform 0.74 scale, per-axis offset) so phones show the whole spiral instead of cutting its outermost turn at the left edge.
