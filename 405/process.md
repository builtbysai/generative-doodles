# №1275 "Kala Pani" (suchitra-mattai SM4, PP434)

## Prompt
Square panel of aged paper: an antique colonial engraving recreated in
crosshatch lines and ornamental borders, faded ink on tea-stained ground.
Over it, embroidery: floral vines and a female face stitched in floss, the
thread curves partially obscuring the print beneath, denser where the
print's colonial architecture sits. Grounded in Mattai's kala pani (black
water) (2023) and her decade-long practice of interpreting 19th-century
colonial prints through embroidery: her "brown reclamation."

Palette (verbatim): aged paper #E5D6B0; engraving ink #4A3B2A; floss
marigold #E8A020; floss deep green #3F6B4F; floss crimson #A4233B;
faux-gem glints #7FC4C4; ground ink #171310.

## What was built
- Centered square panel on ground ink #171310; aged-paper panel with flat
  alpha tea-stain blotches. Double rule border, diamond motifs along the
  inner border, six-petal rosettes at the corners.
- Engraving (all original procedural work, nothing copied from real
  prints): an invented three-arch colonnade at left, an invented domed
  pavilion at right, a light hatch band across the upper panel. Shading
  is two-pass crosshatch (0.6 / -0.6 rad) clipped to each region with a
  Liang-Barsky clip.
- Embroidery: 8 floral vine curves, a closed-oval stitched face (oval
  outline, hair arc, brow, eye dash, lips) at lower-center-right over
  the pavilion, plus a dense 5-curve stitch cluster over the colonnade.
  All thread is dashes with per-dash jitter (never smooth vector lines).
  26 leaf lenses on the vines; one 6-gem faux-gem cluster at lower
  right with a slow sine shimmer.
- No visible text except `<title>` (the prompt specs no captions).

## Mechanics (all closed-form over elapsed-since-load time and recorded events)
- Sequence: engraving fades in from a faint 0.30 impression to full over
  0-2 s; embroidery stitches in progressively (reveal = 0.04 + t/12,
  full by ~11.5 s), dashes in curve order: vines, face, colonnade
  cluster. First frame (t = 0) therefore shows the faint engraving with
  the first vine dashes just beginning; that is the shipped thumb.
- Stillness dim: after 6 s without pointer activity, the engraving
  fades toward 0.35 over 2 s, leaving the thread as the lasting image.
  Any pointer activity restores it. Verified with a forced t = 20
  probe: dimmed engraving + full thread, vs the undimmed probe.
- Lift: stitches and leaves within 60 px of the pointer rise up to 4 px
  (falloff-weighted) and settle with exp(-dt/0.8) decay. Verified with
  a forced probe (pointer injected at the face, t = 19.9): the face
  dashes render lifted above the print.
- Never click-to-reload; silent; no audio or mic APIs anywhere.

## House adaptations
- None needed beyond the standard rules. The engraving is invented
  architecture and ornament, not a copy of any real colonial print.
- Determinism: first frame is a constant phase (t = 0 state); the
  rAF loop is anchored as offset + elapsed-since-load; all randomness
  is a seeded integer hash (no Math.random in code; the single grep
  hit is a comment). requestAnimationFrame appears only behind a
  typeof guard, with one synchronous frame drawn at load.
- Phone: square panel kept whole, page ground in the piece's own
  background color; verified at 390 wide.
- node-canvas limits respected: no gradients, filters, shadowBlur,
  offscreen canvas, or element creation; dots/gems are single-path
  shapes (paired arcs avoided in batches; each ellipse/arc gets its
  own beginPath).

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  desktop, 390x844 mobile, 720x720 thumb; all three inspected.
- Thumb rendered twice at 720x720, `cmp` byte-identical, re-verified
  after the final edit.
- Fix rounds: (1) bez() curves came back empty because the segment
  count argument was omitted; defaulted to 40. (2) hatchRect took
  panel units but treated them as pixels, leaking a dense hatch blob
  to the canvas corner; converted to pixels and added a real
  Liang-Barsky clip after the midpoint-only test still let lines fan
  across the panel. (3) First face design did not read as a face;
  rebuilt as a closed oval with hair arc, brow, eye dash, and lips.

## Files
- index.html (md5 4ba777347cd262964802d5135f308e5e)
- process.md (this file)
- thumb.png (720x720, byte-identical on re-render)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)

## Gate fix (determinism, №343 rule)
The first build drew its synchronous first frame from `draw(now())`, with
`now()` derived from `performance.now()`. In node-canvas that advances in real
milliseconds between script load and first draw, so two 720x720 renders differed
in 87 pixels (the faux-gem glint cluster, lower right). Fix: the initial draw
is now `draw(0)` with a boot-flag comment, so frame one is pinned to exactly
t = 0; the clock starts with the rAF loop, which still uses `draw(now())`.
Verified: three consecutive 720x720 renders byte-identical, thumb.png re-rendered
from the fixed file and matching, desktop/mobile frame-one reads unchanged.
No visual, palette, mechanic, or text change.
