# No.786 "Exploded Cabin" — EXPANSION #96 daniel-buren, PP3

## Concept

Daniel Buren's Cabane Éclatée: nested open frames in cream struts, each
infilled with transparent colored panes (red, orange, yellow, blue,
violet). You look down a corridor of layered color; each chamber's panes
composite over the next, so the depth saturates, and light glows from
the far end. The piece is a walk-through rendered as a gesture: drag
pulls the viewpoint deeper through the chambers; left alone, the view
drifts slowly in and out on its own.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external
  assets. The only text in the piece is the `<title>`.
- Strict palette: frame cream #F1EAD9, panes #D63B2F / #E87B2A /
  #E8B62A / #2F6BC0 / #7A4FB0, far glow #FFF6E8. The glow tone doubles
  as the page ground and the margins around the outermost frame.
- Six chambers in one-point perspective, all centered on the frame's
  vanishing point. Base scales fall off geometrically (0.70^i). Each
  chamber is drawn as cream strut bands plus thin mullion bars on a
  2 x 3 cell grid; the cells between the bars stay open (transparent),
  so the eye passes through the unfilled quadrants.
- Pane layouts are precomputed once from a seeded mulberry32 stream
  (seed 786013) as size-independent fractions: per chamber, a seeded
  subset of 3 to 5 of the 6 cells carries a pane (never a full wall,
  never an empty frame), and colors are dealt from a shuffled cell
  order with a per-chamber offset in the five-color cycle, so adjacent
  chambers never repeat a hue arrangement.
- Panes are flat fills at 55% alpha, nothing else: no gradients inside
  a pane, never opaque. Chambers paint far to near, so nearer panes
  composite over deeper ones and the corridor saturates toward the
  center by accumulation.
- Far-end glow is layered flat alpha shapes only: five soft ellipses
  under the chamber stack, plus a second, tighter glow laid over the
  two deepest chambers before the nearer ones composite over it, so
  the end of the corridor reads lit without washing the near struts.
- Depth/parallax: a depth parameter z scales each chamber by
  `s * (1 + z * 1.9 * (1.25 - s))`, so at full depth the nearest frame
  has grown past the canvas edges (it slides past the viewer) while
  the farthest chamber has roughly tripled and approached. Viewpoint
  shift (ox, oy) parallaxes chambers in proportion to their base
  scale: near chambers move most.
- Motion model: z, ox, oy are pure closed-form functions of t and the
  recorded pointer phases. Idle, z follows a 50 s cosine drift of
  amplitude 0.30 (in and out). A drag records timestamped samples
  (vertical drag drives z from 0 to 1 over 60% of the viewport height;
  horizontal/vertical drag also shifts the viewpoint, clamped to
  [-1, 1]); between samples the state is linearly interpolated. On
  release, a free phase takes over: the offset from the idle drift
  decays by the critically damped spring factor
  `(1 + u/tau) * exp(-u/tau)` with tau = 1.15 s, settling the view back
  to the entrance. No frame-integrated state anywhere.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned
  in px inside draw() every frame; phone detection via window.screen
  physical size (min dimension < 700px) with the h > w*1.15 aspect
  fallback, widening the corridor fraction on phones; rAF is
  typeof-guarded and the first frame is a synchronous draw at t=0.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png). All three show
  six nested cream frames carrying flat translucent panes, colors
  compositing and deepening toward the glowing center, warm white
  margins around the outermost frame, nothing clipped on mobile.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Frame one is the synchronous draw at drift phase 0
  (z = 0, entrance view, corridor at its widest); no Date.now or
  wall-clock reads anywhere in the piece.
- Deep-state check (throwaway patched copy, discarded): forcing a
  recorded drag phase at z = 1 renders the near chamber grown past
  the frame edges, far chambers approached and enlarged, panes
  layered up, confirming the drag travel and parallax behave as
  specified.
- Deviations: none from the prompt's substance. The prompt's "light
  glows from the far end" is realized with layered alpha ellipses in
  the specced glow color rather than any gradient or bloom, per the
  renderer limits, and the idle drift amplitude is capped at 0.30 so
  the watch-only fallback reads as a slow breathing of the corridor
  rather than a full traversal; the full depth range is reserved for
  the drag.
