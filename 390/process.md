# №1152 — Raw Import

Antonio Roberts study block AR1: the 2009 Audacity databending tutorial
— import an image as raw audio (U-Law / 16-bit PCM, 44.1 kHz), apply
echo/delay, export raw, reopen as image. Roberts gave the technique away
because the only documented method needed Adobe Audition.

## The piece

The source is procedural: 34 flat geometric tiles — circles, bars, right
triangles, squares — in the five burst colors #FF2E88, #00F0FF, #B6FF00,
#FFD500, #FFFFFF on black #000000, placed by a seeded stream and baked
into a 160×160 grid of color indices. The grid is the stand-in sample
buffer: everything after this is the buffer being played through the
wrong decoder. All bending is computed in the grid data and drawn as
flat rects — no offscreen canvas, no ImageData, no real encoding.

A seamless 10-second loop runs the effect chain's wet/dry envelope:
0 s clean source, tears begin at 3 s, full databend at 6 s, partial
recovery by 8 s (to a 0.35 residual — never full), easing home to clean
at 10 s. Rows below the header are grouped into bands of 4; each band
has a seeded bend threshold and base offset, so bands tear at different
points of the envelope and the recovery leaves the low-threshold bands
still torn.

Three bend operations, all band-structured (whole rows, never scattered
noise):

- **Echo / delay line** — a torn row is drawn at its band offset plus
  3–4 ghost copies of itself sliding right at the tap spacing (9 cells,
  ≈40 px), with tap amplitudes 0.7 / 0.45 / 0.25 (and 0.15 for the
  fourth tap in deep-bent bands) — the way a delay writes decaying
  copies across a sample buffer.
- **Channel split** — inside a torn row, composed in the data: the warm
  entries (pink/yellow, the "red" channel) are sampled from 2 cells up,
  the cool entry (cyan, the "blue" channel) from 2 cells down, lime
  stays home, white is all channels at once. The split distance scales
  with band strength, approximating the prompt's 6 px R-up / B-down.
- **Bursts** — deep-bent bands (strength > 0.6) take flat blocks of
  impossible color at seeded positions, growing in with the bend.

The top 48 grid rows are the file header: rendered on a muted #1A1A1A
ground and never bent — no tear, no split, no burst — so the clean
tiles always read against the detonated field below.

## Motion and interaction

Watch-only, per the prompt. No pointer handlers, no sound. The loop is
a closed-form function of phase, identical every pass: clean, tear,
detonate, partially recover, rewrite.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in fit(),
  which runs at the top of every draw(). The square composition is
  centered; on phones it goes full-width.
- Phone detection via window.screen physical size (min dimension
  < 700 px).
- Determinism: frame one is drawn synchronously at the fixed phase
  T0 = 6.2 s — header tiles clean on their gray ground, the field below
  at full databend: torn bands with rightward echo ghosts, channel-split
  fringes, flat bursts — and requestAnimationFrame is typeof-guarded,
  anchored to that phase plus elapsed time. No Math.random; all
  variation comes from mulberry32 streams seeded per shape and per band.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen
  canvas, no ImageData, no createElement, no microphone, no audio. No
  visible text except the <title>.
