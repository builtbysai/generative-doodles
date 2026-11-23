# No.884 "001 to 108" - process

Study #108 bnsh_av, PP45 "The Sketch Lab": his March to May 2026 discipline of
108 numbered daily sketches, "001 superposition" to "108", each a small
experiment with a technical title. The piece is the sketchbook itself.

## Concept

One sketch at a time, full frame, in the same monochrome hand. The screen is
a page of the lab book: a running system in white on lab black #0A0A0A, the
sketch number and title in amber #FFB000 at the top (the only color in the
piece, because the counting matters), and a thin progress rail along the
bottom edge with a marker at the current sketch. Every 20 seconds the book
advances to the next number. Dragging scrubs through the numbers like pages;
a tap holds the current sketch for study; a double-tap leaps to a random
number. Some sketches are strong and some are duds. The duds stay in.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

The twelve systems (sketch n runs system ((n-1) mod 12), with seeded
variation from the sketch number itself):

1. waveform - a scope trace of two summed sines plus a faint echo trace.
2. burst - 90 particles streaming outward from a center in staggered cycles.
3. matrix - a tile grid lit by a diagonal wave (title cycled from his
   vocabulary: the tile grid answers to "matrix").
4. pixel - a sparse pixel field (DUD, see below).
5. osc - a Lissajous figure in a simple ratio (2:3 up to 5:6) with a fading
   trail and a bright head.
6. flock - boids-mini: 26 triangular birds around a wandering centroid.
7. noise - a blocky value-noise field stepping at 3 frames per second.
8. pulse - four concentric rings expanding from a center, forever.
9. dots - a dot matrix with one slow diagonal sweep (DUD, see below).
10. storm - 110 short line segments jittering and re-angling.
11. feedback - nested squares, each smaller and more twisted than the last.
12. stack - 13 horizontal sine rows drifting at row speeds.

Two named specials are kept: sketch 001 is "superposition", his first, a
field of 80 dots each rendered as a smear of four ghost positions orbiting a
home point plus a dim core; sketch 108 is "bloom", the sine-stack system
under its own name.

Seed discipline: every parameter of sketch n is drawn from mulberry32 seeded
by n (and re-derived identically on every frame), so sketch 015 always looks
like sketch 015 and revisiting a number shows the same sketch. All systems
are closed-form functions of (seed, sketch-local time): no accumulated frame
state anywhere. Flock birds are analytic (centroid path plus per-bird orbital
offsets, heading from the same function at t + 0.045) rather than an
integrated boids simulation, for the same reason.

The duds, chosen deliberately and left unpolished: system 4 (pixel) holds 46
near-static pixels of which only a few blink, twice a second at most; system
9 (dots) is a plain grid where the only event is a slow diagonal sweep
lighting one diagonal at a time. A real lab book has pages where the idea did
not catch. Weak sketches stay weak; that honesty is the concept.

Navigation: an event-driven state machine. Landing on a sketch stamps its
local clock and a 20 second auto-advance deadline. Advancing lands the next
sketch exactly on the deadline, so a sketch's local time is always
t minus its landing time. A tap toggles the hold: the deadline freezes (its
remaining time is banked) and resumes on the next tap; the held sketch keeps
playing. A second tap within 0.38 s restores the pre-tap state from a
snapshot and jumps instead, to sketch 1 + floor(r * 108) from mulberry32
seeded by the jump count, so the leap is random-feeling in use and still a
pure function of the event list. Drag scrubbing previews sketches live, each
preview restarting its local clock when the number changes, and releasing the
drag lands the previewed sketch from its preview start time.

Audio: lazy, created only inside the first pointer gesture, typeof-guarded
throughout. Each system has a quiet signature family (blip, wash, or tick)
voiced on landing and every couple of seconds while the sketch plays;
scrubbing clicks a soft page-turn tick per sketch passed. Volumes stay low.
The piece renders complete in total silence.

Chrome and layout: canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas style width and height
are pinned in px inside draw() every frame. Phone detection uses
window.screen physical size (min dimension < 700 px), with the aspect
fallback only if screen is unavailable. The sketch content lives in a rect
between the amber header and the bottom rail at both sizes.

Frame one: sketch 001 drawn at local t = 0 plus a 6 second pre-roll inside
the ghost system only, so the smears are already mid-shimmer when the page
opens (choice recorded here per the build brief). The rail marker sits at the
far left, position 001 of 108.

Deviations and choices:

- Feedback box (system 11) is an analytic emulation, nested rotated squares
  with decaying alpha, not true canvas self-feedback. Reason: the QA
  renderer provides no offscreen canvas or drawImage feedback route, and
  accumulated cross-frame state would break the closed-form determinism
  gate. The nesting reads as the same tunnel.
- Boids-mini is closed-form, not a simulated flock. Reason: determinism;
  any local time must be exactly reproducible from the seed alone.
- The double-tap jump is seeded by jump count rather than a live random
  source. Reason: determinism from the recorded event list.
- Per-sketch audio voices are three families (blip / wash / tick) assigned
  per system rather than 108 individually synthesized sounds. The family per
  system is fixed, so a sketch's voice is still recognisably its own.
- Sketch 001's system is the ghost smear, not the cycled waveform its slot
  would imply, because the prompt keeps 001 as "superposition". Its title
  and 108's "bloom" override the title cycle the same way.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  renders cleanly with no AudioContext present: full silence, no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Re-verified after a comment-only edit to the script (the literal
  name of the banned clock call removed from a comment): thumb bytes
  unchanged. Duplicate renders deleted.
- Read-back, desktop and thumb: lab black field, amber "001 superposition"
  at the top, pale ghost-dot clusters spread over the middle (each cluster a
  particle and its smear), progress rail along the bottom with the amber
  marker at the far left. As specced.
- Read-back, mobile (390x844, phone path): header untruncated at the top,
  ghost field fits the tall frame, rail and marker intact at the bottom,
  nothing clipped.
- Hygiene scans of index.html: no wall-clock reads, no external URLs, no em
  dashes, no gradients, no shadowBlur, no offscreen canvas creation, no
  visible text beyond the specced number, title, and rail.
