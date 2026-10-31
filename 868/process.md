# No.868 "Remake This" (study #106 lim-giong, PP29 "Open Culture Stems")

## Concept

The Bioerosion gesture: a piece released as stems, so the composition is
whatever the visitor arranges. Four independent visual stems play at once on a
black field, and a mixing desk made of four thin coloured edge strips lets the
visitor mute, scrub, reverse, and freeze each stem on its own. There is no
canonical form, no preset, no randomize, no saving or sharing: the remake
exists only in the session, and the stems never sync to each other.
Independence is the instrument.

The four stems, composited back to front in the default order A, B, C, D:

- A (left strip, deep teal #1E4D5C): a drone-terrain of six slow sine ridges
  across the lower frame, the front ridge given a soft filled body.
- B (top strip, warm bone #E8DCC8): a murmur thread, a wandering curve with a
  fainter companion strand and a breathing head that travels along it.
- C (right strip, silver #B8B2A6): a grain field of seeded dots and dashes
  drifting sideways, twinkling as the playhead passes.
- D (bottom strip, cold blue #4D7A99): a pulse grid of dots breathing on a
  diagonal wave, laid over everything else.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size
comes from the Visual Viewport API with resize listeners on visualViewport and
on window; draw() pins canvas.style.width and height in px every frame. Phone
detection uses window.screen (minimum dimension under 700px), with the aspect
ratio h > w*1.15 as fallback only when screen dimensions are unavailable.

Playheads. Each stem owns a list of rate segments {t, rate, phase}. The
playhead at time t is the closed-form integral of those segments: find the
last segment starting at or before t, add rate times elapsed. Nothing is
accumulated frame by frame, so every drawn frame is a pure function of the
recorded event list and t. Frame one is the synchronous draw at t = 0 with all
four stems at rate 1 in the default order. The clock is elapsed performance
time since load; no frame is ever derived from a wall-clock date.

Controls. Hit width is 24px (28px on phones) against a drawn strip of 10px,
so strips stay tappable beyond their visible line. Corner overlaps resolve to
the nearest edge.

- Tap in a strip: mute or unmute that stem. A muted stem neither draws nor
  sounds, and its strip dims.
- Double-tap in a strip: freeze or unfreeze that stem. Freeze pushes a
  rate-0 segment, so the stem keeps drawing analytically at its frozen
  playhead time; unfreeze pushes a fresh rate-1 segment. A frozen stem's
  strip shows a notch: a black cut across the middle of the strip with a thin
  stem-coloured tick at its centre.
- Drag starting in a strip: scrub. While dragging, the stem's phase is the
  drag-start phase plus horizontal travel mapped at 16 seconds of phase per
  full canvas width; dragging left runs the stem backwards. On release, the
  stem keeps the scrub's last rate: the slope of the recorded scrub samples
  over the final 0.3 seconds, clamped to [-2, 2]. A stem can therefore run
  backwards, or hold still, while the others run forward.

Audio. Sound starts on the first pointer gesture only, through a lazily
created AudioContext with every use typeof-guarded, so the piece renders
complete and silent where no AudioContext exists. Each stem has a quiet layer
at modest gain: A a low sawtooth drone through a lowpass, B a soft sine
breath tone with a slow LFO swell, C a looped noise buffer through a
bandpass, D a low sine gated by a slow LFO into soft pulses. Muted and frozen
stems fade to silence. Rate changes couple loosely into the audio (drone
frequency, noise playbackRate, pulse LFO rate follow the rate magnitude),
kept deliberately simple and robust rather than sample-exact.

Determinism. Seeded mulberry32 generates the grain field. No gradients, no
shadowBlur, no ctx.filter, no offscreen canvas anywhere. requestAnimationFrame
is typeof-guarded; in the headless QA renderer the synchronous t = 0 draw is
the whole story.

Deviations and adaptations, with reasons:

- Analytic freeze instead of a snapshot. The prompt's technical note freezes
  a stem by snapshotting it to an offscreen canvas. The house renderer has no
  offscreen canvas, and every stem here is already a pure function of its
  playhead, so freezing the playhead reproduces the frozen frame exactly,
  losslessly, at any size. The freeze is therefore stronger than a snapshot,
  not weaker.
- Double-tap bookkeeping. A first tap toggles mute immediately, so the desk
  answers at once; if a second tap lands on the same strip within 0.35 s, the
  mute toggle is undone and freeze toggles instead. The end state matches the
  spec; only the intermediate feedback differs.
- Scrubbing a frozen stem releases its freeze on release of the drag (taking
  hold of a stem is treated as taking it over). Double-tap remains the way to
  freeze and unfreeze deliberately.
- Stopping mid-scrub. If the visitor holds the drag still before lifting,
  the final 0.3 s sample slope is zero, so the stem holds its phase at rate
  0 afterward. That is the literal consequence of "keeps the last rate".
- Reverse audio. A reversed stem's picture runs backwards exactly; its audio
  follows the rate magnitude only, since the simple oscillator and noise
  layers have no meaningful backwards playback. Recorded here rather than
  faked.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720
  (thumb.png). All three rendered cleanly in silence: no AudioContext, no
  requestAnimationFrame in the harness, and the piece still drew frame one.
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical. The duplicate render was deleted.
- Desktop read-back: black field; six teal terrain ridges low with the front
  ridge filled; the bone murmur thread wandering across the middle with its
  companion strand; silver grain specks and dashes throughout; blue pulse
  dots over the whole frame; four edge strips present in stem colours (teal
  left, bone top, silver right, blue bottom). Nothing clipped.
- Thumb read-back: same layered composition at square format, all four
  strips visible, murmur thread and terrain clearly separated.
- Mobile read-back (phone path, 390x844): composition holds in the tall
  frame, strips run along all four edges at tappable width, pulse grid uses
  the denser phone spacing, nothing clipped.
- Palette check: only the five specced colours are used (black ground plus
  the four stem colours); strip dimming, notch, and stem transparency are
  alpha variations of those colours only.
- Text check: no visible text anywhere in the piece; the only text is the
  document title.
