# №1757 "Twelve Months, Twelve Speakers" (PP1004, MF6, marcus-fischer) - build notes

## Driver
A year of incident data made audible as movement: twelve speakers on concrete cylinders swell and shake in proportion to their month, so the arc itself reads as a year.

## Spec
TASKS.md prompt block marcus-fischer MF6 (PP1004). Date 2006 · 11 · 03. Watch-only.
Gallery note: "Twelve bare speakers arc as a year: quiet months nearly still, intense months shaking their cylinders. Watch only."

## Build
Canvas 2D, template live №1756 "The Speakers Are the Piece" (structure/sizing/plates/guard patterns mirrored).
- Ground: industrial brick dark #241A15 with a darker floor band #2E211A from y 0.86 VH. Cylinders in raw concrete grey (#8C857C body with #6E6860 edges, #A8A199 top face, one faint form line). Speakers in black (#17130F cone, #0C0A08 cap, #3A332C rim, #55504A surround rings). Intensity as a warm amber halo #FFAA3C behind each speaker.
- Twelve speakers arc left to right, months 1 to 12, speaker centre y = (0.72 - 0.07 * sin(pi * i/11)) * VH, x from 0.06 to 0.94 VW. Generous dark space above the arc. Cylinders run from just under each speaker down to the floor, so they read as low plinths, taller only where the arc rises.
- Fixed 12-month amplitude array (months 1-12, never random, never re-rolled): [0.22, 0.18, 0.34, 0.42, 0.55, 0.78, 0.92, 0.86, 0.64, 0.48, 0.30, 0.24]. Quiet winter (Feb 0.18), rising spring, summer peak (Jul 0.92, Aug 0.86), falling autumn.
- Motion: a 60 s loop carries one slow wave of attention across the year. Each speaker's envelope is a smooth bump centred on its own month slot, with a 0.30 floor so the whole year stays faintly alive off-peak. Membrane vibration (per-speaker periods 0.09-0.13 s) and whole-unit shake (dx, dy up to 0.07 r) both scale by amplitude times envelope; halo peak alpha = 0.06 + 0.42 * amplitude * envelope and halo radius grows with the same product. Every term is a closed-form function of piece time.
- Month labels JAN-DEC in #B9B0A4 monospace under each cylinder. Wire traces snake across the floor: a quadratic run linking consecutive cylinder bases, a small slack loop at each base, and one long trace running off the right edge.
- Frame one: fixed phase t = 60.0 s. The loop is offset by 30 s so at t = 60 s the year wave sits on July (month 7, amp 0.92), mid-swell: envelope 1.00, halo peak alpha 0.45, membrane breathing at 10 percent of radius. No Date.now()/Math.random() anywhere; no seeded RNG needed since every value is closed-form.
- House rules: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen min dimension < 700px with aspect fallback (h > w*1.15), one synchronous frame at load, requestAnimationFrame guarded by typeof check, reduced-motion respected, title/date/hint plates drawn on canvas, no click-to-reload (no pointer handlers at all; watch-only), no em dashes in visible copy, no AI-signature copy. On phones the cylinders narrow (0.92 r vs 1.15 r) so the twelve stay separated.

## Deviations from the prompt
None. No chart overlay anywhere; the data lives only in the movement and the halo. The data series is an authored fixed table recorded above, not the real Gun Violence Archive counts (the prompt calls for a fixed data series; the archive itself is not reproduced). studies/marcus-fischer.md does not exist in the repo; hexes hand-picked from the prompt's named colors as the MF1-MF5 builders did.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script; all three PNGs read and inspected.
- Desktop 1280x900: full arc of twelve speakers on low concrete cylinders, amber halo strongest behind the summer peak, month labels legible, wires visible along the floor, plates legible top-left and bottom-left, generous dark space above, nothing clipped.
- Mobile 390x844: all twelve speakers and labels visible, cylinders separated with gaps, arc reads vertically, title plate fits (shrinks to 15px), hint plate legible, nothing clipped.
- Thumb 720x720: same composition, arc and halo read at small size, plates legible; thumb.png IS this render.
- Determinism: desktop rendered twice, md5 identical (b9204c95eefcd84aa03993873a00e28d both runs).
- Fix round 1: first build had the arc too high (cylinders read as tall columns) and cylinders merged into a solid wall on phones; lowered the arc (centre y 0.60 to 0.72 VH, rise 0.09 to 0.07), narrowed phone cylinders to 0.92 r, and raised wire alpha 0.7 to 0.9. Re-rendered all three and re-inspected; no further fixes. No post-gate edits.

## Files
- index.html - 13,103 bytes (after fix round; re-gated)
- thumb.png - 720x720 render
- md5 index.html: e3d774938d2db985f34c2c5e4932d6ac
- md5 thumb.png: e5df0fb5c4c548271b3f7bedc8730c2e
