# No.924 "Bonfire Nightmare" (study #113 miriam_quick, PP85 "Bristol's Burning")

## Concept

Miriam Quick's "Bristol's Burning" (2022) turned a year of Bristol air-quality
data, gathered by citizen scientists, into a dub track: a low drone whose volume
and filter cutoff follow the pollution readings. This piece draws that
sonification instead of charting it. There is no line chart and no number
anywhere: the haze IS the reading. A night skyline sits low on a blue-black
ground; above it, amber haze drifts in layered blobs whose density follows the
same curve that drives the bottom waveform strip and, once sound is enabled, the
drone itself. Each haze peak throws a slow echo ripple across the field, the dub
delay made visible. A thin legend in the top margin names the encoding
(haze = particulate, waveform height = drone volume, cutoff = filter), and a
caption by the skyline credits the citizen scientists. Dragging blows the haze
aside and it slowly re-settles; tapping throws a dub echo ripple from the
finger. One city, one year of air, one pollutant colour.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets.

Data model (synthesized, seeded, mulberry32 seed 92485):
- 365 daily particulate values. Base = 0.22 + 0.38 x seasonal cosine peaking at
  day 15 (mid-January winter smog), plus seeded noise of +/-0.08, so the year
  thins through spring into a low summer and rises again in autumn.
- A sharp Gaussian spike (amplitude 0.62, width 2.2 days) at day 309, bonfire
  night (Nov 5): the year's peak, normalized to exactly 1.000. A smaller New
  Year bump (0.22, width 3 days, wrapped) and five minor seeded episodes
  (days 81, 92, 137, 203, 301; amplitudes 0.13-0.20) complete the year.
- The driving value is the daily curve smoothed over an 11-day circular
  window. Smoothed values: day 15 = 0.52, day 200 = 0.28, day 250 = 0.26,
  day 309 = 0.63.

Playback: a 240 s seamless loop stands for the year (day = loop fraction x
365). Frame one is fixed at day 250, early autumn, moderate haze.

Haze field: 95 seeded blobs (mulberry32 seed 31337), each a stack of three
concentric circles in the single haze colour #C98F3D at low alpha (no
gradients). Each blob has an activation threshold; its strength is
clamp((value - threshold) / 0.25), which scales its alpha (base 0.075) and
radius, so rising pollution literally thickens the air. Drift is sinusoidal
with whole-cycle frequencies over the 240 s loop, keeping the loop seamless
and every frame a closed-form function of t.

Skyline: seeded silhouette (seed 777) in fraction space: rooftops, pitched
roofs, chimneys, and a few lit windows drawn in the haze tone at low alpha,
all in palette. Baseline at 0.90 x height.

Waveform strip: the bottom band draws vertical amplitude bars for the last 55
days of the same smoothed curve, scrolling as the year advances, amplitude
shimmering at a fixed rate. No numbers, per spec.

Echo ripples: local maxima of the smoothed curve above 0.55, at least 15 days
apart, are found at build time: three per loop (day ~0, v 0.61; day ~307,
v 0.65; day ~363, v 0.61). Each has a fixed seeded position and fires an
expanding #E8DCC8 ring (plus a fainter trailing ring) as the playhead crosses
it. Tap ripples are the same drawing in three concentric rings from recorded
tap events.

Interaction, all closed-form over recorded events:
- Drag records path samples; suppression at any point is the max over samples
  of (1 - distance / radius) x (1 - age / 6 s), applied to blob alpha. The air
  clears under the finger and recovers over about 6 s.
- Tap (short press, little movement) drops a ripple and plays the dub slap.

Audio (lazy AudioContext, created on the first pointer gesture only,
typeof-guarded; the piece is fully visual in silence): two detuned saws
(55 Hz, 58 Hz) through a lowpass; cutoff = 200 + 1800 x value^1.6 Hz and gain
follow the pollution curve each frame, with the gain dipped by recent clearing
activity. Tap sends a short band-passed noise burst through a feedback delay
(0.27 s, feedback 0.35): the dub echo.

House rules honoured: Visual Viewport sizing with resize listeners on both
visualViewport and window; canvas style width/height pinned in px inside
draw() every frame; phone detection via window.screen minimum dimension
(< 700 px) with the aspect fallback; strict palette (#0B0E14, #C98F3D,
#141A24, #5B7A99, #E8DCC8, #7A8A99); no gradients, shadowBlur, ctx.filter or
offscreen canvas; frame one is the synchronous draw(0) with no Date.now()
anywhere; visible text is only the specced legend, the caption, and the title.

## QA log

- Rendered with the house harness (node-canvas) at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). All render cleanly in
  silence; listeners registered: visualViewport resize, window resize, canvas
  pointerdown/move/up/cancel.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical.
  The duplicate was deleted. Re-verified after the fix round below.
- Desktop and thumb read-back: blue-black night, dark skyline with chimneys
  and sparse lit windows along the bottom, patchy amber haze blobs drifting at
  moderate density (day 250, smoothed value 0.26), steel-blue waveform bars
  along the bottom strip at moderate amplitude, slate legend across the top,
  caption sitting just above the skyline at left. As specced.
- Mobile read-back (first pass): the one-line legend overflowed the 390 px
  width and clipped ("cutof"). Fix: the legend now measures itself and wraps
  to two lines when it cannot fit, keeping the full specced wording. Also
  softened the blob base alpha from 0.085 to 0.075 so frame one reads as
  moderate haze rather than thick cloud. Re-rendered all three sizes and
  re-verified the byte-compare; the mobile legend now reads in full on two
  lines and nothing is clipped.

## Deviations

- Legend wrapping: on narrow screens the specced legend wraps onto two lines
  instead of shrinking or clipping. Content is unchanged; only the line break
  is added, because a clipped legend would break the legend-first discipline.
- The tap slap's noise buffer is filled with Math.random() at audio-init time.
  This affects sound only, never any drawn pixel; all visuals are seeded and
  deterministic. Reason: one-shot foley noise has no visual contract, and
  seeding it would add machinery for zero visible benefit.
- Ripples from data peaks are seeded fixed positions rather than tied to a
  skyline location, since the source encoding gives peaks no geography; the
  rhythm (three per year, bonfire loudest) is the data's.
