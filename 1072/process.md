# Well-Trained Birds

## Concept

No. 1072 renders Momoko Nishimoto's 24 Drone Flight mechanism as a pure piece: the flock at rest in a bright white studio void. Twenty-four identical skeletal drones hold formation in three columns of stacked pairs, each carrying a glowing pale-blue orb on a short mast, each marked with a red and a white LED point. Far below center stands one small dark figure with arms raised — the performer the flock serves. The human is the anchor, not the subject; the elegance is in how little the machines move.

## Construction

- A single self-contained HTML file draws the piece with Canvas 2D. No external assets, no gradients, no offscreen canvas, no filters, no shadow blur.
- The world is a 1000 by 1000 square fitted to the Visual Viewport. Canvas CSS size is pinned in pixels on every draw. Resize listeners are registered on both `visualViewport` and `window`.
- Phone state is determined from the physical `window.screen` minimum dimension when available, with the portrait aspect ratio as fallback. The void is full-bleed at every size: the page ground and the canvas fill are the same flat `#E8E8E6`.
- Formation: 3 columns at the frame thirds, 4 stacked pair-rows per column in the upper two-thirds, 2 drones abreast per pair — 24 drones, built explicitly in a nested loop. Each drone's slot is offset from the performer anchor, so the whole formation is defined relative to the figure it serves.
- Every drone position is a closed-form function of piece time: its seeded slot plus micro-corrections made of two seeded sine sums (per-drone phase, frequency, and amplitude from a deterministic hash). Nothing is frame-integrated; the stillness under effort is a few pixels of slow drift against turbulence.
- The orb glow is three layered flat-alpha circles (0.10 / 0.20 / 0.34) under a solid pale-blue core with a white center point — radial falloff without canvas gradients.
- Drag moves the performer. The anchor's position is an analytic smoothstep ease (2.6 s) from its position when the drag began toward the clamped pointer target, and because all slots are anchor-relative, the flock visibly re-forms its columns around the new position. The re-forming is the content.
- A quick tap is the scatter call: a recorded event time drives a closed-form sine-squared bump (3.4 s) that pushes every drone radially outward from the formation center, then lets it re-converge.
- A double tap reseeds the flock: the generation counter advances and the column and row slot offsets are re-derived from the hash, giving a new flock with the same discipline.
- Audio is created only inside the first pointer gesture and only when an AudioContext constructor exists. It is a barely-there rotor wash (looped noise through a bandpass, rising slightly under scatter or drag) under a soft 82 Hz sine — the low tone beneath the performer. The QA renderer remains silent, and no microphone API is ever touched.
- Frame one is synchronous at fixed phase `t = 20` seconds. Animation time is then advanced from the `requestAnimationFrame` timestamp when that API exists; the call is type-guarded.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: `qa-desktop.png`, 1280 by 800.
- Mobile: `qa-mobile.png`, 390 by 844.
- Thumbnail: `thumb.png`, 720 by 720.

Visual inspection of all three final renders confirms:

- Exactly 24 drones: 3 columns × 4 stacked pairs × 2 abreast, each pair reading as two distinct skeletal frames.
- Each drone carries one pale-blue orb with visible glow spill, plus a red LED point (white LED points read at full size).
- The small dark performer stands bottom-center with arms raised; no horizon, no ground line, no text.
- Nothing is clipped on mobile; the formation and performer sit inside the centered square with void margins matching the page ground.

Determinism check: the 720 by 720 thumbnail was rendered twice and compared with `cmp`; the two files were byte-identical. The duplicate render was deleted.

Deviations: none in count, palette, formation grammar, or specified interactions. One refinement round widened the in-pair spacing (±17 to ±22) and tightened the rotor rings so each pair reads as two machines rather than one merged cluster. Audio begins on the first visitor gesture rather than automatically, per the house gesture gate.
