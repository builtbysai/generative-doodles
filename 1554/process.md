# The Rampaging Ring — №1554

kiyoshinakauchi JK3, PP801, cron expansion study #205. Gallery date: 2006 · 04 · 14.
Reference: kiyoshinakauchi.md (Rampaging Ring, 2022-11-05).

## Palette

- Ground near-black #0d0d0d.
- Ring vivid magenta #E040E0.
- Nothing else. No glow, no second ring, no gradients.

## Composition

Single wireframe ring, 144 segments, centered, medium-large (radius 0.30 of the
smaller viewport dimension), wide black margins, no other mark. Centered
geometric piece: keeps its shape on phones, page ground is the piece's own
background color.

## Motion

Watch-first spike loop. Spike height per segment is a seeded value-noise field
drifting slowly, so between events the ring is almost calm (max spike about
2.5% of radius at t=0). A seeded spike event lands every 4-9 seconds at a
random arc position: 1.4-1.9 s long, grow, hold, collapse, with per-segment
jitter so individual segments spike at different heights. Peak event spike
about 0.32-0.39 of radius. The ring rotates slowly, one turn per 120 s, and
rotation never stops.

## Interaction

Drag on the ring plucks it: the nearest segment spikes toward the pointer
while pressed (target clamped to 0.45 of radius), then springs back into the
noise rhythm on release (exponential decay, time constant 0.35 s). Drag never
spikes the whole ring, never stops the rotation, never changes the color.
Never click-to-reload.

## Technical

Canvas 2D. Ring as a closed polyline of 144 segments; spike height per segment
= noise(segment, frame) plus event envelope times angular falloff times
per-segment jitter, plus the drag pluck term. Deterministic fixed-phase first
frame: all randomness from mulberry32 with fixed seed 1554000; all state a
closed-form function of piece time (no wall clock, no per-frame Math.random).
Spike events on a seeded schedule precomputed to 240 s and repeating. One
synchronous frame at load; requestAnimationFrame guarded with a typeof check.
House rules per the №1551 template: Visual Viewport sizing with resize
listened to on visualViewport and window; canvas element pinned in draw() via
canvas.style.width/height in px; phone detection via window.screen physical
size (min dimension under 700px) with aspect fallback (h > w*1.15). No
gradients, shadowBlur, Path2D, offscreen canvas, createElement, localStorage,
getUserMedia, fillText/strokeText. No em dashes in visible copy; no visible
text except the title.

## Probes

Forced-time/interaction probe (stubbed rAF driving the piece's own loop,
synthetic pointer events to its own listeners), 1280x900:

- Frame-one determinism: two draw(0) PNGs byte-identical (md5
  40641167d640da655004003f6b146ed9 for both renders).
- t=0 vs t=5 differ: max spike diff 4.21 px, rotation 0 to 0.2618 rad.
- Event scan 0-30 s: peak maxSpike 85.3 px at t=17.25 (0.316 of R 270);
  pre-fix scan peaked at 106.3 px at t=10.25.
- Drag at calm t=2: pointer at ring east, moved outward to R*1.3. Nearest
  segment (142) spiked to exactly the 81.0 px target; opposite segment 5.8 px,
  neighbor +5 3.6 px, global max 81.0 px, so only the nearest segment is
  plucked. Rotation continued during drag (0.5236 to 0.5760 rad over 1 s).
- Spring-back after release: spike 81.0 to 19.4 px at +0.5 s, 0.6 px at +2 s.
- First drag probe at t=10 was confounded by a live spike event (opposite
  segment 85.4 px from the event itself); re-run at calm t=2 confirmed the
  pluck is local.

## Fix rounds

1. First build rendered a broad smooth bulge at event peak instead of
   segments spiking at random heights. Narrowed the event angular falloff
   (sigma 0.35 to 0.14 rad) and added per-segment jitter to the event term
   (0.55 + 0.45 * noise). Re-probed and re-rendered: peak now shows a sharp
   outward spike with the rest of the ring calm.

## Gallery note

One magenta wireframe ring on black, its segments spiking outward on a
drifting noise field, calm between rampages while the ring turns slowly. Drag
the ring to pluck it.
