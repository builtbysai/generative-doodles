# №1340 "Ad-Speak" — hank-willis-thomas HT5 (PP515)

## What it is
A billboard in perfect brand grammar whose only subversion is its payload
text. The billboard is always complete and legible as an ad: headline zone on
top, brand-red rule beneath it, body copy as gray bars in the left column,
a bronze fist holding nothing as the hero in the right third, one generic
swoosh-like black curve drawn once and never changed, and a gold logo plate
with a blank disc at bottom-right. Every 8 seconds the billboard "speaks":
a brand-red bar sweeps the headline zone over 1 s, revealing a sentence
advertising cannot responsibly say; the sentence holds 6 s; the bar sweeps
again over 1 s, wiping it clean. The sentences cycle a fixed deck of 8, in
fixed order: "Love Overrules", "Hurt people, hurt people", "No matter what",
"Keep the faith baby", "Community is currency",
"We must accept finite disappointment", "Never lose infinite hope",
"Are we in time or is time within us". Tap skips to the next sentence (the
channel-change, never a reseed). No real brand names, no real swoosh, no
scrolling ticker; the billboard never sells anything.

## Frame one (the gate)
Frame one opens with the billboard complete and the headline VOID: the
red wipe bar is parked at the left edge of the headline zone, no sentence
visible. The loop phase at t = 0 is the start of the first sentence's
wipe-in, so the subversion arrives through the loop, never before it.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop. Sentence index and wipe phase are a
closed-form function of piece time and the recorded tap list: each tap
advances to the next sentence and restarts the 8 s phase. The deck order
is fixed, never shuffled; no Math.random anywhere. The rAF loop is a plain
function declaration behind a typeof guard.

## Adaptations
- Sentences ship verbatim (visible-text exception): they are the piece,
  rendered in a heavy grotesque stack, letter-spaced, fitted to the headline
  zone by shrinking until the line measures within 96% of the zone width.
- Wipe = a brand-red bar sweeping across the headline zone; revealed text
  is clipped to the swept region, never faded.
- No gradients, no shadowBlur, no filters, no offscreen canvas, no
  AudioContext, no getUserMedia. All shading is flat alpha.
- No hint text: the only visible words are the eight deck sentences plus
  the page title.

## Interaction
- Tap (pointer movement under 12 px): advance to the next sentence,
  restarting the wipe-in phase.
- No drag mechanic; the billboard is otherwise watch-only.

## QA
- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
  thumb; all three inspected. Desktop and mobile both read as a complete
  billboard with a void headline at frame one.
- Thumb rendered three times plus a final re-verification: all
  byte-identical.
- Forced-time probe on a discarded temp copy confirmed the hold phase:
  at t = 4 the headline reads "Love Overrules" centered in the zone.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, shadowBlur, gradients, or offscreen canvas.

## Fix rounds
None required. First renders at all three sizes read correctly.
