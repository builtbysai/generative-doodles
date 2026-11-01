# No.987 "Gravity Is the Score"

Study #121 motoi-ishibashi, PP148 "Physical Murmuration" (Dancing with the Drones / 24drones).

## Concept

A night field. Three warm-white dancer-dots move through seeded choreography phrases along the bottom. Above them, twelve cyan light-drones orbit the troupe, each carrying a small dark diamond whose face carries a projection-mapped pattern (stripes, grid, or noise-field dots in magenta, cyan, or yellow). A faint beam runs from an off-frame top corner to every diamond: the beam is the mapping source, and each pattern shifts and rotates with its diamond's bank tilt, so the projection visibly rides the body's orientation. The flight is physical, not CG: gravity sags every path, inertia lags every turn, drag damps every speed, so the flock wobbles and overshoots its orbits and the recorded trails read as heavy arcs. Gravity is the score.

Interactions: tap sends a radial wind gust from the tap point; dragging upward opens a rising thermal column for 10 s that drones ride up before sinking back; double-tap reseeds the flock, patterns, and choreography. Sound starts only on the first gesture: a rotor-whir bus pitched by mean flock altitude, a low pentatonic line following the dancer phrase, a tiny tick on pattern changes, and a noise sweep on gusts.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Canvas size from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw() every frame. Phone detection via window.screen (min dimension under 700), aspect fallback h > w*1.15. Positions are stored normalized, so on phones the flock area compresses vertically while the dancers stay pinned to the bottom band. Page ground is the field tone #05070B.
- Physics model: fixed-timestep sim at 120 Hz (DT = 1/120), seeded with mulberry32 (base seed 987148). Each drone chases an elliptical orbit target anchored above the dancer troupe's closed-form centroid. Desired velocity is target feed-forward velocity plus a spring term (gain 1.7). Inertia is a first-order lag on velocity with a per-drone time constant tau of 0.4 to 0.85 s, which is what produces the lag and overshoot. Gravity adds a constant downward acceleration of 0.052 frame-heights per second squared, fighting the spring so paths sag below their targets and porpoise. Air resistance is an exponential velocity damping of 0.55 per second. Small seeded sinusoidal turbulence per drone adds wobble. Light pairwise separation, soft ceiling/floor/wall springs, and a 0.30 per-second speed clamp keep the flock in the upper frame.
- Diamonds: each hangs just under its drone point. Bank tilt is a smoothed function of horizontal velocity (time constant 0.3 s, clamped to plus/minus 0.7). The pattern index and color cycle on a per-drone duration of 3.5 to 6 s; the pattern is drawn clipped to the diamond path, translated and rotated by tilt*0.85, with its phase driven by tilt*16 plus sim time, so orientation changes move the mapping. Stripes and grid are line sets; the noise field is 26 seeded unit dots per drone.
- Trails: each drone records its position every second step into a capped buffer (140 points, about 2.3 s) and draws them as per-segment strokes with alpha ramping 0.02 to 0.25 toward the head.
- Dancers: three closed-form phrase paths (sums of seeded sines plus a hop term using abs(sin)) evaluated at sim time; the troupe centroid anchors the flock.
- Determinism: frame one is the synchronous draw after exactly 3600 fixed steps (30 s of pre-roll). No wall clock feeds any drawn state; Date.now/performance.now are used only for pointer-event bookkeeping (tap vs double-tap timing). All audio is created lazily inside the first pointer gesture, typeof-guarded, and the visual renders complete in silence. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; halos are layered flat-alpha circles. rAF is typeof-guarded and step-capped.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). All render cleanly in silence; registered listeners are only resize and pointer handlers.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- Read-back, desktop and thumb: near-black field; twelve cyan drone points with layered halos spread through the upper two thirds; a patterned diamond under each (stripes, grids, dot fields visible in cyan, magenta, and yellow); faint white beams at 0.06 alpha converging to the off-frame top-left corner; long fading trail arcs sagging between drones; three small warm-white dancer dots low on the field. Nothing else in frame, no text.
- Read-back, mobile: flock occupies the upper portion of the tall frame, diamonds and halos legible, dancers at the bottom edge, nothing clipped.
- Fix round 1: in the first build the flock sat in a tight mid-frame band and trails were too short and faint to read. Orbit radii widened (0.12 to 0.34), the anchor raised (centroid minus 0.48 of height), trail buffer lengthened to 140 points with alpha up to 0.25 and slightly heavier line weight. Re-rendered all sizes and re-verified determinism after the change.

## Deviations

- Rotor whir is a single shared bus pitched by mean flock altitude rather than one oscillator per drone (the brief's sanctioned simplification, same as No.979).
- The projection beam origin is the top-left off-frame corner for every diamond; the source study does not fix a projector position, and one shared origin reads clearly as a single mapping source.
- The audio melodic line picks notes from a fixed pentatonic set by sim-time index rather than transcribing dancer phrase contours; the phrase itself is visual, and the line only needs to follow its period.
