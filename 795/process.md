# No.795 "Window Glass"

EXPANSION #97 niele-toroni, prompt block PP4 "Window Glass" (verified verbatim from TASKS.md).

## Concept

Toroni painted his No. 50 brush imprints directly onto the street-facing window glass of the Swiss Institute in New York: the support is not a canvas but the building's skin, and what moves is not the mark but the light of the room behind it. This piece is that window at night. A mullion grid of dark glass panes fills the frame. Behind the center panes the gallery interior glows faintly and breathes on one slow 40-second sine, dim to bright and back, never cutting. Faint diagonal reflection streaks, the street's light on the glass, slide slowly across the panes on the same phase family. On the center pane, three white imprints float, painted on the glass itself. They never move. All motion is light; the painting is still.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets, no gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

- **Palette (strict, four tones):** glass #2A3138, mullions #B9C0C7, imprint white #F2F2F0, interior glow #E8E2D2. Page ground is the glass tone.
- **Grid:** mullions (outer frame plus dividers) over a full-bleed glass fill. 5 columns x 3 rows on desktop and thumb; 3 columns x 5 rows on phone portrait, so the center pane stays roughly square and central at every size. A 1px hairline of imprint white at alpha 0.16 along one edge of each divider suggests the aluminum catching the interior light.
- **Glow construction:** the interior is seven nested flat rects of the glow tone, centered on the center pane and sized 2.1 panes wide, so the light bleeds about half a pane into the neighbours. Each layer insets 42% of the way to the core while its alpha rises (0.028 to 0.208 before scaling), giving a soft core with no gradient. Brightness breathes as b = 0.5 + 0.5*sin(phase) over the 40 s loop; layer alphas scale by (0.30 + 0.70*b) with a small constant floor, so the room never fully goes dark: one slow breath, no day/night cut.
- **Reflection streaks:** three diagonal pale bands (mullion tone at alpha 0.040-0.055, modulated slightly by the breath) drawn as parallelograms running the full height with a horizontal run of 0.35*H, clipped to the pane field inside the outer frame. Their horizontal offset slides as sin(phase + 0.9) * 0.05*W, the same phase family as the glow.
- **Imprints:** three dabs fixed on the center pane at pane-local positions (0.32, 0.30), (0.64, 0.50), (0.38, 0.70); width about 30% of the pane's smaller dimension. Each dab is three layered-alpha halo rects (the slight glow against dark glass), a body of three horizontal bands with falling alpha (0.96 / 0.88 / 0.78: paint load densest where the brush first pressed, drier at the lift), and 13 vertical bristle hairlines in the glass tone at low alpha where the glass shows through the paint. Per-dab jitter (rotation within +-2 degrees, size within +-5%, streak offsets, lengths and alphas) comes from one mulberry32 stream with fixed seed 79504, consumed once at startup, so the hand is identical on every load and at every size.
- **Frame one:** the synchronous draw at loop t = 0. At t = 0 the breath factor b = 0.5 exactly (mid-glow, rising), chosen so the interior reads clearly and the white imprints sit visibly on the lit center pane in the thumbnail. No clock reads anywhere; glow and streak states are closed-form functions of the loop phase.
- **Sizing:** canvas from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw() every frame. Phone detection via window.screen physical size (min dimension < 700px), aspect h > w*1.15 as fallback only.
- **Motion plumbing:** rAF loop guarded by a typeof check and anchored as elapsed-since-load; where rAF is absent (the QA renderer) a single frame is drawn synchronously, with an optional ?seed=tNN hook to inspect a chosen loop time.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas):

- `qa-desktop.png` (1280x900): 5x3 mullion grid, dark glass, layered warm glow centered behind the middle pane and bleeding into its neighbours, three white bristle-streaked dabs on the center pane, faint diagonal reflection streaks. Nothing clipped.
- `qa-mobile.png` (390x844): grid reflows to 3x5; center pane carries the three dabs, glow and streaks intact, nothing clipped.
- `thumb.png` (720x720): same composition at gallery size; imprints clearly legible on the lit center pane.
- **Determinism:** thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted. Frame one is the fixed t = 0 draw (mid-glow phase), reproducible on any machine at any time.

## Deviations

None from the prompt. Two construction notes: (1) the prompt's per-pane reflection gradients are realized as flat diagonal alpha bands plus the layered-rect glow, because gradients are unreliable in the QA renderer; the read (faint streaks over dark glass, soft interior light) is preserved. (2) Frame one uses the mid-glow phase b = 0.5 rather than the dim end of the breath, so the gallery thumbnail shows the interior lit and the imprints visible; the full breath still runs dim to bright over the loop.
