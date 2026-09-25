# Species in Pieces: Study Notes

**Site:** species-in-pieces.com | **Author:** Bryan James
| **Doorway:** study queue (interactive classics territory).

**Depth: deep.** The live page would not render in the headless harness
(egress proxy TLS failure on the host, so this session never saw the
site's own UI, intro, or chrome), so this study went one level deeper
than screenshots: the full shipped CSS (main.css, 724 KB, read
programmatically, all 1808 clip-path rules extracted) and the shipped
JS (main.min.js, vars.min.js) were pulled and analyzed, and four of the
30 animals plus one mid-morph frame were re-rendered in plain HTML/CSS
from the exact shipped polygon and color data and visually inspected.
Every claim below about the artwork comes from that data, not the
marketing copy.

## What it is

An interactive exhibition of 30 endangered species. Each animal is an
illustration built from exactly 33 triangles, and clicking next/prev
morphs the whole figure into the next animal: the same 33 triangles
shatter and reform, each with its own staggered timing so the change
sweeps across the figure like a wave. There is no canvas and no WebGL.
The entire piece is divs plus CSS clip-path.

## The engine (from the actual shipped files)

The DOM holds 33 fixed `.shard-wrap` divs, each containing one
`.shard` div. Every shard is absolutely positioned, 100% by 100% of a
`.wrap` stage that JS sizes to 99% of viewport width by 70% of that
width. The visible shape of a shard is one line of CSS:

`-webkit-clip-path: polygon(x1% y1%, x2% y2%, x3% y3%)`

Percentages, so the whole figure scales with the stage. For each of the
30 animals the stylesheet holds a complete set: 33 clip-path polygons,
33 shard background colors, and one stage background color, all selected
by a single class on `#animalchanger` (`.crow`, `.vaquita`,
`.kakapo`, and so on). The morph trigger is literally one statement in
main.min.js: `$("#animalchanger").attr("class", animalList[newAnimal])`.

The magic is all in the transitions. Each shard gets a staggered
transition, roughly:

`-webkit-clip-path 0.34s 0.22s cubic-bezier(0.7, 0.3, 0, 1),
background-color 0.34s 0.02s`

with the delay growing per shard index, so shard 1 moves first and shard
33 last. The cascade direction alternates: the `.wrap` toggles between
`left-to-right` and `right-to-left` classes on every animal change, so
the morph sweeps one way, then back. Background colors crossfade with
much shorter delays, so the figure's colors change first and its shape
follows. Since every shard is always exactly three vertices, the browser
can interpolate clip-path directly: each vertex lerps in a straight
line, and 33 simultaneous vertex-lerps read as the animal dissolving and
reforming.

The polygons were hand-authored: the about page says no tricks or tools,
point by point and shape by shape, after illustration, via a
personally-created tracing JS function. That shows. The triangle counts
per animal vary in practice: some animals leave a few shards collapsed
to the center point (`polygon(50% 50%, 50% 50%, 50% 50%)`, the `.shard`
base rule), effectively unused. The vaquita data has 30 active shards.

The intro is a preloader that scatters the shards, a text timeline
("In Pieces / 30 species, 30 pieces"), and a skip link. There is also an
all-animals grid view with its own burst stagger (`earlyburst` rules).

## What makes it sing

The hard constraint does all the work. Three vertices, always, means
the art direction is forced into flat faceted low-poly, and it means
morphing is free: no path-matching algorithm, no vertex bookkeeping,
just CSS. The stagger is the difference between a transition and a
performance: a uniform 0.34s morph would read as a crossfade, but the
cascading delays turn it into a shatter-and-reform. Alternating the
sweep direction keeps the 29th morph as fresh as the first. And the
per-animal stage colors (vaquita on #64d6e2 cyan, kakapo on #dbbe39
mustard, forest owlet on #a09de5 lavender) do heavy lifting: a bold flat
field makes 30 dark triangles read instantly as a figure, no outlines
needed. The faceted shading is doing illustration work too, darker
triangles on the shadow side, pale ones catching light, all flat fills.

## Avoid list additions

- Do not add vertices to cheat a morph. The moment shards have mixed
  vertex counts, clip-path interpolation breaks and you need real path
  morphing machinery. The 3-vertex budget is the technique.
- Do not morph without stagger. Simultaneity reads as a crossfade;
  the cascade is what makes it feel physical.
- Do not trace from photos. The hand-traced, deliberately simplified
  silhouettes are why the triangles read as animals; a literal trace
  would scatter vertices on detail the budget cannot afford.

## Open questions (honest gaps)

- Never saw the live intro, the all-animals grid, or the sound design
  (soundmanager2 is bundled). The preloader scatter behavior is inferred
  from the `.preloader` rules, not witnessed.
- The two tiny dark triangles floating top-left of the vaquita frame are
  in the shipped data. They are probably distant birds in the scene, but
  I could not confirm against the live render.
