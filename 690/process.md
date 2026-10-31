# No.690 "Blood Knots"

EXPANSION #84 ceciliavicuna, prompt block 2 "Blood Knots" (Quipu Menstrual grammar).

## Concept

A dense, low-hanging mass of unspun red wool tufts suspended from above, filling the upper two-thirds of the frame like a storm cloud of fiber. The tufts are clotted and barely touching, with shadowed gaps between them; a few longer strands dangle toward halfway down. The bottom third is near-black emptiness: the viewer stands beneath the mass. It is textile, not violence: no gore, no horror framing, nothing explodes. The mass breathes almost imperceptively on a 20-second cycle. Pressing and holding parts the tufts; dragging draws a slow furrow through them; the fibers take several seconds to close behind the hand, because wool is slow and heavy and does not snap.

## Construction

- Palette (strict, six colors): blood red #8E1B1B, wool red #A83232, rust #7A2E1E, dark earth #3A1E14, shadow #140B08 (ground and page background), faint highlight #C05A4A on a few outer fibers only. No text anywhere except the title; no audio; no microphone.
- Tuft model: 660 tufts (inside the specced 400-700), each a cluster of 5-9 fibers. Every fiber is precomputed seeded data (mulberry32, seed 690002): a start point jittered along the tuft's gathered top, a length, a narrow downward angle, and a gentle sag curve (control point bowed slightly outward, tip settling back inward), drawn as a quadratic stroke plus one fainter near-coincident fuzz hair. Colors are assigned per fiber by tuft depth: back tufts run dark earth and rust, front tufts blood and wool red. About 9 percent of tufts are danglers whose fibers run 2.4-4.4x longer, reaching toward halfway down the frame.
- Layout: two layers. Roughly half the tufts gather around 46 seeded cluster centers (gaussian scatter), forming the bright clots. The other half form a dark under-layer spread across the whole mass region, so gaps between clots read as shadowed fiber rather than bare void. Tufts are sorted back to front and strokes are grouped by palette color at draw time; low alphas layer the fibers into clotted density. No blur, shadow, gradient, or filled blob shapes are used: the mass is strokes only.
- Breath: a shared sway field of layered sines on the 20 s cycle displaces every anchor by a few thousandths of a unit, with a faint vertical settling of the whole mass. Almost imperceptible by design.
- Slow recoil (parting): touch is recorded as data on the anchored clock, never as integrated simulation state. A live press is a point {x, y, t0}; it pushes tufts radially away inside a 0.30-unit radius with a cosine bump falloff, ramping in over about half a second to a maximum displacement of 0.20 units. When the press is released, or when a drag moves on (leaving a trail point roughly every 60 ms), the point becomes a memory whose strength decays as exp(-(t - t1) / 3.6 s), so a furrow takes several seconds to close: wool memory. Displacement at any moment is a pure function of the recorded points and the current anchored time, which keeps frame one untouched by the interaction system.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; full-bleed at every size with the shadow tone as page ground; rAF typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). All three read back and inspected.
- Determinism gate: thumb.png rendered twice and cmp byte-compared identical; the duplicate was deleted. Frame one is the explicit synchronous draw at t = 0 (breath phase zero, no pointer state). No Date.now, no unseeded randomness in the file.
- Tuning rounds during QA: (1) the first pass drew fibers as wide fans from a single point and read as zigzag chevrons; fibers were rebuilt with jittered starts, narrow angles, and sag curves. (2) A filled dark-ellipse underlay per tuft read as brown clouds and was removed; shadowed depth now comes from the dark under-layer of earth and rust tufts, thickened in a third pass so no region of the mass falls to bare background.
- Final renders: desktop shows the red fibrous mass hanging across the full width with dangling strands and an empty dark lower third; thumb keeps the clotted density at small size; mobile fills the tall frame's upper portion the same way, nothing clipped.
- An inert ?seed=t<seconds> hook (batch QA convention) forces a fixed elapsed time for headless phase checks; it does not affect normal viewing.

## Deviations

- None from the prompt's substance. The prompt's 400-700 tufts at 5-9 strokes each are implemented as 660 tufts of 5-9 fibers plus one fainter fuzz hair per fiber; the fuzz hair is a rendering detail of the same stroke data, not an added element.
