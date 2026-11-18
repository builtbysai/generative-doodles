# Seek-Wah Chain, No.1866

Study #244 francesca-naibo, prompt FN3, PP1113. Title: Seek-Wah Chain.
Gallery date: 2007 · 02 · 20. Gallery note: "One bright pluck travels a
chain of pedals, fuzz fattening it, seek-wah chopping it into steps, the
looper folding ghosts of earlier passes back in. Tap anywhere to send a
fresh pluck into the chain."

## Driver

The driver is transformation along a chain. One pluck enters as a bright
dot and each node rewrites it: fuzz fattens it, the seek-wah chops it into
a stepping rhythmic pattern, the looper layers ghosts of earlier passes,
the amp turns it into light on the grille. The felt phenomenon is a signal
that leaves as a dot and returns as a pattern. The build is the mechanism
(a visible dot traveling node to node, each node visibly transforming it,
looper ghosts accumulating), not stage directions.

## What was built

Five nodes in a horizontal row across the frame, with generous dark space
above and below: INPUT (dark jack with an amber ring), FUZZ (rust enamel),
SEEK-WAH (teal enamel with eight step ticks along its top edge), LOOPER
(teal enamel with four lavender echo dots orbiting inside), AMP (cream
grille box with slats). Sagging cables join the nodes, with amber pulse
beads travelling along them as a pure function of time.

A pluck crosses the chain in 9 seconds. An auto pluck enters every 6
seconds, so the chain plays itself in a 24 second loop. The dot fattens
with a halo as it passes the fuzz node; inside the seek-wah segment its
position quantizes into eight steps and it leaves a stepped amber trail;
four lavender ghost copies trail it at fixed 1.2 second delays; at the amp
it dwells while two amber rings expand and fade and the grille glows.
The most recent pass through the looper keeps its echo dots orbiting for
six seconds, then they fade.

Tap anywhere (pointerdown) injects a fresh pluck at the current phase and
lazily builds the WebAudio chain on the first gesture only: a triangle
pluck through a waveshaper (fuzz), a step-sequenced bandpass (seek-wah,
eight steps), and a feedback delay (looper). Audio is silent before the
first gesture. Long inactivity thins the loop: echoes decay and the chain
waits on its slow auto cycle. Never click-to-reload; a tap is a reseed.

## Palette (hand picked from the prompt's named colors)

Floor-cable black #0E0D0C, pedal enamel teal #2E6E6A, pedal enamel rust
#A44A2A, signal amber #F2A93B, ghost-layer lavender #B9A7D9, amp grille
cream #EFE3C8. No study file exists in the repo for francesca-naibo, so
hexes were picked from the named colors.

## Determinism

Frame one is a fixed phase, t = 10.0 s: the second auto pluck is mid
seek-wah (age 4.0 s, step 2 of 8 lit), three lavender ghosts trail it
toward the fuzz and input, and the first pluck's looper echoes are still
faintly orbiting. No wall clock, no Date, no unseeded Math.random. Floor
dust uses a seeded mulberry32 PRNG (seed 1866). All motion is a pure
function of phase time; taps only add plucks after load, so frame one is
identical on every load.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and
window; canvas pinned in draw() via canvas.style.width/height in px;
phone detection via window.screen (min dimension under 700px) with aspect
fallback (h > w*1.15); field-like composition is full-bleed on phones and
a centered square on desktop. One synchronous frame at load; every
requestAnimationFrame call guarded by a typeof check. Reduced motion shows
frame one only.

## Deviations

None material. The prompt's "long inactivity lets the loop thin out to
silence" is rendered visually as echo decay between auto plucks; the auto
cycle itself never fully stops, so the piece is never a dead frame.

## QA

Rendered the actual script with node render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. All three inspected: chain legible at
every size, no clipping, no doubled canvas, plates and hint adjacent to
the artwork on phones, live pluck visible mid seek-wah with ghosts
trailing. One fix round during the build: an alpha passed as a string to
the rgba helper crashed the first render; all six call sites corrected to
pass numbers, then re-rendered. thumb.png is the 720x720 render of the
final script.
