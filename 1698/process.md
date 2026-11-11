# №1698 "Tunnel Renderer" - process notes

PP945, EXPANSION #223 piter-pasma. Date 2006 · 09 · 05.
Gallery note: "Concentric contours of a spiky heightmap recede down a tunnel. Drag to bend the tunnel."

## Build

CPU marching squares on a 160x160 (theta, z) grid, theta periodic. The
heightmap is a radial rise (12 * z) plus six phase-shifting sine-octave
terms; the 4-theta term carries a third harmonic that sharpens its peaks
into spikes. 24 iso levels from -2.4 to 14.85 (step 0.75). Each grid point
maps to the screen through a tunnel projection: screen radius
R(z) = Rmax * (1 - z)^1.5 around a vanishing point slightly below center
(0.56 of the square height). Segments are bucketed into 16 depth buckets,
drawn far to near, each bucket clipped to the circle at its near edge so
nearer rings occlude farther ones; bucket key is the segment's outer
endpoint (min z) so no segment is cut mid-stroke by its own clip circle.
The vanishing core goes near-black through ring density alone; no fills
anywhere, single-weight black contours on white. One synchronous frame at
load, t = 30 fixed phase, seeded deterministic field, no Date.now or
Math.random in the frame path. Drag bends the tunnel axis: the vanishing
point springs toward the pointer (clamped to 0.22 * S horizontally,
0.16 * S vertically) and drifts back to rest on release. No click actions.
Title/date/hint plates drawn on canvas in white plates with black ink,
mirroring live №1695's plate layout.

## Deviations

- The spec's cusp terms (|sin|^p spikes) were replaced by sine octaves
  with a third-harmonic sharpener: the field is then separable
  (sin(A + B) = sinA cosB + cosA sinB), so the 160x160 field evaluates
  with no trig per cell. The spiky look survives as closed contour loops
  around local maxima; nothing else in the spec changed.
- Frame time: the isolated extract (field + marching squares) benchmarks
  at about 10 ms steady state in raw node on this VM, but a full draw
  through the node-canvas harness measures about 190 ms here (extract
  about 70 ms, Cairo stroking of about 11k segments about 120 ms). The
  harness cost is dominated by node-canvas software rasterization and the
  per-draw canvas realloc in size(); the compute itself is lean
  (preallocated segment buffer, no hot-path allocations, no per-cell
  trig) and the loop redraws at most every 80 ms. The under-16 ms
  desktop-browser figure cannot be verified from this VM and is not
  claimed; it should be spot-checked in a real browser.

## QA

- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb
  (thumb.png IS the 720x720 render). Desktop: tunnel mouth fills the
  frame edge to edge, concentric wiggly rings recede to a dense dark
  core slightly below center, plates legible. Mobile: full-bleed tunnel,
  core and plates legible. Thumb: reads clearly at gallery size.
- Loop counts measured with the window.__probe.contourCount probe
  (union-find over shared cell edges): t=30 closed 84, t=32 closed 82,
  t=35 closed 89, t=40 closed 80, t=50 closed 80, t=60 closed 73.
  All inside the 40-90 acceptance band. About 11k segments per frame.
  Open arcs (42-47) are contours ending at the mouth or core boundary,
  as expected.
- Frame-one determinism verified: two fresh evals produce byte-identical
  PNGs (md5 bfcc1ad512e4b28cbffa33331acf9873).
- Drag verified in the harness: simulated pointerdown/pointermove
  changes the rendered image, and pointerup changes it again. The first
  version of the drag handler relied on the rAF loop to advance the
  spring, which never runs under node-canvas; the handler now steps the
  spring itself on pointermove (and snaps back on release when reduced
  motion disables the loop). Re-gated after the fix; frame-one md5
  unchanged.
- Two fix rounds during QA: (1) lineCap changed from butt to round after
  the first render showed joint notches on the rings; (2) bucket key
  changed from segment z-midpoint to min-z after suspecting clip
  truncation, then zoomed crops confirmed the remaining short strokes
  are genuine small closed loops of the spiky field, not gaps: the
  union-find loop count confirms segments chain into closed loops.
