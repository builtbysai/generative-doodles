# №1734 Two Players, One System (PP981, greyfade GF7)

EXPANSION #227 greyfade, seventh of eight. Completes the study at №1735 with №1733 and №1735 built in parallel. Gallery date 2006 · 10 · 11 (formula 2002-01-10 + 1735 days). Gallery note: "Two forms improvise in red and blue light, kept in shared tuning where their trails meet. Drag to nudge one player."

## Prompt

Two soft-edged forms on stage in red and blue light, each improvising small wandering trails; a live system listens to both and keeps them in a shared tuning, so the trails harmonize where they cross. Palette: near-black stage, red and blue washes, trails in pale gold where the two forms agree. Composition: the two forms left and right, center reserved for their meeting zone. Motion/interaction: drag-to-nudge one form earns the interaction because the piece is a live system to disturb; otherwise the duet improvises alone. Technical approach: canvas 2D, two wandering agents with a coupling force pulling their frequencies toward a shared ratio, gold drawn where their trails intersect within a threshold. What to avoid: a battle or chase reading (they cooperate); one agent dominating the frame.

## Build

Canvas 2D only. Structure and house-rule code mirror live №1732 (The Score Follower), fetched via fetch-blob.py.

Hexes hand-picked from the prompt's named colors, since studies/greyfade.md does not exist in the repo: stage #0E0D10, red form #D64545 with deep #8E2B2B, blue form #4A78DC with deep #2B4A8E, pale gold #E8C86A, plate #17161A, ink #F2EFE6.

Each agent's position is a closed-form phase function of piece time: a base center (red 0.30W, blue 0.70W, both 0.52H), two sine wander terms, and a shared slow meeting modulation (0.32 rad/s) that pulls both toward the center at the same moments, plus a shared vertical term so they arrive together. The wander frequencies sit near a 2:3 ratio and the shared tuning frequency (0.26 rad/s) is the value the coupling blends each toward; the shared modulation is the coupling made visible. The two forms have equal radii, equal trail weights, and symmetric amplitudes, so neither dominates the frame and the reading stays cooperative, never a chase.

Trails are drawn from 120 closed-form samples over the past 9 seconds, older segments fainter. Gold is drawn only where the two trails at the same sampled instant are within 0.12 of the smaller viewport dimension AND the midpoint falls inside the center zone (within 0.24W of center), with a soft gold glow at the closest meeting point. Faint vertical guides at 0.38W and 0.62W mark the meeting zone, labeled at the top on wide screens.

Drag: pointerdown picks the nearer player; pointermove records incremental drag samples for that player; the nudge at time t is a closed-form sum over those samples, each decaying with a spring return (time constant 1.6 s, capped at 0.16 of the smaller dimension), so a drag visibly pulls one form off its path and the pair eases back to shared tuning. No click-to-reload anywhere; a tap does nothing.

Frame one is fixed phase t = 6.0 s. At that phase red sits at (0.44W, 0.53H) and blue at (0.66W, 0.58H), both legible left and right with the meeting zone clear between them. The trail window covers t = -3 to 6 s, which includes a genuine meeting near t = 3.65 s where the same-time distance between the agents drops to about 9 px on desktop, so gold is present at load as a record of a real meeting, not decoration. No Date.now or Math.random affects any frame; the only rng use is a seeded mulberry32(1734) jitter of 0.04 rad on two phase constants at load.

## Deviations

None from the prompt. The "coupling force" is implemented as shared phase terms in the closed-form wander functions rather than a frame-integrated simulation, because the determinism rule requires frame one to be a pure function of piece time. The effect is the same on screen: the two frequencies drift toward the shared ratio and the pair meets periodically in the center.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js and read all three PNGs.

- Desktop 1280x900: red form left, blue form right, both soft-edged with pale cores and listening rings; red and blue washes visible; trails thin and legible; a distinct gold V sits in the center meeting zone where the trails crossed; title plate top left, "MEETING ZONE" label top center, hint plate bottom left, no collisions.
- Mobile 390x844: title and hint plates fit; both forms legible; gold meeting mark present in the center zone; trails read as wandering lines. The forms sit closer together than on desktop because the stage is narrow, but neither overlaps the other and neither dominates.
- Thumb 720x720 (this file): same composition as desktop, gold meeting mark clear, plates unclipped.

Probe checks (node, via window.__probe): gold points at frame one 77 desktop / 84 mobile; frame one byte-identical across two draws; simulated drag of the red player moves it off path at t = 6.5 and the offset has decayed to near zero by t = 12.

Two build bugs found and fixed during QA: the blue agent's wander terms were signed the same way as the red agent's, so the pair never met and gold count was zero; and a .toFixed(4) string was passed into rgba() in the gold-dot alpha (it only surfaced once gold existed). Both fixed, then all three sizes re-rendered and re-read.

## Files

index.html, process.md, thumb.png (the 720x720 render).
