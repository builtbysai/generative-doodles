# No.619 — The Mirror Is the Law

EXPANSION #75 mariona-cabassa (@theinvisiblecircle), prompt block 3 "Árbol Espejo".

## Concept

Her strictly mirrored floral tree as a living mandala. A tree grows from a
sunflower base at bottom center on bare paper: trunk, mirrored branches,
mirrored leaves in two greens, mirrored pink blossoms. The mirror is the law —
everything drawn on the left is reflected on the right. Asymmetry is allowed
to visit but never to stay: a spontaneous flourish sprouts on one side every
~14 s, and over the next ~4 s the mirror corrects it, fading its twin in on
the other side until the pair belongs to the tree. A drag is a gust: branches
lean and a few asymmetric buds appear, then get corrected. A tap plants one
deliberate asymmetric flower at the nearest branch point; it lives a while,
then the mirror absorbs it the same way. No landscape, no animals, no text.

Palette (strict): paper #F5F1E8, leaf green #5C8A4D, deep leaf #3E6B35,
blossom pink #E87B9C, sunflower yellow #E8B93B, trunk brown #6B4A2E.

## Construction

- Single self-contained `index.html`, canvas 2D. Canvas size comes from the
  Visual Viewport API with resize listeners on both `visualViewport` and
  `window`; `draw()` pins `canvas.style.width/height` in px every frame.
  Phone detection via `window.screen` (min dimension < 700 px), aspect
  `h > w * 1.15` as fallback only.
- The tree is generated once from mulberry32 (fixed seed 619075) as a
  recursive branch set for the LEFT half only, in normalized coordinates
  (origin at trunk base). Branch angles are clamped so limbs never lean
  across the mirror line. A normalization pass then rescales whatever the
  seed grew to a crown half-width of 0.41 and height of 0.97 of the tree
  unit, so no seed can push blossoms off the frame. Leaves and blossoms are
  attached to branch nodes from the same seeded stream.
- Rendering draws the branch/leaf/blossom set twice per frame: once as
  generated, once under `translate(cx,0) + scale(-1,1)`. Trunk and sunflower
  sit exactly on the axis and are drawn once (sunflower seed ring uses
  60-degree steps so it is itself mirror-symmetric).
- Sway is a per-depth phase-offset offset subtracted against its own t=0
  value, so sway is exactly zero in frame one and grows in smoothly; blossom
  pulse and leaf tilt use the same trick. Layout fits the tree by both width
  and height and centers it vertically, so the shape and margins hold on a
  tall phone frame.
- Flourishes live in a separate event list with grow-in (0.7 s), linger, and
  a 4 s correction window during which the mirrored twin fades in; after
  correction the mark moves to a settled list drawn identically in both
  halves (it is part of the tree now). Spontaneous scheduling and all
  interaction picks draw from a second mulberry32 stream (seed 619331)
  against the anchored elapsed clock — never wall time.
- Interaction: pointer/mouse/touch down-move-up. Drag distance drives the
  gust (lean decays over ~2.8 s) and leaves 2–3 buds on release; a tap snaps
  to the nearest branch node on the tapped side (mirror positions included)
  and plants a flower with a 5 s linger. No click-to-reload anywhere.
- Determinism: one synchronous `draw(0)` at load — perfect symmetry, sway
  phase 0, no flourish. The rAF loop is `typeof`-guarded and anchored to the
  first frame's timestamp; elapsed time, not `Date.now()`, drives everything.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF, no
offscreen canvas, no filters).

- First pass: composition read well but the crown clipped blossoms at the
  frame edges, and a numeric mirror check found 413 strong mismatched pixels
  concentrated near the axis — branches leaning across the mirror line and
  axis-straddling blossoms stacking differently per half. Fixed by clamping
  branch angles at the mirror line, adding the extent normalization pass,
  fitting layout by width as well as height with vertical centering, and
  making the sunflower seed ring symmetric.
- After the fix, at all three sizes (1280x900, 390x844, 720x720):
  - Determinism: thumb.png rendered twice and `cmp` byte-compared —
    identical. Second render deleted.
  - Symmetry: pixel-exact mirror comparison of each render — 0 strong
    mismatches; total mismatch 0.05–0.08 % of the half-frame, all of it
    antialiasing on curved strokes.
  - Clipping: outermost rows/columns are pure paper at every size.
  - Visual read-back: strictly symmetrical blossoming tree, sunflower disc
    with petals at the roots, calm margins, crown below the top edge; phone
    render keeps the whole tree centered with the glyph-free paper ground.

## Deviations

- The prompt's technical note suggests drawing the left half to an offscreen
  canvas and blitting it flipped. This renderer provides no
  `document.createElement` / offscreen canvas, so the mirror is done by
  drawing the same geometry twice per frame under a horizontal-flip
  transform. Same visual law, no intermediate surface; noted here per
  process convention.
- Everything else follows the prompt block as written.
