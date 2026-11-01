# No.990 — Backstage, Lit

Study #121 motoi-ishibashi, PP151 "The Unglamorous Layer": the hardware team's
disciplines (PCBs, circuits, networks, technical costumes) shown as the
spectacle itself. No curtain, no reveal — the infrastructure is the show.

## Concept

A living schematic. A circuit board too big for the room fills the frame,
cropped at every edge. White packet squares travel real routes along its
traces; the trace lights mint segment by segment under each packet and the
light decays behind it, so every light on the board has a packet behind it —
nothing glows without a cause. Eight flat device icons ring the edges (drone,
spotlight, wheelchair, LED ball, cube, costume patch, projector, truck),
wired back to board nodes. A device pulses cyan only in the half second after
a packet actually arrives at it. At the right hangs the technical costume: a
dancer outline on a stand whose twelve amber sensor nodes fire in limb order
whenever a packet reaches the costume patch endpoint.

Interactions: tap a trace to send a diagnostic probe packet along it to its
device (the device answers with a flash); drag from one device to another to
reroute — for ten seconds new packets run between the pair; double-tap for a
new board. Sound, once the visitor has gestured: a soft tick per hop, one
pitched voice per device, a run of tiny clicks down the costume's limbs.

## Construction

- Graph: a seeded 9x9 junction grid in a virtual 1000x1000 board space,
  jittered, joined by Manhattan (L-shaped) trace edges with probability 0.82
  per grid adjacency, then bridged until the graph is fully connected. Some
  nodes are marked as chips (dark rectangles with pins) or pads (small
  circles). The board is scaled to 122% of the viewport's long side and
  centered, so it always overflows and crops.
- Packets: agents routed by BFS shortest path over the graph from a source
  node to a device's nearest node, advancing at a constant 280 px/s in a
  fixed-step 120 Hz simulation. Ambient spawns every 0.55–1.55 s from random
  nodes to random devices; routes are computed at spawn and followed hop by
  hop, so mid-flight packets always have somewhere real to be going.
- Lighting: each edge is divided into ~26 px chunks; a chunk records the sim
  time the packet's head last passed it and is drawn mint with alpha decaying
  over 1.1 s. Device pulses are pure arrival events with a 0.55 s decay.
  The costume sequence starts at the arrival sim time; node i fires at
  start + i*60 ms with a 0.45 s flash.
- Frame one: the sim is pre-rolled exactly 2400 steps (20 s) synchronously at
  load and drawn once. Two scripted beats in the spawn schedule (a one-hop
  packet into the costume endpoint at 18.9 s, one into device 0 at 19.3 s)
  guarantee frame one catches the costume mid-sequence and a device
  mid-pulse alongside the ambient traffic. Nothing drawn is derived from
  Date.now(); the live loop replays the same fixed steps.
- Audio: lazily created AudioContext inside the first pointer gesture,
  typeof-guarded; sim events (hops, arrivals, costume sequences) are queued
  during stepping and drained after each drawn frame. Silent and complete
  without it.
- Costume geometry: joints defined in unit space (head, torso, arms, legs),
  scaled per layout; the twelve sensor nodes sit on crown, shoulders, elbows,
  hands, sternum, neck, pelvis and knees and fire in that limb order.
- Phone layout: detected from window.screen physical size (min dimension
  < 700 px) with the h > w*1.15 aspect check as fallback only. On phones the
  costume moves to the lower right at 30% of the short side, the mid-side
  device anchors rise to 42% height, and the board still overflows.

## Deviations

- The costume's endpoint is the "patch" device icon (bottom-left on desktop);
  the hanging costume figure is its physical counterpart at the right, per
  the prompt's composition ("the costume hangs right") — arrivals at the
  patch drive the figure's node sequence.
- Probe taps target the device nearest the tapped trace and start from the
  edge endpoint farther from it, so the diagnostic visibly crosses the tapped
  trace rather than spawning beside its destination.
- Packet spawn intervals were tightened after the first QA pass (average
  ~1.05 s) and the pulse ring shrunk, so frame one reads mid-traffic instead
  of near-empty; recorded here as a tuning change, no mechanism changed.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png): renders cleanly with no audio,
  no rAF, no offscreen canvas in the harness.
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. Duplicate render deleted.
- Read-backs: desktop and thumb show the overflowing green board with thin
  traces, pinned chips and pads, several white packets with mint lit segments
  trailing, the drone icon pulsing cyan at top-left, and the costume at right
  with most of its amber nodes lit mid-sequence. Mobile shows the same system
  compressed: costume lower-right and legible, lit trace segments near the
  left edge and bottom, patch device pulsing at bottom-left, no essential
  element clipped.
- First pass was too sparse (one packet visible, oversized pulse rings);
  spawn rate, packet speed, lit decay and ring size were adjusted and all
  sizes re-rendered and re-verified.
