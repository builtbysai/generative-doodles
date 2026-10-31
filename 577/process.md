# №577 — Miércoles 28 de Mayo

EXPANSION #70 maria-j-luque, prompt block 1: "El Colofón Bordado".

## Concept

María J. Luque's folk-embroidery register, from "Festejan las gallinas" (2026):
three cartoonish chickens on dusty-rose cloth — a bright magenta hen at center,
two pale blue-gray flankers — facing a scatter of yellow seed-stitches, with
small turquoise stars stitched above. Every shape is appliqué with a dashed
running-stitch outline in dark thread, the way her textile pieces are actually
sewn.

Her signature is the stitched colophon: the work finishes by sewing its own
record into the cloth. Along the bottom edge, slightly crooked, the colophon
gives the real weekday, the full date, and the place: ROSARIO.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Strict palette, nothing else: dusty-rose ground `#D9A08F`, magenta `#C93A72`,
  pale blue-gray `#9AA5B1`, beak/seed yellow `#E8B93C`, turquoise stars
  `#3FA7A0`, dark thread `#2A2320`.
- Chickens are parametric appliqué: body ellipse, wing, tail feathers, comb,
  head, yellow beak, wattle, thread-dot eye; every outline is stroked with a
  dashed running stitch (`setLineDash`) in dark thread. Legs and feet are
  stitch dashes. The center hen is drawn at 1.12 scale, flankers at 0.92,
  the right flanker mirrored so the trio faces inward over the seeds.
- Seed stitches: 46 short yellow dashes scattered from a fixed mulberry32 seed
  in an ellipse under the beaks. Stars: 8 turquoise four-point sparkles with
  cross-stitch centers, dashed outlines, placed in the upper third.
- Cloth: full-stage dusty rose (the page ground is the same color, so the
  scene keeps its shape on phones), faint seeded thread speckle, and a dashed
  running-stitch hem around the edge.
- Ambient motion, all anchored to a fixed phase offset (`PHASE0 = 2.3`,
  rAF elapsed), never to the wall clock: the stars glint twice per 9-second
  loop (seeded per-star phase offsets), and the three heads bob with tiny
  staggered sines (2.7s period).
- Interaction: DRAG gives gentle layered parallax (stars 0.35×, chickens
  0.6×, seeds 1×, clamped and eased). TAP on the colophon band re-stitches
  it: the string is recomputed from the current moment and the letters draw
  on one by one (0.055s per letter) with a blue-gray needle and a loose
  thread trailing behind the work. Nothing ever reloads.
- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; the canvas element is pinned in px inside
  `draw()`; phone detection via `window.screen` (min dimension < 700px) with
  the aspect fallback.

### The colophon rule

The prompt fixes this rule: the colophon always reflects a real moment,
never an invented date. The colophon string is generated from `new Date()`
once at load (and regenerated only when the band is tapped, for the
re-stitch), formatted as `SÁBADO 31 DE OCTUBRE DE 2026 · ROSARIO` — Spanish
weekday and month names, uppercase, place fixed as ROSARIO. This runtime
date is the one sanctioned exception to the no-Date rule in this piece,
and it is scoped to the colophon string only: every animation phase is
anchored to a fixed offset, and `Date.now()` is never used anywhere.

The lettering is set per-character with seeded jitter (offset, rotation,
scale per glyph index, stable across frames) over a dashed stitch-tick
underline, so it reads as hand-stitched rather than typeset; the band sits
rotated −0.011 rad, slightly crooked like hers. The string auto-shrinks
(40px down) until it fits the band.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared —
  identical; second render deleted. Frame one is the synchronous first
  draw: completed scene, colophon for the load date stitched in full,
  no re-stitch in flight.
- Colophon date carried by all QA renders: **SÁBADO 31 DE OCTUBRE DE 2026
  · ROSARIO** (renders run Saturday 2026-10-31; the string will show
  whatever real date a viewer opens the piece on, which is the rule).
- Read-back: desktop and thumb show the trio centered with stitched
  outlines, turquoise stars above, seed scatter at the beaks, colophon
  legible along the bottom. Mobile keeps the full square stage centered,
  colophon fits on one line, nothing clipped.
- Fix during QA: cross-stitch × ornaments at the colophon ends collided
  with the cloth hem and clipped at the stage edge on mobile; removed.
  The band keeps its stitched hem line and stitch-tick underline.
- Grep checks: zero `Date.now`, zero gradients, zero external URLs,
  zero `document.createElement`/`AudioContext`; rAF is `typeof`-guarded.

## Deviations

- The piece title is the prompt's title suggestion ("Miércoles 28 de
  Mayo"), but the in-cloth colophon never shows that or any fixed date:
  per the prompt's own rule the colophon must carry the real date of the
  viewing moment, so title and colophon intentionally differ.
- Colophon lettering uses a cursive font stack with seeded per-glyph
  jitter and a stitch-tick underline rather than fully hand-drawn vector
  letterforms; the QA renderer has no script font, so the wobble pass is
  what carries the hand-stitched read.
- A tiny "tap · drag" hint sits in the top-left corner inside the hem
  (house hint convention); it is set in plain sans, outside the cloth's
  fiction, at 45% thread alpha.
