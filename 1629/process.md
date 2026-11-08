# №1629 "Hotaru" (YL6, yi-wen-lin #214, PP872)

## Driver
A silent night plane with about a dozen fireflies, each on its own
blink cycle; a drag sweeps a breeze through the field and the flies
forget you as soon as it passes.

## Design
After his June 2021 video "Fireflies" (captioned "Grave of the
fireflies"): a near-black night plane (#050607) seen at a shallow
angle, the horizon a barely visible line one third down the frame,
the plane filling the lower two thirds. Twelve fireflies drift as
small glowing dots in #E8F0C8 with a warm halo, each on its own
blink cycle of 2.6 to 5.4 seconds, leaving faint #3A4030 trails at
low alpha. A slow 11-second cluster wave nudges three groups of
four toward loose synchrony, so three or four pulse together, then
scatter again. Nothing else. No sound.

## Mechanism
Twelve agents generated once from mulberry32 seed 1629007, in fixed
rng order per fly: base position (x across 0.06 to 0.94 of the field,
y across 0.38 to 0.88 of the field, always below the horizon),
wander amplitudes and periods (two sine terms per axis, 4 to 13
second periods), blink period and phase, cluster (i mod 3).
Positions are a closed-form function of piece time, so trails are
drawn by sampling past positions (12 samples, 0.09 s apart) and
frame one is reproducible. Blink brightness is a squared sine
mapped onto a 0.25 floor, so every fly stays faintly visible and
several read as lit at any moment; the cluster wave adds a 0.5
radian sine term per group. Glow is layered flat-alpha circles
(halo 11 px, mid 5 px, core 2.2 px), no gradients, so the node-canvas
QA render matches the browser.
Drag (pointerdown plus pointermove) tracks smoothed pointer
velocity; flies within 220 px are carried along with distance
falloff (0.35 horizontal, 0.25 vertical gain, capped at 60 px
displacement) and their blink phases are nudged toward the
circular mean of the nearby flies (0.25 gain), never forced. On
release the breeze displacement decays with a 1.4 s time constant
and the phase nudge with a 2.5 s constant, so the flies settle back
to their own rhythm. No Math.random, no wall clock anywhere; all
motion is a closed-form function of piece time plus breeze state
that starts at zero.

## Frame-one determinism
Frame one is drawn synchronously at t = PHASE = 1.2 s, with all
twelve flies seeded and several mid-blink. Verified: three
independent 720x720 thumb renders have identical md5
(f8a6d89e1edb4107984c3a0d90fdb082).

## Asserted counts
- Fireflies: exactly 12 (N_FLIES), all in the lower field.
- Trail samples per fly: 12.
- Loose-sync groups: 3 groups of 4.

## Deviations
- Blink has a 0.25 brightness floor: the prompt's pure sine blink
  left frame one with only six or seven flies readable and most of
  them near-invisible. The floor keeps all twelve faintly visible
  while the pulse still reads as a blink; the piece is never a
  dark empty field.
- Phone field is a centred band 0.78 of the viewport width tall
  (not 0.62): at 0.62 the band was too short and the lowest flies
  crowded the hint plate. The band still reads as a wide field,
  with the page ground the same near-black above and below.

## Fix rounds
- Round 1 (2026-11-08, fly gate): first renders showed frame one
  too dim and sparse (about seven flies visible, most faint) and
  the mobile band crowding the hint plate. Raised the blink floor
  to 0.25, enlarged the glow (halo 9 to 11 px, mid 4.5 to 5 px,
  core 1.8 to 2.2 px), raised halo and mid alphas, widened the
  phone band from 0.62 to 0.78 viewport widths, and capped fly
  height at 0.88 of the field. Re-rendered all three sizes: all
  twelve flies read on desktop, mobile and thumb, several brightly
  lit, horizon barely visible, no fly touching the hint plate.
  Thumb re-rendered three times, byte-identical md5
  f8a6d89e1edb4107984c3a0d90fdb082; index.html md5
  9e48fa26af6110d172df88979b4ca34b.

## House rules
Visual Viewport sizing with listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone
detection via window.screen with aspect fallback; wide field,
full viewport on desktop, centred band on phones with the page
ground the same near-black; one synchronous frame at load;
requestAnimationFrame guarded by typeof check; reduced-motion
support (single static frame at PHASE, no loop, no pointer
handlers); blink cycles seconds-long, flicker far below 14 Hz by
construction; never click-to-reload. Title "Hotaru", date
"2006 · 06 · 28" (formula date 2002-01-10 + 1630 days), hint
"Drag to sweep a breeze through the fireflies." Title, date and
hint sit on dark plates over the night plane. No em dashes in
visible copy.
