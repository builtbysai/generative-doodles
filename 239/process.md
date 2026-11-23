# Quoted

## Concept

Editorial portrait from EXPANSION #55 (paul-blow), prompt PB2: a magenta-skinned
man in a light-pink pinstripe shirt, neutral expression, on a flat mustard
ground, whose eyes are large black quotation marks. Punctuation substituted
for a body part is the whole gag; there are no speech bubbles and no other
text. The eyes blink roughly every four seconds, and each blink swaps the
punctuation pair. Dragging pulls the marks around the face like magnets and
they snap back to the eyes on release. A tap reseeds: a new punctuation pair
and the next skin hue.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Palette: ground mustard #E8B44B, skin magenta #E91E63, shirt #F7C6D9 with
  white pinstripes clipped inside the shirt path. The punctuation and the
  minimal nose and mouth line work use a near-black ink #14100E.
- Head-and-shoulders composition, centered, sized from U = min(viewport
  width, height): the figure spans about 62% of U in height and 58% in
  width, so it keeps its shape at every aspect. Head is a flat ellipse with
  ear discs, a straight-line mouth and a two-stroke nose; expression stays
  neutral. The shirt has a skin V opening edged in white to read as a collar.
- The eyes are canvas text in one bold serif (900 weight Georgia / Times New
  Roman), drawn at 0.23U. The pair table is fixed and authored: opening
  double quotes, !, ?, ;, ellipsis, single quotes. Index 0 at load, so the
  first frame shows opening double quotes, left eye the opening mark and
  right eye the closing mark.
- Blink: cycle lengths are drawn at load from a mulberry32 stream seeded
  458002, jittered around 4s. The blink is a scaleY squash of the glyphs
  over the last 0.3s of each cycle, and the pair swaps at the closed
  midpoint of the squash.
- Drag: pointerdown grabs the nearest eye; the grabbed mark follows the
  fingertip at 0.9 strength, clamped to 0.24U, and the other mark is pulled
  along at 0.3 strength. On release both ease back to the eye positions.
- Tap (under 10px movement, under 350ms): advances the punctuation pair and
  cycles the skin through the authored table magenta #E91E63, cobalt
  #214FC6, teal #0F8B8D. Never click-to-reload.
- Determinism: the first frame is drawn synchronously at the constant phase
  PHASE0 = 1.2s, mid first cycle with the eyes open. The animation loop,
  when requestAnimationFrame exists, is anchored as PHASE0 plus elapsed
  time since load. No load-time state comes from the wall clock or from
  Math.random.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width and height
  pinned in px inside draw(); phone detection via window.screen physical
  size (min dimension under 700px) with the aspect fallback; the page ground
  is the piece's own mustard. No hint text, no audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp;
  identical. The duplicate was deleted after the check.
- Desktop: portrait centered, head-and-shoulders fills the middle of the
  frame, quote-mark eyes large and legible, pinstripes even across the
  shirt, collar V clean, nothing clipped.
- Thumb: same composition at square format; eyes read at thumbnail size.
- Mobile (390x844): the figure keeps its shape and sits centered on the
  mustard field; eyes and stripes still legible; no doubling or overflow.
- First build pass had the eye glyphs at 0.17U, which read small against
  the prompt's "large"; raised to 0.23U and re-rendered all three sizes.
- Deviations from the prompt letter: the prompt names the cobalt and teal
  skin variants by hue only, so exact hexes were authored (#214FC6,
  #0F8B8D). The punctuation ink is a near-black #14100E rather than pure
  #000000, matching the black of the prompt at print weight. Nose and mouth
  are two minimal ink lines, the least line work that keeps the expression
  neutral and readable. The serif text rendering in the QA harness was
  clean, so the glyphs stayed as canvas text per the prompt rather than
  being redrawn as vector paths.
