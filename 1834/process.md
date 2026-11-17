# №1834 The Room Is the Instrument (KS3, PP1081)

Source: TASKS.md prompt block konrad-sprenger KS3 (PP1081), cron expansion
study #240 (prompt block at TASKS.md line 24063; study file
~/workspace/muse-soul/studies/konrad-sprenger.md does not exist locally, so
palette hexes were hand-picked from the prompt's named colors).
Gallery date: 2007 · 01 · 19 (formula date 2002-01-10 + 1835 days).
Suggested gallery note: "A concrete hall of organ parts you play by walking. Drag to walk the hall, pipes near you speak."

## Driver

Air pulses travel through a looping concrete hall of organ components, and
the visitor's dragged position decides which pipe clusters speak, so walking
the hall plays the room.

## What was built

A side-scrolling concrete hall, 3.0 world units long, looping endlessly with
no finish line. Seven components spaced like gallery sculptures: three
graduated copper pipe racks in wooden frames (7, 5, and 6 pipes), a muted
blue blower unit with a fan grille and a hose snaking along the floor, a
huge brass horn on a white plinth, and pale fiberglass double horns plus a
single fiberglass horn on thin stands. Soft warm-white air pulses travel up
each pipe on a closed-form cycle and a faint tone ring leaves the mouth as
each pulse exits; the brass horn and fiberglass horns breathe a warm glow
whose strength follows proximity. The visitor is a small black silhouette
who stays centered while the hall scrolls past; wall seams move at 0.4x
parallax, floor boards at full speed. The figure's legs swing from the
distance walked and settle to standing when idle.

Frame one is fixed at t = 6.0 s, pulses mid-travel, figure at world x 1.25
mid-hall beside the tall pipe rack, mid-stride (walk phase 1.1, walk speed
0.6). All motion is a closed-form function of that phase time or of drag
distance. Fixed-seed PRNG (seed 1834) for pipe height jitter. No wall
clock, no unseeded randomness.

## Sound

Visuals run on a closed-form sound model. Real WebAudio is created lazily
only after the visitor taps the "Sound: off" plate (bottom right), never on
autoplay. When sound is on, six emitters (three pipe racks, brass horn, two
fiberglass clusters) each hold a sine drone at a non-tempered frequency
(61.7, 98.0, 116.5, 130.8, 146.8, 164.8 Hz) whose gain follows the
figure's distance, plus a looped breath-noise source through a bandpass
filter whose frequency and gain follow the nearest emitter. Default is off
and the piece is fully legible silent. Reduced-motion visitors get a still
frame (the animation loop does not start).

## Palette

- Concrete wall #98948B, floor #7A756D, seams #7E7A72, page ground #8A8680
- Copper pipes #B87333, light #D08A4A, dark #8C5A2B; wood rack #6B4A2F / #54371F
- Brass horn #C9A227, light #E3C766, dark #9A7B1E; plinth #F2EFE9 / #D8D3C8
- Fiberglass horns #E9E7DB / #CFCBB8; blower #5B7A8C / #47616F, hose #4A5560
- Air pulses and breath glow #F5EFE0; figure silhouette #1E1C1A

## Drag probe (node-canvas, from the actual script)

Scene 1280x900, square scene 900 px wide, one scene width = 1.0 world unit.
- Frame one: figX = 1.2500, walkPhase = 1.1000, facing = 1, nearest emitter proximity = 0.4333.
- After drag +450 px (0.5 world units right): figX = 1.7500, walkPhase = 6.1000, facing = 1, nearest proximity = 0.5667.
- After drag -900 px (1.0 world units left): figX = 0.7500, walkPhase = -3.9000, facing = -1, nearest proximity = 0.3235.
- Loop test: from figX 0.7500, drag +2700 px (3.0 world units, one full hall) returns figX = 0.7500; drag -2700 px returns figX = 0.7500. The hall loops, never ends.

## Deviations from the prompt

- The blower and fiberglass horns are not in the frame-one shot: the hall
  is one screen wide out of three world units, so frame one shows the brass
  horn and the tall rack, and the blower and fiberglass horns scroll into
  view as the visitor walks (verified in the post-drag render). A static
  wide shot of all seven components would have shrunk them to thumbnails.
- The figure walks in place at screen center while the hall scrolls, rather
  than crossing the frame, so the first frame is always the composed shot
  and the hall can loop without a jump cut.
- The blower hose connects visually toward the floor and the nearest rack
  rather than plumbing into a pipe mouth; a literal hose-to-pipe joint read
  as clutter at this scale.
- No organ console or keyboard anywhere, per the gallery-object reading of
  the prompt; the pipes, horn, and blower are the instruments.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. One defect found
and fixed: the brass horn first bled past the square scene edge onto the
page ground, so the hall is now clipped to the scene rect and the frame-one
figure position moved from world x 1.5 to 1.25 so the horn sits fully in
frame. A post-drag render was also inspected: blower, hose, and brass horn
with breath glow all read correctly, figure facing the last drag direction.
Thumb rendered twice, md5s match (1efae48553f527afeffad1970dbfed8a,
deterministic first frame). No em dashes in visible copy. Flicker is by
construction below 14 Hz; pulses cycle at 0.22 Hz and the horn breath at
1.4 Hz, both low amplitude.
