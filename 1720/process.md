# №1720 - Five Milliseconds of Wind

## Driver

A fixed 5ms slice of pink-noise audio is the wind field; streamlines integrated through it mass where the slice is dense and part where it is calm; tap deals a new slice and the field re-plots.

## Prompt

zach-bodtorf PP967 / ZB1, EXPANSION #226. Title: Five Milliseconds of Wind. Visual: hundreds of overlapping translucent white streamlines massing and parting on dark green-black, each line integrated from one 5ms slice of an audio buffer fed to the plotter as if it were wind data; the whole mass slowly re-plots as the slice advances. Palette: ivory/white lines at low alpha on near-black green, faint green tint in the densest knots. Composition: edge-to-edge field, densest mass center-right, calm voids top-left where lines run straight. Motion/interaction: tap takes a new 5ms slice and the field re-plots around it; tap-as-new-slice earns the interaction because the system IS a slice-and-plot engine, never a page reload. Technical approach: p5.js, flow field sampled from a sliced audio buffer (pink-noise stand-in acceptable), 800-1200 streamlines integrated over 200-400 steps each, drawn at alpha 6-10. What to avoid: sine-wave wiggle pretending to be data; a visible waveform UI; uniform line density. Study: studies/zach-bodtorf.md (core engine, f00).

## Acceptance criteria (numbers)

- Streamlines: 950 (prompt range 800-1200), seeded by rejection sampling against a density field that peaks at the center-right mass (0.68, 0.55) and dips in the calm top-left void (0.12, 0.14).
- Integration: up to 260 steps per streamline (prompt range 200-400), step length = stage / 360, Euler integration through the slice-driven angle field; lines shorter than 20 steps are discarded and re-seeded.
- Alpha: ivory lines at 10/255, green-tinted dense-zone lines at 10/255 (prompt range 6-10); line width 1.25.
- Slice: 240 samples (5ms at 48kHz) of Kellet-filtered pink noise, 5-tap smoothed and normalized to [-1, 1]; the wind angle at any point reads the slice sample indexed by its horizontal position, so the field is data, not a sine-wave stand-in, and there is no waveform UI.
- Re-plot: on tap the whole field re-plots progressively over 2.5s (all lines grow together from their seeds); the slice also auto-advances by 7 samples every 8s and re-plots, so the mass slowly re-plots as the slice advances.
- Tap: pointerdown deals a new slice (seed 1720 + tapCount * 7919) and re-plots; never a page reload.
- Frame one: fixed phase t = 3.0s of a 24s period, full field plotted synchronously at load; seeded PRNG mulberry32(1720); no Math.random or wall clock in frame one.
- Flicker safety: no strobing above 14 Hz by construction; the only motion is the 2.5s progressive re-plot and the 8s slice advance. No audio, no autoplay.
- Plates: title "Five Milliseconds of Wind", date "2006 · 09 · 27", hint "Tap for a new slice." No em dashes in visible copy.

## Palette (hexes hand-picked from the prompt's named colors)

- Ground (near-black green): #0A120C
- Ivory lines: #F2EFE6
- Green-tinted dense lines: #BFE3C8
- Knot wash (faint green tint in densest knots): rgba(110,190,130,0.10) and rgba(110,190,130,0.06)
- Title plate: #0E1A12, border rgba(242,239,230,0.35), title ink #F2EFE6, date/hint ink #9FD0A8

## Frame-one phase

t = 3.0s of a 24s period; slice seed 1720, slice offset 0, re-plot progress 1 (full field).

## Interaction

Tap anywhere: new 5ms slice, field re-plots over 2.5s. Reduced-motion: tap re-plots instantly, no auto-advance. Resize (visualViewport and window): field rebuilds from the same slice seed at the new stage size.

## Deviations from the prompt

- 2D canvas instead of p5.js: node-canvas QA has no p5/WebGL, so the piece is self-contained canvas 2D; the flow-field integration and slice model are unchanged.
- Pink-noise stand-in for the audio buffer, as the prompt allows.
- Hexes hand-picked: studies/zach-bodtorf.md does not exist in the repo, so there was no study file to draw colors from; hexes were chosen from the prompt's named colors (ivory/white on near-black green, faint green tint).
- No other deviations. No sine-wave wiggle as data (the sine term is only a small modulator on top of the slice-driven angle), no waveform UI, density is non-uniform by construction.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually. First pass was too faint (alpha 8, width 1); raised to alpha 10 and width 1.25 and re-rendered. Final renders: dense green-tinted mass center-right with a clear parting, straight calm lines top-left, plates legible and not colliding at all three sizes. thumb.png is the 720x720 render output.
