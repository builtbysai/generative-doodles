# TGAM Issues #01–#04 — Deep Study Notes

Study-only notes for Generative Doodles. No production code. Brochures read in full;
2–3+ actual works per issue inspected from local PDF image extractions (contact
sheets + full views); one external hop per issue for the most interesting artist.

Sources:
- Issue #01 "For the Love of Art": https://tgam.xyz/exhibitions/issue-01-for-the-love-of-art/brochure (PDF, 14 pp)
- Issue #02 "Computergrafik": https://tgam.xyz/exhibitions/issue-02-computergrafik/brochure (PDF, 15 pp)
- Issue #03 "Red Pill": https://tgam.xyz/exhibitions/issue-03-red-pill (landing) and /brochure (PDF, 18 pp)
- Issue #04 "Intersection": https://tgam.xyz/exhibitions/issue-04-intersection/brochure (PDF, 27 pp)

Local evidence: /tmp/tgam/img0{1,2,3,4}/ (PDF image extractions), /tmp/tgam/view/
(contact sheets), /tmp/tgam/prada/ (5 direct CDN works for Issue #03).
PDF hyperlink annotations extracted with pypdf for work/visit links.

---

## Issue #01 — For the Love of Art (Dec 2021, inaugural)

### Curatorial thesis
TGAM introduces itself as a metaverse space "dedicated to celebrate and promulgate
art made by autonomous systems (non-human) that can independently create artwork"
— but the working definition is broader and more interesting: it embraces **any
piece where humans interact with automated tools to create unique pieces**.
The thesis is that affordable computers, easy scripting tools, and blockchain
provenance are the "icing on the cake" for a digital-art renaissance. Tone is
celebratory rather than academic: love of the medium first, theory second.

### Artists and visually observed work

**Synesthesia** — "Translating audio frequencies into the very fabric of the
universe." An experimental amalgam of analog hardware and digital processing:
CV gate and MIDI messages feed custom Python scripts, sculpting the aural
outputs of modified vintage and contemporary gear into a hybrid of audio
signals merged with generative digital visuals. Explicitly political goal:
decentralize audio-art distribution to a collector network, a "denouement of
the traditional music industry models." Works in brochure: Y001, Objkt #257900,
#306449, P009 #557474, Patches #386763, G010, P006 #576127, #557448, debug500
#506916 (all via henext/objkt links). Observed (i01-013–018): dark,
signal-like compositions — the visual language reads as oscilloscope/waveform
imagery turned compositional.

**Marcelo Soria-Rodríguez** (msoriaro) — artist/strategist; interested in the
"total cognitive space of systems": the whole range of possibilities a system
can cover. Explores parameter spaces and whether synthetic systems can exhibit
taste/emotion intelligible to humans. Writes at iillucid.com. Works:
"The four seasons in polycircle space: Spring" (details i, iii — Objkt #23995,
#7099), "polyline creatures" iii/iv/v (Objkt #284333, #340243, #439970),
"songs my mother taught me" (Objkt #511610), "Palazuelo" (Objkt #223600).
Observed (i01-024): explosive, high-energy composition — thick impasto-like
strokes in orange/blue collide with large black crescent arcs while fine
needle-thin lines radiate outward on a cream ground. Gesture + geometry in
tension; the arcs act as compositional anchors inside the chaos.

**Ismahelio** — trained architect (Spain, Mexico, India, China, Hong Kong);
parametric/generative design; "geometrical compositions holding chaos and
randomness within." Obsessed with automated detail, chaos within boundaries,
semi-controlled randomness, and reproducing 3D constructions as 2D drawings.
Works: "Palazuelo" (Objkt #223600) and architectural cluster pieces.
Observed (i01-039, i01-040): dense axonometric clusters of wireframe cubes/boxes
with flat colored faces — one on cream (white/yellow/blue faces), one on dark
navy (multicolor faces). Reads as an impossible city or "Non Spaces"-style
architectural drawing generated from a 3D voxel-ish field, flattened to line
work. Later external work confirms the trajectory: "Invisibles" (Art Blocks,
2023, plottable, SVG export for pen plotting) and "The Machine" (419 outputs,
JS algorithm combining blocks/cubes).

### Techniques / code approaches
- Audio-reactive pipeline: CV gate + MIDI → custom Python → generative visuals
  merged with the audio signal itself (Synesthesia). Takeaway: the control
  signal can be a first-class visual element, not just an input.
- Parameter-space cartography: artworks as samples from a system's possibility
  space; small ingredient changes in complex scenarios (Marcelo).
- 3D-to-2D translation: build the system in three dimensions, render the
  drawing in two; bounded chaos via constrained randomness (Ismahelio).
- Objkt/henext single editions on Tezos; brochure links route through
  tgam.xyz/visit/artist/<handle> redirects.

### Piece seeds (original, not copies)
1. **"CV Garden"** — Take Synesthesia's control-signal idea but go silent and
   botanical: a bank of slow software oscillators ("control voltages") drawn as
   visible wires connecting node points; each wire's voltage bends the
   curvature of an ink-like vine stroke. No audio — the control metaphor itself
   becomes the composition. Cream ground, two inks.
2. **"Paper Architect"** — Take Ismahelio's 3D→2D translation but grow the city
   with a cellular automaton instead of random stacking: a voxel field evolves
   a few generations, then gets flattened to an axonometric line drawing with
   one accent color per depth layer. The city's history (its growth) is the
   seed.

---

## Issue #02 — Computergrafik (Apr–Jun 2022)

### Curatorial thesis
A tribute to **Georg Nees** and the first exhibition of graphics
algorithmically generated by a digital computer (Siemens, Erlangen). The
brochure leans on the anecdote that a program can imitate an artist only if
the artist can state how they draw — Max Bense's "Artificial Art." The issue
frames generative art as a 60-year continuum, not an NFT-era invention, and
implicitly dares the viewer to compare plotter-era restraint with contemporary
color and motion.

### Artists and visually observed work

**Quentin Hocdé** — creative developer / visual artist, Gobelins (l'école de
l'image) graduate, ex-Lead frontend at Locomotive (Montreal); relocated to
Brussels, traveling/working from a campervan. "Addicted to well thought-through
animations and smart user experiences." Makes colorful compositions and
infinite mesmerizing loops. Observed (i02-023): translucent vertical
capsule/pill tubes in coral red, peach, and mint green floating on near-black,
arranged in loose rows with soft glow — glassy, candy-like, clearly built for
looping motion. External hop: his "Parallelism" (Responsive Dreams 2024) is
responsive generative art exportable to **SVG for pen-plotter tracing** —
press 'p' for PNG, 's' for SVG. Web-design craft as baseline: elementary shapes
building complex ecosystems.

**Lisa Orth** — artist/designer/tattooer/creative coder (Seattle). Ex-Sub Pop
first Art Director (designed Nirvana's first records and logo); award-winning
woodcut/engraving-style linework tattooer; moved to code in 2020. Works
entirely in **Processing and p5.js**; themes: colliding textures, movement,
color. Observed: (i02-033) a woven grid of chevron/herringbone blocks in
red-orange/teal/black/cream — textile-like, rhythmic, op-art adjacent;
(i02-035) concentric swirling fine-line rings in red/gold on dark — radiant,
meditative. Both read as linework-first abstraction with tattoo/engraving
DNA. External hop: "Liminal Rooms" (Verse, 2023) — 256-edition p5.js series,
3500×5000 PNG output, "press [s] in live view to save"; named palettes
(Reds, FR/ST, 707). Her site: lisaorth.xyz (digital work) / lisaorth.com
(tattoo).

**Aurora** — "generative artist exploring human experience through shape and
light." The **Morgenrot** collection (genesis NFT project): every artwork
symbolizes the dawn of a new beginning. Observed (i02-038, i02-040): soft
full-bleed gradient backdrops (mint-to-cream; peach-to-lavender) with a
centered 3D-rendered orb inside a light square frame — one pearl-like with
banded strata, one smooth pink-violet gradient sphere. Radiating, calm,
"inner world unfolding in light and form." Per aurora.gallery: 4-piece genesis
micro-series (1/1s on Ethereum) named for the Anemoi winds (Eurus, Zephyrus,
Notus, Boreas); 28 traits; hand-crafted/curated rather than long-form.

### Techniques / code approaches
- p5.js as the lingua franca (Lisa Orth; Quentin's web-canvas practice).
- Plotter-ready vector output as a feature: SVG export baked into the work
  (Quentin's 's'-to-save-SVG).
- Infinite-loop animation design: compositions conceived as seamless cycles,
  not stills (Quentin).
- Curated 1/1 hand-finished generative pieces vs. long-form editions: Aurora's
  "hand-crafted generative art… uniquely curated 1/1" with video-loop + still
  deliverables.
- Gradient-pane + sphere motif system: 28 traits across backdrops/gradients
  (Aurora) — small trait space, high polish.

### Piece seeds (original, not copies)
1. **"Nees Study №n"** — Plotter-era homage without pastiche: a strict
   black-on-white geometric line system (rotated squares on a grid, one rule
   perturbation per row, à la Schotter) where the perturbation is a random walk
   the viewer reseeds by clicking. Still-first, code-drawn, printable.
2. **"Dawn Plotter"** — Aurora's dawn-sphere motif rebuilt in Lisa Orth's
   linework language: a radiant sphere implied purely through concentric
   hatching density on paper-white — no fills, no gradients, light rendered as
   line weight. Dawn as engraving.

---

## Issue #03 — Red Pill

### Curatorial thesis
"Pushing boundaries": the flaw being removed is **curation itself**. Long-form
collections (500+ pieces) can't be fairly reduced to a few wall slots, so
TGAM with Tannhäuser Gate built an **indexer** tracking everything the three
artists ever minted, on any platform, and the exhibition **rotates 15 works per
artist daily** — 1,350 unique works per artist, 4,000+ total across the
three-month run. The Matrix quote is the wrapper; the real idea is
infrastructure as curatorial statement: the museum becomes a feed, not a wall.

### Artists and visually observed work

**Ryan Bell** — "Software engineer, visual artist and musician" (Las Vegas).
Themes: radical complexity, recursion, playfulness; process = "inventing new
software tools to solve interesting technical challenges which yield colorful,
sophisticated visual forms." Live generative minting galleries at Art Basel
(Switzerland, Hong Kong). Brochure works: *Fragments of a Wave* #7/#431,
*Microgravity* #253/#268/#376, *Decision Trees* #26, *Organized Chaos* #60,
*Drip Cube* #97, *Sprocket Factory* #6/#180/#183, *Negative Space* #181,
*Antiflow* #55. Observed: (prada/497612, Decision Trees series) a one-point
perspective wireframe corridor with a white dotted vertical stem sprouting
cyan branching tentacle-strokes and particle spray — organic branching grafted
onto rigid perspective scaffolding; (i03-046) a black tree trunk whose canopy
is replaced by radiating multicolor dashes, standing in a perspective-grid
room — illustrative, playful, nature-via-math.

**Landlines Art** — "Exploring generative art." 10+ years at the code/medium
intersection; generative music history. Two workflows: **JavaScript + HTML
Canvas** in-browser, and **Python + Blender** for detailed 3D renders. Process
is iterative and accident-driven: "inspired by accidental coding mistakes that
push the project in a new and unexpected direction." Collaborative experiments
(ArtCardz: collectors curate generative operations applied in order). On-chain
innovation: *Distrukt* stored its Python code in a custom Tezos smart contract,
Blender (open-source) as the only external renderer dependency. Brochure
works: *Absolute Error* #11/#17, *Sedimentary Dissolution* #28/#36/#102/#108/
#175/#351/#464, *Archaea* #36, *Abrupt* #24, *Additive Synthesis* #76,
*Anamnesis* #89, *Aura* #7, *Dots* #15/#16, *Textiles* #63, *Negative Space*
#181. Observed: (i03-036) dense cellular network of thin hatched lines forming
black/gold/teal triangular cells — sediment-strata-like, maximalist line
density; the *Sedimentary Dissolution* language.

**Thomas Lin Pedersen** — "Visualization and beyond." Danish; bioinformatician/
data-scientist background. Started 2017 inspired by Anders Hoff (Incongruent);
early dynamic systems → monochrome → strong color palettes → texture + strong
geometry; "abandoning the pure dynamic aspects… incorporating texture and
stronger geometric forms." Insists on the **physical manifestation**: print is
"a big part of how the work should be explored," plus pen plotters and other
analog production. Systems take inspiration from old production methods to
capture their "fractal imprecisions." Brochure works: *Screens* #775/#834/
#987/#993, *Rapture* #842/#8779, *Constructive* 47, *winds* 4922/5060/7582,
*Yonder* 793, *Versum* #96. Observed: (prada/screens91, Screens #91) diagonal
isometric blocks in teal/white/pink on dark teal-black, visibly grainy with
misaligned color layers — Bauhaus/constructivist geometry with analog flaw.
External hop (thomaslinpedersen.art + Art Blocks interview + digiart21):
*Screens* (Art Blocks Curated, Jan 2022, 1000 pcs) is a **virtual
screen-printing system** — renders one color at a time onto a master image,
lightest to darkest; each virtual screen may be slightly misaligned, "a lovely
flawed balance"; 5 actors, 7 scenes, 3 interactions, 4 screen types, 14
palettes; grain/dithering as a deliberate 2021 focus after *Rapture*; taming
chaos via Kandinsky/Popova compositional cues. Companion tools on his site:
Screens Layers (build-up view), Surfer, Scaler, Sails, Show (fullscreen frame
mode). 25% of proceeds donated to Den Blå Planet (Danish National Aquarium).

### Techniques / code approaches
- Indexer-driven exhibition: track all mints per artist across platforms,
  rotate daily (infrastructure as curation).
- Virtual screen printing: single-color passes, deliberate misregistration,
  light→dark ordering, grain (TLP).
- Custom tool-building as the art practice itself (Ryan Bell); hyper-complex
  fractal math (*Microgravity*) vs. illustrative nature scenes
  (*Dreamcatchers Forest*) — range as a feature.
- Dual workflow JS/Canvas + Python/Blender; accident-driven iteration;
  on-chain code storage with minimal external dependencies (Landlines).
- Physical-first mindset: screen prints, pen plotter, engraved outputs as the
  intended final form, not merch.

### Piece seeds (original, not copies)
1. **"1,350 Mornings"** — Nod to the daily-rotation indexer: a piece that
   renders one composition per calendar day from a date hash — strict
   Bauhaus-style geometric blocks with exactly one misregistered color layer
   (TLP's flaw), where the misregistration offset equals the day-of-year. The
   flaw is calendrical; collecting days becomes the series.
2. **"Decision Grove"** — Ryan Bell's branching-trees-over-perspective-grid,
   but the branches are the literal decision paths of a tiny decision tree
   classifying the pixel field beneath it: ML diagram meets tree. One-point
   perspective room, one tree, branches as labeled splits.

---

## Issue #04 — Intersection (Oct 2022)

### Curatorial thesis
"Intersection" as human↔machine meeting point. The brochure's "previously on"
pages recap Issues #01–#03 (DOTS #16 Landlines/fxhash #510843, Fragments of a
Wave #28 Ryan Bell/fxhash #508658, Screens #91 TLP/Art Blocks #255000091),
then three artists each probing where the human ends and the system begins.
Andreas Rau (dialogue with the machine), riiis (naive/playful systems),
Rudxane (balance between human and machine).

### Artists and visually observed work

**Andreas Rau** — generative artist, interaction design + creative coding
background (Berlin/Oslo). "Builds bridges between the physical and the
digital in a continuous dialog between human and machine." Works span
interactive installations, kinetic sculptures, plotter/CNC drawings;
"playful interactions, organic movement patterns, rich textures, slowness,
unexpected breaks and overlapping rhythms"; music/nature influences; "the
becoming rather than the actual." Brochure series: Elevation, Concrete, Loom,
Tocata, City Scapes, Transition, Patchwork. Observed: (i04-040) pointillist
grain fields resolving into dark rectangular masses on light — stipple as
tonal system; (i04-044) cream ground, horizontal banded line-fields with a
dark swirling scribble mass overhead and thin triangle outlines below —
drawing vs. gesture; (i04-051) vertical glitch-textured bands in red/orange/
black — woven, screen-like. External hop (andreasrau.eu/loom/text/): *Loom*
(fxhash #79, Nov 2021) is a generative exploration of texture/color inspired
by Bauhaus textile artists — palettes drawn from Anni Albers, Gunta Stölzl,
Sophie Taeuber-Arp, Hilma af Klint; deliberately *sketches* rather than
finished weaves (a response to fxhash beta instability, incl. the famous
"bug #64" misassigned tokens); faint grid guidelines in some outputs.

**riiis** — self-described "naive designer," "console.love logger,"
"inconfident coder." Works: Bubbles, Manic, Peaks, typographic/symbolic
series. Brochure: BUBBLES, S-EXPRESSION #0. Observed: (i04-067, "Manic"-like)
dense field of small black dots and short gray dashes peppered with pastel
marks on light gray — controlled mania, dot-matrix energy; (i04-071,
"Bubbles") a central rectangle of dense multicolor confetti-noise (TV-static
particle field) ringed by scattered black/orange bubbles on white — the noise
core vs. calm margin contrast is the whole composition. Playful,
low-pretension maximalism.

**Rudxane** — visual artist (Amsterdam), "searching for balance between human
and machine"; HTML/CSS/JS + small interactive sites since the 90s. Tries to
inject human inconsistency into generative systems: "generative art can
sometimes feel too clean" — aims for the personal connection of heavy/soft
brushwork inside the algorithm. Series: Grid Studies, Bingo, Unfinished,
Giant Steps, Fold, rings. Brochure: TYCH #5 (fxhash #133432). Observed:
(i04-085, Tych-like) off-white ground, horizontal rows of tiny dot-dashes with
occasional bold black vertical bars — punch-card / musical-score / data-readout
aesthetic, the "Sheets" vernacular (spreadsheet, early terminal, PCB diagrams);
(i04-089, rings-like) concentric translucent neon arcs (green/cyan/pink)
radiating from a corner on white — pure luminous geometry. External note:
*Sheets* (Verse) "displays the explicit mathematical logic underlying its own
visuals"; six outputs translated into engraved metal plates — digital→physical
again.

### Techniques / code approaches
- Texture-as-subject: pointillist grain fields, woven bands, textile palettes
  (Andreas Rau).
- Noise-core compositions: dense particle/confetti centers with calm,
  bubbled margins (riiis) — contrast of densities as structure.
- Data-vernacular aesthetics: spreadsheets, staff notation, PCB diagrams as
  visual language; self-describing systems (Rudxane's Sheets shows its own
  math).
- Physical outputs: pen plotter, CNC, engraved brass plates.
- fxhash gentks across all three; long-form series thinking.

### Piece seeds (original, not copies)
1. **"Bubbles, Quietly"** — riiis's noise-core/margin contrast, slowed down:
   a monochrome flow-field particle core with a sparse halo of colored rings;
   particles that fall below a speed threshold "escape" and become halo rings.
   Still image of a dynamic rule.
2. **"Tych Cards"** — Rudxane's data-vernacular turned self-referential: staff
   lines of tiny ticks where the "data" is the piece's own draw-call log
   (counts per layer, per color) — the artwork visualizes its own rendering
   statistics as it draws, bold bars marking layer boundaries.

---

## Artist out-links for follow-up

Every artist, exact own-site URLs found (verbatim from sources; gaps noted
honestly — several artists have no discoverable personal site and live on
platform profiles):

**Issue #01**
- Synesthesia — own site not found (TGAM "Visit Synesthesia" redirect at
  https://tgam.xyz/visit/artist/Synesthesia could not be resolved; fetch
  failed). TGAM artist page: https://tgam.xyz/artist/Synesthesia
- Marcelo Soria-Rodríguez — iillucid.com (personal website named in the Issue
  #01 brochure). TGAM visit redirect: https://tgam.xyz/visit/artist/msoriaro
- Ismahelio — own site not found (TGAM visit redirect:
  https://tgam.xyz/visit/artist/Ismahelio, unresolved). Profiles:
  https://verse.works/ismahelio/exhibitions and
  https://www.artblocks.io/collection/invisibles-by-ismahelio

**Issue #02**
- Lisa Orth — lisaorth.xyz (stated as her website on her Verse and
  expanded.art profiles; tattoo work at lisaorth.com). TGAM artist page:
  https://tgam.xyz/artist/LisaOrth
- Quentin Hocdé — own site not found. Profile with work + technique notes:
  https://responsivedreams.com/artist/QuentinHocde
- Aurora — https://www.aurora.gallery/ (Morgenrot collection site). TGAM
  artist page: https://tgam.xyz/artist/Aurora

**Issue #03**
- Ryan Bell — own site not found (active as @iRyanBell). TGAM artist page:
  https://tgam.xyz/artist/RyanBell — interview:
  https://tgam.xyz/interview/a-casual-chat-with-ryan-bell
- Landlines Art — own site not found. TGAM artist page:
  https://tgam.xyz/artist/LandlinesArt — on-chain project write-up:
  https://paragraph.com/@kaloh/%E3%80%B0-discover-how-landlines-art-is-creating-innovative-on-chain-nfts
- Thomas Lin Pedersen — https://thomaslinpedersen.art/ — Screens project hub:
  https://thomaslinpedersen.art/work/screens/ — Art Blocks interview:
  https://www.artblocks.io/articles/in-conversation-with-thomas-lin-pedersen

**Issue #04**
- Andreas Rau — https://andreasrau.eu/ (bio: https://andreasrau.eu/bio/ ;
  Loom essay: https://andreasrau.eu/loom/text/ ). TGAM artist page:
  https://tgam.xyz/artist/AndreasRau
- riiis — own site not found. TGAM interview "A casual chat with riiis"
  exists on https://tgam.xyz/interviews
- Rudxane — own site not found. Profiles: https://verse.works/rudxane and
  https://www.lerandom.art/artists/rudxane

### Most interesting technique per issue (external-hop summary)
- #01 Synesthesia: CV gate + MIDI → custom Python scripts → vintage/modern
  audio gear → generative visuals merged with the audio signal; decentralizing
  audio-art distribution. (Hop limited: TGAM visit-link fetch failed; technique
  from TGAM artist bio.)
- #02 Lisa Orth: full-time p5.js/Processing practice, woodcut-linework DNA,
  "colliding textures, movement and color"; Liminal Rooms shows the working
  method (live view, named palettes, press-s-to-save PNG pipeline).
- #03 Thomas Lin Pedersen: virtual screen-printing — one color pass at a time,
  light→dark, deliberately misaligned screens, grain/dither as medium; print
  and plotter as the intended final form; companion web tools (Layers, Surfer,
  Scaler, Sails, Show).
- #04 Andreas Rau: Loom — Bauhaus-textile-inspired generative texture/color
  studies, palettes from four abstract-art pioneers, sketch-not-weave
  aesthetic; physical plotter/CNC outputs as continuous practice.
