# №1088 "The Conductor" — Marco Tempest study block MT1 (PP249)

The master image of the Tempest study: the 24 Drone Flight performance
reduced to its grammar. A white void, a lone dark figure standing
center-low with arms raised in the conductor's pose, and above it twelve
black skeletal quadcopters, each carrying a glowing blue-white orb,
holding formations that reconfigure on a fixed schedule. The figure
never moves and never controls anything; the flock obeys by
prearrangement. That disconnect is the piece.

## How it works

- **Choreography, not simulation.** Every drone position is a closed-form
  function of t. Each drone owns one offset in each of three formations
  (vertical stack of paired columns, ring, spiral), all relative to a
  flock centre in the upper two-thirds of the frame. The 60s loop holds
  each formation for 16s, then blends offsets into the next formation
  over 4s with a smoothstep. Seeded micro-sines on top are the
  station-keeping: a few units of slow drift, never free flight.
- **The heartbeat.** All twelve orbs pulse on one shared 4s heartbeat —
  a sharp attack with a slow exponential decay and a softer second
  thump. Glow is three flat-alpha discs per orb (no gradients), scaled
  and brightened by the beat; the core swells with it.
- **The figure's one movement.** The conductor is a static filled
  silhouette except for the arms. While a formation change is under way,
  a transition-activity bump (sin of the blend progress) lifts the hands
  slightly higher and inward — theatrical sync timed to changes it did
  not cause.
- **Palette discipline.** Void #F4F4F2, frames #141418, orbs #BFE3FF,
  figure #0B0B0C, and white marker glints as pinpoints on the frames.
  Nothing else. No text beyond the title, no audio (none specced),
  no interaction — watch-only.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via window.screen physical size with aspect fallback;
  the white void is the page ground everywhere.
- Determinism: the synchronous first frame is drawn at a fixed phase,
  t = 30s (mid ring hold, just past a heartbeat attack); the rAF loop,
  typeof-guarded, continues from that phase plus elapsed time.
- No gradients, no offscreen canvas, no ctx.filter, no shadowBlur, no
  createElement, no microphone, no external assets.

## QA

- Rendered with the house renderer at 1280x800 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Frame one: white void; exactly 12 black drones with prop-guard rings
  and pale-blue orb glows in a ring in the upper two-thirds; the small
  black conductor below center, arms raised. Mobile keeps the full
  composition centered and unclipped.
- thumb.png rendered twice and compared with cmp: byte-identical.
  Duplicate deleted.
