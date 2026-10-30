# No.478 Outrage

EXPANSION #57 julandthefox (Giulia Neri), prompt GN6.

## Concept

Giulia Neri's Mind-cover editorial literalism as a graphic cascade: a vertical stream of black domino slabs falls through a pale cream field, each slab stamped with a single yellow thumbs-down. The slabs pile and topple at the bottom in a slow, orderly collapse. Grid-like order in the fall, chaos only in the pile; the top corners stay empty. It is a metronome of disapproval: no UI, no text, no hint, no commentary, no red anywhere. The yellow is the only accent and is protected.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio, no grain (the documentary lane: crisp flat edges throughout).

- Palette, exactly three colors: ground cream #EFE3C8, slabs #1A1A1A, thumbs #E8B62D stamped flat. Fading slabs blend toward the cream by alpha only, so no fourth color is ever mixed in.
- Canvas sizing follows the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen (min dimension < 700), aspect h > w*1.15 as fallback only. The composition keeps its shape on phones; the page ground is the cream.
- The deterministic cascade: the loop is 40 seconds. Thirty slabs spawn on an exact steady beat (one every 40/30 seconds), each with a fixed 26-second lifespan inside the loop: 3.6s of fall, 1.3s of topple, settled in the pile, then a 3s alpha fade-out at the end of its life as newer slabs land, so the loop wraps seamlessly. Every slab's state is a pure function of (loop time, seed) computed per frame from its spawn schedule; nothing is accumulated simulation.
- Slab table (mulberry32, seed 478): per slab, a fall jitter inside the cascade column, a pile slot, a pile layer (0, 1 or 2, weighted 50/32/18), a small y jitter, a topple direction, a slight fall tilt, and a final resting angle of 1.28 to 1.58 radians (near flat). Pile slots are stratified evenly across the pile width and then shuffled with the seed, so the pile always spreads wall to wall across the lower quarter instead of clumping.
- Fall: x holds inside the center column (jitter within plus/minus 8.5% of frame width, the slab width bringing the column to about 30% overall); y accelerates with a softened gravity exponent (p^1.35), which keeps slabs spread down the column instead of lingering at the top and rushing the pile. On impact the slab topples: center, and rotation, ease-out-cubic from the upright landing pose to its flat pile pose, sliding outward from the column to its pile slot as it goes over. Slabs draw oldest first, so the pile stacks in landing order and falling slabs stay in front.
- Slabs are rounded rectangles (corner radius 13% of slab width), width 11.5% of the frame's short side clamped to 38..108 px, height 1.58x the width. The pile baseline sits 4.5% of the short side above the frame bottom; layers stack at 0.58 slab-widths.
- The thumbs-down stamp (0.74 slab-widths tall, drawn in slab-local coordinates so it rotates with the slab): a thick thumb shaft descending on the left with a rounded tip, starting inside a bold rounded fist block across the top so the silhouette is one piece, with three thick slab-black grooves down the fist as negative space for the curled fingers. Flat yellow, no outline, no shading.
- Determinism: the first frame is drawn synchronously at load at the constant loop phase t = 17s: a fully developed mid-collapse scene with slabs mid-fall, one toppling, and a settled pile. requestAnimationFrame is typeof-guarded and anchored as the fixed offset plus elapsed time, wrapped by the 40s loop. No Date.now() in any frame path, no AudioContext, no document.createElement, no offscreen canvas.
- Interaction: watch-only base. A single tap does nothing; a double tap (or dblclick) reseeds the fall rhythm: the seed advances, the slab table regenerates, and the loop phase re-anchors at the fixed offset so the reseeded fall opens on the same developed scene. Nothing ever reloads the page.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at three sizes:

- qa-desktop.png (1280x900): two black slabs fall in the center column (one entering at the top, one mid-frame), top corners empty cream, and a continuous toppled pile spans the lower quarter wall to wall. Yellow thumbs-down stamps legible on the falling slabs; a close crop of the mid-frame slab shows one joined silhouette: grooved fist across the top, thick thumb descending on the left with a rounded tip.
- thumb.png (720x720): same read at thumbnail size; the cascade, the pile, and the stamps all hold. Rendered twice and byte-compared with cmp: identical. Second render deleted.
- qa-mobile.png (390x844): portrait layout holds; cascade stays center-frame, pile spans the full width at the bottom, stamps still read on the small slabs, nothing clipped.

Iterations: the first build spawned 28 slabs on a 2.8s p-squared fall, which left the middle of the frame empty (slabs lingered at the top, then rushed), clumped the pile into two clusters with a center gap, and carried a small, fragmented glyph whose thumb shaft barely touched the fist and read as a detached part. Fixes: 30 slabs, fall lengthened to 3.6s with the exponent softened to 1.35; pile slots stratified across the pile width before the seeded shuffle; the glyph enlarged to 0.74 slab-widths, its shaft widened and overlapped deep into the fist, finger bumps replaced by three thick grooves. All renders were regenerated and determinism re-verified after each change; the final thumb byte-compare passed.

Deviations from the brief, recorded:

- None on palette, composition, or motion. The fall uses a softened gravity exponent (p^1.35 instead of a strict p^2) for the reason given above; the acceleration still reads as gravity and the beat, topple, settle, and fade phases are exactly as specified.
- One slab is always caught entering at the top edge at the fixed 17s phase; that is the spawn beat doing its work, not clipping of the composition. The pile and the column are whole on every aspect rendered.
