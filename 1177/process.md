# №1177 — Wild at Heart, as a Control Voltage

Jason Soliday study block SD2 (PP336), after his *visible in the reflection*
(2015), where light-dependent resistors taped to a display let "the film
itself manipulate various parameters of my devices." Here the film runs the
synth, and the synth is always half a second behind it.

## The film

Left (40% on desktop, top on phones): an abstract drive-in — fourteen
seeded rectangles in red `#C33E3E`, teal `#2E7D7B` and bone `#E8E0D0`
drifting on closed-form sine wander (incommensurate periods per axis),
under a seeded grain field of ~850 specks whose visible subset scrolls
slowly in two layers. Sprocket strips top and bottom. The palette itself
rotates: a global hue wheel (one turn per 40 s loop, starting mid-reel at
phase 0.55) mixes each rectangle's colour toward the next palette colour,
with a per-rectangle phase offset, and a slow projector "lamp swell"
breathes the whole scene's brightness.

## The statistics — analytic, never pixel-read

Three control voltages are computed from the rectangle field as pure
functions of t; nothing is ever read back from the canvas:

- **Brightness** — the area-weighted mean of the rectangles' luminances
  (each after hue mixing and its own slow breathe), times the lamp swell.
  Rectangle overlap is ignored; that is the stated approximation.
- **Hue** — the rotation phase of the palette wheel itself.
- **Contrast** — the spread between the brightest and darkest rectangle
  luminances, scaled by a slow seeded wander.

## The rack and the lag

Right (60%): four lanes on `#151517` — OSCILLATOR, FILTER, TREMOLO,
EQUALIZER — each with a live readout (Hz / Hz / Hz / dB). Three patch
cables carry the voltages from LDR jacks on the film's edge: yellow
brightness → oscillator pitch (waveform strip draws more cycles as the
film brightens), cyan hue → filter cutoff (response-curve knee), magenta
contrast → tremolo rate (pulse-train spacing). Cable thickness pulses with
its signal; an LDR dot flashes, stepped, when its signal crosses 0.8 — at
frame one the hue LDR is lit (the wheel arrives at 0.875). The EQUALIZER's
three sliders (LO / MID / HI gains) mix the three voltages and are slaved
internally — a thin stub cable taps the hue line; it has no LDR of its own.

**The lag is the mechanism:** cables and LDRs carry the film's statistics
at time t, but every module answers `filmStats(t − 0.5)`. The rack is
perpetually playing the film as it was half a second ago, exactly like a
real LDR's response time.

## Interference

Dragging across the film is a flashlight wipe, never a control: pointer
samples (film-normalised, capped at 40, pruned after 3.6 s) are drawn back
as concentric flat-alpha light patches with exponential decay, and their
mean boost feeds the analytic brightness — so the rack follows your light,
0.5 s late, and there is still no way to touch a module directly.

## Determinism and house rules

First frame drawn synchronously at the fixed phase T0 = 13 s: rectangles
mid-drift, hue cable thick, oscillator at 78 Hz, filter knee high,
tremolo ticking at 5.7 Hz, one LDR lit. The rAF loop is typeof-guarded
and anchored at T0 + elapsed; all randomness is one seeded mulberry32
(rectangles and grain baked at load); statistics, wander, cables and
module responses are closed-form in t. Canvas size comes from the Visual
Viewport API with resize listeners on both visualViewport and window;
canvas.style.width/height are pinned in px inside draw(). Phone detection
via window.screen (min dimension < 700 px) with aspect fallback; on
portrait phones the film stacks over the rack and the cables drop from
the film's bottom edge. No gradients, no ctx.filter, no shadowBlur, no
offscreen canvas, no ImageData (the stats are analytic), no createElement,
no audio, no microphone. Silent by design — the parameters are drawn, not
heard.
