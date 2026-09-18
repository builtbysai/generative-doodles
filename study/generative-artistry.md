# Generative Artistry (Tim Holman) — Study Notes

**Site:** generativeartistry.com/tutorials | The canonical beginner-to-intermediate curriculum.
9 tutorials, each a foundational technique. Every doodle-maker should internalize these.

## The 9 techniques

### 1. Tiled Lines
Grid of cells; each cell draws one of two diagonals at random. The famous "10 PRINT"
pattern. Simplest possible generative art — and genuinely beautiful.

**Lesson:** Maximum beauty per line of code. Randomness + grid + one mark type.

### 2. Joy Division (Unknown Pleasures homage)
Rows of lines; each line's points displaced vertically by noise, with amplitude
following a Gaussian envelope per row. Recreates the iconic album cover.

**Lesson:** Data/field → line displacement is a universal move. Envelope functions
(Gaussian falloff) control where the action happens.

### 3. Cubic Disarray (Georg Nees homage)
Grid of squares; each square rotated by a random amount scaled by its row position —
orderly at top, chaotic at bottom. A gradient of disorder.

**Lesson:** THE key compositional idea — map a parameter (disorder, scale, color) to
position to create narrative across the canvas. "Gradient of X" beats uniform randomness.

### 4. Triangular Mesh
Jittered grid points connected into triangles, each filled with a random-ish tone.
Low-poly aesthetic from pure code.

**Lesson:** Jittered grids + triangulation = instant organic geometry. Delaunay is the
formal tool; hand-rolled jitter works for sketches.

### 5. Un Deux Trois (Vera Molnár homage)
Concentric shapes where the count (1, 2, or 3) and placement vary per cell.
Molnár's systematic variation — change ONE variable across a series.

**Lesson:** Serial variation as method. Pick a system, vary parameters methodically,
curate the best. (This is how masters actually work.)

### 6. Circle Packing
Grow circles at random positions until they touch another circle or edge. Fill the
canvas with non-overlapping discs.

**Lesson:** Packing/growth algorithms fill space beautifully. Rejection sampling +
growth is simple and effective. Endless variants (different shapes, weighted sizes).

### 7. Hypnotic Squares
Concentric squares with decreasing size and shifting offset — Op-Art vibration.

**Lesson:** Simple geometric recursion creates optical effects. Precision matters —
clean lines, exact math.

### 8. Piet Mondrian
Recursive subdivision of rectangles; some cells filled with primary colors.
De Stijl composition from code.

**Lesson:** Recursive subdivision is a compositional workhorse (see also DesLauriers's
FOLIO bin-packing). Weighted random choices (which cell splits, which gets color)
control the feel.

### 9. Hours of Dark
Fine concentric line work building tonal gradients — meditative, dense.

**Lesson:** Density of fine lines = tone. Patience as technique. (Connects directly
to Hoff's sandpaint.)

## Meta-lessons (the real curriculum)
- **Homage as learning:** 3 of 9 tutorials recreate masters (Nees, Molnár, Mondrian,
  Joy Division). Recreate to learn, then diverge.
- **Every tutorial = grid + randomness + one mark.** The formula is simple; the
  curation (parameters, palettes, composition) is the art.
- **Device-pixel-ratio handling** and crisp rendering matter — craft in the details.
- These are EXERCISES, not artworks. The doodles/ folder should go beyond them.

## Techniques to steal (not copy)
- Gradient-of-disorder mapping (Cubic Disarray)
- Envelope functions for localized action (Joy Division)
- Recursive subdivision with weighted choices (Mondrian)
- Circle packing / space filling
- Serial systematic variation (Un Deux Trois)

## What NOT to do
- Don't ship these tutorials as "doodles" — they're the most-recreated exercises
  in generative art. Use them as vocabulary, not content.
