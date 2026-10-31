# No.592 — Caja de Remedios

EXPANSION #71 julia-barata, prompt block 8 "Dibujado en lo Que Había".

## Concept

Julia Barata's drawn-on-whatever origin: *Gravidez* was drawn on medicine
boxes and hospital napkins, because that was what there was. "Sin perdón y
sin clemencia." The ground here is never paper and never clean: the viewer
cycles through four circumstantial supports, and on each one the same urgent
ink drawing — a pregnant self-avatar standing, a red suitcase at her feet, a
hospital window behind her — is already there, or rushes back in stroke by
stroke in about three seconds when the support changes. Speed is the point:
her hand does not do precious.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

- **Supports (procedural, precomputed as seeded shape lists, drawn directly;
  no offscreen canvas, no filters):**
  1. **Medicine box** — cardboard #C8A97E, mottled, with box seams, two tape
     strips, a framed print block of illegible grey bars (#9A968C), a dosage
     grid with X-marks ticked in, an instructions column ghosting behind the
     suitcase, a barcode ghost, creases and scuffs.
  2. **Hospital napkin** — thin #F2EDE2 with a radial crease fan (crease plus
     highlight lines), fold lines, an embossed double border, and a faint
     circular stamp ghost.
  3. **Cream tube, flattened** — white #EDEAE2 with a crimped top edge,
     lengthwise flattening folds, a ghost label frame with print bars, a
     circled mark, and the crimped cap end at the bottom.
  4. **Textbook page** — #E8E4D2 with two ghost text columns, a skeleton-ish
     diagram ghost (skull circle, spine, ribs, limbs) inside a figure frame,
     a small chart, a page-number ghost, and a dog-eared corner.
- **Drawing layer** — one seeded stroke list (mulberry32), shared by all
  four supports: hospital window with blind slats, a hanging cord, and a
  plant on the sill; the self-avatar in profile, belly drawn as one committed
  curve with her hand under it and the other arm akimbo; the suitcase as the
  single flat red #D42B1E accent; ground scuffs and speed ticks by her hand.
  At rest the drawing is complete; after a support switch it re-draws
  stroke-by-stroke over ~3 s with a slight ease.
- **Corner note** — the current support's name lettered on a pale taped
  scrap, bottom right: "caja de remedios, 2016" → "servilleta de hospital,
  2016" → "tubo de crema, 2019" → "página de manual, 2019". These are the
  works' own historical labels from the study, part of the piece's fiction.
- **Interaction** — TAP the corner note: crossfade to the next support and
  the hand redraws the drawing fast. DRAG anywhere: the support tilts a few
  degrees with a light sheen shifting across the creases, then springs back
  on release. Never click-to-reload; no clean-canvas option exists.
- **House rules** — canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas pinned in px inside
  draw() every frame; phone detection via window.screen (min dimension
  < 700 px) with aspect fallback, used only to size the corner-note type;
  support fills the frame edge-to-edge on phones too (letterboxed stage,
  page ground is the cardboard tone).

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared —
  identical. Frame one is one synchronous draw at phase 0: medicine box
  support with the drawing complete. No `Date.now()` anywhere; the rAF loop
  is typeof-guarded and anchored as PHASE0 + elapsed-since-load; all
  textures are precomputed seeded data.
- Read-backs: desktop and thumb show the cardboard ground with print ghosts
  legible as print (framed brand block, instructions column, barcode),
  dosage grid clear of the window, the figure's belly reading in profile,
  red suitcase at her feet, corner note legible on its tape scrap. Mobile:
  full scene letterboxed on the cardboard tone, nothing clipped, note
  readable.
- Fixes during QA: the belly arc originally bulged behind the torso and the
  dosage grid sat behind the window panes (read as window lattice); the
  figure was rebuilt in clear profile with the belly as a single front
  curve, the grid moved below the window, the sill plant relocated, and the
  corner note's tape changed from a full-width bar to a small centered
  strip over a faint paper scrap.

## Deviations

- The corner-note years (2016 / 2019) are kept per the prompt: they are the
  historical labels of Barata's actual drawn-on-whatever works, supplied by
  the study, not gallery dates. The gallery date in pieces.json follows the
  standard formula as usual.
- The support switch crossfades (320 ms) before the redraw, rather than a
  hard cut, so the eye registers the ground changing under the same drawing;
  the redraw itself stays fast and urgent as specced.
- No other deviations. No microphone, no audio, no undo, no clean support.
