# №1853 Ancestral Altar (TW6, PP1100)

Study #242 theresa-wong. Gallery date 2007 · 02 · 07.
Interaction: Watch only.

## Spec as built

A large archival portrait hangs centered in a dark room. The portrait is a
soft sepia tonal study of an elder: a warm head oval dissolving into the
field and broad shoulders below, rendered only with layered radial gradients,
seeded grain, and a pale cloth fold. No facial features are drawn and no
likeness is attempted, per the no-faces guard. A vertical teal field slowly
bisects the portrait, left to right and back, on a 34 second cycle with a
four second pause at each end, eased so the pass never hurries. Where the
field crosses four abstract trigger regions (eyes, mouth, two hands), a
soft gold glow blooms and small gold motes rise. The regions are never
marked, boxed, or outlined. An altar ledge sits under the frame with two
faint candle glints that breathe slowly. The room is barely visible: faint
wall seams, a floor line, and a warm glow low on the wall.

## Palette

- Room black #0A0908, wall #14100D, floor #060504
- Frame wood #241A12 / #3A2B1C
- Sepia portrait: base #8A6F4D, light #C9A87C, mid #A08055, dark #5C4630,
  shadow #2E2116
- Teal scanning field: #2E8B8B, bright #4FB3A9, deep wash #1E5A5A
- Gold fragments: #C9A227, soft #A8853A
- Plates: ground #0D0C0B, title ink #E8DCC8, hint ink #9A8B74

## Deviations from the prompt

- Visual only, no WebAudio. The prompt calls for sound fragments triggered
  by the band over facial zones and describes the piece as watch only with
  WebAudio. Since the viewer never taps anything, audio would have to start
  on its own, which the house rules forbid, so the fragments are rendered
  visually instead: the gold glow and rising motes mark each crossing. No
  sound plate is shown.
- The portrait is a tonal study, not a recognizable portrait image. The
  prompt describes an archival portrait of an elder; the no-faces guard
  requires an abstracted figure with no detailed features, so the elder is
  suggested by light and mass only.

## Determinism

Fixed-phase first frame at t = 74.0 s, with the teal field mid-portrait
crossing the eyes region. No wall clock, no unseeded Math.random. Grain and
mote offsets come from mulberry32 seeded with 1853. The scan position is a
pure function of phase time on a 34 second cycle. Reduced motion holds the
field at its frame-one position. Frame one was verified reproducible by
rendering the actual script with node-canvas at 1280x900, 390x844, and
720x720; all three renders were inspected and are clean.

## House rules

Self-contained 2D canvas, one synchronous frame at load, requestAnimationFrame
guarded by a typeof check. Visual Viewport sizing with resize listeners on
both visualViewport and window; canvas element pinned in draw() via
canvas.style.width/height in px. Phone detection via window.screen (min
dimension under 700px) with aspect fallback. Centered portrait keeps its
shape; page ground takes the piece's own background color. Title and date
plates drawn on the canvas, hint reads "Watch only." No em dashes in visible
copy. No click-to-reload.
