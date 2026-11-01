# №1105 — Durchsehen

Daniel Franke study block DF2: *Durchsehen Exp. 01* (2010, Daniel Franke with Markus Kison). Title from the prompt's Title suggestion ("Durchsehen"), which wins over the block heading "The Transparent Cube".

## The piece

A heavy concrete cube sits at the center of a dark, flat gallery: back wall, radiating perspective lines, a floor plane with converging boards, one framed artwork (seeded motif), one mullioned window. The cube is opaque concrete — until a viewer is selected. Then its front face re-renders exactly the room behind it, computed from that viewer's position, and the cube seems to vanish. The illusion is deliberately imperfect: the face render is mis-registered by a pixel or two and the concrete seam edges stay drawn, so the mechanism of the trick stays visible, which is what the original work is about.

## How the cheat works (no offscreen canvas)

One parameterized scene function draws the whole room. Each frame it runs twice:

1. Once plainly, for the room itself.
2. Once clipped to the cube's front face, translated by `(cubeCenter − viewer) × 0.38` plus a deliberate 1.5px mis-registration.

When the viewer stands at the center, the offset is zero and the face content aligns with the room around it — the cube disappears except for its seams. As the viewer moves, the face content slides against the real room and the deception shows its working. Activation (concrete ↔ vanished) crossfades: seeded concrete speckle fades as the scene render fades in.

## The viewer

- **Watch-only default:** on a 50-second cycle the cube idles opaque, then "selects" a phantom bystander — a faint amber ring (#C9962E, the selected-viewer mark) wanders a closed Lissajous path while the cube tracks it (selection window t≈20–45s of each cycle).
- **Pointer:** moving or dragging within range of the cube makes you the selected viewer; the face tracks your position and the ring follows you. Leaving (or straying too far) hands the cube back to its idle/phantom cycle.
- **Tap a wall:** hangs a new object — the artwork motif, its placement, the window's lit pane, and occasional extras (floor plinth, window sill) are re-drawn from the seed.
- **Double-tap:** reseeds the whole room. Taps landing on the cube itself do nothing. Nothing ever reloads.

## Sound

Optional and lazy: the first pointer press may start a very quiet WebAudio layer — filtered-noise room tone plus a faint servo whirr whose gain and pitch follow how hard the cube is tracking. Typeof-guarded, never autoplays, and the piece is complete with the sound off.

## Determinism

The first frame is drawn synchronously at a fixed phase, t = 25s: mid-selection, the phantom ring up and left of center, the cube vanished, the artwork and the window both readable through the face — displaced from their true positions by exactly the tracking offset, seams showing. The animation loop (rAF, typeof-guarded) continues from that phase as offset + elapsed. All randomness is mulberry32-seeded; the room's contents are pure functions of the seed and the re-hang counter.

## House rules applied

Visual Viewport sizing with resize listeners on both visualViewport and window; canvas CSS size pinned in draw; phone detection via `window.screen` (min dimension < 700) with aspect fallback; the centered composition holds at 390px wide. Flat colors only — no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no createElement, no microphone. The only text is the `<title>`.
