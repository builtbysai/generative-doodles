# №1211 — Hex Subtraction

Amy Szczepanski study block AS4 (PP370). Grounded in her live hex-editor
method: remove bytes from an image file, save, and let the codec paint the
wound. Subtraction, never addition — bytes in this piece are only ever
erased, never written, and the damage is cumulative and permanent.

## Layout

- Top 70%: a quiet blue scene drawn flat in code — a standing figure
  silhouette (#0D0D10) against a blue field (#1B4FD8 stepped in flat bands
  down to #0A1E5E at the horizon), a pale sun disc, low hills, a small
  house with one lit window.
- Bottom 30%: the hex panel (#0A0C10) — 24 rows × 16 bytes with an address
  column, live bytes in #9AA0A6. On wide screens the 24 rows sit in two
  side-by-side blocks of 12 so the type stays legible; on narrow screens
  they stack in a single block of 24. All 384 bytes are always shown.

## How the subtraction works

A seeded schedule (mulberry32, seed 1) fires deletion events: the first at
t = 8 s, then hashed gaps of 6–12 s until t ≈ 200 — 21 deletions in all,
the last at t = 196.4 s. Each event deletes one contiguous run of 4–10
bytes in one row. In the panel the run greys out (#3A3A40) and takes a 2 px
red strike-through (#FF2B2B). Within a second (a 0.35 s attack ramp) the
image above shears.

The causal link is one formula, stated so it can be checked:

    band = floor(byteIndex / (384 / 40)) = floor(byteIndex / 9.6)

Each deletion adds a permanent wound record to its band: a hashed offset
of ±14–52 px, a magenta bloom strength (#FF2B8D), sometimes a channel
split. A band's rendered offset is the sum of its wounds, so later
deletions push already-wounded bands further. Wounds also darken their
band (×0.94 brightness per wound, floored at ×0.55). Bands displaced more
than 5 px get channel-split fringe passes — the scene's silhouettes drawn
in magenta and cyan (#00E5FF) a few px either side of the main slice.

Frame-one proof (fixed phase T0 = 26 s, three deletions in):

- Event 0, t = 8.0: row 15, cols 6–9 → byteIndex 246 → band
  floor(246 / 9.6) = 25, offset +51.3 px, bloom 0.28. In the frame, band 25
  crosses the figure's knees: the leg slice sits 51 px right with a
  magenta/cyan fringe block beside it.
- Event 1, t = 16.6: row 23, cols 4–10 → band 38, offset −19.3, split —
  the ground line near the bottom of the image.
- Event 2, t = 23.0: row 9, cols 2–10 → band 15, offset −21.3, bloom 0.28 —
  the figure's neck slice, sheared left with the magenta bloom at its core.

All three struck runs are visible in the panel at frame one (rows 0090,
00F0, 0170), and the fourth deletion does not fire until t = 30.7 s.

## Interaction

- Drag across the hex panel: selects the run the NEXT scheduled deletion
  will take (row from the drag's row, start column and length from its
  horizontal extent; a plain tap selects a standard 6-byte run). The
  selection shows amber until it is consumed. The viewer aims the scalpel.
- Drag across the image: on release, every band under the drag path takes
  a direct wound (offset from the drag's horizontal travel). No hex event,
  no strike — the hand wounds the picture directly. Also permanent.

The viewer chooses where the wound lands, never whether. There is no
undo, no reset, no progress bar. After the schedule ends, render time
clamps at 210 s and the fully wounded end state holds.

## Distinctions from №1201 ("The Deconstructive Linguist")

The two hex pieces are deliberately different instruments. №1201 is a
50/50 side-by-side split where bytes are EDITED — values change and glow
amber — and the image twitches and recovers inside a seamless loop.
№1211 is a 70/30 stack (image over panel) where bytes are DELETED —
greyed out and struck through in red — and nothing ever recovers. Edit
versus subtraction; loop versus one-way accumulation.

## House adaptations

- The prompt's row-slice buffer is realised as slice redraws: the scene
  is a draw function repainted per band under a clip with a per-band
  x-offset — no offscreen canvas, no ImageData (the house renderer has
  neither). The scene is drawn ~3× wide so sheared slices never tear a
  black wedge at the frame edge.
- The blue field's deepening is 14 flat stepped bands, not a gradient.
- Wound state is a pure function of piece time plus the recorded event
  lists (fired deletions, visitor smears); offsets are never
  frame-integrated. First frame is drawn synchronously at the fixed
  phase T0 = 26 s; the rAF loop (typeof-guarded) is anchored as
  phase + elapsed.
- Sizing comes from the Visual Viewport API with resize listeners on
  visualViewport and window; the canvas CSS size is pinned in draw().
  Phone detection via window.screen physical size (min dimension
  < 700 px) with an aspect fallback.
- Silent: no audio, no microphone, nothing external. Seeded hashes only.

## QA

Rendered with the house renderer at 1280×800, 390×844 and 720×720.
Frame one (t = 26 s) shows the quiet scene with three sheared bands and
the hex panel with three greyed, struck runs; the figure stays clearly
readable. An off-phase render at t = 150 s (temporary copy, discarded)
showed 17 strikes in the panel and the accumulated endgame: sun sliced
and displaced, the figure's head and legs fragmented into offset blocks,
the house torn into slabs — heavily wounded, nothing healed. The
720×720 thumb was rendered twice and byte-compared: identical.
