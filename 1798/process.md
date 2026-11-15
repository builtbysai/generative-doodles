# No.1798 "The Audition Portraits" (LE7, PP1045)

Study: lawrence-english, EXPANSION #235. Prompt block: TASKS.md
lawrence-english LE7 PP1045, as transcribed in
BATCH-1796-1799-SPEC.md. Date: 2006 · 12 · 14 (formula date
2002-01-10 + 1799 days). Gallery note: "Listeners enter, tilt their
heads, leave. Watch only."

## Driver

The piece is a quiet rotation of listening silhouettes. The mechanism
is the staggered arrival scheduler plus the head tilt as the only
event, not a character scene. Three figure types (wide-brimmed hat,
parabolic mic held like a lantern, hands at piano keys) enter one at a
time from a doorway at the left, take one of three marked listening
spots on a shallow warm-black stage, pause with a quiet head tilt,
then leave. They never face the viewer; they face the sound, which is
off-frame right. Watch-only: nothing the viewer does summons or
dismisses a figure.

## Frame one

Fixed phase at t = 60 s into a 240 s cycle, reproducible every load.
At frame one the hat figure is settled at spot 2 (center, 0.58 of
stage width) mid head-tilt to the right at full amplitude (0.32 rad),
and the mic figure is mid-entrance, 6 s into its 16 s walk from the
doorway to spot 1. The piano figure is absent until t = 140 s. No
wall clock is read for frame one; all positions, poses, and tilts
are closed-form functions of piece time.

## Arrival schedule (seconds within the 240 s cycle)

| Figure | Type | Spot | Enters | Walks | Listens | Tilts | Exits |
|--------|------|------|--------|-------|---------|-------|-------|
| A | wide-brimmed hat | 2 (center) | 8 | 14 s | 22-108 | right 50-72, left 84-102 | 108-128 |
| B | parabolic mic | 1 (left) | 54 | 16 s | 70-168 | left 96-116, right 132-150 | 168-188 |
| C | hands at piano keys | 3 (right) | 140 | 14 s | 154-216 | right 168-186, left 192-208 | 216-232 |

Never more than two figures present: A and B overlap 54-128, B and C
overlap 140-188. Each tilt is a smooth bump (rise, hold, fall) with
the amplitudes in the table above.

## Pose library

Enter: walking with swinging legs and a small bob, moving from the
doorway to the spot on a smoothstep. Settle: standing at the spot.
Tilt-left / tilt-right: the head group (head plus hat, where worn)
rotates around the neck by the scheduled amplitude. Rise / exit:
walking back to the doorway on the same smoothstep. Figures are
articulated silhouette rigs: head, torso (long coat on the hat
figure), tapered-stroke limbs, and per-type props (hat brim and dome,
parabolic dish held forward like a lantern, hands extended to the
piano keys).

## Technique

Rim light is a thin pale-amber edge stroke, not a gradient mask: each
figure is drawn twice, once shifted right by about 1.7 px in pale
amber and once at origin in near-black, so a thin amber sliver shows
on the right edge only, the edge facing the sound. A faint warm glow
sits to the right of each figure. The room is a shallow stage: back
wall in warm black with a faint vertical gradient, floor line, three
marked listening spots (small amber dashes on the floor), and one
doorway at the left with a dim warm glow inside. The piano is fixed
furniture at spot 3, very dim, with a faintly lit key line; the piano
figure walks to it and places its hands on the keys. No faces, no
names, no captions, no speech. Figures never interact with each other
or the viewer.

## Deviations from the prompt and the batch spec

1. Frame one: BATCH-1796-1799-SPEC.md says "the doorway empty" at
   frame one. The build brief for this piece requires a second figure
   mid-entrance from the doorway at t = 60 s. The brief was followed:
   the mic figure is mid-entrance at frame one.
2. Rim light: the prompt calls for a gradient masked to silhouette
   edges. Per the spec's adaptation flag, rim light is a thin
   pale-amber offset edge stroke instead, which keeps frame one
   byte-comparable.
3. Piano: the prompt does not say whether the piano enters with its
   figure. The piano is fixed furniture at spot 3 so the figure walks
   to it; it is present (empty) before the piano figure arrives.
4. Hat tilt amplitude: the first tilt is 0.32 rad (about 18 degrees)
   rather than the 0.28 rad in the first draft, so the tilt reads
   clearly at frame one.

## House rules compliance

Single HTML file, inline JS/CSS, canvas 2D only, no
document.createElement. Visual Viewport sizing with resize listeners
on visualViewport and window. Canvas pinned in draw() via
canvas.style.width/height in px. Phone detection via window.screen
(min dimension under 700 px) with aspect fallback. Field-like
composition: full-bleed on phones, square on desktop. One synchronous
frame at load; every requestAnimationFrame call guarded by a typeof
check. prefers-reduced-motion renders a still frame. Title, date
("2006 · 12 · 14", literal middot), and hint ("Watch only.") are
drawn on canvas. No em dashes in visible copy. No
Math.random or Date.now anywhere; all motion is closed-form in piece
time.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js
and visually inspected all three renders.

- Desktop 1280x900 (1798-desktop.png): dark warm-black room reads;
  doorway at left with a dim warm glow; mic figure mid-entrance just
  right of the doorway holding the dish like a lantern; hat figure
  settled at the center spot with a clearly tilted head and hat,
  neck connected, one amber rim-lit edge; piano furniture at the
  right with a lit key line; three floor spot marks visible; title,
  date, and "Watch only." plates legible; exactly two faceless
  figures, both facing right.
- Mobile 390x844 (1798-mobile.png): full-bleed, nothing clipped
  (the piano sits fully inside the frame after a fix round);
  figures, doorway, and plates all legible.
- Thumb 720x720 (thumb.png): same composition, legible at small size.

Fix rounds: (1) added a neck stroke, the first render had a visible
gap between head and shoulders; (2) raised the first hat tilt from
0.28 to 0.32 rad for a clearer tilt; (3) narrowed the piano and
moved it left so it is not clipped on phones. All three renders were
re-run after the fixes and re-inspected. Thumb re-rendered last from
the final index.html. Determinism check: re-rendering the thumb from
the final index.html produces the identical md5.

- index.html md5: a523505bb530c48dee942fe0b50cf463
- thumb.png md5: 6d19b879f07fcaedbede94860a170150
