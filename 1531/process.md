# №1531 "Grain From Inside" (mohamed-bourouissa MB4, PP778)

Gallery date: 2006 · 03 · 22 (recorded here only, never drawn in the piece).

## What it is

A dark warm-grey field (#2a2622) rendered in coarse grain throughout:
big visible pixels, halftone dots, low resolution on purpose. Inside the
grain, two small groups of three muted-bone (#cfc8b8) abstract marks —
simple torso-line glyphs — stand left and right of a wide empty gap,
divided by a barely visible line (#3a352e). Tiny bright amber (#e8b04b)
rectangles (messages) travel slowly across the gap, one at a time,
alternating direction, each leaving a faint (#5a5348) afterimage trail
that fades with age. Messages cross the line; marks never do.

Loop: 60 s, five messages per loop, one every 12 s (launches at
loop-local 4, 16, 28, 40, 52 s), each crossing taking 6 s. Even messages
travel left-to-right, odd ones right-to-left; the sender cycles through
the marks so each mark sends every 6 messages. Frame one (t=0) is idle:
no message travelling, grain and both groups present.

## Interaction

- Press-and-hold on a travelling message: while held, that message's
  clock runs double, so it hurries across the gap; on release the boost
  freezes. Drag never stops the system, only that one message hurries.
- Press on a mark: that mark holds up its next message by one beat
  (4 s). Only that mark's next send is delayed; its later sends and all
  other marks' sends stay on schedule.
- Drag never moves a mark across the line, never clears the grain,
  never speeds the whole system.

## Adaptations (documented, per the brief)

- The prompt's offscreen-canvas pixelation pass is unavailable in the QA
  renderer, so the grain is a precomputed seeded dot field drawn
  directly at chunky resolution: a 12 px grid (14 px on phones) where a
  coordinate hash decides black (#0e0c0a) or pale (#4a453c) 4 px dots
  plus occasional 9 px blocks. The hash is a pure function of cell
  coordinates, so the grain is identical in every instance and never
  changes. Afterimages are stored past positions drawn explicitly,
  never a fade wash over the frame.
- All motion is closed-form over piece time and recorded drag events:
  delay shifts are counted from the recorded press list, hurry boosts
  from recorded press-and-hold sessions (overlap of the session with
  the message's travel window). Nothing is frame-integrated, so the
  same drag sequence in two fresh instances is byte-identical.
- Per-cycle variation uses a seeded mulberry32 stream (seed 1531000)
  fixed at build time for mark jitter only. No unseeded randomness.
- Flat colors only; fading alphas are literal values (0.35 / 0.22 /
  0.12), never computed into scientific notation. Dots are filled
  rects. Fully silent: no audio of any kind.
- Field-like composition: full-bleed on all sizes, page ground the
  field's own color. Canvas from the Visual Viewport API, pinned in
  draw(); phone detection via window.screen with aspect fallback.
- No visible text except the title element. No likenesses, no faces,
  no real names, no readable text: the piece is about the mechanism
  (grain, messages across a line) only, per the study sensitivity guard.

## QA

Rendered with render-piece.js (node-canvas): desktop 1280x720 and
mobile 390x844 inspected personally — coarse grain everywhere, two
mark groups, wide empty gap, faint dividing line, no clipping on
either size. Thumb 720x720 rendered twice, byte-identical.

Probes (probe-1531.js, vm-isolated, real node-canvas, driving the
piece's own rAF loop): 29/29 pass, no fix rounds. Frame one identical
across fresh instances; loop closure at t=60 and t=120 byte-identical
to t=0; at most one message active at any sampled time; 5 messages
per loop with alternating directions and senders cycling through the
marks; message active at t=5 (p = 1/6) and gone at t=10; trail of 3
entries mid-travel with decreasing alphas, empty at travel start;
grain in all four quadrants at t=0/15/30/45 plus grain pixels counted
in a mark-free corner region; marks never cross the dividing line;
held message ahead of control (p 0.5 vs 0.833 at t=7, x ahead by more
than 20 px); mark press delays only that mark's next message by
exactly 4 s (absent at base time 28, launching at 32; k=3 and k=8
unaffected); dragged instance keeps marks on their sides, grain
counts identical to control, non-delayed message travel unchanged;
identical drag sequences byte-identical at t=35 and t=50; thumb
pixels match the harness frame-one render.

Forbidden-API grep on index.html: 0 hits (no unseeded randomness,
wall-clock timers, audio, microphone, gradients, or drawn text).
