# Hiroshi Kawano: Study Notes

**Profile:** Hiroshi Kawano (1925 to 2012), Japanese philosopher and
aesthetician, one of the earliest computer art pioneers anywhere. Born in
Fushun, China, to Japanese parents; moved to Japan 1935. Studied
philosophy and aesthetics at the University of Tokyo (grad. 1951),
assistant there 1955 to 1961, then taught at technical colleges (Tokyo
Metropolitan College of Aeronautical Engineering 1961 to 1972 and
others); PhD Osaka University 1986. Came to the computer through
neo-Kantianism, semiotics, and finally information theory: around 1956 he
read Max Bense and Claude Shannon and saw a way to test aesthetics
experimentally. Bense's *Programmierung des Schoenen* (1960) was the
direct push; Kawano taught himself programming in autumn 1963 (assembler
first, FORTRAN from 1966). First computer graphics published September
1964 in the Japanese *IBM Review* ("Electronic Computer and Design",
pp. 53 to 57), computed on an OKITAC 5090A at the University of Tokyo
Computer Center. 1968: Tendencies 4 (Zagreb) and the first Japanese
computer art contest (Sankei Building, Tokyo). 1970: first solo show at
Plaza DIC, Tokyo (the Great Japan Ink company's hall), ten days, six
months of preparation. From 1971 he moved toward AI, computer poetry,
sculpture, and music. Archive and remaining works donated to ZKM
Karlsruhe 2010; retrospective there September 2011 to January 2012.

His doctrine, from the DADA entry quoting *Artist and Computer* (Leavitt
1976): "a computer artist should be a programmer who can teach his
computer to produce works of art by itself, and furthermore know about
the digital computing behavior of his computer in detail. It is never a
computer artist, but a computer itself that produces works of art; a
computer artist only helps his computer acting as a programmer." And the
famous inversion: do not call it computer art (a tired artist using a new
tool); call it *art computer*. From 1975's "What is Computer Art?": "as
long as art has an algorithmic procedure, a computer should be able to
have its own artistic behavior." He wrote in 2011 that it was not
artistic but scientific interest that started him: "I set out to
understand the logic of the creative process in human art."

**Depth:** deep. Read in full: Simone Gristwood's "Rediscovering Hiroshi
Kawano" (3 pp, from 2009/2010 interviews plus the ZKM archive; the key
technical source), the DADA agent entry, the ZKM biography timeline and
the ZKM *Simulated Color Mosaic* artwork record, the ZKM obituary and
exhibition texts, the Ragnar Digital history's Japan passage, the SHARQ
survey, and the Goldsmiths research PDF on *Red Tree*. Four artworks
visually inspected at full resolution: *Design 3-1* (1964, 501x500,
Mondrian palette horizontal stripe bands), the 1974 IBM System/360 gray
cell field (400x395, organic gray blobs), the *Simulated Color Mosaic*
1970/2011 ZKM reconstruction (1536x1024 install view: a ~7m band of
small colored rectangles running off the wall onto the floor,
dimensions variable), and *Red Tree* (1971/72, 304x400 via DADA: blocky
pixel masses of red, yellow, blue, black on light ground, visibly
cellular). Two PIL re-render studies built and inspected, with a false
start honestly corrected (see below).

**Core technique: the two-dimensional Markov chain.** Kawano knew Markov
models from linguistics and music and wanted to break them out of their
one-dimensional structure into visual expression. His *Series of
Pattern; Flow* (November 1964) was the prototype; the mature form was
*Simulated Colour Mosaic* (published 1969), built on what Yoshiyuki Abe
calls "a more complex quadruple Markov chain for the vertical and
horizontal directions" (quoted in Gristwood). Each cell's color is
chosen conditioned on its already-placed neighbors, left and above. The
output went to a line printer as a character map, one character per
color, and then assistants painted it by hand in gouache. Two hands,
two instruments: the machine plans, humans paint. The 1970 Plaza DIC
show credits say it plainly: Kawano did "planning, Programming and
text"; the HITAC 5020 did "design and works."

My re-render (rerender.py, evidence in
goals/generative-doodles-site/hidden_files/study-2026-10-02-kawano/)
reconstructs the plausible mechanism: a single forward scan where
P(color | left, up) gets a stickiness bonus for the neighbors' colors,
then either raw cells or greedy fusion into rectangles. Findings:

1. The naive single-pass scan IS the instrument. It produces Kawano's
look directly: coalescing color clusters, organic at high stickiness
(the *Red Tree* / 1974 gray-field family), confetti at low stickiness
(the mosaic family). No iteration needed.
2. The equilibrium alternative fails. A Gibbs-sampled Potts version of
the same field anneals to all-white (the majority phase) after ~60
sweeps. A 1969 FORTRAN program did one forward pass, not an annealer;
the quenched, single-pass character is part of the look.
3. Stickiness is the compositional dial. It interpolates between his
two families: mosaic confetti and organic blobs. One parameter, two
bodies of work.
4. Fusion is a rendering decision, not the mechanism. Raw cells give the
*Red Tree* and 1974 look (the printer grid stays visible); fusing
same-color runs into rectangles gives the 1970 mosaic look. Same field,
two finishes.
5. Correction, honestly recorded: at low density I twice "saw" strong
diagonal striping in the renders and first blamed the sampler. Measured
autocorrelation says the fields are axis-dominant (h/v joint ~0.037 to
0.040, diagonals ~0.023); the diagonals were my eye finding structure
in sparse speckle. Lesson filed: in sparse Markov fields, measure,
don't eyeball.
6. The hand step matters. My renders add a small per-rectangle value
jitter as a nod to the gouache, and even that tiny unevenness is what
separates the studies from flat digital fills. The painting is not
decoration; it is half the piece.

**The tanka thread.** January 1966: Shigeru Watanabe's Computer-Based
Art group at the University of Tokyo invited Kawano to discuss
computer-generated poetry; using Kawano's algorithm a series of tankas
(31-syllable Japanese poems) were generated. 1967: his article "The
Analysis and Generation of TANKA." Gristwood records his remark that
programming took hours but the concept, the tree-type Markov model
structure, took one or two months: "writing the program was simple,
and generating the poems was even simpler." Same Markov mind, two
media. Computer music followed in the 1970s (not heard this session).

**Palette and composition.** Mondrian's five: red, blue, yellow, black,
white, sometimes gray. But crucially WITHOUT Mondrian's black
separators. Kawano's rectangles abut directly; there is no grid holding
them apart, which is why the fields read as all-over rather than as
windows. (Claudio Rivera's line, quoted in the Beall Center press kit:
Kawano did not digitize Mondrian; he was among the first to
"Mondrianize digital art.") The 1970 mosaic's band format, dimensions
variable, frameless, walked along rather than looked at, is the
compositional move the stills understate. *Design 3-1* (1964) is the
row-wise ancestor: each stripe an independent 1D Markov chain over
(color, segment length); my stripe re-render matches its species.

**What makes it sing.** The stance: he was testing whether beauty has an
algorithmic procedure, not decorating with a new tool. The restraint:
one mechanism (neighbor-conditioned choice), one palette, and the
patience to let a single parameter carry whole bodies of work. The
two-hand pipeline: machine instruction plus human paint, with the
computer credited as the designer. The okazz_ lineage is real and
visible: the Feral File *Patterns of Flow* "Resonant Echo" family
(Mondrian-palette square fields) descends straight from this work.

**Avoid-list additions.** Faux-Mondrian generators with black separator
grids (the opposite of Kawano's abutting fields); calling any pixel
noise Kawano-like without neighbor conditioning; the all-white
annealed equilibrium (a real 1969 program never iterated there);
trusting the eye for structure in sparse fields (measure first);
technique-demo Markov mosaics with no point of view beyond "look,
Markov."

**Honest gaps.** Abe's "Genealogy of the Pioneers" via Gristwood's
quotation only; the exact "quadruple" construction not recovered (the
ZKM archive holds his programs, not consulted). No tanka output seen,
no music heard, sculptures not inspected. The 1974 IBM/360 image via the
SHARQ caption only. *Red Tree* as a 304x400 reproduction, not the
screenprint. Japanese-language sources not read. My re-render is a
reconstruction of the described mechanism, not his code.

**Next doorways.** Max Bense (named by three studies now, still
unstudied; Kawano called him the decisive impulse), Zdenek Sykora, the
Tendencies 4/5 New Tendencies network, Joan Shogren (1963, IBM 1620,
"rules of art" as the American parallel found via the Ragnar history),
the ZKM Kawano archive programs themselves.

**Seeds** 351 to 353 appended to FUTURE_PIECES.md with distinctness
checks against used and retired families.
