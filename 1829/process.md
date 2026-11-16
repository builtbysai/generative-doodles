# №1829 Duet Infiltration

- Number: 1829
- Title: Duet Infiltration
- Gallery date: 2007 · 01 · 14 (formula date 2002-01-10 + 1830 days)
- Spec: TASKS.md prompt block ellen-fullman EF6 (PP1076), cron expansion study #239
- Suggested gallery note: "A cello line infiltrates the drone field between crossing wires. Drag to move through the room and mix cello and drone."

## Build

Single self-contained index.html with one inline script, following the house
rules from the recently shipped №1822 template: Visual Viewport sizing with
resize listened to on both visualViewport and window, canvas pinned in draw()
via canvas.style.width/height in px, phone detection via window.screen (min
dimension under 700px) with the aspect fallback, title/date plate and hint
plate drawn on the canvas.

The scene is a dark stage under a pink-red wash. Six steel wires of the Long
String Instrument cross the frame diagonally (four in one direction, two in
the other), each carrying a seeded ripple and an overtone partial (2, 3 or 5).
The cellist sits low right on a stool, inside the wires' territory: dark
silhouette with a pink-red rim light, varnish-brown cello with strings,
fingerboard and a bow that strokes slowly. Four quiet speaker markers sit at
the stage corners. A small gold ring marks the listening position.

Motion is a closed-form function of a fixed phase time. The cello line runs a
24 second phrase cycle: it plays for 16 seconds, stepping through partials
2, 3, 5, 3 in 4 second long tones, then rests for 8 seconds. While it plays,
the wires whose partial matches the current tone align their ripples and glow
pale gold, and the wires nearest the cellist glow partway; while it rests,
all wires return to their own slow breathing in steel. Frame one is fixed at
t = 60 s, phrase position 12 s, so the cello is playing partial 3 and four
wires glow gold.

Interaction is drag only. Dragging moves the listening position (the gold
marker follows) and crossfades the mix visually: near the cello the warm
light pool around the player and the cello's prominence rise, near the wires
the drone glow takes over, at the center both voices are strong. The four
corner speaker markers brighten toward gold as the listener approaches each
one. There is no click-to-reload anywhere. A small "Sound: off" plate at
bottom right toggles sound; tapping it lazily creates the WebAudio graph
(four sine drone oscillators at 55 Hz partials plus a filtered sawtooth cello
line, gains driven by the same listener mix), never autoplay, and the piece
is fully legible silent.

All motion frequencies are well under 1 Hz, so flicker stays far below the
14 Hz limit. prefers-reduced-motion leaves the piece at its fixed first
frame. No em dashes appear in any visible copy. No notation or score is
shown anywhere.

## Deviations from the prompt

None in substance. Two small interpretations, both within the brief:

1. The prompt's "4-channel-ish field" is realised as four sine drone
   oscillators, one per corner speaker, with listener-proximity gains, plus
   a single filtered sawtooth cello voice. The cello is synthesized rather
   than sampled, since the piece must be self-contained.
2. The cellist is drawn 1.3 times larger on phones, so the seated figure
   stays readable on a tall narrow stage. The composition is otherwise the
   same on both sizes.

## Probe results

Probed through the piece's window.__probe hook (node-canvas, 1280x900):

- Frame one: playing = true, current partial = 3, phaseT = 60.
- Rest phase at t = 68 s (phrase position 20 s): playing = false,
  partial = 0, wires back to slow steel breathing.
- Listener mix (squared falloff, radius 0.7 stage units):
  - Near cello (0.72, 0.70): cello 1.000, drone 0.471. The cello line
    dominates; the nearest corner channel reads 0.754.
  - Center (0.50, 0.50): cello 0.820, drone 0.908. Both voices strong;
    all four channels read 0.484, the mix is balanced.
  - Near wires (0.35, 0.35): cello 0.471, drone 1.000. The drone field
    swallows the cello line; the nearest corner channel reads 0.676.

## QA

Rendered from the actual script with node-canvas and inspected:

- 1280x900 desktop: wires diagonal and crossing, four gold aligned wires,
  cellist low right readable, all four speaker markers clear of the plates,
  title/date and hint plates legible, listener marker centered.
- 390x844 mobile: full-bleed stage, cellist readable at the larger phone
  scale, plates legible, no clipping.
- 720x720 thumb: same composition, all elements legible at thumbnail size.

Fixes during QA: a stringified alpha passed to the rgba() helper crashed
the first render (helper now coerces its alpha to a number); the top-left
speaker marker sat under the title plate, so the corner markers moved
inward to (0.07, 0.13) and (0.07, 0.87); the cellist was enlarged 1.3x on
phones after the first mobile render read too small. All three sizes were
re-rendered and re-inspected after each fix.

Determinism: the 720x720 thumb was rendered twice from the final script;
both md5s are 620b6d368a481cf4f6d3cdf0fdf93503. No Date.now() or unseeded
Math.random() in the script; the only randomness is a fixed-seed mulberry32
PRNG (seed 1829). No em dashes in index.html or process.md.

- index.html md5: baa74d95c7b390f840eeb6c2241f48c6
- thumb.png md5: 620b6d368a481cf4f6d3cdf0fdf93503
