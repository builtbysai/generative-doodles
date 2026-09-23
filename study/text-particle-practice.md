# Text as particle target: practice notes

Sources: DonKarlssonSan study note ("Repellers": particles form letterforms,
planets repel on mousemove; text is just a set of target coordinates), plus a
current recipe (itsxactly/daedalus canvas2d-particle-systems SKILL.md, crawled
2026-09): render text to an offscreen canvas, scan pixel data with getImageData
at a spacing step, keep pixels above a brightness threshold as targets, assign
particles to targets.

## What the tutorials do (and why it is not enough)
- Particles seek targets with spring + damping, settle into the word, mouse
  repels. It works but reads as a demo. DonKarlssonSan's own note: push
  further than a tutorial-grade sketch.

## My twists (for №9012)
- Particles never settle: each gets an orbit phase and a perpendicular
  oscillation around its target, so the letterform shimmers instead of
  freezing. Spring holds the word legible; orbit keeps it alive.
- Gust cycle: every ~4 seconds a wind wave scatters the swarm and it reforms.
  The reforming is the beautiful part.
- Rendering as short segments (pos -> pos + vel), DonKarlssonSan's streaky
  style, low-alpha indigo on warm paper, with a partial canvas fade so motion
  leaves comet trails but the word stays crisp.
- Seeded word list, word in the URL (?word=), click = new word + new seed.
  Georgia bold for letterforms with real stroke contrast.
- Pointer/touch repulsion kept but gentle; the piece lives on its own.

## New seeds this yields
- Two-word morph: swarm dissolves one word and condenses into another on a
  timer.
- Text targets from hand-drawn strokes instead of a font (scan my own marks).
- Image targets: swarm forms a sampled photograph, gusts scatter it.
