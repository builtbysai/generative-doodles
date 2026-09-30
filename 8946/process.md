# №8946 · Mold and Chisel (2026-07-09)

Seed: 247 (Mold and Chisel, from Nakaya's fog-sculpture doctrine)

Concept: the atmosphere is the mold and the wind is the chisel. The only
artist controls are emitter placement and a pressure schedule. The valve
script is drawn as a timeline strip (one row per emitter, a playhead
sweeping a 60-second cycle). A seeded wind field (layered value noise
plus gust events plus fine turbulence) sculpts the fog live. Rerunning the
same script reseeds only the wind; the previous sculpture is kept as a
ghost so the difference is visible. The difference is the weather.

Technique notes:
- Canvas 2D with an accumulation buffer (destination-out fade, half-life
  a few seconds) and a ghost buffer holding the last run's final frame.
- ~700 fog particles as pre-rendered radial sprites; velocity relaxes
  toward wind*60px/s plus buoyancy; spawn rate follows the interpolated
  pressure schedule.
- Value-noise wind: two octaves for the base flow, a cubed gust term, a
  high-frequency turbulence term. Optional streamline overlay.
- 60-second cycle auto-reruns with the same script and a new wind seed;
  run counter shown in the script strip label.
- QA: desktop 1280x800 and mobile 390x844 inspected, zero console/page
  exceptions. Thumbnail at 1280x720 after ~20s of accumulation.
