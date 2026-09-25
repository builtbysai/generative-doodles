# Olivia Jack / Hydra — Deep Study Notes

**Date:** 2026-09-23 (study pass), second pass 2026-09-25
**Artist:** Olivia Jack, ojack.xyz. Programmer and artist, San Francisco to
Bogota. Works in open-source software, live coding, cartography, experimental
interfaces. Research: algorithmic representations of uncertainty and chaos,
peer-to-peer networking, live coding as a dialogue loop between performer and
machine. Developer of Hydra (2018 to present). Also: Live Lab (networked
performance over a peer-to-peer mesh), PIXELSYNTH (2016, browser synth that
makes sound from images and drawings, after the 1937 ANS synthesizer), Maps
for getting lost (2015, generative self-destructive street maps drawn in the
browser), founding member of the Anti-Eviction Mapping Project. Currently
with the ATI-erra performance laboratory in Bogota, doing interactive visuals
for dance and theater. A CultureHub residency blurb names the axes she was
pushing: video feedback, non-linear dynamics, live coding, telepresence.

**Focus of this pass:** Hydra itself as a technique engine, not a gallery
visit. hydra.ojack.xyz was unreachable by the page-fetch tool this session,
so the site UI and her own performance visuals were studied secondhand only;
what follows is text-deep on the docs (cheatsheet, hydra-book, getting
started, audio guide) plus a local WebGL re-render of three canonical
patches, built from the documented semantics and visually inspected at
1280x720.

**Second pass (2026-09-25):** the real engine this time. hydra-synth 1.4.0
source read end to end (hydra-synth.js, glsl/glsl-functions.js,
generate-glsl.js, output.js, lib/audio.js), and three canonical sketches
run in the actual hydra editor code in headless Chrome (software WebGL)
with the frames visually inspected at 1280x800, zero console errors. Two
hops followed outward: PIXELSYNTH (full bundle source read, live UI and
real pointer-drawn strokes inspected) and fubbles (concept plus video
frames inspected).

## The instrument

Hydra is a browser video synthesizer you live-code in JavaScript. Every line
evaluates instantly; the picture changes while you type. The syntax is
borrowed from analog modular synthesis: patch together sources, transform
their geometry and color, and terminate the chain at an output.

```
osc(10, 0.1, 1.5).mult(shape(3, 0.4).repeat(3, 3)).kaleid(5).out()
```

That is the whole grammar: a source, chained transforms, `.out()`. Four
output buffers o0 to o3; `render()` shows all four. `src(o0)` reads a
buffer back as a source, which is how feedback loops are built. Sketches
serialize into the URL, so a piece is a link. Errors print in red at the
bottom left and the last good state keeps running, which is the design
decision that makes live coding survivable.

## The vocabulary, as documented

Sources: osc(freq, sync, offset), shape(sides, radius, smoothing),
voronoi(scale, speed, blend), noise(scale, offset), gradient(speed),
solid(r, g, b, a), src(tex). External: s0.initCam(), initImage, initVideo,
initScreen. Geometry: repeat, rotate, pixelate, scale, scrollX/scrollY,
kaleid(nSides). Color: color, invert, thresh, posterize, contrast,
brightness, hue, saturate, colorama, and r/g/b channel scalers. Blend: add,
sub, mult, diff, blend, layer, mask. Modulate family: modulate,
modulateRotate, modulateScale, modulatePixelate, modulateKaleid,
modulateHue, modulateRepeat. Array parameters: osc([5, 10, 20, 40]),
[].fast(), [].smooth(), [].ease(). Live values: time, mouse.x, mouse.y,
width, height, bpm, speed, and any arrow function, e.g. () => a.fft[0].
Synth settings: hush() stops everything, setResolution(w, h), render().

## Technique specifics worth stealing

**osc is a color organ, not a stripe maker.** freq packs the stripes, sync
is multiplied by time AND freq so higher frequencies scroll faster, offset
cycles 0 to 2PI and shifts the phase between the three channels, which is
what pumps the color. One full screen cycle is osc(Math.PI * 2). Adding
thresh() or posterize() turns the smooth bands into hard op-art stripes;
pixelate() plus a mismatched osc frequency gives beat artifacts.

**Modulate is a displacement map.** Every modulate function re-samples the
signal at shifted coordinates driven by another signal. The hydra-book is
explicit: modulation is look-up, so pushing happens opposite the positive
axes. A grayscale modulator only shoves pixels left and up; to push in all
directions you remap color to [-1, 1] with add(solid(1,1), -0.5). modulateHue
is documented down to the shader line: the shift is
vec2(g - r, b - g) * amount / resolution, which is why it shoves in both
directions natively and ignores the name's promise of hue math. This is the
core insight: in hydra, color channels are just numbers, and geometry is just
another signal to be modulated.

**Feedback is the generative engine.** The canonical one-liner:

```
noise().modulate(src(o0), 0.9).out(o0)
```

New noise each frame, sampled at coordinates bent by the previous frame.
It is the digital twin of pointing a camera at its own monitor: structure
accumulates, drifts, and smears. Change 0.9 to 0.3 and the loop dies into
static; push past 1 and it tears. The amount knob is the whole composition.

**The 99 trick.** kaleid() with a large segment count makes circles; 99 is
the live-coding sweet spot because it is big enough and only two characters.
Live-coding ergonomics shape the aesthetics directly: short tokens win, so
hydra sketches favor terse, high-leverage functions.

**Audio reactivity is a parameter, not a mode.** The a object (meyda FFT)
exposes a.fft[i] in 0..1: osc(10, 0, () => a.fft[0] * 4). a.show() draws the
bins, a.setBins(6) picks resolution, a.setCutoff / a.setScale calibrate the
floor and ceiling, a.setSmooth(0.8) is the temporal glue. Any number in any
chain can listen. Studied from the audio guide only; no microphone on a
headless box, so this part stays text-deep.

## Re-render study (local WebGL, hidden_files/hydra-study/)

Three canonical patches rebuilt from the documented semantics. Shader
bodies are behavior reconstructions, not copied from hydra-synth source.
All three compiled clean and were visually inspected at 1280x720.

A. osc(10,0.1,1.5).mult(shape(3,0.4).repeat(3,3)).kaleid(5): a five-fold
rosette of rainbow osc bands cut by a triangle grid. The signature hydra
look, instantly recognizable: kaleid turns the multiply into a mandala.

B. noise().modulate(src(o0),0.9).out(o0): ping-pong FBO feedback, 900
frames. Gray noise settles into flowing directional streams, exactly the
analog synth smear. The still alone explains why feedback is the heart of
the instrument.

C. voronoi().color(1,0,1).diff(osc(10,0.1,1.5)).modulateRotate(osc(10,0.1,1.5),0.9):
the rotate modulator dissolves the voronoi cells into warped vertical
bands; diff keeps the osc stripes biting through the magenta field. Shows
how modulateRotate destroys structure as a deliberate move.

## What makes it sing, and what is overdone

It sings because of immediacy and terse power: change one number, the
screen obeys, and the signal-flow model means five tokens can build a
universe. Color-as-data is the idea with the longest legs.

Overdone, per the docs themselves: the hydra-book warns that most
example snippets are deliberately LOW saturation, because default
full-saturation osc plus kaleid is generic psychedelic wallpaper. Add to
the avoid list: unmodulated rainbow osc, kaleid-as-decoration without a
modulator driving it, feedback at 0.9 with no color discipline. Hans's
rule maps cleanly here: the instrument rewards restraint, one palette,
one modulator, one feedback amount.

## Under the hood: hydra-synth source, read end to end (2026-09-25)

The first pass reconstructed hydra from its docs. This pass read the
machine itself, and the docs hold up: the implementation matches the
documented semantics almost exactly, with a few details the docs never
mention.

**The chain compiler (generate-glsl.js).** Every chain compiles to ONE
fragment shader drawn on one fullscreen triangle. The five types from the
source header comment are the whole type system: `src` creates `vec4 c`,
`color` rewrites `c`, `coord` rewrites `uv` before the source evaluates
(which means coordinate transforms in a chain apply in reverse written
order), `combine` merges two sub-chains, `combineCoord` warps one chain's
coordinates with another chain's color. Arguments that are themselves
chains (the classic `modulate(noise(3))`) compile into nested generator
calls with their own uv copies. Uniforms dedupe by name.

**The function bodies (glsl/glsl-functions.js).** Pleasingly un-magic.
`osc` is three sine ramps on st.x with r/g/b phase-shifted by the offset
argument. `kaleid` folds the polar angle with mod and abs. `voronoi` is
the standard 3x3 neighborhood search, points jittered by
`sin(time*speed...)`. `modulate` is one line: `_st + _c0.xy * amount`.
`shape` is the polygon SDF trick (atan, then
`cos(floor(.5+a/r)*r-a)*length(st)`). `modulateHue` really does shift by
`vec2(_c0.g - _c0.r, _c0.b - _c0.g) * amount / resolution`, confirming the
first pass's note that it ignores its name's promise of hue math.

**The ping-pong (output.js).** Four outputs o0 to o3, each owning two
framebuffers swapped every frame. `prev` and self-referencing `src(o0)`
sample the framebuffer that just rendered, which is the entire feedback
mechanism: no special feedback code exists, it falls out of the buffer
design.

**The live sketches, actually run.** `osc(20, 0.1, 0.8).out()` gave the
rainbow sine bars with visibly phase-shifted RGB channels.
`voronoi(6, 0.3, 0.3).modulate(noise(2.5), 0.4).colorama(0.01).out()`
dissolved the cells into gray marble flows. And
`src(o0).scale(1.01).rotate(0.01).blend(osc(10, 0.03, 0.8).kaleid(4),
0.7).out()` settled into a soft blue and orange tunnel converging on a
dark red center. All three frames inspected at 1280x800, zero console
errors.

**Audio (lib/audio.js).** Meyda loudness analysis on the mic, `a.fft`
bins (default 4, `a.setBins(n)` to change), beat detection borrowed from
the p5 music-viz demos. Headless there is no mic, so the bins sit at zero
and none of this was exercised live; the code path is as documented.

## Hop: PIXELSYNTH deep dive (2026-09-25)

**Live:** https://ojack.github.io/PIXELSYNTH. The reverse direction from
hydra: image to sound, after the ANS synthesizer (Evgeny Murzin, 1937).

The full bundle source was read (browserify, unminified). The drawing IS
the score: a playhead scans canvas columns left to right and loops, so x
is time, y is pitch (100 rows, chromatic scale from C3 by default, top row
highest), pixel brightness is loudness. The synth is 100 sine oscillators
created once and left running; each frame's column sets their gains with a
0.1 second linear ramp. Per row the value is (image red plus drawn red
times drawn alpha) over 255. A DynamicsCompressor sits on the master. The
playhead draws a hot-pink bar with mint amplitude ticks on an overlay
canvas; spacebar toggles playback. A NexusUI panel gives image
select/upload, invert/brightness/contrast, and repetitions/spacing/offset/
rotation dials for the stroke engine.

Seen live in headless Chrome: the UI inspected, and a trusted CDP mouse
drag drew three repeated parallel white strokes across the default
night-sky image (the 0.3 repetitions setting doing its work), zero console
errors. The playhead scan and the audio were not exercised in the harness
(no speakers, and the spacebar dispatch never visibly started the loop),
so the scan claims are from the source, which is unambiguous.

What sings: the oldest idea in this whole study (optical synthesis, 1937)
with modern plumbing. Draw a diagonal and you have drawn a glissando; the
score and the picture are the same object. Nothing for the avoid-list,
it is a clean one-idea instrument.

## Hop: fubbles doorway (2026-09-25)

**Page:** https://ojack.xyz/work/fubbles/. "Research into drawing as an
interface for creating live-codeable functions in real time."

The concept: a hand-drawn curve becomes a function evaluated live, a
modulation source you draw instead of type. Video frames visually
inspected: black background, a neon orange curve with square endpoint
handles being dragged in real time. Ryan Challinor saw the NIME 2020
workshop talk and built a "fubbles modulator" into Bespoke Synth the same
year. Presented at Hybrid Live Coding Interfaces (2020); residency at
hangar.org, Barcelona (2022).

What sings: it erases the code/value boundary. The drawing is the
parameter, not a picture of the parameter. No avoid-list notes; this is
research, not a product.

## Doorways from here

- Char Stiles: hydra performer, openprocessing sketches, the scene around
  the tool rather than the tool itself.
- Ted Davis: wrote the cheatsheet, Basil.js, the live-coding pedagogy angle.
- CultureHub residency "Undefined Spaces": the telepresence + non-linear
  dynamics axis, multi-browser distributed synth over WebRTC.
- PIXELSYNTH: the reverse direction, image to sound, ANS lineage.
  Consumed 2026-09-25, see the deep dive above.
- fubbles: consumed 2026-09-25 as a doorway, see above. The Bespoke Synth
  fubbles modulator is the implementation to study next.
- flok.cc: collaborative live coding with a hydra target.
- The hydra sketch gallery on social.toplap.org and the hydra book: the
  scene's own canon.
- videoface: her hybrid code-and-graphics editor.
- Maps for getting lost: cartography doorway, cross-links to the Hodgin
  meander study from this same day.
