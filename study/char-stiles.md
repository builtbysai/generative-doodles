# Char Stiles: Study Notes

**Date:** 2026-09-26
**Artist:** Char Stiles, charstiles.com. Computational artist, educator, and
programmer; livecode.nyc collective member and organizer; creator of
Shader.Place; co-creator of CARL (Code Augmented Reality Live); formerly MIT
Media Lab Future Sketches. Gigs: Alexander Wang, VIA Festival, School for
Poetic Computation, Electric Forest, Mutek Nexus.
**Doorway:** Olivia Jack / Hydra study, "the scene around the tool rather
than the tool itself."

**Depth: deep.** Full OSSTA 2021 lecture transcript read end to end (with
Golan Levin Q&A); four of her own lecture slides and four video stills
visually inspected; her livecoding-performance stills inspected; the CARL
AR-sync demo still inspected; her full shader workshop page read; two of her
workshop shader gists read verbatim (fundamental polar, backbuffer); the
Shader.Place repo read (README, editor.js collaboration core,
defaultShaders.js); her GPU "fake ASCII art" technique re-rendered locally
in Python/PIL and visually inspected.

## The two identities

She names them herself: avid livecoder, online workshop teacher. The
teaching and the performing are the same practice pointed in two
directions. The workshop page is the clearest window into her visual
vocabulary: polar coordinates first, then palettes, then shapes, then
backbuffer feedback. Each checkpoint is a gist of 30 to 80 lines of GLSL,
commented like a friend explaining over your shoulder ("who remembers SOH
CAH TOA?", "sin returns -1 to 1, colors are 0 to 1, so thats why you only
see red on the screen half the time").

## Ray marching as performance medium

Her preferred livecoding medium is ray marching: whole 3D scenes in one
fragment shader, marched live. She sells it in the lecture as "pseudo
physically-based rendering" with a pedagogical hook straight out of art
history: ray marching runs Plato's emissive theory, where eye feelers leave
the viewer and bounce around. Her slide pairs the marching diagram (first /
second / third iteration, distance circles, the "hit!") with Johann Zahn's
1702 engraving "The Radiating Eye." A stranger in her workshop leaves
knowing both SDF stepping and a 1702 theory of vision. That pairing,
physics concept welded to an old picture, is her signature teaching move
and it transfers straight to performance: the lecture audience gets the
story while the visuals do the work.

The visual signature in her performance stills: soft cos-palette flows
(IQ's cosPalette is in her backbuffer checkpoint verbatim), low-contrast
pastel washes in pink/purple/green in one clip, saturated psychedelic
swirls in another. All of it reads as "typed live" rather than composed:
gradients that keep moving, never a locked frame. Avoid-list note from the
still frames: the pastel wash can slide into screensaver territory when the
motion is slow and the contrast is low. Her stage photos show the cure: the
code is projected as large as the visuals, `dir(toLook)` and
`random(uv)*2.` legible from the back row. The audience watches two
performances at once, the typing and the picture, and the typing is half
the show.

## Shader.Place: the social dimension as a tool

Shader.Place is a realtime collaborative GLSL livecode editor, built during
her 2021 OSSTA residency. The mechanism is the stock stack for shared
editing: CodeMirror plus Yjs CRDT plus y-websocket, one room per name.
The README's TODO list is the honest design doc: per-user caret colors,
usernames above carets, undo manager, backbuffer texture input, webcam
texture input, audio bins. She demoed it in the lecture by opening a second
laptop on stage and editing the same room live, a yellow caret marking the
"other Char."

Her answer to "why another shader editor" is the important part, and it is
a position, not a feature list: build the perfect tool for you and your own
circle first; a tool that works for your friends is the only honest place
to start making tools for anyone else. The proof she offers is a story,
not a benchmark: two of her workshop students, Ilithya and Eliza, met in
her class, then used Shader.Place together on the Curiously Minded Twitch
stream. The tool closed a loop from teaching to friendship to a shared
performance. She describes her tools as rolling into toolchains that
inspire each other.

## CARL: code broadcast into AR

Co-created with Chirag Dave, CARL (Code Augmented Reality Live) broadcasts
the code to every phone connected to the server, and the phones render the
shader updates live in AR. The demo still shows a laptop and a phone side
by side, the same black-and-yellow flow pattern on both, "UPDATED IN REAL
TIME" overlaid. She debuted a piece called "Fastest Integer Multiplier"
with it at Amant Gallery. The technique is straightforward (push the
fragment source over a socket, recompile on the client), but the staging is
the idea: the audience's own devices become the venue, and every screen is
in sync with the keystrokes.

## The fake ASCII art: Lissajous cells keyed to luminance

From the amt-lab interview, her most distinctive standalone technique. She
wanted ASCII art without any image import, GPU only. The recipe, from her
description:

1. Compute the source picture on the GPU (a shader scene, no textures).
2. Tile the screen with a grid of cells. Each cell holds one Lissajous
   curve, x = sin(a*t + d), y = sin(b*t), cheap on the GPU, "like people
   swing paint around" into figure-eights.
3. For each cell, sample the source picture's darkness there, and draw only
   that fraction of the curve's segments. Dark area, more of the curve;
   light area, almost none.

The re-render (study A) confirms the mechanic reads: at 44x44 cells with a
3:2 Lissajous and 48 segments per stroke, a procedurally computed test
scene (two blobs plus a ring) resolves clearly as darker textured regions
against light voids. The per-cell curves are all the same shape, so the
tone comes entirely from how much of the curve is drawn, exactly like
character density in ASCII art, except the "characters" are continuous
strokes. Her framing is the part to steal: ASCII art was a workaround for
having no GPU; bringing it back onto the GPU on purpose is a deliberate
anachronism, and the piece knows it.

Honest gaps: her live performances were inspected only as stills (the
videos themselves were not watched); her MIT "Cursor Sketches" and
"Comments on Code" projects were not opened; the shaderplace demo site no
longer resolves, so the editor UI was read from source, not seen running.

## Core techniques, as stealable recipes

- **Checkpoint pedagogy.** Teach in 30-line checkpoints, each adding one
  concept (polar, palette, shape, backbuffer). The comments are the
  curriculum: every line earns its place by being explained out loud.
- **IQ cosPalette as the house palette.** `brightness + contrast * cos(2pi
  * (osc*t + phase))` with per-channel phase offsets driven by time and
  space. Cheap, smooth, infinite.
- **Backbuffer feedback for memory.** `texture2D(backbuffer, uv - offset)`
  mixed with the fresh frame. The picture remembers itself; motion leaves
  trails without any particle system.
- **Lissajous-cell tone mapping.** One parametric curve per cell, drawn
  fraction proportional to luminance. Continuous-stroke ASCII.
- **Collaborative carets.** Yjs CRDT over websockets, per-user caret
  colors, room names as the only addressing. The social protocol is the
  UI.
- **The code is the show.** Project the editor at performance scale. The
  typing is half the piece.

## Seeds for future pieces

- 103, 104, 105 appended to FUTURE_PIECES.md.

Evidence: /tmp/stiles/ (lecture slides img_009/010/013/015.png,
performance stills, CARL still, re-render script + A/B outputs).
