# Doodle №9014: Oscillons (2026-09-16)

**File:** `9014-oscillons/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Waveforms drawn the way a cathode-ray oscilloscope draws them: a bright beam
sweeping phosphor, glowing brighter where it lingers. The gallery's first dark
piece. Lineage: Ben Laposky's Oscillons (1950s, from the TGAM study's
pre-digital thread) — but these are synthesized, not photographed: layered
exposures in phosphor mint, cyan, and amber on near-black, with the grain and
falloff of analog film.

## Technique synthesis (from study, not copied)
- **Two scope modes per piece**: X-Y mode (perturbed Lissajous figures) and
  sweep mode (time-domain waveforms), the way a real bench scope behaves.
- **Beam-physics shading**: each trace is drawn per segment with alpha
  proportional to 1/segment-speed, so turnaround points bloom and fast
  sweeps go dim — the single most convincing analog touch.
- **Anti-cliché discipline**: pure Lissajous reads as screensaver. Every
  figure gets harmonic distortion plus slow noise wobble, so lines feel
  hand-tuned on analog knobs. Trace counts cut from 5-9 to 3-6 after a busy
  seed rendered as spaghetti; one dominant central figure, dimmer satellites,
  generous dark space.
- **Analog finish**: additive (`lighter`) blending for phosphor glow, halo
  pass under each trace, film grain, faint screen glow, whisper of scanlines,
  CRT-style edge vignette.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new variation
- Default seed 424242: mint butterfly sweep with a cyan spiral core

## Verification
- Rendered via headless Chromium CDP at 8 seeds across two code iterations;
  every seed reads as an instrument photograph, none as screensaver
- Desktop + 390px mobile viewports: no overflow, composition holds
- Zero console errors on load and click
- Click regeneration verified (new `?seed=`, redraws in place without reload)
- Thumbnail 720x720 from seed 424242
