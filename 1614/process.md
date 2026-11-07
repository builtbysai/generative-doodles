# №1614 "Ink on Paper, One Pen" (JL7, jinyao-lin #212, PP861)

## Design
A Cloud Atlas scallop field as a physical pen plotter would draw it: one
blue-black pen (#1A2A6B) on warm paper (#F5F1E8), every tone built from
hatch, no fills, no gradients. The paper sits centered on a dark table
(#141210) with a clean margin around the drawing. The sheet plots itself
stroke by stroke over 45 seconds, then rests as a finished print with
only a faint paper breathing. Tap earns a new sheet: the paper clears
and a new scallop field plots. No other interaction.

## Stroke system
The composition is generated as a stroke list: rows of overlapping dome
arcs (scallops), each with an outline plus concentric inner hatch arcs.
Hatch count per scallop (1 to 5) comes from a smooth tone field (sine /
cosine plus a diagonal sweep), so darker regions are denser hatch, never
a fill. Strokes are ordered row by row, left to right, for continuous
plotting. The pen is round cap, fixed base width, with a slight pressure
wobble: width varies along each stroke as a closed-form sine of distance
along the stroke. One hatch band in the bottom-right corner (the hatch
arcs of the last scallop) is offset by 1.5 px: the registration wobble
where the pen re-seated.

## Cycle, determinism, and the fixed phase
- Cycle: 45 s draw, then the sheet rests indefinitely. A new sheet comes
  only from a tap. There is no auto-loop.
- Frame one is a pure function of piece time from a fixed start: the
  sheet clock is `tSheet + 22.5 s`, so at t = 0 the pen is 22.5 seconds
  into the plot (about half the field drawn, top rows complete). Gate
  fix: the first build used a 1.5 s phase and the thumbnail was a nearly
  blank sheet; 22.5 s keeps frame one an honest mid-plot moment while
  showing a substantial partial plot. This is the start of a sheet, not
  a finished print: the draw time is not faked.
- Tap reseeds from a FIXED seed sequence, never Math.random:
  1614001, 1614007, 1614013, 1614029, 1614049, 1614077, cycling. Sheet 0
  (seed 1614001) is the load state. Each seed changes the scallop
  radius jitter and the tone-field phases, so each sheet is a distinct
  but reproducible print.
- Paper breathing after completion is a closed-form 0.5% scale
  oscillation, 9 s period, ramping in over the first 2 s of rest.
- All seeded values come from mulberry32 over the fixed seeds. No wall
  clock is read anywhere; the rAF loop is anchored as offset plus
  elapsed-since-load.

## House rules
Visual Viewport sizing with resize listeners on visualViewport and
window; canvas element pinned in draw() via style width/height in px;
phone detection via window.screen (min dimension under 700 px) with
aspect fallback. Centered paper composition keeps its shape on phones;
the page ground is the table color and the labels are drawn in paper
color on the table. One synchronous frame at load; requestAnimationFrame
guarded with a typeof check. No click-to-reload: tap only starts a new
sheet from the fixed seed sequence.

## Deviations from the prompt
None material. The prompt's "paper breathing = 0.5% scale oscillation"
is implemented as a 9-second-period sine, ramping in over 2 seconds
after completion; the prompt does not fix a period. The "small fixed
number of strokes already drawn" at t = 0 is realized as a fixed 1.5 s
phase offset into the plot (22.5 s, about half the field), so the pen is
mid-plot on the first sheet rather than showing a counted set of
finished strokes.
