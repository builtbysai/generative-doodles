# No.834 "All Strings to One Note"

EXPANSION #102 john-cale, PP3 "Ostrich Tuning" (shipped title is the block's Title suggestion). The Primitives' trick, Lou Reed's Ostrich tuning: every string to the same note. A field of 48 vertical strings vibrating in perfect unison; the only events are a single string slipping sharp and being pulled back, and the whole bank dropping a semitone together. Unison or nothing.

## Concept

- 48 vertical strings span the frame between a brown peg rail (top) and bridge (bottom), all phase-locked to one standing-wave shape. There is no harmony, ever: one pitch class, one phase.
- At the center, a bright interference band glows where the summed displacement concentrates. It is not decoration: each cell of the band is computed from the actual locally weighted sum of the strings' displacements at that height.
- The event: one string at a time slips up to +20 cents sharp, its phase runs ahead, the interference smears locally around it (a warm ember column), an ember dot lights its top peg, then it is pulled back into lock. Only one detuned string exists at any moment, scheduled or manual.
- Drag detunes the nearest string by hand; double-tap drops the whole bank a semitone.

## Construction

- Single self-contained canvas 2D piece. Strict palette: field #141210, string silver #CFCFCF, gold #C9A227, slip ember #E0682B, AM-radio brown #6B4F35 (pegs and rails only). No text except the title. No gradients, no shadowBlur, no filters, no offscreen canvas.
- Sizing follows the Visual Viewport API with resize listeners on visualViewport and window; the canvas CSS size is pinned in px inside draw() every frame. Phone detection via window.screen physical size (min dimension < 700px) with the h > w*1.15 aspect fallback. Strings span the full width at every size.
- String shape: standing wave, fundamental plus a 0.35-weight second harmonic, displacement amplitude half a string spacing. All strings share the common phase; the detuned string adds its own phase offset.
- Common phase is closed-form: PHASE0 (0.9 rad, so frame one sits mid-oscillation) plus 2*pi*FVIS (1.15 Hz) times the integral of the bank multiplier over [0, t], evaluated piecewise across recorded bank-drop events. Frame one is the synchronous draw at t = 0; no drawn state ever reads Date.now().
- Slip schedule (seeded, mulberry32 seed 834001): slips begin at t = -0.6 s (first slip, string 15, near the left third, so frame one catches it just beginning with its ember dot lit), then recur with a seeded gap of 4 to 9 s after each slip's settle. String indices are drawn from 3..44, never repeating the previous slip's string. Profile: linear ramp 0 to +20 cents over 2 s, hold 3 s, linear fall over 2.5 s.
- Slip phase offset is the true integral of the detune: the offset is 2*pi*FVIS times the integral of (2^(cents/1200) - 1) dt over the profile, computed analytically per linear segment (the integral of an exponential of a linear function). After the profile ends, a 1.6 s settle eases the accumulated offset to the nearest multiple of 2*pi, so the string returns to exact lock and no permanent phase drift accumulates.
- Manual drag: pointerdown selects the nearest string and supersedes the schedule (any scheduled slip whose window, settle included, overlaps a manual session is cancelled outright). Pointer samples are recorded as (t, cents) points, cents from drag distance (px/5, capped at +32). The manual phase offset is the same analytic integral over the recorded piecewise-linear cents curve; on release the cents fall linearly and the phase settles to the nearest 2*pi over 1.6 s. All event-driven state is a closed-form function of the recorded event list and t, never frame-integrated.
- Bank drop model: a double-tap (two presses within 320 ms and 44 px) records a bank event. Each double-tap drops every string one semitone: counts cycle 1, 2, 3, 4 semitones down, and the fifth double-tap wraps back to base (count 0). The drop scales the common-phase rate by 2^(-count/12) (phase-continuous, since the common phase is an integral over the multiplier) and shifts the interference band's color from silver toward gold with each drop.
- Interference band: a 48-by-44 cell field over the middle 80% of the string length. Each cell's brightness is the magnitude of the triangularly weighted mean displacement of the five nearest strings at that height, normalized by the maximum displacement, feathered horizontally and windowed vertically so the glow concentrates at the center and dissolves at the edges.
- Audio (first tap only): five oscillators, not 48: four sine oscillators at the unison pitch (196 Hz times the bank multiplier) plus one for the detuned string (unison pitch times bank multiplier times 2^(cents/1200)), modest gains (0.035 / 0.05) through a DynamicsCompressor as a limiter. The context is created lazily inside the first pointer handler, every use is typeof-guarded and wrapped in try/catch, and frequencies are updated per frame from the same closed-form state that draws the strings. The QA renderer has no AudioContext and the piece renders and animates silently without error. requestAnimationFrame is typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720). The piece rendered cleanly in silence at all three sizes.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical; the duplicate was deleted.
- Read-back, desktop: 48 silver strings in one locked standing-wave sway across the dark field, brown pegs and rails top and bottom, a soft silver-gold interference glow concentrated at the center and feathered on all sides, one warm ember column around the slipping string near the left third with a single ember dot on its top peg. Nothing clipped.
- Read-back, thumb: same read at 720x720; the unison field, center band, slip column, and single ember dot all legible.
- Read-back, mobile: strings span the full width of the tall frame, band centered, ember dot visible, nothing clipped.
- Fix rounds during QA: (1) the band's first build used 18 coarse full-width row rects and read as a hard grey slab with a visible grid; rebuilt as the fine locally summed cell field. (2) The cell field showed a checkerboard dither from fractional cell placement; fixed with wider cell overlap and a vertical window, after which the band reads as a continuous glow.

## Deviations

- The slip phase offset integral uses the visual rate FVIS and does not additionally scale by the bank multiplier; bank drops are rare, user-triggered events, and the offset is a small fraction of a cycle, so the interaction is inaudible and invisible. Recorded here rather than complicating the closed form.
- First slip phased to start at t = -0.6 s instead of exactly t = 0, so frame one shows the slip just beginning (dot lit, string a few cents sharp) rather than at zero cents with the marker not yet visible. Per the brief's instruction to phase the schedule so a slip starts at frame one and record it.
- Audio uses a five-oscillator bank (four unison plus one slip voice) instead of one oscillator per string, per the brief; the unison is a single pitch class either way.
- Double-tap bank drop wraps to base after four semitone drops (the brief's pick-one option), rather than toggling back up one semitone at a time.
