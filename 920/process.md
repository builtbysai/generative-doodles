# No.920 "Nenana" (study #113 miriam_quick, PP81 "The Ice Ledger")

## Concept

A century of Nenana ice-breakup dates as a glowing staff, not a chart. One
band per year, 1917 to 2026, and the band's height is its date: the breakup
day-of-year plotted on a true scale, day 60 at the top to day 140 at the
bottom, so earlier melts sit higher and no equal-spacing lie is told. Colour
is the anomaly: cold blue for the late, deep-winter breakups running to hot
amber for the early ones. The 2019 band, day 104, the earliest on record,
carries its own gold. The century plays chronologically at one year per
second while the heights jump around the staff; that jump is the thermometer
reading. The legend is drawn into the piece, a small slate column in the
left margin naming the mapping, because the mapping is never shown without
it. The upper staff is empty by construction: no breakup has ever fallen
that early, and the cold up there is the subject.

## Construction

- Data: synthesized at init from mulberry32 (seed 92081), fully recorded
  here. For year index i (year 1917 + i) the mean slides linearly from day
  128 to day 114 across the century; each value is round(mean + gaussian
  noise, sd 6.5), clamped to [106, 138]. Index 102 (2019) is then forced to
  exactly day 104. Verified by re-running the generator outside the piece:
  minimum is 104, it occurs exactly once, at index 102; day at frame one's
  index 30 is 123 (1947). The ten earliest, for the anomaly view, are 2019
  (104), 2007, 2009, 2010 (106), 1925, 1935, 1978 (109), 2003 (110), 1946
  and 1976 (111).
- Colour: band t = (138 - day) / 34 over the data range, interpolating the
  two palette endpoints #3B6EA5 to #E8A33D (the one interpolation the piece
  allows); 2019 is always #FFD75E. Glow is layered flat-alpha rects (wide
  faint, mid, core), no gradients, no shadowBlur, no offscreen canvas.
- Playback: position is an unwrapped year float, a closed-form function of
  (t, recorded events). Frame one is the synchronous draw at t = 0 with the
  position at index 30 (late 1940s): that band at full colour with a thin
  cursor line running right from it, the 30 earlier years dim-lit, the rest
  faintest, 2019 at the same faint alpha as the other unplayed bands, told
  apart by its gold hue alone. Play advances one year per second and wraps
  seamlessly over 109 seconds. Played/unplayed state is computed relative
  to the loop start (index 30), so the states wrap correctly.
- Interaction: tap strikes the band nearest the finger's height (nearest by
  day value): its chord sounds and its date label (computed from the
  day-of-year on a non-leap calendar, e.g. "14 APR 2019") flashes beside
  the band for 2.5 s with a decaying brighten. Drag vertically scrubs: the
  press freezes the unwrapped position, the finger's nearest band becomes
  the current year (represented nearest the frozen position, fraction
  preserved), and release re-anchors playback there at one year per second.
  Double-tap opens the anomaly view for 10 s: only the ten earliest
  breakups are drawn, burning at near-full alpha with a slow pulse, then
  the full staff returns. Playback continues underneath throughout. Never
  click-to-reload.
- Audio: lazy AudioContext created on the first pointerdown, typeof-guarded.
  Each year is a small chord of triangle oscillators at f, 1.25f, 1.5f with
  f = 220 + (140 - day) * 4 Hz (day 104 gives 364 Hz, day 138 gives 228 Hz),
  so earlier melts sound higher, her exact direction. Chords fire on
  playhead crossings (tracked outside draw) and on taps. Everything runs
  through a master gain carrying the sunspot shimmer, 0.875 + 0.125 *
  sin(2 pi * 0.09 * t), an 11-second-ish shimmer standing in for the
  11-year cycle. The piece renders complete and silent without audio.
- Presentation: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px inside draw every frame. Phone detection via window.screen
  min dimension < 700 with the h > w*1.15 aspect fallback only; on phones
  the legend shrinks to 8 px and the staff shifts right to keep the column
  clear. Palette strict: ground #060A10, cold #3B6EA5, hot #E8A33D, cursor
  #F2F0EB, legend #8FA3B8, 2019 gold #FFD75E. Visible text is only the
  three legend lines, the flashed date labels, and the title. No em dashes
  anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  renders complete and silent in the harness (no AudioContext, no rAF).
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical (duplicate deleted), re-verified after the fix round below.
  Frame one shows the slate legend at top-left, the staff of thin bands in
  blues below and ambers above at their true date heights, the gold 2019
  band faint at the top of the cluster, and the 1947 band lit with the
  white cursor line extending right. Mobile keeps the legend legible and
  nothing is clipped.
- Fix round: the first build gave the unplayed 2019 band a slightly raised
  alpha (0.20 against 0.13) and added a small "TEN EARLIEST" caption to the
  legend during the anomaly view. Both were cut: 2019 now sits at exactly
  the unplayed alpha with the gold hue doing the work, as briefed, and the
  anomaly view carries no text beyond the standing legend.
- Deviations: one, in the data clamp. The brief suggested clamping the
  synthesized days to [100, 138] with 2019 forced to 104 and verified as
  the unique minimum after the fact. The build instead clamps the other
  108 years to [106, 138], so 2019's forced 104 is the unique minimum by
  construction rather than by post-check; the recorded facts the piece
  tells (109 years, the trend, 2019 = day 104 earliest) are unchanged.
