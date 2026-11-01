# №1394 "Dreamachine" (zack-khalil ZK3, PP617)

A perforated drum seen from outside: a dark cylinder banded with slots,
spinning, light bleeding through the slots in rhythmic pulses that wash
upward and downward across the frame.

## Composition

- A wide horizontal drum band at frame center (40–60% of height) in drum
  black `#141312`, edged with smoke-gray lines and faint ribs, on a dark
  warm ground `#171614`.
- Slots cut at irregular intervals (seeded, never a metronome): gold
  `#f5c542` rects of varying width and height, about a third carrying a
  leak-red `#b01e24` sliver.
- Each visible slot throws a faint flat-alpha wash column above and below
  the drum; the columns sweep the frame as the drum spins.
- When a slot crosses frame center, it leaves a brighter burst column that
  fades as stored history (the afterimage); older bursts linger behind it.
- Faint smoke-gray vertical streaks drift across the whole frame on
  closed-form sine offsets; paper-white register ticks mark the drum edges.
- No visible text except `<title>`. No readable words anywhere.

## Motion and interaction

- The drum spins continuously at 10 rpm by default: one full revolution
  every 6 s, so the loop closes exactly (slots realign; only smoke and
  fading bursts differ across the seam).
- Dragging changes the spin rate across the 8–14 rpm range. The drag offset
  decays with tau 3 s after release, so the drum always settles back to
  10 rpm. Each pointermove event contributes at most 50 px, so one event
  can never inject more than a 1 rpm shift.
- The pulse pattern regenerates from a new seed at each rate change: the
  pulse seed is derived deterministically from the current rate
  (seed 1394000 + round(rate × 10) × 7919), so the same rate always yields
  the same rhythm (which slots burst strongly, burst widths, red leaks).
- The afterimage trail lengthens as the rate rises: burst fade duration
  grows from 0.9 s at 8 rpm to 2.2 s at 14 rpm, and the number of retained
  ghost bursts grows from 4 to 10.
- Optional hum: a sine hum whose pitch tracks the spin rate, created ONLY
  inside the first pointerdown gesture (lazily created, typeof-guarded
  WebAudio), sounding only while the pointer is active. The piece is fully
  visual without it; there is no autoplay.

## Adaptations from the prompt

- **No offscreen canvas** (the QA renderer provides none): the drum and
  slots are drawn procedurally every frame from the seeded layout.
- **No gradients** (unreliable in the QA renderer): light is flat-alpha
  rects and nested halo rects, never gradient fills. Slot glow, wash
  columns, and bursts are all flat alpha.
- **No canvas-fade**: bursts and trails are stored-history shapes with
  computed alpha, never a fading fillRect.
- **Flash contrast capped**: pulses are partial-contrast columns (alpha
  capped at 0.22 for bursts, 0.10 for wash), never hard full-screen
  strobing; the drum band itself never flashes.
- **Scroll is an exact closed-form integral** of the drag-offset rate,
  not `t × rate(t)`: the naive form goes backward as the rate decays
  (caught in probing: a +300 px drag measured only 308 px of travel
  instead of ~400 px). The integral form is always monotonic. The clamped
  8–14 rpm rate drives pulse character, trail length, and hum pitch;
  during ordinary drags the two agree, and only extreme scrubbing lets
  scroll run briefly faster than the reported rate.
- **Crossing direction**: slots travel leftward, so a center crossing is
  prev-right/cur-left; the first build tested the opposite direction and
  no bursts ever fired (caught in probing by a flat center-strip series;
  fixed, frame one unchanged).
- Determinism: frame one is `draw(0)` via a boot flag; the clock starts
  only with the rAF loop (plain function declaration, typeof-guarded).
  All randomness is mulberry32 (seed 1394000, plus rate-derived seeds),
  never Math.random. No Path2D, shadowBlur, createElement, localStorage,
  getUserMedia, fillText, or strokeText anywhere.

## Verification (forced-time probe harness: stubbed rAF driving the piece's
own loop, pointer events to its own listeners, 1280×900)

- Two fresh instances render byte-identical frame-one images.
- Frame one: 32,698 gold px inside the drum band (slots present), 0
  bright-gold px above the band (no bursts before any crossing).
- t=0 vs t=1 differ in 518,612 px (drum spins); t=0 vs t=6 differ in only
  79,536 px (one revolution: slots realign, residual is smoke + bursts).
- Center-strip mean red rises from the 23.0 ground baseline to 43–107
  while bursts arrive and fade (bursts firing, not just wash columns).
- Best-shift measurement of band-strip motion t=3 → t=4: undragged 298 px
  (expected 299 at 10 rpm); after a realistic 6 × 50 px drag at t=2,
  408 px (expected ~400 at the decaying ~13.5 rpm rate).
- Identical drag sequences reproduce byte-identical frames.
- Renders inspected at 1280×900, 390×844, and 720×720; mobile keeps the
  same centered composition with no clipping. Thumb byte-identical across
  repeated renders, including after both fix rounds (frame one unchanged
  by either fix).

## Fix rounds (2)

1. Burst crossings tested the wrong travel direction (slots move left, not
   right), so no bursts fired. Fixed to prev-right/cur-left with a
   small-step guard excluding the wrap jump.
2. Scroll used `t × rate(t)`, which runs backward as the drag-decayed rate
   falls. Replaced with the exact closed-form integral of the drag-offset
   rate, plus a ±50 px per-event drag clamp.
