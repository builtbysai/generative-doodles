# №851 Golden West: process notes

IA5 / PP1251, study #261 iso-attrill. Gallery date 2004 · 05 · 11
(2002-01-10 + (851+1) days, per the formula).

## The piece

A roadside Americana scene in Kodak color: a "Golden West CAFE" sign
left, a red 1950s sedan mid-frame on the asphalt, a white gambrel-roof
barn right, long shadows from a low sun, distant flat-top mesas, a
fence line, a telephone pole with sagging wires, big sky, and visible
film grain over everything. The scene pans slowly as if seen from a
passing car. Tap advances to the next frame of the roll (never
reseed); grain shimmers continuously. No people, no audio.

## Determinism

- FIRST_T = 8 s. The pan is a closed-form drift with a 64 s period,
  zero at t = 8, so frame 0 is mid-pan. Grain shimmer runs on a 2.7 s
  closed-form cycle from a fixed 550-dot seed table (mulberry32,
  seed 851*13+5). No Math.random() anywhere.
- 8 frames from a fixed authored table (FRAMES), index 0 at load.
  Each frame carries its own palette shift, sun position, car
  position, cloud shift, pan phase, sign tilt, shadow length, barn
  door state (open/closed), and loft-window lit state.
- Tap advances the index with a 0.6 s lateral wipe (clip regions, no
  offscreen canvas); double-tap during the wipe is ignored.
- One synchronous frame at load; rAF loop guarded by a typeof check
  and anchored as FIRST_T + elapsed-since-load.

## Tap probes (node harness, /tmp/probe851.js, actual script)

- firstT 8, index 0 at load: PASS
- Same frame at t = 9.5 differs (grain shimmer + pan drift): PASS
- Redraw frame 0 at t = 8 reproduces the original md5 exactly: PASS
- Tap starts a wipe, index stays 0 during the wipe: PASS
- Mid-wipe frame differs from frame 0: PASS
- Double-tap during the wipe ignored: PASS
- After the wipe, index 1, frame differs from frame 0: PASS
- Tap walk cycles indices 2, 3, 4, 5, 6, 7, then wraps to 0: PASS
- All 9 sampled renders distinct (8 frames + frame 0 re-sampled at
  a later t): PASS
- Frame 0 at t = 8 after the full walk reproduces the original md5: PASS

Frame md5s (720x720): frame 0 aeca5fccdd3255ff75a631c5356cf7fc,
frame 1 cdaeed861bf9efdc4b154a0f362ce7d6, frame 2
4b743b8845fb76fb8c62c397bce0988b, frame 3
5cebec2aa9dd8f4f0ae078df8a18206c, frame 4
db95ce42f0d5adec8d4becdd4ebf3dca, frame 5
753b22aee5c14dfba9d12dfd4b0b34c8, frame 6
da567970c9c2902b639d7dfe0ec29b6e, frame 7
440307843059bbe75f5b4978283e8817, frame 0 re-sampled
3dc60be6012b23ee13b37bfd9041081f.

## QA renders

- Desktop 1280x900, mobile 390x844, thumb 720x720: all three
  visually inspected. Sign, car, barn, sky, grain all legible at
  every size.
- Thumb rendered twice, byte-identical:
  aeca5fccdd3255ff75a631c5356cf7fc (both runs).
- Frames 2 (cooler sky, barn door open) and 5 (deep gold, sun low
  left, longest shadows) spot-checked visually; both read as
  distinct frames of the same roadside.

## Fix rounds: 1

1. Sign text touched the board edges (and overflowed on mobile);
   barn roof rendered as a hollow outline; sign shadow read as two
   separate stripes; sign, car, and barn stretched tall on the
   portrait phone stage (heights were in H fractions, widths in W).
   Fixed: font sizes fitted by measureText to the board width; barn
   roof filled as a solid gambrel polygon; sign shadow merged into a
   single quad; sign board height, car body/cabin heights, and barn
   wall/roof heights now derive from their widths, so proportions
   hold at every stage size. Re-rendered and re-gated everything
   after the fix (renders + thumb byte-compare + full tap probe).

## Palette (hex)

- Sky: frame 0 top #7ea6cf, horizon #f0d49a; per-frame sky tops run
  #5f83b0 to #93b6da, horizons #f0c184 to #f3ddb0.
- Field gold #c39a45 (frame 0), road asphalt #6f6a66, verge #8a6f30.
- Car red #b3372a, dark #8e2a20, glass #a8c4d0, chrome #e2e4e0.
- Barn white #f2ede2, shade #cfc8b8, roof #6b5a4a, door #8a4a32.
- Sign cream #f4e8c8, letters #a93226, border #2f5d50.
- Sun core #fad66e, glow #f2b64a, warm tint #d6a450.
- Mesa far #a8907a, near #9a7d68; fence #6e583c; pole #5c4c38.

## Audio

Omitted. No prompt earns audio in this batch; silent build, per the
batch standing rules.

## Deviations

None from the spec. The "Golden West CAFE" sign copy is the
prompt-required artwork text; no other text appears in the piece (no
title plate, date, or hint, per the batch rule).

## Known warts (minor)

- Clouds are flat collage ellipses; deliberately flat, but they read
  slightly stark against the gradient sky at the largest size.
- On the tall phone stage the sign posts run long, since the board
  sits high and the field line is fixed at 0.615 of stage height;
  proportionate to the desktop version, not a defect.

Parent fix round (gate): the in-canvas caption plate (number, title, formula date) and interaction hint were missing; added at the end of draw() in the template place, then re-rendered and re-gated desktop, mobile, and thumb (thumb byte-identical twice). Em dash in the process.md heading replaced with a colon.
