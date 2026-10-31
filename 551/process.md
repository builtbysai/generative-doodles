# No.551 Horse, Rabbit, Ghost, Smoke

EXPANSION #66 cristina-daura, prompt CD7 (The Cast Parade). Her four
named symbols walk in procession, each performing its WMN-interview
meaning: the horse is self-esteem, the rabbit is tenderness, the ghost
is funny sadness, and smoke is "selling smoke".

## Concept

A side-scrolling procession crosses a flat fauvist pink-red ground
from right to left over a thin black baseline, in loose single file.
The horse (dark red, black mane) leads, striding tall with its head
held high; it never looks sad. Behind it the rabbit (pink) hops along
drooling, and every drip of saliva that lands flips one small black
evil blob on the baseline into a white good blob. Behind the rabbit
floats the ghost (yellow), smoking a cigarette and wearing its cartoon
grin the whole way; it never stops smiling. Smoke itself is the fourth
cast member: a thick white ribbon trails behind everything. There is
no Satan here (he belongs on the lips, in CD1), no text and no UI
beyond a subtle lowercase "drag" in the bottom-right corner.

Watch-only when untouched. Dragging stirs a local gust: the smoke
ribbon ruffles and the ghost's cigarette smoke swirls harder, then
everything settles over about two seconds. Never click-to-reload.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Strict palette, nothing else: ground pink-red #E8442E, horse dark
  red #8E1F1F, ink black #111111 (mane, outlines, evil blobs), rabbit
  pink #F0438F, ghost yellow #FFD400, smoke white #FFFFFF (ribbon,
  good blobs, drool, cigarette). Flat fills only; no gradients
  anywhere; no grain layer, keeping the flat fauvist read.
- Design space 1080x1080. Baseline at y=905. Animal heights: horse
  about 17.5% of frame, ghost about 13%, rabbit about 13% with ears.
- One shared 28 s loop clock. The procession moves at a constant
  60 units/s over a 1680-unit virtual track (60 x 28), so positions
  wrap seamlessly; slots are fixed (horse 1080, rabbit 1370, ghost
  1620) and every cycle divides the loop in integers: horse stride
  1.4 s (20 per loop), rabbit hop 1 s (28), ghost bob 3.5 s (8),
  cigarette puffs 2.8 s (10), drip cycle 4 s (7).
- Horse rig: oval body, steep neck quad, mane as a bold black crest
  stroked along the neck's back edge, high head with ear, forelock,
  eye and nostril dots; four legs as two-pass outlined strokes in
  diagonal-pair walk phase; black tail streaming behind.
- Rabbit rig: hop lift from a shaped sine with a ground-contact
  squash, ears flopping on a lagged phase, white tail. Drool runs on
  the 4 s drip cycle: a bead grows at the mouth for 2.2 s, falls
  world-locked for 1.2 s, splashes flat on the baseline.
- Blob pool: 14 seeded blobs scattered along the baseline (mulberry32,
  seed 551066), black with white dot eyes. The drip schedule is
  precomputed at load from the analytic rabbit path: a drip lands at
  tc = 3.4 of each cycle (7 landings per loop), and each landing flips
  the nearest not-yet-flipped blob to white (ink dot eyes, tiny pop
  scale for 0.35 s). Blob state is therefore a pure function of t.
- Ghost rig: dome body with a scalloped hem floating above the
  baseline, dot eyes, an arc grin drawn every frame, one outlined arm
  holding a small white cigarette; four smoke puffs rise from the tip
  on the 2.8 s cycle, their swirl radius scaled by the gust.
- Smoke ribbon: chained flat segments (overlapping white circles,
  r=23 every 18 units) along a wavy path anchored behind the ghost and
  running 940 units back; two slow sine layers plus a gust term set
  the ruffle, all with integer cycles per loop.
- Gust: pointer drags feed pointer velocity into a gust value clamped
  at 1.6; it decays by 0.35^dt in the frame loop, settling in about
  two seconds. Gust is 0 in frame one and in the headless renderer.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style width/height pinned in px
  inside draw(). Phone detection via window.screen physical size
  (min dimension under 700px), aspect ratio only as fallback; on
  phones the square stage spans the full width, page ground pink-red.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 10.0 (procession mid-stride, two blob flips already
  landed at 3.4 s and 7.4 s so the pool opens mixed, a drool bead
  mid-growth on the rabbit's mouth). The animation loop is
  typeof-guarded and anchored as PHASE0 + elapsed since the first
  rAF timestamp, never derived from Date.now().

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844
  and 720x720.
- thumb.png rendered twice and byte-compared with cmp: identical
  after each fix pass; the second render was deleted each time.
- First pass read-back: composition and palette correct, ghost and
  rabbit reading well, but the horse failed: the neck quad was
  self-intersecting and the mane polygon rendered as a black blob
  burying the small head, so the animal read as a hippo-like lump.
  Fixed by rebuilding the neck as a clean steep quad, stroking the
  mane as a crest along its back edge, and enlarging/raising the
  head; re-rendered.
- Final desktop and thumb: tall dark-red horse with black mane crest
  and tail, legs mid-stride; pink rabbit hopping with ears flopped
  back and a drool bead at its mouth; black and white blobs along the
  baseline, two already flipped white; yellow ghost grinning with
  cigarette and rising puffs; thick white smoke ribbon trailing off
  the right edge; "drag" hint bottom-right; nothing clipped.
- Final mobile: square stage spans the full 390px width, centred on
  the pink-red ground, whole procession and ribbon visible, nothing
  clipped.
- Grep audit: zero Date.now, zero gradient calls, zero URLs, no audio
  or microphone, no em dashes in visible copy (only "drag").

## Deviations

- The blobs carry two dot eyes (white on the black evil blobs, ink on
  the white good blobs). The prompt calls them simply evil and good
  blobs; the eyes are the smallest mark that sells the flip from evil
  to good at gallery size, and they stay inside the strict palette.
- The drip's flip target is the nearest not-yet-flipped blob to the
  landing point rather than the exact blob under the drip: drips land
  world-locked from a moving rabbit, so the nearest-blob rule keeps
  every landing visibly answered by a flip while staying a pure,
  precomputable function of time.
- The gust is a single global value driven by drag velocity rather
  than a strictly local one: it ruffles the whole ribbon and the
  cigarette smoke together, which reads as one stir across the cast,
  and it keeps frame one untouched by pointer state.
