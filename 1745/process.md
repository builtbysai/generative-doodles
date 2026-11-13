# No.1745 "Primitive Complexity" (PP992, ZM2, #229 studio-zimoun)

Date: 2006 · 10 · 22. Gallery note: "One box, one motor, one cotton ball, then its clones, none ticking together. Drag to perturb the prototype."

## Driver

One observed prototype unit, perturbed by hand, whose rhythm the clones inherit but never share. The piece is the act of watching: a single box-motor-cotton unit ticking alone in a pale studio, then the frame filling with its identical copies, each one disagreeing about the beat. The mechanism is the point, not the crowd: an articulated wire arm on a pivot, a spring that pulls it back to its own rhythm after a drag, and a multiplication that copies the period but never the phase.

## Build

Canvas 2D only. The prototype is drawn large and centered: a tan box with lid seams and corner screws, a black motor block on the lid, a cotton ball as a cluster of six white puffs, and a wire arm on a pivot at the motor top. The arm angle is a closed-form function of piece time: 0.52 rad sine at the prototype period of 2.4 s, plus a damped spring response summed over recorded drag impulses (omega 5.2 rad/s, damping 0.55/s). Dragging on the prototype adds an impulse proportional to the pointer delta; the arm visibly deflects and springs back to its own rhythm.

Multiplication schedule: no clones before t = 8 s. Clones appear one per second from t = 8 s, twelve in total, each fading in over 1.5 s. Each clone inherits a period near the prototype's (2.4 s x 0.86 to 1.16, seeded) and its own phase offset, so none tick together. Clone positions sit on a ring around the prototype with even angular spacing plus seeded jitter, so the swarm spreads instead of stacking. The prototype recedes from scale 1.00 to 0.72 as the swarm arrives.

Palette, hand-picked from the prompt's named colors (studies/studio-zimoun.md does not exist locally, so no study file was consulted): pale studio white ground #F4F1EA, box tan #C9A06B, motor black #1C1A17, cotton cloud white #FFFFFF with #EFEAE0 shade puffs. No second material appears anywhere: box, motor, cotton only, plus the motor's own wire arm.

Frame one is fixed phase t = 0 s: the single prototype large and centered, arm vertical at rest, no clones. Deterministic: mulberry32 seed 1745, no Date.now, no Math.random, no performance.now in frame one. One synchronous frame at load; requestAnimationFrame guarded by a typeof check. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style width/height in px. Phone detection via window.screen (min dimension under 700 px) with aspect fallback. Centered geometric composition: shape kept on phones, page ground is the piece's own pale background, hint ink dark brown #7A5C2E to match. Title, date, and hint plates sit top-left and bottom-left, clear of the unit on desktop and mobile. Arm tick is 0.42 Hz by construction, well under the 14 Hz flicker limit. No em dashes in visible copy. No click-to-reload.

## Deviations

None material. Two small adaptations, both within the prompt: the swarm is fixed at twelve clones (the prompt does not number them; twelve reads as a swarm without crowding the frame), and the prototype recedes by shrinking to 0.72 scale rather than moving, so it stays centered and draggable throughout.

## Probes (node harness, same shim as render-piece.js)

Drag and recovery, impulse +1.5 applied at t = 2.0 s (unperturbed base arm angle 0.52 sin(2 pi t / 2.4)):
- t = 2.0, no impulse: -0.4503 rad
- t = 2.1, after impulse: -0.2320 rad (unperturbed -0.3677, deflection +0.1357 rad)
- t = 2.5, perturbed: 0.2475 rad, residual +0.1130 rad
- t = 4.0, perturbed: -0.5298 rad, residual -0.0795 rad
- t = 8.0, perturbed: 0.4481 rad, residual -0.0023 rad (spring recovered)

Clone phases at fixed time t = 20 s (all 12 visible, arm angles in radians):
- clone 0: period 2.265, phase 2.019, arm +0.4259
- clone 1: period 2.761, phase 4.822, arm +0.0338
- clone 2: period 2.447, phase 4.280, arm -0.4143
- clone 3: period 2.772, phase 0.663, arm +0.4680
- clone 4: period 2.314, phase 2.386, arm +0.0712
- clone 5: period 2.210, phase 0.896, arm +0.4872
- full spread at t = 20: min -0.4315, max +0.5055. Clones visible at t = 0: 0. At t = 20: 12.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; inspected all three. Desktop: single prototype centered, cotton cluster reads, plates clear. Mobile: unit centered, plates clear of the unit. Swarm state rendered at t = 20 s via the probe harness and inspected: prototype receded, twelve clones ringed around it with visibly different arm angles. Fix rounds: cotton reworked (per-puff outlines, ring target removed) and arm shortened 0.85 to 0.72 unit lengths; clone ring given even angular spacing after two clones stacked. Thumb re-rendered independently after the last edit and confirmed byte-identical by md5.
