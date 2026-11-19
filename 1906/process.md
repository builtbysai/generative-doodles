# №1906 Compose, Scomponi, Ricombina

## Spec

TASKS.md prompt block MB3, PP1153, study #249 michele-bonifati. Two figures face
each other across a table, a voice and an electronics desk. A poem line about
migration is read straight, shredded into syllable fragments that orbit the
desk, then recombined into a new line the poet never wrote. Each cycle leaves
a residue: recombined lines accumulate as a palimpsest at the table's edge,
older ones fading to grey. A luggage tag marks the cycle number. Palette:
paper white, ink black voice, signal red electronics, pencil grey fragments,
warm sepia palimpsest. Interaction: TAP EARNED, a tap lays a new line on the
table, never a reload. Gallery date 2007 · 04 · 01. Note ends "Tap for a new line."

## Driver

A voice reads a line about leaving home, a machine shreds it and hands back a
line nobody wrote, and the table keeps the evidence.

## Mechanism

A 24 second cycle in four phases: READ (0 to 5 s), the voice reads the line
straight on the table with speaking arcs at its mouth; SHRED (5 to 10 s),
the line splits into syllable fragments that fly from their words to orbit;
ORBIT (10 to 17 s), fragments circle the desk console on elliptical paths;
RECOMBINE (17 to 24 s), fragments fly back to the table and assemble the new
line while red arcs swell from the desk as the electronic bed. The cycle then
advances on its own, so the palimpsest keeps growing in live mode.

Corpus: seven original short lines about migration, written for this piece.
No real poet names, no quoted published poetry:

- I packed the house into one suitcase.
- The border asked my name in three tongues.
- My mother sewed the map into my coat.
- We crossed at dawn with bread and salt.
- The train kept my village in its window.
- A new street learned to say my name.
- I carry the river in a paper cup.

The shredder splits each word into syllable-like fragments at vowel groups.
The recombiner is a slot/template grammar, not a Markov chain: eight fixed
templates with noun-phrase and prepositional-phrase slots filled from small
pools ("I carry {object} {prepositional phrase}.", "My mother sewed
{object} into my coat.", "We crossed at dawn with {object}.", "The {place}
learned to say my name.", "{place} kept {object} in its window.", "The
{place} asked my name in three tongues.", "I packed {object} into one
suitcase.", "A new street learned to say my name {prepositional phrase}.").
Verb agreement and word order are fixed by the template, so every
recombination is a grammatical poetic line; place pools carry no article of
their own, so no "The the border" can occur. A result that lands on a corpus
line verbatim is rebuilt from the next template until it is a line the poet
never wrote. The recombiner was checked in node over all 7 lines x 20 seeds:
no verbatim corpus line, no doubled article.

The palimpsest shows the last four recombined lines along the bottom, newest
closest to the edge in sepia, older ones fading to pencil grey. Palimpsest
lines truncate at word boundaries. The luggage tag at the table's right edge
carries the cycle number.

Interaction: pointerdown on the canvas lays a fresh line (next corpus line),
raises the cycle number, and restarts the clock at the read phase. Never a
reload. Audio is lazy WebAudio inside the first tap only: two detuned sines
swelling under a gain envelope for six seconds. AudioContext is created only
in the tap handler and guarded, so node-canvas QA never touches it. The
shipped frame is visual-only.

House rules: Visual Viewport sizing with resize listened to on visualViewport
and window; canvas element pinned in draw() via canvas.style.width/height in
px; phone detection via window.screen (min dimension under 700px) with aspect
fallback (h > w*1.15); field-like composition, full-bleed on phones and square
on desktop. One synchronous frame at load; requestAnimationFrame guarded by a
typeof check. Reduced motion draws the fixed first frame only. QA hook:
?tap=1 simulates a tap having laid a fresh line.

## Deviations from the prompt

- The recombiner chains word fragments rather than syllable fragments, so
  the recombined line reads as a line. The shredder still works in syllables,
  and those syllable fragments are what orbit the desk.
- The palimpsest holds a seed line at load, the recombination of the arrival
  line (cycle 0), so the residue rule is visible in frame one.
- The voice speaking is visual (speaking arcs) plus a soft tone swell on tap.
  There is no speech synthesis and no spoken voice.
- Cycles auto-advance every 24 seconds in live mode; a tap lays a fresh line
  at once instead of waiting for the cycle to end.
- Orbit radii are capped and base angles spread evenly around the ellipse so
  fragments never leave the stage or clump into one spot.

## FIRST_T and frame one

FIRST_T = 14. Frame one is cycle 1, orbit phase (u = 14 s): line 1, "I packed
the house into one suitcase.", already shredded, its syllable fragments
orbiting the desk in pencil grey; the palimpsest holds one sepia line, the
seed recombination "I carry my village through the morning."; the luggage tag
reads 1; the desk aerial blinks on whole seconds. State is a pure function
of t, so frame one is byte reproducible.

## QA

Rendered with node ~/workspace/tools/render-piece.js: 1280x900 desktop,
390x844 mobile, 720x720 thumb, all visually inspected. No clipping, no
overlap with the title plate, hint and text legible, composition holds on
both sizes. Tap probe (?tap=1) differs visibly: tag 2, line 2 fragments
orbiting, palimpsest grown to two lines with the older one faded grey.

## Fix round (parent gate, 2026-11-19)

Two problems found at the gate and fixed, then re-rendered and re-gated.

1. Composition too empty. The scene scale rose about 1.6x: the shared scale
factor went from min(W,H)/560 to min(W,H)/350, so the voice figure, the desk,
the table slab, the fragment text (11 to 13 times the scale) and the
palimpsest (wider, up to four lines) all grew. The table is now a thick slab
with a sheen on top and sturdy legs ending on the figures' ground line. The
figures are anchored to the table instead of the frame (ground line =
table top + 68 times the scale), so the voice head always clears the table,
on phones as well as desktop. The orbit moved up and widened (centre above
the desk, taller ellipse) so the fragment cloud fills the upper middle. The
agent labels are drawn after the table so the legs never cover them, and on
phones the desk sits further left so no table leg hides a dial. A read-phase
render (FIRST_T = 2, in /tmp only) confirmed the current line lies legibly
on the table slab at both sizes.

2. Seed recombination was word salad. The Markov recombiner is gone, replaced
by the slot/template grammar above. The seed line is now "I carry my village
through the morning." The first template draft produced "The the border"
because the place pools carried their own articles; the pools were fixed to
bare nouns and the pack pool excludes "one suitcase". The verbatim fallback
now tries all eight templates in turn, not just the next one.
