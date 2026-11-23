# No.800 "The Ring" — EXPANSION #98 olivier-mosset, PP1

## Concept

The canonical Mosset: a square white enamel canvas carrying a single black ring, an outline and nothing else. The mark is administrative on purpose — drawn by a filing cabinet, not a hand. Where Toroni's unit is a brush imprint full of bristle texture, Mosset's unit is a clean stroked circle whose only life is procedural: it draws itself once per loop, holds while light crosses the enamel, and fades back to the empty canvas.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no interaction. Watch-only.
- Canvas sizing comes from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `draw()` pins `canvas.style.width/height` in px every frame. Phone detection uses `window.screen` physical size (min dimension < 700px) with the aspect fallback (`h > w*1.15`) only when screen data is absent.
- Scene: a surround in #E8E5DD (a whisper darker than the canvas, same tone family) so the square's edge stays just perceptible, reinforced by a 1px hairline at 10% black alpha. The square canvas (#F4F2EC) fits the frame's smaller dimension (94% desktop, 92% phone), centered.
- The ring (#141414) is a stroked outline, never filled: stroke width is exactly 3.3% of the canvas side at full draw, round caps per the prompt's technical approach. It is built from up to 160 small arc segments so a low-frequency edge wobble can modulate the radius: amplitude 0.3% of the canvas side, 3 or 4 lobes. Ring diameter is 66% of the canvas side.
- Loop, 30 s, seamless, closed-form in loop phase:
  - 0–6 s draw-on: the arc sweeps clockwise from the top with an ease-out cubic while the stroke width ramps from 18% to full (thin-to-full).
  - 6–24 s hold: ring complete; a sheen band sweeps the enamel diagonally.
  - 24–30 s fade: ring alpha falls to zero; at the wrap the canvas is empty and the next cycle's draw-on begins, so the loop closes without a cut.
- Sheen: five nested flat-alpha parallelogram bands (white at alpha 0.020–0.095, widths 7–46% of the canvas side) clipped to the canvas square, slanting at 35 degrees, centre a pure function of loop phase crossing the canvas once per loop. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas anywhere in the piece.
- Per-cycle jitter: mulberry32 seeded by cycle index (seed 800100 + cycle × 7919). Centre drift ±1% of canvas side, radius ±0.5%, wobble phase and harmonic seeded. Placement jitter lives in the cycle parameters only, never inside a frame.
- Frame one: the synchronous first draw is at fixed loop phase t = 15 s — mid-hold, ring fully drawn, sheen centred on the canvas. Drawing frame one at loop t = 0 would show the empty canvas mid-draw-on, a lying thumb. The rAF loop continues from that same phase; the rAF call is typeof-guarded and no time source (`Date.now` or otherwise) shapes frame one.

## Deviations

- Surround tone #E8E5DD is a third tone, sanctioned by the brief: the canvas edge must be perceptible, and the surround is a whisper of the canvas's own family, plus a hairline.
- Sheen is rendered as white at low alpha over the enamel — light on the surface, not a pigment. It is the only non-palette mark and it never touches the ring's reading as a flat black outline.
- Ring diameter (66% of side) is not fixed by the prompt; only the 3.3% stroke ratio is. The chosen diameter keeps the ring dominant inside the square, as in the 1966 canvases.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with `cmp` — identical. Second render deleted.
- Read-backs:
  - Desktop: white square on the greyer surround, one clean black ring outline centred, canvas tone showing inside the ring, a faint diagonal sheen low in the square. Nothing else in frame.
  - Mobile: square centred in the tall frame with surround above and below, ring complete, nothing clipped.
  - Thumb: same composition at 720x720; ring reads unmistakably as an outline.
  - Throwaway mid-draw render (phase forced to loop t = 3 s): arc about 85% swept clockwise from the top, round caps, stroke near full width. Verified the draw-on, then deleted.
- Palette audit: #F4F2EC canvas, #141414 ring, plus the two recorded exceptions above (surround whisper, sheen light). No visible text besides `<title>`. No em dashes.
