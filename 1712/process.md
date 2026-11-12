# №1712 "The Stone in the Stream" (PP959, EXPANSION #225 goodbad-png)

Gallery date: 2006 · 09 · 19. Gallery note: "White streamlines part around an unseen stone on deep teal. Drag to move the stone."

## Build

Template: live №1711 index.html (fetched via fetch-blob, sha f851d5dcf94df927374d9a4d65796f1a365448c8). Canvas 2D, no p5.js (see deviation below).

Approach: streamlines as closed-form potential-flow polylines around a repelling disc. Each line is a pure function of the disc position (y = y0 + R^2 * y / (x^2 + y^2), solved by fixed-point iteration), so a drag re-bends the whole field with no frame-integrated state. Upstream offsets are clustered toward the stone (power 0.65) so lines bunch at its shoulders and run straight in the calm zones at the field edges. Lines with |y0| < R * 1.04 are omitted, leaving the void; a radial clamp guarantees no line crosses through it. Tiny stipple dashes ride along the lines as short perpendicular ticks at seeded intervals, travelling slowly with piece time. Shoulder cross-hatching is short diagonal ticks (about 40 degrees off the local tangent) placed by a deterministic hash where a line skirts the stone at 1.06R to 1.7R. Seven sparse loose arcs drift above the stone on a slow closed-form sine.

Frame one: fixed phase t = 0, stone at stage fractions (0.62, 0.55), radius 0.17 of the stage short side. The stone is never drawn; only the lines' behavior shows it.

Interaction: pointer drag moves the stone (clamped to the stage with a 1.25R margin); the field re-bends live. Otherwise watch-only (arcs drift, stipple marks travel). No click-to-reload.

Palette (hand-picked from the prompt's named colors): deep teal ground #0B3B3E, white lines #FFFFFF, plate #05282B, hint ink #9FD8D2.

## Deviations recorded

1. Palette hexes hand-picked from the prompt's named colors (white lines on deep teal). The prompt cites palette code f06 "exact", but studies/goodbad-png.md does not exist in the repo (the studies/ dir holds only 7 files, none for goodbad-png), so there is no study file to resolve f06 from. Same deviation as №1704-1711 did for aaron-penne. No study file was invented.
2. p5.js-to-2D substitution: the spec's technical approach names p5.js; the piece is built in plain Canvas 2D per the house rule (node-canvas has no WebGL and the gate renders frame one in 2D). The potential-flow math is identical in either case.
3. Shoulder cross-hatching is implemented as short diagonal ticks on the main lines rather than a second tilted line system: the first build's tilted second system rendered as stray diagonal scratches away from the stone, so it was replaced with ticks placed exactly where lines skirt the void. The crossing effect at the shoulders is preserved.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script; all three renders read and inspected.

- Desktop 1280x900: white hairlines fill the square stage, bunching in a clear dome over the unseen stone and a bowl beneath it, straight in the calm zones at the edges; stipple ticks visible along the lines; shoulder cross-hatch ticks legible at the bend; title plate top-left, hint plate bottom-left; page ground is the piece teal throughout.
- Mobile 390x844: full-bleed field, void off-center, bunching legible at small size, plates fit.
- Thumb 720x720 (thumb.png IS this render): same composition, stone void clear.

Determinism: two independent 720x720 renders are byte-identical (md5 e92e0256107f489a4a2ffd15d9d4c956). No Math.random() or Date.now() in the script; seeded RNG mulberry32(1712) only. No em dashes in visible copy. requestAnimationFrame guarded by typeof check; one synchronous frame at load.

Fix round: first gate showed the stone reading as a wide empty band with no shoulder bunching and the hatch system misplaced. Fixed by clustering upstream offsets toward the stone, replacing the tilted second system with shoulder ticks, and taming the loose arcs (less sag, lower alpha). Re-gated after the fix; renders above are the fixed version.
