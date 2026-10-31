# No.716 — Licked, Lathered

EXPANSION #87 janine-antoni, prompt block 5 ("Licked, Lathered"), built from the verbatim TASKS.md text.

## Concept

Antoni's *Lick and Lather* (1993): fourteen busts of herself, seven cast in chocolate and seven in soap, eroding by the two acts named in the title — the chocolate licked away locally, feature by feature, the soap washed down uniformly in the bath. The piece stages that as two facing rows of seven abstract head-blobs on thin pedestals, chocolate on the left, soap on the right, in a dark room. Nobody is depicted: no faces, no features, no mouth. Only the two kinds of disappearance, running side by side at fourteen different speeds, so no two heads are ever in the same state.

## Construction

- **Silhouette.** Each head is a filled profile path, not stacked ellipses: a nine-point bust profile (base flare, shoulders, neck pinch, head swell, crown) cosine-interpolated over 30 slices per side. Per-head seeded variation (mulberry32) perturbs every profile control width, the overall width, and the height, so the fourteen busts are siblings, not copies. A slight lean toward the center gap makes the rows face each other.
- **Erosion loop (~120 s).** Each head runs the same cycle on its own effective clock: erode (86 s, smoothstep envelope), hold as nubs (12 s), re-form (22 s, reverse smoothstep). A per-head rate (0.80–1.30) scales how far through the envelope it gets, which is what keeps every head in a different state at any moment.
- **Chocolate model (local).** A tongue-point wanders the silhouette as a closed-form function of the head's effective time: its height oscillates over the middle band of the profile and its side flips on a slower sine. The outline is dented by a Gaussian falloff (sigma 0.09 of height) centered on the tongue-point — full depth on the tongue side, 30% on the far side — and the dent depth is proportional to the erosion amount. A mild global shrink (0.35 width / 0.30 height at full erosion) accompanies the local smoothing.
- **Soap model (uniform).** The whole silhouette scales toward its base (down to 0.22 at full erosion), a wash wearing the head down evenly. A faint sheen pass — the silhouette refilled in the sheen tone at an alpha driven by a per-head phase, peaking sharply (sixth-power sine) — reads as water passing over the soap every few seconds.
- **Interaction.** Dragging across a head records contact intervals against that head; contact time is added to the head's effective clock at 2x, so a touched head visibly races ahead of its row. A quick tap sends a wash pass down the nearer row: every head in the row gains a fixed burst of erosion time, and a sheen sweep fades over the row for 1.4 s. Everything visual is a pure function of the recorded event logs plus the anchored clock; nothing reloads.
- **Determinism.** Frame one is the synchronous draw at cycle t = 0 with all heads whole. The rAF loop (typeof-guarded) is anchored as elapsed-since-load. An inert `?seed=tNN` query hook pins the first frame to a fixed phase for QA only; it is inert in normal viewing.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside every draw; phone detection from `window.screen` (min dimension < 700), aspect ratio used only as a fallback when screen dimensions are unavailable. Strict five-color palette from the prompt; no text but the title; no audio; no external assets.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three show fourteen whole busts in two facing rows of seven, brown left, pale right, each on a cap-post-plinth pedestal; mobile keeps all seven per row, nothing clipped.
- Determinism: thumb.png rendered twice and byte-compared with `cmp` — identical. The duplicate was deleted.
- Phase checks via the seed hook (scratch renders in /tmp, deleted after inspection): at t=60 the chocolate heads are locally dented and partially shrunk, each at a visibly different stage, while the soap heads have shrunk uniformly much further — the two erosion models read distinctly. At t=95 (hold) all heads are nubs, the soap nearly vanished. First attempt at the t=60 check exposed a bug: the hook read `window.location`, which the QA renderer does not populate; fixed to the bare `location` global and re-verified (all three phase hashes differ).
- Fix round: the first silhouette indexed the per-head wobble in coarse bands, which scalloped the outline into stacked blobs, and the heads were wider than tall, reading as urns. The wobble is now interpolated with the same cosine easing as the profile, and the head width/height ratio was tightened (0.80 / 0.70 of slot). All renders redone and determinism re-verified after the fix.
- Grep audit: no `Date.now`, no `Math.random`, no `document.createElement`, no AudioContext, no external URLs, no em dashes in the piece file.

## Deviations

- The prompt describes each head as "3-5 overlapping ellipses"; the build uses a single interpolated profile path instead. From the second row back the read is identical (a soft bust blob), and the profile path is what makes the chocolate model's local outline dent possible — per-ellipse scaling could not smooth one spot on the silhouette. Recorded here per house practice.
- The prompt's heads sit in "two rows of seven" facing across a center gap; with chocolate specified as the left row and soap as the right, the rows are built as two vertical columns of seven. The facing relationship and the center gap are preserved.
- Tap targets the nearer row rather than requiring a tap on a specific head, matching the prompt's "a wash pass sweeps one row (the tapped row, or the nearer row)".
