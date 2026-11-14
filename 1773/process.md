# №1773 "Between Two Points" (RC6, PP1020): process notes

## Build
- Piece: №1773, PP1020, closing EXPANSION #232 richard-chartier (RC6 of RC6-RC8).
- Gallery date: 2006 · 11 · 19 (formula date 2002-01-10 + 1774 days).
- Gallery note: "Thin white lowercase lines change once every ten minutes over black; one still orange block with a white date at the bottom. Watch only."
- Template: live №1772 "Near Nothing Sky" fetched fresh via fetch-blob.py; title/date/hint plates follow its conventions, restyled for a black ground (translucent white plate fill, light grey ink).
- Canvas 2D only, no WebGL. No DOM text anywhere: all lines are drawn on the main canvas.

## Composition
- Black ground (#000000). Centered stack of three thin white lowercase sans lines (weight 300): station name, date, color word. Orange footer block (#e56b1f) centered at the bottom edge, 420 px wide on desktop (62% of viewport on narrow screens), 64 px tall desktop / 56 px phone, with the fixed white date "2006 · 11 · 19" centered in it.
- Title plate top-left ("Between Two Points" / "2006 · 11 · 19"); hint plate "Watch only." bottom-left, placed just above the footer block so it never overlaps the orange.
- Watch-only. No click handler, no reload, no interaction of any kind.

## Entry rotation and cross-fade
- Fixed authored entry table of 8 entries (station, date, color word), indexed as a pure function of piece time: entry index = floor(t / 600) mod 8, one entry per 600 s (ten minutes in practice).
- Cross-fade: 20 s at each boundary as a closed-form alpha ramp. In the first 20 s of an entry, the incoming entry fades 0 to 1 while the outgoing entry fades 1 to 0; otherwise the current entry is at alpha 1. Layout never moves.
- Entry table:
  1. shinjuku / 2006 · 11 · 19 / orange
  2. berlin hauptbahnhof / 2006 · 12 · 19 / grey
  3. hiroshima / 2007 · 01 · 19 / white
  4. graz hauptbahnhof / 2007 · 02 · 19 / blue
  5. tokyo / 2007 · 03 · 19 / black
  6. kyoto / 2007 · 04 · 19 / red
  7. vienna westbahnhof / 2007 · 05 · 19 / amber
  8. osaka / 2007 · 06 · 19 / pale
- The station names and color words are authored for this piece; the prompt names no stations, so they are fixed here and never randomized. The table cycles every 80 minutes.

## Frame one and determinism
- Fixed phase t = 60 s: entry 0 ("shinjuku / 2006 · 11 · 19 / orange") fully legible at alpha 1 (60 s is past the 20 s fade window), orange footer in place with the white date.
- No Date.now() or Math.random() anywhere in the script (verified by grep: 0 matches). No seeded RNG is needed; every value is a closed-form function of piece time.
- House rules followed: Visual Viewport sizing with resize listened to on visualViewport and window; canvas element pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); one synchronous frame at load; requestAnimationFrame calls guarded by typeof checks; reduced-motion respected (loop does not start when prefers-reduced-motion is set).
- No em dashes in visible copy or in this document. No AI-signature copy.

## Deviations from the prompt
- The spec's technical approach suggested DOM text with long cross-fades; per the spec's own adaptation flag, all text is drawn on the main canvas instead, so frame one stays byte-comparable. The rotation array, ten-minute cycle, slow cross-fade, and still orange footer are all kept exactly as prompted.
- The footer block is centered and 420 px wide rather than full-width, so the "Watch only." hint plate can sit at the bottom-left without overlapping the orange. The prompt only requires the block to sit still at the bottom, which it does.

## QA
- Rendered with node ~/workspace/tools/render-piece.js from the actual script:
  - Desktop 1280x900 (/tmp/d1773.png): black ground; title plate top-left; centered stack "shinjuku / 2006 · 11 · 19 / orange" in thin white lowercase sans; orange footer block centered at the bottom with white date "2006 · 11 · 19"; hint plate "Watch only." bottom-left above the footer. Correct.
  - Mobile 390x844 (/tmp/m1773.png): same composition, smaller type (22 px station / 16 px date), footer 56 px tall, no overlap, nothing clipped. Correct.
  - Thumb 720x720 (/tmp/t1773r.png): same composition as desktop, all elements legible. Correct; this render is thumb.png.
- All three renders inspected visually. No fixes needed; no post-gate edits.
- md5: index.html 0e26b584a52e358106f90f290a625354; thumb.png bbdb9f1175ac6a18cfb40f4a6d9624b9.
