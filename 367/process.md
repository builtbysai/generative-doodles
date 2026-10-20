# No.367 Poe Traits

## Concept

After Julianne Haness's (jmarie.creates) "Poe-traits" series: repeating
portrait medallions of Edgar Allan Poe in a diamond grid on a moody
dark-academia ground, with small motifs in the gaps between portraits.
The portrait is one hand-authored vector, drawn in her hand-inked
portrait manner: a parchment cameo plaque ringed in oxblood, and inside
it the bust in flat parchment, ink and raven black - dark hair mass
swept back from a high forehead, heavy brows, a bold moustache wedge,
high collar and cravat. The interstitial library is exactly the
prompt's four motifs: raven, keyhole, quill, skull-moth. The piece is
literary spooky, never photoreal, no gore. The only motion is a
candle-flicker ambience: the whole field breathes in luminance by plus
or minus 3 percent on a slow loop, like lamplight.

Palette, flat only: ground deep plum-ink #221828, parchment #EDE3D0,
ink linework #2A2230, raven black #14101A, accent oxblood #7A2E35.

## Construction

One canvas, 2D, all marks drawn directly each frame from fixed data.
No offscreen canvas, no filters, no blur shadows, no gradients.

- Medallion grid: centres step 300 x 320 design px with alternate rows
  dropped by half a column (a diamond lattice), 9 columns x 8 rows =
  72 medallions, authored oversized across x -1200..1200 and
  y -1120..1120 so the field covers the frame at every clamped pan.
- Portrait: one vector replayed at every centre. Outer parchment
  ellipse 97 x 117, oxblood ring stroke, plum inner field 88 x 108;
  the bust is clipped to that field: raven-black coat and shoulders,
  parchment high-collar points and shirt front, ink cravat with an
  oxblood pin, then the head - ink hair silhouette grown from the face
  path so the hair reads swept back, parchment face with a high
  forehead tapering to the chin, ink side locks, straight brow strokes,
  almond eyes, a single-line nose, the moustache as one filled ink
  wedge, and a short mouth line.
- Interstitials: 56 sites (8 x 7) offset half a step from the
  medallion centres, one motif per diamond gap, each with a slight
  fixed rotation from a 4-entry variant table. Motif assignment comes
  from three authored arrangement tables embedded as literal strings
  of 56 digits (0 raven, 1 keyhole, 2 quill, 3 skull-moth), each table
  holding every motif exactly 14 times; the counts are asserted at
  load. Double-tap advances to the next table. Nothing is reseeded at
  runtime.
- Candle flicker: after the field is drawn, one flat raven-black rect
  covers the design area with alpha = 0.03 + 0.017 sin(2 pi t / 24)
  + 0.011 sin(2 pi 3t / 24 + 1.3), clamped to 0..0.06. Both components
  complete whole cycles inside the loop, so the flicker is seamless.
- Loop length: 24 seconds, one seamless master loop (the flicker
  period; the field itself is still).
- Determinism: frame one is drawn synchronously at the constant phase
  T = 11.0s into the loop, where the combined flicker sits near its
  mean and moving, so frame one is developed mid-breath. The rAF loop
  (typeof-guarded) advances T from that same anchor in fixed 1/60
  ticks. Frame one never reads a wall clock.
- Interaction: drag pans grab-style, clamped to the authored margin
  (about plus or minus 710 x 830 design px), position persists on
  release. Double-tap (two taps within 0.35s and 30 design px, each
  under 0.3s with under 2px of travel) advances the interstitial
  arrangement table. Never click-to-reload. Pointer coordinates
  convert through the stored cover transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen min dimension
  under 700px with aspect fallback (h > w * 1.15); design space
  1280 x 900, cover-fit full-bleed field; page ground is the piece's
  own plum-ink.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png), all from the
  shipped script.
- thumb.png rendered twice and byte-compared: identical.
- Desktop render inspected: diamond grid of cameo medallions fills
  the frame edge to edge, portrait reads as Poe (hair mass, moustache,
  high collar), all four interstitial motifs present in the gaps,
  flicker overlay sits mid-range so the field reads at full contrast.
- Mobile render inspected: cover-fit crop keeps whole medallions in
  frame, ground continuous, no letterbox bars.
- Load-time assertions pass in the renderer: 72 medallions, 56 sites,
  three arrangement tables of 56 entries with 14 of each motif.
