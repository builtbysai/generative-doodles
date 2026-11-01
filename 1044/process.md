# No.1044 "The Screens, Unsynced"

Study #128 kyohei-mouri, PP205 "In and Out of Sync" (discrete figures 2022 moving platforms).

## Concept

Five translucent projection screens ride on wheeled platforms across a dark stage. The screens are the subject; the dancer-blobs are guests. Each screen follows the shared master clock along its own machined route, but carries a sync offset, and the offsets drift: the piece breathes between LOCKED phases, where all offsets sit at zero and the five panels brighten toward white as one instrument, and FREE phases, where each offset wanders on its own period, the panels dim, and their spacing goes irregular. Inside each panel, abstract hue fields drift in screen-local coordinates, so the imagery rides with the canvas. Three small dark point-cloud dancers walk their own slow choreography on the floor line between the screens; the middle dancer's lane crosses the center screen's route, so a screen periodically glides behind it and frames it. The phase relationship is the composition.

## Construction

- Routes (the No.1034 model): each screen runs a closed-form constant-velocity leg out, a dwell, a constant-velocity leg back, a dwell. Hard stops, no easing anywhere. Leg timings are chosen from a fixed table so every full cycle (12, 15, 20, or 30 s) divides the 60 s master loop exactly; positions are pure functions of piece time plus the screen's sync offset.
- Offset-drift schedule (global, on loop time lt = t mod 60):
  - [0, 10) locked: freeAmount = 0, all offsets zero, panels at full lock brightness (alpha up to 0.7, white wash).
  - [10, 16) release: freeAmount smoothsteps 0 to 1.
  - [16, 44) free: freeAmount = 1. Each screen's offset = wanderAmp (seeded 1.2 to 2.4 s) times a sine on its own wander period (30, 20, 60, 15, 12 s across the five screens; all divide 60, so the loop closes). Panel alpha varies per screen between 0.25 and 0.5 on a slow 30 s brightness phase.
  - [44, 50) gather: freeAmount smoothsteps 1 to 0.
  - [50, 60) locked.
  - Frame one at t = 17 s sits just inside the free phase: offsets near full wander, brightness varied screen to screen.
- Interaction state is a recorded event list, never integrated state: drag records a conductor point (live while held, then a release event decaying over 1.6 s) that pulls nearby screens' effective free amount toward zero and lifts their brightness; tap flips one screen between locked and free with a 0.8 s blend from its previous base value; double-tap reseeds the whole choreography from a new mulberry32 seed.
- Projection: three soft blobs per screen, drawn as three layered flat-alpha ellipses (0.09 / 0.13 / 0.18) clipped to the panel rect, positions closed-form in piece time. No gradients, no shadowBlur, no offscreen canvas anywhere in the piece.
- Dancers: 14-dot humanoid point clouds (#0B0C0E), positions and walk cycle closed-form; legs and arms swing on the step phase, body bobs on the absolute step sine.
- Audio (lazy, typeof-guarded, created only inside the first pointer gesture; silent in QA): five sine voices near 196 Hz unison, each detuned by its screen's live offset and lifted slightly by its speed, gains rising as the global lock returns, so drift is literally heard as the unison dissolving into five voices; dancer footfalls are short low sine clicks fired when a dancer's step index changes. No microphone, no autoplay.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence (no AudioContext, no requestAnimationFrame in the harness; frame one is the synchronous draw at fixed t = 17 s).
- Determinism: thumb.png rendered twice and byte-compared identical (cmp clean), duplicate deleted; re-verified after every fix round.
- Read-back, final renders: dark #08080A stage; five tall translucent pale screens on dark wheeled platform bases with mast, base and two wheels each; soft pink, green and cyan projection blobs glowing inside the panels at varied brightness (leftmost panel brightest, fourth dimmest at frame one); screens 3 and 4 mid-crossing at center; three tiny dark dot-cluster dancers on the floor line, the middle one reading clearly against the center screens' bases, the right one faint in the open gap as specced for a dark guest; nothing clipped on desktop, thumb, or mobile (all five screens stay five and whole at 390 wide).
- Fix rounds: (1) the outer screens' glide ranges carried their panels off the left and right frame edges; travel is now clamped per screen to the room its home position has, velocity preserved. (2) The dancers at 0.085H stood entirely below the panels and were invisible against the stage; dancer height raised to 0.19H with a contact shadow, so heads and shoulders cross the pale panel bottoms and the figures read.
- House checks: Visual Viewport sizing with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen min dimension under 700 px with aspect fallback only; grep-clean for Date.now, Math.random, gradients, shadowBlur, ctx.filter, offscreen canvas, getUserMedia, external URLs and em dashes; zero visible text besides the title element.

## Deviations

- Palette swaps: the prompt has two crossing screens swap projections. A literal swap at the geometric crossing instant needs crossing detection; instead each screen's palette index cycles on a staggered 20 s schedule, so neighboring panels visibly exchange hues over the loop while every state stays a closed-form function of piece time. Recorded here per house rules.
- Glide clamp (fix round 1 above): edge screens travel a shorter leg than their seeded length when the full leg would leave the frame; constant velocity and dwell structure are unchanged.
- Dancer scale (fix round 2 above): 0.19H is larger than a literal reading of "small," chosen so the specced dark ink (#0B0C0E on #08080A) remains legible at all; against the 0.50H panels the figures still read as guests, roughly a third of panel height.
