# No.396 Nine Cats — process

## Concept

After Anna Galitskaya's (@galitskaya.illustration) cat
contact sheet: a 3x3 catalog of cats in costume around
her wordmark block. One cat body recipe (round body,
pointed ears, curled tail) wears eight costume-activity
overlay sets drawn from her observed sheet, and the
centre cell is reserved for the wordmark: a flat
rounded rectangle with the piece title lettered in ink
serif and a tiny rust fox glyph beneath. Tap any cat
cell and that cat alone redraws itself in the next
costume-activity from its own fixed sequence, through
a 0.8s stroke reveal, while the other cats keep
breathing. The wordmark never changes and is not
tappable.

The wordmark is the piece's designed text under the
batch's text exception (the No.334 precedent) and the
only text in the piece. Palette, closed: ground
#FAF3E6, ink #3A3330 for all linework, cat fills warm
gray #A89B8C, costume fills rust #D96C4A and teal
#2E8B8B alternating. Flat colour only.

## Construction

- One canvas, design space 1280x900, centred fit, page
  ground in the sheet's ground tone so the catalog
  keeps its shape at any aspect. Sizing comes from the
  Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas element is
  pinned by style width/height every frame; phone
  detection uses the window.screen physical size with
  the tall-aspect fallback.
- The sheet: grid from (200, 60) to (1080, 840), cells
  293x260, border and dividers drawn as sampled
  polylines with a fixed +-1px hand-wobble baked from
  the seed. Exactly 40 tiny gutter motifs (hearts,
  leaves and stars cycling rust, teal, ink) are
  scattered in the margin frame around the sheet and
  asserted at load.
- Cat body recipe, in cell-local space with the ground
  line at y 88: a soft warm-grey ground shadow, a
  curled tail ellipse, a round body with a flattened
  base, two pointed ears with ground-tone inner ears,
  a round head, ink nose, mouth curves and six
  whiskers. Every mark is a sampled point list carrying
  cumulative arc lengths, so fills ink their outlines
  progressively and lines draw on by length. Eyes are
  kept out of the baked data and drawn last, in the
  set's eye colour, so they can blink.
- The eight costume-activity sets, each defining the
  cat's tint as well as its costume: 0 gardener (tan
  cat, warm grey at 0.5, in teal overalls with straps,
  buttons and a rust pocket, watering can and trowel
  beside); 1 scholar (red-panda cat, rust at 0.8, ink
  glasses and ear tufts, a three-book stack and a
  tripod telescope beside); 2 umbrella (black cat,
  solid ink with ground-colour eyes, under a tilted
  rust umbrella with cream spots and a cream shaft);
  3 frog hat (brown cat, warm grey at 0.85, teal frog
  cap with eye bumps and a smile, sitting behind a
  watermelon slice with a cream rind and ink seeds);
  4 foliage (small orange kitten, rust at 0.5 drawn at
  0.82 scale, framed by teal leaves and rust berries);
  5 two kittens (a full-size warm-grey kitten and a
  smaller pale one, both looking up at a rust star);
  6 cactus hug (white cat, ground fill with ink
  outline, hugging a ribbed teal cactus with a rust
  flower on its arm, in a rust pot, grey paws wrapped
  round); 7 mushroom cap (grey cat in a rust mushroom
  dome with cream spots and ink chin straps, holding
  a lit lantern on a cord). Exactly 8 sets, asserted.
- Per-cell sequences: each cat cell's sequence is the
  rotation of the eight sets starting from its opening
  set, advanced one step per tap, wrapping mod 8,
  never random. Top-left opens on 0 gardener and runs
  0,1,2,3,4,5,6,7; top-centre opens on 1 scholar and
  runs 1,2,...,7,0; top-right opens on 2 umbrella;
  middle-left on 3 frog hat; middle-right on 4
  foliage; bottom-left on 5 two kittens; bottom-centre
  on 6 cactus hug; bottom-right on 7 mushroom cap,
  each rotating the same way. A tap mid-reveal is
  ignored until the 0.8s reveal completes.
- Stroke reveal: on a tap the cell's new vignette is
  drawn against an eased arc-length budget over 0.8s:
  each fill's ink outline draws on by length and its
  flat fill lands once the outline passes 55 percent,
  lines draw on by length, dots pop at 60 percent, and
  the eyes fade in over the last third. Pointer coords
  are converted through the stored centred-fit
  transform (S, OX, OY from frame()).
- Ambient motion, 20s loop: all cats breathe at scale
  0.97-1.03 about their ground line, on periods of 20,
  10, 5 and 4 seconds assigned in cat order (each
  dividing the loop), phases staggered by 0.9 rad per
  cat. Blinks sit at fixed slots: a 5s blink period
  (4 whole cycles per loop) offset by 1.7s per cat in
  cat order, the lid closing over 0.3s as a shrinking
  eye ellipse.
- Determinism: the first frame is drawn synchronously
  at the constant phase T = 7.3s (sheet complete, cats
  mid-breath, every blink phase past its 0.3s window
  so all eyes are open). The animation clock advances
  from that anchor in fixed 1/60 ticks accumulated from
  rAF timestamps; rAF is typeof-guarded. Frame one
  never reads a wall clock. All scatter and wobble
  come from a fixed-seed LCG baked at load.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms the
  pointerdown listener registers alongside the resize
  listeners.
- Desktop: the full sheet reads at a glance: gardener
  with can and trowel, scholar with glasses, books and
  telescope, black cat under its spotted umbrella,
  frog hat over the watermelon slice, orange kitten in
  foliage, the wordmark centred with the fox glyph,
  two kittens under their star, white cat hugging the
  cactus, mushroom cap with lantern. Gutter scatter
  frames the sheet on all four sides.
- Fixes during QA: the gardener's overalls first
  rendered as one large teal oval that swallowed the
  body and hid the watering can; the overalls were
  shrunk, given a leg split, and the can moved clear
  with its spout and handle readable. The umbrella
  first sat small and high like a beret with an ink
  shaft invisible on the black cat; the canopy was
  re-centred over the head and the shaft and hook
  redrawn in the ground colour so the held umbrella
  reads. The cactus flower first sat on the centre
  axis under the mouth and read as a tongue; it now
  sits on the cactus's right arm. All renders redone
  after the fixes.
- Thumb: all eight cats, the wordmark and the fox
  glyph read at gallery size on the continuous cream
  ground.
- Mobile: centred fit keeps the whole sheet in frame,
  wordmark legible, ground continuous above and below.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no offscreen
  canvas, no createGradient or shadowBlur use, no
  Math.random, no Date.now, no absolute URLs. The
  palette holds only the five specced hexes, each used
  flat or at flat alpha steps.
