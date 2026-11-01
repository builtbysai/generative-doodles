# №1292 "The Block Carver's Table" (swapnaa-tamhane ST5, PP459)

## Prompt
A woodblock seen face-on, its carved motif in reverse, beside the print it
produced. Block in warm teak with deep carved shadows; print in black on
cream showing the same motif correct-reading; a carver's registration grid
faintly behind. Grounded in Tamhane's process: Mukesh Prajapati's family
carves her drawings into functional 3D blocks in Petaphur. Block left (~45%
of width), print right, thin vertical rule between. Motif is a Tamhane-type
geometric unit (ajrakh rosette here), never figurative. Print shows 2-3
mis-registered impressions fading down-right. Watch-only loop: the block
lifts, inks (a roller pass darkens its face), and stamps the paper, each
stamp slightly off-register from the last; ink fades over successive stamps
(ink starvation); the carver's hand "re-carves" one line of the motif
mid-loop (a groove deepens); loop reseeds motif and starvation rate.
No photorealistic wood, no literal hand, no text, no signature.

## Adaptation (deliberate, recorded)
The prompt's "loop reseeds motif" is NOT applied literally. In the first
build the motif reseeded per loop, and frame one showed a triangle block
beside a rosette print: the previous loop's motif on the paper, the new
motif on the block. That breaks the prompt's own core premise, that the
print shows "the same motif correct-reading". The motif variant is
therefore seeded once for the whole piece (mulberry32(1292)), so block
and print always match; per-loop reseed still applies to starvation rate,
stamp jitter, and the re-carved groove, all via a seeded PRNG sequence
(never Math.random). The triangle variant code remains and renders
correctly, but the fixed seed selects the rosette for this piece.

## Mechanics (all closed-form over piece time t; 24 s loop)
- Loop phases: rest 0-4 s; roller pass sweeps the block face 4-6 s,
  leaving an ink sheen (0.30 alpha, minus 0.06 per stamp made); stamps at
  6.5, 10.5, 14.5 s (block lifts 14 px around each stamp, impression
  fades in over 0.5 s); re-carve deepens one seeded petal groove 12-13.5 s;
  hold to 24 s, then loop reseeds.
- Ink starvation: stamp j alpha = (1 - starve)^j, starve seeded 8-14%
  per loop. Displayed impressions: current-loop stamps already made, then
  older previous-loop stamps to fill to 3, drawn oldest first so the
  newest sits on top, offsets growing down-right (7 px, 6 px per step
  plus seeded jitter, rotation jitter up to 1.5 deg).
- Frame one (t = 0, boot-flagged draw(0)): block at rest, carved rosette
  mirrored (reverse) on teak; print showing three previous-loop
  impressions, mis-registered, fading down-right; registration grid and
  corner crosshairs faint behind.

## House adaptations
- Visual Viewport sizing; canvas pinned in draw() via style width/height;
  phone detection via window.screen (min dimension < 700 px), aspect
  fallback; centered geometric composition keeps its shape on phones with
  the page ground in the piece's own dark ground color.
- Deterministic first frame: synchronous draw(0) at load; the
  performance.now() clock starts only with the rAF loop (typeof-guarded).
- node-canvas-safe: no rAF/AudioContext/createElement/WebGL/offscreen
  canvas/filter/shadowBlur/gradients; motifs drawn as flat shapes and
  diamond paths (no batched ellipse/arc quirk exposure); dots are small
  diamonds, not arcs.
- No visible text except <title>. Silent. No getUserMedia.

## QA
- Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
  inspected. Desktop: teak block with wavy grain, recessed rosette with
  cut-highlight ticks, depth side at lower right; cream print with three
  stacked rosette impressions and corner crosshairs; thin rule between;
  faint grid behind. Mobile: same read, side-by-side, shape whole.
- Thumb rendered three times at 720x720, cmp byte-identical, re-verified
  after the fix round and after process.md was written.
- Forced-time probes (temp patched copies, discarded): print region gains
  10,800 px between t=5 and t=7 (stamp 1 appears) and 10,683 px between
  t=10 and t=13 (stamp 2 appears); block region between t=12 and t=13
  changes only 639 px inside one petal's bbox (x120-150, y328-391),
  confirming the single-groove re-carve with ink sheen held constant.
- Fix round: first build reseeded the motif per loop, leaving a triangle
  block beside a rosette print at frame one; fixed by seeding the motif
  variant once (see Adaptation). Rosette petals also slimmed
  (0.075/0.16 to 0.065/0.14 half-diagonals) so individual petals stay
  distinct under the stacked impressions.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, filters. rAF only behind a
  typeof guard.
