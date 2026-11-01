# №1166 — How They Watch

Nick Briz study block NB7, after *howthey.watch/you* (2021) — the site
that fingerprints its own reader in order to teach fingerprinting. The
surveillance apparatus turned back on the viewer, as a portrait.

## What it does

At load, the page collects nine standard fingerprint signals about the
machine reading it — canvas hash, browser tokens, screen size,
timezone, color depth, installed-font count, pixel ratio, language,
CPU threads — and renders them as an evidence grid: yellow label, red
bar, paper-white monospace value, one row per signal. Each bar's length
is a stable FNV-1a hash of the row's own value mapped to 0.15–1.0, so
the shape of the portrait is derived from the viewer's own data, not
decorated onto it. A one-line header explains the premise; the footer
carries the study's required line verbatim: "everything on this page
stayed in your browser."

Rows assemble top to bottom over ~6 seconds: row *k* starts at
*k* × 0.6s and builds in three hard steps (bar in thirds, label and
value at stepped alphas) — stepped, never smoothly tweened.

## The hard requirement

Nothing is transmitted anywhere. The shipped file contains no network
API of any kind and no external reference of any kind; this was
verified by grep against the final file (zero hits for the network
transports, zero external refs). Every signal is computed locally:
the canvas hash draws a small test pattern on the piece's own visible
context, reads it back, hashes it, and the first real frame paints
over it (a refused pixel read falls back to hashing the UA + screen
string). The font count probes 41 common family names by comparing
`measureText` widths against the three generic baselines. Every API
read is guarded — a missing signal reports "unavailable" rather than
throwing.

## Two views, one dataset

Drag horizontally and the grid rotates into a radial "radar" portrait:
the same nine bars become spokes (labels riding beside each bar's
midpoint, values at the rim, guide rings fading in with the mix). The
mix follows the drag and stays where it is released. Tap a row in
either view to copy its value to the clipboard — best-effort, silent
when the clipboard is absent.

## The values are the viewer's

The portrait is environment-dependent by design (clock-piece family):
the layout and assembly are fixed-phase, but the values are whatever
the reading machine answers. The QA snapshot, from the headless
renderer, reads: canvas hash `9faffe08`; browser `Node.js/24`; screen
`1280 × 800` (its own frame size); timezone `UTC`; color depth
`unavailable` (the harness's screen stub does not offer it — the
honest fallback); fonts `9 of 41 probed`; pixel ratio `1`; language
`en-US`; cpu threads `4`. On a real visitor's browser every row shows
that visitor's own answers.

## Determinism and house rules

- First frame drawn synchronously at fixed phase T0 = 6.5s (assembly
  complete); the rAF loop is typeof-guarded and anchored as
  T0 + elapsed since load. No unseeded randomness anywhere — bar
  lengths are pure hash functions of the values.
- Canvas size from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height`
  pinned in px on every draw. Phone detection via `window.screen`
  physical size (min dimension < 700px) with the `h > w·1.15` aspect
  fallback; narrow screens switch to two-line rows (label + value,
  bar beneath) and header/hint/footer shrink-to-fit.
- Flat colors only: no gradients, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no created elements, no audio. Visible text is the
  piece: header, labels, values, hint, and the verbatim footer.
- QA: thumb rendered twice at 720×720 and byte-compared (`cmp`
  identical, same environment); desktop and mobile renders read by
  eye; the radial view probe-read by eye from a throwaway copy with
  the mix forced to 1 (labels moved beside the bar midpoints after the
  first probe showed them piling up in the hub).
