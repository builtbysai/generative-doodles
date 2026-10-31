# No.911 "spherical inversion and trigonometry"

Study #111 simondavidryden, PP72 "The Sph Inversion".

## Concept

Rydén's most minimal piece is a workbench: a white ground, one black curve
(a trig function bent through a spherical inversion), and the tool's own
parameter panel printed on the canvas in monospace. The panel is not a UI
decoration; its numbers are live and they are the same numbers that bend
the curve. This build keeps that contract literally. The panel reads
"sph_invertion" (the reference's own spelling) over five rows, x, y, zoom,
time, sphRadius, each with a star-bar meter, and every value shown is the
value the curve was drawn with on that frame.

## Construction

- Curve: 400 samples of a trig combination in region-local unit space
  (a falling carrier plus three sine/cosine terms whose phases and
  amplitudes are driven by the x and y parameters and a slow time phase),
  mapped point by point through spherical inversion,
  p' = c + (p - c) * (R^2 / |p - c|^2), about a center placed low-left of
  the curve region at (-0.18, 1.18). R is the sphRadius parameter scaled
  by 1.30. A fixed framing fit (constants measured over the full LFO
  cycle at the defaults) keeps the breathing arc inside the region; the
  live zoom then scales about the arc's home center.
- Parameters, all closed-form functions of t and the recorded pointer
  logs, never of a wall clock:
  - x and y drift on slow detuned LFOs (periods of roughly 57 s to
    200 s), range about -2..2. At t = 0 they read 0.4 and 1.2.
  - time starts at 0.2 and advances at 0.15 per second, displayed
    looping 0..9.9.
  - zoom defaults to 5.1 and follows the total recorded horizontal drag
    (0.010 per px), clamped 1..10.
  - sphRadius defaults to 0.7 and follows the total recorded vertical
    drag (dragging up increases it), clamped 0..2.
- Gestures are derived from the recorded logs each frame. A tap resolves
  0.35 s after landing: a lone tap steps the highlighted row
  (x, y, zoom, time, sphRadius, x ...), two taps inside the window pair
  into a double-tap. The highlighted row is drawn in pure black with a
  second offset pass; other rows are text gray with gray star bars.
- Double-tap is the zero state: for 4 s every parameter reads 0.0, the
  star bars empty, the curve is drawn as a plain straight diagonal (no
  inversion), and the sound stops. After 4 s the live state returns,
  because the parameters were never stored, only derived.
- Dragging is split by axis as specced: horizontal movement turns zoom,
  vertical movement turns sphRadius, both live with the panel updating.
- Sound starts only on the first pointer gesture. One pure sine,
  lazily created and typeof-guarded, whose frequency is
  200 + 400 * (mean curvature of the drawn polyline), where mean
  curvature is the per-point turning angle divided by segment length,
  averaged and soft-clamped. The flat zero-state line has near-zero
  curvature and its gain is held at 0 regardless: no song.
- Sizing follows the house rules: Visual Viewport API first, resize
  listeners on visualViewport and window, canvas style pinned in px in
  every draw, phone detection from window.screen physical size (min
  dimension under 700 px) with aspect fallback. Light ground, so the
  page ground is the paper white; the panel shrinks on phones and the
  curve region starts right of the panel at every size.
- Determinism: frame one is the synchronous draw at t = 0. No gradients,
  no shadowBlur, no ctx.filter, no offscreen canvas. The mulberry32
  stream is defined for house parity but the piece consumes no
  randomness; the image is analytic end to end.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The
  harness has no AudioContext and fires no gestures; the piece renders
  complete in silence.
- Frame one verified against the spec: panel reads sph_invertion,
  x [0.4] highlighted with 2 stars, y [1.2] with 6 stars, zoom [5.1]
  with 5 stars, time [0.2] with 0 stars, sphRadius [0.7] with 4 stars.
- First render round: the raw inverted arc exited the top edge of the
  region and its tail stopped mid-frame. Fixed with the fixed framing
  fit described above (constants measured numerically over a 140 s LFO
  sweep at the defaults); re-rendered, the arc now sweeps fully inside
  the frame on desktop, thumb, and mobile, bulging right and curling
  home at the lower-left of the curve region.
- Mobile read-back: panel legible at 10 px mono, no row clipped, curve
  clear of the panel and contained in the tall frame.
- Determinism gate: thumb.png rendered twice and cmp byte-compared,
  identical. The duplicate render was deleted.

## Deviations

- The reference panel shows parameters the original tool happened to
  hold; here x and y are honest LFO readouts of the same functions that
  steer the trig phases, since a printed-but-dead number would break
  the piece's one rule (the parameters must be real).
- Zoom is implemented as a scale about the arc's home center with
  zoom 5.1 as the neutral point (factor 1.0), so the default frame
  matches the reference composition; the panel still reports the raw
  1..10 value.
- At sphRadius near 0 the inversion collapses the curve toward the
  inversion center; that is the mathematics of the tool, kept rather
  than clamped away. The specced range remains reachable by drag.
