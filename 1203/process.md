# №1203 — Hand-Processed Binary

Evan Meaney study block EV4. Meaney asks "how we are to make a hand-processed
video" — the scratch-and-warp of avant-garde emulsion film, translated from
chemistry to binary. The viewer's finger is the developer's hand.

## The scene

A flat home-movie scene drawn fresh each frame: figure (#101014) standing
against a saturated sky (#1B4FD8) over a darker ground band, a pale sun disc,
a few flat clouds, fence posts on the horizon. The scene is rendered in 44
horizontal slices (slice-clipped draws with a per-slice horizontal offset), so
displacement is native to the drawing rather than a post effect. Margins are
#0C0C0E, like the dark around a strip of film.

Each strip reseeds the scene from its index: the figure's position, the
horizon height, the sun and clouds change, and the pose cycles between
standing, walking, and seated on a block.

## The scratch

Dragging lays a scratch. A stroke is stored as data — a polyline of pointer
points plus its dominant horizontal direction — never as pixels. Its effect is
a persistent field, recomputed every frame:

- **Displacement.** For each slice row, a stroke contributes
  `26 · exp(−|pointY − rowY| / 20)` in its drag direction, taking the maximum
  over the stroke's points; contributions sum across strokes. Rows near the
  stroke shear sideways; rows far away hold.
- **Fringe.** Slices displaced more than 6px get channel passes: the figure
  redrawn in magenta (#FF2B8D) and cyan (#00E5FF) a few pixels either side of
  its sheared position.
- **Emulsion.** The stroke path itself is drawn as a band of overlapping
  filled circles in near-black (#060810) at low alpha — the darkened streak
  where the finger dragged its chemicals.

The scratch shows live while dragging and commits on release (drags under
30px are wiped off, uncommitted). Committed strokes never fade, never erase —
the image accrues the whole history of touch within the strip. A small chalk
counter at bottom-left ticks with each laid scratch: `frame N`, with a tiny
`strip S` tag above it. It reads like a darkroom notebook, not a score.

At twenty scratches the strip is a palimpsest: hard cut, strokes cleared,
counter reset, and a new strip begins with its reseeded scene.

The only other motion is a slow diagonal shimmer that sweeps the scene every
nine seconds — light moving across wet film.

## House adaptations

The prompt's technical approach stores the frame in an offscreen buffer; the
house renderer forbids offscreen canvases, so persistence is kept as a stored
stroke field instead — strokes are records, composited fresh each frame as
slice offsets, fringe passes and emulsion bands. Nothing is lost: the history
is in the data, not in a bitmap.

No gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
ImageData, no audio, no microphone. Canvas size comes from the Visual
Viewport API with resize listeners on both it and the window, and the CSS
size is pinned in `fit()`. Phone detection uses `window.screen` (min
dimension < 700px) with an aspect fallback. The first frame is drawn
synchronously at a fixed phase (T0 = 0): a fresh strip, an unmarked scene,
`frame 0` — the film before anyone's hand touches it. The rAF loop is guarded
by a `typeof` check.
