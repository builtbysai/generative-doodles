# №1326 "Right Here, Right Now" — process notes

Sadie Barnette SB7 (PP493). A large wall of powdered-graphite text, drawn
stroke by stroke, holding, then wiping to the next seeded word-order.

## What it is

Four lines of dense matte graphite on a soft gallery-white wall, formally
restrained, centered, generous margins:

- RIGHT HERE,
- RIGHT NOW,
- EVERYTHING,
- FOREVER

Each line spans ~60% of field width, stacked with wide leading, with faint
pencil guide rules beneath. The graphite carries the only weight in the room.

## The one intrusion

Exactly one rhinestone glint is embedded in the counter of one letter,
picked per cycle from letters with counters (R, O, E, D, A, P) via a seeded
stream. At frame one it sits in the R of "RIGHT NOW," pulsing slowly. It is
the only gold in the piece; the text is graphite only, never colored.

## Motion (watch-only, no viewer input, 246 s cycle)

- Each line draws itself over ~45 seconds: characters accumulate left to
  right, each glyph rendered in three offset passes at varying alpha plus
  graphite speckle dots, so the hand reads in the texture rather than as
  crisp vector type.
- The full wall then holds for 60 seconds with only the rhinestone glinting.
- A soft 6-second wipe fades the wall back to blank paper, and the next
  cycle begins with a newly seeded word order.
- Cycle 0 keeps the canonical order; later cycles shuffle the four lines
  via mulberry32.

## Frame-one determinism (hold-phase precedent)

Frame one is phase-shifted to open in the hold phase: all four lines
complete, rhinestone glinting. It is drawn synchronously at exactly t = 0
via a boot flag; the clock starts only with the rAF loop. All randomness
comes from seeded mulberry32 streams, never Math.random. Stroke
accumulation, hold, and wipe are closed-form functions of piece time.

## Adaptations

- No gradients, no shadowBlur, no offscreen canvas, no ctx.filter: graphite
  texture is layered flat-alpha strokes; the wipe is a wall-colored alpha
  overlay on the main canvas.
- Dots drawn as paired arcs/rects with moveTo before batched arcs
  (node-canvas ellipse/arc quirk); the glint diamond is a closed path.
- The rAF loop is a plain function declaration behind a typeof guard.
- Sizing uses the Visual Viewport API with resize listeners on
  visualViewport and window; canvas is pinned in draw() via style
  width/height in px. Phone detection via window.screen physical size
  (min dimension < 700 px) with aspect h > w*1.15 as fallback; the centered
  composition keeps its shape on phones with the page ground taking the
  wall color.
- Text is prompt-specced content, verbatim; no other visible text except
  <title>. No audio of any kind.

## QA

- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
  Desktop and mobile both hold the centered four-line wall with generous
  margins; the glint reads in the R counter on desktop.
- Forced-time probes on discarded temp copies: t=100 (first line ~75%
  drawn) shows a partial wall (7,086 ink pixels vs 29,513 at hold);
  t=65 (wipe at 83%) shows the wall faded to ghost text, confirming the
  wipe runs.
- Gold-pixel scan of the shipped thumb: exactly one glint cluster (7
  gold-ish pixels in a single 2x4 px bbox).
- Thumb rendered three times plus a final re-verification: all
  `cmp` byte-identical.
- Fix rounds: (1) cycle 0 first shuffled the line order, so frame one
  opened on a non-canonical order — cycle 0 now keeps the canonical order
  and only later cycles shuffle; (2) an intermediate edit dropped the
  `rng` declaration in the shuffle helper, caught immediately by the
  render probe and restored before final QA.
