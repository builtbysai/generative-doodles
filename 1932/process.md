# №1932 The Synth Bender — process notes

Driver: three figures from behind at a wall of synths, and the drag is the
bender itself — pull a cable from one oscillator node to another and the
room's hum changes color and rate with it.

- Study: #252 chris-hyson (CH5, PP1179). studies/chris-hyson.md does not
  exist in the repo (404), so the palette is hand-picked from the prompt's
  named colors: magenta studio light #c2187a, deep rack black #120a14,
  hot pink #ff2e88, amber #ffb347, ice blue #7fd4ff, warm white nodes
  #fff3e0.
- Formula date: 2007-04-27, displayed "2007 · 04 · 27".
- FIRST_T = 6 s. Pulse rates run 0.12 to 0.34 traversals a second with
  staggered phases, so at t = 6 every cable carries pulses visibly
  mid-cable. Frame one is byte-reproducible: default desktop render
  md5 f1cd6b96f6b52be285b5de9d1536b555 on two separate runs.
- Template: mirrored №1927 (page structure, title/date plate, hint
  styling, house rules). Visual Viewport sizing with resize on
  visualViewport and window; canvas pinned in draw(); phone detection
  via window.screen with aspect fallback; full-bleed on phones, square
  on desktop; one synchronous frame at load; requestAnimationFrame
  guarded with a typeof check.

## Mechanism

Ten oscillator nodes in two rows across the modular wall, eight cables
hanging between them as sagging vines. Two pulse particles travel each
cable, color from the endpoint pair ((a + b) % 3 across hot pink, amber,
ice blue) and rate from the cable length (shorter patch runs faster).
Drag: pointerdown near a node grabs its cable, a live vine follows the
pointer with a hand sprite at the drag point, pointerup on a different
node moves the cable endpoint there. The repatch re-weights the hum:
the room wash and the top-right "hum · color" word take the new cable's
color. No audio: visual-only by design (a drag piece may stay
visual-only under the Franke audio rule; no WebAudio, nothing
autoplays). No score, no sequencer grid, no click-to-reload. The
figures never turn around; only their hands move, bobbing gently and
riding the drag point while a repatch runs.

## QA hook

location.search accepts ?seed= to vary the layout, ?t= to move the
first frame, and ?sx= ?sy= ?ex= ?ey= (fractions of stage W/H) to
replay a repatch drag before the first frame.

## Fix log

- Round 1: first render read clean but the hand sprites sat on top of
  the heads like antennae, and the leftmost rack panel was clipped off
  the stage edge on desktop and mobile.
- Round 2: hands moved beside the heads (offset 0.075 to 0.11 of stage
  width, random side per figure); node rows pulled inward (row A 0.11
  to 0.89, row B 0.15 to 0.85) and panels narrowed to 0.16 of stage
  width. Re-rendered all three sizes; desktop, mobile and thumb all
  read right.

## Repatch probe (desktop 1280x900, seed 1932)

- Default: md5 f1cd6b96f6b52be285b5de9d1536b555, hum hot pink.
- Drag node A0 to B4 (?sx=0.11&sy=0.13&ex=0.85&ey=0.33):
  md5 da76ad85692de5ae6864a081b698689b, a long hot pink cable now sweeps
  from the top-left node to the bottom-right node.
- Drag node A0 to B3 (?sx=0.11&sy=0.13&ex=0.675&ey=0.33):
  md5 a9c4d6e21fc5864435024f6928a84346, the moved cable turns ice blue,
  the room wash shifts blue-purple, and the plate reads
  "hum · ice blue". The color and rate change is real, not cosmetic.

## Deviations from the prompt

- Visual-only, no WebAudio hum (see Mechanism above).
- The "turn a knob" part of the prompt is not a separate control; knob
  turning is folded into the repatch, which is the piece's one
  interaction, per the prompt's "No other interaction."

## Known warts

- On narrow phones the rack panels nearly touch; the wall reads dense
  rather than spacious, which suits a wall of gear.
- The middle figure's raised hand sits close to its head's outline on
  some sizes; it still reads as a hand at the wall.
- A repatch to a node whose (a + b) % 3 matches the old color keeps
  the same hum word; the cable path and pulse rate still change.
