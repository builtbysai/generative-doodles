# No.1051 "As If Well-Trained Birds"

Study #129 katsuhiko-harada, PP212 "The Flock" (24 Drone Flight).

## Concept

Twenty-four small drones swarm in a dark studio void around a single still figure with both arms raised, Tempest's pose. Each drone carries a glowing white-blue orb on top: the light payload, the brightest thing in the frame. The figure never moves. The flock performs around the stillness; the piece is the flock's devotion to the raised arms. Where No.1030's flock wheeled leaderless over a white void, this one is dark, anchored, and scored: the birds are well-trained, and their training is visible as the tension between the marks they are given and the bird-like way they actually fly.

## Construction

- Sim: fixed-step at 120 Hz, seeded with mulberry32. Frame one is the synchronous draw after exactly 2160 pre-roll steps (18 s). Drone positions, velocities, and trails are never derived from a wall clock; the rAF loop only advances the same fixed steps, capped per frame.
- Boids: each drone integrates separation (48-unit radius), cohesion and alignment over neighbors within 100 units, with speed clamped to 62..150 units/s so the flock never stalls or darts.
- The score: a seeded sequence of six formation patterns around the figure (arc left, overhead dome, arc right, split pairs, ring around the figure, high veil). A new phrase begins every 960 steps (8 s). Each drone has a mark: pattern center plus an offset on the pattern's ellipse arc. The steering force toward the mark is deliberately weaker (0.8) than the combined boid terms, so the score proposes and the birds dispose: the flock leans toward each new mark, streams, overshoots, and re-forms rather than snapping into a grid. Each mark also slowly orbits its pattern center at a per-drone seeded rate, and a tangential swirl force (62 units) around the pattern center keeps the formation wheeling. A faint global pull keeps the flock devoted to the figure's airspace.
- Trails: each drone keeps a stored buffer of its last 38 positions, sampled every 3 steps (about 0.95 s of wake), drawn as segments in #7FD4FF with alpha ramping to 0.30. No canvas fading anywhere.
- Orbs: drawn as four layered flat-alpha discs of #DCE9FF (halo 0.07 / 0.16 / 0.42, core at full alpha), riding above each drone's tiny #1E2024 quad outline, which is rotated to the drone's heading.
- The figure: a single filled silhouette path (#0A0B0D, darker than the #050506 void) with head, torso, planted legs, and both arms raised, drawn once per frame at a fixed position, center-low. Its only light is a rim stroke in the trail tone at 0.30 alpha: the edge the orb-light gives it.
- Interaction: drag is the wind, a deflection field that pushes drones radially away from the finger with a tangential bend, so flight curves around it. A tap freezes the whole flock for 360 steps (3 s) while the orbs keep glowing. A double-tap reseeds the flock and the score and re-runs the pre-roll. Audio is created lazily inside the first pointer gesture and typeof-guarded: a band-passed noise whir plus a sine tone whose gain and pitch rise as the flock's mean spread shrinks (the payload singing when the birds tighten). The figure gets no sound.
- Viewport: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px on every draw; phone detection via window.screen minimum dimension under 700 px with the aspect fallback. The 1000-unit world is contain-fit and centered at every size, so the figure stays center-low and nothing clips at 390 px wide.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). All render cleanly in silence; no AudioContext, no rAF in the QA environment.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. The duplicate render was deleted. Determinism re-verified after the tuning round below.
- First read-back: the flock sat parked on its marks in a neat arc lattice at frame one: the score was winning and the birds were not flying. Tuning round: mark steering reduced 1.45 to 0.8, swirl raised 34 to 62, per-drone mark orbit added, separation radius raised 40 to 48, trail buffer lengthened from 22 to 38 samples with a linear alpha ramp, and the figure's outline widened (torso, stance, arms) because the first silhouette read as a thin stick.
- Final read-back: desktop and thumb show the flock mid-phrase in the arc-right pattern, streaming in two wheeling sub-flows above and right of the figure, long curving orb trails streaking behind every drone, the arms-raised figure findable center-low with its faint rim. Mobile shows the whole composition unclipped: figure center-low, flock wheeling above it, trails legible.
- Grep-verified clean: no Date.now, no gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no createElement, no getUserMedia, no external references, no em dashes. Zero visible text besides the title element.

## Deviations

- Trail wake is about 0.95 s rather than a longer comet tail: at the specced 0.30 alpha cap, longer buffers washed the void gray in the read-back; the shorter wake keeps each streak distinct. Recorded here per the brief's deviation rule.
- The figure's rim is stroked at 0.30 alpha in the trail tone (#7FD4FF), slightly stronger than a first pass at 0.18: against the near-black void the unlit silhouette was effectively invisible at thumbnail size, and the brief allows strengthening the rim within palette if the figure cannot be found. The fill stays the specced #0A0B0D and the figure stays small and still.
- Phone layout uses the same contain-fit world as desktop (per the world-scales house pattern) rather than a phone-specific recomposition; the composition's center of interest sits center-low by construction, so portrait letterboxing reads as studio darkness above the performance.
