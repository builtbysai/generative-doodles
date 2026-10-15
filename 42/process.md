# №42 · Katalog 217D - process notes

## Concept
Fourteen concentric tracks on black, driven by a 14-character
binary string generated from the piece seed (after mathiaskrissmer;
prompt 7). The string is regenerated until at least 4 characters
are I. Each I track carries one luminous arc of seeded length
(40 to 160 degrees) at a seeded phase; 0 tracks stay dark. Exactly
one I track is the accent, flat acid cyan #00e5ff with no glow
passes. Track speeds rise with radius in integer cycles per
30 second loop, so the loop closes; a small radius wobble runs an
integer 3 cycles per loop. The binary string is set small under
the field as the piece's caption, per the prompt's technical note;
the gallery keeps the suggested title.

## Construction
- Single self-contained page, canvas 2D, no libraries, mulberry32
  seeded generation. Drag scrubs the rotation phase; release holds
  4 idle seconds, then resumes.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short. (No.42's caption is the
  generated binary string the prompt specifies.)
- Files: `42/index.html`, `42/thumb.png` (720x720, rendered from the live script), `42/process.md`. Gallery entry added to pieces.json with the formula date.
