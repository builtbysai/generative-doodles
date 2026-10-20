# No.348 Enid Engine

## Concept

After Emi Bee's named signature floral Enid, her "moody
twisty floral, slightly spooky": an ogee damask that
grows. Vine tendrils extend inward from the frame edges
along a pointed-arch lattice, small bone leaves unfold
behind the growth front, and ember blooms scale open at
the branch tips; then the whole thicket recedes in exact
reverse and begins again on a 28s seamless loop.
Watch-only: the growth and its mirror-perfect symmetry
are the piece. No interaction, no text, no chrome.

## Construction

- One canvas, 2D, self-contained. Design space 1280x900,
  cover-fit (a field composition, full bleed at every
  aspect; the page ground takes the piece's near-black
  #0D0F0C).
- Palette, flat only, asserted in code (exactly 4
  colours): ground #0D0F0C, moss vines #7FB069, bone
  leaves #E8DCC8, ember blooms #E4572E. Blooms are ember
  only; no other colour enters at any stage of growth.
- Growth system: the entire thicket is built once at load
  by a seeded recursive walker (mulberry32, fixed seed
  58152; no runtime randomness) and stored as JS data.
  Main stems follow ogee guide curves: one shared period
  (460 design px) with adjacent entries in anti-phase,
  so neighbouring stems interlace like a trellis of
  pointed arches. Eleven mains per half enter from the
  left, top and bottom edges; each forks into cubic
  bezier children (sine-wiggled along the normal for the
  twisty hand), and children fork again at depth 2.
  Every branch records its sampled polyline, cumulative
  arc lengths, taper widths, a growth window (t0, t1)
  chained to its parent's fork time, leaf attachments,
  and whether its tip blooms.
- Symmetry: branches are generated in the left half only
  and then mirrored across the centre axis x = 640
  (asserted in code: the branch count exactly doubles),
  so the lattice is mirror-symmetric at every frame by
  construction, not by tuning.
- Motion: each frame is a pure function of the growth
  parameter G. G runs 0 to 1 over the first 14s (grow)
  and back 1 to 0 over the second 14s (retract in exact
  reverse), so frame 28s is pixel-identical to frame 0.
  A branch's visible length is its local progress through
  its growth window, drawn as six stroke bands tapering
  from base width to tip width, moss, round joins. Leaves
  scale in just behind the front; a tip bloom (two flat
  petal rings, 8 outer + 5 inner, ember, ground centre
  dot) swells open as its branch completes.
- Determinism: frame one is drawn at the constant phase
  T_OFFSET = 10.9s exactly (growth about 78 percent,
  blooms open at many tips), never from a wall clock;
  the typeof-guarded rAF loop advances from that same
  anchor by elapsed time since load.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px with
  aspect fallback (h > w*1.15); synchronous first frame;
  no offscreen canvas, no gradients, no shadowBlur, no
  filters; no interaction handlers at all.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png); all three inspected.
- Desktop: the thicket fills the frame edge to edge,
  mirror symmetry exact about the centre axis (checked
  visually: every bloom, leaf cluster and stem crossing
  has its twin). Ogee stems interlace in anti-phase
  waves; ember rosettes open at well over a dozen tips;
  frame one is developed, no empty or half-drawn state.
- Thumb: rendered twice; the two renders are
  byte-identical (same md5), so the thumbnail reproduces
  from the shipped script exactly. The centre crop keeps
  the symmetric arch pair and twin centre blooms legible
  at gallery size.
- Mobile: cover-fit holds a full-bleed central slice at
  390 wide, the centre ogee pair and blooms centred and
  legible, nothing letterboxed.
- Reverse and seam checks: a probe copy with the clock
  offset at 17.1s (retract phase) renders byte-identical
  to the thumb (grow phase, 10.9s), confirming the
  retract is the exact reverse; a probe at 28s renders
  byte-identical to one at 0s, confirming the seam.
- No deviations from the spec.
