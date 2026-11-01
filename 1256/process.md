# №1256 "Acausal Portal Field" — Esther Hz, block EH1 (PP415)

After Esther Hz's *Acausal* (2021, Understudy Denver): an installation of
ordinary objects, each one linked to a true synchronicity/coincidence story
submitted by the public — "things often fall apart, but sometimes they fall
together in the probability field." The field here holds ten exhibit objects
in flat ink on a dark gallery ground. Each pulses with a thin gold ring.
Linger on one and it opens as a portal: the object redrawn large, drifting,
while its story arrives one phrase at a time. Tap the empty field and a new
object joins the field with a story of its own. The registry only grows.

## House adaptations

- **No typed input.** A canvas piece takes no typed story, so the
  tap-contribution "writes" its story from a seeded tiny-coincidence
  generator (specific nouns, places and times recombined through three dry
  templates). The visitor contributes the act; the field contributes the
  words. The generator's first three outputs, run from the shipped code:
  - shell — "a stranger handed me the shell" / "in my sister's attic." /
    "said i had dropped it." / "i had never been there."
  - thimble — "a stranger handed me the thimble" / "in ohio." /
    "said i had dropped it." / "i had never been there."
  - stamp — "the stamp showed up in the wrong apartment" / "twenty years
    after i lost it." / "same scratch on the back."
- **Kinship, kept distinct.** №1239 (Battle/De La Garza's *Nothing To See
  Here*) is a projected program in a dark room; №1255 (Maurice's
  *Irretrievable Replies*) blooms images off a scrolling line of text. This
  piece is neither: it is a spatial registry — objects persist at positions
  on a field, open only by dwelling on them, and the field is append-only
  (contributions stay, drags stay).
- Silent, per house rule. No gradients, filters, blur, offscreen canvas or
  pixel buffers: glyphs are flat ink shapes, every arc on its own path.

## The story bank (all ten, as shipped)

- **eclipse portrait** — "the eclipse photo came out blank." / "except one
  frame." / "my grandfather is in it, waving." / "he died in 1974."
- **fork** — "found my grandmother's fork" / "in a field in ohio." / "she
  never left denver."
- **coin** — "the coin landed on its edge." / "twice." / "we stopped
  flipping."
- **key** — "the key fit the new apartment." / "it was cut for the old
  one." / "different city."
- **leaf** — "a leaf landed on the exact page." / "the word was 'stay'." /
  "i stayed."
- **record** — "the record skipped at the same line" / "in two different
  houses" / "eleven years apart."
- **bus ticket** — "found the bus ticket in a library book." / "route 9,
  june 1998." / "the route ended in 1997."
- **marble** — "the marble rolled under the stove." / "we moved twice." /
  "it rolled out of the new stove." / "same chip on the green stripe."
- **postcard** — "the postcard arrived forty years late." / "postmarked the
  day i was born." / "it said: 'wish you were here.'" / "signed with my own
  initials."
- **button** — "the button popped off at the wedding." / "found it sewn
  back on the next morning." / "nobody admitted to sewing." / "the thread
  was red. ours was black."

## Mechanics

- **Field.** Ten objects at seeded positions (none at exact center) over a
  faint floor-sheen band. Each ring pulses on a 5.2 s sine with its own
  hash phase; at frame one the rings sit at varied phases.
- **Linger.** Resting the pointer inside an object's ring for 2 s fills a
  gold progress arc around it; at 2 s the portal opens — a ring expands
  from the object (0.8 s) as the field darkens. In the portal the glyph is
  redrawn at ~0.34 of frame, drifting and tilting on slow sines, and its
  phrases fade in one at a time, 2.2 s apart. Three seconds after the last
  phrase the portal closes itself; a tap closes it sooner.
- **Drag.** Press an object and move: it follows and stays where it is put
  (positions are recorded state). Movement past the threshold cancels the
  dwell, so a drag never opens a portal by accident.
- **Contribute.** A tap on empty field adds a new pulsing object at the tap
  point — shell, thimble, stamp, feather, cycling — with a generated story.
  The field caps at 16 objects; everything contributed stays.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  T0 = 12 s (field at rest, no portal); the rAF loop (typeof-guarded) is
  anchored at T0 + elapsed. All variation comes from integer hashes; there
  is no Math.random anywhere. Canvas sizes from the Visual Viewport API
  with resize listeners on visualViewport and window; CSS size pinned in
  draw(); phone detection via window.screen (min dimension < 700) with an
  aspect fallback.

## QA

- qa-desktop.png (1280×800), qa-mobile.png (390×844), thumb.png (720×720)
  rendered with the house node-canvas renderer. Frame one: the dark field
  with all ten ink objects and their gold pulse rings.
- Forced-open portal QA (temp copy with object 0's portal held open,
  rendered, then discarded): the eclipse portrait large inside its ring,
  story fully told — "the eclipse photo came out blank." / "except one
  frame." / "my grandfather is in it, waving." / "he died in 1974."
- Thumb byte-compare: thumb.png rendered twice at 720×720, `cmp`
  byte-identical; the duplicate was deleted.
- Token scan clean: no unseeded randomness, gradients, canvas filters,
  shadow blur, element creation, pixel buffers/offscreen canvas, or
  audio/mic APIs.
