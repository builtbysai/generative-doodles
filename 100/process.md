# №105 · Black Sand Drift - process notes

## Concept
A dark biome on black sand: blobby segmented creatures built
from a domain-warped noise field, crawling almost
imperceptibly as the warp vectors drift on a 20s cycle (after
mulf; the prompt sits in the made.up.lifeforms section of the
queue and is headed "after mulf", so both names are recorded
here as given). A vertical bias gathers the creature mass into
the lower two thirds with no horizon line, and fine grain
shimmers over everything. No literal animals, no eyes.

## Construction
- Single self-contained page, canvas 2D, no libraries. Software
  shader route: field sampled on a reduced grid, FIELD_CELL
  7px (9px on phones), drawn full-frame. No WebGL.
- The field is the prompt's published formula, credited in the
  code as given: n1 = noise(V + P1); n2 = noise(V*n1*n1m + P2);
  n = noise(V*nm + P3*vec2(n1,n2)), with seeded constants
  nm = 1.35 and n1m = 1.20. A small detail term breaks the
  field's plateaus into ridges. Threshold bands map n into
  sand, hide, rust and bone; bone is a narrow ridge band only,
  and the highest cores fall back to hide.
- Grain is an integer hash per cell, time-bucketed so it
  shimmers, added after the banding.
- QA iterations: an early pass let bone flood the lower frame
  as one flat slab and the grain hash read as a woven pattern;
  the band thresholds were rebuilt around the ridge profile
  and the grain moved to a decorrelated integer hash.
- Drag shifts the warp centre toward the finger and the
  creatures lean with it; release eases back. Visual Viewport
  sizing; canvas pinned by style; full-bleed on phones.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `105/index.html`, `105/thumb.png` (720x720, rendered from the live script), `105/process.md`. Gallery entry belongs in pieces.json with the formula date.
