# №1619 "Observation 12" (SP4, sableraph #213, PP866)

## Design
A black lab-notebook page (#050505) from the summer-2021 series: two split discs,
each half light #E8E8E8 and half near-black #0A0A0A, sit on a field of faint
concentric ring grids radiating from both disc centres. The large disc (about a
third of the frame) sits lower-left, the smaller one upper-right; where the two
ring grids overlap they beat into moire. The observation number "12" sits small
in the bottom-right corner, with the title and formula date centred at the top
and the hint "Tap for the next observation." at the bottom. Strict monochrome
throughout: no colour, no starfield, no noise, nothing decorative. The motion is
deliberately slow, a lab instrument rather than a toy.

## Ring/disc model and time functions
All geometry is a pure function of piece time t and the observation number n.
`geomFor(n)` seeds mulberry32 with `1619000 + n * 104729` and derives each disc's
position jitter, diameter, split angle, ring spacing, ring phase, and drift
parameters, so every observation number has its own deterministic composition
and 12 always looks like 12.

- Rings: for a disc with spacing S, ring i has radius
  `((phase * S + (S/45) * t + i * S) mod Rmax)` with Rmax = 1.55 * frame width,
  so one ring spacing passes every 45 seconds and rings expand outward at a slow
  constant rate. Stroke alpha is `0.5 * (1 - r/Rmax)^2`, fading to nothing at the
  edge, so the wrap from Rmax back to 0 is invisible. Ring count is
  `floor(Rmax / S)` and therefore seeded per observation.
- Discs: split along an angle that rotates at 0.4 degrees per minute
  (`t * 0.4 * PI/180/60`), a fraction of a degree per minute as specified.
  Centres drift almost imperceptibly on slow sine/cosine cycles (900s and 750s
  periods, amplitude under 1.5% of frame width). Discs are drawn over the rings,
  with a faint ring-coloured outline.
- Moire emerges naturally from the two overlapping ring grids; nothing is drawn
  to fake it.

## Frame-one determinism
Frame one is drawn synchronously at load with PHASE = 30.0s. At that phase the
rings are well expanded (speed * 30s is two-thirds of a spacing past each ring's
seeded phase offset, and the field is fully populated from radius 0 to Rmax), so
the thumbnail shows both discs and a developed ring field with visible moire,
not a bare field. No Math.random anywhere; every value derives from the seeded
PRNG and piece time. Verified: thumb.png rendered twice gives identical md5
(d81ed01e3b0008adec7b003478da2aec).

## Tap to advance and persistence
Pointerdown records the position; pointerup within ~12px of movement counts as
a tap and advances the observation (12, 13, 14, ...). Drags do nothing. A tap
re-seeds the geometry from the new number, updates the title and the corner
number, and redraws at the current piece time. The observation number is
persisted in localStorage under key `obs1619`, guarded by
`typeof localStorage !== 'undefined'` inside try/catch, since the node-canvas QA
harness has no localStorage. On load a saved number >= 12 is restored; the
formula date "2006 · 06 · 18" stays fixed, it is the piece's gallery date, not
the observation's.

## Deviations
- Ring colour is #3C3C3C, not the spec's #3C3C40: the spec value carries a
  4-unit blue lift (60,60,64), which fails a strict no-colour-pixel check. Pure
  grey #3C3C3C is visually identical and keeps the piece strictly monochrome.
- No other deviations. No click-to-reload, no reset button, no em dashes in
  visible copy.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centred square composition kept on both
desktop and phone, page ground is the piece's own #050505 with light hint text;
one synchronous frame at load; requestAnimationFrame guarded by typeof check;
reduced-motion support (static frame at PHASE). Title "Observation 12", date
"2006 · 06 · 18" (formula date), hint "Tap for the next observation."
