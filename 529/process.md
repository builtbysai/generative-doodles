# No.529 - Ant Atlas

EXPANSION #64 naida-mazzenga, prompt NM1. Source: TASKS.md (verified verbatim by the parent agent).

## Concept

Naida Mazzenga's HORMIGAS S.A. mode: the giant insect as diagram-hero. One enormous red ant stands at center among oversized flat flowers, treated like the cover star of a natural-history book for kids. Around it float five specimen-card panels, each a tiny flat diagram with a playful Spanish label borrowed from the book's world. A multicolor decorative title band across the top reads HORMIGAS, one color per letter. Everything is riso-flat: six palette colors, no gradients anywhere, a precomputed seeded speck array laid over the fills as print grain.

The piece is watch-only, a pure motion loop: the giant ant's antennae wave, the leaf-cutter's leaf flutters, the army-ant column marches in place up its diagonal, and the size-chart coin spins slowly on its squash cycle.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio, no interaction.
- Square stage centered on the sky-blue page ground (`#7EC8E3` body background matches the stage sky, so the letterbox blends on tall screens).
- Sizing from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection follows the house rule (`window.screen` min dimension < 700px, aspect fallback).
- Giant ant: segmented ellipses (striped gaster with clipped darker-tone bands, petiole nodes, thorax, head) plus jointed legs drawn as two-width stroke pairs to fake taper; far legs and far antenna in a darker tone of the ant red. Friendly face: cream eye, ink pupil, smile arc.
- Mini ant glyph is shared across panels with a soldier variant (oversized armored head, ink armor arcs, mandible hooks, eye omitted under the armor).
- Panels: cream rounded cards with ink borders, slight seeded rotations, art region on top and label text below in bold ink sans.
- Panel labels used:
  1. Soldier ant: "El soldado blindado"
  2. Leaf-cutter: "La cortadora de hojas"
  3. Army-ant column: "La marabunta" (label given in the prompt)
  4. Beetle and mite riders: "Con zapatillas y mochilas" (the prompt's own caption, kept verbatim)
  5. Size chart: "Tres tallas, una moneda" (three ant sizes on a baseline beside a spinning coin)
- Riso grain: 700 precomputed seeded specks (mulberry32, fixed seed 529064) drawn directly each frame, because the QA renderer has no offscreen canvas.
- Determinism: frame one is drawn synchronously at the constant loop phase PHASE0 = 1.4s, never from `Date.now()`; the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed since load. Seed fixed, no `location.search` seed parameter.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared - identical (re-verified after the fix below); the second render was deleted.
- Read-back, desktop/thumb: giant red ant dominant at center (about 54% of frame width) standing on the scalloped green meadow band among oversized flat flowers; HORMIGAS banner across the top tenth with one color per letter; five labeled panels in a loose ring (soldier top-left, leaf-cutter top-right, size chart right-middle, riders bottom-right, marabunta column bottom-left); all labels legible; panels clear of the ant; nothing clipped.
- Read-back, mobile (390x844): the whole square stage letterboxes centered on the matching sky ground, composition keeps its shape, nothing clipped; panel labels are small at this width but the layout and title stay readable.
- Fix during QA: in the first pass, floating flowers (top corners, left-middle cluster) grew full-height stems to the bottom edge, reading as stray green lines down both sides. Stems are now drawn only for ground-band flowers (y > 0.75); floating blooms sit stemless in the sky. All three sizes re-rendered and the determinism gate re-run after the fix.

## Deviations

- Panel label wording: the prompt fixes only two captions ("La marabunta" and the spirit of "Con zapatillas y mochilas"); the other three labels were written in the same playful register ("El soldado blindado", "La cortadora de hojas", "Tres tallas, una moneda") rather than left blank, since the prompt asks for one playful label line per panel.
- One extra tone: a darker shade of the ant red (`#A92C20`) is used for gaster stripes, far-side legs/antenna and the soldier's armor, as shading within the specced ant red rather than a seventh color.
- The prompt's foliage border band became a scalloped meadow strip along the bottom with a flower row, plus floating blooms in the sky corners and a left-middle cluster, so the five panels could float in the ring without sitting on top of dense foliage.
