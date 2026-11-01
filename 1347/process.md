# №1347 "Absence Stack" (eric-gottesman EG4, PP570)

## What it is

A stack of five abstract "photographic prints" in muted C-41 tones on a dark
table ground. Each print is crossed by black redaction bars. The bars come
from ONE mask, a doorway (two posts plus a lintel), shifted by each print's
own index x 6px, so when the stack sits aligned the bars form a coherent
dark doorway shape that no single print contains. The censored bar is the
artwork.

## Frame one (t = 0, boot flag)

The stack sits aligned in its hold phase on the table ground (#232019),
centered, prints 4:5 at ~66% of frame height. The top print's doorway reads
whole in #0A0A0A; backing edges (#D8D2C4) and slight rotations peek at the
corners, showing the stack beneath. No text except `<title>`.

## Motion and interaction

- 30 s shuffle loop: hold 4 s, then the top print slides down-left to the
  back over 2 s (eased, arcing out on a sine bulge), hold 4 s, repeat. The
  other prints step one slot toward the front during the same slide. Stack
  order is a closed-form rotation: at step s, stack[i] = print (i - s) mod 5.
- Drag: pointer down on a print grabs it (topmost hit first); it lifts to
  scale 1.04 with a flat-alpha offset shadow and follows the pointer. Release
  snaps it back to its current slot over 0.5 s with an ease-out cubic.
  Dragging never changes stack order, only reveals what is beneath.

## Adaptations

- Prints are seeded procedural fields drawn per frame on the MAIN canvas:
  layered flat-alpha landscape strata in the four C-41 tones, seeded grain
  flecks, jittered corners, slight seeded rotation. No offscreen buffers, no
  gradients, no shadowBlur.
- The mask array is the single source of truth; bars are never drawn
  "similar", they are the same array shifted per print.
- Determinism: frame one is drawn synchronously at exactly t = 0 via a boot
  flag; the clock starts only with the rAF loop (plain function declaration
  behind a typeof guard). All fields, grain, rotations, and phases come from
  mulberry32 streams (seed 1347000 + index x 7919), never Math.random.
  Resize redraws at the current piece time, never restarting.

## QA

- Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
  inspected. Desktop and mobile both read as the aligned stack with the
  bold doorway; backing edges peek at the corners.
- Thumb rendered three times plus a final re-verification: all `cmp`
  byte-identical.
- Forced-time probes (temp harness, discarded): t = 5 s shows the top print
  mid-slide down-left with the stack beneath revealed; a drag probe shows
  the grabbed print following the pointer, lifted, revealing the print
  beneath, and snapping back to its slot on release (snap render
  byte-identical to frame one).
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, gradients, or offscreen canvas. (One comment mentions
  shadowBlur only to state it is not used.)

## House rules

Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen physical size (min dimension < 700px) with aspect fallback;
field-like composition full-bleed on phones with the page ground in the
piece's own table color. Silent; no audio of any kind.
