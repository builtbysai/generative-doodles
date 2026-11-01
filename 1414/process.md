# №1414 "Captioning the City" — christine-sun-kim CS7 (PP637)

A city flattened into a diagram where sounds arrive as public text: words drift
through streets like weather, settle on buildings like dust, and pile up at
intersections. A caption is not a strip at the bottom of the screen but a place
you can walk through.

## What the piece shows

- City in flat elevation on city gray #9a9a92: a rooftop row along the top
  (cream buildings with varied heights, peaked roofs, small windows), side
  blocks left and right, and two diagonal street-gold bands crossing at a
  central intersection plaza (cream ellipse).
- 26 caption sprites on a seamless 120 s loop. Each caption drifts in from an
  edge along a street, tumbles slightly, and settles — on a wall, on a plaza,
  or in the pile at the central intersection, where settled captions
  accumulate in drifts that slowly compact toward the pile centre.
- A slow "rush hour" cycle: most spawn times cluster in cycle seconds 40–80,
  so many captions are in flight at once during rush, and few outside it.
  The city never empties.
- Drag a settled caption to lift it back into the air; on release it drifts
  and re-settles elsewhere (a fresh seeded point near the release point).

## Text rule (explicit prompt exception)

The prompt itself specs captions as short plain text sprites — single words
and short phrases about city sound, never sentences, never a subtitle strip.
The piece carries the prompt's own examples ("bus brakes", "rain on awnings",
"plane, two minutes") plus four more in the same register ("door slams",
"heels on stone", "siren, far off", "market chatter"). Drifting captions draw
in drift blue #7a9ab0; settled captions draw in caption ink #1a1a18 with a
small settle-ochre mark beneath. No other visible text except `<title>`.

## Study-wide rules honored

Touch/drag, never click-to-reload; seamless loops; pseudo-gestures only —
never real ASL words, never a gesture captioned as an English translation,
never a piece that asks the viewer to "experience deafness" by muting or
muffling. The piece is about sound politics and access, not imitation.
Fully silent; no audio of any kind.

## Adaptations (closed-form, no simulation)

- City as flat vector planes; captions as short plain text sprites with
  drift-and-settle behavior; drag as pick-up-and-drop on caption sprites;
  rush hour as a slow density envelope over spawn times.
- Every caption state is a closed-form function of piece time and recorded
  events: drift is a smoothstep interpolation with a sine wobble and tumble;
  settling compacts toward the pile centre as a decaying exponential with a
  55% floor, so the drift stays legible instead of collapsing into a blob;
  fading is a linear alpha ramp on stored history, never canvas-fade.
- Drag re-settle is a 6 s smoothstep from the release point to a fresh
  seeded settle point; compaction after a drag anchors to the re-settle end
  time, so there is no position pop when the drag record clears.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. rAF is typeof-guarded; frame one is drawn
  synchronously at a constant phase via a boot flag (frame one = draw(0),
  clock starts only with the rAF loop, plain function declaration).
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying, dots as filled rects, moveTo before every batched arc
  (arcs here each get their own beginPath).
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with
  canvas.style.width/height in px. Phone detection via window.screen
  physical size (min dimension < 700 px) with aspect h > w*1.15 as fallback.
  Field-like composition goes full-bleed on phones; page ground takes the
  piece's own background color.
- All randomness from a seeded mulberry32 PRNG (seed 1414000 + index*7919),
  never Math.random. Drag re-settle targets derive from a separate seeded
  PRNG keyed by drag count.

## Verification (forced-time probe harness)

Harness: vm-isolated instances, stubbed rAF driving the piece's own loop,
pointer events dispatched to its own listeners, 1280×900.

- Two fresh instances render byte-identical frame-one images (0 px diff),
  in isolated vm contexts.
- Motion: t=0 vs t=10 differ in 20,800 px.
- Rush hour: drifting-caption (drift-blue) pixels 351 at cycle time 10 vs
  3,756 at cycle time 55 — roughly 10× more captions in flight during rush.
- City never empties: caption pixels 4,523 at t=0, 1,233 at t=30 (quiet
  stretch), 4,488 at t=55, 4,527 at t=115.
- Drag: grabbing at the central plaza and moving to (820, 300) changes
  1,176 px vs an undragged control at the same clock time; after release
  and re-settle (t=29), dragged vs control differ in 1,378 px, with 673 px
  of that in the grab region (caption left the pile) and 139 px near the
  release point (caption re-settled elsewhere). Baseline control motion
  over the same interval is 20,432 px, so the drag signal is distinct
  from ordinary drift.
- Renders inspected at 1280×900, 390×844, and 720×720; thumb byte-identical
  across repeated renders.

## Fix rounds

1. Central pile first collapsed into an unreadable blob: pile settle points
   were too tight and compaction decayed fully to the centre. Pile zone
   widened (0.5±0.17, 0.55±0.13) and compaction given a 55% floor
   (k = 0.55 + 0.45·exp(−age/60)), so the pile reads as accumulated drifts
   with individually legible captions.
2. Settled captions near the right edge clipped: wall/side settle zones
   tightened (x 0.08–0.92, side blocks 0.78–0.90) and drag re-settle targets
   clamped to 0.10–0.90 in both axes.
3. Probe-harness fix (not a piece bug): the first drag probe shared one
   global rAF stub across instances, so the control instance never
   redrew; re-ran in isolated vm contexts and all drag numbers above are
   from the clean run.
