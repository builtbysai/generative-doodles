# No.468 — One White Sheep

EXPANSION #56 andrea-ucini, prompt UC4. Gallery date 2003 · 04 · 24.

## Concept

Ucini's "Black Sheep" idiom inverted. A bright green field holds a single white
sheep at center; around it, a slow ring of ten black-sheep silhouettes, all
facing inward like a target. The odd one out is the white one. The ring turns
once per 45 s loop, each black sheep bobbing on its own phase, while the white
sheep grazes on a 9 s head-dip cycle. Dragging moves the white sheep with a
lag; the ring re-centers on it and reforms with spring physics.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Palette only: field #7CB342, white sheep #F5F2EA with face #3A3A3A, black
  sheep #141414. No sky, no fence, no text beyond the lowercase "drag" hint in
  the white-sheep color at 0.38 alpha.
- Sheep are drawn from one parametric shape (rounded body blob with wool bumps,
  head circle, four leg rects, ear triangles); black sheep use the same shape
  filled entirely in #141414 as silhouettes, rotated so each faces the ring
  center. The white sheep's head pivots at the neck so the graze reads as a dip.
- Ring radius is 60% of the half-frame (0.30 x min dimension), so the whole
  ring stays in frame on a portrait phone. Black-sheep scale is clamped to the
  ring spacing so neighbours never overlap on small frames.
- Seeded layout via mulberry32 (fixed seed): base ring rotation, per-sheep bob
  phases, bob speeds, size jitter.
- Interaction state is stored as offsets from frame center in units of the
  frame's min dimension, so resizes never disturb it. White sheep follows the
  pointer with an exponential lag; the ring center is a damped spring
  (K = 26, damping 5.2) chasing the white sheep, so the ring breaks and
  reforms around it. While dragged, the white sheep lifts its head; on release
  it settles back to grazing and everything drifts home.
- House rules: sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas style pinned in px every frame; phone
  detection via window.screen (min dimension < 700) with aspect fallback;
  field composition full-bleed, page ground = field green.
- Determinism: the first frame is drawn synchronously at the constant pre-roll
  phase t = 11 s (ring rotated to a fixed angle, bobs developed, white sheep
  mid-graze at dip ~0.27). The rAF loop is anchored as pre-roll + elapsed and
  typeof-guarded; no frame is ever derived from Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb rendered twice, cmp byte-compare identical; second
  render deleted.
- Desktop/thumb read-back: white sheep unmistakable at center, dark face,
  head lowered mid-graze; complete ring of 10 black sheep evenly spaced,
  heads inward, legs outward; flat green to all edges; hint subtle in the
  lower-left corner.
- Mobile read-back: ring scales down and stays complete and fully in frame;
  white sheep still ~25% of frame width; no clipping, no second white sheep.
- Deviations: none against the prompt's letter. Two interpretation notes:
  "60% radius" read as 60% of the half-frame (keeps the ring whole on
  phones), and the white sheep lifts its head while being dragged (the graze
  resumes on release) — the drag behaviour itself is per the prompt.
