# No.634 "Pop-Up Engine"

EXPANSION #77 seba-ilabaca, prompt block 2 "Fold". From MIENTRAS UN LOBO LE CANTA A LA LUNA: his paper engineering as a living mechanism.

## Concept

A printed page that folds itself into a pop-up diorama and collapses again, on a loop. Flat, the screen is a printed sheet: a perfectly circular moon, two triangular mountains, three small trees, a straight horizon line with ants walking it, and every fold line printed as a rust dashed mark. Standing, the mountains rise on their base hinges, the trees snap vertical on tabs, the moon lifts on two parallel-fold struts, and the horizon strip becomes a low front ledge with the ants still walking it. No text anywhere; the print is the picture.

## Construction

- Single self-contained index.html, canvas 2D only. Scene drawn in a 100 x 75 unit space fitted to the viewport (Visual Viewport API sizing, resize listeners on visualViewport and window, canvas pinned in px inside draw(), phone detection via window.screen with aspect fallback).
- Projection model (2.5D, no WebGL): each hinged element is a flat printed shape plus a fold value f in [0,1]. A point at printed distance r above its hinge maps to screen y = hinge - r*(cos(f*90deg) + sin(f*90deg)*0.82), so at f=0 the drawing is the exact flat print and at f=1 the element stands at 82% print height, leaning toward the viewer. Depth is faked with three cues, all scaled by sin(f*90deg): a thin side sliver extruded along the element's right edge (uniform offset vector, darker shade of the same blue), a ground shadow triangle cast forward from the base, and a cast shadow ellipse under the lifted moon. The moon's parallel folds are two strut quads lerped between their printed rectangles and their lifted attach points under the disc. The ledge folds the other way (toward the viewer): its lower edge follows y = horizon + r*(cos + sin*0.90), with end caps and an under-shadow appearing as it rises. Crease shading near active hinges and a rust glow on every seam are driven by the analytic fold rate |dfold/dphase|, so they light only while paper is actually bending.
- Cycle: 30 s loop driven purely by phase = elapsed mod 30. Flat rest 0-4 s, fold up 4-12 s with staggered windows (mountains 4.0-9.6, trees 6.5-10 with an easeOutBack snap, moon 8-11.5, ledge 9.5-12), hold standing 12-18 s, collapse 18-26 s in reverse stagger (ledge first, mountains last), flat rest 26-30 s. Seven hinged elements total: two mountains, three trees, the moon assembly, the ledge.
- Interaction: TAP during a flat rest jumps the cycle phase to the fold-up start; TAP during the standing hold jumps to the collapse start; taps mid-fold are ignored. The jump is invisible because fold is 0 on both sides of the rest boundary and 1 on both sides of the hold boundary. DRAG left/right while standing sets an orbit value (max about 6 degrees of skew): raised apexes shift sideways and side slivers widen with it; on release it eases back to 0. Never click-to-reload.
- Ants: six ants walk the ledge strip on lanes just below the horizon hinge, ping-ponging along the strip on the raw elapsed clock (independent of cycle phase, so taps never teleport them), leg swing and antennae driven by distance walked. Their feet follow the ledge fold, so they ride the strip as it lifts.
- Palette (strict): paper #EFE7D3, fold-line rust #B4572E, night ink #1B2430, moon bone #EDE6D2, mountain blue #27405E, ant black #14110D. Shades are alpha overlays of these same colors. Seeded print detail (stars, paper grain) comes from mulberry32, seed 634077.
- Determinism: frame one is the synchronous draw at t=0: flat sheet, fold 0, ants at their seeded starts. No Date.now anywhere; the rAF loop is typeof-guarded and anchored to its first timestamp; all fold values are pure functions of phase.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- thumb.png rendered twice and byte-compared with cmp: identical (re-verified after the fix round; frame one unchanged by it).
- Desktop read-back: flat printed sheet with soft stacked-offset shadow, printed border, star ticks and grain, circle moon with three crater rings, two strut prints under the moon with rust dashed centers, two blue triangle mountains with bone snow caps and rust dashed V-creases, three tab trees with tier ticks, rust dashed hinge lines along the horizon, ledge strip with printed mid crease and dashed bottom edge, six ants on the strip. No text.
- Mobile read-back: the whole sheet refits the 390-wide frame with margins, everything legible, nothing clipped.
- Standing state verified with a state-forced throwaway render (the piece's ?seed=standing QA hook pins the phase to the standing hold; production loads have no query string): mountains standing with thin dark edge slivers and forward ground shadows, trees vertical, moon lifted high on both struts with its cast shadow ellipse on the page, ledge raised with end caps and under-shadow, ants riding the ledge. Render read, then deleted.
- Fix round during QA: the first standing render had oversized twisted side faces that read as dark fins spiking below the bases, and ground shadows that poked above the horizon behind the elements. Side faces became thin uniform extrusions, shadows became low forward-cast triangles hugging the base, ledge caps shrank. Frame one was byte-identical before and after the fix (all changed terms scale by sin of the fold angle, which is 0 when flat).

## Deviations

- The prompt offered "WebGL or 2.5D canvas"; built as 2.5D canvas because the QA renderer has no WebGL. Hinges and projection carry the effect identically.
- The mountains' V-fold is expressed inside each mountain as a printed center crease with a shaded right half (the two faces of the V), rather than two separately hinged mountain quads; the brief counts the mountains among the 7 hinged elements either way, and this keeps the flat print a single clean triangle per mountain, as printed in the book.
- Ants move continuously, including during the flat rest; they are print detail, not hinged elements, so the 7-element cap is kept.
- Star ticks and paper grain speckles are extra print marks in night ink at low alpha; they are part of the printed-page read the prompt asks for and use no new colors.
