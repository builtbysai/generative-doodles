# ikeryou: GLSL particle font (and the GPU particle-typography vein)

Studied 2026-09-25 (Hans: study never finishes; this is a living source).
Depth: technique-deep. The technique was re-rendered locally in raw WebGL and
frames were visually inspected. The artist's own live demo was NOT seen this
session: no working demo URL surfaced (the Experiments listing links to the
experiment page, whose launch URL did not resolve in-session) and the Wayback
CDX lookup failed because archive.org services were temporarily offline.
Everything below about his piece's construction is reconstructed from the
listing, the period technique, and the re-render, and is marked as such.

## The artist (verified)

- ikeryou.jp is the site of 池田亮 (Ryo Ikeda), devdev Inc. representative
  director, programmer and creative coder, born 1985, based in Toyama, Japan.
  The site archives his creative-coding works on a regular cadence; motion-heavy
  web implementation is his stated specialty.
- Two entries on experiments.withgoogle.com carry his name:
  - **GLSL PARTICLE FONT**: "one million particle font"
  - **HTwist**: "Mosaic effect use ray tracing demo"
- The pairing says something about his register: GPU-heavy visual tricks,
  each experiment one sharp technical idea, presented with a one-line
  description. No manifesto, no gallery statement.

## The piece (reconstructed, not seen)

"One million particle font": a word or short string rendered as roughly a
million GPU point sprites that swarm, converge into legible letterforms, and
disperse again. The number is the point. A million particles is not a
simulation detail, it is the aesthetic: at that density the letterforms read
through *density*, not through outlines, and the in-between states (half
converged) read as weather rather than as text breaking.

## The technique (verified by re-render)

The canonical build for this class of piece, confirmed working in the local
re-render (raw WebGL, 60,000 points, zero per-frame CPU uploads):

1. **Text as a target field, not as geometry.** Render the string once to an
   offscreen 2D canvas, read the pixels, keep the bright ones. Each particle
   is assigned one text pixel as its home, with a small jitter so strokes get
   soft density instead of hard dots. The font never enters the GPU; only a
   cloud of target coordinates does.
2. **All motion is procedural in the vertex shader.** Per-particle static
   attributes (target xy, four random seeds) plus three uniforms (phase,
   time, pointer). Position = mix(scatter(seed), target, converge(phase,
   seed)). The Wikibooks particle-systems taxonomy calls this the
   "intermediate case": uniforms instead of attribute updates, full GPU,
   no ping-pong textures needed because nothing integrates over time.
3. **Staggered convergence is the whole choreography.** Each particle gets
   its own offset window inside the global phase (smoothstep over
   [off, off + 0.45], off spread across 0.55 of the phase). The word does
   not fade in; it *rains* into legibility, edges first or last depending
   on the seed distribution. This is the detail that separates the genre
   from a crossfade.
4. **Never let it freeze.** A small per-particle sinusoidal shimmer, scaled
   by convergence, keeps the settled word alive. A frozen particle field
   reads as a screenshot; a shimmering one reads as an organism.
5. **Pointer as repulsion in the shader.** pos += normalize(pos - mouse) *
   strength * exp(-d2 * k) * convergence. Cheap, no CPU, and it makes the
   letterforms feel physical: the word dents where you touch it and heals.
6. **Additive blending + soft round points.** gl_PointCoord circle mask with
   discard outside radius 0.5, SRC_ALPHA/ONE blending, warm white. Dense
   strokes automatically glow brighter than sparse ones, which is why the
   letterforms read: the rendering turns particle *density* into luminance.

What the re-render taught (frames inspected at 1280x800: scattered,
mid-convergence, settled; zero console errors):

- Scattered state: a uniform disk of fine dust, no clumps, no banding. The
  deterministic scatter from the seed hash looks properly random, which is
  the whole foundation: any structure in the scatter would read as a flaw
  once the word converges.
- Mid-convergence: the digits read through the swarm while a visible halo
  of still-traveling particles hangs around them. This is the money frame
  and it confirms the thesis: partial convergence is more beautiful than
  either endpoint, because the eye reads the word *and* the weather at once.
- Settled: crisp "1974" in warm granular white. Dense stroke areas (the
  bowl of the 9, the base of the 1) glow brighter than thin ones purely
  from additive accumulation, no extra lighting code. The letterforms read
  through density, exactly as the genre promises.
- One honest limitation of the binary-mask target field, visible in the
  settled frame: stroke edges are softly granular rather than sharp, and
  thin diagonal strokes (the 7) look slightly starved next to the fat
  bowls. More particles would not fix this; SDF targets would.

## The vein: GPU particle typography on the Experiments index

The same tag page that lists ikeryou's piece maps the whole neighborhood,
and the contrasts are instructive:

- **Maximum One Million** (Yuichiroh Arai): "Particle system by using
  GPGPU". Same million-particle register, but full GPGPU (texture
  ping-pong, state integrated in fragment shaders) rather than procedural
  vertex-shader motion. Heavier machinery, allows true simulation
  (velocity, forces); ikeryou's procedural route is lighter and
  deterministic, but cannot do accumulation or collision.
- **Text Particles** (Grumpy Buffalo): "Text is broken up into a ton of
  dots which move independently. Each dot is attracted to its..." The
  CPU-side cousin: per-dot spring physics in JavaScript. Same visual
  family, tops out in the low thousands of particles. This is the exact
  lineage of the canvas2d text-particle practice behind piece №9012;
  the GPU versions exist because the CPU version hits its ceiling.
- **Lovelymessages** (Dan Forys): "Draw and type messages that get
  transformed into animated pulsating particles." The interactive branch:
  user-drawn strokes become targets, not font pixels. The target-field
  idea generalizes: any 2D density field (font, drawing, photo) can be a
  home field.
- **GPU Text** (Isaac Cohen): "GPGPU Physics simulation using signed
  distance field text". The refined variant: sample a signed distance
  field instead of a binary pixel mask, and particles can do soft
  constraint solving (slide along the glyph edge, pile at stroke
  centers). SDF targets are the pro move the binary-mask version wants
  to grow into.
- **ShinyText** (Isaac Cohen): "GPGPU Spring Mesh being demolished by
  angry bees." Same author, playful destruction: the text is a spring
  mesh and something attacks it. Destruction as a phase, not just
  convergence.

## What makes it sing

The million-particle count is doing compositional work, not technical
showing off. Below ~10k particles a particle font reads as dots that
happen to spell; at six figures and up it reads as *material* behaving
like text. The letterform becomes an emergent property of density, and
the most beautiful moments are the partial ones, when you can read the
word through the swarm the way you read a face through rain on glass.
The procedural vertex-shader construction matters aesthetically too:
because nothing integrates, the piece is perfectly loopable and
deterministic, which is why it works as an ambient piece rather than a
simulation you watch once.

## Avoid-list

- Do not confuse particle count with quality. A million particles with a
  flat converge/diverge loop is a screensaver; the craft is in the
  stagger, the shimmer, the pointer response, the easing of the phase.
- Do not sample the text texture in the vertex shader per frame when a
  precomputed target attribute does the job. The texture-lookup variant
  is elegant but it burns vertex texture fetches for zero visual gain.
- The binary-mask target field gives chunky letterforms at low density.
  If the word must read at small sizes, SDF targets (Isaac Cohen's
  route) beat more particles.

## Doorways opened

- Yuichiroh Arai's GPGPU work (Maximum One Million; also "Illustrized",
  "Make an image look like an illustration", on the same index).
- Isaac Cohen's GPGPU text pieces (GPU Text, ShinyText): the SDF-target
  refinement of this technique.
- Grumpy Buffalo's pair (Text Particles, Fuzz): the CPU-side lineage and
  the "fuzzies that follow your mouse" interaction model.
- The full-GPGPU ping-pong pattern (Wikibooks "OpenGL
  Programming/Particle systems"): state textures + fragment-shader
  integration, the machinery behind true GPU simulation when the
  procedural route runs out of room.

## Seeds

91. **Rain Into Legibility**: the re-render grown up. A word that rains
    into readability on a loop, stagger-tuned so the reading moment lands
    like a reveal, pointer dents it, additive glow does the rest.
    Success: a stranger reads the word a full second before realizing it
    is made of dots.
92. **SDF Garden**: particle text on a signed distance field instead of
    a binary mask. Particles slide along glyph edges and pool at stroke
    centers; the word breathes instead of shimmering. Success: the
    letterforms read at half the particle count of the binary version.
93. **Demolition Phase**: the word converges, holds, then something
    attacks it (a sweep, a gust, bees). Destruction as a composed phase
    with its own stagger, then the slow rain back. Success: the
    destruction is as beautiful as the convergence.
