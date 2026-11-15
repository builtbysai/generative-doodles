# No.1780 Self-Playing Pendulum (SV5, PP1027)

Completes EXPANSION #233 stephen-vitiello. Gallery date: 2006 · 11 · 26.
Gallery note: "A black orb swings slowly over a pale speaker cone; violet rings bloom at closest approach. Tap for a gentle nudge."

## Build

Canvas 2D only, no WebGL, no DOM text, no animation loop state.
Template: live No.1775 index.html, fetched fresh at build.

- Dark gallery void: near-black ground #0a0a0c, generous negative space, one vertical axis down the centre of the field.
- The orb (the microphone) is a matte black disc, radius 0.05 of the field side, hanging from a thin grey wire from a small pivot mount at 0.06 of the field height. The wire is 0.58 of the field height long. A faint halo and a thin rim light on the upper-left edge keep the matte black orb readable against the near-black void.
- The speaker cone sits at the bottom centre, at 0.84 of the field height: three concentric circles in pale greys, outer cone #c9c9c4, inner cone #b2b2ac, centre dome #8f8f89.
- Palette hand-picked from the prompt's named colors: near-black ground, matte black orb, pale grey speaker cone, faint violet interference rings (rgb 167, 139, 250). No study file exists for stephen-vitiello, so no study hexes were available to copy.
- Pendulum: the swing angle is a closed-form function of piece time, theta = 0.35 * sin(2 * PI * t / 8), an 8 second period with a 0.35 radian (about 20 degree) amplitude. The swing plane precesses at 2 * PI / 600 radians per second, one full turn in 10 minutes; the horizontal displacement is foreshortened by cos of the precession angle, so the swing slowly turns from side to side toward and away from the viewer.
- Rings: four concentric violet rings centred on the midpoint between orb and speaker. Their radii grow as a closed-form function of piece time and their alpha is driven by a proximity factor: 0 when the orb-to-speaker distance exceeds 0.28 of the field height, 1 at the closest approach of 0.20. Rings bloom only near closest approach and fade as the orb swings away.
- Interaction: watch-first. A tap anywhere records the piece time and adds one fixed authored nudge, 0.06 radians of extra swing decaying over 8 seconds. There is no dragging of the orb and no click-to-reload. A tap also starts a quiet sine feedback tone lazily inside the gesture (gain 0.03, pitch following the orb-to-speaker distance, fading over 1.2 seconds); the piece works fully muted and never autoplays audio.
- Frame one: fixed phase t = 60 s. sin(2 * PI * 60 / 8) = sin(15 * PI) = 0, so the orb hangs straight down at its closest approach to the speaker, proximity 1, rings at full bloom. Precession angle at frame one is 36 degrees, invisible while the swing angle is zero and visible as the swing proceeds.

## Deviations and interpretations

- The prompt calls for true pendulum physics with a slight drive to keep it perpetual. Per the spec adaptation flag, there is no integrated physics with wall-clock state: swing angle, precession and rings are all closed-form functions of piece time, so frame one stays byte-comparable. The motion is perpetual by construction, since the closed-form swing never decays.
- The prompt says the orb is a single black orb on a thin wire. A pure black disc on a near-black ground would be invisible, so the orb carries a faint halo (alpha 0.16) and a thin rim light on its upper-left edge. The orb itself stays matte black.
- The speaker is drawn as concentric circles seen from the front (outer cone, inner cone, centre dome) rather than a side-view cone, so it reads clearly as a speaker at small sizes.
- The wire length was shortened from the first draft (0.62 to 0.58 of the field height) so the orb clears the top of the speaker cone at closest approach instead of overlapping it.
- The tap nudge is an added damped sine term at the fixed authored amplitude 0.06 radians, not a physics impulse. Frame one is pre-tap, so it stays byte-comparable.
- Reduced motion: the animation loop does not start, so the piece rests at the fixed frame one.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); centred geometric piece keeps its square field on desktop and full-bleed on phones, with the page ground set to the piece's own near-black and the hint ink pale to match; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with no Date.now or Math.random anywhere in the script; watch-first with tap nudge only, never click-to-reload; no AI-signature copy; no em dashes anywhere in this file.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: near-black void, thin wire down the centre from a small pivot dot, black orb with a faint halo and rim light hanging directly over the pale grey three-ring speaker cone, four faint violet rings blooming between orb and speaker. Title plate "Self-Playing Pendulum / 2006 · 11 · 26" top left, "Tap for a gentle nudge." bottom left. Both plates fully legible.
- Mobile 390x844: full-bleed vertical composition, same elements, wire starting just below the title plate, orb and speaker centred, rings visible, plates legible. Nothing clipped.
- Thumb 720x720: same composition as desktop, orb over the cone with violet rings. This render is thumb.png.

Motion verified separately with a probe script calling the exposed drawAt hook: t = 60 s, swing angle 0.0000, proximity 1.0000 (orb at bottom, rings full); t = 62 s, swing angle -0.3500, proximity 0.0000 (orb at full left swing, rings gone); t = 64 s, swing angle 0.0000, proximity 1.0000 (orb back at bottom, rings full again); t = 66 s, swing angle 0.3500, proximity 0.0000 (orb at full right swing). The t = 62 render was inspected: diagonal wire, orb left of centre, no rings, speaker alone.

Fix round: the first draft used a 0.62 wire length, which would have overlapped the orb onto the speaker cone at closest approach. Wire shortened to 0.58 and the ring thresholds retuned (near 0.28, closest 0.20 of field height); all three sizes re-rendered and re-inspected after the fix.
