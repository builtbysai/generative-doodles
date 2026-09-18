# Galleries: fxhash + OpenProcessing — Study Notes

## fxhash (Tezos/Ethereum long-form generative platform)

### What "long-form" demands
The defining constraint: ONE algorithm must produce hundreds/thousands of outputs,
each interesting, the set cohesive but never repetitive. This is the hardest design
problem in generative art. As Outland notes: projects with 500+ outputs that do it
well "can be counted on two hands" — Ringers (Dmitri Cherniak), Cargo (Kim Asendorf).

**Lesson for doodles:** Even for single pieces, design the *parameter space*, not the
image. Ask: "would 100 outputs of this still surprise me?"

### Standout projects & their moves
- **Uninhabitable** (Iskra Velitchkova / pointline) — entire system built from ONLY
  ellipses. Four compositions evoking "living constructions." Extreme constraint, again.
- **Acequia** (Rich Poole & The Paper Crane) — Spanish irrigation channels; day/night
  palettes; Escher-like stairs. Real-world reference → generative system.
- **Fragments of a Wave** (Ryan Bell) — wave physics as visual material.
- **horizon(te)s** (Velitchkova × Zach Lieberman) — collaboration across practices.
- **rtrdgtzr** (protocell-labs) — the MINTER is a collaborator: upload an image, get
  generative glitch post-processing (diffusion dithering, aberrated pixel sorting).
  Minter gets half the royalties. Co-creation as the artwork.
- **φφ** (nekropunk) — interactive: a sphere follows your mouse, scattering Kandinsky-like
  strokes. The piece is incomplete without a viewer.
- **Hashed Cities** (Yazid) — re-renders every minute, celestial bodies track real time.
  Time as a parameter.
- **Inward** (Sabha) — incomplete circles slowly connecting; color restraint.

### Platform mechanics worth stealing
- **Deterministic hash → seed:** every output reproducible from its hash. (Our doodles:
  `?seed=` param does the same job.)
- **fx(params):** collectors tune parameters before minting — parametric co-creation
  (echoes Hobbs's QQL "parametric artist").
- **Curation:** the best long-form artists CURATE — Molnár/Grasser's Themes and Variations
  and Cory Haber's SOL 365 selected outputs rather than shipping everything. Curation
  is part of the algorithm.

## OpenProcessing
Community sketchbook — thousands of p5.js sketches, ranked by hearts. Best used as:
- A trend radar (what techniques are circulating this month)
- A source of "what's overdone" signals (if 50 sketches do the same flow field,
  avoid it or push it somewhere new)

## Gallery-study method (going forward)
1. Browse fxhash explore / OpenProcessing top-monthly.
2. For pieces that stop the scroll: identify the ONE technique + the ONE compositional
   decision that makes it work.
3: Ask "what parameter space produces this?" not "how was this image made?"
4. Log overdone patterns to an avoid-list.

## Avoid-list (starting)
- Default Perlin flow fields with rainbow palettes
- Unmodified circle-packing with pastel fills
- "10 PRINT" tiled lines presented as finished work
- Generic particle systems with no compositional intent
