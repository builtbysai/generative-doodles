# №1278 "A Mended Heart" (suchitra-mattai SM7, PP437)

## Prompt
A torn heart-shaped form hangs at center, its wound a jagged vertical tear.
Large visible stitches — crochet-thread X-stitches and running stitches in
contrasting floss — bridge the tear and slowly pull it closed over the loop,
then release slightly, never fully closed. Grounded in Mattai's *a mended
heart* (2025): "mending wounds with crochet" — her mending grammar, where the
repair stitch is the compositional line.

## What was built
A deep-red textile heart on ink ground, suspended from two thread lines at
the top, over a soft shadow pool. The heart is drawn as two halves split
along one shared seeded jagged tear line, so the halves mesh exactly when
the gap closes. Seven oversized base stitches bridge the tear, alternating
X-stitches and running-stitch dashes, colours cycling cream / rose / gold
floss. Seeded stipple dots give the cloth a flat textile grain.

## Mechanics (all closed-form over piece time and recorded events)
- Heal loop, 44 s period: stitches pull the tear closed over 0–30 s
  (smoothstep to 0.82), hold 30–34 s, ease open 34–44 s. The gap never
  reaches zero: at full heal it is 18% of its open width. The piece never
  fully heals; the point is the ongoing mending.
- Frame one is exactly t = 0 (boot flag): tear fully open, gap at maximum,
  stitches stretched wide. The rAF loop is anchored to its first tick, so
  the clock starts with the loop, never with wall-clock time.
- Drag across the wound: when a drag path crosses the heart's center line
  inside the heart's vertical span, a new stitch is added at that height
  (X or running, alternating, colour continuing the floss cycle). It grows
  in over 0.6 s from its midpoint (X) or left to right (running), then
  follows the gap like the base stitches for the rest of the loop. Capped
  at 14 visitor stitches; the oldest is replaced past the cap.
- No text anywhere except `<title>`. No audio, no microphone, no
  click-to-reload.

## House adaptations
None required beyond the standing rules. The prompt specs no text, so no
hint line is drawn. The piece is a centered geometric composition: it keeps
its shape on phones (slightly larger relative to the narrow viewport) and
the page ground is the piece's own ink color. Canvas is sized from the
Visual Viewport API with resize listeners on visualViewport and window,
pinned in draw() via canvas.style.width/height in px. Phone detection via
window.screen physical size (min dimension under 700 px) with the aspect
fallback. All randomness is a seeded mulberry32 (seed 1278); no Math.random,
no gradients, no filters, no shadowBlur, no offscreen canvas, no element
creation. Dots use one beginPath + moveTo + arc each (node-canvas arc
quirk). requestAnimationFrame is typeof-guarded; one synchronous frame is
drawn at load.

## QA notes
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  desktop, 390x844 mobile, 720x720 thumb; all three inspected.
- Frame-one read (t = 0): deep-red heart, jagged dark tear fully open,
  seven oversized stitches (cream X, rose running, gold X, cream running,
  rose X, gold running, cream X) bridging the gap, two suspension threads,
  shadow pool below. Mobile holds the same read, shape whole.
- Thumb rendered three times at 720x720, cmp byte-identical.
- Heal loop probe-verified by pixel measurement at mid-height: wound dark
  span 66 px at t = 0 (fully open), 7 px at t = 15 (nearly closed, never
  zero), 50 px at t = 40 (easing open).
- Add-stitch probe-verified through the piece's own pointer handlers with
  a node-canvas harness: a drag across the wound at y = 400 added a rose
  X-stitch (1806 differing pixels in the stitch box, 1159 of them rose).
- Fix round: the first rAF loop was written as a named function
  expression followed by requestAnimationFrame(loop), which throws
  ReferenceError in a real browser (the name binds only inside the
  expression), so the animation loop would never have started — the QA
  renderer defines no rAF, which is why renders passed. Rewritten as a
  plain function declaration. Desktop and mobile re-renders after the fix
  are byte-identical to the pre-fix renders, confirming nothing visual
  changed.
- Token scan clean of Math.random, AudioContext, getUserMedia,
  createElement, gradients, shadowBlur, and performance/Date time sources.
