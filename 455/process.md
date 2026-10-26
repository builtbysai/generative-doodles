# №455 Rogue Cover

## Concept
A magazine-cover satire in the FM7 prompt voice: a giant serif masthead over a
centered watercolor-style portrait of an ordinary person holding an unexpected
animal, on a mottled chartreuse ground, with italic cover lines in two side
columns. The satire is layout mimicry only: invented masthead, no real magazine
name, no celebrity face, no photo collage, no barcode. Tap publishes a new
issue from fixed tables, never reloading.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets, no
  webfonts. System serif for the masthead (900 weight) and italic serif for
  cover lines.
- Sizing: Visual Viewport width/height with resize listeners on
  visualViewport and window. In draw(), canvas.style.width/height are pinned
  in px. Phone detection via window.screen (min dimension under 700px) with
  aspect h > w*1.15 fallback; the centered 3:4 cover keeps its shape at all
  sizes and the page ground is the chartreuse ground (#A8B82A).
- Cover: 3:4 rect centered in the frame. Masthead centered at 11% of cover
  height with a rule at 20.5%, inside the top 22% band; masthead size shrinks
  by measure until it fits 94% of cover width. Portrait oval backdrop is
  centered at 52% of cover height and spans about 55% of cover height.
  Cover lines sit in left and right columns (3% and 77% of cover width,
  20% wide each), starting at 26% of cover height.
- Fixed tables, index 0 at load: mastheads [ROGUE, WILDISH, OFF-GRID,
  MYCELIUM]; animals [hen, rabbit, cat, goat]; subjects [blue coat #3A5FA0,
  rust coat #A0522D, olive coat, plum coat]; cover lines (6):
  "Mycelium: les createurs qui tissent avec le vivant", "Chic Off-Grid",
  "Mode Circulaire", "Jardins sur les toits", "Le potager en ville",
  "Tisser sa garde-robe". Load issue is ROGUE, blue-coat subject, hen.
  Tap (pointerdown) advances the issue index modulo 4, cycling masthead,
  subject, animal, and cover-line rotation in order.
- Portrait: generative head, shoulders, scarf, and arms as simple shaded
  shapes; watercolor texture is translucent deterministic blotches (sin-hash
  positions, no random seed) over the ground and coat. Animals are stylized
  shapes drawn directly: hen with comb, beak, and tail; rabbit with long
  ears; cat with whiskers and tail; goat with horns and beard.
- Loop: synchronous first frame at t = 0; the rAF loop is anchored as
  offset plus elapsed since load (loopStart set on the first rAF timestamp),
  never Date.now(). Portrait breathes with sin(t*1.4); subject and animal
  blink when t mod 10 reaches 9.7; the animal ear twitches when t mod 10 is
  in [5, 5.5); dust motes drift on deterministic paths. rAF is guarded by a
  typeof check. No offscreen canvases, no document.createElement on the load
  path, no Math.random, no Date.now.
- No artist signature, no in-piece UI or hint text, no em dashes, no
  AI-signature copy.

## QA log
- Rendered twice with node ~/workspace/tools/render-piece.js index.html
  720 720 thumb.png. Both renders md5 56534e9bd244a6a8b7c5a3b99148697e,
  cmp clean: BYTE-IDENTICAL (determinism gate passed).
- Rendered once at 1280x900 desktop and once at 390x844 mobile and inspected
  both before deleting the QA intermediates: masthead ROGUE fills the top
  band, portrait is centered with the blue-coat figure holding the hen,
  all six cover lines are legible in the two side columns, the 3:4 cover
  keeps its shape on mobile with chartreuse ground above and below.
  Thumb inspection matches: masthead top 22%, centered portrait, side
  lines legible.
- Grep checks: no em dash character, no Date.now, no createElement,
  no Math.random in index.html.
- Listeners confirmed by the render harness: vv:resize, win:resize,
  canvas:pointerdown.

## Deviations from spec
- None. The three companion cover lines are authored in the same voice as
  the three spec-named lines ("Jardins sur les toits", "Le potager en
  ville", "Tisser sa garde-robe"). The hen is index 0 of the spec's animal
  set order (hen, rabbit, cat, goat), and the blue coat is index 0 of the
  subject set.
