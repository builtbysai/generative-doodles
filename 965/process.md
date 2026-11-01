# No.965 "Social Turkers"

Study #118 lauren-lee-mccarthy, PP126. Built 2026-10-31.

## Concept

McCarthy's Social Turkers (2013) put thirty OkCupid dates under the live direction of paid Mechanical Turk workers. The piece compresses that into thirty self-contained mini-arenas on near-black: in each one, a white dater-dot orbits a magenta date-dot while tiny cyan vote ticks along the arena's edges stand in for the invisible gig workers steering the encounter. Every two seconds the ticks re-vote and the orbit bends. Each arena resolves on its own staggered timer: a tight orbit leaves a mint ring glyph, a loose orbit a red cross. The glyphs persist as a season ledger while new pairs start again in the same arenas. When all thirty arenas hold glyphs, the season ends and a new one reseeds. Dots and glyphs only: no people, no dating-app UI, no scores or rankings. The ledger is the record, and the stagger is essential: thirty independent gig shifts, never one chorus.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. Palette is strict: ground #0C0D12, arena hairlines #262A35, daters #F5F2EA, dates #FF4FD8, vote ticks #4FD6FF, ring #7DFFB8, cross #FF3B3B. No visible text except the title element.
- Fixed-timestep simulation at 120 Hz. Frame one is the synchronous draw after exactly 3600 pre-roll steps (30 s). All state derives from mulberry32 seeded streams; no wall clock feeds any drawn state. The live loop is rAF-guarded with a capped accumulator; all audio is lazily created inside the first pointer gesture and typeof-guarded.
- Arena model: the grid is 6 cols x 5 rows. Each arena runs in a local 100x100 space, mapped to its cell at draw time. The date-dot wanders slowly on a seeded sinusoidal heading, softly contained within radius 16 of the arena center. The dater-dot's velocity is steered each step toward a target orbital velocity: tangential pace plus a radial correction toward the currently voted target radius.
- Vote model: each arena holds 6 to 10 ticks at seeded edge positions. Every 240 steps (2 s), staggered per arena, the ticks re-vote. Each arena has a seeded worker temperament (an inward/outward bias) and a seeded erratic chance that makes a tick ignore the temperament. The net vote sets the round's goal radius (26 +/- up to 15 local units, clamped 11 to 43) and fires a single radial impulse into the dater's velocity, the visible kink in the path when a fresh vote lands. Tick marks are drawn pointing inward or outward by their current vote, flashing bright on refresh and decaying over about half a second.
- Resolution model: each arena accumulates the mean dater-to-date radius over its round. On its timer, a mean radius under 26.4 local units (tightness normalized against a 44-unit reference radius) resolves as a ring, otherwise a cross. The glyph fades in at the arena center and persists while a new pair respawns after a 1.2 s pause. A later resolution in the same season overwrites that arena's glyph with the newest verdict.
- Season model: when all 30 arenas have resolved at least once, seasonFade runs 120 steps, the glyphs fade while the sim continues, then a new season reseeds all arenas from a fresh seed.
- Interaction: a tap on an arena rigs its next round (all ticks flood bright immediately; during the rigged round the inward vote probability is 0.96 and the goal radius drops to about 13, so the orbit visibly tightens). Taps pass through a 42-step window so a double tap reads as a new season instead. A drag from one arena to another swaps their date-dots.
- Sound (browser only, silent in QA): a soft asynchronous tick patter as the gig-work bed, a small two-tone bell for a ring resolution, a dull low thud for a cross, throttled to at most about four resolve sounds per second.
- Viewport: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width and height are pinned in px inside draw(). Phone detection uses window.screen physical size (min dimension under 700 px) with the aspect ratio only as a fallback. Page ground is the piece ground at all sizes; the grid fits the width and glyphs stay legible on the 390 px render.

## Recorded choices and deviations

- First-round stagger: the prompt's resolve window is 15 to 25 s, but with a 30 s pre-roll every arena would already have resolved and the first season would end before frame one. First rounds therefore draw seeded timers of 18 to 63 s, landing frame one mid-ledger with 6 to 10 glyphs showing; every round after the first uses the specced 15 to 25 s.
- Drag swap: per the build brief, when two date-dots are swapped the round timers keep running and only the orbiting pairs restart around their new dates; the radius accumulators reset with the restarted pairs.
- Glyph persistence: the ledger glyph stays visible behind the respawned pair rather than clearing the arena, since the prompt frames the glyphs as an accumulating record, not a results screen.

## QA log

- Rendered with the house node-canvas renderer: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720). All render cleanly in silence (no AudioContext in the harness; all audio paths are guarded).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Desktop read-back: 6x5 hairline grid on the ground tone; in most arenas a white dot orbits near a magenta dot with cyan ticks along the edges in mixed inward and outward votes; frame one already holds 5 mint rings and 1 red cross (6 glyphs, inside the specced 6 to 10).
- Thumb read-back: same composition at 720x720; glyphs, dots, and tick flashes all legible.
- Mobile read-back: the full grid fits the 390-wide frame, vertically centered on the dark ground; glyphs and dots stay legible; nothing is clipped.
