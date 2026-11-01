# №1384 "Archive Prison" (adam-khalil AK1, PP607)

A grid of museum specimen drawers and glass vitrines. Inside each drawer an
animate object — a carved procedural artifact in object amber — breathes,
glows, and strains against its case while the cabinetry stays dead and
sterile. One drawer at a time cracks open on an irregular pulse as its
object pushes; the rest stay sealed. Cold hallway light falls from above.

## Composition

- 4×5 drawer grid fills the frame on desktop and mobile (full-bleed on
  phones). Each drawer: cabinet-steel frame, archive-gray face, dark
  vitrine window holding one of five seeded artifact types (faceted gem,
  spiral, ring, shard cluster, vessel), a sterile-white label plate, and —
  on about a third of drawers — a blood-red seal dot.
- Label plates carry four pseudo-script glyphs each (chevrons, triangles,
  crosses, arcs with dots, hooks, dot pairs), drawn as shapes. No readable
  words anywhere on screen except `<title>`.
- Palette: archive gray #9a9a94, cabinet steel #4a4d52, sterile white
  #e8e8e2, object amber #e0962a, blood red #a81414, near-black #141312.

## Motion and interaction

- Irregular open/slam pulse: a seeded schedule of events (gaps 3.2–6.4 s);
  each event cracks one drawer open over 0.4 s, holds 1.0 s, then slams it
  shut over 0.3 s. Piece time is phase-shifted +0.8 s so frame one already
  shows a drawer cracked open (drawer 9). At most one drawer is open at
  any sampled time.
- Objects never stop breathing: scale and halo pulse on closed-form
  sine functions of piece time with per-drawer seeded periods and phases.
- Drag: dragging a drawer pulls its face further down (up to 22% of cell
  height); on release the pull decays exponentially (tau 1.2 s) and the
  drawer snaps shut. No buttons, never click-to-reload.

## Adaptations

- Object glow is flat-alpha halos, not the prompt's capped radial
  gradient — the QA renderer handles gradients unreliably.
- The prompt's optional low drone is refused as autonomous audio: the
  piece ships fully silent, with no AudioContext anywhere.
- All motion is closed-form functions of piece time and recorded drag
  events: no frame-integrated physics, no per-frame randomness. Grain dots
  are static seeded positions; hallway flicker is a seeded function of
  quantized (0.12 s) time.
- Drawer faces are clipped to their cell rects, so a slid face reads as
  sliding down inside its slot and never bleeds label glyphs into the
  drawer below (one fix round; all renders re-done after the fix).
- Canvas 2D only: no offscreen canvas, gradients, shadowBlur, Path2D,
  createElement, localStorage, or getUserMedia. Viewport from the Visual
  Viewport API with resize listeners on visualViewport and window;
  canvas pinned in draw(); phone detection via window.screen with aspect
  fallback. rAF loop is a plain function declaration behind a typeof
  guard; frame one is a synchronous draw(0) via a boot flag, and the rAF
  clock anchors on its first timestamp. All randomness is mulberry32
  (seed 1384000 + index·7919); the only "Math.random" string in the file
  is a comment stating it is never used.

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
  390×844, and 720×720; all three inspected. Thumb renders byte-identical
  across repeated renders.
- Probe harness driving the piece's own rAF loop and pointer listeners
  at forced timestamps on a real node-canvas: frame one shows exactly one
  open drawer (drawer 9, gap test); t=0 vs t=0.5 differ in 48,866 px as
  the open drawer slams shut; no sampled time shows more than one drawer
  open; a 120 px drag on sealed drawer 0 opens it (33,439 px diff) and it
  is fully shut again 6.9 s after release.
