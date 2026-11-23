# No.801 "Diamond Presentation"

EXPANSION #98 olivier-mosset, prompt block PP2 "Diamond Presentation".

## Concept

The same square ring canvas as the study's ring (PP1), hung on a bare wall.
Nothing about the painting changes; only its presentation does. The canvas
hangs as a diamond in frame one. Dragging sideways rotates the whole canvas
rigidly between square (0 deg) and diamond (+/-45 deg); the ring inside it
is drawn once, in the canvas's own coordinates, and never moves relative to
the canvas. On release the canvas settles to the nearest of square or
diamond. The variable under test is hanging, not painting.

## Construction

- Palette, strict: canvas ground #F4F2EC, ring #141414, wall shadow
  #D9D4C8. The wall is a whisper-different mix of the two light tones,
  85% canvas tone + 15% shadow tone = #F0EEE7, so the canvas is defined
  against the wall by a hairline edge (shadow tone at 0.55 alpha) and by
  its cast shadow. Page ground is the same wall tone.
- The ring: stroked circle, radius 31% of the canvas side, stroke width
  3.3% of the canvas side, matching the ring construction of the study.
  Drawn inside a translated/rotated context together with the canvas
  ground, so rotation moves the canvas and ring as one rigid body.
- Sizing: canvas side = 0.56 x min(frame width, frame height), derived
  from the diagonal, since a rotated square's bounding box never exceeds
  side x sqrt(2). The diamond's corners keep generous wall margin at
  every angle, on desktop and on the narrow phone frame alike.
- Shadow: no blur is available in this house, so the soft drop shadow is
  six layered flat copies of the rotated square in the shadow tone, each
  at alpha 0.085, offset along an offset vector that is a function of the
  canvas angle: ox = (-0.020 sin a + 0.006) x side,
  oy = (0.016 + 0.010 cos a) x side. The drop stays mostly downward and
  leans as the canvas tilts; each successive layer steps further along
  the vector and grows by 1.2%, which stacks into a soft edge.
- Rotation scheme: one continuous angle in [-45 deg, +45 deg]. Square is
  0 deg, diamonds are the two ends. While dragging, angle = angle at grab
  + (pointer x - grab x) x (90 deg / (0.55 x frame width)), clamped to
  the range, so a drag across 55% of the frame sweeps diamond to diamond.
- Settle: on release the target is the nearest anchor in {-45, 0, +45}.
  The settle is a critically damped closed form,
  angle(t) = target + (a0 - target) x (1 + u/tau) x exp(-u/tau),
  with tau = 0.55 s. It is monotone with no overshoot and no bounce: a
  heavy canvas easing onto its nail, not a spring. A new grab freezes
  whatever angle the settle had reached at that instant.
- Determinism: all interaction is a recorded event list (grab / move /
  release with times and x positions); the angle is a pure closed-form
  function of that list and t. Frame one is the synchronous draw at t = 0
  with an empty event list, i.e. the resting diamond at exactly 45 deg.
  Nothing reads Date.now() for the drawing; the rAF loop is anchored to
  load and typeof-guarded, and the first frame is drawn synchronously.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in
  px inside draw(); phone detection via window.screen (min dimension
  < 700 px) with the h > w x 1.15 aspect fallback. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no audio, no visible
  text except the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Read-back: desktop and thumb show the white diamond centered on the
  bare wall, the black ring outline centered inside it, a soft layered
  shadow along the lower edges of the diamond, generous margins on all
  sides. Mobile shows the same hang scaled down; all four diamond corners
  sit inside the 390-wide frame with margin to spare. No clipping at any
  size.
- Deviations: none from the prompt. Two construction choices recorded:
  the wall tone is an 85/15 mix of the specced canvas and shadow tones
  (the prompt allows a whisper-different wall from the canvas family),
  and the continuous rotation range is -45 to +45 deg through square,
  rather than 0 to 90, so both diamond directions are reachable and
  square sits mid-range.
