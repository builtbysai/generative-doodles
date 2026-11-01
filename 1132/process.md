# №1132 — Pinnannousu

Jussi Ängeslevä study block JA5 (Pinnannousu, 2024). Built 2026-11-01. Build + QA only; not pushed.

## The piece

Ängeslevä's climate elegy as a machine performance on a closed-form 150 s
loop. CARVE (0–45 s): a block of ice stands center-frame in a black gallery
while a jointed robot arm — an industrial silhouette in `#1A1D22` entering
from frame right, with a single amber `#D8A24A` joint light at its elbow —
traces the block's outline with its drill; the block's superellipse outline
morphs from rectangle (exponent 9) to lens (exponent 2), and ice dust falls
from the cut. LIGHT + MELT (45–150 s): the arm parks folded, a spotlight
behind the finished lens switches on, and the ice throws a projected "+2"
glyph of light (`#F0F8FF`) onto the back wall — the glyph only, no slogan.
Then the lens melts: it slumps (height ×0.48, width ×1.32 by the end), the
glyph's rows sag, jitter and shred, drip streaks leak down the wall, and a
puddle of light (`#6A8AA0` with an ice-white core) spreads on the floor
until the cycle fades to black and a fresh block begins with a new seed.

## Adaptation choices

- **Everything is a closed-form function of cycle time.** The arm's carve
  pose is analytic 2-bone IK toward a drill target that sweeps the
  superellipse outline; the parked pose is FK; the two are blended across
  43–47 s. Ice dust is a pure function: each mote's spawn time is derived
  from its seeded life/phase, its spawn point is the drill-tip function
  evaluated at that past time, and it falls with a quadratic ease — no
  state, no integration. The glyph warp is a per-row melt function.
- **The glyph is drawn in 26 horizontal row slices** (save/clip/fillText
  per row, no offscreen canvas). Each row's x-offset combines a seeded
  jitter scaled by melt^1.6, a slow shimmer, the dragged-spotlight bend,
  and a downward sag ∝ f² · melt^1.4 — crisp at first light, destroyed by
  the end. A three-step layered-ellipse bloom (no gradients, house rule)
  pools the light on the wall and fades with the glyph's dissolve.
- **Palette is closed** to the eight specced colors; shading is done with
  alpha only. Every ellipse/circle is drawn on its own path (node-canvas
  renders batched ellipse subpaths as connected polygons — house lesson
  from №1120).
- **Composition** lives on a square stage (side = min(W, H)) centered
  vertically, so tall phones hold the gallery together mid-frame instead
  of stretching it apart.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  t = 71 s — early melt, m = smoothstep(26/105) ≈ 0.154: finished lens
  with deep blue core, refraction arcs and facet lines, parked arm with
  its amber light on, "+2" projected crisp but row-warped, a first small
  puddle under the lens. The rAF loop (typeof-guarded) anchors elapsed
  time to that phase.
- **House rules throughout:** Visual Viewport sizing with resize
  listeners on both visualViewport and window, canvas CSS size pinned in
  fit(), phone detection via `window.screen` min dimension < 700 px
  (aspect fallback), DPR capped at 2, seeded mulberry32 only. No
  gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas, no
  `createElement`, no audio, no microphone. The only visible text is the
  "+2" glyph and the `<title>`.

## Interaction

Watch-only by default: the performance loops. Drag during the light
phase to bend the projected glyph (recorded samples; the offset holds
~1 s after release, then relaxes exponentially, τ ≈ 3.5 s) — the lens
glint follows the light. Double-tap starts a fresh block immediately
(new seed, cycle restarts). Nothing ever reloads. Silent by design.

## QA

Rendered with `~/workspace/tools/render-piece.js` (node-canvas):

- `qa-desktop.png` 1280×800 — dark gallery; ice lens center with blue
  core, refraction arcs, glint; folded robot arm at right with the amber
  elbow light; row-sliced "+2" of light on the wall, slightly warped;
  small first puddle under the lens.
- `qa-mobile.png` 390×844 — same composition on the centered square
  stage; glyph, lens, arm and puddle all legible.
- `thumb.png` 720×720 — rendered twice and `cmp`-compared:
  **byte-identical**; the duplicate was deleted.
- Extra phase probes (temp copies in /tmp, deleted after): t = 20 s
  shows the arm reaching over the block's top-right corner, drill on the
  outline, dust falling along the right edge of the rounded-rectangle
  block; t = 47 s shows the just-lit, still-crisp glyph and finished
  lens; t = 120 s shows the lens slumped to a wide flat ellipse, the
  glyph sagging and shredding with drip streaks, and the puddle spread
  wide. Two tuning rounds during QA: the glyph bloom was re-stepped into
  three softer layers and tied to the glyph's dissolve so no gray oval
  outlives it, and the arm was moved in front of the ice so the drill
  reads on the surface it cuts.
