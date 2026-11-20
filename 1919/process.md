# №1919 Sea of Low Tones (RG8, PP1166, study #250 ruth-goller)

## Driver

A sea of low bass tones, nothing played fast. Slow sub-bass swells roll
across the frame as visible pressure waves; harmonics ride their crests
as thin bright filaments, the Skylla reissue's "electric bass in multiple
intuitive tunings" made into weather. Occasionally a single harmonic
plucked in an upper register rings out over the swell and is swallowed
by the next wave. The gatefold liner notes drift through as faint text
sediment in the depths. This is the bass bed alone, the foundation under
everything else in the block.

## Mechanism

2D canvas, visual only, no WebAudio. Five swell bands run back to front
across the frame, each a closed-form field of two long sine waves at very
low frequencies (0.08 to 0.16 rad/s), so the sets roll left to right and
never repeat exactly within a cycle. Each band fills from its surface
down to the bottom of the frame in deep teal, deepening toward the front
bands, and carries a lighter teal crest line. Silver filaments ride the
crests: short bright threads drawn where the surface is near its crest
and the slope is falling, brightness mapped to crest proximity. Harmonic
pings are plucked on a fixed 60 s schedule (7, 26, 45 s) at fixed
positions: each rings out as an expanding silver circle with a bright
pluck dot at its center, decaying exponentially and gone within 14 s,
swallowed by the next wave. Liner-note sediment is seven short original
fragments drifting left to right with the current at 6 to 12 px/s,
wrapping around the frame at 0.06 to 0.11 alpha, half-buried under the
swell bands.

## Frame one

FIRST_T = 31 s. A swell is mid-crossing on the third band with silver
filaments riding its crest, and the harmonic plucked at 26 s is five
seconds into its ring, still bright, already being swallowed by the next
wave. Sediment lines drift in the depths. Every wave, filament, ping and
sediment line is a pure function of t, so frame one is deterministic and
byte-reproducible; the thumb render came out md5-identical on a second
independent run.

## Interaction

Watch only. There are no pointer handlers and no audio. The sea does not
take requests. Never click-to-reload.

## Palette

Hand-picked from the named colors in the prompt; no study file exists for
ruth-goller. Abyssal indigo ground #0a0e24 deepening to near-black #04060d
at the bottom, wave pressure in deep teal #0d4f5c with mid body #14606e
and crest light #1b7d8a, harmonic filaments in silver #c9ced6 with a
bright core #e8ebef, liner-note sediment in faded paper white #d9d2c0.
Title and hint in pale blue-white #dfe3ea, date line in muted blue-grey
#8f97ad.

## Composition

A full-bleed ocean of waves moving left to right in slow sets: five swell
bands stacked back to front, filaments along the crests, sediment text
barely legible and half-buried, scrolling with the current. Field-like
composition: full-bleed on phones, square on desktop, the page ground set
to the piece's own background color. The title plate sits top-left, the
gallery note centered at the bottom (two lines on narrow screens).

Gallery note: "Slow sub-bass swells roll as visible pressure waves while
harmonics ride their crests and liner-note sediment drifts in the depths.
Watch the swells roll and the harmonics ring out over them."

## Motion

All motion runs under 1 Hz, well under the 14 Hz ceiling.
Prefers-reduced-motion shows the static first frame.

## Deviations

None from the prompt. Per the Franke audio rule, the prompt's bass and
harmonic agents are carried visually, not as real WebAudio: the piece is
watch-only and visual-only, with the sub-bass swells as closed-form wave
fields and the harmonics as decaying rings on a fixed schedule. No drums,
no voice, no mask imagery, per the prompt's own note. Sediment fragments
are short original liner-note-like lines, not real lyrics.

## QA

Rendered from the actual script with node-canvas and visually inspected:

- Desktop 1280x900: five teal swell bands roll left to right, silver
  filaments ride the crests as short bright threads, the harmonic ring
  from the 26 s pluck is bright mid-frame with its pluck dot at the
  center, sediment fragments drift faintly in the depths, title, date
  and hint all clear, no overlaps.
- Mobile 390x844: full-bleed framing holds; bands, filaments, ring and
  all text legible, hint wraps to two lines, no overlaps.
- Thumb 720x720: same first frame, legible at small size.
- Fix rounds: one cleanup edit (an unused variable removed) after the
  first visual pass; desktop, mobile and thumb md5s unchanged by it.
- Determinism: no Math.random, no Date.now, no wall clock; thumb md5
  55f1cad2282b96dcd6c4ea20c21d8fec and desktop md5
  6937ebea6a1b7ef32cb520c890bc13c4 identical on a second independent run.

## Known warts

Sediment fragments are sometimes clipped mid-word at the frame edges as
they scroll past; that is the current carrying them through, kept as is.
The top band leaves a stretch of open indigo above it where the title
plate sits; that emptiness is the abyss above the sea, kept as is.

## Source

Prompt block RG8 (PP1166) for study #250 ruth-goller, transcribed from
live TASKS.md in the muse-soul repo.
