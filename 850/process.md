# №850 Moonflower Collage: process notes

IA4 / PP1250, study #261 iso-attrill. Gallery date 2004 · 05 · 10
(2002-01-10 + 851 days). Gallery note: "A flat figure in a pink dress
stands on a face-crescent moon in a navy starfield. Drag to slide the
figure along the moon."

## What it is
A flat 2D collage: a cream face-crescent moon centered in a deep navy
starfield, a figure in a pink dress standing on its lower curve, and
the single word MOONFLOWER arced above in rounded serif (Georgia
bold). The arced title is the prompt-required artwork text and the
only in-piece text; there is no number/date plate and no hint text,
per the batch standing rule. The figure holds a small white
moonflower in her raised hand.

## Timing
- FIRST_T = 10 s. At t = 10 the figure stands at arc angle 108.4
  degrees (partway along the lower arc), the moon tilts 6.4 degrees
  toward her, and the moon wears its smile expression.
- Expression cycle = 60 s: three expressions of 20 s each (smile,
  sleepy, surprised), blending into the next over the last 4 s of
  each block. Verified at t = 10 (smile), t = 30 (sleepy),
  t = 50 (surprised), each rendered and inspected.
- Figure walk period = 48 s, closed-form stroll along the lower
  arc (52 to 128 degrees), phase-shifted so FIRST_T lands mid-tilt.
- Star twinkle periods 2.2 to 4.8 s per star, closed-form phase
  from a fixed seed table (mulberry32, seed 850; 46 stars, 6 bright
  four-point sparkles).

## Interaction
DRAG slides the figure along the crescent (grab the figure or the
crescent band near the lower arc); the moon tilts to follow (tilt =
a third of her arc offset from straight down, about 9 degrees at
the ends). On release the figure eases back to the loop path over
4 s (smoothstep). No click-to-reload; no tap action.

## Drag / release probes (node harness, /tmp/probe850.js, all pass)
- Baseline t = 10: figureAngle 108.38 deg, tilt 6.43 deg,
  expression [0.05, 1.00, 0.00] (smile).
- Drag probe: pointerdown on the figure starts the drag;
  pointermove to arc angle 60 deg moved the figure to 60.00 deg
  and tilted the moon to -10.50 deg; star alphas unchanged
  (stars are a closed-form function of piece time only).
  Rendered qa-drag.png and inspected: figure at the right end of
  the crescent, moon tilted the other way, stars untouched.
- Release probe: pointerup at t = 10; at t = 12 (mid-ease) the
  figure is at 88.32 deg, between the dragged 60 deg and the loop
  path 112.52 deg; at t = 15 the figure is back on the loop path
  exactly (115.78 deg = baseAngle(15)). Rendered qa-release.png
  and inspected.
- Expression probes: t = 30 sleepy [0.45, 0.05, -0.35],
  t = 50 surprised [1.00, -1.00, 0.60]; both rendered and
  inspected, expressions read clearly.
- Determinism: repeated figureAngle(15) calls identical;
  thumb.png rendered twice, md5-identical
  (0325ab3a58bb4e94e86e22de7d927bb3).

## Palette
- Navy #101d40 (sky and page ground)
- Cream #f6ead0 (moon, figure skin), dimmer cream #e3d2ac (craters)
- Pink #f191ac (dress), dark pink #d9738f (hem, waist, shoes),
  light pink #f7b7c6 (bodice highlight)
- Star white #fbf8ef (stars, title, moonflower)
- Hair navy #243a6e

## Audio
None. No prompt earns audio in this batch; silent build.

## Deviations
None from the spec. One judgment call: the batch standing rule
forbids in-piece UI/hint text, so this piece carries no number/date
plate and no hint pill; the arced title is the only text, as the
build brief states.

## Known warts (minor)
- The moon's inner cut edge shows a faint hairline from the clip
  anti-aliasing; it reads as a deliberate outline.
- The figure's nose on the moon face is a tiny hook; at thumb size
  it reads as a small mark next to the smile.
- The raised arm's moonflower is small at thumb size but visible
  at desktop size.

Parent fix round (gate): the in-canvas caption plate (number, title, formula date) and interaction hint were missing; added at the end of draw() in the template place, then re-rendered and re-gated desktop, mobile, and thumb (thumb byte-identical twice). Em dash in the process.md heading replaced with a colon.
