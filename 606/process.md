# No.606 "Strip Book"

EXPANSION #73 paz-tamburrini, prompt block 6 "Harlequinade".

## Concept

Her harlequinade (strip book) as an interactive object. Five horizontal paper strips stack edge to edge into one illustration, a thin paper spine at left, seams and slight curl shadows between strips. The front is one whole day garden; flip all five strips and the same book shows one whole night garden on the reverse. Exactly two scenes, no third. Tap a strip and it flicks over, flat and stepped, in her stopmotion grammar; tap it again and it flicks back. Between taps the book only breathes: the seam shadows pulse by a pixel or two in slow discrete steps.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. One garden generator per face: drawDay() and drawNight() each paint the entire scene in normalized book coordinates, and each strip's pass clips to that strip's rectangle, so slices of an element that crosses a seam line up exactly when the strips are down.
- Day (paper #F5F0E6, sage #A8B89A, peach #E8C4A8, ink #1A1A1A): strip 1 sky with a peach sun and two ink birds; strip 2 ferns and hanging peach pods; strip 3 the elephant pair (ink silhouettes, paper ears and eyes) standing on a shared ground line with grass tufts; strip 4 a creature band (sage, peach and ink blob creatures) plus one peach flower; strip 5 a sage ground hill with rising pods, ink stones and tufts.
- Night (navy #2B4A6F, paper cream #F5F0E6, soft orange #E09A5A only for stars): perforated stars as punched paper dots scattered over the whole book from the seeded field, nine orange sparkles, a cream crescent moon, the elephant pair lying asleep with closed-eye arcs and two rising z letters, and an ink ground hill punched with cream dots.
- Flip: state is five booleans plus a per-strip animation start. The flick is a 10-step scaleY squash (0.80, 0.60, 0.40, 0.20, 0.06, then back up) around the strip's vertical center, about 460 ms, no page-curl look. The face swaps at the midpoint step. While a strip moves it carries a flat translucent ink shading proportional to the squash and casts a soft translucent shadow onto the strip below. Taps on a strip that is mid-flick are ignored.
- Determinism: mulberry32 with fixed seed 606073 generates the star field, sparkles and page grain at load. Frame one is one synchronous draw at phase 0 (all strips down, day garden whole). The rAF loop is typeof-guarded and anchored as elapsed-since-first-frame; nothing is derived from Date.now. Breathing is a stepped function of elapsed time (1.5 s steps).
- Viewport: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame. Phone detection via window.screen min dimension under 700 px, aspect fallback h > w times 1.15; the book keeps its 1.28 aspect on phones and the page ground is the paper tone. All shadows are flat translucent shapes; no ctx.filter, no offscreen canvas.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Desktop and thumb: five strips read as one aligned day garden, spine and stitch marks at left, seams with curl shadows, "tap" hint bottom right. Mobile: book keeps its shape centered on the paper ground, nothing clipped, hint legible.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp, identical; second render deleted. Gate re-run and passed again after the ear fix below.
- Night and flip states verified with throwaway seeded-state copies rendered in /tmp (copies deleted after inspection, piece files untouched): all five strips flipped shows the complete night garden (stars, moon, sleeping elephants, punched-dot hill); a mid-flick frame shows strip 2 squashed to 0.40 with its shading, still flat, no curl rendering.
- Fix during QA: the standing elephants' ears were first drawn as paper outline arcs, which read as smiles; changed to filled paper ear patches, which read as cut-paper ears. All renders redone and re-checked after the fix.
- Grep check on index.html: no Date usage, no em dashes, no external URLs.

## Deviations

- The two sleep "z" letters use a generic italic serif system font via fillText. The piece otherwise uses no text beyond the "tap" hint; a drawn-path z was not worth the extra geometry, and the font is a platform generic, not an external asset.
- During a flick, the squashed strip reveals the plain paper backing of the book in the vacated part of its band. This is the flat, honest read of a paper strip lifting; the alternative (stretching the scene to fill) would break the stepped squash the prompt asks for.
