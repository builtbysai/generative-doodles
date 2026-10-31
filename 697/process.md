# No.697 — Plegaria Muda

EXPANSION #85 doris-salcedo, prompt block 2 "Plegaria Muda" (TASKS.md, verified verbatim).

## Concept

Salcedo's *Plegaria Muda* (2008–10): coffin-like tables stacked surface to surface, with live grass growing through the cracks between them — growth tended through the wound, a burial field that tends itself. The piece is that field seen edge-on: twelve slab pairs span the frame, each pair split by a thin dark seam (the two tables lying face to face) and separated from the next pair by a band of dark soil. Grass grows only out of the soil bands, upward over the slab above. Nothing else is in the frame: no flowers, no decoration, no text, no sound.

## Construction

Single self-contained `index.html`, canvas 2D, strict four-colour palette: ground `#0B0A09`, slabs `#14120F`, soil bands `#2A2018`, grass `#7FA653` (sage, desaturated; per-blade alpha 0.45–1.0 gives depth within the one tone).

**Layout.** The stack is a pure function of canvas height: 12 equal row units. Each unit, top to bottom: slab A, a thin ground seam at a seeded fraction, slab B, then the soil band. Soil band height is seeded per row per epoch at 0.17–0.34 of the unit (8–16 px at the 720 reference scale and above). Slabs span the full width at every size, phones included.

**Blade cycle design.** Each blade runs an independent 65 s cycle — grow 20 s (smoothstep envelope), hold full 30 s, die back 15 s — with a seeded phase offset spread across the whole cycle, so at any instant the field holds sprouts, full blades and dying blades at once and never changes abruptly. Full height is 10–40 px at the 720 reference (power-law distribution favouring shorter blades), scaled by `min(W,H)/720` clamped 0.55–1.7. Sway is two slow sines: a per-blade term plus a travelling field term keyed to horizontal position and row, so the wind moves across the stack rather than in unison. Each blade is one tapered quadratic stroke, root on its soil band, tip leaning with wind; all blade data is precomputed at field generation and the per-frame cost is one stroke per visible blade.

**Density falloff.** Two centre-weightings multiply. Per row: a Gaussian weight (σ = 0.30 of the stack, floor 0.30) peaks at the middle rows, so the centre of the field is the densest and the top/bottom rows are sparse. Per blade: horizontal position is drawn from a triangular distribution centred on 0.5, thinning toward the left and right edges. Counts: 1,150 blades on desktop, 820 on phones (screen min dimension < 700), inside the specced 800–1500.

**Interaction.** Watch-only base. Pointer samples are recorded with anchored timestamps; a blade near a recent sample bends away from it with a distance-and-age falloff (radius ≈ 84 px at reference, samples expire after 1.4 s), so a passing hand parts the grass and the parting closes behind it — walking through, never a control. A tap (press under 8 px movement, under 0.35 s) reseeds the whole field: the epoch increments, a new field is generated from `mulberry32(697001 + epoch · 7919)`, and the local field clock restarts. No click-to-reload anywhere.

**House rules.** Canvas size from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `canvas.style.width/height` pinned in px inside `draw()` every frame; phone detection via `window.screen` physical size (min < 700) with the `h > w·1.15` aspect rule as fallback only. Frame one is the synchronous draw at t = 0 with all blade phases evaluated at 0; the rAF loop is `typeof`-guarded and reads only elapsed time from the load anchor. No `Date.now`, no `Math.random`, no audio, no microphone, no external assets.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (`qa-desktop.png`), 390×844 (`qa-mobile.png`), 720×720 (`thumb.png`).
- Determinism: `thumb.png` rendered twice and `cmp` byte-compared — identical. Second render deleted.
- Phase check: a forced render at `?seed=t30` differs from frame one (growth phases and sway advance as designed); scratch render deleted.
- Read-backs: desktop shows the slab stack with visible pair seams, soil bands, and sage blades at mixed heights/phases growing out of every band, denser in the middle rows. Mobile (390×844) keeps all twelve rows full-bleed with the same band structure; blades scale down with the frame but stay legible; nothing clipped. Thumb matches the desktop composition.
- The QA renderer has no `requestAnimationFrame`, `AudioContext`, `document.createElement`, offscreen canvas or `ctx.filter`; the piece uses none of them and renders its first frame synchronously without them.

## Deviations

None from the prompt's substance. Two implementation notes: (1) blade taper is suggested by a single round-capped quadratic stroke at ~1.4 px rather than a two-pass taper, keeping the per-frame cost to one stroke per blade at 1,150 blades; (2) pointer bend applies to any passing pointer (hover included), matching the prompt's "a passing pointer bends blades aside" — dragging is the same gesture on touch devices.
