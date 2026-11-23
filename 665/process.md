# №8935 · Standing-Wave Hatch - process

Concept statement: straight-line hatching treated as an animated medium.
A plate of parallel hatch lines is broken into short dashes, and a slow
traveling wave, sin(kx + ωt), sets every dash's length and survival.
Where the wave crests, dashes stretch past their spacing and merge into
solid blades of ink that drift across the plate and dissolve again;
in the troughs the lines fall back to sparse, broken ticks. A second,
lighter field at a shallow angle (about 11 to 19 degrees off the main
field) beats quietly against the first, so crossings shimmer where the
two waves disagree. The wave is the subject: the plate never draws a
picture, it just breathes.

Family: Standing-Wave Hatch (wave-modulated animated hatching), from
FUTURE_PIECES seed 52, in the takawo lineage of letting one simple
rule run until it becomes a texture. Study-informed, not copied: the
mechanism was derived from the written concept and tested against the
taste bar of the gallery rather than transcribed from any one artwork.

Differentiation: №8961 (Five Methods) renders tone with hatch as one
static panel among five portraits of a scalar field; there the hatch
serves a field and nothing moves but a drift panel. №8990 (Tone Rows)
is a polargraph walking its rows once, then resting; the machine path
is the subject. Here there is no field to render and no machine path:
the modulation itself is the picture, and the piece is continuous
animation, blades swimming for as long as the page is open.

Seed: default 271. Click or tap the piece to reseed. Seed picks hatch
angle, line spacing, dash period, blade wavelength (210 to 360 px),
wave speed and direction, the gentle vertical bend that lets blades
arc instead of marching straight, the slow standing swell that makes
them breathe, and one of four warm papers with a matching dark ink.

What was iterated:
- First pass ran the second field at up to 0.32 alpha with full dash
  lengths, and it grew its own competing blades; the page read as two
  prints fighting. Capped the second field's dash length at 0.60 of
  period and dropped its alpha to about 0.13 to 0.18, so now it is a
  fine interference grain that deepens crossings and never forms a
  blade of its own.
- Kept the troughs genuinely sparse with a count gate (low-wave dashes
  are skipped, not just shortened), so blade edges raggedly form and
  dissolve instead of fading uniformly.
- Per-line dash phase offsets, sub-pixel placement jitter and a few
  milliradians of angle jitter per dash keep the merged blades reading
  hand-cut rather than digital.
- Edge fade over the outer 36 px of the plate so ink never clips hard
  against the engraved double-rule border.
- Verified zero console/page errors via cdp_exceptions.py at 1280x800
  and 390x844, clicked to reseed and confirmed a fresh composition,
  and spot-checked other seeds (7, 1234, 99999) so the parameter
  ranges never land somewhere ugly. Phase frames at t = 0, 3.2 and
  6.4 s show the blades travelling left in step.
- Thumb is the t = 6.4 s frame at seed 271: four blades spread across
  the plate with space to breathe, readable at gallery size.

Gallery note suggestion (one-line italic): Hatch lines broken into
dashes that stretch and merge as a slow wave crosses the plate, so
blades of ink drift through the field and dissolve again.
