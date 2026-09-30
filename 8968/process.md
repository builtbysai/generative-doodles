# №8968 · Stage Voicing (2026-07-31, re-voiced 2026-09-30)

Seed 58 from the private sketchbook ("Stage Color Voicing").

## Concept family

**"stage-color voicing: one flat curated stage color doing the
compositional work, a handful of dark flat shapes reading as a figure with
no outlines; a study of how few primitives suffice when the ground is right."**

This family is unlike anything in the gallery. No piece is built on a single
flat field color carrying the whole composition. Nearest neighbors checked:

- **№9017 Strata Break** — ring-based construction on a dark ground,
  monochrome with a single red accent ring. Mine inverts the relationship:
  the flat field color *is* the medium, and the dark marks are the minority.
- **№8988 Orbit Portraits** — dense orbit accumulation rendered on black.
  Mine is the opposite discipline: a few flat shapes, no density, no glow,
  no dark ground at all.

No outlines, no gradients, no texture anywhere. The stage color does the
work of making 2 to 7 dark shapes read as a figure.

## 2026-09-30 redemption: the gel instrument

Sam's verdict on the first version: it lacked soul. The old build showed a
small dark tree centered on a static dusty-blue field (one fixed stage color
per scene, clean-cut on click). The composition was 95% empty field with a
tiny figure: it read as unfinished, not minimal.

Reimagined, keeping the family discipline:

- **Scene 0 is now a hero voicing**: tree, hill, sun, six dark flat shapes
  authored in a 200x140 box, filling 80% of the viewport width and anchored
  on the hill at the bottom of the frame. It holds the frame; it cannot
  read as a thumbnail accident anymore.
- **The gel is the instrument**: 8 curated stage gels (amber, steel blue,
  rose, moss, violet, teal, rust, midnight) on an endless 80-second clock,
  7 seconds of hold and a 3-second smooth RGB crossfade between each. The
  SAME dark shapes read differently under each light: that is the drama.
- **Drag scrubs the light by hand**: a still tap advances the scene, a drag
  moves through the gel cycle manually. Touch and mouse both work.
- Scenes 1-16 keep the 16 hand-voiced motifs in a fixed order, rendered
  larger than before (figure box is min(w,h)/120, was /165), each voiced
  deterministically from seed 58 (mirror flip, jitter, scale). Eyes and cap
  spots are still cut in the current gel color, so they breathe with the
  crossfade.
- The caption names the current gel ("gel 7 of 8 · rust", fading state
  shown) and adapts its ink to the gel's luminance (warm ink on light gels,
  paper on midnight). No em dashes in visible copy.

## Verification (2026-09-30)

- Full rewrite of index.html; motifs preserved verbatim (one pre-existing
  umbrella typo caught and confirmed absent).
- Bug found by the sweep: motif scenes had no `box` property (only HERO
  does), so `drawFigure` threw `TypeError: Cannot read properties of
  undefined (reading '0')` on every motif scene. Fixed with a [100,100]
  default at both call sites (stage and ?grid=1).
- `cdp_exceptions.py` exit 0 on all 17 scenes at 1280x800, on mobile
  390x844, and on ?grid=1. Zero console/page errors everywhere.
- Visually inspected at 1280x800 across gels 0, 2, 6, 7 (amber, rose,
  rust, midnight): every gel genuinely re-voices the figure; the caption
  stays legible; midnight lets the figure sink into the dark on purpose.
  Owl scene checked at the new larger scale: reads instantly, gel-cut eyes
  work. Mobile 390x844: hero bottom-anchored, no scroll or overflow,
  caption fits.
- `thumb.png` refreshed at 1280x720, captured from the live hero scene on
  the rust gel (the most striking of the eight).

## Files

- `index.html` — the piece, single self-contained page, no dependencies.
- `thumb.png` — 1280x720 gallery thumbnail (rust gel hero).
- `process.md` — this file.
