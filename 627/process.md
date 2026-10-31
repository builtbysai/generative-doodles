# No.627 "The Marvelous Dance of Cause and Effect"

EXPANSION #76 soledad-romero, prompt block 3 "El Baile Causa-Efecto".
Her ALETEO book as a causal chain: nothing happens on screen without a
visible cause, and every cause starts at the butterfly.

## Concept

A butterfly sits on a gold perch at the left, wings slowly opening and
closing over a night-indigo field. Every wingbeat (about every 6 seconds,
or on a tap) emits a chain of 14 beads that travels right across the full
width on its own horizontal lane (5 lanes, stacked, never crossing). A
dotted gold thread runs through the beads. Each bead morphs through a
transformation pair as it travels, its stage a pure function of its own
journey progress. When a bead reaches the right edge it dissolves into a
firefly that arcs along the top of the frame back to the butterfly, fades
into the wings, and refills the butterfly's glow. Dragging across a chain
plucks it: the beads wobble and that chain's transformation speeds up for
about 2 seconds, then relaxes. Chains always complete their journey.

Palette (strict): night indigo #1A2440, butterfly amber #E8B93B, dawn
rose #E87B9C, day cream #F5F1E8, leaf green #5C8A4D, thread gold #C98A2E.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no
text anywhere except the page title. Canvas size comes from the Visual
Viewport API with resize listeners on both visualViewport and window;
the canvas style width/height are pinned in px inside draw() every
frame. Phone detection uses window.screen physical size (min dimension
under 700px), with the aspect ratio h > w*1.15 only as fallback; on
phones the butterfly shifts right (x = 0.20 W) so the wings are not
clipped, and lanes refit the taller frame. Page ground is the indigo.

Pair-stage drawings (each bead is drawn in a box of half-size s, and a
morph crossfades between consecutive stages with globalAlpha):

- Pair 0, seed cycle: stages [dot, sprout, round fruit, dot]. Dot: a
  green seed disc with a gold heart. Sprout: a gold stem with two green
  leaves. Round fruit: an amber sphere with a cream highlight, gold stem
  and one green leaf. Stage position = local progress x 3, so the bead
  ends where it began.
- Pair 1, night cycle: stages [night, dawn, day, night]. Night: an
  indigo disc ringed in gold with two tiny gold star dots. Dawn: the
  same disc with a rose lower half and a cream semicircle rising at the
  horizon. Day: a cream disc with an amber core and eight short gold
  rays. Stage position = local progress x 3.
- Pair 2, season: stages [winter, spring]. Winter: a bare gold branch
  with three naked ticks. Spring: the identical branch with five green
  leaf discs grown along it. Stage position = local progress x 1.
- Pair 3, death to life: stages [ghost oval, sprout figure]. Death: a
  hollow cream oval outline, slightly tilted, with two small cream eye
  dots (abstract, no skull features). Life: a green sprout figure, stem
  and two leaves with a small cream round head. Stage position = local
  progress x 1.

Chains cycle through the four pairs in order (seed, night, season,
life, seed, ...), driven by a chain counter. The butterfly's wings are
two amber wing pairs (gold-edged upper wings with cream spots, lower
wings with a rose spot) squashed horizontally by a sine flap whose phase
puts the wings exactly half open at t = 0; the body is a small gold
spindle with antennae. A wingbeat also fires a short gold ring pulse.
The glow around the butterfly is five concentric amber layers with
falling alpha (no shadowBlur, no filters), and it is refilled by 0.25
each time a firefly arrives home, decaying slowly otherwise.

Determinism: frame one is a synchronous draw at phase 0. Chain 1 (seed
pair, lane 1) is pre-placed with head progress 0.78, so its 14 beads are
spread across the lane with morph stages varying from sprout at the tail
to fruit at the head, thread visible. Two fireflies are pre-placed with
negative birth times so they are already mid-arc along the top in frame
one. No Date.now anywhere; all motion runs on an elapsed clock anchored
at the first rAF timestamp, and rAF is typeof-guarded so the QA
renderer (which has no rAF, no AudioContext, no createElement, no
offscreen canvas, no ctx.filter) draws the single fixed frame. Firefly
wander uses mulberry32 seeded streams.

Interaction: pointerdown within 0.11 x min(W,H) of the butterfly is a
tap (wingbeat plus a fresh chain in the next free lane; if all 5 lanes
are busy the tap increments a pending queue that the next automatic
wingbeat drains). Pointer drag elsewhere plucks any chain whose lane
band and horizontal span the pointer crosses.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical. The second render was deleted. Re-verified after the
  glow fix round; still byte-identical.
- Desktop read-back: indigo field, amber butterfly at the left with
  wings half open and a soft layered glow, one dotted gold chain
  mid-flight in the top lane with bead stages visibly progressing
  (sprouts at the tail, amber fruits at the head), two small fireflies
  on the return arc near the top. No text, nothing clipped.
- Mobile read-back: butterfly fully visible at the left with its glow,
  the chain legible across the top lane, both fireflies visible, lanes
  refit the portrait frame, nothing clipped.
- Fix round 1: the first glow build used two large flat-alpha amber
  discs, which read as a hard-edged grey moon behind the butterfly, and
  the firefly halos had the same hard edge. Rebuilt both as concentric
  layers with falling alpha, shrank the glow radius, shortened the
  perch stem. Re-rendered all sizes and re-ran the byte-compare.

## Deviations

- The death stage of the death-to-life pair is drawn as a hollow pale
  oval with two eye dots rather than any skull-like form, per the
  brief's instruction to keep that pair abstract. Reason: the prompt
  says "pale skull-less ghost oval", so the oval is the drawing.
- The butterfly's body spindle is thread gold rather than a darker
  tone, because the strict palette has no dark tone that would read
  against the indigo ground; gold is the darkest workable palette color
  at small size and matches the perch and thread.
- Chain traversal is 24 seconds for the head bead, with the full chain
  (14 beads at 0.045 spacing) taking about 39 seconds to clear. With
  automatic wingbeats every 6 seconds and only 5 lanes, some automatic
  wingbeats find no free lane and emit nothing (the wingbeat and ring
  pulse still show; only taps queue). Reason: the spec caps active
  chains at 5 with one lane each and forbids crossing, so a lane must
  free before a new chain can exist; queuing automatic beats would
  eventually burst multiple chains at once and break the steady rhythm.
