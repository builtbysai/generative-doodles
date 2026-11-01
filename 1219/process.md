# №1219 — All My Life (After the Stitcher)

Clint Enns study block CE4, after *All My Life (After Baillie)* (2016): panorama
software "spit out an extremely large, glitched out panoramic image" that was
too large to script. Enns kept the failure and made it the film. This piece is
the stitcher, failing on schedule, forever.

## The panorama

The landscape exists only as data: nine trees (trunk + seeded canopy blobs),
a fence line (posts every 0.045 of width, two rails), a road band with a dashed
center line, a hill ridge, bushes, clouds, a sun — all placed in a virtual
panorama three times the viewport wide, in warm flat tones (grass #6A8F3C,
fence #5A4632, sky #A8C8E8, road #7A7A7A).

**Screen mapping (chosen):** the software's fit-to-width wins. The panorama is
scaled once to the frame's full width and the strip sits centered vertically;
the strip therefore stays fully visible for the whole session, and what grows
is not width but density — damage accumulates on a fixed canvas, pass over
pass, the way the kept failure-image just gets more torn.

## Stitching

Time runs in 60-second passes. Each pass, a stitch head sweeps left to right
across 24 vertical frame strips; the head races then crawls
(head position = u^0.35 of pass progress) as if aligning the last frames is
the hard part. A strip glows briefly when the head (re)stitches it. On the
first pass the panorama genuinely assembles strip by strip; on later passes
the head re-stitches *over* the existing, already-torn strip.

## Overflow and damage

Damage is a list of permanent records, never pixels-in-a-buffer; every frame
re-renders the records from scratch, so a tear can never heal.

Scheduled overflows (2–3 per pass, hashed times from pass 3 on):

- **Duplication** — a tree's region is drawn two extra times, stepping right,
  each copy preceded by a magenta #FF2BD9 silhouette at ±3px: the codec fringe.
  The tree appears three times; the fence posts and road dashes under it
  triple too.
- **Ghost seam** — the content right of a seam is drawn again at 35% alpha,
  offset 12px, with a cyan #00E5FF seam line: the fence doubles.
- **Smear** — a horizontal band (30%–72% of strip height) is redrawn under a
  ×2.6 horizontal stretch with an orange #E8620C wash: the band smears.

Pass 1 (first minute) is choreographed: duplication of the tree at pano
fraction ≈0.30 at t=14s, a ghost seam at 0.52 at t=31s, a smear at 0.64 at
t=47s. Pass 2 adds a ghost and a smear. Later passes hash their own.

**Visitor-fed overflow:** a hard right-to-left drag (velocity past −850 px/s)
makes the stitcher ingest extra frames; an overflow fires 0.9s later at the
current head position, its type cycling duplication → ghost → smear. The
viewer causes the failure, never fixes it. There is no reset.

## Frame one

The synchronous first frame is drawn at a fixed phase, T0 = 71s — second
pass, stitch head at ≈55% of the strip. The panorama is fully built; the
pass-1 duplication (tripled tree, magenta fringes, tripled fence posts) and
the ghost seam and smear are all in place; fresh strips glow left of the
head. The rAF loop, where available, is anchored as T0 + elapsed; all layout
and scheduling come from seeded hashes, so the frame is reproducible exactly.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both the
visual viewport and the window; CSS size pinned in draw(). Phone detection
via `window.screen` physical size (min dimension < 700px) with the aspect
fallback. No gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData or offscreen canvas, no audio, no microphone. Canopy circles are
drawn one arc per beginPath. Silent; no visible text beyond the title.
