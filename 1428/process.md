# №1428 "Doll Records, Twenty Seconds" (wolfgang-muller WM5, PP651)

## Prompt
A small green box, open, holding eight tiny records and a toy player with a
battery — the records doll-sized, the sound thin and crackly, each song twenty
seconds, then the needle lifts, clicks, and moves on. A booklet page leans
against the box, its text too small to read.

## Frame one (t = 0, verified at 1280×900, 390×844, 720×720)
Dark field. Green box center-frame, large, lid open behind it; a booklet
leans at the back-left, its "text" only tiny line marks, far too small to
read. Eight tiny records fan in a row inside the box; the first is ringed red
as the current record. A red toy player sits beside the box with a black
record, cream label, needle arm with a yellow tip, and a battery nub. Below,
a dark strip carries the playing record's waveform as a fine crackle line,
with eight marker dots beneath it (the current one red). No visible text
besides `<title>`. Nothing is full-size, and that smallness is the subject.

## Mechanics (all closed-form over piece time and recorded events)
- **Cycle:** 160 s seamless loop — eight records, 20 s each, in order. Every
  motif is periodic within its 20 s slot (all internal periods divide 20), the
  record spin is 0.5 rev/s (80 revs per loop), and the 128-entry crackle table
  divides the 1280 musical-time buckets, so t = 160 renders pixel-identical
  to t = 0 (probe-verified).
- **Micro-sequences:** chirp (rising blips), thump (low pulses), drone
  (slow two-tone hum), giggle (burst clusters), scrape (fast rasp), hum
  (steady tone), rattle (rapid ticks), sigh (falling swells) — each rendered
  as an animated waveform with seeded crackle noise on the strip.
- **Needle lift:** during the last second of each 20 s slot the arm lifts and
  a bright click tick flashes; the next record drops at the slot boundary.
- **Drag the needle** onto a different tiny record: that record plays from
  the drop, for at most 20 s of wall-clock time, then the schedule resumes —
  a record never plays longer than twenty seconds, however it is handled, and
  never repeats (the cycle always advances).
- **Drag the player** vertically: motor speed 0.5–1.6 (down faster, up slower).
  Speed scales the waveform phase and record spin through a closed-form
  musical-time function of the drag-event list; the crackle line thickens as
  the motor slows (probe: strip light pixels 185 at speed 1.0 vs 244 at
  speed 0.5). The 20 s slot cap is wall-clock, so slowing the motor never
  extends a play.
- **Silent by design:** the thin sound is visualized only, as the fine crackle
  line. No AudioContext, no getUserMedia, no autoplay anything.

## Study-wide rules
Touch/drag, never click-to-reload. The absence stays absent: no hi-fi sound,
no normal turntable, no full-length song, no record on repeat, no resolved
pop object — only a toy that plays twenty seconds at a time.

## House-rule compliance
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; on narrow screens the player stacks below the box
  instead of beside it (no clipping at 390 wide); page ground is the piece's
  own background color.
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all randomness
  from mulberry32 (seed 1428000 + index·7919), never Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  fillText/strokeText, localStorage, or audio APIs. Fading alphas rounded to
  4 decimals; dots as filled rects or own-beginPath arcs (node-canvas quirks).

## Fix rounds
1. **Booklet hidden:** the booklet first sat almost entirely behind the box,
   showing only a corner. Moved left so it leans visibly at the back.
2. **Fan crowding the box edge:** the record row first sat on the box's
   bottom border. Raised so the fan sits fully inside the box.
3. **Loop-closure branch flip:** the first chirp blip ended at full amplitude
   (sin 2.5π = 1, then a hard drop to 0), so at t = 160 a floating-point
   rounding flipped the blip on where t = 0 had it off — 192 strip pixels
   differed. Rewrote the blip with 2 full cycles so it tapers to exactly zero
   at its end. The rattle's step ticks had the same latent flaw (a strip
   sample lands exactly on a tick edge), so ticks became triangular pulses
   tapering to zero at their edges. After both fixes, t = 160 is
   pixel-identical to t = 0, and all other probes still pass.

## Verification (forced-time probe harness, vm-isolated instance, stubbed rAF
driving the piece's own loop, pointer events to its own listeners)
- Two fresh instances byte-identical at t = 0; thumb byte-identical across
  repeated renders, including a final re-verify after the last fix.
- Schedule: marker 0 red at t = 0, marker 1 red at t = 25.
- Needle lift: yellow tip present at its rest point at t = 10 (46 px),
  gone at t = 19.5 (0 px, arm lifted).
- Needle drop: grabbing the needle at the inkpad side and dropping on record
  5 makes marker 5 red at t = 10; at t = 26 (21 s after the drop) the schedule
  has resumed with marker 1 red — the 20 s cap holds.
- Motor drag: dragging the player up to speed 0.5 thickens the crackle
  (strip light pixels 185 → 244).
- Loop: t = 160 pixel-identical to t = 0.
- Token scan clean (the single "Math.random" hit is a comment stating it is
  never used).
