# No.794 "The Red Doorway"

EXPANSION #97 niele-toroni, prompt block PP3 "The Red Doorway". From the Siegen museum room: vermilion imprints climb a white wall and wrap a door frame instead of stopping at it; small black and orange imprint canvases hang on the right wall.

## Concept

Toroni's rule is a fixed-interval imprint lattice, mechanically regular; the hand lives only in the dab texture, never in the placement. Here the lattice meets architecture. The grid is the constant, the architecture is the variable: the visitor drags the doorway along the wall and the imprint field re-wraps around its new position instantly and mechanically, rows bending around the frame rather than breaking. No spring, no snap, no theatrics on release: the doorway stays where it is left.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Canvas size comes from the Visual Viewport API (listeners on `visualViewport` and `window`); `canvas.style.width/height` are pinned in px on every draw. Phone detection uses `window.screen` physical size (min dimension < 700px), with the aspect test `h > w*1.15` as fallback only.
- Palette is strict: wall #F7F5F0, parquet #C69A5E, vermilion imprints #C73E1D, small canvases #EFEDE6 with black #1A1A1A and orange #E06A1B imprints. One recorded addition: the doorway interior uses #232323, the doorway dark specified for the study's other rooms (PP2), since PP3 names no interior tone; it is also reused at low alpha for parquet seams, the skirting line, and frame shadows.
- Imprints: the base lattice is a brick-offset grid (alternate rows shifted half a step) over the wall. Each dab is a squarish mark built from seeded streaks (mulberry32, seed derived from the lattice index): a translucent base, a denser pressed band at the top edge, and 15 vertical bristle streaks that all start at the top and die out downward, so the top reads dense and the bottom dry. Per-dab rotation (±2°) and scale (±5%) come from the same seeded stream. The dab at a given lattice point is identical every frame.
- Wrap-offset construction: for a given doorway centre x, the doorway exclusion rect is the opening expanded by half a dab plus 5px clearance. Every lattice point is tested against it; a point inside shifts to the nearest free position hugging the frame (left edge, right edge, or top edge of the exclusion rect, whichever is closest), landing just outside the rect. Points falling under the two small canvases are dropped (they are covered by the canvases, which are drawn after the field). Wrapped point sets are cached per doorway x (rounded to the pixel), so during a drag each new position is computed once and then replayed: the re-wrap stays instant. The wrap is a pure function of doorway x; drag state is just the recorded pointer samples.
- Drag: pointer down on or near the doorway grabs it (grab offset recorded); pointer move sets the doorway centre, clamped between the left wall margin and a stop just clear of the small canvases, so the doorway never slides under them. Release leaves it in place. No other interaction exists; never click-to-reload.
- Parquet: flat #C69A5E fill with board seams drawn as lines converging toward a vanishing point at the wall/floor junction, plus three horizontal board lines. Cheap perspective, flat tone, no texture.
- Determinism: frame one is the synchronous draw at load with the doorway at its home position (centre at 0.24 of the width) and the grid fully wrapped. No `Date.now()`, no wall-clock input anywhere; all randomness is the seeded stream keyed to lattice indices. The rAF loop (typeof-guarded; the QA renderer has no rAF) only redraws the same pure function of (size, doorway x).

## Deviations

- Doorway interior tone #232323 is borrowed from PP2 of the same study (see Construction); PP3 itself does not name an interior color. Recorded here per house rules.
- The prompt's technical note calls for precomputed wrap offsets; they are computed per doorway position and cached on first use rather than tabulated for every possible x up front. The observable behavior is identical (a pure, instant function of doorway x), and the cache keeps memory bounded on wide screens.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical (determinism gate). Second render deleted.
- Read back all three renders: white wall, parquet band along the bottom, doorway in the left third with vermilion dabs bending around its frame and none inside the opening, two small canvases (black, orange) on the right wall; mobile shows the whole room unclipped.
- Throwaway check: a patched copy with the doorway's home position moved right (centre 0.50 of width) was rendered at 1280x900: the field re-wraps around the new position, dabs bunching along both sides of the frame and above its top edge, none inside the opening. Copy and render deleted after the check.
- One adjustment round during QA: dab paint density raised (base and streak alphas up, streak lengths lengthened) so the vermilion reads as paint rather than a pale wash, and the small canvases were re-proportioned off the smaller frame dimension after the first mobile render showed them as tall skinny strips. All renders redone and the byte-compare re-run after the fix.
