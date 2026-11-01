# №1339 "White on White" — hank-willis-thomas HT4 (PP514)

## What it is
A large white panel carrying the ghost of a document: ruled lines, a heading
block, paragraphs of unreadable pseudo-type, all in whites barely
distinguishable from the ground. Tap and hold fires the flash: a 1960s crowd
scene in inverted tones ignites beneath the document from the center outward,
like a developing print — dark featureless figures on light ground, one red
sign/flag as the single accent — then decays back to white over 3 s on release.
The document layer and the photo layer are the same size and registered; the
flash aligns them, never slides them. The two layers read as one object
(paper + light), never as two images stacked.

## Frame one
White panel (#FAFAF7) with the ghost document fully inked: heading block
(white rect with two glyph rows), ruled lines across the sheet, paragraph rows
of pseudo-type dashes in ghost white (#F1EFE9). A small pulsing flash-bolt
icon sits bottom-right. No flash reveal at frame one; no color in the dark
state beyond the whites.

## Mechanics
- TAP AND HOLD = flash. Hold sustains the reveal; release decays over 3 s.
  The mask grows 0 to full panel diagonal over 1.2 s with smoothstep easing,
  clipped to concentric flat-alpha discs (no gradient). Ember edge glow is
  two layered flat-alpha rings at the mask boundary; a faint flash-white core
  disc appears while fully revealed.
- DRAG disabled: a press that travels more than 12 px cancels its flash, so
  dragging never reveals.
- Ambient: the ghost document slowly re-inks itself on a 48 s loop (full
  0-32 s, fade to 35% ink 32-40 s, redraw 40-48 s), so the blank state is never
  truly static. Frame one sits at loop phase 0, fully inked.
- No audio of any kind. Never click-to-reload.

## Determinism
Frame one draws synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop (plain function declaration behind a typeof
guard). All layout — glyph rows, ruled lines, crowd figures — comes from
seeded mulberry32 streams (seeds 1339000/1339001), never Math.random. Reveal,
decay, and re-inking are closed-form functions of piece time and recorded
tap-hold events.

## Adaptations
- Reveal via center-out radial mask of concentric flat-alpha discs: no
  gradient, no bloom. Ember glow is layered flat-alpha rings.
- Document text is pseudo-type glyph noise (short dashes), never readable
  real words. Revealed crowd is procedurally drawn, painterly-flat, never a
  real historical photograph.
- Crowd figures: trapezoid torsos with varied shoulder widths, featureless
  dark head discs set slightly above the torso so a neck gap reads, some with
  a thick diagonal raised arm. One red sign/flag held high near the upper
  right of the crowd.

## Fix rounds
1. First reveal probe read as rows of identical hooded figures with
   antenna-like stick arms: heads merged into torsos and arms were thin
   vertical sticks. Fixed with separate head discs above a neck gap, varied
   torso widths, larger position jitter, and thick diagonal raised arms.
2. Token scan clean except a comment stating Math.random is not used.

## QA
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
inspected. Thumb rendered three times plus final re-verification after
process.md — all cmp byte-identical. A forced-reveal probe (temp copy,
discarded) confirmed the crowd layer: dark featureless figures on the light
ground with one red accent, registered to the document rect.
