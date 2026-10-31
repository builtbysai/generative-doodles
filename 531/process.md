# No.531 Cabinet of Curiosities

EXPANSION #64 naida-mazzenga, prompt NM3 ("Wunderzines" curiosity cabinet).

## Concept

A strict 4x4 cabinet grid on a cream ground. The four center cells merge into
one large cell holding the hand-lettered title WUNDERZINES in flat display
lettering, each letter its own palette color with a slight seeded tilt. The
remaining twelve cells each hold one whimsical flat-color doodad, centered at
about 70% of its cell, never touching the cell border. The piece is still at
rest; tapping one object plays that object's single playful animation, then it
settles. One tap, one object.

The 12 picks (of the prompt's 16 candidates): purple heeled boot, patterned
teapot, seashell, green gem, duck-neck lamp, spotted dog clock, purple
mushrooms, ice cream sundae, white flower, striped sock, tiny sailboat, key.
Cut to fit the 12 cells: brass button, leaf, flute, abstract blob.

Pattern fills (4 objects): cream dots on the teapot, purple spots on the dog
clock, horizontal stripes on the sock, blue stripes on the sailboat's sail.

Tap animations: boot kicks and hops; teapot tilts and pours one drop; seashell
rocks; gem throws three sparkles; lamp nods and lights (layered flat glow
circles); dog clock hands spin twice and settle back to 10:10; mushrooms
squash in sequence; sundae cherry bounces; flower spins once; sock wiggles and
stretches; sailboat bobs and rocks on its waves; key turns like unlocking and
sparkles.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio.
- Palette only: cream #F7F1E3, purple #8E44AD, gem green #27AE60, sundae pink
  #F5A3C7, teapot blue #2B4FE0, ink #1A1A1A, accent yellow #F2B705, plus white
  for cell panels and the flower (the prompt's white flower). Flat fills only;
  no gradients, no shading, no drop shadows anywhere.
- Grid computed from the square stage: margin 0.055, gutter 0.02, cell 0.2075
  of stage; center 2x2 merged. Cells are white panels with a thin ink hairline
  so the gutters read as cream.
- Each object is a self-contained draw function in a local -1..1 box, drawn at
  70% of its cell. Title letters are thick-stroke glyph paths (W, U, N, D, E,
  R, Z, I, S) stroked per letter in palette colors.
- Interaction is tap-only (pointerdown / mousedown / touchstart with a 350 ms
  dedupe). Hit-testing maps the tap into the cell grid; each cell keeps its own
  one-shot animation start time on the loop clock. No drag, no reload.
- Riso grain: 650 precomputed seeded specks (mulberry32, fixed seed 531064)
  drawn directly each frame over the whole stage.
- Sizing follows the house rules: Visual Viewport API with resize listeners on
  visualViewport and window, canvas CSS size pinned in px inside draw(), phone
  detection via window.screen physical size (min dimension < 700 px) with the
  h > w*1.15 aspect as fallback only. Page ground is the piece's cream.
- Determinism: the first frame is drawn synchronously at load with every
  object idle; frame one never derives from Date.now(). The rAF loop is
  typeof-guarded and only advances tap animations.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical (re-verified after the fix below); the second render was deleted.
- First pass failed the gate visually: the center cell was blank. The title
  glyph transform scaled by stage units instead of pixels, shrinking the
  letters to invisibility. Fixed by scaling with lw*SS / lh*SS and re-rendered
  all three sizes; title now reads WUNDER / ZINES in the merged center.
- Final read-back: strict 4x4 grid with cream gutters, WUNDERZINES display
  title in the merged center cell, all 12 doodads distinct and centered with
  clear border clearance; mobile letterboxes the square on the cream ground,
  nothing clipped; the only text besides the title is the subtle "tap" hint.

## Deviations

- Title lettering is built from thick-stroke glyph paths rather than filled
  outline type; it reads as flat hand-drawn display lettering, which matches
  the hand-lettered intent.
- Cells are drawn as white panels with ink hairlines over the cream ground
  (the ground and gutters remain the specced cream) to make the strict grid
  legible; no extra colors introduced beyond the prompt's own white flower.
- Tapping the merged title cell does nothing: the prompt's tap rule covers
  objects, and the title is not one of the twelve.
- Grain is a precomputed seeded speck array drawn directly each frame instead
  of a pre-rendered grain canvas, because the QA renderer has no offscreen
  canvas; the texture read is the same.
