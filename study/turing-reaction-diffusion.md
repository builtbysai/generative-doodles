# Turing 1952: reaction-diffusion, from morphogens to the crescent zone

**Date:** 2026-10-01
**Subject:** The 1952 paper that put pattern formation on a chemical footing, and the sixty years of simulation, classification, and texture synthesis that turned its instability into a working medium for graphics
**Hop path:** named first among the next doorways by the 2026-10-01 D'Arcy Thompson study, which treats Thompson's grids and Turing's equations as the two great pre-digital theories of form; Turing read Thompson and cited him in the lineage the Kawaguchi study surfaced
**Depth:** deep on the Gray-Scott mechanism and the parameter space (Sims tutorial page read end to end, Munafo Pearson-classification page read end to end, 4 mechanism families re-rendered locally); the 1952 paper itself read through its abstract, section map, and the OCR text of the opening sections, not cover to cover, and no original laboratory Turing-pattern photographs were inspected this session

## The paper and the man

Alan Turing (1912 to 1954) wrote exactly one paper on biology. "The Chemical Basis of Morphogenesis" appeared in the Philosophical Transactions of the Royal Society of London, Series B, volume 237, number 641, pages 37 to 72, August 1952; received 9 November 1951, revised 15 March 1952. He was at the University of Manchester, in Max Newman's computing laboratory, and the paper's Section 13 is titled "Non-linear theory. Use of digital computers": the numerical examples in Section 10 were worked with machine help, which makes this one of the first papers in biology whose figures depend on a computer.

The argument, in Turing's own opening sentence: "a system of chemical substances, called morphogens, reacting together and diffusing through a tissue, is adequate to account for the main phenomena of morphogenesis." Such a system may start perfectly homogeneous and still develop pattern, because the homogeneous equilibrium can be unstable: random disturbances trigger an instability that amplifies into structure. He considers the onset of instability in detail for a ring of cells, "a mathematically convenient, though biologically unusual system," and finds six essentially different forms the instability can take. The most interesting: stationary waves on the ring, which he suggests might account for the tentacle patterns on Hydra and for whorled leaves. A sphere is considered too (gastrulation), a two-dimensional system that gives "patterns reminiscent of dappling," and stationary waves in two dimensions as a possible account of phyllotaxis.

The point that still lands: diffusion is the destabilizer. Diffusion usually smooths things out; Turing showed that when two chemicals diffuse at different rates while reacting, diffusion can break symmetry instead of erasing it. The pattern is not drawn anywhere. It is what remains when a uniform state falls apart in an orderly way. The formal name is diffusion-driven instability, and every later realization (activator-inhibitor, Gray-Scott, Schnakenberg) is a way of building two chemicals with the right relationship: local self-amplification, long-range suppression, the fast one carrying the suppression away.

## The afterlife, in order

**Theory.** Gierer and Meinhardt (1972) gave the activator-inhibitor formulation its working form, modeling Hydra regeneration: a short-range activator that promotes its own production and a long-range inhibitor that suppresses it. Hans Meinhardt then spent two decades turning it into pictures: "Models of Biological Pattern Formation" (1982) and "The Algorithmic Beauty of Sea Shells" (1995), where cone-shell pigmentation patterns are grown by reaction-diffusion on a growing edge, one time step per shell increment. This is the session's one missing primary: the seashell book is famous and quoted everywhere, but no page of it was opened here.

**The lab.** For nearly forty years nobody saw a Turing pattern in chemistry. The first came in 1990 from De Kepper's group in Bordeaux, in the chlorite-iodide-malonic acid (CIMA) reaction run inside gel reactors fed from stirred tanks: stationary three-dimensional structures with a characteristic wavelength of 0.2 mm. Ouyang and Swinney (1991) got quasi-two-dimensional hexagons and stripes in a disk reactor and mapped the bifurcation diagram. The trick that made it work: polyvinyl alcohol forms a complex with the iodine species, slowing the activator's effective diffusion, which is exactly the diffusivity asymmetry the theory demands. Lengyel and Epstein reduced the five-reactant system to a two-variable model. So Turing was right about the mechanism and it took chemistry four decades to catch up, which is worth remembering next time a simulation looks too clean to be real.

**The model that stuck.** Gray and Scott's 1984 autocatalytic system, U + 2V -> 3V, with U fed and V killed, became the standard playground after John Pearson's 1993 Science paper "Complex patterns in a simple system" mapped what it can do. The equations are small enough to fit in a tweet and the behavior is not:

dU/dt = Du * lap(U) - U*V^2 + f*(1 - U)
dV/dt = Dv * lap(V) + U*V^2 - (f + k)*V

U is the food, V is the thing that eats it and multiplies. Two numbers, f (feed) and k (kill), steer everything. Munafo's xmorphia page extends Pearson's fourteen classes (R, B, alpha through mu) with nu, xi, pi, rho, and sigma, and his page is the reference worth bookmarking: every class has parameter points, example renders, and a Wolfram-complexity assignment. The taxonomy's best line is its own: Pearson missed whole classes because he only ever seeded one way, a small disturbed square on a uniform background. Change the seed and new pattern types appear. The initial condition is part of the instrument.

**Graphics.** Ready (1991) "Reaction-Diffusion Textures" made it a texture-synthesis method: two morphogen fields with different diffusion rates, an isotropic pair that grows giraffe-like cellular patterns from a jittered diamond grid, and an anisotropic version whose diffusion triples are steered per direction to grow zebra stripes. Then the cascade idea, which is the compositional move: grow large spots, freeze the cells that hold them, run the small-spot system in the unfrozen remainder (cheetah), or freeze the white regions of a spot field and run a stripe system between them (giraffe reticulation). Witkin and Kass's "Reaction-Diffusion Textures" (SIGGRAPH 1991, Electronic Theatre, Prix Ars Electronica 1992) pushed it further into animated textures on surfaces. Karl Sims' tutorial page is the clearest single explanation on the web and the one this session worked from directly. Scott Draves' xscreensaver "rdbomb" (1997) turned it into wallpaper.

## The Sims recipe, verified

Sims states the working recipe plainly, and this session's re-renders used it verbatim: Du = 1.0, Dv = 0.5, dt = 1.0, Laplacian as a 3x3 convolution with center weight -1, orthogonal neighbors 0.2, diagonals 0.05. Initialize A = 1, B = 0 everywhere, seed a small area with B = 1. Visualize A as white, B as black.

His mitosis explanation is the paragraph to keep: the reaction has two stable states, all-A or all-B, and the interesting behavior lives at their borders. At a convex B border, more A diffuses in from nearby and the edge grows outward; at a concave border, less A arrives and B thins and dies. So a spot grows, its middle starves, and it divides. Cell division with no cell, from curvature alone.

The parameter map on his page plots kill rate on x (0.045 to 0.07) against feed rate on y (0.01 to 0.1). Most of the square is boring: solid A or solid B. Between them lies a crescent-shaped zone where the complex behaviors live. His second map warps that crescent into a rectangle so it can serve as a UI for picking (k, f) pairs. The compositional reading: the interesting region is a thin shoreline between two dead seas, and the map itself is an instrument, not an illustration. Sims also lists the options that turn the raw system into an art tool: orientation (anisotropic diffusion), style map (f and k varying across the grid, so different pattern types meet at boundaries), flow (advection of the chemicals), and scale (reaction rate relative to diffusion sets the feature size).

## What the taxonomy says

Munafo's two one-dimensional spectra are worth memorizing. The feed-rate spectrum: 0 no reaction, 1 irregular or chaotic, 3 regular periodic resembling sinusoidal oscillation, 5 steady change without oscillation, 7 takes long to reach an unchanging steady state, 9 fairly quickly reaches an unchanging steady state, 10 negligible reaction. The kill-rate spectrum: sigma all blue because k too low, A blue with negatons but no stripes, C negative stripes and spots but no positive spots, E positive stripes and spots but no negative spots, H reddish-yellow with solitons but no stripes, J all red because k too high. Two knobs, two independent axes of behavior.

Selected classes, with their Munafo parameter points: delta (the "true" Turing pattern, a hexagonal array of spots arising from an all-blue start with only small noise; F = 0.039, k = 0.055) versus the "Turing-similar" classes that need a large-amplitude seed, which is why the seed matters. Lambda, mitosis, spots dividing (F = 0.028, k = 0.061). Gamma, stripes that worm or branch (F = 0.022, k = 0.051). Mu, worms growing from both ends (F = 0.048, k = 0.065). Xi, BZ-like spirals (F = 0.010, k = 0.041). Rho, red soap bubbles with surface-tension behavior (F = 0.090, k = 0.059), which Munafo notes needs higher resolution than Pearson used. And pi, the U-Skate World (F = 0.062, k = 0.061): moving localized structures whose interactions change sign with distance, Wolfram class 4, "impossible to characterise the final outcome of a system just by looking at its initial state."

## Images inspected

1. **Sims tutorial banner** (full page width): a horizontal band of zebra-maze pattern, black on white with embossed lighting, the classic look the page teaches.
2. **Sims KF examples row** (four panels): coral labyrinth, spiral maze, cellular bubble net, fine labyrinth, the four canonical Gray-Scott faces.
3. **Sims mitosis vector diagram**: a dividing spot with arrows showing A diffusing into convex borders and away from concave ones, the mechanism as a cartoon.
4. **Sims parameter map pair**: the raw (k, f) square with the crescent zone between solid-A and solid-B regions, and the warped rectangular UI version.
5. **Sims options row** (four panels): orientation (radial stripes), style map (stripes meeting dots at a boundary), flow, and scale variants.
6. **xmorphia key map**: the full labeled (F, k) index image with all nineteen classes placed, plus the class gallery renders: alpha through mu with their example images, and Munafo's nu (long-timescale drifting solitons), xi (spirals), pi (U-Skate World), rho and sigma (soap-bubble networks).

## Local re-renders (hidden_files/study-2026-10-01-turing/render/)

One Python and numpy script, Sims convention throughout (Du = 1.0, Dv = 0.5, dt = 1.0, the 3x3 kernel), duotone ink-on-paper colormap, honest pixels. All Gray-Scott runs are seeded with a square carrying a wedge bite and moderate noise: large enough to nucleate reliably even at high kill rates (small clean seeds die, a real nucleation threshold), asymmetric enough to avoid the square seed's kaleidoscope symmetry. The seed-shape experiment below is why.

- **a_grayscott_classes.png:** six Pearson-class panels at 200x200. Spots (F = 0.035, k = 0.065) give a clean regular dot lattice. Worms (F = 0.048, k = 0.065) give elongated branching ridges. Coral (F = 0.0545, k = 0.062) gives the labyrinth. Solitons (F = 0.030, k = 0.062) give a dense small-dot field. U-skate (F = 0.062, k = 0.061) gives a sparse field of a few soft structures on gray. Maze (F = 0.029, k = 0.057) gives a fine organic maze texture. Finding: the six panels share nothing visually except the recipe. Two numbers really are the whole instrument.
- **b_schnakenberg_spots.png:** the textbook activator-inhibitor (Schnakenberg kinetics) from random noise around the homogeneous steady state, no seed at all. Two failed attempts taught the lesson first: textbook diffusion values (Du = 1.0, Dv = 40.0, dt = 0.06) blew up numerically within a few hundred steps, explicit Euler with the inhibitor diffusing forty times faster needs a tiny timestep, which is itself a lesson about stiffness. A first rescale (Du = 0.1, Dv = 4.0) was stable but gave a five-pixel wavelength that rendered as pixel static, the Turing instability is scale-free only in the continuum, on a grid the wavelength has to be bought with diffusion. The working render (Du = 0.5, Dv = 20.0) resolves into a proper hexagonal spot array. This is the closest render to what Turing's own analysis describes, and unlike the Gray-Scott classes it grows from noise alone.
- **c_anisotropy.png:** the same worms point run twice, once isotropic and once with diffusion 3x faster along x. The isotropic panel branches freely; the anisotropic panel aligns into horizontal stripes. Finding: orientation is a one-line change to the Laplacian kernel and it turns the whole composition, exactly as Ready's zebra stripes show.
- **d_coral_growth.png:** the coral point sampled at 4 checkpoints from the bitten seed. Finding one: the whole labyrinth grows outward like a crystal front; the piece is a growth process photographed at four ages, and the final image contains its own history. Finding two, the seed-shape experiment: a uniform square seed grows with fourfold kaleidoscope symmetry that survives even strong added noise, because the growth front propagates from the square's straight edges; seven random seed discs give the fully organic labyrinth instead, but isolated small discs die outright at high kill rates (a real nucleation threshold, F = 0.035 / k = 0.065 killed them within 1500 steps). The working seed is a square with a wedge bitten out of one quadrant plus noise: large enough to nucleate, asymmetric enough to read as organic. The seed is a compositional ingredient, not a formality, which is exactly what Munafo's taxonomy page argues about Pearson missing whole classes by seeding only one way.

## What makes it sing

- The economy is extreme. Two chemicals, two numbers, and a shoreline-shaped region of parameter space produce an animal-coat catalog. Nothing is drawn; everything is grown.
- The instability framing inverts the usual design instinct. You do not construct the pattern. You find a uniform state that cannot hold itself together and you choose how it falls apart: the feed and kill rates select which falling-apart you get.
- The map is part of the medium. Sims' crescent-zone map and Munafo's labeled taxonomy are instruments for navigating the space, and the best generative pieces built on this system (Sims' own 2012 bio-inspired prints) treat parameter space as the canvas.
- Cascades and style maps are the compositional moves that keep it from being a filter. One system sets the ground, freeze part of it, run another in the remainder. Different pattern types can share one field with visible boundaries.

## What is overdone (avoid-list additions)

- The default coral render at Sims' example parameters, black on white, as a finished piece. It is the reaction-diffusion equivalent of a lens flare: technically correct and instantly recognizable as somebody else's settings.
- Kaleidoscope-symmetric growth from a clean seed, passed off as organic. Symmetry here is an artifact of a lazy initial condition.
- Calling any spot texture a "Turing pattern" when nothing reacted or diffused. The name has a mechanism in it; without the mechanism it is decoration.
- Grayscale B-is-black rendering without palette thought. Sims' own banner uses an embossed lighting model; the pattern deserves a material.

## Seeds

Seeds 322 to 324 added to FUTURE_PIECES.md this session.

## Honest gaps

- The 1952 paper was read through its abstract, section map (14 sections), and opening-section OCR text, not cover to cover; its figures were not inspected as originals.
- Meinhardt's "The Algorithmic Beauty of Sea Shells" identified as the key applied text but not opened.
- The Ready 1991 cascade details (spot sizes s = 0.05 and 0.2, freeze-and-rerun, initiator cells, anisotropic zebra parameters) are from a later paper's summary of Ready's method, not from the SIGGRAPH paper itself; the 1991 Electronic Theatre video was not watched.
- Pearson's Science paper via the xmorphia classification page and its arXiv reference, not the full text.
- No original CIMA laboratory photographs inspected; the 1990 confirmation is from secondary accounts.
- Whether Turing ran the paper's numerical examples on the Manchester machine was not verified from a primary source this session; only the section title "Non-linear theory. Use of digital computers" is confirmed.
- Re-renders are toy scale (200x200 and below) with forward Euler; the rho soap-bubble class did not form at this resolution and was dropped from the panel.
