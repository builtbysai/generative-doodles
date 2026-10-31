# No.648 - Las Dos Orejas

EXPANSION #78 paulo-cox, prompt block 8 "Dos Orejas". From Paulo Cox's Choshuenco
post: the volcano "mostrando sus dos orejas: el torreon Norte y Sur", the two
towers North and South, as a symmetry generator.

## Concept

A near-black field holds one volcano built from two mirrored towers rising from
a shared broad base cone, snow caps clipped to each tower, a shallow crater
notch at the vertical center. The pair is bilaterally composed but never
perfectly symmetric: the seeded jitter is the point. The piece is watched, not
touched: over a 30 second cycle the mountain breathes (a slow global scale
oscillation of plus/minus 1.5 percent about the base anchor) and once per cycle
a faint amber glow pulses in the crater notch over about four seconds, then
goes dark. No lava, no eruption, no text, no dragging. Double-tap reseeds a new
pair of towers.

## Construction

- Single self-contained index.html, canvas 2D, strict palette: ground #0C0F14,
  tower mass #2E3A4A, tower shadow #1E2836, snow #E8EDF2, crater amber #E8A33D.
- The profile is one ordered point list in normalized coordinates (u in
  [-1, 1] across the base, v = height above the base line): left foot, left
  shoulder, left peak, notch floor with a slight center dip, right peak, right
  shoulder, right foot. Each flank segment is subdivided and given a small
  seeded hand wobble (tapered to zero at the key points), so the silhouette is
  hand-placed rather than machined.
- Asymmetry is drawn per arrangement from mulberry32 in a fixed order: taller
  side, height delta, lean of the taller tower, lean of the shorter tower,
  notch half-width, notch depth, shoulder height, snow cap depth, and the
  taller tower's extra cap depth (its snow line sits lower relative to its
  peak). The two towers are independent peak heights and leans around a shared
  notch, not one mirrored stamp.
- Shadow is a single diagonal facet in #1E2836 running from the crater notch
  down across the right base half, clipped to the silhouette.
- Snow caps are constructed from the profile itself: the run of profile points
  above each tower's snow line, with interpolated crossings on both flanks,
  closed by a jagged lower edge (five seeded dips) whose endpoints are tucked
  toward the peak so the edge stays inside the widening flanks. Snow follows
  the tower shapes by construction.
- Breath and pulse are pure functions of the anchored elapsed clock (rAF
  timestamps, offset plus elapsed since load, never Date.now). Breath scale is
  exactly 1.0 at t = 0. The pulse envelope is sin over t in [13, 17] of each
  30 s cycle, drawn as three layered amber ellipses at low alpha in the notch.
- Double-tap (two pointerdowns within 350 ms) advances the arrangement index
  and rebuilds; single taps and drags have no handler effect. Reseeds are
  counter-seeded (648001 + index x 7919), so every arrangement is reproducible.
- Canvas size comes from the Visual Viewport API with resize listeners on
  visualViewport and window; draw() pins canvas.style.width/height in px.
  Phone detection via window.screen (min dimension under 700 px) with aspect
  fallback (h > w x 1.15); on phones the volcano widens relative to the frame
  and its height fraction drops so nothing clips. rAF is typeof-guarded; the
  first frame is drawn synchronously at t = 0. No audio, no microphone, no
  offscreen canvas, no filters, no gradients.
- QA hook (house standard): ?t=<seconds> freezes the synchronous frame at that
  loop time so the headless renderer can verify later states.

Launch arrangement (seed 648001), recorded asymmetry deltas:

- Taller tower: LEFT, peak v = 1.0000; right peak v = 0.9401 (deltaH 0.0599,
  about 6 percent taller).
- Lean: left peak offset -0.0266 u (outward), right peak offset +0.0087 u.
- Notch: half-width 0.0709 u, floor at v = 0.5886 (drop 0.3515 below the
  shorter peak).
- Snow lines: left v = 0.7534 (cap depth 0.2466 from its peak), right
  v = 0.7464 (cap depth 0.1937 from its peak). The taller tower's cap is the
  deeper one (capShort 0.1937 + capExtra 0.0529), per the prompt's lower snow
  line on the taller tower.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three
  read back: two snow-capped towers with a center notch on near-black, left
  tower visibly taller, shadow facet on the right base, vast dark margins,
  nothing clipped on mobile, no text.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical;
  second render deleted. Frame one is the synchronous draw at t = 0 (breath
  scale exactly 1.0, crater dark).
- Crater pulse verified with a state-forced throwaway render at ?t=15
  (720x720, /tmp): the amber glow sits in the notch, faint and layered, at the
  peak of its envelope. Throwaway deleted after read-back.
- Grep confirms zero Date.now, Math.random, createElement, AudioContext,
  gradients, or shadowBlur in the file.
- Fix rounds during QA: (1) the snow caps' jagged return edge initially poked
  a tiny white sliver outside the flank; endpoints were tucked toward the peak.
  (2) The return edge was then traced in the wrong direction, making the cap
  polygon self-intersect (a dark wedge cut from the cap plus a detached snow
  fleck below the line); the trace order was corrected. Final renders are
  clean: caps sit tight on both peaks.

## Deviations

None from the prompt. Two implementation notes: the prompt's tower shadow
color is realized as the base's shadow half plus the right inner facet (one of
the two options the prompt offers), and the house-standard ?t= QA hook is
present but inert in normal viewing.
