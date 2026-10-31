# No.766 "Gas on a Puddle" (EXPANSION #93 larry-bell, block 7)

## Concept

Larry Bell's own description of his vacuum-deposited coatings: the same
phenomena as seeing a little gas on a puddle at a filling station. The piece
is that stain, abstracted flat: an irregular dark blob floating on a flat
asphalt-gray field, its interior filled with concentric thin-film
interference bands in violet, gas gold, and teal, with a single magenta
passage in the cycle. Narrow bands on a near-black field, no rainbow wash,
no puddle photography, no oil-slick cartooning. The film slowly breathes,
spreading and contracting on a 40 second cycle, the bands rippling inward
as it spreads. A tap drops a ripple that scatters the bands around the
touch point and settles over about eight seconds; dragging smears the film
so the stain leans and trails after the finger.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no
  audio, no visible text besides the title.
- Strict palette only: film dark base #1E2226, interference violet
  #7A6FA8, gas gold #D8B46A, teal #5FA8A3, magenta shift #A86F8E,
  background asphalt #3A3D40.
- Blob: a polar radius function R(theta) = 1 + sum of five seeded
  harmonics (k = 2..6, amplitudes about 0.30 in total, mulberry32 seed),
  standing in for the metaball control points of the prompt. Each harmonic
  has a very slow phase drift, so the outline wanders organically without
  ever becoming a star or a circle. The edge is softened with three
  concentric shells of the dark base at falling alpha under the solid
  base fill.
- Bands: 120 concentric ring strokes, each following the blob outline at
  a fixed radius fraction, so the rings are automatically clipped to the
  stain. Ring color is sin(distance * k + phase) mapped through a narrow
  interference LUT (dark base, violet, gold, teal, one magenta stop,
  violet, dark base). Ring alpha rides the same sine, so bands crest
  bright and sink softly into the dark base rather than ending in hard
  lines; alpha also fades out across the outer 14 percent so the film
  dissolves at its rim.
- Breath: closed-form. Radius scale is 1 + 0.085 * sin(2 pi t / 40), and
  the band phase includes a term proportional to the same sine, which is
  what makes the rings ripple inward while the film spreads and drift
  back as it contracts, plus a slow steady phase creep.
- Touch: pointer events are recorded in an event list. Each tap adds a
  ripple: an expanding ring wave (front speed proportional to frame size)
  whose envelope decays over 8 seconds. Ring vertices are displaced
  radially by the summed ripple field, so the bands scatter locally
  around the touch and settle. Drag samples are kept in a short trail;
  the blob centre leans up to 10 percent toward the exponentially
  weighted fresh end of the trail, which reads as the film smearing and
  relaxing. Everything is a closed-form function of the recorded events
  and t.
- Frame one: drawn synchronously at t = 0 with empty event lists, at the
  breath cycle's mid-radius point. No Date.now, no Math.random at draw
  time; all randomness is the one seeded precomputation at load.
- Sizing follows the house rules: Visual Viewport API with resize
  listeners on visualViewport and window, canvas style width and height
  pinned in px inside draw(), phone detection via window.screen minimum
  dimension under 700 px with the h > w * 1.15 aspect fallback. The blob
  radius is 30 percent of the smaller frame dimension (about 60 percent
  of the frame across), so it scales identically on phone and desktop.
- The animation loop is guarded by a typeof check on
  requestAnimationFrame; in the QA renderer (no rAF, no AudioContext, no
  document.createElement, no offscreen canvas, no ctx.filter) only the
  synchronous first frame draws, which is exactly what the thumbnails
  capture.

## Deviations

- The metaball implicit field is realised as a seeded polar radius
  function rather than a per-pixel field threshold. Reason: the QA
  renderer has no offscreen canvas or per-pixel pipeline to threshold a
  field into, and the polar form gives the same organic single-loop
  outline, the same inside/outside test for the rings, and a closed-form
  shape at any t. The visual contract (irregular dark stain, soft edge,
  bands clipped to the blob) is unchanged.
- Ripples displace ring radii instead of offsetting band phase per pixel.
  Reason: phase is a property of a whole ring in this construction, so a
  spatially varying phase is not available; radial displacement produces
  the same visible scatter of the band pattern around a touch point and
  settles on the same 8 second envelope.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas):
  - qa-desktop.png at 1280x900: flat asphalt field, one irregular dark
    stain centered at about 60 percent of frame width, filled with
    narrow concentric interference rings in violet, muted gold, teal,
    and a magenta passage; edges soft, no rainbow gradient, nothing
    clipped.
  - qa-mobile.png at 390x844: same stain centered in the tall frame at
    about 60 percent of frame width, fully inside the frame with margin
    on all sides, bands legible at phone scale.
  - thumb.png at 720x720: matches the desktop read at square crop.
- Determinism: thumb.png rendered twice and compared with cmp; byte
  identical. The duplicate render was deleted.
- Palette audit: only the six specced colors and their interpolations
  are drawn; background is exactly #3A3D40 and page ground matches, so
  the full-bleed field is seamless.
