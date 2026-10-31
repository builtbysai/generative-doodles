# No.552 "What Happens Next" — EXPANSION #66 cristina-daura, prompt CD8

## Concept

Daura's October 2026 method made generative: she takes a classic painting and
narrates what its frame cuts off. Here a flat, simplified homage to a classic
hangs in the center of a warm-white page, untouched and unanimated, while her
own cast invades from the margins to continue the story: a black cat with
yellow eyes pads in from the left, a pink rabbit hops in from the right, a tiny
teal door stands open on the frame's top edge pouring smoke, and a yellow
smiley balloon floats up from below. The classic is the straight man; all the
curiosity happens at its borders.

Tap reseeds: a new classic and a new set of 3–4 invaders enter on staggered
~2s flat slides, then settle into idle micro-motion (cat tail flicks, rabbit
ear twitches, door smoke rises, balloon bobs). Watch-only between taps, never
click-to-reload.

Initial frame (fixed seed 552066): the Vermeer-style interior, with all four
invaders, entry order rabbit, door, balloon, cat.

## Construction

Single self-contained `index.html`, canvas 2D, no assets. Design space is
1080×1080, scaled to fit and centered; the page ground is the margin color
#FAF6EE, so the letterbox is invisible. The painting occupies 756×540 (70% of
the stage width) with a thin black frame line, drawn clipped and never
animated.

The three classics are parametric flat-shape scene functions in original
muted tones (no sampled colors, no outlines):

- Seascape (Homer homage): sky #C9D4D2, sea #7E97A3 with #A9BCC0 / #93A9AE
  light streaks, shore #D9C9A3, rocks #6E7276, two girls in dresses #B0765F
  and #E3DCC8, skin #D9B08C, hair #6B5138 / #54432E, basket #9A7B4F, pale
  sun #E4E7DC.
- Interior (Vermeer homage): wall #D8C49A, floor #A98F66 with a flat light
  patch #C4AB7C, window frame #8A6F4D with panes #EDE4C4, wall map #C9B489 /
  #A68F5F, figure in bodice #4A5E7E and skirt #BE9A3C with white cap #F2EEE2,
  table #7A4A3A, jug #EDE8DA.
- Street (Hopper homage): building #A9715A, windows #5E4A42, cornice #8A5A48,
  awning stripes #B7BFA9 / #7C8B74, storefront #5F7A72, glass #87A398,
  counter #42554E, door #4C4238, sidewalk #B9B2A4, street #7E7A72, figure's
  coat #4A4440 and hat #3A3532, lamps #E4D9B0.

Invaders use the strict acid palette only, with black outlines: cat #111111
with eyes #FFD400; rabbit #F0438F; door #0E3B36 with glow #FF5A1F; balloon
#FFD400. Generation is seeded (mulberry32): each seed picks the classic,
draws 3–4 invaders from the shuffled cast, and assigns staggered entry
delays and idle phases. Entrances are position interpolations from offstage
starts with easeOutCubic (the rabbit adds a hop arc, the balloon a rising
drift). The clock is anchored as PHASE0 (12s) + elapsed, with the first frame
drawn synchronously at PHASE0 so every entrance is complete and the idles sit
at fixed phases; the rAF loop is typeof-guarded and a tap restarts the clock
at 0 so the new set plays its entrances.

Deviations, with reasons:

- Door smoke is warm gray #CFC7B4, outside the named invader palette: the
  prompt calls the door "smoking" but names no smoke color; a muted warm
  gray reads against both the teal door and the warm-white margin without
  adding an acid color Daura would not use there.
- The door stands in the top margin with its base on the frame's top edge
  rather than inside a painted sky: two of the three classics (interior,
  street) offer no sky at the frame's top where a door could stand without
  covering the classic, and the classic must stay untouched. Margin
  placement keeps that rule for all three classics.
- The cat and rabbit marks overlap the frame line by a few pixels (the
  invasion happens at the borders, as specced); total invader coverage of
  the painting stays near zero, far under the 30% cap.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- qa-desktop.png (1280×900): framed Vermeer interior centered on warm-white
  margins; window, wall map, table with jug and the standing figure reading
  her letter inside; black cat with yellow eyes at the left margin, pink
  rabbit at the right frame edge, smoking teal door on the top frame with
  puffs rising, smiley balloon below the frame; "tap" hint subtle at
  bottom-right. Nothing clipped.
- qa-mobile.png (390×844): same composition letterboxed on the warm white;
  all four invaders whole and legible, nothing clipped.
- thumb.png (720×720): same read at thumbnail size; invaders and frame all
  clear.

Determinism: thumb.png rendered twice and byte-compared with `cmp` —
identical; the second render was deleted. First frame is the synchronous
draw at constant PHASE0 = 12s (entrances finished, idles at fixed phases);
no `Date.now()` anywhere; rAF typeof-guarded (absent in the QA renderer);
no AudioContext, no `document.createElement`, no offscreen canvas. Canvas
sizing uses the Visual Viewport API with resize listeners on visualViewport
and window, canvas pinned in px inside draw(); phone detection via
window.screen (min dimension < 700) with the h > w×1.15 aspect fallback.
No microphone, no audio, no gradients, no external assets, no date strings.
