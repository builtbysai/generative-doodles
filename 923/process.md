# No.923: "142,036"

Study #113 (miriam_quick + duncan_geere), prompt PP84 "The Fugue of Bureaucracy":
Miriam Quick and Duncan Geere's *A Symphony of Bureaucracy* (2021) drawn as a
fugue score. One encoding only: the number of EU laws made in a year is the
number of interweaving voice-ribbons lit in that year.

## Concept

A horizontal timeline runs 1952–2019 across a near-black ground. Eight gold
ribbons (the Carlos golds, darkest to brightest by voice order) weave above and
below the timeline in seeded counterpoint. A ribbon is fully lit exactly in the
years whose law count earns its voice; elsewhere it runs as a faint ghost, so
the swell from the single-voice opening of 1952 to the eight-voice legislative
peaks around 1991 reads along the score. At each voice's entry year sits a
small cream notation strip: eight note glyphs tracing the head of the *Ode to
Joy* subject (E E F G G F E D), the fugue subject each voice carries. A thin
cursor sweeps the 68 years in about three minutes, seamless. The only text is
the year ticks, the caption "one encoding: laws per year = voices.", and the
title. It is a score, never a line chart: the voices ARE the count.

Interactions: tap a year to spot-play that year's voice count as a staggered
fugue burst and flash its ribbons; drag horizontally to scrub the decades
(release resumes the sweep); double-tap to jump to 1952, the single-voice
opening, held for six seconds. Sound starts on the first gesture: eight
sawtooth voices through a shared 800 Hz lowpass (the Wendy Carlos nod), each
active voice cycling the subject fragment in its own register with staggered
entries.

## Construction

- **Data model (synthesized, seeded, exact).** Per-year law counts for
  1952–2019 are generated at load from mulberry32 (seed 923142): weights are a
  slow growth term (0.34 + 0.011·i) plus gaussian legislative peaks at
  ~1973 (0.95), ~1986 (0.70), ~1992 (1.35), ~2004 (0.80), ~2009 (0.55), times a
  seeded jitter (0.88–1.12). Counts are floor-allocated against the documented
  total, then the remainder is distributed one law at a time to the
  largest-weight years. Voice mapping: `voices = clamp(round(laws / SCALE), 1, 8)`
  with SCALE = maxCount / 8 = 476.50.
  **Sum check (verified in node with the identical generator): total =
  142,036 laws exactly.** Spot values: 1952 = 618 laws → 1 voice; 1968 =
  1,524 laws → 3 voices; peak year = 3,812 laws → 8 voices. Voice entries:
  V1 1952, V2 1962, V3 1967, V4 1969, V5 1970, V6 1972, V7 1988, V8 1991.
- **Ribbons.** Each voice's path is precomputed as normalized offsets at
  quarter-year samples: a per-voice lane offset plus two seeded sine waves
  (frequencies ~1.6–3.4 and ~4.5–8.5 cycles across the span), scaled to the
  frame at draw time. Drawing is three passes per ribbon: one continuous
  ghost stroke (alpha 0.055) for the full span, then contiguous active runs
  chunked to ≤3 years (alpha 0.82 plus a gaussian cursor-proximity boost,
  capped at 1), then any live tap-burst flash. The chunking exists so the
  boost can vary along a run; continuous strokes within a pass keep joints
  free of doubled alpha.
- **Cursor / playback state.** All state is closed-form over the recorded
  event list. Sweep anchors at (t=0, 1968) and advances at 180 s per 68
  years, wrapping. A drag records a scrub event that pins the cursor to the
  pointer's year; on release the sweep re-anchors at the scrubbed year. A
  double-tap records a 6 s hold pinned at 1952, after which the sweep
  re-anchors there. `cursorYearAt(t)` replays the list, so frame one is the
  synchronous `draw(0)` with the cursor at 1968 and no `Date.now()` anywhere
  in the state path (performance clock only, anchored at load).
- **Audio.** Lazily created on the first pointer event, typeof-guarded.
  Eight sawtooth oscillators are scheduled note-by-note into a shared
  lowpass (800 Hz): the Carlos voicing. Each voice's tonic is a C-major
  register step (C2, E2, G2, A2, C3, D3, E3, G3); the melody is the subject
  head in semitones [4,4,5,7,7,5,4,2]. A voice sounds only while active at
  the cursor year; a tap burst replays the fragment for that year's voices
  with 0.19 s staggers, fugue-exposition style.
- **House rules.** Single self-contained file, canvas 2D only. Canvas size
  from the Visual Viewport API with resize listeners on visualViewport and
  window; `canvas.style.width/height` pinned in px inside `draw()` every
  frame. Phone detection via `window.screen` (min dimension < 700) with the
  aspect fallback; the score spans the full width at every size. No
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no external
  assets, no microphone.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). The piece
  renders complete in silence (no AudioContext in the harness).
- **Determinism: thumb.png rendered twice and byte-compared with `cmp` -
  identical.** Duplicate deleted.
- Read-backs: desktop and thumb show the dark ground, eight weaving gold
  ribbons (sparse and dim at the 1950s left, swelling to bright dense
  counterpoint at the 1990s peak), cream notation strips at the entry years,
  the cursor standing at 1968 with three voices lit around it, year ticks
  (1952…2019) and the caption along the bottom margin. Mobile keeps the full
  span with labels and caption legible and nothing clipped.
- Fix round: the first build stroked every year-segment separately; the
  overlap at segment joints doubled the alpha and made ghost ribbons read as
  beaded dotted trails. Rebuilt as continuous-stroke passes (ghost span,
  active runs, flash) and re-rendered; ghosts are now smooth.

## Deviations

1. **Gesture-gated audio.** The prompt treats sound as continuous data, but
   browsers cannot start audio before a gesture; the first pointer press
   creates the context (and any press is also the piece's tap/scrub input),
   so in practice sound begins with the visitor's first touch. Visuals are
   complete without it. Recorded per standing gallery convention.
2. **Tap resolves after a 0.35 s window.** A tap's burst fires only once the
   double-tap window closes, so a double-tap means the quiet-year jump alone
   rather than burst-then-jump. Cost: bursts land a third of a second after
   the tap.
3. **Notation heads at true entry years.** Heads sit where each voice first
   becomes active (1952, 1962, 1967, 1969, 1970, 1972, 1988, 1991), not all
   stacked at the left edge; the composition brief's own wording ("at each
   ribbon's ENTRY, the first year it becomes active") governs. Voice 1's head
   is at the left edge as specced.
4. **Playback voicing.** During the sweep, each active voice cycles the
   subject fragment continuously in its register with entries staggered by
   voice, rather than restarting the fragment at each year boundary; the
   year's voice count is still exactly what sounds at the cursor.
