# №1485 "The Handover" (ioana-wieder IW6, PP732)

## Prompt
A single scene — a room of seated figures around a table — plays in a loop.
At the loop's end, one figure stands, walks to the edge of the frame, and a
second figure, in a different muted color, walks in from the opposite edge
and sits in the same chair. The scene continues with one element changed:
the table's centerpiece changes color with each handover. Palette: room
cream #e8e0d0; figures' clothes #4a5a7a, #6b4a3a, #2f4636, #7a6a8a;
centerpiece cycles gold #d9a441, scarlet #c1272d, teal #2e6f6a; skin
#f2ead8. No other color. Composition: room centered, table centered,
figures in a circle; the walking path is a clear horizontal line across
the lower third. Motion: watch-first, handover loop. Dragging the walking
figure sideways speeds or slows the walk; releasing resumes the automatic
pace. Drag never stops the handover mid-walk and never restarts the scene.
Avoid: a monument, a statue, a memorial plaque, text, a figure who never
leaves.

## Build
- Self-contained `index.html`, no external assets, fully silent (no
  AudioContext at all). No offscreen canvas, gradients, shadowBlur,
  Path2D, createElement, getUserMedia, or text drawing; only `<title>`
  carries text.
- Cycle structure: each cycle = 36 s seated scene + a handover that
  completes when 12 s of rate-weighted walk time elapse (12 s at rate 1).
  Full loop = 3 cycles = 144 s, so the loop closes exactly at t = 144.
- Centerpiece color = cycle index mod 3 (gold → scarlet → teal → gold).
  The handover-chair occupant color rotates through three muted tones
  (period 3, matching the centerpiece cycle), so the incoming figure is
  always a different color from the outgoing one and frame one repeats
  exactly at t = 144.
- Handover: the outgoing figure stands (first 15% of walk progress),
  walks left off-frame; the incoming figure walks in from the right edge
  and sits (last 15%) in the same chair. Both travel the clear horizontal
  walking path across the lower frame.
- Drag: pointer drag sets a walk-rate multiplier,
  clamp(1 + dx/150, 0.25, 3), recorded as rate segments; walk progress is
  the closed-form integral of rate over handover time, so a slowed walk
  still advances (never stops mid-walk) and release restores rate 1 with
  the walk continuing from its slowed position. Scene state is never
  restarted by a drag.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard). Every
  animation sine runs on loop-local time (t mod 144) with periods dividing
  144 — the №1482 lesson applied pre-emptively, so the loop closes
  exactly. All decoration from mulberry32 (seed 1485000), never
  Math.random. Dots as filled rects or own-beginPath arcs (node-canvas
  quirks); no fading alphas at all (every fill opaque).
- Phone: centered composition keeps its shape; page ground takes the
  room cream. On portrait phones the walking path sits at ~0.61 of frame
  height rather than the lower third, because the circle radius is bound
  by frame width — the path stays a clear horizontal line and nothing
  clips.

## Verification (forced-time probe, tmp/probe1485.js)
- t = 0 redraw 0 px; fresh instance t = 0 identical (0 px).
- t = 144 vs t = 0 = 0 px; t = 288 vs t = 0 = 0 px (loop closes exactly).
- Centerpiece center pixel: t = 0 gold #d9a441; t = 60 scarlet #c1272d;
  t = 108 teal #2e6f6a; t = 144 gold again.
- State t = 20: scene, cycle 0; t = 42: handover, walkP 0.5; handover
  frame differs from scene frame.
- Drag right (+300 px) during handover: walkP at t = 40 is 0.667 vs
  0.333 no-drag (walk sped up).
- Drag left (−150 px): walkP at t = 40 is 0.208 vs 0.333, still advancing
  (0.292 at t = 44) — never stops mid-walk; after release the walk
  continues from the slowed position.
- Scene resumes after drag: t = 60 frame matches a fresh instance exactly
  (0 px) — no restart artifact.
- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders. Token scan clean.

## Fix rounds
- (1) Composition: first desktop render clipped the top figure's chair
  back off-frame. Table center moved to 0.42H, circle y-factor 0.82 →
  0.78, chair back shortened (1.15s → 0.95s) and narrowed (0.9s → 0.7s).
  All renders re-done after the fix; no clipping at either size.
