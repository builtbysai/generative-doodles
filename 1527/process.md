# No.1527 "Slowed Time" (bintou-dembele BD8, PP774)

Gallery date: 2006 · 03 · 18 (recorded here only, never drawn in the piece).

## Spec

A field of dancer-marks moving at normal, lively speed — quick steps, jumps,
spins. A slow-moving band of pale light drifts across the field from left to
right; wherever the band is, the marks inside it move at quarter speed, their
gestures stretched long and held, while marks outside keep their fast rhythm.
The band passes, the marks speed back up, and the band returns from the left
on its own slow schedule. Nothing else changes.

Palette: field near-black #16141c; fast marks brick #a34a2e and ochre
#c98f3d; slow band pale gold translucent #c9a86a at low opacity; slowed
marks bone #e0d6c0 while inside the band; ground faint #2a2630. No other
color. Composition: marks scattered across the whole field; slow band
vertical, wide, drifting horizontally; most of the frame stays dark.
Motion: watch-first, slow-band loop. Band drifts left to right over about a
minute, then resets to the left edge. Dragging along the band holds it in
place (the slowed scene holds longer); dragging it faster speeds its drift.
Drag never stops a mark, never slows the whole field, never adds a second
band.

## Build

Canvas 2D throughout. 14 articulated dancer glyphs (torso line + arm lines +
leg lines, no heads, no faces) on a jittered 5 x 3 grid, positions as
fractions of the field, colours alternating brick/ochre. Each glyph dances
in place: stepping legs, swinging arms, vertical hops, brief spins. Field
fills the viewport on phones; on desktop the composition is a centred
square over the same ground colour.

Loop: 60 s. The band is 0.25 of the field wide and its centre travels from
-0.125 to 1.125 of the field over one loop, so it covers any fixed mark for
exactly 12 s per loop. A mark's warped clock is real time minus 0.75 times
its covered time, so it advances exactly 51 s per loop; every dance uses
frequencies that are whole multiples of 1/51 Hz, so the frame at t = 60
(and t = 120) is byte-identical to t = 0. Frame one is phase-shifted 18 s
into the loop, so the band reads mid-field with slowed bone marks inside
it. The warped clock is snapped to a 1e-9 grid so the loop-end value lands
on exactly 51, 102, ... .

Band rendering is one flat translucent rectangle (rgba 0.14), never a
second band. Marks inside the displayed band are drawn bone; outside, their
fast colour. The faint ground line sits at 0.86 of field height.

Drag: pressing inside the band (with a small grab tolerance) grabs it; while
dragging, the band centre follows the pointer minus the grab offset, so
holding still holds the band in place and moving fast speeds its drift. On
release the band springs back to the scheduled drift with a 1.2 s
exponential decay. Drag state is a closed-form function of the recorded
drag events, never frame-integrated. Every drag session is logged (grab
offset, every pointer-move fraction with its piece time, release
time/offset), so the displayed band path is a pure function of piece time
and the event log.

## Deviations and readings

- FIX (gate round, 2026-11-01): the quarter-speed rhythm now follows the
  DISPLAYED band, not the schedule. A mark's warped clock is real time
  minus 0.75 times its DISPLAYED-band coverage, computed in closed form
  from the drag-session log: scheduled drift outside drags, piecewise
  constant during a drag (from the move log), and scheduled plus an
  exponentially decaying offset during spring-back (crossings found by
  deterministic bisection; the clamp never changes coverage membership
  because every mark's window lies strictly inside the clamp range).
  This supersedes the first build's reading, in which rhythm followed the
  scheduled band: fly's gate showed that build turning a mark bone under
  a held band while its clock still ran at full speed (tau diff 40.000
  over a 40 s hold, identical to the undragged control), so the slowed
  scene did not hold longer as the prompt requires. After the fix the
  same hold gives tau diff 10.000 at quarter rate with bone colour, a
  fast drag sweep slows the marks it covers, and after release the rate
  re-syncs to the schedule. With no drag sessions the computation falls
  back to the exact scheduled-coverage path, bit-identical to the first
  build, so no-drag loop closure (t = 60, t = 120 byte-identical to
  t = 0) and the shipped thumb are unchanged.
- Marks dance in place (steps, hops, spins) rather than travelling across
  the field, so each mark's base x — the quantity the band coverage is
  computed from — is also where the mark visibly stands. A glyph's limbs
  may reach a few pixels past the band edge; membership is by base x.
- Fully silent. No audio, no microphone, no text except the title. No
  gradients, no canvas fading, no offscreen canvas, no Path2D.
- A probe-only hook, window.__t27, exposes the band centre, field rect
  and per-mark state (position, colour, slowed flag, warped clock) for
  pixel sampling. It draws nothing and changes no behaviour.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x720 desktop,
390x844 mobile and 720x720 thumb; all three inspected personally, no
clipping. probe-1527.js (vm-isolated, real node-canvas, driving the
piece's own rAF loop) passes all checks: frame one identical across fresh
instances; loop closure at t = 60 and t = 120 byte-identical to t = 0; band
centre 0.25 at t = 0, 0.6667 at t = 20, 1.0833 at t = 40, -0.125 at t = 42
(reset), 0.25 at t = 60; warped-clock rate 0.25 inside the band and 1
outside, returning to 1 after the band passes; bone pixels at a covered
mark and fast-colour pixels at the same mark once uncovered; one single
band interval on a top scanline; drag hold keeps the band in place and
springs back on release; fast drag moves the band far faster than the
schedule; marks keep advancing during drags and the field never slows as
a whole. After the drag-rhythm fix, probe-1527.js passes all 27 original
checks plus 13 new ones: hold-drag gate test (mark at fx 0.1126 held under
the band from t = 0 to t = 40 advances tau by 10.000 at quarter rate with
bone colour, control advances 40.000 fast); fast-drag sweep (mark near
fx 0.5 dragged under the band from t = 30 to t = 40 advances tau by 2.5,
control by 10); re-sync (dragged rate matches scheduled rate over
[55, 65] after release, slowed flags agree) and determinism (identical
drag sequences byte-identical during the drag and after spring-back).
Thumb byte-compare: two independent 720x720 renders byte-identical
to the shipped thumb, and the re-rendered thumb after the fix is
byte-identical to the pre-fix thumb (no-drag path untouched). Forbidden-API
grep clean: no unseeded randomness, wall-clock timers, audio, microphone,
gradients or drawn text.
