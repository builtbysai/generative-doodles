# Motion Edit

## Concept

No.1084 is Tatsuya Ishii's motion-editor seat made into a pure piece: the Syn control panel as a still, watch-only instrument. A CAD-dark viewport holds the show's machines as thin blue-gray wireframes — the mobile wall as a slab, the monolith as a tall thin slab, the winch truss as a webbed triangle — and over them run the glowing cyan motion paths the machines will replay. Small white square markers travel the paths at constant spec speed. Below, a timeline strip sweeps a magenta playhead across four test segments, and each time a machine completes its loop the path flashes once and the test counter steps up. The aesthetic is blueprint precision: no camera, no decoration, the path is the line.

Frame one is fixed at 14 seconds into the 40-second suite. The counter reads TEST 02, the playhead sits 35% across the strip, and the three machines stand at three different arc positions: the rail machine just onto its top straight, the triangle machine high on its ellipse, the S-route machine around the bottom of its loop, each with its travelled segment lit behind it.

## Construction

Each of the three paths is precomputed once as a sampled closed polyline with an arc-length lookup table, so a machine's position is a closed-form function of time — constant speed along the arc, never eased, never frame-integrated:

- The wall's rail run: two long straights joined by semicircle ends, a thin capsule loop across the top of the viewport.
- The triangle's height/roll figure: a tall ellipse, tilted, ringing the truss wireframe.
- The monolith's S-route: a closed Catmull-Rom loop whose outer edge runs a genuine S down the middle of the scene and returns along a straighter edge.

Every machine completes its loop exactly once per 40-second suite. Their phase offsets are staggered so the completions land at 10, 22, and 31 seconds into the suite. The TEST counter is a pure function of the suite phase — 1 plus the number of wrap times already passed — so it climbs TEST 01, 02, 03, 04 across the suite and resets with the loop. The completion flash is likewise closed-form: a decaying window of about a second after each wrap time, drawn as extra width and alpha on that path's full loop. The lit segment is redrawn each frame from the stored samples between arc 0 and the machine's current arc position, as a wide low-alpha pass under a thin full-strength pass. No canvas fading, no trails: the path itself is the record of travel.

The wireframes are stroked line work only: two pseudo-3D slabs (front face, offset back face, corner joins, one seam line each) and the triangle with its inner web and base rail. The timeline is a filled track with five ticks marking the four test segments, the magenta playhead with its square head, and the counter in small mono at the left. The only other text is the specced corner labels, "VICON LOCK" and "300mm/s", in the same muted blue-gray mono. The piece is silent — no sound is specced for the editor's desk — and it takes no input at all: watch-only, per the prompt.

The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, and detects phones from the physical screen size with an aspect fallback. The square composition — viewport above, timeline below — is centered and holds at phone size. The animation loop is guarded when requestAnimationFrame is unavailable.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 800, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows the CAD-dark viewport inside its thin frame: "VICON LOCK" at top-left and "300mm/s" at top-right in muted mono, the wall slab at left, the monolith slab at center, the truss triangle at right, all in blue-gray wireframe at restrained alpha. Three cyan paths cross the scene — the rail capsule at top, the tall ellipse around the triangle, the S-route down the middle — each drawn dim in full and bright along the segment its white square machine has already travelled, the machines at three clearly different positions. The timeline strip below shows "TEST 02", the segmented track, and the magenta playhead partway across. The mobile frame keeps the whole square composition, viewport over timeline, with labels and counter still legible and nothing clipped. The only visible text in any render is the specced test text.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted. The synchronous first frame uses a fixed 14-second phase offset into the suite, so the first frame — machine positions, lit segments, counter, playhead — does not depend on wall-clock or setup time.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title and the specced labels and counter, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, audio, or microphone access.

## Deviations

- Each machine completes its loop once per suite rather than continuously re-running at a shared rate. The prompt asks for completions that visibly increment the counter from TEST 01 to TEST 04 inside one loop; staggering one completion per machine (plus the suite's own reset) is what makes the counter's climb legible while every machine still travels at an unvarying constant speed along its path.
- The S-route is a closed loop whose working edge runs the S, with a straighter return edge, following the brief's requirement that all three paths be closed and arc-length parameterized. The S itself is drawn exactly as authored; the return edge is what lets the machine loop without teleporting.
