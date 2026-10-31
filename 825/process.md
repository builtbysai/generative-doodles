# No.825 "Twenty Hertz" (EXPANSION #101 tony-conrad, PP2)

## Concept

Conrad tuned his Flicker soundtrack synth to 20 Hz, the exact point where rhythm becomes pitch. This piece builds the soundtrack, not the film: a dark room that is almost nothing while the audio does the work. A single sine oscillator sweeps 4 to 40 Hz; a small pulse light at center follows the oscillator's phase, and a thin meter along the bottom tracks the frequency on a log scale with a brass marker at the 20 Hz threshold. Below roughly 20 Hz the eye resolves the lamp's separate flashes; above it the lamp appears steady. Rhythm turning into pitch, seen and heard at once. One oscillator doing physics: no music, no melody, no competing visuals.

## Construction

Single self-contained index.html, canvas 2D only, no external assets. Strict palette: room #0A0A0A, pulse light #E8E8E8, meter #3A3A3A, threshold marker #C9A227. The only visible text is the specced frequency readout (plain mono, top-left), plus the title.

Phase model (closed form): the piece state is a list of mode segments, each {t0, kind, P0, f, s0}. Frequency and phase are pure functions of (segments, t); phase is the time integral of frequency, evaluated analytically per segment, never accumulated frame by frame.

- sweep: the default watch-only mode. A ping-pong with an 80 s period: frequency rises linearly 4 to 40 Hz over 40 s (0.9 Hz/s) and falls back over the next 40 s. Its integral is a piecewise quadratic (880 cycles per half period, 1760 per full cycle), so state at any t is computed directly, including whole elapsed cycles.
- fixed: holds 20 Hz; phase advances at exactly 20 cycles per second.
- manual: holds the frequency set by the latest drag.

Entering a segment snapshots the current phase (stored mod 1) so phase is continuous across mode changes. Re-entering the sweep starts on its rising leg at the current frequency, so the sweep continues from where the ear already is. The visual pulse and the audio oscillator are both driven from this single computed state each frame.

Meter mapping: the bar spans one decade, 4 to 40 Hz, on a log scale: x(f) = mx + log10(f/4) * barW, and the drag scrub inverts the same mapping, so the needle sits under the visitor's finger. The brass threshold tick and pointer triangle sit at x(20), about 69.9 percent along the bar.

Audio gating (study safety rule): sound never autoplays. The AudioContext is created lazily inside the first pointer gesture, typeof-guarded (including the webkit prefix), and wrapped so any failure leaves the piece running silently. Topology: one sine oscillator -> gain 0.12 -> DynamicsCompressor (threshold -18, ratio 12, acting as the limiter) -> destination. While audio runs, each animation frame sets osc.frequency.value directly from the closed-form state (direct value sets at frame rate chosen over setTargetAtTime: the computed frequency is already smooth, and direct sets keep the oscillator sample-aligned with the lamp's phase math). No other sound source exists.

Interaction model: the first pointer gesture ever only starts the audio. A horizontal drag enters manual mode and scrubs the frequency by x (mapped through the meter's log scale); manual persists after release. A tap that is not the first toggles between fixed 20 Hz and the auto sweep (from manual, a tap goes to fixed, the nearer of the two toggle states; recorded choice). A double-tap returns to the auto sweep from any mode.

Lamp: brightness b = 0.5 + 0.5 * sin(2 pi * phase), drawn as layered flat-alpha discs (halo at 3.1x, 2.0x, 1.35x radius under the core) because the house renderer has no gradients or shadowBlur. Frame one is the synchronous draw at t = 0 in the silent state: sweep at its start, needle at 4 Hz, readout "4.0 Hz", phase exactly 0 so the lamp sits at mid brightness (b = 0.5), the honest midpoint of its first flash cycle.

Sizing: canvas from the Visual Viewport API with resize listeners on visualViewport and window, canvas style pinned in px inside draw(), phone detection via window.screen (min dimension < 700 px) with aspect fallback. rAF typeof-guarded; the QA renderer (no rAF, no AudioContext, no document.createElement) runs the piece's synchronous first frame only, in silence.

Deviations: none from the prompt's substance. Two recorded choices: the tap-from-manual target (fixed 20 Hz, above), and direct per-frame oscillator frequency sets (above).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The renderer has no AudioContext: the piece rendered cleanly in silence at all three sizes, listeners registered for pointer and resize only.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical; the duplicate was deleted. Frame one is the synchronous draw(0); no drawn state reads Date.now (the rAF clock only advances piece time after frame one).
- Read-back, desktop: near-black room, "4.0 Hz" readout top-left in mono, small pale lamp at center at mid brightness with a soft layered halo, thin meter bar along the bottom, white needle at the bar's left end (4 Hz), brass threshold tick with pointer triangle at about 70 percent of the bar (20 Hz log position). Nothing else in the frame.
- Read-back, mobile (390x844): same composition scaled, lamp centered, readout legible, meter and brass marker fully inside the frame, nothing clipped.
- Read-back, thumb (720x720): same read at thumbnail size; the lamp, readout, and threshold marker all survive the small size.
- One construction fix during build: the sweep integral initially recursed at the half-period boundary (s = 40) and overflowed the stack in the first render attempt; replaced with a direct constant for the half-period integral (880 cycles) and re-rendered. All final renders and the byte-compare were produced after the fix.
- Audio path verified by code inspection only (the QA renderer has no AudioContext): context creation is lazy and gesture-bound, the oscillator starts once, and frequency writes are guarded.
