# No.846 "The Doot-Doot Choir" — EXPANSION #103 lou-reed, PP7

## Concept

The Transformer treatment: an overexposed white field, a gold banner across
mid-frame carrying a walking bassline as a stepped ink contour, a sweet
"doot" chorus motif repeating like a candy stripe along the banner, plain
street-tableau text beneath, and a thin four-color rainbow strip sealing the
bottom edge. The bassline walks at its own pace (16 steps per 8-second pass)
and never hurries. Dragging vertically walks the viewer through the street:
the drag height selects one of three bands, each with its own tableau text
set and its own doot density. No sound. No borrowed lyrics anywhere: every
tableau line is original, written for this piece in a flat, deadpan street
register.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets,
  no audio, no microphone.
- Sizing from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; canvas CSS width/height pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` physical size
  (min dimension < 700px) with aspect `h > w*1.15` as fallback; phone path
  only enlarges the tableau type. Page ground is the piece's own paper
  white `#FAF7F0`.
- Palette, strict: paper `#FAF7F0`, gold banner `#C89B3C`, ink `#141414`,
  rainbow strip `#E04E39` / `#E8B400` / `#3E8E5A` / `#3E6BB8`. Nothing else.
- Bassline: a closed-form stepped function of loop time. Step index is
  `floor(x / stepW + t / 8s * 16)` into a fixed 16-step walk contour
  `[0,1,2,3,2,1,0,1,2,3,4,3,2,1,0,-1]`, drawn as a thick ink polyline with
  mitered step joins plus a note dot at each plateau center. The step rate
  is a constant of the piece; no interaction path can change it.
- Band model: three height bands (top / middle / bottom thirds of the
  frame). Pointer drag (pointerdown + pointermove while dragging) maps the
  pointer's y to a band; when the band differs from the current one, an
  event `{band, t}` is appended to a recorded event list. Playback state is
  a pure function of that list: current band, previous band, and change
  time. A band change crossfades the tableau TEXT ONLY over 0.4 s (previous
  set fades out as the new set fades in); the bassline, banner, doots of
  the new band, and rainbow strip do not fade. Releasing the drag keeps the
  chosen band. Frame one has an empty event list: band 1 (top band),
  first tableau set at full opacity, bassline at walk phase 0 with the full
  contour in view.
- Doot choir: each glyph is a small rotated-ellipse note head with a stem
  and the word fragment "doot" in small bold type beside it. Glyphs are
  grouped in repeats of three (the candy stripe). Density per band:
  band 1 = 2 repeats (6 glyphs), band 2 = 3 repeats (9 glyphs),
  band 3 = 5 repeats (15 glyphs). Positions are precomputed once per band
  with a seeded mulberry32 RNG (seed base 84600 + band * 977), so placement
  is closed-form in the band index and identical on every load.
- Determinism: frame one is the synchronous `draw(0)` at load; no
  `Date.now()` anywhere (the animation clock is `performance.now()` elapsed
  since load, and the rAF loop only starts when `requestAnimationFrame`
  exists, so a headless render captures exactly t = 0). No gradients, no
  shadowBlur, no `ctx.filter`, no offscreen canvas. rAF is typeof-guarded.

### The three tableau sets (printed in full, all original)

Band 1 (top):
- "The man on the corner sells umbrellas in the rain."
- "He does not look up. The rain does not look down."
- "Everybody here is on their way somewhere else."

Band 2 (middle):
- "A woman walks her dog past the closed theater."
- "The marquee still shows last month's title."
- "The dog stops. She waits. That is the whole arrangement."

Band 3 (bottom):
- "Two men argue quietly outside the diner."
- "Neither one is winning. The coffee is."
- "The streetlight changes for nobody in particular."

All nine lines were written for this piece. No line quotes, paraphrases, or
lifts any Lou Reed lyric; the register (flat, observational, street-level)
is the homage, the words are new.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared:
  identical (re-verified after the spacing fix below). Second render
  deleted.
- Read-back, desktop: overexposed white field; gold banner mid-frame with
  the stepped ink bassline walking across it and two clean 3-glyph doot
  repeats along the banner; tableau set 1 set plain beneath the banner;
  rainbow strip (red, yellow, green, blue) along the bottom edge.
- Read-back, thumb: same composition at square format; doot glyphs legible,
  bassline contour fully in view, text unclipped.
- Read-back, mobile (390x844, phone path): banner, bassline, doot repeats,
  and all three tableau lines fit the tall frame with nothing clipped; the
  rainbow strip holds the bottom edge.
- Fix during QA: the first glyph spacing (0.045 of width between heads in a
  repeat) made each "doot" word run into the next note head, worst on
  mobile. Intra-repeat spacing widened to 0.088 of width with smaller
  jitter; all three renders redone and the byte-compare re-run green.

## Deviations

- None from the brief's substance. One framing choice: the prompt's
  "dragging up/down walks the line through the street" is read as
  band selection by drag height (the bassline itself stays on the banner
  and keeps its pace, per "the line never hurries"); each height band
  changes the tableau set and doot density, as specced.
