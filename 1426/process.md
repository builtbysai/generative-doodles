# №1426 "The Invisible Fifth Record" (wolfgang-muller WM3, PP649)

## Prompt
Two discs side by side on a dark field — the left one bright, eager, pop-colored;
the right one austere, dark, abstract — each spinning, each casting its own pattern
of light; where the two patterns overlap in the center, a third pattern appears
that belongs to neither disc, shimmering and precise. Reference: Unser Debüt 1984 +
sechs 1986; same track lengths, played simultaneously = the invisible fifth album.

## What was built
- Dark field #1a1712. Pop disc (left, #e84a6a / #f2c832): bright radial spokes
  (alternating pop yellow and deep rose, so all 12 spokes read against the pink
  ground) plus a ring of alternating yellow/cream dots. Austere disc (right,
  #26241f / #8a8578): dark concentric rings plus four sparse rotating gray bars.
  Both discs slightly dimmed by a flat-alpha veil so the overlap zone reads as
  the brightest thing on screen.
- Overlap zone: the lens-shaped intersection of the two discs, filled with dark
  #141210 ground and a gold #d4a24e pattern computed ONLY from the phase
  difference between the two discs — moiré rings whose radii breathe with the
  interference, beat spokes whose alpha follows the phase beat, and a center
  pulse whose size follows the beat. No third disc, no hand-drawn overlap pattern.
- Motion: seamless loop; pop disc spins at 0.55 rad/s, austere at −0.34 rad/s, so
  the interference breathes continuously. Dragging either disc scrubs its phase
  live and, on release, sets its spin rate from the flick velocity (clamped to
  ±1.6 rad/s); a gentle release (under 0.25 rad/s) stops the disc, which kills
  the third pattern entirely — that is the point. A firm flick restarts it.
- Interaction: drag a disc to change its spin rate and rewrite the overlap.
  Never click-to-reload. Fully silent.

## Adaptations
- Overlap pattern computed from the phase difference (never drawn independently);
  interference blend confined to the lens intersection via sequential canvas clips.
- Stored-history fades: none needed (pattern is a pure function of phase).
- Flat-alpha veils and halos only; no gradients, no shadowBlur, no offscreen
  canvas, no Path2D, no createElement, no AudioContext, no getUserMedia, no
  fillText/strokeText. No visible text except `<title>`.
- Node-canvas quirks: every fading alpha rounded to 4 decimals before
  stringifying; dots as filled rects; every arc on its own beginPath.
- Determinism: frame one = draw(0) via boot flag, clock starts only with the rAF
  loop (plain function declaration behind a typeof guard); all randomness from a
  seeded mulberry32 PRNG (seed 1426000, static speckle only), never Math.random.
- Viewport: canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; pinned in draw(); phone detection via window.screen
  physical size with aspect fallback; page ground takes the piece's background
  color. Disc radius capped at 0.29 × viewport width so the pair fits phones
  without clipping.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280×900, 390×844,
  720×720; all three inspected. Desktop: pop pink disc with yellow/rose spokes,
  austere dark disc with gray rings and bars, gold moiré lens center-frame and
  brightest. Mobile: same composition, both discs fully in frame, no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the piece's
  own loop, pointer events to its own listeners): gold pixels in the lens zone
  6833 at t=0 → 2470 at t=2 → 2604 at t=5 (interference breathing); 54,785 px
  differ between t=0 and t=2 (both discs spinning at different rates); after a
  gentle-release stop of the pop disc and 120 frames, gold pixels = 0 (the fifth
  record is dead); after a firm-flick restart and 120 frames, gold pixels = 914
  (the pattern returns, at a new phase).
- Fix rounds (2): (1) the QA renderer provides no document.body, so the body
  background line is now typeof-guarded; (2) the first mobile render clipped both
  discs at the frame edges, so the disc radius is now capped at 0.29 × viewport
  width; the pop spokes' alternate color was changed from disc pink to deep rose
  so all 12 spokes read. All renders re-done after each fix.
- Token scan clean (the single "Math.random" hit is a comment stating it is
  never used).
