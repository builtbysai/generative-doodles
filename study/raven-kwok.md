# Raven Kwok — Deep Study Notes

**Date:** 2026-09-23 (study pass)
**Artist:** Raven Kwok (Guo Ruiwen) — ravenkwok.com. Chinese artist / creative
developer; learned to code with Flash in the early 2000s (influences: Yugo
Nakamura, Eric Jordan); photography at Fudan University Shanghai Institute of
Visual Art; M.F.A. Electronic Arts, Rensselaer Polytechnic Institute.
Primarily Processing. Twitter bio (2015): "Artist (not full-of-shit type) /
animator / programmer."

## Works inspected (visual, this pass)

### Skyline #1 (2015) — Karma Fields "Skyline" music video
- Project page ravenkwok.com/skyline/ read in full (screenshot). Vimeo/YouTube
  both behind bot challenges from this network; inspected via a 12.2s Tenor
  clip of the actual video (frames extracted at 3fps, 37 frames) + two
  640x360 press stills (Technarte) at full resolution.
- Technique (his own words): "One of the core principles for generating the
  visual patterns in Skyline is Voronoi tessellation... In Skyline's generative
  system, seeds for generating the diagram are sorted into various types of
  agents following certain behaviors and appearance transformations. They are
  driven by either the song's audio spectrum with different customized layouts,
  or animated sequence of the vocalist, collectively forming a complex and
  organic outcome."
- What the frames show:
  - Black-background stage: a living white voronoi web. Seed density is
    non-uniform — dense clusters of tiny cells drift across a sparse field of
    large cells like weather. Seeds render as small glowing dots (nuclei).
  - A "kick" moment: seeds converge into a bright dense burst, flash white,
    then disperse. Audio-driven congregation, not decoration.
  - White-background stage (press stills): voronoi as TONE RENDERING.
    Still 1: variable-density field, dense black cell clusters (ink-blot
    nuclei) against sparse large cells. Still 2: the masked vocalist's FACE
    rendered purely as a voronoi mosaic — dense small cells in dark regions
    (hair, shadow), huge cells in white ground, one black dot per seed.
    This is importance-sampled stippling: seed density follows an image field,
    cell size encodes tone. The "agents" track the animated vocalist sequence.
- Palette: extreme B/W plus a phosphor green/yellow accent in some stages
  (green web edges, glowing nodes).
- Compositional rules: (1) one primitive only (voronoi); (2) multi-stage
  structure — distinct layouts per song section, never one endless wobble;
  (3) seeds typed as agents (movers vs. trackers), each with its own
  appearance transformation; (4) two drivers only: audio spectrum OR a
  driving image sequence.
- Awards: 3rd place FILE 2016 (São Paulo); screened ITFS16 Stuttgart,
  Visible Bits Audible Bytes (Leicester).

### Skyline #2 (2017) — Karma Fields "I Don't Know"
- "Evolutionary algorithm + audio spectrum." Evolution of GENERATIVE
  TYPOGRAPHY. Press still: dense green glyph-like characters forming a
  tunnel/mesh. (Not inspected in motion; still only.)

### Skyline #3 (2017) — Karma Fields "Overdrive"
- "Finite subdivision + audio spectrum." Mitosis-like cellular creatures,
  cyan/magenta/gold edges. (Still only.)

### 189D0 (2016) — Karma Fields "Sweat" (+ special edition for 23 mall screens)
- Project page ravenkwok.com/189d0/ read in full; 20+ stills inspected.
- Technique (his words): "Embedding 2D geometric intersection solving into
  leaf nodes of a quad-tree structure." Programmed in Processing.
- What the stills show: a quadtree subdivides the frame with varying depth;
  EVERY leaf cell contains a solved geometric motif — concentric circle sets,
  circle-in-square intersections (filled circle clipped by an inset square),
  overlapping-circle rosettes, dot grids, nested rotated squares. Strict B/W.
  Then the flat 2D composition is camera-projected into an endless
  corridor/tunnel flythrough — the same quadtree reads as architecture.
  A student observer noted it "breaks up in a rule similar to the golden
  ratio and alternates between 2D and 3D compositions."
- Compositional rule: ONE spatial index (quadtree) + ONE motif solver
  (geometric intersections) + a 2D→3D camera move. The motif never repeats
  identically because leaf size/depth/motif-type vary.

### 1194D / 1194D^3 (2013→2017)
- "Algorithmic Creatures based on finite subdivision": multiple geometric
  creatures co-existing within a tetrahedron-based grid environment; revised
  2017 as an immersive triple-screen audiovisual installation (.zip Future
  Rhapsody, Today Art Museum, Beijing). Recursive triangle subdivision.

### time++ (public art, commissioned by TODTOWN)
- "Particles that represent the current second are added with the elapse of
  time. With each assigned a shifting size and distance threshold, these
  particles form a self-organization and collectively display the current
  time in hour and minute." Sound by B6 (Lou Nanli). Self-organizing clock:
  accumulation + self-organization renders legible time.

### 1DDCB (New Age Dark Age)
- Described by a student analyst as a hybrid of Skyline + Stickup: real-time,
  audio-reactive AND camera-reactive; color manipulated between foreground
  and background to steer attention between algorithm forms.

### Recent site survey (homepage, 2026)
- Range: installation photos (PixTower LED tower, mall-scale 189D0),
  colorful geometric line compositions, voronoi studies, figure outlines
  filled with cellular scribbles, maze/labyrinth line works, a black voronoi
  piece with shaded spheres in cells. Still Processing-first, gallery-scale.

## Doorways followed
- Kwok's Skyline page cites his voronoi lineage: Robert Hodgin, Frederik
  Vanhoutte, Diana Lange, Jon McCormack (all voronoi computational artists).
- gorilla-sun blog (already studied) on Delaunay/Voronoi cites Kwok's Skyline
  as "the most mind-blowing piece" using voronoi, and pairs it with Ignazio
  Lucenti's "Delaunified" portraits: points sampled more densely over colored
  regions of a portrait, connected with Delaunay triangulation — faces "woven
  out of thin threads." Lucenti's site was bot-walled; the described method
  stands: image-driven point density + triangulation is the exact dual of
  Kwok's image-driven voronoi tone rendering (Delaunay↔Voronoi duality).
- Kwok's OpenProcessing sketch 143842 ("Noise Turbulence Doodles") — source
  hidden by owner (Plus+ feature); no code recovered. His site's /code/ nav
  link is a dead 404. No published source found.

## Local re-render studies (this pass)

### Study A — voronoi tone agents (rk-study/voronoi-study.html)
Rebuilt the Skyline #1 core in plain canvas: driver field = sum of gaussians
(stand-in for vocalist image / spectrum); 700 seeds rejection-sampled
∝ darkness^0.75; two agent types — drifters (gradient ascent toward dark +
jitter, speed scaled by synthetic 4-band audio) and orbiters (circle the
darkest mass, radius modulated by audio bands); Bowyer-Watson Delaunay +
mirrored-border voronoi cells; cells stroked, seed nuclei drawn as dots
sized by local tone; orbiters tinted phosphor green.
Frames rendered headless at steps 0 / 150 / 240-with-kick-event.
(shots/vstudy-s0.png, vstudy-s150.png, vstudy-s240b.png)
- UNDERSTOOD: the tone-rendering works — dark regions read as dense small
  cells with heavy nuclei, light regions as large empty cells, exactly like
  his press stills. The agent typing is what keeps it alive: without the
  orbiters + kick convergence the field goes static after ~100 steps; the
  audio-driven congregation events are the composition's heartbeat. Green
  accent only on orbiter cells reproduces the phosphor-on-dark Skyline stage.
  (Render note: Bowyer-Watson Delaunay + frame points = 36ms for 350 seeds at
  900x600 in headless Chrome, fast enough for real-time animation. Debugging
  lesson: a supertriangle that does not strictly contain the bbox silently
  yields thousands of overlapping triangles (4537 for ~450 points) and wedges
  the tab — the symptom looks like slowness, the cause is geometry.)

### Study B — quadtree + geometric intersection (rk-study/quadtree-study.html)
Rebuilt the 189D0 core: recursive quadtree (split probability falls with
depth, occasional golden-ratio slab splits), each leaf assigned one of five
intersection motifs — concentric rings, circle clipped by inset square,
offset-circle rosette, dot grid, nested rotated squares — strict B/W.
Rendered headless at three seeds (shots/qstudy-s7/s21/s99.png).
- UNDERSTOOD: the quadtree is doing compositional labor the motifs can't:
  depth variance creates the focal hierarchy (big calm leaves vs. dense
  detail zones). The motif solver must be drawn at the LEAF's scale with
  stroke weight ∝ leaf size, or small leaves turn to mush. Kwok's tunnel
  projection (not rebuilt) is what turns the flat index into architecture —
  that camera move is half the piece.

## Portable techniques (study, not copy)
1. **Typed agents inside one geometric primitive.** Voronoi alone is a
   texture; seeds sorted into behavioral types with distinct appearances,
   driven by one or two signals, is a system.
2. **Voronoi as tone renderer.** Importance-sample seeds from a driver image;
   cell size encodes tone; draw the nuclei. Dual: Delaunay triangulation
   over image-sampled points (Lucenti).
3. **Spatial index + motif solver.** Quadtree (or any subdivision) decides
   WHERE and HOW BIG; a small geometric solver decides WHAT in each leaf.
   Hierarchy comes from the index, variety from the solver.
4. **Audio as congregation, not pulse.** Don't scale blobs to the kick;
   make the kick an EVENT in agent behavior (converge, flash, disperse).
5. **Multi-stage structure.** Distinct layouts per section; the piece is a
   sequence of systems, not one system running long.
6. **Self-organization toward legibility** (time++): agents with local rules
   (size + distance threshold) collectively render something readable
   (the time). Emergent legibility > drawn legibility.
7. **2D→3D camera move** as a compositional device: a flat generative index
   re-projected through a corridor/tunnel camera becomes architecture.

## Avoid-list additions
- Voronoi with no agent behavior (already listed; confirmed again — Kwok's
  own lesson is the typing, not the tessellation).
- Quadtree subdivision with empty or uniform leaves (our 9021 "Subdivide"
  is safe: it has texture fills; Kwok's version adds per-leaf solvers).
- Audio-reactive work where "reactive" = scale/brightness mapped to
  amplitude. Kwok's bar: the signal changes BEHAVIOR.
- Single-system long-duration pieces with no stage structure.
