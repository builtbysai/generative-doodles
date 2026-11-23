# №1996 The Unwanted Visitor: process notes

SN5 / PP1243, study #260 syd-nuku. Watch-only.
Gallery date: 2007 · 06 · 30. Hint: "Watch only. The toy drifts in on its own schedule."

## Build

- Template: live №1991 `index.html` structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, centered geometric piece keeping its shape with the page
  ground set to the piece's own background color, one synchronous frame
  at load, requestAnimationFrame guarded by typeof check).
- Overhead shot: a pink tray disc centred on a pale pink ground, pale
  water inside the rim with a deeper tint low in the tray and a faint
  highlight high in it. Seven dahlia heads sit on the water: one
  magenta centre flower (radius 0.20 of tray radius) and six around it
  at 0.58 tray radius, alternating magenta and cream, at 15, 75, 135,
  195, 255, 315 degrees so a gap opens at 325 degrees where the toy
  approaches. Each head is three rings of petals (14, 10, 6) around a
  dark plum centre dotted with pale specks, with a soft shadow disc
  under it so it sits on the water.
- The toy is a small yellow duck, head pointing toward the tray centre,
  body and head in toy yellow with an orange beak and one dark eye.
  Plain and tidy, never slapstick.
- Ripples are faint expanding rings from the toy, the centre flower and
  one outer flower; their alpha and line width scale with the drift
  sharpness, so they sharpen when the toy drifts in.
- No pointer handlers (watch-only). No audio. No em dashes in visible copy.
- Title/date plate drawn on canvas: "№1996 · The Unwanted Visitor" and
  "2007 · 06 · 30" top left, hint bottom center.

## Determinism

- FIRST_T = 20 s, cycle = 120 s.
- Drift factor d is 0 until t = 55, ramps smoothly 55-70, holds to 85,
  eases back to 0 by 100. Ripple sharpness is 0.35 + 0.65 * d. The toy
  moves from 0.94 tray radius (at the water's edge) to 0.72 tray
  radius (inside the arrangement) along 325 degrees. The centre flower
  turns one revolution per 300 s; everything else is fixed.
- At t = 20 the tray is immaculate, the toy is at the edge and the
  ripples are faint.
- No wall-clock or random seed at load; all motion is a pure function of t.

## Probe results

- Determinism: rendering t = 20 twice gives identical md5
  (56474d8ecafb1cb3698275f4612512a0).
- t = 20 md5 378fcc7a931cebc538d118cefa4fbef2; t = 75 md5
  1d411458920f4e80944c6d21037ee93b.
- Pixel diffs (threshold > 8 per channel, 685,584 px total): t20 vs t75
  31,063 px changed (4.53%). Yellow-pixel centroid (the toy) moves
  from (740.7, 329.4) at t = 20 to (663.3, 350.2) at t = 75, same
  pixel count (2,616 vs 2,619): the toy drifts inward while the
  flowers hold. Ripple rings are visibly sharper around the toy at
  t = 75.
- Tray/flower stability: the seven flower heads are unmoved between
  probes; only the centre flower's slow rotation, the toy and the
  ripples change.

## Fix rounds

1. First gate: at t = 75 the toy (approach angle 325 degrees) sat on
   top of the cream flower's petals, covering their tips. Moved the
   approach to 345 degrees, the middle of the gap between the flowers
   at 315 and 15 degrees, so the toy nestles between the flowers
   instead. Re-gated fully after the fix: desktop, mobile and thumb
   re-rendered and inspected; probes re-run on the final file. No
   edits since.

## Fix rounds

1. First gate: at t = 75 the toy (approach angle 325 degrees) sat on
   top of the cream flower's petals, covering their tips. Moved the
   approach to 345 degrees, the middle of the gap between the flowers
   at 315 and 15 degrees, so the toy nestles between the flowers
   instead. Re-gated fully after the fix: desktop, mobile and thumb
   re-rendered and inspected; probes re-run on the final file. No
   edits since.

## Deviations from the prompt

- None in content. The prompt says the toy drifts in on a long timer
  and the ripples sharpen; the drift eases back out by t = 100 so the
  120 s cycle closes on the immaculate arrangement, keeping the loop
  seamless.
- The date line "2007 · 06 · 30" is drawn under the title as part of the
  title plate (house rule), though the prompt itself carries no date text.

## Known visual warts (honest)

- At frame one the toy's body straddles the tray rim slightly (its
  centre sits at 0.94 tray radius, the water ends at 0.93), so it
  reads as perched on the edge rather than fully afloat. This matches
  "drifting at the edge" and the body stays clearly in the water.
- The pre-drift ripples are very faint (peak alpha about 0.035), so at
  a glance the water can read as perfectly still until the toy drifts
  in. This is per the prompt's "near stillness".
- On phones the duck is small (about 30 px wide) and its beak is a
  couple of pixels; it still reads as a yellow duck, but the head and
  body merge into one yellow blob at a quick glance.
- The centre flower's slow rotation (one turn per 300 s) is almost
  imperceptible between the two probes; the motion that reads is the
  toy drift and the ripples.
