# №8995 · Hour Hands — process notes

## Concept
A live clock built from three concentric time rings, center out: seconds
(60 segments), minutes (60), hours (12). Each ring is a seeded
anchor-journey palette: two anchor colors per ring, each segment sampling
the eased path between them at its angular position (A to B and back
around the circle, so the seam at 12 is invisible). Fresh anchor pairs are
minted every minute, seeded by the minute epoch, and eased in over about
2.5 seconds so the repaint never jumps. The clock stays legible on top of
all that color: bone-white hands, a glowing marker on the present segment
of each ring, 12/3/6/9 numerals, and a small digital readout at the hub.

## Palette minting (the restraint is the design)
Three families, picked per ring per minute from the minute seed:
1. **Analogous** — base hue plus a 18-40° shift, muted saturation (20-38),
   ink-range lightness. One hue family per ring.
2. **Earth pairs** — six curated anchor pairs (sienna/ochre, slate/sea,
   moss/straw, madder/ember, indigo/steel, pine/sage), hand-tuned HSL.
3. **Ink monochrome with one accent** — dark neutral anchor, one vivid
   accent anchor, so the color appears as a single event opposite 12.

No family ever spans more than ~40° of hue, so the minute rollover can
never churn into rainbow.

## Legibility design
- Hands are drawn after the rings in near-white with round caps; lengths
  reach each ring's band (hour longest).
- The present segment on each ring gets a lighter overlay arc, so the eye
  finds "now" three times without reading the hands.
- Smooth sweep for all hands in live mode (ticking would fight the
  slow palette crossfade); reduced-motion renders once per second.

## What broke during tuning
1. *Invalid hex literal* — a `0xH0ur` placeholder salt in the ring table
   was a hard SyntaxError; caught by node --check before first render.
2. *First palette pass too loud* — the analogous family allowed saturation
   to 50 and lightness to ~62, and one seed rendered near-neon green.
   Capped to s 20-38, lightness anchored in ink range; the brightest seed
   is now a single vivid hue family rather than a shout.
3. *Glow overlays too chunky* — the present-segment marker at 0.34 band
   width and 0.9 alpha read as white blocks fighting the palette; reduced
   to 0.30 width, 0.82 alpha.

## Why the default seed won
`899501` mints an olive-to-moss journey that is calm across all three
rings, and its held time (09:28:15) spreads the three hands to three
different quadrants, so the thumbnail demonstrates every legibility
device at once: hands, glows, numerals, readout.

## QA
- Live mode verified against the real clock (13:41 UTC render showed
  13:41:15 with hands and glows on the matching segments).
- Seeds 899501, 7, 42 inspected: all read as clocks, all palettes
  harmonious, no console entries on any capture.
- Click toggle tested over CDP: live → still (?seed= set) → live, with
  caption text updating each way.
- 390×844 mobile: no overflow, everything fits, zero console entries.
- Note: CDP port 9333 is shared with a sibling agent's 8996 tab; one
  captured console exception belonged to that tab, not this page. This
  page's own captures are clean.
