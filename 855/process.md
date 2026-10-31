# No.855 "Six Feet of Granulation" — process

EXPANSION #104 laurie-anderson, PP16 "The Talking Stick". Anderson's talking
stick (late 1990s, with Interval Research) is a six-foot baton MIDI controller
for granular synthesis: the motion of the stick itself is the sound control.
This piece rebuilds that mechanism as a field of sound-grains steered by one
long baton. The stick is a controller, not a wand; the thinking is granular,
not melodic; the grains almost form words and never quite do.

## Concept

A dark stage with blue-grey haze at the edges. A long amber baton rests
diagonal across the frame, butt at lower left, tip glowing at upper right.
Around it drift about 120 chalk grains, each a tiny fragment of sound, loosely
gathered along the baton's path.

- DRAG wields the stick: the tip follows the pointer (the butt stays held),
  and tip velocity drives the granulation. Slow movement GATHERS the grains
  toward five seeded constellation clusters riding the baton frame. The
  clusters are abstract near-letterforms (a stem with a bowl, a zigzag, an
  offset cross, a broken arc, a staircase) with per-grain jitter and a constant
  small drift, so they suggest word-shapes without ever resolving into legible
  text. Fast movement SCATTERS the grains outward along seeded directions,
  tinting them toward the scattered-noise red only at peak velocity.
- TAP strikes: one bright cluster pulses once at the tip, an expanding ring
  and a tight ring of chalk dots, plus a single clear tone if sound is on.
- DOUBLE-TAP reseeds the grain field; old and new cluster homes blend over
  0.8 s.
- No input: the baton rests at its diagonal and the grains idle-drift along
  it, loosely held.

Sound starts on the first pointer gesture only: a granular cloud of short
filtered-noise grains (30 to 80 ms). Density and brightness follow the same
velocity envelope that moves the picture: slow wielding gives sparse low
grains, fast wielding gives a dense bright scatter. A strike adds one clear
sine tone with a harmonic. Everything runs through a compressor at modest
gain. No microphone, no recording, no autoplay.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

- Palette (strict): stage haze #2A3A4A, baton amber #E8A020, grain chalk
  #D8D4C8, scattered red #A03A2A, black #0B0C0E. Red appears only as a
  velocity tint mixed from chalk; haze is stacked flat-alpha edge bands
  (gradients are not used anywhere; no shadowBlur, no ctx.filter, no
  offscreen canvas).
- Determinism: frame one is the synchronous draw(0) at load. All drawn state
  is a closed-form function of (recorded pointer drags, recorded strikes,
  reseed epoch, t). There is no frame-integrated physics and no Date.now
  anywhere; the clock is elapsed performance.now, and frame one never reads
  it. The field is generated with a seeded mulberry32 RNG (base seed 855016,
  reseeds add epoch times 7919).
- Gather/scatter model: every pointer drag is recorded as timestamped
  samples. From the samples, two envelopes are evaluated analytically at any
  time tau: tip speed (maximum over segment speeds, exponentially decayed
  with a 0.38 s constant) and activity (1 while held, decaying with a 1.1 s
  constant after release). Scatter = clamp((speed - 0.55) / 1.25) with speed
  in min-dimension units per second; gather = activity times (1 - scatter).
  Each grain carries a quantized lag (0 to 0.45 s in 0.05 steps) and reads
  the envelopes at t minus its lag, so a fast flick rolls through the field
  grain by grain instead of moving the whole cloud at once. Envelopes are
  cached per lag bucket per frame.
- Grain position: a grain lives in the baton frame (butt, current tip). Its
  idle point sits along the axis with a seeded perpendicular offset; its home
  is a cluster center on the axis plus a pattern point from its constellation,
  rotated into the baton frame, plus fixed jitter. Position = idle blended
  toward home by gather, plus the seeded scatter direction scaled by scatter,
  plus a small sinusoidal idle drift that is damped (not removed) while
  gathered, which is what keeps clusters loose and unresolved.
- Tip position at any time is also closed-form: piecewise-linear across the
  recorded samples while held, exponential return to the rest tip (0.9 s
  constant) after release.
- Audio: AudioContext is created lazily inside the first pointerdown, all
  uses typeof-guarded and wrapped so the piece renders and runs silently
  where no AudioContext exists. Grain scheduling runs off the same envelopes
  as the visuals. The noise buffer uses Math.random for raw noise samples
  only (audio content, never drawn state).
- Sizing: canvas size from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height are pinned in px
  inside draw() every frame. Phone detection uses window.screen physical
  size (min dimension under 700 px) with the aspect fallback h > w * 1.15.
  The baton stays diagonal at every size; nothing is clipped on phones.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The QA
  renderer has no rAF and no AudioContext; the piece rendered cleanly and
  silently, which also confirms the typeof guards.
- Determinism gate: thumb.png rendered twice and compared with cmp; byte
  identical. The duplicate render was deleted.
- Read-back (see report): desktop, mobile and thumb all show the black
  stage with haze edges, the amber diagonal baton with glowing tip, and the
  chalk grain field denser along the baton with loose cluster shapes.
- One tuning round after the first read-back: the resting field initially
  hugged the baton too narrowly and no cluster was suggested at frame one.
  The idle perpendicular spread is now bimodal (about a third of grains
  drift wider into the field) and the position blend carries a 0.28 rest
  weight toward home, so constellations are faintly suggested at rest and
  fully gathered only while wielding slowly. All renders were redone and
  the byte-compare gate re-run green.

## Deviations

- None from the brief's substance. Two recorded choices: (1) cluster
  constellations ride the baton frame (centers fixed along the axis,
  patterns rotated by the baton angle), so gathering stays attached to the
  stick while it is wielded rather than to fixed screen points; (2) the
  strike pulse draws a fixed ten-dot chalk cluster plus ring at the tip
  instead of brightening nearby field grains, which keeps every frame a
  pure function of the recorded strike list.
