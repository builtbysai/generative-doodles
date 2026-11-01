# №1424 "Doris Has No Clothes" (wolfgang-muller WM1, PP647)

A bare stage, lit like a dressing room, with no performer on it — only a rail of
costumes that dress themselves in turn. Each costume, worn by nothing, strikes a
pose; the empty space inside it is the performer.

## Frame one

Stage black ground, a row of warm dressing-room bulbs along the top, and a rail
across the back holding six miniature costumes. Center-stage, large: the
feathered creature — a fan of white and red feather blades around the shoulders,
a white bodice, a red crest — with a soft dark oval inside it where a body
would be. No performer, no mannequin, no visible text except the title.

## Mechanics

- Seamless 60 s parade loop: six costumes × 10 s slots (enter 1.5 s from the
  left, pose 7 s, exit 1.5 s to the right). A +4 s phase shift puts frame one
  mid-pose of the feathered costume, so the stage is never empty at load.
- Costumes, in parade order: feathered creature (struts, hem flares on a bob),
  wig bikini top (sways), woodpecker shoes (tap), carpet-square head (tilts),
  skeletal suit (droops, rib lines on the empty volume), vestment with an
  oversized red cross (processes, slow sway).
- Drag a costume off the rail: it is staged immediately and poses center-stage
  for 10 s, overriding the parade schedule.
- Drag the staged costume: pose modulation, closed-form over the recorded drag
  list with exponential decay (tau 3 s) — a pull on the feathered hem increases
  its flare, a tug on the vestment speeds its processing pace. No body ever
  appears; the stage is occupied only by clothes.
- The empty interior of every costume is a soft dark volume (#2a241e), never a
  mannequin and never a body mesh.

## Adaptations

- Costumes as articulated garment rigs with pose parameters and no body mesh
  underneath; parade as a seeded costume queue.
- No audio, no offscreen canvas, no gradients, no shadowBlur, no Path2D, no
  createElement, no AudioContext, no getUserMedia, no localStorage, no
  fillText/strokeText. Fading alphas rounded to 4 decimals and dots drawn as
  filled rects or own-beginPath arcs (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all randomness
  from mulberry32 (seed 1424000, static dust only), never Math.random.
- Viewport from the Visual Viewport API with resize listeners; canvas pinned
  in draw(); phone detection via window.screen with aspect fallback; centered
  composition keeps its shape on phones with the page ground in stage black.

## Verification

- Rendered at 1280×900, 390×844, 720×720 and inspected all three; mobile keeps
  the same centered composition with no clipping. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop, pointer
  events to its own listeners): t=0 center-stage feathered (35,171 non-black
  px, 7,528 red feather px); t=14 wig center (16,014 gold px); t=24 woodpecker
  center (6,096 red px); t=54 vestment center (41,254 cream px, 6,482 red cross
  px); dragging the vestment off the rail at t=60 stages it immediately at
  t=61 (41,254 cream px where the parade would show the feathered costume);
  a pose drag on the staged costume changes the center pixels without error.
- No fix rounds needed.
