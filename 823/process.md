# No.823 "Athanor's Verbal Score"

EXPANSION #100 rhys-chatham, PP8. Chatham's late verbal-notation scores (Athanor, 2025/2026) replace staff notation with short prose instructions: "play a flurry of notes." This piece stages three of those fragments as the whole instrument.

## Concept

Three prose fragments from the verbal-score world drift slowly on a warm dark ground, set in quiet parchment serif: "a flurry of notes", "the choir enters", "let it ring". Nothing happens on its own. The piece waits for the player, the way Chatham's rehearsals wait: tap a phrase and it ignites for six seconds, emitting the texture its words describe; drag a burning phrase and the texture smears along the drag. When the burn ends the phrase cools back to parchment and can be lit again. Untouched phrases never ignite. The only text in the piece is the three prompt-sanctioned phrases and the document title.

## Construction

Single self-contained canvas 2D page. Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas.style.width/height pinned in px inside draw(). Phone detection via window.screen physical size (min dimension under 700px), with an aspect fallback (h > w * 1.15) used only when screen data is absent. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no audio, no external assets.

Palette is strict: ground #0B0B0D, text #EDE4D3, ignition red #C8102E, texture ink #1A1A1E.

Drift is closed-form: each phrase rides a seeded two-sine Lissajous around a scattered anchor (anchors at roughly (0.30, 0.30), (0.66, 0.52), (0.44, 0.74) of the frame), amplitudes a few percent of the frame, and the drawn position is clamped against the measured text box so a phrase can never touch an edge at any size. All seeds come from mulberry32 streams fixed at load.

Burns are recorded events, never frame-integrated state: a burn is {phrase, start time, drag samples}, each sample holding the smear offset of the emitter from the phrase anchor at that moment. Every drawn quantity is a closed-form function of the burn list and t:

- Phrase heat: while burning, the phrase text color mixes from parchment toward ignition red by remaining burn life, with a small deterministic sine flicker (age-based, no per-frame randomness).
- Flurry ("a flurry of notes"): 52 seeded particles (mulberry32 823201), each with fixed angle, speed, delay, stem length, spin. Position is a power curve of the particle's local age from the emitter (phrase position plus interpolated smear offset), alpha fades with local age and overall burn life. Color mapping: pure ignition red #C8102E emission, per the brief (red emission for the flurry).
- Choir ("the choir enters"): 6 seeded arcs (mulberry32 823202) that grow in staggered sequence above the phrase, radius eased with a cubic grow curve, fading in the last 30 percent of the burn. Color mapping: each arc is stroked first in ignition red at a wider line width, then in texture ink #1A1A1E at a narrower width, so the ink shape carries a red lit edge against the dark ground.
- Ring ("let it ring"): 5 seeded concentric waves (mulberry32 823203) expanding from the emitter at staggered delays, radius proportional to wave age, line width thinning as they grow, same red under-stroke / ink over-stroke lit-edge mapping as the choir.

Hit-testing uses the phrase bounds recorded at the last draw. A pointerdown on a phrase starts a burn if none is active for it (tapping a burning phrase just re-anchors the smear); pointermove while the grab is held appends smear samples to that burn (capped at 240); pointerup/cancel releases. Frame one is the synchronous draw(0) at load, with the burn list empty; the rAF loop, typeof-guarded, advances from a performance.now start mark captured after that first draw.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp-compared byte-identical; the duplicate was deleted. Frame one reads no wall clock: drift is a function of t only and the first frame is drawn at fixed t = 0.
- Desktop read-back: three quiet parchment serif phrases scattered on warm near-black (#0B0B0D), none burning, generous margins all around.
- Mobile read-back: all three phrases fully inside the 390-wide frame, nothing clipped, phrases rescaled smaller on the phone path.
- Thumb read-back: three parchment phrases legible on near-black; the waiting state reads at thumbnail size.
- Texture verification: a throwaway copy with a patched burn event (flurry phrase, t0 = -1.0 so frame one catches burn age 1 s) rendered at 1280x900: the phrase flared red with a clear burst of red note-head-and-stem particles scattering outward, the other two phrases untouched. Throwaway deleted after inspection.
- Deviations: none from the prompt's substance. Two construction notes: (1) the choir and ring textures would be invisible as pure #1A1A1E ink on the #0B0B0D ground, so they use the brief's own "dark ink shapes lit by the red flare at edges" treatment (red under-stroke, ink over-stroke) rather than adding any new color; (2) phrase typography is an italic Georgia serif via canvas fillText, the bookish reading the brief asks for, with no webfont so the file stays self-contained.
