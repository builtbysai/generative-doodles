# №1770 The Exchange

## Driver

Two black fields hang next to each other in the dark, each breathing so slowly you are never quite sure it moved. Then a single white hairline leaves one field and walks across the gap into the other, and the receiving field is very slightly different afterward, as if it learned something. Nothing else ever happens.

## Mechanism

Each panel is a region of the main canvas, drawn as 64 horizontal bands. A band's grey value is a closed-form function of its height, piece time, and the panel's own constants: two sine terms plus one faint drifting sheen band. The left panel drifts on 480 s and 310 s periods with a 340 s sheen; the right panel on 660 s and 410 s periods with a 430 s sheen. Different phases, frequencies, and periods keep the two panels independent, never synchronized and never mirrored.

Exchanges come from a fixed authored schedule, a pure function of piece time: exchange k starts at 55 + 210k seconds and lasts 8 seconds, alternating direction (even k left to right, odd k right to left). The travelling line is a 1 px white segment, 0.55 panel widths long, whose head moves from the sending panel's centre to the receiving panel's centre over the 8 seconds, fading in during the first second and fading out during the last 1.5 seconds as it is absorbed. Its height is fixed per exchange by a seeded generator (mulberry32, seed 1770 + 7k), so each exchange crosses at a different height.

The messenger is a function, not an object: exchangeIndex, exchangeStart, exchangeFrom, exchangeTo, and exchangeY serialize one line's parameters from the schedule, and absorbedCount tells a panel how many lines it has taken in. Each completed absorption shifts the receiving panel's gradient phase by 0.12 radians and lifts its base grey by up to 1.2 per exchange (capped at four exchanges), so the receiver is measurably different after a line arrives.

## Palette

Black ground (#000000), panel greys from near-black up to about charcoal (grey values roughly 4 to 30, computed, never hand-picked per band), one hairline of white (#ffffff at 0.9 alpha while crossing). Title and hint plates are white at 0.05 fill and 0.30 to 0.42 text, kept very dim against the black.

## Interaction

Watch only. No pointer handlers of any kind, no click-to-reload. The piece runs on its own clock: phase advances from the fixed frame-one phase by a monotonic clock after load.

## Frame-one phase

Fixed phase t = 60 s. Exchange 0 (left to right) started at t = 55 s, so at frame one it is 5 of 8 seconds through its crossing: its head has just passed the hairline gap and entered the right panel, its tail still inside the left panel. No exchange has completed yet, so both panels sit at their base states: the left panel shows its sheen low in the field, the right panel its own fainter banding. The line height for exchange 0 is fixed by the seeded generator at v = 0.25 + r * 0.5 with r from mulberry32(1770).

Determinism: no Math.random and no Date.now anywhere in the visual state. Every value is a closed-form function of piece time plus fixed seeds, so frame one is byte-reproducible. Verified: two desktop renders at 1280x900 produced identical md5 (3a92c3b11961aee28dc83fb2ce4057cf).

## Deviations from prompt

Per the batch spec adaptation flag, there are no offscreen canvases and no gradient state objects. Each panel is a region of the main canvas, its near-black field drawn as low-alpha horizontal bands from a closed-form function of piece time, and exchanges come from a fixed authored schedule as a pure function of piece time. The messenger is a set of pure functions rather than a serializing object. The visual result is unchanged: two independently evolving near-black panels, one hairline crossing minutes apart, the receiver shifting slightly on absorption.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected by reading the PNGs.

- Desktop: centered square diptych, hairline gap, left panel visibly lighter with a low sheen band, right panel darker with its own faint banding, one white hairline straddling the gap, title plate top-left and "Watch only." hint bottom-left both very dim.
- Mobile: full-bleed side-by-side diptych, same line mid-crossing, plates dim and legible.
- Thumb (720x720): same composition, line clearly visible crossing the gap.

First render showed the line ending just short of the gap; EXCHANGE_START moved from 57 s to 55 s so the head is past the gap at frame one. Re-rendered all three sizes after the edit and re-inspected. No post-gate edits since.
