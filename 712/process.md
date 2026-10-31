# No.712 Gnawed

EXPANSION #87 janine-antoni, prompt block 1 "Gnawed", taken verbatim from TASKS.md.
After Gnaw (1992): two 600-pound cubes, one chocolate, one lard, chewed by an
invisible mouth, the removed material reappearing as chocolate hearts and
lipsticks. No teeth, no mouth, no person, no text.

## Concept

Two heavy cubes sit on dark pedestals against a black ground, the chocolate on
the left, the lard on the right, each drawn as a flat grid of cells with a
shallow top face for weight. Over a 70-second watch-only loop the cubes are
gnawed: bites land one by one along their edges, concentrated on the edges that
face each other, and each bite pays out one small object into the tidy rows
below, hearts under the chocolate, lipstick tubes under the lard. Then the
cubes quietly restore, cell by cell, the rows fade, and the next cycle begins
with a fresh bite pattern. A tap skips straight to the next pattern. The
chewer is never seen; only the damage and the payout are visible.

## Construction

- Single self-contained index.html, canvas 2D, strict six-color palette from
  the prompt (chocolate #3A1F14, lard #EAD9B0, hearts #5A2418, lipstick
  #C1272D, pedestal #141417, background #0B0B0D). Scene composed in a
  1000 x 1000 design space scaled by the smaller viewport side, so the
  left/right cube placement holds at every size, phones included.
- Each cube face is a 16 x 16 grid of cells, drawn as individual rects inset
  by a hairline gap so the grid reads as structure and a missing cell reads
  as a clean gouge. A shallow parallelogram top face in the same color at
  reduced alpha gives the cubes their weight.
- Bite schedule: per cycle and per cube, a mulberry32 stream seeded from the
  cycle index lays out 16 bites. Bite times are drawn uniform in 3-38 s and
  sorted; anchors sit on the face boundary, weighted 55% to the inner-facing
  edge, then top (biased toward the inner half), bottom, outer edge, and the
  inner corners. A bite is a jittered disc of radius 1.7-3.2 cells around its
  anchor: cells in the inner half of the disc go in a second, deeper stage
  2-4.5 s after the rim cells, so each gouge visibly deepens. A cell claimed
  by several bites keeps the earliest time.
- Spawn coupling: bite i spawns item i at the moment its rim cells land.
  Items fill two rows of eight below their cube, hearts as bezier paths,
  lipsticks as a dark tube (hearts tone) with a slanted red tip. Items fade
  and grow in over 0.6 s, hold through the erosion, and fade out across the
  renewal window (50-64 s).
- Peeling pass: the raw bite discs can strand a cell, claimed only by a late
  bite while every neighbour went to an early one, leaving it floating at
  full opacity for seconds. The builder therefore replays all removals in
  time order and, whenever a removal would cut a group of cells off from the
  main mass (checked by flood fill after each step), pulls that group's
  removal time forward to the same instant. The surviving face is a single
  connected piece at every moment of the loop. Verified mechanically:
  occupancy maps sampled from forced renders at t=20 and t=30 show exactly
  one connected component per cube.
- Renewal: each removed cell has a seeded return start in 46-62 s and fades
  back over 4 s, so by 66 s both cubes are whole and the loop seam is clean.
- Determinism: all state is a pure function of (cycle index, phase). Frame
  one is the synchronous draw at cycle 0, phase 0 during the initial resize;
  the animation loop is anchored to performance.now relative to load and
  never reads a wall clock. rAF is typeof-guarded. An inert ?seed=tNN hook
  (read from location.search only) pins the clock for QA stills; it is not
  linked anywhere.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height pinned
  in px inside draw(); phone detection via window.screen physical size
  (min dimension < 700 px) with the h > w*1.15 aspect fallback. No audio,
  no microphone, no external assets, no visible text besides the title.

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Frame one at all three sizes: two whole gridded cubes on pedestals, spawn
  rows empty, nothing clipped; on mobile the pair keeps its left/right
  placement inside the tall frame.
- Forced-state checks (throwaway renders via the ?seed hook, read back, then
  deleted): t=30 shows both cubes mid-erosion, gouges concentrated on the
  inner edges, 9 hearts and 13 lipsticks already paid out; t=58 shows the
  renewal well advanced, cubes nearly whole with the last cells fading in,
  both rows complete at 16 items and fading.
- First t=30 check exposed the floating-cell artifact described above; the
  peeling pass was added, all renders redone, the byte-compare re-run, and
  connectivity machine-verified at two phases before shipping the build.

## Deviations

- The prompt's composition line puts the display rows low, under the cubes;
  they are placed below the pedestals rather than directly beneath the cube
  faces, so the hearts and lipsticks read as a separate display instead of
  debris at the cube's foot. Same palette, same coupling, tidier read.
- Renewal is staggered per cell instead of a uniform crossfade: the prompt
  asks for the cubes to "slowly restore" and the rows to fade; per-cell
  returns keep the restoration in the same cell language as the erosion.
- The lipstick tube body uses the hearts tone #5A2418, the palette's only
  dark warm solid, with the tip in the specced lipstick red; the palette
  offers no separate tube color.
