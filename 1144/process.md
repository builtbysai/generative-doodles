# №1144 — Block Lattice

Rosa Menkman study block RM1, grounded in DCT:Syphoning (2015–17) and her
formulation of JPEG's 64 DCT "characters" with "lumo and chroma values as
intonation."

## The piece

A procedural source — concentric rings around an off-centre point, cut by
two diagonal bars — is never drawn directly. It is seen only through a
48×48 macroblock lattice, each block flat-filled with exactly one of five
colors: near-black #1A1A1A for near-zero energy, orange #FF3B00 for low DC
fill, cyan #00E5FF where AC energy dominates (edges), yellow #FFD800 where
DC luminance is high, green #7CFF00 where chroma dominates. A 1 px #333
grid marks every block boundary at all times. On a #0A0A0A ground, the
rings and bars stay legible through the quantization — the grid is the
image.

The source is a function, not an image: `src(u, v)` returns luminance and
chroma analytically. Each block's descriptor — DC (mean luminance), AC
(luminance variance across 25 samples), mean chroma — is computed from
that function every frame. There is no offscreen canvas, no toDataURL, no
real JPEG encoding: the compression is computed, not performed.

## Motion

Watch-only, a seamless 12-second loop, no interaction at all. Quality
breathes from 90 down to 5 and back on a triangle over the loop, while a
diagonal wave travels across the field once per cycle and modulates the
quality locally. The combined quality is snapped to eight hard steps, and
each block's descriptor is snapped to a step count set by its local
quality (2 steps at the bottom, 8 at the top) — so blocks quantize in
visible terraces: geometry reads crisply where the wave rides high and
dissolves into chunky color regions where it troughs, without ever
blacking out. No gradients anywhere, no blending between steps, no
Math.random; the loop is a pure function of phase.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in fit(), which runs
  at the top of every draw(). The square lattice is centred in the view.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback (h > w * 1.15); the lattice is identical on phones.
- Determinism: frame one is drawn synchronously at the fixed phase
  T0 = 3.0 s — mid-loop, mid quality, the diagonal wave crossing as a
  quality boundary — and requestAnimationFrame is typeof-guarded,
  anchored to that phase plus elapsed time.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas,
  no createElement, no microphone, no audio. No pointer handlers
  (watch-only per the prompt). No visible text except the <title>.
