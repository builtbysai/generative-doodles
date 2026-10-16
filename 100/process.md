# №100 · Oscillator Drift - process notes

## Concept
After mattiazucchelli_'s sound-synthesis thinking. Three sine oscillators drawn as horizontal waveforms stacked in bands, their sum drawn as a fourth, bolder line below. The oscillators modulate each other slowly, so the waveforms breathe and tangle over a 30 second cycle, then return. A patch diagram that plays itself, with no labels and no knobs.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 4 horizontal bands (asserted by construction): 3 thin oscillator lines plus 1 sum line at exactly twice the line weight, filling the frame with generous kraft margins.
- Seeded frequencies and phases, recorded in a code comment: oscillator 1 runs 3 cycles across the frame drifting 1 cycle per loop from phase 0; oscillator 2 runs 5 cycles, drift minus 2, phase 2.1; oscillator 3 runs 8 cycles, drift 1, phase 4.2. Each oscillator's phase is bent by a slow sine taken from its neighbour (FM), and every time term is an integer number of cycles over the 30s loop on wrapped time, so the loop is exact.
- Palette only: kraft ground #A98B5F, ink #1A1512. No labels, no text on the piece.
- Interaction: while pressed, the fingertip's vertical position sets the modulation depth, top of the frame shallow, bottom deep; on release the depth eases back to the resting value and the loop continues. Never click-to-reload.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; full-bleed on phones, centred square on desktop with the page ground in the piece's kraft. A synchronous first frame is drawn at load (set mid-cycle so the FM tangle shows in stills) and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. The three bands show distinct base frequencies (3, 5 and 8 humps) with visible FM bending, and the bolder sum line below traces a plausible interference of the three. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `100/index.html`, `100/thumb.png` (720x720, rendered from the live script), `100/process.md`. Gallery entry added to pieces.json with the formula date.
