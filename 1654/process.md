# №1654 "Volumes Artificiels II" — process notes

Driver: a strange faceted volume turns slowly in blackness while drifting lights crawl caustics across its faces.

## Build
- HF7 (PP901), #217 HAL09999. Spec: `BATCH-1653-1655-SPEC.md`. Title "Volumes Artificiels II", gallery date 2006 · 07 · 23, gallery note: "A faceted volume turns in blackness as caustic light crawls across it. Watch only."
- Mesh: icosahedron, one subdivision (20 faces to 80), seeded radial displacement. Displacement is a smooth low-frequency field (three sine terms over direction) plus per-vertex jitter from a mulberry32 LCG seeded 1654, then a non-uniform scale (1.14, 0.88, 1.03), so the volume is irregular and strange, never a clean primitive. Shared edge midpoints are cached, so the mesh stays watertight.
- Light transport is computed per facet from the light positions, not painted: three point lights (warm white at weight 0.55, pale cyan at 1.00, cool white at 0.90) drift on closed-form Lissajous paths; each facet gets per-channel diffuse from all three lights with distance falloff, plus a specular term (pow 26) against a fixed camera. Back faces are drawn first at alpha 0.50 with flipped normals so the interior shows through the glass; front faces at 0.95. Facet edges are stroked twice, cyan and a warm line offset 0.7 px, for faint color fringing.
- Caustics: a closed-form band function per facet, sin(4 * dot(facet direction, light direction) + 0.30 * t + facet phase) raised to the 10th power, summed over the three lights. Where it passes 0.60 a pale-cyan or warm-white glint disc is drawn at the facet centroid; specular peaks over 0.5 get a warm-white glint. The bands crawl because the lights drift and the phase term advances.
- Motion: rotation about Y at 0.05 rad/s (2.86 deg/s) with slight precession, tilt 0.30 + 0.05 * sin(0.021 * t + 1.0). Fixed camera, no orbit. Close crop: scale 0.52 * min dimension on desktop, 0.68 * width on phones, so the mesh bleeds off the frame edges. Black ground is total, no stars, no nebula.
- Watch-only: no pointer listeners at all. Audio: silent build, as the piece is watch-only with no gesture to enable it.
- House rules: Visual Viewport sizing with visualViewport + window resize listeners; canvas.style.width/height pinned in px in size(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; fixed PHASE = 6 s first frame, rAF loop anchored as offset + elapsed-since-load, guarded by typeof check; no Math.random, no Date.now, all seeds fixed; moveTo before every arc; alphas rounded to 4 decimals inside rgba().

## Acceptance criteria (numbers)
- Vertex radius range > 0.30, proving the mesh is irregular, not a clean primitive (measured 0.3964 over 42 vertices, min 0.7952, max 1.1916, mean 1.0081).
- 80 facets after one subdivision (measured 80).
- Rotation slow, under 5 deg/s (measured 2.8648 deg/s).
- Lights drift measurably (light 0 moves 4.590 world units from t=6 to t=26).
- Facet brightness changes over time as lights drift: facet 0 brightness 0.4239 at t=6, 0.1000 at t=16, 0.1692 at t=26; mean facet brightness 0.3652, 0.3248, 0.3135.
- Glints present at frame one: 24 facets with caustic or specular glints; 18 bright facets.
- Thumb rendered twice at 720x720: byte-identical md5.
- No em dashes, no AI-signature copy, no click-to-reload, no pointer listeners, no in-piece UI beyond the standard title/date/hint plates.

## What was probed / measured
- Probe harness (/tmp/probe-1654.js, node-canvas, same shim as render-piece.js): all 9 assertions PASS. Vertex stats, facet count, rotation rate, light drift, glint counts, brightness change over time, and absence of canvas pointer listeners all verified at desktop 1280x900 and re-checked at mobile 390x844.
- Determinism: thumb rendered twice at 720x720, md5 31fce667072912fe21fdb4fa858185ba both runs, byte-identical.
- Gate renders (render-piece.js): desktop 1280x900, mobile 390x844, thumb 720x720. All three visually inspected: irregular faceted volume in glassy white-blue against total black, visible light variation across facets, pale-cyan and warm-white glints on the faces, mesh bleeding off the frame edges, plates legible at all sizes. Title plate "Volumes Artificiels II / 2006 · 07 · 23" and hint plate "Watch only." legible in all three.

## Deviations
- The prompt names three.js with MeshPhysicalMaterial and transmission. That cannot render under node-canvas QA, so the mesh is implemented in plain canvas 2D: a procedurally displaced icosahedron projected in 3D, painter-sorted triangular facets, per-facet lighting computed from the three drifting point lights, caustics faked with the closed-form band function above. The mechanism (algorithmic irregular mesh, light transport as the subject, drifting lights, crawling caustics) is the prompt's mechanism, only the renderer changed.
- The spec file's gallery note wording differs slightly from the task brief ("A faceted glass volume turns in blackness, lit by drifting lights. Watch only."); the note recorded above follows the task brief verbatim.

## Fix rounds
- Round 1: the first render read as warm beige sandstone, not glassy white-blue: the warm light at full weight dominated the diffuse sum. Fixed by cutting the warm light's diffuse weight to 0.55, cooling its color, and biasing the facet fill ramp toward blue (205/225/245 per-channel multipliers). Re-rendered: the volume now reads slate-blue and pale blue-white with warm white as an accent only.
- Round 1 also raised the displacement amplitudes (vertex radius range 0.3191 to 0.3964) and raised the caustic glint threshold from 0.55 to 0.60 so dim gray specks no longer read as dust, and widened the phone scale (0.68 * width) so the close crop holds on portrait phones.
