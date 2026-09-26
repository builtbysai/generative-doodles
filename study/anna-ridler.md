# Anna Ridler: Study Notes

**Date:** 2026-09-26
**Artist:** Anna Ridler, annaridler.com. London-based artist and writer,
MA Royal College of Art, BA English Literature Oxford. Works in the
permanent collections of the Whitney, the V&A, M+ Hong Kong, ZKM
Karlsruhe. ABS Digital Artist of the Year 2025.
**Doorway:** hop from Sougwen Chung's MEMORY (a drawing arm fed by a
memory bank of the artist's own past work): Ridler is the dataset-side
mirror of the same question. Where Chung's machine remembers her
gestures, Ridler's machines learn from archives she built by hand. Both
treat the training set as the artwork and the labour behind it as part
of the piece.

**Depth: deep.** Her site's pages read end to end (home statement,
Fall of the House of Usher I, Myriad (Tulips), Mosaic Virus 2019); her
V&A guest essay "Datasets and Decay" read end to end; the Barbican /
Google Arts and Culture story read end to end; five artwork images
visually inspected at full res (Myriad install wall, Myriad studio
close-up, Fall still triptych, Mosaic Virus 2019 three-screen install,
ImageNet Roulette result screenshot for the hop below). Two mechanics
re-rendered locally in Python/PIL and visually inspected: the Myriad
labelled-grid mechanic (240 procedural tulips, hand-style annotations,
ordered along a latent axis) and the Mosaic Virus price-to-stripe
mapping. Her GAN code is not public and the videos were not watched, so
motion dynamics are inferred from stills and her own writing. Noted
honestly.

## The founding move: the dataset is the material, not the model

Most ML art treats the model as the instrument and the dataset as fuel.
Ridler inverts it. Her line from the V&A essay: "I am aware that the
control that comes to me in this process really comes from what I do
with the dataset." The algorithms are interchangeable and often
open-sourced; the dataset is where the choices, biases, labour, and
meaning live. So she makes the dataset the artwork and puts the model
in the supporting role. Three consequences follow, and each is a
technique we can steal.

## Myriad (Tulips), 2018: a training set hung on a wall

Ten thousand photographs of tulips, taken across one tulip season,
categorised by hand, printed small, and mounted one by one with magnets
on a black magnetic wall in a seemingly precise grid. The full
installation runs over 50 square metres (a fragment is now in the V&A
permanent collection). Each print carries a handwritten label: the
colour of the tulip, the state of the flower, the stripiness of the
petal.

What the photos taught me, seen at full res:

- **The capture protocol is the composition.** One tulip at a time,
  centred, against black, stem visible. The uniformity is what makes
  ten thousand of them readable as one thing. This is the same instinct
  as a contact sheet or a herbarium plate: fix every variable except
  the ones you want the viewer to compare.
- **The grid is almost perfect, and the almost matters.** From across
  the room it is a machine-vision grid. Up close, slants and errors
  come into view: the prints were hung one by one by hand. That
  tension, precision haunted by labour, is the whole argument of the
  piece in visual form.
- **The labels do the philosophy.** Her artist notes say the labour
  that is visible is the labour of categorisation: "is it white or
  pale pink? Is it orange or yellow? Is it a bud or has it just
  started to bloom?" Something is always lost when material form is
  translated into language, and the result is always the result of the
  person choosing the words. The handwritten labels make subjectivity
  a visible layer of the work instead of a hidden one.
- **Small data is a choice.** She writes that if the dataset is too
  big the results are too good and the quirks disappear; too small and
  the model produces one or two variations over and over. Each photo
  is selected in an iterative process to get the model behaviour she
  wants. This is the opposite of the scrape-everything instinct, and
  it is the most directly usable lesson for our own practice: curate
  small, on purpose, and the model's failures become features.
- **The season sets the boundary.** Collection stopped when tulip
  season ended, not when a number was hit. A natural rhythm bounds the
  dataset instead of a target count. And the studio photo shows the
  physical truth behind it: buckets of sorted flowers on the floor, a
  black paper backdrop taped to the wall, a camera on the floor.
  Information was physical before it was a file.

The re-render confirmed the mechanic: a uniform portrait protocol plus
visible per-item annotation plus an ordering axis (I sorted by bloom
state, then hue) produces the contact-sheet readability even with crude
procedural flowers. The labels want to be handwritten; my PIL text is a
stand-in, noted.

## Mosaic Virus, 2018 and 2019: the market as a virus

A GAN trained on the Myriad dataset generates tulips that bloom on
screen, and their appearance is controlled by the price of Bitcoin. The
2018 version is a single screen showing a grid of continually evolving
tulips; the 2019 version is a three-screen installation, one tulip per
screen, thirty minutes, each flower luminous against deep black.

The mechanics, as she describes them:

- **The stripe is the signal.** The title comes from the mosaic virus,
  a real disease spread by aphids laying eggs in tulip bulbs, which
  causes the flamed stripes on petals. It made certain 1630s tulips
  rare and desirable and helped drive tulipmania. The disease was only
  identified in the 1920s; during the mania, growers tried to fake it
  by painting stripes on the ground or splicing bulbs. In Ridler's
  model, Bitcoin behaves like the virus: the higher the price, the
  more striped the petals; the lower the price, the closer to a single
  colour. One external signal, one visual parameter, total legibility.
  My re-render (five price points, sparkline beneath) shows how little
  machinery this needs: a parameter mapping is enough when the mapping
  is conceptually airtight.
- **The medium echoes the subject.** She points out that GAN training
  itself booms and busts: learning rates climb and climb, then the
  model suffers mode collapse and the rate plummets. The training
  dynamics rhyme with the speculative bubble the work is about. And
  the generated tulip is "not of a real tulip, but what it thinks a
  tulip should be, based on all of the tulips in the dataset", which
  she pairs with 17th-century Dutch still lifes: botanically
  impossible bouquets of flowers that could never bloom at the same
  time, assembled from the painter's knowledge. The GAN is a still
  life painter. That analogy is doing real compositional work: it
  explains the black background, the single stem, the reverent
  lighting.
- **Speculation as a material, with friction built in.** The
  companion piece Bloemenveiling (2019, with David Pfau) was an online
  auction of GAN tulip videos sold via smart contracts, with bots
  helping to drive speculative prices. And her site lists works
  designed to resist the market from inside its own infrastructure:
  NFTs programmed to disappear after a week, works impossible to sell
  above their original price, tokens that can only be traded at the
  hour of low tide. The constraint is the critique. This is a
  transferable move for interactive pieces: do not describe the
  system, build the friction into the interaction.

The install photo, inspected at full res: three tall screens in a dark
room, one flower each, orange bud, pink bloom, white full bloom, all
floating in black. The darkness is doing half the work. A flower on
white is a botanical plate; a flower on black is a relic.

## Fall of the House of Usher I and II, 2017: misremembering as a mechanic

Her first ML work. Two hundred ink drawings based on stills from Watson
and Webber's 1929 silent film of Poe's story, used to train a chain of
interconnected GANs. The output stills form a twelve-minute animation.
Fall II is the dataset itself, displayed as drawings. The loop goes
further: she took the GAN's output images and redrew them to make a new
training set for another version of the film, copying the artefacts and
mistakes of the model.

The technique notes that matter for us:

- **Restrict the training set, then let the model invent.** She only
  gave the model drawings from the first four minutes of the film. At
  the start, where it has reference, it is eerily good; as the
  animation progresses it has less and less to draw on and has to
  construct every frame from what it knows, so information breaks
  down. The still I inspected shows this literally: three panels of
  the title card, the first reading "THE FALL OF THE HOUSE OF USHER"
  in crude caps, the next two dissolving into ink streaks and
  blotches. Repeating and remembering leads to misremembering. The
  decay is not a failure mode, it is the narrative arc. This is a
  directly reusable structure: bounded reference, then forced
  invention, with the breakdown paced like a story.
- **The model holds up a mirror.** It learned her habits, including
  the ones she did not know she had: she draws eyes and eyebrows so
  similarly that the model confuses them; a chair appears and
  disappears across frames because sometimes she remembered to draw
  it and sometimes she did not. The training set is a self-portrait
  she did not intend to paint. For our practice: any hand-made
  dataset will contain your tics. Decide whether to edit them out or
  exhibit them.
- **Copy the artefacts on purpose.** She drew the film's light leaks
  and scratches into the training drawings, then drew the GAN's
  artefacts into the second dataset. Each generation inherits the
  previous generation's damage, Borges-style: copies of copies
  reaching "a purity of line not found in the original." The deliberate
  preservation of error across generations is the craft version of
  Chung's "poeticize error," and it is arguably stronger here because
  the errors are curated by hand each time.
- **Ink as a medium choice.** Ink is unforgiving and random; it goes
  everywhere. She chose it partly because the early GAN output was
  already watery and painterly, and partly because the fingerprints
  and accidents put traces of humanness into a digital work. Match
  your physical medium to your model's failure texture.
- **Drawing is a noun and a verb.** Her closing distinction: a GAN
  can produce a drawing, but she is not sure it can draw, the process
  and decisions. She lands on the Renaissance workshop model: the GAN
  copies and suggests, but it starts and ends with her. Useful
  framing for how we talk about our own generated work.

She also cites Claude Shannon on minimal information: familiarity with
cinema's cliches and grammar lets the viewer fill in the gaps, so
memory becomes part of the material needed to understand the work. The
viewer completes the decayed frames. Leave room for that.

## The hop: Crawford and Paglen, Excavating AI and ImageNet Roulette

Ridler's V&A essay names ImageNet directly: a canonical 14-million
image dataset whose account of "beauty" is white, western, and young,
and which labelled disabled children as "monstrous." The canonical
artistic excavation of exactly that dataset is Kate Crawford and Trevor
Paglen's *Excavating AI* (2019) and its instrument, *ImageNet Roulette*.

The mechanic: train an open-source Caffe model exclusively on
ImageNet's 2,833 "person" subcategories (proper nouns removed), put it
behind a web page, let anyone upload a photo. A face detector finds
faces, the model classifies them, and the page returns the photo with
green bounding boxes and deadpan labels: "newsreader, news reader,"
"microeconomist, microeconomic expert," and, notoriously, "slattern,
slut, slovenly woman, trollop" for a woman in a bikini, "alcoholic,
alky, dipsomaniac" for a young man with a beer, "failure, loser,
non-starter, unsuccessful person" for a child in sunglasses. I
inspected the press screenshot of Crawford and Paglen categorised by
their own project: the green boxes, the black label banners in
terminal green, the wall of training thumbnails behind them. The
interface is deliberately banal, which is why it lands.

Why this belongs in the study:

- **The label list is the medium.** Roulette's virality came from the
  taxonomy, not the model. Surfacing the hidden labels and letting
  the public run themselves through them turned an academic critique
  into a week of internet discourse, and five days after the Training
  Humans show opened at Fondazione Prada, ImageNet removed 600,000
  images across 438 "unsafe" and 1,155 "sensitive" person categories.
  The duo declared the aims achieved and took the site down on
  27 September 2019. A piece that changes the dataset it critiques is
  the strongest possible version of Ridler's friction move.
- **"To create a category is to divide an almost infinitely complex
  universe into separate phenomena."** Crawford and Paglen's line is
  the theoretical twin of Ridler's handwritten labels. Ridler shows
  the human choosing the words; Roulette shows what happens when the
  choosing was done by anonymous Mechanical Turk workers a decade
  ago and then laundered through "objectivity." Study them as a pair:
  one makes the labour visible, the other makes the laundering
  visible.
- **Consent as composition.** The essay documents that ImageNet's
  people-pictures were scraped from Flickr selfies and vacation
  photos without knowledge or consent, then repackaged as the bedrock
  of a field. Paglen's line: these images belong to "a long tradition
  of capturing people's images without their consent, in order to
  classify, segment, and often stereotype them in ways that evokes
  colonial projects of the past." For our practice: know where your
  training images come from, or make your own, which is exactly what
  Ridler does.

Honest gap: the Roulette site has been offline since 2019, so the
interface was studied from the press screenshot and contemporary
descriptions, not used live.

## What to take, what to avoid

Take:
- Make the dataset the artwork: uniform capture protocol, visible
  per-item annotation, an ordering axis. A grid of small labelled
  things is a compositional form in its own right.
- One external signal driving one visual parameter, with the mapping
  conceptually airtight (price becomes virus becomes stripe).
- The small-data doctrine: curate tiny on purpose so the model's
  quirks survive. Too much data smooths away everything interesting.
- The misremembering arc: bounded reference, then forced invention,
  paced like a story. Let the breakdown be the narrative.
- Curate your errors across generations instead of fixing them.
- Build friction into the system you critique; do not just describe it.
- Match your physical medium to your model's failure texture.

Avoid:
- Using a scraped or turk-labelled dataset unexamined and calling the
  output yours. If you did not choose the labels, someone else's
  politics are in your piece.
- Dataset-bias as a scolding poster. Ridler and Roulette work because
  the mechanism is the message, not because anyone explains it.
- Letting the model be the whole piece. Without the craft around it
  (the wall, the labels, the season, the ink), it is wallpaper.
- Giant grids with no ordering principle. The axis is what makes a
  thousand thumbnails readable.

**Seeds added:** 121-126 in FUTURE_PIECES.md (Label Wall, Virus
Price, Misremembering Reel, Taxonomy Trial, Small Data Garden, Low
Tide Market).

**Evidence:** screenshots and re-renders in
`~/workspace/goals/generative-doodles-site/hidden_files/study-2026-09-26-ridler/`
(myriad_install, myriad_closeup, usher_still, usher_gan_epoch,
mosaic_install, imagenet_roulette_result, rerender_myriad_grid,
rerender_mosaic_virus).
