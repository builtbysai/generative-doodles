# №1335 "Red Stage" — rashid-johnson RJ8 (PP502)

## Source
Rashid Johnson's *Red Stage* with Creative Time, Astor Place, June 5–Jul 4, 2021:
"a metaphorical and literal platform for activation, occupation, and animation...
'A place to witness and be witnessed.'" This is the only prompt where touch =
additive presence — the piece is a platform, not a picture.

## Frame one (t = 0, verified at 1280x900, 390x844, 720x720)
An open public platform at dusk, shot from slightly above, full-bleed. Dusk sky
in layered flat-alpha bands from #2E2A3A at top to #6E5A4A at the horizon, with
one strong dusk light source: a warm layered glow near the horizon that slowly
shifts (60 s sine on alpha, 90 s sine on position). Below, a plaza stone field
(#4A4A48) with faint seeded joint lines and a dusk shadow wash. At center, a
simple red-painted stage (#A31621 front face, #B01E28 top surface, #7E1018
base edge) drawn in canvas pseudo-3D: a trapezoid top surface over a front
face, with a flat-alpha cast shadow down-right. On the stage, left to right:
a chrome microphone stand, a stack of three dark-cloth books, a wood stool,
and a clay pot with green leaves. Around the plaza periphery, faint ghost
crowd figures (#1E1C1A, alpha 0.28–0.56) drift on slow sines — peripheral and
ghostly, never the subject. The stage is EMPTY at loop start: every presence
must arrive through interaction. No visible text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)
- Idle: the stage sits empty and the dusk light slowly shifts; the crowd
  drifts; nothing else happens. No autoplay, no sound of any kind.
- Touch the stage: an "activator" appears — a dark silhouette sprite that
  performs a small gesture loop on a 3.2 s cycle (4 frames at 0.8 s each):
  raises a book, plays a silent instrument, dances two steps, or reads.
  Gesture order advances in a fixed seeded sequence, never random. Each
  activator fades in over 1 s, gestures for 20 s total, fades out over the
  last 3 s, then dissolves back into the crowd.
- Cap: up to 6 activators share the stage, each in its own stage slot on its
  own gesture loop. When a 7th touch arrives, the oldest still-standing
  activator dissolves over 2 s. The stage never empties itself and never
  reloads — only the viewer adds.
- Drag: pans the plaza view (closed-form decay, tau 2.5 s after release,
  clamped to ±40 px horizontal / ±24 px vertical). A drag never adds an
  activator; only a tap (movement under 12 px) on the stage rect does.

## Adaptations (documented, per the brief)
- 2.5D scene via canvas pseudo-3D only; no WebGL, no three.js.
- Dusk light and sky as flat-alpha bands and layered ellipses; NO gradients
  (the QA renderer cannot render them reliably).
- Crowd as a drifting particle field of plain silhouette sprites (no props).
- Activator gestures as dark silhouette sprites with 3–4 frame loops; no
  detailed characters, no faces, no stage-light show, no applause sound,
  no instructions text on the stage. Silent throughout.
- Frame one is draw(0) via a boot flag; the clock starts with the rAF loop
  (plain function declaration, per the №1278 lesson). All variation comes
  from seeded mulberry32 streams; never Math.random.

## Fix rounds
1. Crowd figures first drew the "reads" gesture prop (a book at the chest).
   Fixed: gesture -1 now draws plain arms at the sides, no prop.
2. Cap flaw found by probe: when the oldest active activator was already
   dissolving, re-marking it never freed a slot, so rapid taps exceeded the
   cap of 6. Fixed: the cap now dissolves the oldest still-standing
   activator, skipping ones already dissolving.
3. Slot collision found by the same probe: dissolving activators still
   counted as occupying their slots, so rapid taps stacked in slot 5.
   Fixed: a dissolving activator vacates its slot for the newcomer.

## Verification
- Rendered at 1280x900, 390x844, 720x720; inspected all three. Desktop and
  mobile both read: empty red stage with mic, books, stool, plant; ghost
  crowd at the periphery; dusk glow near the horizon.
- Thumb rendered three times plus a final re-verification after process.md
  was written — all `cmp` byte-identical, matching the finished index.html.
- Interaction probe (custom node harness driving the piece's own rAF loop
  and pointer listeners, temp files only, discarded): tap adds one
  activator (+405 dark pixels in the stage band per figure); a second tap
  adds a second; a drag pans without adding; 7 rapid taps settle at exactly
  6 figures (3083 dark pixels vs 679 baseline). A probe render at 12 s
  shows six silhouettes on stage in distinct gesture poses.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, shadowBlur, gradients, or offscreen canvas.
