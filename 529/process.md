# №1659 "Mazinaw, After the Storm" — process notes

Driver: a black field of feathery strokes keeps forming and dissolving vortices, brushed into being by something large and unseen.

## Build
- EDG4 (PP906), #218 eric-de-giuli. Title "Mazinaw, After the Storm", gallery date 2006 · 07 · 28, gallery note: "Fine feathery strokes churn into vortices, brushed into being by an unseen hand. Watch only."
- Storm engine: a closed-form flow field, the analytic curl of a 3-term sine potential (divergence-free by construction), plus six authored vortices with slow spawn/decay envelopes, plus one slow global rotation (0.03 rad/s about frame centre) so the field never settles. No frame-integrated state anywhere: each stroke's head position is a pure function of piece time t, computed by advecting its seeded origin forward over a fixed 8 s window in 16 Euler steps ending at t.
- Strokes: 3,000, seeded by mulberry32(1659), drawn as short tapering lines along the local flow direction with per-stroke directional jitter (±0.12 rad) and length scaled by local speed (4-24 px). Five grey bands from charcoal (58,58,64) to silver (212,212,216), alpha 0.30-0.55, drawn additive ('lighter') on black so filaments saturate where strokes gather. One violet hint: strokes whose head lands in the upper-right edge band (x > 0.86 of frame width, y 0.10-0.40 of frame height) are drawn violet (126,111,208) at alpha 0.5, nowhere else.
- Vortices: six, all off-centre by construction (fractional centres (0.28,0.30), (0.70,0.66), (0.78,0.24), (0.20,0.74), (0.45,0.82), (0.86,0.55); none in the middle). Radii 0.17-0.26 of the short side, periods 43-64 s, alternating swirl direction, each with a slight inward pull (0.22x) so filaments gather. Envelopes are 0.25 + 0.75 * (0.5 + 0.5 sin(2πt/P + φ))^2, so each vortex waxes and wanes on its own slow timer and a different set dominates at different times.
- Motion: watch-only, no pointer listeners at all. Nothing flashes faster than ~14 Hz by construction: the fastest time frequency in the field is the 0.11 rad/s curl term.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; field-like composition, full-bleed on phones and desktop; fixed PHASE = 8 s first frame (the 8 s advection window is already full, so frame one shows developed vortices), rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; seeded RNG only, no Math.random in the render path; alphas rounded to 4 decimals inside rgba(); prefers-reduced-motion renders the still frame.

## Acceptance criteria (numbers)
- Stroke count 3,000 (measured 3,000 on desktop and mobile).
- Vortex count 6, all off-centre (measured 6; centres listed above).
- Violet hint confined to the right edge band: 69 strokes at t = 8 s desktop, 79 mobile, 57 at t = 38 s desktop (2-3% of the population, edge only).
- Vortices wax and wane: envelopes at t = 8 s are 0.873, 0.906, 0.296, 0.250, 0.417, 0.992; at t = 38 s they are 0.250, 0.250, 0.989, 0.952, 0.279, 0.252 (a different pair dominates).
- Strokes keep advecting: mean head displacement 8 s to 38 s is 0.665 normalized units (about 600 px on desktop); 8 s to 9 s is 0.091 units (about 81 px in one second).
- Determinism: two fresh loads give identical stroke positions at t = 8 s (measured identical).
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no pointer listeners, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1659.js, node-canvas, same shim as render-piece.js): strokeCount 3,000; vortexCount 6; violetCount 69 desktop / 79 mobile at t = 8; envelopes as above; meanDrift 8->38 0.6649, 8->9 0.0906; frame-one positions identical across two fresh loads; listeners vv:resize, win:resize.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 twice. Thumb md5 3ebbacbbc8e108dac235c2a1384147e2 both runs, byte-identical.
- All three renders visually inspected: desktop shows sweeping filaments gathering into arcs and a swirl at bottom right, with the violet hint as a few strokes at the right edge; mobile full-bleed with dense filament braids and the violet streak at the top-right edge; thumb reads the same storm at small size. Title plate "Mazinaw, After the Storm / 2006 · 07 · 28" and hint plate "Watch only." legible in all three.
- Density fix round: the first build used 2,100 strokes and read sparse on desktop; raised to 3,000 and re-rendered all three sizes. No other changes.

## Deviations
- None from the prompt. The violet hint is applied by head position at render time (strokes whose advected head lands in the edge band), so the exact violet stroke count varies slightly with time (69 at t = 8, 57 at t = 38 on desktop); the hint stays at the right edge and stays a small minority of the population.
