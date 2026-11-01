# №1364 "Declaration" — process notes

Raven-chacon RC5 (PP587), after *Declaration* (2026). A field of seventy
police-whistle marks in loose parade formation, each exhaling a visible
breath-streak on a shared breath clock. Drag is the crowd's breath: gesture
density raises the visual volume.

## What is on screen

- 70 whistles, exactly (10 columns × 7 rows, by construction), in a loose
  parade formation: seeded jitter plus a slight per-row arc offset, so the
  grid reads as a formation without ever looking machined.
- Each whistle is a flat shape: yellow body (#E8C51A), small mouthpiece, a
  bowl circle with a charcoal pea hole. About 12% (seeded) are warning red
  (#B3282D). No other iconography, no slogans, no uniforms, no flags.
- Breath-streaks: each whistle exhales a tapered flat-alpha streak in its
  facing direction (mostly upward, ±0.45 rad seeded variation), plus two thin
  side lines. Streaks are breath white (#F2F2F2) at low alpha over the
  charcoal ground (#1A1A1A).
- Subtitle: one row of invented pseudo-script marks (dashes, dot pairs,
  chevrons, arcs) centered near the bottom edge, breath white at 0.35 alpha.
  It carries no wording of any kind.

## The shared breath clock (8 s, fixed phase)

- Exhale 0–3 s (smoothstep ease), hold 3–4 s, retract 4–6 s,
  rest/regroup 6–8 s, then the cycle repeats.
- Frame one is phase-shifted 1.5 s into the cycle, so it opens mid-exhale
  with streaks already visible (a fixed offset, so frame one stays
  deterministic).
- During the rest phase the formation tightens: the jitter scale dips
  smoothly to 0.4 mid-rest and relaxes back to 1 — the regroup, as a
  closed-form function of piece time.

## Drag = the crowd's breath

- Pointer drags are recorded as samples (position + piece time). Two
  closed-form boosts derive from them:
  - Global: sum of exp(−age/1.5) over recent samples, capped, scaled to
    streak length/brightness for every whistle.
  - Local: per-whistle Gaussian falloff (110 px radius) times the same
    decay, so streaks near the drag path swell most.
- Both boosts decay after release; nothing about the drag persists.
- Drag never reloads, never reseeds, never counts as a tap. There is no tap
  action in this piece.

## Adaptations (all recorded here, per the brief)

- **Subtitle / locale:** the prompt's "subtitle updates from device locale"
  is refused in its literal form. The piece never reads device locale and
  never renders a real place name — a locale-derived real name would be
  readable English and would break frame-one reproducibility across
  devices. The subtitle is seeded pseudo-script marks only.
- **Audio:** the prompt's filtered-noise "whistle breaths" are
  gesture-gated, per the house audio rule. Filtered noise (bandpass
  ~2200 Hz, seeded noise buffer) swells ONLY while the pointer is dragging,
  through lazily created, typeof-guarded WebAudio inside the pointer
  gesture; on release the gain ramps to zero. The 8 s clock itself is
  visual-only and never sounds. No autoplay, no microphone, no
  getUserMedia anywhere.
- **Rendering:** canvas 2D throughout. No offscreen canvas, no gradients
  (the streaks are flat-alpha triangles and lines), no shadowBlur, no
  Path2D, no createElement. Whistle bowls use one arc per shape with its
  own path and a moveTo first (the node-canvas batched-arc quirk).
- **Determinism:** frame one is draw(0) via a boot flag; the clock starts
  only with the rAF loop (plain function declaration behind a typeof
  guard). All randomness comes from mulberry32 streams (seed 1364000),
  never Math.random. The audio noise buffer is also seeded, and audio
  never affects the canvas.
- **Viewport / phones:** canvas size comes from the Visual Viewport API
  with window-size fallback, resize listeners on both, and the canvas
  pinned in draw() with style width/height in px. Phone detection uses
  window.screen physical size (min dimension < 700 px) with the aspect
  fallback; the field composition goes full-bleed on phones.

## Verification

- Rendered at 1280×900, 390×844, and 720×720; all three inspected.
  Desktop: 7 rows × 10 columns of whistles, streaks fanning upward,
  pseudo-script subtitle row at the bottom. Mobile: same formation
  full-bleed, no clipping.
- Probe harness (piece's own pointer listeners, hand-driven rAF clock;
  streak pixels counted as R,G,B all > 60, which excludes yellow bodies,
  red bodies, and charcoal ground):
  - Breath clock: t=2.5 (hold, breath=1) → 5,572 px; t=5.5 (rest,
    breath=0) → 483 px (subtitle residue only). The shared clock works.
  - Drag boost: at t=2.0, a drag across the middle row → 13,841 px vs
    5,572 px undragged. Drag density more than doubles the visible
    breath volume, concentrated near the drag path (confirmed visually
    in the probe render).
- Thumb rendered repeatedly: byte-identical every time.
- Token scan: no Math.random (one comment states it is never used),
  no createElement, no Path2D, no getUserMedia, no gradients, no
  shadowBlur, no navigator/locale/geolocation reads. AudioContext
  appears only behind typeof guards inside pointer handlers.
