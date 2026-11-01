# No.981 "Lobby Feed" — PP142, daito-manabe study #120

## Concept

The audience feeds the stage. Two lobby doors at the top corners of a dark
stage admit a perpetual trickle of visitor-dots, each in one of four muted
colors. A visitor drifts across the stage toward the tall performance frame
at the right; as it nears the frame's entrance it crosses the capture line
and a warm mint scan bar sweeps over it — a welcome, not a checkpoint. It is
then projected into the frame at human scale as a stick-figure dancer,
keeping its visitor color on its head and waist trim, and dances a seeded
phrase. The frame holds eight dancers. A ninth capture sends the
longest-resident dancer out with a bow: it bends at the waist inside a warm
amber glow, shrinks back to a dot, and drifts home to a door. The lobby
never empties; the cast is the crowd.

Interactions: tap a door to admit a visitor immediately; drag a captured
dancer to throw it into a 10-second center-frame solo (the rest of the cast
dims); double-tap to clear the stage — everyone bows out at once and the
doors send a fresh cast at a briefly accelerated rate.

## Construction

- **Sim.** Fixed-timestep 120 Hz simulation (visitors, scan phases, dancer
  phrase clocks, bow/exit phases), all randomness from one mulberry32 stream
  (seed 981142). Frame one is the synchronous draw after exactly 4800
  pre-roll steps (t = 40 s). Pointer input is queued as timestamped events
  and consumed in step order; nothing drawn ever reads a wall clock.
- **Visitors.** Spawn at alternating doors: an opening rush (intervals of
  4.2–6 s for the first seven spawns, the doors have just opened), then
  6.5–10 s. A visitor steers to a waypoint stage-side of the frame with a
  sinusoidal heading wobble, then approaches the entrance at 0.6 speed. When
  its perpendicular distance to the capture line falls under 24 px it is
  scanned (0.6 s mint sweep; it slows to 0.45 speed under the light). At the
  entrance it is promoted to a dancer, or queues at the entrance if the cast
  is full.
- **The herald (frame-one composition).** One visitor is injected at t = 26
  from the left door with reduced wobble; its speed is solved from the
  actual stage geometry (drift leg at full speed plus approach leg at 0.6
  speed, target: reach the capture zone at t = 39.75), so frame one catches
  its scan sweep mid-crossing at any viewport size — the same scripted
  first-cast device used elsewhere in the series. It is otherwise a normal
  visitor: seeded color, captured, dances.
- **Dancers.** Slots fill front-centre-out across two depth rows (back row
  at 0.82 scale on a raised floor line). The pose engine is closed-form per
  dancer: seeded sway/step/arm rates and phases drive torso lean, bob,
  alternating foot steps and lifts, and arm swings; one of three seeded
  styles per dancer (one arm held high, both arms up, neutral). Bows run a
  1.8 s envelope (waist bend plus amber glow), then the figure shrinks over
  1.2 s back to a dot and exits toward the nearest door, fading out.
  Capacity is enforced every step: a ninth standing capture starts the
  longest-resident dancer's bow.
- **Audio.** Lazily created on the first pointer gesture, typeof-guarded:
  a lowpassed brown-noise lobby bed; the scan is a 300→920 Hz sweep tone;
  each capture chimes on a pentatonic note mapped from the dancer's color
  (C5/D5/E5/G5); a bow gets a soft bandpassed-noise applause swell. All
  `Math.random` use is inside these audio buffers only (sound, never drawn
  state). The visual piece is complete in silence.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height
  pinned in px on every draw. Phone detection via `window.screen` minimum
  dimension under 700 px, aspect fallback only; on phones the frame takes
  the right 40% of the width. No gradients, shadowBlur, ctx.filter,
  offscreen canvas, external assets, or visible text beyond `<title>`.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png); the piece renders cleanly in
  silence.
- Determinism: thumb.png rendered twice and `cmp` byte-compared —
  identical; duplicate deleted.
- Sim audit at frame one (all three sizes, via the in-page state hook):
  5 / 4 / 4 dancers standing (one still in its 0.7 s enter at phone size),
  at least one visitor mid-stage, and at least one visitor inside the 0.6 s
  scan sweep at every size (two at phone size).
- Render read-back: dark stage; two archway doors at the top corners (door
  lintel drawn in #2A2F3A, a shade derived from the door tone, since the
  prompt asks for a lighter lintel without naming a hex); the dotted capture
  line running diagonally to the frame entrance; a visitor under the mint
  scan ring and sweep bar beside the entrance; the tall hairline frame
  holding stick-figure dancers with muted colored heads in varied dance
  poses on the floor line. Mobile: frame at the right 40%, dancers whole
  and legible, nothing clipped.
- Hygiene grep: no gradients, shadowBlur, ctx.filter, offscreen canvas,
  `Date.now`, external URLs, `fillText`, or em dashes in the file.

## Deviations

- The scan triggers inside a 24 px capture zone along the line rather than
  at an exact geometric crossing: the line ends at the entrance itself, so
  approach paths converge with it only at the endpoint; the zone is what
  makes the sweep readable as an event just before entry. Recorded here per
  house practice.
- The herald visitor (above) is a scripted opener in the series' tradition;
  without it, whether a sweep is visible in the frame-one still is a coin
  flip per viewport size.
- Spawn pacing uses an opening rush for the first seven spawns so the cast
  is established by frame one; the steady-state 6.5–10 s cadence is the
  specced one.
