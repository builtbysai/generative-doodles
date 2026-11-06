# No.1561 "My Mother's Compiler"

- Title: My Mother's Compiler
- Prompt code: TW2 / PP808, EXPANSION #206 shunsuke-takawo
- Formula date: 2006 · 04 · 21
- Interaction cue: Drag to ripple the quilt.

## Palette

- Teal #2E7D74, pink #E88AA0, yellow #E4B93C, vermilion #C63B2A on near-black #14100E. Nothing else.

## Composition

- Edge-to-edge 14x14 tile grid on a near-black ground, with a slight outer margin in black (2% of the smaller frame dimension). The grid is a square sized to the smaller viewport dimension and centered, so it keeps its shape on phones and desktop alike; on phones the same 14x14 grid renders with smaller tiles and no clipping.
- Every tile is one of the four palette colors, exactly 49 tiles per color across the 196 tiles, assigned by a seeded shuffle. Each tile is subdivided into a 2x2 of smaller quarter-arcs, each with its own seeded rotation: a stroked quarter circle of the tile color, radius equal to the sub-cell size, centered on a sub-cell corner, so arcs meet at sub-cell edge midpoints in the classic Truchet patchwork.
- 29 tiles break pattern: 9 carry small triangle clusters, 20 carry small dot clusters, in the tile color.

## Motion / interaction

- Drag anywhere: each pointerdown (and each 50 px of drag travel) records a wave event. A wavefront radiates from the touch point and each tile ratchets exactly 90 degrees as the front passes it, easing over 0.45 s with a smoothstep. The wave crosses the field in about 1.2 s. Tiles always settle back to exact grid positions; nothing drifts off-grid.
- Watch-only otherwise: a slow autonomous rotation wave starts every 20 s from a seeded point in the field and ratchets every tile 90 degrees the same way, so the piece never sits dead. The first autonomous wave starts at t = 20 s.
- No click-to-reload, no click-to-restart, no narrative arcs, no photorealism, no hidden mechanisms. No visible text on the piece.

## Determinism approach

- All layout randomness comes from mulberry32(1561000) at load: color shuffle, per-tile base rotation, per-sub-cell arc rotation, break-tile kinds and positions, autonomous wave origins (seeded per wave index).
- Tile rotation is a closed-form function of piece time plus recorded drag events: base rotation plus, per event, a smoothstep of (t minus radial arrival time), plus, per autonomous wave, the same. Settled waves contribute exactly one 90-degree step each. No frame-integrated state, no Math.random at draw time, no wall-clock phase. One synchronous frame is drawn at load; requestAnimationFrame calls are typeof-guarded.

## QA renders inspected

- Desktop 1280x900: dense quarter-arc patchwork fills the centered square, all four colors balanced, break tiles visible as triangle and dot clusters, grid on-grid with no clipping and no drift.
- Mobile 390x844: same 14x14 grid, smaller tiles, no clipping; square grid centered on the black ground.
- Thumb 720x720: final render, patchwork reads clearly at gallery size.
- No fix rounds on the piece. One probe-harness timing correction: the first drag probe sampled at t = 1.5 s, by which the nearest tile had already fully ratcheted (arrival about 1.03 s plus 0.45 s ease); the probe now samples at t = 1.2 s, where the near tile reads +0.417 steps mid-flight.

## Probe results (probe-1561.js, 14/14 passed)

- Frame-one determinism: two fresh 720x720 renders byte-identical (md5 ddaa0709aaf36005fce28ced37f917c6); a second thumb re-render matches the shipped thumb byte-identically.
- Grid geometry: 14x14, tile size 49.37 px at 720x720, centered, on-grid.
- Color counts exactly 49 per color; pixel shares teal 24.1%, pink 24.4%, yellow 25.1%, vermilion 26.4%.
- Autonomous wave: no wave before t = 20 s; at t = 25 s every tile is exactly +1.000 step and pixels differ from frame one.
- Drag wave: at t = 1.2 s after a touch at t = 1.0 s the nearest tile is +0.417 steps while the farthest tile is +0.0000; tiles ratchet in distance order from the touch point; by t = 5 s every tile has settled at exactly +1.000 step and the dragged frame differs from an undisturbed run at the same timestamp.
