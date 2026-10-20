# No.355 Owl and Oak Damask

## Concept

After Suchita Prakash's "Midnight owl and oak leaves folk
damask": a strict mirrored ogee lattice on midnight navy
whose motifs are folk-naturalistic and heraldic - owls
with spread wings alternating with oak-leaf sprays,
acorns and crescent moons. The lattice breathes slowly
at plus/minus 2 percent on a 20s seamless loop while the
owl eyes blink in one fixed sequence across the field.
Drag pans the lattice to explore it; the explored
position persists on release. No text, no chrome.

## Construction

- One canvas, 2D, self-contained. Design space 1280x900,
  full-bleed field, cover-fit; the page ground takes the
  piece's navy #1B2E45. Palette is exactly four colours:
  ground #1B2E45, ochre #C9A26B, olive #5F7335, acorn
  brown #A67B4A. Flat only.
- Loop length: 20s. Breathing is one whole sine cycle
  per 20s at exactly plus/minus 2 percent global scale,
  and the blink sequence tiles the same 20s exactly, so
  frame 20s is pixel-identical to frame 0.
- Lattice: one hand-authored ogee outline (symmetric on
  both axes by construction) stroked in olive over a
  half-drop grid, rows at 185px with an 85px offset on
  odd rows, 81 cells across a 1900x1300 world so the
  lattice always covers the frame while panning. Small
  olive node diamonds mark the lattice joints on the
  85 x 92.5 point set with odd coordinate parity, itself
  a mirror-symmetric set. Strict symmetry is by
  construction and asserted in code: the row offset
  depends on |m| only (row -m mirrors row m), and a
  cell's motif is decided by (floor(|x| / 170) + |m|)
  mod 2, a function of |x| and |m| alone; at load the
  code verifies that every cell's three mirror images
  exist and carry the same motif, and throws otherwise.
- Motifs: 39 owl cells and 42 oak cells alternate across
  the grid. The owl is authored bilaterally symmetric:
  spread wings with incised feather lines, tail fan,
  round head with ear tufts, ringed eyes, small beak,
  belly scallops, perched on a brown oak branch; flat
  ochre fills with the navy ground as the detail colour.
  The oak spray is a curved stem with three tiers of
  lobed leaves replayed under a scale flip, an upright
  tip leaf, a pair of acorns (ochre nut, brown cap), a
  crescent moon above and two sparkle diamonds flanking
  it - the crescent is a true two-arc path, not an
  overlay.
- Blink: the 39 owls blink one after another in their
  fixed cell order; the owl in slot s starts at
  s * (20/39) seconds and closes for 0.5s, the eyelid
  drawn as the face colour descending over the eye disc
  (clipped to the disc) with a lash arc along its edge,
  openness dipping on a sine curve. Exactly one sequence
  pass per loop, closing with the loop.
- Determinism: the clock constant starts at T = 9.994s,
  computed from the fixed data as the middle owl's slot
  plus half a blink, so frame one is a developed breath
  (scale crossing exactly 1.0) with the central owl
  exactly mid-blink. Frame one is drawn synchronously at
  that constant; the typeof-guarded rAF loop advances T
  from the same anchor in fixed 1/60 ticks taken from
  rAF timestamps. No Date.now seeding, no Math.random
  anywhere, so the thumbnail reproduces byte-identically
  from the shipped script.
- Interaction: drag pans grab-style, clamped against
  the breath-minimum scale (0.98) so the oversized
  lattice covers the frame at every phase. The view
  state persists on release: no snap home, no reload,
  and drag never changes the motif set or the blink
  order. Pointer positions convert to design coords via
  the stored cover transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px with
  aspect fallback (h > w*1.15); synchronous first frame;
  requestAnimationFrame typeof-guarded; fixed data only,
  no runtime randomness. No offscreen canvas, no
  gradients, no shadowBlur, no filters.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png); all three inspected.
- Determinism: the thumb was rendered twice and compared
  byte-identical (cmp clean). The in-code symmetry
  assertion passes at load: all 81 cells mirror-closed
  with matching motifs on both axes.
- Desktop: a dense heraldic damask, mirror symmetry
  evident across the full frame on both axes. Owls and
  oak sprays alternate cleanly in the half-drop repeat;
  the central owl sits mid-blink in frame one, its eyes
  narrowed under their lids, exactly as the offset
  intends. Palette audit by eye: navy, ochre, olive and
  acorn brown only.
- Mobile: cover-fit crops to a central vertical slice
  of the field at large scale; the mid-blink owl is
  centred, the pattern seamless at the crop edges,
  nothing clipped in a way that breaks the lattice.
- Thumb: the damask reads at gallery size, owls and oak
  sprays legible, alternation and symmetry clear.
- No build fixes were needed after the first renders;
  the alternation rule was chosen during authoring
  (index-free in |x| and |m|) because a plain
  checkerboard parity flips under the half-drop mirror,
  which the assertion would have caught.
