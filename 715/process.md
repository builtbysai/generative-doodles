# No.715 — One Thousand Blinks

EXPANSION #87 janine-antoni, prompt block 4 "One Thousand Blinks" (verified verbatim from TASKS.md). After Antoni's *Butterfly Kisses* (1992-99): 1,124 blinks in mascara on paper, the lash as drawing tool. Here: a warm off-white field, an invisible lash-origin wandering a slow Lissajous, and a thousand blinks, each depositing a small fan of tapered dark strokes. No eye, no lash, no face: marks only.

## Concept

The piece is an accumulation drawing with a fixed lifespan. Over a 75-second loop the field builds blink by blink to roughly a thousand fans (about 11,000 tapered strokes), holds complete for ten seconds, then clears gently — a fade, never a wipe — and restarts on the next cycle's seed with a new wander path. A tap reseeds immediately. Nothing else moves; the drawing is the event.

## Construction

- **Palette (strict):** canvas #F2EDE4, marks #1C1A17, soft marks #4A443B, vignette #E5DFD2. About 28% of blinks land in the soft tone.
- **Vignette:** six flat border bands stroked inward in the vignette tone at alpha 0.38. No gradients anywhere.
- **Schedule-as-accumulation (renderer adaptation):** the QA renderer and the house rules provide no offscreen canvas, so the "accumulation layer" is a precomputed schedule. Each cycle seed (mulberry32) generates the full blink list up front: deposit time spread across the 58 s build phase, origin = the cycle's Lissajous (two incommensurate periods, ~31-61 s, seeded phases) evaluated at the deposit time, fan base angle, 8-14 strokes per fan with per-stroke angle/length jitter. A frame draws every blink whose time has passed — a pure function of cycle time, so browser and renderer agree byte for byte.
- **Scatter around the wander point:** each blink also carries a seeded offset (±0.095 of the smaller dimension) around its Lissajous origin. Reason: with deposits landing ~17 per second at a slowly moving origin, fans stacked exactly on the curve merged into a heavy rope (first forced render, t=40). The offset is the wand pressing and drifting at each blink; fans now read individually and distribute into a field. Stroke length was also cut (base 0.02 of the smaller dimension) and dark-tone alpha capped at 0.9 for the same reason: delicacy.
- **Tapered strokes:** each stroke is a thin filled triangle (base at the origin, point at the tip). Strokes are batched by tone and by 16 quantised alpha buckets (per-blink 0.35 s fade-in, plus the global clear envelope), so a full field costs at most 32 fills, not 11,000.
- **Cycle envelope:** build 0-58 s, hold to 68 s, clear 68-75 s via a smoothstep global fade that reaches true zero through the alpha buckets. Tap = epoch++ with a re-anchored start; never a reload.
- **House rules:** canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700) with aspect fallback only; field full-bleed at every size, page ground = the canvas tone; frame one is the synchronous draw at t=0 (empty field, first blink scheduled at ~0.4 s); rAF typeof-guarded; no audio, no text except the title.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Frame one at all three sizes: plain warm field with the vignette banding, nothing clipped, no marks yet.
- Determinism: thumb.png rendered twice and `cmp` byte-compared identical (second render deleted, re-verified after the final tuning pass).
- Forced-state check: `?seed=t40` scratch render at 720x720 read back, then deleted. First version failed the read: fans merged into a dark caterpillar band along the Lissajous. Fixed with the seeded scatter, shorter/thinner strokes, and the 0.9 dark-alpha cap (see Construction). Re-check at t=40: hundreds of individual fans, delicate, spread across the wandered region. A t=65 scratch (hold phase, full thousand) also read back during tuning and deleted: a dense, uneven field of fans across most of the sheet.
- Deviations: (1) the specced offscreen accumulation layer is realised as the seeded schedule above — forced by the renderer limit, visually equivalent; (2) the per-blink scatter offset around the Lissajous origin is an addition to the letter of the prompt, made so the deposited fans read as a field of marks rather than a single stacked line; the origin itself still follows the specced Lissajous and every fan still radiates from its (scattered) blink point.
