# №1357 "Dingo Chorus" — cannupa-hanska-luger CH6 (PP580)

## What it is
Seven vessel-skull forms stand in a row down a long dark corridor (White Bay
power station echo: riveted steel walls, high windows, hot light shafts).
The chorus walks the row on a fixed 30-second clock, one skull sounding at
a time, ping-ponging down the row and back. Dragging left-right scrubs which
skull is "listening": it leans toward the touch and answers with a lower
tone. Watch-first; the piece is always on. No start button, no volume
control. Mourning and listening, not horror: no jump scares, no loud
startles, no skull-as-death tropes.

## Composition
- One-point perspective corridor in canvas 2D: ceiling, left/right steel
  walls, floor, and a flat back wall converging on a vanishing point at
  (0.66W, 0.40H). Rivet dots seeded along the wall seams. Four high windows
  on the right wall, receding.
- Seven skulls on a floor line from foreground-left (0.13W, 0.90H) to
  background-right (0.60W, 0.54H), scale shrinking 1.0 → 0.30, so the row
  recedes left-to-right with depth by scale, not perspective tricks.
- Each skull is an irregular seeded stoneware blob (#6b5a4a) with char
  shading (#3e3630), speckle flecks, a tilted head bump suggesting a
  dingo/bird/animal head, and a small dark mouth aperture at the bump's
  tip. Three skulls carry a faint warm chamber glow (#e0782f flat-alpha).
- Each skull owns a diagonal light shaft (flat-alpha #e8b04b) falling from
  high above to its floor point, dim at idle (alpha 0.06).

## Mechanics (all closed-form over piece time and recorded events)
- 30 s clock, ping-pong order 0,1,2,3,4,5,6,5,4,3,2,1, repeat. At each
  tick the sounding skull's shaft flares (alpha +0.30 · sin(π·age/5) over
  5 s) and two ember rings expand from its mouth aperture. The visitor
  cannot change the clock, only join it.
- Drag: pointer down grabs the nearest skull by base x; horizontal drag
  moves the listening index, which leans toward the touch (clamped
  ±0.18 rad, proportional to pointer offset). On release the lean decays
  exponentially (τ 1.2 s). Lean, glow boost, and shaft flare are all pure
  functions of piece time and the recorded event list — never
  frame-integrated state, so frame one and every rest state are exactly
  reproducible (probe-verified: t=36 and t=70 post-release renders are
  pixel-identical to frame one).

## Adaptations (all mandated by the brief or the QA renderer)
- Corridor as canvas 2D pseudo-perspective (flat polygons to a vanishing
  point), never a shader; skulls as flat procedural forms with chamber
  mouths. No WebGL, no offscreen canvas, no gradients, no shadowBlur,
  no Path2D, no createElement.
- Audio: the 30 s clock is VISUAL only (shaft flare + ripple). Tones
  sound ONLY via lazily created, typeof-guarded WebAudio inside the drag
  gesture — a low sine (70 + 8·index Hz, 1.2 s decay, panned by skull x)
  on pointer down and whenever the listening index changes mid-drag.
  Never on the clock, never autoplay, no microphone, no getUserMedia.
- Determinism: frame one = draw(0) via a boot flag; the rAF loop is a
  plain function declaration behind a typeof guard and the clock starts
  only with the loop. All randomness is mulberry32 (seed 1357000 +
  index·7919), never Math.random. No Date.now / performance.now in the
  draw path (the loop runs on rAF timestamps).
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in px on every
  draw; phone detection via window.screen physical size (min dimension
  < 700 px) with aspect h > w·1.15 as fallback; centered composition
  keeps its shape on phones with the page ground in the piece's own
  #14120f. No visible text except <title> (study-wide rule: no readable
  English anywhere; invented glyphs are not needed here — there is no
  text at all). No click-to-reload anywhere.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
  390×844, and 720×720; all three inspected. Desktop: corridor, seven
  receding vessel-skulls, diagonal shafts, rivets, windows all legible.
  Mobile: same composition, no clipping, row reads down the corridor.
- Thumb byte-identical across repeated renders (including after
  process.md was written).
- Forced-time probe harness (render-piece.js shims + a stubbed
  requestAnimationFrame driving the piece's own loop, drags dispatched
  to the piece's own pointer listeners):
  - t=31 (skull 0 sounding, age 1) vs frame one: 87,713 px differ,
    bbox x44–268 — skull 0's shaft flare + ripple rings.
  - t=36 (event over) vs frame one: 0 px — exact return to rest.
  - t=61 (skull 1 sounding) vs frame one: 65,914 px, bbox x150–358 —
    the flare moved right to skull 1; t=61 vs t=31 differ by 136,482 px.
  - Drag (down at skull 3's base, +120 px move) at t=62: 69,017 px
    differ, bbox extending to x611 — lean + listening glow present.
  - t=70 (8 s after release) vs frame one: 0 px — lean fully decayed.
  - A t=31 probe render was inspected visually: skull 0's shaft flares
    bright warm gold with two expanding ember rings at its mouth.
- Token scan clean: no Math.random, createElement, getUserMedia,
  Path2D, gradients, shadowBlur, offscreen canvas, Date.now, or
  performance.now in the draw path (two comment lines mention
  shadowBlur/Path2D/Math.random only to state they are not used).
  AudioContext appears only behind typeof guards inside the drag
  gesture handler.
- No fix rounds needed after first inspection; the piece shipped as
  first rendered.
