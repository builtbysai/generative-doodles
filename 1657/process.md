# №1657 "Codex 2101967766, Study" — process notes

Driver: density as light — glyphs pack so tightly near the core they read as glow, and the whole fan breathes like a peacock tail.

## Build
- EDG2 (PP904), #218 eric-de-giuli. Title "Codex 2101967766, Study", gallery date 2006 · 07 · 26, gallery note: "Hundreds of glyph-studded rays fan from a glowing core and breathe. Watch only."
- Radial fan from a glowing core anchored low-center: 220 rays over a 140-degree spread, each ray carrying a 1D glyph density field. Glyph step grows with radius squared (0.009 + 0.10 r^2 in normalized radius), so glyphs pack near the core and thin to isolated marks at the rim. 9,031 glyphs total.
- Glyph library written for this piece (the sibling №1656 was not staged yet when this build started, so nothing was borrowed from it): five tiny parametric stroke primitives — loop, kink, crossing, hook, dash-dot — each oriented along its ray.
- Color: warm white (255, 240, 214) near the core fading to cool grey (148, 158, 172) at the rim, alpha 0.6 to 0.3, drawn additive ('lighter') so the dense core saturates into glow. Core glow is a warm radial gradient plus a warm-white core disc and ring. Two bounding arcs (alpha 0.55 at R x 1.01, 0.15 at R x 1.055) form the halo.
- Motion: watch-only, no pointer listeners at all. Each ray drifts on its own slow sinusoid (amplitude 0.014-0.026 rad, frequency 0.05-0.12 rad/s); glyphs shimmer by scale (0.45 rad/s, +/-16%). Nothing flashes faster than ~14 Hz by construction.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; portrait fan centered on black ground on desktop, full-bleed on phones; fixed PHASE = 6 s first frame, rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; seeded mulberry32 RNG (seed 2101967766), no Math.random in the render path; moveTo before every arc; alphas rounded to 4 decimals inside rgba().

## Acceptance criteria (numbers)
- Ray count 200-300 (measured 220).
- Glyph density core vs rim: core band (r 0.05-0.15 R) several times denser than rim band (r 0.85-0.95 R) per unit length (measured ratio 8.06x).
- Ray angles drift over 30 s: max change > 0.01 rad (measured max 0.05088 rad, mean 0.02451 rad).
- Determinism: two fresh loads give identical frame-one ray angles (measured identical).
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no pointer listeners, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1657.js, node-canvas, same shim as render-piece.js): rayCount 220; glyphCount 9,031; density desktop R 640.6 px, core 2,183 glyphs (34.08 per px) vs rim 271 glyphs (4.23 per px), ratio 8.06; drift 0-30 s max 0.05088 rad, mean 0.02451 rad; frame-one ray angles identical across two fresh loads; density mobile R 675.2 px, same counts and ratio 8.06.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 twice. Thumb md5 67ae9104cbc2f98d14909e5cb7943d9d both runs, byte-identical. No listeners registered in any render (watch-only confirmed).
- All three renders visually inspected: desktop shows the glyph fan with a readable density gradient, warm glowing core, and halo bounding arc; mobile full-bleed with the fan filling the width and legible plates; thumb reads the same fan at small size. Title plate "Codex 2101967766, Study / 2006 · 07 · 26" and hint plate "Watch only." legible in all three.

## Deviations
- None from the prompt. The sibling №1656 was not staged when this build started, so the glyph primitive set was written fresh for this piece instead of reusing EDG1 code; the five primitives (loops, kinks, crossings, hooks, dash-dots) follow the prompt's EDG1 library description.

## Parent fix round (fly gate, 2026-11-09)
Gate caught a house-rule gap: the piece read visualViewport dimensions but never registered resize listeners. Fly added the two guarded lines (visualViewport resize + window resize, same pattern as the sibling pieces) immediately after the frame-one size() call. Re-rendered all three sizes after the fix: thumb byte-identical to the staged thumb (md5 67ae9104cbc2f98d14909e5cb7943d9d), desktop and mobile re-inspected clean.
