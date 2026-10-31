# No.572 — Mi Madre

EXPANSION #69 power-paola, prompt PP4 "El Cocodrilo en la Escalera".

## Concept

Domestic magic realism in Power Paola's oil-painting register, after her painting "Mi madre" (Bogotá 2024). An older woman with a blonde bob sits centered on a yellow leopard-print sofa, red mug in hand, floral dress, patchwork pillows either side. Behind her, upper right, a large green crocodile with an open mouth descends a striped staircase. Nobody reacts to the crocodile. There is no caption, no wink, no explanation: the magic sits in the room unremarked, the way it does in her painting. A decorative mirror on the wall holds her detail touch — a painted eye in the reflection, which blinks now and then.

Watch-only at its core (Hans's RETHINK INTERACTION rule: a painting you live with, not a system to poke). The one permitted gesture is a slight drag, which shifts the viewpoint with a gentle three-layer parallax. No tap action.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio, no microphone. Flat painterly fills only, no gradients.
- Strict palette, exactly as specced: sofa yellow #E8B93C, leopard spots #6B4A2A, crocodile green #4A7A52, mug red #C23B2E, dress florals pink #E89AA8 and turquoise #5AB8A8, wall cream #F0E6D2, staircase stripes #8A6A4A / #D9C29A. Skin, hair and teeth reuse palette colors (cream skin, sofa-yellow blonde bob, cream teeth) rather than adding new hexes.
- Scene is composed in a 1000x1000 stage, scaled to fit the viewport. Three parallax layers: wall + staircase + crocodile (back), mirror (mid), sofa + mother (front).
- Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw() every frame. Phone detection via window.screen physical size (min dimension < 700px) with aspect fallback (h > w*1.15); the interior keeps its framing on phones and the page ground is the wall cream.
- Seeded detail (mulberry32, fixed seeds): 90 leopard spots clipped to the sofa silhouette, 26 dress flowers, rug diamonds. All randomness is precomputed at load, never per frame.
- Motion, one 24-second loop:
  - The crocodile descends the six-step flight one step at a time (discrete step index from loop phase, small settle bob as each step lands), wraps seamlessly back to the top step.
  - The mother's mug hand lifts once per loop (seconds 13.5–17.5 of the cycle: rise, hold, lower, eased) and otherwise rests.
  - The mirror eye blinks on a slow 5.3s seeded cycle: a pink lid sweeps down and back over ~0.45s.
  - Her gaze never turns toward the stairs. The crocodile's eye is calm and half-lidded, looking ahead.
- Determinism: the first frame is drawn synchronously at a fixed phase (PHASE0 = 8.4s into the loop), which lands the crocodile mid-staircase on step 2, the mug at rest, the mirror eye open. Animation, when rAF exists, is anchored as PHASE0 + elapsed-since-load; frame one is never derived from a wall clock. rAF is typeof-guarded, so the QA renderer (no rAF, no AudioContext, no createElement, no offscreen canvas) simply holds the composed first frame.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp — identical. Second render deleted.
- Read-back, desktop: mother centered on the spotted yellow sofa, red mug in her right hand, patchwork pillows left and right, floral dress; crocodile on the striped stairs upper right, mouth open, tail curling up the flight; oval mirror upper left with the painted eye open; rug and floor below; nothing clipped.
- Read-back, mobile (390 wide): full interior framing retained, centered on the wall-cream ground, mirror, mother, sofa and crocodile all legible, nothing clipped.
- Fixes during QA: (1) crocodile head group initially floated ~20 units clear of the body — head moved in so the snout overlaps the body; (2) leopard spots were clipped to the intersection of sofa back and seat, leaving the back bare — clip rebuilt as one combined path over back + seat + base; (3) staircase first drawn as a floating side panel with disconnected step blocks — rebuilt as a stepped silhouette with striped treads and risers; (4) handrail originally ran down to the mother's head — shortened to end at the fourth step.

## Deviations

- Palette discipline: the prompt names no skin or hair color. Skin and teeth use the wall cream and the blonde bob uses the sofa yellow, keeping the piece inside the eight specced hexes instead of inventing tones.
- A tiny lowercase "drag" hint sits in the lower-right corner (the maximum the brief allows). No other text anywhere in the piece; the title lives only in the document title and the gallery entry.
- The staircase's lowest steps pass behind the sofa and are occluded by it, which is the natural sightline of the room; the crocodile's descent loop covers the six visible upper steps.
