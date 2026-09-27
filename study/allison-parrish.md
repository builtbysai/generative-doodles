# Allison Parrish (deep; 2026-09-27)

Hop from the Sam Lavigne study: the next doorway on his list, and the
text-as-material pole of the ML thread. Where the artists studied so far
this week train models on images and cities and economies, Parrish trains
them on language and treats the result as a material to sculpt: phonemes
as a continuous space, spelling as a latent variable, noise as a creative
substrate. Computer programmer, poet, game designer, Associate Arts
Professor at NYU ITP. Brooklyn. Her portfolio (portfolio.decontextualize.com,
read end to end, 28 projects) runs from a 2007 Twitter bot to a 2026
solar-powered poetry device, and the throughline never wavers: procedures
that let her speak without having to say anything at all. That line is
hers, from the introduction to Everyword, quoted in Emily Zhou's e-flux
essay "Digging and Sinking and Drifting," which I read end to end and
which is the best secondary source on her poetics.

## Pincelate: the phonetic latent space

The load-bearing technique of her middle period, and the one most worth
understanding mechanically. Pincelate is a pair of sequence-to-sequence
RNNs (256 hidden units each) trained on the CMU Pronouncing Dictionary,
read in full at github.com/aparrish/pincelate:

- orth2phon reads a spelling and emits a sequence of phoneme FEATURES,
  not phoneme names. Each phoneme is a Kirshenbaum-style feature vector
  (32 features: blb, stp, vcd, hgh, fnt, vwl, str for stress, and so on),
  decoded with sigmoids. So "hello" becomes a 6x32 probability matrix,
  not ['HH','EH1','L','OW0'].
- phon2orth reads a feature matrix and spells it back out, character by
  character, with softmax sampling at a controllable temperature.

The expressive API is what matters, and it is all in `__init__.py`:

- `phonemestate(s)` returns the 256-dim hidden state of the spelling
  model's decoder for a word: "the sound of the word" as a vector.
  Her docstring example: the distance bug-to-rug is smaller than
  bug-to-zap. Phonetic similarity is now Euclidean.
- `spellstate(state)` spells an arbitrary state vector. Average the
  states of "artificial" and "intelligence" and you get 'intelifical',
  her documented example. The midpoint between two words is a word.
- `spellfeatures(vec)` spells a raw feature matrix, so you can hand-build
  impossible phoneme sequences and hear what they would look like.
- `manipulate(s, letters=..., features=...)` re-spells a word while
  pushing the decoded probabilities toward or away from chosen letters
  or phonetic features (probability raised to exp(n), n in about -10..10).
  This is exactly what the Mouthfeel Tuner sliders do: EEE/OOO/AHHH/ERRR
  warp the vowel axis, HARD/SOFT and BREATHY/KISS push phonetic features.

The Ten Thousand Apotropaic Variations (2020, 200 of 10,000 shown as
cut-out magic words) is the same move at its simplest: find the hidden
state of "abracadabra," add a little noise, re-spell. Noise in the
phonetic latent space, printed so you can wear it.

The Mouthfeel Tuner UI (inspected as a full GIF frame from her
portfolio): a playful instrument panel, cream background, serif type,
chunky colored knobs down the left side. "Type a phrase and play with
its sounds." Top: a text box and APPLY. Below: WARP SOUNDS with paired
sliders (EEE/OOO, AHHH/ERRR, HARD/SOFT, BREATHY/KISS, and more cryptic
pairs), plus a METER readout on the right. The whole thing is designed
like a guitar pedal for words: language as a material you play, the way
you play with an image in Photoshop. Her words, from the Google Arts and
Culture story, which I read end to end.

## Compasses: words between words

The 2019 chapbook (Sync series), honorary mention at Prix Ars
Electronica 2021. Same phonetic machinery as Pincelate, one step
further: the speller and the sounder-out are used to generate words that
live in the negative phonetic space BETWEEN real words, specifically
between the names of well-known quartets. Inspected the portfolio image
at full res: a white page, a diamond tarot spread of words in a
typewriter serif. Top: mercury. Then marciar and vercious. Then mars,
merche, venus. Then arth and eanth. Bottom: earth. The invented words
are phonetic midpoints of the planet names around them, and they read
aloud almost plausibly: "merche" sounds like a thing, "eanth" sounds
like a dialect of earth. Zhou's essay nails the layout: the four words
become forces acting on one another, and the blank page makes the
effect one of mystery, like subdivisions between zero and one.

## Reconstructions: the chiastic infinite poem

2020, live at reconstructions.decontextualize.com. The structure is a
literary figure made computational: chiasmus, ABBA. A variational
autoencoder trained on the Gutenberg Poetry corpus samples a line; the
program pairs it with a reconstruction of the same line in reverse
order, so each pair is a semantic and syntactic mirror. New pairs are
inserted BETWEEN the lines of the previous pair, so the poem nests
endlessly: ABBA, ABCCBA, ABCDDCBA. Older lines fade as they move from
the center but are never erased. Inspected the portfolio GIF frame at
full res: centered serif lines, the middle lines dark, the outer lines
dissolving into the white, new text visibly crowding the center. I
re-rendered the mechanic locally in Python with original lines (evidence
in the session folder, both frames visually inspected): the nesting
reads instantly even with crude word-reversal as the mirror. The figure
does the work, not the model.

## Articulations: a random walk through sound

The 2018 book (Counterpath Press), culmination of the phonetic-similarity
research, with a paper at the AAAI Experimental AI in Games workshop
2017. The pipeline: extract linguistic features from over two million
lines of public domain poetry, represent each line as a numeric vector
of phonetic and syntactic features, then trace fluid paths between lines
based on similarity. The first half, "Tongues," is a random walk through
this space. Zhou quotes a passage and it is worth quoting here too,
because it shows what the walk sounds like: "The judge's face was a
study, this was suggested. nancy's face was a study... singing, and
calling, and singing again, being and singing and singing and singing,
singing: singing and dancing, singing and dancing go!" Meaning drains
out and aural pleasure stays: alliteration chains, gerund runs,
repetition with drift. The cover (inspected at full res) is an
anatomical engraving of the vocal tract, which tells you the book's
real subject: the mouth, not the mind.

## Wendit Tnce Inf: asemic GAN prose

2022, letterpress edition from Aleator Press. She trained GANs on bitmap
images of random words and sampled them to make new wordforms,
pixel by pixel, then typeset the samples line by line like English
prose. Inspected the portfolio photo at full res: an open letterpress
book, blackletter-flavored serif, a title "Oa fir Tine" and lines like
"Beest ye sea oter b and arabo anile insci osi woro howr." Every
word-shape cue is right (ascenders, descenders, punctuation, capitals)
and no word is readable. It is the visual equivalent of her phonetic
work: form preserved, signification removed. The reader's eye does
exactly what it does with real prose, and finds nothing to hold.

## The solar alba generator: one watt of poetry

2026, the newest piece, and the most generatively instructive. A
standalone device: solar panel, supercapacitors, e-ink screen. It
generates albas (dawn poems, lovers lamenting the coming dawn) with a
Markov chain over a small corpus of public domain dawn poems she
collected, entirely on-device. Full source, schematics, and corpora
published. The portfolio photo shows the green PCB in sunlight and the
e-ink screen reading: "Jul 20th, '26, at 15:34. and the sun, my heart
fails, my heart fails, my blood draws back: i know those whom you
love". Typewriter serif on e-ink gray. The project statement is
explicit about the constraint as the point: what is possible in
procedural text with minimal computation, data, and energy. I
re-rendered the mechanism locally: order-2 word Markov over 30 original
dawn lines I wrote for the exercise, typeset as her e-ink page (frame
visually inspected). Honest finding: at that corpus size the chain
mostly regurgitates whole lines, one line repeating three times in
seven draws. The curation of the corpus IS the poem; the chain is just
the shuffle. Her real corpus of full poems is bigger, but the lesson
holds: small-corpus Markov is quotation with occasional seams, and the
art is in choosing what gets quoted.

## The bots and the books: the long tail

From the portfolio and Zhou's essay, the moves that repeat across
fifteen years: @everyword (2007-2014) tweeted every English word in
alphabetical order, one every thirty minutes, 100k followers, ended at
"etui"; the book version replaces definitions with timestamps and
like counts, a dictionary of the social life of words. The Ephemerides
(2015) paired NASA OPUS probe images with poems generated from two
obscure 19th-century texts (Sepharial's Astrology, Ballantyne's The
Ocean and Its Wonders): broken grammar against empty space imagery,
"as vast and contentless as what it depicts." Our Arrival (2015,
NaNoGenMo) filtered 5700 Gutenberg sentences (no human subjects, past
tense, natural phenomena) then swapped grammatical constituents between
them. smiling face withface (2015) remixed Twemoji SVGs into glitch
emoji with generated allcaps names ("SLRCKGHANSS"). Frankenstein-Genesis
(2016) blended Frankenstein and Genesis via word2vec averaging, the
semantic crossfade. The Average Novel (2017) averaged every Gutenberg
fiction file's vectors and got mostly the word "and." Drafts (2024)
uses weaving drafts as a text-composition notation: threads are letters,
the drawdown rules compose the poems, a direct bridge to the Albers
textile studies.

## What sings, and the avoid list

What sings: the latent space is always given a body. She has a classroom
rule that everyone must read their work aloud, because sound gives the
generated text a body, and every interface she builds honors it: the
Mouthfeel Tuner is an instrument, Compasses is meant to be sounded out,
the APxD (2008, a 20x4 LCD on an Atmel chip running for hours on two AA
batteries) was poetry as a portable appliance. The second thing: she
publishes the corpora and the code, so the trick is never the trick; the
curation is. The third: the constraint is always legible in the output.
You can feel the chiasmus in Reconstructions, the alphabet in
Everyword, the solar budget in the alba device.

Avoid list additions: semantic averaging without a body goes nowhere
(The Average Novel is "and and and," and she says so herself: "didn't
result in something I liked, but worth documenting"). Word2vec blending
without curation produces textual debris ("keyloggers," "helluva" in
Frankenstein-Genesis); the debris is only interesting when the endpoints
are well chosen. And: never let the model be the subject. Her pieces
are about spelling, sound, dawn, space probes. The model is the
instrument, never the poem.

## Honest gaps

No model trained in this session; the Pincelate mechanics come from a
full source read, not a run (tensorflow 1.15 era, noted as fragile to
install). The live Reconstructions page was not watched in motion; its
look comes from the portfolio GIF. The Nonsense Laboratory interactive
was not run. No videos watched (talks at Strange Loop 2017, PyCon 2020,
Iterations 2021 all noted but unseen). The Ephemerides and smiling face
withface visuals come from Zhou's essay descriptions, not direct
inspection.

## Next doorways

Tega Brain (still open from the Lavigne list, the collaborator hop);
Darius Kazemi (NaNoGenMo, Feel Train, Content Forever); Ross Goodwin
(word.camera, 1 the Road, the other pole of ML text art); Nick Montfort
(curated her APxD, platform-studies lineage); Jhave Johnston (ReRites,
human-AI poetry collaboration); K. Allado-McDowell (Pharmako-AI).
