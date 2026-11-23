# No.777 Encasement

EXPANSION #95 doug-wheeler, prompt block PP2 "Encasement" (verified verbatim from TASKS.md).

## Concept

One of Wheeler's 1967-69 vacuum-formed Encasements: a square panel in a coved
white room, a thin neon-bright line running along its inside edges, and the
panel's glow bleeding outward into the wall until panel and room fuse. Nothing
in the frame has a hard edge: the room's corners are coved, the halo has no
outer boundary, and the panel itself never moves. Only the light's fall and
the panel's tonality change. Drag shifts the viewing angle and the glow leans
with it; tap cycles the tonality white, blue, rose, the mode change the prompt
explicitly assigns to tap.

## Construction

- Room: full-frame fill of room #F7F5F0, then coved corners built from 14
  layered quarter-ellipses per corner in a tone mixed from the room and halo
  palette colors, so each corner pulls softly away and never reads as an
  angle.
- Halo bleed: 30 layered rounded-rect copies of the panel, scaling from just
  above panel size out to about 2.5 panel widths, each filled with the halo
  tone (halo #F0F4FA mixed 35 percent toward the current edge color) at an
  alpha that decays with a 1.6 power falloff. Because the last layers sit at
  roughly one percent alpha, the glow dissolves into the room with no crisp
  outer edge and no ring.
- Panel body: base fill of the panel color mixed 30 percent toward the edge
  color, then 16 stepped inset bands whose fills mix back toward the pure
  panel tone as the inset grows, at 0.55 alpha each. The interior is therefore
  brightest at the edge line and falls inward in fine steps, as the prompt's
  per-edge falloff asks, without any gradient or blur.
- Neon edge line: a rounded-rect stroke inset about 3 percent inside the
  panel, drawn in four passes: a wide edge-color wash at 0.10 alpha, a mid
  pass at 0.30, a saturated pass at 0.85, and a thin white core at 0.95. A
  soft bright point rides the line: three layered white discs centered on the
  perimeter point the view leans toward, their strength scaled by the current
  parallax magnitude.
- Tonality cycle: taps are recorded as piece-times in a list. The active
  state is the tap count modulo 3 over the specced states (white panel
  #FBFAF7 / edge #DCEBFF, blue panel #C9D9F2 / edge #BFD4FF, rose panel
  #F2D9D4 / edge #FFD9CF), and the rendered colors are a smoothstep crossfade
  from the previous state over 2 seconds, a closed-form function of the tap
  list and t.
- Parallax: drag segments are recorded as {start time, offset at start,
  target}. The offset at any t eases exponentially (tau 0.45 s) from the
  segment start toward its target; drag targets are capped at plus or minus
  3 percent of panel size, and on release the target becomes zero, so the
  halo center and bright point drift gently home. The halo center follows
  the offset in full; the panel geometry is never transformed.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height pinned
  in px inside draw(); phone detection via window.screen physical size
  (min dimension under 700 px) with the h > w*1.15 aspect fallback; panel
  side is 45 percent of frame height, width-capped so it never crowds a
  phone frame. Frame one is the synchronous draw at t=0; the rAF loop, where
  present, anchors elapsed time to its first timestamp and event handlers
  read that same clock, so halo, parallax, and crossfades are all closed-form
  in (events, t). requestAnimationFrame is typeof-guarded. No audio, no
  microphone, no external assets, no visible text beyond the title.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb rendered twice and byte-compared with cmp: identical;
  the duplicate was deleted.
- Read-back: desktop shows the pale panel centered in the soft white room,
  the blue-white line inside its edges with a faint bright point at the top
  edge, glow bleeding outward with no boundary; mobile keeps the full panel
  and halo inside the tall frame; thumb matches.
- Fix round: the first build laid a distinct bright square at the panel
  heart, which read as a box inside the panel. Removed it so the stepped
  bands alone carry the inward falloff, reduced the base edge mix from 0.38
  to 0.30, and softened the cove layer alpha; re-rendered all sizes and
  re-ran the byte-compare green.

## Deviations

- The prompt describes the panel as slightly darker than the room while its
  own palette gives panel #FBFAF7 against room #F7F5F0, which is numerically
  lighter. The palette hexes were followed exactly (strict palette), so the
  panel reads as the lighter, luminous element the palette specifies; the
  tonal relationship is carried by the edge line and halo either way.
- The prompt suggests a heavy box blur for the halo and per-edge linear
  gradients for the panel falloff. The QA renderer has no ctx.filter and the
  house rule avoids canvas gradients, so both are realized as layered flat
  shapes (30 halo layers, 16 inset bands) with the same falloff character.
- The blue and rose halo tones are not separately specced; the halo color is
  derived by mixing the specced halo #F0F4FA 35 percent toward each state's
  specced edge color, keeping every rendered color inside the given palette.
