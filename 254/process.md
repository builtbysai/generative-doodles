# No.509 Bear Page

EXPANSION #61 alice-piaggio, prompt AP5. Her Die Zeit "Lach mal!"
body-as-layout device: the bear's torso is the page.

## Concept

One giant blue bear fills a portrait 3:4 stage, touching the top, left and
bottom edges, facing the viewer. Its torso is a negative-space well in light
blue-grey holding glyph-like text texture: two columns of short horizontal
line-blocks in paragraph groups, with one thick red headline block. A red
starburst sits behind the bear's head. One giant white paw waves from the
top-right. Three to five wavy red hair-strands trail in from the right edge.
Small yellow abstract blobs sit at both bottom corners. No readable text
anywhere, flat fills only, no gradients.

Watch-only ambient loop: the well breathes (scale 0.98 to 1.02), the paw
waves (rotate plus/minus 8 degrees), the line-blocks shimmer in a slow
top-to-bottom alpha wave, and the starburst pulses. Double-tap reseeds the
layout: new well shape (oval, arch or rounded rect), new headline position,
new strand count. Never click-to-reload.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Stage is a 900 x 1200 design space (3:4 portrait logic), letterboxed into
  the viewport with a fit scale. Canvas size comes from the Visual Viewport
  API, with resize listeners on both visualViewport and window. In draw(),
  canvas.style.width and height are pinned in px every frame.
- Phone detection uses window.screen physical size (min dimension under
  700px), with the aspect rule (h greater than w times 1.15) only as a
  fallback when screen is unavailable. The composition keeps its 3:4 shape
  on phones; the page ground is the piece's own white, so letterbox margins
  are invisible.
- Bear silhouette: a union of seeded circles and ellipses (ears, crown bump,
  head, cheeks, torso, arms, feet) drawn in one flat blue fill. Face: white
  oval eyes with blue pupils, white muzzle, blue nose, stem-and-arc smile.
- Well: path by shape (ellipse, arch with semicircular top, rounded rect),
  filled light blue-grey, drawn under a breathing transform about its
  centre. Line-blocks are generated per layout: paragraph groups of 3 to 5
  rows, two columns with a gutter, ragged right edges, last row of each
  paragraph shorter. Row widths are measured with the well's half-width
  function at the row edge farthest from the centre, so block corners never
  touch the well boundary on curved shapes; blocks are also clipped to the
  well path at 0.97 scale as a safety. The headline block spans the inner
  width at 68 to 82 percent, drawn red and taller than a text line.
- Starburst: 13 to 15 spikes, inner radius 205, outer radius 338, centred on
  the head centre and drawn before the bear, so the spikes peek out around
  the head. Pulse is a plus/minus 3 percent scale on a 5 second period.
- Paw: palm ellipse plus four elongated toe ellipses placed on the palm's
  top arc and a rotated thumb ellipse, all relative to a wrist pivot at the
  top-right. Wave rotation is plus/minus 0.14 rad on a 3.4 second period.
- Strands: seeded wavy vertical polylines (sine wobble along their length),
  stroked red at 9px in stage units, round caps.
- Corner blobs: seeded clusters of 3 to 4 overlapping circles per corner.
- Seeded RNG: mulberry32. The initial seed is fixed (509061), so every
  viewer gets the same first layout (oval well, headline in the first
  paragraph, 4 strands). Double-tap advances the seed with an LCG step and
  rebuilds the layout.
- Determinism: the first frame is drawn synchronously at the constant phase
  PHASE0 = 2.35 (breath scale about 1.015, paw at about -7.5 degrees). The
  rAF loop, typeof-guarded, is anchored as PHASE0 plus elapsed time from the
  first rAF timestamp. Frame one never derives from Date.now().

## Deviations

- The white paw is given a bear-blue outline. A pure white paw on the white
  ground would be invisible, so the paw is drawn as a fake union: a fat
  blue pass merges palm, toes and thumb into one silhouette, then a white
  pass shrinks it back, leaving a clean blue outline of even weight. The paw
  itself stays white and flat, per the prompt.
- The starburst's inner radius (205) is smaller than the head radius (248),
  so the burst reads as spikes radiating from behind the head rather than a
  full sun disc beside it. This matches "starburst behind the head".
- Corner blobs may bleed a few pixels off the stage corners on narrow
  screens; they are corner accents and the crop reads as intentional.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. The duplicate render was deleted.
- Pass 1 fixes: the paw first rendered as separate stroked circles and read
  as a balloon cluster; rebuilt as the fake-union outline. The starburst
  outer radius was raised from 292 to 338 so the spikes read clearly around
  the head. Top and bottom well rows were being sliced by the oval clip;
  row widths now use the farthest-edge half-width and the clip sits at 0.97
  scale. Corner blobs were enlarged (radius 24 to 51) so they read as blobs
  rather than dots.
- Pass 2 fix: paw toes were round circles overlapping into a cloud; they
  are now elongated ellipses seated on the palm's top arc with a rotated
  thumb, and the shape reads instantly as a waving paw.
- Final read-back: desktop and thumb show the giant blue bear with the oval
  text well, red headline, starburst spikes behind the head, waving paw
  top-right, red strands at the right edge and yellow blobs at both bottom
  corners. Mobile keeps the whole 3:4 composition in frame, nothing clipped
  except the intended edge bleeds (bear mass, corner blobs).
