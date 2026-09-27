# Sam Lavigne (deep; 2026-09-27)

Hop from the Francis Tseng study: Tseng's collaborator on White Collar Crime
Risk Zones, and the intervention pole of the thread. Where Tseng builds
simulations of worlds that do not exist, Lavigne intervenes in systems that
already run: he scrapes them, replays them, and turns their own interfaces
back on themselves. His own description of the work: "online interventions
that surface the frequently opaque political and economic conditions that
shape computational technologies." Artist and programmer, New York, teaches
at UT Austin. 67 project pages on lav.io; the throughline across all of
them is that the scrape is the medium. He even taught a class about it at
SFPC called Scrapism: web-scraping-as-art.

## Videogrep: the cut list as artwork

The most generative-relevant tool in his catalog, open source at
github.com/antiboredom/videogrep, source read end to end. It searches the
dialog of video files and assembles supercuts from what it finds. The
pipeline:

- `find_transcript` matches a subtitle file to the video by filename, with
  a format priority: `.json` (his own Vosk-generated format), `.vtt`,
  `.srt`, `.transcript` (pocketsphinx).
- The transcript is a list of timestamped cues. Search is Python regex
  over cue text, with two modes that are the load-bearing design decision:
  `sentence` (default) returns the whole cue containing the match, so
  searching "fire" yields the full line "put out the fire before dark";
  `fragment` returns just the matched word, but only works when the
  transcript carries per-word timestamps (the code guards on
  `if "words" not in transcript[0]`).
- `--padding` and `--resyncsubs` fix cut hygiene: hard cuts at cue
  boundaries clip word onsets, so you pad every clip or shift the whole
  subtitle track (his tutorial suggests 0.1s for YouTube auto-subs).
- `--ngrams N` profiles the corpus first: most common words and phrases,
  so the search term is discovered from the material, not imposed on it.
- `--transcribe` runs offline speech-to-text (Vosk now, pocketsphinx in
  v1) to generate the `.json` transcript when no subtitles exist.
- Export is not just mp4: individual clips, mpv EDL, and fcpxml/Premiere
  XML timelines, so the cut decisions can be handed to an editor instead
  of rendered flat.

The canonical pieces are all one search term run to totality: every
instance of "time" in the movie In Time, every silence in Total Recall,
grammatical patterns across 100 TED talks, Jay Carney saying what he can
tell us. The technique generalizes: any timestamped index over a corpus
plus a query language is a supercut engine. The art is in picking a query
whose totality says something the individual clips do not.

## The Zooms: zoom detection as re-editing

From his notes page "Extracting Zooming Shots From 600 hours of Police
Helicopter Surveillance Footage," read end to end. In November 2021,
600 hours of police aerial surveillance footage (mostly Dallas
helicopters, 1.9 TB) leaked to Distributed Denial of Secrets. He
downloaded all of it. His reduction idea: the corpus is mostly "aimless
wandering, an aimless looking," so filter it to the moments when
something catches the camera's attention, operationalized as zoom-ins.
The result is one hour of zooming shots. What he found: the zooms were
as aimless as the pans, mostly zooming in to nothing in particular. The
filter worked; the payoff was the absence.

The detector is open source (antiboredom/camera-motion-detector),
`detect.py` read verbatim. The technique:

- Center-crop 300x300, grayscale. Dense optical flow (Farneback) between
  consecutive frames.
- For every pixel, add its flow vector to its coordinates and measure
  distance from center before and after. `zoom_in_factor` = fraction of
  pixels whose distance from center INCREASED, i.e. the share of the flow
  field moving away from center.
- Per-frame CSV: frame number, median magnitude, median angle,
  zoom factor.
- `render.py` merges zoom frames into clips: zoom factor above 0.92
  (0.82 in the function default) AND median magnitude above 5.0, merged
  with 0.3 seconds of padding, clips shorter than the minimum dropped.
  Pans use an angle/magnitude window instead. He credits Golan Levin and
  Alexander Porter for the CV help, and notes the implementation is
  probably not ideal, which is honest and correct and does not matter.

I re-derived the core idea locally in numpy/PIL (no cv2 in this
environment, so a from-scratch block-matching flow instead of Farneback).
Synthetic 120-frame video with scripted moves: static, zoom-in 20-39,
static, pan-right 60-79, zoom-out 80-99, static. Per 8x8 block, integer
displacement by SAD search, then the away-from-center fraction test.
Detection came out at (22,40) against truth (20,39) for the zoom-in and
(81,99) against truth (80,99) for the zoom-out, and the pan was correctly
ignored. Two things the re-derivation taught me: integer block matching
needs fast motion to register (subpixel flow is doing real work in his
version), and the discriminator between zoom and pan is asymmetry, not
magnitude. A pure pan splits the field roughly 50/50 away/toward, so the
strict gate (away dominates AND toward stays low, in the spirit of his
0.92) is what keeps pans out. Timeline chart and recut contact sheet
rendered and visually inspected: the zoom-in frames visibly grow, the
zoom-out frames visibly shrink. Evidence in the session folder.

## White Collar Crime Risk Zones: rhetorical software

2017, with Brian Clifton and Francis Tseng, for The New Inquiry. The
 Ars Electronica statement: trained on FINRA financial malfeasance
incidents from 1964 to the present, using industry-standard predictive
policing methods (risk-terrain modeling, geospatial feature predictors)
to predict financial crime at the city-block level, claimed accuracy
90.12 percent. Web, iOS app, installation, risograph print. The satirical
precision of "90.12 percent" is part of the piece: it apes the exact
register of a vendor whitepaper.

Interface inspected at full res (web screenshot and riso print): a
satellite map of Manhattan under a red risk grid, midtown and the
financial district crimson; left panel with "Most Likely Suspect"
(an averaged face composited from 7,000 scraped LinkedIn photos of
finance executives: young, white, smiling, male), "Top Risk Likelihoods"
(FAILURE TO SUPERVISE 17.08%, DEFAMATION 14.23%, BUY IN TRADING DISPUTE
13.35%), and crime severity measured in USD. The risograph print carries
the same grid in red/orange over blue water on white paper. The TNI
State of Power writeup calls it "rhetorical software": criticism that
enacts its proposal rather than describing it. It worked well enough
that a cybersecurity specialist mistook it for a real police system and
denounced its bias in print, which is the piece succeeding beyond its
own frame.

The technique to steal, derived not copied: run the system's own UI on
the system's own data, at totality, with zero editorial overlay. The
indictment is in the re-framing, not in any caption.

## The Good Life: the tempo menu as composition

2016, with Tega Brain, Rhizome/New Museum commission. 225,000 emails
from the FERC's Enron archive, delivered to your inbox in chronological
order. The signup form is a Windows 95 style dialog floating over a
sunset pier photograph, and its real content is the duration menu: 30
days (16,000 emails per day), 1 year (1,370 per day), 7 years (196 per
day), 14 years (98 per day), 28 years (49 per day). The tempo choice is
the composition; 16,000 a day is a denial-of-service on your own
attention, 49 a day for 28 years is a penance. The sample email on the
site is a forwarded note about a $500-1000 campaign contribution to a
judge, utterly banal, which is the horror of it. Tabs along the dialog:
About, Intro, Enron?, The Corpus, The Bush Years, Sample Email, Search.
The retro chrome is doing comedic work that makes the archival dread
land harder.

## New York Apartment: totality as one object

2019, with Tega Brain, Whitney Artport commission. Every for-sale
listing in New York City composited into a single website: hundreds of
thousands of images, video tours, descriptive sentences, a mortgage
calculator, and 3D structures generated from extruded floor plans.
The virtual-tour renders inspected at full res (maze, highrise, tower,
pyramid): endless fields of gray extruded floor-plan walls receding into
fog, architectural massing-model aesthetic, no people, no color. The
move is aggregation to the point of absurdity: the whole market as one
impossible building you can walk through. The monochrome restraint is
what keeps it from reading as infographic.

## The Infinite Campaign: closing the loop

2017. He downloaded all the demographic categories Facebook and Twitter
use to sell targeted advertising. A program picks three at random,
overlays the text on auto-selected stock footage to make an ad-like
video, posts it, then buys a real ad campaign targeting those same
categories. Users see, in video form, the demographic categories the
platform believes describe them. The loop is the whole piece: the
targeting taxonomy becomes the content, served back to the targeted,
paid for with the platform's own ad tools. Install photo inspected: a
media wall of these auto-ads gridded at The Photographers' Gallery.

## SLOW LLM and the sabotage pieces

2025. A browser extension and DNS service that makes LLMs appear to run
very slowly, by rewriting the page's fetch function to stretch chatbot
responses over an excruciating interval. Framed as care, not prank: a
response to watching students outsource thinking to autocomplete.
Same family as Zoom Escaper / Zoom Deleter. The technique is
interception at the platform layer: you do not need the model's weights
if you own the pipe it speaks through.

## What sings, and the avoid-list

What sings across all of it is deadpan literalism. He never builds a
chart *about* a system; he inhabits the system's own interface and runs
it on the system's own data at totality: the predictive-policing UI on
FINRA data, the Gmail thread on the Enron corpus, the ad manager on its
own targeting taxonomy, the mortgage calculator on every listing in New
York. Comedy is the delivery mechanism (the Stupid Hackathon, Smell
Dating, the 28-year email plan), and it is load-bearing: the joke gets
the piece past the viewer's defenses, and then the totality does the
work. His visual signature is deliberately an anti-signature: default
platform chrome, satellite tiles, Win95 dialogs. When he does author
pixels (the NY Apartment massings), they are monochrome and restrained.

For the avoid-list: do not make data-viz-with-a-message and call it
intervention. The Lavigne move only works if you run the actual
interface, not a chart about it. Do not editorialize inside the work;
if the re-framing needs a caption to land, the re-framing is wrong.
Do not scrape without a loop: collect, then re-present through the
system's own channel (the inbox, the ad buy, the map). And do not
confuse totality with completeness: the 600 hours became one hour, the
city became one building. Reduction is the edit.

## Honest gaps

Performance videos not watched (the Zooms supercut, Infinite Campaign
excerpts, SLOW LLM demo). The ICE employee database covered from press
accounts only. Smell Dating, the Stupid Hackathon, New Organs covered
from project pages, not experienced. Videogrep's source read end to
end but not run (no transcription model fetched). The zoom detector
re-derived on synthetic video only, no real footage run, and my block
matcher is cruder than his Farneback. WCCRZ web app and iOS app are
offline; studied via the interface screenshots and the riso print.

## Next doorways

Tega Brain (the other half of Smell Dating, New York Apartment, The Good
Life, Synthetic Messenger, Offset: the environmental-engineer-turned-
artist side of the collaboration), Brian Clifton (the data scientist
behind the WCCRZ model, critical ML), Allison Parrish (cited in his
tutorial for regex; computational text, the language pole), the
Scrapism syllabus and the SFPC scene around it.
