# No.682 — Combarbalita Choir

EXPANSION #83 lachimuchina, prompt block 2. Lithophony on combarbalita, the
Chilean volcanic stone the ensemble carves with complex internal tubes,
walls and separations to make its signature flutes. Nine standing blocks,
each one a quiet instrument: struck, a block rings in light across its own
face and answers with a low stone tone. Idle, nothing moves at all. Stone
is still; only what is struck sounds.

## Concept

A 3x3 choir of monolithic slabs in pinkish-mauve stone on a deep dark
ground, centre two-thirds of the frame, each block tilted by a slight
seeded rotation. The faces are not textured; they are inscribed. Faint
carved lines suggest the hidden tube systems inside real combarbalita
instruments, winding channels, walls, dead ends, a small round mouth where
a channel begins. No two faces carry the same system. The interaction is
the mallet: tap to strike, tap twice quickly for a harder strike, drag
across the choir to play it as a sweep. The ring a strike makes expands
across the stone face and dies with mineral slowness, and the tone decays
on the same slow scale.

## Construction

- **Carved-line generation.** Each block's carving is built once from a
  seeded mulberry32 stream as a set of maze-walks on a 6x8 occupancy
  grid. A walk starts on a random free cell and steps only into
  unvisited orthogonal neighbours, so a channel winds and turns but can
  never cross itself or another channel; all walks on one face share the
  occupancy grid, so later channels stop at the walls of earlier ones,
  which is what gives the separations their carved feel. Walks run until
  the face reaches its seeded coverage target (0.30 to 0.68 of cells,
  drawn per block, so density varies and no two faces are alike). Paths
  are stored as centred fractions of block width and height with an
  inset margin, and drawn as faint single strokes in the carved tone
  with round joins, plus a small filled dot at each channel's start,
  the tube mouth. A walk that dies immediately leaves a lone dot.
- **Blocks.** Rounded-rectangle slabs, slightly taller than wide,
  occupying the centre two-thirds of the frame as a 3x3 grid that keeps
  its shape at every size. Fill tone alternates pink and mauve on the
  checkerboard, with a seeded chance (0.22) per block of swapping, so the
  alternation feels quarried rather than printed. Rotation is a seeded
  tilt of at most about 3 degrees. Hit testing inverts each block's
  rotation, so taps land where the stone visually is.
- **Strike/ring model.** A strike is recorded as {position in block
  fractions, anchored time, hard flag}. A second strike on the same
  block within 0.45 s is a harder strike. Rings are pure functions of
  the recorded strike times: radius eases out toward a maximum that
  covers the face, brightness decays exponentially with a time constant
  of 3.6 s (6.0 s for a hard strike), so the light dies with mineral
  slowness rather than a video fade. Each ring is drawn twice: a wide,
  dim afterglow ring in the afterglow tone trailing at 0.82 of the main
  radius, and the main luminous ring whose line narrows as it ages; a
  brief whole-face flash in the ring tone marks the impact moment. All
  of it is clipped to the block's rounded face, so the light radiates
  across the stone and never spills onto the ground. At most six strikes
  per block are kept.
- **Tone model.** Pitch is mapped to block index on a descending scale
  from 196 Hz (top-left) to 87.3 Hz (bottom-right), roughly F3 down to
  F2. Each tone is a sine fundamental with two inharmonic partials
  (2.74x at 0.38 gain, 5.43x at 0.13), the upper partials decaying
  faster than the fundamental, plus a 30 ms low-passed noise tick for
  the mallet's contact. A hard strike raises the gain (0.30 vs 0.19)
  and lengthens the decay (5.2 s vs 3.6 s). The AudioContext is created
  lazily inside the first pointer interaction and is fully
  typeof-guarded; there is no autoplay and no sound of any kind before
  a strike. Math.random appears only inside the contact-tick noise
  buffer, an audio waveform that is never drawn.
- **Clock and determinism.** Frame one is the synchronous draw at t = 0:
  nine still blocks, no rings, silence. It is never derived from
  Date.now. All ring motion is a function of strike times recorded on
  the anchored elapsed clock (first rAF timestamp is the anchor; event
  handlers read the last frame's time, the same convention as the
  neighbouring pieces). Canvas size comes from the Visual Viewport API
  with resize listeners on both visualViewport and window; the canvas
  CSS size is pinned in px inside draw() every frame. Phone detection
  uses window.screen min dimension < 700 px with the tall-aspect test
  as fallback; on phones the grid refits to the narrow frame and the
  carved line weight rises slightly so the channels stay legible. rAF
  is typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and compared with cmp: byte-identical; the
  second render was deleted.
- Visual read-back confirmed: nine pink and mauve monoliths with slight
  rotations on the near-black ground, each face carrying a visibly
  different carved channel system (dense mazes on some, a few long
  channels and lone tube-mouth dots on others), faint edge stroke on
  every slab. Mobile render keeps the full 3x3 grid centred and
  unclipped with legible linework. Frame one shows no rings and no
  text anywhere, as specced: the choir is silent until struck.

## Deviations

- None from the prompt. The palette is followed exactly, the interaction
  set is exactly tap / double-tap / drag-sweep, and idle is fully
  still. Audio exists only as the strike tones the prompt specifies,
  created lazily on the visitor's first tap per browser autoplay
  policy.
