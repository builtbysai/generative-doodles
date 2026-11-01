# No.917 "The End of the Road" (study #112 duncan_geere, PP78 "The Quiet Road")

## Concept

A requiem for the insects on the windshield. Twenty years run left to right
across a near-black field, one faint column per year. Each year's insects are
tiny fluttering ticks, nothing drawn, the ticks ARE the insects: the big ones
sit low in the column in amber, the small ones high and pale. A playhead
travels the years at six seconds each; the current year is lit, the years
behind it dim to embers, the years ahead are barely-there ghosts. At every
year boundary a bell tolls and a thin pale ring opens in the field. The data
thins as it goes: the first column is a dense shimmering swarm, the last is
nearly empty. The thinning is the subject, and it is never hidden.

## Construction

- Dataset: synthesized at init from mulberry32 (seed 91778), fully recorded
  here. Count for year y (0-based): round(340 * exp(-0.21 * y) * (0.85 +
  0.30 * rng())), minimum 4. Year 1 holds a few hundred insects, year 20 a
  handful, roughly 1,770 in total. Per insect: size01 from a lognormal
  (Box-Muller gaussian through a logistic, 1 = biggest); vertical placement
  0.16 + 0.68 * size01 plus jitter, so big insects sit low and small ones
  high; horizontal placement jittered inside the column; a year offset f;
  flutter phase, rate (0.5-1.4 Hz) and amplitude (1.2-3.4 px), all fixed at
  init. Flutter position is a closed-form sinusoid of t per insect.
- Playback: position is measured in year units and is a closed-form function
  of (t, recorded events). Modes: 'play' (anchor + rate), 'replay' (one year
  loops), 'return' (year 0 held for 10 s after a double-tap, then play
  resumes seamlessly). Years play at 6 s each, a ~2-minute loop that wraps
  back to the abundant first year. Frame one is the synchronous draw at
  t = 0 with the playhead at pos 0.45, inside year 1. No Date.now anywhere;
  the clock is performance.now relative to load, and drawn state never
  depends on it except through the elapsed t passed to draw.
- Interaction: tap a year to replay it in isolation, looping inside that
  year until another gesture. Drag to lean in: dragging takes manual
  control of the clock and slows the rate to clamp(1 - dist/380, 0.25, 1),
  quantized to 0.05 steps with a new time anchor recorded at each step
  change; release restores rate 1. Double-tap jumps back to year 1 and
  holds it for 10 s, then the requiem resumes. Never click-to-reload.
- Audio: lazy AudioContext created on the first pointerdown, typeof-guarded.
  Per-insect flutter grains are scheduled from playhead crossings (outside
  draw): short sine bursts of 30-80 ms, pitch 200 * 10^(1 - size01) Hz so
  big insects sound low and small ones high, capped at 8 grains per frame
  tick so year 1 reads as a shimmering swarm rather than noise and year 20
  is a few lonely grains. The bell is a 110 Hz sine (with a faint 221 Hz
  partial) decaying over 4 s, fired at each year boundary crossing, which
  also records the expanding ring the draw renders.
- Presentation: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px inside draw every frame. Phone detection via window.screen
  min dimension < 700 with the h > w*1.15 aspect fallback only. The 20
  columns span the width at every size; page ground is the piece ground
  #080808. Palette strict: ground #080808, marker #1F1F1F, big tick
  #C9A227, small tick and bell #E8E0C8. No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas, no visible text besides the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  renders complete and silent in the harness (no AudioContext, no rAF).
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical (duplicate deleted). Frame one shows year 1 dense with amber
  and pale ticks under the playhead, the columns thinning visibly rightward
  to a nearly bare final column.
- Deviations: none from the brief. One reading worth noting: during a drag
  the playhead keeps advancing at the reduced rate rather than scrubbing
  position, because the brief defines drag purely as a rate change (lean
  in, ticks stretch). The bell's faint 221 Hz partial is a timbre choice on
  top of the specced 110 Hz fundamental, added so the toll reads as a bell
  and not a sub thump.
