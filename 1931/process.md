# №1931 Still Life - process notes

Driver: a faded sepia-green lake photograph that rewards staying still, with the halftone grain itself becoming the subject.

FIRST_T: 75. The bird loop is 240 s: crossing on a slow diagonal for the first 150 s, resting out of frame for 90 s. At t = 75 the bird is exactly mid-crossing at frame centre.

## How it works

- Layered static scene: sepia sky with a low sun haze, a seeded far-shore treeline (46 trees, two tones), lake-green water deepening toward the viewer, faint tree reflections, and slow horizontal shimmer strokes.
- Torn paper border: a cream frame drawn as part of the image, its ragged inner edge fixed by seed with a slow flutter displacement (sin, 0.10 rad/s, about 1.5 px), plus a soft shadow along the tear.
- Halftone grain: 3,200 seeded dots over the whole photograph, each breathing on its own phase, time-quantized to 0.5 s steps so the grain shimmers instead of flickering.
- The bird: a soft-black two-wing sprite with a slow wingbeat (about one beat per 6 s), rising from lower left to upper right across 150 s.
- Watch only. No pointer handlers, no audio. All motion under 1 Hz.

## Deviations from the prompt

- None in mechanism. Hexes were hand-picked from the prompt's named colors because studies/chris-hyson.md does not exist in the repo (404): faded sepia #b49b72, lake green #6d8570 / #3e5446, paper cream #efe6cf, bird soft black #2b2b26.
- The bird's rest period (90 s of each 240 s cycle) is an interpretation of "crosses the frame once every few minutes": it is absent between crossings rather than looping instantly back.

## Fix log

1. First render: torn-edge ring used lineTo for its first point, connecting from the rect subpath. Fixed by passing an isFirst flag through traceEdge and using moveTo.
2. Hint sat on the torn bottom border and straddled the tear. Raised to H-40 desktop, H-48/H-30 mobile, fully inside the photograph. Re-rendered all three sizes.

## Known warts

- The treeline reads as lollipop canopies on thin trunks; the prompt's "trees along a far shore" is satisfied at gallery scale, but the trees are stylized rather than photographic.
- On phones the bird is small (about 5.5% of the short side) and easy to miss at first glance; that is in keeping with the prompt's slow reveal, but the first frame on mobile leans heavily on the grain and the treeline.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually.
- Determinism: desktop re-render md5 identical (5088f613e5d3f9e7a9e54f6698a676a5).
- Bird-loop probe: FIRST_T temporarily set to 30, rendered 1280x900, md5 278200766252c105d757f438226fa58a; bird at lower left versus centre at FIRST_T 75 (md5 5088f613e5d3f9e7a9e54f6698a676a5). Probe file deleted; shipped index.html still carries FIRST_T 75.
