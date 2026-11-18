# №1884 — Rupture and Repair (MG5, PP1131, study #246 maddalena-ghezzi)

## What it is
A woven linen banner hangs edge to edge across the frame, embroidered with
fragmented red-thread letterforms. On a slow three-minute cycle the cloth
tears along a seam near the center, threads snap and curl, a corner drops;
then invisible hands mend it, gold cross-stitches landing one by one along
the crack, the corner sewn back, the text re-knitting with a gold scar line
running through the red letters. The repair never hides the rupture; the
gold scar is the most beautiful part.

## Mechanism
- Cycle (180 s, closed form of phase time): hold whole 0–30 s; tear 30–60 s
  (crack reveals progressively, gap widens, threads lengthen, corner drops);
  hold torn 60–90 s; mend 90–150 s (24 gold cross-stitches land one by one
  along the crack, gap closes to a scar seam, threads tuck, corner rises);
  hold mended 150–180 s; then the loop repeats.
- Crack: a 13-point path starting at the frame center (0.50, 0.42) and
  running down toward the lower right, plus a short 5-point branch, all from
  mulberry32 seed 1884. The tear is drawn as a dark gap polygon between two
  offset edge polylines with pale frayed linen edges.
- Threads: loose threads hang from every other crack point, with seeded
  length, curl and sway phase; they lengthen with the tear, sway slowly
  (0.45 rad/s, under 1 Hz), and tuck away as stitches pass their position.
  A quarter of them are red embroidery thread.
- Stitches: 24 gold cross-stitches at arc-length-even sites along the crack,
  laid in order during the mend; a gold scar line grows beneath them.
- Corner: the lower-right corner region past the crack end drops up to
  ~0.022 U and rotates ~0.035 rad with the tear, then rises during the mend.
- Weave: procedural warp/weft lines plus 420 seeded linen slubs.
- Glyphs: eight abstract red-thread letterforms (bar, arch, cross, hook,
  dot) at seeded positions; two sit on the crack so the gold scar runs
  through the red letters. No legible words anywhere, by design.
- Green hem: a stitched grass-green line with tufts along the lower edge.

## Palette (hand-picked; the study file studies/maddalena-ghezzi.md does not
exist in the repo, so these hexes are chosen from the prompt's named colors)
- Undyed linen: #D9CBB0 (base), #C4B28E (dark weave / dropped corner),
  #E9DFC6 (pale frayed thread), #7A6A4E (tear interior shadow)
- Embroidery red: #A8232A, deep #7E1A20
- Mending gold: #C9A227, deep #9A7B1A
- Grass green: #6B8E3E, deep #4E6B2C
- Plates: #1E1710 ground, gold rule, #EFE6CF title ink, #D8B878 hint ink

## Interaction
Watch only. Never click-to-reload; taps elsewhere do nothing and the tear
is never user-triggered. A visible "Sound: off / on" plate sits bottom
right; tapping it toggles sound. Default silent. Real WebAudio is created
lazily inside that first tap gesture only, never on load, never autoplay.

## Sound (closed-form model)
The rip is a filtered noise burst at the tear's start; each stitch landing
plays a soft needle tick; a low resolved chord (C3/E3/G3) sounds when the
scar line completes. Events follow the cycle clock, not the wall clock.

## Frame one (determinism)
Fixed phase t = 120 s: mid-mend, the tear fully open, 12 of 24 gold
cross-stitches laid along the upper half of the crack, the lower half still
torn with threads hanging, the corner halfway sewn back. Crack path,
stitch sites, threads, glyphs and slubs are all pure functions of
mulberry32(1884). No Date, no wall clock, no Math.random in frame one.
Thumb renders are byte-identical across independent runs (md5 verified).

## House rules
Visual Viewport sizing with resize on visualViewport and window; canvas
pinned in draw() via canvas.style.width/height in px; phone detection via
window.screen (min dimension under 700 px) with aspect h > w*1.15 fallback;
banner fills the frame edge to edge on every screen; one synchronous frame
at load; requestAnimationFrame guarded by a typeof check; prefers-reduced-
motion respected (static frame one, no loop); all motion well under 14 Hz.

## Gallery
- Date: 2007 · 03 · 10 (formula 2002-01-10 + (N+1) days)
- Note: "A linen banner tears along a seam and is mended stitch by stitch in gold, the scar left showing. Watch the banner tear and mend."

## Deviations from the prompt
None of substance. The embroidered text is abstract glyph fragments only,
never the full quoted banner slogan as legible text, per the build brief.
The study file was absent, so palette hexes were hand-picked and are
recorded above.

## QA
Rendered the actual script with node render-piece.js at 1280x900 desktop,
390x844 mobile and 720x720 thumb; all three inspected visually. One fix
round: loose threads were too short and thin to read, and the dropped
corner read as a flat block, so thread length and width were increased and
weave lines were added inside the corner flap, then all three sizes were
re-rendered and re-inspected. Thumb re-rendered independently and confirmed
byte-identical (md5 dc495d142047eac0d94997de99b9e04c).
