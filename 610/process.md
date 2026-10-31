# No.610 "Memory Like Fireflies"

EXPANSION #74 adolfo-serra, prompt block 2 "Luciérnagas de Tatsuno".

## Concept

Serra's Tatsuno abandoned-house project as a light instrument. The frame is
near-black. Hidden in the darkness is a white-ink mural: bare winter trees
rising from the bottom of the frame and the beams of an abandoned house
(posts, lintel, sill, diagonal braces) framing the edges. Twenty-four
fireflies drift through the dark on slow seeded paths. Each one runs its own
glow cycle (rise, hold, fade, dark rest), out of phase with the rest, and
while it glows its amber disc reveals the piece of mural beneath it: white
branches surface inside the light, then darkness takes them back. Darkness
is the default state; light is the event. Dragging is a gust: nearby
fireflies scatter and flare, revealing more mural for a moment, then settle.

Palette, strict: near-black #0A0908, firefly amber #FFB347, mural white
#E8E4DA, ember orange #E2701D on exactly two branch tips, dim until lit.
No text, no UI chrome, no sound, no firefly trails: a glow is a circle.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- **Mural as data (deviation, required by the renderer).** The prompt's
  technical approach calls for a pre-rendered offscreen mural layer with a
  darkness layer composited over it. This build environment has no offscreen
  canvas, so the mural is precomputed as plain data instead: six seeded
  recursive-branching trees (mulberry32, fixed seed 61074) plus ten beam
  segments, all stored as line segments in normalized coordinates. Every
  frame redraws the segments from that data: once at 4.5% white alpha over
  the whole frame (the mural barely visible), then once per glowing firefly,
  clipped to its glow disc, at an alpha driven by its glow phase, with a
  second smaller clip pass so the reveal is brighter at the core. Segment
  candidates for each disc are distance-filtered, and strokes are batched by
  weight bucket. The visual contract of the prompt (glimpses only, mural
  never shown whole) is kept; only the layering mechanism changed.
- **Fireflies.** Wander positions are pure functions of anchored elapsed
  time (summed seeded sines), so any frame is reproducible. Base positions
  are seeded and pushed out of a central ellipse so the flies stay scattered.
  Glow intensity comes from each fly's cycle position: smoothstep rise,
  a hold with a faint deterministic flicker, smoothstep fade, then a dark
  rest that occupies the last 30% of the cycle. Frame one is seeded so
  exactly seven flies sit in the lit part of their cycles.
- **Gust.** Pointer drag applies an impulse away from the pointer to flies
  within range and raises their glow boost. Offsets spring back to the
  wander path with damping; boost decays exponentially. The mural itself
  never changes.
- **House rules.** Canvas size comes from the Visual Viewport API with
  resize listeners on both visualViewport and window; draw() pins
  canvas.style.width/height in px every frame. Phone detection uses
  window.screen physical size (min dimension < 700px) with the aspect
  fallback; the field is full-bleed at every size and the page ground is the
  piece's near-black. requestAnimationFrame is typeof-guarded and anchored
  as elapsed-since-load; frame one is drawn synchronously at load from the
  fixed seeded phases, never from Date.now(). Draw time is quantized to a
  0.25s grid so early redraws (resize, load timing) land on the identical
  frame. Amber halos use a small number of radial gradients (glowing flies
  only); the clip-redraw is the primary reveal mechanism. No offscreen
  canvas, no ctx.filter, no audio, no microphone.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim; no rAF,
no AudioContext, no document.createElement, no offscreen canvas).

- qa-desktop.png (1280x900): near-black field; beams faintly trace the
  edges (posts, lintel, corner braces); six to seven amber glow discs, each
  revealing white branch work inside its radius; the unrevealed mural reads
  only as a faint thicket band along the bottom; firefly bodies as small
  amber dots. Nothing clipped.
- qa-mobile.png (390x844): full-bleed darkness; glow discs reveal branch
  sections along the lower half; beams still frame the edges; nothing
  clipped. The normalized mural stretches vertically at this aspect, so the
  trees read taller and thinner, acceptable for a full-bleed field.
- thumb.png (720x720): square composition holds; two tree crowns lit at the
  bottom, one lone glow in the upper left dark, brace lit at top right.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- Tuning pass during QA: the first tree generation (depth 7, denser
  branching) read as a scribbled thicket inside the glow discs. Depth was
  reduced to 6, the three-child probability lowered, and trunk angle jitter
  increased; reveals now read as individual bare branches. The two ember
  tips sit outside every frame-one glow disc, so they stay near-invisible
  until a wandering fly lights them, as specced.
