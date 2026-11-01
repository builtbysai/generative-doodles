# №1389 "Trickster Cursor" (adam-khalil AK6, PP612)

A cold archive hallway of specimen cabinets, receding to a vanishing point
at frame center, with a squeaky clown nose for a cursor. Severe and silly
at the same time: the hallway drifts forward endlessly and cabinets slide
past, while the red nose floats over the scene wherever the viewer points
and honks little puffs of smoke behind it.

## What is on screen

- Hallway: near-black ground, hallway-gray side walls, dark ceiling band,
  dark floor with faint perspective seams converging on the back wall, and
  a dark doorway panel at the vanishing point.
- Cabinets: nine seeded cabinet variants per wall, drawn far to near as
  steel rects with darker inset panels, abstract specimen dots, and handle
  bars. No labels, no text anywhere except `<title>`.
- Cursor: a clown-red circle with a darker rim and a white specular dot.
  At rest (no pointer yet) it sits at frame center. A fading trail of
  small red dots follows recent cursor movement.
- Smoke: each puff is an expanding flat-alpha white disc that fades over
  1.6 s. Puffs spawn at the cursor's previous position, so the smoke is
  left behind the nose rather than hidden under it.

## Motion and interaction

- Hallway drift is a closed-form function of piece time: each cabinet's
  depth is `fract(k/9 + t*0.055)`, so cabinets slide past forever and the
  loop never visibly wraps.
- Pointermove moves the nose. Moving more than 24 px from the last puff
  position plants a new puff at the previous cursor position.
- Squeaks: a tiny sine blip (880 → 1560 Hz over 0.07 s, 0.12 s envelope)
  per puff, ONLY via lazily created, typeof-guarded WebAudio created
  inside the first pointerdown, and only while the pointer is active.
  Nothing audio-related runs before a pointer gesture, and the piece is
  fully visual without sound.
- No buttons, no click-to-reload, no form, no horror imagery.

## Adaptations from the prompt

- Pseudo-3D hallway via scaled cabinet rows as a closed-form function of
  piece time (no mesh, no frame-integrated camera).
- Smoke as stored-history fading segments, never canvas-fade; the nose
  trail likewise.
- Puff spawn point moved from the cursor position to the previous cursor
  position after the first probe showed the nose (radius ~25 px) fully
  covering a fresh puff (radius 19 px at 0.5 s). Puffs now read clearly
  beside the nose.
- The prompt's "mutable" squeak is read as gesture-gated: squeaks exist
  only after a pointerdown creates the audio context.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 fallback; field-like composition goes full-bleed
  on phones; checked at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot
  flag (frame one = draw(0), clock starts only with the rAF loop); all
  randomness from seeded mulberry32 (seed 1389000 + index*7919), never
  Math.random. rAF loop is a plain function declaration behind a typeof
  guard.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  localStorage, getUserMedia, fillText, or strokeText. Dots are drawn with
  paired arcs preceded by moveTo (node-canvas batched-arc quirk).

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): frame one shows the nose at rest
  (1,787 red px at center, 0 puff px); t=0 vs t=5 differ in 222,910 px
  (hallway drifts); a pointer move relocates the nose exactly (1,787 red
  px at the new position); a puff left behind reads 1,636 smoke-ish px
  0.5 s later and 0 px after its 1.6 s life (fully dissipated).
- Token scan clean except one comment stating Math.random is never used
  and the typeof-guarded AudioContext lines inside the gesture path.
