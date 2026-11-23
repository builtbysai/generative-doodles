# No.816 "The Tambura" (EXPANSION #100 rhys-chatham, PP1)

## Concept

Chatham's Guitar Trio engine reduced to its acoustic idea: six guitar strings all tuned to the same E, micro-detuned against each other, so the chord is one note and everything interesting happens inside it. The piece is six horizontal lines on near-black, full-bleed and evenly spaced. There is no guitar body, no fretboard, no hand: the lines play themselves. Where the strings' phases align, the interference blooms as slow amber shimmer bands that travel along the lines; where they scatter, the line stays pale string. Watch-only on a seamless 32 s loop: struck (0-4 s), detune drift with traveling bands (4-26 s), settle toward near-unison (26-30 s, bands slowing and widening), soft fade (30-32 s). Silent by design: the chord is seen, not heard.

## Construction

- Single self-contained index.html, canvas 2D only. Palette strict: strings #C9C9CF, interference #D9962C, background #0A0A0C.
- Interference model (closed-form, pure function of t). Each string carries a phase against the ensemble:
  psi_i(x,t) = 2PI * ( e_i * detuneScale * (RATE*t - SPAN*x/W) + kappa_i * (x/W) * (0.35 + 0.65*detuneScale) ) + phi_i,
  where e_i = ratio_i - mean(ratios) of the active detune set, and kappa_i / phi_i are fixed per-string seeds so each string's bands sit at different places. The shimmer is read two ways and the stronger shows: ensemble phase coherence R_i = |mean over j!=i of exp(i(psi_j - psi_i))| (0 scattered, 1 unison), and the string's own beat against the fundamental, pow(0.5 + 0.5*sin(psi_i), 2.4). Bands travel at RATE/SPAN = 0.058 widths per second (crossing in about 17 s).
- Detune sets (ratios to the common fundamental), cycling one per 32 s loop by loop index mod 3:
  A (base, from the prompt): 1.000, 1.001, 0.999, 1.002, 1.0005, 0.9985.
  B (wider, more restless): 1.000, 1.0025, 0.998, 1.004, 1.0015, 0.997.
  C (narrow, asymmetric): 1.0005, 0.9995, 1.0015, 0.999, 1.000, 1.002.
- Loop envelopes (tau in seconds within the loop; values match at the wrap so the loop is seamless): brightness 0.35 at tau=0, strike bloom to 1.0 by 4 s, held through the drift, 0.95 at 30 s, fading back to 0.35 at 32 s. Detune scale 0.25 at tau=0, full by 4 s, collapsing to 0.06 across the settle (26-30 s), which slows and widens the bands automatically since band rate and density are proportional to it, then easing back to 0.25 during the fade. Vibration amplitude swells at the strike and decays gently.
- Rendering: each string is sampled once per frame into displaced points (a shared carrier wave, 2.2 cycles across the width at 0.9 Hz, plus a small per-string phase perturbation), then drawn in three passes along the identical path: a plain string pass so the line never vanishes, an amber glow pass (wide stroke, alpha from the bloom only), and a core pass tinted toward amber and brightened inside the bloom. Glow is layered stroke alpha only: no gradients, no shadowBlur, no ctx.filter, no offscreen canvas.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen min dimension < 700 with aspect fallback (vibration amplitude lifted 1.25x on phones; the horizontal full-bleed layout is unchanged). No interaction, no audio, no visible text except the title.
- Determinism: frame one is the synchronous draw at fixed loop phase t = 10 s, inside the drift section, where the traveling bands are developed (a just-struck frame would read as plain lines). The animation loop is anchored as PHASE0 + elapsed since load. Nothing in the drawing path reads Date.now() or Math.random(); the per-string seeds are fixed constants.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, byte-compared with cmp: identical. Duplicate deleted.
- Read-back, desktop and thumb: six pale strings evenly spaced on near-black, amber shimmer bands glowing on the lines at different positions per string (top string lit left-to-centre, second string centred, fourth string lit at centre and the far right, and so on), pale plain stretches between bands. Bands sit on the lines, not beside them.
- Read-back, mobile: strings span the full width, bands visible on every string, nothing clipped.
- Fix iterations during build: (1) first pass drew the base line on a shallower wave than the core, braiding the two paths into a beaded texture, and the mean-cos interference measure sat mid-range everywhere so whole lines ran amber; rebuilt so all passes share one sampled path and interference is read by phase coherence plus beat. (2) The coherence-only model had a single broad unison zone (all phase differences scaled with one common factor); added per-string deviation-from-mean phases with fixed kappa/phi seeds, which localised the bands per string. Final renders above are from the fixed build.

## Deviations

- The prompt's technical note gives band brightness as sin(f1*t) - sin(f2*t) interference at literal micro-detunes; at true scale (beats of a fraction of a hertz, bands effectively frozen) nothing would move inside a 26 s drift. RATE and SPAN amplify the detune differences to visible scale, documented in the code and above; the ratios themselves, the set structure, the loop timeline, and the settle-to-unison behaviour are as specced.
- Frame one is phased to t = 10 s into the loop rather than the strike instant, per the build brief, so the thumbnail shows the drift and its bands; recorded here as required.
