# №135 · Spider Diamonds - process notes

## Concept
After Char Stiles's June 2021 "spider diamonds" raymarching practice: five crystalline gem-spiders, faceted diamond bodies with eight thin legs each, drifting in a dark void. A slow pulse of light breathes through the cluster from the largest gem outward. Crystalline and calm, no anatomy, no horror.

## Construction
- Single self-contained page, no WebGL. Each gem is a true 3D octahedron rendered as a faceted construction on 2D canvas: eight triangular faces with per-face normals, flat chrome shading from one light, painter-sorted back to front, gems themselves drawn far to near. Legs are two-segment strokes projected from the same 3D points, split into back and front sets by depth so they wrap the body correctly.
- Palette is the spec's values only: void #060608, body chrome #C8CCD4, holographic fringe cyan #5AF2FF to magenta #FF3EB5, leg tips #E8FF47. The fringe is a fresnel term: faces at grazing angles split toward magenta or cyan by the sign of their normal's x. Exactly three legs carry yellow tips, all on the large foreground gem (legs 1, 4 and 6); every other tip is chrome.
- Composition: five gems, never grid aligned. The hero gem's body is 40% of frame height; four smaller gems sit at depth with perspective scale. The cluster keeps its shape on portrait frames (centered composition, ground matches the void).
- An 18s seamless loop: gems drift on small individual orbits whose period is the loop, each gem spins at an integer rate so the loop closes, legs flex on a 6s sub-period, and the brightness pulse travels by layout rank from the hero outward (pulse center is a function of loop time).
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px inside draw; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load (opened at 4.5s with the pulse between the hero and the second gem) and requestAnimationFrame is guarded so node-canvas QA works.

## Interaction
- Drag rotates the whole cluster with a trackball feel (horizontal drag yaws, vertical drag pitches, clamped); the drift, spin, flex and pulse continue underneath.
- Tapping a gem makes it flare, and, only after that touch and only if WebAudio is available, sounds one soft pentatonic sine tone (C5 D5 E5 G5 A5 by gem). Audio creation is guarded and wrapped so the piece runs silently without it, including in the QA harness.
- Never click-to-reload.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. All five gems are present at all sizes, the hero at 41% of frame height on desktop, exactly three yellow leg tips visible on the hero, legs wrapping bodies with correct front/back splits.
- One fix during QA: the fresnel fringe was initially too shy to read (only two faces tinted); the grazing threshold was lowered and the mix raised so the cyan/magenta split is visible on the hero and the nearer small gems without coloring whole bodies.
- Deviation: the prompt suggested a WebGL raymarch of an octahedron SDF with capsule legs; per the batch spec's harness rule this uses the allowed alternative, an equally faithful faceted construction in 2D canvas, which keeps the silhouette crisp at phone sizes where a reduced-resolution march would go mushy.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short ("drag to turn the cluster").
- Files: `135/index.html`, `135/thumb.png` (720x720, rendered from the live script), `135/process.md`. Gallery entry for the parent to add: №135, title "Spider Diamonds", formula date 2002 · 05 · 26, note ending "Drag to turn the cluster."
