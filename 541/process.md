# No.1674 Hash Becomes Painting (TH3, study #220 tyler-hobbs)

Driver: watching a hash string turn into a painting makes determinism theatrical, the same string always grows the same field, and the viewer watches chance become inevitable.

## Mechanism

A fixed table of six authored 64-hex strings is the mint queue, one per
cycle, in order. The cycle is 138 seconds: hash assembly over 10 seconds,
field growth over 60, a 60 second hold in the finished state, then an
8 second dissolve before the next hash begins assembling. There is no
re-roll and no preview: the field is empty until its hash resolves.

The string is the actual input. FNV-1a over the full string feeds
mulberry32, and slices of the string set the features: characters 0-1
pick the weighted palette, 2-5 set turbulence, 6-9 set block scale,
10-13 set density. A spec line under the hash strip prints the derived
values for the current mint, so the viewer can see the string deciding
the painting.

The field is the Fidenza engine from TH1: layered value noise, capsule
blocks laid along streamlines, capsule collision through a spatial
hash so no two blocks touch. At the start of a cycle the whole layout
is built once from the seeded RNG at a fixed field phase; growth then
replays that layout in placement order, showing floor(progress times
block count) blocks, so growth is a deterministic replay at drawing
speed rather than fresh chance.

During assembly, unresolved characters scramble at 8 Hz from a
deterministic mix of mint seed, character position and tick. During
dissolve the hash unresolves from the end and both hash and field fade
together.

## Layout

Square plotted sheet: a thin hairline frame, hash strip across the top
third with a small caption and the 64 characters on two lines of 32,
a divider, the spec line, and the growing field below. On desktop the
sheet is 86 percent of the short side, centered on warm paper
(#EFE6D4) with dark ink hash text (#191512). On phones the sheet spans
the full width, centered vertically. Title and date sit in a dark
plate at the bottom left inside the sheet, "Watch only." at the bottom
right. Flat fills only, no gradients. Watch-only, never click-to-reload.

## Mint table

Six authored 64-hex strings, verified 64 characters each, hex only:

1. a3f9c21e7b4d08a619e5f7c2d08a3b5e6c1f94a2b7e03d584a92c6f10d5b7e39
2. 51c8e0a4f7a2b6938d04e1c53b9f6a72e04d18c9a6b35f0792e7c41d5f08a3b6
3. 9e27b4f1c058a3d67f1a9e40b3d682a51c8f5e97d4a036b86e59c2f0a1b743d9
4. 2d6a19c884b3f0e50a7e42d9f91c5b375a03e8f6c2b9741d8f46a0c3e7d195b2
5. f0c4a7193e8b2d569a1f7c034d6b89e27c2a5f18b908d3a61e5c74f963a0b8d4
6. 68b5e3a1d1f09c475e3a8b20a94f6d1c0b7e2a59f3c186d48a4d0e7629f1c5b8

Mint 1 derives palette cobalt, turbulence 0.98, scale 0.81, density 1170.

## Cycle timing

Assembly 10 s, growth 60 s, hold 60 s, dissolve 8 s, cycle 138 s.
Frame one is t = 34 s: mint 1 fully resolved, field 40 percent grown,
so the thumb shows both the hash and the growing field.

## Determinism

Frame one uses only fixed inputs: the authored hash table, FNV-1a
seed, mulberry32, fixed-phase noise, and a fixed reveal fraction.
No unseeded Math.random, no performance.now or Date-dependent layout.
The layout is rebuilt only on a cycle change or a sheet-size change,
always from the same seed, so the same size always renders the same
frame. Verified: the 720x720 thumb and the 1280x900 desktop render
both re-rendered byte-identical (same md5 on a second run).

## Deviations from the prompt

- The prompt names SHA-256 as the hash-to-seed step. crypto.subtle is
  async and breaks node-canvas QA, so a small synchronous FNV-1a over
  the string feeds mulberry32 instead. The string still genuinely
  seeds the PRNG, and no fake hash is shown.
- The prompt does not specify a dissolve duration; 8 seconds was
  chosen so the dissolve reads as a slow unmaking rather than a cut.
- The PP920 palette tables were not included in this brief, so the
  weighted palettes are the study's tables as realized in TH1 (sand,
  cobalt, bone), with the palette index read off the hash string.

## QA

Rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile and 720x720 thumb; inspected all three.
Desktop: sheet centered, hash fully resolved on two legible lines,
cobalt field growing in lanes, plates legible, hairline frame clean.
Mobile: sheet full-bleed width and centered vertically, hash and
plates legible, no clipping. Thumb: hash plus growing field both
visible, plates fit inside the sheet. No legibility, clipping or
composition defects found; no fixes needed after first render.

## Gallery

Title: Hash Becomes Painting. Date: 2006 · 08 · 12. Note ends with the
interaction cue: "Watch only."
