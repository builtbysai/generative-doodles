# №1261 — Workmare Lamp (esther-hz EH6, PP420)

Night desk scene. A lamp built from office junk — mug base, binder-clip
arm, sticky-note shade #E8C547 — throws a flat pool of glow over the desk,
and in its flicker three crude stop-motion anxiety creatures scurry: a mop
with legs, a door with a face, a jittery coffee ring.

## Mechanics

- Strobe dial (bottom right on the desk): drag around the dial to set the
  rate, 1–12 Hz on the dial. The visible flicker is clamped to ~8 Hz, and
  the strobe gates only the lamp glow disc and creature visibility, never
  the full frame; the background stays #1E1B16 at all times.
- Creatures step one pose per flash (4 poses each). At the clamped top end
  the pose pins to the mid-pose: too fast freezes them mid-pose. Below
  2 Hz the off-phase goes fully dark: too slow loses them in the dark.
  Mid rates give the full stop-motion scurry.
- Tap a creature to freeze it as a specimen: a gold-bordered box with the
  creature drawn large and the label "desk anxiety no.N" (mop 1, door 2,
  ring 3). Tap anywhere else to dismiss.
- Double-tap reseeds: new seeded jitter, paths, and poses; the specimen
  clears.

## House adaptations

- The prompt's 1–12 Hz strobe is dial-readable but visibility-clamped to
  ~8 Hz and scoped to the glow disc plus creatures, per the house flash
  discipline. No full-frame flash anywhere.
- No typed input, no audio, no visible text except the specced specimen
  label. The dial shows tick marks and a needle, not numerals.
- Frame one is a fixed phase (t = 0, default rate 4 Hz, strobe on, pose 0,
  creatures at path starts). All state — dial rate, taps, reseeds — is a
  closed-form function of recorded event lists and t.
- Phone scale: on phones the scene scales from width (W/760) instead of
  the desktop min-dimension scale, so the desk strip stays legible at
  390 wide.

## QA

Rendered with node-canvas from the shipped script at 1280×900 desktop,
390×844 mobile, and 720×720 thumb; all three inspected. Two fix rounds:
creatures enlarged ×1.8 and the glow disc reduced (300→210 units) after
the first pass drowned them; phone scale switched to width-based after
the first mobile pass rendered the desk strip too small to read. Thumb
rendered twice from the final index.html, byte-identical. A forced-state
temp copy (tap injected on the mop at frame one, discarded after) verified
the specimen box and the "desk anxiety no.1" label. Token scan clean of
unseeded randomness, element creation, offscreen canvas, filters, blur,
gradients, and audio/mic APIs.
