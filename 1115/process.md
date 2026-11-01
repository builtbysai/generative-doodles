# №1115 — Sweet Spot

Markus Kison study block MK4. An anamorphic motif smeared across a field of prisms: legible from exactly one viewpoint, abstract from every other.

## Concept

Twenty prisms (5 across, 4 down) stand on printer-white paper. Each prism carries one slice of a bold seeded glyph — a ring, a bar-cross, a triangle, or a staircase — drawn in ink black with a single river-blue accent. The slice each prism shows is sampled from the motif through an offset proportional to the error between the visitor's current viewpoint and one hidden viewpoint. As the error shrinks the slices shear back into register; at the sweet spot the motif snaps whole.

## Mechanism

- **Motif field.** The glyph is a pure function over grid coordinates (5 × 4 units): `motifAt(x, y)` returns none / ink / accent. Nothing is pre-rendered; every prism samples the field live.
- **Anamorphic smear.** Prism (c, r) samples with an offset `err × 0.45 × dir(c, r)` per axis, where `dir` runs −1…+1 from the grid centre outward. Centre prisms barely shift; corner prisms shift most, so the smear is a shear, not a blur.
- **The hunt.** Pointer position over the stage *is* the viewpoint. While dragging, the current viewpoint eases toward the pointer (exponential approach, τ ≈ 0.12 s); on release it stays where it was left — hunting is positional. Untouched, the viewpoint wanders slowly on Lissajous paths around its dealt start, always kept well short of the spot.
- **Feedback.** A thin ring in the top-right corner of the stage fills with proximity (1 − distance / 0.78). No numbers, no text anywhere except the title.
- **Success.** Proximity above 0.985 sustained for 0.35 s fires the resolution: the error is forced to zero, the whole field flashes white in a single smooth 0.6 s pulse (never a strobe), the aligned motif holds for 2 s, then a fresh motif and a fresh hidden viewpoint are dealt.
- **Double-tap** reseeds the motif and viewpoint manually. Nothing ever reloads the page.

## Sound

A soft sine hum whose pitch rises with proximity (110 Hz → ~530 Hz) starts lazily inside the first pointer gesture, typeof-guarded WebAudio, never autoplay. The piece is complete with the sound off.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; CSS size pinned in `draw()` every frame.
- Phone detection via `window.screen` physical size (min dimension < 700) with the tall-aspect fallback; the centred geometric composition keeps its shape and the page ground takes the paper colour.
- Determinism: seeded mulberry32 RNG only, no `Math.random`, no wall-clock reads. Frame one is drawn synchronously at a fixed phase — a mid-search moment: the dealt cross sheared across the middle prisms, its ghost inferable, the arc a little over half full. The rAF loop is `typeof`-guarded and anchored to that phase.
- No canvas gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`, no microphone.

## QA

Rendered with the house node-canvas renderer: `qa-desktop.png` (1280×800), `qa-mobile.png` (390×844), `thumb.png` (720×720). The thumb was rendered twice and byte-compared with `cmp`: identical. A pixel scan of the desktop frame confirmed the field outline rows for exactly 4 prism rows. Two tuning rounds during the build: the smear constant and the dealt start offset were balanced so frame one reads as a sheared-but-inferable ghost (first pass too resolved, second pass too fragmented).
