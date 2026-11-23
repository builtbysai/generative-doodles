# Literal Idiom — No.487 (EXPANSION #58 giuliadallara, prompt GD7)

## Concept

Giulia Dall'Ara's "Fatto con i piedi" mechanism, deadpan: an idiom taken
literally and painted on a vessel. A cream-slip amphora stands centred on a
sage ground. Around its belly, a band of bold black footprints strides in a
row. At the shoulder, a coral-red band carries the fragment "CON I PIEDI" in
cream block caps. Nothing explains the joke; there is one motif, one short
phrase, and four flat colours only: cream slip #F2E8D0, black #1A1A1A, coral
red #D9622B, sage #9AA87E.

A tap reseeds the piece: a new seeded vessel profile and the next pairing
from a small idiom-to-motif table (feet / "CON I PIEDI", hands / "IN MANO",
eyes / "A OCCHI APERTI", tongues / "LINGUA LUNGA", ears / "ORECCHIE APERTE"),
cycling in order so every pairing stays legible. The load state is the fixed
house seed, so the first vessel is always the feet pairing, her original.

## Construction

Single self-contained index.html, 2D canvas, no external assets.

- Seeded RNG: mulberry32. House seed 487007; each tap adds 1013 to the seed
  and advances the pairing table by one.
- Vessel: a lathe half-profile of thirteen seeded control points (rim,
  neck, shoulder, belly, taper, foot), each radius jittered by the seed.
  The silhouette is drawn from the right side and mirrored on the left, so
  the vessel is exactly symmetric, with a flat rim line and a flat base.
- Handles: two vertical loops from neck to shoulder, drawn behind the body
  as a thick black stroke pass followed by a thinner cream pass, leaving a
  black outline where they meet the ground.
- Belly band: bounded by thin black rules, filled with the vessel's cream,
  and clipped to the vessel silhouette with a canvas clip path on the main
  canvas. Five glyphs stride across it, alternating mirror flip, tilt, and
  vertical step; the outer glyphs are clipped by the silhouette so the band
  reads as wrapping around the belly.
- Foot glyph: one filled shape for the sole (wide rounded ball, concave
  arch on the inner side, narrow rounded heel) plus five toe discs that
  shrink from the big toe and overlap the top of the sole, so the glyph
  reads as a footprint at band size. The other motifs are drawn just as
  plainly: a hand (capsule fingers, thumb, filled palm), an eye (almond
  outline, black iris, cream glint), a tongue (coral U with a centre line),
  and an ear (two black arcs).
- Phrase band: a coral rectangle at the shoulder, clipped to the
  silhouette, with a thin black rule along its lower edge. The phrase is
  set in a bold system sans, block caps, and letter-spaced by drawing it
  character by character; the size steps down until it fits the vessel
  width at the shoulder.
- Ground and page background are the sage. The only other copy is the
  word "tap" in the lower-left corner, black at low alpha.
- Canvas size comes from the Visual Viewport API, with resize listeners
  on visualViewport and window; draw() pins canvas.style.width/height in
  px every frame. Phone detection uses window.screen (min dimension
  under 700px), with the aspect ratio h > w*1.15 only as a fallback. The
  composition keeps its shape on phones; vessel height is capped by both
  frame axes so nothing is clipped.
- No audio, no microphone, no requestAnimationFrame, no offscreen canvas,
  no element creation. The first frame is drawn synchronously at load
  from the fixed house seed; nothing is derived from the clock.

Deviation: the brief describes the half-profile as bezier. A first build
that stroked bezier segments between profile points rippled at every join
and the QA renders showed a scalloped, wavy silhouette, so the final code
keeps the seeded profile control points but interpolates them with a
smoothstep and samples the outline at 72 steps per side. The profile is
still a seeded lathe half-profile, mirrored; only the curve evaluation
changed, because the renders demanded it. A related fix from the same QA
pass: the sampled path now draws the flat base explicitly (an early
version's base slanted), the handles were tightened from wide ovals to
close vertical loops, and the toes were enlarged and overlapped onto the
sole after the first render showed them as detached dots.

## QA log

Renderer: node ~/workspace/tools/render-piece.js index.html at the three
sizes below. No rAF, AudioContext, document.createElement, or offscreen
canvas is used, so the headless renderer runs the exact load path.

- qa-desktop.png (1280x900): symmetric cream amphora centred on sage,
  close vertical handles, coral shoulder band with "CON I PIEDI" legible
  in cream block caps, five black footprints striding across the belly
  band between its rules, the outer pair clipped by the silhouette.
- qa-mobile.png (390x844): same composition at phone size, vessel fully
  inside the frame, phrase and feet still legible, "tap" hint in the
  corner, nothing clipped.
- thumb.png (720x720): the vessel reads instantly as an amphora; the
  footprints read as feet (toe row plus arched sole); flat graphic look
  in the four palette colours only.
- Determinism: thumb.png rendered twice and compared with cmp; the two
  files were byte-identical. The second render was deleted.
- Iteration: three render passes. Pass one failed on a rippled bezier
  silhouette, oversized oval handles, and toes too small to read. Pass
  two fixed the toes and handles but the base slanted and the narrow
  stem wobbled. Pass three (current files) fixed the profile and base;
  all three sizes were re-rendered and read back clean.
