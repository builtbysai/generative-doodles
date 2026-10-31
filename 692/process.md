# No.692 — Precario

EXPANSION #84 ceciliavicuna, prompt block 4 "Precario" (TASKS.md). Arte Precario: a structure that disappears.

## Concept

An empty shore: sky-wash above, sand below a ground line in the lower third, and at center-bottom a precario — a small, fragile sculpture assembled from beach debris: a feather, a folded paper scrap, a twig, a shell fragment, and a red thread draped over the rest, joined in some cycles by a pebble, a bottle-cap disc, or a dry leaf. The smallness against the emptiness is the whole point. The piece has a lifespan of about 100 seconds: it assembles, it holds, the wind takes it apart piece by piece in a fixed order of vulnerability, the shore rests empty with only faint ground traces where it stood, and then a new precario — a different debris subset in a different arrangement — begins. Nothing is saved, nothing repeats exactly, and there is no gallery of past precarios. Disappearance is the rule. Watch-only: no interaction, no sound, no text.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Palette is strict and flat, matte and sun-bleached: sand #D9C9A8, paper #F2EDE3, feather gray #8A8A86, twig brown #5C3A21, shell pink #D9A08E, thread red #A83232, sky-wash #EFE8D8. Shading uses only alpha of these seven.

**Determinism.** Every element's position and rotation is a pure function of (cycle time, cycle seed), where cycle seed = a hash of the base seed 692001 and the cycle index, drawn from one mulberry32 stream. There is no `Date.now()`, no `Math.random()`, no integration state: the same elapsed time always draws the same frame, forever. Frame one is the synchronous draw at cycle 0, t=0. The animation clock is anchored at load and rAF is typeof-guarded, so the headless QA renderer (no rAF, no AudioContext, no offscreen canvas) draws frame one and stops.

**Lifespan staging** (cycle = 100 s):
- **Assembly (0–10 s):** each element drifts in on a staggered schedule (start 0–3 s, drift 4–7 s, ease-out along a shallow arc with a fading bob). Heavy pieces (twig, shell, pebble, cap) arrive along the ground from the left or right edge; light pieces (thread, paper, feather, leaf) may also descend from the low sky.
- **Hold (10–50 s):** the assemblage sits nearly still. Only the thread moves, a draped sine curve trembling slightly.
- **Dismantling (50–90 s):** a fixed vulnerability order, one overlapping window per kind. The thread lifts first (50–58 s) and drifts up and away; the paper tumbles end over end (55–67 s); the twig is dragged right in six stick-slip steps across the whole dismantling (58–90 s) and stays longest; the feather rolls off (63–75 s); the leaf flutters away (69–79 s); the cap rolls (73–82 s); the pebble rolls (76–87 s); the shell flips and slides last-but-one (79–88 s). All departures travel with the wind, rightward or up, and every element ends fully outside the frame.
- **Empty (90–100 s):** only the shore and the precario's ground traces — five faint seeded dashes at the base that fade in from 86 s and fade out during the next cycle's first 4 seconds. Traces are suppressed for cycle −1, so the very first frame's shore is pristine.
- **Regeneration:** at 100 s the cycle index increments and a newly seeded arrangement assembles. Each cycle holds 5–8 pieces: the core five (twig, shell, paper, feather, thread) plus 0–3 extras from a seed-shuffled pool (pebble, leaf, cap), with seeded slot jitter, scale jitter, resting rotation, and arrival mode.

**Glyphs.** All debris is drawn as flat glyphs centered at the origin: feather as a bowed shaft with barbs angled back, paper as a folded polygon with a fold line, twig as a thick bent polyline with a stub branch, shell as a ribbed fan, thread as a sagging sine curve, pebble as a shaded ellipse, cap as a crimped disc, leaf as a veined pointed oval.

**House rules.** Canvas size from the Visual Viewport API with resize listeners on both visualViewport and window; canvas pinned in px inside `draw()` every frame. Phone detection via `window.screen` (min dimension < 700 px), aspect fallback only. On phones the cluster grows slightly (0.26 of the small dimension vs 0.17) so the assemblage stays legible; the page ground is the sky-wash tone. A `?seed=tNN` hook pins the elapsed time for headless stage inspection, following the batch convention.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF, no AudioContext).

- **Determinism gate:** thumb.png (720×720) rendered twice and `cmp` byte-compared — identical, re-verified after each fix below. Second render deleted each time.
- **Frame one, desktop (1280×900) and thumb (720×720):** vast pale emptiness, ground line in the lower third, sand below. First elements just arriving: paper descending from the low sky near top-center, shell + feather + twig entering at the left ground edge, the red thread entering at the right edge. Nothing clipped.
- **Frame one, mobile (390×844):** phone rule engaged; same composition refit, arrivals at both edges, nothing clipped.
- **Hold stage (forced render `?seed=t30`, /tmp, read back, deleted):** cycle 0's precario assembled at center-bottom — shell fan at the base left, paper leaning over it, feather sticking up diagonally, twig at the base, small pebble beside it, red thread draped across the top. Cycle 0 rolled the minimum five pieces, no extras.
- **Mid-dismantle (forced render `?seed=t70`, /tmp, read back, deleted):** thread and paper already gone, feather rolling off at the right, twig stick-slipped well right of center, shell still in place — matching the vulnerability schedule exactly.
- **Empty stage (forced render `?seed=t95`, /tmp, read back, deleted):** shore completely empty except the faint ground traces at center.

**Fixes during QA:**
1. Ground traces of "cycle −1" were visible at full strength in frame one (marks of a precario that never existed). Traces are now suppressed for negative cycles; the first shore is pristine.
2. Three departure distances were scaled short (leaf ×0.92, pebble ×0.90, shell ×0.95), which left slivers of those elements parked at the right edge during the empty stage — caught in the t95 check as a pink shell sliver. All departures now travel the full exit distance (frame width + element size − slot x), and t95 re-verified clean.

## Deviations

- The cycle is 100 s rather than the prompt's "about 90 seconds": the prompt's own stage timings (10 assemble + 40 hold + 40 dismantle = 90) plus its 10 s empty rest sum to 100. Recorded here rather than silently compressing a stage.
- The thread's "drape over the rest" is drawn as a sagging sine curve spanning the cluster's top, the topmost element in draw order, instead of a physically draped line following each element's contour — flat glyph language, same read.
- Ground traces fade out during the next cycle's assembly (first 4 s) rather than persisting under the new precario: one shore, one memory at a time, and it keeps frame one of every later cycle as clean as its assembly allows.
