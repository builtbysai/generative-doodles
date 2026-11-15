# №1783 PP1030 (SV8) Cast an Audible Shadow, 2006 · 11 · 29

EXPANSION #233 stephen-vitiello, closing the study (SV6–SV8 at №1781–1783).
Prompt PP1030 verbatim from TASKS.md. Built from the live №1780
(Self-Playing Pendulum) presentation template, fetched fresh at build.

## Build

Self-contained index.html, Canvas 2D, no external assets. Warm dim grey wall
fills the frame; two dark parabolic dishes sit left and right of centre
(field fractions x 0.30 / 0.70, y 0.55, radius 0.13 of the field size), each
with a radial-gradient bowl, a feed hub at the centre, and a rim-light arc on
the upper-left edge. A thin pale red neon bar runs near the top (field y 0.10,
x 0.28 to 0.72). A faint skirting line sits near the bottom of the field, and
240 seeded wall-grain speckles (mulberry32 seed 1783) give the wall a quiet
surface. Title and date plates top-left, hint plate bottom-left, drawn on
canvas in the №1780 style.

## Frame one (fixed phase)

t = 60 s, NO pointer present (pre-visitor state). Ambient light mid-drift,
dishes quiet with no ripples, neon bar on steady. Deterministic: seeded RNG
only for static grain, no Math.random() or Date.now() anywhere near frame one.
Verified by probe: lightLevel(60) = 0.5000, neonLevel(60) = 1.00,
coneOverlap = 0.00 for both dishes.

## Light-cycle function

Daylight drift: D(t) = 0.5 + 0.5*sin(TAU*(t - 60)/600), one slow drift per
600 s. At t = 60, D = 0.5 and rising, so the light is mid-drift and warming.
Faint 120-cycle shimmer: 0.02*sin(TAU*120*t), added to the drift and clamped
to 0..1. At 60 fps display the 120 Hz term samples near a constant, so it
reads as a faint lift, never a strobe. Wall colour lerps between dim
rgb(87,82,76) and lit rgb(141,132,120) by the light level; at t = 60 the wall
is the exact midpoint. The page ground is set to the same wall colour so the
composition holds at any viewport size.

## Dish vision cones

Each dish's field of vision is the disc of radius 0.30 of the field size
around the dish centre, drawn as a very faint glow disc (alpha 0.03) with two
boundary lines fanning upward at plus/minus 0.70 rad (about 40 deg) from
vertical, length 0.34 of the field height. Overlap is a closed form of
pointer position: the shadow blob (radius 0.085 of the field size, offset
0.06 right and 0.10 down from the pointer, light from the upper left) scores
overlap = clamp((coneR + shadowR - dist) / (2*shadowR), 0, 1), zero with no
pointer. While overlap exceeds 0.12, a ripple is born at an interval that
shortens with overlap (0.9 s at a graze, 0.22 s deep in the cone).

## Neon schedule

Closed form of piece time, 24 s cycle: on 0–16 s with a brief double-blink at
the start (on 0–0.4, dip to 0.15 at 0.4–0.7, on 0.7–16), off 16–24 s at a dim
0.08. At t = 60 s: 60 mod 24 = 12, steady on at level 1, with a pale glow
wash behind the bar. The neon co-opts the ripple rhythm: while it is on,
ripple births come 15 percent sooner and each ring radius takes a small term
synced to the neon phase, 0.012 of the field size times sin(TAU*((t mod 24)/24)).

## Interaction

Pointer-move (and pointer-down, which only registers position) is the whole
interaction: moving the pointer casts a soft radial-gradient shadow blob on
the wall; where the shadow falls inside a dish's vision cone, quick deep
indigo ripples flutter from that dish (two staggered rings per birth,
expanding 0.05 to 0.30 of the field size over 1.6 s, fading as they grow).
Stillness leaves only the ambient light cycle. Tap toggles nothing. No
click-to-reload anywhere. Optional filtered thumps (sine, 70–130 Hz by
overlap, gain 0.02, 0.5 s) are created lazily inside the ripple-birth path,
which only runs after a visitor gesture; the piece works fully muted.

## Deviations

- The shadow is a closed-form soft blob as a function of pointer position
  (spec adaptation flag), not a simulated cast shadow with geometry; the
  light-direction offset is fixed and authored.
- Flutter ripples are closed-form functions of birth time and strength, with
  births driven by the live overlap history, not a physics simulation; this
  keeps frame one (no pointer, no births) byte-comparable.
- Wall grain is seeded static speckle rather than a texture; the dishes are
  drawn as radial-gradient bowls rather than true parabolic projection.
  No visual or behavioural deviation from the prompt's acceptance criteria.

## Title check

Checked against live pieces.json via the git blob API (blob
85bbecb984c3775bda3b131de4ea8b6f7183d80a, 1,257,930 bytes, 1,981 entries):
no entry titled "Cast an Audible Shadow". No verbatim-title collision.
Neighbouring insert style for the parent run: 1-space indent keys, dates with
`\u00b7` escapes, descending order, insert immediately before the №1780 block
(for example `{"n": 1783, "title": "Cast an Audible Shadow", "date": "2006 ·
11 · 29", "note": "Move to cast a shadow across two solar dishes; where it
falls, dark ripples flutter. Move to play."}`).

## QA

- node ~/workspace/tools/render-piece.js at 1280x900 desktop: warm mid-grey
  wall, pale red neon bar on near the top, two dark dishes left and right of
  centre with rim light and feed hubs, faint cone glows and boundary lines,
  title/date and hint plates legible, no shadow, no ripples.
- 390x844 mobile: full-bleed wall, dishes centred, plates legible, neon bar
  intact, no clipping.
- 720x720 thumb: same composition as desktop, square field; thumb.png IS this
  render.
- Interaction harness (node-canvas, simulated pointer + driven rAF loop):
  pointer on the left dish centre gives coneOverlap 1.00 left, 0.18 right
  (shadow edge grazing the right cone); after 6 s of loop, deep-indigo
  ripples flutter from the left dish with a faint ring on the right, and the
  soft shadow visibly darkens the left dish. 3,830 indigo-ish pixels counted
  in the interaction render.
- One fix round: cone glow alpha lowered 0.05 to 0.03 after the first gate
  because the vision discs read too strongly; re-gated all three sizes after
  the edit and confirmed the final renders above.
- Reduced motion: the loop does not start when prefers-reduced-motion is set;
  frame one stays fixed.
- No em dashes in visible copy. No AI-signature copy.

## Files

- index.html (md5 41bec2c33082044294a0054c8476c670)
- thumb.png (md5 b903eb0bc56b5ff8e42155061d0ff085, the 720x720 render)
- process.md (this file)
