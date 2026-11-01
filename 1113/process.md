# №1113 — Durchsehen Cube

Markus Kison study block MK2: *Durchsehen* (2010, Markus Kison with Daniel Franke), read from Kison's side. Title from the prompt's Title suggestion ("Durchsehen Cube"). The sibling piece №1105 shipped the same work from Franke's study — an indoor gallery with an eye-tracked viewer; this one is the landscape orbit version and reads completely differently: outdoors, sunlit patchwork, a slowly orbiting camera.

## The piece

A concrete-edged cube floats over a slowly drifting procedural landscape: patchwork fields in greens and ochres, a winding cyan river with sandy banks, pale roads. The camera orbits the cube once per four minutes while the land itself scrolls beneath. The cube's two visible vertical faces are not glass and not transparent in any rendering sense — each face re-renders the landscape behind it from that face's own viewpoint, so the fields, the roads and the river continue through the cube, displaced. The top face stays a speckled concrete slab, and the concrete edge frame is drawn over everything: the seams of the trick stay visible, which is what the original work is about.

## How the cheat works (no offscreen canvas, no alpha)

One parameterized scene function, `drawLandscape()`, draws the whole ground plane in pseudo-3D perspective projection: hashed field cells in three level-of-detail rings (fine near, coarse to the horizon), sampled road polylines, and the river as projected bank/water/glint strips. Each frame it runs once for the real view, then once per visible vertical cube face — clipped to the face polygon and translated by `(cubeCentre − faceCentre) × 0.5` plus a deliberate 1–2px mis-registration, so every face gets its own viewpoint transform. When a face's offset is small the landscape nearly aligns through the cube; as the orbit turns, the through-view slides against the land outside and the deception shows its working.

## Interaction

- **Watch-only default:** slow orbit (240s per revolution), the landscape drifting at 2.5 units/s, the cube bobbing gently on a 26s cycle.
- **Drag:** orbits cube and camera together — the azimuth is a closed-form function of the recorded drag events; on release it eases back exponentially (τ ≈ 3s) to the idle orbit.
- **Double-tap:** reseeds the landscape — new field hashing, new river course. Nothing ever reloads.

## Sound

Optional and lazy: the first pointer press may start a very quiet WebAudio wind — pinkish filtered noise with a slow gain swell. Typeof-guarded, never autoplays, and the piece is complete with the sound off.

## Determinism

The first frame is drawn synchronously at a fixed phase, t = 20s: azimuth 30°, drift mid-scroll, the river bending through the cube's front face and out the other side, roads crossing inside and outside the faces, seams showing. The animation loop (rAF, typeof-guarded) continues from that phase as offset + elapsed. All randomness is mulberry32-seeded; the landscape is a pure function of the world seed and the drift.

## House rules applied

Visual Viewport sizing with resize listeners on both visualViewport and window; canvas CSS size pinned in draw; phone detection via `window.screen` (min dimension < 700) with aspect fallback; the composition holds at 390px wide (coarser field cells on phones). Flat colors only — no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no createElement, no microphone. The only text is the `<title>`.
