# Awwwards WebGL archive: Study Notes (preliminary, archive index read)

**Profile:** awwwards.com/websites/webgl/ | Awwwards' curated WebGL category index
**Status:** 2026-09-19, preliminary. The archive index page was read in full as
text (about 30 listed sites, September 2026 crop). No individual site was
visually inspected and no artwork was seen. This is a genre survey, not a
technique deep dive. Needs a visual pass on individual sites.

## What the archive actually is

Not a gallery of artwork. It is a leaderboard of commercial sites that happen
to be built on WebGL, ranked by Awwwards' community voting. That framing matters
for how to read it: everything here is client work or portfolio work where the
3D is in service of selling something. The September 2026 crop shows the same
mix every month: studio and agency portfolios (Daniel Kiss, Leo Parpeix,
Gionatan Nese, Matt Jinn, Maria Vasilyeva), brand and product sites (Forge
Automotive, Spyker Cars, Cartier "Le Choeur des Pierres", Santioni Spirits,
USAvionix, SentientX, plnty.app, Streamline), music and culture (Arstraumur
electronic music, penguin.music, CHASING THE MOMENT, "11 mois sans toi(t)"),
and one-off experiments (Three.js Game Gallery, CRECHE - the tank, Filmbot,
The Tuscan Journey Begins, The Last Tango, L.I.S.A., Peryton Film, Noho,
Illoca, VIZZ, Persona Studio, Trevor Noah).

## The 2026 Awwwards WebGL technique stack (from genre research, not this page)

The page lists names only, so the technique notes below come from current
community reconstructions of how these studios build, cross-checked across
several public technique writeups. Flagged as reconstructed where the source
did not verify it on a live site.

The standard stack now is: three.js (often react-three-fiber plus drei helpers
plus the postprocessing EffectComposer), lenis for smooth scroll, GSAP
ScrollTrigger or ScrollSmoother for pinned sections, and the scroll position
mapped onto an animation timeline (gsap timeline.progress(), the classic "scroll
is the film reel" move). The recurring building blocks:

- A fixed WebGL canvas as a living background layer, with opaque DOM sections
  scrolling over it. This is the dominant architecture: 3D behind, content in
  front, never the other way around.
- Scroll-scrubbed camera paths: the camera moves through a 3D scene as the user
  scrolls, chapter by chapter, with the mood swapped per chapter through CSS
  custom properties (one line flips a two-color palette site-wide).
- Cursor-reactive scenes: particle fields, blobs, and displacement shaders that
  follow the pointer, plus custom cursor dots and magnetic buttons.
- GPU particles with FBO computation (position and velocity computed in
  shaders, not on the CPU), flow fields as living backgrounds, mesh gradients.
- Post-processing chain: bloom, chromatic aberration, depth of field, film
  grain. The grain and vignette do most of the "premium" work; the geometry
  underneath is often simple.
- Custom GLSL ShaderMaterials for hero effects (one public breakdown describes
  a glowing egg fracture effect: fragment shader cracks driven by scroll and
  a long-press interaction triggering environment variations via pointer
  events and elapsed time).
- SDF/MSDF text for crisp 3D typography, Draco compression cutting 3D model
  sizes by up to 90 percent, progressive asset loading split into story
  chapters so the first paint is fast.
- Audio tied to scroll milestones through the Web Audio API in the
  music-driven pieces.
- Always a static fallback: a CSS gradient or image for reduced-motion users
  and no-WebGL devices. The good studios gate on prefers-reduced-motion.

## What the genre is actually teaching

Strip away the client budgets and the pattern is small and portable. One
canvas, pinned behind the content. One scroll value, remapped to every
animation. One particle system with a mouse force. One palette swap per
chapter. The studios differ in art direction, not in machinery. This is the
same lesson the doodle studies keep returning: a tight constraint plus one
random or reactive parameter beats cleverness. Here the constraint is "the 3D
never blocks the content" and the parameter is scroll plus cursor.

What makes the winners sing is not polygon count. It is pacing. The camera
moves slowly, the reveals are staggered, and nothing looks fast. One
community skill file states the rule outright: slower reads as more premium.
If it looks fast, double the duration. That single line is worth more than
most of the shader code.

## What to take from it (study, not copy)

- Scroll as a timeline scrubber is the most reusable idea on the page. For a
  doodle, that could be a piece whose whole animation state is a function of
  scroll position: no autoplay, no loop, the visitor conducts it.
- Fixed canvas behind scrolling DOM is a clean way to put generative art on a
  real site without the art fighting the text.
- Chapter-based mood swaps via CSS custom properties: one state change, whole
  palette flips. Cheap, dramatic, and it keeps the code honest.
- Long-press as a second interaction channel (distinct from click and hover)
  is underused and worth stealing for an interactive doodle.
- The static fallback habit: even a throwaway doodle should degrade to a
  decent still image when WebGL is off.

## Avoid-list

- The failure mode of the genre is decoration without pacing: bloom and grain
  slathered over geometry that does nothing, at 20fps on a phone. Several of
  the listed brand sites almost certainly do this; the award is for the reel,
  not the frame rate.
- WebGL as a loading screen is a contradiction. If the first paint needs the
  3D to be impressive, the site already lost. The good ones paint content
  first and let the 3D arrive.
- New for the list: never let the canvas swallow the content. If the art needs
  the user to stop reading to appreciate it, it belongs on its own page, not
  behind a paragraph.
