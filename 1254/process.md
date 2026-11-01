# №1254 "Traverse" — Jenna Maurice study block JM7 (PP413)

After Maurice's *Subtle Appearances* (2016), her attempt to walk through a
mountain, and her *Traverse* performances at Union Hall (2023). A deadpan
figure tries to walk through a mountain. It never gets through. It never
gives up. The mountain does not care.

## The scene

A huge ridged massif fills the right of the frame, built from three layered
ridge polygons (farthest palest) over a pale, nearly still sky: the near
face is a nine-point seeded polyline from the slope foot (0.30·W, ground)
to the apex (0.70·W, 0.15·H), with flat facet-shading slabs down its left
segments, a deeper facet plane on the right face, a jagged snowline band
following the upper ridge and spilling over the apex, snow caps on the two
back ridges, and a speckled scree apron along the base. One flat cloud
band drifts at under a pixel per second. That is all the weather there is.

The mountain is generated once per run from the seed and never moves,
never reacts, never acknowledges the figure. Only a double-tap reseeds it.

## The figure and the attempt cycle

The figure is a small faceless blush body (~5% of frame height): soft
capsule torso, plain circle head, two legs, two arms. No face — it is a
body doing a task, not a character.

Attempts run on a strict 60-second cycle, each at a hashed spot on the
lower face (surface arc fraction 0.10–0.36, so some attempts shove at the
base and some start a little way up the face):

- **Approach (0–10 s):** walks from its staging point to the slope foot,
  then climbs the face to the attempt point.
- **Lean / push (10–22 s):** eases in over 1.2 s to a hard lean (tilt
  ≈ 0.54 rad) with a slight squash; both arms are drawn in world space
  from the transformed shoulder to real contact points on the rock face
  (at surface fractions +0.030 and +0.058), with short palm segments laid
  along the surface tangent — the hands are genuinely flat on the rock.
  A dark contact shadow sits at the push point. The strain is an 8 fps
  stepped tremble, ±1 px, hashed per step.
- **Slide (22–26 s):** accelerating slide back down the face to the base,
  body tipping into a slight tumble, arms flailing once. On landing, a
  scatter of six pebble dots appears at the base below the attempt point;
  scatters from the last three attempts persist.
- **Recover (26–32 s):** stands (tilt unwinds over 0.8 s), a three-dot
  dust puff, a few steps back, then stands still gazing up at the
  mountain.
- **Reposition (32–60 s):** ambles at Maurice pace to the next staging
  point and, if it arrives early, simply stands there looking up. The
  mountain is given time to be looked at.

## Interaction (recorded events, closed-form state)

- **Drag** sets the *next* attempt point: the pointer's x is matched to
  the nearest surface point (searched over the face) and stored as an
  override for the upcoming attempt.
- **Tap** asks the figure to sit. If it is walking, recovering or
  waiting, it sits immediately; if it is mid-lean or mid-slide, the sit
  is queued for the recover phase. A sit lasts 8 seconds: the schedule
  clock holds, and the figure is drawn seated — lowered body, legs
  folded forward, facing the mountain. Defeat as rest, not as ending.
  (Taps are debounced 350 ms against double-taps.)
- **Double-tap** reseeds: salt increments, the mountain rebuilds, sits
  and overrides clear, and the run clock restarts at the fixed phase.

All state is a pure function of schedule time plus the recorded event
lists (sits, overrides) — nothing is frame-integrated.

## Determinism

The synchronous first frame is drawn at exactly **T0 = 18 s**: attempt 1,
8 seconds into the lean — figure at surface fraction ≈ 0.22 of the face,
tilt fully eased in, tremble on step ⌊18·8⌋ = 144, arms pressed to the
rock, contact shadow set. No pebbles yet (the first slide is still four
seconds away; the scatter belongs to this attempt's ending, not its
middle). The animation clock then runs as T0 + elapsed, anchored, with
rAF typeof-guarded. Seeded integer hashes only; no Math.random, no
gradients, no filters, no shadowBlur, no offscreen/ImageData, no audio.
Canvas is sized from the Visual Viewport API with resize listeners on
both visualViewport and window, and its CSS size is pinned in draw().

## Palette

Sky #DCE4E6, cloud #EDF1F2; ridges #7C848E / #6E7680 / slate #5C6470,
slate dark #4D545F; shadow #3A3F47; snowline #CFC9BC; scree #989CA1 with
#7E8288 speckle; ground #C6C9BF; figure blush #C98A7D with #AC7264 /
#8F5B4F limb tones.

Silent. No text anywhere but the title.
