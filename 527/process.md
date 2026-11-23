# №1653 "Fragmentation of the Continuum" — process notes

Driver: a luminous shell expands across a dark field and the continuum fragments into particles behind its front; ahead of the front everything is still smooth and dark.

## Build
- HF6 (PP900), #217 HAL09999. Spec: parent task brief (PP900). Title "Fragmentation of the Continuum", gallery date 2006 · 07 · 22, gallery note: "A luminous shell expands and the continuum fragments into particles behind its front. Tap to seed the next front."
- Mechanism: one radial front per experiment. Each front has a seed point, a travel time, and a hash seed dealt from a fixed 6-entry authored table. The front radius grows linearly from the seed to an Rmax that always clears the farthest corner of the composition rect, then stalls for a 3 s hold; when the hold ends the next front begins from the next table seed. Particles are born with the front: each carries an angle, a radial fraction (biased toward the rim, so the fresh grain is densest just behind the front), an outward drift speed, a size, a color class, and a decay clock. A particle is rendered only after the front has passed its radius, so the before/after of the front is the piece: ahead of the rim the field is untouched dark with only a faint blue sheen annulus; behind it, discrete points in red-orange (62% of the wake), gold, silver-white core, and blue stragglers, drifting outward and fading on an 8 s exponential. The rim itself is a silver-white ring with a red-orange ring just inside and a soft glow ring.
- Tap seeds the next front at the tap point immediately, with a fresh hash seed; old fronts keep decaying behind it. A tap is a new experiment, never a restart; nothing reloads. Up to 4 fronts are kept.
- Audio: silent build. No WebAudio added; the visual phase transition is the whole piece.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; field-like composition, full-bleed on phones and a centered square on desktop (ground outside the square is the same black void, so the front leaves into darkness); fixed PHASE = 5 s first frame, rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; no Math.random, all seeds from mulberry32 over authored table salts; no offscreen canvases, no document.createElement; moveTo before every arc; alphas rounded to 4 decimals inside rgba(); particles drawn as fillRect dots, additive ('lighter') for the wake and rim glow.

## Acceptance criteria (numbers)
- Frame one at t = 5 s: front at half its travel (fraction 0.500), radius 357.7 px desktop, 267.7 px mobile.
- Particles behind the front at frame one > 0 (measured 645 desktop, 336 mobile); particles ahead hidden, none rendered (1,555 hidden desktop).
- Front radius grows monotonically over the first 5 s and stalls exactly at Rmax after its travel time (715.3 px at t = 10 and t = 12).
- Tap: adds one front whose seed point is the tap point (tap at 900,300 desktop lands at bx 0.7889, by 0.3333) and whose hash seed differs from every earlier front.
- Successive fronts (auto-advance to t = 14 and t = 27.5, plus a second tap) all carry distinct hash seeds.
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1653.js, node-canvas, same shim as render-piece.js), all 16 checks passed: radii at 0..5 s in 0.5 s steps = 0.0, 35.8, 71.5, 107.3, 143.1, 178.8, 214.6, 250.4, 286.1, 321.9, 357.7 (strictly increasing); frame-one counts desktop 2,200 total, 645 behind, 1,555 ahead-hidden; mobile 1,200 total, 336 behind; tap front point (0.7889, 0.3333) matches the tap; seeds across auto fronts and two taps = 1164364, 2671204746, 1018838834, 3702389257, all distinct; first front seed point unchanged by tap; stall verified at Rmax 715.3 px.
- Determinism: two fresh 720x720 thumb renders, md5 f5198d831f2afce0b6194b8d1291e225 both times, byte-identical.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720. All three visually inspected: desktop shows the silver-white rim with red-orange inner ring mid-expansion inside the centered square, red-orange/silver/blue grain dense just behind the rim and thinning toward the center as it decays, faint blue sheen annulus ahead of the front clipped cleanly at the square edge, plates legible; mobile full-bleed with the front arc sweeping across the screen and legible plates; thumb reads the same shell and wake at small size. No spill outside the composition rect, no doubled or off-center rendering on mobile.

## Deviations
- "Millions of discrete particles" is not literally achievable in canvas 2D at 60 fps, so the wake is 2,200 discrete particles per front on desktop (1,200 on phones), each individually positioned, colored, and decayed by the front-pass mechanism. The count is honest and recorded here; nothing in the piece claims a larger number.
- The front travels at constant speed rather than accelerating: the prompt asks for expansion, stall, and a new front, and a constant-speed front keeps the frame-one phase exact and the stall crisp. The hold between fronts is 3 s.
- The continuum ahead of the front is a faint blue sheen annulus (alpha 0.10) rather than a rendered smooth field: the untouched dark void plus the sheen is the honest canvas-2D reading of "smooth continuum ahead", and it keeps the wake behind the front uncontaminated.

## Fix rounds
- None. First build passed all 16 probe checks and the visual gate on the first render.
