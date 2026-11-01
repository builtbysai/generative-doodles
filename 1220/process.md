# №1220 — Rotterdam Tower

Clint Enns study block CE5. Grounded in his Empire remake and his own reason
for making it: "Empire's unwatchability is the primary reason I felt compelled
to re-make it... to a generation raised on video games and YouTube videos,
14 minutes feels like 8 hours." A fixed-frame observation of a tower in a
low-fi game-engine aesthetic. The framing never moves. Nothing happens, on
purpose, beautifully.

## How it works

- **One fixed frame.** The tower — main slab, setback block, antenna — is
  built from flat-shaded boxes (front #6A6A72, side #565660, top #7A7A82)
  with a hard ground shadow thrown to the left whose length breathes slowly
  with the hour. Two lower neighbour blocks hold the skyline. No camera
  movement of any kind, ever.
- **The cycle.** Piece time runs on an 868-second cycle (14:28, his
  Rotterdam Tower runtime) mapped onto Liberty City time 8:06 PM → 2:42 AM
  (396 game minutes). All render state is a pure function of the cycle
  position u: sky step, window states, car schedule, clock.
- **The skybox.** The sky is flat engine faces, not a gradient: a main face,
  a top face, and a top-right face in three close tones, meeting at a hard
  horizontal seam at 12% of the height and a fainter vertical seam at 78% of
  the width. The seams are deliberate and stay visible. The tone deepens in
  four flat steps from dusk #3A4A7A to full night #0A0E1A by 21:30; 140
  seeded stars fade in with the darkness steps.
- **Windows.** The slab front carries an 8×20 grid, the setback 4×4, the
  neighbours smaller grids. Every window has a seeded lights-on time spread
  across the early evening (g = 4…130 game minutes), a 12% chance of never
  lighting, and a 40% chance of going dark again after 1 AM, so the lit
  fraction swells through the evening and thins toward 2:42 AM. Lit windows
  burn sodium orange #FF9E2C; about one in ten burns cool white #E8ECF0, a
  television. As the lit fraction grows, a flat orange wash pools at the
  tower's base — a trapezoid, no bloom.
- **The car.** The largest event the frame allows. Seeded crossings every
  50–90 seconds of cycle time (starts at u ≈ 14, 72, 155, 236, 312, 393,
  480, 564, 623, 717, 802), six seconds each, direction alternating, a dark
  block with two white headlight squares and two sodium taillight squares.
  The schedule was checked so no car is in frame at the first-frame phase.
- **The clock.** Bottom-left, monospace, on a dark backing: "LIBERTY CITY
  09:32 PM" format, stepping once per game minute (one game minute ≈ 2.19 s
  of piece time). It is the only text in the piece.
- **Scrubbing.** Dragging sideways scrubs time: the drag distance maps to
  cycle seconds (1 px = 0.8 s), previewed live while dragging and committed
  on release, so the cycle resumes from the scrubbed point. The tower does
  not move; only the light changes.

## Determinism and house rules

- The first frame is drawn synchronously at the fixed phase T0: u = 190 s,
  game time 21:32 — full night, stars out, roughly 55% of the tower windows
  lit (by construction ≈58%: lights-on times uniform over g = 4…130 give
  66% on by g = 86.7, less the 12% that never light), no car in frame. The
  animation loop is anchored as phase + elapsed-since-load; nothing is
  drawn from a wall clock minus an offset.
- All layout and lighting data derive from a seeded mulberry32 stream
  (seed 1220; car schedule from its own stream, seed 122001). No
  Math.random anywhere.
- Sizing comes from the Visual Viewport API with resize listeners on both
  the visual viewport and the window; the canvas CSS size is pinned in
  draw(). Phones are detected via window.screen physical size (min
  dimension < 700 px) with an aspect fallback (h > w × 1.15); the tower
  stays centered in the middle third at phone sizes.
- Silent: no audio at all. No gradients, no ctx.filter, no shadowBlur, no
  createElement, no ImageData/offscreen canvas, no microphone. The prompt's
  skybox gradient is rendered as flat faces with a seam, per house rules —
  the seam was the point anyway.
