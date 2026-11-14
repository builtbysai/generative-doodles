# №1774 "The Ledger" (RC7, PP1021): process notes

EXPANSION #232 richard-chartier, closing the study with №1773 and №1775.
Gallery date: 2006 · 11 · 20. Gallery note: "A glacial column of release entries scrolls white on black; a monochrome field blooms behind each entry as it crosses the center line. Watch only."

## What it is
A single centered column of release entries (year, catalog number, title) in monospace LINE header typography, white on black, scrolling upward at a glacial constant velocity. As each entry crosses the center line, a one-line monochrome field blooms behind it for a few seconds, then recedes. Watch-only; no interaction, never click-to-reload.

## Entry table
Fixed authored table of twelve LINE catalog entries, in the spirit of the label, never fetched live:

- 2000 LINE_001 Surface, After Rain
- 2001 LINE_002 A Field of Silence
- 2001 LINE_003 Slow Arc
- 2002 LINE_004 The Vanishing Point
- 2002 LINE_005 Winter, Unfolded
- 2003 LINE_006 Two Tones
- 2003 LINE_007 A Room of Air
- 2004 LINE_008 The Long Tone
- 2004 LINE_009 Small Hours
- 2005 LINE_010 A Quiet Geometry
- 2006 LINE_011 The Listening Room
- 2006 LINE_012 Almost Nothing

The table tiles cyclically, so the column never runs out.

## Scroll and phase
- Entry height: 48 px desktop, 40 px phone.
- Scroll velocity: one entry height per 30 s (entryH / 30 px per second), continuous, no pauses.
- Scroll offset is a pure function of piece time: scrollY(t) = (entryH / 30) * t + 36.
- Frame one is fixed at t = 60 s, so scrollY = 132 px on desktop.
- The 36 px phase offset puts LINE_012 "Almost Nothing" 30 px above the center line at frame one, with its bloom about two thirds open (u = 0.61, smoothstep 0.68), and LINE_001 "Surface, After Rain" 18 px below the center line with its bloom mostly open (u = 0.77, smoothstep 0.87). LINE_011 sits just outside the bloom zone and LINE_002 shows only a faint trace.

## Bloom function
For an entry whose center is distance d from the center line, with entry height eh:
u = clamp(1 - d / (1.6 * eh), 0, 1); alpha = maxAlpha * smoothstep(u).
The bloom is a low-alpha horizontal band behind the entry, slightly wider than the column and 0.92 entry heights tall. Color is a seeded function of the entry's catalog string (FNV-1a hash mod 5): hash 0 gives pink (#eec3d3, max alpha 0.14), hash 1 gives icy (#bcd8ea, max alpha 0.16), otherwise white (#ffffff, max alpha 0.10). Result: LINE_003 and LINE_007 bloom icy, LINE_009 blooms pink, the other nine bloom white. Monochrome, icy, or pink only; no other color anywhere.

## Layout
- Desktop: the column sits in a centered square field (side min(VW, VH) - 40), column width min(VW * 0.66, 620). Phone: full-bleed field, column width VW - 32.
- A faint hairline rule (white, alpha 0.10) marks the center line the entries bloom across.
- Soft black fades over the top and bottom 80 px of the clip band, so entries drift in and out at the plate edges instead of popping.
- The scrolling column is clipped to the vertical band between the title plate's bottom edge and the hint plate's top edge, on all sizes: a shared plateRects() function computes both plates' geometry once, drawColumn() clips to that band (entries, bloom bands, center rule, and edge fades all inside the clip), and drawPlates() draws from the same geometry, so the column can never render beneath either plate. The edge fades run from the clip-band boundaries, not the viewport edges. Frame-one positions are unchanged by the clip: the band contains the center line on every size, so LINE_012 still sits 30 px above center with bloom about two thirds open and LINE_001 18 px below at about 87% on desktop.

## House rules followed
- Visual Viewport sizing; resize listened to on visualViewport and window.
- Canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15).
- One synchronous frame at load; requestAnimationFrame calls guarded by typeof checks.
- Deterministic fixed-phase first frame: seeded FNV-1a hash only; no Date.now() or Math.random() anywhere.
- No em dashes in visible copy or headings. No AI-signature copy. Watch-only.
- Canvas 2D only. Template: live №1772 fetched fresh at build.

## Deviations from the prompt
- None substantive. The prompt allows a canvas or DOM list; the column is drawn on the main canvas per the spec adaptation flag, so frame one stays byte-comparable.
- Typography: the prompt names "LINE header typography"; entries are set in monospace, matching the gallery plate font and the №1772 template, rather than a webfont, so the render is deterministic under node-canvas.
- Additions, documented above: the faint center hairline and the top/bottom edge fades. Both are visual aids to the bloom mechanic, not motion or interaction.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script:
- Desktop 1280x900: centered column of white entries on black; two bloom bands visible straddling the center line (LINE_012 above, LINE_001 below); faint center hairline; top and bottom entries fade at the field edges; title plate top left, "Watch only." bottom left. Correct.
- Mobile 390x844: full-bleed column, entries legible at 12 px, blooms visible near center, plates in place. Entries pass beneath the plates at the top and bottom as designed. Correct.
- Thumb 720x720: square field, column centered, bloom bands at center, plates legible. This render is thumb.png. Correct.

No fixes were needed after the first renders; no post-gate edits.

## Fix round (2026-11-14, parent gate)
Parent gate defect: desktop passed, mobile failed. In an independent mobile render the scrolling entries passed beneath the title and hint plates: the top entry "2002 LINE_004 The Vanishing Point" was half-hidden behind the "The Ledger" title plate, and the bottom entry "2006 LINE_012 Almost Nothing" was half-hidden behind the "Watch only." plate. Entries passing under opaque plates is not acceptable as designed.

Fix: the column is now clipped to the band between the title plate's bottom edge and the hint plate's top edge on all sizes, via a shared plateRects() used by both the clip and the plate drawing, and the edge fades now run from those band boundaries. Nothing else changed: same 12 entries, same 30 s per entry height velocity, same bloom function, same frame-one phase at t=60 s (LINE_012 30 px above center with bloom about 68% open, LINE_001 18 px below at about 87% on desktop). Title, date (2006 · 11 · 20), and gallery note unchanged.

Re-gated after the fix with node ~/workspace/tools/render-piece.js from the actual script:
- Desktop 1280x900: unchanged frame one (LINE_012 and LINE_001 bloom bands straddling the center line); top entry fades in below the title plate, bottom entry fades out above the hint plate; no entry touches either plate. Correct.
- Mobile 390x844: top entry fades in below the title plate, bottom entry fades out above the "Watch only." plate; no entry or bloom band touches either plate at any point. The reported defect is gone. Correct.
- Thumb 720x720: square field, column centered, bloom bands at center, plates legible, no entry touches a plate. This render is thumb.png. Correct.
