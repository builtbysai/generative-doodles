# №1318 "Distilled Moment" (leslie-hewitt LH7, PP485)

A dual-channel meditation on one archival fragment, after Hewitt's
Untitled (Structures) (2012, with Bradford Young) and the Menil archive
sessions. LEFT channel: still, near-black field holding one excessively
zoomed detail — the back of a shoulder, a curve of hair dissolving into
static blur. RIGHT channel: the same fragment slowly re-photographed.
The two channels never sync.

## Layout

Landscape. Two channels 50/50 with a 2px divider in faint highlight
color. The fragment sits centered in each channel at different scales:
left wider, right tighter. A caption strip 8% tall runs along the
bottom, holding the archive viewing log verbatim from the prompt:
"72:00:00 — viewing the civil rights era archive." Palette:
near-black #0E0C09, fragment warm gray #8A8478, hair-blur #3E3A33,
highlight #D8D4C8, caption strip #1A1712 with text #B9B2A4.

## The fragment

Abstract geometry only, never a face, never a body, always at the edge
of recognition. The shoulder reads as one smooth hill curve (a
quadratic stroke) over a soft warm-gray body wash; the hair as a dark
swirl mass of flat-alpha ellipses riding the crest, with short strand
arcs fanning off it. At low focus the curve dissolves into a faint wide
band and the strands vanish; as focus sharpens, the crisp line and the
strands emerge, but the fragment never resolves into anything legible.

## Motion (watch-only, no scrubbing, never click-to-reload)

- LEFT channel holds almost still: the fragment sits at a fixed low
  focus (0.12) with only a faint film-grain crawl.
- RIGHT channel loops a 20-second focus breath: blur at t=0, near-sharp
  at t=10, blur again at t=20, as a closed-form cosine of piece time.
- The archive timer starts at 72:00:00 at load and advances with piece
  time, so frame one is always the zero state. The caption font shrinks
  at runtime until the verbatim log line fits the strip, so it is never
  clipped on phones.
- Channels deliberately out of phase: the left never breathes, the
  right never holds.

## Determinism

Frame one is drawn synchronously at exactly t=0 via a boot flag; the
clock starts only with the rAF loop (a plain function declaration
behind a typeof guard). Film grain is a closed-form seeded function of
the quantized time index (mulberry32 keyed by floor(t*12)), never
per-frame Math.random. No gradients, no shadowBlur, no filter, no
offscreen canvas, no AudioContext, no getUserMedia; blur is layered
flat-alpha shapes, grain is seeded dots. The single token-scan hit for
"Math.random" is a comment stating it is not used.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, and
720x720 thumb; inspected at all three sizes. Forced-time probe: t=0 vs
t=10 differ in 7,073 sampled pixels, confirming the focus breath runs.
Thumb rendered three times, cmp byte-identical.

## Fix rounds

1. First fragment read as an opaque blob cluster: the halo ellipses
   were too large and too opaque, and the shoulder curve was buried.
   Rebuilt the fragment around one hill curve with a soft body wash,
   a dark hair mass on the crest, and focus-gated strand arcs.
2. First fragments overflowed their channels: radii now clamp to the
   channel half-width as well as the field size.
3. First mobile render clipped the caption line: the log font now
   shrinks at runtime until the line fits the strip.
