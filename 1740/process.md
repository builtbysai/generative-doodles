# Recur, The Transcription, No.1740

A 30 by 15 grid of cells on one shared dark ground. Each cell holds a glitch
block on the cold left and a bowed arc on the warm right. A slow triangular
sweep crosses the field over a 24 second loop and back; the sweep position
drives a per-cell morph from rect to arc, with hue lerping from cold screen
grey and signal white to amber and wood brown. The middle band is where rects
thin and arcs grow out of them.

## Mechanism

Cell geometry comes from a seeded PRNG fixed at load, so frame one is
identical every run. The glitch flicker is a pure hash of cell position and a
quantized time step, so the cold side keeps jittering in strict repetition
while the warm side settles into still arcs. Frame one sits at a fixed phase
of 6 seconds into the loop, sweep mid-frame, so the translation gradient
reads in the thumb: blocks left, arcs right, meeting in the middle.

## Interaction

Watch only. No input. The transcription sweeps left to right and back on its
own loop.

## Deviations

None from the prompt. No literal staff notation; the arcs are bowed gestures
in rows, not a score. The field is full-bleed on phones and a centered square
on desktop, per the house rules.
