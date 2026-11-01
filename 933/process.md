# No.933 — My Teacher Is Three

Study #114 stefpos, PP94 "Daughter Drawing": the daughter-drawing collaborations
(2019–20) as a two-agent generative system.

## Concept

Two hands, one page, nobody corrects anybody.

Agent One is the child: she scatters chunky fridge magnets across the paper,
flat bright colours, dropped carelessly, overlapping however they land. She
never explains herself. Agent Two is the designer: she draws over and between
the magnets in pencil, tracing their contours, hatching the gaps, or joining
their centres, with a professional's restraint and a visible admiration for
the first layer. The adult's pencil never moves a magnet. The result is a
palimpsest: a loud, unconsidered layer and a careful one in conversation.

The caption is the book's own line, set verbatim at bottom-left:
"she added a few bits to make it better. she was right."

The loop: magnets drop in one by one over 15 s (each landing with a small
bounce), the pencil then draws itself over 60 s, the finished page holds for
10 s, fades gently over 3 s, and the same arrangement is played again. The
arrangement persists across loops until a double-tap reseeds it.

Interactions: TAP cycles the designer's emulation (contour, hatch, connect)
over the same magnets; the pencil erases and redraws in the new mode. DRAG is
the child: it drops up to four extra magnets along the drag path. DOUBLE-TAP
starts over with a fresh scatter. Sound is the room the piece sits in: magnet
clacks pitched by size as they land, soft pencil scratch while the pencil is
moving. Audio starts on the first touch only.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

**Determinism.** All drawn state is a closed-form function of the piece clock
`t` (seconds since load) plus the recorded event log (mode taps, drags,
reseeds). Frame one is drawn synchronously at `t = 0`. Generation 0's loop
clock is pre-offset by 36 s (15 s of drop + 35% of the 60 s pencil pass), so
frame one shows every magnet down and the pencil about a third drawn. No
wall-clock dates anywhere; all randomness is mulberry32 seeded per generation
(seed 93300 + gen x 10007), so two renders of frame one are byte-identical
(verified by double-render `cmp`).

**Agent One, the magnets.** 16 magnets on desktop, 12 on phones (recorded
counts). Each magnet is a rounded rectangle sampled as a 32-point perimeter
(corner arcs included), given a handled-object irregularity: a low-frequency
sinusoidal warp of the outline plus a whisper of per-point noise (a stronger
jitter melts the rect into a blob; see QA log). Positions, sizes (0.115–0.20
of the small dimension), rotations (±0.55 rad) and colours come from the
generation's seeded stream; the scatter is full-bleed and overlaps freely.
Drop-in uses an easeOutBounce over 0.9 s from a staggered schedule. Shadows
are flat offset duplicates in wash grey at low alpha; no shadowBlur.

**Agent Two, the pencil.** For each run the designer builds a path list from
the magnets that existed when the run began, in one of three modes:

- CONTOUR: each magnet's perimeter scaled slightly outward, given the
  designer's own jitter, then Chaikin-smoothed twice into a hand line. The
  trace is drawn for every magnet, including ones partly covered by later
  magnets; the adult draws over the top, that is the palimpsest.
- HATCH: 45-degree lines across the whole field, sampled every ~7 px; a
  sample is kept only when it falls outside every magnet (point-in-rotated-
  rect test), so the hatching lives in the negative space.
- CONNECT: each magnet is linked to its two nearest neighbours with a
  wobbled quadratic, plus a pencil dot at every centre.

Paths stroke in by accumulated length: progress = elapsed run time / 60 s,
drawn in two graphite passes (a soft wide under-stroke, then the line). The
pencil layer is rebuilt from the magnet set as it stood at the run's start.

**Drag-magnet choice (recorded).** Extra magnets dropped by a drag persist
as magnets until the current loop's gentle clear, when they leave with the
rest of the loop. A drag magnet joins the pencil's subject list only if it
was dropped before the current pencil run began (during the drop phase, or
before a mode tap restarts the pencil); one dropped mid-draw is taken up at
the next run. This keeps every pencil run's path list a pure function of a
fixed magnet set, which the determinism gate requires.

**Events and timing.** Taps are disambiguated from double-taps with a 0.35 s
window: a single tap takes effect as a mode event at tap + 0.35 s; a second
tap inside the window reseeds instead. A mode event after the loop's draw
phase has begun restarts the pencil run from that moment in the new mode.
Drags are distinguished by a 12 px travel threshold and drop at most four
magnets, at least 65 px of travel apart, with parameters drawn from a
dedicated seeded stream.

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas CSS size pinned in px
inside `draw()` every frame; phone detection from `window.screen` (min
dimension < 700) with the aspect fallback. Page ground is the paper colour
(light-ground rule). No gradients, no ctx.filter, no offscreen canvas, no
em dashes. Audio (clacks and scratch) is created lazily inside the first
pointerdown and every use is typeof-guarded; the piece renders complete in
silence. requestAnimationFrame use is typeof-guarded, with a synchronous
`draw(0)` first frame. The only visible text is the specced caption and the
`<title>`.

## QA log

Renders via `node ~/workspace/tools/render-piece.js` (node-canvas harness, no
rAF, no audio): qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png
720x720. thumb.png rendered twice and `cmp` byte-compared: identical.

Fix round 1: per-point perimeter jitter of ±0.010 melted the magnets into
amoeba blobs and the quadratic-smoothed path rounded them further. Replaced
with a low-frequency warp (±0.004–0.006) plus ±0.0021 point noise, drew the
magnet body as a plain polygon through the sampled perimeter, and moved the
smoothing into the pencil layer only (Chaikin x2 on contour paths).

Diagnosis note: a pale diagonal band on one red magnet and a seemingly
offset contour loop were traced to two same-colour magnets (seeds #2 and
#10) landing almost concentrically; the band is the upper magnet's edge seam
and the loop is the lower magnet's individual trace. Both are correct
two-layer behaviour, left as is.

Final renders: paper ground; a scatter of chunky rounded magnets in the six
palette colours at playful angles with generous overlaps (two reds stacked
bottom-left, a blue/violet/orange cluster centre-right); wobbly pencil
contours about 35% drawn, hugging the first magnets in draw order; flat wash
shadows bottom-right of each magnet; caption small at bottom-left, fully
legible. Mobile (12 magnets) shows the same composition fitted to the tall
frame with the caption on one line, nothing clipped.

Deviations: none from the brief. The wash colour is used only for the flat
magnet shadows rather than a hatch backing, which the brief makes optional.
