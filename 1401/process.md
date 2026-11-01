# №1401 "Room Tone" (alison-odaniel AO2, PP624)

An empty room listening to itself. A quiet interior in flat perspective —
warm-white walls, a floor band, one boxy structure at center like a covered
HVAC unit — where the only action is the slow drift of dust, light, and
faint vibration patterns crawling across the walls.

## What the piece does

- **The room.** Back wall in warm white #e8e2d4 fills the frame; a darker
  warm floor band runs along the bottom with an umber baseboard line. The
  central boxy structure is HVAC cover gray #9a9a92 with a darker outline,
  six vent-grille slats, a panel seam, and an offset umber shadow. It anchors
  the middle of the frame at every size.
- **Dust.** 64 seeded gold motes drift slowly on closed-form sine paths,
  twinkling as they go. They are the room's quietest motion.
- **Vibration.** On a seeded schedule (long still stretches, then a wave),
  concentric teal rings radiate from the structure with closed-form
  exponential decay, fading out before they ever reach the walls. A second
  trailing ring follows each wave. Separately, soft lateral bands sweep
  across the room every ~37 s — a door elsewhere, a plane passing, a breath.
- **Record.** Dragging anywhere "presses record": the room tone thickens,
  dust motes brighten, and the last few seconds of vibration replay as
  visible ripples (a second, thicker ring drawn over each recent wave). The
  boost decays over 4 s after release. The piece never cuts, only listens.
- **Sound.** Visual-first. An optional low 55 Hz hum exists only via lazily
  created, typeof-guarded WebAudio inside the first pointerdown gesture;
  the visuals track a closed-form envelope, never live audio analysis.

## Study-wide rules honored

- Captions are material objects, never subtitle strips — this piece carries
  no text at all except `<title>`.
- Sound is felt or seen, never merely heard — the whole piece is the
  visible form of room tone.
- d/Deaf experience is never framed as deficit or simulated — the piece is
  about attention and access: a room listening to itself.

## Adaptations

- Vibration as expanding ring fields with closed-form exponential decay
  (never frame-integrated simulation).
- Drag-record as a recorded ring buffer of wave events replayed closed-form
  as visible ripples.
- Optional ambient hum gesture-gated and lazy; visuals track a closed-form
  envelope, not audio.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  localStorage, fillText/strokeText, or getUserMedia anywhere.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; centered composition keeps its shape, page ground
  takes the piece's own background color.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1401000 + index·7919), never Math.random.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque in node-canvas);
  dots drawn as filled rects; moveTo before every batched arc.

## Verification (forced-time probe harness, stubbed rAF driving the piece's own loop)

- Frame one: quiet room, central boxy structure, dust, no rings — the long
  still stretch before the first wave (t = 13.07 s) is correct.
- Rings: at t = 17.5 s (inside event 0, age 4.43 s) the wall pixel left of
  the box reads teal-shifted (219, 220, 206) against pure wall
  (232, 226, 212); at t = 24 s (event over, replay window expired) the same
  pixel is back to pure wall — waves fade before the walls and leave no
  residue.
- Record: at the same clock time t = 17.5 s, holding the pointer deepens
  the ring pixel to (206, 214, 201) and brightens dust (gold pixels 24 →
  409) — the tone thickens and recent vibration replays.
- Sweeps: at t = 37.1 s (mid-sweep 0) the band pixel reads (223, 221, 208)
  against pure wall off-band — the passing wave crosses the room.
- Audio: no AudioContext exists before a visitor gesture; creation is
  inside the pointerdown path behind a typeof guard.
- Token scan clean: no fillText/strokeText, createElement, Path2D,
  shadowBlur, gradients, localStorage, or getUserMedia.
- Thumb byte-identical across repeated renders, including after the fix.

## Fix rounds

1. Mobile box proportions: the unit was first sized from viewport height
   alone, so on the 390-wide render it read as a tall door panel rather
   than a boxy unit. Width is now capped by viewport height too
   (min(w·0.30, 340, h·0.42)) with height = 0.88 × width, so the unit stays
   boxy at desktop and mobile. All renders re-done after the fix.
