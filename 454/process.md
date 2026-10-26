# №454 Pattern Facade

## Concept
Her Blue House, per BATCH-454-456-SPEC.md (prompt FM6, EXPANSION #52 flowink_myst,
prompt 6 of 8). A portrait building elevation whose whole facade is a blue-on-cream
swirl pattern: dark windows, one glowing warm, translucent ghosts passing in front,
a giant apricot sun behind the roofline. Illustration, not CAD: no plans, no labels,
no in-piece text of any kind.

Palette (verbatim from spec): pattern blue #5A7AC8 on cream #F0EAE0, facade shade
#D8D0C0, window dark #2A2E38, lit window warm #F2C86A, sun apricot #F2A87A,
ghosts translucent slate #6E7688 at 40%.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets.
- Visual Viewport sizing: resize reads visualViewport with window fallback, and
  resize listeners sit on both visualViewport and window. draw() pins
  canvas.style.width/height in px every frame.
- Phone detection via window.screen (min dimension under 700px), aspect
  h > w*1.15 as fallback. Centered portrait composition: shape kept on phones,
  page ground takes the cream background.
- Facade window spans 15% to 85% of frame width (70% of frame) from 14% to 86% of
  frame height. Building content is 1.6x the window width and pans inside the
  clipped window; drag pans across the bays, clamped to the building overhang,
  eased back toward center on release. Watch-only ambient mode runs with no pointer.
- Pattern, data-only, no offscreen canvas, no document.createElement: a fixed
  16x12 grid of archimedean spirals with seeded jitter, precomputed once from seed
  454001 and drawn directly each frame. Slow morph is a flow-field drift of spiral
  centers and phases (sine drift on each spiral's fixed phase).
- Windows: 8 bays x 4 floors laid over the pattern in building coordinates, so
  dragging reveals more bays. Lit window cycles every 20s on a fixed schedule
  (LIT_ORDER table, index 0 at load, so the top-row fifth bay glows in frame one).
- Side return: narrow shaded strip fixed at the right edge of the facade window,
  facade shade ground with the same spiral pattern at lower value (darker blue,
  sparser stride, smaller cell).
- Sun: apricot disc at top-right, drawn before the facade so the roofline occludes
  its lower part, plus a faint halo ring.
- Ghosts: three silhouettes from fixed authored tables (offset, speed, direction,
  size), crossing the bottom foreground, fading at the frame edges, 40% alpha.
- Determinism: first frame drawn synchronously at constant phase PHASE0 = 1.5;
  the rAF loop is anchored as PHASE0 plus elapsed since load, guarded by a typeof
  check. Never drawn from Date.now(). No click-to-reload: drag only pans.
- Gallery note (for pieces.json, not in the piece): "A blue swirl-patterned facade
  under an apricot sun, ghosts passing before it. Drag to pan across the facade."

## QA log
- Rendered with node ~/workspace/tools/render-piece.js:
  - 720x720 thumb rendered twice; the two PNGs compared byte-identical with cmp
    (BYTE-IDENTICAL, determinism gate passed). This was re-run after the side-return
    fix below and passed again.
  - 1280x900 desktop render inspected: facade portrait filling 70% of frame width,
    sun top-right behind the roofline, lit warm window top row, ghosts crossing the
    bottom foreground, door centered at ground floor. Correct.
  - 390x844 mobile render inspected: same composition, portrait shape kept, page
    ground cream, sun top-right, ghosts crossing the bottom. Correct.
- Fix during QA: the first side-return render drew the full 16x12 spiral grid
  squeezed into the narrow strip, reading as dense scribble. Fixed by drawing the
  strip pattern with a smaller cell (strip width x 0.55) and stride 8 (two spiral
  columns per row), so it reads as the same pattern at lower value. Re-rendered and
  re-inspected at all three sizes after the fix.
- No deviations from spec. Nothing pushed to any repo (builder does not push).
