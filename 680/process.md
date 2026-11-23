# Doodle №8972: Eye Garden (2026-08-04)

**File:** `8972/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A field of eye-pair sprouts on a light, warm ground. Each sprout is a
small chain-follow creature: a tapered stem of 4-6 distance-constrained
segments with a springy tip, carrying a pair of toy-like eyes, an
occasional leaf, and its own energy meter. Pointer proximity feeds the
meter; the pupils dilate (iris ring blooms, eye whites widen, a faint
blush appears), the pupils turn to look at the pointer, and the stem
leans gently toward it. The meter drains with a ~2.1s time constant, so
a sweep leaves a visible wake of widening eyes that relaxes back over
seconds. Sprouts also sway idly on seeded phases and blink (a quick
vertical squash of the eye, never a colored blob). Click/tap plants a
fresh garden from a new random seed (`?seed=` rewritten in the URL).
No strobe, no noise, playful toy-like mood on an ivory ground with a
soft sun, hill, grass tufts and pebbles.

Gallery caption: "A shy little garden of sprouts whose eyes widen as you
move through them. Tap to grow a new one."

## Differentiation from adjacent used families
- vs №8998 Abyssal (living bioluminescent creature): that is ONE large
  creature in dark water, differential-growth membrane, prod recoil plus
  a traveling light wave, organelles and tentacles, deep-sea mood. Eye
  Garden is a FIELD of many small toy-like sprouts on a light ground,
  chain-follow motion, energy-meter dilation driven by pointer
  proximity. Different scale (many small vs one large), different
  interaction (proximity wake vs prod recoil), different mood (playful
  garden vs deep-sea creature).
- vs №9011 Congregation (audio-reactive voronoi agents on dark): dark
  ground, sound-driven agent system. Eye Garden is silent, light-ground,
  pointer-driven, botanical rather than diagrammatic.

## Seeds tried, default seed
Rendered headless and inspected: 75, 12, 41, 20260804 (rest state,
1280x800), plus pinned-pointer wake renders. 12 and 41 are coherent but
75 has the best composition: even field coverage across three depth
rows, no heads clipped at the viewport edge, good iris color variety.
Default seed: **75**.

## Parameters
- Seeded PRNG (mulberry32); `?seed=` in URL; tap reseeds (quick
  pointerdown/up under 14px and 600ms; drags do not reseed)
- `?px=` / `?py=` (0..1 fractions) pins a fixed pointer for
  deterministic renders; used for the thumbnail wake
- INFLUENCE 250px, LEAN_MAX 44px, RELAX_TAU 2.1s, energy feed rate 3.2/s
- Sprout count scales with viewport area (~29 at 1280x800, ~8 at 390x700)

## QA notes
- Zero console errors via `~/workspace/tools/cdp_exceptions.py` at
  1280x800 desktop and 390x700 mobile (exit 0 both).
- No scroll or overflow at either viewport (scrollWidth/Height equal
  innerWidth/Height, verified via CDP eval).
- Interaction verified headless with synthetic pointer events: a sweep
  across the garden drives pupil dilation to a clear peak wake along the
  path (screenshots compared), and 5s after the pointer leaves all
  pupils relax back to rest size. Pupils track the pointer; stems lean
  toward it and spring back.
- Tap reseeds (seed tag and `?seed=` update, new garden builds); drag
  does not reseed. Touch `pointermove` feeds the energy meter (mobile).
- Two render bugs found and fixed during QA: (1) a density tuning went
  the wrong way (fewer sprouts) and was corrected to ~29 at desktop;
  (2) the first blink implementation (green lid fill) could freeze as
  solid green blobs in stills; replaced with a vertical eye squash.
- Thumbnail `thumb.png` 1280x800 captured with a pinned pointer so the
  signature dilation wake is visible; caption and seed tag included.

## Environment notes (for future runs on this box)
- The shared port-9222/9333 Chromes are sibling agents' instances; their
  CDP scripts attach to the first page target, and opening a new tab on
  their Chrome can hijack their targeting (observed: my tab captured
  their №9027 renders). Always use a private Chrome on a free port.
- Headed Chrome under xvfb wedged at startup under load (process alive,
  DevTools port never opened). `--headless=new` on a free port came up
  in ~3s and renders 2D canvas fine.
- Headless compositor screenshots can go stale/blank; mitigations that
  worked: `Emulation.clearDeviceMetricsOverride` before setting fresh
  metrics, and reading pixels via `canvas.toDataURL()` in
  `Runtime.evaluate` for verification captures (DOM overlays excluded;
  compositor shots used for the final thumb once verified fresh).
- `Page.navigate` to an identical URL is a no-op; force
  `Page.reload` with `ignoreCache` after editing the file between runs.
