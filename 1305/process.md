# №1305 "Detritus Diptych" (kristan-horton KH2, PP472)

## What it is

A landscape diptych split by a bright center seam, after Horton's
Dr. Strangelove Dr. Strangelove (2007): a crude miniature film set
rebuilt from studio-detritus proxies, fused with its own clean,
precise black-and-white rendering. The seam is the artwork.

## Frame one

Centered 2:1 diptych on black ground (desktop): left panel paper
white, right panel black, panels at slightly different heights to
break symmetry. Left panel shows the scene crude: rough jittered
detritus objects (forks, can, spool, box, glue sticks) with heavy
offset shadows, hatch marks, and set-flat backdrops. Right panel
shows the same scene clean: precise white-outlined shapes on black.
One amber band on a single spool appears in both panels, the only
warm accent. The bright seam between them is mid-glitch at frame
one, drawn in offset slices, deterministic.

## Motion

- Watch-only, 20-second build cycle: each cycle the detritus panel
  reassembles into a new miniature scene from a seeded generator,
  and the clean panel renders the same scene faithfully.
- Seam: slow shimmer plus glitch slices. Glitch events are spaced
  3.1 seconds apart, each 0.35 seconds long, and never touch the
  full frame, so there is no strobe.
- Seam swap: from cycle 1 on, a seeded flag (35% of cycles) swaps
  which panel is crude. Cycle 0 is always crude-left, matching the
  prompt description. Panel grounds travel with the style, so the
  crude side is always the paper panel and the clean side the black
  one, keeping the swap legible.
- Double-tap reseeds the scene pairing immediately; a single tap
  never reloads anything. The crude side carries a slow handheld
  jitter (small sine shift); the clean side is steady.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag;
the rAF clock starts only with the loop. Scene layouts, swap
flags, and glitch offsets all come from seeded mulberry32 sequences
keyed by cycle or scene index, never Math.random. Double-tap
events are recorded with piece time and folded into the scene
index as a closed-form function of the event list and t.

## House-rule notes

- Visual Viewport sizing with resize listeners on visualViewport
  and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension
  under 700px) with aspect fallback; full-bleed diptych on phones,
  centered 2:1 group on desktop.
- node-canvas safe: no rAF, AudioContext, createElement, WebGL,
  offscreen canvas, filter, shadowBlur, or gradients. Dots and
  ellipses drawn with a moveTo before every batched arc.
- No visible text except the title element. Silent, no audio.

## QA

Rendered at 1280x900, 390x844, and 720x720; all three inspected.
Thumb rendered three times, byte-identical. Probe with a fake rAF
clock confirmed: double-tap reseeds the scene at the same clock
time, cycle 1 changes scene and swap state, and amber pixels are
present in both panels.

## Fix rounds

1. The amber accent could land on an object type that carries no
   amber band (fork, box, bag), leaving the piece with no amber at
   all. Fixed by forcing the amber-index object to a can or spool.
2. The first rAF arming block contained a dead named function
   expression; replaced with a single plain function-declaration
   loop behind a typeof guard.
