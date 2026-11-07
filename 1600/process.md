# №1600 Not Only Perlin

EXPANSION #211 aluan-wang, prompt PP847 / AW1. A dark petri field of thin flowing lines that almost looks like a Perlin flow field, until you notice the lines keep carrying cargo: deformed fragments ride the current, encrypted further each time the family returns.
Gallery date: 2006 · 05 · 30 (formula 2002-01-10 + 1601 days).

## Mechanism

A dark ground (#0B0E12) holds a flow field of 600 trail particles in muted teal #4ECDC4 and warm grey #8A8A92. Each particle keeps a 12-point trail, so the current reads as short flowing streaks that swirl around the field's vortices. Five cargo fragments ride the same field at 0.4x particle speed: a warped grid patch, a half-recognizable bloom, and a cluster of off-palette dots, in signal orange #FF6B35, amber #F7C948 and deep violet #3A2E5C. Fragment centers are seeded inside the central 18 to 82 percent box and steered back if the field pushes them out, so no fragment ever touches an edge; each is about 10 percent of the frame wide.

Every fragment carries deform parameters that encrypt further over time: shear grows with age, scale wobbles, rotation drifts, and its color lerps a little toward a second cargo color. Encryption is age over 45 seconds plus a per-mint base that grows 0.15 with each tap (capped at 0.45), so a family returning after a reseed starts more deformed than the last one. At the fixed first-frame phase of 20 seconds the fragments already sit visibly sheared and rotated.

## Interaction

Watch-only by default: the flow runs continuously and the cargo rides it, deforming as it travels. Tap anywhere (a pointerup with under 12px of movement, so drags do nothing) and the piece reseeds: a new field with a new sampled cargo family, crossfaded over 2 seconds while the old field fades out. Tap seeds come from a fixed deterministic sequence (base seed plus tap count times 104729), never Math.random. No other interaction.

## Palette

Dark ground #0B0E12; current lines muted teal #4ECDC4 and warm grey #8A8A92; cargo fragments in signal orange #FF6B35, amber #F7C948, deep violet #3A2E5C. Nothing else except the same warm grey at low alpha for the title, date and hint text.

## Determinism

First frame is drawn synchronously at a constant phase of 20.0 seconds. The rAF loop is anchored as phase plus elapsed-since-load. All particle positions, fragment shapes, field phases and tap seeds come from fixed-seed mulberry32 generators. No Math.random, no Date.now, no wall-clock input anywhere. Reduced-motion preference renders the static first frame only.

## Deviations from the prompt

- The prompt asks for a curl-noise flow field, which in the usual Perlin implementation is not a pure function of time and would break byte-identical re-rendering. The field is instead the analytic curl of a layered-sine stream function (three sine terms with fixed frequencies and seeded phases), which is a closed-form function of position and time and produces the same swirling current. The visible result is unchanged: flowing lines with vortices that carry cargo.
- Hue drift is capped at a 0.3 lerp toward the fragment's second cargo color (the prompt's "hue drift" read literally would wash deep violet through grey-brown on its way to amber). Violet stays violet, orange stays orange.
- The two dot-cluster fragments are allowed to drift near each other during the 20 second pre-roll; they read as two adjacent clusters rather than one loose group at first frame, and they separate as they ride different local currents.

## Proposed gallery note

"Not only noise: cargo rides the current, encrypted further each time. Tap to reseed. Cargo rides the current."

## QA

Rendered from the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected: teal and grey flow streaks swirling around clear vortices, five cargo fragments visible (grid, two blooms, two dot clusters) in orange, amber and deep violet, none touching an edge, title/date/hint legible on the dark ground, mobile full-bleed with the field filling the tall frame. Thumb is the 720x720 render.
index.html md5 48909146ad721c42ab7c5e906453c2ba.
thumb.png md5 7b4895451f483e8decdd609eadb4c33b.

Fix rounds: round 1, the violet bloom rendered as muddy grey-brown because the hue drift lerped it halfway to amber; the drift factor was cut from 0.55 to 0.3 and the bloom now reads as deep violet.

A node harness confirmed the mechanism: first-frame fragment state is identical across two fresh runs (seed 1600000, same five fragment types and positions). A simulated tap reseeded the field (seed 1600000 to 1704729, new fragment family with different types and positions, mint base 0 to 0.15) and a render at t=23 shows a visibly different field and cargo family after the 2 second crossfade; fragments moved between t=20 and t=23, so they travel. A 100px drag did not reseed (tap count unchanged). Two fresh desktop first-frame renders are byte-identical (md5 d404b089c7e13decda27d66b08470b84), and the script contains no Math.random or Date.now.
