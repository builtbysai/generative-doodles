# No.978 — Mirror, Dreaming

Study #120 (daito-manabe + kyle-mcdonald), PP139 "Transformirror".

## Concept

A tall mirror that does not reflect the room: it re-dreams it. A dark
humanoid silhouette stands at the center, nobody in particular, no face,
no clothes, its pose a slow idle sway. Around and through it a dream
blooms: first an astronaut tableau, then a coral reef, then a neon
forest. Across the top the current prompt types itself out in small
mint mono text, holds, deletes itself, and the next dream blooms from
the old one. The dream never quite holds still: every edge shimmers
with the low-amplitude flicker of frame-by-frame re-imagination. That
flicker is the mechanism, not a defect. No branding, no loading state:
the mirror is furniture that happens to dream.

Specced prompt texts, verbatim, cycled in order:

- "an astronaut drifting above the earth, cinematic"
- "a coral reef breathing in slow currents"
- "a neon forest after rain, glowing paths"

## Construction

Single self-contained canvas 2D file. All state is a closed-form
function of (piece time, recorded events). Piece time starts at a
fixed offset of 16 s, so frame one is drawn synchronously at load:
astronaut dream fully bloomed, prompt fully typed, silhouette
mid-sway. No wall clock feeds any drawn state; the animation loop
only accumulates rAF deltas onto that fixed start.

Dream cycle: 45 s per dream. The prompt types at one character per
60 ms, holds, then deletes at 30 ms per character starting at 41 s.
During the first 3 s of each cycle the incoming scene blooms in
(smoothstep crossfade with a slight lateral drift) over the outgoing
one. Scene index and phase come from a cycle base that tap events
re-base, so an advance is just a re-anchoring of the same formulas.

Scenes are seeded shape lists (mulberry32; astronaut seed 97801,
reef 97802, forest 97803), drawn each frame in a 1000x1000 unit space
mapped onto the frame with a cover transform, so key elements sit in
the central safe zone and decorative structure can bleed off the
edges like scenery past a window. The silhouette is layered ellipses
(head, neck, shoulders, torso) in #1A1D24 with #B8C4D4 rim arcs on
its right side; its sway, bob and lean are slow sines of piece time
only, so the pose persists unchanged across dreams, drags and wakes.

Shimmer: a hash clock buckets piece time into 0.4 s steps; each shape
draws with a per-shape, per-bucket pseudo-random offset of up to
1.5 px (integer hash of shape index and bucket). Layer alpha also
breathes slowly. Nothing is ever pixel-stable, by design.

Interaction:

- Tap: advance to the next dream now. The mirror blinks (a 0.2 s
  dark dip) and the new dream blooms. A tap is held 0.35 s of piece
  time so a double-tap can pre-empt it.
- Drag horizontally: the next dream blends in with weight equal to
  drag distance over 35 percent of the frame width. Release past
  halfway commits the advance; release short of it eases the blend
  back to the current dream over 0.4 s.
- Double-tap: wake. The dream fades out over 0.8 s, the mirror stays
  clean for ten seconds (silhouette and rim light only, on dark
  glass), then the dream blooms back over the last 2 s.

Audio is lazy and typeof-guarded, created only inside the first
pointer gesture: a looped filtered-noise airy wash, tiny square-wave
key ticks while the prompt types, and a soft triangle chord swell
voiced per scene when a new dream takes over. Waking drops the wash
to silence. In the QA renderer there is no gesture, so the piece
renders in complete silence.

Palette:

- Mirror ground #07080C; silhouette #1A1D24; rim #B8C4D4; prompt
  #7DF9C6.
- Astronaut set: panels #C9CFDB, Earth-ocean #2E7DD1, glow #D8FFE8,
  floating tools #8A8D84.
- Reef set (recorded as specced for this build): coral #E8875A,
  sand #D8C49A, sea #1E5D6B; fish and light shafts borrow the glow
  tone.
- Forest set (recorded as specced for this build): trunks #2A2118,
  canopy #3CC86B, magenta accents #FF4FD8; the glowing path dots
  alternate accent and glow tones.

Sizing comes from the Visual Viewport API with resize listeners on
both visualViewport and window; the canvas style size is pinned in
px on every draw. Phone detection follows the house rule
(window.screen minimum dimension under 700 px, aspect fallback);
the mirror is full-bleed at every size and the silhouette scales
with the scene height.

## QA log

Rendered with the house node-canvas renderer (no rAF, no
AudioContext, no gradients used anywhere):

- qa-desktop.png (1280x900): astronaut dream; panel grid and
  outlined cells, ringed porthole upper right, big blue Earth disc
  low center-left with pale swirl arcs and a glow rim, gray floating
  tools, star specks; dark silhouette centered with the light rim on
  its right side; mint prompt line fully typed along the top.
- qa-mobile.png (390x844): cover mapping crops the scene sides; the
  silhouette, Earth and prompt remain whole and legible, nothing
  essential clipped.
- thumb.png (720x720): the full square composition as specified for
  frame one.

Determinism: thumb.png rendered twice and byte-compared with cmp;
identical. The duplicate render was deleted. Frame one never reads
Date.now or any wall clock; the only time source is the guarded rAF
loop accumulating deltas from the fixed 16 s offset.

## Deviations

- Reef and forest palettes: the brief fixes the astronaut set and
  names reef/forest tones inline; those inline values (reef coral
  #E8875A, sand #D8C49A, sea #1E5D6B; forest trunks #2A2118, canopy
  #3CC86B, accents #FF4FD8) are adopted verbatim and recorded above,
  held to a shared brightness discipline so no dream shouts over the
  others.
- The dream cycle crossfade sits in the first 3 s of each 45 s
  cycle, overlapping the prompt typing, rather than during the
  delete: the bloom and the first typed characters arrive together,
  which reads as the mirror thinking the new dream up.
- Drag blend uses absolute horizontal distance (either direction
  steers toward the next dream), per the brief's "drag is the
  interpolation weight" rule.
