# Tyler Hobbs — the site proper (Words / essays)

**Site:** https://www.tylerxhobbs.com/ (Works section deep-studied 2026-09-20:
4 Fidenza outputs, 2 QQL outputs, 2 Incomplete Control outputs inspected at
full res via the Sanity CDN)
**Status:** 2026-09-25, text-deep on the Words section. The essay text was
recovered through search-index extraction, including full passages from the
QQL design-philosophy essay, How to Hack a Painting, Texture Study:
Dormant Grass, and On Sketching. browser.open was unavailable this session,
so the essay pages themselves were not opened and their embedded images
were not visually inspected. A visual pass on the essay pages is still
wanted. The technique claims below come from Hobbs's own writing, not from
the essay images.

## What the site is

The site splits into Works (the pieces, already studied) and Words, a long
running series of essays and interviews. The Words section is effectively a
textbook of his working method: essays on randomness, structure, texture,
sketching, and long-form design, plus interviews with Matt DesLauriers,
Casey Reas, Hans Ulrich Obrist, and others. For study purposes the essays
are the prize. They explain the decision-making behind the pieces in a way
the pieces alone never could.

## Long-form generativism (The Rise of Long-Form Generative Art + QQL essay)

Two essays form one argument. Historically, generative artists curated:
generate as many outputs as they pleased, filter to favorites, show a small
set (Hobbs: for *Lines* he generated about 200 images and curated down to
10). Long-form platforms (Art Blocks, fxhash) changed the contract: every
output is collected, no skipping, no curation, and the artist targets a
specific output set size. That constraint defines a new class of algorithm,
what Hobbs calls long-form generativism.

The QQL design philosophy (with Dandelion Mane) is the actionable version:
because QQL mints are community-curated (collectors comb through thousands
of outputs), the algorithm can afford to take a lot of risk. Hobbs's own
framing: it is okay if 20% of outputs are bad, as long as 1% are
excellent. Collectors ignore the bad ones. So the algorithm was optimized
for *emergence*: the wild, unexpected top 1%. This is a design discipline
worth stealing: state your risk budget explicitly, then spend it. A system
that never produces duds is also a system that never produces surprises.

Fidenza's trait system shows the parametric side: scale variations (Small
to Jumbo XL), 14 probabilistic color palettes with handcrafted
combinations, turbulence levels (none, low, medium, high), shape
configurations with angle settings and collision modes, and a flow-field
engine that draws non-overlapping organic curves. Traits are continuous
spectrums, not binary switches (see also Incomplete Control, 100 unique
iterations from one algorithm). Continuous trait spaces keep the output
family coherent while each piece stays singular.

## Observation before code (How to Hack a Painting)

The famous watercolor essay is a method in five acts: observe the real
medium closely, build a mental model of its shape/texture/qualities,
translate the model into code, tune the probability distributions
(randomness is "the key to pleasing effects"), then layer textures and
colors into finished pieces. The watercolor deformation rule: take each
polygon side, stretch it outward, and pick three variables from a Gaussian,
the distortion spread, the protrusion angle, and the point of spread. The
natural world fits Gaussians well, so Gaussian choice gives organic
variance. Apply recursively, scaling distortion by side length, and six
rounds of a decagon gets shoreline-like edges. Softness comes from the
standard Hobbs move: lots of very transparent layers with random variation
per layer.

The essay's real punchline is compositional, not technical: you want
pleasant surprises from randomness, but not one pleasant result in 2,000.
You want something good every 10 or 20 images. Finding the system of
constraints around the randomness, the structure that makes interesting
things more likely, is "usually the most challenging part of designing a
piece of artwork." Same risk-budget idea as the QQL essay, stated years
earlier from the studio floor.

Hobbs is explicit that the goal was never fake watercolor. He wanted the
*patterns and textures* he saw in watercolor, and the finished pieces
drift toward fabric-dye looks. Masks on paint layers let underlayers show
through as light lines. The discipline: study the medium, steal the
texture vocabulary, abandon literal imitation.

## Texture by analysis (Texture Study: Dormant Grass)

The grass study is the observation method run on nature directly. Hobbs's
rule: when you find a texture better than your work, study it and learn.
His first pass is value structure before texture. The observations: grass
is clumpy; foreground clumps are rounder and irregular, horizon clumps are
flatter and more regular; lighter strands sit consistently on top of darker
strands, because dark values come from shadow or dirt, which must lie
below the light values. His first model is embarrassingly simple:
ellipses, with lighter clumps distributed differently from darker ones,
concentrated roughly two thirds of the way up to the horizon. "If you
squint, the value structures are pretty close to matching the reference at
this point. But, of course, we don't have any texture yet." That is the
whole method: nail the value structure first, texture is a separate pass.
And the payoff line for generative work: textures that would take hours by
hand take hours by code, and once built they are free to reuse.

## Sketching as a discipline (On Sketching)

Gardening metaphors: rich soil (days absorbing art, ideas, life), seeds
(little drops of inspiration), watering and weeding over time. The seed
stage is what sketching is for. Core claims: sketching is a *mindset*, an
opportunity to safely flirt with failure; the safety aspect is crucial, so
sketch in private (Hobbs keeps his sketches private even from friends and
partners, because the mere possibility of being seen makes him play it
too safe); sketching sorts duds from ideas with promise. Practical advice
quoted by Gorillasun from the same essay: set yourself up with an
easy-to-boot template that saves code and output at the same time.

## Process artifacts worth stealing

- **The Haecceity curation pipeline:** for the Haecceity series he
  generated about 950 images over several days, rated each 1 to 5 stars,
  kept the 149 with four or more stars for a second look, narrowed to 24
  finalists on compositional strength, balance, rhythm, and detail
  quality, then chose 7 that complement each other and show the program's
  range. Numbers, not vibes: 950 to 149 to 24 to 7.
- **Mangled bezier curves** as the organic-detail pass: plain rectangles
  looked good at distance but did not hold interest; splatter shapes of
  mangled beziers around the red rectangles broke out of the format and
  read almost floral. One deliberate organic disruption per piece.
- **Exclusion zones:** rectangles were forbidden from being centered
  within a certain distance of chosen points, a compositional negative
  space enforced in code.
- **Randomness-in-composition spectrum:** the Randomness essay asks how
  early randomness enters a composition, charting works from fully
  controlled (Bouguereau, Backstreet Boys) through celebrated flaws
  (Impressionists, first-take musicians) to total surrender (John Cage's
  I Ching pieces). For our purposes: decide where on that chart each
  parameter lives, per piece, on purpose.

## What makes the site sing

The essays are the rarest thing in generative art: a master explaining his
decision procedure, not just his results. The recurring spine is the
risk budget: spend randomness where it buys surprise, spend structure
where it buys coherence, and budget both in numbers. The order/disorder
duality from the monograph (and the Agnes Martin / Sol LeWitt / John Cage /
Bridget Riley lineage) is not branding, it is the operating system.

## Avoid-list notes

The QQL risk math (20% bad, 1% wild) only works with a curator downstream:
collectors, a rating pipeline, or the artist. Building a wild system with
no curation step is how you get an ugly gallery. Also, do not mistake the
essays' simplicity for the whole craft: the writing makes everything sound
inevitable, but the Haecceity numbers show the actual labor (950 outputs,
star ratings, days of review). The system is the boring parts.

## Cross-links

- The risk-budget framing generalizes the Snow Esamosc / viewyonder /
  takawo study's variation discipline and the Patatap pose-randomization
  engine: all three budget surprise against coherence, Hobbs just says the
  numbers out loud.
- The transparent-layer softness recipe is the same engine as the
  watercolor-tyler-hobbs study note (midpoint displacement + glaze stack),
  now with the why: softness is many slightly different layers, never one
  filtered layer.
- The texture-by-analysis method (value map first, texture second) pairs
  with the Golan Levin note's study of systematic deviation: both start
  from observing the real thing instead of inventing variation.
- The private-sketchbook rule belongs next to the Oath / First English
  links-held rule in spirit: protect the work while it is fragile.
