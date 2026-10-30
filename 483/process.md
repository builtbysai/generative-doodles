# No.483 "Scallop Trim" — process

EXPANSION #58 giuliadallara (Giulia Dall'Ara), prompt GD3.

## Concept

Her PASTOR FIDO balcony mechanism treated as the whole picture: a decorative
scallop trim dressing a dark architectural wall edge. The canvas is flat
near-black green (#0E2A24) wall and ground. A single horizontal band, the
artwork itself and not a frame, runs the full width across mid-height: two
stacked rows of uniform solid semicircles in alternating lavender (#B9A8E0)
and rust (#C8431F), the second row staggered by half a scallop width, plus a
third row of small upward semicircles staggered again, all held between thin
cream (#F4EBD3) rule lines above and below the band. The band's top rule sits
at 43% of the height and its lower rule lands around 56-60% of the height
depending on aspect, so the band occupies the 55-65% zone at its base and
dominates the middle of the wall. Above it, a strip of sage (#9DC49A)
botanical glyphs peeks over a low sage ground line, confined to the top 20%
of the canvas. Below the band is flat dark ground only. No gradients, no
hand-drawn wobble: every scallop is a true semicircle arc, crisp and uniform.
The only visible copy is the word "drag" in cream at low alpha in the
bottom-right corner.

## Construction

Single self-contained index.html, 2D canvas only, no external assets, no
audio, no microphone.

- Sizing: canvas size comes from the Visual Viewport API with window
  innerWidth/innerHeight as fallback, devicePixelRatio clamped to 1-2.
  Resize listeners are registered on both visualViewport and window. draw()
  pins canvas.style.width/height in px on every frame and resets the
  transform. Phone detection uses window.screen (min dimension < 700px),
  with the aspect fallback h > w * 1.15 only when screen dimensions are
  unavailable. Full-bleed on all sizes; page ground is the near-black green.
  Phone layout widens the scallops relative to the width (width / 5 instead
  of width / 11 in the diameter formula).
- Scallop geometry: diameter sw = clamp(min(viewW / (phone ? 5 : 11),
  viewH * 0.14), 52, 118), so radius and spacing scale with the viewport.
  A generic row painter draws each row: world position of scallop index i
  is i * sw + row offset, screen x = world x - scrollOffset. Row one hangs
  from the top rule; row two hangs from row one's tip line, offset by sw / 2;
  the small row (diameter sw / 2, offset sw / 4) bulges upward and sits on
  the lower rule, drawn in the opposite colour of its index.
- Seeded colour rule: scallopColor(idx) is a seeded function of the scallop
  index alone. It returns lavender or rust by the parity of idx XORed with
  seedParity, where seedParity is the first draw of mulberry32(currentSeed).
  Scrolling therefore reveals a consistent infinite band: any index, however
  far along or however negative, always renders in the same colour, and the
  pattern is periodic with period 2 * sw, so the offset arithmetic in the row
  painter is exact.
- Glyph strip: static by choice (recorded deviation from the scroll option
  the brief allowed; the strip does not move when the band is dragged).
  Glyphs are placed on a fixed 74px (56px on phones) grid across the top 20%,
  each one generated from rngForIndex(glyphIndex, 7), a mulberry32 seeded by
  the current seed hashed with the glyph index, so the strip is fully
  deterministic and reseeds with the piece. The parametric library has five
  glyph types: a leaf sprig (stem with filled ellipse leaves), a branching
  coral (recursive branches with dot tips), a fern (curved stem with tick
  fronds), a bud (five-petal filled flower with a cream centre and two stem
  leaves), and grass blades (quadratic strokes). A sage line at 50% alpha
  along the bottom of the strip is the line the glyphs peek over.
- Interaction: pointer and mouse down/move/up handlers drag horizontally;
  scrollOffset decreases by the pointer dx, so the frieze flows past under
  the finger and new scallops enter at the leading edge with colours fixed by
  their index. A tap (under 6px of movement) followed by a second tap within
  350ms and 32px, judged on event timeStamp, reseeds the whole trim, as does
  a dblclick: seedCount increments, currentSeed = 48317 + seedCount * 7919,
  seedParity is recomputed, scrollOffset resets to zero, and both the band
  colours and the glyph strip regenerate. Never click-to-reload: a single
  click does nothing.
- Determinism: fixed base seed 48317 (mulberry32). The first frame is drawn
  synchronously at load by resize() calling draw(), with scrollOffset = 0
  and the glyph strip in place, at a constant state. Nothing in the piece
  reads the clock; the only time value used anywhere is event timeStamp for
  double-tap detection during interaction. The animation loop is guarded by
  typeof requestAnimationFrame, and when rAF exists it simply redraws the
  current state each frame (motion comes from dragging, not from the clock).
  No offscreen canvas, no document.createElement, no AudioContext.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
  Renderer reported resize listeners on both window and visualViewport plus
  all canvas pointer/mouse listeners at every size.
- Determinism: thumb.png rendered twice and compared with cmp; byte
  identical. The duplicate render was deleted.
- First build failed visual review and was rebuilt before delivery: the
  main scallops were hollow U shapes (a ground-coloured inner semicircle cut
  out of each one) under a half-width rectangular panel row, so they did not
  read as the solid uniform semicircles the brief specifies. The final code
  has no panel row and no cutout; the band is the two solid scallop rows plus
  the small upward row described above. The bud glyph's stem leaves were
  also pulled in toward the stem so they no longer float detached.
- Final read-back: desktop shows the sage glyph strip across the top 20%
  (ferns, corals, leaf sprigs, buds, blades), then dark wall, then the band
  at mid-height with crisp solid alternating lavender and rust semicircles,
  a small cream dot in each main scallop, the small upward scallop row, and
  cream rules above and below, with flat dark ground beneath. Mobile shows
  the same composition with five main scallops across, nothing clipped, the
  glyph strip complete at the top. Thumb shows eleven scallops across and
  the same layout at square aspect. The "drag" hint sits in the bottom-right
  corner in all three.
- Source check: no Date.now, no createElement, no AudioContext and no
  gradient calls anywhere in index.html (grep count 0).
- Deviation recorded: the glyph strip is static rather than scroll-locked,
  which the brief explicitly left open ("also scroll-locked or static (your
  choice, record it)"). No other deviations.
