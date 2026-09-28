# No. 8973 · Typewriter Weave — process

**Caption:** A study sheet where the typewriter stands in for the loom, struck one character at a time until the page starts to feel like cloth.

**Date:** 2026-08-05 (day 8973). **File:** `8973/index.html` (self-contained, vanilla canvas, no dependencies). **Default seed:** 135.

## Concept

Anni Albers made studies on a typewriter before she wove: up to three
characters repeated across lines until the page produced a tactile-textile
illusion. This piece rebuilds that mechanic as a living study. A faint warp
of single vertical threads (one committed character, `i` or `:` or `l` or
`1` or `t` or `!`, per seed) holds the full height of the sheet, and the
weft goes over it in horizontal bands of repeated character clusters —
`#####`, `ooooo`, `.....`, `/////`, `@@@@@`, `~~~~~`, and neighbors —
each band committed to one cluster, never repeating the density class or
the cluster of the band before it. Narrow warp-only breathers separate
most bands the way a beater leaves its rhythm in the cloth, and `#`
selvedges finish both edges.

The hand is the whole point, so every strike carries pressure jitter:
per-character x/y offset, slight rotation, alpha from a soft keystroke to
a hard one, a dry ribbon that fades along the carriage, the occasional
double strike, the occasional key that misses entirely. Rows ride a slow
sine wave and each band's edges undulate instead of ruling straight, so
no band ever looks printed. One accent per band at most: a heavier slub
row, struck larger and darker, like a thick thread pulled through.

## Success criteria

At arm's length the sheet reads as woven strips of cloth: alternating
densities, wavy band boundaries, the faint vertical thread showing
through the open bands and buried under the dark ones. Up close it reads
as typing: individual struck characters, uneven ink, the hand visible in
every line. Ink on paper only, one committed character set per band, no
color, no message in the marks.

## Differentiation from adjacent used families

No. 8993, What Isn't There, is a poster: one slab of ink where typography
lives in carved-out erasure bands, punched holes, and a headline that
reads READ THE GAPS. Erasure is its method and the message is the point.
Typewriter Weave is the opposite gesture. Nothing is carved or removed;
every mark is struck onto the page, additive. It is textile, not poster,
and texture, not message: the characters carry no words, only the rhythm
of warp and weft. Where 8993 withholds ink to speak, 8973 spends ink to
feel.

## Seeds tried

135, 777, 424242, plus a click-driven 474587457. 777 was strong (a heavy
`WWWWW` anchor band low on the sheet) but its middle ran too even. The
re-woven 474587457 had lovely twill diagonals. 135 won: the clearest
band rhythm (open warp field, `ZZZZZ`, `***`, a dark `MMMMM` anchor with
wavy beaten edges, a diagonal `/////` twill band, dotted close), the
best light-to-dark arc down the sheet, and the most convincing cloth
read at thumbnail scale.

## Technique

Seeded PRNG (mulberry32); `?seed=` in the URL, click or tap re-weaves
with a fresh random seed and updates the URL via history.replaceState.
Warp drawn first at low alpha so open clusters let it show and dense
clusters bury it. Weft bands get per-band ink base, beat (row spacing),
slub row, line-start wander, edge undulation, and ribbon fade. Paper is
warm `#ece4d0` with radial mottling and 2600 speckle grains. One typed
caption along the bottom of the sheet: number, title, and the re-weave
hint.

## QA notes

- Viewports: 1280x800 desktop and 390x844 mobile, both rendered headless
  (isolated Chrome on port 9341, xvfb). No scroll or overflow at either;
  the canvas fills the viewport and the caption sits clear of the textile.
- Console: `cdp_exceptions.py` clean at both viewports, zero exceptions
  and zero console errors on load and on redraw.
- Click path verified over CDP: dispatched click changed the URL to
  `?seed=474587457` and rendered a fully new weave with no errors.
- Renders actually inspected: full-sheet 1280x800 for the cloth read,
  2x crop zooms for the typing read (individual strikes, pressure
  variation, double strikes, and dry-ribbon fades all visible).
- Final thumbnail: `8973/thumb.png`, 1280x800, from the default seed.
