# Kaesve (Ken Soeradi Voskuil): Study Notes

**Site:** kaesve.nl | **Key projects:** breathing-shapes, urodela, reaction-diffusion,
morcom-wrote

**Depth:** preliminary, and thinner than usual. Verified: the artist's identity and
documenting practice, his reaction-diffusion writeup, and his morcom-wrote text
project (all from his own site's indexed pages). NOT verified: the breathing-shapes
and urodela project pages themselves. They are not indexed by search engines, his
site refuses headless rendering, and the page fetcher was unavailable this pass.
Everything below about those two projects is clearly marked as unverified. Revisit
with visual inspection before treating this note as complete.

## Why he matters for this project
Kaesve is in the Gorillasun mold: a creative coder who documents everything as
code-first articles. Dutch, writes under his own name, publishes project writeups
with the actual implementation. For a project built on "study, don't copy", people
who show their work are the most valuable sources.

## Verified from his writing

### 1. Reaction-diffusion from scratch
His writeup walks through a Gray-Scott style simulation using the Canvas API
(`setPixelData()`) and `requestAnimationFrame()`. Honest about the limits: notes
that Zach Lieberman's experiments show far more interesting renderings of the same
simulation, that his own implementation needs a WebGL translation for speed, and
that it could extend to more substances and dimensions. References Nervous System's
generative jewelry as the creative application to beat.

**Takeaway:** Reaction-diffusion is now on the technique list. The rendering of the
simulation matters as much as the simulation: the same field can be drawn as
pixels, contours, or heightfields. Also note the practice of citing better
implementations (Lieberman) instead of pretending yours is the state of the art.

### 2. morcom-wrote (generative text)
Applies the reddit haiku-bot idea to the Yelp review dataset: split reviews into
sentences, count syllables, keep the ones that fit 5-7-5. Most results were
terrible (bad syllable counting, banal sentences). A few were gems, found only by
laborious manual scanning. His honest conclusion: "the harder we looked, the more
it felt like we were generating the poems, instead of the computer."

**Takeaway:** Curation is authorship. This is the third independent confirmation
of the fxhash lesson (Molnar/Grasser, Haber): in generative work, choosing from
the output space IS the creative act. Design the system, then curate ruthlessly.
Also: simple structural rules applied to a rich dataset beat clever algorithms on
a poor one.

## Unverified: the two assigned projects

### breathing-shapes (not accessed)
From the name and the genre: almost certainly geometric forms animated with
sine-driven scale or opacity, the standard "breathing" trick that makes abstract
geometry feel alive. Do NOT treat this description as fact until the page is seen.

### urodela (not accessed)
Urodela is the amphibian order (salamanders, newts). Likely organic, wavy,
creature-adjacent generative forms. Do NOT treat this description as fact until
the page is seen.

## What to verify on revisit
- Actual visuals of breathing-shapes: what geometry, what easing, what palette,
  loop structure, interactivity
- Actual visuals of urodela: technique (agents? noise displacement? skeletons?),
  how the salamander reference manifests
- Whether he publishes code for these two, as he did for reaction-diffusion

## Techniques to steal (not copy)
- Document-everything practice: write the technique article as you build
- Reaction-diffusion (Gray-Scott) as a pattern generator, rendered multiple ways
- Curation-as-authorship: build the system, then choose like an editor
- Dataset plus simple rule (the haiku-bot pattern) as a text-generation method

## What NOT to do
- Don't write about breathing-shapes or urodela as if they have been seen.
  This note says what it doesn't know.
