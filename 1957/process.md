# №1957 The Pipe Room

Prompt block: TC6 / PP1204, study #255 tom-challenger.

Driver, in one sentence: the room itself is the oscillator: a slow wind-pressure cycle drives light through the pipe ranks, each phrase returns as a fading reflection, and the building answers on its own schedule.

## Palette

From the prompt's own color names: stone grey ground #2b2925 with stone #8a8578, pale stone #b8b2a4 and deep stone shadow #1d1b18; pipe silver #c9ced6 with shaded side #8f959e and shadow edge #5c6168; candle amber #e8a33d and lit amber #f2c46b; window blue #6f97bd with deep #3f5f7d and bright #a8c4dc. Plate ink bone #e8e2d4 on the dark stone ground.

## Mechanism

- Two pipe ranks form the walls, seven pipes each side, tallest toward the nave, standing on a dark plinth. The nave opens at center with a stone arch, a high arched window, and a perspective stone floor.
- Wind-pressure cycle: 48 s period, W(t) = 0.5 + 0.5 sin(2 pi t / 48 - 0.6). Wind drives everything: the brightness of the light inside speaking pipes, the brightness of the window light shaft, and the drift speed and alpha of the wind motes in the nave air.
- Phrases: a fixed schedule, one phrase every 12 s, alternating ranks so the room answers itself across the nave. Each phrase lights 3 to 5 pipes in one rank. Envelope is an attack of 0.8 s then an exponential tail with tau 6 s, audible in the light for about 18 s. Inside a speaking pipe the wind-light rises as an amber column whose height follows envelope times wind, with a bright band traveling slowly up the tube.
- Reflections: each phrase returns as a fading reflection. The strongest live envelope drives an amber radial wash pooling on the nave floor and a faint amber glow on the back arch, both fading with the tail.
- Birdsong motif: twice a minute (windows starting t = 30 and t = 78, each 6 s) a small bird crosses the high window, trailing three pulsing trill dots.
- Candles: four small amber flames along the plinth, flickering near 0.3 Hz.
- Interaction: watch only. No controls, no click-to-reload, no pointer handlers at all. The building decides.
- Audio: visual only, no WebAudio. The prompt describes wind, phrases and birdsong, but per the Franke rule the piece is a visual model of the room as an oscillator, not a soundtrack, and it never autoplays sound.

## Determinism

- FIRST_T = 10. Fixed phase state at frame one: wind is high (W about 0.83), the left rank phrase that began at t = 2 is eight seconds into its long tail (envelope about 0.26), and the right rank phrase that began at t = 8 is two seconds in and speaking strongly (envelope about 0.72), so frame one shows one rank glowing and fading while the other answers across the nave.
- Seeded PRNG mulberry32(1957) for pipe heights and wind mote positions. Every frame is a pure function of t.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes the piece at the first frame.
- QA hook: ?t=<seconds> renders at a chosen time, and the render harness passes its seed the same way (?seed=<seconds>). window.__piece1957 exposes wind, maxEnv, pipeEnv, birdAt, redraw and firstT.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Title, number and date legible at every size, no clipped text, no plate collisions, hint legible on all three sizes, pipes read as a facade rising toward the nave at every size.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 9b093d8e63f993ebd786ae018e9cad4c).
- Time probes: renders at t = 20 and t = 32 differ from frame one and from each other (md5 9491c76512395dc4e40930816cfaa866 and 7fe376e51aaccc4092c05843816cbbf2). The t = 32 render shows the birdsong motif: a small bird crossing the window with trill dots.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render: the floor perspective lines converged on a vanishing point above the floor, so the joints climbed the back wall and crossed the light shaft. Moved the vanishing point onto the floor's top edge, so the lines stay on the floor at every size.
2. Same round: frame one at t = 8 showed the right rank dark because its phrase had only just begun. Moved FIRST_T to 10, so frame one shows the right rank speaking strongly while the left rank is mid-tail. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt names colors but gives no hex values, so all colors are hand-picked from the prompt's own color names (stone grey, pipe silver, candle amber, window blue).
- The wind cycle period (48 s), the phrase schedule (every 12 s, alternating ranks), the tail constant (tau 6 s) and the birdsong windows (t = 30 and t = 78) are invented staging: the prompt asks for slow wind cycles, long tails and an occasional birdsong motif, and fixed numbers make the room answer on a deterministic schedule that reads at frame one.
- The candles, wind motes and perspective floor are invented staging for the church interior the prompt describes: pipes as walls, a nave opening at center, wind-light traveling the tubes.
- Audio is visual only, per the Franke rule; the prompt's wind, phrase and birdsong language is carried by light, not by WebAudio.

## Known warts

- At frame one the left rank tail is quiet: only a short amber column near each speaking pipe's mouth, while the right rank glows strongly. The call and response still reads because the two ranks are visibly in different states.
- On phones the pipes are narrow, so the traveling bright band inside a speaking pipe is a short pale dash; the glow column still reads by color.
- The light shaft is a plain trapezoid with no texture; it reads as light because it brightens with the wind, but it is the flattest element in the scene.
- The birdsong motif is absent at frame one (first window starts at t = 30); it is verified by the t = 32 probe render instead.
