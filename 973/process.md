# No.973 — The Screens Are Watching

Study #119 kyle-mcdonald, PP134 "People Staring at Computers".

## Concept

The reversal: a dark gallery wall of twelve laptop screens, and the screens
show no content at all — each shows only a face, drawn dark in the cold glow
of its own screen-light, staring out. Two eye-dots, a nose tick, a mouth
arc; inside each dark eye a tiny red ember pupil. All twelve pairs of
pupils track the same unseen point as it wanders the room, in slow
saccades. Blinks ripple through the wall but never land together. One
screen at a time carries a pulsing red recording dot and a hairline red
bezel; the dot migrates, because someone is always being recorded. The
piece stays calm on purpose — no glitch, no scare — the staring does the
work. Nothing is sensed: no camera, no microphone; the faces are drawn.

## Construction

- Sim: fixed-timestep 120 Hz, mulberry32-seeded. Frame one is the
  synchronous draw after exactly 2400 pre-roll steps (20 s of shift), so
  the pupils have already converged on the unseen point, which sits
  off to one side in frame one — the whole wall looking the same way is
  the read.
- The unseen point is closed-form: a slow two-frequency Lissajous around
  the room's centre. Each screen keeps an eased pupil anchor (exponential
  approach, ~3.2/s) toward the current target; the drawn red ember is the
  anchor's direction from that face, clamped inside the eye dot.
- Faces are per-screen seeded data: centre jitter, eye spacing and
  radius, nose length, mouth width and curvature (smiles, flats, one
  frown), plus a glow phase and breathing rate. The glow panel is three
  layered flat-alpha rounded rects of #B8C4D4 (no gradients), alpha
  breathing between roughly 0.46 and 0.90 across the layers.
- Blinks: each screen schedules its own next blink from the sim's seeded
  stream (2.3–7 s apart); a blink collapses the eyes to thin lines for
  0.15 s. Staggered streams mean the wall never blinks at once.
- Recording dot: a single active index; every 7–14 s (seeded) it moves
  to a different screen, which also gains the red hairline bezel.
- Interaction: tap a screen and all twelve faces snap their pupil
  anchors to the tap point for 3 s (plus twelve tiny clicks if sound is
  on), then return to the wander. Dragging makes the visitor the unseen
  point — every pupil tracks the pointer while it is down. Double-tap
  reseeds the whole wall (a new shift).
- Sound: lazy, typeof-guarded WebAudio created on first gesture only —
  a faint filtered fan-hum bed, near-unison clicks on a gaze snap, a
  sparse soft tick on blinks (throttled), a very quiet tally beep when
  the recording dot moves. Silent in QA renders.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px in
  draw(); phone detection via window.screen min dimension < 700 with an
  aspect fallback; strict five-tone palette (#08090C, #1C1F28, #B8C4D4,
  #0E1013, #FF3B3B); no gradients, shadowBlur, ctx.filter, or offscreen
  canvas; no text except the title.

## QA log

- Rendered with render-piece.js at 1280x900, 390x844, 720x720, all
  clean and silent.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical; the duplicate was deleted and re-verified after the fix
  round below.
- Desktop and thumb: 4x3 wall of pale glowing rounded screens on
  near-black; each face reads (eyes, nose tick, mouth arc), red embers
  offset the same way across the wall (up-left in frame one), the
  bottom-row second screen carries the red bezel and recording dot.
- Fix round: the first mobile render stretched the grid over the full
  portrait height, turning the screens into tall slivers. Layout now
  keeps the wall as a square block centred vertically on portrait
  frames (H > W x 1.05); all sizes re-rendered and determinism
  re-verified. Mobile now shows the intact 4x3 wall, nothing clipped.

## Deviations

- The eye is drawn as a dark dot with the red ember inside it, rather
  than adding a separate lighter eye-white ellipse: the brief's own
  simpler reading, and the ember stays legible at phone scale.
- Pupil offset magnitude scales gently with the face's distance to the
  target (clamped at 0.52 of the eye radius), so near faces glance and
  far faces turn — a parallax the flat glyph style otherwise lacks.
- On portrait phones the wall is a centred square block instead of a
  full-bleed stretch (see QA log); the 4x3 grid and screen count are
  unchanged.
