# №1584 A Fish Grown From a Sine Wave and a Hash

EXPANSION #209 che-yu-wu, prompt PP831 / CW1. Gallery date 2006 · 05 · 14.

## Mechanism

A single luminous translucent fish swims alone on black. The body is
not anatomy: it is a ribbon whose centreline is a travelling sine
wave, tapered at head and tail, filled deep blue with a narrower cyan
core, and overlaid with three parallel sine strokes (ice-blue spine
plus two fainter cyan sister waves), so the math stays visible. Thirty
seeded glitter dots scatter along the spine (a fixed-seed LCG hash,
positions and twinkle phases authored, never Math.random) and twinkle
as the fish moves. Fins are trailing sine ribbons: a dorsal ribbon
above the mid-body, two pectoral ribbons streaming from the head, and
a tail ribbon that continues the wave past the tail, widening and
curving as it fades.

The fish roams on a two-frequency Lissajous path (pure function of
loop time, so the route never repeats on a short cycle and the fish is
never centred for long). Heading comes from the path derivative; bank
comes from the turn rate, leaning the body into its turns with a
slight vertical compression.

A soft sonar pulse radiates from the fish every 3 seconds: two
concentric rings (cyan outer, ice inner) that expand to 30% of the
frame's short side and fade over 3.2 seconds.

Every 50 seconds of loop time, a faint second-fish ghost flashes
inside the first for 1.6 seconds: the same body resampled with a
shifted wave phase, drawn slightly smaller in white strokes only, its
alpha ramped smoothly in and out. The schedule is a fixed-phase
function of the loop clock, never a wall clock or random draw.

## Palette

Black ground #03030A; fish cyan #35D6E8, ice blue #BFEFFF, deep blue
#1E4FE0; ghost flash white #FFFFFF. Nothing else.

## Interaction

Watch-only. No pointer interaction of any kind: no tap, no drag, no
click-to-reload. The fish is a living thing in an aquarium you cannot
touch.

## Determinism

The synchronous first frame is drawn at fixed loop phase T0 = 7.3 s;
the rAF loop is anchored as T0 + elapsed-since-load. Frame one holds
exactly one fish (the ghost window opens at 20 s into each 50 s
cycle) with a sonar pulse mid-flight. All seeded values come from a
mulberry32 LCG seeded 1584. No Math.random, no Date.now, no offscreen
canvas, no in-piece text or signature.

## Deviations from the prompt

- Sonar pulse every 3 seconds rather than "every few seconds" in the
  loose sense; chosen so a pulse is always near and the frame-one
  render shows one mid-flight.
- Ghost flash every 50 seconds, inside the prompt's "~every 40-60s"
  range, on a fixed-phase schedule.
- No caption or hint text in the piece (batch standing rule: no
  in-piece UI; the gallery note carries the cue).

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb. Desktop, mobile and thumb all
show one fish reading as sine waves with glitter along the spine,
fins as trailing ribbons, and a visible sonar pulse ring. Thumb
rendered twice: byte-identical (md5 27f6d2656de09e2e28956d03009d2d55).
One fix round: the first build's sonar pulse had aged out before the
fixed first-frame phase (pulse every 4 s, first frame at 7.3 s), and
its tail trail was a straight hairline; the pulse period was
shortened to 3 s and the tail trail given a curving wave. Re-rendered
and re-inspected after the fix; gate passed.

## Gallery note

"A single luminous fish grown from a sine wave and a hash, swimming alone on black. Watch only."
