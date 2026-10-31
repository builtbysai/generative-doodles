# No.639 "Magic Pencil"

EXPANSION #77 seba-ilabaca, prompt block 7 "Tuesday Night Automation". His #magicpencil doodle series as an automated drawing hand: one continuous pencil line grows across a warm paper page, motif stitched to motif, the tip dot riding the line head. The line never lifts.

## Concept

- Full-bleed warm paper (#EFE7D3). A single graphite line (#3A3A38) draws itself in real time: a motif from the library (botanical spiral, owl face, cocoon curl, leaf-vein), then a connective meander (vine wave with a small loop detour) stitches onward to the next motif, until the doodle fills about 70 percent of the page over roughly 60 seconds.
- Each page carries exactly ONE ink accent, cycling rust #B4572E, moss #5C7A4D, dusk blue #3A4E6B by page index. Accent segments (spiral core, owl eye rings, cocoon inner curl, leaf hatches) are part of the same continuous path: the pigment switches mid-line and the tip pauses about 0.45 s at each switch, as if dipped.
- When a page completes, it fades under a stepped paper-colored overlay (about 2 s) and a fresh page begins with a new seeded motif order and the next accent.
- TAP: the current motif hurries to completion in about 0.5 s, and the not-yet-drawn remainder of the page is regenerated so the next motif is the next family in the cycle (spiral, owl, cocoon, leaf), still without lifting. Watch-only otherwise.
- Frame one: page 1 (rust), first motif a botanical spiral drawn about 40 percent, tip dot resting on the line head in the upper-left, margins blank.

## Construction

- Path model: each page is a precomputed polyline. Points carry a pigment flag (graphite or accent); cumulative arc length is stored per point. Drawing reveals the polyline by arc length: base reveal comes from the anchored rAF clock, with state for dip pauses, tap hurry, and page fades layered on top. The tip is a graphite dot at the interpolated head position.
- Generation: mulberry32 seeded per page (639000 + pageIndex * 7919). Motifs are placed in jittered slots on a serpentine 3-column flow (5 to 7 motifs per page), first family seeded per page except page 1, which is forced to spiral. No family repeats back to back.
- Motif generators are parametric single strokes: spiral (3.9 to 4.8 turns, seeded chirality, entry angle facing the incoming pen, innermost tail in accent); owl (tufted head outline, accent eye rings with graphite pupil spirals, beak, scallop feathers; interior connectors hug the outline); cocoon (curl tendril, teardrop body, a seam drop down the middle into an accent inner spiral that starts at its top); leaf (pointed outline, midrib with out-and-back side veins, accent hatches kept inside the outline).
- Hand feel: every emitted curve passes through a smoothed seeded noise wobble that is exactly zero at segment joins, so joins stay continuous while no line is ruler straight. Line width varies about 1 to 3 px with a slow pressure rhythm along arc length.
- Stitches: meanders bow away from the target motif's center (the side is chosen per stitch) so a stitch never cuts across the motif it is about to draw; longer stitches add one loop detour whose radius swells from and back to zero, leaving and rejoining the same moving point.
- Tap regeneration: points up to the current motif's end are kept verbatim; the suffix is rebuilt in the same slots from a tap-seeded stream (pageSeed * 31 + tapCount * 104729 + 17), first suffix motif forced to the next family in the cycle. Dip-pause switch lengths are recomputed for the rebuilt suffix.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width and height pinned in px inside draw(); phone detection via window.screen (min dimension under 700) with aspect fallback, page refits as a centered square; rAF typeof-guarded; the synchronous first draw uses the fixed 40 percent reveal, never Date.now; no offscreen canvas, no filters, no audio, no external assets, no visible text besides the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Repeated after every fix round below; final state identical.
- Frame-one read-back (all three sizes): warm paper, the partial spiral in graphite in the upper-left with its small lead-in wave, tip dot on the line head inside the spiral's lower-left, generous blank margins, nothing clipped on mobile.
- Late-page check: state-forced throwaway render via the piece's ?seed=late80 hook (forces reveal to 80 percent of the page), read, then deleted. It shows the full stitch model working: spiral with rust core, cocoon with seam and rust inner curl under its tendril, owl face with rust eye rings, leaf with veins and rust hatches inside the outline, meanders bowing around motifs, tip dot visible on the leaf mid-draw.
- Fix rounds during QA:
  1. The ?seed hook originally read window.location, which the QA renderer does not provide; it now reads the global location object first. (Renderer-only issue; browser behavior unchanged.)
  2. Meander loops on very short stitches tangled into a scribble; loop radius is now capped by stitch length and loops are skipped under 0.10 units.
  3. Leaf side veins and accent hatches poked outside the leaf outline (vein reach exceeded the outline's true half-width); outline widened, vein reach and hatch extent reduced so everything stays inside.
  4. A stitch from a motif on the right cut straight across the next spiral's disc to reach its far-side entry. Fixed by facing the spiral's entry angle toward the incoming pen and bowing every stitch away from its target motif's center. Verified in the late-page render: no stitch crosses a motif.
  5. The cocoon's interior drop slashed diagonally across the body; it now drops vertically like a seam and meets the inner spiral at its top point. The owl's forehead connector now hugs the inside of the outline in two stages instead of cutting across the face.
- Grep check on the final file: no Date.now, no Math.random, no createElement, no AudioContext, no external URLs, no em dashes.

## Deviations

- Reveal timing: the brief describes reveal length as a function of the anchored clock plus tap adjustments. Implementation keeps an anchored-clock base rate and layers three small stateful adjustments on top (dip pauses at pigment switches, the 0.5 s tap hurry, the page fade). Reason: pauses and hurries are inherently event-driven; a pure closed-form clock function cannot express them. Frame one is unaffected and exactly the fixed 40 percent reveal.
- The ?seed=late80 QA hook remains in the file (inert without the query string; it only offsets the starting reveal of page 1). Reason: it is the mechanism used to verify late-page states in the headless renderer, which cannot advance rAF. It changes nothing in normal viewing.
- Page 1's spiral is drawn with 3.9 to 4.8 turns (brief's library does not fix a turn count), so the 40 percent frame one shows a little over one full turn: a clear spiral arc, per the brief's frame-one description.
