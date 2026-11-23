# №1403 "Skater's Score" (alison-odaniel AO4, PP626)

## What it is

A skatepark as a score. A flat concrete landscape with ramps and rails fills the
lower two-thirds of the frame; a five-line score staff floats in the sky wash
of the upper third. Two procedural skaters loop their runs endlessly. Each
trick a skater lands becomes a note on the staff: ollies are short ticks,
grinds are long lines, falls are red splashes. Notes appear at the moment of
landing, then drift rightward as new tricks arrive.

## Frame one

Sky wash with five ink staff lines across the upper third; concrete park below
with two ramps, a horizontal rail on two posts, and dust motes. No notes yet
(the first landing is at t=4s). One skater is mid-run on the ground; the other
rolls in from the left edge shortly after. No visible text except `<title>`.

## Mechanics (all closed-form over piece time + recorded events)

- **Skaters.** Parametric stick figures (board, legs, torso, arms, head) rolling
  left to right on a closed-form ground profile with two smooth concrete
  mounds. Base motion wraps across the frame; speed differs per skater.
- **Trick schedule.** 18-second cycles per skater. Three events per cycle: an
  ollie at +4s, a seeded event at +9s (ollie or fall, by seed), and a grind at
  the cycle's rail-centre crossing time when one exists (otherwise an ollie at
  +13s). Trick phases are closed-form windows: ollie air is a parabola peaking
  mid-window, grind blends the skater onto the rail with a smooth envelope
  (no position jump at window edges), falls tip the figure over 1.2s and
  recover. Glyphs spawn at land moments (grind glyphs at the end of the grind).
- **Staff.** Notes are computed closed-form from every landed event: x =
  entryX + (t − landTime) × scrollSpeed, so the staff scrolls continuously and
  notes drift rightward until they exit. Lane (which of the five lines) is
  seeded per event. Glyph shapes are keyed to trick type: ollie = short tick
  with gold dot, grind = long line with gold dot, fall = 8-ray red splash.
- **Drag a skater.** While dragged, the skater follows the pointer; on release
  it resumes rolling from the release x and the trick sequence re-seeds
  (route count is recorded per skater, and each cycle's seeded types are a
  function of the route count at that cycle's start, so history never rewrites
  itself). Verified: a drag at t=20 changes a later seeded event from fall to
  ollie (red staff pixels 72 → 0 at that landing +2s).
- **Tap a staff note.** A tap (under 14px movement) on a note replays that trick
  in slow motion: a gold ghost skater performs it over 4 seconds at park
  centre with a fading halo ring, then clears.
- **Audio.** Fully visual by default. Percussive ticks (1200 Hz ollie blip,
  700 Hz grind, 180 Hz fall thud) play only via lazily created, typeof-guarded
  WebAudio created inside the first pointerdown, and only for landings after
  that gesture. Never autoplay. No getUserMedia/microphone anywhere.

## Adaptations

- Prompt's "trick state machines" are closed-form schedules (approach, launch,
  air, land, roll as functions of piece time), never frame-integrated state;
  the staff is a closed-form note field, not a scrolling buffer object.
- No gradients, no offscreen canvas, no shadowBlur, no Path2D, no
  createElement, no fillText/strokeText — the staff carries glyphs only, never
  readable text, per the study-wide rule. Sound is seen (glyphs, ripples,
  sparks), never merely heard; nothing here simulates d/Deaf experience — the
  piece is about the score as a visible object.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque); dots drawn as
  filled rects; every arc in its own beginPath with a moveTo first.
- Determinism: frame one = draw(0) via boot flag; clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all randomness
  from mulberry32 (seed 1403000 + index·7919), never Math.random.

## Verification (forced-time probe harness, stubbed rAF + pointer events)

- Two fresh instances render byte-identical frame-one images; thumb
  byte-identical across repeated renders.
- Staff-zone note pixels: 0 above the bare lines at t=0, +82 px by t=5 (after
  the first landings), +112 px by t=8 — notes appear and drift.
- Ollie air: skater A's topmost ink pixel rises from y=716 rolling to y=595
  mid-air (ramp lift + jump parabola).
- Grind: 201 ink px on the rail at the cycle-0 crossing (t=11.31) — the figure
  sits on the rail.
- Fall: first fall event is skater A, cycle 1, landing t=27; red staff pixels
  255 at t=29 (splash glyph present).
- Drag: after a 120px drag at t=20, skater ink sits at the expected rolled
  position at t=21 (299 px in the strip); the later seeded sequence changes
  as described above.
- Tap: tapping the cycle-1 ollie note (x≈328, lane 2) produces a gold ghost
  skater at park centre (1283 gold px at t=31).
- Token scan clean: no fillText/strokeText, getUserMedia, createElement,
  Path2D, gradients, or Math.random; AudioContext only inside the
  typeof-guarded gesture path.

## Fix rounds

1. Fall recovery window extended from land+0.6s to land+1.2s — the first build
   cut the tip animation off mid-recovery, which would have snapped the
   figure upright.
2. Drag re-route offset recomputed modulo the wrap span — the first build
   could place the skater a full span off after a wrap.
3. Drag-follow added: while a skater is dragged it now follows the pointer
   instead of only jumping to the release x on pointerup.
