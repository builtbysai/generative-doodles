# №1131 — Delta Phi

Jussi Ängeslevä study block JA4 (Delta Phi, 2013). Built 2026-11-01. Build + QA only; not pushed.

## The piece

Ängeslevä's computational caustics: a dark wall (`#05070A`) fills the frame.
Centred on it, occupying the middle ~60%, is a chrome-plated surface milled
with a wavy facet field — flowing ridges and dimples that read as pure
abstraction. A single spotlight sweeps slowly across it (30s full sweep);
each facet is milled at its own angle, so the facets whose angle meets the
light flare toward the bright catch `#E8EEF5` in a bright band that travels
across the chrome, over a base shading mixed per cell between deep facet
shadow `#1C2129` and chrome `#9AA2AD`. Around the chrome, in the darkness,
some 240 caustic flecks shimmer — plain gold `#E8C876` rects (a fifth of them
pale) under `'lighter'`, their alpha an interference function of the light
angle and time.

Hidden in that shimmer are five Greek glyphs — Δ Φ Ψ Ω λ — seated on the
dark wall around the chrome. The message exists only in the reflected
light, never on the surface: each glyph has a sweet-spot light angle, and
its legibility is a smooth falloff of the distance between the current
sweep angle and that sweet spot. Near its angle a glyph is one crisp gold
pass; off it, it smears into five offset ghost passes and melts back into
the fleck field (flecks near a resolving glyph brighten with it). As the
sweep travels, one glyph at a time surfaces out of the caustics and
dissolves again.

## Adaptation choices

- **No gradients anywhere** (house rule): facet tones are RGB mixes computed
  per cell per frame; the spotlight cone is three stacked translucent
  triangles in `#2A3442` fanned from an off-frame source above the band;
  specular softness comes from the cubic falloff of the per-cell flare.
- **The light is closed-form.** The sweep angle is
  `AMP · sin(2πt/30 + phaseShift)`. Dragging holds the angle directly from
  the pointer's x position; on release, `phaseShift` is recomputed (asin
  branch chosen to preserve the sweep's direction) so the autonomous sweep
  resumes from exactly the angle the visitor left — reading with a
  flashlight, then handing the light back. Double-tap reseeds the milling,
  the glyph seating, and the sweet spots; nothing ever reloads.
- **The glyph is drawn with `fillText`** — it is the specced hidden
  message, and the only text in the piece besides the `<title>`.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  t = 30s, where the sweep angle is exactly 0 — the sweet spot of the
  first glyph (Δ, always seated left of the chrome), so frame one shows
  the band mid-chrome and Δ fully resolved. The rAF loop is
  typeof-guarded and anchors elapsed time to that phase.
- **House rules throughout:** Visual Viewport sizing with resize listeners
  on both visualViewport and window, canvas CSS size pinned in draw(),
  phone detection via `window.screen` min dimension < 700px (aspect
  fallback), DPR capped at 2, seeded mulberry32 only. No canvas gradients,
  no `ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`,
  no `ctx.ellipse`/batched arcs, no audio, no microphone. Silent by design.

## QA

Rendered with `~/workspace/tools/render-piece.js` (node-canvas):

- `qa-desktop.png` 1280×800 — dark wall; wavy chrome facet field centred
  with bright specular catches mid-sweep and the faint cone above it;
  the gold Δ resolved crisply in the darkness left of the chrome;
  caustic flecks shimmering across the wall.
- `qa-mobile.png` 390×844 — same composition held in portrait: chrome
  column centred, Δ legible at the left edge, flecks throughout.
- `thumb.png` 720×720 — rendered twice and `cmp`-compared:
  **byte-identical**; the duplicate was deleted.

Interaction summary: the light sweeps on its own and the glyphs resolve
and dissolve with it; drag horizontally to hold the light at your angle
and read the glyphs under your control; release and the sweep resumes
from where you left it; double-tap reseeds the facets and the hidden
sequence. Silent by design.
