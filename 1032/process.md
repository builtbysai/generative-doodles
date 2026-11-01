# No.1032 "Ridden by Nobody"

Study #127 toshitaka-mochizuki, PP193 "The Whill Ballet" (border, 2015).

## Concept

Ten white personal mobilities perform a ballet on a dark floor, top-down, seen
the way the tracking cameras see them: as pale shells and clusters of hot
retroreflective marker dots. Nobody rides them. The absence is the piece.
Five white cubes on omni bases drift through the gaps as counterpoint
furniture, glowing faintly cyan from beneath. Each vehicle follows a closed
choreographic curve on a strict 60 second loop; the paths cross and weave,
and the vehicles never collide, never hesitate, because the choreography was
worked out in advance, not steered in the moment. Faint trails die behind
each shell: the path memory of the machine's view.

Interaction: drag across the floor to divert nearby vehicles off their paths
(they veer away from the finger, then rejoin); tap a vehicle to flare its
markers (the camera, noticing); double-tap for the next choreography. Sound,
only after a first touch: soft electric glides pitched by fleet speed, gentle
chimes when two vehicles pass close, a shutter tick per marker flash.

## Construction

- Single self-contained index.html, canvas 2D. World is 1100 units square,
  mapped centered onto the viewport; the stage (#0A0A0C) is full-bleed on all
  screens including phones. Canvas sized from the Visual Viewport API with
  resize listeners on visualViewport and window; canvas style width/height
  pinned in pixels every draw; phone detection via window.screen physical
  size with aspect fallback.
- Vehicles: minimal rounded shells (50 x 32 world units, #EDEFF2) with four
  dark wheel marks (#2A2D36) peeking at the sides, an inset outline, and a
  six-dot marker cluster (#FFFFFF). Because white dots vanish on a white
  shell, each dot sits on a faint dark seat disc (#2A2D36 at 0.3), the look
  of a physical marker disc; the dot itself is a 0.3-alpha halo over a
  full-alpha core.
- Curves: each vehicle rides a closed Catmull-Rom loop through 7 seeded
  control points, evaluated in closed form from the loop phase
  (phase + direction * t / 60). Heading comes from a finite difference of
  the same function. Trails are the same closed-form function sampled at
  16 past times (5.12 s deep), drawn as one polyline per vehicle at alpha
  0.08: stored geometry, never a canvas fade.
- Cubes: five squares (#E4E7EC) whose positions are a closed-form
  triangle-wave reflection inside the center box [320,680] x [320,670], so
  they drift, turn slowly, and bounce off the margins as a pure function of
  t. Underglow is three layered flat-alpha rounded rects in #7FD4FF
  (0.05 / 0.07 / 0.10), no gradients.
- Non-collision, choreographed not steered: the three fleets were searched
  offline. Loop geometry sits on a jittered 3x3 grid of centers plus one
  wide center loop; per-vehicle phase offsets (integer cycle samples) were
  then optimized by simulated annealing against a penalty for any pairwise
  approach under 68 units, until the penalty reached zero. The winning
  fleets were verified by direct continuous spline evaluation at 5760
  samples per cycle. Minimum pairwise center distances over the full cycle:
  fleet 1: 74.07 units, fleet 2: 69.18 units, fleet 3: 74.46 units. Two
  shells can touch corner-to-corner only below 59.4 units (sum of the two
  half-diagonals), so every fleet keeps at least 9.8 units of true
  clearance at all times. The guarantee covers the choreography itself;
  a visitor's drag divert can of course push a vehicle off its path, which
  is the point of the divert.
- Events: drag diverts and tap flashes are recorded segments/envelopes and
  every offset is a closed-form function of the recorded list and t
  (attack 0.22 s exponential, release decay 1.5 s; flash attack 0.06 s,
  decay 0.35 s). Frame one is the synchronous draw at fixed phase t = 12 s;
  the animation loop is anchored as T0 + elapsed, dt capped at 0.05 s,
  rAF typeof-guarded. Nothing derives from Date.now.
- Audio: lazy AudioContext created inside the first pointerdown, typeof
  guarded and wrapped in try/catch. Two detuned oscillators through a
  lowpass form the glide bed, retuned from mean fleet speed; proximity
  entries under 105 units fire pentatonic sine chimes (0.25 s global
  cooldown); flashes fire a 0.05 s band-passed noise shutter tick. No
  microphone anywhere.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Desktop: dark stage, ten white
  shells spread across the full frame mid-weave, dotted marker clusters
  visible on each shell, faint trail arcs behind them, five pale cubes
  with cyan underglow drifting in the center third, no riders, dark
  margins generous. Mobile: the whole floor fits, all ten vehicles and
  five cubes whole and readable, nothing clipped. Thumb matches the
  desktop composition.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted.
- Fix round: first render's marker dots were nearly invisible (white on
  #EDEFF2). Added the dark seat discs under each dot; clusters now read
  clearly at all three sizes. Re-rendered and re-verified determinism.
- Grep checks: no gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no Date.now, no getUserMedia, no external URLs, no em dashes.
  Zero visible text besides the title element.

## Deviations

- The fleets are precomputed offline and embedded as data (three fleets;
  double-tap cycles to the next) instead of being generated from a seed at
  page load. Reason: the non-collision guarantee is the piece's core claim,
  and the phase search that proves it (annealing over the full cycle) is
  far too heavy to run at load. Each fleet still derives from its own seed
  offline (1032193, 777001, 424242). The cubes still generate at runtime
  from a per-fleet seed, since they carry no guarantee.
- Marker dots gained a faint dark seat disc (see Construction). Reason:
  legibility of the specced #FFFFFF dots on the specced #EDEFF2 shell; the
  seat uses the palette's own wheel tone at low alpha.
- Divert pushes vehicles away from the finger (a veer) rather than pulling
  them toward it; "pull off their paths" in the prompt is satisfied either
  way, and veering reads as the vehicles avoiding the intruder, which fits
  a floor of riderless machines.
