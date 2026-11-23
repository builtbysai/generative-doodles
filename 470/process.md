# №1543 "The Binder, Open" (arthur-jafa AJ8, PP790)

Gallery date: 2006 · 04 · 03 (formula date; recorded here only, never drawn in the piece).

## What it is

A dark field (#0d0c10) showing an open binder: two equal pages side by side
(pages dark warm grey #26221e with a center seam #3a352e), each holding a small
arrangement of clipped abstract marks. The binder is centered with generous
dark margins on every screen size. Marks are small against the pages, never
filling them. No readable text anywhere; no likenesses, no faces, no real
names (study sensitivity guard: mechanisms only — pairing and sequencing —
abstracted to marks and geometry).

## Spreads and the pairing rule

Six spreads, each with a declared pairing. The pairings are the point: marks
sit beside each other because their shapes rhyme or their colors answer each
other.

- S0, outline round: left disc (bone) + ring (silver); right wheel (bone) + dots (silver).
- S1, outline straight: left bars (teal) + grid (bone); right grid (teal) + bars (bone).
- S2, outline pointed: left totem (ochre) + zigzag (red); right zigzag (ochre) + totem (red).
- S3, color bone–ochre: left ring (bone) + dots (ochre); right disc (ochre) + ring (bone).
- S4, color red–teal: left tire (red) + bars (teal); right bars (teal) + grid (red).
- S5, outline round: left wheel (silver) + disc (bone); right tire (silver) + ring (bone).

Each spread uses exactly two colors. Mark kinds: disc, wheel, ring, tire
(thick ring with tread ticks cut in page color), bars, grid fragment, totem
(stacked triangles), zigzag, dot cluster.

## Loop

Watch-first spread loop, 133.892 s super-loop: 2 cycles × 6 spreads. Spread
holds are 8–15 s each (seeded values 8.722, 14.553, 9.614, 14.600, 10.794, 8.009,
11.753, 8.108, 14.498, 11.330, 8.815, 13.096). Cycle orders are seeded
permutations: cycle 0 = [5, 0, 4, 2, 3, 1], cycle 1 = [3, 2, 0, 4, 5, 1] — the
orders differ, so no cycle repeats the same order. Spread changes are instant
state swaps on a timer, never a page-flip animation.

## Interaction

- Dragging on a page (press on empty page area) turns to the next spread
  early for that page only: the other page stays, then follows on the next
  scheduled cut, when both pages resync to the scheduled spread.
- Dragging a clipped mark slides it a short distance within its page (drag
  offset clamped to 0.10 of page width and to the page bounds with margin).
  The mark stays on its page; a far drag clamps inside the page and never
  moves the mark to the other page.
- Mark offsets are tied to a display epoch (scheduled cuts + page advances
  for that side), so offsets reset when the spread changes.
- Drag never animates a page flip, never moves a mark to the other page,
  never rearranges a spread.

## House-rule adaptations (documented)

- The prompt's "order re-randomized each cycle" is adapted to a seeded
  mulberry32 stream (seed 1543000) advancing per cycle, never Math.random,
  so every cycle index is reproducible and the loop closes exactly.
- Canvas 2D only; all motion closed-form over piece time and recorded
  events, never frame-integrated state. Fixed-phase first frame = draw(0);
  the rAF loop is a plain function declaration anchored as offset +
  elapsed-since-load. Fully silent (no AudioContext at all, no microphone).
- Flat colors only, never gradients. Dots as filled rects; arcs always
  preceded by moveTo. Canvas state set explicitly in every draw branch.
- Viewport from the Visual Viewport API; canvas pinned in draw(); phone
  detection via window.screen with aspect fallback. The binder is a centered
  geometric composition on all sizes, so the page ground (near-black) fills
  the frame on tall phones.

## QA

- probe-1543.js: 33/33 pass (vm-isolated, real node-canvas, driving the
  piece's own rAF loop). Frame one identical across instances; loop closure
  byte-identical at t=LOOP and t=2×LOOP; 12 slots with holds in [8, 15] s;
  each cycle contains all 6 spreads once and the orders differ; exactly six
  spreads occur; cuts instant (only 2 distinct frames across a boundary at
  fine sampling); every spread satisfies its declared pairing with 2 colors;
  binder centered with equal pages, a seam, and generous margins; marks small
  and inside their pages; page drag advances only the pressed page and
  resyncs on the next cut; press on a mark does not advance the page; mark
  drag slides only that mark by the drag delta; far drag clamps inside the
  page; offsets reset on the next cut; identical drag sequences
  byte-identical.
- Renders inspected personally: desktop 1280×720 and mobile 390 wide both
  show the centered binder, two equal pages, center seam, small clipped
  marks, generous dark margins, no text, no clipping.
- Thumb byte-compare: two independent 720×720 renders byte-identical to the
  shipped thumb.
- Forbidden-API grep: 0 hits (Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage, gradients,
  fillText, strokeText).

## Fix rounds

None. No piece fix rounds; no probe-side corrections needed.

## Deviations from the prompt

None beyond the documented house-rule adaptations above. One recorded
reading: the page-advance drag triggers on press over empty page area (a
press on a mark grabs the mark instead), so the hold-while-pressed and
advance behaviors stay consistent and testable.
