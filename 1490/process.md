# №1490 "Maso or Miso" (nadja-ringart NR3, PP737)

## Prompt

A single abstract figure stands center frame against a flat field. At one
end of a horizontal slider beneath it, the figure is soft: rounded
shoulders, head bowed, muted blue clothes, nodding. At the other end, the
figure is sharp: chin up, arms mimicking the gestures of the suited
figures behind it, scarlet clothes, laughing mouth-line. Between the ends,
the figure is a blend of the two. Palette: field cream #e8e0d0; soft pole
blue #4a5a7a; sharp pole scarlet #c1272d; slider track charcoal #2a2a30;
slider thumb gold #d9a441; skin #f2ead8. No other color. Composition:
figure centered, large; slider strip across the lower fifth; suited
figures as a faint backdrop row, still and small. Motion: watch-first
with drag-to-slide. Left alone, the figure drifts slowly between the
poles on its own, never settling. Dragging the thumb moves the figure to
that exact blend and holds it there while held; releasing resumes the
drift. There is no third state, no safe middle marked, no resting pose
that is neither pole. Drag never splits the figure into two figures and
never removes the backdrop.

Study-wide rules: THE SOCIOLOGIST'S CUT — the broadcast is data, not an
enemy; keep every word, change only the order, the repetition, and the
frame, and the data indicts itself without one invented word. Never
click-to-restart, never click-to-reload, never photorealism, never
decorative gradients, never text unless a prompt says otherwise. No
visible text except `<title>`. Silent. Sensitivity guard: about editing,
archives, and broadcast systems, not about any real person's trauma;
abstracted figures only, no likenesses, no real names on screen, no
readable text anywhere, no nudity, no violence shown.

## Build

- Single parametric figure: one 0-to-1 parameter interpolates clothes
  color (blue #4a5a7a to scarlet #c1272d), shoulder roundness (0.85u to
  0.04u corner radius), head tilt (-0.30 bowed to +0.24 chin-up), arm
  angle (0.26 rad hanging at sides to 2.45 rad raised, mimicking the
  suited gestures), mouth (thin line to open laughing arc), and nod
  amplitude (scales with 1-p, 6 s sine on loop-local time).
- Backdrop row: five small still suited figures in charcoal at fixed
  0.35 alpha, sized from their row spacing so neighbours never merge.
- Slider strip across the lower fifth: charcoal track, gold thumb at
  x = lerp(trackL, trackR, p). No labels, no ticks, no middle mark.
- Drift: p = 0.5 + 0.5*sin(2π*lt/48), lt = t % 48, so the figure drifts
  slowly between the poles and never settles. Frame one is the mid-blend
  (p = 0.5).
- Drag: pointerdown on/near the thumb or track starts a drag; pointer x
  maps directly to p and holds it while held. On release, the drift
  resumes from the held value with matching direction (phase computed
  via a direction-aware arcsine), so there is no jump and no restart.
  Drags starting off the slider are ignored. Never click-to-reload.
- Determinism: synchronous fixed-phase first frame via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, plain
  function declaration behind a typeof guard). Every animation sine
  runs on loop-local time, so the loop closes exactly — the №1482
  lesson applied from the start. No Math.random anywhere; no randomness
  is needed (no seeded decoration).
- Canvas from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style
  width/height in px. Phone detection via window.screen physical size
  (min dimension < 700px) with aspect h > w*1.15 as fallback; centered
  composition keeps its shape, page ground takes the field cream.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
  Dots as own-beginPath arcs with moveTo first; all fills opaque except
  the backdrop row's fixed 0.35 alpha (node-canvas quirks).

## Frame one

Cream field; single abstract figure centered large, mid-blend clothes
(muted plum between blue and scarlet), arms outstretched at the blend
angle, half-open mouth; faint row of five small still suited figures
behind it; charcoal slider track across the lower fifth with the gold
thumb at center. No visible text. Mobile (390x844) keeps the same
centered composition with no clipping.

## Verification

Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
390x844, 720x720; all three inspected personally; thumb byte-identical
across repeated renders including a final re-verify.

Forced-time probe harness (tmp/probe1490.js, vm-isolated instance, real
node-canvas, piece driven via window.__piece):

- t = 0 redraw 0 px; fresh instance t = 0 identical.
- t = 48 vs t = 0 = 0 px; t = 96 vs t = 0 = 0 px (loop closes exactly).
- Drift reaches both poles: pAt(12) = 1.000 with torso pixel exactly
  scarlet (193,39,45); pAt(36) = 0.000 with torso pixel exactly blue
  (74,90,122); mid-blend torso at t = 0 is (134,65,84).
- Drag: thumb dragged to p = 0.9 holds at 0.900; just after release
  pAt = 0.900 (no jump); drift resumes decreasing (0.571 at t = 30);
  dragged frame differs from the no-drag frame by 89,603 px.
- Off-thumb drag leaves pAt on the base drift curve (0.996 at t = 11).
- Token scan clean: no fillText, no Math.random, no AudioContext, no
  getUserMedia.

## Fix rounds (1)

First desktop render clipped the figure's head off the top edge, and the
backdrop row rendered as merged vertical bands (figure width was scaled
from min(W,H) while row spacing scaled from W). Fixed: figure unit
capped so the head stays below 0.05H (u = min(0.10*min(W,H),
(groundY - 0.05H)/7.9)), and backdrop figures sized from row spacing
(width 0.50 x spacing, height 2.3 x width). All renders re-done after
the fix; no clipping at either size.

## Files

- index.html (md5 065c62fdc51ce61bf84562b6cbbb9f0b)
- process.md (this file)
- thumb.png (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844)
- tmp/probe1490.js (forced-time probe harness)
