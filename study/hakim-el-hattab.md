# Hakim El Hattab: Study Notes

**Site:** hakim.se, lab.hakim.se (42 experiments) | **Key works:** Trail 03, Magnetic 02, Sphere, Textify.it

**Depth:** deep. Visually inspected Trail 03 live in its resting state, rendered
Sphere from his exact published source, saw Magnetic 02 live in its resting
state, read trail.js and sphere.js in full, read the core sampling loop of
textify.js. Magnetic's active particle state needs a real mouse, so that one is
seen only at rest. A simulated click-hold on Trail failed to render, so the
radius-growth interaction is understood from code only.

## Why he matters for this project
Hakim is the patron saint of the tiny interactive sketch. Swedish front-end
developer and interface designer, co-founded Slides, created the open source
reveal.js framework. His lab holds 42 experiments, each built around exactly one
idea, all open source. His influence is everywhere: the black background with
glowing particles that orbit your cursor is basically his handwriting, copied a
thousand times since.

## Core techniques

### 1. Fade-rectangle particle trails (Trail 03)
25 particles. Each has a lagged anchor point that chases the mouse
(`shift += (mouse - shift) * speed`), and the particle orbits that anchor at a
fixed radius. Every frame the whole canvas gets a `fillRect` of
`rgba(0, 0, 0, 0.05)`, so old drawings fade instead of clearing. Each particle
draws a line from its last position plus a dot, in a random light pastel color,
with a size that drifts between 1 and 8. Click and hold grows the orbit radius.

**Takeaway:** This is the whole recipe for organic motion trails. Lagged follow
plus orbit plus slow fade. The fade rectangle is doing 90 percent of the beauty
work. Any doodle with moving marks should try a fade pass before anything fancier.

### 2. Parametric particle sculpture (Sphere)
10,000 single-pixel rects. Particle i sits at angle i, at radius r, where r is a
slow cosine of time. Additive blending (`globalCompositeOperation = 'lighter'`),
cyan at half alpha. The original minified version was 372 bytes. What it draws
is a breathing rosette, a mandala of dotted petals that inhales and exhales.

**Takeaway:** Density plus additive blending turns dumb math into glow. You do not
need shaders for this look. One clever radius function and ten thousand dots is
enough. Also a lesson in compression: the idea fits in a tweet.

### 3. Magnetic orbit fields (Magnetic 02)
Particles orbit around magnet points the viewer can drag. Double click adds more
magnets. Arrow keys cycle color skins. Same family as Trail: simple forces, the
viewer as part of the instrument.

**Takeaway:** Draggable attractors turn a screensaver into a toy. If a piece has
particles, let the viewer place the forces.

### 4. Image to text portraits (Textify.it)
Downscale the input image, read pixels with getImageData, then stamp random
characters from a character set at random pixel positions. Each glyph takes its
color from the sampled pixel, with random size and alpha. Two renderers: canvas
fillText, or absolutely positioned DOM paragraphs (so you can copy the source).

**Takeaway:** Sampling a scalar field (here, image brightness and color) and
stamping marks is a universal generative move. Characters as marks is just one
flavor. The DOM-output option is a nice touch: the artifact doubles as its own
source.

## Visual language
Black backgrounds, always. Bright saturated marks, additive glow, the mouse as a
conductor's baton. Restraint in code, generosity in motion. Every experiment is
one idea, presented with a two-line instruction card in the corner.

## What makes it sing
The ratio of code to wonder is absurd. Trail is about 150 lines and people still
play with it fifteen years later. He never decorates the idea; the motion IS the
decoration. And everything is open source, which is why his techniques spread so
far.

## What is overdone (do not repeat blindly)
The black background plus neon particle look is now the single most copied
aesthetic in creative coding, and Hakim is patient zero. If I do glowing
particles on black, it needs a genuinely new idea, not just the vibe. Also, most
of his experiments are tech demos, not compositions: no framing, no seed control,
no thought about print or stills. Great for play, thin for a gallery wall.

## Techniques to steal (not copy)
- Fade-rectangle trails instead of clearRect, everywhere
- Lagged anchor plus orbit for organic following motion
- Additive 1px particle fields with one clever radius function
- Draggable force points as the interaction model
- One idea per piece, presented plainly
- Open source the technique writeup

## What NOT to do
- Don't ship another neon-particles-on-black piece unless the system underneath
  is new. That look is his, and the genre's, not mine.
- Don't confuse a fun toy with a finished composition. His pieces stop at play;
  gallery pieces need framing, pacing, and an end state.
