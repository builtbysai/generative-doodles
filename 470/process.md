# No.470 Yellow Wall

EXPANSION #56 andrea-ucini, prompt UC6.

## Concept

Ucini's Telegraph "echo chamber" image as an interactive piece: a tall white
wall fills the frame, a man on a tall ladder at center holds a paint roller,
and the wall starts white. Dragging paints yellow bands that accumulate and
are never erased; the man's job is to paint the whole wall yellow, and the act
of painting is the editorial point. When the wall is fully yellow the piece
simply holds, quietly. Tap or double-tap reseeds: the wall resets to white and
the man restarts at the bottom. No text beyond a small lowercase "drag" hint in
the ladder color; no captions, no other paint colors, no drips outside where
the roller has passed.

Palette, exactly as specced: wall #F5F2EA, paint #F2C14E, ladder #8A6A45,
sweater #2A2A30, trousers #3A3A40, skin #E8B88A, roller handle #6B5B45.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

- Canvas size comes from the Visual Viewport API (window.innerWidth/Height
  only as fallback), with resize listeners on visualViewport and window. In
  draw(), canvas.style.width/height are pinned in px every frame, and the
  backing store is scaled by devicePixelRatio. Phone detection uses
  window.screen physical size (min dimension < 700px), with the aspect
  fallback (h > w*1.15) only when screen is unavailable. The wall is
  full-bleed at every size; the page ground is the wall white.
- The ladder is centered, 80% of frame height, two rails plus rungs. The man
  is a flat figure (limb strokes, torso path, head circle) standing at the
  ladder's base at load; the roller is a paint-yellow rounded cylinder on a
  bent handle frame whose grip he holds.
- Interaction: pointer drag moves the roller target; the roller eases toward
  it and stamps paint along its travelled segment each frame, so fast drags
  leave no gaps. The man climbs the ladder, easing his feet toward the height
  the painting has reached. A press with under 10px of travel released within
  350ms counts as a tap and reseeds; dblclick also reseeds. This is a reseed,
  never a page reload.

### Deviations and adaptations

- Offscreen-canvas paint layer replaced by JS data (required house
  adaptation): fly's QA renderer has no document.createElement and no
  offscreen canvas, so the paint layer is a coverage grid, a
  Uint8Array of 100 x 130 cells over the wall stored as fractions of the
  frame. Each frame the painted cells are replayed onto the main canvas as
  run-merged #F2C14E rects per row. Paint therefore survives resizes, and
  completion is computed from the data: coverage >= 99.5% ends the piece, the
  man climbs back down to the bottom, and the full yellow wall holds.
- Roller travel interpretation: the prompt says the roller follows the
  pointer vertically on the ladder, and also that the piece ends when the
  wall is fully yellow. Strictly vertical travel inside one ladder lane
  could never cover the whole wall, so the roller follows the pointer in
  both axes while dragging; the man stays on the ladder and climbs to the
  roller's height, which keeps the ladder as the vertical spine of the
  action. Recorded here as the one reading that satisfies both clauses.
- No randomness anywhere: no jitter was needed, so no RNG is used and the
  first frame is deterministic by construction.

### Determinism

The first frame is drawn synchronously at load in the exact initial state:
white wall, empty paint grid, ladder centered, man at the bottom with the
roller held beside him. No clock (no Date.now, no timestamps) feeds any
drawing state. The animation loop is guarded by a typeof check on
requestAnimationFrame and only eases positions from that same initial state.

## QA log

Tool: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no
offscreen canvas), index.html rendered at three sizes.

- qa-desktop.png (1280x900): white wall full-bleed; ladder tall and centered
  with 15 rungs; man at the bottom in dark sweater and trousers, head clear
  of the roller, working arm extended along the roller frame; yellow roller
  held against the wall to the right of the ladder; "drag" hint bottom-left
  in ladder brown at 55% alpha.
- qa-mobile.png (390x844): same composition, phone scale (man enlarged via
  the screen-size branch); ladder, man and roller all fully in frame,
  nothing clipped.
- thumb.png (720x720): same read at gallery size.
- Determinism gate: thumb.png rendered twice and compared with cmp:
  byte-identical. Pass. (Second render deleted.)

Fix during QA: the first pass drew the handle wire from the roller's far end
back across its own span, so the roller read as a floating bar with a stray
wire trailing past it. Rebuilt the handle as a proper roller frame: the wire
drops from the roller's right end cap to grip height, the shank runs back
under the roller to the grip, and the man's arm ends at that grip; the rest
pose also moved right and up so the roller clears the man's head. All three
sizes re-rendered and the determinism gate re-run after the fix: pass.
