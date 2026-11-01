# №1232 — The People in This Picture

Christina Battle study block CB1 (PP391), after her datamosh work on downloaded
eyewitness photographs of the 1987 Edmonton tornado: alter the codes, let the
image crash, de-spectacularize the disaster. Corruption as ethics — the captions
stay plain and factual while the picture falls apart, and once a cycle the frame
"repairs" into a clean photograph for three seconds. The repair is the lie.

## The photograph

The clean image is procedural and flat, built once per scheduler cycle as a list
of shape records in unit space: two storm-grey sky bands, a low cloud bank, a
tapered segmented funnel silhouette at a hashed x with a debris swirl at its
base, two grain elevators with dome tops, six block houses kept out of the
funnel's path, tree clusters, telephone poles with sagging wires, a field, and
a road with centre dashes.

## House adaptation: corruption as data transforms

The prompt specs byte-level corruption applied to a pixel buffer. The house
renderer has no pixel buffer, so the datamosh is computed as **data transforms
on the scene's shape records**, driven by a single crash-depth parameter
d ∈ [0, 1] — the house's computed-corruption precedent (Menkman/Satrom pieces).
Never real encoding, never a glitch-filter preset. Four transforms, layered:

1. **Row-band displacement** — the scene is drawn in horizontal bands (~4.5% of
   frame height); each band is shifted horizontally by a seeded hash amount
   that grows with d^1.5 and jumps every 0.12 s. This is the P-frame smear's
   backbone.
2. **Channel-split silhouettes** — at d > 0.35 the whole scene is redrawn twice
   at partial alpha, offset left in corrupted magenta #B03A6B and right in
   macroblock green #3F7A52, so colour bleeds off every edge.
3. **Macroblock fractures** — a 14×11 block grid; blocks whose hash falls under
   d × 0.55 are redrawn from displaced source positions, and a subset is tinted
   over flat in magenta, green, or warning yellow #E3C447.
4. **P-frame streaks + rain-lattice** — horizontal streaks carry the colour
   sampled from the shape under their origin; at d > 0.55 a diagonal hatch in
   the corrupted colours drifts across the frame.

One build bug worth recording: the first channel-split pass painted the frame
solid green, because the shape renderer set the context alpha per shape and
silently overwrote the pass alpha. Fixed with a pass-alpha multiplier the shape
renderer respects.

## Crash scheduler

Time runs in 26 s cycles; every change is quantized to 0.12 s steps — datamosh
moves in jumps, never smooth morphs. Per cycle, all hashed:

- **Repair window** — starts at 2.5–8.5 s into the cycle, lasts exactly 3 s,
  d = 0: the clean photograph, untouched.
- **Three crashes** — each attacks in three steps from the idle depth (~0.25)
  to a peak of 0.78–0.96, holds ~0.9 s, then decays back down in five steps.
- **Idle** — between events d rests near 0.25 with small stepped jitter.

## Captions

Five captions, verbatim, one per cycle, rotating: "the funnel stayed on the
ground eleven minutes" / "the grain elevator held" / "everything smelled of
rain" / "the power went out at 4:47" / "nobody on our street was hurt". Each
opens just after its cycle's repair, in the calm stretch, set in Courier in the
low-third band. The band is **protected**: it is painted after all corruption
passes and no streak, block, or hatch ever enters it. On narrow screens the
caption shrinks to fit rather than clipping.

## Interaction

- **Horizontal drag** scrubs corruption depth (left = clean photo, right =
  full byte-collapse) as an offset on the scheduler's d — a forensic tool, not
  a toy. On release the scheduler resumes over 2 s, in steps.
- **Double-tap** reseeds the caption sequence (rotates the rotation).
- No sound. No click-to-reload.

## Determinism

First frame is drawn synchronously at the fixed phase **T0 = 7.78 s**: cycle 0,
crash 0's second attack step, **d = 0.649**, with caption 1 showing. The rAF
loop (typeof-guarded) is anchored as T0 + elapsed since load; all variation
comes from seeded integer hashes. Verified: the 720×720 thumbnail rendered
twice is byte-identical; a temp render inside the cycle-0 repair window
(T0 = 4.40 s, discarded) confirms the clean photograph — funnel down at the
town line, elevators, houses, wires, road — that the corruption spends the
rest of the cycle destroying.
