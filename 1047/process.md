# No.1047 "The Fastest Leaves the Longest"

Study #128 kyohei-mouri, PP208 "Dispatch" — the trail grammar as a pure piece.

## Concept

Fourteen identical small white nodes move on a black field, each on its own
path at its own speed. The nodes have no other identity. The only drawing
rule is the hardware's thesis, made strict: the faster a node moves right
now, the longer and brighter the trail it leaves. A slow node carries a
short gray stub; a fast node drags a ribbon across the field. Speed is not
decoration — trail length, trail brightness, and trail hue are all measured
functions of current speed, so the frame is a legible record of who is fast
and who is slow. Every so often one node lunges: it accelerates suddenly,
its trail flares long and hot red, then it settles back. Motion and the
record of motion are the same thing.

## Construction

- **Paths.** Each node runs a closed-form parametric path in a 1000x1000
  world (fitted to the smaller viewport dimension, centered): ping-pong
  straight lines, circles, Bernoulli lemniscates (figure-eights), ellipses,
  a Lissajous curve, and small wobbled drift loops. Lap counts per 50 s loop
  are integers, so the scene closes exactly at 50 s. Average speeds span
  28 to 271 world units/s (about 9.7x): 3 slow, 5 medium, 4 fast,
  2 very fast. Path choice and lap counts were tuned with a numeric probe
  (lap lengths integrated at 2000 samples) before the piece was written.
- **The grammar (exact).** Current speed v is measured from the node's own
  closed-form position by central difference (t ± 0.015 s). Then:
  - history window H(v) = clamp(0.4 + (v − 25) · (4.6/235), 0.4, 5.0) seconds
  - peak alpha A(v) = clamp(0.28 + (v − 25) · (0.62/235), 0.28, 0.90)
  - hue band: v < 55 → slow #4A5A6A; v < 120 → medium #7FD4FF;
    v < 210 → fast #FFE9B8; v ≥ 210 → very fast #FF6B6B.

  | v (units/s) | H(v) (s) | A(v) | band |
  |---|---|---|---|
  | 28 (tiny circle) | 0.46 | 0.29 | slow |
  | 60 (mid drift) | 1.09 | 0.37 | medium |
  | 106 (straight lines) | 1.99 | 0.49 | medium |
  | 144 (tall ellipse) | 2.73 | 0.59 | fast |
  | 181 (big circle) | 3.45 | 0.69 | fast |
  | 239 (small fast circle) | 4.59 | 0.85 | very fast |
  | 271 (big figure-eight) | 5.00 (clamped) | 0.90 (clamped) | very fast |
  | ~434 (big circle, mid-lunge) | 5.00 | 0.90 | very fast |

  The trail itself is drawn by sampling the node's closed-form position
  backwards over the window H(v) (up to 130 segments), alpha fading as
  peak · (1 − age/H)^1.25, width tapering 3.2 → 0.8. No accumulation, no
  canvas fade: the record is recomputed analytically every frame.
- **Lunges.** Scheduled at loop offsets 3.5 / 14.3 / 25.1 / 35.9 / 46.7 s,
  targeting nodes 4, 2, 7, 12, 0 in rotation. A lunge is a speed-multiplier
  bump with zero net area: a raised-cosine surge (peak x2.5) over 1.2 s,
  then a shallow settle dip (to x0.7) over 6 s whose integral exactly
  cancels the surge. Its phase contribution is the closed-form integral of
  that bump, so positions stay analytic and the 50 s loop still closes.
- **Frame one.** Drawn synchronously at the fixed phase T0 = 15 s, 0.7 s
  into node 2's lunge (multiplier x2.40, speed ~434): the big circle's red
  record wraps more than half its orbit while slow nodes show bare stubs.
- **Interaction (recorded events only).** Drag = wind: nodes within 260
  world units of the finger receive the same zero-net bump at amp 1.1
  (throttled to one stamp per 0.25 s), so their trails flare and settle.
  Tap a node = hold its record for 5 s: its trail renders at peak alpha
  0.90 with its history window frozen at the tap-time value (the node
  itself keeps moving). Double-tap = reseed (new phases from the next
  seed; frame one and all pre-input states unaffected).
- **Sound (first gesture only, lazy, typeof-guarded).** A 46 Hz field tone
  at low gain; a triangle voice whose pitch follows the fastest mover's
  speed (110 + 0.9·v Hz); a rising 240→880 Hz whine at each scheduled
  lunge start. Silent and complete without audio.
- **House rules.** Single self-contained file, canvas 2D, Visual Viewport
  sizing with resize listeners on visualViewport and window, canvas
  px-pinned in draw(), phone detection via window.screen (min < 700) with
  aspect fallback, rAF typeof-guarded, no gradients / shadowBlur /
  ctx.filter / offscreen canvas, no microphone, no visible text besides
  the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All three render cleanly in
  silence (no AudioContext, no rAF in the QA renderer).
- **Determinism:** thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted. Frame one is the synchronous draw at
  T0 = 15 s; nothing in the pre-input state derives from Date.now() or
  any wall clock.
- **Desktop read-back:** black field, fourteen identical white nodes.
  Grammar legible at a glance: slow nodes (top right, lower left) carry
  near-invisible gray stubs; medium nodes trail short blue ribbons
  (horizontal line at right, small arcs); fast nodes trail long warm
  ribbons (the tall ellipse's arc, the diagonal line running off
  lower right); the very fast figure-eight sweeps a red lobe across the
  center; the small fast circle's record saturates its whole orbit into
  a red ring at lower right; and the lunging big circle node drags the
  dominant red arc across the lower half — the frame-one flare, as
  scheduled.
- **Thumb read-back:** same composition, all trails legible at 720px.
- **Mobile read-back:** the square world fits the 390 width and centers
  vertically; all fourteen nodes and their trails are whole, nothing
  clipped; ribbons still cross the full field width.
- **Deviations:**
  1. Tap-hold follows the brief's own suggested implementation: peak
     alpha pinned at 0.90 and the history window frozen at its tap-time
     value for 5 s, rather than a literal freeze of the drawn pixels
     (the record stays a live function of the path, only its decay is
     held).
  2. Speed is measured truthfully, so two honest consequences appear:
     ping-pong line nodes pass through zero instantaneous speed at each
     turnaround, and their band/window dip for an instant there; and the
     smallest, fastest orbit (node 12, 239 units/s on a 597-unit lap)
     has a 4.59 s record that wraps its orbit about 1.85 times, reading
     as a full red ring. Both are the grammar applied without exception,
     kept deliberately.
  3. On non-circular paths the instantaneous speed varies along the lap
     (e.g. the wide ellipse ranges 38–108 units/s), so a node's band can
     step between adjacent bands mid-lap. The hue always reports the
     speed at that instant; nothing is smoothed or faked.
