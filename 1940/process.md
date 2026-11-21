# №1940 Three Ecologies

Prompt block: KD5 / PP1187, study #253 kit-downes.

Driver, in one sentence: three bands playing at once in the same room, each in its own world, and the room is porous, so a rhythm, a smoke curl, or a stamp keeps slipping through the wall and coming out the other side wearing the neighbor's clothes.

## Palette

Per panel, from the prompt's own color names: ENEMY grunge black and white, ground #141414 with paper white #f2f2ef and grey #8a8a86; Deadeye sepia smoke, gradient #8a6a48 to #5d4128 with smoke #d9c1a3, dark #3a2a1c, light #e8d5b5; Exhaust buff paper #d8c8a2 with ink #2b2620, stamp red brown #7a3b2e, ruled lines #8a7a5c. Shared border lines in thin bone #e8e2d4, plate ink bone #e8e2d4 on a dark ground #1a1712.

## Mechanism

- Three equal vertical panels, each with its own simulation and its own renderer, each breathing on its own clock: ENEMY at 0.9x with a bass pulse at 0.5 Hz and piano bars stepping every 2 s, Deadeye at 0.55x with slow drifting double exposures and smoke curls, Exhaust at 1.3x with stamps that slowly rotate and fade. No clock is shared, so the panels never fall into step.
- ENEMY: torn white paper blocks as abstract grunge type, vertical piano bars in white and grey, a blunt bass drum ring that swells with the pulse, seeded grey and white splatter, and short thick bars like a torn headline. No legible words beyond the panel label.
- Deadeye: a sepia gradient ground, two large translucent discs drifting over each other as double exposure with dark organ pipe silhouettes inside, three Hammond pipes swaying at the slow clock, and three bezier smoke curls each on its own phase.
- Exhaust: ruled buff paper, five rows of typewriter dashes (abstract marks, no legible words), two rotated double border ink stamps that slowly turn and fade, and a faint coffee ring.
- Bleeds: a streak crossing a border is drawn twice, once per side. The source side uses the source ecology's grammar, the target side is re-dressed in the neighbor's grammar: a bar crossing into Deadeye becomes a sepia smoke puff with a wisp, smoke crossing into Exhaust becomes a small ink stamp mark, a stamp crossing into ENEMY becomes a blunt black block with a white edge. A thin bone tick marks the crossing point on the border itself.
- Spontaneous bleeds run on a fixed schedule, one event crossing one border over 8 seconds then fading over 2, sources cycling so every border is crossed in both directions: L to C bar at t 6, C to R smoke at t 10, R to C stamp at t 18, C to L smoke at t 26, L to C bar at t 34, R to C stamp at t 42, C to R smoke at t 50.
- Interaction: drag across a border to force a bleed. The drag's starting panel selects the source ecology and the crossing vector; the element is pulled into the neighbor and re-dressed there. A drag that keeps going across the second border chains a second bleed from the middle panel onward. No click-to-reload, no other interaction.
- Audio: visual only, no WebAudio. The prompt describes three bands and their instruments, but per the Franke rule the piece is a visual model of the three ecologies, not a soundtrack, and it never autoplays sound.

## Determinism

- FIRST_T = 12. Fixed phase state at frame one: at t = 12 the L to C bar bleed started at t = 6 is three quarters across its border and the C to R smoke bleed started at t = 10 is a quarter across, so frame one shows all three panels distinct and alive with bleed streaks already crossing both borders.
- Seeded PRNG mulberry32(1940) for splatter, typewriter rows, and smoke anchor points. Every frame is a pure function of t and the drag state.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes the piece at the first frame; dragging still forces bleeds.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Three panels stay visually distinct at every size, labels legible at thumb size, hint legible on all three sizes, bleed streaks visible crossing both borders at frame one, no clipped text, no plate collisions.
- Drag probe via a node harness (/tmp/probe1940.js) that replicates the render-piece.js shim, dispatches a real pointerdown in the left panel and pointermoves across both borders, then reads the piece's bleed list through the window.__piece1940 probe hook: at FIRST_T = 12 the spontaneous bleeds are L to C bar (start 6) and C to R smoke (start 10); after the drag two forced bleeds appear, L to C as bar (start 12) and C to R as smoke (start 12), chained across the second border. Render md5 before drag b0cb257f5fcaaa437c30672794ac407e, after drag db4162ca31cf2acd8a6bc7664667e34e, so the drag changes pixels. DRAG PROBE PASS. The re-dressing is in the renderer: drawBleedSegment switches grammar by target panel, so the forced bar renders as a smoke puff on the Deadeye side and the forced smoke renders as a stamp mark on the Exhaust side.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 b0cb257f5fcaaa437c30672794ac407e).
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render: the tall white piano bar at x 0.32 passed straight through the bass drum ring, merging into one shape. Shortened the piano bars (max height 0.145 of panel height instead of 0.25) and moved the drum down to 0.84 of panel height, so the bars end clear above the drum ring. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt names the panel instruments but gives no hex values, so all colors are hand-picked from the prompt's own color names (grunge black and white, sepia smoke, buff paper with ink stamps).
- The spontaneous bleed schedule is an invented staging device: the prompt asks for occasional bleed events and a drag-forced bleed, and the fixed schedule makes the parallelism read at frame one while keeping every crossing deterministic.
- The panel sub-labels (piano, bass, drums; Hammond organ trio; drums, reeds) and the top right sub-line are added as legible labels for the instrument rules; the prompt names the instruments but does not ask for them on the plate.
- Audio is visual only, per the Franke rule; the prompt's band and instrument language is carried by the three visual grammars, not by WebAudio.

## Known warts

- The center to right spontaneous bleed at frame one is a small stamp mark at the border, quieter than the left to center white bar; the crossing still reads because the bone tick and the stamp sit exactly on the border line.
- On phones the panels are about 130 px wide, so the typewriter dashes in Exhaust are short and the Deadeye pipes are narrow; the three grammars still read at a glance by color and texture.
- The type lines in ENEMY cross the piano bars where they overlap, which reads as score marks; that is incidental, not drawn on purpose.
