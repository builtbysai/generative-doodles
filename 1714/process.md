# №1714 "Roots" (PP961, EXPANSION #225 goodbad-png) - process notes

## Build
- Spec: `~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/BATCH-1712-1716-SPEC.md`, №1714 section, built exactly as specced.
- Template: live №1711 `index.html` fetched via `fetch-blob.py` (sha f851d5dcf94df927374d9a4d65796f1a365448c8).
- Gallery date: 2006 · 09 · 21. Gallery note: "Coral roots fall and curl over pale celadon. Tap to replant the fan."
- Technique: Canvas 2D (p5.js-to-2D substitution per house rules). 58 tapered curves, each drawn as 42 thin segments with stroke width falling from its seeded base to a hair at the tip. Per-curve curl comes from a seeded low-frequency phase; sway is a closed-form function of piece time (period 9s, amplitude growing toward the tip), so the fan breathes without stored state.

## Frame one (deterministic)
- Fixed phase t = 3.0s, period 14s. All curve parameters come from `mulberry32(1714)`; no `Date.now()` or `Math.random()` affects frame one. The single `Math.random` mention in the file is a code comment, not a call.
- Frame-one source: table index 0, sx 0.42, sy -0.10 (off-frame above the stage, off-center). The fan trails down from above with taper and curl legible.
- Determinism check: two independent 1280x900 renders produced identical md5 `350761ec0b821ee441d8127bfb3d0e6c`.

## Source table (tap to replant)
A tap (`pointerdown` only, so one tap plants once) deals the next entry and regrows the fan from `mulberry32(1714 + index * 97)`, so every replant is deterministic:
1. sx 0.42, sy -0.10 (frame one)
2. sx 0.64, sy -0.14
3. sx 0.46, sy -0.07
4. sx 0.80, sy -0.12
5. sx 0.16, sy -0.09
6. sx 0.55, sy -0.16

## Deviations recorded
- **Palette hexes hand-picked, no study file exists.** The prompt cites the f07 pairing ("coral red on pale celadon") but `studies/goodbad-png.md` does not exist in the repo, so the f07 codes have nothing to resolve from. Hexes were hand-picked from the prompt's named colors, as №1704-1711 did for aaron-penne: celadon ground `#DCE9D6`, coral `#E84A3B`, deep coral `#C73A2E` (about a fifth of the roots, for depth). No study file was invented.
- **Frame-one source moved from sx 0.28 to sx 0.42.** The spec's authored table is otherwise unchanged; the first entry was shifted right after the first QA pass showed the fan emerging from behind the title plate on the 390x844 phone render. The fan is still off-center and asymmetric, and the plate no longer covers the root convergence point. All six table entries above are the final authored values.
- **Tap uses `pointerdown` only, not `click`.** A tap fires both events, which would have advanced the table twice per tap; `pointerdown` alone plants exactly once.

## House rules check
- Visual Viewport sizing, resize listened to on visualViewport and window; canvas pinned in `draw()` via `canvas.style.width/height` in px.
- Phone detection via `window.screen` (min dimension < 700px) with aspect fallback (h > w*1.15). Field-like composition: full-bleed on phones, square stage on desktop.
- One synchronous frame at load; `requestAnimationFrame` calls guarded with `typeof` checks; reduced-motion respected.
- No em dashes in visible copy; no click-to-reload; title/date/hint plates drawn on canvas.
- No AI-signature copy.

## QA
- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three PNGs read and inspected.
- Desktop: coral fan enters from the top edge clear of the title plate, curls and tapers down over pale celadon, right half of the frame empty (maximum air). Title plate "Roots / 2006 · 09 · 21" top left, hint plate "Tap to replant the fan." bottom left.
- Mobile: full-bleed fan, source clear of the title plate after the sx fix, roots trail down with air at the bottom; hint plate legible.
- Thumb (720x720): same composition as desktop, fan and plates legible at gallery size. `thumb.png` IS the 720x720 render.
- Fix round: one post-gate edit (source sx 0.28 to 0.42) followed by a full re-gate of all three sizes; md5s below are from the final files.
