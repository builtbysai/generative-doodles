# No.1035 "Enter the White"

Study #127 toshitaka-mochizuki, PP196 "The Booths" (Syn Gallery A photo-booth pods).

## Concept

A dark teal gallery holding three large white curved pods, furniture scale, matte
and quiet. Each pod has a tall opening facing the viewer; warm light spills from
the mouth and a translucent cyan figure hovers inside, made of light rather than
spirit. The pods slowly rotate a few degrees each way on their bases, machined
and deliberate, and the figure inside turns with its pod. Beside them stands the
booth line: three smaller glowing cyan cylinders with illuminated ring tops,
pulsing softly. The pods are the subject; the cylinders are decoration. Nothing
here is a spaceship: these are gallery objects that hold light-people.

## Construction

- Single self-contained canvas 2D page. No external assets, no gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas. All glow is layered flat-alpha
  shapes. The only text is the `<title>`.
- Canvas size comes from the Visual Viewport API, with resize listeners on both
  visualViewport and window. draw() pins canvas.style.width/height in px every
  frame. Phone detection uses window.screen physical size (min dimension below
  700 px), with the h > w*1.15 aspect rule as fallback only.
- Palette, strict: gallery #0C1A1C, pods #F4F2ED, mouth glow #FFEFD0, holograms
  #7FD4FF, cylinders #BFE9FF, ring tops #FFFFFF, shadows #061012. The pod side
  shade band and plinth line are the shadow tone laid over the pod white at low
  alpha, so no extra colors enter the piece.
- Pod form: a rounded-rect body (corner radius 0.30 of width) with a subtle side
  shade band, a plinth line at the base, a layered-alpha ground shadow, and a
  tall rounded opening (dark interior, warm layered wash at its back, thin warm
  rim stroke). The openings are sized to read as doorways.
- Rotation model: each pod's rotation is a closed-form sway of plus/minus 8
  degrees on a 25 s period with a seeded phase and alternating direction. It is
  rendered as a small horizontal squash of the body, a shift of the shade band,
  and a shift of the opening, so the whole pod reads as one turning object.
- Pod/hologram lock model: the hologram is drawn inside a clip of the pod's
  opening, so it can never leave the pod. Its horizontal squash (its "turn") is
  a weighted sum of its own slow turn phase (0.65) and the pod's normalized
  rotation (0.35), so when the pod turns, the figure turns with it, and it also
  drifts on its own seeded phases (12.5 s horizontal drift, 10 s bob). Dragging
  a pod adds to the same rotation value the hologram reads, which is what keeps
  the lock honest during interaction.
- Figure: a minimal human silhouette built from layered alpha shapes only (a
  soft outer pass at 0.30 alpha, a core pass at full envelope alpha): head
  ellipse, shoulder-to-hip body path, proportions seeded per pod.
- Booth line: three cylinders (rounded-rect bodies in #BFE9FF with a soft pulse
  on a 6.25 s period, layered-alpha halo, white ring-top ellipse). On desktop
  they stand in a close group to the right of the pods; see Deviations for the
  phone arrangement.
- Loop: 50 s seamless. Every motion frequency is a whole number of cycles per
  50 s (sway and figure turn 2 cycles, drift 4, bob 5, cylinder pulse 8), so the
  loop closes exactly.
- Determinism: all motion is a closed-form function of piece time t plus the
  recorded interaction events (drag offsets with exponential-cosine spring
  decay, clear timestamps, the reseed counter). Frame one is drawn synchronously
  at the fixed phase t = 12 s; the rAF loop, when present, replays
  t = 12 + elapsed since load. Nothing derives from Date.now.
- Interaction: drag turns the nearest pod (offset clamped to plus/minus 22
  degrees, springing back on release with a damped cosine decay, tau 1.1 s);
  the hologram inside turns with it. Tap a pod to clear it: its hologram
  dissolves over 0.7 s and reforms over 0.9 s. Double-tap reseeds the gallery
  layout and hologram poses from a new seed.
- Sound, only after a first visitor gesture and only if WebAudio exists:
  a lowpassed sawtooth servo bed whose gain follows pod rotation velocity, three
  faint seeded sine tones for the holograms, and a five-oscillator dissolving
  shimmer on a clear. Everything is lazy-created and typeof-guarded; the piece
  is silent and complete in headless QA. No microphone is ever touched.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The piece
  renders cleanly in silence: no audio, no rAF in the harness.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical.
  The duplicate render was deleted.
- Desktop read-back: dark teal gallery, three large white rounded pods with tall
  warm-lit doorways, a translucent cyan figure hovering in each doorway, three
  smaller cyan cylinders with bright ring tops standing to the right, soft
  layered shadows grounding everything. Nothing clipped.
- Mobile read-back: phone path engaged (screen-size detection); the three pods
  shrink and stay in one row, figures visible in every doorway; the booth line
  moves to a small row along the floor below the pods (see Deviations). Nothing
  clipped.
- Fix round: the first mobile render had the pods too wide for 390 px (edges
  clipped, pods overlapping, the booth line hidden behind them). Phone pods are
  now width-capped (0.28 of W), stand on a raised floor (0.70 of H), and the
  cylinders get their own lower floor line (0.93 of H). On desktop the cylinder
  group shifted right so the first cylinder no longer tucks behind the third
  pod, pod width eased from 0.46 to 0.42 of pod height so the three pods keep
  air between them at 720 px, and the doorway's warm wash strengthened slightly.
  All sizes re-rendered and determinism re-verified after the fix.

## Deviations

- Phone booth line: at 390 px wide the desktop cylinder group at the right edge
  would crowd the third pod, so on phones the three cylinders become a small
  row along the floor, centered under the pods, at reduced height. The pods
  themselves stay in a row on phones rather than stacking, because the row of
  three doorways is the composition.
- Pod rotation is rendered as squash, shade-band shift and opening shift rather
  than a true 3D rotation: canvas 2D has no cylinder to rotate, and this keeps
  the body, the doorway and the hologram locked to one rotation value.
