# No.910 "inky skies" — process

Study #111 simondavidryden, PP71 "The Inky Sky".

## Concept

Abstract suminagashi marbling, full-bleed: dark and dark-red ink ribbons looping
and folding through a milky gray field. No horizon, no literal sky, no bright
red — the red stays near-black. One large anchor ribbon folds across the frame
among ~40 smaller ones. A drag is a fingertip in the water (ribbons bend away
and relax), a tap is a fresh ink drop, a double-tap freezes the print for 6 s.

## Construction

- **Ground.** A seeded value-noise fbm field (integer-lattice hash, 4 octaves),
  domain-warped by a second fbm sampling, quantized into 17 soft bands
  interpolated between the two palette anchors (cloud shade #A8A39A, ground
  #C9C4BB) and drawn as flat per-cell rects — no canvas gradients. A second,
  very faint sampling of the same field, offset slowly by sim time, drifts over
  it as moving cloud shade. Strict five-tone palette throughout.
- **Curl field.** Analytic summed-sine stream function (9 seeded components);
  velocity is its perpendicular gradient, so the flow is divergence-free by
  construction. Component phases drift very slowly.
- **Ribbons.** Fixed-timestep sim (1/60 s). Each agent is a head plus a trail
  of recorded points (every 2 steps; 190 points ≈ 6.3 s of path, 380 for the
  anchor). Trails are drawn segment by segment as tapered strokes: width peaks
  behind the head, points at the tail, and scales inversely with segment
  length — thin where the ribbon stretches, pooling wide where it slows or
  crosses itself. Colors are assigned per agent from the ribbon set (near-black
  #1A0A0C, dark red #5A0F14, bleed #8A4A42 for the thinnest).
- **Per-agent identity.** Each agent samples the field at its own fixed seeded
  offset (up to ~0.055·S, more for the anchor), with its own speed factor
  (0.7–1.3) and a small perpendicular wander. Without this, a shared field
  stacks every ribbon onto the same few streamlines; with it, the school rides
  parallel lines and stays spread.
- **Birth and rebirth.** Every ribbon is born wearing a full trail: its history
  is integrated backward along its own offset field from its head, with the
  same speed floor as forward motion. Frame one is therefore formed marbling,
  not dots. A ribbon that escapes the tray is respawned the same way, near its
  original home cell.
- **Pre-roll.** PREROLL = 300 fixed steps (5 s of sim) run at build, so heads
  have begun to travel and fold before frame one while the school still
  remembers the jittered grid it was spawned on. Frame one is the synchronous
  draw after the pre-roll; nothing in it reads a clock.
- **Containment.** A soft spring wall inside a 5% margin turns ribbons back;
  there is no wrap (see QA log). A speed floor on the total base velocity —
  applied after field, wander, and wall are summed — means a ribbon whose
  field and wall cancel slides along the wall instead of pinning to it.
- **Interaction.** Drag segments are recorded as decaying radial impulses
  (τ ≈ 1.8 s) applied in the sim. Taps are deferred 0.35 s (house
  disambiguation window): a lone tap then spawns 3 fresh agents at the tap
  point with a short pre-unfurled trail; a second tap inside the window
  cancels the drop and instead freezes the sim clock for 6 s of wall time —
  the print holds exactly, ground drift included, since drift reads sim time.
- **Audio.** Lazy, typeof-guarded, created only on the first pointerdown:
  a looped pinkish-noise buffer through a lowpass (the watery wash) and a
  peaking filter whose frequency and gain follow smoothed drag speed (the
  stir). A drop fires one soft plink (sine gliding 640→210 Hz). No audio
  state touches the visuals; the piece renders complete in silence.
- **Sizing.** Canvas from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in px inside draw() every frame.
  Phone detection via window.screen (min dimension < 700), aspect fallback
  only; phones run 26 ribbons instead of 40.

## QA log

- Rendered with render-piece.js at 1280×900, 390×844, 720×720. Thumb rendered
  twice and byte-compared: identical. No Date.now, Math.random, gradients,
  shadowBlur, filters, or offscreen canvas anywhere (grep-verified).
- Round 1: ribbons nearly invisible — hard respawn-on-exit kept most trails
  at one or two points. Fixed with backward-integrated birth trails.
- Round 2: a toroidal wrap turned a boundary stagnation point into a seam
  trap (instrumented: ~25 of 41 heads pinned at one corner, trails bunched).
  Wrap removed; spring wall + respawn-with-trail instead.
- Round 3: the whole school drained into the field's dominant vortex over a
  long pre-roll. Per-agent field offsets, wander, a jittered-grid spawn, and
  speed floors spread it; a final floor on total velocity ended wall pinning
  (short-trail count fell from ~25 to ~3 in the diagnostic harness).
- Round 4: pre-roll shortened 600→300 steps so frame one keeps the grid's
  spread while the trails (mostly backward-integrated at that point, exactly
  on the field's streamlines) already read as finished marbling.
- Final read-back: desktop and thumb show dark and dark-red ribbons looping
  across the milky ground, a dense vortex family with the anchor's thick loop
  in it, fans sweeping the top and right edges, full-bleed; mobile shows two
  vortex families in the tall frame, nothing clipped. Two tiny pooled-ink
  dots sit at frame corners where single heads rest in stagnation points —
  accepted as honest ink behavior. Red never brightens anywhere.

## Deviations

- Trails are born by backward integration rather than grown live from a dot;
  the sim's forward history takes over seamlessly. Reason: the determinism
  gate requires a fully formed first frame, and a live-grown school needs
  ~25 s of pre-roll, by which time it has drained into one vortex.
- Tap drops commit after the 0.35 s disambiguation window so a double-tap
  can pre-empt them (established house pattern).
- The drag audio "phaser" is a peaking-filter sweep following drag speed
  rather than a literal multi-stage phaser; reads the same at this scale.
