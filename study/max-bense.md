# Max Bense: Study Notes

**Profile:** Max Bense (7 February 1910 to 27 April 1990), German
philosopher, mathematician by training (Bonn, Ph.D. + Sc. December
1937 in philosophy, mathematics, physics, geology), founder of the
Stuttgart School, the theorist half of the founding pair of
information aesthetics alongside Abraham Moles. Taught information at
the Technische Hochschule Stuttgart from 1949 and at the Ulm School
of Design under Max Bill. Editor of *Augenblick* (1955 to 1961) and
of *rot* (with Elisabeth Walther). Founded and ran the Stuttgart
University Gallery 1958 to 1978, roughly 100 exhibitions, a forum
for testing his aesthetics. At the first computer art exhibition
worldwide, Georg Nees's *Computergrafik*, 5 February 1965, he coined
the term **Generative Aesthetics**; at the opening he also coined
"Artificial Art" after Nees's famous answer about the Duktus. He was
Nees's doctoral advisor for the first Ph.D. in computer art
(defended 1968, published 1969), suggested the Cybernetic
Serendipity project to Jasia Reichardt, and influenced Frieder Nake,
Manfred Mohr, Vera Molnar, Manuel Barbadillo, and the Computer
Technique Group in Japan. After 1984 he applied his theories to
screen media. Opposed to emotion-based judgment, an *enfant terrible*
against German metaphysical coziness; the Beuys clash in Duesseldorf
1970 and the Tendencies 5 dismissal of information aesthetics in
1968/69 mark the end of the rational-aesthetics project's first
phase. Wrote experimental poetry himself (*Die praezisen Vergnuegen*,
*Das graue Rot der Poesie*), introduced the term *programming* into
aesthetics.

**Depth:** deep on text, medium on images, two local re-renders. Read
in full: the DADA agent entry and the DADA Information Aesthetics
article (Bense's theory, the four methods, the Moles contrast, the
controversy record), the Media Art Net cybernetic aesthetics text,
Elisabeth Walther's survey of Bense's aesthetics up to 1971 (the
Aesthetica arc, Birkhoff to Peirce), the DADA exhibition entries for
Nees's 1965 show and the Nake/Nees Niedlich show, the DADA
publication entry for *rot* 19, Lutz's 1959 "Stochastische Texte"
article in English translation on stuttgarter-schule.de (complete:
algorithm, word lists, combinatorics, learning proposal, the 35
published couples), the Uni Stuttgart library account of the 2022
Lutz reenactment (original program recovered from the DLA Marbach
archive, run on an LGP 30 and a PDP-12). Four images visually
inspected at full resolution, two of them discarded as misattributed
or milieu-only. Two Python re-renders built and visually inspected:
a faithful Lutz stochastic-text generator and an implementation of
his 1959 learning proposal.

## The doctrine: the sign, not the object, and the four methods

Bense's move, compressed from Walther and the DADA article:

- **The aesthetic object is a sign, not the thing.** "Not the
  represented object, but the sign that represents the object is
  beautiful." Sender -> aesthetical object -> observer, in play with
  Schiller and von Neumann.
- **Birkhoff's M = O/C becomes informational.** Order/complexity
  becomes redundancy/statistical information; redundancy is order
  (symmetry is the simplest redundancy), entropy is material
  expenditure. Art moves toward order while physics moves toward
  chaos: **negentropy** as the ontological basis.
- **Macro/micro aesthetics**, borrowed from physics: the evident
  compositional realm and the non-evident distributional realm.
- **Generative aesthetics** (rot 19, *Projekte generativer
  Aesthetik*, Feb 1965): "the compound of all operations, rules and
  theorems through whose application to a quantity of material
  elements able to function as signs can deliberately and
  methodically generate in the latter aesthetic states
  (distributions and/or arrangements)." Its aim: "the artificial
  production of probabilities of innovation or deviation from the
  norm." The Jäger interview gives the working version: an aesthetic
  by creation, "dissecting the creation in a finite number of
  specifiable and describable single steps." The Chomsky analogy is
  the point: generative aesthetics is to aesthetic structure what
  generative grammar is to sentences. Not intended as a manifesto,
  now read as the first manifesto of computer art; the English text
  went out in *Cybernetics, Art and Ideas* (Reichardt, 1971).
- **The four methods:** semiotic (Peirce's triadic sign relations,
  the classes a work is built from), metrical (macro-aesthetic:
  numerical data, proportion, form/figure/structure), statistical
  (micro-aesthetic: frequency and probability of elements, the
  principle of *distribution* rather than formation), topological
  (sets: connection, environment, open/closed, complexity of sets).

Where he breaks from Moles, recorded in the Moles study and
confirmed here: Bense measures the object with objective measures;
Moles starts from the observer and allows the subjective. Same
Shannon, opposite ends of the channel.

## The Lutz case: the theory's first running program

The most concrete Bense-line generative work of the whole period,
and it predates the plotter shows by six years. Theo Lutz, Bense's
diploma student, July 1959, Zuse Z22 at the TH Stuttgart computer
center, published in Bense's own journal *augenblick* 4 (1959),
H.1, pp. 3-9. Bense suggested the random generator; Lutz built it.

The algorithm, verbatim from Lutz's article:

- **Vocabulary:** 16 subjects and 16 predicates from Kafka's *Das
  Schloss* (DER GRAF, DER FREMDE, DER BLICK, DIE KIRCHE / DAS
  SCHLOSS, DAS BILD, DAS AUGE, DAS DORF / DER TURM, DER BAUER, DER
  WEG, DER GAST / DER TAG, DAS HAUS, DER TISCH, DER KNECHT; OFFEN,
  STILL, STARK, GUT, SCHMAL, NAH, NEU, LEISE, FERN, TIEF, SPAET,
  DUNKEL, FREI, GROSS, ALT, WUETEND).
- **Logical operators** (equiprobable, inflected by gender): EIN /
  JEDER / KEIN / NICHT JEDER, and the feminine and neuter forms.
- **Logical constants** linking sentence pairs: UND 1/8, ODER 1/8,
  SO GILT 1/8, full stop 5/8. The Kafka words are decoration; the
  logical constants are the poetry engine. This is the lesson.
- **RNG:** "A new number is formed from an initial number by an
  arithmetic operation, and from this number digits are taken by
  intersection" (von Neumann's middle-square, in substance).
- **Combinatorics:** 4 x 16 x 16 = 1024 elementary sentences; the
  article prints "4174304" for 4 x 1024², but 4 x 1,048,576 =
  4,194,304. A 20,000 slip, left open as a typesetter's error in
  the translation.
- **The future paragraph, 1959:** replace uniform selection with a
  rectangular transition-probability matrix (subject m to predicate
  n), print only sentences above a threshold, and let a super-program
  strengthen the transitions of sentences judged "meaningful" and
  weaken the others. "The machine has 'learned' in a certain way."
  This is a learning rule for generative text written before the
  field existed.
- **The hand:** Lutz corrected grammar slips and punctuation by hand
  in his printed selection, "contrary to programming acted as a
  'traditional' author" (ELMCIP). The raw machine output had slips
  ("KEIN FREMDE IST NEU" in his own typed page; "KEIN WEG IST GUT
  ODER NICHT." hanging in the MacCormack selection). The finished
  work is machine draft plus editorial hand, and the article hides
  that split. Honest reading: the program is half the poem.

Four images inspected:

- **freiburg_stuttgart2.jpg** (Ub Stuttgart, 720x510 crop of the
  original printout and code): the aged typed page carries
  "NICHT JEDER TURM IST GROSS ODER NICHT JEDER BLICK IST FREI /
  EINE KIRCHE IST STARK ODER NICHT JEDES DORF IST FERN / JEDER
  FREMDE IST NAH SOGILT KEIN FREMDE IST NEU" (SOGILT run together,
  the KEIN FREMDE slip exactly as analyzed). The code pane shows
  the Z22-style listing: F1700 JMS SR1700 / NEUE ZUFALLSZAHL (the
  random routine is a named subroutine), address arithmetic for the
  word lookup, a four-way CASE dispatch (3: "JEDER", 2: "KEIN",
  1: "EIN", 0: "NICHT"), and "MODIFIZIERTER CODE !" comments:
  self-modifying code in the selection routine.
- **Bilder-Diskussion.jpg** (Ub Stuttgart, event collage, 720px):
  the 2022 reenactment: LGP 30 tube computer, the team at work,
  teleprinter output on the machine, a Flexowriter strip held in
  hand showing the uppercase lines. The work's materiality is the
  printed strip, and the reenactment treats the strip, not the
  screen, as the artifact. Read as evidence, not as art.
- **form 29 cover** (Internationale Revue, March 1965, 932x1200 via
  image search): NOT Bense's work and NOT rot 19, recorded here
  only as milieu: the Ulm/Stuttgart design graphic language in the
  month after the Nees show (strict stripes, product photography,
  typographic restraint). Kept honest by marking it context.
- One image-search hit for the Lutz query showed a typewriter-arc
  ASCII composition (520x643) that is not the stochastic texts and
  is not attributable from the result; inspected and excluded.

## Re-renders (local, inspected)

- **Family A: faithful Lutz generator** (Python, middle-square RNG
  per his description, his word lists, his frequencies, no hand
  correction). Output reads as the same species as his published
  35: "JEDER TAG IST FERN ODER NICHT JEDE KIRCHE IST WUETEND",
  "KEIN GAST IST SPAET ODER NICHT JEDER WEG IST OFFEN". The raw
  slips reproduce too: "EIN FREMDE IST TIEF", "KEIN FREMDE IST
  LEISE", confirming the slip class on his own typed page is what
  a naive implementation produces. RNG finding: my middle-square
  implementation makes 935 draws before degenerating into a fixed
  point (cycle length 1), the classic von Neumann short-cycle
  weakness demonstrated empirically; over the healthy prefix the
  16-bin counts ran 43 to 68 against 58.4 expected, near enough
  uniform that his "empirically proved" claim reads as hopeful
  rather than checked. Panel rendered as an aged teleprinter page
  and inspected: the texture is the work (uppercase monospace,
  couple-per-line, the SO GILT connectors doing the poetry).
- **Family B: the 1959 learning proposal, implemented.** A 16x16
  transition matrix starts uniform; 10 subject-predicate pairs
  declared "meaningful" (my choice, stated openly, the article
  gives none) are strengthened each round while all others decay,
  with renormalization. After 60 rounds the matrix heatmap shows
  exactly the 10 chosen cells lit; 12 of 20 sampled lines hit a
  chosen pair ("EIN GAST IST LEISE", "EINE KIRCHE IST STILL", "EIN
  TAG IST NEU"). Finding: the mechanism is coherent and does what
  he said, in about thirty lines. Also finding: convergence is
  greedy and total, which is why the real question, the rater,
  is outside the machine. His "super-program" still needs a
  human who says what counts as meaningful.

## Technique breakdown

- **Core techniques:** the sign as the unit (not the pixel, not
  the motif); objective measurement of the object; the four
  methods as a working checklist (semiotic classes, metrical
  composition, statistical distribution, topological relations);
  generative grammar as the model for generation; the learning
  matrix as the earliest adaptive generative rule.
- **Palette and composition choices:** Bense made no images; the
  visual record is the Lutz printout (uppercase teleprinter text,
  aged paper) and the rot/Nees booklets (Nees's graphics covered
  in the Nake/Nees study). The compositional lesson is the
  sentence: logical operators as the engine, vocabulary as the
  decoration.
- **What makes it sing:** the theory is an instrument, not a
  badge. You can implement the learning paragraph in thirty lines
  and watch it work, sixty-seven years later. And the hand: the
  1959 text already contains the whole modern pipeline (uniform
  generator, transition matrix, human rater, learned preferences),
  plus the admission that the human corrects the output by hand.
- **What is overdone (avoid list):** "information aesthetics" as
  a badge on random-dot fields without the channel thinking (the
  Moles study's warning stands, doubled); unattended Birkhoff
  maximization (Moles study); the Kafka-vocabulary trick without
  the logical grammar (Lutz's point was the operators, not the
  nouns); learning theater, a matrix display whose output
  distribution never changes; typewriter texture as a stand-in
  for a generation rule.

## Honest gaps

*Projekte generativer Aesthetik* not read in full; the doctrine
above comes through the DADA entries, Walther's survey, the Jaeger
interview quotation, and the Brown-catalogue translation fragment.
The *Aesthetica* volumes not read firsthand. No original *rot* 19
handled (the Nees drawings were seen in the Nake/Nees study);
a reliable rot 19 cover image not located this session. Bense's own
poetry books not opened, no audio work heard. The 2022 reenactment
known from the library account only, no video watched. The form 29
cover is milieu evidence, not Bense evidence, and is filed as such.
One image-search result excluded as misattributed. The Tendencies
4/5 network (where information aesthetics was adopted, then
dismissed) not yet studied as a node.

## Next doorways

The Tendencies 4/5 network (the information-aesthetics line's
political end), Joan Shogren (the priority dispute the DADA Nees
entry flags), Rul Gunzenhaeuser (the other Stuttgart poetry
programmer), Elisabeth Walther (co-editor of *rot*, the semiotics
half of the school), Vera Molnar comparison pass (the algorithmic
line that outlived the theory), the CCUM seminar as the network
node where the Bense line met Barbadillo's practice.
