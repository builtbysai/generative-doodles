# No.820 "Fifteen-Second Cathedral"

EXPANSION #100 rhys-chatham, PP5. After Chatham's *A Crimson Grail* (2005), written for the Sacre-Coeur basilica in Paris and its roughly fifteen seconds of reverberation: the architecture is the instrument, and the decay is the harmony.

## Concept

A field of plain stone-grey arches scattered irregularly on a deep blue-black ground. Nothing is depicted: no church interior, no crosses, no pews, only the arch as the minimal unit of a resonant space. Touching an arch strikes it; a drag sweeps a phrase across several. Each strike blooms a gold glow at that arch which decays exponentially over a full fifteen seconds, so overlapping strikes layer into a luminous wash that is literally the sum of everything played in the last fifteen seconds. The piece is watchable without input: a slow ambient strike every seven seconds keeps the field breathing. The fifteen seconds is never shortened for snappiness; it is the piece.

## Construction

- Single self-contained `index.html`, canvas 2D only. Strict palette: arches `#9A948A`, glow `#F2C14E`, background `#06070C`. No text anywhere except `<title>`.
- Canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; canvas CSS width/height pinned in px inside `draw()` every frame. Phone detection via `window.screen` (min dimension < 700px) with the aspect fallback `h > w*1.15`; the field is unit-space and fills the frame at any size, so the page ground is the background tone throughout.
- Arch field: 24 arches placed by rejection sampling from a seeded stream (mulberry32, seed 820051). Each arch has a half-width `s` of 0.036 to 0.074 of min(W,H) and one of three curated profiles: tall (legs 2.3 x s), round (legs 1.25 x s), squat (legs 0.6 x s). Placement is constrained so the whole arch, legs and semicircle, always lands inside the frame (the generator reserves the arch's full height above its base line and its half-width on each side, plus margins), and a minimum centre distance keeps the field from clumping. The field is rebuilt deterministically from the same seed on resize.
- Glow math: every strike on an arch contributes `exp(-(t - ts) / TAU)` with `TAU = 5` s, summed per arch and clamped at 1.25. At age 15 s a strike still contributes `exp(-3) = 0.0498`, about 5 percent of peak; rendered through the innermost glow pass (alpha factor 0.22 x 2.2 = 0.484 x strength) that is roughly 2.4 percent gold over the near-black ground, faint but perceptible, and the outer passes keep a whisper of it visible slightly longer in aggregate. Nothing is cut off early: strikes simply stop being summed after 15 s, where their contribution has already fallen to that 5 percent floor.
- Glow rendering: no gradients, no additive blend mode, no shadowBlur, no filter, no offscreen canvas. Each glowing arch is drawn as four nested flat-alpha silhouettes of its own shape (scales 1.55 / 1.30 / 1.12 / 1.00), then the arch outline is stroked in gold at an alpha proportional to the same glow value.
- Strike sources, all recorded as `{arch, t}` events evaluated in closed form:
  - Frame-one seeded strikes at t = -1.8 s, -6.0 s, -11.5 s on three spread arches (field fractions 0.2 / 0.55 / 0.85), so the first frame already shows the wash mid-decay at strengths 0.70, 0.30, and 0.10.
  - Tap/pointer-down strikes the nearest arch. Dragging sweeps: any arch whose centre passes within 1.7 x its half-width of the pointer is struck, at most once per drag pass, with a 1.2 s per-arch refractory so a slow drag cannot machine-gun one arch.
  - Ambient schedule: one strike every 7.0 s, target picked from a precomputed seeded stream of field fractions (mulberry32, seed 82077), so the ambient pattern is a pure function of t and identical for every viewer.
- Cap policy: at most 40 glows may be inside their 15 s life at once (user strikes plus the ambient schedule). When a new strike would exceed the cap, it reuses the weakest slot: the user strike with the lowest current strength `exp(-age/5)` is dropped. Ambient strikes are schedule and are never dropped; in practice the ambient rate (one per 7 s, so at most 3 alive) leaves the cap almost entirely to the player.
- Determinism: frame one is the synchronous `draw(0)` at load with only the three seeded negative-time strikes. The animation loop, when `requestAnimationFrame` exists (typeof-guarded), draws at elapsed time from the first frame's stamp; no drawn value ever comes from `Date.now()` or from frame-integrated state. All randomness is the two seeded streams above, consumed in fixed order.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js index.html`:
  - `qa-desktop.png` at 1280x900: grey arch field on blue-black, three gold glows at clearly staggered strengths (bright top-left area, mid lower-centre, faint centre), all arches whole and inside the frame.
  - `qa-mobile.png` at 390x844: same field fills the tall frame, three glows at staggered strengths, nothing clipped.
  - `thumb.png` at 720x720: whole arches, one strong glow top-right, one mid glow bottom-left, one faint glow upper-left.
- Determinism gate: thumb rendered twice and byte-compared with `cmp`: identical. The duplicate render was deleted.
- One fix round during construction: the first layout placed arch bases without reserving the arch's full height, so tall arches near the top ran off-frame and one seeded glow sat on a clipped arch. The generator now reserves full height and half-width before accepting a position; re-rendered at all three sizes and re-verified byte-identical thumbs after the fix.
- Deviations: none from the brief. The ambient auto-strike follows the brief's own specification (seeded, every ~7 s, identical glow math); the cap-overflow policy (reuse the weakest user strike) is the brief's stated policy, recorded above.
