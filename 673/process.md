# No.673 — Diez Campanas

EXPANSION #82 clemente-mckay, prompt block 1 "Diez Campanas". Clemente McKay's
"Al río Maipo" installation (Centro del Vino Concha y Toro, 2025) as an
instrument you play: ten ceramic bells over a pool evoking the Maipo riverbed,
each named for a Maipo mountain, activated by rounded river stones.

## Concept

Ten matte clay bells hang in a row over a dark pool band. They are clay, not
bronze: burnished terracotta bodies with a shadow side, thin engobe banding
lines, and a dark mouth opening, each with its mountain name written small
beneath it (Manquehue, El Plomo, San Jose, Tupungato, Castillo, plus five
invented in the same register: Marmolejo, Planchon, Descabezado, San Fernando,
Altomaipo). Six rounded river stones rest on the bank at the bottom. The
stones are the only controllers, which is McKay's exact activation gesture:
drag a stone up into a bell's mouth and the stone becomes the mallet. The bell
descends toward the water under the strike; when its mouth breaks the surface
it sounds, deeper strikes sounding lower and fuller, with ripple rings on the
pool and caustic shimmer brightening on the bell body. Release the stone and
it falls back to the bank; the bell rises back to rest on its spring. Idle,
a slow current drifts caustic flecks through the pool and the bells sway
almost imperceptibly. Visible text is limited to the ten bell names, as the
prompt specifies. Sound happens only on play, never on load, never autoplay.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Strict
six-color palette: night water #0E1B22, bell clay #A4552F, bell shadow
#5E2F1B, stone #8A8378, caustic light #F5E9C8, name text #E4D3B8.

- Bells: parametric lathe profile (ten depth/half-width points, crown to
  flared mouth) smoothed with quadratic curves, filled clay, shadow side and
  mouth-end shading clipped to the silhouette, three engobe bands clipped to
  the body, dark mouth ellipse with a deeper inner ellipse. Sizes and rest
  heights are seeded (mulberry32, seed 673101); El Plomo and Tupungato are
  deliberately the largest bells. Each bell hangs from a thin cord; cords are
  drawn in a separate first pass so they never cross a bell body.
- Submersion model: each bell carries a submersion parameter s in 0..1 with
  a velocity, integrated in the fixed-step simulation (1/240 s) as a damped
  spring (k = 11, c = 1.5) back to rest. Contact between the dragged stone
  and a bell's mouth region adds impulse (base plus a term from the stone's
  recorded speed) and stores hitDepth from that speed; sustained contact
  re-triggers every 0.4 s, so pressing the stone into the mouth pumps the
  bell down. Each bell's water-entry threshold sWater is derived from its
  rest mouth height and its descent range; crossing it downward spawns
  ripple rings at the mouth and plays the tone, crossing upward spawns a
  smaller ring.
- Tone model: fundamental per bell from its size (about 105 to 212 Hz,
  larger is lower), lowered by up to 35 percent by hitDepth, through a
  lowpass that closes with depth (2800 down to 1000 Hz), with inharmonic
  partials (1, 2.02, 2.74, 3.76) at falling gains and decays that lengthen
  with depth, plus a short band-passed noise burst as the wet percussive
  attack at water entry.
- Lazy audio guard: the AudioContext is created only inside ensureAudio(),
  which is called solely from the pointerdown handler. Construction is
  wrapped in typeof checks for window.AudioContext / webkitAudioContext and
  a try/catch, and playTone returns silently when no context exists. In the
  headless QA renderer (no AudioContext, no rAF) the piece renders and runs
  its visual path without throwing; no sound is ever attempted on load.
- Stones: six seeded ellipses with shadow, body and a caustic highlight
  tick. Pointer events are recorded with anchored times (and pointer speed
  computed from the previous sample) into an event queue; the fixed-step
  simulation consumes them in time order. A grabbed stone follows the
  pointer; on release it falls under gravity to the bank line at its drop
  position.
- Determinism: frame one is the synchronous draw at t = 0 with all bells at
  rest; the loop clock, physics and event times share one anchored
  performance.now() origin, and no frame is ever derived from the wall
  clock. Sway, current flecks and reflections are pure phase functions of
  the anchored time; all randomness is seeded mulberry32 data built once.
- Viewport: canvas sized from the Visual Viewport API with resize listeners
  on visualViewport and window; draw() pins canvas.style.width/height in px
  every frame. Phone detection via window.screen (min dimension < 700 px),
  aspect fallback only.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- thumb.png rendered twice and compared with cmp: byte-identical. The
  second render was deleted.
- Desktop read-back: ten matte clay bells in one row at varied heights and
  sizes, engobe bands and dark mouths reading clearly, all ten mountain
  names legible and unclipped beneath their bells, pool band across the
  bottom third with drifting caustic flecks and a waterline sheen, six gray
  stones with highlight ticks resting on the bank.
- Mobile read-back: two rows of five bells (see Deviations), all names fit
  their slots including Descabezado, pool band and stones intact, nothing
  clipped.
- Interaction smoke test (throwaway Node harness, deleted after use): the
  script was run on a fake clock with manual rAF pumping; a pointer drag
  carried a stone from the bank into the Castillo bell's mouth. The bell
  descended, crossed the waterline, ripple rings spread at its mouth and
  caustic shimmer appeared on its body; on release the stone fell back to
  the bank and the bell settled. No runtime errors, including on the
  audio-guard path with AudioContext absent. One tuning pass was needed:
  the first impulse/spring values peaked just short of the waterline, so
  the strike impulse was raised and the spring softened until a firm drag
  reliably submerges.
- House-rule greps: no wall-clock calls, no external URLs, no em dashes,
  no offscreen canvas, no ctx.filter; rAF is typeof-guarded.

## Deviations

- Phone layout: on phone-width frames the bells hang in two rows of five
  instead of one row of ten, which would have made the bells and their
  names illegibly small at 390 px wide. The pool band sits slightly lower
  (0.70 of height) to give the second row room. Recorded here per the brief.
- Each bell hangs from a thin shadow-colored cord from the top of the
  frame. The prompt does not mention cords, but the bells must hang from
  something; the cord is part of the installation scene, not UI.
- A strike that does not drive the mouth to the waterline makes no sound,
  which is the honest behavior of the instrument: the tone is bound to
  submersion, as specified, not to contact alone.
