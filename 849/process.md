# №849 Half Out of the Dark: process notes

IA3 / PP1249, study #261 iso-attrill. Watch-only. Gallery date 2004 · 05 · 09
(2002-01-10 + 850 days). Gallery note: "Half a face emerges from near-total
black, one wide eye catching the light. Watch only."

## Motion model (closed-form, deterministic)

- Cycle: 90 s. Push e(t) = 0.30 + 0.55 * (0.5 - 0.5*cos(2*pi*t/90)).
  e = 0.30 at rest (t = 0, 90), 0.85 at the peak (t = 45). The face
  translates right by (e - 0.30) * 0.10 * U as it pushes out, and the
  curtain edge sits at x = (0.30 + 0.28*e) * U, sliding right with the
  push. Even at peak only half a face is drawn and the curtain still
  covers its right edge, so no full reveal is possible at any phase.
- FIRST_T = 15 s: push e = 0.4375, face partway out, eye open.
- Eye blink: fixed 14 s schedule, 0.4 s closed (t mod 14 in
  [13.4, 13.8]), smooth sine close/open. The eye holds open far longer
  than comfort allows. Open at FIRST_T.
- Darkness breathing: radial vignette plus six fixed curtain folds
  (seeded table, mulberry32 seed 849) swaying on closed-form phases,
  and nine faint motes pulsing on fixed phases. No Math.random() anywhere;
  all seeded values come from fixed-seed mulberry32 tables.
- rAF loop anchored as FIRST_T + elapsed-since-load; one synchronous
  frame drawn at load; rAF guarded by typeof check. No audio (none
  earned here; silent build per batch spec). No click-to-reload, no
  pointer listeners at all (watch-only). No em dashes in visible copy.

## Palette

- Ground / darkness: #070605, deeper dark #050403
- Skin highlight: #D9B28F, skin mid #A97F5F, skin shadow #6B4A34,
  skin deep shadow #3A2418
- Hair: #100C0A; eye white #E8DDCB, iris #2E1C12, pupil #0A0705,
  catchlight #F5EAD6; lip hint #5E3A2C; caption warm grey #C4B6A4

## Time probes (render-piece.js ?seed= virtual clock, 1280x900)

- t = 0 (md5 9ea15497db397e79a4fdf2f5a29918db): push e = 0.30, face
  deepest in the dark, curtain at 0.384 U, eye open.
- t = 15 = FIRST_T: face partway out (e = 0.4375), curtain at 0.4225 U,
  eye open. (Desktop/mobile/thumb renders at this phase.)
- t = 45 (md5 a567f71fcb07d77a6cc196a518c47764): push peak e = 0.85,
  face furthest out, nose bridge now visible past the curtain edge at
  0.538 U. Still only half a face: one eye, one brow, hint of mouth,
  no second eye, no full reveal.
- t = 13.6 (md5 9344089e9f2afb2fe517adb0b9b840e3): mid-blink, eye closed
  to a slit with a small glint. Blink schedule confirmed working.
- All probe frames differ in push amount while the composition holds.

## QA

- Renders inspected: desktop 1280x900, mobile 390x844 (square face
  frame centered in the portrait stage, ground the same near-black),
  thumb 720x720. All pass.
- Thumb rendered twice, byte-identical (md5 9ee43e32c56b83da74f3d7df4c282ac6).
- Fix rounds: 1. Round 1: breathing motes were too large and bright and
  read as dust spots; shrunk radius (0.004-0.014 U to 0.003-0.008 U)
  and dimmed alpha (0.05-0.13 to 0.03-0.08). Re-rendered and re-gated
  everything (desktop, mobile, thumb x2, all four time probes).

## Known warts (minor)

- At peak push (t = 45) the face fragment's own right edge is just
  visible as a hard line below the curtain lip where the skin shape
  ends; it reads as the fragment's own edge, not a bug.
- In the mid-blink frame the iris squashes to a small dot inside the
  slit; reads as a nearly-closed eye with a glint, acceptable.
- On phones the square face frame sits mid-frame with large black
  fields above and below; the ground is the same near-black, so it
  reads as one continuous dark field.

Parent fix round: none (caption plate and hint were present from the build).
