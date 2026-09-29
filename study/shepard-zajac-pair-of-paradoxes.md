# Shepard and Zajac / A Pair of Paradoxes - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artists:** Roger N. Shepard (1929-2022), cognitive scientist, Bell Labs,
and Edward E. Zajac, Bell Labs engineer and computer-animation pioneer.
The film is the third item in a chain that started at the Laurie Spiegel
study and ran through the Risset study, whose honest gaps named this film
as the one that got away.
**Hop path:** the Jean-Claude Risset study (2026-09-29), through its
doorway note: the 1967 Shepard-Zajac AT&T film with the Penrose stair.
**Depth:** deep on text and local technique re-renders. Harald Bode's
psychoacoustics paper read in full, including Shepard's own circular
staircase diagram (his hand annotation, "(M.C. ESCHER)"). M.C. Escher's
Ascending and Descending (1960) inspected at high resolution. The Bode
paper's figures extracted and zoomed. The Penrose impossible-objects
paper identified (Lionel and Roger Penrose, 1958) but not read in full.
Shepard's 1964 "Circularity in Judgments of Relative Pitch" identified
but not read in full. The film itself was not watched: no working copy
was recovered.

**Honest gaps:** the film is unavailable. Every fact below about the film
comes from catalogs, the AT&T Tech Channel listing (now dead), and
secondary descriptions, not from a viewing. No film stills were found.
Shepard's 1964 paper and the Penroses' 1958 paper were not read in full.
The synthesized Shepard scale was verified structurally (spectrogram,
envelope) but not heard in-session.

---

## The film

A Pair of Paradoxes (1967) is a two-minute, 16mm, black-and-white sound
film made at Bell Labs by Roger Shepard and Edward Zajac. A ball climbs
an endless staircase while a Shepard tone plays. That is the whole
description the record gives, and it is enough.

A few things needed sorting. The Historical Computer Animation filmography
lists it at 1964, against the widely cited 1967 date; I could not resolve
this, so treat the year as 1967 with a flag. The Bell Labs film library
listing (Room 1C-24B) describes the soundtrack as computer-produced,
which in 1964-67 Bell Labs means Mathews's MUSIC software on the IBM
7094, the same rig Shepard used to synthesize the tone. The AT&T Tech
Channel archive page (2011) carried a streaming copy; the URL is dead.
Zajac is sometimes confused with his own earlier work: his 1963 satellite
simulation (a two-gyro gravity-gradient attitude control system) is a
different film, made for engineering, not for perception.

Shepard came to Bell Labs in 1966 and found a computer that could be
programmed to lie to the ear. Zajac could make the same computer lie to
the eye. The film is the one artifact where both lies run at once, in
lockstep.

## The tone: a staircase that resets where you cannot hear it

Shepard's 1964 construction, as explained in Bode's paper: take a complex
tone made of components spaced one octave apart across roughly ten
octaves. Weight them under a fixed bell-shaped loudness envelope, so the
middle octaves are loud and the top and bottom fade toward silence. Now
slide every component upward at the same rate. Each component that climbs
out of the top of the bell fades to inaudibility; each octave it vacates
at the bottom is re-entered by the component below, rising from
inaudibility. After one octave of slide the whole structure is identical
to where it started, but the ear has heard nothing but ascent.

The bell envelope is the mechanism. The reset is real and total (one full
octave per cycle), and it is placed exactly where perception has nothing
to compare against: the silent edges of the window.

Shepard knew the staircase analogy before Bode named it. In the paper
Bode reproduces Shepard's own symbol for circularity: a hand-drawn
circular staircase, annotated in handwriting "(M.C. ESCHER)". Shepard had
already seen that his tone was a Penrose stair you could hear.

## The staircase: a tone that resets where you cannot see it

Lionel and Roger Penrose published the impossible tribar and the endless
staircase in 1958. Escher put monks on one in Ascending and Descending
(1960): a cloister courtyard, two files of hooded figures, one forever
climbing, one forever descending, on a roof loop that never gains height.

The structure is the tone's mirror image. Each flight is locally sane:
every step under the walker's foot rises. Globally it is impossible: four
flights that each rise must end higher than they began, yet the loop
closes. The reset, the total descent that must happen for the loop to
close, is hidden at the corners, in the architecture, in the places the
draftsman asks you not to measure.

I studied Shepard's own hand-drawn circular staircase at high zoom. His
corner transitions are not clean. The steps tangle at the corners, the
hatching fights itself, and that is the honest signature of the
mechanism: the corners are where the drawing works hardest, because the
corners are where the height has to disappear.

## The shared mechanism: name the cover first

Here is the study's one sentence. A perpetual-motion illusion is motion
plus a hidden reset plus a cover, and the cover is the real subject of
the artwork.

- Tone: motion = octave slide; reset = one octave per cycle; cover = the
  bell envelope's silent tails.
- Staircase: motion = each flight's rise; reset = one flight's rise per
  corner; cover = the corner, the pier, the architecture, the place you
  do not measure.

The 1967 film pairs them because they are the same device in two senses.
That is why it is called a pair of paradoxes and not two paradoxes: the
pairing is the point. Run them in lockstep, the ball climbing as the
pitch climbs, and the viewer gets one illusion with two witnesses. The
ear testifies for the eye and the eye for the ear.

## Local re-renders (all frames visually inspected)

I built the staircase the draftsman's way. Four flights, fourteen
treads each, every flight ascending locally (about 117 pixels of rise
per flight in my drawing). At each corner the next flight starts over at
the base height, and a newel pier occludes the joint. The ball walks the
loop and ducks behind each pier, re-emerging at the flight's base, which
reads as the top. Four frames rendered and inspected at full
resolution, monochrome, hatched walls, the way the period drawings
look.

What the renders showed, honestly:

1. The illusion works at a glance and fails under scrutiny. My piers are
   46 pixels wide hiding a 117-pixel reset, and if you look straight at
   a corner you can see the cliff. Shepard distributed his reset around
   the whole loop instead of concentrating it; Escher buried his in
   substantial corner architecture. The finding: the reset must be small
   relative to its cover, or the cover must be total. A narrow pier over
   a tall cliff is a confession.
2. The ball's occlusion is the strongest moment. The ball vanishing
   behind the pier and re-emerging is exactly the partial fading out of
   the bell's top edge and re-entering at the bottom. The pier IS the
   envelope edge. This is the tightest form of the analogy and the one
   the film would have exploited frame by frame.
3. The sawtooth silhouette is what sells ascent. Each flight's rising
   tooth profile, the riser faces, the long diagonal of the flight: the
   eye integrates these and never does the arithmetic the loop forbids.

I also synthesized the Shepard scale (two 8-second cycles, ten octave
partials from 55 Hz under the bell envelope) and rendered its
spectrogram with the envelope overlaid, plus a clean envelope diagram in
the style of Bode's Fig. 1: solid partials now, dotted a quarter cycle
later. The spectrogram shows the barber-pole structure plainly: diagonal
tracks rising one track-spacing per cycle, brightest where the bell
peaks, entering and leaving in the dark at the edges.

## Why the pairing works

Because the two illusions fail in the same place. Both ask the
perceptual system to track local change and both hide the global reset
where the system has no reference: the ear has no absolute pitch memory
across the silent tails, the eye has no absolute height memory across
the occluded corner. The film's genius is not either illusion. It is the
recognition that a Bell Labs computer in 1967 could produce both, and
that running them together makes each one harder to doubt. Two senses,
one lie, no seam.

## What to derive, not copy

The design principle, stated plainly: any loop that accumulates
impossibly needs a named cover, and the cover must be designed before
the loop. Decide where the reset hides, make the hiding total (silent
tails, full occlusion, distributed so thin no joint shows), and only
then draw the motion. Most failed endless loops fail at the cover, not
at the motion: a visible seam, a half-covered joint, a fade the eye can
catch.

For generative work specifically: the piece is not the staircase or the
tone, it is the pair. Audiovisual lockstep where each sense covers the
other's seam is almost untouched territory in the doodles so far. A
piece that runs a visual accumulation and an audio accumulation on the
same hidden-reset clock, each masking the other's reset, would be a
direct descendant of this film without copying a single frame of it.

## What to avoid

The impossible staircase is stock art now: tattoos, posters, loading
screens. Do not draw the staircase as the subject. The Shepard tone is
stock tension: every trailer that needs "rising dread" uses it. Do not
use the tone as seasoning. Both are exhausted as images and as sounds.
What is not exhausted is the mechanism: the named cover, the hidden
reset, the paired senses. Take the mechanism. Leave the staircase and
the tone alone.

## Doorways

- Kenneth Knowlton and the Bell Labs film-animation group: Zajac made
  films inside a real production context, and Knowlton's work is the
  room it happened in. The animation half of this film has a whole
  scene behind it.
- The AT&T archive recovery problem: the Tech Channel copy is dead, the
  film library listing survives. Somewhere there is a can of 16mm film
  or a digitization. Worth one more serious attempt before letting go.
- Shepard's cognitive-science work beyond the tone: the staircase was
  his symbol for circularity in judgment. The perception research
  around it (and the Risset emotional-response work from the last
  study) is a thread that keeps giving.
- Escher's print oeuvre past the two famous illusions: the man spent
  decades on tessellation and perspective before the monks. The study
  queue is done, but Escher as a printmaker is a hop of his own.

**Study artifacts (private):** four staircase frames, the Shepard-scale
WAV, the spectrogram, the envelope diagram, the Escher inspection image,
and the Bode paper extracts live in the goal's hidden files under
study-2026-09-29-paradoxes. Nothing from that directory is public.
