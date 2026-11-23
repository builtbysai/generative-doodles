# №1560 - Ten Thousand Small Decisions

- Title: Ten Thousand Small Decisions
- Prompt code: TW1 / PP807, EXPANSION #206 (shunsuke-takawo), first piece of #206
- Formula date: 2006 · 04 · 20
- Gallery note: "Tap for a new personality."

## Palette

Wagasa, five colors only, all flat, no shading:
- vermilion #C63B2A, ochre #D9A441, teal #2E7D74, black #1A1A1A, warm cream #F2E8D5
- Rim: olive #8A8B5C. Cream ground outside the mask.

## Composition

A bilaterally symmetric mask silhouette (soft blob, face-like, vertical mirror axis)
centered in the square frame, occupying about 70% of the frame with a generous
cream margin. The mask is filled edge-to-edge with a dense quilt of small
geometric patches on a 15 x 15 grid clipped to the blob: quarter-circles, arcs,
squares, triangles, dots, diagonal splits, rings, bars, plus signs, checkers.
Each cell draws one patch from the library, in two palette colors, flat only.

## Motion / interaction

Watch-only loop with a slow internal shimmer (a whisper of cream breathing over
each cell, max alpha 0.045). Every 4 seconds a random handful of patches
re-draws with a new patch type and color, crossfading over 0.8 s, so the
personality mutates while the silhouette holds. Tap anywhere: full reseed, a
new mask personality (new blob shape and new quilt). Tap-to-reseed is the
specced interaction here; the page never reloads and there is no click-to-reload.

## Determinism approach

- All layout randomness comes from mulberry32 seeded by the personality seed
  (1560 * 7919 + tapCount * 104729). No Math.random, no wall clock at draw time.
- Piece time t is the only clock. Mutation schedule is a pure function of t:
  interval k = floor(t / 4); a cell mutates at interval j when a seeded hash of
  (seed, cell, j) falls below 0.04, so about six cells change per interval. The
  spec in force is the latest mutation at or before k (scanning back at most 200
  intervals), with the crossfade eased over the first 0.8 s of the interval.
  A mutated spec is forced to differ from the spec it replaces.
- Symmetry is exact by construction: the blob radius profile r(theta) is
  mirrored (left point computed as cx minus r sin theta from the same r value);
  every right-half cell is drawn once and its left partner is the same spec
  drawn under a horizontal mirror transform; center-column cells straddle the
  axis, so each is drawn as its right half mirrored into its left half.
- One synchronous frame is drawn at load; requestAnimationFrame is guarded with
  a typeof check so node-canvas QA works.

## House rules

- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas element pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with aspect
  fallback (h > w * 1.15). Centered geometric composition: the mask keeps its
  shape on phones, page ground is the piece's own cream.
- No visible text on the piece. No AI-signature copy, no em dashes in copy.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 (thumb.png). All three inspected
visually: mask centered and unclipped on all sizes, quilt dense with no spill
outside the blob, olive rim present and thin, colors clean and flat, exact
bilateral symmetry visible.

Probe harness probe-1560.js, all 10 checks passed:
- Two fresh 720x720 renders byte-identical (md5 3aab4d5371a39a9c54091813ec621da5);
  re-draw at t=0 byte-identical to the load frame.
- t=8 differs from t=0 in 1.14% of pixels only (the re-drawn handful).
- Bilateral symmetry: 0.002% asymmetric pixels at t=0, 0.003% at t=8
  (antialiasing noise only).
- Tap reseeds to a different personality (42.3% pixels differ), still symmetric
  (0.000%); second tap differs again (43.6%). Hook seed/tapCount change as
  expected; geometry sane (cx=cy=360, R=259.2 at 720).

## Fix rounds

1. Center-column asymmetry (caught by the probe, not visible by eye at first
   glance): the first build drew center-column cells unmirrored, so patches
   straddling the axis (quarter disc, triangle, diagonal split) broke the
   mirror. The probe's asymmetry map showed all mismatched pixels in the
   center column (1.46%). Fix: center-column cells now draw their right half
   and mirror it into the left half. After the fix, asymmetry fell to 0.002%
   and all probes pass. Renders were re-done after the fix; thumb.png is the
   final 720x720 render of the shipped file.
2. Typo fix during writing: an invalid hex literal in the shimmer phase salt
   was corrected before the first render.
