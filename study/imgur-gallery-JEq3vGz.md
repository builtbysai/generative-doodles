# imgur gallery JEq3vGz: Study Notes

**Source:** https://imgur.com/gallery/JEq3vGz ("My First Successful Attempt at Procedural Animation", by YankeeMinstrel, July 15, 2018)

## Status
Deep pass completed 2026-09-20 via live browser. The direct page fetch and
the headless screenshot rig both failed on imgur this session, so the album
was inspected through the managed browser instead: gallery page loaded,
all six album images visited individually, per-image captions read, frames
seen as stills. Honest boundary: the GIF loops were seen as paused frames,
not watched in motion, so motion notes below lean on the author's captions.
InvKin5's media file has been deleted from imgur and could not be inspected
at all. No source code is published, so the technique notes are the author's
own description, taken from his captions.

## What is verified

- Album title: "My First Successful Attempt at Procedural Animation".
  Author: YankeeMinstrel. Posted July 15, 2018.
- Reach: roughly 621,000 views, 3,573 upvotes, 196 comments. Tags:
  procedural generation, animation, 2d animation.
- Six images, all looping GIFs at 664x554, each with its own caption. The
  album-level description is empty; the story lives in the captions.
- The author wrote it in Notepad++, plain hand-rolled code, no engine or
  IDE named. "One year since I began thinking in functions and variables",
  so this is a first serious programming project. Inspirations cited:
  Spore (childhood), GDC-style talks on the animation of Rainworld and
  Overgrowth, and r/ProceduralGeneration top posts. Stated end goal: a
  Spore-like creature-building game.

## The pieces, seen as stills

One aesthetic across the whole album: thin white line art on pure black.
No fills, no color, no shading. The line segments ARE the IK chain links,
so the creature's skeleton is its drawing. Minimalist wireframe style.

1. **InvKin1** (i.imgur.com/N3GeREp.gif, 12.5s loop). The simplest demo: one
   thin white chain of a few segments on black, curled into a smooth S that
   loops back on itself like a wavy ribbon. A mouse cursor is visible and the
   chain's free end sweeps around tracking it. The "does the chain reach"
   proof of concept.
2. **InvKin2** (i.imgur.com/6vNHqiR.gif, 23.1s loop). A single thin chain
   hanging in a U, pendulum-like arc, with a small ring marker at its tip
   near the visible cursor. The tip follows the cursor while the chain bends
   smoothly to keep its end on the goal point. The classic tentacle-reaching
   look, rendered as pure line.
3. **InvKin3** (i.imgur.com/Hr7FInb.gif, 31.4s loop). A single articulated
   leg-like limb in white line segments, arcing through a sequence of
   bent, straight, and extended poses. The author calls this the "footstep"
   goal-point test: the limb cycles like a leg taking steps.
4. **InvKin4** (i.imgur.com/gRsD2nV.gif, 48.7s loop, album cover). A small
   wireframe lizard-like skeleton: long segmented spine arched into a curve,
   many thin jointed legs radiating off the body in a dense fringe, giving
   it a millipede or bristle-worm look. It walks across the frame in a loop,
   spine undulating and legs paddling in sequence, the body visibly
   wriggling before straightening as it moves.
5. **InvKin5** (i.imgur.com/sXuDZN3.gif, 64.8s loop). Media deleted, frame
   unavailable. Caption says it shows the full lizard model parameterized
   to any scale and leg count, used as a benchmark with 100 pairs of legs
   (roughly 8,000 segments total), with "surprisingly good" performance.
6. **InvKin6** (i.imgur.com/XQ7qq2W.gif, 54.7s loop). A larger wireframe
   creature, multi-legged lizard with an elongated ribcage-like body and
   paired feathery leg fringes along both sides, arched into an S-posture.
   Cursor visible. It walks with visible locomotion while its spine wriggles
   before straightening, a side effect the author says he never
   intentionally programmed.

## Core techniques (the author's own account, from captions)

The pipeline has two layers, and the author is explicit that the second one
is the actual hard problem.

- **Layer 1: the IK solver.** Chains of "nodes". Each node has a parent in
  the chain and must maintain a fixed distance from it. Positions are
  updated forward along the chain, then re-solved with constraints on the
  relative angle between segments, which gives stiffness and limited range
  of motion. A second pass runs the same algorithm in reverse along the
  chain (tip to root) with special parameters so the chain can reach a
  moving goal point.
- **Layer 2: the goal-point rules.** This is the "procedural" part: rules
  governing how goal points move so limb tips land like footsteps. The
  author calls this the monumental challenge, with much code written,
  rewritten, scrapped, and replaced. Earlier demos just move goal points
  toward the mouse cursor, which reads as a creature chasing the cursor.
- **The model.** A parameterized lizard model taking any scale and leg
  count, stress-tested at 100 leg pairs. Performance held without any
  optimization pass, so none was pursued.

## What makes it sing

The restraint is the whole trick. White lines on black is the cheapest
possible render, and it works because the motion is doing all the talking:
you read "lizard" from the gait, not the geometry. The emergent wriggle in
InvKin4 and InvKin6, the spine loosening before it straightens, is the kind
of accident that only shows up when the solver is honest rather than
scripted, and the author was smart enough to keep it instead of "fixing"
it. The album also reads as a genuinely good engineering diary: each GIF is
a milestone (reach, follow, step, walk, scale), and the captions narrate
the layering. That progression, simple demo to parameterized creature, is
a better tutorial structure than most written tutorials.

## Cross-links to the sketchbook

- **Kaesve, urodela.** Same family: chain-follow spines driving little
  salamander creatures. Kaesve used verlet integration with sigmoid leg
  stepping; YankeeMinstrel used two-pass IK with goal-point footstep rules.
  Two independent arrivals at "chain of nodes plus gait logic equals
  creature". The urodela notes already cover verlet; this album is the
  complementary IK-flavored recipe for procedural locomotion.
- **The line-art throughline.** Halkomaki's density-modulated single line,
  the urodela skeletons, and now these wireframes: a skeletal line that
  carries both form and motion is a recurring strong move. Keep it in the
  toolkit for doodles where geometry should stay cheap and motion should
  carry the meaning.

## What is overdone (avoid-list)

- Pure white-on-black wireframe is striking for six GIFs and would be
  monotonous for sixty. The aesthetic is a default, not a choice; a doodle
  borrowing this should earn its palette instead of inheriting the terminal
  look.
- The mouse cursor in frame is a demo artifact. Fine for a devlog, a
  distraction in a finished piece.
- The album leans on long loops (up to 64.8s) to show off locomotion. For a
  gallery piece, a shorter seamless loop reads better than a long
  demonstration.

## Open threads

- InvKin5 is gone from imgur; the parameterized-model benchmark claim is
  caption-only.
- No code published, so the reverse-pass IK parameters and the footstep
  goal-point rules are described, not verified. A re-implementation from
  the description (two-pass IK with angle constraints, footstep targets)
  would be a legitimate sketchbook exercise, derived not copied.
