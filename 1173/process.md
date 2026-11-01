# №1173 — MicroMonotaur

Jon Satrom study block JS6 — MicroMonotaur (2015): exploiting the
fallibilities of analogue and digital data storage. A lab bench for storage
media: three devices are read in turn by one shared read head, and every
read goes bad on schedule. The bench framing is always on screen — title,
card labels, readout strip — so the failures read as a staged illustration,
never as an error on the viewer's own machine.

## Composition

Bench `#101014`. Three device cards (`#1A1A1E`) carry flat `#E8E8E8` line
illustrations: a floppy disk (shutter, paper label, write-protect notch), a
hard drive (chassis, platter, actuator arm, corner screws), a USB stick
(connector teeth, cap line, body LED). Each card is labeled ("FLOPPY
1.44MB", "HDD 5400RPM", "USB FLASH") with a state word and status LED in its
header: IDLE for the waiting devices, READING / DEGRADING / FAILED for the
one under the head. Thin wires run from each card down to a wide waveform
band (`#00FFC2` on `#0A0A0C`, labeled READ HEAD — <device>), and a readout
strip along the bottom pairs a `#FFE14D` READOUT label with the current
state text, the failure names in `#FF3B30`, and a live SIGNAL percentage.

## The cycle

A 30 s rotation, 10 s per device, closed-form in piece time T plus a tap
anchor. Each read runs the state machine IDLE → READING → DEGRADING →
FAILED:

- **READING (p 0–3 s):** the waveform is a clean seeded pseudo-audio sum of
  two sines, scrolling; the illustration is intact.
- **DEGRADING (p 3–8 s):** degradation `d` climbs in ten hard steps
  (0.1 … 1.0 by step). The waveform takes dropouts (seeded segments zeroed,
  probability 0.6·d), bit-flips (seeded samples sign-flipped, 0.35·d) and a
  speed wobble (sinusoidal time-warp, 0.05·d). The active illustration
  glitches in sympathy: it is drawn in 8 horizontal bands, each offset by a
  seeded amount × 16 px × d, and each device fails its own way — the
  floppy's label smears into streaks, the HDD platter's rotation angle is
  quantised harder as d grows (stutter), the USB stick's LED flickers in
  seeded steps.
- **FAILED (p 8–10 s):** everything freezes mid-glitch (device parameters
  are evaluated at p = 8, d = 1), the waveform flatlines into sparse frozen
  noise ticks, the card border turns red, and the readout names the failure:
  FLOPPY → "SECTOR NOT FOUND", HDD → "HEAD CRASH (SIMULATED)", USB →
  "BIT ROT". SIGNAL reads LOST.

**Tap a device card** and the cycle re-anchors: that device starts reading
from p = 0 at the tap, and the rotation continues from there. Otherwise
watch-only. Silent by design.

## Determinism and house rules

- First frame drawn synchronously at fixed phase T0 = 16 s: the HDD (middle
  card) is active at p = 6, degradation step 0.6 — waveform visibly dropped
  out and flipped, the HDD illustration sheared into bands, readout reading
  "HDD — DEGRADING", SIGNAL 40%. The rAF loop is `typeof`-guarded and
  anchored as T0 + elapsed since load.
- Canvas size from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  in `fit()`. Phone detection via `window.screen` physical size (min
  dimension < 700 px) with the `h > w·1.15` aspect fallback; on phones the
  cards stack and only the active device is wired, via a margin bus down
  the left edge into the read head.
- All randomness is seeded: mulberry32 tables per device (dropout
  thresholds, flip thresholds, band offsets, wobble phase) fixed at load,
  plus an integer hash for streaks, ticks and LED steps. No gradients, no
  `ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`, no
  ImageData, no audio, no microphone (grep-verified clean). Circles are
  drawn as standalone paths (a `moveTo` before every arc), per the
  node-canvas batched-subpath lesson.

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); the duplicate was deleted.
- Desktop (1280×800), mobile (390×844) and thumb renders read by eye. First
  pass caught three faults, all fixed and re-rendered: the HDD chassis and
  USB body were sized wider than the illustration box, so the band clips
  ate the chassis top and bottom edges; the phone wire bus for all three
  cards overlapped into scratches along the left edge (now only the active
  device is wired on phones); the bench title wrapped onto the subtitle at
  390 px wide (title size is now phone-aware).
