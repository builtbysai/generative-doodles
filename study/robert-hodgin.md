# Robert Hodgin (flight404) — Deep Study Notes

**Date:** 2026-09-23 (study pass)
**Artist:** Robert Hodgin, flight404. RISD sculpture background, Brooklyn.
Co-created the Cinder C++ creative-coding framework. Co-founder / Head of R&D
at Rare Volume. Formerly Processing, now real-time GPU C++. Known for the
iTunes 8 default visualizer (Magnetosphere, 2008).
**Doorway:** cited by Raven Kwok on his Skyline page as voronoi lineage;
followed past the voronoi into his cartography work instead.

**Focus of this pass:** Meander (May 2020) — "a procedural system for
generating historical maps of rivers that never existed." Project page
roberthodgin.com/project/meander read in full, plus the American Rivers Q&A
(2023). Four finished maps and the 1944 Harold Fisk plate he homages
inspected at full resolution. One local re-render study of the meander
engine (hidden_files/hodgin-study/meander-study.html), iterated v1 to v4
with headless screenshots at each step.

## What the finished maps look like (specifics)

**meander_v33d_a — "ANCIENT COURSES of the UPPER DISASTER RIVER":**
- Aged paper ground (warm tan, visible fibers, soft vignette), full-bleed map
  with a double-ruled engraved border, corner coordinate ticks, a scale bar,
  and a fake timestamp "2020/05/17 · 00:28:25 EST" top left.
- The river is a broad RIBBON, not a line. The current channel is pale cream
  with a dark ink outline; beneath and beside it lie the historical courses,
  each epoch its own flat color (turquoise, rust red, ochre, slate blue,
  sage), some with fine diagonal hatch fills. Epochs nest inside the bends
  like tree rings.
- Background terrain is extremely fine: stippled dot fields, faint contour
  squiggles, thin parcel/plot lines, all in pale sepia, kept 3-4 tonal steps
  below the river so the eye never confuses ground and figure.
- Place names in spaced small caps serif ("SEERING MOUNTAIN", "BASSWOOD
  HILL", "RULLANDS COULEE MARSH", "TYLER LAKE MOUNTAIN"), scattered with
  generous clearance from the river. A legend of color chips runs down the
  right side.
- Title in engraved serif caps, letterspaced: "ANCIENT COURSES / of the /
  UPPER DISASTER RIVER".

**meander_v33_c_detail (3D perspective render):** the courses are raised
ribbon geometry; older channels glow red beneath the white current channel;
terrain is a fine dot grid; the legend is a strip of colored chips top
right. Confirms the layering order: terrain at the bottom, old courses
stacked by age, current channel on top.

**Fisk plate 22 (1944), the homage:** each meander stage is a numbered
colored ribbon (stages 2-19, numbers in circles), nested crescents marking
former banklines, "BANKLINE SYMBOLS" and "CUT-OFF SYMBOLS" legends (neck
cut-off, chute cut-off, fault), stippled terrain. The visual grammar Hodgin
borrows whole: numbered stages, nested crescent courses, symbol legends.

## The technique (his words, then what they mean in code)

1. **It begins with a line.** A guide line becomes the river. A randomized
   terrain is generated and the guide line cuts a valley through it. The
   valley controls the flow: slow rivers on flat plains meander, fast rivers
   on steep terrain do not.
2. **Modified-bitangent migration.** Each point on the curve has a tangent
   (along the line) and a bitangent (at right angles). The bitangent is
   modified to always point to the OUTSIDE of the curve, with length
   proportional to the local curvature. A new vector blending tangent and
   modified bitangent is added to each point's position. Bend style comes
   from the two weights, bend intensity from the vector scale. This is the
   whole engine: curvature creates outward push, outward push creates more
   curvature, bends grow on their own. (His Q&A: "simulating thousands of
   years in the span of a few seconds" at interactive frame rates.)
3. **Oxbow lakes.** Distance checks find near self-collisions; the curve
   segment between the two collision points is isolated into its own crescent
   curve. Lakes only shrink over time until deleted, and the river is kept
   from reintersecting them (lake sections at risk of overlap are deleted).
4. **The historical record.** Past channel positions are kept and rendered as
   the stacked colored courses. The map is the accumulation.
5. **Land plots** (background): points scattered on the river spline and the
   plane, Voronoi Fracture into polygons, iterated subdivision into
   pseudo-random plots, organic shoreline boundary plots, plot id numbers at
   polygon centers. (Not reused: voronoi is on the avoid list.)
6. **Roads:** an organic growth system. Randomly placed points get directional
   growth vectors and draw lines as they move; a point stops when it hits
   another line; vectors rotate slowly as they grow; mixing curving and
   non-curving vectors yields intersecting road-like networks; line thickness
   is proportional to line length.
7. **Naming:** a USGS GNIS place-name database parsed by Andrew Bell, suffixes
   ("Lake", "Summit") cropped off, duplicates and long names removed, new
   suffixes randomly reattached: "Hudson Summit", "Hudson Swamp". Features
   named: river, lakes, islands, peaks (high flat areas), basins (low flats
   near water), marshland (low-slope bounding boxes).

## What the local re-render study proved (v1 to v4)

- The raw modified-bitangent rule is unstable: positive feedback explodes
  point counts (319 to 56,589 in 35 steps) and wedges the tab. Three
  stabilizers, all faithful to his description: (a) saturate the curvature
  response, (b) smooth the curvature field over a neighborhood so LONG
  wavelengths win (meander wavelength is ~10x channel width in nature),
  (c) a valley spring pulling points softly toward the guide line, i.e. his
  terrain valley as a force. Plus fixed point-count resampling and a
  per-step displacement clamp.
- Cutoff rate is tunable via minimum loop length and collision threshold;
  about 10 cutoffs per 600 simulated years gives a Fisk-like density.
- The Fisk nesting appears only when migration between epoch snapshots is
  small relative to channel width; 13 epochs over 600 years with slow
  migration gives nested crescents, fast migration gives confetti.
- 600 simulated years run in ~0.5-0.7s for 320 points in plain canvas JS:
  fast enough to simulate live on click, even on a phone.
- Locked parameters that read as "river" across seeds: 320 points, tangent
  weight 0.3, bitangent weight 0.7, step scale 3.2, spring 0.006, smoothing
  0.3, min loop 80 points, cutoff threshold 0.55 x width.

## Portable techniques (study, not copy)

1. **Curvature-outward migration as a growth engine.** Not erosion
   deposition, just: push each point away from the bend center proportional
   to smoothed local curvature, advect slightly downstream, stabilize with a
   valley spring. Bends are emergent, never drawn.
2. **Time as the composition.** The artwork is the accumulation of past
   states, each rendered in its own flat color, oldest first, current state
   on top in cream. The sim IS the drawing.
3. **Cutoff events as punctuation.** Self-collision detection turns a runaway
   loop into a crescent lake that shrinks and dies. The lakes are the
   system's memory of its own drama.
4. **Map furniture sells the fiction.** Double-ruled border, engraved title,
   staged legend, spaced small-caps place names, scale bar, graticule ticks:
   these cheap 2D devices do more world-building than any 3D.
5. **Growth vectors that stop on contact** (his roads): a tiny rule that
   makes convincing street networks. Line weight proportional to length is
   the detail that sells it.
6. **Suffix-cropped name recombination** for fictional place names that feel
   surveyed rather than invented.

## Piece seeds from this study

- **S1 — Old Courses (BUILD as №9007).** The meander engine + historical
  record + antique map furniture, per click a new river that never existed.
  Still map, click regenerates. Restrained palette, invented names, staged
  legend. Success: reads as a found survey plate; every seed yields a
  believable river.
- **S2 — Self-Planned Town.** His road-growth algorithm as the whole piece:
  growth vectors, stop-on-contact, slow rotation, weight by length, over a
  faint plot grid; antique town-plan styling with a name and a "surveyed"
  date per click. Success: streets feel grown, not drawn; no two towns share
  a skeleton.
- **S3 — Never Isles.** Procedural island coastlines (radial noise +
  erosion passes) charted as an antique maritime plate, with his
  suffix-recombination naming engine labeling every bay, peak, and
  settlement. Success: the names make you believe the islands are real.
- **S4 — Nine Hundred Years.** The same meander engine as S1 but animated:
  the map draws itself year by year, courses accumulating live, oxbows
  pinching off in front of you. Success: the cutoff moment reads as an
  event; the finished frame matches an S1 still in quality.
