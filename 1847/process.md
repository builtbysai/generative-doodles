# Subharchord, №1847 (PS8, PP1094, completing #241 phillip-sollmann)

Driver: a turquoise Subharchord control panel seen straight on, edge to edge, like the instrument is looking at you, and the viewer plays it by flipping its eight German-labelled toggle switches.

## Build

- Single self-contained index.html, inline CSS/JS, no external assets. Scaffolded from №1846 (Four Hours) for page structure and house-rule code.
- Panel: turquoise enamel (#1B7F7E) full-bleed on every screen, dark glass band across the top holding the ghost reflection, eight toggle switches below, three filter sliders at the bottom.
- Counts asserted: 8 switches, all 8 labels present in the SWITCHES array (OBOE, FRANZ-KRUMMHORN, FAGOTT, TROMP, POSAUNE, KLARON, SAX, KORNETT), 3 sliders (TIEFE, MITTE, HÖHE). Fixed first frame has 3 switches on (OBOE, FAGOTT, POSAUNE) with amber lamps lit; the other 5 are off.
- Interaction: pointerdown flips the switch under the finger, pointer drag across switches flips each one crossed once; sliders drag to set filter cutoffs; a Sound plate toggles mute. No click-to-reload anywhere.
- Audio: lazy WebAudio built only inside the first gesture. Each on-switch runs a subharmonic divide-down stack (oscillators at f, f/2, f/4 through a per-group lowpass filter); the three sliders set the lowpass cutoffs for switch groups 0-2, 3-5, 6-7. Each flip plays a short click transient and the bat snaps with an eased animation toward its new angle.
- Reflection: five seeded soft pale blobs in the glass band, a vague head-and-shoulders smudge with no eyes, mouth, or features, plus a faint diagonal glare streak.
- Determinism: frame one uses fixed phase t = 60.0 s and a seeded RNG (mulberry32, seed 1847) for the ghost blobs; no wall clock, Date.now, or unseeded random in frame one. requestAnimationFrame guarded with a typeof check. Re-rendered thumb.png twice: identical md5.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700px) with aspect fallback h > w*1.15; field-like panel full-bleed on phones (single column of 8 switches, stacked sliders) and 2x4 grid with sliders in a row on desktop. Title/date/hint plates drawn on canvas, legible and unclipped at all three sizes. No em dashes in visible copy.
- Hexes hand-picked from the prompt's named colors (studies/phillip-sollmann.md does not exist in the repo): turquoise enamel #1B7F7E, cream labels #F2EAD8, black toggle bats #141414, dark glass #0F4A4C, amber lamps #F5B942.

## Deviations from the prompt

- Slider labels: the prompt calls for "frequency filter sliders" without naming them, so they are labelled TIEFE, MITTE, HÖHE (low, mid, high) in keeping with the panel's untranslated German. No English text appears on the panel.
- The ghost reflection is rendered as a very faint smudge, barely brighter than the glass, to keep it indistinct per the no-faces guard.

## QA

- Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three PNGs visually inspected.
- First pass found the hint and sound plates overlapping the slider tracks; fixed by reserving the bottom plate band in layout() and re-rendered. Second pass clean at all three sizes: all 8 labels legible, on/off bats and lamps read correctly, sliders clear of plates, ghost faint in the glass, plates unclipped.
- thumb.png is a deterministic re-render of frame one (md5 a1f9297944c8401d854261994ae5658d, identical on repeat render).

## Gallery

- Date: 2007 · 02 · 01 (formula: 2002-01-10 + 1848 days).
- Interaction cue: "Tap a switch to flip it."
