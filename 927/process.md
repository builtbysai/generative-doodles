# No.927 - Eleven Years of Invoices

Study #113 miriam_quick + duncan_geere, PP88 "The Financial Symphony".

## Concept

Two layers, and only two. The string-quartet layer: four gold ribbons
(violin I, violin II, viola, cello) sweep the upper two-thirds, and along
each ribbon the note blocks carry the data directly - a note's length is
the average invoice payment speed of its quarter, so the slow-payment
quarters stretch long and taut and the fast quarters sit short and
bright. Real bow strokes cross the ribbons at each note onset as the
playhead arrives. Beneath, the electronic layer: a steady cyan
pulse-grid at 120 BPM, the uninterrupted metronome of global trade,
ticking under the strings. The doctrine caption sits in the top margin,
verbatim: "no artistic license was applied to the underlying metrics."
No chart, no axes, no third layer: the ribbons are the invoices.

Playback is watch-only at the core: the eleven years sweep over 180 s
and loop seamlessly. A tap teaches the two-layer structure by cycling
both layers, strings alone, pulse alone, both. Dragging across the
ribbons leans into a slow quarter: the sweep drags down toward 0.2x and
the notes near the playhead visibly stretch. A double-tap isolates the
pulse alone for eight seconds, then returns.

## Construction

- Data (synthesized, seeded mulberry32, seed 92788): 44 quarters,
  Q1 2015 to Q1 2026. Base payment speed ~28 days with a slow seasonal
  wander, a Gaussian slow stretch peaking at +13.5 days across quarter
  indices 19-24 (the 2020 stretch, values into the mid-40s), faster
  recent quarters declining toward ~22 days from index 36 on, clamped
  19-47 days. Each instrument's note takes the quarter value plus
  seeded per-note jitter of +/-2 days, clamped 17-49 days. Note length
  maps linearly: days 17..49 to 0.24..0.96 of the quarter column.
  Pitch per note is a seeded diatonic index in each instrument's
  register (bases D4, A3, F3, C3).
- Sweep: sweep time is a closed-form piecewise integral over recorded
  rate segments, opening at 72 s (40 percent of the 180 s loop) so
  frame one starts mid-symphony. The playhead is a thin cream line;
  notes behind it dim to 0.52 alpha, the current note sits at full
  alpha, upcoming notes at 0.82. The bow stroke animates across the
  first fifth of the current quarter on each ribbon.
- Pulse-grid: four rows of vertical cyan ticks across the bottom
  third. A beat wave (120 BPM, real time) marches through the columns
  in a 24-column cycle, brightness decaying over six beats; the middle
  rows burn brighter than the outer rows. Low alpha throughout.
- Layer states: tap events record {from, to} alpha targets and the
  draw blends over 0.6 s, so layer changes are pure functions of the
  recorded event list. Double-tap events open an 8 s pulse-alone
  window with 0.5 s smooth in/out, independent of the tap cycle.
- Drag stretch: while a drag is held, the sweep rate is a recorded
  segment function of horizontal distance from the press point
  (1x down to 0.2x at 320 px), and note lengths near the playhead are
  multiplied by up to 2.5 with a seven-quarter falloff. Release
  records a return to rate 1.
- Audio: created lazily inside the first pointerdown, typeof-guarded.
  Strings are four sawtooth voices through individual lowpasses
  (700-1180 Hz) with slow attacks (up to 0.45 s), note duration taken
  from the data ((days/28) x quarter seconds x 0.92), triggered as the
  sweep crosses each onset. The pulse is a bandpassed 1180 Hz sine
  tick every 0.5 s. Everything is dry: no delay, no reverb. Layer
  states scale the two layer gains to match the visuals.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width and
  height pinned in px on every draw; phone detection via
  window.screen (min dimension < 700) with aspect fallback; strict
  seven-value palette; no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas; frame one is the synchronous draw(0) and is never
  derived from Date.now (the wall clock only advances the rAF loop
  after frame one); rAF itself is typeof-guarded so the piece renders
  complete and silent in the QA harness.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png). All render
  cleanly in silence (no AudioContext in the harness).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Desktop readback: deep navy ground; the doctrine caption small and
  centered at the top, fully legible; four gold ribbons in the four
  specified golds across the upper field, note blocks visibly varying
  in length (wide through the slow stretch around the playhead at
  40 percent, short and thin in the recent quarters at the right);
  a cream bow stroke crossing each ribbon at the playhead; a faint
  cyan tick ladder, four rows, across the bottom third with a
  brighter beat cluster.
- Thumb readback: same composition at 720x720; note-length contrast
  and bow strokes read clearly.
- Mobile readback (390x844): the caption fits on one line at 10 px
  with margin to spare; ribbons compress into dense gold rows with
  the stretch still visible around the playhead; bow strokes and
  pulse ladder intact; nothing clipped.
- Deviations: (1) The four tick rows of the pulse-grid vary slightly
  in brightness (middle rows brighter), a depth cue within the single
  specced pulse color and alpha range; the grid remains one steady
  120 BPM ladder. (2) A double-tap's 8 s pulse-alone window temporarily
  overrides the tap-cycle state rather than replacing it; when the
  window closes the piece returns to whatever the tap cycle had set,
  which matches the prompt's "then returns". (3) During a drag the
  visual note stretch (up to 2.5x) is the reciprocal companion of the
  time drag (down to 0.2x) rather than the identical number, so the
  slow quarter reads as stretching while time slows; both are driven
  by the same drag distance. (4) The pulse tick's beat runs on real
  time while the strings follow sweep time, so a drag slows the
  strings against the unbroken trade metronome, which is the layer
  contrast the piece is about.
