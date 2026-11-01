# №1236 — Wandering Through Secret Storms

Christina Battle study block CB5 (PP395), after her 2009 work built from FBI
archival records "almost entirely blacked out, rendering the documents
incomprehensible," and from women filing records. Redaction as composition:
the black bars are the image.

## The triptych

Three vertical panels with hairline gaps, held at every viewport size
(phones get three narrower columns, never a stack).

**Left — the document.** A weather-service report on archive paper
(#E4DCC8), headed only "FIELD REPORT 87-114" / "COUNTY STATION / JUL 31" —
archive chrome, no prose. Fourteen body lines of fake text (gray word-bars)
sit almost entirely under black redaction bars. A few words survive as real
text in ink #33302A, drawn from the fragment pool: *funnel, 11:47,
not confirmed, hail, county road, unconfirmed, pressure, debris,
17 minutes, shelter*. Survivors are always fragments — a full sentence can
never appear. The redaction bars breathe (width ±2 px) and jitter ±1 px on
the 6 fps step clock, each with a slight fixed rotation. One survivor —
slot 0 — carries a thin red pencil underline (#B04A3A).

**Center — the archive aisle.** Two steel cabinet banks (#8E969E, 3×6
drawers each) flank a converging aisle with a far-end cabinet, a cart with
paper stacks, and two women filing (flat dress silhouettes, paper heads,
hair caps). One drawer is always mid-cycle: a hashed schedule gives each
3-second block one drawer, which slides open in steps (cavity, file tops,
offset front), holds, and closes. The woman on the side of the open drawer
raises her arm to it — a two-pose step, never a tween. One drawer label
reads "STORMS", underlined in red pencil; the label type shrinks to fit
narrow drawers so it never spills.

**Right — the storm.** A satellite storm on teal #3E6E7A: flat concentric
bands and arc arms around a pale eye, latitude ticks at the edge. Five
horizontal black bars slide over it on a 40-second cycle (stepped triangle
phase per bar). Beneath three of the bars sit handwriting fragments —
*wind rising*, *glass everywhere*, *the dog knew first* (plus two more in
the reseed pool) — in faint italic serif, the first underlined in red
pencil. At frame one the slide leaves "the dog knew first" half-peeking
from under its bar: half-obscured is the resting state of this panel.

## Bar / slip model

- **Step clock.** Every animation reads `stepT(t) = floor(t*6)/6`. Nothing
  moves smoothly; bars, drawers, breathing and jitter all land on 6 fps
  steps.
- **Slide.** Bar *i* rides a stepped triangle wave over the 40 s cycle,
  phase-offset per bar, amplitude ~5.5% of panel height.
- **Slips.** Slip *k* starts at `6 + 13k + 4·hash(k)` seconds and lasts
  2 s; it targets bars 0, 2, 4 in rotation. During a slip the bar jumps
  horizontally aside in three steps, holds, and steps back — revealing the
  handwriting underneath. By construction no slip is active at t = 13 s
  (the first ends before 12 s, the next starts at 19 s or later).
- **Drag.** Horizontal drag accumulates a session offset: the document's
  redaction bars shift sideways (the visitor redacts and un-redacts,
  possibly covering a survivor), and the storm bars shift vertically by
  0.4× the drag. The offset persists on release.
- **Double-tap** increments the seed salt, re-permuting which pool words
  survive in the six slots and which fragments sit under the storm bars.
  Salt 0 is the identity permutation — that is the frame-one layout.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase **T0 = 13 s**: left
  panel shows "funnel" (underlined) and "11:47" surviving; center has one
  drawer fully open (block 4, phase 1 s) with the left woman's arm raised;
  right panel bars are mid-slide with no slip active. The rAF loop is
  `typeof`-guarded and anchored at T0 + elapsed.
- Canvas is sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; CSS size is pinned in `draw()`;
  phone detection via `window.screen` (min dimension < 700) with the
  aspect fallback in the layout path.
- All randomness is the seeded integer hash `ih(a,b)` — no `Math.random`.
- Silent. No gradients, no `ctx.filter`, no shadowBlur, no
  `document.createElement`, no ImageData or offscreen canvas, no
  microphone. Palette strictly from the prompt: archive paper #E4DCC8,
  redaction black #0C0C0C, surviving ink #33302A, storm teal #3E6E7A,
  drawer steel #8E969E, pencil red #B04A3A (plus tonal shades of the steel
  and teal for cabinet shading and storm bands).
- QA: rendered with the house node-canvas renderer at 1280×800, 390×844
  and 720×720; the 720×720 thumb rendered twice is byte-identical.
