# Xor: Study Notes

**Site:** xordev.com | **Tutorials:** mini.gmshaders.com | **GitHub:** github.com/XorDev | **Profile:** x.com/XorDev

**Depth:** deep. xordev.com, mini.gmshaders.com, and his GitHub profile were
visually inspected through the screenshot rig, and one of his posted shader
sources (mirrored from an X post to a gist) was read in full. His ShaderToy
page refused to load and the X profile itself is login-walled.

## Who he is

Xor is a graphics programmer with 14+ years of shader work, "the GameMaker
shader guy" per his own GitHub bio. His stated specialty, from xordev.com:
procedural generation, original works, creative problem solving, and squeezing
the most out of minimal code. His signature discipline is the Shader Arsenal:
complete minimalist fragment shaders, each under 280 characters. He also ships
commercial work at real scale: a CRT shader for Atari's Power Rangers: Rita's
Rewind, animated effects for xAI's Grok logo, and dynamic backgrounds on the
Las Vegas Sphere with Shopify.

## Core techniques

### Raymarched SDF scenes in a fragment shader
His 3D pieces (Candy Ravine, a 3D raymarched game built in 4 hours; Realtime
Raytracing with soft shadows, AO, and reflections) use the standard SDF loop:
define the scene as signed distance functions, march the camera ray forward by
the SDF value each step, shade on hit. The supporting tricks:
- Soft shadows: sample the SDF several times along the light ray, derive the
  penumbra from the minimum of the distance ratios.
- Ambient occlusion: 5 short-range SDF taps at shrinking scales, accumulated.
- Glow: additive 1/d or exponential falloff near surfaces.

### The sub-280-character arsenal
The compression tricks that recur across his tiny shaders:
- Cosine palette (Inigo Quilez's formula): `a + b*cos(2*pi*(c*t+d))`. Four
  constants, endless harmonious color.
- tanh tonemapping: `col = tanh(k*col)`. Smooth HDR rolloff in one call.
- Simplex noise plus domain warping: feed noise-warped coordinates back into
  noise for the smoky fluid look of his Turbulence piece.
- Glow kernels: `0.02/abs(d)` style falloffs.
- Iterative accumulation: a loop of ~50 iterations perturbing a point, each
  adding palette color scaled by a distance falloff. This is exactly the
  structure of the shader I read in full: uv transformed by a rotation matrix,
  a turbulence value from snoise2D added to the point, then color accumulated
  as `(cos(sin(i)*vec4(1,2,3,1))+1.0) * exp(sin(i*i+t)) / length(...)`.

### Texture-free post effects
Voronoi-pixel sampling for pixel-art stylization, halftone imitating CMYK
print, Dual-Kawase and mipmapped blur for cheap strong blurs, chromatic
aberration, scanlines, and CRT curvature. All computed, no assets.

## Palette and composition

His thumbnails favor deep black with neon glow (magenta, cyan, orange) and
heavy bloom. The Turbulence thumbnail: blue-white smoke swirls with teal glow
text. The SDF thumbnail: neon pink letters inside a glowing fractal SDF
boundary. His avatar is a dark orb of tangled light streaks. The overall look
is synthesized glow on black: high contrast, additive color, blur treated as
composition rather than decoration.

## What makes it sing

- Density of idea per line. The 280-character constraint forces genuine
  compression skill, and the outputs still look rich.
- Educator's clarity. mini.gmshaders.com splits each effect (turbulence,
  efficient chaos, dot noise, fractal texturing, volumetric raymarching) into
  a short tutorial with a live shader as the header image.
- Range: tiny 2D glow shaders up to full raymarched games, all in the same
  minimal-code aesthetic.

## Techniques to steal (not copy)

- Cosine palette for instant harmonious color ramps
- tanh tonemapping instead of clamping highlights
- 1/d glow falloff around SDF boundaries
- Domain-warped simplex noise for smoke and fluid
- The tiny-shader discipline: find out how much fits in one fragment main()

## What NOT to do

- Glow-on-black bloom is overdone in shader art generally. His distinction is
  the minimalism and commercial-grade polish, not the glow itself.
- Do not lift his golfed snippets wholesale. Use the principles, write our own.
