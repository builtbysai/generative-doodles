# Generative Doodles №8981 — “Own Lines” (2026-08-27)

## Concept

A Cytographia-inspired calligraphic line study: every visible mark is a
hand-built, vertex-shaded triangle strip — no `lineWidth`, no `stroke()`
anywhere in the piece, not even in the paper grain (fibers are tiny filled
parallelograms). Width along each strip is shaped by end taper, an optional
loaded-brush start, a seeded pressure rhythm, and ink pooling in tight
curves (curves swell and darken where the brush would dwell).

Each seed grows exactly one coherent subject — never a generic flow field.
Four subjects are possible per seed:

- **grass tuft** — wind-leaning blades from a loaded base, seed heads
- **heron** — alert/resting/fishing poses: sine-S neck, ink-wash body,
  needle beak, legs, water lines
- **wave** — a plunging breaker: hollow curl, spray flicks, foam dots,
  sea lines
- **bamboo** — culms with node rings and leaf clusters

The composition reveals itself with a gentle draw-on animation on warm
textured paper with a faint vignette, caption, and vermilion seal.
Click (or Space/Enter) regenerates a new seeded study; `?seed=N` pins one.

## Seeds tried

Rendered and inspected at 1280×800: grass 7, 8 · heron 12, 14, 18 ·
wave 1, 2, 3 · bamboo 4, 20 · plus random click-regenerated seeds
(e.g. 4115390465, a heron). Mobile 390×844 verified for the default.

## Why seed 2 won

Seed 2 draws the wave subject, and it reads instantly as a single plunging
breaker — hollow curl, loaded crest, spray flicks breaking off the lip —
while exercising the whole stroke engine in one frame: needle tapers on the
sea lines, pooled pressure through the curl, width-and-tone rhythm along the
body of the wave. It is the clearest demonstration of “own lines”:
calligraphy you can read as a subject, not texture.

## Cytographia, without copying

Researched Golan Levin’s Cytographia (custom calligraphic lines,
hand-engraved character, virtual paper, pen-plot lineage via Micrographia /
Pantographia / Haeckel / Codex Seraphinianus). Taken from it: the discipline
that line quality *is* the artwork, and the paper-and-ink presentation.
Nothing is lifted — the strip geometry, rhythm model, subjects, and
composition are original. Where Cytographia leans toward asemic/specimen
marks, this piece commits to one legible natural subject per seed.

## Build notes (what the iterations taught)

- Segment joints showed as light antialiased seams: fixed with per-vertex
  shared frames (one averaged normal per vertex) plus a second core pass
  that heals the half-covered joint pixels.
- Width rhythm and color rhythm were decoupled (smooth fundamental drives
  width; textured harmonics drive ink tone) so they never line up into a
  mechanical ribbed texture.
- The heron’s alert neck is a true sine-S so it can never kink; the beak
  angle eases toward the facing horizontal so it never stabs skyward.
- QA: `cdp_exceptions.py` exit 0 on the final file; click regeneration
  verified live (seed 2 → new random seed, caption updated, zero console
  entries); isolated Chrome on port 9332.
