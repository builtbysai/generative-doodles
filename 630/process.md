# №1971 Small Figure, Huge Sea

TL4 / PP1218, study #257 theodora-laird.
Gallery date: 2007 · 06 · 05. Gallery note: "A vast monochrome sea does everything; one tiny figure raises an arm against the scale. Watch the tides."

## What it is

A vast black-and-white coastline fills the frame: slow heavy
surf, spray exploding off rocks, sky as one gray gradient. At
the waterline stands a single tiny human figure, barely taller
than the wavelets at her feet. The sea does everything; the
figure does almost nothing. Once per tide cycle she raises one
arm, holds it against the scale, and lowers it. That is the
whole performance. The horizon sits at the upper third; the
figure stands off-center at the waterline, small enough to
read as scale, never as subject. The figure is a simple dark
silhouette, anonymous and unreadable, with no invented
likeness. No storm drama; the point is scale, not weather.

## Palette

- Sky gradient #c4c6c9 to #9ea1a4, one gray gradient, page ground #bdbfc2
- Sea mid gray #6e7276, swell shadow #565a5e, swell light #82868a
- Foam near white #e9e9e6, spray white #f4f4f2
- Rocks near black #16181a, rock highlight #2a2d30
- Figure dark silhouette #141516, text ink #1c1e20, hint pill #f2f2f0

## Interaction

Watch-only. There is nothing to tap. The tides are the time
signature: large slow swells roll, breakers foam at the shore,
spray bursts at the rock line, and the tide creeps up and back
over a 24 s cycle. The figure's single arm raise is the only
human event. Motion is all on multi second timescales, film
grain re-seeds at 8 Hz, well under the 14 Hz ceiling.
prefers-reduced-motion renders a still frame. No audio: visual
only.

## Determinism

FIRST_T = 16 s. The tide cycle is 24 s. The arm raise starts
at phase 14, is fully raised by phase 15, holds through phase
17, and is down again by phase 18. At t = 16 the phase is 16,
so the figure's arm is fully raised and held against the
scale, the swells are mid-cycle, and spray is bursting at the
left rock line. Every element is a pure function of the clock:
seeded swell phases, breaker offsets, spray particle phases,
and the grain seed, which steps 8 times a second. QA hooks:
window.__draw(t), window.__piece1971 with arm(t), phase(t),
redraw(t), firstT. Query params: ?t= sets the virtual clock,
?seed= is an alias for it.

## Tide cycle and the one gesture

Cycle length 24 s. Arm raise value 0 = down at her side,
1 = fully raised: 0 outside phases 14 to 18, rising 14 to 15,
holding 15 to 17, lowering 17 to 18. The raised arm lifts up
and out at an angle, clear of the body even at the figure's
tiny scale. The tide level is a sine over the same 24 s
cycle, moving the wet sand edge up and back.

## Probes

Seeded probe harness /tmp/probe-1971.js (loads the actual
script in the render-piece node-canvas shim):

- Arm state: t=10 arm 0.00, t=13 arm 0.00, t=14 arm 0.00,
  t=14.5 arm 0.50, t=16 arm 1.00, t=17 arm 1.00, t=17.5
  arm 0.50, t=18 arm 0.00, t=22 arm 0.00, t=40 arm 1.00
  (phase 16 again, one full cycle later).
- Frames differ over time: md5 at t=10, 14, 16, 20, 40 are
  all distinct, swells and spray moving; frame one at t=16
  re-rendered twice with identical md5 4903d4120cf6a99b996c1f0f39b3ff62,
  identical to thumb.png.
- Arm up vs arm down confirmed visually in zoomed crops:
  at t=16 the arm lifts up and out from the shoulder; at
  t=10 both arms hang at her sides.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. All three inspected
visually. Thumb md5 4903d4120cf6a99b996c1f0f39b3ff62, re-rendered
after the final fix with identical md5, deterministic frame
one confirmed.

## Fix rounds

1. First build rendered clean at all three sizes, but two
   defects showed on inspection. The raised arm ran almost
   straight up along the body and head, so at the figure's
   tiny scale it read as a slightly thicker head rather than
   a raised arm. And on the tall mobile sheet the left rock
   cluster extended to the canvas edge and covered the
   vertical side text. Fix: the raised arm now lifts up and
   out at an angle, clearly apart from the body; the left
   rock cluster moved inward to 0.17W with its smaller
   boulder on the inner side, clear of the side text.
   Re-rendered and re-gated after the fix; desktop, mobile,
   and thumb confirmed clean, arm up at t=16 and arm down
   at t=10 confirmed in zoomed crops.

## Deviations from the prompt

None material. The prompt prescribes a vast monochrome
coastline, slow heavy surf, spray off rocks, one gray
gradient sky, a tiny anonymous figure at the waterline,
horizon at the upper third, one arm raise per cycle,
watch-only, film grain and pushed contrast; all are present.
The wet sand strip at the bottom and the figure's short
reflection smear are small additions that keep the figure
grounded at the waterline.

## Known warts

- On phones the right rock cluster is cropped hard at the
  right edge; its smaller boulder runs off-canvas and only
  the main rock reads.
- The sky cloud band is very faint and reads as a flat gray
  stripe more than a cloud; it is barely visible against the
  gradient.
- The spray mist band along the breaker line is subtle at
  the thumb size and mostly reads as a pale haze.
- The figure's reflection is a plain dark smear, not a
  shaped reflection; at the figure's scale it reads as a
  shadow, which is the intent.
