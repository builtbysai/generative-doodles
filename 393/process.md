# №1157 — Hyperobject Acts

Antonio Roberts study block AR6, after *Hyperobject* (2022, with Samiir
Saunders) — a four-part narrative epic of climate grief, "from denial and
despair into acceptance and finally a place of defiant hope." No spoken
word here, no text anywhere: the four states are carried by structure
alone, as four glitch regimes over one persistent field.

## Composition

A dark field of 96 horizontal scanline rows on `#070707`, staged 16:9 and
centered on wide canvases, full-bleed on phones. Each row carries a set of
seeded flat runs (band structure, never dot noise), and a dim scanline
texture (`#141414`) runs under everything, drifting slowly downward at a
constant rate keyed to loop time — so the field itself never resets, even
when the regime on top of it cuts.

## The four acts

The loop is 20 seconds; each act is exactly 5. `act = floor(loopT / 5)`
selects the regime and no parameter ever blends across a boundary — the
transitions are hard cuts by construction.

- **Act 1 — Denial.** The runs sit at rest in three barely-there grays
  (up to `#2A2A2A`). Sixteen seeded micro-tear events fire across the act:
  one row at a time slips 2–6 px and slips back. Almost clean.
- **Act 2 — Despair.** Full databend. Every row's tear offset is a seeded
  hash of (act, row, step) with the step advancing every 0.2 s, up to
  ±55 % of the field width, and each run is drawn twice — `#FF2E88`
  shifted one way, `#00F0FF` the other — with a dark core on some rows.
  Twenty-six seeded flat burst rects flash inside the chaos.
- **Act 3 — Acceptance.** The tears regularize: every row's offset is one
  sine, `A·sin(row·2π/14 + actTime·speed)`, so the whole field bends in a
  slow, even wave. Brightness breathes in four hard steps of green up to
  `#7CFF00`, phased per row — rhythmic, almost musical.
- **Act 4 — Defiant Hope.** The runs lock into a lattice: flat `#FFD800`
  dashes whose offset grows linearly with row index, forming rising
  diagonals that march right at a constant speed. Then the loop cuts
  hard back to Denial.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 12.4 s — inside
  Act 3, the most legible act at a glance: green rhythmic bands bending
  in a regular wave over the near-black field. The rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load.
- Every value is a closed-form function of (act, row, actTime) from
  seeded tables: per-row run layouts (mulberry32 per row), the denial
  event list, the burst table, and an integer hash for the despair
  steps. No accumulated state, no `Math.random`.
- Canvas size comes from the Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; `canvas.style.width/height`
  are pinned in px on every draw. Phone detection via `window.screen`
  physical size (min dimension < 700 px) with the `h > w·1.15` aspect
  fallback; phones take the field full-bleed.
- Watch-only — no pointer handlers, no interaction of any kind. Silent
  by design: no audio at all. No gradients, no `ctx.filter`, no
  shadowBlur, no offscreen canvas, no ImageData, no `createElement`,
  no microphone. The only text in the piece is the `<title>`.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); desktop (1280×800) and mobile (390×844) renders read by
  eye. Throwaway phase probes (deleted after) confirmed Act 1's
  near-clean gray field, Act 2's pink/cyan chaos with burst blocks,
  Act 4's rising diagonal lattice, and a hard regime change across the
  Act 2 → Act 3 boundary (renders at loopT 9.98 and 10.02 differ
  completely, no blend frame).
