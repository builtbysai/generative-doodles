# No.528 Hortus

EXPANSION #63 giulia-conoscenti, prompt GC8 ("Frog Garden", after "Hortus Botanicus").

## Concept

A surreal walled garden in flat saturated gouache: a giant red-trunked tree at the center, blue art-nouveau gates standing open at both sides, and chunky toy-like frogs perched everywhere — on the gate arches, on the branch tips, on the hedge, on the ground — with one giant blue frog anchoring the foreground. In the lower third a small woman in a red top holds a tiny frog whose long pink tongue flicks out to touch her nose every few seconds. Dragging scatters the nearby frogs: they leap away from the touch and settle on new perches.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette is flat fills only, exactly the listed 8 colours: tree red `#C8352A`, gate blue `#2B4FE0`, gold frog `#F5B301`, turquoise frog `#35C4B5`, blue frog `#2B7DE0`, woman's red top and sun `#E6392B`, sky cream `#F7F2E4`. No gradients anywhere. (Precomputed grain specks use low-alpha dark/warm strokes, the same house treatment as the sibling pieces.)
- Square stage fitted from the Visual Viewport API (resize listeners on `visualViewport` and `window`), letterboxed on the cream page ground; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` min dimension < 700px with the `h > w*1.15` aspect fallback.
- Frogs are parametric blobs drawn in unit space (body ellipse, folded or stretched hind legs, feet, cream belly patch, two eye bumps with cream + tree-red pupils, tree-red smile). Six free frogs in three scales: small (0.046–0.055 stage width) on the gate arch, canopy top and branch tips; medium (0.070–0.075) on the ground and hedge; one giant blue frog (0.170) in the foreground. Each free frog cycles a fixed route of perches (branch tips, gate arch tops, canopy top, ground spots, bush top, hedge top); hops are parabolic arcs with stretch in the air and a landing squash, sit times come from a per-frog seeded duration sequence, and seated frogs breathe with a subtle squash.
- Interaction: pointer down/drag calls a scatter — any seated frog within 0.38 stage units of the touch immediately hops to whichever perch on its own route is farthest from the touch point, then resumes its loop. No click-to-reload anywhere. One subtle lowercase hint, "drag", bottom-left.
- The woman is a small flat glyph (tree-red hair cap and sleeve, cream face, red-top torso, gate-blue legs) at the lower-left of center; the tiny turquoise frog sits in her outstretched hand. The tongue is a flat pink stroke with a round tip on a 4.6s cycle: out in 0.18s, held, retracted by 3.3s, tip landing exactly on her nose. At the constant first-frame phase (2.0s) the tongue is fully retracted.
- Tree: tapered red trunk path with root flares, three red branch strokes, and a canopy of ten hand-placed turquoise blobs with 15 seeded gold fruit dots. Gates: posts, a semicircular arch, and an open door drawn as a foreshortened swung panel with spindles and a spiral curl medallion with a gold center, mirrored for the right side. A scalloped turquoise hedge runs along the back of the floor; gold/turquoise flower dots are sprinkled on the ground.
- Grain: 620 precomputed seeded speck strokes (mulberry32, fixed seed 528063) drawn directly each frame; no offscreen canvas is ever created.
- Determinism: frame one is a synchronous `draw(PHASE0)` at the constant phase 2.0s — every frog seated at its home perch, tongue retracted, first hops scheduled 2.6–5.2s later. The rAF loop (typeof-guarded) is anchored as `PHASE0 + elapsed since first frame callback`; no clock value feeds frame one.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical, re-verified after each fix pass. Second renders deleted.
- Desktop/thumb read-back: cream sky, red sun disc with rays top-left, blue arched gates open at both sides with spindled doors and curl medallions, red tree with turquoise canopy and gold fruit at center, frogs at three scales (turquoise on the left arch, blue and gold on the branch tips, gold on the ground left, turquoise on the hedge top right, giant blue in the foreground), the small woman in the red top holding her frog in the lower third, scalloped hedge and floor dots along the bottom, "drag" hint bottom-left.
- Mobile read-back: square stage centred on the cream ground, whole composition in frame, nothing clipped.
- Fix pass 1: the two branch-tip frogs were buried inside the canopy silhouette (and the left one was turquoise-on-turquoise). Moved both branch perches to the branch tips just below the canopy edge, extended the branch strokes to meet them, and recoloured the left branch frog blue and the gate/canopy-route frog turquoise so every frog reads against its ground. Floor dots were also shifted right so none lands on the "drag" hint.
- Fix pass 2: the far-right turquoise frog sat inside the turquoise hedge band and read as a floating face. Its home perch moved to the hedge top, where the whole body sits against the cream sky.

## Deviations

- Tongue colour: the prompt's palette names no pink. The tongue is a flat pink `#EE8C7E` mixed from the listed sun red `#E6392B` and sky cream `#F7F2E4` (roughly 55/45), chosen over a low-alpha red so the flick reads as a solid gouache shape at thumbnail size; it is the only mixed colour in the piece.
- The giant foreground frog does not hop. The prompt fixes it as the foreground anchor ("one giant blue frog in the foreground"), so it breathes in place while the other five frogs run the hop loop and the drag scatter; a 0.17-wide frog leaping the garden would also wreck the composition's scale ladder. Recorded here rather than silently.
- Frog eye pupils and smiles use the listed tree red `#C8352A` (the palette has no black or brown), and bellies use the listed cream at 45% alpha — both stay inside the 8-colour list.
