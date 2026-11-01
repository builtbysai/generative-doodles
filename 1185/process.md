# №1185 — Smoke Detector Choir

Jeff Kolar study block JK2, after Smoke Detector (2015), which "examines
the audible alarm tones that emanate from single station smoke
[detectors]" — one mundane device's vocabulary, scored. Twenty-four
detectors on a ceiling, and the only instrument any of them has is a
beep. The piece draws the beeps; it is silent by design.

## The choir

A rigid 6×4 grid of ceiling-mounted detectors seen from below: plain
white disks (#E8E6E0) on a dark ceiling plane (#101114), each drawn as a
rim and a center dot only — no branding — with a tiny red LED at its
lower right (dark #5A1A1A at rest). Faint panel seams (#1A1A1E) cross
the ceiling behind the grid. The grid never moves; the only motion in
the piece is light and rings.

Each detector keeps its own misaligned cycle: a period of 3–9 s in
0.25 s steps and a phase in [0, period), both drawn from one mulberry32
stream (seed 1185065, chosen so frame one reads as specced). Schedules
are closed-form — a detector's beeps are φ + kP on a 90 s loop, and its
state at any time t comes from its last beep b(t):

- **Beep.** When t − b < 0.18 s the LED burns #FF2B2B.
- **Ring.** A thin amber ring (#FFB300) expands from the disk for
  1.6 s, radius diskR × (1 + 5a/1.6) — reaching 6× the disk — with its
  alpha stepped down in five steps from 0.6.
- **Sympathy.** When a detector beeps, its four orthogonal neighbors
  blink faintly in sympathy: LED in #FF7B7B at 25% alpha for 0.3 s
  (derived from the neighbors' own last-beep ages, never stored).

## The phase lock

Once per 90 s loop, detectors (2,2) and (4,3) — grid columns/rows,
1-based — accidentally phase-lock. During loop time [52 s, 64 s) their
own schedules are suspended and both beep on one shared schedule,
52 + k·4.0 s (52, 56, 60), so their LEDs and rings fire in exact
unison. A small dim caption, "phase lock", sits at the bottom of the
ceiling for exactly those twelve seconds — the only visible text in
the piece. At 64 s each detector resumes its own period and phase;
there is a small phase jump at each seam, which is the accident
catching and releasing, and it is left in deliberately. Outside the
window the two voices drift through the choir like everyone else.

## The hand

Watch-only, with one interference: dragging across the ceiling covers
detectors with a hand-shadow (flat concentric alpha ellipses at the
pointer, no blur). A detector covered within the 1.0 s before one of
its beeps has that beep muted — the beep is skipped when computing
b(t), so no LED flash, no ring, no sympathy from it — and the disk
itself dims to 55% for 1.5 s after a cover. It is a hand over a sensor,
never a mute button: periods and phases cannot be set, and dragging
never repositions anything.

## Determinism

The first frame is drawn synchronously at a fixed phase, piece-time
56.12 s — inside the lock window, 0.12 s after the locked pair's
shared 56 s beep, so both LEDs burn and twin young rings are expanding
while the caption shows. (At exactly 55.00 s the pair would sit 3.0 s
past its 52 s beep with rings already dead; the frame is placed on the
shared beep instead — the schedule itself is exactly as specced.)
Seed 1185065 also puts two other detectors mid-ring in that frame:
№0 (age 1.38 s, a faint late ring in the top-left corner) and №10
(age 0.79 s). The animation loop is anchored as T0 + elapsed since
load and guarded by a typeof check on requestAnimationFrame; all
state — beeps, rings, sympathy, covers — is a closed-form function of
piece-time and the recorded cover list, never frame-integrated.

House rules throughout: canvas sized from the Visual Viewport API
with resize listeners on both visualViewport and window; canvas CSS
size pinned in fit(); phone detection via window.screen physical size
(min dimension < 700 px) with aspect fallback — the grid holds 6×4 on
phones, disks smaller. No gradients, no ctx.filter, no shadowBlur,
no createElement, no ImageData or offscreen canvas, no audio, no
microphone. Every circle is its own path with a moveTo before its arc.
