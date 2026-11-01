# №1327 "The Heart Balloon" (sadie-barnette SB8, PP494)

## What it is

A tender surveillance-footage moment abstracted. A monochrome, slightly grainy
doorbell-camera frame: a car trunk (dark rectangle, lower-center, tilted
slightly), ordinary objects being hauled (blob-boxes, a standing cylinder), all
in gray tones. Among them: one small pink heart balloon, the ONLY color in the
scene. At a seeded moment it slips its string, rises through the frame, and
drifts up and off-frame while the gray world keeps hauling. The balloon casts a
small pink reflection on the trunk. Then the loop resets.

Grounded in Barnette's *I DIDN'T MAKE ART ABOUT YOU BECAUSE YOU WERE A BLACK
PANTHER I MADE ART ABOUT YOU BECAUSE YOU ARE MY DAD* (2026: doorbell-camera
footage of her father hauling helium balloons from a car trunk as a heart
balloon escapes), and her rule that the work carries exactly one intrusion.

## Frame one

Monochrome doorbell-camera frame: wall above, driveway below, faint wall seams
and driveway joints, film grain, flat-alpha vignette bands, a faint gray "REC"
corner mark with a blinking dot. The dark trunk sits lower-center, tilted
about -3 degrees, with a thin light strip along its top edge. Five gray
blob-boxes and one standing cylinder cluster at the trunk. The pink heart
balloon sits above the trunk's left-center, tethered by a light-gray string to
the cluster, with a small pink reflection ellipse on the trunk below it.

## Motion (watch-only, 60-second loop, no viewer input)

- 0 to ~40 s: hauling. Objects shift on small closed-form sine jitters; the
  gray world keeps working. The balloon stays tethered, string swaying.
- Escape at a seeded moment (cycle 0: 39.59 s; each cycle reseeds from
  mulberry32(1327000 + cycle x 7919), giving 38-42 s): the string detaches and
  dangles from the balloon.
- Rise, 15 s: ease-out ascent with a slight sine sway, drifting up and
  off-frame. The pink trunk reflection fades as the balloon climbs.
- 57 to 60 s: reset crossfade on the main canvas — the next cycle's frame one
  fades in over the current scene. No offscreen canvas is used anywhere.
- The balloon never pops or bursts. It escapes; it doesn't die.

## Determinism and house adaptations

- Frame one is drawn synchronously at exactly t = 0 via a boot flag; the clock
  starts only with the rAF loop (plain function declaration behind a typeof
  guard). All randomness comes from seeded mulberry32 streams; no Math.random
  anywhere.
- Film grain is a closed-form seeded function of the quantized time index
  (mulberry32 keyed by floor(t x 12)), never per-frame random.
- Vignette is flat-alpha edge bands, never a gradient. The heart is a bezier
  path; grain dots are rects; the REC dot is a single arc in its own path
  (node-canvas ellipse/arc quirk respected throughout).
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via canvas.style.width/height in px; phone detection
  via window.screen physical size (min dimension < 700 px) with aspect
  h > w x 1.15 as fallback; field-like composition goes full-bleed on phones.
- Silent: no audio of any kind. No visible text except <title> and the faint
  gray "REC" corner mark. No getUserMedia/microphone. No real photographs or
  faces; no second color anywhere — the pink is singular.

## Fix rounds

1. First render crashed in the QA renderer: `document.body` is undefined there.
   The body-background line is now guarded with a try/catch.
2. First frame-one render showed the cylinder as a lone white ellipse floating
   in the sky: its body was painted #9A9A9A, identical to the wall. Rebuilt
   with a #6B6B6B body and a dark outline stroke, so the cylinder now reads
   as a standing object at the trunk's right.

## Verification

- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
- Thumb rendered three times plus a final re-verification after the cylinder
  fix: all cmp byte-identical.
- Forced-time probes on discarded temp copies: t = 0 and t = 20 show the
  balloon tethered at the cluster (1,592 pink pixels, same bbox); t = 45 shows
  it mid-rise (y 98-144, risen from y 397-443); t = 59 shows the crossfade
  bringing the next cycle's tethered balloon back at the cluster position.
  Escape time for cycle 0 confirmed as 39.59 s from the seed stream.
