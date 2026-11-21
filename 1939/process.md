# №1939 Two Voices, One Room

- Title: Two Voices, One Room
- Number: 1939 (KD4, PP1186, study #253 kit-downes)
- Gallery date: 2007 · 05 · 04
- Interaction cue: Drag gently to tilt the negotiation.
- FIRST_T: 75 s

## The driver, as a felt phenomenon

Two voices share one room, named for a place, Hugh Lane Dublin. A low
organ voice holds slow chords in the lower half, swelling and receding
on a two-minute breath. A wandering line, a cello thread, a soprano
thread, circles the upper half, approaching and retreating. The two
have different rule-sets and negotiate: when the organ voice swells,
the wanderer quiets and moves to the edges; when the organ recedes, the
wanderer crosses the center and dips toward the bands. Over long
minutes they find a balance and hold it. The duet must remain a
negotiation, so neither voice is allowed to win permanently and a drag
is only a nudge to the coupling, never a steering wheel.

## Mechanism

Two agents with coupled attention variables, all closed-form functions
of simulated time t plus one small interaction state:

- Organ swell s(t) = 0.5 + 0.5 sin(2 pi t / 120 - 0.6), a two-minute
  breath, 0 to 1.
- Wanderer edge-bias = clamp(0.25 + 0.55 s(t) - nudge, 0.05, 0.95).
  High swell pushes the thread to the top and edges; low swell lets it
  cross the center and dip toward the bands.
- Wanderer head: x = center + (0.30W + 0.12W edge-bias) sin(2 pi t / 75),
  y = H (0.46 - 0.28 edge-bias) plus a small 23-second bob. The thread
  is the trail of past head positions over the last 48 seconds, fading
  into the past, with a bright head dot.
- Organ bands: five stacked umber strips filling the lower half,
  anchored at the floor line. Each band's share of the stack breathes
  with the swell on its own slow phase, so the bands trade height while
  the stack stays full. A downward nudge shrinks the stack a little
  from the bottom (bandScale = 1 - 0.30 max(0, nudge)), the organ
  yielding space.
- Drag: a vertical drag toward the bands raises nudgeTarget by
  0.0012 per pixel, clamped to plus or minus 0.3. The nudge eases
  partway at once so the tilt answers the hand, then decays back to
  zero with a 12-second time constant inside draw(), so the duet always
  returns to its own balance. All motion runs under 1 Hz, well under
  the 14 Hz ceiling.

Frame one at FIRST_T = 75: the organ is receding (swell 0.41), the
wanderer is mid-crossing at the center of the upper half and dipping
toward the bands, and the bands fill the lower half. The duet reads at
a glance.

## Drag probe

Probe script: /tmp/probe-1939.js (node, same shim as render-piece.js,
plus a controllable performance.now and a captured rAF callback; reads
the piece's window.__duetProbe hook). A gentle drag toward the bands,
150 px down in 5 steps at 1280x900, then 40 simulated seconds through
the motion loop. All 8 checks passed:

- Baseline at t=75: swell 0.4078, edge-bias 0.4743, nudge 0,
  nudgeTarget 0, bandScale 1.
- After drag: nudgeTarget 0.1800, nudge 0.0976, edge-bias fell to
  0.3767, bandScale 0.9707. The negotiation tilted measurably.
- No voice won at the drag peak: edge-bias 0.3767 and bandScale 0.9707
  stayed inside their bounds (0.05 to 0.95, 0.7 to 1.1).
- After 40 s: nudgeTarget and nudge decayed to 0.0064, edge-bias
  0.3098 against a swell-implied baseline of 0.3163, bandScale 0.9981.
  The duet returned to its own balance, and the organ was still
  breathing (swell 0.4078 to 0.1205 over the 40 s).

One probe fix during QA: the draw() time step was first clamped to a
maximum of 1 second, which made a long forward time jump decay the
nudge by only one second's worth. The clamp is now a floor at zero
only (a backward step never rewinds the state); a long forward jump
decays the nudge fully, which is the correct end state after a long
idle.

## QA renders

Rendered the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: pass. Room reads warm stone with a soft daylight
  wash, title and Hugh Lane Dublin plates legible, thread clearly
  visible mid-crossing with a bright head, bands fill the lower half,
  hint legible on the dark bands.
- Mobile 390x844: pass. Full-bleed, title fits, thread and head read,
  bands fill the lower half, hint legible.
- Thumb, rendered at 720x720: pass. All elements read at small size.
  The PNG itself is 576x576, the desktop square stage at 80 percent of
  the 720 viewport, the same as every prior build.
- Thumb byte-identical across two renders of the same script
  (md5 e8852911ad6a8aac8babac7e61388f0c, twice). First frame is
  deterministic.

Two fix rounds before the pass: the first render had a too-faint
thread and a pale gap between the floor line and the top band. The
thread color was darkened to #a8aeb4 with stronger alpha and width,
the daylight patch was changed from a filled disc to a radial gradient
wash, and the band stack was re-anchored to the floor line with
normalized shares so it always fills the lower half at rest. The hint
gained a soft dark offset so it stays readable if the organ yields and
pale stone shows beneath it.

## Deviations

- Audio: visual-only per the Franke rule. The prompt's organ voice is
  a visual voice only; no WebAudio is built and nothing autoplays.
- The daylight patch is a radial gradient wash rather than a drawn
  window, to keep it from reading as a hard disc.
- The piece exposes a small window.__duetProbe hook reporting the live
  negotiation state, used by the node drag probe. It draws nothing and
  changes no behavior.

## Known warts

- Where the bands meet, the wavy top edge of each band leaves thin
  pale scallop slivers against the flat bottom of the band above. They
  read as deliberate light gaps, so they were kept.
- The thread trail can cross itself on the left of the frame when the
  wanderer's crossing folds back. That is the path folding, not a bug.
- During a downward drag the bottom of the band stack can lift off the
  frame edge and show a strip of stone under the hint; the hint's dark
  offset keeps it readable, and the strip closes again as the nudge
  decays.
