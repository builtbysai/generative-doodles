# No.706 — Web, Over

EXPANSION #86 mona-hatoum, prompt block 3 "Web, Over".

## Concept

A monumental wire web suspended overhead, threaded with hand-blown glass
spheres at the intersections. Seen from slightly below, against near-black,
it never resolves into shelter or trap. The web breathes almost
imperceptibly: every strand is a slow pendulum, the spheres ride their
crossings, and the highlight in each sphere drifts as if a light somewhere
above is moving. Watch-only, apart from a tap, which grows a new web.

Palette, strict: background #0A0A0C, strands #6B7078, spheres #DDE3EA
(translucent flat fill), highlight #FFFFFF, deep shadow #050506 anchoring
the lower frame.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets, no
gradients (flat alpha fills only), no visible text beyond the title.

Web graph: the topology is generated per epoch from a seeded mulberry32
stream, so a tap reseed produces a genuinely different web (hub position,
radial count, ring count, sphere placement) without reloading.

- Hub: slightly off-center, in the upper frame (fx 0.44–0.56, fy 0.30–0.38).
- Radials: 12–16 strands, base angles evenly spaced with seeded jitter of
  up to ±22% of the step. Each radial is drawn as a polyline through its
  ring points and then out to an anchor just past the frame edge.
- Capture spirals: 8–12 rings at power-spaced fractions
  (0.10 + 0.88·u^1.45), denser near the hub. Each ring segment is a
  quadratic curve whose control point is pulled toward the hub and pushed
  down by 4.5% of segment length, giving the sag of a loaded thread.
- Overhead squash: ring points (fraction < 1) have their vertical offset
  from the hub scaled by 0.66, so the spiral-and-sphere zone reads as a
  canopy occupying the upper frame while the radial anchor lines run on
  to the edges and lower corners like suspension threads. Because radials
  are drawn through the ring points, intersections stay exact under the
  squash.
- Spheres: a seeded subset of (radial, ring) intersections on rings 1..end,
  clamped into the 40–70 range by the generator. Radius grows with ring
  index (0.6% to 2.2% of the short side, ×0.85 on phones) with per-sphere
  jitter. Each sphere is a translucent disc (alpha 0.16), a rim stroke
  (alpha 0.38), and one white highlight dot whose angle drifts slowly on
  a 37 s cycle with a per-sphere phase. No gradients, no chrome.

Motion: closed-form only. Each radial sways by
0.006 rad · sin(2πt/T + phase) with T seeded in 20–30 s; a radial breathing
term scales strand length by ±0.8% on a 26 s cycle; the hub itself drifts
by ±0.4% of frame on 27–31 s cycles. Sphere positions are recomputed from
the same functions, so they ride their strands exactly. Frame one is the
synchronous draw at sway phase 0; the rAF loop (typeof-guarded) continues
from an anchored performance clock. Frame one never derives from the
current time.

House rules: canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas CSS size pinned in px
inside draw(); phone detection via window.screen (min dimension < 700)
with the h > w·1.15 aspect fallback; tap = pointerdown reseed into the
next epoch, never a reload; no audio, no microphone.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF,
no offscreen canvas, no ctx.filter in that environment — the piece needs
none of them).

- qa-desktop.png (1280×900): wide canopy in the upper frame, radial
  anchors trailing to all edges, sagging spiral rings, translucent
  spheres with single highlight dots sitting exactly on intersections,
  deep shadow grounding the bottom.
- qa-mobile.png (390×844): hub in the upper third, web spans the tall
  frame, spheres legible, nothing clipped by layout.
- thumb.png (720×720): same composition at square size.
- Determinism: thumb rendered twice and byte-compared with `cmp` —
  identical; second render deleted.

Fix round during QA: the first build let the spiral zone fill the whole
frame top to bottom, reading as a wall hanging rather than an overhead
canopy. The ring-point vertical squash (0.66) plus drawing the radials
through the ring points fixed the read while keeping every sphere
exactly on its intersection; all three sizes re-rendered and the
byte-compare re-run after the fix.

## Deviations

- The prompt's spider-web capture spiral is drawn as concentric sagging
  polygon rings rather than one continuous spiral thread. At this scale
  and in wire, the ring read is identical, and rings keep every sphere
  exactly on a strand crossing; the continuous-thread version put half
  the intersections between strands. Recorded here per house practice.
- Spheres are flat translucent fills with a rim and highlight dot rather
  than radial gradients, per the standing no-gradient rendering rule in
  this series; they stay glassy and never read as solid chrome.
