# No.831 — A Physician Should Be in Attendance

EXPANSION #101 tony-conrad, PP8. Built 2026-10-31.

## Concept

Conrad's master move was treating the paperwork of the medium as the cinema:
the warning frame, the title cards, the projection booth's bookkeeping, and,
where the film should be, nothing. This piece is only that paraphernalia. A
state machine of intertitle cards (warning, title, "THE FILM WILL NOW BEGIN",
held black) cycles on tap and never delivers a film. Beneath the cards, a
booth readout counts frames in real time at the stated flicker rate while the
"film" is supposedly playing, and a small gramophone disc glyph turns while
the ragtime plays. The bureaucracy is the content; the film is the thing you
never get to see.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Palette
  is strict: black #000000, title white #FFFFFF, booth amber #C9A227, paper
  card #EFE9DB. Page ground is the piece black.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; the canvas CSS size is pinned in px
  inside `draw()` every frame; phone detection uses `window.screen` physical
  size (min dimension < 700px) with the aspect fallback `h > w*1.15` only.
- Card machine: four cards in fixed order. TAP advances one card (wrapping
  from held black back to the warning). DOUBLE-TAP reseeds the booth numbers
  (rate 6.0-14.0 Hz, splices 240-759, drawn from a mulberry32 stream seeded
  831831; the initial shipped values are 8.0 Hz / 500 splices). The held
  black card breathes at 0.05 Hz (a slow brightness drift between rgb 1 and
  13), alive without becoming a flicker.
- Counter model: state lives in an anchor list. Every interaction appends an
  anchor {t, frames, card, rate, splices}; the state at any time t is a
  closed-form function of the latest anchor at or before t: the frame count
  advances at the anchor's rate only while a film card (BEGIN or held black)
  is up, and holds still on the warning and title cards. Horizontal DRAG
  scrubs the counter live at 2 frames per pixel and commits the offset as a
  new anchor on release. The displayed count wraps into 0000-9999. No
  `Date.now()` anywhere; the piece clock is anchored to the first rAF
  timestamp and frame one is the synchronous draw at t=0.
- Sound: a tiny WebAudio music-box loop, started only on the first pointer
  gesture (lazy `AudioContext`, typeof-guarded including the webkit prefix,
  wrapped in try/catch). The melody is an original generic ragtime-style
  tune composed for this piece (a syncopated 8-bar, 16-beat loop with a
  quiet oom-pah bass); it is not a reproduction of "Raggedy Ann" or any
  other existing tune. Notes are sine partial pairs (fundamental plus a
  quiet third harmonic) with fast attack and exponential decay, run through
  a 1700 Hz bandpass for tinniness into a 0.16 master gain. A lookahead
  scheduler runs from the rAF loop. The disc glyph rotates at 0.55 rev/s
  only while audio is live; before the first tap it sits still, as specced.
  In environments with no AudioContext (including the QA renderer) the
  piece runs silently without error.
- Long card lines shrink to fit the card width (measured per line), so the
  warning stays inside the paper panel at phone sizes.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280x900): paper warning card centered on black,
    "WARNING / This film may be especially unsuitable for epileptics / A
    physician should be in attendance" in plain black type; below it the
    amber mono readout "FRAME 0000 / 500 SPLICES / 8.0 Hz"; the small disc
    glyph beneath, still.
  - `qa-mobile.png` (390x844, phone path): same composition, card at 88%
    width, all text inside the card, readout and disc fully in frame,
    nothing clipped.
  - `thumb.png` (720x720): same frame-one composition.
- Determinism: `thumb.png` rendered twice and byte-compared with `cmp`:
  identical. The duplicate was deleted. Frame one is the warning card at
  FRAME 0000, as specced; the renderer has no rAF and no AudioContext, and
  the piece rendered cleanly in silence at all three sizes.
- Deviations: none from the prompt's substance. Two small judgment calls,
  recorded here: (1) the warning card uses the paper-panel variant the
  prompt offers (paper #EFE9DB panel, black type) rather than white type on
  black; the title and begin cards carry the white-on-black treatment.
  (2) The disc glyph sits centered under the readout rather than beside it,
  keeping the booth line a single centered unit at phone widths.
