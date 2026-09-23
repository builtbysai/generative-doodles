# Doodle №9008: Field Notes (2026-09-09)

**File:** `9008/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A naturalist's sketchbook page, drawn by wind. Hundreds of inked curves walk
a noise angle field the way wind combs tall grass: broad dark sweeps first,
then medium hairlines, then a whisper-fine texture layer, and sometimes a
single vermilion or iron-gall-blue accent threading through like a red pencil
correction. The visual language is ink on paper, deliberately far from
Fidenza's thick outlined strokes on cream. Each click is a fresh page from the
same hand.

## Technique (Hobbs lessons, applied not copied)
- **Margin-extended field:** the angle grid is a continuous noise function, so
  curves start and wander up to 50% past every canvas edge and flow back in.
  No hard border logic, the margin is structural.
- **Layered passes, independent scales:** broad (coarse noise, long curves),
  detail (medium), fine (high-frequency whisper, 60% of seeds), each with its
  own noise scale, turbulence octave mix, palette weights, and stroke widths.
- **Turbulence variation:** every layer gets a second noise octave at a
  different scale mixed in as angular jitter, so broad sweeps stay smooth
  while fine layers shiver.
- **Angle quantization (rare, 22%):** a whole layer snaps its angles to 45
  degrees, giving architectural circuit-like moments inside the organic flow.
- **Density gradient:** seeds are sampled around an off-center "heart" with
  gaussian falloff, so each page has a dense cluster and open breathing room.
  The heart is pushed away from dead center, no centered blobs.
- **Non-overlap, per layer:** an occupancy grid with per-curve ids stops
  curves crossing within a layer; later layers may cross earlier ones, the
  way Hobbs layers strokes over each other. A shared grid was tried first and
  starved later layers, leaving sparse pages; per-layer grids fixed it.
- **Dry-brush ends:** butt caps only, width and alpha taper over the last 9%
  of each stroke, perpendicular jitter per segment, plus 2 to 3 short hairs
  splaying past each tip. One random layer per page (30%) breaks into dashes.
- **Weighted rarity:** fine layer 60%, accent pass 55% (12% in mono), quantized
  layer 22%, dash treatment 30%, quiet mono palette 20%.
- **Restrained palettes:** three ink families on warm paper. Sepia (vermilion
  accent), slate (iron-gall blue accent), mono (near-black inks, accent almost
  never). Five to eight colors per page including the ground.

## Seeds and variants tried
Rendered headless via CDP on an isolated Chrome (port 19733), judged against
the avoid list (hairball, rainbow, centered blob, default-troupe field):

- 101 (sepia): clean sweeps, good density gradient, no accent. Strong.
- 202 (sepia + dash): rain-like dashed hatching, distinct, composed.
- 404 (sepia): long diagonal sweeps, open breathing room. Strong.
- 505 (sepia + vermilion): dense cluster top, open lower left, accent
  threading through. Chosen as default.
- 606 (slate): quiet horizontal sweeps, restrained. Good.
- 707 (sepia + vermilion): bold black sweeps with red accents, energetic.
- 808 (slate + dash): wind-hatch texture, airy. Good.
- 909 (sepia + dash on broad): dense field sketch, busy but not a hairball.
  This seed exposed the shared-occupancy starvation bug (only 53 of ~100
  broad curves survived); per-layer occupancy fixed it.
- 911 (sepia + vermilion): accent used sparingly, like spice. Beautiful.
- 913 (sepia + accent + quantized): angular 45-degree strokes read clearly
  against the organic flow. The quantization lesson lands.
- 914 (mono), 915 (slate + quant): trait mix confirmed across families.

Every variant stayed composed; none hit the avoid list. The failure mode to
watch was sparse pages from occupancy starvation, fixed structurally.

## Why seed 505 won the default
It shows the whole system in one page: the density gradient is unmistakable
(dense cluster gathering at top, genuine breathing room at lower left), the
vermilion accent threads through without dominating, bold anchor sweeps sit
over fine hairline texture, and the dry-brush frayed ends read clearly at
thumbnail size. It looks like a page someone actually drew, which is the
whole point of the title.

## Parameters
- Seeded PRNG (mulberry32); `?seed=` in URL or click for a new page.
  `?family=0/1/2` forces sepia/slate/mono; `?still=1` renders instantly.
  `#seed=` hash form also works.
- Default seed 505 (sepia family, vermilion accent pass).
- Reveal: curves draw layer by layer over ~2.1s (broad weather first, fine
  whispers last), instant when `?still=1` or reduced-motion is set.

## Verification
- Zero console errors on default load (animated path), on `?still=1` loads,
  on click regeneration, and at 390px mobile.
- Click regeneration verified via CDP: URL seed updates, new curves generate.
- Mobile 390px: no overflow, composition holds, everything fits on the page.
- Desktop 1100px: no overflow.
- thumb.png is exactly 720x720, taken from the default seed 505 render.

## Local final screenshots
- `~/workspace/generative-doodles/9008/thumb.png` (720x720, the thumbnail)
- `/tmp/fn-shots/v9_final_default.png` (default seed 505, full page, animated)
- `/tmp/fn-shots/v8_mobile.png` (390px mobile check)
- `/tmp/fn-shots/v7_s911.png`, `/tmp/fn-shots/v7_s913.png` (accent and quantized
  layer variants)
- `/tmp/fn-shots/v6_s707.png`, `/tmp/fn-shots/v6_s808.png` (sepia and slate+dash)
