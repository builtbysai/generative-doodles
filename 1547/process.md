# No.1547 — The Walkable Exhibition (elissa-blount-moorhead EM4, PP794)

Gallery date: 2006 · 04 · 07 (formula date only; never drawn in the piece).

## What it is

A dark field (deep slate #1a1d22) with a winding dotted path running from
lower left to upper right, passing four stations, each a different small
system: station one, a circle of dots rotating (ochre #c98f3d); station
two, bars swaying (brick #a34a2e); station three, a pulsing ring (gold
#c9a86a); station four, a drifting line field (muted teal #5a7a72). Path
dots are faint bone #6a6258. A single pale-bone wanderer-mark (#e8e0d0)
travels the path, pausing at each station; whichever station it visits
brightens and speeds up, the others dim and slow. No other color, no text.

## Loop

200 s exactly, out and back: the wanderer travels from the path start to
the end, pausing at stations 1–2–3–4, then returns, pausing at stations
4–3–2–1, then the loop restarts. Travel totals 80 s (path-param speed
0.025/s); pauses total 120 s. Outbound pauses are seeded mulberry32 draws
in [10,20] s (seed 1547000); each station's return pause is 30 s minus its
outbound pause, so every station's two pauses sum to 30 s. Weighted phase
time per station per loop is therefore identical (0.6×80 + 1.0×30 +
0.35×90 = 109.5), and each station's animation advances exactly 8 cycles
per loop, so the loop closes exactly with no jump at the boundary (the
return trip, not a wrap, is what makes the restart continuous).

## Interaction

- Dragging on the path pulls the wanderer toward the pointer at a capped
  speed (0.06 path-param/s, never a teleport); on release it eases back to
  the scheduled route over 3 s and resumes it.
- Dragging on a station holds the wanderer there longer: while pressed
  during a pause at that station, the schedule clock freezes, so the pause
  extends by exactly the hold duration; on release the pause resumes and
  the route continues.
- Drag never visits two stations at once (only the paused-at station is
  ever fully bright), never straightens the path, never teleports.

## Adaptations and readings

- All motion is closed-form over piece time plus recorded drag sessions
  (schedule segments, station phases, path-drag walks, hold-adjusted clock);
  no frame-integrated state.
- Station animation speed is schedule-driven: rate 1.0 for the paused-at
  station, 0.35 for the others, 0.6 while travelling. Brightness follows
  displayed wanderer proximity, so a dragged wanderer passing a station
  still brightens it; its animation rate follows the schedule.
- During a station hold, the station's animation phase freezes with the
  schedule clock (the station stays bright); it resumes exactly on release.
- Station phase is computed modulo the loop so the 8-cycles-per-loop
  advance is exact at the boundary.
- Sun/halo and gradient rules do not arise here; all fills are flat.
- Dots are filled rects; the ring is a single stroked arc; line-field
  marks are individual stroked segments. Fading alphas are rounded to 4
  decimals. Fully silent; no AudioContext, no microphone, no text.

## QA

Renders inspected personally (desktop 1280×720, mobile 390 wide, thumb
720×720): winding dotted path lower-left to upper-right, four distinct
stations spaced along it, one pale-bone wanderer at the path start on
frame one, generous dark margins, no clipping, no text.

Probes (probe-1547.js, vm-isolated, real node-canvas, driving the piece's
own rAF loop): 29/29 pass.

- Loop exactly 200 s; 8 pauses each in [10,20] s; station pause pairs sum
  to 30 s; frame one identical across instances; loop closure byte-identical
  at t=200 and t=400.
- Path starts lower-left, ends upper-right, deviates from the straight
  chord by more than 5% of the frame height.
- Exactly one wanderer: pale-bone pixel at the wanderer position, total
  pale-bone pixels consistent with one mark.
- Pause visit order out-and-back [0,1,2,3,3,2,1,0]; all 8 measured pause
  durations in range.
- At mid-pause the visited station's brightness exceeds 0.9, others below
  0.7; its phase advances at OMEGA (rate 1.0), more than 2× a dim station.
- Path drag moves the wanderer toward the target without teleporting
  (per-step change within the 0.06/s cap) and resumes the schedule exactly
  after release plus the 3 s ease-back; identical drag sequences are
  byte-identical.
- Station drag holds the wanderer past the scheduled pause end with only
  that station bright; after release it resumes travel.
- Path still winding after drags; thumb byte-identical across two
  independent renders; forbidden-API grep 0 hits.

## Fix rounds

1. Probe-hook only, no behavior change: the probe read `dragKind` right
   after a pointer event, before the next frame redrew the hook, so it saw
   the stale value. Pointer handlers now publish `dragKind` to the live
   hook object immediately (syncHook). All 29 probes pass after the fix;
   thumb md5 unchanged by it.
2. Harness fix at first render: the render harness already declares
   top-level `W`/`H`, so the script's `W`/`H` collided. Renamed to
   `VW`/`VH` throughout the script; no behavior change.
