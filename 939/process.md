# No.939, Modelli Circolari: A Model of a Model

Study #115 giorgialupi, PP100 "The Inner Focus Circle" (Giorgia Lupi,
Modelli Circolari, 2026: monochrome paintings whose inner focus circle
hosts symbols, connections, diagrams and words).

## Concept

Each theme is one question Lupi is trying to model, painted in a single
colour family and nothing else. The whole field is that family's wash;
at the centre sits the inner focus circle, and inside it a small model
of the theme assembles itself: hand-drawn symbols (a node, an arc, a
spiral, a cross, an arrow, a grid cell, rings, a zigzag) placed by seed,
joined by wobbled connection lines, with the theme's own words lettered
small beside the symbols they belong to. Stitched thread lines cross
the whole composition diagonally, the way thread crosses the original
paintings. Gridded paper shows through at the margins only.

Four themes cycle in order, each with its own palette object, word set
and label set:

- RED, "humans, consciousness and technology": paper #F3E9E2, washes
  #E0572F and #B23A2E, ink #3A231C, thread #E8B62D; words memory, signal,
  the self, dream; labels a synapse, a signal, a loop of thought, a spark.
- BLUE, "the hidden structure of personal identity": paper #E9EBF0,
  washes #3B4B8C and #2C3E70, ink #232838, thread #E0572F; words name,
  mirror, root, story; labels a root, a reflection, a seam, a name.
- GOLDEN, "visual notations for musical structure": paper #F5EEDC,
  washes #D9A441 and #B9770E, ink #3A2E14, thread #3B4B8C; words rhythm,
  measure, rest, return; labels a downbeat, a measure, a rest, a return.
- GREEN, "choreography": paper #EDF0E4, washes #7A9B6E and #4E7245, ink
  #24301F, thread #B23A2E; words step, turn, weight, breath; labels
  a step, a turn, a weight shift, a breath.

The loop per theme runs 79 seconds: a 60 second draw-in (washes bloom,
then the circle boundary draws itself, then symbols, connections and
words populate inward in seeded order, then the threads stitch across),
a 15 second hold, then the colour drains back to paper over 4 seconds
and the next theme begins. A tap on a symbol reads it: the symbol
pulses larger and its hand-lettered label appears beside it for three
seconds. Dragging stirs the wash: the pigment follows the hand and
settles back. A double-tap skips to the next theme.

## Construction

Single self-contained index.html, canvas 2D, no external assets. All
four theme models are built once at load from mulberry32 seeded
streams (seed 939100 + theme index x 131), so every layout is fixed
data: 10 wash blobs per theme, 12 symbols rejection-sampled inside the
circle with a minimum separation, an appearance order given by a seeded
shuffle, connections chained through that order plus three seeded extra
pairs, a 64-point wobbled circle boundary (two sine harmonics plus
seeded jitter), and 3 seeded diagonal threads.

The draw is a closed-form function of the piece clock and the recorded
event list (symbol reads, drag and release, double-tap theme skips,
which fold into an adjusted clock). Frame one is the synchronous draw
at t = 0 with the clock pre-offset 36.5 seconds into the red theme:
washes bloomed, circle complete, six of twelve symbols in, the first
thread stitched across, and the words "memory" and "signal" lettered.
Nothing drawn is derived from Date.now; the animation loop is anchored
to elapsed time since load and guarded by a typeof check on
requestAnimationFrame.

Canvas size comes from the Visual Viewport API with resize listeners
on both visualViewport and window, and the canvas CSS size is pinned
in pixels on every draw. Phone detection uses window.screen (minimum
dimension under 700px) with the aspect fallback h > w x 1.15; the page
ground is always the current theme's paper, and the circle is sized
from the smaller dimension so it stays centred and whole on phones.

Sound is WebAudio, created lazily inside the first pointer gesture and
typeof-guarded throughout: a low filtered-noise swell when a theme
begins, a short bandpass scratch as each symbol appears, and a tiny
square tick as the thread stitches advance. The piece renders complete
in silence.

Adaptations and deviations, with reasons:

- Washes: the prompt describes gradient washes; this house renders
  washes as layered flat-alpha shapes, so each blob is three nested
  irregular polygons (scales 1, 0.7, 0.44; alphas 0.09, 0.12, 0.15)
  alternating the family's two wash tones. No canvas gradients,
  shadowBlur, filters or offscreen canvases are used anywhere.
- Thread timing: the spec orders the threads last in the draw-in, but
  its frame one requires one thread already stitched across at roughly
  half draw-in. The first thread therefore stitches during the symbol
  pass (28 to 36 s); the remaining two stitch last (48 to 54 s and
  54 to 60 s), keeping the spec's order for the rest.
- Words ride on appearance positions 0, 1, 6 and 9 of each theme's
  seeded order (labels on the same four symbols), so frame one letters
  exactly "memory" and "signal" while the other two words arrive later
  in the draw-in rather than all four appearing at once.
- Green palette: the brief names the green theme without hex values;
  its washes #7A9B6E and #4E7245 are derived from the sage family used
  elsewhere in the study's palette, keeping the theme in one family.
- Symbol appearance stagger is 4.0 s per position, so the last symbol
  lands at 58 s, inside the 60 s draw-in window.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas):

- qa-desktop.png (1280x900): red theme at frame one. Warm coral wash
  field over the paper, faint ink grid visible in the margins around
  the circle's frame, the wobbled ink circle complete at centre with
  six symbols inside (node, zigzag, arc, arrow, grid cell, rings) in
  ink and the darker wash tone, thin wobbled connection lines between
  them, the words "signal" and "memory" lettered beside their symbols,
  and the gold thread stitched diagonally across the whole frame with
  its cross ticks. Red family only.
- thumb.png (720x720): same composition in the square format; circle
  centred, nothing clipped.
- qa-mobile.png (390x844): circle centred on the smaller dimension and
  whole, words legible, thread crossing corner to corner, grid in the
  margins, nothing clipped.
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical. The duplicate render was deleted.
- Silence: all renders produced with no AudioContext present; the
  visual is complete without sound, and the script runs clean under
  the renderer (no requestAnimationFrame, no document.body access
  unguarded, no Date.now in any drawn state).
