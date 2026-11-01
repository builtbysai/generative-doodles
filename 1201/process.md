# №1201 — The Deconstructive Linguist

Evan Meaney study block EV2. "Glitching might be seen as the deconstructive
linguistics of computer languages"; "every file is telling a dual story."
The split screen is the thesis staged literally: left, the bytes; right, the
image the bytes become — and the two halves are causally locked.

## The causal lock

- The left pane is a hex dump of a virtual 96-row × 16-byte file (28 rows on
  screen, stepped scroll of one row every 6 s, address column at the left).
  Byte values are pure functions of (loop, row, col, loop time), seeded by
  integer hash — there is no stored file.
- Edit events fire every 6–12 s inside each 100 s loop. Event k starts at a
  hashed time s_k, targets one contiguous run of 3–8 bytes on one file row
  r_k (always a row on screen at fire time), and for 1.2 s the run flashes
  amber while its values cycle through hashed intermediates, then settles to
  new values. One byte of the run stays red for 3 s after settling.
- **Row → band mapping: image band = file row mod 28.** The image is drawn in
  28 horizontal slice bands. Exactly 0.6 s after an edit starts, its band
  shears: offset ramps in over 0.25 s to a hashed peak (±12–36 px), holds
  2.5 s, then leaves a 15 % residual. If the run was 6+ bytes, the band also
  blooms magenta for 2 s. A sheared band gets a cyan fringe on its top edge
  and a magenta fringe on its bottom edge. One edit, one band — cause and
  effect stay legible.
- **Loop closure:** every residual is a pure function of loop time that
  decays to exactly 0 at t = 100 s, and byte values are functions of the
  current loop's events only, so the loop repeats clean. Events are hashed
  per loop index, so each pass edits different bytes.

## Frame one (fixed phase, loop 0, t = 14 s)

Seed search fixed the schedule so an edit is mid-flight at the first frame:
event k = 1 starts at s = 13.08 s on file row 9 — the QA frame shows its
amber run at address 0090, columns 6–10 (`55 27 B6 22 1A` still cycling).
Row 9 mod 28 = band 9; its effect began at 13.68 s and reaches the full
−35.6 px peak at 13.93 s, so the right pane shows band 9 sheared left with
cyan/magenta fringes, cutting through the cloud layer. Same event, both
halves. (Event k = 0, band 7, has already decayed to a ~2 px residual trace.)

## Interaction

- Drag on the hex side: selects the byte row under the finger (amber
  outline); the next edit event targets that row. The viewer chooses where
  the corruption lands, never whether it lands.
- Drag on the image side: smears bands near the finger directly — offsets
  from the recorded drag samples, decaying over ~2 s.
- No typing, no input fields, no cursor.

## House adaptations

- The "row-slice buffer" is not a pixel buffer: the scene (figure against a
  blue home-movie sky, house, moon, hills) is redrawn per band under a clip
  rect with the band's offset applied — slice displacement is native, no
  offscreen canvas, no ImageData.
- Silent by design; the split is 50/50 (stacked on portrait phones).
- Deterministic first frame at T0 = 14 s drawn synchronously; the rAF loop
  is anchored at T0 + elapsed. Seeded hashes only — no Math.random, no
  gradients, no shadowBlur, no ctx.filter.
