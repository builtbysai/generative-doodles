# No.407 Edition Engine - process

## Concept

After Nina Clausonet's challenge-origination
mechanism (nina-clausonet study, EXPANSION #43
prompt NINA7): the piece is a living announcement
poster for her drawing challenges. She originates
these challenges, designs the announcement posters
herself, and the posters are the artwork of this
piece, so the poster content is designed text by
the piece's own definition (the batch's text
exception): edition titles, the prompt terms, the
four rules lines. No real names or handles appear
anywhere; the host roll is ten illustrated avatar
dots with motif glyphs.

The poster redesigns itself by season. Three
editions are FIXED AUTHORED POSTERS (the house
treatment, as with No.403's deal table): nothing is
seeded or generated at runtime, each edition swaps
in as a complete authored layout with its own
palette, never mixed with another edition's.

## Construction

One self-contained canvas, design space 1280x900,
centred fit; the page ground takes the current
edition's ground colour, letterbox included. All
marks are JS data drawn directly each frame; no
offscreen canvas, no gradients, no filters, no
shadowBlur. Flat colour only. Text is set in a
serif poster register (Georgia / DejaVu Serif).

The muse is one fixed recipe under every edition:
white hair mass with a scalloped fringe and side
falls, cream-pink skin #F2C9A8, closed eyes, ink
features. Each edition gives her one seasonal prop
in the header scene: a cluster of autumn leaves
(September), a gold star wand (December), a
painter's palette and brush (July, with a flat
cream sun disc behind her hair).

The three fixed authored editions:

| Edition | Ground | Ink | Accents | Title | Subline |
|---|---|---|---|---|---|
| September | paper #F5EFE0 | #2B2620 | rust #C0562F, mustard #E8A93D | SWEETEMBER DAYS | SEPTEMBER EDITION - ONE PROMPT A DAY |
| December | navy #1B2A5B | cream #F5EFE0 | red #E63329, gold #E8A93D | WONDERFUL WINTER WEEK | DECEMBER EDITION - ONE COZY WEEK OF TRIPLES |
| July | ochre #C98A2E | brown #4A2E1E | cream #F5EFE0 | MONTH OF MASTERS | JULY EDITION - STUDY THE MASTERS |

Prompt rows, authored per edition from her observed
lexicons, one icon glyph plus its term per row,
exactly five rows per edition:

September (cozy prompts):

| Glyph | Term |
|---|---|
| cat | cozy cat |
| wreath | autumn wreath |
| outfit | fall outfit |
| mushroom | mushrooms |
| pumpkin | pumpkin patch |

December (costume triples, garment + animal +
thing, her Wonderful Winter Week resolution):

| Glyph | Term |
|---|---|
| knit | knitted accessory + jaguar + festive headband |
| scarf | wool scarf + snow monkey + steaming mug |
| hedgehog | checkered coat + hedgehog + fairy lights |
| bear | cosy turtleneck + polar bear + candy cane |
| penguin | knitted shawl + penguin + gift parcel |

July (master homages):

| Glyph | Term |
|---|---|
| lily | Monet - water lilies |
| klimt | Klimt - golden ornament |
| portrait | Vigee Le Brun - the portrait |
| starry | Van Gogh - starry sky |
| palette | a master of your choice |

Rules block, the same four fixed lines in every
edition, in her rules register: "Draw each prompt
in your own style", "Hand drawn only, no AI art",
"One drawing a day, late is fine", "Share it with
the challenge tag".

Host roll: exactly ten avatar dots (leaf, star,
mug, moon, flower, mushroom, cat, snowflake, sun,
heart), ink-filled with the motif glyph cut in the
edition ground colour. On the 15s ambient loop
each dot in turn takes a 1.5s pulse slot: it scales
up on a sine and gains an accent ring. Asserted
counts, checked at load: exactly 3 editions, 5
rows per edition, 4 rules lines, 10 host dots, 26
header snow dots, 900 grain dots.

Interaction, per Hans's RETHINK rule: double-tap
turns the season, drag scrolls the rows, nothing
else. A double-tap (two taps within 0.4s of the
piece clock) advances September to December to
July and wrapping: over 1s on fixed ticks the old
poster slides off left over the new one, with its
accent edge strip and a soft ink shadow at the
page edge, and the row scroll resets. The prompt
rows live in a clip band (348 to 640); five rows
at a 74px pitch overflow it by exactly 78px.
Dragging moves the rows with the pointer, clamped
to that range; on release a spring returns the
scroll and snaps to exactly zero. Never
click-to-reload; a single tap does nothing.

Ambient life runs on a 15s loop. The header scene
(muse plus seasonal dressing) breathes at scale
1 plus or minus 0.012 on one whole cycle of the
loop. The seasonal dressing moves only on whole
cycles: bobbing autumn leaves (September), 26 snow
dots on 1, 2 or 3 whole cycles with a small gold
fir beside the muse (December), bobbing star
sparkles (July). One host dot pulses at a time, in
fixed order. The loop is seamless.

Grain follows the batch grain rule: exactly 900
speckle dots from a fixed-seed LCG table (edition
ink at 0.05 alpha, every fifth dot in the edition
accent at 0.05), drawn last, in table order, every
frame. Never a noise texture or overlay.

Determinism: frame one is drawn synchronously at
the constant phase T = 3.2s (September complete,
header mid-breath, the third host dot mid-pulse,
no wipe, no scroll). The animation clock is
anchored at that constant and advances in fixed
1/60 ticks accumulated from rAF timestamps, typeof
guarded; frame one is never derived from Date.now()
or any wall clock. Pointer coordinates convert
through the stored fit transform (S, OX, OY).
Sizing uses the Visual Viewport API with resize
listeners on visualViewport and window; the canvas
is pinned by style width/height every frame; phone
detection uses window.screen with the aspect
fallback.

Two QA hooks ride the query string the house
renderer passes (?seed=...): edition=N renders
edition N at rest, wipe=1 renders a mid-wipe frame
into the next edition. Default play is unaffected.

## QA log

Rendered with the house renderer
(node ~/workspace/tools/render-piece.js):

- qa-desktop.png (1280x900): frame one, September.
  Paper poster, rust kicker, SWEETEMBER DAYS title,
  white-haired muse with autumn leaves at her chest
  and leaves bobbing around the header, four prompt
  rows visible in the clip band (the fifth waits
  below the scroll), rules block bottom left, ten
  host dots bottom right with the mug dot
  mid-pulse.
- qa-mobile.png (390x844): centred fit, whole
  poster in frame on the continuous paper ground.
- thumb.png (720x720): rendered twice from the
  shipped script; byte-identical (md5
  27aecedab2014332379ff8aeb93186c7).
- Probe renders (temporary, not shipped): December
  edition at rest (navy poster, cream type, red and
  gold chips, the five triple rows, muse with star
  wand and gold fir, snowfall in the header); July
  edition at rest (ochre poster, brown type, cream
  sun disc behind the muse, palette prop, the five
  master rows); a mid-wipe frame (September sliding
  off left with its rust edge strip over December,
  both posters' host rolls and headers reading
  correctly on their own grounds).

Palette discipline checked per edition: the only
colours on any poster are that edition's ground,
ink and accents, plus the fixed muse slots (hair
white, skin, ink features); the July muse's lips
take the edition ink rather than an accent, so no
colour crosses editions.

Deviations: none from the spec or its adaptation
flag. Frame one shows four of the five prompt rows
because the fifth sits below the clip band by
design: the rows are a scrollable list and the
drag is the piece's second specced interaction.
