# №1419 "Find Face" (thomas-mader TM4, PP642)

## Prompt
A face in the center of the frame, overlaid by a tracking filter's wireframe
that keeps losing its grip — and every time the filter fails, the words FIND
FACE print large across the frame, while signing hands keep interrupting the
filter's attachment, waving through its lines. Palette: face skin #d9b48f,
filter wire #2e86c8, failure text #c8352a, background #ece8dc, hand ink
#26241f, mouth morpheme gold #d4a24e. Composition: the face centered and
large; the filter wireframe clinging to its features; the failure text as a
full-width banner when it fires; the interrupting hands entering from the
frame edges, breaking the wireframe's lines. Motion: seamless loop; the
filter locks on, tracks for a few seconds, then slips — the face turns, the
light changes, a hand passes in front — and FIND FACE prints, holds a beat,
and clears; the hands' interruptions grow more frequent over the loop, so
the filter spends more time failing than succeeding by the end; dragging
the face moves it, and the filter visibly struggles to reattach; dragging a
hand across the frame breaks the lock instantly.

## Build
- Face as a parametric oval with feature landmarks (brows, eyes, nose,
  mouth with a gold morpheme dot, ears), centered and large.
- Filter as a wireframe mesh over the landmarks with attach/slip states:
  lock quality 1 while locked; during failures the mesh jitters, lags, and
  some segments drop, so the lines visibly lose their grip.
- Failure banner as a timed text sprite carrying ONLY the prompt's own words
  FIND FACE (explicit prompt exception; no other text anywhere except
  `<title>`). The banner fades in at each failure, holds, and clears.
- 60 s seamless loop. Lock windows shrink across the cycle (9 s, 7 s, 5 s,
  3 s, 2 s, 1 s, 1 s, 1 s) while hand-pass windows grow more frequent, so
  the filter spends more time failing than succeeding by the end.
- Face-turn windows (the face squashes and tilts) and light-change windows
  (a flat-alpha side wash, never a gradient) drive slips alongside hand
  passes.
- Hands as parametric silhouettes (palm + 4 fingers + thumb) in hand ink —
  pseudo-gestures only, never real ASL words.
- Drag the face: it follows the pointer while dragged and eases back to
  center over ~2 s after release (tau 2 s decay); lock quality drops to
  0.25 during the drag and recovers slowly (tau 4 s) after release, so the
  filter visibly struggles to reattach.
- Drag anywhere else: a hand swipe crosses the frame and breaks the lock
  instantly; the banner fires for 2.5 s after release, then the lock
  resumes if the schedule allows.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or localStorage.

## House-rule compliance
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height
  in px; phone detection via window.screen physical size (min dimension <
  700 px) with aspect h > w*1.15 fallback; centered composition keeps its
  shape, page ground takes the piece's background color.
- Determinism: frame one = draw(0) via boot flag, clock anchors on the
  first rAF call (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1419000), never Math.random; all motion
  closed-form over piece time and recorded events, never frame-integrated.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs/ellipses; every
  ellipse on its own beginPath.
- Interaction decided per piece: drag the face / drag a hand swipe; never
  click-to-reload; no hint text (the text rule allows only FIND FACE).

## Verification
- Rendered at 1280x900, 390x844, and 720x720 and inspected all three;
  thumb byte-identical across repeated renders including a final re-verify
  after the last fix.
- Frame-one read (t = 0): face centered and large on background #ece8dc,
  full wireframe mesh clinging to its features, no banner, no other text.
  Mobile keeps the same centered composition with no clipping.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): t=0 banner 0 px, wire 5826 px;
  t=5 lock banner 0; t=11 failure gap banner 25281 px; t=16 lock banner 0;
  hand pass t=22 ink 386 → 4095 px (hand present); late failures t=49 and
  t=58 banner ~25295 px; face drag +120 px moves the skin centroid
  639.5 → 758.4 and decays back to 641.7 after 8 s; swipe during a true
  lock window (cycle 16) drives banner 0 → 25170 px at 0.5 s after the
  swipe → 0 at 3 s (lock resumes).
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used); the only fillText call is 'FIND FACE'.

## Fix rounds (2)
1. Frame one first rendered with a broken-looking mesh: the first lock
   window started at cycle 0, so its ramp-in left lock quality at 0.25 at
   t = 0 and segments were skipped. The window now starts at -3, so frame
   one sits mid-lock at quality 1 with the full mesh drawn.
2. Two mesh landmarks first floated outside the face oval (full face width
   at a height where the ellipse is narrower). Landmark x positions now
   follow the ellipse equation at their heights, so every mesh point sits
   on or inside the face.

## Files
- index.html (md5 c43ef5ac56d4dc321a46602c24896573)
- thumb.png (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844)
