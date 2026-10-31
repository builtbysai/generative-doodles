# No.587 "Yo Organizo el Caos"

EXPANSION #71 julia-barata, prompt block 3 "Caos Organizado" (verified verbatim from TASKS.md).

## Concept

Her doctrine as the interaction: "¡Pero no es un caos! Es pensado ¡Yo organizo el caos como quiero!"
A dense scatter of loose ink elements lies over a faint architect's grid (10% opacity), and
every element's home is a slot on that grid. Fling anything and it springs back onto its
slot: the chaos re-organizes itself, always. Tapping the background raises the grid to 35%
(the architect past showing through) or fades it back. A kraft band across the top carries
the hand-lettered title "YO ORGANIZO EL CAOS" and a tiny red bent-pipe doodle, after the
Familia cover.

Palette (strict): ink #1A1A1A, paper #FAF7F0, flat red #D42B1E, kraft #C8A97E (band only).
Red appears exactly twice: one figure's garment and the tiny pipe in the band.

## Construction

- Stage: 1000x1000 virtual units, centered, scaled by min(viewport)/1000. Canvas size from
  the Visual Viewport API with resize listeners on visualViewport and window; the canvas is
  pinned in draw() via canvas.style.width/height in px every frame. Phone detection via
  window.screen (min dimension < 700px), aspect h > w*1.15 as fallback; the scatter is
  full-bleed on phones as on desktop, page ground = paper.
- Grid: 4 x 4 slots below the band (x 36..964, y 140..972), drawn as hairlines plus a small
  cross marker at each slot center, all at the current grid alpha.
- Elements (13, each hand-placed on a slot, base rotations set per element):
  tumbling figure, speech scrap "¡ay!", bent pipe (hollow double-stroke), falling figure
  (standing body under a 2.75 rad slot rotation), open suitcase (lid swung on its hinge,
  straps, clasp, handle), chair mid-fall (raked, splayed legs, two small motion ticks),
  speech scrap "¿eh?", kettle (spout, lid, knob, handle arc), speech scrap "uff",
  standing figure with the red torso garment, umbrella (scalloped canopy, ribs, J handle),
  speech scrap "m...", waving figure, crouching figure. Slots 13 and 15 of 16 stay empty.
- Elements are drawn at 1.22x inside their slots so the field reads dense rather than
  sparse; hit radii are scaled by the same factor.
- Physics: each element is a spring. Dragging chases the pointer (k=110, damping 16,
  slightly underdamped: lag and overshoot give the fling); on release a softer underdamped
  spring (k=60, damping 10) carries it home to its slot. Semi-implicit Euler at 240 Hz
  substeps from the phase delta. Positions clamp to the stage, so nothing sprawls. A
  velocity lean (rotation from vx, clamped) adds life while elements travel.
- Restlessness: a small seeded breathing jitter (about 2.3 units, per-element phase from
  mulberry32 seed 587001) is added at render time only, so elements are never fully still
  but physics positions stay honest. Jitter halves while an element is dragged.
- Lettering: hand font stack ('Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive);
  the band title is drawn per letter with a seeded wobble (mulberry32 per character), the
  speech scraps as tailed bubbles measured to their text.
- Determinism: one synchronous first frame drawn at load (resize() -> draw(PHASE0),
  PHASE0 = 1.35): every element exactly on its slot, jitter at its fixed phase. The rAF
  loop is typeof-guarded and anchored as PHASE0 + elapsed via performance.now; frame one
  is never derived from Date.now() (no Date use anywhere). No audio, no microphone, no
  external assets; ctx.roundRect is guarded with a rect fallback for the QA renderer.

## QA log

- Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no
  document.createElement, no offscreen canvas). Listeners registered: visualViewport
  resize, window resize, canvas pointerdown/move/up/cancel.
- qa-desktop.png (1280x900): kraft band with title and tiny red pipe top-right; ghost grid
  and slot crosses visible at 10%; all 13 elements legible and on their slots; the red
  garment is the only red in the field.
- qa-mobile.png (390x844): the full square stage spans the phone width, nothing clipped;
  band, grid, elements, and the "drag · tap" hint all readable.
- thumb.png (720x720): full composition reads at gallery size.
- Determinism gate: thumb.png rendered twice and cmp-compared: byte-identical. The second
  render was deleted.
- Fix pass: the first render read slightly sparse for a piece about dense chaos, so the
  element draw scale was raised to 1.22x (hit radii matched) and all renders were redone
  and re-inspected, determinism re-verified after the change.

## Deviations

- Two of the sixteen grid slots are intentionally left empty. Reason: the prompt's
  composition is a scatter with breathing room between figures, and the empty slots make
  the slot crosses (and therefore the grid's claim on the chaos) visible in the resting
  frame. Every placed element still sits exactly on a slot, and nothing may rest off-grid.
- The chair carries two small curved motion ticks. Reason: at gallery size the raked chair
  alone read as a table; the ticks are the minimal mark that keeps it mid-fall, in her
  register of placed, deliberate marks rather than decoration.
- No other deviations: palette, element set, interaction set (drag-fling with spring
  return, background tap toggles the grid), and the no-rest-off-grid rule are as specced.
