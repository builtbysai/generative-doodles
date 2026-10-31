# No.632 "Escape, Reader"

EXPANSION #76 soledad-romero, prompt block 8 "La Isla Octópoda". Her ESCAPE BOOK as a playable island: three enigmas guard the exit, and solving all three draws the golden route home. No timers, no scores, no fail screens, no text anywhere; the glows teach the rules and failure only resets the current enigma with a soft pulse.

## Concept

A top-down octopus island on deep sea: a seeded blob coast with eight reef-arm bumps, a shallow lagoon heart with a small cream boat moored in it, a coral volcano cone with an ember core on the headland. Three enigma sites glow faintly gold at three arms: the Pattern Reef (an arc of seven shells), the Tide Bells (three bells, visibly large, medium, small), and the Kelp Maze (a water channel cut through the eastern arm to a cove). Solved sites keep their gold. When all three are solved, a dashed golden route draws itself from the lagoon, out the maze channel, to the open sea edge; the boat sails it, rests, and the island quietly resets for a new escape.

The enigmas:

1. Pattern Reef: tap the site and the tide lights 4 of the 7 shells in sequence (gold, one by one). Repeat the order by tapping shells. A correct tap lights the shell with a soft ripple; a wrong tap pulses and the tide re-lights a fresh sequence. Solved: all seven shells turn gold and stay.
2. Tide Bells: tap the bells low to high (largest first, then medium, then smallest). A correct bell swings and throws a ripple whose spacing widens with the bell's size. Wrong order pulses and resets the bells. Solved: all three glow gold.
3. Kelp Maze: tap the site and the boat glides from the lagoon to the channel mouth. Drag to steer it through the channel between swaying kelp fronds; the channel is wide and the collision radius forgiving. Touching a kelp tip bumps the boat gently back to the mouth for another try. Reaching the cove solves it; the boat glides home to the lagoon.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets. The island is redrawn every frame from seeded geometry (mulberry32, SEED 632076): a polar coast function (base radius plus eight seeded arm bumps and two wobble harmonics), coral speckles and scrub dots precomputed as data. No offscreen canvas anywhere, per the renderer constraint.
- Strict palette: deep sea #12315E, shallow lagoon #2B7A8C, sand #E8D9A8, reef coral #E2725B, kelp green #3E6B35, volcano ember #C9562E, boat cream #F5F1E8, route gold #E8B93B. Translucency is used for halos, shallows and ripples; no extra hues.
- Sizing follows the house rules: Visual Viewport API with resize listeners on visualViewport and window, canvas pinned in px inside draw(), phone detection via window.screen (min dimension < 700) with the h > w*1.15 aspect fallback. The island scales to min(w, h) and stays whole on a 390-wide phone frame.
- Determinism: frame one is the synchronous draw(0) at load (island whole, boat moored, three sites glowing faintly, no enigma started). All animation runs on an anchored elapsed clock (first rAF timestamp), never Date.now(). Kelp sway, halos, bell swings and glides are pure functions of that clock plus interaction state. Tide sequences derive from mulberry32 keyed by the reef attempt count, so each retry deals a fresh sequence.
- Interactions are pointer events with tap detection (short, small movement) distinct from maze steering drags; taps are hit-tested bells first, then shells, then the maze site.
- State machines: reef idle/showing/input; bells progress counter; maze moor/toMouth/steer/toLagoon/done with glides as eased interpolations; finale phases play/route/rest, then a full soft reset. The boat is clamped to the channel corridor by projecting onto the channel polyline while steering.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice and cmp byte-compared: identical (re-verified after every fix round). Frame one shows the eight-armed island filling the frame, lagoon and boat at center, channel and cove to the east, volcano upper right of the lagoon, shell arc upper left and bells lower left each inside a faint gold halo. Mobile render: island refits the 390 width, nothing clipped.
- Solved-finale state verified with a state-forced throwaway render (the piece's inert ?seed=finale QA hook sets all three enigmas solved and starts the route phase): the render shows gold shells, gold bells, solved gold rings at the reef and cove, the dashed gold route drawn from the lagoon through the channel and off the east edge, and the cream boat on the route just past the cove. The throwaway render was read and deleted; production loads have no query string and are unaffected.
- Fix round 1: canvas lineWidth is in unit space under the scaled context; three helper functions (shell, bell, boat) multiplied lineWidth by the pixel size, producing giant strokes that buried the frame. Converted to pure unit values.
- Fix round 2 (composition): lagoon shrunk (0.128 to 0.104 of frame) so the island reads around it; arm bumps strengthened and the coast base reduced so the eight arms lobe more clearly; reef and bell sites moved inward so no bell or shell crowds the coastline; shells shrunk and respaced so each fan reads individually.
- Grep confirms no Date.now, Math.random, createElement, AudioContext, external URLs or em dashes in the file.

## Deviations

- Silent bells (gallery rule): the gallery is silent, so the Tide Bells enigma carries no audio at all. Pitch order is taught visually instead: bell size descends low to high, and each rung bell's ripple spacing widens with its size. Recorded here per the brief.
- The tide sequence is 4 shells (the brief's 4-6 range) to keep the first enigma gentle; the sequence is re-dealt from the attempt-seeded RNG on every retry rather than repeated identically, so a failed attempt restarts the enigma fresh instead of testing memory of a sequence the player may have missed. Wrong taps still only reset this one enigma, with a soft pulse, per the no-punishment rule.
- The finale boat sails off the east edge and fades during the rest phase; the reset boat fades back in at the lagoon. A soft gold ripple marks its return.
