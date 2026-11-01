# №1253 — Theater of the Mind

Jenna Maurice study block JM6, after *Reactions to a Memory of an Experience* (2014): subjects' eyes, centered by the camera, "played a story, frame by frame, in the theater of their mind." This piece is that theater with the story removed from language: two eyes in extreme tight crop on a black field, and the half-formed scenes they are looking at, glowing faintly behind them.

## What it is

- **The eyes.** Two almond scleras in soft greyscale (#D9D4C7) with flat shading bands (an upper-lid shadow strip, corner shading — no gradients anywhere). Each iris is hazel #7A5C3E built from 14 flat radial wedge polygons in varied hazel shades with a darker rim; the pupil dilates ±8% on a slow two-sine noise and widens slightly when a ghost brightens. One catchlight dot per eye. No skin, no face — the frame edges cut everything else away, so the eyes float in the black crop.
- **The gaze.** A 45-second fixation script: hashed fixation targets held 2–5 s each, joined by 0.15 s smoothstep saccades, plus a sub-pixel microsaccade drift. The first three fixations are hand-set (center → right → far left); the rest are generated from the seed.
- **The ghosts.** Four indigo #3E3E52 vignettes behind the eyes: a doorway with its door ajar and a pale light-wedge (left), a field with low sun and tree (right), a layered blob hand (top-left), a curtained window (top-right). Each ghost's brightness is a closed-form function of the fixation script: alignment = clamp(0.25 + 0.95·max(0, gaze·ghostDir)), chased with a 0.9 s exponential time constant evaluated analytically across the current and two previous fixations — a ~3 s fade as the gaze turns toward a scene, peak alpha 0.125 (≈11–12% with the stepped 0.4 s flicker), baseline ≈3% when the gaze is elsewhere. The ghost on the side the gaze favors is the one that brightens.
- **Blinks.** Natural blinks on a hashed 3.4–6.0 s schedule: upper lid closes in 0.12 s, holds 0.04 s, opens in 0.18 s; the lower lid rises a quarter as much. Lids are black shapes clipped inside the almond with a lash line at the lid edge.

## Interaction

- **Drag** pulls the gaze: iris offset and ghost brightness both bias toward the drag vector while dragging and for 4 s after release (fading out), then the script resumes.
- **Tap** is a held blink: the screen goes pure black for exactly 2 s — nothing is drawn but the field.
- **Double-tap** reseeds the story (salt++): later fixations, blink times, and iris wedge patterns regenerate.

## Determinism

First frame is drawn synchronously at fixed phase **T0 = 9 s** — third fixation, gaze fully left, doorway ghost at peak (alpha ≈ 0.105–0.115), last blink ended at 6.74 s, next at ≥10.3 s, pupils at dilation ≈0.97 (mid). The rAF loop (typeof-guarded) is anchored as T0 + elapsed-since-load. All randomness is seeded integer hashes (seed from `?seed=`, default 1253); no Math.random, no Date-driven content.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in draw(); phone layout (wider eyes, tighter centers) via `window.screen` min dimension < 700 with aspect fallback. No gradients, no ctx.filter, no shadowBlur, no createElement, no ImageData/offscreen canvas, no audio, no microphone. Silent. No visible text beyond `<title>`.

## QA

Rendered with the house node-canvas renderer. Frame one verified at desktop (1280×800), thumb (720×720), and mobile (390×844): two greyscale eyes gazing left, hazel wedge irises with single catchlights, the indigo doorway and its light wedge visible behind the left eye, hand/window/field ghosts at baseline faintness. Token scan clean of every banned API. Thumb rendered twice at 720×720: **byte-identical** (cmp pass, duplicate deleted).
