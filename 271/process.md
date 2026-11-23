# No.576 "El Río" — EXPANSION #69 power-paola, prompt PP8 "Visión"

## Concept

Power Paola's 2026 oil-painting register as a watch-only river panorama. A wide
night river at one eternal blue hour: a crying crescent moon upper-left, a woman
with short white hair and hoop earrings submerged to the shoulders and crying,
a weeping crocodile and a snake beside her, a bat hanging upside down holding a
pink heart and crying, and a red fox wading at the far right with flames burning
politely behind it in the distance. Everything weeps; nothing is explained.
No narrative, no moral, no day-night cycle, no tap action. The only interaction
is a horizontal drag that pans slowly across the panorama.

Palette (strict, from the prompt): river blue #3A6A9A, night indigo #232A4A,
fox red #C25A3A, flame orange #E88B2E, crocodile green #4A7A52, heart pink
#E86A9A, moon cream #F0E6C8, tear blue-white #BFD8E8, skin warm #E8B88A.
Flat painterly fills only, no gradients.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Stage is 1000 units tall; the panorama is 1430 units wide. Scale fits the
  stage height to the smaller viewport dimension (same fit as the other
  painterly pieces in this run); the page ground is the night indigo.
- Canvas size comes from the Visual Viewport API, with resize listeners on
  visualViewport and window; draw() pins canvas.style.width/height in px every
  frame. Phone detection via window.screen (min dimension under 700px) with
  the aspect fallback (h > w*1.15).
- One seamless 12-second loop. Every emitter period divides the loop
  (tears 2s/3s/4s/6s, bat sway 6s, flame flicker 1.5s, ripples 6s/12s), so all
  motion is phase-aligned and the loop closes exactly.
- Tears: each weeper (moon, woman, crocodile, snake, bat, fox) sheds drops on
  fixed vertical paths with an accelerating fall and a splash ring where the
  drop lands; cheek streaks on the woman and the fox. The moon also grows a
  single red droplet at its lower tip that falls to the far shore and reforms.
- River: layered sine-displaced ripple bands (precomputed from mulberry32
  seeds 576001-576004, along with the star field, moonlight shimmer strokes,
  and far-shore bumps), so texture is data, never filters or offscreen canvas.
- The bat is a pendulum group rotated about its grip point; its tears fall in
  sway space. The snake's forked tongue flicks on a 2-second cycle.
- Drag pan: pointer events, target pan clamped to the panorama, eased toward
  the target in draw(). On screens wider than the panorama the pan rests
  centered. No tap handler exists.
- Determinism: frame one is drawn synchronously at load at constant
  PHASE0 = 4.2 (tears mid-fall, the moon's droplet falling, pan at 0).
  requestAnimationFrame is typeof-guarded and anchored as
  PHASE0 + elapsed-since-load; animation time comes from performance.now
  deltas, never from a wall clock read for frame one. No Date.now anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical (checked again after the fix pass below).
- First pass fixes: (1) the bat and its branch were indigo on the indigo sky
  and effectively invisible, only the heart and wing-fold lines showed; bat,
  branch, and feet recoloured to river blue with indigo fold lines. (2) The
  fox's tail and the flames were clipped at the right edge of the desktop
  frame; panorama narrowed from 1520 to 1430 units and the fox and flame
  groups shifted left, so the desktop first frame holds the whole cast.
  (3) The far-shore bumps read as a scalloped awning; a continuous indigo
  treeline silhouette now runs behind them. (4) The woman's hoop earrings
  floated clear of her hair; moved inward to sit on the hair's edge.
- Final read-back: desktop shows the full panorama (moon, woman, crocodile,
  snake, bat with heart, fox, flames at the right); mobile and thumb show
  moon, woman, crocodile, and the snake entering at the right edge, nothing
  clipped mid-figure; the rest of the river is one drag away.
- Grep checks: no Date.now, no http references, no document.createElement,
  no AudioContext, no microphone or audio code.

## Deviations

- The prompt calls for a black bat. The strict palette contains no black, and
  the darkest tone (night indigo) is the sky itself; an indigo bat vanished
  in QA. The bat, branch, and feet are therefore river blue #3A6A9A, the
  palette's remaining dark tone, reading as a blue night silhouette. Recorded
  here rather than adding an off-palette black.
- The moon's red droplet uses fox red #C25A3A, the palette's only red.
- The woman's white hair uses moon cream #F0E6C8, the palette's only light
  neutral (no white is specced).
- The snake shares crocodile green #4A7A52, the palette's only green.
- On square and phone-sized first frames, the fox and flames sit just past
  the right edge of the 1000-unit view of the 1430-unit panorama; they are
  part of the composed scene and reached by the drag, as the prompt's
  panoramic composition intends.
- The only in-piece text is a tiny lowercase "drag" hint, the maximum the
  brief allows; the piece has no tap action at all.
