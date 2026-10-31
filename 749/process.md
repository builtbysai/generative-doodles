# No.749 Alpha Tunnel

EXPANSION #91 james-turrell, prompt block 6 "Alpha Tunnel" (TASKS.md, verified verbatim). Roden Crater's Alpha Tunnel: an 854 ft camera obscura corridor ending in an Image Stone that projects the sun or moon computed from the real date.

## Concept

A one-point-perspective corridor of stone courses runs from the frame edges (the tunnel mouth) to a pale elliptical Image Stone at the vanishing point, slightly above center. A translucent light shaft falls from the mouth to the stone, with seeded dust motes drifting inside it. What the stone shows is decided by the actual date, exactly as the real tunnel's image is: in the southernmost-sunset window (Dec 11-31) the sun's image burns on the stone at the position its declination dictates; near a major lunar standstill a dim moon appears; the rest of the year the stone stays near-dark with only a faint outline. No label, no date readout, no UI: the piece is the instrument, not a dashboard. Watch-only; there is no interaction.

## Construction

- Courses: concentric rectangles shrinking geometrically (ratio 1.42) toward the vanishing point, drawn largest first so flat bands form between them. Alternate courses take a 38% course-line wash, each ring gets a pale top-edge bevel catch and a dark bottom edge, and the ring boundary is stroked in the course-line tone. Flat fills only, no texture, no gradients.
- Light shaft: three nested translucent quads from the bottom edge converging on the stone, composited additively (`lighter`), breathing ±5% on a 47 s closed-form cycle.
- Dust: 90 motes from one mulberry32 stream (seed 74903117), positioned in shaft coordinates (u along, v across); drift and twinkle are closed-form sines of loop time, clipped to the shaft quad.
- Declination model: δ = −23.44° · cos(2π (dayOfYear + 10) / 365). The sun disc sits on the stone at (0.25 · δ/23.44 · Rx, −0.55 · δ/23.44 · Ry): the camera obscura inverts, so the deep southern declination of late December puts the image low on the stone. Its glow is three layered alpha discs over a solid core, all in the sun tone.
- Standstill model: major standstills recur on an 18.6-year cycle anchored at 2006 (2006, 2025, 2043). If the date falls within 0.8 years of an extreme and it is not the December sun window, the stone carries a dim moon disc (#8AA8C8 at 50% with a faint additive halo). Sun takes precedence when both would apply.
- House adaptation (date determinism): the program reads `Date` only at (year, month, day) resolution, so the branch and the disc position are identical for the whole day and frame one is reproducible for the byte gate. This is the sanctioned pattern for prompt-required date content, the same one used by the runtime-date colophons in earlier pieces. Dust is the only time-varying element and it is a closed-form function of loop time anchored at the first rAF timestamp; frame one is the synchronous draw(0).
- Palette, strict: stone #2A2622, course lines #1A1815, Image Stone #D8D2C4, sun #FFB347, moon #8AA8C8, void #0A0908. Nothing else; shading is alpha layering of these tones.
- Sizing follows the house rules: Visual Viewport API with resize listeners on visualViewport and window, canvas style pinned in px every frame, phone detection via window.screen (min dimension < 700 px) with the h > w*1.15 aspect fallback, vanishing point lifted slightly on phones.

## QA log

- Rendered with render-piece.js (node-canvas): qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Today (2026-10-31) takes the DARK branch, as expected: October 31 is outside the Dec 11-31 sun window, and the standstill distance is about 2.2 years from the 2025 extreme (threshold 0.8), so no moon. All three renders show the corridor converging to the dim Image Stone ellipse (30% pale fill, faint outline), the light shaft, and dust motes. Mobile refits with nothing clipped.
- Sun branch verified with the inert QA hook `?seed=d2026-12-20` (throwaway render, read back, deleted): the stone brightens and the sun disc burns low-left on it (δ ≈ −23.4°, so the position lands at about (−0.25 Rx, +0.55 Ry)) with layered glow, and the shaft warms. The hook is inert without the query string.
- Determinism: thumb.png rendered twice back-to-back, byte-identical (cmp clean), and re-verified identical after a cosmetic code tidy. Duplicate renders deleted.
- Grep audit: no external URLs, no date strings drawn, no em dashes, no AudioContext, no offscreen canvas, no ctx.filter; Date is read only for year/month/day.
