# Four Hours - №1846 (PS7, PP1093, phillip-sollmann #241)

## Build
- Date: 2007 · 01 · 31 (formula date 2002-01-10 + 1847 days).
- Template: live №1841 index.html fetched fresh via gh_api.py (sha e9690a9d6f420e4be81aed69460e4968b0ee48aa); page structure, plates, Visual Viewport sizing, phone rules and sound-plate pattern mirrored from it.
- Canvas 2D only. No WebGL, so no substitution was needed.
- Gallery note: "A slow tide of brightness crosses the floor; no peaks, no drops. Watch only."

## The piece
A near-black field (#070708) of small lights, like a dance floor seen from the booth. The field fills the frame to the edges on every screen: no booth, no DJ, no architecture, no crowd silhouettes. One slow tide of brightness moves through the field as a band of slightly brighter glow; lights swell and recede in long rippling shapes with a dull gleam. No peaks, no drops, no strobe, no climax. WATCH ONLY: the tide cannot be steered. The only click target is the Sound plate, which toggles the audio bed; it never reloads or reseeds anything.

## Light count and phase table
- 340 lights, seeded with mulberry32(1846). No Math.random or Date.now anywhere in the piece.
- Warm amber 62 percent (211 lights), cool white 38 percent (129 lights). Amber core #F5C46A with halo #E8A33D; white core #FFFFFF with halo #DDE3E8.
- Positions: x in [0.012, 0.988], y in [0.015, 0.985] of the field, uniform seeded.
- Core radius: 0.0016 to 0.0044 of min(VW, VH), seeded.
- Base brightness: 0.55 to 0.85, seeded.
- Individual phase: uniform in [0, TAU), seeded.
- Individual swell period: 8 to 20 seconds, seeded.
- Tide coupling: 0.35 to 0.80, seeded.

## Tide law
- Tide coordinate: d = (x cos 0.62 + y sin 0.62) / (cos 0.62 + sin 0.62), so d = 0 at the top-left edge and d = 1 at the bottom-right edge. The band runs diagonally across the field.
- Tide center: c(t) = (t / 720) mod 1, one full crossing every 12 minutes, moving from top-left toward bottom-right, wrapping at the edges.
- Tide glow: Gaussian around the center, width 0.20, wrapped so the band re-enters cleanly: g = exp(-dist^2 / (2 * 0.20^2)).
- Global slow LFO: 1 + 0.15 sin(TAU t / 240 + 0.8), a 4-minute swell of the whole floor.
- Per-light brightness (closed form of piece time only):
  b = base * LFO * (0.62 + 0.38 * swell) * (1 + coupling * 0.85 * tideGlow),
  where swell = 0.5 + 0.5 sin(TAU t / period + phase), clamped to [0.05, 1].
- A faint warm radial wash (max alpha 0.05) sits under the band center so the tide reads as a moving band of glow, not only as brighter dots.
- Each light is drawn as a soft halo (radius 3.2x core, alpha 0.10 * b) plus a dull core (alpha 0.28 + 0.62 * b). Maximum core alpha stays below 1, so nothing ever flashes or peaks.

## Frame-one state
- Fixed phase t = 60 s. Tide center c(60) = 60 / 720 = 0.083, a band near the top-left edge, moving toward the bottom-right. The top-left lights sit in the tide and read slightly brighter; the bottom-right is at its dimmest.
- Mean light brightness at t = 60 s is about 0.55 (probe meanBrightnessAt). No coincidence or event at frame one: the tide is mid-crossing, as the spec requires.

## Audio bed (described, never autoplay)
- Low restless pulse: a 55 Hz sine through a lowpass filter at 220 Hz, gain 0.008, with a 240-second LFO moving the filter cutoff by 120 Hz, so the bed breathes on the same slow clock as the tide. Real WebAudio is created only inside the Sound plate tap, starting muted (Sound: off). The visuals carry the piece alone.

## Deviations
- None from the prompt. The spec's "field fills the frame to the edges" is honored on desktop as well as phones: the field is full-bleed on every screen, which is the composition the prompt asks for, rather than the square-on-desktop default for centered pieces.

## QA
- Rendered with node ~/workspace/tools/render-piece.js from the actual script:
  - Desktop 1280x900 (/tmp/1846-desktop.png): near-black field of a few hundred warm-amber and cool-white lights filling the frame to the edges; title plate "Four Hours / 2007 · 01 · 31" top-left, "Watch only." bottom-left, "Sound: off" bottom-right; no booth, no DJ, no architecture, no silhouettes. Clean.
  - Mobile 390x844 (/tmp/1846-mobile.png): same field full-bleed, lights dense and legible at small size, plates readable and not overlapping. Clean.
  - Thumb 720x720 (thumb.png, IS the 720x720 render): same field, plates legible. Clean.
- Determinism: desktop re-rendered a second time; md5 identical (ac78533a4146717122edf92bf1f78d6b both runs), so frame one is byte-comparable.
- One fix round: first render failed because halo/core alphas were pre-formatted with toFixed before being passed to rgba(), which calls toFixed again. Fixed by passing numbers; re-rendered clean. No post-gate edits after the final renders.
- Grep confirms zero occurrences of Math.random or Date.now, and no em dashes in index.html or process.md.
- Listeners confirmed by the render tool: vv:resize, win:resize, canvas:click.
