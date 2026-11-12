# Squarewave Glyphs, No.1726 (PP973 / ZB7, study #226 zach-bodtorf)

Build log, 2026-11-12. Plain canvas 2D, no external scripts.

## What it is

Sixteen square-wave glyphs in one horizontal band on near-black ground,
bone white with a single signal-red accent. Each glyph is a small pulse
train: a trace that steps hard between a low rail and a high rail, with
its own seeded duty cycle (0.30 to 0.70) and one or two wave cycles per
cell. No sine anywhere; every transition is a vertical step.

## Clock and duty cycle decisions

One shared slow clock drives everything: an 8 s period, with each glyph
snapping its pulse height between a minimum (0.28 of band height) and a
maximum (0.86 of band height) every 4 s. The snap is a hard state change
computed from floor(t / 4 + offset), with a per-glyph seeded phase offset
so the band never flips all at once. No easing anywhere.

The accent glyph is index 14 (seeded). Its offset was set to 0.55 so its
snap lands at t = 1.8 s, which puts frame one (t = 2.0 s) 0.2 s into its
fade, so the thumb catches it mid-flash in signal red. The red fades back
to bone white over 1.0 s after every snap.

Frame one is fixed at t = 2.0 s into the 8 s cycle, a mid-state band with
a mix of tall and short glyphs. All seeds come from mulberry32(1726); no
Date.now, no unseeded Math.random, no wall clock. The 8 s loop divides
the cycle exactly, so the loop is seamless. Snap rate is 0.25 Hz, far
below the 14 Hz flicker limit by construction.

## Layout

Centered band, generous black margins above and below. Desktop band is
0.86 of the square stage; phones get a wider, taller band (0.90 by 0.42
of viewport width) so the glyphs stay readable. Title plate top-left,
hint plate bottom-left, both on the near-black ground.

## Deviations from the prompt

None material. The prompt says glyphs snap between a minimum and maximum
amplitude on a shared slow clock; implemented as pulse height snapping
between two fixed rails, with per-glyph seeded duty cycle and phase
offset, which is the reading that keeps each glyph a distinct square-wave
segment rather than a single bar.

## Gate

Rendered with node-canvas at 1280x900, 390x844, and 720x720. Fix round:
cell gap widened (0.012 to 0.02 of band width) and stroke thinned after
the first pass read as one merged barcode; phone band enlarged after the
first mobile pass read small. Re-rendered after the fix; desktop, mobile,
and thumb all read well: hard steps, distinct glyphs, accent readable.
Thumb re-rendered twice, byte-identical.
