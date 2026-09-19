# Yohei Nishitsuji: Study Notes

**Site:** yoheinishitsuji.com | **X:** @YoheiNishitsuji | **Playground:** twigl.app, fragcoord.xyz | **Interview:** codrops 2025 ("Rendering the Simulation Theory")

**Depth:** deep. Six award works were downloaded from yoheinishitsuji.com/art and
viewed at full resolution. His posted shader sources were read in full via X-post
mirrors, and one more shader was read out of the handwritten code watermark he
prints inside his own artworks. The X profile itself is login-walled, as usual.

## Who he is

A physicist by trade, wave mechanics, geophysics, machine learning, now fusion
energy and AI at Sumitomo. He came to fractals through the science: self-similarity
kept showing up in his wave research, in coastlines and shells and galaxy
clusters, and he decided to take the universe on directly in code. Every piece
he publishes fits inside twigl.app's geekest limit, about 300 characters of
GLSL. He has the awards to show it is not a gimmick: grand award at Asia Digital
Art Award FUKUOKA, a Code Graphics win, SHIBUYA AWARDS, ART OLYMPIA.

## Core techniques

### The 300-character universe
His whole practice is a wager: if a few hundred characters are enough for a sky,
then the universe runs on the same kind of compression. His famous claims are
specific: clouds in 267 characters, sky in 280, ocean in 267, an electron
microscope in 267. This is code golf as a metaphysical statement, and the
discipline shapes every technique choice below.

### The log-polar tunnel transform
The signature move, repeated across half the pieces I read. After raymarching a
step, he remaps the point to `vec3(log(R) - t, <height term>, atan(y, x))`, that
is, log-radius, a height ratio, and angle. This turns an infinite corridor into a
repeating tile along one axis, so a cheap accumulation loop reads as an endless
fractal tunnel. Variants show up in the slime mold piece, the sea floor piece,
and the "mother sponge" membrane.

### Nested cosine/sine interference instead of noise
Where most shader artists reach for fBm noise, he builds his fractals from
tightly nested trig loops: `e += dot(sin(p.xz*s), cos(p.xx*s + t)) / s` with `s`
doubling each iteration, or `cos(dot(cos(p.zyy*s), cos(p.xyx*s))) / s`. No noise
textures, no hash functions, just interference patterns summed over octaves.
It is why his surfaces look like wave interference rather than smoke: standing
waves and membranes instead of turbulence.

### Fake raymarch with additive accumulation
Most of the 300-char pieces skip real SDF marching. The pattern is: walk a ray
forward by tiny steps, remap to the log-polar tunnel, accumulate a trig sum,
and paint it through `hsv(hue, sat, value)` directly onto the framebuffer. Color
is rarely composited; it is added, piece by piece, per step.

### Particle-loop fireworks
His "fireworks" piece (267 chars) works differently: a single loop of 900
iterations, each iteration drawing one spark as a 2D distance falloff with
`hsv(R, u, exp(3 - e - l))`, particles arranged on expanding spherical shells
with per-particle phase offsets. Procedural crowds from one loop, no geometry
at all.

### The code as watermark
Several award pieces carry the actual GLSL source rendered as handwritten text
in a corner of the artwork. It is provenance, signature, and technique sheet in
one. Stealing the aesthetic is pointless; the recipe is printed on the canvas.

## Palette and composition

He is allergic to the neon-glow-on-black shader cliché, and most pieces read as
naturalist. The clouds are genuinely photorealistic: white cumulus, blue sky,
silver lining on backlit edges. The ocean piece looks like an aerial photo of
whitecaps. The slime mold and sea floor pieces are monochrome gray macro
studies. Where color appears it is restrained and physical: violet and white for
"galactic soup," copper and amber for "mother sponge," pure B&W for "upwelling
mantra." Compositions are often radial or centered, tunnels and membranes
filling the frame edge to edge, sometimes a single upward jet.

## What makes it sing

- The photorealism-per-character ratio. The clouds piece should not be possible
  in 267 characters, and yet it looks like a photo of backlit cumulus. The
  compression is the art.
- The interference aesthetic is genuinely his. The trig-octave loops give a
  tissue-like, membranous quality that noise-based work does not have. You can
  spot the look across pieces.
- The science-to-art pipeline is real, not branding. The log-polar transform
  and the wave interference are the same math he did for a living.
- Range inside the constraint: particle fireworks, fake-volumetric clouds,
  macro biology, cosmic soup, all from one 300-character grammar.

## Techniques to steal (not copy)

- The log-polar tunnel remap: `log(length(p))` for radius plus `atan` for angle
  is a cheap infinite corridor generator in any raymarcher
- Trig-octave interference instead of noise when you want tissue, membrane,
  or standing-wave surfaces rather than smoke
- The `hsv()` direct-to-framebuffer coloring with accumulation, for when you
  want palette control without compositing nodes
- Single-loop particle crowds: one iteration per particle, 2D distance falloff
  each, arranged on parameterized shells
- The code-in-the-corner watermark: printing the generating recipe inside the
  work as signature
- The discipline itself: cap a piece at N characters and let the constraint
  choose the techniques

## What NOT to do

- Do not copy his trig-octave recipe wholesale. The look is identifiable and
  the watermark trick means the recipe is his, publicly.
- The radial tunnel compositions are his default; ours should find different
  framing or they will read as Nishitsuji studies.
- His pieces are stills and looping renders, not interactive. Do not assume
  the techniques transfer directly to real-time interactive work without
  testing the frame cost.
- The naturalism depends on careful parameter tuning; golfed code with bad
  constants looks like static, and the tuning is invisible labor.

## Revisit notes

- twigl.app pieces themselves were not screenshotted (GLSL canvas render in
  headless Chrome was not attempted this pass); a revisit could run several of
  his twigl links through the rig and capture frames.
- His GitHub was not found this pass; worth checking for longer-form shaders.
