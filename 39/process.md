# №39 · Pendulum Web - process notes

## Concept
A double pendulum integrated with a fixed timestep, so every run
is reproducible. Its tip leaves a single fading trace: a woven web
that builds for about one cycle, fades, and redraws. The arm and
bobs stay visible in warm white, the pivot is gold, the trace pale
cyan on deep indigo. Drag to set the release angle of the first
arm; on release the piece lets go from that angle and keeps
looping. Spec: BATCH-36-40-SPEC.md.

## Construction
- Single self-contained page, canvas 2D, no libraries. Physics at
  240 steps per second with the standard double-pendulum equations;
  the sim pre-rolls deterministically at load so the first frame
  already holds a web. Simulated time advances in fixed steps
  only, never by frame dt.
- Visual Viewport sizing; canvas pinned by style; centered
  composition, page ground is the piece's own indigo.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing; enumeration contents verified against
  the generation order (No.37 was iterated once: diagonal skylines
  replaced by true staircases). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `39/index.html`, `39/thumb.png` (720x720, rendered from the live script), `39/process.md`. Gallery entry added to pieces.json with the formula date.
