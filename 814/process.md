# No.814 "Khiropractik" — EXPANSION #99 jacob-kassay, block 7

## Concept

From "Khiropractik," Art:Concept Paris 2024: a translucent glass centipede resting on a low white plinth in a red-lit gallery room, inside a warm spotlight halo. The piece is a slow anatomical study, not a monster: nothing scuttles, nothing threatens. The spine ripples in place, the legs pulse after the wave, and once per loop the head lifts and settles, the way a living specimen in a vitrine might test the air and think better of it.

Watch-only, seamless 24 s loop. No interaction, no text on the canvas.

## Construction

Single self-contained `index.html`, canvas 2D, no assets. Strict palette: room red `#7A0A0A`, halo `#FF6A2A`, plinth `#F5F5F5`, glass `#EAF2F5` (low alpha), amber refraction `#D8A03C`. Shading tones are mixes of these only.

Scene: flat red room with two darker floor bands; five faint ceiling track-light spots (layered alpha ellipses with a small glass core); a low white plinth (halo-warmed top face, front face shaded toward the room red); the halo pooled as layered alpha ellipses on the plinth top, centred on the creature. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas — all softness is layered flat alpha, per house renderer limits.

The centipede: 26 articulated segments, tail to head. Per-segment jitter (width, leg length, leg phase scatter, radius profile: thin tail, full mid-body, slight head taper) is precomputed once from a mulberry32 stream (seed 814001). The body is drawn as an outline built from spine points offset along their normals, filled with two low-alpha glass passes plus a faint room-red glass tint, articulated by an amber arc across the body at each joint, edged with an amber refraction line on the lit side and a pale glass line below, and threaded with a bright inner highlight along the upper third (the glass sheen, offset from the spine). Two antennae curve from the head.

Spine/leg wave model (all closed-form in loop phase `p`, loop = 24 s):

- Spine point for segment `u` (0 tail, 1 head): `y = baseY − sin(u·π)·arc + sin(phase)·A`, `x` swaying with the same phase, where `phase = 2π·(2.2·u − 3·p) + 0.9`. The wave travels tail to head with 2.2 wavelengths along the body and exactly 3 temporal cycles per loop (integer, so the loop closes seamlessly). The constant phase offset 0.9 leaves frame one mid-ripple, never flat.
- Feet are planted on the plinth's top face; the spine rides about two body-radii above the surface, so the body is silhouetted against the room and halo, with legs spanning the gap. Each leg is a two-segment stroke (hip, knee, foot); the foot slides with `sin(phase − 0.55 + scatter)`, lagging the spine wave by 0.55 rad, so the pulse runs down the legs after the ripple passes. Far legs plant slightly higher (perspective) and are drawn before the body; near legs after it.
- Head lift: `lift(p)` is a raised-cosine bump of circular distance to `p = 0.60`, half-width 0.10 (about 4.8 s up and down, once per loop), applied with quadratic falloff to the head fifth of the body; the antennae rise and sway with it.

Geometry: feet stand on the top face slightly back from its front edge; spine position derives from the surface line minus leg reach, so the composition re-derives cleanly at any viewport. Canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; canvas CSS size pinned in px inside `draw()`; phone detection via `window.screen` min dimension < 700 px with the `h > w·1.15` aspect fallback. Page ground is the room red.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism: frame one is the synchronous `draw(0)`; no `Date.now()` anywhere — the clock is `performance.now()` elapsed, used only after frame one, and all motion is a closed function of loop phase. thumb.png rendered twice and `cmp` byte-compared: identical; the duplicate was deleted and the compare re-run green after the fix round.
- First pass read-back failed the gate: the spine sat sunk in the plinth's top face, so the low-alpha glass vanished against the white plinth and the animal read as a thin thread; the halo and track lights also read as concentric target discs. Fix round: spine raised to ride a leg's length above the top face with feet planted on it (legs lengthened to span the gap and strengthened), a faint room-red tint added inside the glass fill to separate body from plinth, halo tightened to a pool on the plinth top, front-face halo rings removed, track spots dimmed. Re-rendered all three sizes and read them back.
- Final read-back: desktop and thumb show the deep red room, faint track spots, white plinth with the warm halo pooled on its top, and one translucent segmented glass centipede — articulation arcs, amber edge glints, many fine legs planted on the top face, antennae at the head (right). Mobile keeps the plinth and the whole creature inside the frame, nothing clipped.
- Deviations from the prompt's letter, with reasons: (1) the spotlight's radial falloff is built from layered alpha ellipses rather than a gradient — house renderer rule, no gradients; (2) a faint room-red mix inside the glass fill — needed so the transparent body separates from the white plinth it rests on; it is a mix of two palette tones, no new color; (3) the view is a slightly elevated front view rather than a pure side elevation, so the legs and the top face read — consistent with the prompt's plinth-and-halo staging.
