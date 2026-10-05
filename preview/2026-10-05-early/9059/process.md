# №9059 — One-Tenth Second

## Concept
Timing as the only material (FUTURE_PIECES.md seed 111, Watson lineage, study-informed not copied).
One ambient hand, a looping 2D ink flourish, drives four timing personalities recorded as ink
channels beneath it: mirror (12 ms), shadow (120 ms), companion (400 ms), long spring
(loose damped spring, ~1.4 s settle). Each channel is the same gesture seen through a
different response envelope: pure delay plus smoothing for the first three, a real
overshooting spring for the fourth. The viewer retunes live with three presets
("dead mirror", "quartet", "it is alive") and a companion-timing slider (0–1000 ms),
or takes the hand with a finger: drag the paper and the flourish becomes yours, all
four channels answering in their own time. Release and the ambient hand resumes.
Quick tap mints a new seeded hand. `?seed=` share links are read-only locks.

Committed palette: warm paper with graphite, indigo, umber, rust, and spruce inks,
multiply blending, hand-set serif labels, wobbly plate frame, paper grain.
Art first, instrument second. No creatures anywhere; the forms are pen gestures and
their timing records.

## Seed source
Seeded mulberry32 hand: base ellipse (the sweep) + second-harmonic loop
(the loop-de-loop) + hand-wobble ripple + 1–2 circular flourish bursts (the trill),
integer cycles per 9 s loop so the ambient hand loops seamlessly. Channels record
the hand's vertical voice through per-envelope delay lines and filters.

## Variants
- **vA (five waveform channels, no flourish):** the hand as a fifth waveform band.
  Died: honest but diagrammatic, seismograph-scribble, no art-first hero.
- **vB (flourish + channels, axial zigzag bursts):** bursts added as fast axial
  sine wiggles. Died: the trill rendered as fuzzy zigzag scribble, ugly at every seed.
- **vC (flourish + channels, circular bursts):** bursts circle the pen, so the trill
  reads as real loop-de-loops. Lived: the flourish became a signature-like gesture.
  Killed along the way: a broken wobbly-frame routine that drew an ellipse across
  the plate (replaced with four hand-drawn edges), empty record on load (added a
  9 s pre-roll), thin polite traces (added ink-bleed underpass and speed-based pooling).
- Palette: warm paper chosen and committed over phosphor-on-dark; the print voice
  matches the piece's ledger aesthetic and recent approvals.

## Default seed
**99.** Big sweeping hand with a loop flourish and a crisp trill; the mirror channel
keeps the trill sharp while the companion smooths it away, so the personality
gradient reads at a glance. Runner-ups 7 and 42 also kept well; 2024 too plain.

## QA log
- 2026-10-05, Chrome 152 headless on isolated port 9341 (per AGENTS.md/TOOLS.md).
- Desktop 1280x800 render: complete record on first paint, no overflow, wobbly
  frame correct, labels legible. Final: /tmp/9059_final_desktop.png (inspected).
- Mobile 390x844 render: no scroll or overflow, controls wrap cleanly, labels
  shrink, flourish and channels legible. /tmp/9059_mobile.png (inspected).
- cdp_exceptions.py: exit 0 desktop (1280x800, 12 s) and exit 0 mobile
  (390x844, 12 s). Zero console/page exceptions.
- Interaction: tap reseeds (99 → new seed verified), drag takes the hand
  (driving=true, target follows pointer), release crossfades back to ambient,
  "it is alive" preset retunes all channels (labels update), companion slider
  retunes live (700 ms verified). Verified via JS-dispatched PointerEvents;
  CDP Input.dispatchMouseEvent does not synthesize pointer events in this
  headless rig (rig limitation, not a page bug).
- Copy check: no em dashes in visible copy, titles, or captions. No absolute
  builtbysai.com URLs. viewport meta present. Single self-contained file, no CDN.
- Thumb: thumb.png captured from #stage via shot_thumb.py (inspected).
