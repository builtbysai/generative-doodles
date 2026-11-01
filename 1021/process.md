# No.1021 "Where Ads Belong"

Study #125 yuta-asai, PP182 "Counterfeit Placement" (Squarepusher "Terminal Slam" MV, 2020: fake ads composited into real Tokyo ad slots; mechanism: detect-replace-inpaint).

## Concept

A dark street wall is a gallery of lies, properly hung. Six empty ad slots wait in the concrete. One by one, on seeded schedules, a counterfeit poster composites into a slot: the arrival is a ceremony, an amber inpaint shimmer sweeping the slot's border while red macroblocks flicker inside as the forgery materializes. The poster hangs flush, lit, and confident, then fades and leaves the slot waiting again. The forgeries are pure generative marks (neon slashes, halftone fields, bold shapes, rings, bar fields): no brands, no letterforms, because the counterfeit is visual, not textual. The wall itself is drawn, never a photo: flat concrete blocks and black fire-escape line work.

## Construction

- **Wall.** Base #0A0B0D. Concrete is a seeded grid of large flat rectangles in near-tones of the wall hex (#0B0C0F / #0D0F12 / #090A0C / #0E1013 / #0A0B0E, derived by nudging the wall tone a few steps so the joints read as drawn masonry rather than texture), seamed with translucent black strokes. The fire escape is pure black (#000000) line work on the left: three flights of stringers, steps, landings, and rails. Slots are drawn over the wall, so a slot can sit across the fire escape like a mounted board.
- **Slots.** Six recessed rectangles in a deliberately loose, unaligned grid: a black rim, a #050507 bed, and a one-pixel top/left highlight (#17191E, wall family) to seat them into the concrete.
- **Slot-cycle model.** Each slot runs a closed-form cycle [empty E, paste 1.0 s, hang Hh, fade 2.0 s] with per-slot E, Hh, and phase offset as design constants; state is a pure function of piece time, so the whole hanging history is deterministic per seed. The poster seed derives from (wallSeed, slot, cycle index), so every cycle hangs a new forgery. The forgery family (5 styles) is the seeded draw rotated by slot x2 + cycle, so neighbours and successive hangings never repeat a family back to back.
- **The paste ceremony.** During paste, the poster's alpha ramps 0 to 1 over 1.0 s; for the first 0.45 s a 6x5 macroblock grid flickers #FF2E4D inside the slot (integer hash of cell and 24 Hz step, density enveloped down); for the first 0.6 s an amber #FFD93B segment with a short fading trail sweeps the slot perimeter (inpaint shimmer). Shimmer and flicker are the placement, drawn as part of the paste state, not decoration.
- **Interaction.** Tap a slot: reforge, a fresh forgery (seeded from wall seed, slot, and tap time bucket) runs the full paste ceremony, hangs 11 s, fades, then the slot returns to its schedule. Drag across a hanging or fading poster: tear, 26 macroblock particles (poster palette + flicker red) burst and fall, and the slot holds empty for 3 s before rejoining its schedule. Double-tap: new wall, the wall seed advances and blocks, slots, and styles regenerate.
- **Sound.** Lazy, typeof-guarded AudioContext created on the first pointer gesture only; silent in QA. Paste: a square-wave digital stamp plus a 300 to 640 Hz sine healing tone (also fired on scheduled pastes once audio is live, via phase-transition detection in the draw loop). Tear: band-passed noise ripping 2600 to 260 Hz. Fade: a soft 480 to 130 Hz dissolving sine.
- **Determinism.** Frame one is the synchronous draw at fixed T0 = 12 s, never from Date.now(). At T0: slot 0 hangs a halftone field, slot 1 hangs neon slashes, slot 2 is 0.25 s into its paste (rings at quarter alpha, flicker live, shimmer mid-sweep), slots 3-5 wait empty. All state is mulberry32-seeded or closed-form over the slot schedules. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas. Canvas sizing uses the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size is pinned in px every draw. Phone detection via window.screen min dimension < 700 px with the h > w*1.15 aspect fallback.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice, byte-compared identical (cmp clean); the duplicate was deleted. Re-verified after each fix round.
- Round 1 read-back: slot 2's paste offset landed at pt = 0.45, exactly the flicker cutoff, so frame one showed a dim poster with no flicker and only a stub of shimmer; and slots 1 and 2 both drew the rings family. Fixed: paste offset retuned to pt = 0.25 (flicker and shimmer both live at frame one), and the style draw rotated by slot + cycle so the three visible posters are three different families.
- Round 2 read-back: slot 0 and slot 2's incoming poster were both the halftone family. Fixed: rotation changed to slot x2 + cycle; frame one now shows halftone (slot 0), neon slashes (slot 1), rings mid-paste (slot 2).
- Final read-back: dark concrete-block wall with black fire-escape lines crossing the left; six loose recessed slots; two loud posters hanging (halftone field with magenta disc; magenta/cyan slashes with white disc); one slot mid-paste with red macroblock flicker blocks and the amber shimmer descending its right edge; three slots waiting empty. Mobile: fire escape simplifies to two flights (see deviations), slots stay large and legible, nothing clipped.

## Deviations

- **Phone fire escape:** on the phone path the fire escape draws two flights instead of three, with five steps per flight instead of seven, per the brief's allowance; landings, rails, and uprights are unchanged in kind.
- **Concrete near-tones and slot highlight:** the spec palette fixes the wall at #0A0B0D; the block joints and the recess highlight use tones derived from that hex by a few value steps (#0B0C0F family, #17191E), recorded here, so the masonry reads as flat drawn blocks. All loud color stays strictly inside the specced forgery/shimmer/flicker palette.
- **Math.random** appears once, inside the gesture-gated audio noise buffer only; it never touches drawn or simulated state (same sanctioned pattern as No.1001 and No.1012).
- **Tap also reforges a hanging poster** (tap any slot starts a new forgery there), a superset of the specced tap-on-slot reforge; drag remains the tear gesture for posters already hanging.
