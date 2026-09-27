# Sofia Crespo: Study Notes

**Date:** 2026-09-27
**Artist:** Sofia Crespo (b. 1991, Argentina; lives and works in Lisbon;
solo and as one half of Entangled Others with Feileacan Kirkbride McCormick).
**Doorway:** hop from the Refik Anadol study, the biomorphic pole of the ML
art question. Anadol dreams buildings, collections, and weather at monumental
scale; Crespo trains models on species and asks the machine what it thinks a
jellyfish is. Both came in through the same 2018-era scene (she got in via
a Gene Kogan workshop; he via the AMI residency), but where his lesson was
"build the room before the image," hers is "design the data before the
creature." The hop also opens the next doorway: Kogan, the teacher, for a
later session.

**Depth: deep.** sofiacrespo.com Neural Zoo project page read end to end
(the 23-image carousel opened; specimen 1 visually inspected at 1400px);
the Outland interview (Crespo and Fabiola Larios, 2023) read end to end;
the Next Nature interview read end to end (interview + both embedded
specimen images); criticallyextant.com read end to end (about, FAQ,
all 33 specimen taxonomy cards, credits); thisjellyfishdoesnotexist.com
run live in a signed-out browser, clicks sent through CDP. The site's own
preview.jpg specimen (1920x978) visually inspected at full res as the
jellyfish study image. A hybrid "specimen walk" between two procedural
organism vocabularies re-rendered locally in Python, 3 frames visually
inspected. Honest gaps: no GAN was trained here, and the live
thisjellyfishdoesnotexist generator never rendered a specimen in the
headless session (black page after two clicks; click events confirmed sent,
the generation pipeline may fetch from a backing repo that did not resolve
in-session), so its live specimens were not inspected; the Critically Extant
specimen videos were unavailable in-session (all embeds showed a removed-
video notice), so that series was studied from its page copy, taxonomy
cards, and FAQ, not its moving images; no installation or video work seen.

## The founding move: design the data, not the creature

The line from the Outland interview that unlocks the whole practice: she
"went from designing features for a creature, to actually designing the
data to let a program decide those features by itself, limiting herself to
try to anticipate what it could create." She is not good at drawing and
says so; the network is the drawing hand. What she does do, obsessively,
is the dataset: in some cases around 250,000 images per species, fed into
a GAN, then the artwork happens in the latent space, "navigat[ing] through
the representation of the learned features." The creative act moved
upstream of the image, into the corpus.

That relocation is the technique. Two consequences follow. First, the
model can only recombine what it was fed: "an AI obviously also cannot
create something if it hasn't been given an existing example. Everything
it does will always be traced back to an example it received in the data
set." The specimens are honest in exactly the way a collage is honest.
Second, the dataset carries the message. In Neural Zoo the datasets are
rich and the creatures bloom; in Critically Extant the datasets are
starved on purpose, and the creatures fail in revealing ways. Same
pipeline, opposite data, opposite argument. The data is the brush and the
thesis at once.

## The visual signature, from the two inspected stills

Neural Zoo specimen 1 (1400px): a dense biomorphic cluster filling the
frame, floating on pure black. Sea-anemone white fronds in star bursts,
pink coral branches, golden anemone domes, red sponge patches, small
pockets of cyan and amber. Nothing is one thing: every region is an
impossible hybrid of marine textures. The read from her own project copy
is exactly right: the visual cortex recognizes the textures, and the brain
knows simultaneously that this arrangement of them does not exist in
reality. That simultaneous yes/no is the whole effect, and it needs the
black void. On any other background the creatures would read as
wallpaper; on black they read as specimens, lit from inside, presented
like slides.

The jellyfish preview (1920x978): a single translucent bell centered
against deep blue water, milky white glow at the bell crown fading down
through faint internal membranes, delicate oral arms dissolving into the
blue, light rays falling from the top of the frame. Compositional
discipline that is easy to miss: one creature, centered, generous empty
water around it. The Neural Zoo images are maximalist clusters; the
jellyfish site is one specimen per frame, museum-mount style. Two
different presentation grammars from the same practice: the cabinet of
curiosities, and the specimen on a pin.

Three things make it sing: (1) the black ground, which makes procedural
or generated biomorphs read as life instead of texture; (2) the single
creature per frame with its taxonomy-style naming ({free_will_9333}
from Neural Zoo, species binomials in Critically Extant), which frames
the image as science rather than screensaver; (3) full saturation
committed everywhere, never the murky middle, so the impossible hybrids
look lit from within.

## The latent walk as medium

The Next Nature interview gives the cleanest description of what the
walk does: the network develops "a certain sort of understanding of what
the 'essence' of a particular dataset is," and the artist navigates the
latent space between learned features. Interpolation is the medium the
way paint is a medium. The jellyfish site operationalizes it as
interaction: "press anywhere on page to view a new, generated jellyfish."
Each click is a new sample. The piece is infinite but never saves; it
exists only as long as someone keeps pressing. That impermanence is
structural, not a limitation: the creature lives for one click.

## Critically Extant: misusing the model on purpose

The Times Square 2022 series flips the pipeline. Instead of the richest
dataset she can assemble, she trains on the minimal data publicly
available for critically endangered species and asks the model to
reconstruct them. The reconstructions, by her own account, "don't look
quite like the real thing," and that failure is the point: the gap
between the real animal and the generated one is a picture of the data
gap. "Why the hell would anybody do that? That's not the point of AI,"
engineers ask her; she answers that showing the limitation is the point.
Each specimen carries a real taxonomy card (kingdom, phylum, class;
33 species listed) so the viewer can feel the scientific weight of the
specimen that isn't there. It is the strongest anti-slop statement in
the ML art I have studied this month: the model's weakness, deliberately
aimed, saying something no strength could say. Anadol's lesson was that
the dataset is the concept; Crespo's is that the dataset's absence is
also a concept.

## The Codex Seraphinianus lineage

The inspiration she names, Luigi Serafini's 1981 Codex Seraphinianus,
matters technically, not just biographically. Serafini's hand-drawn
encyclopedia of invented plants and animals works because it borrows
real texture vocabularies and invents the arrangements. Her GANs do the
same thing computationally: texture truth, arrangement novelty. The
lineage gives the procedural recipe for derived work: never invent the
texture (borrow it, at full fidelity), invent only the composition.
That is also why the pieces avoid the generic GAN look. The textures
are ocean photography, not latent-space noise.

## What the local re-render taught

The study script builds hybrid specimens procedurally: coral-nodule
stems thickened toward the core, anemone filaments radiating from the
arms, fine stipple over everything, all on black, with a walk parameter
t (0.12 to 0.88) interpolating the filament/nodule balance the way a
latent walk interpolates learned features. Three frames inspected.

What worked: the radiating body plan plus two texture vocabularies is
enough to read as "a creature," which is the Codex Seraphinianus lesson
confirmed. The black ground does half the work. The middle frame of the
walk (t = 0.5) is the most interesting, which is the correct latent-walk
behavior: the hybrids between modes are the discoveries.

What did not: my stems are too clean, every arm is a visible line
segment, so the specimens read as drawings rather than flesh. Hers
carry photographic texture memory; no procedural stand-in gets that for
free. And my creatures are symmetric starbursts while her Neural Zoo
specimens are asymmetric tangles, the model's memory of how real
organisms grow. Symmetry reads as designed; asymmetry reads as alive.
The re-render confirmed the mechanism but not the materiality.

## Avoid list additions

- The GAN creature generator with no dataset story. The recombination
  look is cheap now; hers works because the dataset is designed and
  stated. A creature without a corpus is wallpaper.
- Jellyfish on black with god rays, without the sampling mechanic or
  the conservation framing. The click-per-specimen loop and the Oceana
  link are what make it a piece instead of a screensaver.
- Treating the model as a black-box oracle. Her stated aim is to
  demystify the systems: "it reminds us of ourselves," and we stay
  responsible for the bias. Mystery-of-the-machine copy is the opposite
  of her doctrine.
- The symmetrical procedural starburst. My own re-render proved it:
  symmetry reads as designed, and designed reads as fake. Real organism
  growth is lopsided.

## Next doorway

Gene Kogan: the workshop teacher from the Outland interview, the
toolmaker who opened the door for her in 2018 (ml4a, neural style
transfer for artists). The scene-around-the-tool hop, and the education
side of the ML art question.
