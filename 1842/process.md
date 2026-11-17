# №1842 "The Map" (PS3, PP1089), process notes

## Build

- Piece: №1842, PS3 (PP1089), EXPANSION #241 phillip-sollmann.
- Title: The Map. Gallery date: 2007 · 01 · 27 (formula date 2002-01-10 + 1843 days).
- Gallery note: "The same four bars, dressed in each era's clothes. Watch only."
- Template: live №1841 index.html fetched fresh via gh_api.py (sha e9690a9d6f420e4be81aed69460e4968b0ee48aa); page structure, plates, Visual Viewport sizing, and phone rules mirrored from it.
- Technique: Canvas 2D only. No WebGL, no audio in the gate render.
- Interaction: WATCH ONLY. No scrubber, no buttons, no sound toggle, no click-to-reload. There is no click handler at all.
- House rules followed: one synchronous frame at load; requestAnimationFrame guarded by a typeof check; canvas pinned in draw() via canvas.style.width/height in px; resize listened to on visualViewport AND window; phone detection via window.screen (min dimension under 700px) with aspect fallback (h > w*1.15); field-like composition full-bleed on phones, square on desktop; title/date/hint plates drawn on canvas; no em dashes in visible copy; no AI-signature copy.
- node-canvas quirks followed: a moveTo precedes every batched arc (node rings, playhead halo, annotation dots); fading alphas go through rgba() with toFixed(4), never scientific notation.

## Fixed node layout (world units, world spans 0..1600 x 0..1000)

Main nodes:

| Node | x | y | Ring radius |
| --- | --- | --- | --- |
| KRAFTWERK | 120 | 180 | 34 |
| CHICAGO | 620 | 140 | 30 |
| DETROIT | 1080 | 220 | 30 |
| TECHNO | 820 | 620 | 28 |
| RAVE | 350 | 700 | 28 |

Annotations (small dots with a faint wobbly spur to their node):

| Annotation | x | y | Attached to |
| --- | --- | --- | --- |
| 808 | 760 | 260 | CHICAGO |
| 303 | 1240 | 360 | DETROIT |
| KLF | 180 | 560 | RAVE |
| ACID | 980 | 760 | TECHNO |
| SHOOM | 520 | 860 | RAVE |

Edges: the playhead tour is the closed loop KRAFTWERK → CHICAGO → DETROIT → TECHNO → RAVE → KRAFTWERK. Edge lengths: 501.6, 466.9, 477.1, 476.8, 568.6. Total loop length 2490.9 world units. Annotation spurs are drawn, not travelled.

## Playhead speed

- Constant speed: 40 world units per second along the tour.
- Loop period: 2490.9 / 40 = 62.27 s.
- Camera: centered on the playhead, so the view is always mid-journey and the graph sprawls past the frame edges. Desktop view width 1200 world units, phone view width 950 world units. The camera never rests at the start or end of anything, because the tour is a closed loop.

## Era-tint table

The node nearest the playhead is drawn in its era tint (ring, dot, label, plus a soft radial glow). All other nodes stay chalk white (#EDEDE8).

| Node | Tint | Era |
| --- | --- | --- |
| KRAFTWERK | #EDEDE8 | neutral chalk white |
| CHICAGO | #D8C9B0 | warm grey |
| DETROIT | #A8C4DE | cold blue |
| TECHNO | #B9C2CC | steel grey-blue |
| RAVE | #D9C8E8 | pale lilac |

## Frame-one state (fixed phase t = 60 s)

- Playhead distance travelled: 40 x 60 = 2400.0 world units along the tour.
- Edge: RAVE → KRAFTWERK, 84.0 percent along (477.7 of 568.6 units).
- Playhead position: (156.8, 263.2).
- Nearest node: KRAFTWERK, 90.9 units away (RAVE is 477.7 away). KRAFTWERK is therefore tinted (its tint is neutral chalk white, so the tint shows as its soft glow and full-bright ring and label rather than a colour shift).
- Visible in frame one: KRAFTWERK, CHICAGO, TECHNO, RAVE and the 808, KLF, SHOOM and ACID annotations (ACID partly at the right edge). DETROIT and 303 sit beyond the frame edge at this phase and come into view as the camera travels; that is the piece working as specced, not a defect.
- Determinism: playhead position, camera, and every tint are closed-form functions of piece time on the fixed graph. Wobble uses a seeded hash per segment, chalk dust uses a mulberry32(1842) stream fixed at load. No Date.now() or Math.random() affects frame one.

## Audio (described, not sounded)

One fixed four-bar pattern, four instrument kits crossfaded by node proximity: stiff drum machine at KRAFTWERK, warm house chords at CHICAGO, dystopian strings at DETROIT, warehouse kick at TECHNO and RAVE. The pattern never changes shape, only its clothes. Real WebAudio would be lazy inside a visitor gesture only, never autoplay; the gate render carries no audio and the visuals carry the piece alone. No sound control is drawn, because the piece is watch only.

## Deviations

- None from the prompt. The camera is centered on the playhead rather than drifting independently; this is the reading of "the camera travels slowly along the graph" and "always mid-journey" that keeps the playhead visible at every phase, including frame one.
- Labels of nodes sitting exactly at a frame edge can clip (CHICAGO on the 390 px mobile render, ACID on desktop). This follows from the specced sprawl past the frame edges and resolves as the camera travels.

## QA

- Rendered with node ~/workspace/tools/render-piece.js from the actual script:
  - 1280x900 desktop: near-black field, chalk-white wobbly graph sprawling past the right and bottom edges, KRAFTWERK / CHICAGO / TECHNO / RAVE labelled, 808 / KLF / SHOOM visible with ACID at the edge, playhead halo and short bright trail mid-edge below KRAFTWERK, KRAFTWERK glowing as nearest node, title plate "The Map / 2007 · 01 · 27" top left, "Watch only." bottom left. Clean.
  - 390x844 mobile: full-bleed field, same graph and playhead, KRAFTWERK and RAVE labelled, KLF and SHOOM visible, plates clean. Clean (CHICAGO label clips at the right edge, expected sprawl, see deviations).
  - 720x720 thumb: same composition as desktop, all plates legible, playhead and nearest-node glow clear. Clean. thumb.png IS this render.
- Listeners confirmed by the render tool on all three renders: vv:resize, win:resize.
- No post-gate edits to index.html after the renders above (only a dead-code tidy in drawEdge before the renders ran).

## Files

- index.html, process.md, thumb.png in ~/workspace/push-work/20261117-0245/1842/
- Nothing pushed. Parent run pushes and verifies.
