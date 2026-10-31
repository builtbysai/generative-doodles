# No.490 Fraktur Field

EXPANSION #59 eugenio-bertozzi, prompt EB2.

## Concept

His "Ice Queen CBD" blackletter (2026) as a field. Dense interlocking white
fraktur capitals on black, cropped hard by the canvas edges, letters
overlapping like carved stone. Legibility is optional; density is the point.
The only text is the tiny mono caption top-left: "FRACTURA 2026 x ATELIER".
Idle, one glyph at a time breathes; a drag disturbs the field and every
glyph swings back to its anchor on a damped spring.

## Construction

- Single self-contained index.html, canvas 2D, exactly two colors:
  black #0A0A0A and bone white #FAFAF6. No gradients, no shadows, no gray.
- Eight parametric fraktur archetypes (arch, bowl, twin-stem diagonal,
  hook, zig, tee, twin arch, spire), each a skeleton of thick strokes
  (main stems 0.145 of glyph size, miter joins, square caps) with broken
  angular arches, filled diamond terminals, and a thin field-black cut
  split down the heavy stems for the carved blackletter read. Each
  instance takes a seeded archetype, an optional mirror flip, and seeded
  point jitter, so no two glyphs are identical.
- Layout (mulberry32, seed 490207): 11 glyphs on desktop, 10 on phones,
  sized 0.40 to 0.68 of the smaller viewport dimension. Four anchors are
  forced to the left, top, right, and bottom edges so the field bleeds
  off at least two edges at any size; the rest are seeded across the
  frame. Heavy overlap is intended: same-color strokes merge into
  continuous carved masses.
- Interaction: pointer drag applies velocity impulses to glyphs within
  radius, scaled by falloff. Each glyph is spring-anchored (stiffness 26,
  damping ratio 0.55, underdamped), integrated in fixed substeps, so
  disturbed glyphs overshoot and settle with a swing. No click-to-reload.
- Idle motion: a 6-second rotation through the glyphs; the active glyph
  scales by 1 + 0.02 * sin(pi * phase) about its center.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; the field is full-bleed and
  the page ground is the field black at every size.
- Determinism: the first frame is drawn synchronously at a constant
  pre-roll phase (t = 9.0s: glyph 1 at peak breath, all spring offsets
  zero). The animation loop, when running, is anchored as that fixed
  offset plus elapsed time since load, and requestAnimationFrame is
  typeof-guarded so the node QA renderer draws the same frame. All
  layout is seeded; no Math.random, no Date.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-verified after every fix. Second render deleted.
- Pass 1: glyphs at 0.44 to 0.80 of the smaller dimension merged into a
  near-solid white mass on desktop. Sizes moderated to 0.40 to 0.68 and
  the desktop count set to 11; letterform fragments (split stems, bowls,
  spires) now read through the density while overlap stays heavy.
- Pass 2: a glyph crossing the top-left corner buried the caption
  (bone white on bone white). The caption now sits on a small patch of
  bare field black, drawn with it, so the specced line stays legible at
  every size. No other element changed.
- Final read-back: desktop and thumb show dense interlocking capitals
  bleeding off all four edges with a carved-stone feel; mobile keeps
  distinct letterforms (bowl, spire) in portrait; palette is strictly
  the two specced colors; no glyph cluster spells a legible word.

## Deviations

- The prompt's drag description (displace, swing back) is implemented as
  velocity impulses from pointer movement rather than direct position
  dragging, so a fast sweep shoves the field instead of towing one glyph;
  the spring return is as specced.
- The caption's bare-field patch (above) is a legibility guard, not an
  added graphic element: it is the field's own black, sized to the text.
