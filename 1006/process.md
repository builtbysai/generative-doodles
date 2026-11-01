# No.1006 — No Markers. Just Seeing.

Study #123 yuya-hanai, PP167 "Markerless" — the 2021 Fencing Tracking and
Visualization System evolution: detection with no markers at all. The piece
is the seeing, not the seen.

## Concept

A simulated camera feed fills the frame: dark, grained, vignetted. Three
fast movers cross it as bright white streaks, too fast to read clearly,
carrying no markers and getting no help. A detector watches them. Each
object gets a thin amber box, drawn from the detection of two detector
frames ago, and its detected path synthesizes behind it as a glowing cyan
trajectory. The detector is imperfect on purpose: at speed, and near the
edges of the feed, it loses objects for a few frames. The box turns red
and freezes at the last known position while the object flies on without
it; the trajectory breaks where the track broke. Then the system
re-acquires, and the recovery is the point. A tiny readout, TRACK x.xx,
bottom-left, reports the mean track quality of the system: it dips when
objects are lost and recovers when they are found. Nothing here is a
crosshair. The boxes are the system's attention, not a weapon.

## Construction

- Fixed-timestep simulation at 120 Hz (dt = 1/120), seeded with
  mulberry32 (seed 1006052). Frame one is the synchronous draw after
  exactly 2400 pre-rolled steps (20 s of shift already worked). No
  wall-clock input reaches any drawn state; grain and box jitter use a
  separate integer hash of (cell, time bucket), never the sim rng and
  never Math.random.
- Objects: ballistic agents with seeded sinusoidal steering, each with
  its own cruise speed (0.62-1.05 units/s) that the integrator relaxes
  toward. A soft spring wall inside the frame edge bends flight back
  toward mid-frame, so exits are earned by momentum; an object that does
  leave is replaced by a fresh one entering from a seeded edge. The wall
  is a tuning device, recorded here: without it, objects exited every
  few seconds and the trajectories could never accumulate.
- Detector: runs at 60 Hz (every 2 sim steps). The box renders the
  position from 2 detector frames in the past (4 sim steps), with a
  small hash-jittered size, so the lag of machine vision is built into
  every frame. Tracked positions are appended to a per-object trajectory
  buffer (8 s memory, age-faded, drawn in two passes for the glow).
- Dropouts: on each detector tick, a tracked object rolls against a risk
  built from a small base rate plus terms for excess speed and for
  proximity to the feed edge. A loss lasts 3-10 detector frames: the box
  freezes red, no trajectory points are recorded (so the cyan line
  genuinely breaks), and the object's quality decays. Re-acquisition
  snaps the box back to the lagged position with a brief expanding
  flash ring.
- Confidence: each object carries a quality value (starts 0.72 on a
  fresh track, decays at 1.2/s while lost, recovers at only 0.12/s
  while tracked, because a track that was lost is trusted less for a
  while). TRACK is the plain mean over live objects, formatted to two
  decimals. It is computed from the sim's track states and nothing else.
- Feed look: grain is ~560 (340 on phones) seeded specks rehashed 8
  times per second at 0.05-0.10 alpha; the vignette is three layered
  flat-alpha ellipses per corner. No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas, anywhere.
- Interaction: tap an object to lock it: its box turns mint (#7DF9C6)
  and the system holds its gaze for 10 s with no dropouts. Drag to
  throw: a new object launches along the drag vector and enters
  untracked; the detector needs ~0.3 s to acquire it. Double-tap starts
  a new shift (seed + 1, trajectories cleared). At most 6 objects.
- Audio: created lazily inside the first pointer gesture, fully
  typeof-guarded. Per-object band-passed noise whooshes pitched by
  speed; a lock-on blip on acquisition, a falling tone on loss, a rising
  tone on re-acquisition. Audio events are only emitted after the
  initial pre-roll, so the piece is complete and silent in QA.
- Sizing: canvas comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection via
  window.screen (min dimension < 700 px) with the h > w*1.15 aspect as
  fallback only. Page ground is the feed tone; the feed always fills
  the frame and the readout stays bottom-left.

## QA log

- Seed scan (80 seeds, state probed at step 2400): chose seed 1006052
  for a frame one with one object mid-loss (red frozen box), rich
  trajectories (~1400 detected points in memory), 6 honest trajectory
  gaps, and TRACK 0.89.
- Renders via node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720). All render cleanly in silence; listeners registered:
  vv:resize, win:resize, canvas:pointerdown, canvas:pointerup.
- Determinism: thumb.png rendered twice and cmp byte-compared:
  identical. The duplicate render was deleted.
- Read-back, all three sizes: dark grainy feed with softened corners;
  three white streak objects; two thin amber boxes riding their
  (lagged) objects; one red box frozen at top right with its object
  already escaped beyond it and its cyan trajectory stopped at the
  box, which is the miss drawn honestly; cyan trajectories web the
  frame with visible breaks; "TRACK 0.89" tiny mono gray bottom-left;
  nothing clipped on mobile.
- Tuning history (three rounds before the scan): containment raised
  from a weak centering nudge to the spring wall after objects churned
  through respawns too fast to accumulate trajectories; dropout risk
  rebalanced twice (an edge term that fired constantly along the
  containment wall, and a speed term that dominated for fast cruisers,
  both produced a dashed, unusable track web); quality recovery slowed
  from 0.5/s to 0.12/s after the readout sat pinned at 1.00.

## Deviations

- Detector lag is implemented as 2 detector frames (the detector ticks
  at 60 Hz inside the 120 Hz sim, so the box trails by 4 sim steps,
  about 33 ms). This keeps the brief's "2 frames late" literal at the
  detector's own frame rate while staying visible.
- A lost box freezes red at its last position rather than vanishing;
  the brief offers either, and the frozen box next to the escaped
  object is the clearest statement of the miss.
- The confidence is a system-wide mean rather than per-object readouts;
  the brief specifies a single tiny readout.
