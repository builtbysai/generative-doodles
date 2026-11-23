# No.1063 Echo Vest

Study #130 hideaki-tai, HT8 / PP224: the echo haptic cloth, rendered as the sensation, not the garment. An unseen wearer drifts in a dark room; rings of light radiate from them through the cloth, brighten as they cross the edge of what the cloth can feel, and fade at the walls. No figure, no sonar display, no sweep lines, no grid.

## Concept

- Room #050506, full-bleed. One fixed perception boundary circle (#5A4A7A, alpha 0.35) at 0.6 world units, where one world unit is half the short side of the frame (60% of the frame radius).
- The wearer is never drawn. Their position is a pure function of piece time: a seeded set of 7 waypoints inside the inner third of the frame (radius 0.10 to 0.27), joined by smoothstep-eased segments of 5.5 s of path time.
- Rings are the sensation made visible: thin (about 2.3 px) violet #B388FF circles emitted from the wearer's position at emission time, expanding at a constant 0.047 units/s, alpha fading as (1 - r/1.6)^1.15 from a 0.38 base. Near the wearer the color mixes toward warm #FFF2D6 (full warm at r = 0, pure violet by r = 0.4).
- Sensing: a ring whose radius is near the boundary radius brightens, alpha multiplied by (1 + 2 * gauss((r - 0.6)/0.035)) and a slightly heavier stroke. At frame one the ring emitted at t = 18.0 s sits at r = 0.611 and carries the boost, which is the bright ring in the renders.

## Construction

- Emission model (closed form): normal emissions every 1.2 s during the moving part of each 25 s cycle (t_k = 25c + 1.2k, k = 0..18). Each cycle ends in a pause: path speed ramps down over cycle phase 21-22, holds at zero 22-24, ramps back up 24-25 (trapezoid speed profile; its integral is analytic, so path time is a closed-form function of t and advances exactly 22 per cycle). During the pause window (phase 22-25) the wearer is effectively stopped and emissions tighten to every 0.4 s (8 extra rings per cycle from the frozen position). At any t, live rings are all emissions with t - LIFE <= t_k <= t, LIFE = 1.6/0.047, roughly 34 s, giving about 33 live rings at frame one. Ring centers are frozen at the wearer's position at t_k, so the drifting wearer leaves eccentric, overlapping ring families.
- Pause pulse: during phase 22-25 a pulse point is drawn at the wearer, three layered white discs with intensity sin(pi * (phase - 22)/3)^1.5. At frame one (t = 31 s, phase 6 of cycle 1) no pulse is active; what shows instead is the released pause packet from the first pause (emissions at 22.0 to 24.8 s), now a dense tight ring family around r = 0.29 to 0.42, plus the warm young rings around the wearer's current center-left position and the boundary-brightened ring at r = 0.611.
- Frame one is the synchronous draw at fixed phase T0 = 31 s; the rAF loop (typeof-guarded) replays from T0 plus elapsed time. Everything before input is a pure function of t: no Date.now, no gradients, no shadowBlur, no filter, no offscreen canvas, no audio anywhere.
- Interaction: drag makes the visitor the wearer (pointer samples recorded as a time-stamped segment; ring centers for emissions inside the segment come from the samples). Holding the finger still for over 1.2 s tightens extra rings out of the finger at the 0.4 s pause interval and builds the pulse point, mirroring the seeded pauses. Release hands the body back to the seeded path. Double-tap reseeds the waypoint set; the reseed is a recorded event, and wearer positions for earlier times still resolve through the seed that was active then, so older rings keep their centers.
- Sizing: canvas from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(). Phone detection via window.screen min dimension < 700 px, aspect fallback. Rings scale with the short side, so on the 390 px phone render the whole ring field and boundary sit centered and legible.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean renders, no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Desktop read-back: near-black room, a dense family of thin violet rings at many radii centered left of middle, innermost rings warm-tinted, one clearly brighter ring at about 60% radius (the sensing ring), the fixed boundary circle barely visible, a tight packet of rings mid-field from the released pause. No figure, no sweep lines, no blips, no grid, no text.
- Thumb read-back: same composition at 720x720; the warm center, the dense packet, and the bright boundary ring all read at thumbnail size.
- Mobile read-back: field centered in the portrait frame, ring density and the bright ring legible at 390 wide, nothing essential clipped (outer rings exit the frame edges by design, as they do on desktop).
- Grep checks: no Date.now, no gradient, no shadowBlur, no ctx.filter, no createElement, no getUserMedia, no AudioContext, no em dashes. Zero visible text besides the title.

## Deviations

- None from the brief's model. Two small judgment calls, recorded: the pause pulse window spans the full stop (phase 22-25) rather than only the fully stopped core (22-24), so the release reads as part of the same breath; and ring stroke weight grows slightly (x1.35) inside the sensing band so the boundary brightening survives thumbnail scale.
