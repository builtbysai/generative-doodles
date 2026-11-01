# №1090 — White Room

Marco Tempest study block MT3: the Rhizomatiks workshop image as a piece. A white
studio floor, eight black quadcopters parked in a loose 3-2-3 grid, two engineer
silhouettes cropped at the frame edges, motionless. The machines run their own
power-up ritual on a 60-second loop. Watch-only: no interaction, no audio.

## How it is built

Everything is a closed-form function of the loop clock `t` in [0, 60). There is no
integrated state; any frame can be computed from `t` alone.

- **Timeline.** Power-up 0–24s: drone `order` (back row, middle row, front row)
  ramps over its own 3s window starting at `order * 3`. Hold 24–44s: all eight
  lit, orbs breathing at `1 + 0.05 * sin(0.9t + order * 0.7)`. Power-down 44–60s:
  reverse order, 2s per drone starting at `44 + (7 - order) * 2`. The lit level
  `L = min(smoothstep up, 1 - smoothstep down)` closes exactly at the loop seam.
- **Per drone, from L:** orb drawn flat gray `#D8D8D8`, then warm glow as layered
  flat-alpha circles (`#F2DFAE`, `#F9EDCB`, `#FFF7E6`) scaled by L and the
  breathing factor; status dot `#35E0FF` blinks on a 2.5 Hz square wave only
  during that drone's power-up window, steady while lit; rotor shimmer is two
  rotating arc strokes per rotor (angle `9t + order * 1.7 + i * π/2`) at alpha
  `0.55L`.
- **Drones.** Arms, elliptical prop-guard rings, rotor discs, body, orb mast, and
  five white Vicon markers (dark-ringed so they read against the white floor).
  Rows recede by scale (0.60 / 0.84 / 1.15) and height. Floor shadows are skewed
  flat ellipses in `#E4E4E0` at 0.35.
- **Engineers.** Single filled silhouette paths in `#111114` at x = 26 and
  x = 974 of the 1000-unit world, so both are cropped by the frame edges.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in `draw()`;
  phone detection via `window.screen` min dimension < 700 with aspect fallback.
- Determinism: the first frame is drawn synchronously at fixed phase `T0 = 30`
  (mid-hold, all eight orbs lit); the rAF loop (typeof-guarded) continues as
  `(30 + elapsed) mod 60`.
- No canvas gradients, no offscreen canvas, no `ctx.filter`, no `shadowBlur`,
  no `createElement`, no audio, no pointer handlers, no visible text beyond
  the `<title>`.

## QA

Rendered with `node ~/workspace/tools/render-piece.js`:

- `qa-desktop.png` (1280×800), `qa-mobile.png` (390×844), `thumb.png` (720×720).
- Frame one (all three sizes): white floor, 3-2-3 grid of black quadcopters
  with guard rings and arm markers, all eight orbs glowing warm white with
  cyan status dots lit, soft floor shadows, engineer silhouettes cropped at
  both edges, generous white space above.
- Thumb rendered twice and compared with `cmp`: **byte-identical**.
  Duplicate deleted.
