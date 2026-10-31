# No.547 — Door, Three States

EXPANSION #66 cristina-daura, prompt CD3. Her doorway lexicon: a door is
closed, open, or smoking, and the state is the whole story.

## Concept

A rolling landscape of dark domes, walls, and hills on a flat yellow
ground. Six masses overlap across the frame, and each holds one tiny
arched door, 6–7% of the canvas height, in one of three states:

- CLOSED — a flat blue door, shut.
- OPEN — the door ajar on its hinge, flat red-orange glow inside.
- SMOKING — open, with a thick white smoke plume pouring out.

A black cat sleeps curled on the first dome; a green bush grows over the
wall. Tap a door to cycle its state (closed → open → smoking → closed)
through a flat wipe. Drag horizontally and the wind picks up: smoke
plumes bend downwind and the bush leans. Nothing else moves except the
cat's breathing.

## Construction

- Single self-contained `index.html`, canvas 2D, 1080-unit design space,
  square stage centered via the Visual Viewport API (resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw).
  On phones the stage spans the full width and the yellow page ground
  makes the letterbox invisible.
- Palette is exactly the prompt's: ground #FFC81A, masses #0E3B36,
  closed doors #1B6FD6, open glow #FF5A1F (a flat fill, never a
  gradient), smoke #FFFFFF, cat #111111 with #FFD400 eyes, bush #1E8A6B.
  Masses get a heavy black outline in her manner so overlapping shapes in
  one colour stay distinct. No gradients anywhere.
- Doors are a per-door state machine; they never change size or
  position, only state. State changes run a 0.35 s flat wipe: the old
  state holds the left of the doorway while the new state sweeps in
  under a clip. Tap vs drag is separated by movement (8 px) and duration.
- Smoke is seven stacked flat white ellipses per smoking door, rising
  with wrap-around on a shared 6 s loop, radii growing with height,
  seeded per-puff jitter. Wind is a single lerped global factor driven
  by horizontal drag; it bends plumes (offset grows with rise height)
  and leans the bush, then settles back to zero on release.
- The cat breathes with a stepped 2-frame scale bob (1.6 s toggle).
- Determinism: mulberry32 seeded RNG (547066) fixes the initial door
  states (a shuffled bag of two closed, two open, two smoking), plume
  phases, and puff jitter. Frame one is drawn synchronously at the
  constant phase PHASE0 = 3.7 s; the rAF loop (typeof-guarded) is
  anchored as PHASE0 + elapsed and never derives frame one from the
  clock. No audio, no microphone, no external assets.

Initial door states, left to right (dome, wall, dome, hill, front dome,
front wall): SMOKING, SMOKING, OPEN, OPEN, CLOSED, CLOSED.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), and 720×720 (thumb.png). Thumb rendered twice and
  byte-compared with cmp: identical; the duplicate was deleted.
- Desktop/thumb read-back: six dark masses with black top outlines on
  yellow; two smoking doors with full white plumes, two open doors
  showing the flat orange interior beside the ajar blue panel, two
  closed blue doors; sleeping black cat with ears, curled tail, and a
  yellow closed-eye arc on the first dome; green bush over the wall;
  "tap" hint subtle at bottom right in ground-yellow over the teal hill.
- First pass had the cat at 1.0 scale, where it read as an ambiguous
  black blob; it was enlarged to 1.3× around its base point and now
  reads clearly at thumbnail size. Renders redone and the byte-compare
  re-passed after the change.
- Mobile read-back: stage spans the full 390 px width, centered
  vertically on the yellow ground, all six doors and both plumes
  visible, cat and bush unclipped, hint legible.
- Deviations from the prompt: none of substance. Two notes: (1) doors
  are drawn after all masses, so a back door can overlap a front mass's
  crest line by a few pixels where their silhouettes cross; this keeps
  every door fully visible and tappable, and reads as layering rather
  than error. (2) The open-door glow is a single flat #FF5A1F fill, per
  the no-gradients rule.
