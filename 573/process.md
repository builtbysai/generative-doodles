# №1731 One Twenty-Second Down (greyfade GF4 / PP978)

The felt phenomenon: twenty-two bone-white bars pulse on a shared slow clock, and with every completed cycle the whole set sits a fraction lower, a retuning you notice only over minutes, like a piano being retuned while it plays.

## Mechanism

Canvas 2D, 22 thin vertical bars in a single horizontal band centered on an ink-black ground (#0A0A0A). Each bar pulses on a shared 11 s clock with a travelling phase (one full swell passes across the bars per cycle), so the pulse rotates rather than flashing in unison. A global detune offset equals (cycleIndex + u) / 22 of one bar's vertical range, applied as a slow continuous downward drift of the whole set within each cycle; because the offset is a continuous function of total time, there is no visible step at any cycle seam. The true repeat is 22 cycles (242 s), when the offset wraps to zero. Frame one is fixed phase: cycle index 3, t = 5.5 s into the cycle (total t = 38.5 s), detune already 0.159 of range, legible but subtle.

## Interaction

Watch-only seamless drift. No click, drag, or tap interaction.

## Palette

Ink black ground #0A0A0A, bone white bars #EFE9DD, faint blue edge light #7FA8C9 as a thin line along the left edge of each bar.

## Counts asserted

- Exactly 22 bars (probe barCount() = 22; pixel scan of the frame-one render at mid-height counts 22 distinct bone runs).
- Single centered band, black above and below, on desktop, mobile, and thumb renders.
- Per-bar variation: seeded mulberry32(1731) gives each bar its own width, height, phase, brightness, and edge-light alpha; no two bars identical.
- Detune probe: cycle 0 offset 0.022727 vs cycle 3 offset 0.159091 at the same point in the cycle; offset just before the 11 s seam 0.045450 vs just after 0.045459, a jump of 0.000008, continuous by construction.
- Gallery date 2006 · 10 · 08 (formula 2002-01-10 + 1732 days). Gallery note: "Twenty-two bars pulse on a shared clock; each cycle the set detunes one twenty-second lower, the true repeat twenty-two cycles long. Watch the slow detune."

## Deviations from the prompt

None. One interpretive choice: the detune is applied as a downward drift of the whole band (1/22 of one bar's vertical range per cycle, range taken as the band height), and the live loop wraps phase at 242 s so the 22-cycle repeat is exact. The wrap at cycle 22 is the defined true repeat, not a mid-cycle step.
