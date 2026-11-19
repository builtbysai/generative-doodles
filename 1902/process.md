# №1902 Fish Dance When They Are Not Sleeping

## The driver, as a felt phenomenon

A voice moves through dark water and the water answers. Somewhere in a
black-blue field a small school of luminous fish holds together, and when
the voice drifts the fish turn toward it, scatter a little, then gather
again around the sound, their swimming quickening and tightening with
each rise of the phrase and loosening as the phrase falls away. The
mapping is visible: a faint line ties the warm dot of the voice to the
nearest fish, so steering feels like leading, not poking. Let go and
nothing resets; the school keeps the formation you left it in and drifts
on, waiting for the next steer.

## Mechanism

A 2D canvas holds nine boid fish and one draggable source point. The
source point is the voice. A generative vocal phrase loops in 8 second
phrases with a contour variation per phrase index, and its amplitude
envelope drives the school. Dragging moves the source point; the fish
steer toward it, and the mapping line from the source point to the
nearest fish renders the steering vector, with fainter threads to the
next two nearest fish. Release leaves the source point where it was
dropped, so the school keeps its last formation and drifts around it.

## Boid rules

Each fish, every frame, combines five steering terms:

1. Attraction to the source point, weighted by distance so far fish
   hurry in and near fish settle.
2. Cohesion toward the school centroid, so the school holds together.
3. Separation from neighbours closer than 34 px, so fish never stack.
4. Alignment with the headings of neighbours within 90 px, so the
   school turns as one.
5. A slow sinusoidal wander, the water's own drift, near 0.5 to 0.7 Hz.

Velocity eases toward the desired direction each frame, capped at a
speed set by the phrase energy. Fish are soft-clamped inside the frame.

## Phrase and energy mapping

The phrase is a closed-form function of time, never sampled audio. An
8 second phrase loops; its index changes the contour phase, so each
loop varies. Energy is the phrase envelope, clamped to 0.08..1. Energy
sets the school density and speed: high energy gathers the school to a
68 px spread at up to 70 px/s and quickens tail wag; low energy lets it
spread to 150 px and drift near 24 px/s. The same contour drives the
audio pitch, a sine plus a triangle octave wandering a fifth around
330 Hz with 5 Hz vibrato, gain following the envelope. Audio is lazy,
created inside the first drag gesture only, never autoplay. The audio
oscillators are a model of the vocal line, not a recording.

## Frame one

Fixed phase, byte-reproducible: FIRST_T = 6 s, default source point
(0.42, 0.45). Fish start in a ring around the source point with
headings already pointed at it, so frame one shows the school oriented
on the voice mid-phrase. The loop continues from FIRST_T.

## QA hook

Read ?sx= and ?sy= (0..1) from location.search to override the source
point, for example ?sx=0.7&sy=0.3 renders a probe frame with the school
gathered around a different point. Values are clamped to 0.05..0.95.

## Interaction

Drag earned. Dragging the warm dot steers the voice through the water;
the fish orient, scatter, and regroup around it as it moves. Drag
travel is clamped so the source point stays inside the frame. There is
no click-to-reload, no volume slider, and no other control. Reduced
motion preference renders the static first frame only.

## Palette

Hand-picked from the named colors in the prompt:

- Deep water black-blue: #04101f, deep #020810, glow #0a2438
- Phosphor green fish: #39ff9c, dim #1fae6b, deep #0d5c38
- Warm source dot: #ffb347, deep #ff8c42
- Mapping lines: faint white #ffffff at 0.38 alpha to the nearest fish,
  0.14 to the next two
- Title plate: #dfeef2, dim #7fa8b5, hint #9fd8c2

## Composition and house rules

Field-like composition: full-bleed on phones, square on desktop, page
ground set to the piece's own deep water color. Visual Viewport sizing
with resize listened to on visualViewport and window. Canvas element
pinned in draw() via canvas.style.width/height in px. Phone detection
via window.screen, min dimension under 700 px, with aspect fallback
h > w*1.15. One synchronous frame at load; requestAnimationFrame
guarded with a typeof check so node-canvas QA works. All fading alphas
rounded to 4 decimals before stringifying. Every batched arc preceded
by moveTo; fish bodies are bezier paths, dots are paired arcs. Flicker
at or under 14 Hz by construction: phrase, wander, and tail wag all run
near 0.5 to 5 Hz. Title plate drawn on the canvas top-left, two lines
on narrow frames so it fits a 390 px phone, then
"№1902 · 2007 · 03 · 28", with the hint line at the bottom: "Drag the
voice through the water."

## Deviations from the prompt

None material. The school is nine fish, a small school, chosen so each
fish stays individually readable in the generous negative space. The
mapping line to the nearest fish is joined by two fainter threads to
the next nearest fish, so the steering reads as a pull on the whole
school rather than a single tether.
