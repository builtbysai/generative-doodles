# №1117 — Finder of Wonders (Markus Kison MK6)

The composition is a finder-style window, drawn entirely on one canvas: a pale
title bar with three drawn circles and the name "Wonders", a sidebar under a
small WONDERS header, and a main pane topped by a breadcrumb
("Wonders / DOTS / Sparse", current folder darkened). The sidebar lists four
folders — DOTS, LINES, FIELDS, CURRENTS — each with a drawn disclosure
triangle and a drawn folder glyph. Selecting a folder expands its three
subfolders (one nesting level) and opens its world; the selected row is the
familiar finder blue. On phones the sidebar narrows but stays legible.

Every folder is a real seeded generator, not a thumbnail:

- **DOTS** — a dot field with depth: dots are seeded, sorted far-to-near, and
  drift on closed-form sine paths. Sparse (90, slate blues), Drifting (180,
  warm grays, wider wander plus a slow global sway), Dense (430, teals).
- **LINES** — Threads: 26 closed Lissajous loops morphing in time. Crossings:
  two families of wavy lines weaving horizontally and vertically. Ribbons:
  9 thick low-alpha loops in purples.
- **FIELDS** — six seeded color bands whose boundaries breathe on slow
  sines. Dusk (indigo to apricot), Meadow (greens), Mono (grays).
- **CURRENTS** — streamlines integrated through a time-varying analytic
  flow field. Breeze (teals), Rapids (faster, tighter curl, ember palette),
  Deep (dark pane, pale ribbons).

Each world is a pure function of (seed, global time t), re-derived from its
own mulberry32 seed on every frame — no stored particle state — so leaving a
folder and coming back resumes it coherently from the same clock. Subfolders
change the seed and one parameter: density, speed, or palette.

Interaction is tap-only navigation: pointer-down hit-tests the shared
layout rows; tapping a folder opens it at its first subfolder, tapping a
subfolder switches the variant. Nothing else moves the piece, and nothing
reloads. The piece is silent.

House build: canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window, CSS size pinned in draw(),
phone detection via window.screen (min dimension < 700) with an aspect
fallback. No gradients, no ctx.filter, no shadowBlur, no createElement, no
microphone, no audio. First frame is drawn synchronously at a fixed phase
(t = 7.3 s, DOTS / Sparse already mid-drift, breadcrumb set); the rAF loop
is typeof-guarded and anchored to that phase. QA renders at 1280×800,
390×844 and 720×720 all come from the shipped script, and the thumbnail was
rendered twice and byte-compared identical. The other eleven worlds were
additionally spot-rendered off-screen to confirm each opens cleanly.
