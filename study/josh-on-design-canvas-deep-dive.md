# Josh On Design: HTML Canvas Deep Dive (deep)

**Source:** https://joshondesign.com/p/books/canvasdeepdive/toc.html
**Author:** Josh Marinacci, an old (early 2010s) but solid hands-on canvas book.
**Status:** 2026-09-19. Key chapters read in full: Animation (particle simulator),
Pixel Buffers and Other Effects (generative textures, noise, composite modes,
shadows), Real World Examples and Tools, Mobile Devices and Performance
Optimization. Key demo images (lighter blendmode, noisy checkerboard) visually
inspected. Marked deep on the technique level; this is tutorial material, not
an artist's portfolio.

## What it is

Not generative art per se, but a toolbox of the raw techniques that generative
pieces are built from: pixels as a material, additive blending, shadow glow,
particle loops, and the performance discipline that lets animated sketches run
at 60fps. Dated (Paul Irish shim for requestAnimationFrame, vendor prefixes),
but the core ideas are unchanged and the canvas API has barely moved.

## Core techniques (with generative takeaways)

### Pixel buffers as a drawing surface
- `createImageData(w,h)` gives a raw RGBA array; index a pixel at
  `(y*width + x)*4`. Loop, set color from any function of (x, y), `putImageData`.
- The book's generative-texture example: a checkerboard from
  `(floor(x/4)%2)` parity, then "dirty it up" by randomizing pixels:
  black cells get `Math.random()*100`, white cells get `255 - Math.random()*100`.
  The noisy checkerboard looks like worn paper or rough fabric. Tiny lesson:
  per-pixel randomness on top of a strict geometric pattern is a whole
  aesthetic category (grunge, aging, film grain) and costs almost no code.
- Photo inversion (255 - channel) and desaturation with the weighted gray
  `r*0.21 + g*0.71 + b*0.07` (green weighted because human eyes are most
  sensitive there). Post-processing whole compositions this way is a cheap
  finishing move: render your piece, then run one pixel pass for inversion,
  duotone, or luminance-based effects.
- Honest note from the book: JS pixel manipulation is slow; getImageData on
  big canvases per frame is a real bottleneck. Do it once at setup, or on
  small regions.

### Composite modes: the generative workhorse
- `globalCompositeOperation = "lighter"` adds pixels (clamped at white). The
  book's demo: 50 random pink circles, overlaps blooming from pink to white.
  Visually inspected: plain overlapping circles become a light-field, like
  bokeh or foam, because every overlap brightens instead of covering.
- This single setting turns boring scatter plots into glow work. It is the
  technique behind a huge fraction of "particle" art: draw many soft sprites
  additively and the dense regions self-illuminate. No gradients needed.
- Shadow effects (`shadowColor`, `shadowBlur`) do the same job for single
  strokes: a white glow behind green text in the book's demo. Expensive to
  overuse, cheap as a finishing glow on a few elements.

### The particle simulator loop
- The book's snow example lays out the canonical structure: an array of
  particle objects, and four functions per frame: create, update, kill, draw.
- Creation is throttled: new particle only every 10th tick, capped at 100.
  The gradual build-up (empty screen filling over seconds) is itself a
  composition choice; starting full looks different.
- Randomize per-particle speed, radius, position ("very simple math combined
  with a bit of carefully chosen randomness" makes it organic, per the author).
  The recycle-instead-of-kill move (reset y to 0) keeps continuous flows
  without allocation churn.
- This loop is the engine under fire, snow, sparks, starfields, swarms. Once
  it is muscle memory, every ambient animated piece starts here.

### Clearing the background (accidental vs intentional)
- The book's mistake-first teaching: forget `clearRect` and the moving
  rectangle smears into a growing bar. The fix is clearing each frame.
- The flip side the book does not say out loud: that smear IS the fade-trail
  technique. Replace `clearRect` with a low-alpha `fillRect` over the whole
  canvas each frame and motion leaves fading trails. Half of the dreamy
  animated generative pieces on the web are this one-line change.

### Performance: draw less
- The performance chapter's mantra, still correct: do not draw hidden things;
  replace unchanging vector art with pre-rendered images or offscreen canvases
  (`document.createElement("canvas")` as a cache, drawn once, blitted per frame);
  stretch images instead of redrawing; redraw only the dirty region; sync to
  the screen with requestAnimationFrame (never setInterval); pixel-align sprites
  for up to 2-3x speed on some implementations.
- For generative work the practical version: pre-render static layers (paper
  texture, grain, background gradient) to offscreen canvases once, then only
  animate the dynamic layer on top.

### Sprite sheets for flip-book animation
- `drawImage` with source rectangles flips through frames of a sprite sheet.
  Marginal for pure generative art, but useful for hybrid pieces: pre-rendered
  organic frames (explosions, smoke) played back inside a generative scene.

## What makes it sing (as a resource)

It teaches the primitive operations, not the art, and primitives compose.
Pixel buffers, additive blending, particle loops, fade trails, offscreen
caching: stack three of these and you have a piece. The book's weakness is
also its lesson: it never makes anything beautiful, which proves the gap
between technique and art is palette, composition, and restraint, the things
the other study notes cover.

## What to take from it (study, not copy)

- `lighter` composite mode as the default for any overlapping-sprite piece.
- Fade trails instead of clearRect for motion aesthetics.
- Offscreen canvas caching for static layers in animated sketches.
- Per-pixel noise over strict geometry for paper/fabric aging.
- The four-stage particle loop (create, update, kill, draw) as the starting
  scaffold for any ambient animation.

Avoid-list: pixel loops per frame on full canvases (slow); shadowBlur
everywhere (slow); the book's own examples are visually crude, which is fine,
they are drills, not pieces.
