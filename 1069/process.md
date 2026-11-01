# The Fabrication Inventory

## Concept

No. 1069 turns Yoichi Sakamoto's border 2015 fabrication inventory into the performance itself. Twenty-five fabricated objects cross a dark parade ground in a closed, machined procession: WHILL-like mobilities, white omni-wheel cubes, and stereo-camera headsets. No performer or body appears. The order matters: the cubes run ahead of the headsets in the direction of travel, so the headsets trail the cubes as the later manufactured layer.

## Construction

- A single self-contained HTML file draws the piece with Canvas 2D.
- The world is a 1000 by 1000 square fitted to the Visual Viewport. Canvas CSS size is pinned in pixels on every draw. Resize listeners are registered on both `visualViewport` and `window`.
- Phone state is determined from the physical `window.screen` minimum dimension when available, with the portrait aspect ratio as fallback.
- The route is a closed five-lane serpentine with a left-side return. Its segment lengths are accumulated, and each object position is a closed-form function of piece time along that route. The full circuit repeats every 60 seconds.
- Inventory construction is explicit in the script:
  - `addObjects('headset', 10, 'HEADSET', 'STEREO')`
  - `addObjects('cube', 5, 'CUBE', 'OMNI')`
  - `addObjects('mobility', 10, 'WHILL', 'OPTITRACK')`
- The headset group is assigned earlier route offsets than the cube group. Because travel advances toward larger route offsets, the five cubes are ahead and the ten headsets trail them. The ten mobilities complete the procession.
- Mobilities are slate rounded seat forms with four white marker dots. Cubes are pale square bodies with dark corner omni-wheel marks. Headsets are near-black visors with paired cyan lens eyes.
- Dragging an object moves it directly with the pointer. On release, the stored displacement decays exponentially, so the object visibly steers back into its route slot.
- A quick tap on an object displays only its prompt-specified mono readout, such as `CUBE 02 / OMNI`, for 3.6 seconds. A double tap reseeds the parade by advancing the generation, clearing stored displacements and the readout.
- Audio is created only after the first pointer gesture and only when an AudioContext constructor exists. It uses low-volume sine and triangle oscillators for the electric glide and omni-wheel whir. A short guarded tone accompanies the spec readout. The QA renderer remains silent.
- Frame one is synchronous at fixed phase `t = 20` seconds. Animation time is then advanced from the `requestAnimationFrame` timestamp when that API exists; the call is type-guarded.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: `qa-desktop.png`, 1280 by 900.
- Mobile: `qa-mobile.png`, 390 by 844.
- Thumbnail: `thumb.png`, 720 by 720.

Visual inspection of all three final renders confirms:

- Exactly 10 mobilities, identified by slate rounded bodies and white marker dots.
- Exactly 5 white cubes.
- Exactly 10 headsets, identified by dark visors and paired cyan eyes.
- The five-lane formation fills the stage and remains readable at mobile size.
- No people, performers, or frame-one text are present.
- No object is clipped on mobile.

Determinism check: the 720 by 720 thumbnail was rendered twice and compared with `cmp`; the two files were byte-identical. The duplicate render was deleted.

Deviations: none in inventory counts, palette, object order, or specified interactions. The only implementation constraint is the required browser gesture gate for audio; sound therefore begins on the first visitor interaction rather than automatically.
