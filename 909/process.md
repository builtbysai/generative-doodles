# No.909 "Hilbert goes for a walk"

Study #111 simondavidryden, PP70 "The Hilbert Walk" (after Rydén's Genuary 19
"16x16 / Hilbert goes for a walk", 2026-01-19).

## Concept

One curve's footprint. A 16x16 grid on black, generous margin all round,
traversed in true Hilbert-curve order. A walker head advances along the path
at 12 cells per second, looping seamlessly over the 256 steps. Each cell is a
square whose size and color are a pure function of its cyclic distance behind
the head: pale and swollen at the head (with a soft layered glow), cooling
through orange to settled red behind it, and small hollow outlines ahead of
it, unvisited. The Hilbert clustering is the picture: the bloom pools in the
curve's recursive quadrants exactly where the walk has been.

Watch-only at the core. A tap re-rolls the heat (the same walk, a new warm
palette) with a soft chord. Dragging scrubs the walker to the cell under the
finger, and the bloom re-forms along the route from there. A double-tap
triggers the recursion: the grid subdivides to 32x32 (Hilbert order 5, 1024
cells, same mechanism, smaller cells) for 8 seconds, then returns to 16x16.

Sound, started only by the first gesture, is the walker's footsteps: a soft
sine tick per cell-step, pitch climbing a pentatonic ladder by cell index,
with a faint octave-up ping on the head cell.

## Construction

- Traversal: standard Hilbert d2xy/xy2d (rotate-and-reflect), precomputed for
  order 4 (256 cells) and order 5 (1024 cells). Verified offline: both orders
  are exact permutations, consecutive cells are adjacent, and xy2d inverts
  d2xy for every cell. The walk never leaves the curve.
- Distance model: headFloat(t) is closed-form. Anchors record (time, float
  position); headFloat(t) = base + 12 * (t - t0) from the latest anchor. The
  initial anchor is (0, 100), so frame one is mid-journey with the head at
  index 100, as specced. A cell's distance behind is
  d = (headFloat - index) mod count, measured cyclically. Heat h = 1 - d/span
  with span 100 cells in order 4 (400 in order 5, the same fraction of the
  loop). Cells with d >= span draw as hollow outlines.
- Color ramp: piecewise stops at h = 0 (hollow tone #5A2A1A), 0.18 (settled
  end), midStop (mid tone), 1 (head end). Size: hollow fraction 0.34 of the
  cell at the cold end, the variant's settled floor at h = 0.18, swelling to
  0.94 at the head. The head's glow is three layered flat-alpha squares in the
  head color, breathing with the fractional part of headFloat. No gradients,
  no shadowBlur, no filter, no offscreen canvas.
- Palette re-roll: 32 variants precomputed at init from one mulberry32
  stream. Roll 0 is the canonical ramp (pale head, orange at 0.55, red
  settled, floor 0.55). Later rolls may flip which end burns pale, move the
  mid stop within 0.35-0.70, mix the mid tone up to halfway toward red (or
  toward pale when flipped), and move the settled floor within 0.45-0.65.
  Every stop stays inside the warm family (pale, orange, red, hollow brown).
  A tap advances the roll counter; the counter is plain state, and frame one
  always uses roll 0.
- Recursion: a double-tap records its simTime; while t - start < 8 the draw
  switches to the order-5 traversal, with head position and span scaled by 4
  so the walker's fractional progress around the loop is continuous across
  the switch. Scrubbing during recursion anchors in order-5 units converted
  back to order-4 float position.
- Determinism: frame one is the synchronous draw at simTime 0. All state
  (head, heat, roll, recursion window) is a closed-form function of time plus
  the recorded event list (tap counter, anchors, recursion start). Nothing
  reads Date.now(); the loop clock only advances simTime by fixed
  1/240 s steps. The rAF loop is typeof-guarded; the piece renders complete
  in silence in the node-canvas harness.
- Audio: lazy AudioContext created inside the first pointerdown, all uses
  typeof-guarded and try/caught. Ticks fire from the fixed-step loop when the
  head index changes; pitch = 220 Hz times a pentatonic ladder indexed by
  cell (25-note window), head ping at twice the frequency and low gain. The
  tap chord is three pentatonic sines staggered 60 ms. No microphone.
- Viewport: canvas sized from the Visual Viewport API with resize listeners
  on visualViewport and window; canvas.style.width/height pinned in px every
  draw. Phone detection via window.screen (min dimension < 700 px) with the
  aspect fallback h > w * 1.15; the grid is square, sized to 80% of the
  smaller dimension and centered at every size, so the black margin is the
  frame on phones too.
- Palette: strictly the five specced tones (#0A0A0A ground, #E0311B, #F28C1A,
  #FFF7E6, #5A2A1A). No visible text except the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All render
  cleanly in silence, no AudioContext, no gestures.
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical. Duplicate deleted.
- Read-backs: desktop and thumb show the 16x16 grid centered with a generous
  black margin; the visited region blooms along the Hilbert path: pale,
  largest squares at the head in the lower-left cluster (index ~100), orange
  behind, red settling at the far end of the trail in the upper-left
  quadrant, and small dim hollow outlines everywhere ahead. The head glow
  reads as a soft halo under the pale cluster. Mobile shows the same
  composition, grid whole and centered in the tall frame, nothing clipped.
- Hilbert math unit-checked in node before building (permutation, adjacency,
  inverse) for both orders.

## Deviations

None from the brief. Two recorded choices: (1) the trail's cold end lands on
a hollow outline at the same 0.34 size as unvisited cells, with the ramp's
final stop at the hollow tone, so the settle-to-hollow transition is a color
settle rather than a pop; (2) the palette re-roll is realized as 32 seeded
variants precomputed from the mulberry32 stream (consumed in order, one per
tap) instead of drawing from the stream live at tap time, which keeps every
frame a closed-form function of the recorded event list.
