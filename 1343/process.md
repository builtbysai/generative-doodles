# №1343 "A Century of Women" (hank-willis-thomas HT8, PP518)

Title rule: the Title suggestion line wins over the block heading
"A Century of White Women, Re-stripped" — the piece title is
"A Century of Women".

## What it is

A horizontal timeline, 1915 to 2015: exactly 100 small framed images on
one continuous bronze rail, chronological left to right, no breaks, no
decade labels, no year numbers. Each frame is a procedurally drawn period
vignette — an abstract silhouette (featureless head, torso, hemline,
legs) in its decade's wash, with an era prop (hat, fan, bag, shades,
cup, phone) — and every frame carries the same pale hollow rectangle in
the headline zone, where the slogan was stripped. The century reads as a
single gradient of changing silhouettes; the identical voids accumulate
into their own rhythm, a century of things unsaid.

Decade washes: 1910s sepia #8A6F4D, 20s gold #C9973B, 30s gray #6B6B6B,
40s olive #5A5A3A, 50s pastel pink #E8B4B8, 60s mod orange #D97B2E,
70s brown #6B4A2E, 80s neon teal #2EA8A0, 90s grunge purple #5A4A6B,
00s silver #B8B8C0, 10s millennial rose #E8A0A8; void rectangles #E4DED0;
timeline rail bronze #A67B4F.

## Interaction

- Drag horizontally scrubs the century (1915 to 2015 and back). A thin
  strip at the top edge takes the wash color of the frame currently at
  center, and small bronze ticks mark every tenth frame on the rail —
  the year-tick is changing palette light, never numbers.
- Tap a frame (movement under 12 px): it enlarges to fill the screen
  over 0.4 s, holds silent, and returns to the rail after 5 s total.
  Never more than one enlarged frame; a drag never enlarges.
- No audio of any kind. No visible text except `<title>` — no year
  labels, no decade labels, no faces, no identifiable people.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag and
shows the rail at its start (the 1915 end). The rAF loop is a plain
function declaration behind a typeof guard; the clock starts only with
the loop. Scrub offset, tap-enlarge state, and all 100 vignettes are
closed-form functions of piece time and recorded drag/tap events.
Vignettes come from mulberry32 streams seeded per frame
(1343000 + index x 7919), never Math.random.

## House-rule compliance

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen physical size (min dimension < 700 px)
with aspect fallback; field-like composition full-bleed on phones,
checked at 390 wide. No gradients, no shadowBlur, no filters, no
offscreen canvas, no AudioContext, no createElement, no getUserMedia.
Dots drawn as paired arcs with a moveTo before every batched arc
(node-canvas ellipse/arc quirk).

## Fix rounds

1. First render's 1910s frames read as clones — same long hemline,
   same stance, hat always on the same side. Added seeded pose
   variation (standing / hand on hip / stride), variable head size,
   torso width, hair bun, and prop side, so frames within a decade now
   differ while the decade coding stays legible.
2. Interaction probe (custom node harness driving the piece's own rAF
   loop and pointer listeners, temp files only, discarded): drag
   changed the rendered pixels (scrub works); tap enlarged exactly one
   frame over a dimmed rail, verified visually.

## Verification

Rendered at 1280x900 desktop, 390x844 mobile, and 720x720 thumb;
all three inspected. Thumb rendered three times plus a final
re-verification after process.md was written — all byte-identical.
Token scan clean: no Math.random, createElement, AudioContext,
getUserMedia, shadowBlur, gradients, or offscreen canvas.
