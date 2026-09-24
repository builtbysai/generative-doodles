# Anatoly Zenkov: Study Notes

**Site:** anatolyzenkov.com | **Key works:** IOGraphica (IOGraph), Parametric
Pottery, ColorPicker (js/colors.js) | **Doorway:** meodai credits Zenkov's
idea as the inspiration for poline.

**Depth: deep.** IOGraph Python source read in full (v2.0.2,
github.com/anatolyzenkov/IOGraph), two real IOGraph outputs (the repo's own
9.5-hour dark and light sample renders) inspected at full resolution.
Parametric Pottery info page read end to end; scene 22/192 inspected live via
headless Chrome with software WebGL. The full ColorPicker source
(colors.js, 705 lines) read end to end, and the wheel-plus-palette mechanic
re-implemented fresh in plain canvas and visually inspected.

## IOGraphica: the human as the random walk

The famous one: a background app that records your mouse and turns a workday
into a drawing. It does not record clicks, typing, or screen content, only
cursor positions sampled every 33 ms. The rendering recipe, straight from the
source:

- Movement becomes 0.45 px straight lines between consecutive samples.
  Antialiased, nothing else. The density of overlapping lines is the whole
  texture of the piece.
- Stillness becomes dots. If the cursor stays inside a 20 px drift box, the
  tick counter accumulates radius at 0.3 per tick, roughly 9 px of radius per
  second of stillness. When the cursor finally leaves the box and the radius
  is over 20, it stamps three things: a soft halo (diameter 2r, alpha fading
  as the dot grows), a stroked ring, and a solid dot of diameter
  2*sqrt(radius). The square root is the quiet genius: dot size grows
  sublinearly, so a 10-minute stare does not become a planet. It reads as
  attention, not as an error.
- Color, in the color mode, is direction. The line's angle feeds
  atan2 into a yellow-cyan-magenta loop with lerped segments: hue encodes
  which way the hand was moving. The monochrome mode is black on white.

Two sessions of the same length look nothing alike, because the input is
behavior. A Photoshop session is dense center-field scribble with big reading
dots; a gaming session is sweeping arcs. The 9.5-hour sample renders prove
it: thousands of fine colored lines with neon idle dots on black, or the same
data as an ink-on-paper tangle of black blobs. Time encoded in dot size,
direction encoded in hue, everything else emergent.

## The ColorPicker: the idea behind poline

This is the doorway the meodai study flagged, and it is a direct ancestor.
Parametric Pottery ships an interactive color picker (colors.js) whose model
is:

- An anchor is {a, r, z}: a = hue as an angle on a wheel, r = lightness as
  the radius (center black, edge white), z = saturation as the hidden depth
  axis. This is the exact struct poline uses.
- Two traversal modes between two anchors: LINEAR interpolates the two
  anchor points in cartesian XY on the wheel (a chord through the wheel),
  ARC interpolates angle and radius directly (a curve riding the wheel).
  This is the exact LINEAR/ARC split poline documents.
- Sample distribution along the path is n = 1 - ((count-i-1)/(count-1))^2,
  a quadratic that bunches samples toward the second anchor.
- Everything converts through Bjorn Ottosson's OKHSL (perceptually uniform),
  with a minL floor so palettes never drown in black, plus optional static
  anchor colors pinned alongside the generated ones.

My re-render confirmed what the math implies. With his default anchors, the
LINEAR chord cuts through the dark center of the wheel and the resulting
palette slides through muddy browns: dusty rose to olive to sage. The ARC
path rides the saturated rim and the palette stays vivid: rose to salmon to
tan to olive. Same anchors, same count, completely different weather. The
traversal mode is a compositional control, not an implementation detail.
poline's contribution was to generalize this: more anchors, per-axis easings,
closed loops, hue shifting. The core idea, palettes as paths between anchors
on a wheel, is Zenkov's.

## Parametric Pottery: the curator's eye in the loop

An endless real-time three.js still-life generator, 192 works minted as NFTs
in 2023. Each composition is a 16-character seed key driving: vessel
profiles, sizes, placement, plinth choice, and palette. Two palette modes:
fully generative (vibrant) or a preset of natural shades. Scenes rotate every
few seconds. Keys 1/2/3 save PNGs up to 5760 px, O saves OBJ, S saves STL,
so the pieces are objects as much as images.

Scene 22, inspected live: seven vessels on plinths and blocks against a
terracotta wall with a faint construction grid, teal floor, long hard
shadows. Tall olive bottle behind, teal vase on a tan plinth left, small tan
jar on a white cylinder, white pot on a dark block, one wavy dark vessel
that breaks the symmetry of the profiles. What makes it work is the
arrangement algorithm he tuned by hand: vessels overlap in depth, plinths
vary in height so no two vessels share a horizon, one outlier (the wavy pot,
the teal vase) carries the accent. The natural palette mode keeps everything
in the clay-and-oxide family so the composition does the talking.

## What sings

- Behavior as input: IOGraph never invents a random walk when a real one is
  sitting in front of the screen. The data has a grammar (work rhythms) that
  pure noise cannot fake.
- The sublinear dot: sqrt(radius) is a tiny decision that saves every long
  session from blowing out. Encoding magnitudes with diminishing returns is
  a reusable trick.
- Palettes as paths, not lists: anchors plus a traversal mode plus a sample
  distribution. Three controls, infinite coherent palettes. The wheel is a
  map you walk, not a menu you pick from.
- The curated seed: 192 keys chosen by the artist out of an endless stream.
  The generator proposes, the human disposes. Same discipline as a
  photographer shooting 300 frames to keep 5.

## What is overdone / avoid-list

- Mouse-track art without the encoding discipline is just scribble. The
  idle dots and the direction hue are what lift IOGraph above a screensaver.
  A cursor-trail piece needs its own legible encoding or it is wallpaper.
- Chords through the wheel center produce mud. If a palette path crosses
  low-lightness territory, the middle of the ramp dies. ARC-style traversal
  or a lightness floor is the fix, which is exactly why his minL exists.
- The NFT framing of Parametric Pottery is period dressing. The technique
  (seeded composition engine plus curated keys) stands without it.

## Doorways for future passes

- Bjorn Ottosson, whose OKHSL picker code Zenkov adapted. The original
  misc/colorpicker page is a study target on its own.
- Elastiq's Albers (albers.elastiq.ch), David Aerne's Josef Albers homage,
  cited next to Zenkov in Golan Levin's color lectures.
- Farbvelo, the Elastiq project RampenSau descends from.
