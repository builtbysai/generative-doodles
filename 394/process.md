# No.394 Triple Prompt

## Concept

After Anna Galitskaya's Wonderful Winter Week rules (galitskaya-illustration, EXPANSION #42 prompt GAL2): every deal draws one garment, one animal, one thing, and the piece IS the intersection — the animal wearing the garment, holding the thing. Flat round kidlit shapes on warm paper. The prompt's random generator becomes a fixed authored triple table (the batch adaptation flag): eight deals, each animal, garment and thing from her lexicons used exactly once, so the piece cycles deterministically and frame one is always the opener, the jaguar in its knitted scarf holding the festive headband, echoing her observed deal (knitted accessory + jaguar + festive headband).

Palette, closed: ground #F6EFD9; figure ink #33302B; garment teal #2E8B8B; thing rust #C0562F; accent mustard #E8A93D. Animal bodies are built only from these (mustard jaguar/kitten/tabby/snow monkey, ink hedgehog, cream lama and white cat held by ink outline, and the elephant as the figure ink at one flat 0.62 alpha over the ground). No text anywhere.

## Construction

One canvas, design space 1280x900, centred fit, page ground in the ground tone. Sizing from the Visual Viewport API with resize listeners on visualViewport and window; the canvas is pinned by style width/height every frame; phone detection via window.screen min dimension < 700px with the aspect fallback, and phones get a slightly larger character scale (1.3 vs 1.12).

Each species is three passes in local coords (origin at body centre, ground at +205): a base body (body, head shape, ears, tail, arms, feet, baked ornament), the garment drawn over it from per-species anchors (head centre/radius, neck line, waist line and half-width, paw point), then the face, then the thing at the paw, and finally a paw cap over the thing's grip (with a fine ink edge when the paw is ground-coloured). Jaguar rosettes and tabby stripes are baked at load from a fixed-seed LCG and asserted. The elephant's whole silhouette (ears, body, head, feet, raised foreleg, trunk) is a single path filled in one pass at one flat alpha, so overlaps never double-darken; its trunk hangs to the waistline, where the tutu takes over.

The triple table (asserted at load: lexicons of exactly 8 each, every triple inside the lexicons, each entry used exactly once):

| # | Animal | Garment | Thing |
|---|--------|---------|-------|
| 1 | jaguar | knitted accessory (scarf) | festive headband |
| 2 | elephant | tutu | watering can |
| 3 | kitten | mushroom cap | Christmas mug |
| 4 | lama | poncho | telescope |
| 5 | hedgehog | checkered coat | presents |
| 6 | tabby cat | overalls | umbrella |
| 7 | snow monkey | wool skirt | tulip |
| 8 | white cat | frog hat | Christmas card |

Motion and interaction: an ambient 12s loop on whole cycles under every deal — the character breathes 0.98-1.02 and blinks at two fixed slots in the loop (2.2s and 8.6s). DOUBLE-TAP deals the next triple (wrapping after the eighth) through a 0.6s dressing wipe: a teal band sweeps left to right on fixed ticks, the new deal revealed behind it, the old deal still standing ahead of it. DRAG tilts and sways the character toward the pointer (clamped at 0.17 rad); on release it springs back and snaps to exactly upright. Never click-to-reload.

Determinism: frame one is drawn synchronously at the constant phase T = 5.3s into the 12s loop (breath mid-swing, eyes open, no blink slot near, no wipe running, table entry 1 up). The animation clock advances from that anchor in fixed 1/60 ticks accumulated from rAF timestamps; frame one never reads a wall clock. Every rAF call is typeof-guarded. No offscreen canvas, no gradients, no filters, no shadowBlur; all marks are JS data drawn directly each frame.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice from the shipped script: byte-identical.
- Because frame one only shows deal 1, all other seven deals were also rendered and inspected via temporary probe copies with the opening index changed (probes not shipped): elephant, kitten, lama, hedgehog, tabby, snow monkey and white cat all read clearly in costume with their props at the paw.
- Fixes during QA: (1) the elephant first rendered as tonal patches (overlapping flat-alpha layers double-darkening) — rebuilt as one union path filled in a single pass; its trunk moved into the same fill after a separate over-garment pass read as a dark spike. (2) The checkered coat's squares spilled outside the coat silhouette through a rectangular clip — the checker layer is now clipped to the coat's own traced path; the poncho's mustard stripe got the same treatment, and the poncho was narrowed and shortened so the lama's legs and hooves show below it. (3) The lama's ink ear-tip dots read as a second pair of eyes — removed. (4) The kitten's forehead stripes sat on top of the mushroom cap (face pass over garment) — moved into the base at brim height so they peek out under the cap. (5) The white cat was nearly invisible on the cream ground — outlines raised to 0.7 alpha and its limbs given ink under-strokes. (6) Feet floated below the bodies on most species — nudged up into the body silhouette. (7) The tulip read small at the paw — scaled 1.3 about the paw point.
- Grep audit of the shipped script: no Math.random, no Date.now, no createElement, no gradient or shadowBlur calls, no absolute URLs, no em dashes (the words "gradients"/"shadowBlur" appear only in the header comment noting their absence).
