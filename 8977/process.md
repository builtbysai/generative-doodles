# №8977 · Living Homage — process notes

## Concept
Seed 37: Josef Albers' nested squares, but temporal. Four concentric
squares on a matte paper ground, honoring Albers' gravity: the nesting
center sits below the midline, as in the Homage to the Square paintings.
All four squares sample one shared palette journey, a closed 6-minute
loop through five anchors in OKLCH, at quarter-loop phase offsets, so
the color relativity of each square against its ground never stops
shifting. Sizes breathe on mutually-prime periods (233/179/137/101 s)
with amplitudes that can never break the nesting. Click mints a fresh
journey and crossfades into it over 4.5 seconds: one composition, no
cuts. A 1.6-second paint-develop fade opens the piece. The caption names
the current journey family, so the slow crossfade still gives the click
legible feedback.

## Palette minting (the restraint is the design)
Six families, one picked per journey from the seed: Ember earth, Straw
field, Slate sea, Moss garden, Madder dusk (each a single hue
neighborhood, spread 30-38 degrees, chroma capped at 0.115), plus Bone
and umber (near-neutrals with one warm terracotta accent anchor).
Anchors get a lightness walk clamped to 0.30-0.80 with a repair pass
forcing 0.07 minimum lightness separation between consecutive anchors,
so the nesting always reads. A gamut-fit loop walks chroma down until
the sRGB conversion is in range. No journey can ever leave its hue
neighborhood, so the piece can never churn into rainbow.

## Differentiation from №8995 Hour Hands (deliberate)
8995 is concentric time RINGS that sample anchor-pair journeys per ring,
repainted every minute, with clock hands and numerals on top. 8977 is
concentric SQUARES, not rings: one shared journey sampled at phase
offsets (the relativity between adjacent squares is the subject, not
legible time), a 6-minute continuous loop rather than minute rollovers,
no hands, no numerals, no readout, and the geometry itself breathes.
The two pieces share only the anchor-journey palette DNA and the click
interaction; visually and conceptually they are different rooms.

## What broke during tuning
1. *Bone-and-umber default read as mud* — seeds 897701/897703 minted the
   near-neutral family and rendered flat gray-beige. Kept the family
   (it is beautiful mid-journey) but it lost the default-seed contest.
2. *A transient layout race on one live capture* — one screenshot showed
   the composition shifted inside the stage: `resize()` had run before
   layout settled and no later resize event fired. Fixed structurally:
   the frame loop re-checks the canvas backing store against the stage
   rect once per second and re-fits, plus a `resize()` on window load.
3. *Stage too small at 1280x800* — first pass at 64vh left the painting
   lost on the page. Tightened the vertical rhythm (padding, header
   margins) and grew the stage to 68vh/700px max; everything still fits
   at 800px height with no scroll.

## Palettes tried, and why the final won
Six seeds rendered at t=30 (897701-897706): two bone-and-umber (drab at
that moment), ember earth (rich, classic Albers), slate sea (dusty
teals), straw field (warm ambers, lovely but narrow range over time).
The finalists, slate sea (897704) and straw field (897706), were then
rendered at t=120 and t=240. Straw field stayed in a khaki band all
journey; slate sea moved from dusty teal to deep petrol with a sage
band to petrol with a dusty-blue center. That range is the whole point
of the piece, so **seed 897704, "Slate sea," won the default**. The
thumbnail is its t=30 moment: all four squares distinct, calm, and
representative.

## QA
- Breathing verified: inner-square half-width visibly changes between
  t=45 and t=90 captures; nesting never violated (amplitudes sized so
  the smallest edge gap stays positive).
- Click tested over CDP: family name updates (Slate sea to Ember earth),
  mid-blend capture shows a smooth intermediate state, no console
  entries across the whole interaction.
- `cdp_exceptions.py` on the live page (rAF loop running): exit 0.
- 390x844 mobile: no overflow, composition reads well, zero console entries.
- Thumb captured at exactly 1280x800 from the final build.
