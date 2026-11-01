# №1143 — Reworld

kimchi and chips study block KC8 (2023– ). Their Seoul Biennale
pavilion — a wall of a thousand-plus motorised micro-prisms refracting
the city itself into mosaic images, "a screen that generates images
solely from the city's existing elements" — as a piece.

## The piece

A full-bleed wall of 400 micro-prism tiles (20 × 20) on hairline grout
(#060708). There is no picture anywhere in the code: underneath the
wall sits one hidden procedural city, and every tile is a small
refracting window into it. Each tile samples the city at its own
offset, its own rotation and its own zoom, and each prism turns slowly
on its own motor, so the wall is perpetually re-tessellating — a city
recognisable only as fractured glimpses: pale sky, dark facade, a
warm sun caught whole inside one tile and sliced across three others.

Every 40 seconds the field re-tunes: all prisms sweep over 3 seconds
to new rest angles and the mosaic re-forms around a new reading of the
same city. As a prism turns through the light direction, one edge
catches a white glint at 0.4 alpha — the wall glitters.

## The hidden city

The city is a pure function, `cityAt(u, v, t)`, never drawn directly:

- **Sky** — night #0B1220 to daylight #BFD4E6 over a 120-second
  day/night cycle (piecewise dayness keyframes), dawn greys #8A8F98 at
  the day's edge, dusk amber #E8A34E pooled at the horizon, and slow
  diagonal weather bands drifting through the tone.
- **Sun** — a disc on an arc across the sky, warming toward amber at
  dusk, with a soft halo mixed into the sky around it.
- **Buildings** — two seeded skyline layers (blocky per-building hash
  heights) standing as silhouettes over the sky; a hash grid of
  windows in their facades, dark glass by day and lit warm #FFE9B8 in
  proportion to the night factor.
- **Traffic** — fourteen seeded specks running two lanes along the
  street band at the bottom of the scene, faint by day, glowing at
  night.

Each tile renders by sampling `cityAt` on a 4 × 4 sub-grid (3 × 3 on
phones) inside its rotated, offset, zoomed frame, wrapping toroidally
through the city — no offscreen canvas anywhere, so any frame of the
piece is exactly reproducible from the seed and the clock.

## Motion and interaction

- Prism angles are closed-form: a slow per-tile motor rate, a rest
  angle per tuning step drawn from a deterministic hash stream, and a
  3-second eased sweep into each new tuning.
- **Drag** stirs the prisms: each recorded pointer point launches a
  damped spin wave that propagates outward across the wall at finite
  speed and settles — the mosaic churns locally, then re-settles into
  a new reading.
- **Double-tap** forces a re-tune now: every prism sweeps to a fresh
  rest angle.
- **Sound** (the prompt's urban hum and re-tune shimmer) follows the
  house Franke rule: the visuals are complete silent; a very quiet
  WebAudio layer — two detuned 55 Hz oscillators and a band-passed
  noise bed under a 0.03 master gain, with a soft high ping when the
  field re-tunes — is created lazily inside the first visitor gesture
  only, typeof-guarded. Never click-to-reload.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in fit(),
  which runs inside draw().
- Phone detection via window.screen physical size (min dimension
  < 700 px), aspect fallback (h > w * 1.15); sub-grid drops to 3 × 3
  on phones.
- Determinism: seeded mulberry32 and hash streams only, no
  Math.random in the visuals; the synchronous first frame is drawn at
  a fixed phase (t = 137 s — morning light: pale blue/grey fragments,
  the sun visible inside several tiles, windows still dark, a few
  traffic specks on the street); requestAnimationFrame guarded by a
  typeof check and anchored to that phase.
- No gradients, no ctx.filter, no shadowBlur, no createElement, no
  microphone. No visible text except the <title>.
