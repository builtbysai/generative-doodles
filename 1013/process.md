# No.1013 "Eight Ways to Dream"

Study #124 futa-kera, PP174 "Denoise Lanes" (Rhizomatiks, Beyond Perception: eight DDPM training processes clarifying in parallel).

## Concept

Eight horizontal lanes fill a black room. Every lane renders the SAME latent composition at a different point in its own denoise cycle: gray TV static resolving into a structured image in the lane's hue, holding, then dissolving back into noise. The eight lanes are phase-offset, so the clarification wave is always somewhere in the stack. A thin white loss curve along each lane's bottom edge plots that lane's own noise history. No metrics, no percentages, no AI-hype imagery: the images and the falling curves are the whole story. Tap a lane to solo it full-frame for 10 s; drag across a lane to inject noise that must re-clarify; double-tap for a new dream (a new latent for all eight).

## Construction

- Latent: one seeded procedural field (mulberry32): 5-7 soft discs/ridges (Gaussian bumps with horizontal squash) over a faint base slope. Built once per seed; shared by all lanes, so the cascade is honest by construction: the same numbers are sampled by every lane.
- Noise model: each lane is a cell grid (64 x 12 desktop, 48 x 9 phone). Cell value = latent x (1 - s) + hashNoise(cell, time bucket) x s, where s is the lane's noise parameter. The bucket advances at 8 Hz so the static shimmers without any per-frame randomness; the hash is a pure integer function of (column, row + bucket, seed constant). Cell color blends room tone to the lane hue by brightness, leaning toward the static gray #8A8D84 as s rises.
- Cascade: 20 s cycle per lane (smoothstep denoise s 1 to 0.08 over 14 s, 2 s hold, 4 s re-noise), lanes offset by 1/8 cycle. Frame one is the synchronous draw at fixed offset T0 = 13 s: lanes 0 and 1 nearly clear (s about 0.10), lane 3 nearly pure static (s about 0.97), lane 7 close behind the leaders.
- Loss curve: the last 20 s of the lane's own s values (one full cycle), drawn white at 0.85 alpha along the lane's bottom: a falling sawtooth locked to the same closed-form function that renders the cells.
- Interaction: tap, drag, double-tap are recorded events; solo expansion eases the tapped lane to full frame over 0.35 s (neighbouring lanes compress proportionally), drag adds a Gaussian noise bump (+0.55 peak) at the touched cells that recovers over ~4 s, double-tap reseeds the latent.
- Audio: created lazily inside the first pointer gesture, typeof-guarded throughout, silent in QA: eight band-passed noise washes plus eight sine tones whose gain follows (1 - s) squared, so each voice clarifies as its lane does.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px every draw; phone detection via window.screen minimum dimension under 700 px with the tall-aspect fallback; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; rAF typeof-guarded; frame one never derives from the wall clock.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). No console errors; silence confirmed (no AudioContext exists in the harness and the piece runs clean).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- First pass read as horizontal bands rather than a composition: disc radii tightened (0.11-0.23), amplitudes raised, base slope reduced, and the desktop grid refined from 9 to 12 rows per lane. After the fix, the same bright patches sit at the same horizontal positions in the clear cyan, magenta, and lime lanes, dissolving through mint and orange into the gray static lane; mobile keeps all eight lanes full-width with nothing clipped.
- Grep-verified: no Date.now, no Math.random, no document.createElement, no gradient or filter calls, no external references, no em dashes. Only visible text is the title element.

## Deviations

- Cell grid is 64 x 12 on desktop and 48 x 9 on phone (brief said about 64 x 9): the extra desktop rows are what let the shared latent read as discrete blobs instead of bands at lane height; the phone grid keeps the brief's proportions.
- Frame one at T0 = 13 s puts the clearest lanes at the top and the static lane mid-stack rather than a strict top-to-bottom gradient; the brief allows the wave wherever the phase offsets put it, and at T0 the full spread (nearly resolved to nearly pure static) is on screen at once.
