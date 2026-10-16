# №121 · Weight of Process - process notes

## Concept
After Iskra Velitchkova's Uninhabitable and her ellipse systems, where stroke weight reveals the process. A field built only from ellipses, hundreds of them in loose ecosystems, where the subject is not the shapes but the three discrete weights they are drawn with: hairlines for the searching, heavy strokes for the machine's decisions. Drifts of red fog settle under some tangles and not others.

## Construction
- Single self-contained page, no libraries. 2D canvas. 230 ellipse records in 4 seeded clusters, each with home point, radii, rotation, drift phase and a weight class. Exactly three stroke weights exist in the piece: 1, 2.4 and 4.6 px; no continuous weight range anywhere. Ellipses are stroked only, never filled, ink #1C1B18 on warm paper #EFE9DC.
- Promotion: each ellipse carries its own slow period (14 to 52 s); when its cycle turns, its weight class steps up (hairline to medium to heavy, then back to hairline) with a short pulse in width and scale, the machine changing its mind. Ellipses also drift, rotate and breathe slowly on per-ellipse phases.
- Red fog: 5 soft radial washes in #C23A2A at alpha 0.06 to 0.12, drawn beneath the ellipses, wandering very slowly.
- Interaction: drag attracts nearby ellipses gently toward the fingertip with an eased falloff; double-tap reseeds the ecosystems. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px each frame; phone detection via window.screen with aspect fallback. Full-bleed on phones. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. Desktop shows four tangled ecosystems with clear breathing room, all three weights readable, fog pooled at the left and centre. Mobile stacks the ecosystems vertically, full-bleed, fog still visible. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `121/index.html`, `121/thumb.png` (720x720, rendered from the live script), `121/process.md`. Gallery entry to be added to pieces.json by fly with the formula date 2002 · 05 · 12.
