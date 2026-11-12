# The Score Follower - №1732

Pale dots drift down as if played by an invisible hand, and a follower process parses them into four colored voice-streams that keep falling while the originals fade.

## Mechanism

Seeded dots (mulberry32(1732)) spawn across the top third of the frame and fall slowly with slight horizontal drift. When a dot crosses the parse boundary at one third of the height, it is sorted by horizontal position into one of four pitch bands and continues as a persistent colored ribbon segment in that band: LOW in muted rust #A85B3A, HIGH in ochre #C99A3A, SUB in slate #6E7B8A, SUPER-HIGH in moss #7A8A5A. The parsed dot itself keeps falling and fades out. Ribbons fall at 30 to 57 px/s and fade slowly (0.05 alpha per second), so streams persist for many seconds and overlap into a dense lower field. The ground is near-black #121210 and the drifting dots are paper white #F2EFE6. Input events are buffered into 40 ms grouping windows; the live loop flushes the buffer on each window tick.

## Interaction

Tap (pointerdown and pointerup with under 12 px of movement) injects a burst of 12 events at the tap point, parsed immediately with no visible lag, plus 12 fresh drifting dots at the same point. Tap is the only interaction; there is no reload, no targets, no scoring, and no game UI.

## Counts asserted

- 4 voice bands: LOW, HIGH, SUB, SUPER-HIGH.
- 12 events per tap burst, verified by probe: ribbon count rose from 31 to 43 on inject at (640, 540) in a 1280x900 render.
- 28 seeded ribbons distributed through the streams zone at load, so all four voices read in frame one.
- Dot population capped at 80, spawned every 0.14 s.
- Frame one is a fixed 6 s deterministic pre-roll (360 steps at 1/60 s); no wall-clock dependence, no unseeded randomness in the first frame.

## Deviations from the prompt

- The follower does not lag visibly behind input: tap bursts flush the 40 ms event buffer immediately instead of waiting for the next window tick.
- 28 ribbons are pre-seeded in the streams zone at load so the parsed machine reads in frame one; a bare 6 s pre-roll left the lower two thirds nearly empty because dots fall slowly.
- Ribbon lengths were lengthened to 60 to 150 px so the streams read as persistent ribbons rather than short ticks.
- Ribbons are clipped to the bottom two thirds so no stream crosses the parse boundary into the drift zone.
- The spec named p5.js; the piece is built in plain Canvas 2D per the house rules (node-canvas QA must render it), with the same event-buffering and band-sorting approach.

## Gallery note

Pale dots drift down as if played by an invisible hand; a follower parses them into four voice-streams that keep falling while the originals fade. Tap to inject a burst of events.
