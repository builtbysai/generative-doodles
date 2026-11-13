# №1755 "Played at the Slowest Speed" - PP1002 / MF4 (marcus-fischer, EXPANSION #230)

Built 2026-11-13 from BATCH-1752-1756-SPEC.md, following the №1755 section verbatim.
Template: live №1751 Beat Box (/tmp/t1751.html), structure, sizing, plates and
guard patterns mirrored. Canvas 2D only.

## The piece

- Ground: near-black `#0C0A08`, full-bleed at every size.
- Fast motif pinned near the top (y = 0.14 of height) on the centre axis:
  a small pale tape-oxide white (`#EDE6D6`) burst, eight radial ticks around a
  bright core with two short horizontal bars, plus a soft radial glow.
  Its brightness flickers as a closed-form product of two sines
  (7.3 Hz and 2.9 Hz), so the flicker is a pure function of piece time.
- Slow ribbon: 14 deep-amber marks on the same vertical axis, from
  y = 0.24 of height down to about 0.82. Stretch factor 16: ribbon time is
  piece time / 16. Base gaps widen geometrically (0.018 of height, x1.16 per
  step), each mark also eases downward with its own seeded time constant
  (2.2-4.0 slow-seconds) and drift depth (0.02-0.06 of height), so leading
  marks decelerate first and the gaps widen as the ribbon falls. Marks
  stretch wider as they fall (width 10 to 107 units scaled) and fade toward
  the bottom (alpha from ~0.85 to ~0.06), upper marks in light amber
  `#D99A45`, mid in deep amber `#B97A2E`, lowest in `#7A4E1C`. A faint
  hairline axis (amber, alpha 0.10) joins motif to ribbon.
- Wide empty margins on both sides; single vertical column.
- Watch-only: no pointer handlers, no click-to-reload. Hint plate reads
  "Watch only."
- Title plate: "Played at the Slowest Speed", date "2006 · 11 · 01".
  Dark plate `#171310` with amber rule and pale title ink, matched to the
  near-black ground per the house rule for dark pieces.

## Frame one (fixed phase)

- FRAME_T = 60.0 s, the same fixed phase as the template. At frame one the
  motif is flickering at the top and the ribbon is already partway down the
  column (oldest mark drifted to about 0.71 of its asymptotic travel).
- Slow time at frame one is 60 / 16 = 3.75 s; the ribbon's drift is
  asymptotic (1 - exp(-s/tau)), so the descent never arrives within a
  minute or at any later time.
- Seeded RNG only (mulberry32(1755)); no Date.now() or Math.random()
  anywhere. All motion is a closed-form function of piece time.

## Deviations from the prompt

- None material. The motif is rendered as a radial tick burst with a
  horizontal blip rather than a literal tape-oscillator glyph; the prompt
  does not prescribe a motif shape. The ribbon's widening spacing is
  realised both geometrically (gaps widen with depth) and dynamically
  (per-mark drift time constants widen gaps as the ribbon falls).

## QA

- `node ~/workspace/tools/render-piece.js index.html` at 1280x900 desktop,
  390x844 mobile, 720x720 thumb. All three renders read and inspected.
- Desktop (1280x900): title/date plates legible top-left, "Watch only."
  bottom-left; bright motif starburst clear at top centre with glow;
  amber ribbon descends the centre axis with visibly widening gaps and
  fades toward the bottom; wide empty margins both sides; nothing clipped,
  plates do not cover the composition.
- Mobile (390x844): same composition, column centred, title plate fits
  (font shrinks per template rule), motif and ribbon legible, plates clear.
- Thumb (720x720): same composition, all elements legible at small size.
  thumb.png IS the 720x720 render.
- Determinism: two desktop renders byte-identical
  (md5 690249e877487ed48048dd343a23dce1 both times).
- No fixes needed after first render; no post-gate edits.

## Files

- index.html - 9,464 bytes
- thumb.png - 20,192 bytes (720x720)
- md5 index.html: fae708f9e2bd683995ea8e4c675fff5a
- md5 thumb.png: 3235ea6ef8aa27a3660ba4a3b07255e5

Not pushed; pieces.json and TASKS.md untouched per task brief.
