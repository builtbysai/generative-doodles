# No.1018 — Nine Buffers

Study #125 yuta-asai, PP179 "Composer Grid" (the Glitch Composer, Terminal Slam).
A 3×3 grid of live video buffers on black, half lab instrument, half performance
console. No labels, no numbers, no buttons, no sliders: the cells are the whole
interface, and every cell is alive and working.

## Concept

Nine small procedural systems run side by side, each one a stage or a habit of
Asai's mask-gated compositing pipeline:

1. **Detection** — three seeded targets drift on lissajous paths; cyan bounding
   boxes with white corner ticks hunt them, drawn at the target's position from
   `lag` seconds ago, so the box visibly trails the white dot it chases.
2. **People-masks** — three grayscale glyph figures (capsule-skeleton
   silhouettes, white / gray / pale) drift and sway.
3. **Ad-slot masks** — three bright white rectangles appear, hold, and dissolve
   on seeded cadences, each with a gray inner mask.
4. **Halftone** — a dot field whose radius follows a radial wave travelling out
   of a slowly wandering centre.
5. **Glitch** — a hidden figure exists only as data; macroblocks whose centres
   fall inside a fattened test silhouette are drawn in cyan / red / magenta /
   white, re-rolled on a 7 Hz hash clock, some chewed away entirely each tick.
6. **Depth** — five grayscale blobs drift; each is five layered flat-alpha
   ellipses, a soft wash built without gradients.
7. **Segmentation** — a coarse block grid takes the flat class colour (magenta,
   green, yellow, never blended) of the nearest of three wandering class
   centres, if within reach; otherwise it sits at divider tone.
8. **Inpaint** — a hashed gray surface opens a seeded hole each cycle; the hole
   heals inward ring by ring, frontier cells flashing white as they close, then
   a new hole opens elsewhere.
9. **Master** — the composite, bottom-right with a brighter resting border: a
   magenta counterfeit poster (pure shape, no text), two silhouettes with the
   glitch confined strictly inside them, and a cyan box tracking one figure's
   head with the same honest lag as cell 1.

Cells flare a white border (alpha up to 0.9, fast exponential decay) on seeded
event schedules — a detection snap, a slot appearance, a heal completing — each
cell on its own seeded period and offset.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no
  offscreen canvas, no gradients, no shadowBlur, no ctx.filter. All nine
  systems are computed as functions/data and drawn directly into a clipped
  cell rect.
- **Seeding:** every cell's parameters come from its own mulberry32 stream
  (`baseSeed * 31 + cellIndex`). Hash clocks (integer `hash2`) drive the
  glitch re-roll, the inpaint texture, and hole placement — no per-frame
  randomness anywhere.
- **Determinism:** frame one is the synchronous draw at fixed offset
  T0 = 12 s, all cells mid-activity. The rAF loop (typeof-guarded) only ever
  advances from that anchor; frame one is never derived from a wall clock.
  Interaction state (solo, tunes, reseeds) is event-driven and cannot touch
  frame one.
- **Sizing:** canvas from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas style width/height pinned in px on
  resize and every draw. Phone detection via `window.screen` min dimension
  < 700 px, aspect fallback. The grid stays 3×3 on phones; systems scale to
  their cell (halftone pitch and segmentation columns step down slightly).
- **Interaction:**
  - Tap a cell: solo — it fills the frame for 10 s. Tap it again to return.
  - Drag inside a cell: tune that cell's parameter (horizontal drag distance,
    clamped):
    - Detection — box lag, 0.05–0.9 s (drag right = tighter tracking)
    - People-masks — drift rate ×0.3–2.2
    - Ad-slots — cadence rate ×0.3–2.4
    - Halftone — dot pitch ×0.55–1.8 (drag right = finer)
    - Glitch — macroblock size ×0.45–2.2
    - Depth — drift rate ×0.25–2.4
    - Segmentation — rearrangement rate ×0.25–2.6
    - Inpaint — heal speed ×0.3–2.6
    - Master — confined-glitch block size ×0.45–2.2
  - Double-tap: new feed — the base seed advances and all nine parameter sets
    regenerate, tunes reset.
- **Audio:** created lazily inside the first pointer gesture, typeof-guarded.
  Nine quiet voices (one per cell) sit at zero gain; a cell's voice swells
  when its border flares or while it is being tuned, and the master cell's
  voice holds a low constant level as the mix underneath. Silent in QA, where
  no AudioContext exists.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All render
  cleanly in silence (no rAF, no AudioContext in the harness).
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical.
  The duplicate render was deleted.
- Read-backs (desktop, mobile, thumb): all nine cells distinct and alive —
  hunting boxes, drifting silhouettes, white slot rectangles, halftone wave,
  a macroblock figure, soft depth blobs, flat class blocks, a holed gray
  surface mid-heal, and the master composite with its brighter border.
  Nothing clipped on mobile.
- Two fix rounds during QA: (1) the glitch figure and master figures were
  scaled to the cell's short axis and cropped at landscape cells — rescaled
  (glitch 1.55 → 0.82 of min dimension; master figures 1.05/0.82 → 0.78/0.64)
  so whole bodies fit every aspect; (2) the glitch silhouette then read as a
  sparse scatter because the thin capsule figure caught few block centres —
  the containment test now uses a fattened silhouette (thickness ×1.9, head
  ×1.5) and finer blocks (min/13), so the chewed figure reads solidly.

## Deviations

- Cell flares run on each cell's own seeded event schedule rather than being
  wired to the exact internal event instants of each system (per the brief's
  "on seeded schedules"); periods and offsets are seeded per cell, and the
  inpaint flare is phase-locked to its heal cycle so it lands at heal
  completion.
- The glitch cell's hidden shape is tested against a fattened silhouette (see
  QA fix round 2): the shape is never drawn, only used as data, and the
  fattening is what makes the chewed figure legible at macroblock scale.
- Audio voices are simple oscillator tones keyed to flares and tuning rather
  than literal per-cell noise/tearing textures; the nine-voice structure and
  the master-as-mix hierarchy follow the brief.
