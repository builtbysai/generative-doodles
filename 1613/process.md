# №1613 One Signal, Two Senses (JL6, jinyao-lin #212)

## Design

A dark room in which one generative signal is read two ways at once: as
etched lines on black and, after a tap, as tone. After his KEF
"Intimate" (generative audiovisual, Hong Kong, Dec 2022) and the
composer's method: one input signal, sound and image as two readouts.

The drawing is a slow etched weather inside a centered field (~80% of
frame). The horizontal axis is time: the right edge is now, the left
edge about 63 seconds ago. Each of 84 columns reads the master signal
at its own moment. Hatch density is the amplitude (1 to 5 strokes per
cell, growing with |signal|); hatch angle is the pitch (the signal
derivative, leaning up to about 38 degrees as the tone rises or
falls). Where the tone deepens (signal below -0.55), stipple clusters
gather from a fixed seeded table. Where the signal peaks (above 0.82),
a few strokes and a small tick at the field's top edge turn accent
#E84A1E. The accent appears nowhere else.

Below the field, a thin notation strip shows the same signal's recent
history as a waveform etched in the same line language, with accent
hatch ticks under each peak in the window and a short tick marking now
at the right edge.

Palette is exactly three colors: room #0D0F14, etched line #D8D8D8,
signal accent #E84A1E.

## Fixed-phase choice

The master signal is a sum of three slow oscillators with periods 40,
63 and 89 seconds, evaluated as a pure function of piece time. The
periods are incommensurate, so the drift never loops; the signal is
still closed-form, so frame one (piece time 124.0 s) is byte-reproducible
across renders. The fixed phase was chosen in a rich stretch of the
drift: the trailing 63-second window at frame one spans signal values
from -0.673 to 0.892, so peaks and deep-tone stipple clusters are both
visible in the first frame. The notation strip is not an accumulated buffer: it is
the same closed-form signal evaluated over the trailing 63-second
window, so it scrolls without stored state. Stipple comes from a fixed
mulberry32 table seeded 1613007, never Math.random(). The animation
loop is anchored as PHASE + elapsed-since-load.

## Audio design

No audio exists until the first tap. The tap lazily creates an
AudioContext inside the gesture (browser policy), starts two voices
(sine and triangle, detuned by a factor of 1.005) through a lowpass
filter at 800 Hz, and then the instrument plays itself: every frame
updates frequency from the signal derivative (180 Hz times 2 to the
normalized derivative, about 90 to 360 Hz) and gain from the
amplitude (about 0.015 to 0.10). There is no pointer interaction after
enabling; no beat, no loop, no pre-recorded music. The visuals run
silently without audio until the tap.

## Deviations from the prompt

None material. Two clarifications, both faithful to the prompt's
mechanism: the notation strip is a closed-form re-evaluation of the
signal over the trailing window rather than a stored history buffer
(identical visible result, keeps frame one deterministic); the stipple
clusters use a fixed seeded table rather than a live threshold sampler
(the clusters still appear exactly where the signal crosses the deep
threshold).

## House rules

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen (min dimension under 700 px) with aspect
fallback; centered composition keeps its shape on phones with the page
ground set to the piece's own background (#0D0F14) and the hint in the
etched line color. One synchronous frame at load; requestAnimationFrame
guarded by a typeof check. Tap only enables audio; no click-to-reload.
Title "One Signal, Two Senses", date "2006 · 06 · 12", hint "Tap to
enable sound." No em dashes in visible copy.
