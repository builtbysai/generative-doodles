# No.1775 The Anniversary Monument (RC8, PP1022)

Completes EXPANSION #232 richard-chartier. Gallery date: 2006 · 11 · 21.
Gallery note: "A black-and-white split with huge cropped type; once in a long irregular cycle a thin white line draws itself across and vanishes. Watch only."

## Build

Canvas 2D only, static canvas drawing, no DOM text, no animation loop state.
Template: live No.1772 index.html, fetched fresh at build.

- Vertical split: left half black, right half white. A 2 px white hairline is centred on the boundary, so it reads as a rule down the middle on the black side.
- Cropped oversize type: the dash glyph plus two fixed authored letters, drawn in bold sans at 0.42 of the field side, starting at 0.04 of the field width and centred vertically at 0.60 of the field height. The string is clipped to the field, so the second letter is cropped by the right edge on desktop and thumb.
- The two fixed letters are R and C, the artist's initials. The prompt names no letters, so these were picked, fixed in the source, and never randomised.
- The type is drawn twice with half-field clips: white over the black half, black over the white half, so the glyph reads continuously across the split.
- The drawn line: a single horizontal stroke at 0.36 of the field height, drawn left to right over 60 seconds, then gone. Its progress is a closed-form function of piece time on a fixed authored schedule.
- Line schedule: 12 hour cycle (43,200 s) with births at 4,200 s, 15,000 s, 26,100 s and 37,800 s. Gaps are 10,800 s, 11,100 s, 11,700 s and 9,600 s across the cycle boundary, so the timing is irregular across hours with no visible period.
- Frame one: fixed phase t = 60 s. The split, hairline and cropped type are in place; the line is absent (the first birth is at 4,200 s).

## Deviations and interpretations

- The prompt calls the moving stroke a thin white line. A white stroke is invisible on the white half, so the stroke inverts at the split: white where it crosses black, black where it crosses white. It is one continuous stroke, drawn as two clipped segments, and the palette stays black and white only. On the black half, where the line originates, it is white as specced.
- The dash glyph is the artwork itself and stays in the canvas drawing. It appears nowhere in the plates, the heading above, or any other copy.
- Plates use solid black fills with white ink and a thin white border, so the title stays legible where the plate crosses the split on phones. No grey is used anywhere: the palette is black and white only.
- Reduced motion: the animation loop does not start, so the piece rests at the fixed frame one.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like full-bleed layout on phones, square centred field on desktop with the page ground set to the piece's own black; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with no Date.now or Math.random anywhere in the script; watch-only, never click-to-reload; no AI-signature copy.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: black left half, white right half, hairline down the middle, the dash bar in white on black and the huge black R and C on white, C cropped at the right edge. Title plate "The Anniversary Monument / 2006 · 11 · 21" top left, "Watch only." bottom left. Line absent.
- Mobile 390x844: full-bleed split, title plate fully legible with its black fill, dash and RC cropped at the right edge, hint plate bottom left. Line absent.
- Thumb 720x720: same composition as desktop, C cropped at the right edge. This render is thumb.png.

Line motion verified separately with a probe script calling the exposed drawAt hook: progress 0.5 at t = 4,230 s (30 s into the first birth) shows the thin white line drawn halfway across the black half, stopping at the split; progress -1 (absent) at t = 60 s; progress 0.5 again at t = 15,030 s (second birth).

Fix round: first render used type at 0.62 of the field side, which cropped the C entirely off canvas, and the plates had no fill, so the title vanished where it crossed the split on phones. Type reduced to 0.42 of the field side and plates given solid black fills; all three sizes re-rendered and re-inspected after the fix.
