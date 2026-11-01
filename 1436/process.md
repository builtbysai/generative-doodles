# №1436 "Forty-Four Frozen Moments" (nikolaus-utermoehlen NU5, PP659)

## What it is

Forty-four panels in sequence, each a lacquer-bright abstract ornament, that
together are one two-second shot: projected in order they become a single
ornament turning, coming together from the edges, breaking into two shapes,
disappearing. Shown still, each panel is a frozen moment, a petrified
cornerstone, with a one-word title beneath it.

## Composition

- Wall of 44 parchment cards on a lacquer-black ground: 11 columns x 4 rows
  on desktop, 4 columns x 11 rows on phones (full-bleed field).
- One panel is always the "current" frame: drawn last, slightly larger
  (3% expansion), with a prism-gold frame. The wall never crops to a single
  panel; the set stays visible.
- One-word titles run beneath the panels in title ink #1a1712 on parchment,
  so they read as a sentence across the sequence.

## The shot, as a per-frame phase

Phase p = i / 43 drives one shared kaleidoscope motif per panel:

- p 0-0.35: eight prism diamonds gather from the panel edges toward the
  centre (ring radius 0.88R -> 0.33R), and a centre star fills as they gather.
- p 0.45-0.70: the single ornament breaks into two shapes, offset left and
  right at 0.7 scale.
- p 0.80-1: the shapes fade to the panel ground and disappear; panel 43 is
  nearly empty, panel 44 would be the wrap back to panel 0.
- Rotation turns 1.5 full turns across the set (theta = p * 3pi); mirror
  skew alternates by panel parity, so neighbouring frames never match.

## Titles (prompt-specced text only)

The prompt's sentence is "SEHEN UNS LAUFEN IN GRÖSSTER EILE…". Each panel
carries one word beneath it, cycling through those six words in order, so
reading the titles across the sequence assembles the sentence repeatedly
and scrubbing passes through it. No other words were invented; no readable
sentence beyond the prompt's own words appears anywhere.

## Motion and interaction (scrub, not play)

- The sequence advances ONLY as the viewer travels. Dragging across the
  panels maps pointer position to the nearest panel and makes it current;
  dragging back plays the shot backward. When the drag stops, the shot
  freezes mid-ornament: on release the drift clock re-anchors at the
  scrubbed frame and nothing moves until the next drift step.
- Slow ambient drift moves the current-panel highlight one frame every 6 s
  (264 s full cycle, wrapping exactly: t is taken mod 264, and drift is
  closed-form over the recorded drift base/start, so the cycle never ends).
- The frames themselves never move: t=0 vs t=5.9 renders are pixel-identical,
  and a drift step changes only the two involved panels' cells.
- No autoplay of the sequence, no click-to-reload, no single panel that
  explains the set, no finished message.

## Adaptations

- 44 procedurally generated ornament frames sharing one kaleidoscope motif
  with per-frame rotation/reflection parameters; drag position mapped to
  frame index (scrub, not play); title words bound to frame indices.
- Titles sit on a parchment card (ornament area + title strip) rather than
  on the black ground: the prompt's title ink #1a1712 is near-black, so on
  the lacquer-black ground the titles were invisible in the first render.
  The parchment card keeps the specced ink and makes the sentence legible.
  This was the one fix round; all renders were re-done after it.
- Fully silent (no AudioContext, no getUserMedia); no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement, no fillText beyond
  the specced titles.
- Node-canvas quirks honoured: every fading alpha rounded to 4 decimals
  before stringifying (scientific-notation alphas parse as opaque);
  dots as filled rects or own-beginPath arcs with a moveTo first.
- House rules: canvas sized from the Visual Viewport API, pinned in draw(),
  phone detection via window.screen physical size with aspect fallback;
  frame one = draw(0) via boot flag, clock starts only with the rAF loop
  (plain function declaration behind a typeof guard); all randomness from
  mulberry32 (seed 1436000 + index*7919), never Math.random.

## Verification (forced-time probe harness, vm-isolated instance, stubbed rAF)

- Two fresh instances byte-identical at t=0; thumb byte-identical across
  repeated renders.
- t=0 vs t=5.9: 0 px differ (frames never move). Drift step at t=6: diff
  confined to cells 0 and 1 (4,861 / 4,917 px), cell 5 unchanged (0 px).
- Drag to panel 20 then 30: gold border follows (315 gold px in the dragged
  cell); release +3 s frozen (0 px diff); release +6 s drifts to 31.
- Full cycle wraps: t=264 frame identical to t=0.
- Ornament evolution: panel 43 holds 227 non-parchment px (faded) vs
  panel 22's 985 px (vivid); row-0 title strips hold 2,682 dark-ink px.
- All 44 panels addressable by drag, each showing the gold border: 44/44.
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used).
- Rendered and inspected at 1280x900, 390x844, and 720x720.
