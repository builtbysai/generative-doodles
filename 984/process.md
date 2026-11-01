# No.984 "Ball Track"

Study #121 motoi-ishibashi, prompt PP145 "particles" (2011; planning/software by
Daito Manabe, system design/hardware by Ishibashi): full-color LED balls roll a
figure-8 spiral rail, 17 infrared control points switch their colors, and
visitors send commands from terminals. The rail is the entire system: balls,
points, packets and terminals all live on it or serve it.

## Concept

A dark gallery holds one continuous tilted figure-8 rail. About two dozen flat
LED dots in five hard colors (red, green, cyan-blue, yellow, violet) roll along
it forever at constant, slightly varied speeds, each dragging a short fading
trail in its own color. Seventeen small mint squares sit evenly on the rail:
every time a ball crosses one, the square flashes and the ball's color switches
on the spot, so color ripples travel around the track in waves. Along the
bottom edge, ten dim visitor terminals wait; every 7 to 14 seconds one blinks
and fires a tiny white packet that visibly flies up to a control point and arms
it. The next ball through that point is forced to the packet's color. Cause
always precedes effect: no color changes without a crossing or a packet.

Interaction: tap a control point and your own packet flies from the nearest
terminal to arm it. Drag along the rail to retime a segment (balls speed up or
slow down with the direction of the drag, then settle over about three
seconds). Double-tap reprograms the track: new seed, new ball count, new color
sequence, new command schedule. Sound, after the first gesture only: a soft
rolling hum pitched by the balls' mean speed, a tiny click per color switch
(throttled), a blip when a packet is sent.

## Construction

- Rail: a lemniscate (x = sin t, y = sin t cos t, y stretched 1.3) with a
  radius modulation 1 + 0.16 sin(2t + 1.3) + 0.07 sin(5t + 0.4) for the spiral
  feel, tilted -0.14 rad. Sampled at 2400 points, normalized, and
  arc-length-parameterized into a cumulative table, so position lookup by
  normalized arc length s in [0,1) gives true constant-speed motion.
- Balls: 24 to 28 agents (seeded count), each with constant base speed
  0.020 to 0.036 loops per second, a current color index, and a trail of its
  last 14 arc positions sampled every 5 steps, drawn as dots in its color at
  0.15 alpha fading along the trail.
- Control points: 17 at s = k/17. Each carries a seeded rule: about 62 percent
  advance to the next color in the cycle, about 24 percent set a specific
  seeded color, the rest pick a seeded random color. Crossing is detected per
  step by forward wrapped distance from the ball's previous s. A crossing sets
  the point's flash timestamp (alpha decays from 1.0 back to the resting 0.35)
  and applies the rule, or the armed color if the point is armed.
- Commands: a schedule held in the sim; the first command is fixed at step
  2328 (19.4 s) so a packet is guaranteed mid-flight in frame one. Packets fly
  for exactly 96 steps (0.8 s) from terminal to target point, then arm it; an
  armed point shows a small white tick above its square until a ball consumes
  it. The sending terminal blinks mint.
- Retime zones: a drag deposits zones {s, factor 1.7 or 0.4, birth step};
  a ball's speed multiplier is the sum of Gaussian falloffs (sigma 0.035 in s)
  of live zones, time-decayed over about 3 s and clamped to [0.15, 2.6].
- Determinism: one mulberry32 stream per sim, seeded 984145 (reprogram adds
  reseedCount * 1013904223). Frame one is the synchronous draw after exactly
  2400 fixed steps of 1/120 s. The live loop advances the same fixed steps
  from rAF timestamps; no clock ever feeds the initial frame.
- Layout: canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height are pinned in px
  on every draw. Phone detection uses window.screen's smaller dimension
  (< 700 px), aspect fallback h > w * 1.15; on phones the rail scales to the
  width and sits higher, terminals stay on the bottom edge. All sim state is
  kept in layout-independent arc-length space, so resizes never disturb it.
- Audio: AudioContext created lazily inside the first pointerdown, every call
  typeof-guarded and wrapped; nothing sounds during QA renders.

Palette (strict): gallery #07080C; rail hairline #3A3D46; balls #FF4D4D,
#4DFF88, #4DC9FF, #FFD93B, #C64DFF; control points #7DF9C6; trails are the
ball color at 0.15; packets and armed ticks #FFFFFF; idle terminals #4A5A50
(a dim gray-green derived for the terminals, which the prompt leaves
unspecified). Flat dots and squares only: no gradients, no shadowBlur, no
ctx.filter, no offscreen canvas anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All
  render cleanly in silence (no AudioContext in the harness).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted. A dead line removed from the retime
  falloff afterwards was re-verified the same way (thumb bytes unchanged).
- Desktop readback: tilted figure-8 hairline fills the frame; 26 colored
  balls distributed around both loops with short faint trails; 17 mint
  squares on the rail, the upper-left one caught bright mid-flash; a white
  packet square is mid-flight inside the right loop, aimed at its control
  point; ten terminal dots along the bottom edge, the rightmost lit mint
  because it just sent that packet.
- Mobile readback: the rail fits the 390-wide frame whole, tilted 8 intact,
  balls/points/packet all legible, terminal row on the bottom edge, nothing
  clipped.
- Thumb readback: same composition as desktop at 720x720; system reads at a
  glance.

## Deviations

- Visitor terminals are drawn as small dots rather than squares, and their
  idle color #4A5A50 is a derived dim gray-green: the prompt specifies the
  terminal row's presence and blinking but no shape or hex for it. Dots match
  the "visitor terminal dots" wording of the prompt's visual description.
- The wave rule variant (a point nudging its neighbor's state) is realized as
  the random-color rule instead: with 17 points and constant crossings, a
  random set already produces the traveling color ripples the wave was for,
  without a second state channel to keep deterministic across reseeds.
- The rolling hum is a single bus whose pitch follows the balls' mean speed
  factor rather than one voice per ball; 26 simultaneous oscillators carry no
  extra information over the mean, and the clicks and packet blips keep the
  per-event sounds exact.
