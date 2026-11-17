# №1840 - The Meadow (PS1, PP1087, #241 phillip-sollmann)

Gallery date: 2007 · 01 · 25 (formula 2002-01-10 + 1841 days).
Interaction cue: "Drag a cable to re-patch."

## Driver (the felt phenomenon)

A wall of modular synthesizer racks fills the room, patch cables hanging
between sockets like veins, red and green LEDs breathing slowly. On top of
the rack sits a wooden artist's-model head, the binaural dummy, listening.
Every minute or so unseen hands move one cable and the whole drone shifts
its routing. The instrument is a patchbay, and patching is how it is played:
you pull a cable out of one socket and plug it somewhere else, and the
system plays your routing for a full cycle before the unseen hands resume.

## Mechanism built

- 2D canvas, 4 x 3 rack modules edge to edge, each with 4 sockets, 2 LEDs,
  corner screws and a dim module number. Matte black panels, cable
  red/yellow/blue/white, LED red and green on near-black, warm wood dummy
  head at top center (cranium, face plane, center seam, ear nubs, neck and
  base; no face detail), swaying almost imperceptibly on a 23 s loop.
- 6 cables, seeded initial patching across 12 of the 48 sockets. Cables are
  bezier curves with slack (control points sag below the chord), drawn with
  a dark under-stroke and a plug at each end. Cable brightness follows its
  voice amplitude.
- LEDs breathe with voice amplitude on a closed-form ~3.1 s sine. Each
  cable's voice lights the module its far end plugs into, so a re-patch
  visibly moves the glow across the rack.
- Auto re-patch: one cable per 47 s cycle, from a seeded schedule of 60
  events fixed at load (each event moves one cable's far end to a free
  socket). Routing at any time is a pure function of t.
- Drag: pointer down within 22 px of a cable end picks it up; the free end
  follows the pointer with the cable re-sagging live; release within 26 px
  of a different socket snaps it in, sets a manual patch held for one full
  47 s cycle, and retunes the drone. Release anywhere else drops the cable
  back to its socket. After the cycle the auto schedule resumes.
- Sound: three sine drone voices (cables 0, 2, 4); each voice frequency is
  derived from the socket its cable plugs into, so a re-patch retunes the
  drone. Real WebAudio only lazily inside the first tap on the Sound plate;
  default silent, visuals work with audio off.

## Deviations from the prompt

None material. The prompt's "every minute or so" is a fixed 47 s cycle so
the schedule stays closed-form and deterministic; the dummy head's sway is
kept to 0.012 rad so it reads as listening, not nodding. No knobs, no
keyboard, no preset browser, no piano roll, no drop.

## Fixed frame-one phase

t = 23.4 s: mid-cycle (first auto re-patch at t = 47 s), LEDs mid-breath,
initial seeded patching in place. Seeded PRNG mulberry32(1840) only; no
wall clock, no Date.now, no unseeded Math.random at frame one. Verified by
byte-identical re-renders at 720x720 and 1280x900.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
  thumb; all three inspected and clean (head proportion fixed on mobile by
  capping the head zone by width).
- Drag probe (node harness, real script): pointer down on cable 0 end b,
  drag to a free socket, release. Routing changed 34 -> 0, manual patch
  held until t = 70.4, auto state resumed at t = 71. Auto timer alone also
  changes routing by t = 100. Mid-drag render shows the free end following
  the pointer.
