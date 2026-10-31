# No.618 — The Crown Grows Itself

EXPANSION #75 mariona-cabassa (@theinvisiblecircle), prompt block 2 "Corona".

## Concept

Her blue-head panel as a generative portrait. A flat deep-blue silhouette head in
profile sits perfectly still at lower center on bare paper — no face, no features,
no ground, no stems. Around it blooms a radial crown of folk flowers in two rings:
pink and yellow blossoms alternating with green leaves, radiating up and around
the skull. The crown is the living part. Each flower breathes open and closed on
its own slow phase; a tap sheds one flower's petals and a new bud grows back with
a reseeded petal count; a double-tap reseeds the whole crown at once. Exactly
three flowers carry the deep accent blue at their centers. The head never moves.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette, strict and complete: head blue #1E4D8C, blossom pink #E87B9C, blossom
  yellow #F2C14E, leaf green #6A9A5B, paper #F5F1E8, deep accent #12315E. The deep
  accent is spent only on the centers of exactly three flowers, plus one quiet
  hair-sweep arc inside the silhouette at 50% alpha.
- Head: a fixed bezier/quadratic silhouette path (forehead, nose, lips, chin, jaw,
  neck, rounded hair mass), drawn identically every frame. It is painted after the
  crown so the innermost flowers tuck behind the skull.
- Crown: two seeded rings (21 + 33 slots) laid along a 210-degree arc over the
  top of the head. Every third slot is a leaf; the rest are flowers, alternating
  pink and yellow. Each flower is a radial generator: 5–9 pointed-oval petals in
  the outer color, a half-step inner ring in the other blossom color, and a center
  disc. Bloom parameter (seeded phase, 5.5–11 s period) drives petal length,
  width, and inner-ring growth, so flowers open and close without moving.
- RNG: mulberry32 throughout. Crown generations are keyed by a generation counter
  (base seed 618750); per-flower petal-count reseeds and petal-release particles
  draw from streams keyed by flower serial + reseed count, so every session is
  reproducible.
- Interaction: pointerdown only; drag does nothing. Tap vs. double-tap is
  disambiguated with a pending tap that resolves after the 350 ms window closes.
  A tap on a blooming flower releases its petals as particles that drift down and
  fade over 2 s (positions computed statelessly from birth time), leaves a bare
  green calyx for 0.85 s, then grows a new bud over 0.8 s. A double-tap anywhere
  reseeds the entire crown as the next generation. No click-to-reload anywhere.
- House rules: canvas size from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS width/height pinned in px inside
  draw() every frame; phone detection via window.screen (min dimension < 700 px)
  with the h > w*1.15 aspect fallback; the composition lives in a centered square
  stage so head and crown keep their arrangement and margins at phone size.
- Determinism: frame one is drawn synchronously at load (buildCrown(1), fit(),
  draw(0)) with the generation-1 crown at its seeded phases. The animation loop
  is typeof-guarded requestAnimationFrame anchored to elapsed-since-load; no
  Date.now() anywhere; no AudioContext, no document.createElement, no offscreen
  canvas, no ctx.filter.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism gate: thumb.png rendered twice and compared with cmp —
  byte-identical. The second render was deleted.
- First render attempt failed on a parenthesis error in the tap-timing helper
  (nowSec); fixed and re-rendered before visual QA.
- First visual pass: the profile read clearly (forehead, nose, lips, chin), but
  the crown floated in a loose halo with a visible gap beside the head, and the
  neck read as a long narrow column. Fix pass: ring radii tightened
  (0.228/0.338 → 0.208/0.312 of stage), crown center lowered slightly, head
  scaled up (0.36 → 0.385 of stage) with a shorter, wider neck, outer petals
  widened for a fuller blossom.
- Second visual pass (current files): the crown hugs the skull as a wreath;
  exactly three deep-accent centers visible (top, left, right); two-tone
  blossoms and alternating leaves read at all three sizes; mobile keeps the
  full composition with margins, nothing clipped.

## Deviations

- None from the prompt's prohibitions: no face, no photorealistic flowers, no
  stems or ground, never more than three deep-accent flowers, head immobile.
- Accent assignment is held by slot within a generation: when a tapped flower
  regrows, its slot keeps its accent status (or non-accent status), so the
  exactly-three invariant can never drift mid-generation. A double-tap reseed
  chooses a fresh seeded set of three accent slots for the new generation.
- Count note: the two rings hold 54 slots, of which 36 are flowers and 18 are
  leaves — "about 40 flowers" alternating with leaves, at a density the two
  rings can carry without collapsing into mush.
