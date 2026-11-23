# №848 The Palm Tray: process notes

IA2 / PP1248, study #261 iso-attrill. An open palm held over grass
presents foraged things like a specimen tray: staghorn fungus, twig
skeleton, citrus-peel ring, seed, tiny insect. Shells decorate the
fingernails. Tap deals a new arrangement from fixed authored tables;
objects drift gently between arrangements like a slow mobile.

## Gate

- FIRST_T = 6 s. Arrangement 0 settled at load, drift visible (per-object
  closed-form bob; the insect wanders a small closed loop around its
  anchor, body angle following the path tangent).
- Arrangements: 6 fixed authored tables, index 0 at load, tap advances
  with wrap. Transition is a 2.5 s closed-form smoothstep ease with a
  small arc lift; a tap mid-transition captures the current interpolated
  positions as the new start, so no jump.
- Tap probe (node probe, /tmp/probe848.js, from the actual script):
  tap at t=6 gives arrangement 1; full-frame md5 differs from
  arrangement 0 while the grass corner region and the wrist patch are
  pixel-identical (palm and grass unchanged). Mid-transition frame
  (t=7.25) differs from both endpoints. Drift check: frames at t=9.0
  and t=9.6 differ. Tap walk sequence [2,3,4,5,0,1], wrap confirmed.
  PROBE PASS.
- Renders inspected: 1280x900 desktop, 390x844 mobile, 720x720 thumb.
  Palm centered, grass a soft surround on all three; shell nails legible
  on every fingertip and the thumb; all five found things legible on
  the palm in arrangements 0 and 1.
- Thumb rendered twice, byte-identical:
  md5 bf149e1a6fd823999707178db2ed1c12.
- index.html md5: 0859377b6e67ed1ca67ee969e1727f17.

## Palette

- Grass: deep #3F6B2A, mid #5C8A3C, light #7FAE5A, pale #A8C97E;
  blades #4A7A30 / #6B9A45 / #3F6B2A.
- Skin: base #E7B98C, light #F4D2A8, shadow #C68F5E, deep #A96F42.
- Citrus: #F2C230, peel #E8A91C, pith #F6EEDC.
- Shell cream #F6EEDC, shell lines #D9C9A8; nail #F2D8C4.
- Fungus #EAD9B8 / #C9A876; twig #6B4A2F; seed #4A3220, highlight
  #8A6A4A; insect #2E2118, wing #DCE6F2 at 0.55 alpha.

## Deviations and notes

- No deviations from BATCH-847-851-SPEC.md. No text in the piece
  (batch standing rule: no in-piece UI or hint text); the interaction
  cue lives in the gallery note. No audio: none in this batch, visuals
  run on a closed-form model, no WebAudio, no autoplay.
- Fix rounds: 1. The first build set the object unit s0 = 0.055 P,
  which made the citrus ring and insect fill the frame; corrected to
  s0 = 0.0038 P (objects span about 0.1 P) and re-gated everything:
  all three renders, thumb byte-compare, and the full tap probe.
- Minor known warts: the insect's translucent wing sits mostly behind
  the body and is barely visible; the staghorn fungus reads slightly
  sparse at thumb size, its branch-tip dots doing most of the work.
  The palm is a flat cartoon hand in the series style, not anatomical.

Parent fix round (gate): the in-canvas caption plate (number, title, formula date) and interaction hint were missing; added at the end of draw() in the template place, then re-rendered and re-gated desktop, mobile, and thumb (thumb byte-identical twice). Em dash in the process.md heading replaced with a colon.
