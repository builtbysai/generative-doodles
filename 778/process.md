# No.778 Anechoic Field

EXPANSION #95 doug-wheeler, prompt block PP3 "Anechoic Field". The pyramid
floor of PSAD Synthetic Desert III (Guggenheim, 2017): a field of white
acoustic pyramids receding to a featureless void, light glowing in the
valleys, one dark platform floating on the field with a single dwarfed
figure. The only hard geometry in Wheeler's vocabulary, and it exists to
kill sound.

## Concept

Wheeler's semi-anechoic chamber is a room whose floor is a regular field of
foam pyramids under a sourceless gradient void. Nothing in it moves except
the light: the valley glow breathes in slow traveling waves, the "molecular
mist in constant flux" that Wheeler called the most important thing he
does. The piece is watch-only, a seamless 48 s loop, no interaction, no
camera movement. A small dark platform sits on the field at the right
third, and on it one tiny figure stands, dwarfed, as in the installation
photographs.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets,
  no text except the `<title>`. Strict palette: lit faces `#FFFFFF`,
  shadow faces `#C7CDD6`, valley glow `#EAF2FF`, platform `#23262B`, void
  stepped between `#EFEBE3` and `#F7F4ED`; page ground is the lighter void
  tone.
- Pyramid grid: 11 rows from the horizon (mid-frame) to the bottom edge.
  Row base lines follow a perspective power curve (`pow(k/ROWS, 1.62)`) so
  rows compress toward the horizon; cell width is proportional to row
  spacing (`spacing * 3.1`), alternate rows are offset half a cell, and all
  geometry is precomputed once per layout. Each pyramid is a frontal
  triangle split into exactly two facets, as specced: left facet lit white
  (apex, base-left, base-center), right facet shadow blue-gray (apex,
  base-center, base-right). Triangle height is 1.12 times the row spacing,
  so tips just cross into the row behind and the rows interlock without
  chaining. Rows are painted far to near.
- Valley ground: the field floor is a 45 percent mix of the shadow tone
  and the glow tone (both strict-palette colors, mixed the way the void
  bands are stepped). This is a construction necessity: on a flat
  `#C7CDD6` ground the shadow facets vanish entirely and the pyramids read
  as disconnected white sails (see QA log). On the mid mix, lit facets sit
  above the ground tone and shadow facets below it, and both read.
- Valley glow: glow points sit between neighbouring tips on each row,
  dropped below the apex line, each with a fixed wave phase
  (`col * 0.55 + row * 0.95`). Brightness is closed form in position and
  time, `0.5 + 0.5 * sin(2 * PI * t / 48 - phase)`, drawn as three layered
  alpha discs of `#EAF2FF` scaled by that brightness, so the swell travels
  across the field and the loop closes exactly at 48 s. Frame one (t = 0)
  catches the wave mid-swell, its phase gradient visible across the field.
  The glow is white daylight only; no colored light anywhere.
- Void: 18 stepped horizontal bands interpolated from `#F7F4ED` at the top
  to `#EFEBE3` at the horizon, plus about 2,200 ultra-fine seeded grain
  specks (mulberry32, normalized positions rebuilt identically per layout)
  so the void feels like lit air rather than a flat fill. No corners, no
  horizon line is drawn.
- Platform and figure: the platform is a flat dark slab, top face a skewed
  parallelogram in perspective with a thin front edge, placed at mid-depth
  (row 5) at the right third, drawn after the pyramids and the glow. Its
  width is clamped to the frame (`min(cellW * 2.7, W * 0.54)`) and its
  center clamped so it never leaves the frame on narrow screens. FIGURE
  DECISION: kept. The tiny standing silhouette (head disc plus a single
  shoulder-torso-leg path, in the platform tone `#23262B`, height about
  one pyramid at that depth, suppressed below 9 px) reads clearly at all
  three QA sizes as a lone person dwarfed by the field, matching the
  installation photographs, so it stays.
- Sizing: canvas measured from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`; canvas CSS size pinned
  in px inside `draw()`. Phone detection via `window.screen` (min
  dimension under 700 px) with the aspect fallback; the horizon stays at
  mid-frame and the field stays in the lower half at any aspect.
- Determinism: frame one is the synchronous `draw(0)` at boot. No
  `Date.now()`, no wall clock anywhere; animation time is elapsed time
  since the first rAF timestamp. The rAF loop is `typeof`-guarded, so the
  QA renderer (no rAF, no AudioContext, no `document.createElement`, no
  offscreen canvas, no `ctx.filter`) draws exactly frame one.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and
  byte-compared with `cmp`: identical.
- First read-back failed on two counts. (1) With the original tip height
  (1.55 times row spacing) and a flat `#C7CDD6` valley ground, the shadow
  facets were invisible against the ground and the deep row overlap
  chained the lit facets into jagged lightning-like zigzags; the field
  did not read as pyramids. Fixed by reducing the tip height to 1.12
  times spacing and mixing the valley ground 45 percent toward the glow
  tone so both facets read. (2) On the 390 px mobile render the platform
  extended past the right edge and was clipped. Fixed by clamping the
  platform width and center to the frame. All renders redone and the
  byte-compare re-run green after the fixes.
- Final read-back: desktop shows a regular white pyramid field receding
  to a clean pale void, soft glow pooled in the valleys, the dark platform
  at right with the tiny figure standing on it. Mobile keeps the full
  composition in the tall frame, platform in frame, nothing clipped.
  Thumb matches the desktop read at square size.
- Deviations from the prompt: none in substance. The valley ground is a
  mix of two specced palette tones rather than one flat palette color
  (recorded above, forced by the two-facet read). The optional figure was
  kept, per the decision recorded above.
