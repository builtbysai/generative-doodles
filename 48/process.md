# №49 · Generation 65 - process notes

## Concept
Six small blob creatures on near-black (after darien.brito;
prompt 14 in Bug's ig-artist-study queue, after his Genuary 2026
day 29 piece). Each has a tiny genome: three limb phase offsets,
a pulse rate, a body squish. They twitch, pulse and hop-crawl.
Every 10 seconds a generation ends: fitness is distance crawled,
the champion turns flat amber #e8a33d and reproduces with
mutation, the rest re-seed. Bodies flat bone #e8e4d8 on #0b0b0e.
No faces, no eyes, no counter.

## Construction
- Single self-contained page, canvas 2D, no libraries. Bodies are
  deformed ellipses (radius modulated by phase), limbs are short
  tapered strokes rooted inside the body, crawling happens on
  limb-phase zero crossings. Creature centers never overlap
  (soft separation). Generation seeding is deterministic from
  the doodle seed plus the generation index.
- Drag pushes a soft impulse through the cluster. Full-bleed on
  phones via the screen-size check; Visual Viewport sizing;
  canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. First pass had detached limb stubs
  and undersized phone creatures; limbs now root inside the body
  and phone bodies size from the viewport height. Hans's
  real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `49/index.html`, `49/thumb.png` (720x720, rendered from the live script), `49/process.md`. Gallery entry added to pieces.json with the formula date.
