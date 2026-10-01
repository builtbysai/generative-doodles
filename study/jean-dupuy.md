# Jean Dupuy: Study Notes

**Depth:** deep. Read the Getty restoration page on Cone Pyramid, the
Hyperallergic retrospective, the EAI public programs page, the Wikipedia
biography, the Critique d'art essay, the Art Basel history piece, the
Slash Paris portfolio and exhibition pages, the Loevenbruck biography and
Art Basel PDFs, the UCSB LACMA Art and Technology chapter on Dupuy (his
Ampex proposals, the rejection letter, the Cummins collaboration), and
the Media Art Net work page. Visually inspected nine images: the Cone
Pyramid diptych from Art Basel 2021 (black cabinet, red beam, stethoscope
pedestal), the 1968 dust detail, the wooden-cabinet version with the
amplifier visible below, N°30, Cage, Satierik, Table à imprimer (1974),
the Léon Musicien anagram painting (1986), and Concert de secondes
(2011). Locally re-rendered the heartbeat dust membrane and inspected
four frames.

## The man

Jean Dupuy (1925-2021), French, born in Moulins. A lyric painter until
1967, when he destroyed most of his paintings by throwing them into the
Seine, then moved to New York. The destruction is the hinge: everything
after is about not painting, about finding ways for the work to make
itself. Friend and collaborator of George Maciunas, worked with Claes
Oldenburg, Nam June Paik, Laurie Anderson, Charlotte Moorman, Robert
Filliou, Jacques Monory, Charlemagne Palestine. In the 1970s he organized
collective performances (Soup and Tart 1974, Three Evenings on a Revolving
Stage 1976) with artists like Yvonne Rainer, Charles Atlas, Philip Glass,
Gordon Matta-Clark, Joan Jonas, and Hannah Wilke.

## Heart Beats Dust: Cone Pyramid (1968)

The signature work. Red Lithol Rubine pigment sits on a tightly stretched
membrane over a speaker. The viewer's heartbeat, picked up by a stethoscope
or played from a tape loop, drives the membrane; the dust jumps, hangs,
and falls back while a beam of light catches it mid-air as a red cone. Won
the 1968 E.A.T. competition (engineer Ralph Martel collaborated through
Experiments in Art and Technology), shown in MoMA's The Machine as Seen at
the End of the Mechanical Age. The Getty restored it for a 2024
exhibition: LED in place of the hot stage bulb, neoprene instead of rubber
for the membrane, Lithol Rubine BK sourced from Germany, two years of
tuning the amplifier, equalizer, and stethoscope.

What matters for us: the driver is a body, not a clock. A heartbeat is
periodic but never metronomic; it speeds, skips, doubles (lub-dub), and
belongs to whoever stands in front of the piece. The dust never forms the
same cone twice. The pigment was chosen specifically because it stays
suspended in air a long time, so each beat's dust overlaps the last one's.
That overlap is the whole image.

## FEWAFUEL (1970)

Made with Cummins engineers for the LACMA Art and Technology show (1971):
a working diesel engine whose exhaust vapors and pollutants were captured
in a pyrex ball tied to the exhaust. The backstory from the A&T report is
worth knowing. Dupuy first sent Ampex a set of proposals (Sparks, turning
speech into electrical bursts; L'Ingenieur Pomme, shattering an apple with
focused ultrasound; Inverse/Regenerative, a silent room where you hear your
own body). Ampex's executive vice president Arthur Hausman rejected them,
writing that Dupuy essentially wanted Ampex to do the bulk of the creative
work. Then Cummins Engine Company called the museum asking to join the
program, Dupuy went to Columbus, Indiana for three months, and made
FEWAFUEL instead. The engine piece caused a scandal at LACMA and was
withdrawn after about 15 days; Cummins donated it to the artist, and it is
now at FRAC Bourgogne, restored.

The lesson: waste made visible. The exhaust was always there; Dupuy just
gave it a container. Generative parallel: render the byproduct, not the
product. The process exhaust (discarded seeds, failed frames, noise) is
material.

## Lazy machines

Dupuy called it Lazy Art: having the tool, or someone else, or physics,
make the work. Lazy Susan (1973): a revolving stage turning at one
revolution per day, blocked by a padlock. Table à imprimer (1974): a
periscope under a sheet of paper on a table; the viewer looks through it
and the sweat of their forehead and nose marks the paper; about 5,000
views to produce one gold print. Chorus for six hearts (1969). Table à
saluer (1992): look down a periscope and see the crown of your own head.
Concert de secondes (2011, with Jérôme Joy): 19 battery clocks on a wall,
each wired down to mixing tables and active speakers, the seconds made
audible.

The discipline here is slowness and delegation. One revolution per day.
Five thousand views per print. The machine does almost nothing, and that
almost-nothing is the piece. For our work: parameters that change at
glacial rates, pieces that accumulate over days, the viewer's body as an
input device.

## Anagrams

Started 1973, from "American Venus Unique Red" to "Univers ardu en
mécanique". Later the NOON anagrammatic paintings (1984) run on a strict
system: a color palette written at the top in the color each name
describes, then a text below whose letters are constrained to the
palette's letter set, with each letter colored according to the palette
order. He published more than 50 books of anagrams.

This is a constraint system, and a very generative one: a small alphabet
(the palette names) generates both the vocabulary and the coloring rule.
The Léon Musicien painting (1986) shows it at full density: rows of
color-words (BLEUE DE NUIT, CACAO, CHATAIN, CRETE DE COQ, ROUGE, SUIE,
VERTE...) each row in its own color, then a text below where every letter
takes its color from the palette. It reads as pure pattern from across
the room and as language up close.

## Re-rendered locally (2026-10-01)

A behavioral study of the Cone Pyramid loop in Python/PIL: 700 dust
particles on a membrane, gravity, a synthetic heartbeat envelope
(lub-dub at 72 BPM, two decaying thumps per period), kicks proportional
to the envelope, a light cone from an apex above. Four frames inspected:
t=0.02 (dust lifting off the membrane right after the lub), t=0.20
(dust suspended mid-beam after the dub), t=0.45 (settling), t=0.80
(rest, most dust back on the bed). The beam is a blurred red gradient
cone; particles inside it render bright red, outside it dim. Frames live
in the study working folder. What it taught: the envelope shape is
everything. Two close thumps with different decays give the dust a
stutter that a sine wave never would, and the long suspension time
(Lithol Rubine's real property) is what lets beats overlap into a
continuous cloud.

## Generative takeaways

1. Drive with a body, not a clock. A heartbeat envelope (irregular,
   double-thumped, tied to a real pulse sensor or a recorded one) as a
   global forcing function beats any LFO.
2. Render the exhaust. Keep the discarded, the failed, the byproduct, and
   put it in a glass ball.
3. Constraint systems that color themselves. The anagram palette (names
   written in their own colors, text constrained to the palette's
   letters, letter colors from palette order) is a complete generative
   grammar in one rule.
4. Lazy machines. Change at one revolution per day. Let the viewer finish
   the work with their body.
