# Codrops: Creating Generative Artwork with Three.js (Eduard Fossas): Study Notes

**Depth:** text-deep. Full article excerpts and the demo repo README were
recovered from search archives, including the core grid code. The live demo
was unreachable from this environment, so the actual rendered artwork was NOT
visually inspected. Treat visual claims below as reconstructed from the code,
not observed.

**Sources:** tympanus.net/codrops/2025/01/15/creating-generative-artwork-with-three-js/
(Jan 15, 2025), github.com/eduardfossas/codrops-generative-artwork-three

## Why it matters for this project
This tutorial is art-history rule extraction done for the browser-3D era. Same
family as Gorillasun's Neo Supremus (study a master, extract the rules,
generate new instances), but the output is a parametric, interactive WebGL
piece instead of a static image. It also shows how to push thousands of
elements at 60fps without breaking a sweat.

## Core techniques

### 1. Derive a modular grid from the reference artwork
The author's method, step by step:
1. Import the master artwork (Lygia Clark's geometric abstractions) into Figma.
2. Overlay layout grids until the composition's elements snap to one.
3. Trial and error revealed most elements fit a 50x86 grid with no gutters.
4. That grid becomes the code's coordinate system.

No fancy math, just patient reverse-engineering. The grid is the score the
generative performance plays from.

**Takeaway:** When borrowing from a master, the layout grid is the most
valuable thing to extract. It carries the composition's DNA without copying
any single image.

### 2. instancedMesh as the workhorse
The 50x86 grid becomes ONE `instancedMesh` of wireframe planes: 4,300
instances, a single draw call. Per-instance transforms are written every frame
in `useFrame` through a throwaway `dummy` Object3D:

```
const dummy = new Object3D();
// per frame, per instance:
dummy.position.set(x, y, 0);
dummy.updateMatrix();
mesh.current.setMatrixAt(i, dummy.matrix);
```

**Takeaway:** For grid-based work with thousands of cells, instancing is the
right primitive. One geometry, one material, per-instance matrices. This is
how you do "ten thousand things moving" in a browser doodle without melting it.

### 3. One method, five art-historical targets
The demo repo is not one piece but a collection, all built the same way:
- **Lygia:** Lygia Clark's geometric abstractions
- **Richter:** Gerhard Richter's stripe paintings
- **Richter Farben:** Richter's color grid paintings
- **De Stijl:** the De Stijl movement's geometric style
- **Shapes:** minimalist circular compositions

**Takeaway:** Build the engine once, point it at five different masters. The
comparative series is itself the artwork: it proves the method generalizes.

### 4. Parametric interactivity as the medium
Leva controls expose the parameters in real time: palettes, layout values,
camera (orthographic and perspective views). The viewer does not just look at
the piece, they play it. Our `?seed=` + click-to-regenerate is the lo-fi
version of this; sliders and palette switchers are the hi-fi version.

**Takeaway:** For interactive doodles, decide which parameters are playable and
expose exactly those. Too many controls is a settings panel, not an artwork.

## Palette and composition
Reconstructed from the code and descriptions, not observed: wireframe black
planes on light grounds for the Lygia piece (Clark's own work is largely
black/white with occasional color), bold stripe palettes for Richter, primary
plus black/white grids for De Stijl. The compositional discipline comes from
the extracted grid, not from the author's invention, which is the point.

## Philosophy
- The masters did the compositional thinking; your job is the system that
  replays it with variation.
- Trial and error over theory: the 50x86 grid was found, not derived.
- Interactivity should feel like playing an instrument, not configuring software.

## Techniques to steal (not copy)
- Reverse-engineer a master's layout grid in Figma, rebuild it as code
- instancedMesh + dummy Object3D pattern for high-count grid pieces
- One engine, multiple art-historical targets as a series
- Curated playable parameters (Leva-style) instead of static output
- Orthographic camera option for flat geometric work: it removes perspective
  distortion and makes the grid read as pure composition

## What NOT to do
- Do not rebuild the Lygia/Richter/De Stijl pieces themselves. The method
  transfers; the specific grids do not. Pick different masters, or better,
  derive grids from non-art sources (maps, textiles, architecture).
- Do not reach for Three.js when canvas 2D would do. The instancing lesson
  matters at thousands of elements; a 64-ring piece does not need WebGL.
