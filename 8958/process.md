# №8958 — Scale Loom (2026-07-21)

Seed 261 (MOS Weaving).

Concept: the Moments of Symmetry ladder as a loom. Fifteen horizontal
bands, one per ladder rung (step counts 7..19). Segment widths come from
the L/s step pattern of a single generator stacked through the octave,
computed as a Sturmian word. The generator animates through unfamiliar
values (0.60..0.71 of the octave, never the plain 3/2 at 0.585) and every
band re-segments live, boundaries easing toward their new places. Each
rung is labeled with its live L/s counts. The bands never look like any
known scale.

Technique: raw canvas 2D. Per band: Sturmian pattern from the current
generator, cumulative L/s widths (1.62/1.0) eased toward targets each
frame. Faint vertical weft threads across the field. Drag vertically to
turn the generator by hand (auto resumes after 4s); tap reseeds palettes.

QA: rendered and inspected at 1280x800 and 390x844; zero console/page
errors via cdp_exceptions.py at both viewports. Fixed title/readout
overlap and mobile label/caption collisions after inspection.
