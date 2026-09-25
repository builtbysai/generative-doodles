# Doodle №9024: Personal Weather (2026-09-25)

**File:** `9024/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A field of short wind barbs on paper, each one holding a fixed personal
heading. The pointer does not push the barbs around. It paints weather
into a low-resolution wind field underneath them, and each barb answers
only by tilting toward the wind, stretching, and sliding along its own
heading, warming from steel blue to amber as the gust strengthens. Fast
flicks leave amber streaks that bloom and decay back to a calm blue drift;
a resting pointer paints nothing at all, so the field settles. There is
no image source and no portrait: the drawing is pure interaction residue.
A faint ambient drift keeps the field alive before the first touch.

## Technique synthesis (from study, not copied)
Studied Bruno Imbrizi's Interactive Particles (Codrops, Jan 2019): the
portable idea is the interaction history living in a low-res texture bus
instead of per-particle state, with speed-as-pressure
(force = min(dist^2 * k, 1)) and an envelope that eases up over the first
30% of a trail point's life and down over the rest. Kept from the study:
the 64x64 field bus, the envelope shape, speed as pressure, and the
signature move of displacing each mark along its OWN fixed direction
scaled by the field value (never a radial push from the cursor). Changed
everything else: no portrait, no dots, no WebGL. The geometry is short
line segments with seeded coherent headings (value noise plus jitter),
the bus is a float array stamped directly instead of a canvas texture,
and the displacement law is tilt-plus-stretch-plus-slide with a blue to
amber heat ramp and bright cores on the strongest gusts.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL; default seed 902403
- `?demo=1` runs three scripted gusts (used for the preview thumbnail)
- Trail life 1500 ms, max 240 trail points

## Verification
- Zero console/page errors on load (desktop + 390px mobile, checked with
  the fail-closed exception collector)
- Rendered 3 seeds headless with scripted gusts; all read clearly, default
  seed has the strongest composition
- One real bug fixed during iteration: the first field-bus encoding used a
  black canvas whose zero point decoded as a (-1,-1) wind vector, turning
  the whole field amber; fixed structurally by stamping trail points
  directly into float arrays with no encode/decode step
- No scroll or overflow at 1280x800 or 390x844; rest state shows a calm
  blue drift, never blank
