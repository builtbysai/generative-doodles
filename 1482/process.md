# №1482 "Four First Names, Drifting" (ioana-wieder IW3, PP729)

## Prompt
A dark field. At the end of each loop, four abstract first-name shapes — not
readable text, but four distinct flowing line-signatures, each in its own
muted color — drift across the frame from right to left, overlapping and
separating, then dissolve before reaching the edge. Each loop: a short scene
of seated figures plays, then the four signatures drift across and dissolve,
then the scene resumes. Dragging across the field slows the drift (the
signatures linger and separate further); releasing resumes the drift. Drag
never freezes a signature into a title card and never restarts the scene.

Palette (only these colors): field deep charcoal #2a2a30; signatures cream
#e8e0d0, gold #d9a441, teal #2e6f6a, brick #a8674a. No other color.

## Implementation
- 24 s loop: scene 0–14 s, signature drift 14–24 s. Frame one is the scene
  phase (five seated figures on a bench, drawn as torso + horizontal thigh +
  vertical shin + head with dot eye), so the thumb is a quiet dark field
  with figures, not the signatures.
- Signatures as parameterized flowing polylines (two summed sines per
  signature, seeded mulberry32, seed 1482000), one per palette color, all
  the same stroke width — no hierarchy among the four. Group travels from
  the right edge to left of center (group anchor 0.98W → 0.36W); each
  signature carries its own seeded x/y offset so the group overlaps and
  separates in flight. Dissolve is an alpha fade over the last third of
  travel, rounded to 4 decimals (node-canvas scientific-notation quirk).
- Drag: recorded as absolute-time intervals. While dragging, drift speed
  is 0.3× and the separation scale is 1.8×; on release the drift resumes
  from the slowed position via closed-form integration over the recorded
  intervals (never a restart, never a jump). Drag during the scene phase
  is ignored. Drag never freezes a signature into a title card.
- Determinism: frame one = draw(0) via boot flag; clock starts only with
  the rAF loop (plain function declaration behind a typeof guard). No
  Math.random anywhere; no text drawing at all (the signatures are strokes,
  never letterforms); fully silent (no AudioContext); no offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or getUserMedia. Dots drawn
  as filled rects; arcs use own beginPath with moveTo first.

## Adaptations
- The scene figures are abstracted seated profiles on a bench (torso,
  thigh, shin, head) rather than a literal room; the scene is a minor
  phase and the prompt specs it only as "a short scene of seated figures".
- The study's "first names only where a prompt calls for a credit drift"
  allowance does NOT apply here: this prompt explicitly forbids readable
  names, so the signatures are pure flowing polylines with no letterforms.
- Scene bob originally used absolute piece time, so the scene phase at
  t=24 differed slightly from t=0 (1,944 px, head bob only). FIX ROUND
  (gate fix, 2026-11-01): the bob now runs on loop-local time — draw()
  already computed lt = t % LOOP for phase gating but passed absolute t
  into drawScene(); it now passes lt, so the bob phase at the loop
  boundary matches frame one exactly. Frame one is unchanged (byte-
  identical desktop, mobile, and thumb renders before and after).

## Verification (forced-time probe harness, tmp/probe1482.js)
- t=0 redraw 0 px; fresh instance t=0 identical (0 px).
- Credit phase: t=15 vs scene t=0 differs 34,868 px; centroid x falls
  686.2 → 602.2 from t=15 to t=19 (drift left); all four signature colors
  present at t=19 (cream 947, gold 1,065, teal 1,024, brick 797 px).
- Dissolve: at t=23 (progress 0.9, alpha 0.3) the signatures are visibly
  faded and left of center, dissolving before the edge (inspected render).
- Scene resumes at t=24 (diff vs t=19: 38,709 px; signatures gone).
- Drag: creditProgress at t=20 is 0.600 undragged vs 0.320 after dragging
  16–20 s; dragged frame differs from undragged by 13,208 px; after release
  the drift resumes and the scene returns. Scene-phase drag leaves the
  t=6 frame byte-identical (0 px).
- Renders inspected at 1280×900, 390×844, 720×720; mobile keeps the
  full-bleed composition with no clipping. Thumb byte-identical across
  repeated renders.
- Token scan clean: no fillText/strokeText, Math.random call, AudioContext,
  getUserMedia, createElement, Path2D, shadowBlur, or gradients (the only
  "Math.random" hit is a code comment; rAF only behind typeof guards).

## Fix round: loop-closure (gate fix, 2026-11-01)
- Cause: drawScene() received absolute piece time, so its head-bob sine
  (Math.sin(t * bobSpeed + bobPhase)) did not return to its t=0 phase at
  the 24 s loop boundary — the builder's own probe showed t=24 vs t=0
  differing by 1,944 px (head bob only), a visible twitch each loop.
- Fix: one-line change in draw() — drawScene(lt) instead of drawScene(t),
  where lt = t % LOOP was already computed for phase gating. No change
  to frame one, the signature drift, the drag behavior, the palette, or
  the composition.
- Re-verification (forced-time probe harness, tmp/verify1482.js):
  t=0 redraw 0 px; t=24 vs t=0 = 0 px; t=48 vs t=0 = 0 px; fresh instance
  t=0 identical (0 px); credit t=15 vs scene t=0 differs 34,868 px;
  centroid x falls 686.2 → 602.2 from t=15 to t=19 (drift left); all four
  signature colors present at t=19 (cream 947, gold 1,065, teal 1,024,
  brick 797 px); creditProgress at t=20 is 0.600 undragged vs 0.320 after
  dragging 16–20 s; dragged frame differs from undragged by 13,208 px;
  scene-phase drag leaves the t=6 frame byte-identical (0 px).
- All three renders re-done after the fix and inspected; desktop, mobile,
  and thumb frame-one renders are byte-identical to the pre-fix renders.
  Thumb byte-identical across repeated renders.

## Files
- index.html (md5 e10dd1ab596313453514df86d23b1058, after the loop-closure fix)
- thumb.png (720×720), qa-desktop.png (1280×900), qa-mobile.png (390×844)
- tmp/probe1482.js (probe harness)
