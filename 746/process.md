# №9057 · Folded Light - process notes

## Concept
FUTURE_PIECES.md seed 28: the arrangement fold as the piece. One palette,
three panels — as rolled / dark heart / light heart. Same colors, three
different moods. Order is a compositional parameter. Static triptych; click
refolds (new seeded palette + shuffle). ?seed= shareable.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32(seed);
  default seed 777001 (chosen after comparing 3 seeds; see below).
- Palette: 6 colors, analogous hue family (spread 24-60 deg), L 0.32-0.84,
  C 0.06-0.17 in OKLCH (native oklch() fillStyle). Hot brights tamed: C
  capped at 0.09 when L > 0.68 — no neon bands.
- Orders: as-rolled (seeded shuffle); dark heart (darkest central,
  symmetric falloff); light heart (lightest central).
- Each panel: 320 horizontal strips, per-strip OKLCH interpolation with
  hue wraparound and smoothstepped joints — perceptually smooth stacks.
- Hairline dividers, whisper of monochrome grain, small caps labels per
  panel, one-line hint. No other chrome.

## Iteration
- v1: neon cyan band at the stack foot (high-L high-C accent), labels
  colliding with the hint. Fixed with the bright-chroma cap and label lift.
- Seed comparison (the piece lives or dies by its default palette):
  9057 (amber/brown + stray teal foot, the teal read accidental), 4242
  (teal monochrome — too little lightness range, the three moods blurred
  together), 777001 (copper/rust/rose — deep red-brown dark heart vs
  glowing light heart, moods unmistakable). Shipped 777001.

## Differentiation
Checked against the ledger's used/retired/paused families. No triptych or
palette-reordering piece exists. Concept family: "folded palette triptych:
one palette, three orderings, order as composition."

## QA log
- cdp_exceptions.py: zero console/page errors at 1280x800.
- Rendered headless via ~/workspace/tools; looked at actual pixels for 3
  seeds before choosing the default.
- Responsive: full-viewport canvas + resize handler; three columns hold at
  390px portrait (slim but legible).
- thumb.png: 720x720 center-crop from the live render.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
