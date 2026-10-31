# No.821 - The Loops of Nine, Ten, Eleven

EXPANSION #100 rhys-chatham, PP6. Chatham's solo Riley-loop era: three tape-delay loops of 9, 10 and 11 seconds (Pythagorean Dream) carrying the same phrase, drifting out of phase forever.

## Concept

Three concentric rings on near-black - teal (inner), rust (middle), violet (outer) - each carrying the same short stroke phrase as a bright arc-segment train. The copies never agree for long: the rings' periods are truly 9 s, 10 s and 11 s, so the phrases slide past each other continuously, and each train drags a 12-second trail of fading past-phase copies that layer and stretch beyond the phrase's endpoints. A visitor can draw a new phrase with a drag; the three loops take it up on release and resume drifting. A double-tap clears the rings bare. No grid, no metronome marks, no text: the drift is the music.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets. Palette strict: rings teal #2E7D74, rust #B3552E, violet #7A6FA8, ground #0B0B0E. The only visible text is the <title>.
- Rings centered, radii 0.235 / 0.330 / 0.425 of min(viewport) (outer ring diameter 85% of the frame; on phones the spread widens slightly to 0.44 for the outer ring). Base rings drawn dim at alpha 0.38.
- A motif is a phrase in ring space: segments {off, len, rad}, off/len in radians along the ring from the phrase origin, rad a radial wobble in [-1, 1] drawn at R + rad * gap * 0.5. The default motif is seeded (mulberry32, seed 821407): five segments, lengths 0.09-0.24 rad with small gaps, rad a clamped random walk in [-0.85, 0.85].
- Timeline model (closed-form, segment list). State at any time t comes from the containing segment {t0, motif, phase0[3]}: phase_i(t) = phase0_i + 2*pi*(t - t0)/PERIOD_i. The initial segment's phase0 values carry fixed virtual elapsed times (3.1 s, 5.7 s, 8.2 s of travel), so frame one is already mid-drift with the three copies at visibly different phases and full trails developed. Frame one is the synchronous draw(0); nothing in the drawing path reads Date.now.
- Trails: 10 ghosts per ring at ages 1.2 s .. 12.0 s (trail life 12 s), each evaluated through the same stateAt() at t - age, so a ghost older than a motif change correctly shows the previous motif. Ghost alpha = 0.45 * (1 - age/12)^2.4; ghost segment lengths scale by 1 + age*0.02, the copies blooming beyond their endpoints. The head is two passes: a wide pass (2.7x core width, alpha 0.20) under a core pass (alpha 0.96). Because the 9 s ring's period is shorter than the 12 s trail, its oldest ghosts wrap just past a full revolution - the prompt's own layering, kept and left faint.
- Period / drift math (proof the periods are exact):
  - PERIODS are the literal constants 9, 10, 11 in the phase formula; each ring's phase is computed from its own period with no shared divisor, quantization, or snapping.
  - Relative drift rates: inner vs middle 2*pi*(1/9 - 1/10) = 2*pi/90 rad/s, a full lap gained every 90 s; middle vs outer 2*pi*(1/10 - 1/11) = 2*pi/110 rad/s, a lap every 110 s; inner vs outer 2*pi*(1/9 - 1/11) = 4*pi/99 rad/s, a lap every 49.5 s.
  - All three phrases realign only at lcm(9, 10, 11) = 990 s.
- Interaction: pointer drag captures a polyline (shown live in violet while drawing). On release the stroke is resampled to at most 6 segments in ring space - each segment's angular span about the center and its radius relative to the middle ring - and pushed as a new timeline segment whose phase0 continues from the current phases, so the copies take up the new phrase without a positional jump. Double-tap (two taps within 0.35 s, the prompt's own specced mechanic) pushes an empty segment: rings bare, ready for a fresh drag. A single tap does nothing.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700) with aspect h > w*1.15 as fallback only; rAF typeof-guarded and the QA renderer has none, so the piece draws frame one synchronously and stays static there; seeded RNG only; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; no audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared identical (duplicate deleted, re-verified after the tuning pass below).
- Read-back, desktop and thumb: three concentric rings on near-black filling the frame; a bright five-dash phrase head on each ring at clearly different phases (teal lower-left, rust upper-left, violet top), each head leading a tapering comet of fainter dashes; radial wobble visible where dashes ride off the base ring line. Nothing clipped.
- Read-back, mobile: rings whole and centered in the tall frame, phrase heads visible on all three rings, nothing clipped.
- Tuning pass during QA: the first build's trail falloff (exponent 1.7) left the oldest ghosts nearly as visible as the mid-trail, so the rings read as dashed circles and the heads were hard to pick out. Steepened the falloff (exponent 2.4, ghost alpha 0.45) and raised the head glow pass to 0.20; heads now lead clearly while the 12 s trail still layers around the rings as specced.
- Deviations from the prompt text, with reasons:
  - The drawn seed motif is stored as an angular phrase (angle about the ring center, radius relative to the middle ring) rather than as the raw screen polyline, because one phrase must ride three different radii; the visitor's stroke shape is preserved as arc span and radial gesture at all three sizes.
  - Frame one is phased mid-drift via fixed virtual elapsed times rather than starting all copies at phase zero: three copies leaving the same point in unison would hide the piece's subject (the drift) in the thumbnail, and the phase constants keep frame one exactly reproducible.
