# No.585 — Sin Viñetas

EXPANSION #71 julia-barata, prompt block 1 "La Abolición de la Viñeta".

## Concept

Her panel-abolition doctrine as one day of domestic chaos with no panel borders, no gutters, and no boxes anywhere: a tired mother holding a wailing baby, a ringing phone, spilled coffee, an open suitcase, a steaming kettle, a laundry line, and scattered toys all flow into each other across one sheet of paper, separated only by spatial drift. A faint architect's grid ghosts underneath everything (lines only, never framing a scene), and a pink wash pools thickest around the mother and baby, where the anguish peaks. The single flat red is spent exactly three times: the phone, the coffee spill, and the hand-lettered title.

## Construction

- Single self-contained `index.html`, canvas 2D, 1000x1000 stage scaled with the Visual Viewport API (resize listeners on `visualViewport` and `window`); the canvas is pinned in px inside `draw()` every frame.
- All ink work is jittered polylines generated once at load from a mulberry32 seeded RNG (seed 585071), so the wobble is fixed and the drawing is identical on every load. Loose punk line throughout, flat fills only, no gradients.
- The wash is ten precomputed jittered ellipse blobs in #E8B4B0. Five large ones cluster on the mother/baby, two thin ones sit under the suitcase and spill, one small one behind the phone, two faint ones elsewhere. Alpha breathes on a 9-second cycle (the anguish thickens and thins).
- The ghost grid and the paper speckle are drawn across the whole visible stage rect, not just the 1000x1000 square, so on tall phone screens they bleed to every edge and the flow is genuinely full-bleed.
- Watch-only loop, all anchored to a fixed phase offset (PHASE0 = 1.3) plus elapsed time, never a wall clock: the wash breathes; the phone buzzes once per 12-second loop (seeded per-step jitter plus two ring arcs that grow and fade); a red coffee drip falls from the tipped cup's low edge into the spill on a 2.6-second cycle and splashes; the laundry sways a few hundredths of a radian, each item on its own phase; the kettle steam curls rise on sine paths.
- Drag smears the wash: blobs near the fingertip swell and brighten, keep swelling while the drag is held, then relax with an exponential decay in the tick.
- Thought bubbles (tap a figure; tap anywhere else dismisses). Only two figures carry them:
  - Mother: "M..." (stutter style, at a hand-lettered cloud right of her head)
  - Baby: "¡ay!" (cloud above-left of the baby's head)
  Bubbles are scalloped hand-drawn cloud outlines with dot tails, popped in over 0.18 s. Hit tests: an ellipse over the mother's body, a circle over the baby (baby tested first, since the bundle overlaps her front).
- Palette is strict: ink #1A1A1A, paper #FAF7F0, red #D42B1E (phone body, spill + drip, title + its underline — nothing else), wash pink #E8B4B0.
- Phone detection via `window.screen` (min dimension < 700px) with the aspect fallback, per house rules. No audio, no microphone, no external assets.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with `cmp` — identical (re-verified after every fix round). Frame one is a single synchronous draw at PHASE0 with the phone still and the wash mid-breath; grep confirms zero `Date.now`, zero `document.createElement`, zero `AudioContext`, zero URLs, and the rAF loop is `typeof`-guarded.
- Read-backs: desktop shows the full borderless flow with the wash pooled on the mother, the red spent only on phone/spill/title, nothing clipped; mobile shows the whole scene at full width with grid and wash bleeding to all four edges; the thumb reads cleanly at gallery size.
- Fix round 1: two shapes called the jitter helper inside `draw()` (suitcase lid, baby body), which would have flickered in a browser as the RNG advanced per frame; both moved to build-time point sets. The kettle stand's three segments were split so no stray connecting diagonal is drawn.
- Fix round 2 (from desktop read-back and a zoomed crop): the hair bun floated off the head — moved to overlap the head's edge. The baby bundle sat hidden behind the dress edge and read as a ring on her hip — enlarged, shifted across her front, head raised proud of the body, feet added at the bundle's far end, and her cradle forearm redrawn to pass over the bundle so the hold reads. The tipped coffee cup floated in mid-air — it now rests tipped on a small stool (rhyming with the phone's table), and the drip falls from its low edge through the stool's frame into the spill.
- Fix round 3: the baby's front-facing head with concentric wail arcs read as a speaker glyph. The arcs were replaced with three short stress ticks, and the face rebuilt: squeezed-shut eye arc, brow, open wailing mouth, and tears attached to the cheeks. It now reads as a crying face at both desktop and thumb size.
- Deviations: none from the prompt block. Construction choices worth noting: the phone and the coffee cup each sit on a small drawn table/stool so the objects read at their heights (the prompt names the objects, not furniture); the baby's tears and stress ticks are ink, since the red budget is spent; the two thought bubbles are the only in-piece text besides the red title and the small "drag · tap" hint in the corner.
