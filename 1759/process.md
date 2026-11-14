# №1759 "Words of Concern" (PP1006, MF8, marcus-fischer) - build notes

## Spec
TASKS.md prompt block marcus-fischer MF8 (PP1006). Date 2006 · 11 · 05. Watch-only.
Gallery note: "Short fragments circle small orbits, merge into a quiet crowd, then drop out one by one until a single voice remains. Watch only."

## Driver
A loop machine fed with voices: short abstract fragments circle their own small orbits, drift together into a quiet crowd, then drop out one voice at a time until a single fragment is left alone.

## Build
Canvas 2D, structure/sizing/plates/guard patterns mirrored from live №1756.
- Ground: paper white #F7F4EE. Fragments in soft graphite rgb(90,90,88), warming to muted rust rgb(168,91,63) as the crowd forms; the final single fragment in deep ink black #1B1B1B.
- 10 fragments, all short abstract invented marks, never real statements: "the room", "a little", "not yet", "listen", "again", "slowly", "hold on", "almost", "a door", "the light".
- Each fragment has its own orbit centre scattered across the frame (nothing centered), orbit radius 0.034-0.052 of min(VW,VH), and its own period. Faint orbit traces (graphite, alpha 0.10) stay at the home orbits while the words travel.
- Cycle 120 s, closed-form functions of piece time throughout: drift 0-45 s; crowd envelope ramps 45-70 s and holds to 85 s, massing fragments toward (0.50, 0.46) with per-fragment cluster offsets; dropout 85-110.6 s; hold on the final fragment 110.6-116 s; reseed 116-120 s, fragments fading back in staggered by index.
- Dropout order (fixed): the room, slowly, not yet, almost, a little, the light, again, a door, hold on; one voice every 2.9 s, each fading over 2.4 s. "listen" never drops; it is the final voice, held in deep ink black at full strength, and it stays visible through the reseed while the others fade back in.
- Alpha: base 0.50, rising to 0.85 as the crowd forms; crowd colour is a graphite-to-rust mix driven by the same envelope.
- Frame one: fixed phase t = 60.0 s, crowd envelope 0.6, fragments partway massed toward the middle and warming toward rust. No Date.now()/Math.random(); no RNG at all (all values are authored constants), so frame one is byte-reproducible.
- House rules: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen min dimension < 700px with aspect fallback (h > w*1.15), field-like full-bleed composition, one synchronous frame at load, requestAnimationFrame guarded by typeof check, reduced-motion respected, title/date/hint plates drawn on canvas, no pointer handlers at all (watch-only, no click-to-reload), no em dashes in visible copy, no AI-signature copy.

## Orbit periods (seconds, incommensurate)
- the room 7.3*sqrt(2) = 10.32; a little 5.9*sqrt(3) = 10.22; not yet 8.1*sqrt(5) = 18.11; listen 6.7*sqrt(7) = 17.73; again 9.4*sqrt(2) = 13.29; slowly 5.3*sqrt(5) = 11.85; hold on 7.9*sqrt(3) = 13.68; almost 6.1*sqrt(7) = 16.14; a door 8.7*sqrt(2) = 12.30; the light 5.7*sqrt(3) = 9.87. Irrational ratios mean the crowd density never repeats within a viewing session.

## Dropout schedule
Dropout starts t = 85 s, one fragment every 2.9 s in the fixed order above, each fading over 2.4 s; last dropout ends t = 110.6 s. Final fragment "listen" holds alone 110.6-116 s in deep ink black. Reseed 116-120 s, fragments fade back in staggered 0.35 s apart by index. Cycle repeats every 120 s.

## Deviations from the prompt
None. Fragments are invented neutral syllables/word-fragments, short and unreadable-in-part; no real statements transcribed; no newsreel or protest reading. No WebGL involved (Canvas 2D throughout), so no substitution was needed.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script; all three PNGs read and inspected.
- Desktop 1280x900: paper-white ground, ten fragments visible with several massed toward the middle in muted rust ("not yet", "a door", "a little", "hold on", "almost", "listen" clustered mid-frame; "the room" and "the light" still drifting in), faint orbit ellipses scattered across the frame, plates legible top-left and bottom-left, nothing clipped.
- Mobile 390x844: all ten fragments legible, crowd cluster reads mid-frame, orbit traces visible, title plate fits, hint plate legible, nothing clipped.
- Thumb 720x720: same composition, crowd and plates legible; thumb.png IS this render.
- Determinism: desktop render repeated, md5 identical (8d0fd72586a05429e1045dc6e29e72af both runs).
- No fixes needed; first build passed the visual check as rendered. No post-gate edits (process.md only).

## Files
- index.html - 10,038 bytes
- thumb.png - 720x720 render
- md5 index.html: 812b592e4bd7e19bb79ff7e644dd8b49
- md5 thumb.png: e9f60c63b27ad52da43014d325e5180f
