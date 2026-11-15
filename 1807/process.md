# The Permanent Room, No.1807

## Prompt source

TASKS.md, robin-rimbaud study #236, SC8 / PP1054 (mechanisms 4 and 8, site-specific spatial sound + rework): a quiet, dim interior with plain walls, a bench, a single high window with slow daylight, and a row of pill-shaped cutouts in one wall through which faint light passes. Nothing happens quickly. Dust motes drift. The window light crawls across the floor over hours. The piece was built for one specific room and never leaves it. Very occasionally a faint shape passes the pill cutouts, a shadow of someone on the other side, and is gone. Palette: cool greys, warm window light, bench in dark wood tones, low contrast throughout. Composition: fixed interior, centered on the wall of cutouts, window high and small, room sparse, emptiness as the material. Motion/interaction: watch-only; the room does not respond to visitors; never click-to-reload. Technical: static architecture rendered once; slow parametric systems for daylight angle, dust drift, and the rare passing shadow (irregular, minutes apart); frame rate can be low; stillness is the aesthetic. Avoid: no events for entertainment, no people in the room, no doors opening, no sound visualized as spectacle.

## Driver

A fixed room whose stillness is the material, moved only by crawling daylight, drifting dust, and one rare passing shadow.

## Build

- Single self-contained `index.html`: one script block, one synchronous frame at load (t = 0, fixed phase), `requestAnimationFrame` guarded by a `typeof` check.
- Seeded PRNG (mulberry32, seed 1807) places all 42 dust motes; no unseeded `Math.random()` or `Date.now()` affects frame one.
- Room: centered 4:3 interior on both desktop and phone. Cool-grey wall gradient, darker floor, high small warm window at upper left with a faint light shaft and warm floor patch, six pill cutouts centered on the wall with faint warm light through them, dark-wood bench low along the lower wall right of center.
- Daylight crawl: the window light shifts at 0.00004 rad/s, effectively still within any viewing session; the composition at frame one is the canonical one.
- Passing shadow: a 240 s cycle, visible only in a 12 s window late in the cycle, darkening whichever pills it crosses; absent at frame one.
- Dust: 42 motes, slow sinusoidal drift, slightly warmer inside the window light.
- Watch-only: no pointer handlers at all. Hint reads "WATCH ONLY".
- Reduced motion: `prefers-reduced-motion` renders the single static frame and never starts the loop.
- House rules: Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in `draw()` via `canvas.style.width/height` in px; phone detection via `window.screen` (min dimension under 700px) with aspect fallback; page ground is the piece's own background color on both sizes; no flicker by construction; no audio; no people drawn.
- node-canvas quirks: a `moveTo` precedes every batched arc; fading alphas are rounded to 4 decimals before stringifying.

## Gallery

- Title: The Permanent Room
- Date: 2006 · 12 · 23 (formula 2002-01-10 + 1808 days)
- Note: "A room built for stillness; daylight crawls, dust drifts. Watch only."

## Acceptance criteria

1. Frame one shows the full room: pill-cutout wall centered, high small window with warm light spilling partway across the floor, bench, dust motes mid-drift, no shadow passing.
2. The room reads as a sparse dim interior at 1280x900, 390x844, and 720x720, with nothing clipped and no overlapping plates or text.
3. The piece is watch-only: no click, drag, or tap changes anything.
4. First frame is deterministic: seeded PRNG only, fixed phase at t = 0.
5. Reduced motion renders a single static frame.
6. No em dashes in visible copy; no AI-signature copy.

## Deviations

None. The passing shadow uses a fixed 240 s cycle rather than a random interval, so its rarity is regular by construction; at any normal viewing length it appears at most once, and never at frame one.
