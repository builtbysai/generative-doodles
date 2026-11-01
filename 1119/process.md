# №1119 — Scroll Story

Markus Kison study block MK8. One particle system on warm paper reads an
essay in four movements; scrolling is the reading.

## The piece

800 particles (420 on phones), each holding a seeded position and colour
in all four layouts:

1. **Stream** — seven flowing horizontal sine bands, mostly river blue.
2. **Bars** — fourteen vertical columns of seeded heights, stacked from
   the bottom, mostly ink.
3. **Scatter** — a seeded field; about fifteen percent of the particles
   turn accent red (#C8402A) here, and nowhere else.
4. **Rings** — six concentric rings closing around the centre.

The scroll parameter `s` runs 0 to 3. Position and colour are pure
functions of `s`: the layout lerps between neighbours with a smoothstep
on the fractional part, so scrolling back retraces the exact same paths.
Nothing accumulates; the story can be read in either direction forever.

Each movement carries a one-line caption in small serif at the bottom
margin, crossfading as `s` passes:

- "first, the water finds its way downhill."
- "then we stand the days upright, side by side."
- "for a while, everything is everywhere at once."
- "and at last the years close round us like rings."

## Interaction

- Wheel or vertical drag scrolls the story (the visitor takes over from
  the idle reading; `s` eases toward the target).
- Double-tap returns to the first movement.
- Left alone, the piece reads itself: `s` drifts 0 → 3 over ~75 s,
  holds, then returns over ~27 s, on a 110 s cycle.
- Silent. No sound at all.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
the viewport and the window; CSS size pinned in `fit()` on every draw.
Phone detection via `window.screen` (min dimension < 700) with the
particle count reduced on phones. The first frame is drawn synchronously
at the fixed phase `s = 0` — the stream fully formed, its caption
legible — and the animation loop is anchored to elapsed time since load
behind a `typeof requestAnimationFrame` guard. No gradients, no
`ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`,
no microphone. Visible text is the four captions and the `<title>` only.
