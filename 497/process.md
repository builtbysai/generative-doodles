# No.497 Tricolor Panels

EXPANSION #60 giulia-tassi, prompt GT1. Build and QA only; not pushed.

## Concept

Giulia Tassi's Tracce bianche panel system as a generative composition. Three inset panels stack down the left third of a paper-white canvas in tricolor order (green #47AE65, pale #DCE8EE, red #B93439). Each panel carries a mini scene (running figure, tricolor flag, medal) and a stroke-only uppercase name block with an invented two-syllable name. The main field holds one large speed-skater racer in a blue #517FB3 suit crossing on a -45 degree slash, entering low left and exiting top right, over a halftone dot field that fills only the negative space. Watch-only ambient loop: the racer breathes in and out along the slash (+/-3%), the dot field shimmers in a wave from bottom to top, the panels stay static. Double-tap reseeds the panel shape set, the names, and the racer pose.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio, no microphone.
- Seeded scene (mulberry32, seed 497001): one panel shape set per run, all triangles, all diamonds, or all circles, never mixed. The fixed seed draws triangles and the names ELIO, NORA, IVO. Panel shapes are filled paths; each panel's scene is clipped to its shape, and the name is stroke-only (strokeText, never filled) with the font size shrunk to fit the shape's inner width at the name's height. Name stroke width is 4px at a 1080px composition, scaled.
- Panels occupy the left 30% of the square composition in equal thirds and bleed slightly off the left edge. The composition is a centered square (side = min(viewport)), so it keeps its shape on phones; the page ground is the paper white.
- Mini scenes: a white line-skeleton runner with a skin-tone head disc; a green/white/red banded flag on a navy pole with a seeded wave offset; a medal (navy and green ribbon trapezoids, pale disc, navy ring and star).
- Main racer: tapered-quad limbs and torso in the suit blue, skin hands and face, navy skate blades. The face uses her grammar in profile (the racer is a side view): skin disc, flat navy hair block over the top, one arc eye, L-line nose. Limb joints carry small seeded pose multipliers, refreshed on reseed.
- Dot field: a jittered grid precomputed from its own fixed stream, drawn first, under the opaque panels and figure, so dots can never land inside a panel or on the racer. Dots use the palette's snow-dash #B9C6D4 (see Deviations), alpha modulated by a radial falloff toward the field edges and a phase-shifted sine shimmer that travels from bottom to top. Loop is 6s, seamless.
- Sizing follows the house rules: Visual Viewport API with resize listeners on visualViewport and window, canvas style width/height pinned in px inside draw(), phone detection via window.screen (min dimension < 700px) with aspect h > w*1.15 as fallback only.
- Determinism: the first frame is drawn synchronously at the constant pre-roll phase PHASE = 2.35s; the rAF loop (typeof-guarded) is anchored as PHASE + elapsed since load. No Date.now() anywhere in frame one.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp-compared byte-identical, verified on the final build; the duplicate render was deleted.
- Desktop read-back: three triangle panels in tricolor order down the left, each with its mini scene and a stroke-only name; the blue skater crosses the field diagonally with blades down-slope; the dot field fills the negative space and stays out of the panels and off the figure.
- Thumb read-back: same read at gallery size; names legible, medal and flag read at small size.
- Mobile read-back: the square composition centers in the tall frame and keeps its shape; panels bleed off the left edge as designed; nothing else is clipped; names and scenes stay inside their panels.
- Fix during QA: the first pass drew the face frontally (two arc eyes plus nose), which collapsed into a squiggle at the racer's scale. Redrew it as her grammar in profile (one arc eye, L-line nose), seated the head closer to the shoulder so it no longer floats, and shrank the tucked rear hand onto the end of its forearm.

## Deviations

- Dot color: the prompt calls the field "halftone white dots", but the ground is paper-white #FFFFFF, where white dots are invisible. The dots are drawn in snow-dash #B9C6D4, the palette's own dot/texture color, at partial alpha, which reads as her light halftone on paper. Recorded here rather than silently changed.
- The racer is centered on the main field's slash rather than touching the composition's bottom-left and top-right corners; the diagonal crossing, suit, and dot masking follow the prompt.
