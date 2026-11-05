# №1556 Wind Chime

kiyoshinakauchi JK5, PP803, cron expansion study #205. Gallery date: 2006 · 04 · 16.

## Palette

- Ground near-black #0d0d0d; squares white #F2F2F2; nothing else.
- Thin white stroked lines only (lineWidth max(1, 0.0018 * minDim), about 1.6 px at desktop).

## Composition

Seven nested wireframe squares, centered and concentric, largest half-side 0.44 * minDim
so it sits near the frame edges; half-sides 0.44 / 0.375 / 0.31 / 0.25 / 0.19 / 0.13 / 0.075
of minDim. No other mark, no visible text except the page title.

## Motion

Watch-first interference loop. Each square has a fixed angular velocity (rad/s),
mixed signs, incommensurate ratios so near-alignment moments are rare:
0.211 / -0.127 / 0.293 / -0.071 / 0.187 / -0.233 / 0.113.
Initial phases from mulberry32(1556000). All state is a closed-form function of piece
time; fixed-phase first frame, no wall clock, no per-frame randomness.

## Interaction

Drag a square to turn it. Pointerdown hit-tests the square edges (ray from center
against each rotated square, tolerance max(12 px, 0.03 * minDim), closest edge wins).
While pressed, only the grabbed layer follows the pointer angle-delta; the other six
keep their own velocities and the system never stops. On release the grabbed layer
eases back to its own velocity: its offset decays as exp(-(t - t_release) / 0.8 s).
Pointerdown on empty space grabs nothing. No click-to-reload, no sound: fully silent,
no AudioContext anywhere.

## Probes (node probe-1556.js, stubbed rAF driving the piece's own loop)

- Frame-one determinism: two fresh 1280x900 renders byte-identical
  (md5 dda031662b8d6b515c8ff070b1cb44d3 both).
- t=0 vs t=5 pixels differ (md5 31de4c381324f46f92e0a2a83bbb2851 at t=5);
  all 7 angles at t=5 match PHASE + VEL*5 to < 1e-9, all 7 moved.
- Center pointerdown grabs nothing (dragLayer null).
- Drag: unambiguous grab on layer 2 (41.1 px margin, tolerance 27.0 px);
  +0.5 rad pointer rotation moved only layer 2 by +0.5000, others 0.000000.
- Release: after 2 s the grabbed layer's offset is 0.0410, exactly
  0.5 * exp(-2 / 0.8); other layers advanced VEL * 2 s, system never stopped.
- All 10 probe checks passed on the first run.

## Render inspection

- Desktop 1280x900: exactly 7 nested wireframe squares, thin white lines on
  near-black, largest near the frame edges; white-pixel centroid 639.5, 449.6
  vs center 640, 450.
- Mobile 390x844: same 7 squares, centered, shape kept; centroid 194.5, 421.5
  vs center 195, 422.
- Thumb 720x720: same composition; centroid 359.5, 359.6 vs center 360, 360.
- Forbidden-token grep clean: no AudioContext, gradients, shadowBlur, Path2D,
  createElement, localStorage, getUserMedia, fillText/strokeText, Math.random,
  Date, or em dashes.

## Fix rounds

None. First build passed the visual check and all probes; no rework.

## Gallery note

Seven nested wireframe squares turning at their own speeds and directions around
one center, phasing in and out of alignment like panels in wind. Drag a square
to turn it.
