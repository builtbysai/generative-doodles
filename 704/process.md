# No.704 Sentence of Light

EXPANSION #86 mona-hatoum, prompt block 1. After Hatoum's room of wire-mesh locker grids and a single swinging bulb: two mesh walls face each other across a dark room, and the shadows they throw are the subject.

## Concept

A dark room in loose perspective. The left and right thirds hold tall wire-mesh locker panels, twelve columns of near-square cells each, drawn as wireframe. Between them one small bulb hangs on a long cord from above the frame and swings slowly on a pendulum whose plane precesses, so the light never repeats its path. The mesh grids cast huge skewed shadow duplicates of themselves onto the back wall and the floor, computed by real projection from the bulb's position, and those crawling shadows are what the piece is about. The bulb itself stays small and dim. Watch-only; a tap reseeds the swing with a fresh push from a new angle.

## Construction

- Single self-contained index.html, canvas 2D, no assets, no text but the title. Strict five-color palette: room #0C0C0E, mesh #3E444C, shadow #000000 (alpha-managed), bulb glow #FFF3D6, floor pool #2A2418.
- Loose 3D model: perspective projection with focal length 2.2 over room units (x right, y down, z away). Mesh panels stand at z = 0.62 spanning x from 0.20 to 0.56 on each side, y from -0.60 to 0.48; back wall at z = 1.35; floor plane at y = 0.5. Cell positions carry seeded jitter (mulberry32, seed fixed per piece) so the mesh is hand-made rather than perfect.
- Projection model for shadows: for every mesh grid point P, the shadow on the back wall is the ray from the bulb position B through P extended to z = 1.35; the shadow on the floor is the same ray extended to y = 0.5 (kept only for points below the bulb, where the ray actually meets the floor). Because a point light casts a straight line's shadow as a straight line, each grid line is drawn through its projected sample points. Back-wall shadows are clipped to the wall region above the floor seam line, floor shadows to below it, so each shadow stays on its own plane.
- Softness without gradients or shadowBlur: shadow strokes are drawn in layered passes (wide/faint, mid, thin/stronger) at small fixed offsets; the bulb glow is five flat discs of falling alpha around a small near-opaque core; the warm floor pool is three flat ellipses over a fainter wide floor wash.
- The back wall and floor carry a dim wash of the glow color at low alpha (flat quad plus six layered discs centered where the bulb's light lands) so the pure-black shadows have a lit surface to register against; against the bare room color they would be invisible.
- Motion: pendulum period 18 s, amplitude 0.26-0.36 rad seeded per epoch; swing-plane azimuth starts near the lateral axis each epoch and precesses a full turn over 160 s, direction seeded. Bulb position, pool position, lit center, and every shadow are closed-form functions of the anchored clock. A tap advances the epoch: new seeded amplitude, azimuth, and precession direction, anchored at the tap time. No drag, never a reload.
- Frame one is the synchronous draw at pendulum phase 0: bulb at maximum displacement to one side, cord tilted, all shadows projected from that position. No Date.now, no Math.random; rAF typeof-guarded so the headless renderer draws only frame one.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen (min dimension under 700px) with aspect fallback; the room composition scales from the smaller viewport dimension and refits the phone frame with the grid walls keeping the left and right thirds.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and byte-compared identical (determinism gate pass); the duplicate was deleted.
- Desktop and thumb read-back: dark room, both mesh panels crisp in the side thirds, bulb displaced laterally at frame one with its cord entering from the top edge, warm pool under the bulb, fan of floor shadows at the panel bases, and the magnified shadow grid spread across the back wall. Mobile read-back: same composition centered in the tall frame, grid walls keep their thirds, bulb and glow fully in frame, nothing clipped.
- First render round: shadows drawn at low alpha over the near-black room color barely registered. Fixed by lighting the receiving surfaces (dim glow-color wash on back wall and floor) and raising shadow pass alphas; second round's six-layer wash replaced a three-layer one whose flat ring edges were too visible.

## Deviations

- The prompt's technical note suggests a radial gradient for the bulb. House rule forbids gradients; the glow is built from layered flat discs at falling alpha instead, and the same technique supplies the soft shadow edges and the wall/floor light falloff. Visual intent kept.
- The two mesh walls are drawn as front-facing panels in the left and right thirds rather than as corridor side walls in full perspective; the prompt's composition line places the grids in the left and right thirds, and front-facing panels keep the cells legible while their projections supply the perspective drama. Recorded as a reading of the prompt, not a change of subject.
