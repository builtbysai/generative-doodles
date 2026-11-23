# №1704 Strata of Noise (PP951, expansion study #224 aaron-penne)

Driver: forty-four horizontal bands, each a noise-perturbed polyline, read as layered cliff strata that slowly drift like floating fabric sheets.

## Mechanism

One seeded value-noise field (3-octave fbm, integer-lattice hash, no Math.random) drives every band. Each of the 44 strips is the solid-filled region between two polylines of 140 points; each polyline is offset by two fbm samples (a slow large-scale term plus a faster fine term) and a slow per-band vertical drift, so the field evolves instead of wiggling uniformly. Band base heights follow y = H * (1 - (1 - f)^1.5), so gaps are wide and airy at the top and compress toward the bottom. Band colors come from a hand-picked 10-color palette (berry #8E2A4E/#A63A5B, plum #5E2B4A/#6E3A5C, mauve #B07D8F/#C49AA8, sage #8A9B7E/#A8B89A, cream #F2E8D5/#EFE3C8) assigned by a mulberry32(1704) walk that never repeats a color on adjacent bands; strips are filled solid with a darkened hairline on the lower edge, so bands never blend into mud. Once per 32-second loop the field snaps to black and white: a smoothstep mix ramps in over cycle phase 0.70-0.76 and out over 0.84-0.90, quantizing each band by luminance to near-black or near-white, then returns to full color. Dragging injects gusts: each pointer move drops a decaying ripple (Gaussian falloff, sigma 150px, sinusoidal ring, 3-second life) that locally displaces nearby lines; the field settles as gusts expire. Watch-only drift runs otherwise. Frame one is a fixed pre-roll at t = 6s (color phase, bwMix 0), drawn synchronously at load; the animation clock starts there.

## Acceptance numbers and probes

Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; read all three renders. Desktop shows a square stage centered on deep plum ground with legible title/date/hint plates; mobile is full-bleed with plates legible and no clipping; thumb is the 720x720 render. Probe (window.__probe) measured: bandCount 44; bwMixAt(6) = 0.000, bwMixAt(24) = 0.926, bwMixAt(25.5) = 1.000, bwMixAt(28) = 0.376, bwMixAt(30) = 0.000, so the snap is full black and white once per 32s cycle and returns to color. A probe render at t = 25.5s confirmed the black-and-white frame visually; a probe render with a gust at canvas center (640, 450) confirmed a localized ripple around the drag point with the rest of the field undisturbed. Determinism: seeded RNG only, fixed t = 6s frame one, requestAnimationFrame guarded by a typeof check.

## Deviations from the prompt

One fix during QA: the first build used y = H * f^1.5 for band heights, which packed bands densely at the top; corrected to y = H * (1 - (1 - f)^1.5) so the field is airy at the top and dense at the bottom as specified, and re-rendered all three sizes. The black-and-white snap quantizes by luminance with a smoothstep edge (bands near mid-luminance land near-black or near-white, never gray), which keeps the snap crisp rather than washed out. No other deviations.

## Gallery note

"Forty-four noise-perturbed bands drift between cliff strata and floating fabric, snapping to black and white once per loop. Drag to stir the field."
