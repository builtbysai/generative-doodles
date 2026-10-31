# No.811 "Codax"

EXPANSION #99 jacob-kassay, block 4 "Codax" (prompt verified verbatim from TASKS.md).

## Concept

The henry codax device: one painting, a fictitious author. A single square
panel of one saturated flat color hangs on a white ground. The color never
changes. What changes, under the visitor's dragging hand, is whose hand made
it: at one end of the drag the surface is enamel-smooth, nearly clean; at the
other it is cloudy and oxidized, mottle blooming across the field and
amber-brown stain creeping in from the edges. The painting is the same; the
author is not. The only words anywhere are the ones the prompt itself puts
on the canvas: the small signature "h. codax" at the bottom-right, one name
either way. No mention of the real artists, no bio, no explanation of the
device appears in the piece.

This painting is the violet one. The prompt lists five codax colors (violet,
acid orange, lemon, teal, magenta) with one color per painting; violet is
first in its list, so this panel is #7B4FD6 on the specced ground #F5F5F5.

## Construction

- Field: a flat fill of #7B4FD6, clipped to the panel square. No gradients
  anywhere (house rule and prompt rule agree); every soft form is built
  from overlapping flat-alpha discs.
- Hand parameter: a single value 0..1. Pointer drags record samples
  {t, hand} in an event list; the hand at any time is a closed-form
  function of that list (last sample at or before t), so a released drag
  leaves the hand exactly where it stopped. A scrub of ~70% of the panel
  width spans the full range from the grab point's hand value.
- Hand A (enamel-smooth, hand = 0): the flat color plus the faintest life:
  260 seeded micro-specks in light/dark mixes of the violet at alpha
  0.02-0.055, so the enamel reads as a made surface without any visible
  incident. Frame one is this state.
- Hand B (cloudy oxidized): two seeded layers whose alphas scale linearly
  with the hand parameter.
  - Cloud mottle: 46 patches, each a rosette of 4-7 flat discs in mixes of
    the violet toward white (0.20, 0.38) and toward black (0.28, 0.45),
    same hue family only, per-disc alpha 0.05-0.15 at full hand.
  - Edge oxidation: 64 stain rosettes hugging the panel edges, denser at
    top, bottom and left (the study's creep pattern), sparse at right.
    The stain colors are borrowed at low presence from the study's
    tarnish family, #8A5A2A deepening to #4A2E12 (the same oxidation
    palette as the Kassay silver pieces in this expansion).
  All surface data is generated once from a mulberry32 stream (seed
  811004) in panel-normalized coordinates, so the identical surface
  survives resizes and the frame is a pure function of the recorded
  drag history: deterministic by construction.
- Signature: "h. codax" set small (3% of panel side) in an italic cursive
  stack, ink = the violet darkened toward black, alpha 0.88, drawn over
  the surface at bottom-right inside the panel. Prompt-sanctioned text;
  it is the piece's only text besides the <title>.
- Panel presentation: square sized at 0.78 of the frame's smaller
  dimension (0.84 on phones), centered, with a three-step flat float
  shadow and a hairline edge, ground #F5F5F5 throughout, page ground the
  same tone.

House rules honored: Visual Viewport sizing with resize listeners on both
visualViewport and window; canvas style pinned in px inside draw();
phone detection via window.screen physical size (min dimension < 700px)
with aspect fallback; first frame drawn synchronously at hand 0; rAF
typeof-guarded (the QA renderer has none); no Date.now() in any drawn
state; no gradients, shadowBlur, ctx.filter, or offscreen canvas.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice: byte-identical (cmp clean).
- Read-backs: flat violet square on white, signature small and legible
  at bottom-right, surface nearly clean at hand 0; mobile keeps the
  whole panel with nothing clipped.
- Throwaway render at hand 1 (temporarily patched copy): the same
  violet field turned cloudy, mottle patches across it and amber-brown
  oxidation at the edges; color unchanged. Throwaway deleted.

## Deviations

None from the prompt's substance. Choices recorded: violet as this
painting's one color (see Concept); the tarnish-family borrow for the
edge oxidation (see Construction), at low presence and only under
Hand B; the signature rendered in a cursive stack at 3% of panel side
to read as a quiet hand rather than a typeset label.
