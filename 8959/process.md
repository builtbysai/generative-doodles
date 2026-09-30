# №8959 — Possible Worlds (2026-07-22)

Seed 260 (Pascal Zoom).

Concept: every combination-product set is one cell k)n of Pascal's
triangle; the hexany is the single cell 2)4 = 6. The triangle is drawn as
a map of possible chord worlds. Nine named cells (rust) open into their
own flat-ink diagrams: hexany (flat octahedron with the 12 edges and the
six pitch labels), dekany / pentadekany / 21 / 28 (rings with every pair
chord drawn), eikosany (offset-row tone lattice), 35 / 56 / 70 (dot
fields). Each world carries a plain-words caption. Zooming between map
and world is a smooth crossfade. ?open=k,n deep-links a world.

Technique: raw canvas 2D, binomial coefficients computed exactly, all
diagrams flat ink on warm paper. No WebGL, no dependencies.

QA: rendered and inspected at 1280x800 and 390x844, plus the hexany,
dekany, and eikosany detail views at desktop; zero console/page errors
via cdp_exceptions.py at both viewports. Triangle enlarged after first
inspection (was lost in the frame).
