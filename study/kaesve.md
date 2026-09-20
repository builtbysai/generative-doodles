# Kaesve (Ken Soeradi Voskuil): Study Notes

**Site:** kaesve.nl | **Key projects:** breathing-shapes, urodela, reaction-diffusion,
morcom-wrote

**Depth:** deep (2026-09-20 visual pass: both project pages loaded live and
watched over multiple animation frames; both ship their full source inline in
the HTML, so every technique claim below is read from code, not guessed). Prior
preliminary pass (2026-09-18) covered only his writing: the reaction-diffusion
article and morcom-wrote.

## Why he matters for this project
Kaesve is in the Gorillasun mold: a creative coder who documents everything as
code-first articles. Dutch, writes under his own name, publishes project writeups
with the actual implementation. For a project built on "study, don't copy", people
who show their work are the most valuable sources. And here he goes further than
writeups: both project pages below inline their entire source in the HTML, so
the page IS the source.

## breathing-shapes (seen live)

**What it looks like:** a full-viewport canvas on near-black (#161616). Ten
nested pentagon outlines centered on screen, stroked in a gradient from bright
red [202,65,56] at the innermost polygon to slate blue [33,168,214] at the
outermost. Line width grows inward, proportional to the square of the stage
index times 5. The whole stack gently pulses on roughly a 9.4 second cycle,
and the inner polygons sit rotated relative to the outer ones, giving a subtle
spiral twirl. The center polygon is filled solid dark, so the stack reads as a
hollow wireframe tunnel with a dark core. A faint 1% alpha blue fill on each
polygon leaves a whisper of layering. No title, no writeup, no text besides
mail and github links in the corner.

**Technique, from the inline source:** a regular pentagon (n=5) of radius 80%
of the smaller screen dimension is generated, then 10 stages are computed by
walking a fraction d along each edge of the previous stage's polygon. That d
is (1/10)*(sin(t/1500)/4 + 0.75), so each stage is a linear interpolation
between neighboring vertices, and the breathing is just d oscillating with
time. Colors are lerped per stage from inner red to outer blue. Plain
requestAnimationFrame loop. Notably, a mousemove listener records the cursor
into a variable that is never used in the draw function: the piece is NOT
interactive, and the first impression that it reacts to the cursor was wrong
(the breathing cycle was coinciding with cursor moves). That listener is dead
code.

**What works:** the edge-walking interpolation is an elegant, cheap trick.
Instead of scaling concentric copies (which would look mechanical), stepping a
fraction along each edge of the previous polygon produces nested polygons
slightly rotated relative to each other, which is where the swirl comes from,
and the sine-modulated step size makes the whole stack swell and settle
organically. **What does not work:** the idea is thin. Ten concentric
wireframe polygons on black with a red-to-blue gradient is one of the most
overused tropes in beginner generative art, and the piece does nothing with it
beyond the pulse. No variation, no curation, no interactivity despite the
suggestive dead listener.

## urodela (seen live)

**What it looks like:** a white page with a small header ("A small experiment
in procedural animation, thanks to @Rujik", page title "Salamander"). On it
swim two green salamander/newt-like creatures built from chains of circles,
tapering from a broad head to a thin tail, with small stubby limb pairs and a
darker green outline. Head and tail tips are orange-yellow (goldenrod). The
creatures glide around the page with a smooth sinuous undulation, turning,
curling, and occasionally swimming near the cursor, which they seem to follow.
A small goldenrod dot marks the cursor and fades over about 4 seconds of
stillness.

**How the salamander reference shows up:** the name Urodela is the amphibian
order (salamanders and newts) and the page title is literally "Salamander".
The creatures read as newts through body plan only: broad head, long tapering
tail, four to six stubby limbs placed at hip points along the torso, green
skin with warm goldenrod accents. No texture, no face, no toes. It is a
body-plan caricature carried entirely by procedural motion.

**Technique, from the inline source:** each creature ("tim" and "sam", with
different width profiles, spacing, and speeds) is a spine of segments, each
storing position, angle, and width. The head steers (toward the mouse if it
moved in the last 4 seconds, toward the center if out of bounds, random walk
otherwise, all with a limited turn rate), advances at fixed speed, and every
following segment is pulled toward its predecessor while enforcing a minimum
spacing. This is a chain-follow (verlet-style) spine, which produces the
swimming undulation for free since the wander of the head propagates down the
chain with delay. Legs are procedurally planned: for each hip, two planned
foot positions are computed ahead of the body at fixed angles, and each foot
steps toward its plan only when a sigmoid "willingness" (built from
foot-to-plan distance and foot-to-body distance, with a hysteresis term
favoring the currently moving foot) exceeds 0.9. Rendering draws each segment
as a goldenrod circle, then a single polygon outline built from spine
positions offset perpendicular by segment width, filled translucent green
(#55ee55dd), with the head and tail tips in goldenrod. Legs are drawn as
simple straight green strokes from hip to foot; a full two-bone IK elbow
solver is present in the source but explicitly disabled with `&& false`. The
page also contains a disabled CCapture hookup for recording a 30-second webm
named "salamander_09", suggesting he captured clips for sharing on Twitter.

**What works:** the leg willingness function is the standout idea, a tiny
procedural decision system (sigmoid of distances plus hysteresis) that makes
the stubby legs step believably without any keyframes or IK. The head-steering
hierarchy (mouse, then bounds, then wander) is a clean behavioral stack, and
the chain-follow spine converts a wandering head into lifelike swimming with
almost no code. The goldenrod-on-green palette is charming and reads instantly
as a newt. **What is weaker:** the disabled two-bone IK means legs are
straight sticks, the body is circles and a polygon with no texture or
shading, and the white background plus tiny creatures can leave the page
feeling empty when they wander off-screen.

## Earlier verified work (from his writing)

### Reaction-diffusion from scratch
His writeup walks through a Gray-Scott style simulation using the Canvas API
(`setPixelData()`) and `requestAnimationFrame()`. Honest about the limits: notes
that Zach Lieberman's experiments show far more interesting renderings of the same
simulation, that his own implementation needs a WebGL translation for speed, and
that it could extend to more substances and dimensions. References Nervous System's
generative jewelry as the creative application to beat.

**Takeaway:** the rendering of the simulation matters as much as the
simulation: the same field can be drawn as pixels, contours, or heightfields.

### morcom-wrote (generative text)
Applies the reddit haiku-bot idea to the Yelp review dataset: split reviews into
sentences, count syllables, keep the ones that fit 5-7-5. Most results were
terrible (bad syllable counting, banal sentences). A few were gems, found only by
laborious manual scanning. His honest conclusion: "the harder we looked, the more
it felt like we were generating the poems, instead of the computer."

**Takeaway:** curation is authorship. Simple structural rules applied to a rich
dataset beat clever algorithms on a poor one.

## Techniques to steal (not copy)
- Nested polygon interpolation by edge-walking with a time-modulated step
  fraction (breathing-shapes). Cheap, no easing library, organic pulse from
  one sine term.
- Chain-follow (verlet-style) spine animation: steer only the head, let
  delayed segment-following generate swimming undulation (urodela).
- Sigmoid "willingness" gating for procedural stepping, with a hysteresis
  term so limbs commit to a step (urodela). A reusable pattern for procedural
  legs, arguably the most study-worthy trick on either page.
- Color as structure: single gradient lerp across stages, or translucent body
  fill over goldenrod joints to imply volume with zero shading code.
- Behavioral steering stack: mouse attention, then screen-bounds recovery,
  then random wander, all turn-rate limited (urodela). The mouse-following is
  what makes a trivial demo feel alive.
- Authoring for shareability: the CCapture hookup shows he designs short
  capturable loops for posting, and both pages inline their full source, so
  "publishing source" here means the page IS the source. Breathing-shapes is
  listed under "toy projects" on his index; urodela is not listed on the index
  at all (the /projects/ index itself 403s).

## What NOT to do
- Concentric wireframe polygons on black with a red-to-blue gradient and a
  sine "breathe" is a well-worn beginner trope; without variation, curation,
  or interactivity it reads as a sketch, not a piece.
- Dead interactivity: a mouse listener that does nothing is worse than no
  listener, it invites the viewer to expect response that never comes.
- Disabled-but-shipped code paths (the two-bone IK behind `&& false`) suggest
  a piece abandoned before the legs were finished; the stub legs are the
  visual cost.
- Single-sentence project pages with no writeup hide the technique from
  anyone who does not read source; fine for toys, bad as a pattern for
  finished work.
- Empty-canvas syndrome: on urodela the creatures wander off and the page sits
  blank white for stretches; a procedural piece should keep its subject in
  frame or fill the field.
