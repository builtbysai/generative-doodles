# №8990 · Tone Rows - process

Seed 48 from the Sandy Noble / Polargraph study ("Tone Rows"): the
density raster as a machine-drawing study, not a picture of a machine.

Recipe: a generative driver field is sampled on the plotter's own grid,
150 rows walked boustrophedon so the gondola never wastes a return trip.
One vertical tick per dark pixel, tick length following tone to the 0.8
power, masked whites lifting the pen. The threshold is the seeded quantile
of the field's actual tone distribution, so the masked fraction is a
compositional decision and the piece captions it honestly: SEED, ROWS,
STROKES, MASK.

The driver is a circular Chladni mode: nodal rings and spokes of a round
vibrating membrane, tone = 1 - |mode|, so the machine draws long ticks
along the nodal lines and lifts the pen in the quiet regions. Seeded
ring count, spoke count, plate center, and phase. Default seed 51024
gives the rose-window read: inner flower, petal ring, outer ring.

Machine handwriting, not halftone: every tick gets hashed placement
jitter, a few degrees of angle wobble, and ink-alpha variation, with
round pen caps. A small pen dot travels the boustrophedon path during
the 9-second draw-in, then the piece rests as a composed still for the
gallery thumbnail.

Three other driver fields ship behind ?v=: square Chladni plate (1),
three-grating hex beat (3), and a Peter de Jong attractor binned to the
grid (4). Clicking the piece reseeds within the current variant.

Rendered clean: zero console/page errors across variants, inspected at
desktop and 390x844 with no overflow. Date: 2026-09-25.
