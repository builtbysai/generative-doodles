# No.609 "Where Images Are Born"

EXPANSION #74 adolfo-serra, prompt block 1 "Coreografía de Manchas" (TASKS.md, verified verbatim).

## Concept

Serra's Sevilla workshop method as the whole piece: the stain precedes the line. Six seeded ink-wash blots sit on a paper ground (walnut browns, two turmeric gold). From each blot's edge a creature is read out in thin walnut contour: a hooded figure, a fox, a bird, a dancer, a long-neck beast, a fish. The darkest blot carries the session's single red accent, a small red hood. Nothing else is red, and there is no text anywhere; the piece teaches itself.

Watch-only life: the washes slowly deepen and lighten (alpha breathing) and each reading shimmers 1-2 px at its blot's edge. Drag on empty paper lays a new stain, which blooms in four stepped stages over about a second, after which a creature is read from its edge; the paper only accumulates, cap nine blots. Tap a creature (or its blot) and it redraws itself from a different reading of the same blot.

## Construction

Single self-contained `index.html`, canvas 2D, no assets, no audio.

- **Blot as data.** Each blot is a seeded harmonic radius function r(theta) (5 sine harmonics, mulberry32 seed per blot), so the contour is a real, queryable curve, not a picture. The wash is drawn as four nested translucent layers of that same contour polygon (outer wash to dark core), walnut layers boosted 1.25x so they read as ink; gold stays light. Wax-resist cream flecks are seeded small polygons inside some blots.
- **How readings attach to contours.** A reading is derived deterministically from (blot seed, readingIndex): creature type, anchor angle, flip, scale. The anchor is a point ON the blot's contour, computed from r(theta) at draw time, so the line literally grows out of the stain's actual edge, and if the blot breathes/grows the reading stays attached.
  - Profile creatures (fox, bird, dancer, long-neck, horned head, hooded figure) use a *tangent frame*: an open profile whose two feet stand on the contour at the anchor, local -y pointing outward. The profile never closes; the stain itself closes the shape underneath. That is what makes them read as readings rather than as decals.
  - The fish uses a *radial frame*: it swims straight out of the stain.
  - Contours are hand-set control points run through a Catmull-Rom sampler, so the lines stay washy curves; ear tips and beak tips stay pointed where control points crowd.
  - The hooded blot always reads as the hooded figure (anchor/flip/scale vary), so the one red hood exists exactly once all session, including after re-reads. Drag-born blots never get the hood.
  - Later readings of a blot keep their anchors on the upper arc (anchor = -PI/2 + sin(readingIndex * 1.7 + seed) * 1.02), so a profile read from the edge never hangs upside down.
- **Interaction.** Pointer events with mouse/touch fallback. Tap = movement under 8 px: re-read that blot (reading redraws in six stepped fractions over 0.8 s). Drag from empty paper = new blot at the drag path's centroid, radius from the path's spread (clamped), color cycling walnut/walnut/gold by event count, creature type cycling the six-type vocabulary; all interaction randomness comes from mulberry32 streams keyed to a base seed plus event count, so a session is reproducible. Drags that start on a blot do nothing. Blots never vanish; no click-to-reload anywhere.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; `canvas.style.width/height` pinned in px inside `draw()` every frame. Phone detection via `window.screen` (min dimension < 700 px) with the aspect fallback `h > w*1.15`; layout is normalized so the paper is full-bleed at any size. Palette restricted to the five specced colors. No filters, no offscreen canvas, no per-pixel data.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF, no AudioContext, no createElement, no offscreen canvas available, and the piece uses none).

- Frame one is drawn synchronously at load at phase 0 (six blots, readings complete); the rAF loop is typeof-guarded and anchored as elapsed-since-load, never `Date.now()`. Grep confirms no `Date`, no `Math.random`, no `createElement`, no URLs in the file.
- **Determinism gate: thumb.png rendered twice at 720x720 and `cmp` byte-compared, identical**, re-verified after every fix round; the duplicate render was deleted each time.
- Renders read back at 1280x900, 390x844, 720x720:
  - Desktop/thumb: six washy blots with room to breathe; fox standing on its blot's top edge (two ears, snout, eye), long-neck beast rising from the bottom blot, fish swimming out of the top gold blot, bird head with long beak at the lower-right gold blot, dancer balanced at the top-left blot's edge, and the small red-hooded figure leaning out of the darkest blot, the only red on the page. Cream resist flecks visible inside the walnut blots. No text anywhere.
  - Mobile: same composition letterboxed by the tall aspect, everything inside the frame, nothing clipped, creatures still legible at the smaller radius.
- Fix rounds during QA (all re-rendered and re-gated):
  1. First build drew closed-outline creatures in a radial frame; rotated, they read as angular wire glyphs (fox read as a bird, hooded figure as a tilted diamond). Rebuilt as spline-smoothed open profiles in the tangent frame, standing on the contour.
  2. Fox and dancer anchors sat on side edges, leaving the profiles hanging at steep tilts and the fox overlapping the fish's blot. Anchors moved to the upper arc (fox -1.35, dancer -1.1), fox ruff simplified, dancer's arm and raised leg shortened; both now read upright at their edges.

## Deviations

- The horned head is in the reading vocabulary but not in frame one: frame one carries exactly the six specced figures (hooded figure, fox, bird, dancer, long-neck, fish) on six blots, per the brief's "6 seeded blots with their 6 creatures fully read, the hooded one among them". The horned head enters through tap re-reads and drag-born blots. Recorded here because the prompt block names all six creature kinds.
- Drag-born blots are capped at nine total and a drag's stain is sized from the drag path's spread; the prompt caps nothing explicitly, but "blots never vanish, the paper only accumulates" needs a bound to stay breathable, and nine is the brief's cap.
