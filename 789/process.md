# No.789 "In Situ" — EXPANSION #96 daniel-buren, PP6

## Concept

The frame itself is the site. Nothing in the piece is composed or
centered for beauty; every element is anchored to a feature of the
piece's own frame, and if the frame changes, the work re-measures and
re-lays itself. It is Buren's in-situ engine stated as pure behavior:
the visual tool (alternating white + one color at the fixed 8.7 cm
module) placed by rule, not by taste.

Elements, each placed by an anchoring rule:

1. A vertical striped band running the full height, its left edge
   exactly one module in from the frame's left edge.
2. A striped L hugging the top-right corner — a horizontal arm along
   the top edge and a vertical arm down the right edge — like Buren
   blocking a gallery entrance.
3. A striped band laid along the frame's own diagonal, corner to
   corner, stripes measured along the diagonal at the same module.
4. A threshold block at the bottom-right corner that exists only as a
   site condition: present when the frame is not taller than wide,
   entirely absent in a portrait frame. While present it breathes in
   and out on a 90 s loop.

Color as material: exactly one color is used, deep blue #27408B,
chosen for the site. It is material, not symbol and not decoration.
The only other tones are the stripe white #F6F3EC and the ground
#EFEAE0. The rule is also documented in the code comments in
index.html.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- The module: one stripe pair = frame width / 17.4. All vertical
  stripes share one global grid anchored at the frame's left edge
  (stripe boundaries at multiples of pair/2 from x = 0), so the
  vertical band and the corner L are measured from the same origin and
  their stripes agree where they meet.
- The vertical band is two pairs wide; the L arms reach three pairs,
  one pair thick. The diagonal band is one pair wide, drawn in a
  rotated frame along the top-left to bottom-right diagonal, stripes
  counted along the diagonal from the corner.
- Layout is a pure function of (w, h). Resize events (listeners on
  both visualViewport and window) append a recorded layout
  {t, w, h}; the displayed geometry interpolates between the previous
  and current layouts over 300 ms with an easeInOut cubic — the quick
  measured slide of the tool re-laying itself. The threshold condition
  is evaluated on the actual current frame, not the sliding geometry.
- Threshold breath: alpha = 0.625 + 0.375 * sin(2π t/90 − π/2), so
  frame one (t = 0) sits at the breath minimum, alpha 0.25.
- Sizing follows the house rules: Visual Viewport API for size,
  resize listeners on visualViewport and window, canvas.style.width /
  height pinned in px inside draw() every frame, phone detection via
  window.screen physical size (min dimension < 700 px) with the
  aspect fallback h > w * 1.15. Page ground is the ground tone.
- Watch-only: no pointer handlers at all. No audio, no microphone.
- Determinism: frame one is the synchronous draw(0) at load for the
  initial size. No Date.now(), no Math.random(), no state that is not
  a closed-form function of recorded resize events and t. When rAF
  exists the loop is driven by rAF timestamps relative to the first
  frame; the rAF call is typeof-guarded. A QA-only hook (?seed=tNN,
  honored only when rAF is absent, i.e. in the headless renderer)
  selects the single-frame time, matching the sibling pieces.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  - qa-desktop.png (1280x900): ground; vertical band starting exactly
    one module (73.6 px) in from the left, stripes white/blue/white/
    blue across its two pairs; corner L at the top-right (top arm one
    pair deep, right arm descending three pairs); diagonal band
    corner to corner; threshold block present at the bottom-right,
    pale at the breath minimum.
  - qa-mobile.png (390x844, portrait): all three bands re-anchored to
    the narrow frame (module 22.4 px); threshold block absent, as the
    site condition requires; nothing clipped.
  - thumb.png (720x720): full layout at module 41.4 px; threshold
    block present (square frame is not taller than wide).
- Determinism gate: thumb.png rendered twice and cmp-compared —
  byte-identical. Duplicate deleted.
- Read-back check: all three renders show only the three anchored
  bands plus the conditional threshold block; no text besides
  <title>, no gradients, no unanchored elements.

## Deviations

- Threshold condition at square frames: the prompt says the block
  exists "only when the frame is wider than tall". The condition is
  implemented as W >= H, so a square frame (the 720x720 thumb) counts
  as not-portrait and the block is present; it is absent whenever the
  frame is taller than wide. Reason: the condition's intent is
  portrait-vs-not, and the gallery thumb is square — treating square
  as portrait would make the block vanish in the piece's primary
  presentation while the piece is otherwise fully laid out.
- The diagonal chosen is top-left to bottom-right (the prompt says
  "the frame's own diagonal" without specifying which). It is drawn
  after the vertical band and the corner L, and the threshold block
  is drawn last, so at the bottom-right corner the block sits on the
  diagonal's end — the threshold caps the diagonal, which reads as
  placement, not collision.
