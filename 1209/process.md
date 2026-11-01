# №1209 — The Gap Between Data and Information

Amy Szczepanski study block AS2 (grounded in Null_Sets, Meaney + Szczepanski: text
broken to data, rebuilt as image). The same passage, read two ways at once, side by
side, irreconcilable.

## The stage

- **Left — the human reading.** A warm typeset page (paper #EFEAD8, ink #1A1A1A,
  flat lamp-glow frames of #F5D6A8 at low alpha, no gradients) carries the current
  text in serif, with a fixed header naming the work. Text already consumed is dim;
  text not yet reached is full ink; the page scrolls so the reading point stays at
  40% of the text area.
- **Right — the machine reading.** The identical passage as Null_Sets bands: 30
  horizontal bands of flat, saturated, computed color on near-black. No legible
  text exists on this side.
- **The carrier.** A 1px divider (#2A2A2E) splits the frame 50/50. At the reading
  height a short amber bridge crosses it; characters travel it as amber dots
  (#FFB000), one at a time, and each completed 8-char segment blooms on the right
  as it locks in.

## The lockstep

Progress is a single number: **characters consumed**, C(t). Both halves are pure
functions of that one number — the left scroll position and dim/full split from C,
the right band build from floor(C/8) — so the two readings cannot desync.

- Baseline consumption: 11 chars/second. One text per 90-second cycle:
  Romeo and Juliet → On the Origin of Species → the US Constitution → loop.
  Excerpts run 950–966 chars and complete at ~86–88 s; the finished reading holds
  briefly, then a 0.4 s divider flash resets both sides together.
- **Resync rule (drag modifiers).** Consumption is computed by walking the
  recorded drag intervals that overlap the current cycle. A drag on the LEFT
  subtracts 11 chars/s over its span — consumption pauses outright (the human
  stops to read; the machine waits at the character boundary, carrier dots frozen
  mid-flight). A drag on the RIGHT adds 22 chars/s over its span — consumption
  runs at 3× (the computer reads faster than you; the page hurries to keep up).
  The contrast lands through the rate, never through desync: release, and both
  sides are exactly where the shared count says they should be.

## The color mapping (computed, never chosen)

Each 8-char segment's color is a quantization of its own bytes, the AS1 family
mapping: index = (sum of char codes) mod 10 into the fixed table
#E5484D #F76B15 #FFC53D #46A758 #12A594 #0090FF #6E56CF #D6409F #FF4D6D #101010;
shade step = (mean char code) mod 3 → dark / base / light. Segments map onto the
30 bands top-down (band of segment s = floor(s·30/totalSegments)), drawn flat;
unbuilt segments show as faint cells. The newest built segment blooms for 0.4 s —
a pure function of C: brightness falls as C moves past the segment's threshold.

Carrier dots are likewise a function of C alone: char c is in flight while
C−3.3 < c ≤ C, its position the fraction (C−c)/3.3 across the 48px bridge
(0.3 s of baseline consumption).

## Frame one (fixed phase T0 = 34 s, Romeo and Juliet)

Consumed C = 374 chars. Left: 15 wrapped lines at desktop metrics — 5 fully
consumed (dim), reading line 6 ("fools do wear it; cast it off. It is my lady,
O, it is my love! O,") split 59 chars in, exactly where the render shows the
dim→full break; four amber dots mid-flight on the bridge. Right: floor(374/8) =
46 of 119 segments built — 11 full band-rows of 4 plus 2 — covering 368 chars,
the remaining 6 chars in the current segment and in flight. The two sides agree
to the character.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both the
visual viewport and the window; CSS size pinned in fit() and draw(); phone
detection via window.screen (min dimension < 700px) with an aspect fallback —
portrait phones stack the page over the bands and the carrier bridge turns
vertical at the reading character's x position. First frame is drawn
synchronously at the fixed phase T0 = 34 s; the rAF loop is typeof-guarded and
anchored as phase + elapsed. Seeded arithmetic only — no Math.random, no
gradients, no ctx.filter, no shadowBlur, no createElement, no ImageData or
offscreen canvas, no audio, no microphone. Silent by design.
