# No.1778 Five Instruments Performed by the Tide (SV3, PP1025)

Third piece of EXPANSION #233 stephen-vitiello. Gallery date: 2006 · 11 · 24.
Gallery note: "Swells cross grey-blue water under five steel discs; a disc strikes rarely, flashing a pale cyan ring. Watch only."

## Build

Canvas 2D only, static canvas drawing with a closed-form time model, no DOM text, no animation loop state.
Template: live No.1775 index.html, fetched fresh at build.

- Water: a slate field (#42566B) with 46 fixed-seed horizontal streaks in lighter and deeper slate, drawn the same every frame. The streaks come from a mulberry32 generator seeded 1778 and never change.
- Dock: a near-black band (#10151A) at a 7 degree diagonal, centerline at 0.58 of the field height, with a faint light top edge. On desktop the band is clipped to the square field; on phones it runs full-bleed.
- Discs: five brushed-steel discs in a loose row along the dock centerline, at field-x fractions 0.15, 0.325, 0.50, 0.675 and 0.85 with fixed authored jitter. Radii are 0.045, 0.052, 0.070, 0.052 and 0.045 of the field side, so the largest disc is at center. Each disc is a radial silver gradient (#E9EDEF to #9AA3AC to #5E686F) with a dark rim, a brushed highlight arc and a center bolt.
- Swells: one hour cycle (3,600 s) with fixed authored births at 45, 620, 1,150, 1,980 and 2,790 s. Gaps are 575, 530, 830, 810 and 855 s across the cycle boundary, so the rhythm is irregular and weather-like with no visible period. Each swell front crosses the field in 45 s, drawn as a slanted translucent pale band with a brighter core line, fading in and out at the edges. Births repeat every cycle, so swells keep arriving past the first hour.
- Charge and strike model: each swell crossing a disc adds a fixed energy (1.0, 0.8, 1.1, 0.8, 1.0 per disc, left to right). At a fixed threshold (1.5, 2.4, 3.0, 2.4, 2.0) the disc is struck and the counter resets, with any remainder carried over. Charge is shown as a pale cyan arc around the disc. A strike flashes two expanding pale cyan rings that fade over 9 s. The crossing history runs from a fixed epoch and only grows with piece time, so a strike is never undone as time advances.
- Frame one: fixed phase t = 60 s. The swell born at 45 s is 15 s in (u = 0.33), its front at 0.29 of the field width, mid-frame. Disc charges are 0.00, 0.67, 0.83, 0.67 and 0.50. The leftmost disc was struck at t = 54.5 s when the swell crossed it, so frame one shows its two strike rings 5.5 s old. The next strikes follow as the same swell passes the other discs: disc 2 at 61.5 s, the center disc at 67.5 s, disc 4 at 73.4 s.
- No audio is implemented. The prompt offers a struck-metal tone only if audio is on; the piece reads fully muted, and no WebAudio is loaded.

## Deviations and interpretations

- The prompt names a stored-energy counter but not its form. It is rendered as a pale cyan arc filling around each disc, with a faint full track circle underneath, so the charge state is visible at a glance.
- The swell is drawn as a slanted translucent band with a bright core line rather than a literal wave profile; the band is the front, and the discs charge as it passes under them.
- The dock is a straight diagonal band and the discs sit on its centerline with small fixed jitter, per the prompt's loose row with slight jitter.
- No struck-metal tone is included at all, rather than a lazy gesture-gated one. The visuals carry the piece alone, as the prompt allows, and nothing autoplays.
- The water streak texture is a fixed-seed static pattern, an interpretation of grey-blue water, not a simulated surface.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like full-bleed layout on phones, square centred field on desktop with the page ground set to the piece's own slate water; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with no Date.now or Math.random anywhere in the script (the only randomness is a fixed-seed generator for the static streaks); watch-only, never click-to-reload; no AI-signature copy.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: slate water field square and centred, the dark dock clipped to the field, five silver discs in a jittered row with the largest at center, the swell band mid-frame crossing behind the discs, two pale cyan strike rings around the leftmost disc, charge arcs on the other four discs. Title plate "Five Instruments Performed by the Tide / 2006 · 11 · 24" top left, "Watch only." bottom left.
- Mobile 390x844: full-bleed water, title plate fully legible, discs on the dock, strike rings visible on the leftmost disc, hint plate bottom left.
- Thumb 720x720: same composition as desktop, all plates legible. This render is thumb.png.

Motion and state verified separately with a probe script calling the exposed drawAt hook: swell active at t = 60 s with u = 0.33; disc 1 struck at 54.5 s with charge 0.00; disc charges 0.67, 0.83, 0.67, 0.50 on the rest; disc 2 strikes at 61.5 s, center disc at 67.5 s, disc 4 at 73.4 s; charge at t = 100 s still shows the center disc at 0.20 after its strike, confirming strikes persist; at t = 3,660 s (same phase one cycle later) a swell is again mid-frame and the leftmost disc has just struck, confirming the schedule repeats.

Fix rounds: first render had the dock and swell band bleeding past the square field onto the page ground on desktop; all field drawing is now clipped to the field rect and all three sizes re-rendered and re-inspected. A probe then caught the charge history using a sliding one-cycle window, which let a strike un-happen as time advanced (center disc charge jumping from 0.20 back to 0.83 between t = 67.5 s and t = 100 s); the history now runs from a fixed epoch and only grows, and the swell lookup repeats every cycle so swells keep arriving past the first hour. All three sizes re-rendered and re-inspected after the fix.
