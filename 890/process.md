# No.890 Slipstream

Study #109 klsr.av, PP51 "Aurora Field" (from "SLIPSTREAM (Hologram Mix)", 2026-07-30).

## Concept

An aurora caught in slow motion: thin ribbons of light curl on a blue-black sky,
their color shifting along their length from teal through green to violet, over a
faint smoke bed. The pace is glacial on purpose: nothing in the piece moves fast
except what the visitor's own hand tears loose, and even that re-knits slowly.
The hand is the wind. A drag bends the filaments aside in a wake; a fast drag is
a gust that scatters them; a tap strikes one bright knot that ripples outward
through the nearby ribbons; a double-tap earns the only pause, four seconds of
perfect aurora still. There is no interface at all: no labels, no meters, no
beats. The sound, once a first gesture allows it, is a slow pad whose filter
opens with the same wind value that bends the picture.

Palette, strict: ground #061214, teal #2EE6A8, green #8AFFB0, violet #7A5CFF,
smoke bed #1A2A30, hot knot #E8FFF8. Nothing else.

## Construction

**Field and paths.** One global analytic curl field: a stream function built
from three summed sine products with seeded phases, velocity taken as its curl,
so the field is divergence-free by construction. At init, the field's extrema
are found on a coarse grid; each filament seeds near an extremum and its path is
the level set through that seed, integrated once with fixed arc-length steps
into a waypoint table. A level set that returns near its start is a closed loop;
the final stretch is blended onto the start point so the table wraps seamlessly.
Each filament is then a chain of 24 points occupying a window of its loop (the
window is sized by arc length, 0.38 to 0.78 domain units, so chains read as
ribbons, not whole ovals). Points slide along the table in closed form: a full
lap takes 650 to 1550 seconds. On top of the slide there is only a whisper of
secondary motion: a tiny perpendicular shimmer from the table tangent, a slow
whole-loop rotation of at most 0.03 radians, and a drift of about one percent of
the frame over minutes. Luminosity breathes per filament on 80 to 230 second
periods. Six filaments carry a hot knot that pulses on a 26 to 56 second cycle;
the hero knot is phase-set to peak at frame one.

**Drawing.** The smoke bed is eight wide flat-alpha ellipses in three layers
drifting almost imperceptibly in the lower frame. Filaments draw in two passes
(a wide faint pass and a core pass) as eight color bands per chain, one polyline
per band, with the teal to green to violet ramp sampled at each band. Band
strokes use butt caps so joints never double-paint. The base curve is sampled at
three sub-points per anchor span so ribbons are silky rather than faceted;
wind offsets, which vary slowly, are computed at the 24 anchors and interpolated
across sub-samples. Bands dipping below 70 percent of the frame height fade
toward 45 percent alpha: the ribbons belong to the upper sky, the smoke owns
the bottom. Violet gets a small alpha lift because it reads dimmer than the
teal at equal alpha.

**Interaction, all recorded events.** Drag samples become wind impulses
(position, velocity, time on the motion clock, strength, radius, decay).
A point's offset is the closed-form sum over impulses: radial push away from
the impulse center plus a small along-velocity term, Gaussian falloff, capped
magnitude. Gentle drags use tau 3.2 s; gusts (pointer faster than 0.85 frame
widths per second) are stronger, wider, tau 4.6 s, so a tear takes roughly ten
seconds to re-knit. Taps are deferred 0.34 s for double-tap disambiguation
(house pattern), then recorded as strikes: a bright disc blooms at the tap
point and a luminosity ring travels outward at 0.55 domain units per second,
whitening and brightening the filaments it crosses. A double-tap records a
calm: the motion clock freezes for exactly 4 s. Because every position, offset,
and ripple is a function of the motion clock and the recorded event list, the
still is perfect, and interaction decays freeze with it rather than leaking
through the pause.

**Audio.** Lazy and typeof-guarded, created on the first pointer gesture only:
two detuned sines (110 Hz, 110 x 1.006) plus a 55 Hz sub through a lowpass,
and a looped seeded brown-noise bed through the same filter. A summary value,
windLevel, is computed from the same impulse list the visuals use; audioTick
maps it to the filter cutoff (520 to about 3000 Hz) and a small pad gain lift,
so gusts literally open the sound. Strikes fire a glassy two-partial sine ping
(1244 and 1866 Hz) at the moment the tap confirms. Master runs through a
compressor. The piece renders complete in total silence in the QA harness.

**Determinism.** Frame one is the synchronous draw at t = 0 with the field
mid-drift. No Date.now, no Math.random anywhere (verified by grep: zero hits
for Date.now, Math.random, gradients, shadowBlur, createElement, getImageData).
All randomness is mulberry32 with fixed seeds; the rAF timestamp is the only
clock; rAF is typeof-guarded. Canvas size comes from the Visual Viewport API
with resize listeners on both visualViewport and window; the canvas CSS size
is pinned in pixels inside draw every frame; phone detection uses the physical
screen's minimum dimension with the aspect ratio only as fallback.

## QA log

- Rendered with the house renderer at 720x720 (thumb), 1280x900 (desktop),
  390x844 (mobile). Thumb rendered twice and byte-compared with cmp:
  identical, re-verified after every fix round.
- Round 1 read-back: filaments read as angular polygonal loops, many near
  duplicates of each other, violet underrepresented, smoke bed visible as
  stacked flat bands. Fixes: the chain is now sampled at three sub-points per
  anchor span (faceting gone); extremum seeds are deduplicated at 0.30 domain
  units and taken round-robin with wider radius spread; the chain window is
  sized by true loop arc length so chains are arcs, not ovals; smoke puffs got
  a third, wider, fainter layer; violet segments got an alpha lift.
- Round 2 read-back: smooth ribbons, but a beaded bright-dot texture sat at
  regular intervals on the brightest chains (band joints double-painting under
  round caps), and too many ribbons tangled into the lower third. Fixes:
  band strokes switched to butt caps (dots gone); filament seeds biased harder
  to extrema above 60 percent height with smaller radii; bands dipping into
  the smoke zone now fade with depth.
- Round 3 read-back (final): blue-black sky, smooth thin ribbons shifting teal
  to green to violet along their lengths across the upper frame, smoke bed a
  faint presence below, several hot knots lit including the hero knot at peak.
  Mobile holds the same composition in the tall frame; ribbons bleeding off
  the edges is by design (the field fills the frame). No text anywhere except
  the title. No clipping problems.

## Deviations

- The brief asks for chains advected through a curl-noise field with points
  following precomputed streamline paths. The shipped route is that model with
  one strengthening: the streamline for each filament is a closed level set of
  the analytic field, integrated once at init, and every later position is a
  closed-form lookup on that table. Nothing is frame-integrated, which is what
  keeps frame one byte-exact for the determinism gate while the motion stays
  genuinely field-born.
- A small number of seeds could in principle fail to close a level set (stall
  near a saddle or escape the extended domain); those fall back to a seeded
  Fourier oval table built from the same RNG stream, so the build is
  deterministic either way and the fallback is visually indistinguishable.
- The color ramp is drawn as eight flat bands per chain rather than a
  per-pixel gradient: the house rules forbid gradient fills, and banded flat
  color is the established way to get a continuous-looking ramp without them.
- The audio filter follows windLevel, a closed-form summary of the wind
  impulse field (total live impulse strength), rather than a measured mean of
  every point's velocity: it is computed from the identical event list the
  visuals use, so sound and picture still answer to one wind.
