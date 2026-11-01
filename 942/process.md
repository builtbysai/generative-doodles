# No.942 — Fifty-Two Characters, One City

Study #115 giorgialupi, PP103 "A Love Letter to the Subway".

## Concept

Giorgia Lupi's MTA love letter treats every subway line as a character whose
behavior is its data. This piece builds a schematic, hand-wobbled map of ten
lines (the 1, 2, 4, 5, 6, 7, A, C, E, L in their MTA family colors) on warm
paper. The map is not geographic: routes are paths over one shared seeded
node grid, so the relationships are the geography, and any grid node used by
two or more lines is a transfer station by construction. Each line sends out
one character, a thick ribbon with a round head, that rides its route
forever, ping-ponging at the termini. Personality is data: age becomes
shudder (old lines tremble as they move), length becomes the fading trail
the ribbon drags behind it, and sociability becomes a habit of pausing at
transfer stations to greet whoever else is there. When two characters find
themselves at the same station together, they exchange a spark: a small
burst of paper-tone dots. The top strip carries the specced line, "a data
love letter to the subway", and each line's name is lettered at its terminus.

Interactions: tap a character or its route to meet the line (a card strip at
the bottom composes its character from its real parameters, e.g. "the 7 ·
young, long, restless · 13 stations, always running", and the character
pulses); drag anywhere for rush hour (the whole city speeds up to about
2.2x, pauses halve, sparks fly more often); double-tap for night service
(ten seconds of dimmed map where only the 7, the A and the L, the night
owls, keep running). Sound, started lazily by the first gesture only: a low
rail hum whose pitch follows the fastest line, soft station chimes when a
character pauses at a transfer, a small sparkle when lines meet.

## Construction

- Single self-contained canvas-2D page. All state lives in a fixed-timestep
  simulation at 120 Hz (DT = 1/120), seeded with mulberry32 (base seed
  942103; per-line streams offset from it). No Date.now anywhere; frame one
  is the state after exactly 1800 pre-roll steps (15 s), run synchronously
  at load. The rAF loop (typeof-guarded) advances the same sim in fixed
  steps, capped per frame.
- Routes: each line's node path is subdivided six ways per segment with a
  seeded perpendicular sine wobble, giving hand-drawn tracks with exact
  arc-length tables. Stations sit at every node plus one mid-segment stop
  per segment (11 to 13 stations per line); transfer stations are the shared
  nodes, drawn once as ringed dots.
- Characters: position is a triangular (ping-pong) function of distance
  traveled along the arc-length table. A per-line pause schedule (128 seeded
  entries) decides, per transfer visit, whether the character stops and for
  how long; on a pause the distance is snapped so the character sits exactly
  on the station. Trails are position samples every 4 steps, capped by the
  line's length parameter (2.5 to 6 seconds of travel), drawn as tapering,
  fading segments. Shudder is draw-only: a sum of sines of the step count,
  amplitude scaled by the line's age, so it never perturbs the sim.
- Engineered first meeting: the 1 and the 2 share node (1,1) as the first
  transfer each reaches. At build time a deterministic dry-run scan over
  start offsets finds offsets whose first arrival at that station coincides
  at about 14.5 s (verified in QA: both arrived together at 14.5 s, paused
  0.9 s side by side); all their earlier pauses are zeroed and the meeting
  visit is set to pause 0.9 s, so in frame one the two red characters are
  together at the station with a spark burst (age about 0.9 s of its 1.6 s
  life) around them.
- Events: pointer handlers only record events stamped with the current sim
  step (tap with hit-tested line, double-tap, drag start/end). The sim
  consumes the queue in step order, so rush hour and night service are part
  of the recorded history. Rush hour is a multiplier eased toward 2.2 while
  dragging and back to 1 on release; night service freezes non-owl lines
  inside the step function and dims the map in the draw.
- Audio: one lazily created AudioContext behind the first pointerdown,
  every call typeof-guarded and wrapped so the piece renders complete in
  silence. Hum = sawtooth through a lowpass; chimes and sparkles are short
  sine blips, throttled by step count.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px in draw(); phone detection via window.screen (min dimension
  under 700) with the h > w*1.15 aspect fallback only; page ground is the
  paper color; no gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no microphone, no external assets.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png), all clean and silent.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted.
- Read-backs: paper map with the top strip lettered across the top; ten
  colored wobbled routes webbing the frame with black station dots and
  larger ringed transfer dots; all ten line names at their termini;
  characters mid-route in red, green, blue, purple and gray with tapering
  trails behind them; the two red characters paused together at the (1,1)
  transfer with a ring of spark dots bursting around them. Mobile: the map
  scales to the tall frame, names shrink but stay legible, nothing clipped.
- Debug pass (instrumented copy, discarded): confirmed meetTime 14.5 s,
  both characters snapped to the station coordinates with pauses running,
  and exactly one spark alive at frame one.
- Two fix rounds: (1) trails first rendered as heavy merged wedges, so
  sampling went to every 4 steps and widths/alphas were tapered down until
  trails read as fading ribbons; (2) the first spark spawned on approach at
  13.9 s and expired 3 steps before frame one, so the meeting thresholds
  were tightened (pair 0.013, station 0.017) and the burst life lengthened
  to 1.6 s with the respawn cooldown set just above it.

## Deviations

- Card text uses "·" separators instead of the em dash in the prompt's
  example card, per the house no-em-dash rule. Wording, counts and structure
  are otherwise the specced format, with station counts taken from each
  route's real station list.
- Spark dots are paper-tone (as specced) but ringed with a thin ink outline;
  pure paper dots would be invisible against the paper ground except where
  they cross a colored line.
- Transfer pauses apply at interior transfer stations only; at a terminus
  the character simply reverses (it is already stopped by the turnaround).
- Night service draws a "night service" caption in the top strip while the
  dim is up, so the mode reads as intentional rather than a fault; the
  specced strip text returns when day does.
- Of the specced palette, yellow, orange, brown, turquoise and dark gray go
  unused: the ten lines take their real MTA family colors (red, green,
  blue, purple, gray), which the brief's assignment list fixes.
