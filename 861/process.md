# №861 Study 1: Serpentine

CK7 / PP1261, study #262 colton-kempf. Formula date 2004 · 05 · 21.

The driver, as a felt phenomenon: the famous 1896 image, a dancer
in blue fabric centered on black, the Serpentine Dance, and below
the frame three labeled stems waiting like a controlled experiment.
One image, three different films: the club track makes it a gig,
the study makes it a graph, the 2022 music makes it a memory. The
dancer herself never changes; only the scoring character does.

## Build

- First frame: FIRST_T = 12 s into a 60 s cycle. Every motion
  period (swirl 6 / 12 / 20 s by stem, beat 0.5 s, graph traces
  60 / 30 / 20 / 15 / 12 s) divides 60, so frame one is
  deterministic and the frame at FIRST_T + 60 equals the frame
  at FIRST_T.
- The dancer: a dark silhouette with a blue rim, head, torso, arms
  raised holding fabric wands with pale tips, a narrow skirt
  column, standing on a faint floor line with a soft reflection.
  Six billowing fabric petals in tinted blues swirl around her on
  lighter compositing so the overlaps glow like lit fabric. The
  petals fan across the lower half at FIRST_T, so frame one reads
  as a swirling skirt; the swirl carries them overhead as the
  cycle turns. Fixed archival grain, 140 faint speckles.
- The three stems, selected by TAP in fixed order with wraparound
  (0 club, 1 study, 2 memory), each visibly rescoring the same
  dance:
  - Club track: fastest swirl (6 s), a 2 Hz beat pulse that scales
    the fabric, an expanding beat ring, and thin light bars at the
    frame edges.
  - Loudness-plus-pitch study: measured swirl (12 s), smaller
    fabric, and a spare readout under the dance, a white loudness
    trace and a blue pitch trace on a faint grid, labeled LOUDNESS
    and PITCH.
  - 2022 music: slowest swirl (20 s), softer fabric, and a warm
    haze with a soft vignette, like a memory.
- Control strip: a thin band beneath the dance frame holding the
  three stem labels in plain type, each with a sublabel (A GIG,
  A GRAPH, A MEMORY). The selected stem's label brightens and
  gains a small blue tick; the other two dim.
- Audio is visual-only in this gallery: no real WebAudio, per the
  Franke rule. No colorizing beyond the blue fabric tint, no new
  visuals, no remix framing.
- Caption plate top left (№861 · Study 1: Serpentine,
  2004 · 05 · 21) and hint bottom center (Tap to change the
  stem.), drawn in-canvas.
- Canvas 2D only. No click-to-reload. No em dashes in visible copy.
  Flicker at or below 14 Hz by construction: the fastest motion
  is the 2 Hz club beat pulse, which scales the fabric and never
  flashes. Reduced motion is supported (static frame, tap still
  changes the stem).

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  and 720x720 thumb (rendered at a 900x900 viewport so the square
  stage is exactly 720); all three inspected, plus a 720x720
  frame at t=27 and one frame per stem.
- Time probes (node harness, /tmp/probe861.js): swirl 0 / 3.142 /
  6.283 / 15.708 rad at t=12 / 15 / 18 / 27 on the club stem;
  loudness at xf=0.5 is 0.500 / 0.380 / 0.500 at t=12 / 27 / 42;
  pitch at xf=0.5 is 0.500 / 0.100 / 0.500 at t=12 / 27 / 42.
  Pixel diff between t=12 and t=27 frames: 32.39%.
- Stem probes, same clock t=12: stem0 vs stem1 differ in 25.18%
  of pixels; stem0 vs stem2 in 66.51%; stem1 vs stem2 in 62.80%.
  Strip label brightness (mean, club / study / 2022 columns):
  stem0 38.8 / 20.7 / 17.9; stem1 20.0 / 41.5 / 17.9;
  stem2 20.0 / 20.7 / 30.1. The bright label follows the
  selection in all three states.
- Tap walk: advance() cycles stems 0, 1, 2, 0 in fixed order.
- Determinism: two fresh renders at t=12 are byte-identical
  (same md5). Note: redrawing twice inside one node-canvas
  process differs in 4 pixels on the first redraw and 0 after,
  a first-draw rasterization artifact in the harness, not in the
  piece; fresh renders are identical.
- Seamless loop: frames at t=12 and t=72 (FIRST_T + 60) differ
  in 0.00% of pixels.
- Fix rounds: 2. Round 1: the first build fanned the petals all
  around the figure, reading as a flower, and the figure was
  small on phones; petals now fan across the lower half at
  FIRST_T and the figure scales up 1.3x on phones. Round 2: the
  memory haze was nearly invisible; its warm veil was
  strengthened so the 2022 stem reads warm and soft. The beat
  ring alpha was also softened from 0.28 to 0.18.

## Deviations

- None from the brief. The dancer and fabric are abstract drawn
  shapes, not archival footage, since the piece is a drawn study
  of the 1896 image rather than the clip itself; the figure, the
  blue tint, the black ground, and the three-stem control strip
  follow the prompt exactly.

## Known warts

- On the 390x844 mobile frame the dancer sits in a tall black
  field with empty space above and below; the figure is centered
  and the strip stays legible.
- The beat ring is a visible thin circle around the dancer on the
  club stem; it reads as the room pulsing, which is the intent,
  but it is the most geometric element in the frame.
- The study graph traces cross the lower edge of the skirt; they
  read as a readout under the dance, as intended.
