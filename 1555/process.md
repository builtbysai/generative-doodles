# №1555 Turbulence Disc

kiyoshinakauchi JK4, PP802, cron expansion study #205. Gallery date: 2006 · 04 · 15.
Reference: kiyoshinakauchi.md (turbulence, 2022-11-09).

## Palette

- Ground near-black #0d0d0d, inside and outside the disc; page ground is the piece's own background color.
- Streaks white #F2F2F2 only, alpha 0.22 to 0.77 by particle speed. Nothing else.
- A hairline ring at alpha 0.14 marks the mask edge; it is redrawn faint every step, never a bright outline.

## Composition

Disc centered, radius 0.42 x the short viewport side on desktop (0.46 on phones), hard-edged circular mask, generous black margins. 520 particles, seeded uniform inside the disc. First frame paints every particle as a seeded streak along the field direction, so the disc reads as weather from the first paint.

## Motion

Watch-first weather loop. Particles advect through a noise flow field built from a streamfunction: velocity is the perpendicular gradient of layered drifting sines, so the flow is divergence-free and streaks stay evenly spread while transient swirls and shear lines form and dissolve. Trails are fading polylines: each 1/60 s step fades the disc by 0.12 and draws the new hairline segment, extended by 0.12 s of travel. Particles that age out (seeded life 4 to 14 s) or leave the disc respawn at seeded random positions inside it, from a dedicated respawn stream. Near the rim, outward radial motion is shed so streaks slide along the edge instead of crossing it. All drawing is clipped to the disc; the mask edge is a faint ring only.

## Interaction

Drag injects a vortex: while pressed, particles within 0.45 R of the pointer orbit it with angular speed 2.6 rad/s times a linear falloff, plus a slight inward pull. No visible vortex widget. Drag never clears the disc, never draws outside it, never reverses the field. On release the vortex is gone and particles resume field flow. No click-to-reload anywhere.

## Determinism

Fixed-phase first frame. All randomness comes from mulberry32 with fixed seeds (1555000 for spawn, 1555111 for field phases, 1555999 for respawns). No wall clock, no per-frame Math.random. Simulation advances in fixed 1/60 s steps from piece time; a rewind or resize resets to the identical seeded state. Canvas backing size is assigned only when it changes, so accumulated trails survive across frames. requestAnimationFrame is guarded with a typeof check. House rules from the №1551 template: Visual Viewport sizing with resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen (min dimension under 700 px) with the h > w*1.15 aspect fallback. No gradients, shadowBlur, Path2D, offscreen canvas, createElement, localStorage, getUserMedia, fillText/strokeText. Fading alphas rounded to 4 decimals. No visible text except the title. No em dashes in visible copy.

## Probes

Harness: /tmp/probe-1555.js (stubbed rAF driving the piece's own loop at forced timestamps, synthetic pointer events to its own listeners, window.__p1555 hook publishing all 520 particle positions). Final run, all PASS:

- Frame-one determinism: two render-piece.js runs at 1280x900 byte-identical, md5 a47d77863a5cb9910fc0ffca03ddf567; the probe's own t=0 md5 matches it.
- Advection: t=0 vs t=5 PNGs differ (md5 c8f1f537ea28a76fbbc3b3916d8b5e6a); mean particle displacement over 5 s is 153.67 px.
- Vortex: drag held at disc center t=1 to t=3, 97 in-vortex particles, mean absolute angular displacement 2.000 rad vs 0.605 rad in the no-drag control (3.3x); hook vortexCount 118 while held.
- Release: after pointerup, t=3 to t=5 mean absolute angular displacement 0.617 rad, back at field level (control 0.605), drag hook null.
- Containment: full-pixel scan of the t=0, t=5, and mid-drag t=3 frames finds 0 non-ground pixels outside R+2.

## Fix rounds

1. Ring accumulation: the 0.14 ring was redrawn every step over the fading canvas and built up to a bright white outline by t=3. Fixed with erase-then-redraw each step (ground stroke width 3, then the faint ring), clipped to the disc so no paint lands outside the mask.
2. Density and fade: first field version herded particles into a few fixed bands with large voids by t=5, and fade 0.25 erased trails too fast. Raised particles 380 to 520, fade 0.25 to 0.12, minimum speed 0.03 R/s to 0.04 R/s.
3. Field rewrite: the layered-sine angle field was convergent, so streaks kept piling into fixed lines. Replaced with a streamfunction-gradient (divergence-free) field with a weak uniform drift; t=5 now shows several transient swirls and even coverage. Probe verdict criteria were corrected alongside: the signed angular mean is confounded by the field's own coherent swirl at the test point, so vortex and release are judged on mean absolute angular displacement instead.

## Gallery note

Hundreds of white hairline streaks advect through a noise flow field inside a hard-edged disc on black, transient swirls forming and dissolving like weather from far away. Drag to inject a vortex.
