# №1283 "Never Say Goodbye" (jagdeep-raina JR4, PP442)

## Prompt
A grid of portrait frames like sticker-book collectables: shoulders-up singer portraits in simple rectangular frames, arranged in rows against a chalky pink washed background, with hand-drawn love-hearts and bubble-writing captions scattered between them, the whole like a childhood poster. Grounded in Raina's *Never Say Goodbye* (2015): bhangra singers memorialized "like sticker book collectables... arranged in a grid... against a chalky pink washed background... recognizable as a hall of fame that memorializes the voices of this acoustic culture that had a political function."

## Palette
Chalky pink #E5A9B0; wash deep rose #C97B84; frame cream #F0E6D4; ink portrait #3A3330; love-heart red #C22E4A; bubble-writing blue #4E7FB5; caption gold #D9A441; ground deep #1B1518.

## Composition
3x4 portrait grid, each frame slightly rotated ("a little askew"), centered as a poster on the chalky pink wash; 14 hand-drawn hearts and 10 bubble-word balloons scattered in the margins and gaps, kept out of frame rects. The wash carries seeded chalk speckles (rose and cream) for hand-drawn texture. Every portrait is procedural and generic: five headwear variants (turban, cap, side hair, scarf drape, bun), optional beard stubble, dot eyes and dash mouths. No real names, no real likenesses; captions are decorative bubble-word shapes only (balloon outline + wavy squiggle glyphs, no legible letters).

## Motion / interaction
- Portraits sway gently out of sync (per-frame amplitude, period, phase; watch-only drift).
- Drag horizontally to stir the wash: breeze computed closed-form from recorded drag events (exp decay, tau 2.2 s, clamped), frames lean with per-frame phase lag, hearts bob.
- Tap a portrait (movement under 12 px, under 0.6 s) to make it glow warm for a few seconds like a stage light: envelope ramps over 0.4 s, holds to 2.0 s, decays to 0 by 3.5 s, drawn as layered flat-alpha gold ellipses. Never neon, never click-to-reload.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen physical size (min dimension < 700 px) with aspect fallback; wash fills the frame full-bleed on phones, poster centered on both sizes.
- Deterministic first frame: boot flag, synchronous draw(0) at load and on resize; the performance.now() clock starts only with the rAF loop. No Math.random anywhere; all variation from a seeded mulberry32 PRNG.
- node-canvas safe: no rAF, AudioContext, document.createElement, WebGL, offscreen canvas, ctx.filter, shadowBlur, or gradients; dots drawn as paired arcs with moveTo before every batched arc; each ellipse its own beginPath.
- No visible text except `<title>`; silent; no getUserMedia/microphone.

## QA
- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected. Desktop and mobile hold the same read: 3x4 slightly askew cream frames on chalky pink, hearts and bubble balloons scattered, no legible text.
- Thumb rendered three times at 720x720, cmp byte-identical (confirmed again after the fix below).
- Mechanics probed through the piece's own pointer handlers with a controlled-clock harness: tap on frame 0 changed the frame at t = 1.5 s (glow at full intensity); horizontal drag changed the frame (breeze lean); late frame at t = 5 s differs from the tapped frame (glow decayed, breeze decayed).

## Fix rounds
- One fix: the turban headwear arc was drawn 0 to PI, which in canvas coordinates is the lower half, so the first render showed turbans as bowls covering the face. Corrected to PI to 0 (upper half); turbans now read as wrapped head coverings above the head. Desktop, mobile, and thumb re-rendered after the fix; thumb re-verified byte-identical.

## Files
- index.html — md5 f17248bb87c25704bc950e1b3dc16d13
- thumb.png — md5 940707283a47006cdcee5cf75307308b
- qa-desktop.png, qa-mobile.png — QA artifacts, not ship files
