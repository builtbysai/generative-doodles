# №1958 Sche-ima Pressing

Prompt block: TC7 / PP1205, study #255 tom-challenger.

Driver, in one sentence: the press is a generative printer, each tap pulls one new sleeve variant from a seeded drawing set, the print animates through ink-roll, pull, and hang, and the stack of finished prints grows, so the making is the piece.

## Palette

Named colors from the prompt, hand-picked hexes: grid-paper white #f8f6ef with grid lines #ddd6c2 and a faint red margin line #d9261c; ink black #1c1a17; red pen #d9261c; magenta #d63384 for the dog cover; tape orange #e8702a, tape blue #2b6fd8, tape red #d9261c; bench wood pale #c9b48f with dark #a98f66; press steel #5c5648 with light #8a8270 and dark platen #3a352c; sleeve paper #fdfcf6.

## Mechanism

- The shop: grid paper fills the stage with a light square grid and a faint red margin line down the left. A pale wood bench crosses the middle. The hand press stands on the bench, left of center: base plate, two posts, a top beam, a screw column, a dark platen, an ink roller, and a long lever arm with a red knob angled up to the left. Field-like composition: full-bleed on phones, square on desktop.
- The listings sheet: a small paper on the bench right of the press with four scribbled gig lines, the third circled in red pen with a small red arrow.
- Sleeve variants: 6 line-network designs times 4 accent palettes = 24 distinct sleeve variants. Designs: 0 radial fan, 1 grid scribble with accent dots, 2 concentric arcs, 3 zigzag bands, 4 dot-field constellation, 5 bold bars. Accents: magenta #d63384, red #d9261c, blue #2b6fd8, orange #e8702a. Each sleeve carries a tape strip across the top (orange, red, or blue by variant id), a wobbly hand-drawn ink border, and a bold title word that follows the design: SCRATCHES, DOG, SCHEMA, PRESS, GIG, INK.
- The pull: tapping the press starts a 1.4 s print. Phase 1, ink roll: the roller sweeps across the platen while the sleeve sits under it with a corner peeking out. Phase 2, pull: the sleeve slides out to the right and down onto the bench. Phase 3, hang: the sleeve rises to the drying line and settles onto peg 2, while the lever dips and returns. The drying line sways gently at about 0.1 Hz the whole time.
- The stack and the counter: at frame one the press has already printed before, two sleeves sit in the finished stack on the left and one sleeve hangs drying on the line, and the counter reads Prints pulled: 2. Each completed pull adds its sleeve to the line (newest at peg 2, older pulls join the stack, capped at 5 visible) and increments the counter. A tap is a printing pull, never a reseed: the bench, the press, the line, and the opening sleeves never change, and the press state persists and the stack grows. A tap while a pull is running is ignored, the press is busy mid-pull.
- Tap position matters: the press face is split into zones, so different tap positions print different variants; the pull count also advances the sequence, so the same spot twice still prints a fresh variant.
- Audio: visual only, no WebAudio. No click-to-reload; a tap on the press never reloads.

## Determinism

- FIRST_T = 4. At t = 4 the opening sleeve (variant 4, zigzag bands, magenta, word GIG) hangs on the line, the stack holds variants 11 and 18, the roller rests on the platen, and the counter reads 2, so the piece reads at once as a shop mid-run.
- Seeded PRNG mulberry32(1958), fresh instances per draw from the piece number and fixed salts; every frame is a pure function of t plus the pull list, which only changes through a pull, so frame one is fully reproducible. The pull sequence is seeded too: pull 1 at press center is always variant 8, pull 2 at (0.2, 0.3) is always variant 12.
- Motion is slow: line sway about 0.1 Hz, lever dip once per pull, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?pull=<n> to apply n settled pulls at load (press center tap), ?tap=x,y to apply one settled pull at that tap position, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1958 exposes pull(), stackCount(), completedPulls(), lastVariant(), pullCount(), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 4, counter 2, one sleeve hanging, two in the stack, thumb md5 6fc351c26440b65c4f9076cdaafa4510. Second 720x720 render byte-identical to thumb.png.
- Pull probe 1 (tap 0.56, 0.45, drawn settled at t = 5.6): variant 8, counter 2 to 3, new SCHEMA sleeve hanging at peg 2, md5 63b6b65f0172199fac81afeba73d5c02.
- Pull probe 2 (tap 0.2, 0.3, drawn settled at t = 7.2): variant 12, counter 3 to 4, md5 21fae4e07afec0d16e362094692ee21b. Different tap positions print different variants.
- Mid-pull probe (pull 3 at 0.8, 0.5, drawn at t = 7.9, halfway through the animation): counter still 4, lever dipped horizontal, GIG sleeve sliding on the bench, md5 dab435d9fa305ce502e5cf16611cf9e1.
- ?pull=1 at load: counter 3, md5 bc87054da28ee7835dfce2bc588b569f. ?tap=0.2,0.3 at load: md5 7141a7f80edcc0d994e73f1278a306fa, different from ?pull=1.
- index.html md5 c9e7e223c9ab8caa1ba42abf10bf9d2e.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its white pill on all sizes, hanging sleeve clear of the press and the lever, listings sheet visible right of the press with its red circle, stack leaning on the left of the bench.
- Pull probe renders inspected: the new sleeve hangs on the line with a fresh design and accent, the counter increments, the stack grows, and the bench, press, line, and opening sleeve are unchanged, so a pull is a printing event, not a reseed.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First renders showed the press overlapping the hanging GIG sleeve (its title hidden behind the top beam), the lever crossing the sleeve, and the listings sheet mostly hidden behind the press. Moved the press left (center 0.56W to 0.46W), moved the drying line up and its pegs right (peg 1 to 0.74W, peg 2 to 0.92W, dropping the third peg), flipped the lever to angle up to the left, moved the listings sheet to the right of the press (0.68W), shrank the hanging sleeves (0.17u to 0.15u), and made only the newest completed pull hang on the line, older pulls joining the stack. Re-rendered all three sizes and re-gated byte-identical.
2. First mobile render had bench legs running to the very bottom of a tall phone, a long empty wood field. Shortened the legs on phones to end 0.16H below the bench top.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The 24-variant set (6 designs times 4 accents), the opening state of 2 stacked plus 1 hanging, the 1.4 s three-phase pull, the peg and stack rules, the tap-zone variant rule, and the press, bench, line, and listings placement are invented staging for the named mechanism, so frame one already reads as a shop mid-run.
- The prompt says finished sleeves stack to one side and each new print hangs to dry. The line holds only the opening sleeve and the newest completed pull; older pulls join the stack, so the line never overflows and the stack visibly grows, which is the counter made physical.
- The prompt names the Scratches dog cover being inked. No literal dog is drawn; the magenta cover is represented by the magenta-accent sleeve designs and the bold title words, with the dog left as the cover being printed rather than a pictorial dog.

## Known warts

- The drying line starts at 0.60W with no visible anchor on its left end, so it reads as a string floating in from mid-air on the desktop and thumb renders.
- On a tall phone the composition sits in the upper two thirds and the lower third is plain grid paper below the shortened bench legs; the hint pill anchors the bottom, but the field is empty.
- In the stack, a lower sleeve's title word can be half covered by the sleeve above it (for example INK peeking under SCRATCHES); it reads as a stack, but the covered word is not legible.
- The listings sheet's scribble lines are faint at thumb size, so the sheet reads mostly as a white card with a red circle until you look closely.
- Mid-pull, the sliding sleeve briefly overlaps the press base plate on the bench; it reads as a print coming out of the press, but the overlap is a flat layering, not a real slot.
