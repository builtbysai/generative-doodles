# №1552 — The Daily Cell

kiyoshinakauchi JK1, PP799, cron expansion study #205. Gallery date: 2006 · 04 · 12.

## Palette

- Ground light grey #EFEFEF; faces near-black #1a1a1a; wireframe vivid green #27EF27; nothing else.

## Motion

Watch-first, migrating-holes loop. A 3D value-noise field (position x frame) drifts continuously: noise is sampled at (point * 1.8 + t * drift) with drift rates 0.030 / 0.021 / -0.017 per second, so holes open, travel, and close over ~20 s cycles. The torus itself barely turns: one full spin per 300 s around its vertical axis, seen slightly from above (X tilt -0.38 rad).

## Interaction

Drag presses the noise field: while pressed, cells near the pointer are pulled toward the noise band centre (Gaussian falloff, radius 0.18 of min dimension, press eased 0 to 1), so holes gather and follow the pointer; on release the press eases back to 0 and holes return to their drift. Drag never deletes the torus, never freezes the field, never adds a second solid. No click-to-reload; no visible text except the title.

## Technical

Canvas 2D. Torus as a 56 x 28 (u, v) parametric grid (1,568 cells); per-cell value noise sampled at the cell centroid; cell scale is 0 inside the noise band (|f - 0.5| < 0.02) and full outside (|f - 0.5| > 0.055), smoothstepped between. Faces drawn dark, wireframe drawn green; cells painter-sorted by depth. Deterministic fixed-phase first frame: all randomness from mulberry32 with fixed seed 1552000; all state a closed-form function of piece time; no wall clock, no per-frame Math.random. House rules per template 1551: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen (min dimension < 700 px) with aspect fallback, centered geometric piece keeping its shape on the piece's own ground colour. One synchronous frame at load; requestAnimationFrame guarded with a typeof check.

## Probes

Probe harness (/tmp/probe-1552.js): stubbed rAF driving the piece's own loop, synthetic pointer events to its own listeners, 1280x900.

- Frame-one determinism: two independent renders byte-identical, md5 fc5fe1adf12724fcc53accc27cc8c432 (matches probe t=0 buffer).
- t=0 vs t=5 differ: pixel buffers differ; hole centroid (661.8, 461.5) at t=0 moves to (617.9, 429.2) at t=5, (656.4, 423.3) at t=10, (614.8, 433.3) at t=20. Holes migrate.
- Drag: press at (998, 450) on the ring, hold 2 s: hole count 160 to 198, centroid x 614.8 to 690.9, toward the pointer, press 1. Move pointer to (384, 675) while held: centroid (690.9, 436.2) to (625.2, 455.5), following the pointer. Release, 4 s: press 0, hole count back to 153, drift resumed.
- Renders inspected: desktop 1280x900, mobile 390x844, thumb 720x720. Dark torus centred with generous grey margins on all three; green wireframe clusters in patches where cells hold full; holes show ground through the surface; mobile keeps the torus shape, centred.

## Fix rounds

None. First build passed render inspection and all probes.

## Gallery note

Dark torus on light grey, its quad cells gated by a drifting noise field so holes open, migrate, and close across its surface, green wireframe clustering like lichen where cells hold full. Drag to press the field.
