# №1264 "Second Skin Suitcase" (sdk-forsale SF1, PP423)

## Prompt
Sammy Seung-min Lee's Joomchi paper-skin casting applied to a battered suitcase
at 3/4 view on a dark ground: the skin wraps in real time through soak, beat,
crumple, wring, felt. Latches and seams press through like a frottage. Looping,
slow, meditative. Drag a corner handle to pull the skin tighter (it resists,
then yields); tap-and-hold "mists" the paper, restarting a phase. Never
click-to-reload. Palette: leather #2E2620, hanji cream #E8DFC8, varnish amber
#B07A2E, stitch red #A03A2E, ground #171412. Square, suitcase centered
slightly below middle. Flat procedural-craft look, no photorealism; the beating
phase reads as craft, not damage.

## Build
- Self-contained single index.html, silent, no external assets.
- Suitcase: front face + darker right side face for the 3/4 read, top handle,
  amber latches, red dashed stitch seams, amber corner protectors, flat-alpha
  scuff marks.
- Skin: one clipped region over the suitcase, drawn per phase with flat alpha
  shapes only (no gradients, filters, shadowBlur, offscreen canvas):
  - felt: tight skin, 240 seeded stipple dots, frottage latches/seams over it.
  - soak: translucent sheet (0.42), wavy slack bottom edge, soft wrinkle lines.
  - beat: translucent sheet with expanding ripple arcs from three seeded points
    plus a jagged top edge.
  - crumple: 22 alternating-alpha fold facets + 16 hard fold lines.
  - wring: diagonal twist bands whose offset grows with phase progress, plus a
    pulled corner triangle.
- All randomness is a seeded integer hash; nothing uses Math.random.

## Mechanics (all closed-form over recorded events and piece time)
- Phase cycle: 60 s loop, 12 s per phase, order felt / soak / beat / crumple /
  wring. Frame one is exactly t = 0, which lands in felt: tight stippled skin,
  frottage showing. The rAF loop is anchored as offset + elapsed-since-load.
- Drag: pointerdown within 12% of the small-size dimension of the bottom-right
  skin corner starts a pull. Tightness follows a resist-then-yield curve of pull
  distance (shallow below 0.4 of max pull, steep after, capped at 1); after
  release it decays as exp(-dt/1.2). Tightness shrinks the skin pad and moves
  the amber corner handle.
- Mist: a 500 ms hold with no drag records a mist event. The phase clock
  restarts at the start of the phase active at the mist moment (shift computed
  from the mist list in order), and spray dots fade over 2 s at the mist point.
- No visible text except <title>. No audio, no microphone, no volume control.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px) with
  aspect h > w*1.15 fallback; centered geometric piece keeps its shape, page
  ground is the piece's own #171412.
- Dots drawn as paired arcs with moveTo before every batched arc (node-canvas
  ellipse/arc quirk).

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Frame one (felt): tight stippled skin, dark frottage latches, red stitch
  seams, pale corner protectors showing through, side face peeking at right,
  amber corner handle bottom-right. Mobile holds the same read.
- Phase probes (temp copies with reordered phase lists, discarded): beat shows
  three ripple centers over the translucent skin; crumple shows sharp facets
  and hard fold lines; wring shows diagonal twist bands; soak shows the slack
  wavy sheet with wrinkle lines.
- Mechanics harness (temp copy exposing draw/tightness/phase, discarded):
  frame-one phase felt; 162 px pull yields tightness 0.61, 200 px pull 0.87;
  decay after release confirmed (0.57 at +0.5 s, 0.11 at +2.5 s); mist at fake
  t = 20 s (soak) restarts the phase exactly (effective time at t = 30 is 22);
  pulled-handle pixel confirmed amber; mist spray draws without throwing.
- Token scan: no Math.random (one comment mention only), no createElement,
  no getUserMedia, no AudioContext, no gradients, no shadowBlur, no
  OffscreenCanvas, no getImageData; requestAnimationFrame appears only in the
  typeof guard and the loop call.
- Thumb rendered twice at 720x720, cmp byte-identical.
- index.html md5: 8967e908d58f4ce0cc7254f30318b684
