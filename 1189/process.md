# №1189 — The Correct Time

Jeff Kolar study block JK6 (PP348), after The Correct Time (2022): an
exact-time work that began "on the solar equinox at 8:03 PM CST... the
precise moment in time when the Sun crosses the Earth's equator
creating 12 hours of daylight and 12 hours of darkness... a reminder
that time unites us all." This piece is that moment, looped once a
minute: an astronomical clock with one dramatic beat and no other
events. Astronomy, not astrology — no stars are named, no zodiac is
drawn; the 120 dots are weather, not constellations.

## The clock

A thin ecliptic ring (radius 35% of the width, centred; capped by
height on wide screens so the ring is never clipped) and a horizontal
equator line through its centre. A sun dot (radius 1.5% of the width)
travels the ring. The 60-second loop has three states:

- **BEFORE** (lt < 36 s): pale dawn — field #1A1A24, ring #8A8A93,
  particles #E8DCC8 rising slowly. Readout: "T-minus Ns".
- **THE CROSSING** (36 ≤ lt < 39 s): the whole field inverts —
  #FFFFFF field, #000000 ring, particles frozen dark. Readout:
  "EQUINOX". This is a held state change, not a flash: the inversion
  stays up for the full three seconds.
- **AFTER** (lt ≥ 39 s): the descent into darker months — field
  #050507, ring #4D9FFF, particles #3A4A6B sinking slowly. Readout:
  "T-plus Ns".

## The crossing, derived

The crossing is placed by construction, not by detection. Define
sun-time τ within the loop: τ = lt before the crossing, τ is held at
36 during the whole crossing window, and τ = lt − 3 after it (the
three held seconds are not counted as travel). The sun's angle is

θ(τ) = 2π·(τ − 36)/57,

i.e. one revolution per 57 s of sun-time. The requirement for the
crossing is sin θ = 0 at the moment the piece marks, with the sun
passing from above the equator line to below it (the autumnal,
descending passage — the one Kolar's work began on). At τ = 36,
θ = 0 exactly: sin θ = 0, so the sun sits at (cx + R, cy) and its y
equals the centre y exactly. Just before, θ < 0 puts the sun above
the line; just after, θ > 0 puts it below. Because τ is held, the sun
remains exactly on the equator for the full three seconds of the
inversion — the correct time is a duration, not an instant. The loop
is seamless: θ at lt → 60 equals θ at lt = 0 (mod 2π). (The ring's
other diameter crossing is the ascending, vernal passage at τ = 7.5 s;
the piece passes over it in silence, as the calendar does — only the
autumnal crossing is marked, inverted, and named.)

## The particles

One seeded field of 120 dots. Each dot's height is a piecewise
integral over absolute time: y = wrap(y0 − vr·Tb + vs·Ta), where Tb
is the total number of seconds the piece has spent in BEFORE and Ta
the total in AFTER. Before the crossing the dots rise; after it they
sink; during the crossing neither integral grows, so the field
freezes exactly where the inversion caught it. Positions are
continuous at both switches and across the loop seam — no dot ever
jumps. A slight sideways sway runs on active time (Tb + Ta), so it
freezes too.

## The one interference

Dragging tilts the whole ring group — ring, equator line and sun
together — up to 8 degrees, following the drag's horizontal travel.
On release the tilt springs back as tilt·e^(−Δt/1.2). The crossing
still happens, just re-angled; the particles, which are not part of
the ring group, do not tilt. Time itself is never user-controlled:
there is no scrubbing, no pause, and nothing to reload.

## Determinism and house rules

First frame is synchronous at fixed phase T0 = 37.5 s — mid-crossing.
Frame one is therefore the inverted frame: white field, black ring,
the sun dot exactly on the equator line, the frozen particle field,
and the EQUINOX readout. Verified numerically against the render:
with R = 252 px at 720×720, the formula places the sun at (612, 360),
and the rendered thumb's pixel at (612, 360) is pure black with the
sun's dark run centred on y = 360 (canvas centre). The rAF loop is
typeof-guarded and anchored at T0 + elapsed; all randomness is one
seeded mulberry32 stream (seed 1189036). Canvas size comes from the
Visual Viewport API with resize listeners on visualViewport and
window; the CSS size is pinned in fit(). Phone detection via
window.screen (min dimension < 700 px) with the aspect fallback. No
gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData, no offscreen canvas, no audio, no microphone. Silent —
the equinox is drawn, never heard.
