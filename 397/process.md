# №1212 — The JPEG Decides

Amy Szczepanski study block AS5 (mechanism M2: the palette is computed by a
quantization mapping, never chosen). A single Null_Sets-style band print,
full-bleed — no frame, no wall. 48 horizontal flat bands whose colors are
computed from one fixed input text. Every 30 seconds the quantization source
switches and the same text re-renders in a different palette: the art is the
palette the file format would have used. The hand is nowhere in it.

## The input

The US Constitution — the preamble and the opening of Article I — verbatim,
public domain, exactly 1200 bytes. Band b reads the chunk
bytes[b*25 .. b*25+25). The text is never displayed; only its bytes are read.

## The mapping (deterministic, in full)

For band b and source table T:

1. Coefficient: c_b = Σ_j byte_j · w_j over the band's 25 bytes, where the
   weights w_j = round(10·|cos((j+0.5)π/25)|) + 1 follow the absolute value
   of the DCT's first basis cosine sampled across the chunk — heavy at the
   edges, weightless at the center.
2. Quantize: q = round(c_b / Q_T[b mod 64]).
3. Sector: hue sector = (q + rotation_T) mod 10, indexing the study's fixed
   10-color table: #E5484D, #F76B15, #FFC53D, #46A758, #12A594, #0090FF,
   #6E56CF, #D6409F, #FF4D6D, #101010.
4. Shade: shade = (q div 10) mod 3, one of three flat shades of the sector
   color (channel factors 0.78 / 1.00 / 1.16, clamped). Bands are always
   flat fills — no gradients anywhere.

The three sources:

- **JPEG luminance table, standard** — Q is the actual standard JPEG
  luminance quantization table (quality 50). Sector rotation +5.
- **JPEG chrominance table, standard** — Q is the actual standard JPEG
  chrominance table (quality 50), dominated by 99s. Sector rotation +8.
- **DCT coefficient rounding, 8x8 blocks** — Q is a rounding ladder
  8, 16, 24, … 512. Sector rotation +1.

Honesty note, as the study requires: the luminance and chrominance arrays
are the real published JPEG tables, but the pipeline as a whole is a
stylized stand-in — a real JPEG quantizes frequency coefficients, not byte
sums, and the DCT ladder and the per-table sector rotations are inventions
tuned to the tables' known biases (luminance resolves fine detail and cool
structure, chrominance is quantized brutally toward the magenta/pink end of
this study's wheel, coarse DCT rounding leaves the warm primaries standing).
The families genuinely emerge from the arithmetic, not from per-source
color lists: with the shipped text and formula, the luminance render holds
15 of 48 bands in its green/teal/blue sectors (plus 5 indigo), the
chrominance render holds 16 of 48 in magenta/pink (plus 4 indigo), and the
DCT render holds 15 of 48 in red/orange/yellow — each a plurality lean with
the other hues scattered through, which is what a codec's palette looks
like.

## Behavior

- **Cycle.** Source index = floor(t/30) mod 3. At each switch the bands
  re-flow top to bottom over 5 seconds: band b flips at
  windowStart + b·(5/48) s, with a 0.15 s darker blink (×0.55) at the flip.
- **Scrub.** Dragging maps pointer x to a continuous table parameter
  u ∈ [0, 2]; band colors blend in RGB between adjacent tables at
  (u − floor u). The scrub value holds while dragging and for 2 s after
  release, then the stepped auto-cycle resumes. No color picker, no
  palette UI, nothing labeled with a color name.
- **Band texture.** Middle bands (10–37) carry the study's stair-stepped
  boundary bits: along each band's bottom edge, 28 steps whose depths are
  2-bit fields of the band's own chunk bytes, drawn in the band's current
  color over the band below.
- **Plaque.** Bottom-right, matte black (#0A0A0A) with engraved-gray
  (#C8C8C8) monospace text naming the current source. During a scrub blend
  it names the dominant source with " (blending)". It is the only visible
  text in the piece.

## House rules

Sizing from the Visual Viewport API with resize listeners on both the
visual viewport and the window; canvas CSS size pinned in draw(); phone
detection via `window.screen` physical size (min dimension < 700 px) with
the aspect fallback (h > w·1.15); full-bleed at every size. The first frame
is drawn synchronously at a fixed phase — T0 = 41 s, inside the
chrominance window with its re-flow complete — and the rAF loop (guarded
by a typeof check) is anchored as phase + elapsed since load, so frame one
is reproducible byte-for-byte. Seeded hashes only; in fact no hashes are
needed — every value derives from the fixed text and the tables. Silent:
no audio. No gradients, no ctx.filter, no shadowBlur, no createElement,
no ImageData/offscreen canvas, no microphone.
