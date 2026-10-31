# No.867 "Kind, Ordinary, Happy, Pure"

Study #106 lim-giong, PP28 "The Pure Person Murmur" (Millennium Mambo).

## Concept

Lim Giong's Millennium Mambo signature: a whispered human murmur ("kind,
ordinary, happy, pure people") floating inside fine, regular electronic
beats. The piece stages that tension as two systems that share only the
canvas:

- THE GRID: a rigid field of vertical beat-lines pulsing on a strict
  120 BPM clock (0.5 s per beat). It never drifts, never glitches, never
  breaks. On each beat every line flashes toward the pulse blue and decays
  exponentially until the next beat.
- THE MURMUR: one warm bone-colored trace with a breathing body and a
  fading trail, wandering the middle band on a slow seeded LFO path. Its
  periods (roughly 5-29 s, all non-multiples of the 0.5 s beat) guarantee
  it never syncs to the grid and never lands on the beat.

Interactions: drag and you become the murmur (your path, free and
unquantized, replaces the wander while held, then blends back over 1.2 s).
Tap: the grid flares at the tap's column and the murmur shivers. Double-tap
reseeds the wander. Sound starts only on the first gesture: cold square
pulses locked to the same beat clock, plus a soft breath sine whose pitch
follows the murmur path's curvature and whose gain follows its speed.

## Construction

- Single self-contained index.html, canvas 2D, no assets, no text drawn
  (the only text is the `<title>`). Palette is exactly the five specced
  tones: #030304, #2A3B4A, #4D7A99, #E8DCC8, #8A7A62; intermediate grid
  tones are mixes of the grid and pulse colors only.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; draw() pins canvas.style.width/height in px
  every frame. Phone detection uses window.screen physical size (min
  dimension < 700 px) with the aspect fallback (h > w*1.15) only when the
  screen size is unavailable; phones get fewer, wider grid columns.
- Murmur motion is closed-form. Each wander epoch is seeded (mulberry32)
  and its position is a sum of sines evaluated at (t - epoch start).
  Recorded drags are stored as timestamped sample lists; position during
  a drag is linear interpolation of the samples, and after release a
  smootherstep blend returns to the closed-form wander over 1.2 s. The
  trail is drawn by evaluating the same position function at past times,
  so the trail is exact through drags, blends, and reseeds.
- The shiver is a pure function of the recorded tap list: a damped
  ~12-14 Hz offset lasting 0.55 s per tap. The tap flare on the grid is
  likewise a function of the tap list (column-local, exp decay).
- The murmur's soft edge is layered flat-alpha discs of decreasing radius
  and increasing alpha, breathing on its own seeded period (3.4-4.7 s,
  never a beat multiple). No shadowBlur, no gradients, no ctx.filter, no
  offscreen canvas.
- Determinism: frame one is the synchronous draw(0). t=0 is a beat
  (beatPhase = 0, pulse = 1), so the grid opens at full pulse and the
  murmur opens mid-wander with a fully developed 2.8 s trail evaluated
  backwards from the closed-form path. No Date.now() anywhere; the clock
  is performance.now() elapsed, and frame one does not consult it.
- Audio: AudioContext created lazily inside the first pointerdown,
  typeof-guarded, through a compressor, modest gains. The square pulses
  are scheduled against the same piece clock that drives the visual grid
  (beat index derived from piece time), every fourth beat accented. The
  breath tone is one sine oscillator updated per frame from the murmur
  path's finite-difference curvature and speed.

## Two-system independence

The grid code reads only t and the tap list (for flares). The murmur code
reads only its epoch seeds, the drag list, and the tap list (for shivers).
Neither system reads the other's state: the grid cannot be bent by the
murmur's position, and the murmur's periods are chosen from ranges that
exclude beat multiples, so no resonance or snapping can develop between
them. The audio mirrors this split: the pulses follow the beat clock
alone; the breath follows the murmur path alone.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). The harness has no
  requestAnimationFrame and no AudioContext, so the renders capture the
  synchronous frame one in silence, as specced.
- thumb.png rendered twice and cmp byte-compared: identical.
- Read-back: desktop and thumb show the black field with vertical
  blue-grey beat-lines at full pulse, and one warm soft blob in the middle
  band with a tapering tan trail curving behind it. Mobile shows the same
  composition with wider column spacing; the blob and trail sit fully
  inside the frame, nothing clipped.
- One fix during QA: the first trail evaluation clamped past times at 0,
  which collapsed the frame-one trail into the head; the trail now
  evaluates the closed-form path at negative times (the wander is defined
  there), so frame one opens with the full 2.8 s trail. Renders redone
  and the byte-compare re-run identical after the fix.

## Deviations

- None from the prompt's substance. Two implementation choices worth
  recording: (1) the grid pulses together rather than in a traveling
  sequence, one of the two options the brief allows, chosen so frame one
  reads unambiguously as "on the beat"; (2) the breath tone's pitch maps
  from the murmur path's curvature computed by finite differences of the
  same closed-form position function used for drawing, so audio and image
  can never disagree about where the murmur is.
