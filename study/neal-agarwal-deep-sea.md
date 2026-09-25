# Neal Agarwal: The Deep Sea

**Site:** https://neal.fun/deep-sea/
**Author:** Neal Agarwal, neal.fun. The modern inheritor of the viral
interactive-toy lineage: Staggering Beauty (2010) and The Useless Web
(2012) made the one-joke page an art form; Agarwal turned it into a
publishing practice. Dozens of pieces, each one idea executed cleanly.
**Status:** 2026-09-25, technique-deep. Full Nuxt bundles fetched through
the session's egress proxy and read in source. The WebGL background
shaders, particle system, and scroll math below are recovered verbatim,
not reconstructed. Five scroll positions visually inspected at 1280x800
(0m, 1304m, 4924m, 9311m, 10924m on the page counter). One honest gap:
only 6 of 132 creature PNGs loaded in the headless session, so the
creature illustrations themselves were NOT visually inspected, only
their placements and labels. A visual pass on the creature art is still
wanted.

## What it is

A scroll-driven descent through the ocean. The page is ~185,000px tall
(at 1280x800) and maps the whole scroll to 10,924 meters: sunlight zone,
twilight, midnight, abyssal, hadal, ending at the Challenger Deep with a
short narrative about the Trieste descent. A depth counter sits centered
on screen and counts up as you scroll. Around 127 creatures appear at
authored placements, each with a label and a short caption; zone titles
and a handful of story beats (Titanic, Everest's height, the Trieste)
pace the trip.

## The technique

The scroll position is the entire instrument. Three systems read it.

**1. WebGL background.** One fullscreen quad, one fragment shader, color
computed in HSB via an hsb2rgb helper. The key uniform is
`depth = window.scrollY / window.innerHeight`, scroll depth in viewport
units. The shader:
- Above the waterline (`diff > depth + .222`) it draws the sky: a cream
  to light-blue vertical gradient.
- The surface is a white crest line: `gl_FragColor = vec4(step(.216,
  diff - depth))`, a hard step that reads as a wave line. `diff` is the
  screen y perturbed by fbm and a sine, so the line wobbles.
- Underwater, hue sits at .55 with brightness `1 - depth * .1`, so the
  water dims linearly with scroll. Add light beams
  (`.04 * sin(time * .01 + st.x * 15.)`), an fbm water wobble
  (`.008 * fbm(...)`), edge vignette shading, and the whole frame goes
  hard black past `depth > 12`.
- It is one draw call doing sky, surface, gradient, beams, and vignette.
  No textures, no scene graph.

**2. Marine snow.** A 250-point pool drawn as soft gray points with
additive-ish blending (`srcRGB: one`). Every 10 ticks the pool trims to
240 (FIFO shift) and refills with random spawn data: position in
[-1, 1] squared, size 0-10, phase, parallax 0.2-1.2, spawn scrollY and
spawn time. The vertex shader drifts each particle with scroll:
`scrollOffset = parallax * 2 * ((currScrollTop - scrollTop) /
viewHeight)`, so deeper particles lag differently and the field has
real depth. Point size pulses with `sin(timeDiff / 80)`, x wobbles with
`.01 * sin(phase + time * .01)`. Particles are culled above the surface
line. The specks visible in the black-zone screenshots are this system.

**3. The counter and content.** `setDepth` runs on scroll:
`depth = round(clamp(scrollY * 0.06 - 12, 0, 10924))`. Note the mapping
is viewport-dependent: the same meter reading lands at different scroll
positions on different screens. Content placement is data-driven: 60
authored depth stops carry captions, zone titles, and narrative text;
creature images sit at authored x/y placements across the column.

## What makes it sing

The counter is the whole trick. A number ticking up in the middle of
the screen turns scrolling into measuring, and measuring into
descending. The creature placements are rewards, not decoration: long
black stretches make each illustration land harder. The story beats are
spaced so the deepest, emptiest part of the page carries the Trieste
narrative, which is the only thing that could hold attention down
there. And the crest-line shader sells the single most important
transition (air to water) with one line of GLSL.

## Avoid-list

The viewport-dependent meter mapping quietly lies about the headline
number; on a tall screen you "reach" the Challenger Deep earlier. The
black mid-zones are honest to the subject but they are still empty
scrolling, and on a fast flick the page is minutes of nothing. The
creature layer is static PNGs at fixed placements: no swimming, no
procedural life, so the living world feels pinned compared to the
living background. A generative version would let the fauna drift.

## Doorways

Ambient Chaos (neal.fun/ambient-chaos) probed this session: a
sound-mixer board (rain, coffee shop, lofi beats, each with a volume
slider), not generative visual territory. Logged as a doorway into
sound toys, no deep study. The natural next hops from this session are
the map-driven toys (Asteroid Launcher, Internet Roadtrip) and the
drawing games (Logos from Memory).

## Seeds

82. **Depth Ledger** : a vertical scroll piece where scroll position is
the instrument, one WebGL quad behind everything, hue and brightness
driven by scrollY in viewport units, a centered counter that turns
scrolling into measuring. Success: the counter alone makes a visitor
scroll the whole page.
83. **Crest Line** : the surface boundary as the entire piece. One
fbm-wobbled white line divides two palettes; scrolling pushes the line
down and the lower world darkens past it. Success: the line never
tears, and crossing it changes the palette.
84. **Snow Ledger** : the marine-snow pool with nothing else. 250 soft
additive points, spawn at scroll, per-particle parallax drift, size
pulse. No text, no creatures, just weather you dive through. Success:
no two sessions alike, and scrolling feels like moving through water.
