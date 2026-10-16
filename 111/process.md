# №111 · Emberfall - process notes

## Concept
After Lammetje's Blaze series. Four broad bands sweep from bottom-left to top-right across a near-black ground, built entirely from thin strokes: 600 particles advected through a curl-noise flow field, each leaving a slowly fading trail. Colour comes from a bronze-to-cream ramp by trail age, so fresh stroke heads read cream, mid-trail bronze, old trail umber. The longest trail in each band has its spine stroked once in ember orange, one glowing edge line per band.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 600 particles (asserted count in code comments), velocity = curl of a seeded value-noise potential blended with a fixed diagonal drift; the noise sample window drifts slowly so the field breathes and never repeats.
- Bands are defined in the coordinate perpendicular to the flow: particles spawn by rejection sampling against a four-band bump profile (centres at u 0.18 / 0.40 / 0.60 / 0.82), leaving black negative space between bands. Trails persist via a low-alpha ground wash (0.030 per step) instead of a hard clear; the sim pre-rolls 420 steps at load so the first frame is already fully developed bands.
- Ember edge lines: per frame, the longest-history particle in each band has its recorded spine (up to 110 points) stroked once in #FF7A1A at alpha 0.5, width 1.
- Palette only: ground #0B0906, umber #3A2415, bronze #8A5A2B, cream #F2E3C2, ember #FF7A1A. Drag adds a local vortex around the fingertip (tangential push with distance falloff) whose strength eases back to zero on release. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px every frame; phone detection via window.screen with aspect fallback; full-bleed on phones. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. First pass was too sparse (trail wash alpha 0.085 ate the strokes); wash lowered to 0.030, pre-roll raised to 420 steps, particle life lengthened, and the re-render shows dense brushed bands with one ember line per band on all three sizes. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `111/index.html`, `111/thumb.png` (720x720, rendered from the live script), `111/process.md`. Gallery entry for pieces.json: title "Emberfall", date 2002 · 05 · 02, note "Four diagonal bands of brushed bronze strokes follow a curl-noise field, each band traced by a single ember edge line. Drag to bend the flow."
