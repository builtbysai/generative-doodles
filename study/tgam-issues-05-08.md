# TGAM Issues #05–#08 — Study Notes (Generative Doodles)

Study-only. No building, no production code. Read from the four TGAM issue landing pages in full, artist sections/sub-pages, one out-link followed per issue, and 13 downloaded full-resolution works visually inspected. Factual claims only; gaps are marked.

**Source URLs**
- Issue #05: https://tgam.xyz/exhibitions/issue-05-world-wide-art
- Issue #06: https://tgam.xyz/exhibitions/issue-06-input-output
- Issue #07: https://tgam.xyz/exhibitions/issue-07-she-codes
- Issue #08: https://tgam.xyz/exhibitions/issue-08-formulae

**Correction to supplied context:** the task brief mentioned "thefunnyguys" for Issue #06, but TGAM's actual Issue #06 page features **DEAFBEEF, Licia He, and Anna Carreras**. This study follows the TGAM page as source of truth.

---

## Issue #05 — World Wide Art

**Curatorial thesis.** Technology and blockchain democratize art creation, distribution, cultural expression, and artist–audience interaction. The issue frames the open web as a gallery without gatekeepers: work is made with code, shared globally, and collected by anyone.

### Featured artists + visual descriptions

**Lars Wander**
- *Gossamer #15* — one large organic blob on warm off-white, built from hundreds of thin parallel contour lines in red, blue, and black/dark gray that stream across the form like flowing hair or current. Two nested loop regions (top-center, lower-left) read as "eyes" — a creature-like, pareidolic quality. Ragged edges where line segments terminate; short-segment multicolor stitching creates a moiré/fiber texture. Reads as a topographic map of an imaginary organism.
- Other mapped works: *how you see me #11*, *Unfolded #79*, *SPLAT 3/N*, *Gossamer #12*.
- Own-site art page found: https://larswander.com/art/

**Zach Lieberman**
- *color gradient circle study* — soft-focus, dreamlike color study: big overlapping blurry blobs of cobalt blue (top), violet (left), black oval (upper-center), cream (center-right), red mass (lower-right), deep purple diagonal (center-bottom), a small vivid green blob and a cyan blob (center-right), muted olive-gray disc (lower-left), on near-white. Feathered edges; colors bleed into one another like out-of-focus gel lights. No hard geometry; pure color interaction and gradient.
- Other mapped works: *color ribbon study*, *light study gradient cross*.
- Studied one-hop: http://zach.li/ — code as a poetic medium; experimental drawing/animation tools; interactive environments where participants become performers.

**Zancan**
- *Garden, Monoliths #117* — monochrome green engraving-like botanical scene: thousands of finely drawn leaves, petals, and seed heads in precise linework on pale sage-green, thin darker frame border. Dark gray-black poppy/tulip-like flowers on long thin stems at varying heights; tree trunk in background with diagonal woodgrain hatching. Dense all-over composition, no horizon; foreground pebble/leaf-litter shapes. A Victorian botanical plate reimagined algorithmically.
- Other mapped works: *Lushtemples NYC #3*, *Lushtemples — Highlights of the Hike*, *(kinder)Garden, Monuments #225*.
- Exact own-site work URL found: https://zancan.art/Works/30-objkt-one

### Techniques / code approaches
- **Lars Wander:** studies perception through generative patterns, repetition, controlled randomness, simulated light, packing, folds, and plotter translation. Watercolor plotter practice deliberately combines machine precision with pigment unpredictability. *how you see me* is machine-generated, human-curated gestural work that relies on pareidolia — the viewer finding faces/figures in the marks.
- **Zach Lieberman:** openFrameworks/C++; drawing and geographic imagery (*Land Lines*); face-responsive masks; simulated reflected light; phone-rotation-driven 3D drawing; eye tracking; converting gesture and data into visual or sonic outputs. Participants become performers in the work.
- **Zancan:** "figurative-generative" nature imagery built with JavaScript and mathematical equations. Former oil painter; digital works and pen plots emphasize ecological and social themes.

### Original piece seeds (inspired-by, not copies)

**Seed 1 — "Migration Ledger."** A single continuous agent walks a grid, each step laying a colored thread segment; thread color comes from a migration dataset's origin palette, and the path never crosses itself. The accumulated threads build Gossamer-like multicolor striations. Distinction: the line field is a data portrait — its color legend encodes a real dataset, merging Wander's contour streams with data-viz honesty.

**Seed 2 — "Pareidolia Engine."** Machine-generated gestural contour fields (Wander's *how you see me* approach) where the system scores random line clusters against simple face/animal templates and keeps only outputs above a recognition threshold. Distinction: curation-by-pareidolia becomes an explicit algorithmic filter — machine-scored, human-reviewed.

---

## Issue #06 — Input Output

**Curatorial thesis.** Code is an artistic medium that generates evolving visual, sonic, and interactive outputs. Featured systems respond to real-time data and changing environmental factors — the work is never a fixed image, it is a living system.

### Featured artists + visual descriptions

**DEAFBEEF**
- *Series 0: Synth Poems — Token 100* — monochrome, genuinely oscilloscope-like: faint grid lines on a dark field, glowing white curves sweeping diagonally from lower-left to upper-right. Smooth parametric waveforms (Lissajous-like loops), several overlapping passes with phosphor glow. Square with slightly curved screen edges suggesting a CRT. The image is the sound plotted against itself — minimal, luminous, technical.
- Other mapped work: *Series 3: Entropy — Token 146*.
- Studied one-hop: https://deafbeef.com/about.htm

**Licia He**
- *Running Moon #99* — pale, icy composition: a large pale-blue square at center-left filled with big simple rounded rect/cell shapes outlined in thin teal-gray, cells filled with fine white scribble hatching — a hand-drawn mosaic, stained glass through frost. Background washes of pale blue, cream, and beige with wispy pencil-like diagonal lines, dots, and arcs; subtle crosshatch and stipple in some cells. Delicate, translucent, paper-like; organic variation inside geometric tessellation.
- Other mapped works: *Drifting Dreams #2/#3*, *Running Moon #0/#138/#292*.
- Own-site URL found: https://www.eyesofpanda.com/
- Gap: no usable description found for *A story for a minute*; not described beyond visual inspection here.

**Anna Carreras**
- *Pinzell d'Arbres I* — black field with explosive tree-like branching crowns in orange, copper, cream, and pale teal — feathery fractal canopies like autumn crowns or mycelium fireworks. Scattered small squares (orange, white, teal; some with red centers, like target/marker glyphs). Two glitched rectangular columns (top-center, bottom-right) of vertical color-band stripes — digital corruption blocks. Thin diagonal hatch texture over the whole black field. Organic growth balanced against hard digital markers; autumn palette on black.
- Other mapped works: *Trossets #996*, *Pinzell d'Arbres II*.
- Own-site URL found: https://www.annacarreras.com/
- Gap: no usable description found for *Pinzell d'Arbres II*; only visually studied *Pinzell d'Arbres I*.

### Techniques / code approaches
- **DEAFBEEF:** low-level C, Linux, Emacs, command-line tools, no expensive DAW/hardware. Programs directly generate raw numeric sound and image data. In *Synth Poems*, the mint hash controls tempo, timbre, pitch, meter, and related musical properties; the imagery directly visualizes the audio waveform like an oscilloscope. Self-contained C code is stored on-chain to reduce browser/library/IPFS dependencies and improve reconstructability. His terminal workflow is described as muscle memory akin to playing an instrument.
- **Licia He:** combines generative art, HCI, data visualization, and physical plotter painting; researches robot versus human gesture; makes custom plotter tools.
- **Anna Carreras:** creates systems from small simple behaviors, balancing pattern/order with randomness; Mediterranean landscape and color are recurring sources.

### Original piece seeds (inspired-by, not copies)

**Seed 1 — "Scope Ballads."** DEAFBEEF-inspired: synthesize a short melody from a hash (tempo/timbre/pitch), plot its waveform in phosphor green on an oscilloscope grid, and let the melody's own harmonic content drive the camera drift — the grid warps with amplitude so the "screen" itself responds. Distinction: the image is a literal sound portrait whose container reacts to the sound it holds.

**Seed 2 — "Robot Hand Studies."** Licia He-inspired: a simulated plotter pen draws the same generative tree many times with tiny parameter jitter; the piece displays all N attempts overlaid so the error between human-ish wobble and machine repetition becomes the visible subject. Distinction: the artifact is the accumulation of attempts — gesture-residue as the medium.

---

## Issue #07 — She Codes

**Curatorial thesis.** Amplifies underrepresented women in creative coding and generative art. Showcases visionary algorithmic approaches and explicitly aims to encourage future women creators — representation through excellence, not tokenism.

### Featured artists + visual descriptions

**Monica Rizzolli**
- *Fragments of an Infinite Field #1023* — extremely dense all-over botanical field filling the frame edge-to-edge: thousands of thin radiating line strokes in yellow-green forming grass tufts, lavender-purple feathery fronds, and dotted blossoms in apricot-orange, lavender, and white with yellow centers. No horizon, no ground — like a textile, or a meadow seen from directly above/inside. Every element is built from fine parallel strokes; palette is sunlit (warm yellows, sage/lavender, cream blossoms, dark-green shadow strokes) suggesting spring. Figure and ground merge — blossoms and grass share one plane; purple fronds layer atop the field.
- Other mapped works: *Fragments #10/#137*, *A Tour of Hypothetical Waterfalls #19*.
- Gap: no personal own-site found for Rizzolli; the Art Blocks collection page is the canonical home: https://www.artblocks.io/collection/fragments-of-an-infinite-field-by-monica-rizzolli

**Nadieh Bremer (Visual Cinnamon)**
- *Twistings #233* — playful confetti arrangement on warm off-white: dozens of "twisted" spiral pinwheel blobs of varying sizes, each built from overlapping ribbon-like curved wedge segments in candy colors (cobalt blue, red-orange, kelly green, magenta/pink, yellow, light blue), with white gaps between wedges creating rotation/suction energy. Large ones dominate (some cropped by edges), tiny ones scattered like seeds. Slightly irregular, hand-drawn feel inside geometric construction; some loose open spirals, some tight. Paper-cut collage joy.
- Other mapped works: *Twistings #251*, *Obscured 5f9b*, *Fleeting Thoughts #40*.
- Studied one-hop: https://www.visualcinnamon.com/about/
- Gap: no project-specific description found for *Twistings* or *Fleeting Thoughts*; only the general practice description below.

**Alida Sun**
- *Insomnia Drawing Simulation* — aggressive, restless visual noise: hundreds of thin streaking lines in red, blue, orange, black, and white crossing diagonally, layered over warped/melted blocks of solid color (red, cobalt, black, cream) that bend and smear like liquid or dragged paint. Starburst/rosette nodes where lines converge, like pinwheel vortices. Multiple glitched drawings dragged across each other — kinetic, sleepless, anxious. High saturation, clashing primaries, no rest areas. AV-synesthesia quality: visual static like an overdriven television signal crossed with a drawing hand.
- Studied one-hop: TGAM artist page https://tgam.xyz/artist/alida-sun and practice context (see below).
- Gap: no personal own-site found; her Instagram is https://www.instagram.com/alidasun/ (listed on the CCBT Tokyo player page).

### Techniques / code approaches
- **Monica Rizzolli:** p5.js, Art Blocks Curated, fixed edition of 1,024, released September 13, 2021. *Fragments of an Infinite Field* is a compositional system: an idealized plant species is generated and arranged in a potentially infinite field of foliage. The season is the master environmental parameter — it determines the palette and defines per-season phenomena (rain in summer, snow in winter, falling petals in autumn, pollen in spring). Flower variables are macro (whole population) or micro (per-individual); small deviations in petal/filament counts produce mutations. Figure/background colors deliberately confuse — backgrounds use colors present in the figures, breaking boundaries into chromatic masses. Her stated research question: "How to create parameters that resemble a living organism's growth?" — the project approaches digital morphogenesis and procedural organisms. Background: artist-programmer from São Paulo, Brazil; deep interest in morphology (shapes and arrangements of organism parts); painting degree from UNESP, creative programming since 2012 at Kunsthochschule Kassel; her animated patterns loop like the rapport of a fabric.
- **Nadieh Bremer:** data-first process — start from the actual dataset and communication goal, never generic chart forms. Pipeline: understand/clean data → sketch and design → implement and iterate, typically JavaScript + D3. Works across static, interactive, animated visualization, and data art. Aims for custom visual metaphors that stay informative while becoming memorable and emotionally engaging.
- **Alida Sun:** a daily practice of extraordinary discipline — at the time of the DANAE interview, 2,645 consecutive days hand-coding a new generative artwork, on second-hand, repaired, decade-old hardware. Practice spans installation, sound, architecture, choreography, drawing, and light; works in C++ and AV synesthesia. Themes: presence, resistance, adaptation in the age of algorithms. Glitch and low-poly aesthetics function as resistance — refusal of big-tech smoothness and efficiency in favor of expressive friction; process over outcome; glitches as sites of generative discovery. Code translates across textiles, bodies, and space (hand-embroidered tapestries generated from bodily movement via infrared capture). Creator of Art Blocks Curated project *glitch crystal monsters*; exhibited at the Venice Biennale Decentralized Pavilion, Ars Electronica, UCCA Center for Contemporary Art, Seattle NFT Museum.

### Original piece seeds (inspired-by, not copies)

**Seed 1 — "Field Season Dial."** Rizzolli-inspired: one idealized flower species drawn procedurally, with a single master "season" parameter that continuously cross-fades palette, petal-count variance, and background weather particles (rain/snow/pollen/petal-fall) instead of switching between four presets. Distinction: the field becomes a playable climate slider — a continuous morph, not four discrete states.

**Seed 2 — "Two-Thousand-Day Streak."** Alida Sun-inspired: a piece generated by a small daily-practice ritual — the script is re-run by hand every day, each run adding exactly one layer to a growing canvas; the finished image exists only as the sum of days. Distinction: time and labor are the medium; the piece cannot be regenerated from a hash alone — absence shows as blank layers.

---

## Issue #08 — Formulae

**Curatorial thesis.** Algorithms are generative art's structural backbone — they control shape, color, texture, arrangement, dynamism, unpredictability, temporal change, and responses to external stimuli. The issue treats the formula itself as the artwork's subject.

### Featured artists + visual descriptions

**Aleksandra Jovanic**
- *CHROMATLAS Vol. 6 #139* — scientific-plate aesthetic on warm cream paper: vintage captions "CHROMATLAS, Vol. 6" (top-left) and "4th section PLATE CCLVIII" (top-right), faint diagonal construction lines across the sheet. A central bubble-plot scatter of translucent spheres of varying sizes in muted earth tones (peach, taupe, gray-green), each with one darker lobe/shadow segment and thin concentric circle outlines inside. Small numeric labels beside spheres (161, 132, 62, 64, 54); a row of small vertical tick marks along the bottom edge. A vintage color-atlas plate crossed with a data-viz bubble chart; translucency gives an optical-illusion depth — the large peach sphere at bottom-center has a dark shaded underside.
- Other mapped works: *CHROMATLAS Vol. 1 #105*, Vol. 3 #210, Vol. 7 #190.
- Own-site URL found: http://aleksandrajovanic.com/ (listed in her official bio materials)

**Arttu Koskela (shaderism)**
- *Sound Therapy #59* — warm orange-to-cream vertical gradient with fine grain: ~16 identical "stalactite" cones (orange-brown glossy gradient, pointing down) clustered in a loose cross/grid, each capped with a small green-and-white sphere like a sprout. Below them a soft pale-green concentric-circle ripple motif — a sound-wave pool. Toy-like 3D render with halftone/stipple shading; a dithered retro texture. Music-visualization turned into objects: instruments dripping sound into a pond.
- *Blind Spots #46* — portrait-format macro view through rippled translucent glass: diagonal bands of refraction over a dark silhouette background; pearl-like iridescent color shifts (teal-green, pink, orange, white) at glancing angles; visible halftone dot-screen texture in regions; chromatic-aberration edges. Extreme close-up abstraction with photographic depth.
- Other mapped works: *On Time #33*, *Chordal Reveries #17*, *Kinetic Bug #227*, *Blind Spots #307/#396*.
- Studied one-hop: https://www.artblocks.io/articles/in-conversation-with-arttu-koskela-shaderism-on-blind-spots
- Gaps: no descriptions found for *Sound Therapy*'s generative rules, *Moiré Meditation*, or *On Time*; *Chordal Reveries* is documented below.

**Alejandro Campos**
- *Enfantines II #190* — cream/yellowish paper with a thin rectangular border (the active drawing area). Scattered childlike "sun/creature" figures — each a loose hand-drawn spiral or circle with radiating multicolored stick rays (pink, teal, blue, yellow, purple crayon colors), shaky sketchy linework. Sparse distribution with two denser clusters; faint dotted flow lines drifting across the paper. Deliberately naive — children's crayon drawings with systematic variation in ray length, color, and spiral tightness. The imperfect-repetition theme is directly visible: same motif, every instance slightly different.
- Own site: https://art.arqtistic.com (architect and creative coder; works across ETH and Tezos)
- TGAM artist page: https://tgam.xyz/artist/alejandro-campos
- Related project context: *Fuga a tientas* (Verse, 2023) is described as "the coming-of-age of the *Enfantines* (fxhash, 2022) algorithm — still childlike but now a more sophisticated and yet imperfect exploration of form and counterform, sound and colour," fully composed of horizontal lines and simple shapes traveling through imperfect flow fields.

### Techniques / code approaches
- **Aleksandra Jovanic:** artist and programmer from Belgrade, Serbia (doctorate in Digital Arts, BSc in Computer Science; associate professor teaching at Belgrade's art faculties). Combines interactive art, art games, and generative art; recent work focuses on data-visualization aesthetics and optical illusions. She calls working with algorithms "economical" — every reload gives a different result, and fast rendering buys time to explore adding/removing elements and their flipsides (an explicit nod to Vera Molnár-style visual research). *CHROMATLAS* is a 10-volume series developed over a year as an evolving idea — not planned as ten, but the concept kept yielding visual ideas; she stopped when she felt she had exhausted them. The series' visual language comes from data science crossed with vintage color-classification books (the source of the name). She likes series coherence through a single generator but chose the volume structure deliberately rather than one random-everything machine.
- **Arttu Koskela:** Houdini procedural-systems/VFX background, moved to WebGL real-time development. JavaScript, real-time graphics, interaction, audiovisuality, simulations, and generated musical instruments; no pregenerated assets in artworks. Career path: VFX → WebGL (~6 years before the Art Blocks interview), creative-coding sketches on Twitter from 2020, long-form works after discovering fx(hash) at end of 2021 (*Sound Therapy #23*, 2022, JavaScript; *Deformed Patterns*, 2019, was a Houdini generative output). *Blind Spots*: procedural glass inspired by Iittala glass sculpture; a silhouette behind a refractive shell; animated viewpoint change; a complex algorithm searches for the ideal camera position. Palette starts as one color gradient plus black and white — chromatic aberration creates the pearl-like iridescence. Feature set: aberration, roughness, glass ripple amount/deformation, stripe and halftone effects, camera framing; supports animated interaction and print rendering up to 10,000 pixels. *Chordal Reveries*: a self-playing musical instrument — eight marbles navigate a glass labyrinth triggering sounds; eight knobs control camera and sound generation (designed around the AKAI LPD8 MIDI controller, also keyboard-accessible); extends into physical interactive installation. His definition of responsive art: graphically responsive art adapts and reacts — it should fill whatever screen it is given, including dynamic resize.
- **Alejandro Campos:** architect (Arqtistic, Valencia/Ontinyent; academic work on modern architecture) turned creative coder since 2021. Works in p5 and built the open-source p5.brush library; celebrates imperfect repetition — coding as sketching, where unexpected shapes and colors emerge from simple geometric operations through imperfect flow fields; *Enfantines* is childlike but sophisticated. Engages generative art through the lens of web design and experience; revived a defunct AI model to generate music for *Fantasia*.

### Original piece seeds (inspired-by, not copies)

**Seed 1 — "Chromatlas of One Dataset."** Jovanic-inspired: take one real dataset and render it as a vintage color-atlas plate — Roman-numeral plate numbers, translucent bubble spheres, marginal tick marks — where sphere size, position, and color encode the data honestly. Distinction: data-viz wearing a 19th-century classification-book costume; the annotation system itself is the aesthetic.

**Seed 2 — "Glass Silhouette Studies."** shaderism-inspired: a simple dark silhouette behind a procedural glass shell with adjustable ripple, roughness, and aberration; the viewer drags to rotate, and pearl iridescence appears only at glancing angles. Distinction: the beauty lives entirely in the optics, not the geometry — geometry stays fixed, all variation is refraction.

---

## Artist out-links for follow-up

- Lars Wander — https://larswander.com/art/
- Zach Lieberman — http://zach.li/
- Zancan — https://zancan.art/Works/30-objkt-one
- DEAFBEEF — https://deafbeef.com/about.htm
- Licia He — https://www.eyesofpanda.com/
- Anna Carreras — https://www.annacarreras.com/
- Monica Rizzolli — no personal own-site found; canonical project page: https://www.artblocks.io/collection/fragments-of-an-infinite-field-by-monica-rizzolli
- Nadieh Bremer (Visual Cinnamon) — https://www.visualcinnamon.com/about/
- Alida Sun — no personal own-site found; Instagram: https://www.instagram.com/alidasun/ ; TGAM page: https://tgam.xyz/artist/alida-sun
- Alejandro Campos — https://art.arqtistic.com (TGAM page: https://tgam.xyz/artist/alejandro-campos)
- Aleksandra Jovanic — http://aleksandrajovanic.com/
- Arttu Koskela (shaderism) — https://www.shaderism.com (Art Blocks interview: https://www.artblocks.io/articles/in-conversation-with-arttu-koskela-shaderism-on-blind-spots ; Responsive Dreams profile: https://responsivedreams.com/shaderism)

## Open gaps (honest)
- No project-specific text descriptions found for: Licia He's *A story for a minute*, Anna Carreras's *Pinzell d'Arbres II*, Nadieh Bremer's *Twistings* / *Fleeting Thoughts*, Alida Sun's *Insomnia Drawing Simulation* (practice context found, project text not), Alejandro Campos's *Moiré Meditation*, or shaderism's *Sound Therapy* generative rules / *On Time*. Visual descriptions above come from direct inspection of the downloaded works only.
- Own-sites not found for Monica Rizzolli and Alida Sun (work pages substituted).
