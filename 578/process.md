# №1754 "Loom" (PP1001, MF3, marcus-fischer) - build notes

- Date: 2006 · 10 · 31 (formula date). Watch-only. Gallery note: "Very long lines carry a slow pulse across the room, a minute per crossing. Watch only."
- Template: live №1751 Beat Box (/tmp/t1751.html), structure, plates, sizing and guard patterns mirrored.

## Build

- Canvas 2D only. Pale gallery white ground #F7F5EF; two dark tape-brown posts (#3E2C22) hold a tall narrow centered frame running from a faint ceiling line (0.09 VH) to a faint floor line (0.90 VH), both drawn full-width in faint warm grey.
- Six very long lines in dark tape brown run diagonally corner to corner between the posts, three in each direction, endpoints spread by seeded fractions so each run has its own slope and the crossings distribute through the frame. Frame width: 0.34 VW clamped 260-420 on desktop, 0.74 VW on phones.
- Eight floating anchors in muted helium-balloon red (#A85A4E) with a darker ring, each tied to a line at a fixed station, drifting with closed-form sine jitter of about 1.4 px (periods 47 s and 53 s), almost imperceptible.
- Pulse: one graphite pulse per line (#5E5952, halo plus core, short graphite wake trailing behind), travelling the full run on a 60 s period, so one circuit takes roughly a minute. Pulse position is a closed-form function of piece time: u = (t / 60 + off) mod 1.
- Frame one: fixed phase t = 30.0 s. Pulses mid-circuit at u = 0.7280, 0.2973, 0.1291, 0.8074, 0.4823, 0.8170 (lines 0-5). Line endpoint fractions (aFrac/bFrac): L0 0.0558/0.0793, L1 0.2049/0.1697, L2 0.1392/0.2757, L3 0.1032/0.2199, L4 0.1389/0.0927, L5 0.2670/0.1007. Anchor stations: L0 0.4059 and 0.5457, L1 0.5077 and 0.5876, L2 0.7593, L3 0.6311, L4 0.3564, L5 0.7742.
- All geometry from mulberry32(1754); no Date.now() or Math.random() touches frame one. requestAnimationFrame guarded by a typeof check; one synchronous frame at load; resize listened to on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen min dimension under 700 px with aspect fallback.
- No interaction: watch-only, no pointer handlers, never click-to-reload. Title/date/hint plates drawn on canvas ("Loom", "2006 · 10 · 31", "Watch only."). No em dashes in visible copy; no AI-signature copy.

## Deviations from the prompt

- None in substance. The prompt's "two 35-foot runs" is rendered as the two posts holding six long runs between them; the room is implied only by the faint floor and ceiling lines, per the prompt's own wording.

## Title duplication flag

- "Loom" duplicates №9063 "Loom" (Bug's newest-end piece, real-world date 2026-11-04). Shipped verbatim per the spec and the Crackle / Forty-Two Lines precedent; do not rename. Flag to Hans and Bug at ship time.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three PNGs read.
- Desktop: tall narrow frame centered, six distinct dark-brown diagonals corner to corner between the posts, crossings distributed, graphite pulses with halos visible partway along the runs, red anchors scattered along the lines, faint floor and ceiling lines spanning the full width, plates legible top-left and bottom-left, nothing clipped.
- Mobile: frame fills most of the width, same composition, plates legible, no overlap of plates with the frame.
- Thumb (720x720): same composition, legible at gallery size.
- First render round: the six lines were nearly coincident (endpoint fractions spanned only 2-7% of the frame height, reading as two doubled diagonals). Fixed by widening endpoint fractions to 2-28% of span; re-rendered all three sizes and re-read them.
- Determinism: desktop render repeated, byte-identical md5.
- thumb.png IS the 720x720 render.

## Files

- index.html md5: 7c564ffd5e33c53e46480db5949b6dc5
- thumb.png md5: 8fbb124b1e80bf303bc2a1254e51eccd
