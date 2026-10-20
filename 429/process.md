# No.429 Vintage Hobby Room - yaelhofri (YAE5)

## Concept

After Yael Hofri's puzzle-grammar showcase (her "Vintage Hobby" interior): a woman with wavy hair and a blue clip lying diagonal across a magenta fringe rug, reading an open book; a cream cat mid-frame playing with an orange yarn ball whose trail snakes across the rug; a mint-green portable record player spinning a black vinyl in the top-left; houseplants in the corners; a blue ceramic mug steaming near the book; two patterned pillows. The scene is built to her puzzle density: exactly ten discoverable micro-details, asserted in code. No text anywhere.

## Construction

One canvas, flat colour only, all marks drawn directly each frame from JS data. Design space 1280x900, full-bleed cover fit; sizing from the Visual Viewport API with resize listeners on visualViewport and window; the canvas is pinned every frame via style width/height in px; phone detection via window.screen physical size (min dimension under 700px) with the aspect fallback.

Clock: a 30s ambient loop on an anchored clock. Frame one is drawn synchronously at the constant phase T = 7.3s (layout 1 complete, yarn mid-unwind, steam mid-rise, cat just past a bat); the animation clock is anchored at that constant plus elapsed time since load, advancing in fixed 1/60 ticks, and every rAF call is typeof-guarded. Frame one never comes from a wall clock, so the thumbnail reproduces byte-identically.

The ten micro-details (asserted as a table of exactly 10): 1) the vinyl label spinning, its marker and print arcs riding the rotation; 2) the yarn ball, wound arcs over an orange disc; 3) the cat's batting paw; 4) the mug steam, two curls rising on whole cycles (3 and 2 per loop) in the mug's own blue at flat alpha; 5) the book's two pages with print lines and one page lifting on a whole cycle; 6) the blue hair clip; 7) the rug fringe, 13 strokes along each short edge; 8) the pillow patterns, stripes on the yellow pillow, dots on the deep-pink one; 9) the plant leaf overlaps, seven leaves fanned per pot; 10) the record player's carry handle, a strap arc over the case. The vinyl's sheen is a stepped flat-alpha arc, per the set's glow rule; there are no gradients anywhere.

Motion: the cat bats the yarn ball at fixed 6s slots (5 per loop, smoothstep raise and fall, tail swaying with it). The yarn trail is a fixed offset polyline from the ball, drawn up to an arc length set by a triangle wave over the loop, unwinding for 15s then rewinding for 15s (the prompt's one-way unwind made loopable); the ball shrinks slightly as the trail lengthens. The woman breathes on 2 whole cycles per loop.

Interaction, per the spec: DRAG anywhere spins the vinyl faster. The spin is integrated state in fixed ticks: rate = base spin (33 1/3 rpm, 3.4907 rad/s) plus a drag-fed extra that follows pointer speed while dragging and decays exponentially on release, snapping to exactly zero below a hair, so the vinyl always settles back to exactly the base rate. DOUBLE-TAP advances a table of exactly 3 authored layouts (never a runtime reseed); the room grammar (rug, woman, book, player, pillows) is kept and the cat, yarn ball, mug and plants are re-laid:

- Layout 1: cat (452,470), ball (560,528), trail runs right; mug (1002,556); plants top-right large, bottom-left small.
- Layout 2: cat (1006,462), ball (1114,520), trail mirrored left; mug (296,540) on the left; plants top-right small, bottom-right large.
- Layout 3: cat (628,392), ball (528,442), trail runs right; mug (1096,428); plants bottom-left large, bottom-right small.

Palette is the prompt's closed set. Resolutions, documented: the prompt's wavy brown hair has no brown in the set palette, so the hair takes the palette's near-black (the vinyl ink); the blue hair clip takes the mug blue; the woman's skin takes the warm cat cream; her top takes the player's mint and her trousers the mug blue. Steam is drawn in mug blue at flat alpha so it reads against both the cream wall and the magenta rug.

## QA log

Rendered with the house node-canvas renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The thumb was rendered twice from the shipped script and compared byte-identical (md5 a42a3ea5...). The two other layouts were verified through the renderer's seed hook (?seed=layout=1 and layout=2), including a probe confirming layout=3 wraps to layout 1 exactly.

First pass fixes: the yarn trail originally ran down-right from the ball and disappeared behind the woman's torso; it now snakes up-right through the open rug band and passes behind her shoulder. Her arms first read as bare sticks; the upper arms now wear mint sleeves with skin forearms cradling the book. A neck segment bridges torso and head. The cat's tail was tightened to hug the body. In layout 2 the first placement put the yarn ball behind the book where it vanished; the cat and ball moved to the upper-right rug, where the ball sits at the cat's batting paw and the trail runs behind her hair.
