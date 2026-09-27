# Darius Kazemi (deep; 2026-09-27)

Hop from the Allison Parrish study: she built the more advanced Context-Free
GenGen on top of his simpler GenGen idea, and both of them are infrastructure
people for the same bot-making culture (Bot Summit, NaNoGenMo, Feel Train).
Where Parrish treats language as a material to sculpt, Kazemi treats culture
as a machine with inputs you can jam. He is the internet artist Tiny
Subversions, co-founder of the Feel Train creative technology cooperative,
founder of NaNoGenMo (2013), and, before all of that, a game data analyst:
2005 to 2010 at Turbine in Boston, five years turning MMO telemetry (Dungeons
and Dragons Online, Lord of the Rings Online) into dashboards for designers.
His bots are the same job with the company removed: build a small machine,
point it at a cultural corpus, publish what comes out.

## The doctrine

His 2014 talk "Strange Bedfellows" (MITH Digital Dialogues, full transcript
read end to end) is the mission statement. A few load-bearing ideas:

**Composition over critique.** He borrows Bruno Latour's compositionist
manifesto: critique is a sledgehammer (good for clearing debris), but you
cannot repair, assemble, or stitch together with it. His alternative is to
build functioning objects that make arguments: "much of what I do is just
noticing patterns in how people communicate in digital media and figuring out
how to replicate that and send it back out in the world." Ian Bogost's
"carpentry" is the same idea; Kazemi cites Bogost's Alien Phenomenology in
the Metaphor-a-Minute postmortem.

**No correlation between effort and impact.** "I firmly believe that there is
almost no correlation between how much work [goes] into something and whether
or not it will make an impact." Museum Bot took 45 minutes and outran the
book he spent a year writing. So he ships fast and keeps expectations low:
"There’s a guy, Jonathan Mann, he does a song a day... much like me not even
close to a majority of his stuff is a big hit... probably about the same hit
rate, about one out of every fifteen things that we make gets some kind of
response." He wrote a blog post called "Thoughts on Small Projects" on the
subject. The practical rule: "I decide that they’re finished and I just put
them out there."

**Analysis turned generative.** He likes taking tools built for
decomposition and flipping them: "You can use a regular expression as a
generative tool." Feed a validation rule into a generator and it spits out
everything the rule would accept. Two Headlines is exactly this move applied
to a lazy joke format: "This was me looking at a lazy form of joke on
Twitter and going, 'I could parameterize this and just generate this joke
forever.'"

**Ethics are part of the artwork.** The Metaphor-a-Minute postmortem (June
2012, read end to end) is the origin story of `wordfilter`, his npm module.
The bot posted a homophobic slur from Wordnik's randomWords endpoint; he cut
a 458-word kids-chat-room blocklist down to about 30 words plus 15 of his own,
scoped to "oppressive words" (racist, sexist, ableist) rather than profanity
("I certainly didn’t want hackers and dominatrices and porn excluded from
what @metaphorminute could talk about!"). Later, Two Headlines got a
probabilistic gender-name check after swapped headlines kept producing
transphobic jokes. He treats corpus choice, annotation, and "who gets to be
in the audience" as part of the piece, not cleanup after it.

**Bots all the way down.** In May 2012 Twitter's automated anti-spam system
suspended Metaphor-a-Minute as a serial-account violation; it took a week of
appeals to restore. "I created a poet. Someone else created a police
officer... All of this (minus the last minute intervention) played out
because of nonhuman objects interacting with one another."

## Two Headlines (full historical index.js read)

The mechanism is three lines of intent: scrape Google News category pages;
pick a topic; pick a headline containing that topic's name; replace the name
with a topic drawn from a *different* category; retry if the literal
replacement fails. Then it posts hourly. The whole joke is that headline
grammar is a slot grammar: "Manchester United cuts prices on organic
produce" is funny only because the swap preserved the editorial syntax
perfectly. I re-rendered the mechanism locally with my own placeholder
corpora (two categories, six outputs, seeded RNG, screenshot inspected):
"Manchester United cuts prices on organic produce" and "Usain Bolt unveils
electric pickup for 2027" both land exactly like his bot's output.

Why it sings: the swap rule is brutally simple, so every output is legible,
and the corpus (real news) does all the heavy lifting. What is overdone:
the hourly cadence on an identical template eventually reads as the same
joke wearing different hats; the real bot lived on the freshness of the
news cycle, which is not reproducible in a gallery piece.

## Content, Forever (code read end to end, run live, visually inspected)

The piece: you give it a topic and a reading duration, and it generates a
meandering essay by walking Wikipedia, link to link, James Burke's
Connections (1978) style. The algorithm: take the seed article, collect the
first five paragraphs that contain internal links, pick one at random, take
the first sentence, follow a random link out of it, print the sentence, and
repeat. It handles redirects, disambiguation pages, stubs, and zero-outgoing-
link articles. Ten passages per requested minute (300 wpm, 30 words per
passage).

The drafts.html process page (Dec 2014, read in full) is a 21-draft lab
notebook and it is the best document in this study: v4 followed the first-ish
link and got stuck looping on Greek word roots ("very similar to the
Wikipedia philosophy phenomenon"); v8 picked any sentence and meandered too
much; v11 constrained to the first five link-bearing sentences so every hop
lands in the overview section and each paragraph stays "atomic"; v18 was
pure robustness ("when I hit an error it was more likely a problem with a
Wikipedia article than a problem with my code"); v19 added the user-settable
topic and length at his wife Courtney Stanton's suggestion ("She has good
ideas"); v21 added Medium-like styling with the doctrine quote: "The most
important thing you can do with generative content is give it some kind of
context, no matter how subtle."

I ran the live page (still up at tinysubversions.com/contentForever) with
topic "Tomato", 1 minute, through a headless browser. It produced 10
paragraphs titled "What Can We Learn From Tomato?", walking from tomato
domestication to electroreceptive fish to cladograms to algorithms to
benchmarking to semaphore flags to coin flips to absolute deviation, then
"The End." Visually it is plain by design (unstyled narrow column, serif,
headline plus paragraphs): the piece is the text and the concept, not the
page design. The meander genuinely works because every paragraph is a real
Wikipedia first sentence, so the essay reads earnest at the sentence level
and absurd at the document level.

## Glitch Logos (artwork visually inspected)

From his project description and the Fast Company piece: the bot takes the
SVG vector data of corporate logos and randomly perturbs coordinates, rather
than the usual glitch-art move of corrupting raster bytes. "Glitch in the
pieces, not the pixels," as the technique deserves to be summarized. A
presidential seal can lose its beak. The semantic power comes from
recognizable components being displaced, removed, or recombined: the
Starbucks siren's face separating cleanly from its head is the canonical
image.

I inspected the AND Festival project page at full res (1280px, hero image):
the glitched Starbucks mermaid is exactly the technique in action. The
siren's face lifts away from the hair mass as a separate black shape, the
"COFFEE" banner is sliced and doubled, and the whole right side of the badge
shears off into a detached black slab. The piece was part of The Art of Bots
showcase (Somerset House, April 2016), a UK-focused series; Allison Parrish's
Smiling Face Withface (glitched vector emoji) was the direct inspiration.

I also re-rendered the mechanism locally on a mock vector badge (seeded RNG,
four jitter levels plus whole-shape drops, screenshot inspected). The honest
finding: there is a sweet band. At jitter 6 the logo stays uncanny (dented
ring, wandering star point, sheared banner), which is where the Starbucks
piece lives; at jitter 22 it degenerates into an unreadable blob. The
technique needs restraint to stay a logo.

## The small machines

**GenGen** (landing page plus the full 1.9KB app.js read): paste a published
Google Spreadsheet URL and get a slot-based text generator. Each column is a
choice set (uniform random, nulls rejected); single-item columns stay fixed;
Title and Author columns are special-cased; every generator gets a shareable
link. It links outward to Parrish's Context-Free GenGen for power users. The
doctrine here: the spreadsheet is the user interface, so anyone who can make
a table can make a generator. Publishing source code "doesn’t help 99.9% of
people," he says in the talk; this is what actually lowering the bar looks
like.

**NaNoGenMo** (2013 README read in full): write code that generates a novel
of 50,000 words or more in November, then share the novel and the source.
"Novel" is deliberately defined as broadly as possible; the definition
("50,000 sequential words") is itself the joke and the provocation. In the
talk he calls it "my loving jab at NaNoWriMo."

**Random Shopper** (from the projects archive and the talk intro): a bot that
spends $50 of his real money on Amazon each month buying him random things,
which are really bought and really shipped. The commitment of real money and
real shipping is the entire artwork.

**Museum Bot** (from the talk): after the Met released 400,000 open images,
he built "the most boring possible degenerate case" (random item, tweet it)
in 45 minutes as a throwaway. It became one of his most popular pieces,
because random sampling teaches curation by contrast: "What’s on display at
the Met is nothing like what a true random sampling of items in the Met’s
catalog is."

**Last Words** (from the talk): scraped the last words of executed Texas
death-row inmates, filtered for "love." A 45-minute lunch project, later
used in actual anti-death-penalty workshops. "I have this weird set of data...
'I'm done. That's it. It's done. Ship it.'"

## What makes the work sing

1. **Corpus choice is the composition.** Two Headlines is three lines of
swap logic; the news is the material. The art is in picking Google News
categories, or Wikipedia, or the Met's back catalog, and then letting the
machine run with almost no further shaping.

2. **Tiny rules, legible outputs.** Every mechanism can be explained in one
sentence, and every output shows the rule working. The simplicity is the
aesthetic: nothing is hidden behind complexity.

3. **The annotation is part of the art.** Gender checks, oppressive-word
filters, redirect handling, disambiguation: he writes about all of it as
design decisions, publicly, and the pieces are better for it.

4. **Ship rate as method.** 224 projects in the archive, 2009 to 2026. The
1-in-15 hit rate philosophy means the failures are cheap and the practice
compounds.

## What is overdone, honestly

The bot format peaked for him around 2012 to 2016, and the template shows
its age: several projects are "random X, post it hourly" with the corpus
doing everything. The Twitter-bot-as-artwork pipeline also depended on a
platform era (open APIs, reverse-chronological feeds) that no longer exists;
Two Headlines' original code scraped Google News pages that would not parse
today. And the "45 minutes" framing, while philosophically load-bearing, can
read as a shield against criticism of thin work. Some of the 224 projects
are thin.

## Gaps in this study

- Fast Company's Glitch Logos article was CAPTCHA-walled (bot detection),
so I have the technique from his own descriptions plus one inspected
artwork (the AND Festival Starbucks piece), not the full series of outputs.
- Metaphor-a-Minute, Sorting Bot, and Spinny Machine were read about but
not run; the X sign-in wall still blocks the hashtag studies from the queue.
- The projects archive (224 entries) was parsed, not read entry by entry.

## Seeds for future pieces

- **Vector-coordinate glitch on an original mark.** Not a corporate logo:
draw an original vector emblem (a seed packet, a bus ticket, a diner menu
badge), then perturb coordinates within the sweet band (small jitter,
occasional whole-shape drop). The technique is his; the mark is ours.
- **Headline transplant with honest syntax.** The Two Headlines swap rule on
a non-news corpus: seed catalogs, museum labels, error messages. One noun
slot swapped across categories, grammar preserved, output as a broadsheet.
- **Random-walk essay with our own atlas.** The Content, Forever walk (first
sentence, random link, overview-section constraint) over a hand-built corpus
of, say, 60 short articles. The meander works because each hop is real text;
a closed corpus makes it a book instead of a browser.
