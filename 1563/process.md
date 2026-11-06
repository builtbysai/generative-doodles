# №1563 — Forecast: Feeling

shunsuke-takawo TW4, PP810. Gallery date: 2006 · 04 · 23.

## Felt driver

Humor as weather. Dozens of emoji faces drift and tumble across near-black like a slow front moving through, too many to count and none of them looking at you. One big face holds the center while the rest stream past, the way a single cloud can sit still while the sky moves around it. Restraint comes from the ground, not the marks: the field is almost black, the faces are the only color.

## Mechanism

Canvas 2D. A particle array of 72 faces in three depth layers: back 12-28px at ~6px/s, mid 28-64px at ~14px/s, front 64-110px at ~26px/s. All faces in a layer share one seeded wind direction, so the field drifts as a coherent weather system; each face adds its own slow sinusoidal bob and angular velocity, so they tumble as they travel. Positions wrap around an extended field with a 140px margin, so faces slide in and out at the edges instead of popping. One 160px anchor face (120px on phones) sits at the center with a slow ±0.12 rad sway and an 8px bob. Every face swaps expression every ~12 seconds: the expression index is a hash of seed, face, and floor(t/12), a pure function of piece time, so one face redraws as a different face on the timer. Classic face set only: grin, open smile, blushing smile, wink, tongue, sunglasses, tears of joy. No pointer following; the weather ignores you.

## Palette

Ground near-black #0D0B14. Faces classic emoji yellow #FFCC4D with near-black #1A1A1A features, pink blush #FF9EBB, tongue #FF6B81, tears #5AC8FA. Nothing else.

## Interaction

Watch-only drift; tap reseeds the weather. A tap advances the seed by 104729, rebuilds the particle set with a new wind direction and new face mix, and redraws from t=0 of the new seed. No click-to-reload; no pointer following.

## Emoji rendering decision

First build drew the faces with fillText emoji glyphs. The desktop render came back completely blank: node-canvas has no color emoji font, so every glyph rendered as nothing. The piece fell back to hand-drawn vector emoji-style faces (yellow circle, dot eyes, mouth variants per expression), which render identically in QA and in the browser. The vector faces are the shipped form; no fillText remains in the file.

## Determinism

Fixed-phase first frame: all randomness from mulberry32 with fixed base seed 1563*7919; all state a closed-form function of piece time (positions, rotation, bob, expression slot); no wall clock, no per-frame Math.random. One synchronous draw(0) at load; requestAnimationFrame guarded with a typeof check; the loop measures time from the first rAF timestamp. Tap reseed picks a new seed and redraws from t=0 of that seed. Two independent desktop renders byte-identical (md5 8aa5fe8f29e7c089143641a2db227346). House rules: Visual Viewport sizing, resize on visualViewport and window, canvas pinned in draw() via style width/height in px, phone detection via window.screen (min dimension < 700px) with aspect fallback, full-bleed drift field on phones and desktop per the prompt's composition. Page shows the title, the formula date, and the hint line "Tap for new weather."; no other text. No audio.

## Render results

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 (thumb.png). Desktop: near-black ground, faces legible at all depths, large anchor grin centered. Mobile: field full-bleed, no clipping beyond faces naturally entering and exiting at the edges, anchor centered. Thumb: anchor clear, face mix readable at small size.

## Fix rounds

One. The first vector build drew the anchor after the mid layer, so large front-layer faces could cover it on mobile. The anchor is now drawn last, on top of the drift, so it always reads as the center of the weather. Re-rendered all three sizes and re-inspected; desktop unchanged, mobile anchor fully clear, thumb unchanged in composition.

## Gallery note

Emoji faces drift and tumble across near-black like weather, one large face anchoring the center. Tap for new weather.
