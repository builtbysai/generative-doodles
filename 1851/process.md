# №1851 Sound Forest

Driver: a dark gallery holds hollowed-log drums and one tall totem with an oval sound hole like an eye; a dancer in white drifts among them, and dragging her through the forest wakes the drums with low woody thumps and ember light, while a full circle around the totem releases a deep chord that sets every drum humming in sympathy.

## Spec
- Title: Sound Forest
- Date: 2007 · 02 · 05 (formula date 2002-01-10 + 1852 days)
- Study: #242 theresa-wong, TW4, PP1098
- Interaction cue: "Drag the dancer through the forest."
- Palette: near-black gallery #0B0A09, raw wood #6B4A2F / #8A6238 / #4A3220, dancer white #F2EFE8, sound-hole pulses in ember orange #E86A1F / #FF8A3D.
- Counts asserted: 7 drums, 1 totem. Drum positions are seeded (mulberry32, seed 1851) from a fixed 7-spot layout with small jitter; the totem is fixed at (0.68, 0.46). The dancer starts at (0.30, 0.62).

## Interaction
- DRAG EARNED. Pointer drag moves the dancer; she trails the pointer smoothly. A drum answers only when she passes within 0.16 of min(VW,VH) of it while moving, with a 1.4 s retrigger cooldown per drum, so stillness never thumps.
- The totem fires only on a full circle: signed angular accumulation around the totem while the dancer stays inside a 0.30 ring and outside the trunk. A tap cannot accumulate angle, so a tap can never fire it. On a full circle the totem releases a 5-partial deep chord (55, 82.5, 110, 165, 220 Hz, 5 s decay) and all 7 drums pulse ember for the sympathetic hum.
- Audio is WebAudio, created lazily inside the first pointer gesture, never autoplay. A drum thump is lowpassed noise plus a sine partial at the drum's own frequency (52-78 Hz). There is no background drone and no sound at all while the dancer is still.
- A faint ember arc shows circling progress only while the dancer is inside the totem ring. No drag arrows or extra instructions inside the scene; the only hint is the standard plate line "Drag the dancer."

## Deviations from the prompt
- The dancer has a gentle idle sway in place (breathing, small bob) so she reads as "always moving" in the scene, but she never travels on her own: without a drag she stays where she is and no drum can fire, keeping the installation silent without a body in it. This is an interpretation, not a prompt change.
- The prompt's "shared convolution reverb tail" for the sympathetic hum is realized as a 5 s decaying chord plus a shared ember wash over the whole room, rather than a literal convolution node, to keep the piece self-contained and light.
- The dancer is drawn as a small white line figure with a fading particle wisp rather than a literal body, in keeping with the series' rule-based mark-making.

## House rules
- Single self-contained index.html, inline CSS/JS, no external assets. Title/date/hint plate drawn on canvas, legible on desktop and phone.
- Visual Viewport sizing, resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension < 700px) with aspect fallback h > w*1.15. Field-like composition, full-bleed on phones and desktop; page ground is the piece's own near-black.
- One synchronous frame at load; requestAnimationFrame guarded with a typeof check. Frame one is deterministic: fixed phase t = 60.0 s, seeded RNG, dancer at her fixed start, all drum pulses at 0, no wall clock or unseeded random in the draw path.
- No em dashes in visible copy. No click-to-reload anywhere. No AI-signature language.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three renders visually inspected; thumb.png is a deterministic re-render of frame one.
