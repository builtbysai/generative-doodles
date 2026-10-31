# No.680 "Naciendo del Barro"

EXPANSION #82 clemente-mckay, prompt block 8 "Naciendo del Barro", built 2026-10-31.

## Concept

Clemente McKay's workshop phrase "Quenas naciendo del barro" (quenas being born from the clay) as a 40 s watch-only loop. A lump of wet clay sits on a dark bench and forms itself: no hands, no pottery wheel, no UI. It rises and hollows as if thrown, dries to leather-hard, glows in the kiln, cools to a burnished finish, and then sounds one breathy phrase, as if testing itself. Then it fades and a new wet lump takes its place. The clay is the only actor; the birth is witnessed, not operated.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Strict palette: wet clay #6E4A33, dry clay #A4764F, kiln glow #E2722B, burnished #8A4A2B, bench #171310, breath line #CFE4E4. No gradients anywhere; all glow is flat layered shapes at low alpha.

**Profile and stage morphs.** The vessel is a lathe profile of nine control points (height fraction, radius fraction) with two keyframes of the same point count: LUMP (a squat blob) and QUENA (a tall flute: cylindrical body, slight foot, mouthpiece block at the top). Every stage is a pure function of loop phase:

- Throwing (0-10 s): the rise parameter (smoothstep 0.5-9.5 s) interpolates every radius between the keyframes and scales the height from 0.34 to 1.0 of full vessel height. Each control point carries independent seeded left and right static offsets plus its own wobble phase, speed, and amplitude (mulberry32, seed 680001), so the profile is never mirror-perfect; the wobble is strongest while wet and calms to 45% as the clay dries.
- Drying (10-16 s): the body tone crossfades wet to dry (drawn as two flat profile passes with the second at the mix alpha); the mouthpiece notch is cut into the top edge, the labium window appears, and six finger holes fade in staggered down the front, each with a seeded x jitter.
- Kiln (16-26 s): a kiln envelope (in 16-18.5 s, out 24-26 s) drives two inner scaled copies of the profile filled with the kiln tone as a flat core glow, pulsing at 2.1 rad/s; 26 seeded ember ellipses rise around the vessel with positions that are pure functions of t; and one flat warm tint at ~0.08-0.11 alpha covers the whole frame. No shadowBlur, no radial gradients.
- Cooling (26-32 s): the tint and core drain with the kiln envelope; the body crossfades dry to burnished.
- Sounding (32-36 s): five breath lines rise from the mouthpiece, each a segmented polyline whose sway, curl drift, growth, and fade are pure functions of t; the rise height is capped so the lines stay inside the frame at every aspect.
- Turn (36-40 s): the finished quena fades out (36-39 s) while a fresh lump at rise 0 fades in (37.6-39.9 s), so the state at 40 s equals the state at 0 s.

**Audio (gesture-gated).** The phrase is five notes drawn at build time from a breathy scale (349-523 Hz, seeded order and detune), scheduled at 32.3-35.15 s in the loop. Each note is a sine with a 5.5 Hz pitch-waver LFO plus band-passed noise breath. Because the piece is watch-only, the sound follows the same rule as No.677: a WebAudio context is created lazily only inside a `pointerdown` handler (window and canvas), fully typeof-guarded and try/caught. The animation loop fires notes only when a context exists, is unlocked, and is in the running state. If the visitor never taps or clicks, the sounding stage is visual only: the breath lines still rise. Headless QA (no AudioContext, no rAF) renders silently and never throws.

**Determinism.** Frame one is the synchronous draw at exactly loop t = 0 at load (never a live-clock reading; an earlier draft drew from elapsed time and the thumb byte-compare caught a mismatch, now fixed). The animation runs on an anchored `performance.now()` clock; rAF is typeof-guarded. All randomness is mulberry32 seeded data fixed at build: profile offsets, wobble, hole jitter, embers, breath drift, phrase notes. Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; `canvas.style.width/height` are pinned in px inside draw(). Phone detection via `window.screen` min dimension < 700 px with the aspect fallback (h > w*1.15); on phones the bench sits at 0.72 H and the vessel height is 0.46 H. A `?seed=tNN` QA hook forces a loop time for state renders; it is inert in normal viewing.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF, no AudioContext, no document.createElement, no offscreen canvas, no ctx.filter).

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720) rendered from the final file and read back: dark bench ground, bench line in the lower third, wet lump just beginning to rise at center with its contact shadow; nothing clipped on mobile, composition refits the tall frame.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared: identical, re-verified three times on the final file. The duplicate render was deleted.
- Kiln check (throwaway `/tmp` render at t=21, read back, then deleted): full quena formed, finger holes and labium window present, orange core glowing inside the dry body, embers rising around it, whole frame warmed by the flat tint.
- Sounding check (throwaway `/tmp` render at t=34, read back, then deleted): burnished quena, breath lines curling up from the mouthpiece and staying inside the frame. (A first version let the lines run off the top edge and read as a straight wire; the rise is now capped to the mouth height and the sway widened.)
- Code checks: no `Date.now`, no `Math.random`, no `document.createElement`, no `ctx.filter`, no shadowBlur, no external URLs, no em dashes in code or copy; no visible text anywhere except the `<title>`.

## Deviations

- The kiln's "full-frame warm gradient pulse" from the prompt is built as one flat warm tint overlay at low alpha, pulsing. Reason: the house rule bans gradients; flat layered shapes are the established substitute (same approach as No.677's fuego glow).
- The phrase audio is gesture-gated (see Construction). Reason: browsers refuse audible AudioContext before a user gesture, and a watch-only piece cannot guarantee one; the prompt's sounding moment is preserved in full for any visitor who has touched the page, and the breath lines carry the moment visually otherwise.
- The bench is indicated by a surface band and a one-line edge in palette tones rather than a literal bench object. Reason: the prompt fixes the composition to the vessel on a bench line in the lower third; the spare reading keeps the clay the only actor.
