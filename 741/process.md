# №9052 · Weave

## Study
Instagram generative-art search (2026-10-03): plotter-weaving pieces
(Arnaud Pfeffer's "Plotter weaving" — continuous neon-green thread
forming interlocking lattices) show the appetite for textile logic in
code art. The weave is a natural algorithmic structure: plain weave is
binary (over/under alternation), twill is modular arithmetic.

## Concept
Warp and weft threads crossing in plain weave on near-black. Each thread
is a sine-wobbled line (hand-loomed feel); at every crossing, the over
thread is drawn bright with a paper-colored gap cut through the under
thread. The parity alternates like real cloth.

## Process
- 14-21 threads per direction, 120 samples each.
- Sine wobble: amplitude 0.15-0.35 × gap, frequency 2-4.
- Pass 1: all threads in dim ink (the unders).
- Pass 2: over-segments (parity (i+j) even = warp over) in bright ink
  with 7px paper gap.
- Threading label centered below.
- Click reseeds.

## QA
- Desktop 1280x800 inspected: over/under reads clearly as woven cloth.
- Zero exceptions (cdp_exceptions.py).
