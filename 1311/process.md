# №1311 "The Monster Factory" (kristan-horton KH8, PP478)

## Source

Kristan Horton's "monster factory": work produced by mechanism, not design,
presented as arriving rather than finished. Raw material enters as a blank
(the zero state), a layering station distorts it, an arrival station stamps
each finished monster, and finished monsters exit on a conveyor.

## What the piece shows

A dark charcoal factory floor. A horizontal conveyor line runs at 60% height,
with roller ticks travelling along it. Three station zones are marked by faint
dashed rectangles and ground glyphs: intake (circle), layering (triangle),
stamping (square). Four monsters ride a seamless belt loop, each at a
different production stage:

- Intake: a single paper disc, the blank zero state.
- Layering: distorted ellipse/arc copies accrete over the blank, with streak
  marks on the later layers, spikes, toxic-green eyes, and an occasional rust
  patch (a material tone, never a second accent).
- Stamping: the finished beast carries an abstract punch-card stamp glyph
  beside it, never readable text, never a real date or time.

Each monster is a unique distorted stack generated from a per-monster seeded
stream: 3-6 layers, 2-5 spikes, 1-3 eyes. Nothing is cute, photorealistic, or
HUD chrome. Watch-only; the viewer watches the factory run.

## Mechanics

All state is a closed-form function of piece time. Monsters sit on a fixed
spacing around a belt loop; each monster's x position is
`wrap(k * D - v * t)`, so the belt loops without a seam. A monster's stage
comes from its x position: intake below 30% width (blank), layering 30-64%
(accretion progress mapped linearly), stamping above 64% (full monster plus
stamp glyph). Roller ticks offset by `(v * t) mod spacing`. Monster anatomy
comes from mulberry32(1311000 + index * 7919), never Math.random.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop, which is a plain function
declaration behind a typeof guard. The thumb rendered three times at 720x720
is byte-identical. A manual rAF probe confirmed frames at t = 10 s and
t = 30 s differ from frame one (belt and monsters move).

## Fix rounds

1. The intake zone's circle glyph drew a long diagonal line off the bottom of
   the frame: its `moveTo` used absolute coordinates after a `translate`.
   Fixed to local coordinates (`moveTo(s, 0)`); re-rendered and re-inspected
   at all three sizes.
2. No other fixes required. First renders at desktop, mobile, and thumb scale
   read correctly after the glyph fix.
