# №578 — Se Cayó Colgando el Matisse

EXPANSION #70 maria-j-luque, prompt block 2 "La Calamidad" (TASKS codes the #70 blocks PP1–PP8 again; this is block 2). Her museum-calamity mode: deadpan, no gore, no slapstick sound-effect text, no captions.

## Concept

A wide gallery wall, mostly empty. Centered on it hangs a tiny forged masterpiece: a small gold-framed cutout composition in red, blue, and black, simplified flat shapes that read as a Matisse-like homage at a glance and as nobody's actual painting on inspection. Right of center, a wooden ladder leans against the wall and a small museum worker stands on it, mid-hang, one hand at the picture's right edge. Down on the floor, small in the space (her people-small-by-surroundings rule), two tiny onlookers watch: one in shock, one holding a camera up. The room is calm. The ladder is not.

The comedy is a scripted watch-only micro-narrative on a 14-second loop: hang, wobble, fall, flinch, dazed pause, then a guard walks in, sets everything straight without fuss, and leaves. Nobody is hurt, nobody comments, the loop resets.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio, no microphone.
- Virtual stage 1000×700, scaled to fit and centered at any viewport; page ground is the wall color #EFE7D8, so the framing survives phones intact. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw() every frame; phone detection via window.screen (min dimension < 700px) with aspect fallback.
- Strict palette, flat fills, no gradients: wall #EFE7D8, frame gold #B98A2F, homage red #C0392B / blue #2C5FA8 / black #1A1A1A, ladder wood #8A6A4A, figure greys #5A5A5A / #7A6A5A. The floor and baseboard are the ladder wood at low alpha over the wall; figure shadows are black at 10% alpha; wall speckle is wood at 5%.
- The forgery is drawn as a group rotated about its nail point (500, 205), so tilt pivots the way a hanging picture actually moves. Shapes inside: a red organic blob, a blue vertical leaf, a black circle, a small red circle, a black bird silhouette, a blue wavy band. Generic cutout vocabulary, deliberately not any real composition.
- Figures are one posable routine (hip, torso lean, two-segment legs and arms, explicit foot/hand targets, paper-white heads). Poses are built by lerping between keyframe poses, so the worker's slide off the ladder, seated daze, stand-up, and climb back are all blends of three base poses (riding / standing / seated) — no sprite swaps.
- The ladder is drawn in its own rotated frame (lean −0.24 rad plus sway) and the worker's riding feet/hands are computed from the same ladder transform, so he rides the sway exactly.

### Loop timeline (LOOP = 14 s, t = phase mod 14)

| t (s) | Beat |
|---|---|
| 0.0–5.5 | Worker on the ladder hangs the picture; right hand works at the frame's right edge with a small tool-like oscillation. Ladder sway: sin(phase·2.4)·amp + sin(phase·5.7)·amp·0.35, amp = 0.010 + drag energy. |
| 4.6–5.5 | Warning beat: sway amplitude ramps up by 0.045 (smoothstep). |
| 5.5–6.3 | THE FALL: worker's ladder-attach weight blends 1→0 while his floor pose is already the seated one, so he slides down and out; whole-body tumble rotation −0.55·sin(π·u) around the feet over 5.5–6.6. Forgery tilts to −0.13 rad with a small overshoot wobble, settling at −0.115. |
| 5.9–6.9 | Flinch envelope sin(π·(t−5.85)/1.05): shock onlooker jumps 13 units, arms fly up, mouth opens (small "o"); photo onlooker hops 6. One gold flash starburst at the camera at t = 6.05–6.45, fading. |
| 6.3–10.8 | Worker sits on the floor at the ladder's left, dazed; from 6.4–10.7 two tiny gold stars circle his head. |
| 8.0–10.5 | Guard (blue, black cap) walks in from the right edge, ease-in-out, leg swing + bob; stops beneath the picture's right corner. |
| 10.5–11.5 | Guard's right hand is pinned to the forgery's bottom-right corner (computed from the live tilt), and the tilt eases back to 0 as he "pushes" it straight. Worker stands (seated blend → 0) and steps toward the ladder base. |
| 11.5–13.2 | Guard walks out to the right; worker's attach weight blends 0→1 (11.8–13.0), climbing back to his rungs. |
| 13.2–14.0 | Settle. State equals t = 0 exactly; loop wraps seamlessly. |

- Interaction: DRAG anywhere adds sway energy to the ladder proportional to pointer travel (clamped), decaying as 0.35^dt in the rAF loop — drag the ladder and it wobbles harder, then settles. No tap action, per the prompt's watch-only loop. In-piece text is only a tiny lowercase "drag" in the bottom-right corner.
- Determinism: first frame is the synchronous draw at PHASE0 = 2.5 (mid-hang: worker on the ladder, right hand at the frame, forgery straight, guard offstage). The rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed via performance.now; `Date.now` appears nowhere (grep count 0). Wall speckles are precomputed once from mulberry32 seed 578070. The QA renderer has no rAF, so it draws exactly the PHASE0 frame.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` 1280×900: wide wall, forgery centered and straight in its gold frame (red blob, blue leaf, black bird/circle, blue wave all legible), wire and nail visible, ladder diagonal right-of-center crossing the frame's top-right corner, worker on the ladder at the frame's right edge with head and reaching arm clear, both onlookers tiny on the floor at left, photo figure's camera box readable, floor band and baseboard below, "drag" hint bottom-right. Nothing clipped.
  - `qa-mobile.png` 390×844: full 1000×700 framing letterboxed on the wall color, whole scene (picture, ladder, worker, both onlookers) present and legible, nothing clipped.
  - `thumb.png` 720×720: same composition, reads at gallery size.
- Determinism gate: thumb rendered twice and `cmp` byte-compared — identical; second render deleted.
- Loop phases were checked by construction against the timeline table above (fall/flinch/flash/guard beats are pure functions of t; the t = 14 state equals t = 0 by the keyframe values).

## Deviations

- The guard's uniform uses the homage blue #2C5FA8 and his cap the homage black, because the strict palette offers no other saturated color for a uniform; every color used is one of the eight specced hexes.
- The worker's daze is shown with two small gold stars circling his head. The prompt bans sound-effect text and gore, not visual shorthand; the stars are shapes, not text, and keep the beat readable at thumbnail size.
- The ladder's top crosses slightly in front of the frame's top-right corner. That is the geometry the prompt asks for (tiny forgery centered, ladder diagonal right-of-center against the same wall), and the worker's hang point is the frame's right edge, so the overlap is the scene, not an accident.
- Figure heads are paper-white (the wall hex) with grey outlines, since the palette names no skin tone; this also matches her flat, simply-drawn people.
