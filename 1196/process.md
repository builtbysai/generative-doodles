# №1196 — Copy-It-Right

joncates study block JC5 (PP355), grounded in the COPY-IT-RIGHT edition
practice of the Analog Video Union: appropriation not of anyone's artwork —
the motifs are drawn originals — but of the *method*: press, bend, stamp,
file, repeat. The piece is silent; the machine is watched, never operated.

## The piece

An appropriation machine runs on a black field (#0B0B0D). At center, 40% of
the frame wide, sits a clean geometric motif in flat cream (#F5F0E6),
breathing at a 2% scale sine. The motif cycles by edition: a cactus for
editions 1–25, a skull for the next 25, a cowboy hat for the next 25, then
back to the cactus.

Every 30 seconds the machine presses the motif. Over 4 seconds the copy
databends — bend strength ramping 0 → 1 in eight hard steps — then the
machine stamps it with a red (#E8112D) edition mark,
"COPY-IT-RIGHT × N / Edition 25", tilted like a hand stamp, and holds it for
3 seconds. Then the center clears: the original is back, untouched. Only
copies corrupt; the original never changes.

Filed copies join the archive strip along the bottom 18% of the frame. Each
entry is stamped (red "× N", gray #8A8A93 "COPY-IT-RIGHT" microtext) and
scrolls right-to-left until it leaves the frame. The strip is a window, not
a vault: only the eight most recent filings are shown, and once an entry
scrolls off it is gone.

## The bend is data, not pixels

A bend is a parameter set hashed per press: 24 horizontal slice offsets, a
channel split, per-slice fray jitters and dropout flags, and four vertical
streak columns. Rendering a bent copy draws the motif three times per slice
— magenta (#FF2BD1) at −split, cyan (#00E5FF) at +split, cream on top — each
slice clipped to its band and displaced by its offset, with fray shifting
the band edges into hairline gaps. The amber (#FFB000) streak columns are
clipped to the motif silhouette itself, so they read as columns of the copy
sorted vertically. The skull's eye sockets, nose and teeth are true negative
space, punched with an even-odd fill, so the channel ghosts show through the
holes at their offsets.

Because bends are parameters, the archive needs no pixel storage: each entry
is a parameter record, redrawn fresh every frame at strip scale with its own
press's bend. (The prompt's technical sketch suggested an offscreen-canvas
archive strip; house rules replace it with these parameter-record redraws —
same archive, no offscreen canvas.)

One deviation from the prompt's scroll formula, for legibility: entries
file in already fully on-screen at the strip's right edge and then scroll
left at a width-proportional speed (clamped 6–16 px/s), instead of sliding
in from off-frame — so a just-filed edition is readable in the frame it
files, at every viewport size.

## Interaction

Dragging across the motif pre-bends it. Drag samples are recorded against
the motif box; between presses the stored field shows as a faint shimmer —
the upcoming press's bend at 15% strength, weighted by how much drag energy
landed in each slice band. When the press comes, that slice's offsets are
amplified by its band's drag energy (up to 2.2×). The field is consumed by
that press and cleared; samples are windowed per press, so every press's
bend — live or archived — stays a closed-form function of the hashes and the
recorded sample list. The visitor feeds the machine; there are no buttons
and no way to trigger a press.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; CSS size pinned in `fit()` and re-pinned
  in `draw()`.
- Phone detection via `window.screen` (min dimension < 700) with aspect
  fallback; the layout is fractional throughout, so the machine, stamp and
  strip hold at 390 wide.
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 65 s — press 2 (60–64 s) has just filed, so the bent cactus × 2 holds
  center at full bend with its stamp up, and the archive strip shows
  editions × 1 and × 2. The rAF loop (typeof-guarded) is anchored as
  T0 + elapsed-since-load.
- Seeded hashes only; no `Math.random`, no gradients, no `ctx.filter`, no
  shadowBlur, no `createElement`, no ImageData/offscreen canvas, no audio,
  no microphone. Every arc follows the house convention (lineTo lands on the
  arc's start point; moveTo before each independent circle subpath).
- Silent by design.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile)
and 720×720 (thumb). Frame one verified at all three sizes: bent cactus with
slice offsets and magenta/cyan channel splits, amber streak columns inside
the silhouette, the red COPY-IT-RIGHT × 2 / Edition 25 stamp legible, and
both filed copies (× 1, × 2) in the archive strip. Off-phase test renders
(T0 variants in /tmp, discarded) verified the clean phase, the skull cycle
(even-odd sockets, edition counter restarting at × 1, archive carrying
× 24 / × 25 of the previous motif) and the cowboy-hat cycle. The thumb was
rendered twice and byte-compared with `cmp` — identical; the duplicate was
deleted.
