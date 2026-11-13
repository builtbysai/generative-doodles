# №1756 "The Speakers Are the Piece" (PP1003, MF5, marcus-fischer) - build notes

## Spec
BATCH-1752-1756-SPEC.md, №1756 section. Date 2006 · 11 · 02. Watch-only.
Gallery note: "Bare drivers hang on thin cords, each shuddering on its own rhythm, no cabinets anywhere. Watch only."

## Build
Canvas 2D, template /tmp/t1751.html (live №1751 Beat Box), structure/sizing/plates/guard patterns mirrored.
- Ground: dark brick #2E1B14. Cones warm paper brown (#C89A68 / #DDB27E / #9C7046 radial gradient), rims #5F3D24, surround rings #7A5233, dust caps #8A5E38. Cords thin hemp tan #C7A97B, quadratic curves from the ceiling (y=0) to each driver rim, with a tiny knot at the attachment point.
- 8 drivers: one large anchor (r 0.115 of min(VW,VH)) at (0.50, 0.70), low and central; seven smaller (r 0.044–0.066) scattered at staggered heights (0.14–0.55) like a hanging constellation.
- Per-driver shudder: membrane ellipse breathes on a sine pair with irrational periods (sqrt(2)/sqrt(3)/sqrt(5)/sqrt(7) scaled, 0.66–0.91 s base pairs), plus a small whole-driver jitter; every driver has its own periods, phases, and depth (0.48–1.00), so no two pulse alike.
- Cord sway: slow secondary motion, per-driver sway periods 17.3–31.1 s, driver center and cord bend following the same sway phase.
- Glow: faint warm radial glow (amber, peak alpha 0.16) under the anchor driver, pulsing gently with its own shudder sine; the anchor is the most active driver (depth 1.00).
- Soft dark shadow ellipse under each driver grounds it in the room.
- Frame one: fixed phase t = 60.0 s. All motion is a closed-form function of piece time; seeded RNG (mulberry32(1756)) is declared for parity with the template but no frame-one value depends on it; no Date.now()/Math.random().
- House rules: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen min dimension < 700px with aspect fallback (h > w*1.15), one synchronous frame at load, requestAnimationFrame guarded by typeof check, reduced-motion respected, title/date/hint plates drawn on canvas, no click-to-reload (no pointer handlers at all; watch-only), no em dashes in visible copy, no AI-signature copy.

## Deviations from the prompt
None. No cabinets or boxes anywhere; every driver is a bare circle. No WebGL involved (Canvas 2D throughout), so no substitution was needed.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script; all three PNGs read and inspected.
- Desktop 1280x900: full constellation visible, anchor driver large and low-central with the faint warm glow beneath it, all eight cords rising to the ceiling, plates legible top-left and bottom-left, nothing clipped, nothing covering the composition.
- Mobile 390x844: all eight drivers visible, constellation reads vertically, title plate fits (shrinks to 15px), cords pass behind the plate cleanly, anchor driver clear with glow, hint plate legible.
- Thumb 720x720: same composition, all drivers and plates legible; thumb.png IS this render.
- No fixes needed; first build passed the visual check as rendered. No post-gate edits.

## Files
- index.html - 10,855 bytes
- thumb.png - 720x720 render
- md5 index.html: 5b511ff2bdd3569f1a0ab2a483bc0080
- md5 thumb.png: 86108d0b703ebbf84a25142158d48135
