# №1970 Adumbration

TL3 / PP1217, study #257 theodora-laird.
Gallery date: 2007 · 06 · 04. Gallery note: "A slow dark sub
field and a bright granular field hold their opposition, never
resolving. Drag to lean toward a pole."

## What it is

Two fields held at once and never resolved. Below, a slow dark
sub field: four stacked bands of deep indigo-black, their top
edges shaped by three large slow wave modes moving at body
speed, 0.05 to 0.11 Hz. Above, a fine bright top field: 320
seeded grain particles jittering on small fast orbits at 0.7
to 2.8 Hz, bright white and dark ink specks on a near-white
ground, with short rain streaks falling through. The boundary
sits at one third down, so the sub field occupies two thirds
and the top field one third. Occasionally a low crest throws a
bright pink spray across the boundary, a glow below it and a
hot segment on the line, and both fields shiver. Neither field
wins, neither disappears.

## Palette

- Sub field deep indigo-black #070716, bands #0d0d24,
  #131330, #1b1b42, #232352
- Top field near-white #efede7, bright grain #f7f5ef, ink
  #14142a
- Crossing events hot pink #ff2e88, soft pink #ff7ab8
- Boundary line #8a8aa8, hint pill cream #efe6d0

## Interaction

Drag vertically to lean toward a pole. Drag down and the sub
field deepens and slows while the top field thins; drag up and
the detail field sharpens and quickens while the sub recedes.
A lean gauge on the right edge shows the current lean, DETAIL
at the top, SUB at the bottom, with a pink marker. On release
the system drifts back to the held opposition over about 2.5 s;
resolution is refused. A tap does nothing. Never
click-to-reload. No audio: visual only.

## Determinism

FIRST_T = 8 s. At t = 8 the fields are in held opposition with
no crossing event in flight: the first event lands near t = 23.3
and the next near t = 50. The low modes are mid-swell and the
grain is at full held density. Every element is a pure function
of the clock and the lean state: seeded grain and rain
positions, the fixed crest schedule, and the seeded event
positions. QA hooks: window.__draw(t), window.__piece1970
with lean(), setLean(v), crest(t), events(), eventCount(t),
activeEvents(t), shiver(t), redraw(t), firstT. Query params:
?t= sets the virtual clock, ?seed= is an alias for it.

## Crossing event schedule

Crest function: 0.5 sin(2 pi 0.043 t + 0.7) + 0.3 sin(2 pi
0.071 t + 2.1) + 0.2 sin(2 pi 0.113 t + 4.0). An event fires
on each upward crossing of 0.50. First events: t = 23.30,
50.12, 67.72, 93.48, 120.68, 137.78, then continuing to
t = 600. Each event lasts 2.5 s: a spray of 26 pink dots thrown
up into the top field, a pink glow under the boundary, a few
pink drops into the sub field, and a hot segment on the
boundary line. The shiver decays with a 0.9 s time constant
and briefly lifts the wave amplitude and the grain jitter.

## Probes

Seeded probe harness /tmp/probe-1970.js (loads the actual
script in the render-piece node-canvas shim):

- Frame one (t=8): no active event, shiver 0.000, crest -0.085;
  md5 b08c57bdf0e9b539711d29312bf6c559, identical to the
  1280x900 render, and returning the lean to 0 reproduces it
  exactly.
- Frames differ over time: md5 at t=8, t=13, and at the first
  event + 1 s (t=24.3) are all distinct.
- Drag probes at t=8: lean +1 (sub pole)
  44a8400803b65e84455b21606ab41541, lean -1 (detail pole)
  e7b75f9c72b9d985bd95f9a0dd33886b; both differ from frame one
  and from each other.
- Events: 4 events in the first 120 s (23.30, 50.12, 67.72,
  93.48); the event frame at t=24.3 shows the pink spray and
  glow crossing the boundary.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. All three inspected
visually. Thumb md5 73a31013eebea1b649ecf9b52d86e359, re-rendered
with identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean, but the first crest threshold
   (0.72) put the first crossing event at t = 94.6, too sparse
   for a visitor to ever see one. Fix: threshold lowered to
   0.50, first event now at t = 23.3 with later events roughly
   every 17 to 27 s. Frame one unchanged (no event active at
   t = 8), probes re-run.
2. The lean gauge was drawn near-white over both fields, so
   its DETAIL label and the upper track were invisible against
   the bright top field. Fix: the track is now two-tone, ink
   over the top field and near-white over the sub field, with
   the DETAIL label in ink. Re-rendered and re-gated after
   the fix; desktop, mobile, and thumb confirmed clean.

## Deviations from the prompt

None material. The boundary sits at one third down per the
prompt's fractions (sub field two thirds, top field one
third). The topmost sub band occasionally crests above the
boundary line itself, a slow swell breaching the line between
events; that reads as part of the held tension, not as a
defect. The lean gauge is an addition: a thin track with a
pink marker and DETAIL and SUB labels, so the drag state is
visible.

## Known warts

- The crossing glow is a full circle centred just under the
  boundary, so its upper half shows as a pale pink disc over
  the bright field during the first second of an event.
- The grain particles are drawn as 1 to 2 px squares, so at
  thumb size the finest specks merge into a light stipple
  rather than reading as individual events.
- On phones the wave crest that breaches the boundary is tall
  relative to the narrow top field, so the breach reads
  stronger than on desktop.
