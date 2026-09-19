# ge1doot: Study Notes (DEEP)

**Pen:** codepen.io/ge1doot/pen/WbWQOP — "I could not stop"
**Status:** 2026-09-19, deep. Full JS/CSS read via the cdpn.io debug view,
the pen's two source images fetched and inspected, and the whole piece
re-rendered locally with simulated clicks and visually inspected.

## What it is

Not a canvas piece at all: pure DOM. A full-viewport black screen. Click
any image and it splits into four quadrants, each showing a random image
from a hidden pool. Keep clicking and it subdivides forever. The title
is the joke: you cannot stop subdividing.

The images are the punchline. The pool holds four images: three copies
of frame.jpg and one of frame0.jpg, so roughly 3:1 odds. They are framed
versions of Kazimir Malevich's squares: a black square in a worn white
frame photographed on a gray gallery wall, and frame0.jpg is the RED
square variant. Every subdivision produces more little gallery walls of
framed Malevich squares, infinitely nesting. Conceptual art wearing a
quadtree costume.

## Technique (read from the pen's actual JS)

- About 20 lines of JS. A `div(el)` function creates four
  absolutely-positioned `.frame` divs (each 50% wide, 50% tall) at
  (0,0), (1,0), (0,1), (1,1) inside the parent, each holding an `<img>`
  with a random `src` from the pool.
- Each image gets an `onmousedown`: subdivide the parent tile into four
  and remove itself. Because the subdivision targets the tile that was
  clicked, depth is unbounded: the only limit is pixel size.
- Random pick is `src[Math.floor(Math.random()*src.length)]`, so
  duplicate pool entries act as weights: three black to one red.
- CSS does all layout: `.frame` tiles at 50% size, images stretched
  100%x100% of their tile, `ondragstart` disabled so clicks are clean.
  Full-bleed on any viewport because everything is percentage-based.

## What makes it sing

- The subdivision is the content. A quadtree is a boring data
  structure; pointed at Malevich's black square it becomes a gag about
  art, scale, and infinity. The technique and the reference are one
  thing, not two.
- Zero chrome. No buttons, no UI, no instructions. The piece trusts the
  viewer to click, and the recursion rewards it. The simplest possible
  interaction (click) driving the simplest possible structure (halve and
  halve again).
- The weighting is doing real compositional work: mostly black squares
  with an occasional red one keeps the eye moving. Flat 50/50 would look
  busy.

## What to take from it (study, not copy)

- Recursive DOM subdivision as a compositional device: tiles that split
  on interaction are a whole family of pieces (nested frames, zoom
  collages, infinite rooms). Canvas could do it too, but DOM makes hit
  detection free.
- Duplicate pool entries as a weighting idiom: no weights object
  needed, just put the entry in the array more times.
- Percentage-based tiles mean the piece is viewport-agnostic, which
  matters for full-bleed interactive work.
- Conceptual hook matters more than code volume: twenty lines of JS,
  one art-historical reference, and the piece is memorable.

## Avoid-list

- Don't subdivide for nothing: without the Malevich reference this would
  be a tech demo. The lesson is that a dumb recursive trick needs a
  reason to exist, not that recursion is always interesting.
