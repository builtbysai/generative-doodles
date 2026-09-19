# Houmahani Kane: Scroll-Reactive 3D Depth Gallery (Codrops)

**Source:** article "Building a Scroll-Reactive 3D Gallery with Three.js, Velocity,
and Mood-Based Backgrounds" (2026-03-09, tympanus.net/codrops) |
**Demo:** tympanus.net/Tutorials/DepthGallery/ (live, visually inspected at rest,
mid-scroll, and deep; WebGL needed software rendering in this environment) |
**Repo:** github.com/houmahani/codrops-depth-gallery (fragment.glsl and
galleryData.js read in full; article snippets match the shipped code)

**Depth:** deep. Three demo states visually inspected, full shader source and
gallery palette data read.

## What it is

A scroll-driven editorial gallery, not a carousel. Images are stacked along the
Z-axis in 3D space, the camera dollies forward through them as you scroll, and
each image carries a three-color palette that drives a live GLSL background.
Scroll speed is measured and reused everywhere as a signal. The effect is a walk
through moods: warm golden, then violet, then afterglow, then cobalt, each
transition continuous with no hard cuts. Flower photography (Lummi.ai) on planes
whose sizes follow the image aspect ratio; editorial labels sit beside each
plane with color chips (HEX, RGB, CMYK, PMS).

## Core techniques

### Z-stacked planes + scroll-driven camera

Six placeholder planes first, real images later; discipline of getting structure
right before decoration. Each plane: position (x from data, y 0, z = -index *
planeGap with planeGap = 2.5 world units). Scroll is split into raw and
smoothed: scrollTarget += wheelDelta, scrollCurrent = lerp(scrollCurrent,
scrollTarget, smoothing), camera.position.z = startZ - scrollCurrent *
scrollToWorldFactor. The smoothing value controls cinematic laziness; the
conversion factor keeps pixel input from hurling the camera. Bounds are computed
from the actual plane Z range (getDepthRange), converted to scroll limits, and
both target AND current are clamped. Clamping only one lets smoothing overshoot
the boundary. A useful general pattern for any scroll-driven 3D scene.

### Velocity as a first-class signal

rawVelocity = scrollCurrent - previousScrollCurrent per frame, then damped
(lerped toward raw with a damping factor), clamped to a max, and snapped to
exactly zero below a stop threshold (kills micro-flicker at rest). This one
number then drives: background brightness lift, plane "breath" (tilt toward
cursor and scale pulse), the trail, the scroll drift. Key design insight: one
measured signal, reused everywhere, is what makes the scene feel coherent
instead of assembled. The author built a debug visualizer for velocity BEFORE
wiring it to anything visual (press D on the demo), so he was never tuning
blind. That is a working discipline worth stealing: instrument first, then
decorate.

### Mood system: per-image palettes blended by depth

Each image owns three colors: background + two atmosphere blobs. As the camera
moves between planes, blend (0..1 from camera position between the two plane
depths) lerps the current palette into the next. The shipped palettes:
golden (#fffaf0 / #ffdf94 / #fce7c4), violet (#fffaf0 / #d29a41 / #bb96af),
afterglow (#5f81ab / #f88b8d / #cfbbdd), cobalt (#5b9bc2 / #ffaa00 / #00e1ff),
meadow (#7d936e / #fdd895 / #a5b599). Note the trick: several moods share the
same near-white background so the *blobs* carry the mood, and the label text
color flips (#2e2e2e on light, #f4f4f4 on dark) based on mood darkness.

### The fragment shader (real source, not simplified)

Minimal and instructive. Flat background, two soft blobs (smoothstep on
distance from animated UV centers, blob colors first mixed 35% toward the
background to soften them), then color += uVelocityIntensity * 0.10 (the
velocity luminance lift, subtle), then film grain via fract(sin(dot(...)))
hash, then clamp. The blob centers drift on slow sine/cosine pairs with
unrelated frequencies (1.0, 1.618, 0.794, 1.272, 0.927, 1.414, 1.175, 0.618,
times a tiny time factor), so the atmosphere never visibly loops. Author tried
richer systems (top/mid/bottom colors, extra accents) and deliberately cut them:
harder to debug, unnecessary. The takeaway is restraint: one background, two
blobs, grain, done.

### Three layers of micro-motion

1. Parallax: pointer X/Y shifts each plane, deeper planes shift more (depth
factor times a per-plane influence).
2. Scroll drift: planes lean in the direction of the gesture and lazily float
back to center on stop. "Like they have weight." Works best on trackpad.
3. Breath: scroll speed tilts planes toward the cursor and pulses scale.
Parallax = where the mouse is, drift = which direction you are scrolling,
breath = how fast. Clean taxonomy for any interactive scene.

### The trail

A curve that winds across screen space driven by scroll progress: x and y are
sine oscillations of progress (horizontal/vertical cycles), z stays ahead of the
camera. Points go into a THREE.CatmullRomCurve3 ('centripetal', which handles
sharp turns best), getSpacedPoints for even sampling, then a tube rebuilt every
frame with radius tapering from head to tail by a power curve (t^1.5, fat head
to thin tail), plus sparkle particles at the head. In the screenshots it reads
as a single elegant white curve sweeping the frame; at rest it is nearly
invisible, in motion it guides the eye forward. The trail almost did not ship:
the author felt the scene was complete and only added it because the earlier
cosmic version had one. Good instinct about knowing when to stop, and a counter
example where "one more thing" earned its place.

### Editorial label layer

Each plane gets a numbered word ("01 GOLDEN"), a color dot, and CMYK/RGB/HEX/PMS
values, inspired by an Instagram post from @thisislandscape. The point for us:
data presented as design detail. This layer turns a tech demo into something an
art director can connect with. Designers can swap the layer for product names,
campaign chapters, material references; the system does not care.

## Palette and composition choices

Warm photographic set with the mood carried by blobs, not by tinting the
images. Monospace editorial type (the whole UI is in a typewriter mono), tiny
caps, hairline color chips. Composition is deliberately sparse: one plane in
focus, others as blurred depth layers behind and ahead. The grain and soft
blobs keep a digital 3D scene feeling analog and printed.

## What makes it sing

The single-value coherence: depth drives planes, mood, and text; velocity drives
breath, brightness, trail. Everything answers to the same two numbers. And the
restraint in the shader: it would have been easy to make the background busy,
but two drifting blobs plus grain at low strength is exactly enough atmosphere.

## What is overdone (avoid-list)

- Scroll-jacking camera dolly is becoming a genre trope; without the mood
system and the micro-motion layers it would read as another "3D website"
template. The camera move alone is not the piece.
- The trail could easily have become decoration noise; it only works because it
is thin, single, and tied to progress. Sparkle particles at the head are the
one element that flirts with cliché.
- Velocity-driven brightness lifts and pulses are powerful but easy to
overdo; here the 0.10 luminance lift is small enough to feel like warmth, not
flashing.

## Lessons for doodles

1. Instrument first: build the debug readout for any measured signal (velocity,
audio level, pointer) before wiring it to visuals.
2. One signal, many uses: measuring scroll speed once and feeding it to five
systems beats five separate hacks.
3. Palette-per-item data: any sequence (images, doodles, plotter sheets) gets
richer when each item owns a mood triple and transitions blend continuously.
4. Clamp both the raw and the smoothed value when bounding driven motion.
5. Resist complexity in shaders: flat color + two blobs + grain carried this
whole atmosphere.
6. Scroll drift (planes following gesture direction with lazy return) is a
cheap, highly tactile detail worth porting to any scroll or drag interaction.
