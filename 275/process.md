# No.583 — Festejan las Gallinas

EXPANSION #70 maria-j-luque, prompt block 7 ("Festejan"). Built 2026-10-31. Build + QA only; not pushed by the builder.

## Concept

Direct from her observed 2026 textile work "Festejan las gallinas" (32x21cm): three cartoonish chickens embroidered on dusty-rose cloth, celebrating over scattered seed. A bright magenta hen stands center, flanked by two pale blue-gray hens, all appliqué shapes outlined in dark running stitch. Small turquoise stitched stars shine in the upper third. Along the bottom edge, slightly crooked, the dark-thread colophon band carries the real date of the moment the piece is opened, in her pattern: day, month, year, then "ROSARIO". The scene is a watch-only seamless loop: the three hens peck in turn, left, center, right, heads bobbing down to the seed stitches in a staggered three-phase cycle, and the stars give a stitch-glint twice per loop. Dragging gives gentle parallax only. Tapping the colophon band re-stitches it, letter by letter with a little needle, using the then-current date. No barn, no fence, no fourth chicken, no realism.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette (strict, exact, no additions): dusty rose #D9A08F (cloth ground and page ground), magenta #C93A72 (center hen), pale blue-gray #9AA5B1 (flanker hens, needle), yellow #E8B93C (beaks, feet, seed stitches), turquoise #3FA7A0 (stars), dark thread #2A2320 (running stitch, colophon, speckle).
- Stage is a 1000x1000 virtual square centered in the viewport, scaled by min(W,H); canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; `canvas.style.width/height` pinned in px inside `draw()` every frame; phone detection via `window.screen` min dimension < 700px with aspect fallback (kept from the house template).
- Embroidery rendering: every appliqué shape (body, wing, tail, comb, head, beak) is filled flat, then outlined with a dashed running stitch (`setLineDash([8, 5.5])`) in dark thread. Stars are dashed four-point sparkles with a cross-stitch X at the heart. Seeds are 46 short yellow stitch dashes scattered by a seeded ellipse distribution lower-center, where the beaks point. A dashed hem frames the cloth; 260 seeded low-alpha thread speckles give the woven grain (precomputed data, drawn directly; no offscreen canvas, no filters).
- Pecking: 6-second loop. `peckAmount(phase, idx)` gives each hen one 1.15s peck window in her own third of the cycle (order: left flanker, center, right flanker), shaped as a main dip `sin(pi*u)^1.4` plus a small second nod. The head group rotates up to 0.62 rad around the neck pivot, beak swinging down toward the seeds. Star glints pulse at 1.0s and 4.0s within the loop, scaled per-star by seeded offsets. All motion derives from `PHASE0 + elapsed`, PHASE0 = 0; at phase 0 every peck amount is 0, so frame one has all heads up.
- The colophon (her signature rule): the string is generated once at load from `new Date()` as `D DE MES DE AAAA. ROSARIO` with Spanish month names, rendered in a bold cursive stack with seeded per-glyph jitter (fixed by seed, so the lettering never flickers), stitch ticks under the letters, and a stitched hem line above the band. Tapping the band recomputes the string from the current moment and re-stitches it at 0.055s per letter, with a blue-gray needle and trailing thread drawn while the stitch-in is in flight. This runtime date is the prompt's required mechanism and the piece's only `Date` use, scoped to the colophon string; animation phase never reads the clock (`performance.now` only measures elapsed time since load for the rAF anchor, and `Date.now` is never called).
- Parallax: pointer drag moves three layers (stars 0.35x, chickens 0.6x, seeds 1x), clamped and eased; a tap that did not move is tested against the colophon band only. A tiny lowercase "drag" hint sits inside the hem at 45% thread alpha.
- Determinism: frame one is one synchronous fully-composed draw at PHASE0 (completed scene, colophon for the load date stitched in full, heads up). rAF is `typeof`-guarded and anchored as fixedOffset + elapsed, so the QA renderer (no rAF, no AudioContext, no `document.createElement`) draws frame one and stops.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280x900): trio centered, magenta hen between the two blue-gray flankers, stitched outlines everywhere, eight turquoise stars upper third, yellow seed dashes below the beaks, colophon band legible along the bottom.
  - `qa-mobile.png` (390x844): full square stage centered on the rose ground, nothing clipped; colophon auto-shrinks to fit on one line.
  - `thumb.png` (720x720): same composition at gallery size.
- Colophon date carried by all QA renders: **"31 DE OCTUBRE DE 2026. ROSARIO"** — the real date of the QA session (Saturday 31 October 2026), generated from `new Date()` at load as specced.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical; the second render was deleted.
- Grep checks: `new Date()` appears only at load and in the colophon tap handler; zero `Date.now`, zero `document.createElement`, zero AudioContext, zero external URLs.
- Read-back of all three renders confirmed: exactly three chickens, heads up in frame one, seeds where the beaks point, stars in the upper third only, colophon real and legible, no text clipped on mobile. No fixes were needed after the first render pass.

## Deviations

- None from the prompt block. Notes: the colophon's real runtime date is the prompt's explicit fixed rule (the sanctioned exception to the house no-date rule), scoped to that string only; the gallery title "Festejan las Gallinas" is the prompt's title suggestion verbatim. The peck order (left, center, right) and the 6s loop length are construction choices inside the specced "peck in turn, staggered" mechanism.
