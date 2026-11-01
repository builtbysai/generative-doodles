# №1248 "Archive of Things" — process

Jenna Maurice study block JM1 (PP407), after *The Archive of Things*
(2023–ongoing): objects laid on darkroom paper and exposed to sunlight
for hours — "the sunlight penetrates any part of the object that is not
entirely opaque" — the B&W emulsion blooming into color wherever the
sun lingered. A long-exposure lumen print in code.

## What it is

A dark sheet of paper (#2B2B30, hashed grain speckle, a faint edge line)
holds a still life of five procedural objects, slightly off-center:
a lemon, a grape cluster, three green-bean pods, two leaves and a seed
pod. A pale sun disc crosses the frame on a low arc, one traverse per
four minutes, out and back. Where the sun has lingered, the objects
bloom from silver-grey silhouette into their interior colors — the
lemon's pulp wedges into orange (#E8862E) and acid green (#C9D42E),
the grapes into magenta (#B13E7C), the beans into green (#5DAE62),
the leaves into two greens, the pod's chambers into ochre. Nothing
ever un-blooms within a sheet.

## House adaptation (the exposure buffer)

The prompt's per-pixel frame buffer (accumulated exposure field,
thresholded per pixel) cannot run in the QA renderer — no ImageData,
no offscreen canvas. Exposure is therefore kept as **data per object
part**. Each object is decomposed into parts (53 in total), and each
part carries a translucency `tr` and a hardness `hc`:

- lemon (10): rind ring, 8 pulp wedges, core
- grape cluster (16): stem + 15 individual grapes
- green beans (12): 3 pods × 4 segments, laid on each pod's curve and
  aligned to its local tangent so the pod reads as one bent body
- two leaves (8): blade + 3 vein zones each
- seed pod (7): shell, 3 chambers, 3 seeds

Exposure of part *i* at time *t* is the closed-form accumulation of
sun proximity, integrated by fixed 1 s steps over the deterministic
sun path:

    rate_i = tr_i · (0.20 + 0.80 · exp(−d² / 2σ²)),   σ = 0.24 (unit coords)
    threshold_i = (34 − 8·tr_i + 10·hc_i) · (0.7 + 0.5·rank_i) · 1.62
    bloom_i = 0.97 · smoothstep((E_i − threshold_i) / 36)

`rank` is the part's distance from the sun's apex home, so parts far
from the path bloom later; translucent parts bloom before opaque
ones. A part renders as near-black silhouette, a silver-grey wash
(#8E8E93) fading as `1 − bloom`, then its interior color at alpha
`bloom`, plus detail (pulp spokes, grape highlights, bean seeds, leaf
veins) fading in with the bloom. All flat layered shapes — no
gradients, no pixel machinery. The renderer's batched-ellipse quirk
is respected: every glow ellipse is its own path.

## The cycle

Sun phase is kept in seconds. One traverse is 240 s; the sun returns
along the same arc over the next 240 s (480 s of accumulation), then
sets for a 60 s rest with the print fully bloomed — a 540 s cycle.
When the cycle wraps, a fresh sheet replaces the finished print:
exposure restarts from zero (verified numerically: mean bloom 0.96
at t = 539, 0.000 at t = 545, and exactly the frame-one state again
at t = 690). Exposure never reverses within a sheet; prints are
replaced, not unwound.

## Interaction

- **Drag sideways** — changes the sun's speed (factor 0.4–2.5,
  recorded as segments; slower sun = deeper bloom per pass, never
  paused). 
- **Tap** — specimen hold: the sun freezes mid-arc (corner
  registration brackets appear around the sheet); tap again to release.
- **Double-tap** — reseeds the still life: object positions jitter to
  a new arrangement and exposure re-anchors at zero.

Visitor events are folded into the same 1 s step walk as the base
law, so the state at any moment is one deterministic derivation from
the seed plus the event list. No frame-integrated state.

## Frame one (fixed phase T0 = 150 s)

The synchronous first frame is drawn at exactly T0 = 150 s (the clock
starts with the rAF loop; a boot flag keeps frame one at T0 to the
millisecond — with continuous exposure values, an unquantized
`Date.now()` first frame would not byte-match). The sun is outbound
at p = 0.625, unit position (0.645, 0.317), hanging over the grape
cluster. Per-object bloom at T0, computed from the shipped model:

| object | bloom at T0 |
|---|---|
| lemon | 0.65 avg — wedges 0.71, core 0.75, **rind 0.00** (opaque; blooms last, reaching 0.58 by t = 480) |
| grapes | 0.29 avg — sun-side grapes to 0.78, lower grapes and the woody stem still grey |
| leaves | 0.50 avg (0.15–0.83) |
| beans | 0.04 avg — the sun has not crossed them yet; first segments at 0.37 |
| seed pod | 0.03 avg — slowest object; chambers just starting (0.20) |

By t = 480 the print is complete: every part ≥ 0.58, mean bloom
0.96. Patience is the piece — at frame one most of the sheet is still
silver-grey, and the lemon's galaxy of orange and acid green is only
two-thirds developed.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on
both visualViewport and window; canvas CSS size pinned in draw();
phone detection via `window.screen` (min dimension < 700) with the
`h > w·1.15` aspect fallback; the still life keeps its square shape
on phones and the page ground is the paper's own color. Seeded
integer hashes only — no `Math.random`, no gradients, no
`ctx.filter`, no shadowBlur, no `createElement`, no ImageData or
offscreen canvas, no audio or microphone APIs. Silent. No visible
text beyond the `<title>`.

## QA

Rendered with the house renderer (node-canvas): qa-desktop.png
1280×800, qa-mobile.png 390×844, thumb.png 720×720 rendered twice and
byte-compared — **identical** (`cmp` clean). The exposure figures
above were produced by running the piece's own `bloomOf` through a
probe harness, not a reimplementation. index.html md5
452af7150d57531043113ab44a680dc5.
