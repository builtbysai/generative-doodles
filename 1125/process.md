# №1125 — Floating Numbers

Joachim Sauter study block JS6, after *floating.numbers* (2004). A dark table
seen from directly above, covered in small glowing numbers that drift like
plankton and gather into loose data-neighbourhoods — prices near prices,
dates near dates.

## How it is built

- **Seeded everything.** One mulberry32 stream (seed 11250607) generates the
  whole population: 340 numbers plus one hero. Each number owns a glyph
  string (values like `3.7`, `812`; dates like `1994`, `03.11`; operators
  `+ % = - / x : *`), a type with its palette colour (phosphor cyan
  `#7DF9FF` for values, warm amber `#FFB84D` for dates, dim gray `#5A6472`
  for operators), and a home cluster. The first two numbers in each cluster
  are larger "cluster-heads"; the rest are small body size.
- **Clusters breathe.** Seven anchors sit in fixed neighbourhood slots,
  re-jittered by the seed on every tide, and wander slowly on Lissajous
  paths. Each number orbits its anchor on its own slow period; the orbit
  radius pulses on a shared 55-second breathing cycle, so neighbourhoods
  swell and relax. Position is a closed-form function of time — nothing is
  frame-integrated.
- **Scatter.** Dragging records impulse events along the pointer path. Every
  number answers each impulse with a closed-form swirl response — radial
  plus tangential, an exponentially damped sine that settles in about three
  seconds — so a touch stirs a local whirlpool that dies back into the
  clustering. A faint white ripple ring marks each touch-down.
- **Data tide.** Double-tap (or ninety idle seconds) fires a tide: the
  anchor generation increments, and anchors ease over four seconds from the
  old seeded layout to the new one with a smoothstep blend. The numbers
  follow their anchors and re-form as different neighbourhoods.
- **Hero number.** One large cyan integer, placed off-centre, whose value
  is a pure function of time (`start + floor(t/6)`), so it slowly counts.
  Its draw position is clamped with `measureText` so it never spills off
  the table on narrow screens.
- **Table.** `#10141B` with 110 precomputed faint horizontal brushed
  streaks, redrawn each frame from seed data.
- **Glow without forbidden tricks.** Each glyph is drawn twice: once at
  full size with 14% alpha as a halo, once at 0.72 size at full alpha. No
  gradients, no `shadowBlur`, no `ctx.filter`, no offscreen canvas.

## House rules honoured

- Canvas sized from the Visual Viewport API, resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in
  `draw()` on every frame.
- Phone detection via `window.screen` (min dimension < 700) with the
  `h > w * 1.15` aspect fallback; phones draw a thinned population.
- Determinism: the first frame is drawn synchronously at the fixed phase
  T0 = 14 s; the rAF loop is anchored at T0 + elapsed, guarded with a
  `typeof requestAnimationFrame` check.
- Interaction: drag = scatter, double-tap = tide. Never click-to-reload.
  No sound — ships silent.

## QA

Rendered with the house renderer: `qa-desktop.png` (1280×800),
`qa-mobile.png` (390×844), `thumb.png` (720×720). The thumb was rendered
twice and byte-compared with `cmp` — identical; the duplicate was deleted.
Frame one shows the table covered in glowing cyan/amber/gray numbers in
loose clusters, with the large hero number (`1440` at this phase) at
mid-left. Two build fixes are baked in: anchor slots replaced centre-biased
random placement (which collapsed into two knots), and the hero is clamped
on-canvas after the first mobile render clipped it.
