# No.476 Moving Toward

EXPANSION #57 julandthefox (Giulia Neri), prompt GN4.

## Concept

Her most minimal piece, no people at all. Two golden grass blades rise
from the bottom edge of a huge sage field and bend toward each other,
tips nearly touching, so the empty space between them implies a heart
that is never drawn. Two red ladybugs climb the blades, meet once at the
tips for a single held breath, and the loop begins again. The scarcity
of the meeting is the emotion: one per 30 seconds, protected.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette: ground sage #C9D6CB, blades golden #D9A03F darkening to
  #B07E2E at the base, ladybugs #D61F26 with a black #1A1A1A centre
  line. Nothing else is drawn: no heart outline, no text, no hint.
- Composition: blades enter at 35% and 65% of the width and rise to
  about 60% of the frame height; the implied heart sits centre-frame
  and the top half of the field stays empty. Full-bleed sage on phones,
  page ground the same sage.
- Each blade is a quadratic bezier drawn as 30 tapered segments, the
  stroke narrowing from base to tip and its colour lerping from the
  dark base gold to the bright tip gold. The control point bows
  outward, away from centre, so the blades belly out and the negative
  space between them rounds into the heart; the control point also
  carries the sway.
- Motion is a seamless 30s watch-only loop. A climb parameter eases up
  over 22s, holds for 2s, then settles back over 6s, so both ends of
  the loop match exactly. The same parameter converges the blade tips
  from their resting span to nearly touching at centre and carries the
  two ladybugs up the beziers (position and centre-line angle solved
  from the curve and its tangent). During the 2s hold a single faint
  pulse ring in the blade gold expands around the meeting point and
  fades. The blades also sway on an 8s breathing bend, phase-offset
  between the two, gentle enough never to break the mood.
- Soft grain: 1,200 dots precomputed once from the seeded RNG (fixed
  positions, radii and alphas, near-invisible black and white) and
  redrawn identically every frame over the field.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in
  draw() every frame. Phone detection via window.screen (min
  dimension under 700px) with the h > w*1.15 aspect fallback; on
  phones the ladybugs get a small legibility bump and the composition
  keeps its shape.
- Determinism: the first frame is drawn synchronously at a constant
  loop phase (t = 12s pre-roll baked in: blades bent toward each
  other, ladybugs a little over halfway up). The animation loop, when
  running, is anchored as that fixed offset plus elapsed time since
  load, and requestAnimationFrame is typeof-guarded so the node QA
  renderer draws the same frame. All load-time layout uses a seeded
  mulberry32 RNG; no Math.random anywhere, and no frame is ever
  derived from Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-run after the final fix. Second render deleted after
  the check.
- Desktop and thumb: two golden blades belly outward and converge at
  the tips, the rounded empty space between them reads as the implied
  heart; both red ladybugs sit on the blades with their black centre
  lines visible; the top half is empty sage with only the faint grain.
- Mobile: composition keeps its shape in portrait, blades narrower
  together but unbroken, ladybugs legible, nothing clipped.
- Fix during QA: the first pass drew the blades as a plain pointed
  arch, more wishbone than heart, and they read thin and pale. The
  control points were bowed outward so the enclosed space rounds,
  the resting tip span was widened, and the base stroke was
  thickened. All renders were regenerated and the determinism gate
  re-passed after the fix.
- Deviations from the prompt letter: none. One interpretation note:
  the prompt's faint pulse at the meeting is drawn as a single
  expanding ring in the blade gold at low alpha, staying inside the
  palette rather than adding a new tone.
