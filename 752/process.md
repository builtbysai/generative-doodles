# No.752 Disc Float

EXPANSION #92 robert-irwin, prompt block 1 "Disc Float". After Robert
Irwin's disc paintings (1966-69): a convex aluminum disc, sprayed in dozens
of layers of automotive paint and lit by four sources, that reads only
through the shadows it casts.

## Concept

A pale disc hangs centered on a near-identical off-white wall. It has no
visible support, no fixture, no frame: it exists because four unseen lights
throw its shadow onto the wall behind it, and where the four soft shadow
masses overlap they leave a luminous quatrefoil standing between their
arcs. The disc itself never moves. The lights do, on a slow three-minute
orbit, so the shadow field breathes and the disc seems to hover, settle,
and sink in indeterminate space. Disturb the light by dragging and it
settles back; hold, and the piece gives up its apparatus entirely and
dissolves into natural light, the disc merging with the wall until nothing
is left to look at.

## Construction

- Strict palette, nothing else is ever drawn, all within one step of
  off-white: wall #E8E8E6, disc aluminum #C8CCCF, shadow cool #9AA0A6,
  warm rim #F5EFE6, quatrefoil glow #F2F0EA.
- Soft shapes without gradients or shadowBlur (house rule): every shadow,
  glow lobe, and shade mass is a softBlob, a stack of 4 to 10 layered alpha
  copies of one ellipse, scale stepping down to 0.54 of full size with the
  per-layer alpha ramping up toward the center, so the copies accumulate
  into a melt instead of a set of rings. One fix round during QA: the
  first stack (6 coarse layers) banded visibly; the steps were made finer
  and the alpha ramp added, and the banding went away.
- Quatrefoil: four broad glow lobes centered on the diagonals at 0.52 R
  from the disc center, each about disc-sized, over one broader faint pool
  at 1.45 R. Their overlaps pool the glow color behind the disc into the
  four-petalled field. Overall glow strength breathes once per orbit
  (plus or minus 12 percent on a sine of the orbit phase).
- Cast shadows: the four sources sit at the diagonal azimuths (two above,
  two below, the classic Irwin rig). Each source throws a disc-sized soft
  shadow blob displaced opposite its azimuth by its throw length (0.24 to
  0.30 R, scaled by 2.2 for presence). The four blobs ring the disc on the
  diagonals; the bright quatrefoil is what their arcs leave standing.
- The light orbit: 180 s, seamless. Each azimuth drifts on a sine of the
  orbit with an integer ratio (1 or 2 cycles per orbit) and amplitude
  0.28 to 0.36 rad; each throw length breathes on its own integer ratio
  (1 to 3). All ratios are integers, so the rig is exactly periodic with
  the orbit, and at t = 0 every drift is zero: frame one is the canonical
  diagonal state.
- The disc: drawn last and never moved. Convexity is layered inside the
  silhouette: a cool shade mass low and right, two warm light pools high
  and left, a small glow core, then two rim arcs, warm on the upper-left
  edge where the surface turns toward the light, cool on the lower-right
  where it rolls away, and one faint full glow ring just outside the edge
  so the rim dissolves into the quatrefoil rather than ending on a hard
  circle.
- Light-state machine (all state is a closed-form function of elapsed
  time plus the recorded pointer events):
  - LIT (weight 0): the four sources burn, shadows and glow at full.
  - A press held still for 1.2 s or longer toggles the target: LIT to
    NATURAL or NATURAL back to LIT. The weight crossfades over 8 s with a
    smoothstep; as the weight rises the shadows and glow fade out, the
    disc's shading flattens, and its base color lerps from aluminum to
    the wall color, so at weight 1 the frame is uniform wall.
  - NATURAL persists. A plain tap (under 0.5 s, no drag) while in NATURAL
    restores LIT over the same 8 s fade. A tap in LIT does nothing: there
    is no click-to-change-lighting, the hold is the only door.
  - DRAG: horizontal drag records an azimuth offset (0.004 rad per px,
    clamped to plus or minus 1.0 rad) applied to all four sources while
    the pointer is down; the disc is not touched. On release the offset
    eases back to the orbit over 4 s with a smoothstep. A moved pointer
    cancels any pending hold.
  - Mode events are stored as {t, from, to} with from equal to the weight
    evaluated at the event instant, so a toggle mid-fade folds exactly.
- Sizing: canvas from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas.style.width/height pinned in px
  inside draw() every frame; devicePixelRatio applied to the backing
  store only. Phone detection via window.screen (min dimension under
  700 px), aspect h > w * 1.15 as fallback only. Disc diameter is 45
  percent of frame width, capped by 1.42 times frame height so disc and
  shadow field stay inside wide frames; on phones it is 45 percent of the
  smaller dimension. Page ground is the wall color, so the wall continues
  past the canvas edge in spirit.
- Determinism: the orbit, glow breathing, and all fades are pure
  functions of loop time and the event record. Nothing is derived from
  Date.now() and there is no Math.random; no seeded RNG was needed, the
  rig constants are fixed. The rAF loop, where present, is anchored at
  its first callback timestamp plus elapsed time and is typeof-guarded;
  the QA renderer has no rAF, so QA renders are exactly the synchronous
  frame. Inert QA hooks (house convention): ?seed=tNN offsets the start
  time for state-forced checks, ?seed=nat draws the fully dissolved
  natural-light state; without a parameter the piece starts at t = 0.
- No audio, no microphone. No visible text anywhere; the only text is the
  document title.

## QA log

- Rendered with the house renderer at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice back to back, cmp byte-compare
  identical, before and after the softBlob fix round. Second render
  deleted.
- Desktop read-back: wall fills the frame; the disc floats centered at
  45 percent of frame width, aluminum pale against the wall, warm pool
  high-left, cool shade low-right, warm and cool rim arcs on the turned
  edges; behind it the four shadow masses overlap into the quatrefoil,
  their arcs soft with no hard ring anywhere. Nothing saturated, nothing
  outside the palette.
- Mobile read-back: same composition at 45 percent of the smaller
  dimension, centered in the tall frame, shadow field complete, nothing
  clipped.
- State-forced checks (throwaway renders, read back, then deleted):
  ?seed=t45 shows the orbit mid-swing, the shadow field swung asymmetric
  around the unmoved disc, as the closed-form rig predicts; ?seed=nat
  shows a uniform wall field, the disc fully dissolved, no shadow, no
  glow, no edge, the natural-light end state the hold leads to.

## Deviations

- The prompt's radial-gradient disc and blurred shadow arcs are built
  from layered alpha shapes instead, per the house no-gradient and
  no-shadowBlur rule; the read (convex disc, melting edges) is unchanged.
- The prompt leaves the exit from natural-light mode open ("a long-hold
  fades to natural light mode"). Implemented as: hold toggles the mode in
  either direction, and a plain tap also restores the lit state from
  natural, so a visitor who dissolves the disc is never stranded on a
  blank wall. Recorded here because the state machine is this build's
  choice, not the prompt's text.
