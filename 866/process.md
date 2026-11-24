# №866 Spell It in Cardboard

ZW4 / PP1266, study #263 zach-wolfe. Formula date 2004 · 05 · 26.

The driver, as a felt phenomenon: the word is built, not shown.
Cardboard letters lie on a lawn, shot straight down, spelling one
word, with far more green around them than letters. A breeze
ruffles the grass and the letter shadows creep. Tapping rebuilds
the word from a new seed while the grass keeps ruffling: the
letters lift and slide to their new spots, because building the
word is the mechanism.

## Build

- First frame: FIRST_T = 12 s into a 60 s cycle. The breeze sway
  is 6 s, the grass shimmer 10 s, the shadow creep 60 s; every
  period divides 60, so frame one is deterministic and the frame
  at FIRST_T + 60 equals the frame at FIRST_T.
- Procedural letter tiles on a grass-noise field: a green gradient
  with faint mow stripes, 520 seeded speckles and 320 seeded
  grass blades doing the color work, the blades swaying on a 6 s
  period. The word is centered at 0.54 of the stage height and
  spans at most 80% of the stage width, generous green margin on
  all sides, overhead orthographic, no perspective.
- Tiles are cardboard tan with a darker edge and a dark brown
  glyph, each with a fixed seeded wobble of rotation and offset
  so the hand-placed feel never shuffles. One letter per word is
  red-orange with a cream glyph: the accent, fixed per seed word
  (E in CHEESESTEAK, the study's example word, is the first).
- Long soft shadows: each tile casts a wide faint offset rect
  plus a tighter darker one, down-right, the offset length
  breathing slowly over the 60 s cycle so the shadows creep.
  Shadow length 10.73 px at t=12, 9.89 at t=27, 6.03 at t=42
  (720 viewport, stage 576).
- Tap re-spells from a fixed seed-word list, never generated text
  beyond it: CHEESESTEAK, PARKING, POTHOLE, LAWNCARE, SPRINKLER.
  The re-spell animates over 1.4 s: letters slide from their old
  slots to the new ones, lifting in a small arc mid-slide so the
  motion reads even when the new word has the same length as the
  old; letters the new word drops slide down and fade out, letters
  it adds slide up from below the field. A tap mid-slide is
  ignored, never corrupting the layout.
- Visual-only: no WebAudio, no autoplay audio, per the Franke
  rule. Caption plate top left (№866 · Spell It in Cardboard,
  2004 · 05 · 26) on a soft dark plate sized to the measured text
  so cream reads on grass, and hint bottom center (Tap to
  re-spell the word.). Canvas 2D only. No em dashes in visible
  copy. Flicker at or below 14 Hz by construction: all motion is
  slow drift and breathing on periods of 6 s or longer, and the
  slide is a single 1.4 s ease.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually. thumb.png is the
  720x720 render, byte-identical to what the render script
  produces (576x576 stage, the same as the shipped №862 thumb).
- Time probes (node harness, /tmp/probe866.js): determinism
  t=12 vs t=12 pixel diff 0.00%; seamless loop t=12 vs t=72
  0.00%; motion t=12 vs t=42 0.95% (breeze and shadow creep).
- Tap walk (same harness): CHEESESTEAK to PARKING to POTHOLE to
  LAWNCARE to SPRINKLER and back to CHEESESTEAK, five taps, each
  settling to a distinct spelling; mid-slide tap ignored on all
  five; slideU 0.50 at mid-slide, 1 when settled; settled-frame
  pixel diffs 7.07 / 1.09 / 5.96 / 5.48 / 5.06% between
  successive words. ?word=2 loads POTHOLE, ?word=4 loads
  SPRINKLER at load.
- Arc check (/tmp/checkarc2.js): mid-slide tile band maxY 296 vs
  settled 346, a 50 px lift, so the re-spell reads as motion even
  for equal-length words.
- Fix rounds: 2. Round 1: the caption plate was a fixed width
  and would have overflowed the text on mobile; it is now sized
  to the measured caption text. Round 2: the first shadow pass
  read as a thin contact edge, not long soft shadows; the offset
  went from 0.15 to 0.24 of tile width with a wider faint second
  shadow. Round 3: the slide was invisible for equal-length
  words (PARKING to POTHOLE shared all seven slots), so letters
  now lift in an arc mid-slide.

## Deviations

- None from the prompt. The seed-word list is fly's choice of
  five short words in the study's deadpan register, CHEESESTEAK
  included as the study's example.

## Known warts

- On the 390x844 mobile frame the tiles are small (about 24 px)
  but the word stays legible; the field reads mostly as grass
  with a small word in it, which is the brief's point.
- The breeze motion between two cycle times is subtle at 0.95%
  of pixels; the blades are thin strokes on a large field, so
  the ruffle reads more in motion than in stills.
- The accent letter is fixed per word by seed, so it is not
  always the same position; that is intentional, one accent on a
  single letter per word.
