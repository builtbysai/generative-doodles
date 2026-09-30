# №8960 — Face Walk (2026-07-23)

Seed 259 (Face-Walk the Solid).

Concept: Erv Wilson's hexany as a navigable octahedron. The six vertices
are the six hexany pitches 3 5 7 15 21 35 (opposite pairs multiply to
105); the eight faces are the eight triads, four otonal (amber) and four
utonal (slate). A walker crosses the faces on an edge-adjacent path: each
face lights as its triad is named in the readout, and the opposite face
flashes its inversion across the middle of the solid. Tapping a vertex
re-centers the world, every label redrawn as a ratio to the new 1/1.
Tapping a face plays its triad in just intonation (WebAudio, behind the
sound toggle, default off).

Technique: raw canvas 2D with a hand-rolled 3D projection (yaw/pitch,
perspective divide, painter-sorted faces). No WebGL dependency. Drag to
rotate, idle auto-spin resumes. Face data verified against Wilson's
structure: otonal faces (3,5,7) on 1, (3,15,21) on 3, (5,15,35) on 5,
(7,21,35) on 7; utonal faces all on 105.

QA: rendered and inspected at 1280x800 and 390x844; zero console/page
errors via cdp_exceptions.py at both viewports. Solid enlarged after
first inspection (was too small in frame).
