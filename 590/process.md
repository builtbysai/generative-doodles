# Nodal Rosettes, No.1825

## Prompt source

TASKS.md, ellen-fullman study #239, EF2 / PP1072: The Elemental View album-art geometry brought to life. White line rosettes of string-vibration nodal patterns bloom and dissolve on a deep green field, one per wire, pulsing with the overtone content. As a wire's harmonic mix shifts, its rosette redraws itself into a new symmetric figure; rosettes beat against each other like interference. Palette: deep green ground (the Elemental View cover), white nodal lines, faint grey witness grid, one rosette at a time tinted pale amber when its wire is "bowed." Composition: full-field array of rosettes, dense at edges, breathing open in the center; no room, no figure, pure vibration diagram. Interaction: watch-only. Slow continuous drift: rosettes bloom, hold, dissolve; every so often a set synchronizes into one pattern then fractures. No input. Technical approach: 2D canvas. Chladni-figure generator: each rosette from a nodal sum of two standing waves with slowly drifting integer ratios tied to a just-intonation drone mix on WebAudio. Bloom life ~20s per rosette. What to avoid: no random particle sparkles; every line must read as a vibration mode, not decoration; never freeze a rosette as a static image.

## Driver

Each wire's vibration mode drawn as a living rosette that blooms, synchronizes, and fractures.

## Build

- Single self-contained `index.html`: one script block, one synchronous frame at load (t = 60 s, fixed phase), `requestAnimationFrame` guarded by a `typeof` check.
- Seeded PRNG (mulberry32, seed 1825) places all 49 rosettes in a 7x7 pool; no unseeded `Math.random()` or `Date.now()` affects frame one.
- Rosette generator: each figure is a nodal sum of two standing waves, drawn as three nested polylines (no arcs, no sparkles) plus a nodal ring, radial nodal lines, and a center node dot. Lobe counts m (3..8) and n (2..6) drift to neighbouring integer ratios on 40 s and 47 s cadences, so a rosette redraws itself into a new symmetric figure.
- Bloom life 20 s per rosette: bloom in, hold, dissolve, staggered by a seeded offset.
- Sync: on a 90 s cycle, rosettes converge on a shared pattern (m 6, n 4) during seconds 64..76, then fracture back to their own ratios.
- Bowed wire: one rosette at a time (rotating every 20 s) is tinted pale amber.
- Field: full-bleed array on both sizes, 7x5 on desktop, 5x7 on phone, drawn from the same seeded pool in row-major order. Rosettes shrink toward the middle so the center breathes open and stay dense and large at the edges.
- Palette: ground #0d2b1f deep green with a radial lift to #184a34 at center and #061811 at the corners, white nodal lines #f4f6f0, faint grey witness grid rgba(180,190,185,0.07), pale amber #e8c98a for the bowed rosette, hint grey-green #8fa89b.
- Watch-only: no pointer handlers change the picture. A small SOUND OFF button bottom right is the only control; it lazily starts a just-intonation drone (110 Hz base, ratios 1, 1.5, 2, 2.5, 3) inside the tap, default silent, never autoplay. The drone is tied to the prompt's WebAudio note; the visuals run on the same ratio model whether or not sound is on.
- Reduced motion: `prefers-reduced-motion` renders the single static frame and never starts the loop.
- House rules: Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in `draw()` via `canvas.style.width/height` in px; phone detection via `window.screen` (min dimension under 700px) with aspect fallback; page ground is the piece's own background color on both sizes; flicker is slow drift by construction (nothing faster than the 20 s bloom); no audio autoplay.
- node-canvas quirks: a `moveTo` precedes every batched arc; the center dot is a paired arc; fading alphas are rounded to 4 decimals before stringifying.

## Gallery

- Title: Nodal Rosettes
- Date: 2007 · 01 · 10 (formula 2002-01-10 + 1826 days)
- Note: "White nodal rosettes bloom and dissolve on a deep green field, one wire bowed amber at a time. Watch the rosettes bloom, sync, and fracture."

## Acceptance criteria

1. Frame one shows the full rosette field: symmetric white line figures on deep green, one amber bowed rosette, faint witness grid, center breathing open.
2. The field reads as vibration diagrams, not decoration, at 1280x900, 390x844, and 720x720, with nothing clipped and no overlapping plates or text.
3. The piece is watch-only: no click, drag, or tap changes the picture except the opt-in sound toggle.
4. First frame is deterministic: seeded PRNG only, fixed phase at t = 60 s.
5. Reduced motion renders a single static frame.
6. No em dashes in visible copy; no AI-signature copy.

## Deviations

- The just-intonation drone exists only as an opt-in sound toggle (SOUND OFF by default). The prompt ties the ratios to a WebAudio drone mix; the visuals carry the same ratios, and the drone is silent unless the visitor taps, per the no-autoplay house rule.
- Sync uses a fixed 90 s cycle (converge seconds 64..76) rather than a random interval, so the synchronize-and-fracture event is regular by construction; at frame one (t = 60 s) the field is in its varied state, just before a sync.

## Parent fix round (gate, 2026-11-16)
- The piece shipped with no title/date plate (hint only as a DOM overlay). Added a title and date plate drawn on canvas top-left over a dark backing, matching the house template; thumb re-rendered from the fixed script and re-gated at desktop, mobile, and thumb sizes.
