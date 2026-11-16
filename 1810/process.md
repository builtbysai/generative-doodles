# №1810 "Tunes Blown by the Wind" (PH3, PP1057, #237 paul-panhuysen)

Date: 2006 · 12 · 26. Gallery note: "The weather performs when it wants to. Watch only."
Watch-only. Canvas 2D only. Built from the live №1807 template
(fetched fresh via fetch-blob.py, sha d66764c45c933c9cf839aeb6dd0783a85ee56710).

## What the piece is

A signal-hill mast against a wide late-afternoon sky. Four steel wires run
from the mast crossarm down to wooden cube resonators on the hill, their
lengths in the integer ratios 6:8:9:12. Tin cans and wind chimes hang from
two cables beside the wires, clustered mid-frame. A pale sea and a faint
out-of-focus city sit far below the horizon. Most of the time the scene is
still: wires taut, tins hanging dead. On their own irregular schedule, gusts
cross the hill: the tins swing, the chimes tilt, the wires show a faint
traveling shimmer, the marble tins rattle visibly. Then everything settles
back to stillness. An occasional brief sun break warms the sky.

## Geometry

- Scene is a centered 16:9 frame on both sizes, page ground set to the sky
  color. The wire fan needs a wide frame, so on phones the scene keeps its
  shape, letterboxed in sky, rather than being cropped or squashed.
- Mast at scene x 0.16, from the hill to y 0.10, with a crossbar near the
  top and an antenna tip.
- Wire anchor x positions are solved at draw time by bisection so each
  wire's true length (aspect-corrected) matches its ratio exactly, with
  unit u 0.068: ratio 6 anchors at x 0.4926, ratio 8 at 0.6512, ratio 9 at
  0.7261, ratio 12 at 0.9433. Verified numerically before building.
- Wooden cubes (weathered brown, drawn as small cubes) sit at each anchor.
- Two chime cables run from the mast down to wooden pegs on the hill:
  cable A (0.16, 0.52) to peg (0.72, 0.8634), cable B (0.16, 0.60) to peg
  (0.60, 0.8670). Three tins hang from cable A, two chime assemblies and
  one tin from cable B. Each hanging piece is placed by its fraction along
  its cable, so its string meets the cable exactly. Two tins carry marbles.
- Sea band y 0.80 to 0.86 with twelve faint city blocks on the horizon;
  hill slope below, with seeded grass tufts.

## Weather: fixed authored table, not live noise

Cycle 300 s. Gusts [start second, duration seconds, strength]:
[118, 11, 0.9], [167, 9, 0.75], [233, 13, 1.0], [281, 8, 0.65].
Sun breaks [start, duration]: [204, 7], [262, 5].
Envelopes ramp in over the first quarter of each event and out over the
last third, smoothstepped. Tin swing is a pendulum rotation about the cable
point, amplitude 0.30 rad times the gust envelope, periods 1.6 to 2.1 s
seeded per piece; chime tilt is the same law at 0.12 rad. Wire shimmer is a
traveling sine along each wire, amplitude scaled by its length ratio
(ratio/12 times 4 px), zero when the envelope is zero. Marble rattle is a
seeded jitter of two dots inside the marble tins, scaled by the envelope.
Sun break adds a soft warm radial glow upper right and a warm wash over
the scene.

Frame one is at fixed phase t = 60 s, in a quiet interval: no gust (next
gust starts at t = 118 s), no sun break (first at t = 204 s). Tins hang
dead, wires taut. All motion is a closed-form function of piece time on
the fixed table, so frame one stays byte-comparable.

## Deviations from the prompt

- Wires attach at a mid-mast crossarm (y 0.45) with the mast continuing up
  to an antenna tip, rather than at the mast top. The 6:8:9:12 length
  ratios cannot fit a wide frame from the mast top; the crossarm keeps
  the ratios exact while the mast still reads as a tall signal mast.
- Gusts and sun breaks are a fixed authored irregular table, not live
  noise, per the spec adaptation flag. The schedule is irregular and
  minutes apart as the prompt requires; nothing is rhythmic or constant.
- The scene is a centered 16:9 frame on both sizes (letterboxed on phones)
  instead of full-bleed on phones, so the fan geometry survives the
  portrait viewport. Page ground is the piece's own sky color.
- The sea and city are a soft pale band with faint blocks, deliberately
  low contrast to read as out of focus.

## Title check

Checked "Tunes Blown by the Wind" against live pieces.json (2,008 entries,
fetched 2026-11-15): zero verbatim matches. No duplicate; shipped as
specced. №1807 entry confirmed live: "The Permanent Room", 2006 · 12 · 23.

## QA

- node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb;
  all three PNGs read and inspected.
- Desktop: overcast blue-grey sky with soft clouds, dark mast off-center
  left, four pale wires fanning down-right to four wooden cubes, tins and
  chimes clustered mid-frame on their cables, pale sea and faint city on
  the horizon, hill with grass tufts, title/date/hint plates legible
  bottom left. Quiet: tins vertical, wires straight.
- Mobile: same scene intact in a centered 16:9 band, plates legible.
- Thumb (720x720 render): same scene, all elements readable.
- Gust check: a temporary copy with first frame at t = 125 s (inside the
  first gust, 118 to 129 s) was rendered and inspected. Tins swing and
  tilt, chimes tilt, wires carry a faint shimmer. The longest wire was
  measured against its chord at 18 columns: maximum deviation 4.9 px,
  oscillating both sides, matching the authored 4.4 px shimmer amplitude.
  The gust frame was a throwaway test only; the shipped file draws t = 60 s.
- Fix round: first render showed the two chime cables ending mid-air.
  Cables were re-run to wooden pegs on the hill and every hanging piece
  was re-placed by its fraction along its cable; re-gated after the edit.
- Determinism: desktop render repeated; both renders byte-identical.
- No em dashes in visible copy or headings. No click-to-reload anywhere;
  the piece is watch-only and the hint plate says so.
