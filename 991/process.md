# No.991 "Palm-Sized Dancers"

Study #121 motoi-ishibashi, PP152 "Microdrone Ballet": the hardware side of
discrete figures. Five palm-sized microdrones fly a tight ballet at center
stage; the system that watches them (four corner capture cameras, sweeping
scan lines, position-lock rings, the 2.4 GHz command band, and a
camera-view ghost panel) is enormous by contrast. The scale contrast is
the piece: tiny dancers, huge infrastructure.

## Concept

- Five amber microdots hold seeded formations at center stage. Around
  each, its IR-LED frame draws as a faint dashed diamond in amber at
  0.25 alpha: almost invisible, a secret the cameras keep.
- Four tripod capture cameras sit at the stage corners, each sweeping a
  thin mint scan ray across the stage on its own seeded interval.
- Each drone carries a position-lock ring: on a per-drone cadence the
  ring snaps to the position the drone occupied 100 ms earlier, holds,
  and fades.
- Along the top edge, the 2.4 GHz band renders as a dark strip with a
  cyan waveform; its amplitude swells on command bursts (every phrase
  transition, every visitor tap).
- Bottom-right, the ghost panel shows the stage as the cameras see it:
  black, with only the five drones as bright white dots at their true
  positions.
- Watch-only core. Tap: command burst, the band spikes and the
  choreography jumps to a reform on your mark. Drag: an occlusion
  shadow follows the drag and lingers 10 s; scan lines skip the zone,
  lock rings inside wobble and fade, drones inside drift. Double-tap:
  a new ballet (reseeded formations, solo spots, and camera corners).

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
  Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw()
  every frame. Phone detection via window.screen (min dimension
  < 700 px) with the aspect fallback; page ground is the stage tone, the
  band stays at top, the ghost panel bottom-right, the drones central.
- Choreography is closed-form. A 17 s phrase cycle: HOLD a formation
  (8 s), ease to seeded solo spots (2.5 s), solo hold (4 s), ease to the
  next formation (2.5 s). Formations (pentagon, diamond-plus-center,
  line, V, cross) and solo spots are per-cycle hash functions of the
  seed, with a per-cycle rotation; moves use an ease-in-out cubic and
  holds add a small hover bob. Drone position is a pure function of
  effective piece time.
- Taps are recorded events. effTime(t) folds the tap list into the
  timeline: each tap adds the phase shift that makes the REFORM move
  begin exactly at the tap, so the ballet breaks and reforms on the
  visitor's mark while every drawn value stays a function of (t, events).
- Lock rings: snap period per drone is hash-derived (3.7 to 5.3 s);
  phases are anchored to the fixed frame-one offset so drones 0 and 2
  are freshly snapped at frame one and the rest have faded (the series'
  scripted-first-frame rule). Ring position is the drone's position at
  snap time minus 0.1 s; the envelope ramps in fast, holds to 0.9 s,
  and is gone by 2 s.
- Band waveform: two summed sines over x, amplitude scaled by
  burstEnv(t), the sum of exponential decays from every phase
  transition (computed in effective time, converted back to real time)
  and from visitor taps, plus a burst-frequency shimmer term.
- Scan lines are drawn as 12 px steps from each corner camera; a step
  whose midpoint falls inside the active shadow is skipped, so the ray
  visibly breaks around the occlusion.
- The ghost panel is a clipped rect on the main canvas (no offscreen
  canvas), mapping true stage coordinates into the panel.
- Audio is lazy, typeof-guarded, and created only inside the first
  pointer gesture: a high, quiet rotor bus (1180 Hz sine + 1765 Hz
  triangle through a lowpass, the drones are small and the sound says
  so), a radio blip on command bursts and phrase transitions, a tiny
  3 kHz tick when a lock ring snaps, and a soft scan tone that drops
  out entirely while a shadow is active (the silence is the shadow).
  All audio event detection runs by diffing closed-form indices
  (phrase segment, snap index) between frames; the visual piece is
  complete in silence and the QA renders run without an AudioContext.
- Interaction timing: a tap only becomes a burst after 0.35 s
  disambiguates it from a double-tap; the recorded tap time is the
  original press time, so the phase math uses when the visitor acted.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
  All render cleanly in silence; the script registers only the
  visualViewport/window resize listeners and canvas pointer listeners
  in the headless shim.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Frame one is the synchronous draw at the fixed offset
  T0 = 17 s: cycle 1 offset 0, the instant a REFORM lands, so the
  formation is freshly held (pentagon family at this seed), the band
  ripples at full burst envelope from the arrival command, rings sit
  freshly snapped on drones 0 (age 0.25 s) and 2 (age 0.6 s), and four
  scan rays fan from the corners. No wall clock feeds any drawn state;
  grep-verified clean of Date.now, gradients, shadowBlur, ctx.filter,
  offscreen canvas, external references, and em dashes.
- Read-back, desktop: dark stage, cyan waveform band across the top,
  small tripod glyphs at all four corners, faint mint rays crossing,
  five tiny amber dots in a held formation at center with barely-there
  dashed diamonds, two mint lock rings (one still trailing its drone,
  which has just finished converging: the 100 ms capture lag made
  visible), and the ghost panel bottom-right holding five white dots
  in the same arrangement.
- Read-back, thumb (720x720): same composition at gallery size; the
  drones read as a small amber cluster, the rings and band carry the
  system scale, ghost panel legible.
- Read-back, mobile (390x844): stage fills the tall frame, band at
  top, drones central and whole, ghost panel bottom-right with all
  five dots, nothing clipped.

## Deviations

- The rotor whir is one shared high bus rather than one oscillator
  per drone; the brief-sanctioned simplification. The per-drone
  sounds (command blip, lock tick) remain exact, and those are the
  sounds that carry mechanism.
- Snap phases are anchored constants rather than pure hash output, so
  the composed frame one holds at every viewport size; periods remain
  hash-derived per drone. Recorded here per house rule; the cadence is
  otherwise exactly as specced.
- The occlusion shadow is drawn as a soft black disc with a dashed
  system-gray edge so the visitor can see where their shadow is; the
  prompt leaves the zone's own rendering unspecified, and an invisible
  zone would make the scan-line gaps read as bugs rather than as the
  system losing its grip.
