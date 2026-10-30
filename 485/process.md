# No.485 "Novilunio" — process

EXPANSION #58 giuliadallara (Giulia Dall'Ara), prompt GD5.

## Concept

A new-moon night in Dall'Ara's painterly, flat register. Three languid
reclining nude figures in coral-red with lavender shadows lie still along a
descending diagonal on a dark teal night ground. Giant palm fronds in purple
and pale yellow fan in from the corners behind them. A lavender-pale crescent
moon sits top-right, breathing a faint glow. Three small framed mini-scenes
float in the top third: a coral fish on pale yellow, an open book on cream,
a cream teapot on deep lavender. A scallop band in lavender, pale yellow,
coral and cream runs along the bottom edge. Stillness is the point: the
piece is watch-only, with no interaction and no hint text.

Palette, exactly as briefed: dark teal #0E3B34, coral #E4573D, lavender
#B388C9, pale yellow #E8D98A, cream skin #F0D5B8, plus shaded variants of the
same hues (deep lavender and dark lavender for fronds and frame interiors, a
darker coral for the far limbs, a darker teal for the scallop band base).

## Construction

Single self-contained `index.html`, 2D canvas only, no external assets, no
audio, no microphone.

- Layout: the scene is drawn in a fixed 1000x750 design space, fitted with
  a uniform scale and centred in the viewport, so the composition keeps its
  shape on phones; the page ground outside the design frame is the same
  dark teal. Canvas size comes from the Visual Viewport API, with resize
  listeners on both `visualViewport` and `window`; `draw()` pins
  `canvas.style.width/height` in px every frame. Phone detection uses
  `window.screen` (min dimension < 700px), with the aspect fallback
  `h > w*1.15` only when screen data is absent.
- Seeded RNG: mulberry32 throughout. Two seeded structures are precomputed
  once and drawn identically every frame: the frond fans (seed 485777) and
  the dry-brush texture (seed 485013: 1050 short strokes and dots in cream,
  lavender, pale yellow, deep teal and paper tones at alpha 0.03–0.09,
  laid over the whole scene at the end of each frame).
- Fronds: five seeded fans with bases at the two bottom corners, the
  top-left corner, the right edge and the bottom centre. Each blade is a
  tapered filled shape (two quadratic curves meeting at the tip) with a
  darker centre rib, coloured deep lavender, purple or pale yellow.
- Figures: each figure is built in local units and placed by translate,
  rotate (about −0.26 to −0.30 rad) and scale. The torso is one flat bezier
  mass; a copy of the same path offset downward in lavender is drawn first
  so a lavender shadow rim holds along the lower edge. Limbs are pairs of
  round-capped strokes at shrinking widths, which read as tapered shapes:
  a dark-coral far leg and far arm behind the torso, a coral near leg
  extended over the hip and a coral near arm draped along the front, with
  lavender shadow strokes offset under the near leg. The head is a cream
  circle with a blank face, a lavender hair cap behind it and a short cream
  neck; a soft dark ellipse grounds each body. The three figures sit at
  design positions (268,428), (512,498) and (742,556) with lengths 355,
  380 and 335 and slightly different knee bends, overlapping down the
  diagonal.
- Moon: a pale lavender disc at (852,96) with a dark teal circle offset to
  (872,84) cut over it, making the crescent; a pale yellow halo circle
  behind it carries the glow.
- Mini-frames: lavender-bordered rectangles with a soft offset shadow and
  flat interiors, each with its own small glyph scene drawn from ellipses,
  triangles and strokes: fish (coral body, tail, fin, teal eye), open book
  (coral cover, two paper pages, spine and text lines), teapot (cream body,
  spout, lid, handle arc, coral base line).
- Scallop band: a dark teal strip at the bottom of the design frame with a
  row of 20 semicircles (radius 25, spaced 50) cycling lavender, pale
  yellow, coral and cream along its top edge.
- Motion: a 40s seamless loop. The only movement is the fronds swaying
  (sinusoidal angle offsets, 20s period) and the moon glow brightening and
  dimming (20s period); both periods divide the 40s loop. The figures never
  move. No interaction handlers are attached.
- Determinism: the first frame is drawn synchronously at the constant loop
  phase t = 13s (fronds mid-sway, moon glow mid-cycle), never from
  `Date.now()`. Animation, when `requestAnimationFrame` exists (typeof
  guard), is anchored as fixed phase plus elapsed rAF time. The code uses
  no `AudioContext`, no `document.createElement` and no offscreen canvas.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js index.html` (node-canvas),
which evaluates the piece's own script with no rAF.

- qa-desktop.png (1280x900): three coral reclining figures read clearly
  along the diagonal, cream heads with lavender caps, lavender shadow rims
  and extended legs; purple and pale yellow fronds fan from all corners
  behind them; crescent moon with a soft halo top-right; fish, book and
  teapot frames float across the top third; scallop band runs the full
  bottom edge; dry-brush speckle visible over the flat teal.
- qa-mobile.png (390x844): the whole composition is preserved at reduced
  scale, centred on the teal page ground; nothing is clipped and every
  element (figures, frames, moon, scallops) remains legible.
- thumb.png (720x720): same composition, square-cropped by the letterbox
  fit; all elements present.
- Determinism: thumb.png rendered twice and compared with `cmp`; the two
  files are byte-identical. The second render was deleted.
- First build review: the first figure construction used filled polygon
  limbs whose end-cap arcs rendered as serrated spikes, and the torso was
  too domed, so the figures read as shells rather than bodies. Both were
  rebuilt before final QA: limbs became paired round-capped strokes and
  the torso path was flattened; frond blades were also widened. The final
  renders above are from the rebuilt code.
- Deviations: none from the brief. Watch-only, no hint, no interaction, as
  specified.
