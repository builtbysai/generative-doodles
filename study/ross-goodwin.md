# Ross Goodwin (deep; 2026-09-27)

Hop from the Allison Parrish study: she was his ITP mentor, and the
multi-temperature seeding trick he calls his key technique came from her
suggestion. He is the other pole of the ML text thread. Where Parrish
treats language as a material to sculpt (phonemes, spellings, latent
spaces), Goodwin treats writing as an interface and the model as a
narrator of the physical world. "Data poet" is his own term. MIT
Economics 2009, former White House ghostwriter (he wrote nearly 100
Presidential Proclamations), NYU ITP 2016.

## word.camera: the camera that narrates

Two eras. Version one (early 2015, web app plus devices): the Clarifai
API to tag images with nouns, ConceptNet to find related words, and a
template system to string the results into descriptive (though often
bizarre) prose poems. Exhibited at IDFA DocLab in Amsterdam, November
2015. Version two (2016, his ITP thesis, renamed Narrated Reality): his
own trained LSTM stack, running on device.

The devices, from word.camera (page inspected full-scroll at 1280px,
zero render errors): a camera that narrates images ("a fully autonomous
and self-contained image-to-text narrator: take a photograph, and
receive expressive text related to the image in about 15 seconds"); a
compass that narrates locations (built inside a police cruiser center
console, mounted with a navigator's compass from a B-17 Flying Fortress;
it narrates your GPS locations as you drive, the wardriving idea); a
clock that narrates time (a punch clock that prints narration when you
punch in). A common platform: Nvidia Jetson TK1 system-on-chip plus a
Datamax-O'Neil MicroFlash 4T thermal printer, with neural network
"cartridges" on SD cards that slot into the Jetson. A library of
options: LSTM models trained on different source texts.

The three site photos inspected at full res. compass.jpg: the compass
rig in a wooden case, black leather grip, the big B-17 dial. guts.png:
the guts laid bare, Jetson TK1 board with camera module, the thermal
printer mid-churn with receipt paper spilling everywhere, every strip
covered in generated text. cards.jpg: the cartridge case, eight
yellow-labeled SD cards in a black wallet: TECH NEWS, SCI-FI PROSE,
SCI-FI FILM, HIP HOP, FILM CHAT, FOLK MUSIC, 2016 POTUS, ROBOT GOD.
The cartridge labels are a curatorial act: the corpus is the voice.

## The essay that explains everything

"Adventures in Narrated Reality" (Medium, Artists + Machine
Intelligence, March 2016), read end to end. This is the primary
technical document and it reads like a lab notebook. The load-bearing
details:

The origin: Karpathy's May 2015 "Unreasonable Effectiveness of RNNs"
post and the Char-RNN repo. Goodwin was initially underwhelmed (the
generated Shakespeare did not obviously beat a high-order character
Markov chain). With no GPU access he stayed on Markov chains and
grammars until NYU granted him supercomputer time in December 2015:
32 Nvidia Tesla K80 GPUs, 24GB each.

NeuralTalk2 (Karpathy's image captioner) experiments: frames plus
captions from every X-Files episode, hoping the model would generate
plausible dialogue for new images. It failed instructively: every image
got the same line, and the lines were all variants of "I don't know"
and "I'm not sure what you want." His advisor Patrick Hebron joked it
might be metacognition. Reddit image posts plus comments, and drug
photos plus Erowid trip reports, worked better but stayed uninteresting.
So he trained a straight MSCOCO model: 120,000 images with 5 captions
each, one parameter change (word-frequency threshold 5 down to 3, for
verbosity at the cost of accuracy), about five days of training, over
0.9 CIDEr, which the docs said was the ceiling.

Char-RNN text models, and the technique that matters. He seeds the
poetic LSTM with the generated image caption, then re-seeds the SAME
caption at different TEMPERATURES. His definition: temperature is 0 to
1; low gives text that is repetitive but highly grammatical; high gives
text that is more innovative and surprising (the model may invent its
own words) while containing more mistakes. Iterating temperatures on
one seed keeps the subject consistent while the language varies, and
produces longer pieces that stay cohesive. The suggestion came from
Parrish: integrate the caption throughout the piece, not just at the
start (his early long outputs drifted off-subject after a few lines).

The pre-seed trick, taught to him by Kyle McDonald: before the real
seed, prepend a paragraph of high-quality model output about
sequence-length long, to push the LSTM into a good state. Demonstrated
with the seed "The meaning of life is" on his dictionary model: without
the pre-seed the bot cannot parrot back unknown words; with it, it does.

Scale and corpora: first models 20 to 25 million parameters; then
Torch-RNN (Justin Johnson's rewrite, 7x less memory) let him train 80 to
85 million parameter models. Corpora: prose, then 19th-century public
domain poetry (too ornate), then modern poetry scraped from wherever he
could find it ("I can't go into detail on how I got all the books for
fear of being sued"), then the Oxford English Dictionary (a Balderdash
bot that defined invented words; validation loss under 0.75, his lowest
ever; its definition of "love" as "past tense of leave" was an earlier
model's), then the complete works of Noam Chomsky at 41.2 MB (it would
only talk about the US, Israel, and Palestine; he had once worked for
Chomsky as an MIT undergrad), then movie screenplays (train on
continuous dialogue and you can ask the model questions and get
plausible answers).

Hardware narrative: first a messenger-bag prototype (Intel NUC on a
laptop backup battery, ELP wide-angle camera on the strap, a rotary
potentiometer and button wired through an Arduino; Karpathy's code would
not run on a Raspberry Pi's ARM, hence the NUC). He planned to dump
output to a hacked Kindle, then chose the thermal printer instead,
because paper you can hand to a stranger on the street beats a screen
(he had done street handouts with earlier word.camera versions). 4-inch
paper printers for under $50 on eBay. He added an ASCII-art rendering of
the photo above the text on the suggestion of his friend Anthony
Kesich. Then the Jetson TK1 plus MicroFlash 4T platform with the SD
cartridge library.

The philosophy, stated twice so it sticks: "When we teach computers to
write, the computers don't replace us any more than pianos replace
pianists; in a certain way, they become our pens, and we become more
than writers. We become writers of writers." And: Narrated Reality as a
third option beside VR and AR, less visual, more about supplementing
experience with expressive narration. Nietzsche via Kittler on writing
tools working on our thoughts. The thesis advice that split one general
device into three came from Taeyoon Choi.

## Sunspring: the average of sci-fi

June 2016, with filmmaker Oscar Sharp, built in 48 hours for the
Sci-Fi London 48-Hour Film Challenge. Benjamin (first named Jetson; the
model named itself Benjamin) is an LSTM trained on sci-fi screenplays
(X-Files, Ghostbusters, Interstellar, The Fifth Element, Predator,
Solaris, and the rest of what Sharp could find online). Given the
challenge prompts, it printed the screenplay on a small printer; Sharp
randomly assigned roles to the actors in the room. The read-through had
everyone laughing. Thomas Middleditch starred.

The screenplay's stage directions are the famous part: "He is standing
in the stars and sitting on the floor." "He sees a black hole on the
floor leading to the man on the roof." "He picks up a light screen and
fights the security force of the particles of a transmission on his
face." The dialogue: "In the future with more unemployment, young
people are forced to sell blood. That's the first thing I can do."
Sharp's read on it: the screenplay is an average of sci-fi screenplays,
and that average turns out to be characters who are ever-questioning,
preoccupied with the unknown ("Then what?", "There's no answer", "I
don't know anything about any of this"). Benjamin also composed a pop
song from a corpus of 30,000 pop songs for the film's musical interlude.
Neil Gaiman's verdict: "Watch a short SF film gloriously fail the
Turing Test." Inspected a film still at full res (via the No Film
School piece): the gold-costumed actress mid-scene, warm practical
light, played completely straight, which is why the absurdity lands.

Verified 2026-09-27 against Oscar Sharp's site (thereforefilms.com,
which redirects to thereforefilms.weebly.com): the "Films by Benjamin
the A.I." page bills Sunspring as "the first film ever written
entirely by an artificial intelligence," "Written by 'Benjamin' - a
collaboration with Ross Goodwin," an End Cue production, made in 48
hours for the Sci-Fi London 48hr Film Challenge, placing in the top
10. Benjamin's second film (2017), IT'S NO GAME: "Benjamin collaborates
on a script about Benjamin," starring David Hasselhoff, Sarah Hay, Tom
Payne, Tim Guinee and Jake Broder, 3rd place. Benjamin's third film
(2018), ZONE OUT: an "attempt to have Benjamin write & act & direct &
score a film," starring "poor simulations" of the Sunspring cast,
disqualified for excessive use of existing footage. An unreleased
fourth film, Bobo & Girlfriend, is described as the first film written
with OpenAI's GPT-2, covered in Robert Downey Jr's Age of A.I. (2019).
The site links the full five-page screenplay PDF (sunspring_final.pdf;
page one blank, script on pages 2-5, the song not included), hi-res
stills, and Benjamin's song. The site carries no technical details of
Benjamin's model anywhere; it is a credits and press page, not an
engineering record. One new excerpt from the verified PDF: "He pulls
his eyes out. He throws his eyes. He pulls his eyes out."

## 1 the Road: a book written using a car as a pen

March 2017. Four days, New York to New Orleans, in a Cadillac (he
wanted an authoritative car and could not get a Ford Crown Victoria;
he worried the visible wiring would make people take him for a
terrorist). Three sensors: a surveillance camera on the trunk watching
the passing scenery, a microphone picking up conversation inside the
car, GPS tracking the location. Plus Foursquare location data and the
computer's internal clock. All of it fed into an LSTM that printed
continuously onto rolls of receipt paper. Published verbatim and
unedited in 2018 by Jean Boite Editions, typos and choppy flow intact,
because the unedited scroll was the point. The Kerouac echo is
deliberate: the original On the Road manuscript was a roll of
taped-together tracing paper. Google paid part of the cost after taking
an interest in his work at NYU. Five companions rode along (his sister
and his fiancee among them), trailed by a film crew; Lewis Rapkin
directed the documentary. The opening line: "It was nine seventeen in
the morning, and the house was heavy." The cover calls Goodwin a
"writer of writers"; the back cover: "1 the Road is a book written using
a car as a pen."

The per-period reporting detail from the Experience Magazine account:
the program periodically pinned the time and location, consulted the
Foursquare dataset, and tried to pair a literary description to what the
camera and microphone were seeing and hearing. Time plus place plus a
corpus becomes a sentence, every few minutes, for four days.

## The lineage and the counterpoint

Matt Richardson's Descriptive Camera (2012) is the human-powered
ancestor, and the comparison is the whole story of the decade. Same
ritual: a DIY camera (USB webcam, BeagleBone, shutter button), a photo
goes in, text comes out on a thermal printer Polaroid-style. Different
oracle: Richardson's camera sent each photo to Mechanical Turk, where a
paid worker wrote the description and sent it back within six minutes
(an amber LED flashed while it worked). Goodwin's word.camera keeps the
body and swaps the crowd worker for a neural net. Same object, same
paper, new ghost.

Later poles, noted for future hops rather than studied here: Please
Feed The Lions (2018, with Es Devlin, Trafalgar Square: the lions roar
poetry); co-writing the lyrics for YACHT's Chain Tripping (2020, Grammy
nominated); his role as Creative Technologist for Google's Artists +
Machine Intelligence program.

## Technique ledger

Techniques worth stealing (derived, never cloned):

1. Temperature as a compositional parameter, not a hyperparameter. The
   same seed run at several temperatures is a musical move: the subject
   holds, the risk varies. Goodwin credits Parrish for the idea.
2. The pre-seed: warm the model's hidden state with a paragraph of its
   own good output before giving it the real prompt.
3. The cartridge library: the corpus is the voice, and the voice is
   swappable hardware. Eight corpora, eight instruments.
4. The scroll as the honest format. Unedited output, printed
   continuously, typos intact. The receipt roll and the novel scroll
   refuse curation, which is what makes them believable.
5. ASCII art above the text: a low-fi visual anchor for a text output,
   so the paper carries both the seen and the said.

## What sings, and the avoid list

What sings: the output always has a body. Thermal paper you can hand
to a stranger on the street. A punch clock you punch. A compass in a
police console. A novel on a scroll of receipt paper. Like Parrish's
Mouthfeel Tuner built as an instrument, the interface is the poetics.
Second: the corpus is the art, stated outright. In Robin Sloan's
reading of him, corpus collection and processing decisions mattered more
than RNN architecture decisions. The 2016 POTUS cartridge versus the
HIP HOP cartridge is a curatorial act before it is a technical one.
Third: the constraint is always legible. You can feel the temperature
sweep in the receipts, the four days in the scroll, the 48 hours in the
screenplay.

Avoid list additions: caption-then-forget (his own documented failure
mode: the X-Files model where every image got "I don't know," and the
early drift where the caption anchored only the first lines). The
temperature trick exists precisely because the model will not hold the
subject on its own. Genre ceiling: "sci-fi in, sci-fi out" (the
critique leveled at Sunspring). The corpus sets what the model can
ever hand you; a screenplay model will never give you a western.
Paper-over-mystery: his best moments work because the rig is visible
and touchable, not because the text is mysterious. Never let the oracle
hide the mechanism.

## Local re-renders

Two procedural analogues (no model trained; char-RNN era code is fragile
to resurrect, and the point here is the mechanic, not the weights).
Both typeset as thermal receipts, his output medium, and both visually
inspected.

1. Multi-temperature seeding: a character-level Markov model over 20
   original sci-fi lines (one continuous stream, no line breaks, in the
   style of his pulp corpus prep), seeded with the caption "a man
   stands beside a compass in a wooden room" at T=0.15, 0.60, 0.95.
   T=0.15 recombines corpus phrases cleanly ("his suit radio picked up
   a lullaby from the dark"); T=0.95 drifts and repeats. Honest
   finding: on a small corpus with an order-8 model the temperature
   effect is muted compared to a real char-RNN's soft distributions,
   and the seed anchors nothing because a Markov has no hidden state
   to carry it. The real LSTM carries the seed in its state; the
   Markov just wanders. The mechanic (same seed, temperature sweep) is
   confirmed; the magic is in the state.
2. word.camera v1 pipeline: tags (simulated Clarifai output for
   compass.jpg) expanded through a hand relation map (the ConceptNet
   role), then assembled through template frames into a prose poem,
   with ASCII art of the photo printed above the text per Kesich's
   suggestion. Output: "The compass holds a silence, and the grain
   answers with evening. Under north, the compass forgets its silence
   and learns evening instead." The bizarre-but-grammatical register
   lands immediately; the template seams show, which is the honest
   difference between v1 and the LSTM version.

## Honest gaps

No model trained; the char-RNN-era LSTM mechanics here come from a
full essay read, not a run. The Sunspring film itself not watched (one
still inspected; screenplay excerpts now verified from the linked
five-page final PDF on Sharp's site rather than press quotes).
1theroad.com returned DNS resolution failures and connection resets
across three attempts in this session, so the 1 the Road account rests
on Wikipedia, the Experience Magazine piece, and the publisher's
record.
Please Feed The Lions and the YACHT lyrics not studied in this pass.
The Deep Dream VR collaboration with Jessica Brillhart, the Mike Tyka
poem-titles, and the Gray Area reading come from the essay alone.

## Next doorways

Matt Richardson (Descriptive Camera, the human-powered ancestor);
Oscar Sharp (Sunspring director, the other half of Benjamin); Es Devlin
(Please Feed The Lions); K. Allado-McDowell (Google AMI, Pharmako-AI,
the transformer-era pole of this same question); YACHT (Chain
Tripping); Taeyoon Choi (the thesis advice); Kyle McDonald (the
pre-seed); Robin Sloan (the closest reader of the essay).
