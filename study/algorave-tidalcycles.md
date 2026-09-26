# Algorave / TidalCycles: Study Notes

**Date:** 2026-09-26
**Source:** tidalcycles.org mini-notation reference (read end to end),
Saachi Kaup "Mandalas and Tidal Cycles" blog in tidalcycles/tidal-doc
(read end to end), TOPLAP live-coding manifesto via livecodingbook.toplap.org
and the Lubeck 04 text, algorave history via Wikipedia + two long-form
scene writeups, Algorave community guidelines README.
**Doorway:** the Char Stiles livecoding study. She performs inside the
live-coding scene; algorave is the dancefloor wing of it, and TidalCycles
is the canonical instrument. This is the scene around the tool, same hop
pattern as before.

**Depth: deep.** Mini-notation reference read in full, the mandala blog
read in full, three of its artwork images visually inspected at full res
(Ninja Star, Honeycomb, ChaosMap), the mini-notation parser subset
re-implemented from the docs in Python and four renders visually
inspected. Honest gaps: no live algorave performance was seen or heard
this session (no video pass, no audio rig); the real Tidal engine was not
run (it needs Haskell plus SuperCollider/SuperDirt, not available here);
the blog's exact turtle geometry could not be recovered from the text,
and the author says the system was a work in progress with real-time
sync problems, so my renders derive from the documented grammar rather
than matching the images pixel for pixel.

## What it is

Algorave: people dancing to music generated from algorithms, usually
live-coded on stage with the performer's screen projected large. Alex
McLean (of the live-coding band Slub, formed 2000 with Adrian Ward)
coined the word with Nick Collins in 2011 on a motorway drive to a gig.
First event 17 March 2012 in London as a warm-up for the SuperCollider
Symposium. The movement grew out of TOPLAP, the live-coding collective,
whose Lubeck 04 manifesto is the scene's founding text.

The manifesto's famous demand: "Obscurantism is dangerous. Show us your
screens." Plus: "Programs are instruments that can change themselves,"
"Code should be seen as well as heard," and the acknowledgment that it
is not necessary for a lay audience to understand the code to appreciate
it, any more than a guitar audience must play guitar. The Algorave
community guidelines add the practical side: most acts should expose the
algorithmic process visibly, no protected-brand franchise, collapse
hierarchies (no headliners), be wary of institutions, diversity in
lineups and audiences. Anti-copyright by design: the process is the
product, and the product is improvised, so there is nothing to own.

TidalCycles is McLean's instrument: a live-coding environment for pattern,
embedded in Haskell, driving the SuperDirt sampler. Its core idea, and
the one that matters for generative visual work, is the pattern as a
function of time. You do not build a fixed DAW clip; you describe a cyclic
pattern and ask what is active over a time span. Time is measured in
cycles (CPS, not BPM). This one decision shapes everything downstream.

## The mechanics: mini-notation

Mini-notation is a string DSL that parses into pattern functions. The
full grammar from the reference:

- spaces separate steps in one cycle. Adding steps COMPRESSES more events
  into the same cycle; the cycle never lengthens. `"bd sn"` is two hits
  per cycle; `"bd sn bd sn kurt hi lo hi lo"` is eight in the same time.
- `~` rest. `[ ]` groups a subsequence into one step's time, nestable to
  any depth. `.` is shorthand for top-level groups.
- `,` stacks patterns in superposition (polyphony inside one pattern).
- `*N` repeats a step N times squeezed into its own time; `/N` slows the
  pattern across cycles. `!N` replicates (new steps, same grid) versus
  `*` (faster within the step). A genuinely subtle pair.
- `< >` alternates by cycle: `s "bd <sn cp>"` plays sn on odd cycles,
  cp on even.
- `|` random choice, `?` random event removal, `:` sample selection.
- `(k,n[,o])` euclidean rhythms: k hits distributed as evenly as possible
  across n steps, optional offset. `(3,8)` is the Cuban tresillo;
  the docs list the Toussaint catalog: `(2,5)` Persian Khafif-e-ramal,
  `(5,16)` the bossa-nova necklace, `(7,12)` a West African bell pattern,
  `(13,24,5)` an Aka Pygmy rhythm. Toussaint 2004 is the source paper.
- `{ }` polymeter: patterns of different lengths stack and wrap against
  each other.

The euclidean operator is the one that survives every genre. It is a
rhythm necklace: hits as beads on a ring. That is already a visual.

## The mandala project: Tidal patterns as drawing

Saachi Kaup's Summer of Haskell project asked the obvious question the
scene had skipped: all Tidal visualizations were linear (notes marching
forward in time), but music is periodic, so its visuals should live in
the same place and morph there. The project integrated a tiny turtle
notation into Tidal's parser: `f` forward, `l` left, `r` right, written
in mini-notation. Three renders inspected:

- "f l l [f r r f l l f r r] f l l" (Ninja Star): red spiky ring, dense
  parallel strokes forming twelve petals around an empty center. The
  group squeezes its six commands into one step's time while the
  top-level f's get full steps, which is what gives the mark its
  asymmetry.
- "f <l r> f <r l r>" (Honeycomb): interlocking pentagonal ring. The
  alternation across cycles is doing the real work here: the turtle walks
  a different turn sequence every cycle, so one short string draws a
  twelve-unit frieze.
- slow "1 1 2 3 5 8" applied to "f l l" (ChaosMap): rainbow sprawl,
  Brownian-looking, but it returns to its origin at the end. The
  author's own comment: it showcases the underlying mathematical beauty,
  visible only when the pattern closes.

The author is honest about the state: WorldTurtle's API gave no
low-level access to the time a pattern was produced, so the graphics
were only theoretically in sync with the music; live pattern changes
needed mutable shared variables plus threads; the plan was Gloss
(which does expose time) or a JS FFI next. A research prototype with
sharp edges, documented as such.

## My re-render

I implemented the mini-notation grammar subset (steps, groups,
alternation, `*`, euclidean with offset, rests) in Python, with the
duration semantics the docs imply: a cycle divides among its steps, a
group subdivides its step, `*N` squeezes, euclidean spreads hits across
sub-steps, and f moves proportional to the event duration. The parser
was verified against the docs' own examples (euclid (3,8) yields hits
at positions 0,3,6; (5,8,2) rotates correctly). Four renders inspected:

- Ninja Star string: the 180-degree turns retrace, so my version blooms
  as a rainbow fan of spokes, not the blog's tangential petal ring.
  The grammar is right; the turn semantics of the blog's turtle are not
  recoverable from the text. Noted, not fudged.
- Honeycomb string: alternation confirmed working, the cycle-varying
  path reads clearly.
- ChaosMap slow pattern: collapses to a rainbow disc (back-and-forth
  line stretched across cycles), which confirms the slow mechanic but
  not the blog's sprawling geometry.
- Derivation: euclidean `f(3,8)` stacked against rotated `f(5,8,2)` as
  radiating rhythm necklaces. This one is genuinely pretty: the two
  necklaces beat against each other like interference fringes.

Takeaway for the sketchbook: the Tidal grammar is a compact generative
drawing language. A string like `f(3,8)` is a complete visual idea. The
cycle model (compression, not extension) is the compositional trick:
everything stays in one place and gets denser, which is exactly what a
mandala wants.

## What makes it sing

The audacity of the premise: the laptop, the instrument everyone
despised as anti-performance, becomes the instrument by being shown.
"Show us your screens" turns the embarrassing part of computer music
(the performer staring at a screen) into the entire staging. The
mini-notation's density is the second trick: five characters can hold a
polyrhythm that would take a bar of standard notation, and it is
editable mid-performance. Bugs are aestheticized rather than hidden;
McLean says in the Dazed interview that bugs which sound good just get
kept.

## Overdone / avoid-list

- Projected code that does nothing. The manifesto's warning cuts both
  ways: code on screen that is not actually driving the sound is the
  new obscurantism, a worse sin than hiding it.
- Mini-notation soup that never resolves. ChaosMap works because it
  returns to its origin; an endlessly drifting pattern with no closure
  is just noise with a backstory.
- The rainbow default. Every one of my renders came out rainbow and
  every one would be stronger with a committed palette. The blog's
  single-color red renders prove the point.

## Doorways

- Sam Aaron / Sonic Pi: the other philosophy (code as pedagogy),
  `live_loop` as the classroom cousin of Tidal's cycles.
- Orca, Estuary, FoxDot, ChucK: the other live-coding instruments.
- Kindohm and the current Tidal performance circuit: where the grammar
  goes next.
- Algraves visuals: the Hydra side of the stage is studied already
  (Olivia Jack); the pairing of Tidal audio with live-coded GLSL is
  the full algorave stack.
