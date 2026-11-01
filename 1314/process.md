# №1314 "Forty-Two" — process notes

Leslie Hewitt, LH3 (PP481). Grounded in Hewitt's *Forty-two* (2019,
Perrotin Reading Room bookshop): an HTML-programmed video in which a
computer randomly selects words from a dataset built by reading and
free-associating images of the National Memorial African Bookstore.
Here the dataset is visible and the metadata is the image.

## What it is

A dark monitor-like field (#0D0F0C). Three zones:

- Top-right: an amber timestamp and, beneath it, a blinking white
  cursor that occasionally types a fragment and deletes it — the
  quotidian gesture, left visible as in the source work.
- Center: the poetry field. Words from a closed vocabulary (names,
  places, book titles, street nouns only — MAMA'S, BOOKSTORE, HARLEM,
  SHELF, DUST, EBONY, and same-class companions) assemble into
  staggered concrete-poetry arrangements, hold, then dissolve back
  into the dataset stream.
- Bottom third: the dataset stream itself, three lanes of small type
  flowing leftward at different speeds. Every seventh word renders in
  phosphor green-white; the rest in word gray.

No paragraphs, no sentences, no slogans. The words are DATA, not
message. No chat or terminal chrome: no prompt characters, no window
dressing, just the field, the stream, and the corner metadata.

## Motion

A 16-second cycle, phase-shifted so frame one opens in the hold phase
with the assembly fully visible (the established hold-phase precedent
for drawing-outward pieces — a fixed phase, gate-valid):

- 0–3 s: words assemble, staggered, each drifting up from +14 px.
- 3–8 s: hold, full strength.
- 8–11 s: dissolve, reverse stagger.
- 11–16 s: empty poetry field; only the stream, timestamp, and
  cursor remain. Then the next assembly.

The cursor runs on its own 42-second cycle: idle blink, then it types
a seeded vocabulary word character by character, holds, deletes it,
and goes back to blinking. The blink is a closed-form function of
piece time.

Double-tap reseeds the vocabulary pool: the pool order and every later
assembly change immediately. A single tap never reloads, and there is
no viewer typing.

## Determinism

- Frame one is drawn at exactly t = 0 via a boot flag. The clock
  starts with the rAF loop; nothing in frame one derives from elapsed
  time.
- Word selection, assembly layouts, stream lanes, and cursor
  fragments all come from seeded mulberry32 sequences, never
  Math.random. A double-tap advances the seed counter, so reseeds are
  reproducible too.
- The timestamp reads real local time quantized to whole minutes (the
  established clock-piece precedent), so renders inside the same
  minute byte-match. Across a minute boundary the timestamp digits
  legitimately change; the rest of the frame is fixed.
- Stream positions, assembly fades, and cursor blink are closed-form
  functions of piece time and the recorded tap list, never
  frame-integrated state.

## House-rule compliance

- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension <
  700 px) with aspect fallback. Field-like composition: full-bleed on
  every screen; page ground is the monitor black.
- Synchronous developed frame at load; rAF loop is a plain function
  declaration behind a typeof guard.
- No offscreen canvas, no gradients, no shadowBlur, no ctx.filter,
  no AudioContext, no getUserMedia, no document.createElement.
  Text is drawn with canvas fillText only.
- Visible text is the piece itself (words, timestamp, cursor
  fragment), per the prompt's explicit spec. No hint text, no UI.

## QA

- Rendered with node-canvas at 1280×900 desktop, 390×844 mobile,
  720×720 thumb; all three inspected.
- Thumb rendered three times, `cmp` byte-identical.
- Fake-rAF-clock probe (temp script, discarded): t = 0 shows the held
  assembly; t = 10 shows the gap phase (stream, timestamp, cursor
  only, non-background pixels down to ~20k from ~64k); t = 14 shows
  the next assembly mid-assemble; a double-tap at t = 5 changes
  81,480 pixels versus the untapped frame, confirming the reseed.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, and filters (one comment
  mentions Math.random only to state it is not used).

## Fix rounds

None required. First renders at all three sizes read correctly and
the probe confirmed all mechanics on the first build.
