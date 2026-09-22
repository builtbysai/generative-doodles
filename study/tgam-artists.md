# TGAM artist deep dives — hop 1–2 out from tgam.xyz (2026-09-22)

Standard: full reads, visual inspection of real works, technique specifics.
Study, never copy.

## Nadieh Bremer — Visual Cinnamon (visualcinnamon.com) — via Issue #07 "She Codes"

Data artist / generative artist, Netherlands. Client work for NYT, Google,
Scientific American; generative collections on fxhash/Art Blocks.

**Technique 1 — data as obstacles in a flow field** ("Elemental Flows"):
one underlying flow-field algorithm, fine-tuned per element (Earth, Water,
Air, Sun, Digital). Real datasets become *obstacles* inside the flow:
tree density for Earth, rainfall for Water, air quality for Air, sunshine
hours for Sun. Same code, five moods — the data shapes the field, the
tuning shapes the reading. Stealable idea: any scalar dataset can be an
obstacle/emitter field inside a generic particle-flow system.

**Technique 2 — thread weaving** ("Twistings", fxhash; inspected
Twistings output at 1200px): thousands of fine threads stretched between
anchor points on two curves/shapes, each thread connecting point *i* to
point *i + twist*. Palette: madder red, black, pale blue, gold on off-white.
The twist offset is the whole trick — it turns flat hatching into woven,
lens-like 3D surfaces; multiple anchor-curve pairs layer into complex forms.
Local re-render study confirmed: twist 0.15–0.5, 250–400 threads per group,
alpha 70–90, slight bezier sag per thread for a hand-strung feel.

## DEAFBEEF (Toronto) — via Issue #06 "Input Output"

Generative audiovisual artist. "Nothing but a C compiler" — 10-year-old
computer, emacs, C. 20+ years across art/tech/music/blacksmithing.

**Technique — self-contained C as the medium**: instead of storing media or
browser-rendered code on-chain, store compact C programs that output raw
numerical data encodable to sound AND image. Argument: Ethereum already
depends on C compilers, so C adds no new dependency — maximum permanence.
Series: *Synth Poems* (analog-synth-inspired generative music; visuals are
direct oscilloscope traces of the signal, ode to vector displays), *Entropy*
(programmed to visibly DEGRADE each time the token is transferred — code
mimics analog copy-fidelity loss), *Angular*, *Noumenon* (minute-long
monochromatic animations; owners can take "chronophotographs" — Muybridge-
style still grids — via a `releaseShutter` contract call, with a time-lock
that doubles after each snapshot).
Stealable ideas: (1) the visual IS the audio buffer (Lissajous from samples);
(2) deliberate degradation as a feature — a piece that ages with interaction;
(3) motion frozen into contact-sheet grids.

## Zach Lieberman (NYC) — via Issue #05 "World Wide Art"

Artist/educator, OpenFrameworks founder, School of Poetic Computation
co-founder, MIT Media Lab Future Sketches. Daily code sketches since 2016.

**Daily-practice rules** (from his 2016/2017/2025 retrospectives, read in full):
- Avoid over-used algorithms (delaunay, particle systems, HSB color).
- Keep sketches simple; 30–60 min/day; sketching as meditation/break.
- *Prioritize iteration over novelty* — push an old sketch until it's new.
- Make images visually ambiguous: 3D that looks 2D, 2D that looks 3D.
- Keep an inspiration image collection (Tauber-Arp curves, Ruth Asawa,
  Armin Hoffmann diagrams) for stuck days.
- Workflow: code → screen-record → ffmpeg → phone → post; one chronological
  "everyday" archive (~100 GB) to retrace progression.
- "I've dedicated my life to sin()" — deep, playful commitment to primitives.

**2025 techniques**: *physarum* slime-mold algorithm (Jeff Jones paper,
popularized by Sage Jenson) — very simple agent rules → boundless organic
shapes; he explored its relationship to typography and the body. *Fluid*:
milk-in-coffee / oil-on-water looks from stacked displacement after
displacement in shader code (domain warping). *Glitch*: recursive
subdivision → fragmentary textile images. *Dots*: halftone circles
approximated by colored point series, each with own orientation/pattern,
non-linear size distributions, warping — "out of halftone space into
something alive and frenetic." *Line blob*: tape-delay-machine blobby forms
via box2d joints constraining angles so blobs touch cleanly without
self-intersection (used for a New Yorker illustration — blobby line
compressed into a brain shape with a mold). Circles/rectangles studies after
Vera Molnar ("My life is squares, triangles, lines") — softness and light
in simple geometry, thinking of Tadao Ando's Church of Light and Turrell.

## Piece seeds (study, never copy)
9. **Thread Twist** — 3–4 thread groups between anchor curves, twist offsets,
   red/black/blue/gold on paper white. Distinct: woven string-art surfaces.
10. **Data Obstacles** — flow-field particles bent around real scalar data
    (rainfall/tree cover as repellers), one algorithm, tuned moods.
11. **Physarum Letters** — slime-mold agents grown from letterform seeds,
    organic typography.
12. **Aging Piece** — every click/regeneration adds grain/degradation; the
    piece visibly ages with viewing (after DEAFBEEF's Entropy).
13. **Signal Draws Itself** — Lissajous figures drawn directly from a
    synthesized audio buffer; what you hear is what you see.
14. **Ambiguous Solids** — Lieberman rule: flat shapes shaded to read as 3D
    or 3D flattened to read as 2D; simple geometry, light-obsessed.
15. **Warped Halftone** — dot grid with per-dot orientation + non-linear
    scale warping, pushed until frenetic and organic.
