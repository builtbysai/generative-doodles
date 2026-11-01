# №1342 "Finite / Infinite" (hank-willis-thomas HT7, PP517)

## What it is
A monumental black wall carrying two sentences on one shared grid. At
frame one only the first sentence is legible: "WE MUST ACCEPT FINITE
DISAPPOINTMENT". As the wall cycles, its letters dissolve into mid-gray
and the second sentence, which was always interleaved in the first,
takes over: "BUT NEVER LOSE INFINITE HOPE". A thin bronze line rules
beneath the block, underlining whichever sentence is currently legible.
The type IS the image; there is no other picture.

## Layout (the interleave)
Both sentences share one grid, built as two lines of alternating words.
Line one alternates WE / BUT / MUST / NEVER / ACCEPT / LOSE / FINITE /
INFINITE; line two alternates DISAPPOINTMENT / HOPE. At t = 0 only the
sentence-one words are drawn at full alpha, so the wall reads the first
sentence with honest gaps where the second sentence lives. At t = 1 the
situation reverses and the second sentence reads left to right. At the
midpoint both sentences sit half-legible in mid-gray, stuttering
honestly, and never fully legible at once. This is true interleaving,
not a crossfade: the two texts occupy the same lines, and the combined
sequence is measured and fitted to the field so nothing ever clips.

## Motion and interaction
- Auto-cycle: 20 s triangle, smoothstep-eased — disappointment rises to
  hope over 0-10 s, falls back over 10-20 s, then repeats.
- Per-letter stagger: each letter's fade carries a seeded offset (0 to
  0.25 of the parameter range), so the dissolve stutters letter by
  letter rather than washing uniformly. Dissolving letters shift toward
  mid-gray #8A8578 as they fade.
- Drag horizontally scrubs the interleave parameter (1.5 full sweeps per
  screen width); the drag is the viewing angle. On release the
  auto-cycle resumes from the scrubbed state, keeping its direction.
- No fade-to-black transitions: the wall stays lit and text stays
  present in some state at all times. Never click-to-reload; no audio.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop (plain function declaration behind
a typeof guard). Cycle phase, stagger offsets, wall speckle, and
drag-scrub state are closed-form functions of piece time and recorded
drag events, from seeded mulberry32 streams only. No Math.random.

## House-rule compliance
Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height; phone detection
via window.screen physical size (min dimension < 700 px) with aspect
fallback; full-bleed wall on phones with the page ground set to the
wall color. No gradients, no shadowBlur, no filters, no offscreen
canvas, no AudioContext, no createElement, no getUserMedia. Visible
text is only the two specced sentences plus the title element.

## Fix rounds
1. First layout centered each sentence-two word inside the gap after
   its sentence-one word. On a line spanning 86% of the field the
   trailing gap was nearly zero, so the forced-time probe at t = 10
   showed "INFINITE" clipped to "INFINI" at the right edge, and the
   midpoint probe showed sentence-two words overlapping sentence-one
   words. Rebuilt the layout as alternating combined sequences,
   measured and fitted as a whole: the t = 10 probe now reads "BUT
   NEVER LOSE INFINITE / HOPE" with nothing clipped, and the midpoint
   probe shows both sentences half-legible and interleaved without
   overlap.

## Verification
Rendered at 1280x900 desktop, 390x844 mobile, and 720x720 thumb;
inspected all three. Thumb rendered three times plus a final
re-verification after this file was written, all byte-identical.
Forced-time probes on discarded temp copies confirmed the hope state
(t = 10) and the midpoint stutter (t = 5).
