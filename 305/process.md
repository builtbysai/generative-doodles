# No.753 Dot Field

EXPANSION #92 robert-irwin, prompt block 2 "Dot Field" (TASKS.md, verified verbatim). After Irwin's dot paintings (1964-66): an apparently blank off-white canvas; lean in and minute green and red dots emerge, placed with deliberation, and begin to dance as the eye fails to keep pace.

## Concept

The piece is a hide-and-seek with the viewer's attention. At rest the canvas reads blank: roughly 750 tiny dots sit below the legibility threshold, too small and too faint to register at a glance. Legibility is governed by a single proximity parameter Z. Leaning in (mouse wheel, or a two-finger pinch spread) raises Z: dots grow, deepen, and start to dance on per-dot phases. Let go and Z eases slowly home, the field subsiding back toward blank. A drag stirs a wake through the field: dots near the pointer's trail lift, brighten, and swirl, then settle over about ten seconds. A double-tap reseeds the arrangement, per the prompt: the canvas blanks and a new seeded placement settles in over three seconds. It is a reseed, never a reload.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone. Palette is strict: paper #F4F2EC, dot green #6B8E6B, dot red #C05545, dot shadow #E8E4D8. No visible text anywhere; only the `<title>` names the piece.
- Placement is poisson-ish, never a lattice: seeded random sequential adsorption (mulberry32) with a spatial hash. A candidate is accepted only if it clears a minimum distance from every accepted neighbor. The minimum distance shrinks toward the center (0.78x at the middle, 1.28x at the corners) and a radial acceptance weight (1 - 0.52 r^2) thins the rim, so the field is denser in the middle and dispersed at the edges. Each dot carries a seeded color (about 46% red), three dance phases, and a size jitter. Each dot is drawn over a small offset shadow dot in the shadow tone, which gives the faintest lift off the paper.
- Legibility model: Z in [0.10, 1]. Dot alpha runs 0.055 + 0.80 * ease(Z) and radius (0.55 + 2.1 * ease(Z)^1.4) px at the 720 reference size, so at rest Z = 0.10 the dots sit at roughly 0.8 px and 11% alpha: a whisper, not an image. Wheel input moves a Z target by deltaY; pinch moves it by spread distance; the target itself decays very slowly toward rest and Z chases the target, so legibility always relaxes back down when released. A QA hook, `?seed=z1`, pins Z at 1 for the state-forced verification render; it does nothing in normal viewing beyond what a full lean-in does.
- Dance and wake are closed forms of (seed, recorded events, t). Idle breathing is a sub-pixel sin composite on slow periods (the ~20 s component dominates), growing to about 3.4 px of dance amplitude at full Z. The wake is a recorded trail of pointer points (capped at 260, pruned after 11 s); each point's influence on a dot is a Gaussian in space times exp(-age / 3.3 s) in time, so the disturbance is essentially settled by ten seconds. Wake influence raises that dot's local legibility and pushes it radially with a phase wobble.
- Reseed: arrangements are seeded streams, arrangement index = reseed count (seed 753197 + index * 7919). On a double-tap the old field fades out in the first fifth of a 3 s envelope while the new field fades in across the rest, matching the prompt's blank-then-settle.
- Sizing follows the house rules: canvas size from the Visual Viewport API with resize listeners on both visualViewport and window; `canvas.style.width/height` pinned in px inside draw() every frame; phone detection via `window.screen` physical size (min dimension < 700px) with the aspect fallback (h > w * 1.15). The field is full-bleed at every size and the page ground is the paper tone.
- Determinism: frame one is the synchronous draw at t = 0 with arrangement 0 at rest Z. Nothing is derived from Date.now(); the rAF loop is typeof-guarded and anchored at its first timestamp, so the QA renderer (no rAF, no AudioContext, no document.createElement, no offscreen canvas, no ctx.filter) captures exactly frame one.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. The duplicate was deleted.
- Read-backs: desktop, mobile, and thumb all read as an essentially blank off-white field with only the faintest whisper of dots, which is the intended frame one for this piece (see Deviations).
- State-forced check: rendered 720x720 with the `?seed=z1` hook (Z pinned at 1), read back, then deleted. It shows a delicate field of roughly 750 tiny green and red dots in poisson spacing: no lattice, no motif, visibly a little denser toward the center and more dispersed at the corners, each dot with its soft shadow lift.
- Interaction logic (drag wake, wheel/pinch Z, double-tap reseed) is event-driven and cannot be exercised by the headless renderer; it follows the recorded-events closed-form model above and is verified by construction and code read-through.

## Deviations

- The prompt's "lean in (zoom the field inward)" is realized as the Z legibility parameter driven by wheel and pinch rather than a literal camera zoom of the canvas. Reason: a literal scale transform would magnify the paper and dots together and break the sub-threshold read at rest; modulating dot size, alpha, and dance amplitude produces the intended emerge-and-dance effect while the field itself stays put. Z also eases back down when released, per the brief, so the painting returns to blank.
- Frame one (and therefore thumb.png) is a near-blank off-white canvas with only a whisper of dots. That is correct, not a render failure: the prompt requires the canvas to read blank at default distance, and the dots are verified present and correct in the forced-Z render described in the QA log.
