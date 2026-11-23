# №1652 "Field Transformations" — process notes

Driver: summed wave sources paint a color field whose hot bands are the crests themselves.

## Build
- HF5 (PP899), #217 HAL09999. Spec: `BATCH-1648-1652-SPEC.md`. Title "Field Transformations", gallery date 2006 · 07 · 21, gallery note: "Wave sources meet and trade color across a breathing field. Tap to add a wave source."
- Field = sum of sinusoidal sources on a coarse grid (12 px desktop, 14 px phone), painted as a low-resolution field image. 3 drifting point sources enter from the left, right, and top edges; 1 diagonal plane wave (angle -0.61 rad) from the top edge supplies the diagonal red-hot band direction. Amplitude normalized by the sum of source amplitudes, mapped through a hot/cool ramp: crests near-black to dark red to red-orange to yellow to near-white; troughs near-black through deep blue to cyan; mid-field near-black ground.
- Crest cores: white-hot discs drawn only where a cell exceeds 85% of the current frame's own maximum amplitude (and 0.55 absolute), so the hot bands read as real constructive maxima.
- Sources marked with cool cyan cores, steady rings, and expanding fading pulse rings.
- Tap appends a point source at the tap point, parameters dealt in order from a fixed 4-entry authored table; capped at 8 total sources; sources are never removed. Tap parameters are fixed, tap position is the only input.
- Audio: silent build. No WebAudio added; the spec allows a silent build and the visual field is the whole piece. Noted here per spec.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; full-bleed field on phones and desktop; fixed PHASE = 6 s first frame, rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; no Math.random, all seeds fixed authored tables; no offscreen canvases, no document.createElement; moveTo before every arc; alphas rounded to 4 decimals inside rgba().

## Acceptance criteria (numbers)
- Frame one at t = 6 s: field max |u| >= 0.90 (measured 0.9638 desktop, 0.9612 mobile).
- Crest cores present at frame one: >= 20 hot cells desktop (measured 86), >= 10 mobile (measured 22).
- Cool trough cells present: >= 10 (measured 171 desktop, 31 mobile).
- Tap: each of the first 4 taps adds one source (4 to 8); 5th tap refused, count stays 8.
- Crest cores survive taps: hot cells after 4 taps >= 10 (measured 25).
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1652.js, node-canvas, same shim as render-piece.js): frame-one stats at 1280x900 = 8,208 cells, maxAbs 0.9638, hotCells 86, coolCells 171; sources at load 4; taps 1-4 added (counts 5, 6, 7, 8), tap 5 refused (count 8); after 4 taps maxAbs 0.8177, hotCells 25, coolCells 10; mobile 390x844 = 1,798 cells, maxAbs 0.9612, hotCells 22, coolCells 31.
- Determinism: two fresh runs with the same 4 taps rendered at 1280x900, md5 e754afe962ef3248e77eff008ea52e10 both times, byte-identical.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720 twice. Thumb md5 03d47dfd0fc07113fce29bca832be17a both runs, byte-identical.
- All three renders visually inspected: desktop shows diagonal red-orange hot bands with yellow/white crest cores against cool cyan troughs and near-black ground, cyan source markers with pulse rings at the edges; mobile full-bleed with legible plates; thumb reads the same field at small size. Title plate "Field Transformations / 2006 · 07 · 21" and hint plate "Tap to add a wave source." legible in all three.

## Deviations
- None from the spec. Silent audio build, as the spec permits.

## Fix rounds
- Round 1: probe crashed in drawField, `rgba()` received a pre-rounded string (`.toFixed(4)` applied twice). Fixed by passing the raw number and letting `rgba()` round.
- Round 2: same class of bug in drawSources pulse-ring alpha. Fixed the same way.
- Round 3: absolute crest threshold (u > 0.86) left 0 hot cells on mobile and after taps, because adding sources raises the normalization denominator. Changed the crest threshold to 85% of the frame's own maximum amplitude (with a 0.55 absolute floor). Re-probed: 86 hot cells desktop frame one, 25 after 4 taps, 22 mobile.
