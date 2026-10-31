# No.536 Interior Stories

EXPANSION #64 naida-mazzenga, prompt NM8 (fanzine interior, "Historias de
interior" mode).

## Concept

A riso comic page of quiet interior life: six panels in 2 columns x 3 rows
with thick cream gutters and heavy ink borders, no panel bleeding off the
page. The scenes: (1) a cat asleep on a pile of books, with the hand-lettered
sound word "miau" in pink; (2) a figure reading by a window while rain
streaks the glass outside, with "plip" in blue (this panel is the widest on
the page); (3) a kitchen table with two steaming cups and a half-finished
drawing; (4) a hallway with coats on a stand and a small dog on a rug;
(5) a bedroom whose wall carries a minimalist blue-line figure poster;
(6) two pink riso hands holding a tiny handmade zine. Images and the two
sound words only: no dialogue balloons, no narration boxes. The piece rests
still; tapping one panel plays that panel's single micro-scene once, then it
settles. One tap, one panel.

The six micro-motions:
1. Cat: the tail flicks up and wiggles twice, then curls back to rest.
2. Rain window: the seeded rain streaks slide down the glass for one pass.
3. Kitchen: the steam wisps over both cups swell and rise.
4. Hallway: the dog's ear twitches (a quick damped double-twitch).
5. Bedroom poster: the blue line figure partially un-draws and redraws
   itself via a dash-offset sweep (about 85% of the line at the dip).
6. Zine: one page turns over, showing a small pink heart on its back
   mid-flip.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio.
- Palette only, flat fills, no gradients anywhere: riso blue #2B4FE0, riso
  pink #FF4E8A, cream paper #F7F1E3, ink #1A1A1A, rain grey #9AA3B2.
  Panel grounds are the cream with a very low-alpha wash of one palette
  colour each to separate the panels; the blue is also used for small
  details the palette forces (plant leaves, dog collar, sleeves).
- Layout computed from the square stage: page margin 0.045, gutters 0.024;
  rows 0.278 / 0.282 / 0.302 tall; top-right panel widened (0.458 vs 0.428)
  so the rain window is the wide panel. Each scene is a clipped draw
  function in panel-relative coordinates; borders are rounded-rect ink
  strokes at 0.0075 of stage.
- Sound words are drawn letter by letter in a bold rounded font stack with
  seeded per-letter jitter and a slight whole-word rotation, so they read
  hand-lettered rather than typeset.
- Interaction is tap-only (pointerdown / mousedown / touchstart with a
  350 ms dedupe). Hit-testing maps the tap into the six panel rects; each
  panel keeps its own one-shot animation start on the loop clock, with its
  own duration (1.0 to 1.8 s). No drag, no reload.
- Riso grain: 750 precomputed seeded specks (mulberry32, fixed seed 536064)
  drawn directly each frame over the whole page; the rain streaks (30) are
  likewise precomputed from the same seeded stream.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on visualViewport and window, canvas CSS size pinned in px inside draw(),
  phone detection via window.screen physical size (min dimension < 700 px)
  with the h > w*1.15 aspect as fallback only. Page ground is the piece's
  cream; on phones the square page letterboxes centered on that cream.
- Determinism: the first frame is drawn synchronously at load with every
  panel idle but complete (tail curled, rain streaks resting on the glass,
  steam wisps present, poster figure fully drawn). Frame one never derives
  from Date.now(); the rAF loop is typeof-guarded and only advances tap
  animations.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical (re-verified after both fixes below); the second render was
  deleted each time.
- First read-back pass: page structure, both sound words, and all scenes
  read correctly, but two panels needed fixes. (a) Panel 6: the hands read
  as two scalloped pink columns with ringed lollipop palms; rebuilt as
  palms rising from the bottom corners with small fingertip bumps gripping
  the zine's lower side edges and a thumb on each side. (b) Panel 4: the
  dog's body and head were outlined with rounded-rect strokes that did not
  match the ellipse shapes, doubling the outline; replaced with true
  ellipse/circle strokes, and the tail lengthened.
- Also during the build: a typo in the poster figure point data
  (0.qi345) was caught by a syntax check before first render and fixed;
  the poster line weight was raised slightly (0.0055 to 0.0062 of stage)
  so the figure holds at thumbnail size.
- Final read-back: six bordered panels, every scene identifiable, "miau"
  in the cat panel and "plip" in the rain panel, no text boxes anywhere,
  the only other text the subtle "tap" hint at bottom-left; mobile keeps
  the whole square page on the cream ground, nothing clipped.

## Deviations

- The rain-window panel is made the widest by widening its column for the
  top row only (0.458 vs 0.428 wide); the other two rows split evenly. The
  prompt asks for one wide rain panel without fixing the grid geometry.
- The blue-line poster figure is a tasteful single-line standing figure
  (head circle plus one continuous body line) in the spirit of a minimal
  line-art nude poster; no explicit anatomy is drawn.
- Grain is a precomputed seeded speck array drawn directly each frame
  instead of a pre-rendered grain canvas, because the QA renderer has no
  offscreen canvas; the texture read is the same.
- Panel washes are palette colours at 4 to 14% alpha over the cream rather
  than separate tint colours, keeping the piece strictly inside the five
  specced inks.
