# No.368 Salt Air

## Concept

After Julianne Haness's "Salt Air" (her Faded Resort
challenge piece, painted while listening to "August" on
repeat): a dreamy coastal repeat in washed-out resort
tones. Wave-scallop rows form the base rhythm, gull
silhouettes and soft blossom sprays are scattered through
the field, and the whole pattern drifts like a slow tide.
Nothing is loud and there are no hard blacks anywhere;
the piece turns a song into a pattern, so changing the
song is its one interaction.

## Construction

- One canvas, design space 1280x900, cover-fit on every
  screen, page ground in the active song's sand. Flat
  colour only: no gradients, no shadowBlur, no filters,
  no offscreen canvas. All marks are JS data drawn
  directly each frame.
- Scallop rows: seigaiha discs of radius 90 on a 180px
  horizontal spacing and a 90px vertical pitch, odd rows
  offset by one radius, each row overpainting the lower
  half of the row above. Every disc carries three flat
  concentric arc rings (0.97R outline, 0.66R, 0.36R) in
  the song's line ink at 0.45 alpha. Row fills follow a
  fixed 12-row tint pattern (sea-heavy, with sand
  breathing rows and a coral accent every few rows).
- Parallax: rows belong to three families by row index
  mod 3. The master loop is 48 seconds. Over one loop,
  family f translates horizontally by exactly (f+1)
  whole motif periods, where the motif period Q is
  720px, itself a whole multiple (4x) of the 180px disc
  spacing, so discs and motifs both wrap seamlessly and
  frame 48s is pixel-identical to frame 0. Speeds are
  15, 30 and 45 px per second.
- Motifs: exactly 16 fixed table entries, asserted at
  load: 9 gull silhouettes (one stroked double-arc glyph
  with a small body mass) and 7 blossom sprays (curved
  stem, two leaves, three five-petal heads and a bud),
  nothing else. Each motif has a family (5 / 6 / 5
  split, at least 4 per family asserted), a position
  inside the Q tile, a scale, a phase and a rank. Motifs
  tile every Q, ride their family's drift, and bob or
  sway on whole cycles of the loop (gulls: 3 cycles,
  plus/minus 4px; sprays: 2 cycles, plus/minus 0.05 rad).
- Songs: double-tap advances a fixed table of four
  authored entries. Each entry is a palette variant
  kept inside the muted sun-faded family plus a motif
  density; ranks order the reveal so each density shows
  a spread across the field, never a clump.
  1. "Salt Air" (the original): ground and sand
     #E8DCC8, sea-glass #A8C8C0, sun-washed coral
     #E8A68C, washed navy line and gulls #3E5A72,
     blossom centres #E8DCC8, leaves #A8C8C0.
     Density 8.
  2. "August, Again" (warmer): ground #EFE3CC, sea
     #9FBFAE, coral #E29A80, line and gulls #466578.
     Density 11.
  3. "Low Tide" (paler, cooler): ground #E6E6DA, sea
     #B7D3CB, coral #EFC0AB, line and gulls #57707F.
     Density 14.
  4. "Dusk Ferry" (deepest, still muted): ground
     #DFD2BC, sea #8FB4AC, coral #D98F74, line and
     gulls #38506A. Density 16 (all motifs).
  Densities strictly increase and the last song shows
  every motif; both facts are asserted at load.
- Interaction: watch-only drift by default. Drag pans
  the oversized repeat, grab-style, clamped to plus or
  minus 260px horizontally and 180px vertically, and
  the position persists on release; pointer coords
  convert through the stored cover transform (S, OX,
  OY). A press that moves more than 8 design px is a
  drag, never a tap. Double-tap (within 0.38s of the
  piece clock, near the last tap) advances the song.
  Never click-to-reload. No text, labels or UI anywhere.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 13.7s into the 48s loop, rows
  mid-drift (family drifts at 205.5, 411 and 616.5px of
  their loop travel), gulls mid-bob. The rAF clock is
  anchored to that constant plus elapsed time in fixed
  1/60 ticks, typeof-guarded; phase is always computed
  from T mod LOOP, never from a wall-clock offset.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension under
  700px with aspect fallback (h over w times 1.15);
  fixed seeds and tables only, no runtime random.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png), all inspected directly.
- First pass bug found and fixed: the odd-row half-step
  offset used j mod 2 on possibly negative row indices,
  and JS keeps the sign, so even negative rows were
  offset and odd negative rows were not; the top rows
  sat in columns instead of nesting. Parity is now
  computed sign-safely and the field nests as true
  seigaiha at every depth.
- Blossom heads enlarged (15 / 11.5 / 10px) after the
  first inspection: at the original sizes the sprays
  read as dotted sprigs against the large scallops.
  They now read as small five-petal coral flowers with
  sand centres; two full sprays with stems and leaves
  are visible in frame one.
- Determinism: thumb.png rendered twice after all
  fixes, byte-identical (md5
  123154b844182517fcea85b63581130b).
- Song mechanism probed with a temporary copy preset to
  song 4 (not shipped): deeper sea-glass and coral,
  all 16 motifs on show, still muted, no hard blacks.
- Desktop: full-bleed scallop field, sand, sea-glass
  and coral rows in rhythm, gulls and blossom sprays
  scattered, no gaps at any edge. Mobile: cover-fit
  centre crop, scallops and motifs large and legible,
  no letterboxing. Thumb: the repeat, both motif kinds
  and the faded palette all read at gallery size.
- Deviations from the spec: none. The spec's drag-pan,
  double-tap song advance, three-speed parallax, muted
  palette family and 48s seamless loop are all as
  specced; the loop length is stated here as required.
