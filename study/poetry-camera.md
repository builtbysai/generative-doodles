# Poetry.Camera (deep; 2026-09-28)

Hop from both the Kyle McDonald and Matt Richardson studies: both named
Poetry.Camera as the living branch of the word-camera lineage that Golan
Levin's experimentalcapture lecture maps out in full
(docs/conceptual-cameras.md): Descriptive Camera (2012, human captions)
to word.camera (2015, Clarifai concept words plus ConceptNet templates)
to Poetry.Camera to Neural Talk and Walk (2015, real-time neural
captions) to WordsEye (the inverse, text to image). Poetry.Camera is by
Kelin Carolyn Zhang and Ryan Mather, working out of a New York
microfactory as "Bokito Studio." It started as a 2024 open-source DIY
passion project and is now a $699 product with custom electronics. The
official line: "a new way to make memories, away from screens, notifs,
and apps." TechCrunch covered it April 2024; designboom May 2025 covered
the Limited Edition preorder (handmade, shipped September 2025). The
product is on sale now ("buy now" on the site, checked 2026-09-28).

## The piece: a camera whose only output is a poem

Point, press the shutter, and the camera prints a poem about the scene
on thermal receipt paper. Nothing else comes out. The original photo is
never printed, never saved, never stored anywhere; the FAQ is explicit
that this is deliberate, for "maximum data privacy" and because it
"feels more magical that way," and because not saving the image "reduces
the pressure of trying to look good posing for photos." The device needs
WiFi; there is no offline mode yet, though the FAQ says they want to
test one. No subscription, no app, no screen at all on the DIY build.
The product body is a red-and-white 3D-printed shell with an oversized
lens ring and a tactile shutter button, Polaroid-flavored. The printed
receipt is the whole interface and the whole artwork.

## The pipeline, from the open-source DIY code

The DIY repo (github.com/bokito-studio/poetry-camera-rpi, cloned and
read in full) shows the actual chain, which is subtler than the press
story of "GPT-4 Vision looks at the photo":

1. Shutter press: Pi Camera Module 3 captures a JPEG to disk (hardcoded
   dev path `/home/carolynz/CamTest/images/image.jpg`, left in the code,
   charming).
2. The image goes to BLIP-2 (andreasjansson's Replicate model) for a
   plain caption, NOT a vision-language poem. Two stages: vision model
   captions, language model versifies. This split is a real craft
   decision: the poem model never sees the pixels, only a sentence about
   them, which puts one more interpretive gap between scene and poem.
3. The caption is stitched into a hand-written prompt and sent to
   GPT-4 (current product uses Anthropic's Claude 4, chosen for the
   privacy terms: no training on your data).
4. The poem is hard-wrapped to 32 characters (the thermal head's width,
   384 dots) and printed left-aligned.

The prompt is where the poetry lives, and it is worth quoting nearly in
full because it is the technique. The system prompt:

"You are a poet. You specialize in elegant and emotionally impactful
poems. You are careful to use subtlety and write in a modern vernacular
style. Use high-school level English but MFA-level craft. Your poems
are more literary but easy to relate to and understand. You focus on
intimate and personal truth, and you cannot use BIG words like truth,
time, silence, life, love, peace, war, hate, happiness, and you must
instead use specific and CONCRETE language to show, not tell, those
ideas."

The banned-word list is the single most transferable idea in this
study. Generic LLM poetry drowns in abstractions; this is a hard
constraint against exactly that, enforced in the strongest part of the
prompt ("an overly hamfisted or corny poem will cause great harm").
"High-school level English but MFA-level craft" is a register
instruction most prompt writers never think to give. Then
prompt_base adds: "The references to the source material must be subtle
yet clear" (the poem should rhyme with the scene without naming it,
like the TechCrunch printout's "lukewarm coffee steers" and "the
square confines of pixel space") and "You must keep vocabulary simple
and use understated point of view."

The recipe: image to caption to constrained poem to 32-column paper.
Two-stage vision plus language, a ban-list for abstractions, register
set as a pair ("high-school English, MFA craft"), and the source
references subtle-yet-clear. That is a portable recipe for any
text-from-scene work, no training required.

## The knob: the poem is a mode, and the modes are jokes

main-knob.py reads a 10-position rotary switch as GPIO buttons and maps
each to a poem_format string passed to their hosted backend:

1. Default: "8 lines or less, ABAB rhyme scheme"
2. Haiku
3. Limerick
4. Sonnet
5. "short poem about the people in this scene. what they look like, how
   they feel, what their stories are. if there are multiple people, what
   their relationships might be to each other."
6. "short poem about the landscape, background, or location"
7. "short poem about the text described in this scene"
8. "in the style of T.S. Eliot"
9. "in the style of William Shakespeare"
10. "in the style of Emily Dickinson"

The site now shows more modes in the receipt gallery: free verse,
alliteration, "receipt" (prints a literal store receipt parodying the
medium: "Magnolia ...... $2.99 / Scent of spring ..... $14.50 / Feeling
alive again after winter ......... PRICELESS"), and "postmodern
receipts," "from the perspective of a bee," and "self-aware" as
user-configurable weirdness. The "receipt" mode is the sharpest joke in
the whole lineage: the camera's output format becomes the poem's
subject. The FAQ explicitly invites this: "Ask the camera to write from
the perspective of a bee, or print postmodern receipts, or instill it
with some sense of self-awareness."

## The receipt as an art object: typesetting craft in main.py

The printing code is careful in ways that have nothing to do with AI:

- The date/time header prints FIRST, before the network call, "to get
  printing to happen quickly & improve perceived performance." Latency
  is a material; the header is a progress bar disguised as letterpress.
- Line height is bumped to 56 for one blank line ("I want something
  slightly taller than 1 row") then reset to 32. Optical spacing, tuned
  by eye.
- Dividers are hand-set ASCII ornaments: the header rule
  "`'. .'`'. .'`'. .'`'. .'`'. .'`" and the footer rule
  "_.` `._.` `._.` `._.` `._.` `._". Mode headers on the site's sample
  receipts use dashed rules with the mode name centered
  ("------------- haiku -------------"). The TechCrunch printout
  (Apr 16, 2024, visually inspected at 1583x2074) shows an earlier
  footer variant: "a poem by @poetry.camera," vs the DIY code's "This
  poem was written by AI. / Explore the archives at / poetry.camera."
  The receipt design is still being iterated; it is a designed object,
  not a dump.
- The site's testimonial receipts print dithered portraits in the
  thermal head's 1-bit bitmap mode (Yolanda Wisher, Susan Kare, Whitney
  Chen), a direct continuation of the receipt-printer image tradition
  from Richardson's Descriptive Camera.

Re-rendered locally: an HTML page emulating the 384-dot head
(32 columns), the header/footer ornaments, mode headers, hard 32-char
wrap, and an ordered-Bayer dither for the portrait mode, using the
site's own sample poems (haiku, "receipt" joke mode). 3 receipt
columns visually inspected at 1500px. Findings: the hard wrap splits
mid-word ("magnolia bran/ches"), which the real receipts share, a
small roughness in an otherwise careful typesetter. Receipts: study
evidence in goals/generative-doodles-site/hidden_files/study-2026-09-28-poetry-camera/.

What makes it sing: the constraints do all the work. Ban the big
words, keep the vocabulary small, reference the scene subtly, print on
paper that fades. The ephemerality is the point: thermal paper yellows
and fades in a few years, so the poem is a memory object with a built-in
half-life, the opposite of a camera roll. And the knob turns the whole
thing into a toy: you do not prompt, you twist.

What is overdone: every press piece calls it "reverse AI image
generation," which is a cute phrase that explains nothing. The press
also repeats the founders' line that AI "interprets the scene," which
hides the actual two-stage caption trick and the banned-word list,
the interesting parts.

## Hop 1: Poetroid (sam1am), the folk clone

Found via GitHub search during this session: a complete independent
reimplementation by sam1am, repo cloned and read in full. The concept
is identical (camera, shutter, thermal receipt) but every engineering
choice is the opposite of the official build:

- Server/client split: a FastAPI server (`server/serve.py`, 118 lines)
  runs a self-hosted Qwen3-VL-2B vision model through llama.cpp (GGUF
  plus mmproj), no OpenAI or Anthropic API, no WiFi dependency at poem
  time. This is the direct answer to Poetry.Camera's FAQ weak point
  ("Currently not [offline]").
- Single-stage: the image goes straight into the vision model with the
  prompt, no caption intermediary. Simpler, arguably less interesting.
- The dial is a GENRE selector, not a form selector: a YAML library of
  prompts across Poetry, Comedy, Scientific, Other, Adventure, Romance,
  Fantasy, Horror, Esoteric and Strange, and Batshit Insanity, each
  ending "Respond only with the poem and nothing else." The Poetry
  category alone impersonates 20 named writers: Keats, Kerouac, Rumi,
  Whitman, Wilde, Epicurus, Plato, Lovecraft, Shakespeare, Dickinson,
  Poe, Silverstein, Seuss, Bukowski, Frost, Ginsberg, Queneau, Oliver,
  Plath, Angelou. One prompt is a personal in-joke baked into the repo:
  a New Year's Eve poem for "Melancholy, a wine and cocktail bar in the
  post district of Salt Lake City." DIY codebases keep their owners'
  lives in them.
- Opposite privacy posture: the server SAVES every uploaded photo to
  ./uploads and logs every poem to ./logs/poetroid.log, vs Poetry
  Camera's save-nothing doctrine. Worth flagging: a fork that keeps the
  ritual but drops the ethics needs a conscious decision, not an
  accident.
- The body is a lunchbox with a hand-painted Polaroid stripe, a lens
  through a painted black circle, and on top a bare PCB strip with
  three mechanical keyboard keycaps (red/teal/green) as shutter buttons
  plus the rotary knob. Device photo visually inspected at 1768x2119.
  Folk craft vs product craft; both are honest about what they are.

Takeaway for the seed file: the interesting axis is not "better model"
but "what the dial selects": form, genre, voice, addressee, or the
medium itself.

## Hop 2: Dries Depoorter's Trophy Camera, the judgmental pole

Levin's conceptual-cameras lecture places a second family next to the
word-cameras: cameras that make aesthetic judgments. Depoorter (with
Max Pinckers) built Trophy Camera for FOMU Antwerp's Braakland
exhibition, 2017, v0.95 in 2021: a camera trained on every winning
World Press Photo of the year, which only saves a photo if it grades
at least 90 percent similar to the winners' labeled patterns, and
auto-uploads keepers to trophy.camera. No viewfinder on purpose; the
OLED screen shows only the photo's grade. The camera is "disobedient"
in the opposite direction from Camera Restricta (Philipp Schmitt,
2014, which refuses to shoot in over-photographed places): Restricta
withholds the common, Trophy withholds the unexceptional.

The joke the press caught: the actual kept photos are blurry shots of
people looking at the camera at the exhibition. A canon-enforcing
machine, fed the canon, produces the canon's blind spot. Depoorter's
artist page (driesdepoorter.be/trophy-camera, read in full) frames it
as a comment on photojournalism becoming self-referential; Pinckers
told Fast Co. Design that press photography is "becoming a
self-referential medium dominated by tropes, archetypes, and
pop-culture references." trophy.camera itself was unreachable from
this session's network (curl 000, blank headless render); the
mechanism is documented via the artist page and contemporary press,
noted as secondhand.

The pairing with Poetry.Camera is the real finding: one camera
replaces the image with generous text, the other replaces the
photographer's judgment with a score. Both remove the viewfinder, one
literally (Trophy), one effectively (Poetry never shows you the
photo). The word-camera lineage is about what a camera outputs; the
judgment-camera lineage is about whether it outputs at all.

## Honest gaps

- No live poem generated in-session: no API keys, no hardware. The
  pipeline is read, not run.
- The press receipt (TechCrunch) and the site sample receipts are
  photographs of paper; the thermal head's actual dot rendering was
  emulated (Bayer), not printed.
- Trophy Camera's mechanism is from the artist page and press, not
  from running the device or seeing trophy.camera live (unreachable
  in-session).
- The product version's custom electronics and firmware are not open;
  only the DIY prototype's code is public. The hosted backend in
  main-knob.py (poetry-camera.carozee.repl.co) appears dead; noted,
  not diagnosed.
- Videos (Washington Square Park demos, build workshops) not watched.

## Next doorways

- Dan Macnish's 2018 doodling camera and Bjorn Karmann's 2023
  Paragraphica (named in the 3dprinting.com piece as the same shelf),
  both cited in the lineage but not yet studied.
- Philipp Schmitt's Camera Restricta (the other disobedient camera).
- Poetroid's server/client split suggests a local-VLM study: what a
  2B vision model actually sees vs BLIP-2 captions.
- The receipt-printer image tradition: thermal dither portraits back
  through Richardson; the Hershey stroke-font study already touched
  pen-plotter text, a natural cross-link.

Depth: deep (site full-scroll at 1100px, DIY repo read end to end,
Poetroid repo read end to end, Levin lecture read in full, Depoorter
page read in full, 3 external images visually inspected at full res:
the TechCrunch printed receipt, the poetry.camera homepage, the
Poetroid device photo; 1 local receipt/dither re-render visually
inspected).
