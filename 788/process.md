# No.788 "Wild Posting" (EXPANSION #96 daniel-buren, PP5)

## Concept

Buren's affichages sauvages, 1967-69: striped posters pasted without
permission on city walls, the artist as bandit, creation as the
gesture. The piece is a flat procedural stone wall with a shuttered
doorway off-center right, already lived-in at frame one with five
seeded striped posters. The visitor's drag is the pasting hand: drag
and release, and a new poster snaps onto the wall at the fingertip.
Posters age, peel, and fade; the wall never resets and there is no
control of any kind. It just turns over.

## Construction

- Single self-contained canvas piece. Palette is strict: wall
  #B7A894, mortar #8E8271, poster white #F4F1EA, poster colors red
  #C8102E, blue #2F6BC0, black #232323, yellow #E8B62A. All shading
  (paper shadow, slat shading, fold underside) is alpha overlays of
  these same colors; no other hue enters.
- Wall: 11 rows of stone blocks on a mortar grid, alternate rows
  offset half a block. Per-block tone variation is a mortar wash
  whose alpha comes from a deterministic integer hash of (row, col),
  so the layout is identical at any size and on every load. The
  doorway is a flat mortar rect with 14 louver slats (wall-color
  light bands, ink shade lines) and an ink frame line.
- Posters: records {u, v, w, rot, color, born, forced, seed} with
  position and size as frame fractions, so a resize never moves the
  composition. Bodies are white with vertical color stripes at a
  frame-relative module (pair width clamped to viewW/38), clipped to
  the poster rect, drawn rotated with a soft ink paper shadow.
- Life-cycle model: everything is a closed-form function of the
  record and the piece timeline (t = seconds since load; frame one
  is the synchronous draw at t = 0 with the seeded set at its seeded
  ages, births negative). A poster peels at born + 40 s: over the
  next 10 s its bottom-right corner lifts as a fold triangle that
  grows along the corner diagonal (vacated corner repainted in wall
  color, flap drawn as the reflected triangle in mortar-shaded
  paper, crease line on the diagonal) while the whole poster fades
  as 1 - p^2 * 0.9; at p = 1 it is gone. The wall caps at 12 posters
  up at once: on overflow the oldest alive posters get their peel
  forced to start at that moment, oldest first. Five seeded posters
  (mulberry32 stream 788001) sit at ages 8-33 s at load, clustered
  left and center, overlapping, none yet peeling.
- Pasting: pointer down/move/up track a drag; a release after a real
  drag (> 24 px) pastes at the release point with a 90 ms scale snap
  from 1.06 at full opacity (a snap, never a glide or fade-in).
  Rotation derives from the drag angle, folded into a slight tilt
  (angle * 0.12, clamped to +/-0.17 rad). Colors cycle red, blue,
  black, yellow from a single counter that continues after the five
  seeded posters. A plain tap pastes nothing.
- Stamp marks: the prompt allows tiny date stamps on poster corners.
  They are drawn as two rows of seeded micro-squiggle strokes (a
  per-poster mulberry32 stream) in the corner: the gesture of a
  stamp with no characters, no letterforms, and no runtime date
  anywhere. Determinism is the reason: a real date would make frame
  one depend on the clock, which the hard gate forbids.
- Sizing follows the house rule: Visual Viewport API with resize
  listeners on visualViewport and window, canvas style pinned in px
  inside draw(). Phone detection uses window.screen physical size
  (min dimension < 700 px); the aspect test (h > w * 1.15) is only
  the fallback when screen metrics are absent. On phones posters are
  drawn 1.22x wider so they stay legible. rAF is typeof-guarded; the
  first frame is drawn synchronously at t = 0.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical; the duplicate was deleted.
- Read-back: desktop, mobile, and thumb all show the stone-block
  wall with mortar grid, the slatted shuttered doorway at right,
  and the five seeded posters (red, blue, yellow, black, red)
  rotated and overlapping at mid ages, stamp squiggles visible as
  tiny illegible marks at the poster corners, no readable text
  anywhere, nothing clipped on mobile (posters read larger via the
  phone boost, doorway intact). A throwaway t=35 render (since
  deleted) verified the life cycle: the four older seeded posters
  had peeled away and the last one was mid-peel, its bottom-right
  corner folded back to show the shaded underside and the wall
  behind it.
- Deviations: the date stamps are illegible squiggle marks rather
  than stamped dates, for the determinism reason above. No other
  deviation from the prompt: no reset control exists, posters snap
  rather than glide, aging and overflow are per-poster closed forms.
