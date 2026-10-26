# №449 Solarpunk Haussmann — process.md

## Concept
A carless Paris street in 2050: two rows of Haussmann facades (mansard roofs,
dormers, arched windows, wrought-iron balcony rails, striped shopfront awnings)
with ivy growing over the stone, trees and planters along a cobbled street that
recedes to a vanishing point near one third of the width. Pedestrians and
cyclists drift through; a yellow trolleybus crosses every 60 seconds. Never
any cars.

## Construction
- Landscape, field-like: full-bleed at every size. Facades are fixed seeded
  layouts (left row of 3, right row of 4 buildings); ivy patches pulse on a
  40s cycle (radius scaled by a per-patch sine phase); trees sway gently.
- Walkers and cyclists loop horizontally with fixed speeds and offsets;
  trolleybus traverses over 14s of each 60s cycle.
- Interaction: pointer drag plants seeds (kept in an array with a born time);
  each seed sprouts a stem and ivy blob over 4s and stays. No reload, no UI,
  no hint text. First frame is drawn synchronously at a fixed phase (1.5s);
  the rAF loop is anchored to that phase and guarded by a typeof check.
- Standing rules kept: Visual Viewport sizing with listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen min dimension under 700px with the
  aspect fallback; no offscreen canvas, no document.createElement.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Thumb 720x720 rendered twice: md5 126b11f4e9e7108634fa4d7ff873405f
  both runs, byte-identical (determinism gate PASS).
- Desktop 1280x900 inspected: facades, mansards, dormers, arched windows,
  balconies, awnings, ivy clusters, trees, street trapezoid, walkers and
  cyclists all read correctly. Mobile 390x844 inspected: full-bleed field,
  trolleybus visible entering at the left edge, no clipping.
- Fixes during QA: first pass had oversized ivy blobs and tree canopies and
  sky showing below the facades outside the street trapezoid with stray
  cobble lines; ivy/tree radii were rescaled to the short side, a ground
  band was added below the facades, and cobble lines were clipped to the
  trapezoid. Re-rendered and re-inspected after the fix.
