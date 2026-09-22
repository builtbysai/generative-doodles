# TGAM interviews + Responsive Dreams festival — deep study

Studied 2026-09-22. 8 interviews read in full (6 from tgam.xyz index, 2 more via the
fxhash articles TGAM points at). Companion to tgam.md (org + Issue exhibitions).
All interview texts are on tgam.xyz except where noted; artwork images inspected
locally from downloads.

## 1. Andreas Rau — "A casual chat with Andreas Rau"

URL: https://tgam.xyz/interview/a-casual-chat-with-andreas-rau
(Issue #04 Intersection)

**Who / background in one line:** Jazz pianist turned interaction designer turned
generative artist, based in Norway; works fx(hash) long-form series (Loom,
Elevation, Toccata) plus pen plots and CNC-milled wooden pieces.

**Toolchain / techniques (specifics):**
- Started in Processing; now browser-based long-form (JS) on fx(hash)/Hic Et Nunc.
- Physical outputs via pen plotter and CNC mill (series "Longing", wooden reliefs
  carved with generative toolpaths, documented at andreasrau.eu/longing).
- Textures central: "Loom" is a study of woven texture and color; "Elevation" grew
  out of a rendering bug that became the core texture algorithm.
- Audiovisual collab "Toccata" with Marcelo Soria-Rodriguez: visuals and sound run
  as independent layers, loosely coupled rather than visualization/sonification.
- Compositional rule: start from a simple grid, improvise on it like a jam session;
  iterate until the series holds together in print.

**Key process ideas:**
- "It's always a dialogue, a dialogue between myself and the machine." He compares
  iterating with a system to a jazz jam session: do something, get an unexpected
  response, respond to that.
- Bug-to-feature as method: Elevation's signature texture "came from what
  initially was a bug. I decided to keep this bug and actually to push it a bit
  further and make it into a feature."
- "Artistic expression comes down to 90% observing" — textures in humble materials,
  people in public spaces, nature in Norway.
- On blockchain-native art: his first NFT ("This one is for you") used the
  collector's wallet address as the seed for palette and features, so each edition
  is unique to its owner. Cites DEAFBEEF's "Entropy" (appearance changes with the
  number of wallet transfers) as the model for art that uses the chain as a medium,
  not a container.

**Artwork seen:** Loom #1 — Bauhaus-style weaving study: horizontal weft bands of
varying heights over a faint warp grid, muted palette (dusty rose, slate blue-grey,
brick red, ochre, black on warm cream), visible grain like a textile scan. Some
bands are solid blocks, others thin striped weaves. Reads as a loom study and a
Suprematist composition at once.

**Piece seed — "Weft Accident":** a loom simulation (warp grid + weft rows drawn
in a textile palette) where a deliberately kept bug corrupts some weft rows —
skipped threads, bunching, dye bleeds. Distinctness: the bug-as-composition-engine
idea, and a true weaving model, is unlike anything in the current sketchbook
(Strata Break is geology, Three Shapes is geometry, Mai Menochot is grain).

## 2. DEAFBEEF — "A casual chat with DEAFBEEF"

Text source: https://www.fxhash.xyz/article/tgam%3A-a-casual-chat-with-deafbeef
(TGAM page only hosts the images; Issue #06 Input Output)

**Who / background in one line:** Anonymous generative audiovisual artist; started
the DEAFBEEF project in 2020 (hexspeak moniker), making sound and animation in
self-contained C code small enough to store on-chain.

**Toolchain / techniques (specifics):**
- Everything in ISO C99, no external libraries, compiled with a plain C compiler
  on an old laptop (a 2012 MacBook Pro running Linux at the time, emacs as editor).
- Output: uncompressed WAV and BMP written to disk — "numbers representing sound
  intensities and pixel intensities." A mathematical description of a system,
  minimal dependencies so it survives decades.
- NOT real-time: "I have to run the program, and later evaluate the resulting
  sound/animation. I prefer that it is not realtime. I think of it like composing,
  rather than performing."
- Series named like systems: Series 0 Synth Poems, Series 3 Entropy, Series 4
  Glitchbox, Series 5 Advection.
- Influences: roguelikes (procedural level generation was his first contact with
  generative systems), games and music, not the visual generative-art scene.

**Key process ideas:**
- "Learn how a system works, for example, the physics of sound... The physics of
  sound and the math that describes it doesn't change; that knowledge is with you
  forever... The rest is just noise. There's a lot of noise these days, learn to
  filter it."
- On-chain storage as carving in stone: compact self-contained code has a small
  memory footprint, so it fits the chain; but "it speaks more to the culture than
  as a practical means of digital conservation."
- "I like art that has layers to it, can be interpreted or appreciated at many
  different levels whether they be visceral, craft/technical related, or heady
  conceptual. I also like humor."
- Works must resonate with himself first; but the chain adds "the hyperconnected
  loop" between artist and audience.

**Piece seed — "Compose, Don't Perform":** render a whole algorithmic sound
composition (ADSR envelopes, oscillator stacks) as one static visual score: each
voice drawn as its waveform over time, stacked like strata, with the actual math
(gain curves, phase offsets) visible as annotations. Distinctness: a
sonification-in-reverse (math of sound drawn as image), and it borrows DEAFBEEF's
"composition over performance" discipline — no animation, one decisive render.

## 3. riiis — "A casual chat with riiis"

URL: https://tgam.xyz/interview/a-casual-chat-with-riiis
(Issue #04 Intersection)

**Who / background in one line:** Developer (ex mobile apps) and photographer from
Ukraine; fx(hash) artist behind the dithered-mountain series "peaks" and the
long-form "to ma · & toma".

**Toolchain / techniques (specifics):**
- Core technique: a broken/rebuilt dithering algorithm (inspired by a Coding Train
  video on the dithering used in image compression). "I've broken it and tried to
  recreate it, and it started to produce this kind of glitch that some people
  think looks a bit like cellular automata, but it's not."
- Early-PC/Game Boy aesthetic: limited palettes, pixel brutality, inspired by Kim
  Asendorf and by the Game Boy / "Return of the Obra Dinn" shader look.
- One algorithm iterated hard: "I try to put more into the system to make a
  difference in the outputs... until I start to see something in the output, for
  instance it starts to look like mountains or at least peaks."
- Titles as emoji sequences (⍉ 🪡 ☵ 🌊 ❏ for "embroidered water"); burn-to-redeem
  mechanics for collectors.

**Key process ideas:**
- Iteration as discovery: play with the algorithm, add to it, and stop when you
  start seeing something ("it starts to look like mountains"). Minimal planning —
  "I don't plan, it's not natural for me."
- The emotional channel: "to ma · & toma" ("to my mother", to his grandmother who
  raised him) turned the war reaching his family into the work; viewers read skull
  graveyards and bullets into outputs he never planned.
- Display control: pixel-dense screens ruin his dither work, so physical events
  matter — "I cannot control how my work can be perceived... the only way to
  control it is to show the pieces the way that I'd love to perceive them myself."

**Artwork seen:** peaks #4 — stippled mountain landscape on off-white: magenta
stipple density forms peaks and diagonal flow hatching, with a few bright-green
dithered dots as accents (one like a sun, one half-clipped at the edge). The
broken-dithering texture is unmistakable — somewhere between newsprint halftone
and cellular automata.

**Technique re-rendered locally:** a side-by-side study (clean Floyd-Steinberg
vs deliberately wrong diffusion weights + a drifting threshold) confirms the
signature riiis describes. Clean dither gives a smooth stipple gradient; the
broken version produces directional streaking and cellular-automata-like banding
— "some people think it looks a bit like cellular automata, but it's not." The
bug IS the texture. Local render at /tmp/study_threads/dither.png.

**Piece seed — "Glitch Dither Peaks":** generate synthetic terrain (layered noise
ridges), render it through a deliberately broken error-diffusion dither in two
spot colors plus one acid accent. Distinctness: the piece is the ditherer itself —
a renderer seed, not a subject seed; nothing current in the sketchbook treats the
rendering algorithm as the artwork.

## 4. Thomas Lin Pedersen — "A casual chat with Thomas Lin Pedersen"

URL: https://tgam.xyz/interview/a-casual-chat-with-thomas-lin-pedersen
(Issue #03 Red Pill)

**Who / background in one line:** Danish software engineer (RStudio/Posit graphics
stack, data viz tooling) turned generative artist; ArtBlocks Curated "Screens",
Bright Moments London show "Imprecision".

**Toolchain / techniques (specifics):**
- Day-job tools first: R and his own data-visualization graphics stack ("data
  visualizations and generative art is kind of two sides of the same coin, you are
  drawing lines in the end"). Forced into JavaScript/WebGL by ArtBlocks' browser
  requirement.
- Process: texture pipeline first ("How can I enable a texture or get a pipeline
  that enables the texture I want"), composition second.
- Watercolor simulation + hyper-precise geometry: "how can you juxtapose this
  capability of the perfect with something more analogue and prone to random
  behavior" — the Bauhaus/Kandinsky/Suprematist line, executed with bleed and
  granular analog texture ("Screens" channels silk-screen/riso print aesthetics).
- Long-form thinking: not 1000 iterations of one idea but "a system that is more
  than just a single idea, it becomes the essence of a whole body of work."
- Path: food science grad student → biotech/bioinformatics → software engineer →
  artist. "I've been extremely lucky multiple times during my career and I
  continue to be extremely lucky... it is so important to keep that in mind."

**Key process ideas:**
- "Knowing the answer is the killer of creativity" — don't hand people a finished
  system to tweak; build your own from scratch so the exploration is yours.
- Composition from photography: "a lot of generative art is not as dynamic in its
  composition, it's usually something centered in the middle or a pattern... how
  can we create a system that is in some sense minimally controlled but still
  tries to end up with engaging compositions that are not repeating themselves?"
  Steering with a light touch: start with complete randomness, analyze what
  emerges, remove what doesn't work without killing the system's freedom.
- Slow reveal: for the London show, mints were revealed only as they exited a
  giant printer, screen-free — forcing viewers to focus on details before knowing
  the whole piece.

**Piece seed — "Watercolor Geometry":** crisp vector geometry (Bauhaus
arcs/bars/circles) drawn first, then a watercolor-bleed pass that softens only the
edges — pigment pooling, irregular boundaries, granular paper grain over the
precise shapes. Distinctness: the precision-vs-bleed tension is its own subject;
current pieces are either clean geometry or full texture, never both in conflict.

## 5. Ryan Bell — "A casual chat with Ryan Bell"

URL: https://tgam.xyz/interview/a-casual-chat-with-ryan-bell
(Issue #03 Red Pill)

**Who / background in one line:** Las Vegas software engineer (front-end lead),
musician/composer, Tezos generative artist ("Fragments of a Wave", "Microgravity",
"Dreamcatcher Forest", collab "Antiflow" with Frank Force / Killed by a Pixel);
ran live minting galleries at Art Basel.

**Toolchain / techniques (specifics):**
- Plain JavaScript/TypeScript base, a few personal starter templates; brings in
  specialist libraries per project — e.g. a perceptually uniform color library
  (near-perfect brightness/chroma separation, used in "Microgravity") instead of
  p5's RGB/HSB.
- Obsessions: cellular automata ("I went in deep just writing all kinds of random
  cellular automata with different rule sets"), fractals/Mandelbrot, simple
  programs with infinite depth — sparked by Wolfram's "A New Kind of Science"
  and a summer school with Wolfram himself.
- Generative audio experiments: tried to synthesize audio in-browser by hand
  (44,100 amplitude calculations per second per channel × oscillators × voices —
  "the browser crashes"), pivoted to a probabilistic sampler/sequencer driving
  recorded analog synth patches.
- Range: "Microgravity" = hyper-complex abstract fractal math; "Dreamcatcher
  Forest" = illustrative nature scene with flowing leaves.

**Key process ideas:**
- Invent tools to solve technical challenges, and the visuals fall out: "my
  process [is] inventing new software tools to solve interesting technical
  challenges which yield colorful, sophisticated visual forms."
- Know when to stop: "Often if I keep going past that point I'll just end up
  making it worse... So it reached that point where I was like alright, this is
  it let's just release it." ("Fragments of a Wave" was uploaded at 2am and sold
  out overnight.)
- On recognizability: he deliberately explores widely rather than repeating one
  vibe — "I just really like trying different things" — and trusts a personal
  origin to show through.

**Piece seed — "Two Equations Deep":** a cellular automaton (or iterated complex
map) from a genuinely tiny rule set, rendered in a perceptually uniform color
ramp (OKLCH) with a slow zoom into its infinite depth. Distinctness: extreme
constraint (a few lines of rule code) + scientific color space as the aesthetic
engine — no current piece uses CA or perceptually uniform ramps.

## 6. Pawel Dudko — "Responsive Dreams: Pawel Dudko"

Text source: https://www.fxhash.xyz/article/responsive-dreams%3A-pawel-dudko
(TGAM page only hosts the images)

**Who / background in one line:** PhD in Arts, MSc Eng in Architecture, ex-lecturer
at Bialystok University of Technology; Polish artist working interactive/generative
art, 3D printing, and multimedia installations on the virtual/physical edge.

**Toolchain / techniques (specifics):**
- Started generative 3D in Processing (~2015) to design objects FOR printers; then
  generated raw G-code directly (visualized only in external software) — the
  algorithm as machine instructions, not as a 3D model.
- WebXR + Three.js for phone-based AR experiences; custom orientation scripts
  reading gyroscope data (his "greatest coding challenge": rotation math fused
  with device sensors). Phone as "an aperture in physical reality."
- Ordinals/Bitcoin work with demoscene discipline: full HTML+JS in 7–11 kB, no
  external libraries (Gleam 7197 bytes, Rays 10.5 kB, MemFlux 10.9 kB, VanillaJS +
  WebGL), traits derived from the transaction hash.
- "re.flex.ions" (Responsive Dreams): hundreds of points in space placed by two
  space-filling Sierpinski curves — a strictly mathematical curve that reads as
  cosmic scale, microscopy, or PET/CT medical scans depending on display size.
- 3D-printing errors treated as brushstrokes: "I now approach 3D printing errors...
  as opportunities to explore their potential as a unique and expressive medium."
- "Machine Creative": a printer with one program — hold nozzle temperature,
  extrude filament — producing one-of-a-kind objects from imperceptible variations.

**Key process ideas:**
- "Code bashing": tweaking variables until "even a single output can reveal
  something mesmerizing, serving as a solid foundation to build upon."
- Human–machine as dialogue, not replacement: "room for errors on both sides,
  which could lead to observation and drawing conclusions... If we stay open to
  unplanned experiences, we can benefit from serendipity and occasional erratic
  code execution, which becomes a source of new inspiration."
- Responsiveness as a principle: make element parameters independent of the
  environment so the work is display-agnostic; test on real devices so reception is
  intended, not left to chance. The same image reads as microscopic on a phone and
  cosmic on a 60-inch display.

**One hop out — pdudko.com:** "Phantasmagoria" (129 curated generative animations,
retro games × classical painting × early GAN, inscribed on Bitcoin): a hidden
RGB-channel-mixing universe of orbiting planets, distorted by noise layers into a
dreamy semi-pixelated animation. "Gravity" (Art Blocks × Hodler's Collective):
Newton's F = G·m·M·r⁻² explored as collective behaviors and creation/annihilation
cycles. The site confirms the signature: light as image source, darkroom-photography
roots, ultra-compact code.

**Piece seed — "Curve of Infinity":** points scattered along two space-filling
fractal curves (Sierpinski or Hilbert) in 3D perspective, glowing softly like
neural impulses; slow drift so the "scale" reads differently as you watch.
Distinctness: the curve IS the composition — a mathematical object rendered as
light — unlike the free-form fields of current pieces.

## 7. shaderism (Arttu Koskela) — "Responsive Dreams: shaderism"

Text source: https://www.fxhash.xyz/article/responsive-dreams%3A-shaderism
(TGAM page at /interview/responsive-dreams-shaderism failed to load; the fxhash
article carries the full text)

**Who / background in one line:** Finnish creative coder/WebGL developer; VFX
background (FX simulations for award-winning adverts, incl. Heineken work), music
and Max/MSP roots, now real-time interactive generative audiovisual art.

**Toolchain / techniques (specifics):**
- Three.js + React (react-three-fiber) + Tone.js for sound; Houdini background
  (procedural systems, node-based shaders) transferred to GLSL. "Not utilizing
  shaders would feel quite limiting" — aesthetics AND performance.
- Learning path: node-based shader graphs (Houdini) first, then code (Inigo
  Quilez, The Book of Shaders); reading other people's codebases as a study
  method.
- Graphics-first audiovisual: physics simulations drive both; the shader animation
  that triggers a sound is choreographed to follow what the audio sounds like.
  "Chordal Reveries" = self-playing audiovisual instruments inspired by marble
  games + physics sims. Tone.js quirk handled by keeping sounds as short as
  possible (Tone.js ignores new notes past the polyphony limit rather than
  stealing voices).
- Curation method: start with broad randomness ranges, batch-generate thousands
  of outputs, narrow parameters by filtering out anything that "went too far."
- Anti-clutter rule: the hardest shader challenge is restraint — "It's easy to
  get carried away and end up with visuals that appear cluttered or even chaotic...
  by observing the artwork of other artists, I sort of calibrate my senses."

**Key process ideas:**
- Constraints as fuel: "I often find myself struggling to make progress with my
  creativity if I have too much unrestricted freedom in the tools and processes."
  Audience resonance doubles as a boundary (e.g. isometric projection even for
  full-3D scenes).
- Idea incubation: a long list of ideas "that come out of the ether, often
  inspired by my time spent in nature," each waiting to be paired with a technical
  spark (e.g. recent CSG improvements in WebGL).
- Playfulness without a goal: interacting with physics "sharpens the attention to
  the present moment... the artwork sort of serves as an open invitation to
  collaborate with the instrument."

**Piece seed — "Marble Music, Muted":** a small physics scene (balls rolling
through chimes/ramps, isometric) where each collision both moves a ball and
lights a node — the "sound" rendered as expanding rings and glow pulses on a dark
field, captured as one still. Distinctness: a physics-driven visual composition;
nothing in the sketchbook has simulated physics or an instrument metaphor.

## 8. Andy Duboc — "Responsive Dreams: Andy Duboc"

Text source: https://www.fxhash.xyz/article/responsive-dreams%3A-andy-duboc

**Who / background in one line:** French artist in Montreal, MSc Computer Science
(Lyon II), 10 years in video games (Ubisoft, EA); founder of Bureau Noir studio;
fx(hash) minimalism/movement/light work, fx(params) experiments.

**Toolchain / techniques (specifics):**
- Web tech for the NFT ecosystem (a learning curve coming from games); fx(params)
  and Solidity experiments — "AnObject" let collectors shape the artwork to make
  collecting less passive.
- Signature system: "2D radiosity" — global illumination computed from 2D shapes
  and images; light as a motif "only made possible with digital art."
- "MISHMASH" (Responsive Dreams): chaotic-vibrant animated piece, engineered to be
  consistent across devices/aspect ratios from the start.
- Influences: Leander Herzog, Kim Asendorf, daeinc — "the brutalism and
  minimalism present in their practice"; Carlos Cruz-Diez and Ksawery Komputery
  for MISHMASH's color chaos.

**Key process ideas:**
- Coherence over variation: "I'm not particularly fond of introducing excessive
  variation for the sake of it... I prioritize creating pieces that maintain a
  consistent underlying concept or theme."
- Motion as discovery: "the movement brings my generative art to life, and it
  allows viewers to experience something new every time they engage with the
  artwork." ("Flipping the dots" bridges algorithm and physical object.)
- Experimentation is the engine: "Without it, I would quickly lose interest" —
  trial and error, parameter tuning, constant new techniques.
- Responsive art as the future: with every screen size in existence, "responsive
  art offers a solution to adapt and optimize the viewing experience" — he designs
  for device-independence from the first sketch.

**Piece seed — "Radiosity Study":** a 2D global-illumination piece: a few simple
shapes (bars, discs) as colored light emitters, the whole canvas lit by bounced
light computed on a coarse grid — soft gradients, light pooling in corners.
Distinctness: light-as-subject with real light transport math; closest to nothing
in the current practice.

## Responsive Dreams festival

**What it is:** The Generative Art Museum's digital arts festival — "the first
generative art exhibition in Barcelona dedicated entirely to showcasing art created
by code." Mix of talks, round tables, installations, live coding, performances, DJ
sets, and a live "Genema" minting experience (visitors mint works by featured
artists on site). Special mention at the Premis Ciutat de Barcelona 2024 (digital
culture award). 2026 curators: Monica Rikic and Xavier Hernandez. 2026 edition ran
25–27 September 2026 at (per the site) a Barcelona venue; first edition was at
Nau Bostik.

**2026 edition — featured artists:** Agoston Nagy, Alba G Corral, Alicia Champlin,
Anna Carreras, Anna Lucia, Bruce Yoder, fingacode, Hector AKA Rotceh_303, Ioana
Vreme Moser, Lev Manovich, Licia He, Lukas Truniger, Marc Vilanova, Marta Verde,
Mayte Gomez Molina, Monica Rikic, Myriam Bleau, Roxanne Harris, rudxane,
Spongenuity, Stefano Contiero, Takk Iori.

**2026 — "Dreams" (commissioned pieces):** Idoni (Anna Carreras), tabellen
(rudxane), Effimero (Stefano Contiero), Semantic Noise (Agoston Nagy), Flora
(Alba G Corral), sketch01_final_FINALv1_final (fingacode + Spongenuity),
Yarntificial City (Licia He), Anna Lucia's project, {yes, yes, no, yes} — a
generative tattoo project by Anna Lucia and Kyra Orbons.

**2026 — installations:** meltdown (Mayte Gomez Molina, Monica Rikic, Myriam
Bleau, all three days), Perikon Smelters (Ioana Vreme Moser), Implausible Rainbows
(Lukas Truniger), Phonos (Marc Vilanova), Soft Cinema II (Lev Manovich — Manovich
is the media theorist behind "The Language of New Media", here presenting an
installation).

**2026 — performances:** Soft Revolvers (Myriam Bleau), Headspace (Alicia
Champlin — live-coded performance using her own EEG data, brainwaves mapped to
sound through harmonic structures linked to Schumann resonances), Syntax::stream
(Roxanne Harris), Takk Iori DJ set with Marta Verde live visuals.

**Edition history (from the 2026 Genema program):**
- 2023: Andy Duboc, lilcode, Pawel Dudko, Santiago, shaderism, Udith Mahajan
- 2024: Edu Prats, Eliza Struthers-Jobin, Office CA, poperbu, Quentin Hocde,
  shaderism
- 2025: Aleksandra Jovanic, Amy Goodchild, Bustavo, Frederik Vanhoutte, HAL09999,
  Julian Hespenheide, Manuel Larino, Paolo Curtoni
(shaderism is the repeat offender — featured in both 2023 and 2024.)

**Visual notes:** The 2026 poster is a maximalist digital collage — a golden
maneki-neko statue, flowing pink/red fabric-like 3D forms, a small wooden
mechanical automaton (dog-like, visible gears), translucent blue layered planes,
and huge bold "RESPONSIVE DREAMS" typography. The "highlight artwork" slot for
Roxanne Harris is actually a still from a Lot Radio live-coding session: a
performer at a mixer with Sonic Pi code overlaid
(`random_seeds = [2,4,3].ring.stretch(8).take(16)`), which confirms Syntax::stream
is live-coded music in the Sonic Pi idiom. Festival thesis in one line from the
site: "to fully understand generative art we must interact with the art, move
around it, examine it from different angles" — display technology as part of the
work.

## Artist out-links for follow-up

- Andreas Rau → https://andreasrau.eu (physical/CNC series: /longing)
- Thomas Lin Pedersen → https://data-imaginist.com (named in interview)
- Pawel Dudko → https://pdudko.com
- DEAFBEEF → no personal site named in interview (fxhash presence only, per text)
- riiis → no own site named in interview
- Ryan Bell → no own site named in interview
- shaderism (Arttu Koskela) → no own site named in interview (mentions his
  Twitter/X for tests)
- Andy Duboc → founder of Bureau Noir studio, co-founder of compute collective
  (no URLs verified in interview)
