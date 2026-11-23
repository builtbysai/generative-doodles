# №1972 Scene 1: Preface

TL5 / PP1219, study #257 theodora-laird.
Gallery date: 2007 · 06 · 06. Gallery note: "A hand-bound book: Narrator and Chorus alternate while the room behind the words shifts. Tap to turn the page."

## What it is

A hand-bound book page fills the screen, typeset like a zone6press
chapbook: a ZONE6PRESS imprint, a scene kicker, an italic scene
title, and Narrator and Chorus voices set in alternating blocks.
Behind the text, barely visible, a generative tableau shifts per
scene: a gray room for the Preface, a shoreline for Scene 2, a
dark stage for Scene 3, a room after rain for Scene 4, a dawn coda
for Scene 5. The text is the foreground; the scene is the room the
words are spoken in. A cream veil is laid over every tableau so the
type never competes with the picture. The book has a fixed scene
order and it ends: five scenes, then the last page stays put.
All five scene texts are new short scenes written for this piece
in the observed register; no chapbook text is copied.

## Palette

- Aged paper cream #f2ead8 (page ground), paper shadow #e2d5b8
- Ink black type #211d18
- Gray room wash #8a8d90, sea gray #7e8b8c, stage black #1a1a1c
- Rain gray green #8b9187, dawn pale wash #d9c9a8
- Spotlight warm pale #e8d9a8

## Interaction

Tap to turn the page. Each tap advances one scene in the fixed
order, the tableau crossfades, the new text types in at reading
speed (55 characters per second), and a paper sheet wipes across
for 0.7 s as the page turns. Tap is a page turn, never a reseed;
the scenes are never randomized. Further taps on the last page do
nothing, and the hint changes to "The book ends here." No audio:
visual only. Motion is all slow drift (dust, waves, rain, rising
light), well under the 14 Hz ceiling. prefers-reduced-motion
renders a still frame with the text whole.

## Determinism

FIRST_T = 6 s. Scene 1 began at t = 0, so at t = 6 its text is
fully typed in (typing runs at 55 characters per second and the
Preface holds 240 characters, done by about 4.4 s). The gray room
tableau is fully faded in and the dust is mid drift. Every
tableau element is a pure function of the clock and the scene
index: seeded particle positions, wave phases, rain falls, and
ripple radii. QA hooks: window.__draw(t), window.__piece1972
with scene(), title(), typed(t), total(), tap(), sceneStart(),
redraw(t), firstT. Query params: ?t= sets the virtual clock,
?seed= is an alias for it.

## Scene order

1. Preface (Prayer): gray room, window, light shaft, dust motes.
2. The Shoreline: horizon, slow wave lines, three gulls, foam.
3. The Dark Stage: curtain folds, one spotlight cone, dust in
   the beam.
4. A Room After Rain: window with sliding rain streaks, puddle
   with slow ripples.
5. Coda (Benediction): rising dawn bands, a tall door of light,
   motes drifting upward.

## Probes

Probe harness /tmp/probe-1972.js (loads the actual script in the
render-piece node-canvas shim):

- Frame one (t=6): scene 0, "Preface (Prayer)", typed 330 of
  240 characters, md5 578583efb9ea0260082493bb305811d1, identical
  to the re-rendered desktop frame, deterministic frame one
  confirmed.
- Tap 1 at t=6: scene 1, "The Shoreline", sceneStart 6, typed
  43 at t=6.8 and 110 at t=8, fully typed by t=12, md5 distinct
  from frame one at every probed time.
- Tap 2 at t=12: scene 2, "The Dark Stage", typed 55 at t=13,
  fully typed by t=18, md5 distinct again.
- Taps 3 and 4: scene 3 "A Room After Rain", scene 4 "Coda
  (Benediction)", fully typed at t=25.
- Three extra taps past the end: scene stays 4, "Coda
  (Benediction)", md5 unchanged at 299de343681793e1ab0457738b178e96,
  the book ends.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. All three inspected visually,
plus per-scene desktop renders from /tmp/scenes-1972.js (all five
scenes checked: shoreline waves and gulls, dark stage curtains
and spotlight cone, rain window and puddle ripples, dawn door of
light, each with its own text and page number). Thumb md5
120f3e7b1dba0565cbc61f3a704e54b4, re-rendered after the final fix
with identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean, but the text block sat high on the
   page with a large empty lower half on desktop and mobile, and
   the tableau was fainter than intended. Fix: body type grew
   (clamp 18 to 27 px) with wider line spacing, the voice block
   is now laid out from the full text and centred between the
   header rule and the footer so its position never moves while
   lines type in, and the cream veil lightened from 0.62 to 0.55
   with the room window and light shaft strengthened.
   Re-rendered and re-gated after the fix.
2. After fix 1, the gray-room window crossed the text on the tall
   mobile sheet, its pane lines running through the words. Fix:
   the window and light shaft are drawn on desktop only; on
   phones the gray room reads through its wash, floor line, and
   dust. Re-rendered all three sizes and re-gated; mobile is
   clean, desktop and thumb unchanged.

## Deviations from the prompt

None material. The prompt prescribes five fixed scenes with the
gray room, shoreline, and dark stage named and two more in the
same register; Scenes 4 and 5 are A Room After Rain and Coda
(Benediction). The page-turn wipe runs 0.7 s and the tableau
crossfade 1.2 s; both are short, so the new text is typing
within a second of the tap.

## Known warts

- On desktop the gray-room floor line passes just under the last
  Preface line, and the wave lines in Scene 2 cross the text
  block; both are faint by design, but a strict reader may notice
  the lines behind the words.
- In Scene 4 the rain window sits close behind the italic scene
  title on desktop; the title stays fully readable.
- The dawn bands in Scene 5 are very pale, so the coda tableau
  reads mostly as the door of light and the motes.
- The light shaft in the gray room is subtle under the cream veil;
  the window frame carries most of the room read.
