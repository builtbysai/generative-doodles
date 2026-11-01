# No.913 "Hold the Line" (study #112 duncan_geere, PP74)

## Concept

Duncan Geere's Loud Numbers episode "Hold the Line" sonified Canada's 2023
wildfire season. This piece rebuilds that sonification as a visible
instrument. A horizontal timeline runs April to November across a char-black
field. Every fire is one small vertical tick on the timeline, colored by
cause: pale yellow for human-caused, ember orange for natural, ash gray for
unknown, so the cause legend is visible in the data itself. Under the ticks,
a rumble band thickens and reddens with each day's burnt area. Above the
timeline, a stack of amber note-lines accumulates with cumulative burnt
area. There is no decorative fire imagery anywhere: the ticks are the fire,
the band is the rumble, the stack is the rising note count. Month labels
(APR to NOV, small, muted) are the only text besides the title.

The season plays on its own at 2.5 seconds per day (a 600 second loop,
wrapping back to April). Tap a day to replay that day in a loop, its ticks
flashing in sequence. Drag along the timeline to scrub the season. Double-tap
to jump to the worst day of the season (226 fires) and hold it there, its
ticks pulsing.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size
comes from the Visual Viewport API with resize listeners on both
visualViewport and window; draw() pins canvas.style.width/height in px every
frame. Phone detection uses window.screen (min dimension under 700px) with
the aspect fallback (h > w*1.15); on phones the tick width and month-label
font shrink, and the timeline still spans the full width.

Dataset (synthesized once at init from a mulberry32 stream, seed 91374;
Box-Muller for the Gaussian draws):

- 240 days. Fire counts follow a mid-season peak curve
  (6 + 55*exp(-((d-128)/62)^2) + 18*exp(-((d-185)/40)^2)) times a random
  factor in [0.45, 1.35] plus Gaussian jitter, clamped to at most 150 per
  day. Day 131 is then forced to 226 fires, which makes it the single worst
  day (next highest day is 89). Total: 7,976 fires.
- Cause per fire: 60% human, 25% natural, 15% unknown; each fire also gets a
  seeded position within its day, and fires are sorted by that position.
- Burnt area per day: lognormal (sigma 0.55) with the log-mean rising from
  log(1400) across the season plus a mid-to-late bump, so area runs heavier
  late. Max single-day area is 11,909 (arbitrary hectares); band thickness
  uses norm^1.3 and band color norm^0.9 of that max, so early days stay
  thin and dark and the band swells late.

Playback state is a closed-form function of time plus recorded pointer
events (mode anchors: play / replay-day / hold-worst-day, plus a scrub
value while dragging). No Date.now anywhere; frame one is the synchronous
draw at t=0 in play mode with the playhead phase set to day 24, showing the
first weeks of ticks, a thin dark band under them, and 3 stack lines.

Note stack: one line per chunk of cumulative area, capped at 24 lines. The
chunk is scaled from the dataset itself (cumulative area through day 23
divided by 3.05), so frame one reads exactly 3 lines; each line is drawn
from the left edge to the day its chunk was earned, and the stack reaches
its 24-line cap around day 141. Ticks are laid out per day in columns above
the axis (up to 10 columns for the worst day, whose 226 ticks crowd and
spill slightly past their day slot, as the reference describes). Past days
draw at alpha 0.5, the current day at full brightness, future days hidden;
the rumble band draws the full season profile with unplayed days at alpha
0.30.

Sound is the work, and it is scheduled from playhead crossings in the
animation loop (never inside draw(), so the visuals do not depend on it):
human fires are short highpassed square tings, natural fires are bandpassed
noise crackle, unknown fires are low sine flicks (capped at 10 fire sounds
per frame); each day boundary fires a bass sine drop (130 Hz falling to
38 Hz); a looping brown-noise rumble has its gain driven by the current
day's area; each new stack line adds a soft sine note climbing a pentatonic
ladder. All audio code is typeof-guarded and wrapped in try/catch.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from the actual script:
qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
thumb.png rendered twice and byte-compared with cmp: identical; the
duplicate was deleted. The piece renders cleanly in total silence (no
AudioContext in the harness).

First pass finding: the rumble band used a sqrt thickness scale, which
lifted typical days (area norm near 0.2) to half the maximum thickness, so
frame one read as a solid red curtain instead of a thin dark band under the
first weeks. Fixed by remapping thickness to norm^1.3 and color to
norm^0.9; re-rendered all three sizes and re-verified determinism. Final
renders: char-black field; month labels APR through NOV across the top;
ticks for days 0 to 23 at the left, mostly yellow with orange mixed in; a
thin dark-red band under them with the full season profile (dimmer ahead of
the playhead) swelling toward the late season; 3 amber stack lines above
the timeline; the playhead standing at day 24. Mobile render keeps the
timeline full-width with labels legible and nothing clipped.

## Deviations

- Audio starts on the first gesture, not on load. Browser autoplay rules
  forbid sound before a user gesture, and the house rules require lazy,
  gesture-gated, typeof-guarded AudioContext. The visual season plays
  regardless; the first tap is also the day-replay gesture, which is the
  natural sound-on moment. Recorded per the brief's instruction.
- The 240 days are grouped as eight even 30-day months for the labels,
  rather than true calendar month lengths (which would total 244 days);
  the brief fixes the season at 240 days.
- Fire-sound scheduling is capped at 10 voices per frame so the 226-fire
  day stays a roar of layered ticks instead of hundreds of simultaneous
  oscillators; the rumble gain carries the rest of that day's weight.
