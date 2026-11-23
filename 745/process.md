# №9056 · Marine Snow - process notes

## Concept
Hans's direction (2026-10-04, after dropping №9055 Tide Worm): "maybe the
background by itself could be a piece if you polish it." The abyssal
backdrop of 9055 — deep gradient, drifting marine snow — rebuilt as a
standalone piece with no creature. Stillness is the subject: a quiet water
column, light shafts slanting down from a far surface, snow drifting through
them. New number (9055 retired, never reissuable); new concept family, NOT
the retired chain-follow creature family.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32(seed);
  default seed 9056. ?seed= shareable via replaceState; click mints a fresh
  variation.
- Base: vertical near-black blue-green gradient, slightly lighter above.
- Two to three barely-there radial color washes (violet or teal whisper,
  alpha ~0.03-0.06, additive), slow drift and breathing.
- 4-6 volumetric light shafts from the top: slanted translucent quads,
  alpha ~0.045-0.095, slow sway and breathing. These carry the "water, not
  space" read.
- One whisper of distant glow low in frame (alpha ~0.035-0.065, teal or
  violet-grey): a depth anchor, deliberately not a subject.
- Marine snow in 4 depth layers (~137 specks): far = small/dim/slow, near =
  larger/brighter with slight blur; downward drift plus sine sway, twinkle.
  Pointer gently stirs nearby flakes (soft radial push, stronger on far
  layers inverted — near flakes resist more).
- 12 bioluminescent motes: dim drifting sparks with slow pulse, additive.
  Drifting particles only — no head, no body, no creature (per the paused
  chain-follow-creature family).
- Vignette; one-line hint caption, no other chrome.

## Iteration
- v1: shafts too faint (alpha 0.02-0.048), snow read as a starfield, washes
  invisible in stills. Looked at the actual render: too close to "black
  screen with dust."
- v2 (shipped): shafts ~2x stronger and wider, added the deep-glow anchor.
  Render comparison: v2 reads unmistakably as deep water with light coming
  down. Shafts give the still frame its structure.

## Differentiation
Checked against the ledger's used/retired/paused families. Nearest live
neighbors: none are pure abyssal fields. №8972 Eye Garden uses chain-follow
(a different, paused-adjacent mechanism, built pre-pause) — 9056 shares no
mechanism with it. Concept family: "abyssal drift field: layered marine
snow, volumetric shafts, deep gradient, no creature."

## QA log
- Rendered headless via ~/workspace/tools (Chrome, xvfb). Looked at the
  actual pixels at desktop; v1 killed for reading as empty black, v2 kept.
- cdp_exceptions.py: zero console/page errors (desktop + mobile).
- Viewports: no scroll or overflow at 1280x800 and 390x844; caption wraps
  cleanly on mobile.
- thumb.png: 720x720 center-crop from the live render.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
