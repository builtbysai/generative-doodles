# No.967 - Seeing Voices

Study #118 lauren-lee-mccarthy, PP128 "Seeing Voices". The prompt-as-score
mechanism: an inner voice, drawn only as pulsing violet rings, steers a small
white avatar through a seeded maze toward its center. The walked route stays
behind as a thin cyan thread, the memory. Occasionally the voice disagrees
with itself: the rings split into two red-edged sets, the avatar hesitates,
then the voice re-converges and the walk resumes. No words anywhere. The
moment the voice spoke, it would be a chatbot; here it stays a presence,
neutral and a little creepy.

## Concept

- A 21x21 recursive-backtracker maze (a perfect maze, so exactly one route
  connects any two cells and the center is always reachable) fills the frame
  on mind-dark #07080C, walls #23262E.
- The avatar walks cell center to cell center at 1 cell per second (about
  34 px/s at the 720 px gallery size). Three concentric violet rings float
  just ahead of it, roughly three times its size, pulsing on a 3 second cycle
  (alpha 0.4 to 0.9, radii swelling about 10 percent).
- Every pulse is the voice steering: at each junction the avatar takes the
  neighbor with the smallest BFS distance to the center, with a seeded
  20 percent chance of a non-best neighbor (wander). The remembered path is
  recorded every 3 sim steps and fades over 10 minutes.
- Disagreement: on a seeded schedule (every 40 to 70 seconds) the rings
  split for about 6 seconds into two offset ring-sets with red edges; the
  avatar slows to 45 percent speed, jitters, and chooses junctions unguided.
  On re-convergence the BFS-true steering resumes, so a split can delay the
  avatar but never trap it. Reaching the center flares the rings once, then
  a new mind begins: new maze, cleared thread, avatar at a fresh corner.
- Interaction: TAP whispers a suggestion (the voice steers toward the tapped
  cell until it is reached). DRAG is doubt: it forces a 10 second split.
  DOUBLE-TAP starts a new mind. Sound, only after a first gesture: a very
  low hum bed, a soft sine ping per pulse whose pitch rises as the avatar
  nears the center, two detuned pings beating during a split, resolving to
  unison on re-convergence.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Fixed-timestep simulation at 120 Hz driven by a mulberry32 stream seeded
  from the piece number, so the whole monologue is deterministic per seed.
  Frame one is the synchronous draw after exactly 3600 pre-roll steps
  (30 seconds in: mid-maze, thread already threaded through the lower
  corridors, rings pulsing around the avatar).
- Maze generation, BFS distance fields, junction choices, split scheduling
  and the hesitation jitter (a deterministic hash noise, not the RNG stream)
  all live inside the step function. Pointer events are queued with sim
  timestamps and consumed in order by the live loop; nothing drawn ever
  depends on the wall clock.
- The trail is drawn in 10 age bands so its 10 minute fade costs 10 strokes
  per frame regardless of length. Walls are one batched stroke.
- Layout: canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw() every
  frame; the square stage centers in the frame and the page ground is the
  piece ground. Phone detection via window.screen (min dimension under
  700 px) with the tall-aspect fallback, per house rules. AudioContext is
  created lazily inside the first pointerdown and typeof-guarded; the rAF
  loop itself is typeof-guarded, so the QA renderer (no rAF, no audio)
  draws frame one in silence.
- Palette is strict: ground #07080C, walls #23262E, avatar #F5F2EA, rings
  #B87AFF, split edges #FF3B3B, remembered path #4FD6FF at 0.5 alpha. The
  ring color crossfades violet to red with the split amount. No gradients,
  no shadowBlur, no ctx.filter, no offscreen canvas.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All
  render cleanly in silence; listeners registered as expected.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Desktop and thumb: the maze fills the frame; the avatar sits mid-maze in
  the lower-center region with the three violet rings around its leading
  edge; the cyan thread traces its route from the bottom-right corner
  through the southern corridors. Mobile: the square stage centers in the
  tall frame, maze, thread and rings intact, nothing clipped.
- Steering model, stated plainly: junction turns execute BFS guidance
  toward the current goal (center, or a tap-whispered cell), refreshed at
  every junction; the 3 second pulse cycle is the voice's visible and
  audible beat and the cadence the guidance commits on. Wander and split
  choices draw from the same seeded stream as the maze.
- Deviations from the prompt text, with reasons:
  1. Avatar speed is defined as 1 cell per second rather than 34 px per
     second, so the walk is resolution-independent; at the 720 px gallery
     size (cell about 34 px) the two agree.
  2. A forced split from a drag begins on release of the drag and runs
     10 seconds, instead of splitting mid-drag; the visitor's gesture stays
     a single readable event for the event queue.
  3. A tap-whispered suggestion expires after 25 seconds if the avatar has
     not reached it, so a whisper cannot hijack the monologue forever; the
     prompt sets no expiry and the walk must always resolve to the center.
  4. During a split the voice's two ring-sets are drawn in the red of the
     disagreement (violet crossfading out with the split amount) rather
     than violet rings with red edges only; at ring scale the two readings
     are indistinguishable and the crossfade keeps the split smooth.
