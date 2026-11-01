# No.995 "Rules for a Body"

Study #122 satoshi-horii, PP156 "Decompose the Body" (multiplex / Syn mechanism).

## Concept

A dancer's body information, decomposed by rules into geometry the body alone
cannot make. The stage is split by a hairline divider. On the left, a warm-white
dot-and-polyline dancer performs a seeded 10 s phrase, leaving a faint trail.
On the right, the SAME phrase is re-rendered live through one named rule:

- FRAGMENT (cyan): the trail shatters into 24 shards that orbit the mirrored
  dancer; each shard carries a window of the trail's recent shape.
- MIRROR (magenta): the trail and skeleton reflect across a seeded diagonal
  axis; the reflection dances a counter-phrase 1.4 s behind the original.
- QUANTIZE (mint): the dancer snaps to a coarse grid and steps in time, a
  low-resolution ghost of the same phrase.
- SPIRAL (yellow): the trail winds into a growing helix around the mirrored
  body's vertical axis.

A glyph strip along the bottom (shard / mirror / grid / helix shapes, no
letters) shows the four rules, the active one lit. The rule auto-cycles every
14 s; a visitor's tap holds their choice for 30 s. Same input, two outputs:
the split screen is the argument.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- The body is data: pose is a closed-form function of piece time. Joint
  angles are layered sines over a 10 s phrase loop (crouch, sway, lean, arm
  swing with a raised flourish, stepping thighs, bending knees), with all
  phase offsets and amplitudes drawn from a mulberry32 seeded phrase
  (BASE_SEED 995156; a double-tap reseeds and rebuilds the phrase).
- The trail buffer is analytic: 81 samples of the head path (plus the lead
  hand path for the left-half trail) at fixed lags over the last 4 s,
  recomputed from the pose function each frame. No integration, no history
  state, so any frame is a pure function of (t, seed, recorded events).
- Coordinate mapping: left-half points map into the right half by reflection
  across the divider (x -> W - x). Each rule is a render function over that
  buffer and the pose:
  - FRAGMENT: shard j takes buffer samples [2j, 2j+12), rotates the window
    around its own centroid, and places it on an orbit around the mirrored
    root (seeded radius/rotation per shard); a triangle marker rides at the
    orbit point. Orbit targets are clamped into the right half.
  - MIRROR: true point reflection across a seeded diagonal axis through the
    right-half center; skeleton sampled at t - 1.4 s. At high intensity a
    second reflection across the perpendicular axis fades in.
  - QUANTIZE: cell size 14 + 36 * intensity px; skeleton sampled at time
    quantized to 0.26 s steps, joints and trail snapped to the grid; a faint
    grid of dots underlays the right half; joints drawn as squares.
  - SPIRAL: each buffer point maps onto a helix: phase from its horizontal
    offset plus age * (2.2 + 3.4 * intensity) turns, radius growing with age
    and shrinking as intensity tightens it, vertical drift with age.
- Rule state machine: ruleInfo(t) resolves the active rule from the recorded
  tap events (visitor rule held 30 s, then auto-cycle resumes from it) or the
  plain 14 s auto-cycle. Switches morph over 1 s by crossfading the previous
  and current rule renders (both are pure functions, so the morph is exact).
- Intensity: default 0.45. A horizontal drag sets it (right = deeper); on
  release it eases back to default with an exponential decay (tau 3.2 s,
  effectively home in about 10 s). Per rule it drives shard orbit spread and
  size, the mirror's second reflection, the quantize cell size, and the
  spiral's tightness.
- Interaction: tap a strip glyph to switch rules; drag horizontally to set
  intensity; double-tap the stage to reseed the phrase and all rule params.
- Audio: lazy AudioContext created only inside the first pointer gesture,
  fully typeof-guarded and wrapped in try/catch. A seeded 16-note melody
  follows the phrase loop; the active rule processes it: FRAGMENT plays each
  note as four detuned square grains, MIRROR sends it through a feedback
  delay, QUANTIZE snaps pitch to a 40 Hz grid with a short square envelope,
  SPIRAL rises by a semitone fraction per step. The piece is visually
  complete in silence.
- House rules honored: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width/height pinned in
  px every draw; phone detection via window.screen (min dimension < 700)
  with the h > w * 1.15 aspect fallback only; page ground is the stage tone;
  the split stays side-by-side on phones. No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas, no text anywhere except the title (the
  strip uses drawn glyphs only). rAF is typeof-guarded; frame one is the
  synchronous draw at fixed offset T0 = 7 s and never derives from Date.now
  (the live clock is performance.now relative to a load stamp, used only to
  advance past T0).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All render cleanly with no audio
  context and no rAF.
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted.
- Read-back, first pass: two faults found and fixed.
  1. The dancer read as disjoint: drawSkeleton never drew the neck-to-head
     segment and the hip bar bypassed the hip point. Added both chains and
     made the head a filled dot; the figure now reads as one jointed body.
  2. FRAGMENT orbit radii were too large: shards spilled across the divider
     onto the dancer and off the stage edges. Reduced the radius curve and
     clamped orbit targets into the right half; the cloud now sits around
     the mirrored center dot on desktop, mobile, and thumb.
- Final read-back: dark stage split by the center hairline; left, a small
  white jointed dancer mid-phrase with its faint looping head/hand trails;
  right, a contained cloud of 24 cyan shard triangles with their trail
  windows orbiting a faint center dot; bottom strip with four glyphs, the
  shard glyph lit in cyan with its underline, mirror/grid/helix dim in
  their own colors. Mobile keeps the side-by-side split, the dancer whole,
  the shard cloud inside the right half, and the strip legible. Nothing
  clipped.

## Deviations

- Drag intensity is one global parameter rather than a stored per-rule
  value. The prompt says "the parameter is yours" per rule; a single shared
  intensity keeps the gesture legible (one drag, one depth) and it eases
  home between rules. The per-rule mappings of that parameter differ as
  specced.
- The visitor's rule hold is 30 s before the 14 s auto-cycle resumes (the
  prompt offered either behavior; hold-then-resume keeps the piece alive
  for watch-only viewers while honoring a tap).
- MIRROR's counter-phrase lag is a fixed 1.4 s phase offset rather than a
  separately parameterized value; it reads clearly against the live dancer
  and stays deterministic.
- QUANTIZE's time step is 0.26 s (about 4 steps per second): coarse enough
  to read as stepping, fine enough that the ghost still tracks the phrase.
