# №1186 — No-Media Trio, Again

Jeff Kolar study block JK3, grounded in NO-MEDIA (2011–15), the festival
Kolar co-organized with Jason Soliday and Nick Briz: performers paired at
random mid-evening, ten minutes, no preparation, and NO documentation —
nothing recorded, listed or replayed.

## The piece

A bare black stage (#08080A). Around the edge, an ellipse ring holds a pool
of nine mechanism modules, each a small glyph in its own colour with a tiny
label: OSC (oscillator triangle, #FF2B6E), FLT (filter bars, #00FFC2),
BELL (alarm bell, #FFE14D), JGL (jingle notes, #7C5CFF), CHM (chime arcs,
#FF8A00), RAD (radio wave, #4DD2FF), DING (doorbell dot, #B8FF2E),
CB (trucker CB squiggle, #FF5C5C), WIND (wind gust, #8A8A93).

Each round lasts 45 seconds — a compressed ten minutes, with the countdown
shown at top centre (frame one reads 5:47). Three modules are pulled into
a thin boundary circle (#2A2A2E, radius 30% of the frame's small side) lit
by a single flat spotlight wash (#F5F0E6 at 8% alpha, one soft disc over
the whole circle) plus an 18% colour glow behind each performer. They sit
on a triangle at 55% of the circle radius and each draws its own animation
in its own colour: a spiky waveform star, a sweeping bar equaliser, a
swinging bell with radiating arcs, bouncing note dots, expanding chime
arcs, concentric radio rings, a pulsing doorbell, a crawling CB squiggle,
drifting wind streaks.

The trio cross-modulates in a closed chain, A→B→C→A:

- **A→B** — A's amplitude bends B's stage position off its triangle point.
- **B→C** — B's rhythm gates C's flashes: C performs at full brightness
  only while B's beat is high, and gets a flash ring on the gate's edge.
- **C→A** — C's speed warps A's scale (up to ±30%).

Three thin quadratic link curves join the performers, each coloured as a
stepped 50/50 blend of the two module colours it connects, each bulging
toward centre in proportion to the signal it carries, alphas stepped.

At zero the stage wipes to instant black for 2 seconds — the countdown
holds 0:00, the ring sits dimmed, no trace of the round remains — then a
new trio is drawn. Trios are hashed per round from a master seed
(mulberry32), never equal as a set to the previous round's, and each
round's per-module phases, rates and the three modulation weights are
hashed with it. Rounds are addressed, not accumulated, so the continuum
has no loop point; frame one (round 0 at 19 s, trio WIND → CB → OSC in
slots A → B → C) is reproducible exactly. Watch-only: no interaction, no history, no replay
list. Silent.

## Distinction from №1176 "No-Media Pairing"

№1176 built the Soliday duo version: two voice glyphs under spotlight
cones, one blended tendril language, 60-second rounds. This piece is the
trio, in Kolar's radio register: three performers on a triangle inside a
drawn boundary circle, device/mechanism glyphs instead of voices, a
three-link chain (A→B→C→A) instead of a single cross-bend, 45-second
rounds, and one flat wash disc instead of cones.

## House implementation notes

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; CSS size pinned in fit(); phone detection via
window.screen (min dimension < 700) with an aspect fallback. Synchronous
first frame at fixed phase T0 = 19 s; the rAF loop is typeof-guarded and
anchored as T0 + elapsed. All randomness is mulberry32 hashing. No
gradients, no ctx.filter, no shadowBlur, no ImageData or offscreen
canvas, no audio. Every arc/ellipse is its own path with a moveTo first.
