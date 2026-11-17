# Tuyshtak, No.1850

Driver: six clarinet players in a semicircle on a wooden stage, seen from above and slightly behind, each with a floating translucent fingering ladder overhead; the ladders light rung by rung and slowly bend toward one pure just-intonation chord until all six align into one ladder.

## Build notes

- TW3, PP1097, study #242 theresa-wong. Formula date 2007-02-04, displayed "2007 · 02 · 04".
- Counts asserted: six players, six ladders, seven rungs per ladder. Verified in the renders: all six black silhouettes sit on the arc, all six strips rise above them, each strip shows seven rungs.
- Palette hand-picked from the prompt's named colors: warm stage wood (#6E4A2E planks with darker seams and grain), black clarinet silhouettes (#0D0906), diagram lines in bone white (#E8DCC8), deviation numerals in faded red (#B4553F).
- Deviations cycle [-31, +4, -14, -31, +4, -14] across the six players, printed small in faded red beside every rung and once more at the top of each strip.
- Convergence: a cosine breath over a 600-second cycle, aligned at the midpoint. Ladder x positions, rung grids, and lit-rung phases all interpolate toward a single shared ladder as convergence rises. Frame one is fixed at t = 60 s, early in the convergence, so the six ladders still read as six.
- Lit rung advances one rung every 2.2 s per ladder, with a per-player phase offset that melts away as convergence rises.
- Audio: six sawtooth voices through bandpass formant filters on a just-intonation chord over Bb2 (ratios 1, 9/8, 5/4, 4/3, 3/2, 5/3), each carrying its player's cents offset, gliding toward unison as the ladders converge. Audio is created only inside the first pointer or key gesture, never autoplay.
- WATCH ONLY. No controls, no click-to-reload. The first gesture only unlocks sound and changes nothing visual; the timeline advances on its own.
- Deterministic first frame: fixed phase t = 60 s, seeded RNG (mulberry32) for planks, grain, and per-player offsets. No wall clock, Date, or unseeded random in frame one. thumb.png is a deterministic re-render of frame one (two renders md5-identical).
- House rules: Visual Viewport sizing with resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen with aspect fallback, stage full-bleed on every screen, requestAnimationFrame guarded by typeof, reduced-motion respected.

## Deviations from the prompt

- The convergence breathes on a 600-second loop (aligned at the midpoint, then opening again for the next phrase) instead of arriving once and stopping, because the piece is a motion loop and a one-way arrival would freeze the frame. The arrival itself is exactly as specced: all six ladders align into one ladder.
- Audio starts only on a first tap or keypress, per the house rule that audio is lazy inside the first gesture and never autoplay. That gesture changes nothing visual; the piece has no controls and stays watch only.
- The semicircle arc is drawn as a faint ellipse through the six player positions, and the players are compact top-down silhouettes (body, head, clarinet with bell) rather than full figures, which is what reads at this scale from above and slightly behind.

## QA

Rendered with node render-piece.js from the actual script at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected. Two defects found and fixed: end players and their ladders were clipped off-frame (arc narrowed from 195-345 to 210-330 degrees, radius 0.54 to 0.46), and a stray chord line from the arc path plus a deviation label clipped by the title plate (arc moveTo corrected to the arc start, label moved inside the strip top). Final renders clean at all three sizes.
