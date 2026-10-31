# No.521 Oblong Tiger

EXPANSION #63 giulia-conoscenti, prompt GC1. Watch-only motion loop, no interaction.

## Concept

Her oblong beast as protagonist, after the "Ceiling Drip Gospel" cover: one giant red tiger stretched oblong across a starry night, lime stripes down its body, its eyes replaced by two yellow smiley faces, mouth open on white fangs. The long tail is the composition's main curve, rising from the bottom-left rear, sweeping across the top, and curling at the top-right to cradle a pale moon-egg. Three rounded archways band the top fifth; two melting U-shaped candles and one impossible stopwatch float in the sky pockets. Flat gouache fills, grain over everything, no gradients.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Square 1080-unit stage letterboxed and centered; page ground is the night colour, so the stage edge is invisible at any aspect.
- Palette exactly as specced: tiger red #E53B2C, lime #9ACD32, smiley yellow #FFD400, night #1A1A2E, moon-egg cream #F5E9C8, white #FFFFFF. The smiley features are drawn in the night colour, the only dark ink in the palette.
- Tiger: one bezier silhouette path (head at right with two soft ear bumps, open-mouth notch cut into the outline, two stub leg bumps on the belly). Stripes are broad curved lime strokes clipped to the silhouette. Fangs are white triangles, two down from the jaw roof and two up from the lower jaw. A cream nose patch sits at the snout tip.
- Tail: spine points swayed by sine offsets that grow toward the tip, smoothed with Catmull-Rom interpolation, stroked as short round segments with width tapering 56 to 26 units; four lime bands stroked at the local tail width. The tip curls over the base of the moon-egg as the cradle stroke. The egg bobs on its own sine, partially following the tip sway.
- Sky: 130 seeded stars (dots plus four-point sparkles) drifting slowly left-to-right with sine twinkle; three cream arch outlines across the top, drawn after the tail so the tail passes behind the architecture; two U-candles (thick cream stroke, wax drips, flickering teardrop flames); the stopwatch has a cream face, dot numerals, a tilting crown ring, and three hands at impossible angles, one sweeping.
- Grain: 620 precomputed seeded short strokes in palette colours at low alpha, drawn directly over the fills each frame. No offscreen canvas is used, because the QA renderer has none.
- Sizing follows the house rules: Visual Viewport API size with resize listeners on both visualViewport and window, canvas CSS size pinned in px inside draw(), DPR clamped at 2.
- Determinism: frame one is drawn synchronously at the constant phase PHASE0 = 2.6; the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed since load. Frame one is never derived from Date.now().

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical, re-verified after every fix pass. The duplicate render was deleted each time.
- Desktop and thumb read-back: the huge red oblong tiger fills the frame, lime stripes clean, smiley eyes read as symbols, fanged mouth open at the lower right of the head, tail sweeping bottom-left to top-right with the moon-egg cradled in its curl, three arches across the top, both candles and the stopwatch floating in the sky pockets, stars and grain over the night.
- Mobile read-back: whole square composition centered on the night ground, nothing clipped, all elements legible.
- Fix pass one: the first tail bands rendered as fat lime dots (a degenerate stroke with round caps). Rebuilt the tail with a Catmull-Rom smoothed spine and bands stroked as short spine segments at the local tail width; the tail also lost its earlier faceted look. Re-rendered all sizes and re-ran the byte-compare.
- Programmatic checks: zero gradient calls, zero Date.now, zero URLs in the file.

## Deviations

- Composition orientation: the head sits at the right and the rear at the left, the mirror of a first sketch. Reason: the prompt fixes the tail's curve as running from bottom-left to top-right, so the tail root belongs at the bottom-left rear and the head at the opposite end.
- The phone-detection helper was removed rather than left unused. Reason: the composition keeps its square shape on phones and the page ground is the same night colour as the stage, so no phone-specific branch exists to switch; dead code would only mislead. Phone rendering was still QA-checked at 390 wide.
- The moon-egg carries three small yellow crater dots. Reason: a plain cream ellipse read as a blank ball at thumbnail size; the dots keep it in the moon register using only palette colours.
