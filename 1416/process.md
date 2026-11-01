# №1416 "Two Arms, One Rock" (thomas-mader TM1, PP639)

## Prompt
A bare room, seen from above, with a rough gray stone at its center and two
absurdly long red arms reaching in from opposite walls — the left arm waves
downward and taps the air, the right arm points a single finger at the stone
— and the stone slowly changes under their attention. Nothing else in the
room, so the wear on the stone is the only thing that accumulates.

## What was built
- Room white #ece8dc with a floor-line rect; rough gray stone dead center
  (seeded 14-vertex blob with seeded speckle), large enough to read as a
  character.
- Left arm: long red articulated curve from the left wall, waving and
  tapping in a steady 3.2 s rhythm with an inflate/deflate envelope; its
  rounded fingertip pad stays visible left of the stone, tapping the air.
- Right arm: long red curve from the right wall holding a single pointing
  finger at the stone, trembling slightly; the finger extends toward the
  stone and stops just short of its edge.
- Wear: with each waver cycle the stone's left flank deepens a dark notch
  (wedge, #4a463c); the right flank grows smoother and paler (pale overlay
  #c9c4b4) with pointer hold time. Wear never resets, only accumulates;
  oldest wear is overlaid, never wiped.
- Interaction: drag either arm to change its rhythm — a left-arm drag
  boosts the waver rate (notch deepens faster), a right-arm drag steadies
  the pointer (polish grows faster). Never click-to-reload.

## Adaptations
- Arms as articulated soft-body curves with inflate/deflate envelopes
  driven by slow closed-form oscillators (no physics sim).
- Stone as a textured shape with two wear parameters (notch depth, polish)
  updated per touch cycle; wear buffer persists across loops.
- Drag as recorded events: rate/steadiness boosts are closed-form
  functions of the recorded drag list and piece time (exponential decay),
  never frame-integrated state. Notch depth is a closed-form function of
  the boosted waver phase; polish is a closed-form function of boosted
  hold time.
- Fully silent (no AudioContext, no getUserMedia); no offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or fillText/strokeText,
  so no readable text can leak in (visible text: only `<title>`).
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying, dots as filled rects or isolated arcs with their own
  beginPath.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1416000), never Math.random.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size with aspect fallback;
  centered composition keeps its shape, page ground takes the room color.

## Verification
- Rendered at 1280×900, 390×844, 720×720; all three inspected. Thumb
  byte-identical across repeated renders (including after the tip fix).
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): two fresh instances byte-identical
  at t=0; left tip-zone red pixels 3229 (t=0) → 4829 (t=1.6) → 3229
  (t=3.2, seamless loop); notch-zone dark pixels 0 (t=0) → 5549 (t=30)
  → 10742 (t=60); polish-zone mean lightens 139 → 164 → 183 (t=0/120/250);
  left-arm drag raises notch-zone dark pixels at t=30 from 5549 to 6676;
  right-arm drag raises polish-zone mean at t=120 from 164 to 165.
- One fix round during the build: both arm tips first hid behind the
  stone, so the working ends were invisible — the waver tip now stops
  short of the stone (tapping the air) and the pointer finger extends
  toward, not past, the stone; all renders re-done after the fix.
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used).
