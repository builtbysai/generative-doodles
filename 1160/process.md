# №1160 — Codec Tutorial

Nick Briz study block NB1, after *The Glitch Codec Tutorial* (2010) — the
tutorial that tweaked a media player so videos became infested with the
patterns of the codec algorithms that play them. Structured, legible
destruction: a break, not a noise filter.

## Composition

A serene procedural dusk, full-bleed: ten discrete flat sky bands from
`#0B1026` to `#2A1A3E` (flat steps, no canvas gradient), a round orange sun
`#FF9E4F`, sparse dim stars in the upper sky, two flat mesa silhouettes, and
dark dune ground. A black caption strip along the bottom names the current
codec phase in monospace — the tutorial's voice.

## The codec is simulated in the data

There is no offscreen canvas, no ImageData, and no real encoding. The scene
is a pure function `sceneColor(u, v)` (sun distance measured in pixels, so
the disc reads round at any aspect), sampled into a grid of ~4px display
cells each frame. The frame is divided into macroblock bands of 16px
equivalence (4 cells). A seeded table gives each band its own drift rate
and 2–3 artifact blocks, so bands tear unevenly, the way real P-frame drift
never corrupts a frame uniformly.

- **Drift envelope** over the 24s loop: 0–6s clean; 6–18s drift ramps in
  24 discrete steps under a smoothstep (P-frames accumulate in steps, not
  smoothly); at 18s it snaps to zero — the keyframe — and holds clean to
  24s.
- **Band shift:** each band renders its rows sampled `shift` cells to the
  left, i.e. the content slides right. The vacated strip clamps to the
  band's edge run, stretching it into a smear.
- **Artifact infestation:** once a band's shift passes a threshold, its
  seeded flat blocks (`#00FFC2`, `#FF2B6E`, `#FFE14D`) switch on at their
  own drift levels, streaking along the band's smear reach.
- **Chroma trail:** bright cells (the sun) ghost a few cells to the right
  in a single artifact color at low alpha — but only where the ghost lands
  off the shape, so it reads as a fringe trailing the sun's edge, never a
  tint over it.
- **Macroblock grid:** 16px grid lines at stepped, flickering alpha
  (0.15–0.35) drawn only while drift is active.
- **Caption:** `I-FRAME` while clean, `P-FRAME DRIFT` during 6–18s, and
  `KEYFRAME` in yellow for the 0.4s window at the snap.

## Determinism and house rules

- First frame drawn synchronously at fixed phase T0 = 13s (mid-drift);
  the rAF loop is typeof-guarded and anchored as T0 + elapsed since load.
  All randomness is a seeded mulberry32 table built once at load.
- Canvas size from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  on every draw. Phone detection via `window.screen` physical size
  (min dimension < 700px) with the `h > w·1.15` aspect fallback.
- Flat colors only: no gradients, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no audio. Watch-only — no interaction, silent.
- QA: thumb rendered twice at 720×720 and byte-compared (`cmp` identical);
  desktop and mobile renders read by eye; throwaway phase probes at
  t = 2s (clean scene, `I-FRAME`) and t = 18.2s (clean snap, `KEYFRAME`
  in yellow) verified the loop's other phases.
