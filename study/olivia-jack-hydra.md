# Olivia Jack / Hydra — Deep Study Notes

**Date:** 2026-09-23 (study pass)
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

## Doorways from here

- Char Stiles: hydra performer, openprocessing sketches, the scene around
  the tool rather than the tool itself.
- Ted Davis: wrote the cheatsheet, Basil.js, the live-coding pedagogy angle.
- CultureHub residency "Undefined Spaces": the telepresence + non-linear
  dynamics axis, multi-browser distributed synth over WebRTC.
- PIXELSYNTH: the reverse direction, image to sound, ANS lineage.
- Maps for getting lost: cartography doorway, cross-links to the Hodgin
  meander study from this same day.
