# No.413 Sax Bouquet

EXPANSION #44 (yeti-iglesias), prompt YETI5. Gallery date 2003 · 02 · 28.

## Concept

After Yeti Iglesias's figure-into-bouquet metamorphosis (Astute Graphics
collab reel, 2023-11-24): a girl in profile plays a saxophone on flat pink,
and the instrument turns into a garden. Her body melts at the waist into
green stems that run to the floor, and from the saxophone's bell bursts a
bouquet - two cat heads (her recurring cat protagonist, in the bouquet in
place of blooms), two-tone flowers, green leaves and white star sparkles -
filling the right half of the frame. Music-note-shaped petals drift up from
the bell and fade. WATCH-ONLY: the loop is the piece, no interaction at all.

Her signature hue-shifted 2-stop gradients take the set's house treatment:
two flat tones with a hard diagonal edge inside each flower (red to pink,
orange to yellow), never a blend. The only lettering is her hand-lettered
"Yeti" signature, stroke paths only, bottom right.

## Construction

One canvas, flat colour only, design space 1280x900, full-bleed field.
Palette closed at the prompt's hexes: ground pink #FFC0E8; skin #C86A4A;
hair #2A1A2A; dress red #E63329 with white dots (the palette's white stands
in for the prompt's cream dots); sax brown #5A2E1A with brass #F5A623; cats
orange #F26A1B and black #111111; flowers #E63329/#FF7BB3 and
#FF9500/#FFE066; leaves green #2E7D4F; sparkles white.

- Loop: 40s, seamless. The bouquet bloom is ONE full cycle per loop: scale
  1.0 to 1.06 about the bell point over 20s (cosine), relaxing back over
  20s. Every bouquet element (8 flowers, 2 cat heads, 9 leaves, 8 sparkles,
  all asserted at load) holds an authored offset from the bell anchor, a
  sway period that divides 40 (5/8/10/20/40s), a sway phase and a bloomScale
  weighting its radial push, so the burst breathes as one body.
- Blinks at FIXED slots: the orange cat blinks at loop times 6.0s and
  26.0s, the black cat at 13.0s and 33.0s (0.3s each, sine factor inside the
  slot, zero outside).
- Grain halo: exactly 500 speckle dots (asserted), fixed-seed LCG table in
  a soft disc behind the bouquet, white and flower-pink at flat alpha
  steps, drawn in table order every frame. No flat lift disc under them, so
  the halo edge stays soft by speckle alone.
- The girl: flat shapes only. Hair mass with bun, closed-eye profile with
  nose bump, lips and blush; dress a red torso with 26 clipped polka dots
  (asserted) ending in a wavy five-point hem; six stems curve from the hem
  to the floor with four small leaves riding them. The saxophone is one
  curved flat tube with exactly 6 brass key dots (asserted), a brass bell
  flare with a dark mouth, and a short mouthpiece at her lips.
- Note-petal table (fixed, documented per spec): six music-note-shaped
  petals rise from the bell; progress is a pure function of loop time, so
  the table recycles deterministically. Columns: period (divides 40),
  phase, rise height, sideways drift, size, tone.
  - N1: per 20, ph 17.0, rise 430, drift -40, size 1.00, white
  - N2: per 10, ph 3.0, rise 300, drift +60, size 0.80, flower pink
  - N3: per 40, ph 22.0, rise 520, drift +120, size 1.15, white
  - N4: per 8, ph 5.0, rise 240, drift -80, size 0.70, white
  - N5: per 20, ph 6.0, rise 380, drift +30, size 0.90, flower pink
  - N6: per 40, ph 2.0, rise 480, drift -120, size 1.05, white
  Alpha is sin(pi * progress) shaped, so each note fades in and out across
  its own traversal.
- Determinism: frame one is drawn synchronously at the CONSTANT phase
  T = 13.4s (bouquet mid-bloom at scale about 1.045, note N1 at progress
  0.52 mid-rise, black cat just past its first blink slot). The rAF loop,
  typeof-guarded, is anchored there and advances in fixed 1/60 ticks.
  Frame one is never drawn from Date.now() minus an offset.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen min dimension
  below 700px with aspect fallback (h > w*1.15).
- Phone framing ruling: desktop and tablet take the cover fit. On phones
  the portrait cover crop would cut one pole of this two-pole composition
  (girl far left, bouquet far right) entirely, so phones take a width fit
  on the piece's own pink ground instead - the whole scene survives, small
  but complete (the No.401 phone-framing precedent).
- No offscreen canvas, no gradients, no shadowBlur, no filters, no
  Math.random, no Date.now, no absolute URLs, no em dashes. All marks are
  JS data drawn directly on the one canvas each frame.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical
  (md5 9244f389...).
- Desktop: girl left third in profile, sax diagonal to centre-right, bell
  at (660, 384), bouquet bursting right with both cats readable, three
  note-petals mid-rise at frame one, signature reads "Yeti" bottom right.
- Thumb: cover fit crops to the centre 900 design px; girl, sax and the
  bouquet core all read at gallery size.
- Mobile: width fit holds the whole two-pole scene on continuous pink;
  girl, bouquet and signature all legible.
- First-pass fixes: the signature's "e" first read as "o" and was redrawn
  as an open cursive stroke; a flat lift disc under the halo left a hard
  ellipse edge and was removed so the halo is speckle only; bouquet stems
  thinned and three filler leaves added so the burst reads as a bouquet
  rather than a fan of spokes; two flowers and one leaf lowered so the
  burst fills the right half vertically; the girl's melting stems went
  from four to six with a wider spread; the neck was widened and wedged
  into the dress neckline so the chin no longer floats; one stem leaf
  reseated onto its stem.
- Assertions verified at load by construction: loop 40s, halo 500, dress
  dots 26, flowers 8, cats 2, leaves 9, sparkles 8, notes 6, sax keys 6.
  A failed count throws rather than shipping a wrong enumeration.
