# No.970 - Follow Everyone

Study #119 kyle-mcdonald, PP131 "Exhausting a Crowd" (after Perec's
*An Attempt at Exhausting a Place in Paris*). The mechanism is annotation as
the medium: a crowd crosses a plaza, strangers' invented thoughts accumulate
above their heads as glyph-tags, and the tags outlive their walkers in an
archive ticker along the bottom edge - the poem of the plaza, written by
everyone and no one. The tags are strokes, never words: the moment a tag
read as text it would be a chat log, not a poem.

## Concept

- The plaza is an abstract paving grid (six by five large tiles) on
  plaza-dark #101116, paving #1E2129. The archive ticker runs along the
  bottom tenth of the square stage.
- Forty pedestrians: 28 commuters walking seeded edge-to-edge crossings
  (with a gentle sinusoidal wobble across their line of walk) and 12
  loiterers drifting on closed-form Lissajous paths around seeded anchors.
  All are small pale dots (#C9CFDB); no faces, no names.
- A bus (amber #FFC44F rounded rect with dark windows) arrives at a
  left-edge stop on a roughly 75 second cycle: slide in, dwell while eight
  riders disgorge one every half second, slide out. Riders walk to an
  interior waypoint, then become temporary commuters who leave the plaza
  for good at their exit edge.
- Tags: dark bubbles (#0B0C10 fill, #4FD6FF outline at 0.8) holding one to
  three invented glyphs drawn from a ten-stroke vocabulary (lines, arcs,
  dot clusters, zigzags, circles, crosses, waves, hooks), seeded per tag.
  A tag pops in above its walker, bobs as it rides, lives nine to twenty
  seconds, then detaches: it shrinks and slides down into the archive
  ticker, where it eases leftward into a slot and fades from #3A4050 to
  #1E2129 over about 75 seconds. Live population is held in the 15-25
  band by an attach manager; the archive caps at 16 minis, oldest first
  out.
- Every 300 seconds the plaza clears: a new day, new streams, empty
  archive.
- Interaction: TAP a walker to annotate it - your tag attaches and joins
  the archive in time; tapping an already-tagged walker retires its old
  tag early and replaces it. DRAG from a walker to follow it: a thin cyan
  line connects your pointer to the walker while held. DOUBLE-TAP starts
  a new day. Sound, only after a first gesture: a low filtered-noise
  street bed, a soft pop per tag attach and per bus rider, a low triangle
  rumble on bus arrival, and a faint typewriter clack from the sim every
  four seconds.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Fixed-timestep simulation at 120 Hz. All randomness flows from
  mulberry32 streams: a master stream seeds each day's stream; tag glyphs
  are pure data generated from the tag's own seed. Loiterer motion is
  closed-form in sim time. Pointer events are queued with sim timestamps
  and consumed in order; nothing drawn ever depends on the wall clock.
- Frame one is the synchronous draw after exactly 3600 pre-roll steps
  (30 seconds in): streams mid-crossing, about sixteen tags live, several
  already archived in the ticker, and the first bus mid-dwell at the stop
  with its riders fanning out.
- Tag lifecycle is a state machine (in / live / out) with step-counted
  phases; a detaching tag captures its bubble position in stage fractions
  at detach start and eases to the ticker's newest slot. Archive items
  ease toward index-based slots inside the step function, so the ticker
  layout is itself deterministic.
- Layout: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas CSS size pinned in draw()
  every frame; the square stage centers in the frame and the page ground
  is the piece ground, so the ticker sits at the bottom on phones too.
  Phone detection via window.screen (min dimension under 700 px) with
  the tall-aspect fallback, per house rules.
- Palette is strict: ground #101116, paving #1E2129, pedestrians #C9CFDB,
  bus #FFC44F, bubble fill #0B0C10 with outline #4FD6FF at 0.8, glyphs
  #F5F2EA, archive outline fading #3A4050 to #1E2129 (drawn as exact RGB
  lerps). No gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no text anywhere except the <title>. AudioContext is created
  lazily inside the first pointerdown and typeof-guarded; the rAF loop
  is typeof-guarded and steps are capped per frame, so the QA renderer
  (no rAF, no audio) draws frame one in silence.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
  All render cleanly in silence; listeners registered as expected.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Desktop and thumb: the paving grid fills the frame; dozens of pale
  walkers cross in streams; about sixteen cyan-outlined bubbles with
  abstract white glyph strokes float over their walkers; the amber bus
  sits docked at the left-edge stop mid-dwell with riders dispersing;
  the bottom ticker holds a full line of faded mini-bubbles, the poem
  so far. Mobile: the square stage centers in the tall frame, plaza,
  bus, bubbles and ticker intact, nothing clipped.
- Hygiene grep: no Date.now, Math.random, gradient constructors,
  shadowBlur, ctx.filter, createElement, getUserMedia or external URLs
  in the file.
- Crowd/tag model, stated plainly: commuters respawn at a seeded entry
  edge on reaching their exit so the base crowd never thins; only
  bus-born temporary commuters actually leave. Tags are bound to their
  walker; if a temporary walker exits with a live tag, the tag detaches
  from the exit point and still joins the archive.
- Deviations from the prompt text, with reasons:
  1. Bus period is 68-76 seconds (75 nominal plus seeded jitter) rather
     than a metronomic 75, so arrivals feel like a timetable, not a
     clock; the first bus is scheduled to be mid-dwell at frame one so
     the still shows the disgorge the piece is about.
  2. The archive ticker lives in the bottom tenth of the square stage
     rather than the bottom tenth of the whole frame, keeping plaza and
     poem in one composed square on tall phone screens; the plaza still
     fills the stage edge to edge above it.
  3. A tap on an already-tagged walker replaces its tag (the old one is
     archived early) instead of doing nothing - the visitor's annotation
     should always land, and the archive gains the retired tag either
     way.
