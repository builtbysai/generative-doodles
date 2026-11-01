# №1168 — Prepared Desktop

Jon Satrom study block JS1 (PP327), after his *Prepared Desktop*
performances (2012–19): the operating system itself as instrument — "scripts,
presets and glitches collide as he tickles the edges of his OS." The piece is
a fake desktop that performs itself. The viewer's pointer does nothing; the
cursor belongs to the performer.

## The performance (32 s loop, watch-only)

- **0–8 s — cascade.** Seven windows spawn from centre outward, each offset
  24 px right and 24 px down from the last, scaling in as they land. The
  scripted cursor travels from title bar to title bar as each window opens.
- **8–20 s — the drag.** The cursor grabs the top window ("jam session") and
  drags it along a lissajous path. Its last second of travel hangs behind it
  as nine ghost copies — chrome rects with the content reduced to a flat
  tint, alpha fading with age: the classic window smear, rebuilt as data
  instead of a trail-buffer canvas.
- **20–24 s — beachball.** A six-segment rainbow beachball pops in at centre
  screen and spins. Everything else holds at its t = 20 state: contents,
  drag, all of it. Only the spinner's own clock runs. In the last 0.6 s the
  dragged window quietly slides home underneath the freeze.
- **24–28 s — close.** Windows shrink away in reverse spawn order while the
  cursor visits each close box.
- **28–32 s — clean desktop.** Hills, dock, menubar, parked cursor. Then the
  loop turns.

## The desktop

Flat low hills (three seeded silhouette layers, #7FB3D5 sky to #2E5A3E
ground), a #F5F5F5 menubar with generic menu words and a clock stuck at
"Fri 4:04 PM", and a dock of eight plain colour tiles with glyph marks — no
logos, no screenshots, no real OS assets anywhere. Window chrome is #E8E8E8
with #C0C0C0 title bars, three dots, and invented titles: untitled-1,
wave.pool, presets, untitled-2, channel jam, sort bench, jam session.

Each window runs a tiny procedural animation, all closed-form functions of
(local coordinates, time), rotating by window: **pixel-sort columns** whose
segments re-sort in steps, **channel-split blocks** that throw red/blue
offset copies on a seeded step clock, and **wave-interference lines** —
five drifting sine polylines that beat against each other.

## Determinism and house rules

Everything on stage — spawn times, drag path, trail samples, freeze, close
order — is a pure function of loop time, so the first frame can be drawn
synchronously at the fixed phase T0 = 14 s: cascade complete, top window
mid-drag with its smear trail behind it, cursor on its title bar. The rAF
loop is typeof-guarded and anchored at T0 + elapsed; all randomness is a
seeded mulberry32 baked at load (the hill silhouettes) or an integer hash —
no Math.random, no state accumulation. Canvas size comes from the Visual
Viewport API with resize listeners on both visualViewport and window;
canvas.style.width/height are pinned in px inside draw(). Phone detection
via window.screen (min dimension < 700 px) with aspect fallback; the whole
desktop scales to fit portrait screens. No gradients, no ctx.filter, no
shadowBlur, no offscreen or trail-buffer canvas, no ImageData, no
createElement, no audio. Silent by design — the only text is the desktop
chrome itself.
