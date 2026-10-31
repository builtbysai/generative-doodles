# No.686 — Chimba Hue

EXPANSION #83 lachimuchina, prompt block 6 "Chimba Hue" (TASKS.md, verified verbatim).

## Concept

Two banks, two musics, one river between them. A vertical triptych on a night
ground: the left bank (La Chimba, the north side) is warm, dense and rhythmic —
many small radial tick marks pulsing in interlocking patterns; the right bank is
cooler, sparser and sustained — a few wide arcs drifting and breathing; the
river band between them carries particles both ways with a net downward flow,
the mediator. Dragging horizontally across the river sends ripples toward both
banks, and each bank answers in its own grammar: the left bank re-phases its
rhythm, the right bank's arcs swell once. No text, no UI, no symmetry — the
banks are different musics facing each other like two choirs.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio.
- Palette (strict, nothing else): chimba warm #D98A3D, chimba ember #B0532A,
  river #3E7C8C, river foam #DCEBF2, right-bank cool #5B8FA6, right-bank deep
  #2B3538, night #0F1416. Translucency is achieved with rgba() of these hexes.
- Layout is proportional, so the triptych holds at any size: left bank 0–40%,
  river 40–60%, right bank 60–100% of width.
- Interlocking rhythm design (left bank): tick marks sit on a loose seeded grid
  (about 1 in 7 cells left empty, positions jittered). Each mark belongs to one
  of three phase groups assigned by (col + 2·row) mod 3, with pulse periods
  2.4 s, 3.6 s and 4.8 s and staggered offsets 0.0 / 0.9 / 2.1 s plus small
  per-mark jitter. The 2.4 : 3.6 : 4.8 periods form a 2:3:4 weave, so the
  combined pattern never settles into a single beat; mark length and alpha ride
  a sharpened sine of its group phase, and roughly 38% of marks burn ember
  instead of warm. The field reads as interlocking rhythms rather than a
  uniform blink.
- River: ~150 seeded particles (90 on phones), 78% drifting down at
  0.008–0.030 band-heights/s, 22% climbing more slowly, all with a gentle
  sinusoidal lateral sway; ~44 foam flecks (26 on phones) ride downward as
  short vertical strokes with a twinkle phase. Positions are pure functions of
  the anchored clock and seeded start offsets.
- Right bank: 15 wide arcs (11 on phones), radii 5–16% of the smaller viewport
  dimension, each rotating slowly (±0.05 rad/s) and breathing on its own
  8–15 s period; a fainter, wider companion arc gives the sustained tone body.
  About 45% draw in the deep tone, the rest in cool.
- Call-and-response model: a pointer press inside the river, or a horizontal
  drag crossing the band, spawns ripples at the crossing points (thinned so a
  stroke plants a ripple every ~14 px of travel or 0.22 s). Each ripple is a
  pair of wavefronts travelling from the band centre toward both edges at
  0.55 band-widths/s, drawn as short foam arcs that fade as they travel. Arrival
  is computed from the recorded spawn time: when the front reaches the left
  edge, the left bank's phase target advances by π/2 and its current phase
  eases toward the new target (a re-phasing, heard as the rhythm shifting);
  when it reaches the right edge, an arrival timestamp is recorded and the
  right bank swells once — swell amplitude is the sum of exp(−dt/1.4) over
  recent arrivals, scaling arc radius by up to ~1.16× and brightness with the
  arcs' own breath, so the answer is one swell, not a permanent change.
- House rules: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas style width/height pinned in px
  inside draw(); phone detection via window.screen physical size (min
  dimension < 700 px), aspect ratio used only as fallback; page ground is the
  night tone. rAF is typeof-guarded; frame one is the synchronous draw at t=0.
- Determinism: all field data comes from a mulberry32 seeded RNG (seed
  686083). The clock is anchored at load (performance.now origin shared with
  rAF timestamps); frame one is drawn at exactly t=0 before any event can be
  recorded. Pulses, drift, ripples and answers are functions of that clock plus
  drag events recorded with anchored times. No Date.now(), no unseeded
  randomness in the render path.

## QA log

- Rendered with ~/workspace/tools/render-piece.js:
  - qa-desktop.png (1280×900): dense warm/ember tick starbursts at varied
    pulse phases on the left, teal river band with particle dots and white
    foam flecks in the centre, sparse wide cool/deep arcs on the right.
    Clearly asymmetric; no ripple in flight at frame one; no text.
  - qa-mobile.png (390×844): phone rule engaged (screen min 390 < 700); the
    triptych keeps its 40/20/40 proportions, banks narrow but distinct,
    nothing clipped.
  - thumb.png (720×720): same composition at square format.
- Determinism gate: thumb.png rendered twice and compared with cmp —
  byte-identical; the second render was deleted.
- Interaction paths reviewed in code (headless renderer has no pointer input):
  ripples spawn only from press/drag inside the band, arrivals fire exactly
  once per direction per ripple (hitL/hitR flags), and idle state with no
  recorded events draws no ripples and no swells.

## Deviations

- None from the prompt. Two implementation notes: (1) the left bank's phase
  answer is eased toward its new target over successive frames rather than
  snapping, so the re-phasing reads as the rhythm shifting instead of a jump
  cut; (2) ripple wavefronts travel outward from the band centre (where the
  drag energy enters the water) rather than from the exact drag x, because a
  horizontal stroke crosses the whole band and the centre-origin front keeps
  both bank arrivals simultaneous and legible as call and response.
