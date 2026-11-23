# No.1061 "Layered Sequences" — process

Study #130 hideaki-tai, HT6 / PP222 (FastLEDManager: multiple light
sequences with layered, mixed output).

## Concept

Sixteen horizontal LED bars on black. Three independent light scripts run
on the same bars at the same time and are additively mixed per segment, so
the composition is the mix, not any single script. The scripts never talk
to each other and are deliberately unsynchronised; where they coincide the
light whitens. Every ~30 s the oldest script is swapped for a new behaviour
from a small grammar and the piece keeps going. Watch-only; a double-tap
forces the next swap immediately.

## Construction

- Field: 16 bars, each ~86% of its 1/16 pitch with a black gap, full-bleed.
  Each bar is discretised into 48 segments; each segment is drawn as a
  discrete rect with a hairline gap. No gradients anywhere: the hardware
  is honest.
- Slots and colours (fixed per slot): slot 0 cyan #00D9FF (0,217,255),
  slot 1 magenta #FF4D8D (255,77,141), slot 2 amber #FFD75E (255,215,94).
- Additive model: per segment, out = clamp255(sum over slots of
  slotColour * scriptValue). White is reachable only by addition.
- Script grammar: each script is a pure function of (segment, bar, t)
  returning a scalar brightness, with per-kind caps (march 0.85, wave 0.8,
  breath 0.55, blink 0.7, chase 0.8, still 0.3):
  - march: gaussian pulse train travelling along the bar, slight per-bar skew.
  - wave: travelling sine across segments and bars, shaped with pow 1.6.
  - breath: global slow swell with a gentle per-bar spatial factor.
  - blink: per-bar phase-offset duty-cycle blocks.
  - chase: a single bright gaussian point travelling across the whole wall.
  - still: a low constant level with a slow shimmer.
- Generation 0 is the specced trio: cyan march (spacing 15, speed 5,
  sigma 3.2), magenta wave (lambda 36, period 13 s), amber breath
  (period 24 s, phase set so it peaks at t = 21 s).
- Swap schedule: first automatic swap at t = 30 s, then every 30 s; the
  target is the front of an oldest-first queue (after a swap that slot goes
  to the back, i.e. becomes newest). A swapped script crossfades in over
  1 s against the outgoing one. Later generations draw their kind and
  parameters from mulberry32 seeded by hash(1061, slot, generation), so
  the whole schedule is deterministic. Double-tap performs a swap at once
  and restarts the 30 s timer.
- Frame one: synchronous draw at fixed phase T0 = 21 s, the original trio
  mid-life. The rAF loop (typeof-guarded) replays from T0; nothing is
  derived from Date.now(). Viewport sizing uses the Visual Viewport API
  with resize listeners on visualViewport and window; the canvas style is
  px-pinned inside draw(). Phone detection uses window.screen's min
  dimension (< 700) with the aspect fallback. No audio, per spec.

### Never-white-alone proof

A script alone contributes slotColour * cap at most. Worst-case caps per
slot across the whole grammar:

- Slot 0, cyan (0,217,255), worst cap 0.85 -> max (0, 185, 217). Red is 0.
- Slot 1, magenta (255,77,141), worst cap 0.85 -> max (217, 65, 120).
  Green is at most 65.
- Slot 2, amber (255,215,94), worst cap 0.85 -> max (217, 183, 80).
  Blue is at most 80.

Every slot has one channel at least 150 counts below 255 at its absolute
peak, so no single script can render white or near-white anywhere. Even
pairs fall short of near-white (slot 0 + slot 1 gives red at most 217).
True white after clamping needs all three slots contributing at once,
which is exactly the reservation the prompt asks for. In generation 0 the
caps are 0.85 / 0.8 / 0.55, giving single-script maxima of (0,185,217),
(204,62,113) and (140,118,52).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). Renders cleanly in silence;
  no audio present.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical.
  The duplicate was deleted.
- Desktop: 16 discrete bars with black gaps; cyan march pulses read as
  vertical banding, the magenta wave as a diagonal pink band drifting
  across bars, the amber breath as the warm ground swell; a clear white
  overlap column sits right of centre where all three coincide at t = 21 s,
  with paler two-script overlaps around it. No single colour dominates.
- Thumb: same composition at 720x720; the white knot and the three colour
  families stay legible at gallery size.
- Mobile: bars full-bleed at 390 wide, all 16 bars present, nothing
  clipped; segments stay discrete.
- Grep hygiene: no Date.now, no gradients, no shadowBlur, no ctx.filter,
  no offscreen canvas, no AudioContext, no getUserMedia, no em dashes.
  Only visible text is the document title.

## Deviations

- Colour is bound to the slot, not to the script kind: when a slot is
  swapped it keeps its palette colour and gains a new behaviour. The
  prompt fixes three hues as the palette and reserves white for overlaps;
  binding hue to slot keeps all three families present in the mix forever
  and keeps the never-white-alone proof true for every generation, while
  the behaviour turnover the prompt asks for still happens on schedule.
- Frame one (t = 21 s) catches the amber breath at its peak by design:
  that is what guarantees a genuine three-script white overlap in the
  first frame instead of leaving the reservation unproven until later in
  the loop.
