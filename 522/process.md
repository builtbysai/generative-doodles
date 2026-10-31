# №522 — Night Panther

EXPANSION #63 giulia-conoscenti, prompt GC2. After her mirrored roaring panther poster (7PAN).

## Concept

A perfectly mirrored roaring panther face fills the square, confronting the viewer head-on, on a flat saturated red ground. Nothing else is on the canvas. The black head carries yellow concentric-ring eyes, a blue muzzle with a black nose at the vertical centre of the face, an open roaring mouth with white fangs bared, and long white whiskers radiating past the silhouette edge into the margins. Gouache grain sits over every fill. The loop is watch-only, no interaction: the jaw breathes on a slow cycle, the eyes blink once every few seconds, and the whiskers tremble faintly.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone, no pointer handlers (the prompt specifies no interaction).
- Palette is exactly the prompt's five colours: ground red #E63312, panther black #111111, eye yellow #FFC400, muzzle blue #2B4FE0, teeth and whiskers #FFFFFF. Flat fills only, no gradients, no shading, no third dimension.
- Symmetry: the head silhouette is traced as one half (forehead, pointed ear, cheek, jowl, chin, closing up the centre axis) and drawn twice from the same path commands with mirrored x-coordinates, so the outline is symmetric to the pixel. Eyes and whiskers are likewise placed from half-face coordinates (distance from the axis) and mirrored. Centre features (muzzle lobes, nose, philtrum, mouth, teeth) are single symmetric paths.
- Eyes are four concentric discs per side (yellow, black, yellow, black pupil). The blink is a vertical squash of the whole ring group around its centre, dipping to about 8% height for 0.22s inside a 4.6s cycle.
- The muzzle is one blue shape with two lobes and a centre dip; the black nose sits on it at the face's vertical centre, with a short black philtrum line running down to the mouth.
- The roaring mouth is an open cavity filled with the ground red, so the roar reads as a poster cut-out. Two large upper fangs and five small upper teeth hang from the jaw line; two lower fangs and three small lower teeth rise from the mouth floor. The breath (3.8s cycle) moves the mouth floor and the lower teeth down by up to 0.0075 stage units and back, a slight jaw pulse; the silhouette itself never moves, so the symmetry of the outline is never broken.
- Whiskers are five per side, each a filled tapered sliver (wide at the muzzle base, bowed through a quadratic control point, sharp at the tip) radiating well past the silhouette. The tremble is a faint sine offset on each control point, identical on both sides, so the mirror holds at every frame.
- Grain: a precomputed seeded array of 900 tiny specks (mulberry32, seed 522063) in low-alpha black and white, drawn directly each frame over the finished face, since the QA renderer has no offscreen canvas.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700px) with aspect fallback; the square composition keeps its shape on phones and the page ground is the same red, so the poster is full-bleed at every size.
- Determinism: frame one is drawn synchronously at the constant phase PHASE0 = 3.8s, chosen so the jaw is exactly at rest (breath drop 0) and the eyes are open (the blink window sits at 3.9–4.12s of the blink cycle). The rAF loop is typeof-guarded and anchored as PHASE0 + elapsed; no clock value feeds frame one. All randomness is the one seeded grain array.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical; the second render was deleted.
- Desktop/thumb read-back: mirror symmetry holds by eye (ears, ring eyes, whisker fans and fangs match left to right); black panther head fills about 70% of the square on flat red; yellow ringed eyes; blue muzzle with black nose at the vertical centre; open red mouth with two large upper fangs, small upper teeth, and lower fangs and teeth; whiskers radiate past the silhouette into the margins; grain visible over the red, black and blue fills; no text, no scenery.
- Mobile read-back: the square stage centres on the red ground, the whole face and both whisker fans stay inside the frame, nothing clipped, features legible at 390 wide.

## Deviations

- The mouth cavity is filled with the ground red rather than left black. Reason: an all-black mouth would vanish into the black head and the roar would not read; the red cut-out is a standard poster device and stays strictly inside the prompt's five-colour palette.
- The breath pulse is applied to the jaw group (mouth floor and lower teeth) instead of rescaling the whole lower silhouette. Reason: rescaling the silhouette would break the pixel-exact mirror the prompt demands; moving the jaw floor inside a static outline gives the same breathing read with the outline's symmetry intact.
- Grain is a precomputed seeded speck array drawn directly each frame instead of a pre-rendered grain canvas. Reason: the QA renderer has no offscreen canvas; the static seeded array gives the same gouache texture, deterministically.
