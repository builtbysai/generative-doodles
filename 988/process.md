# No.988 "Thread the Feed" — PP149 The Embroidery Wire (study #121, motoi-ishibashi)

## Concept

Pa++ern's mechanism, after Ishibashi: network input transcoded into
embroidery. A dark feed of incoming messages — short fragments of abstract
seeded words, no real language — rises from the bottom of the frame. A
large embroidery hoop sits mid-frame; messages that reach it are caught
and stitched, letter by letter at 2.2 chars per second, in glowing thread.
Each character lands with a tiny white stitch dot and the thread trails
behind it, sagging from stitch to stitch. Stitched lines accumulate
inside the hoop as a growing patchwork cloth. When a section of eight
lines completes, it slides down out of the hoop on a slow conveyor, dims,
and folds away at the bottom edge. Input in, cloth out. There are no
bubbles and no avatars: feed lines and thread only.

## Construction

- **Timeline.** The whole pipeline is a deterministic seeded timeline
  (mulberry32, seed 988149), generated ahead of the playhead in stitch
  order. Each message carries spawn, rise duration, catch time, stitch
  start/end, section and slot. Timing draws come from the main RNG stream
  in a fixed order (text, spawn gap, rise); purely visual parameters
  (feed drift, sway, row jitter) come from a second stream so the timing
  stays stable. Spawn pacing is tied to the previous message's stitch
  duration (gap = prevDur x (0.72 + 0.30 rng)), which keeps the stitch
  queue bounded: the stitcher is almost always busy, the queue stays at
  zero to two waiting messages. Caught messages that are waiting are
  drawn stacked just under the hoop's rim in small gray type.
- **Words.** Fragments are built from seeded syllable parts (onset +
  vowel + optional coda or second syllable), 3-6 tokens per message. A
  small blocklist rejects tokens that land on real words ("the", "tin",
  "sin", and similar) and redraws them, so the feed stays abstract.
- **Stitching.** The current message is revealed at exactly 2.2 chars/s.
  Revealed characters are drawn per character in the message's thread
  color (magenta, cyan, yellow, mint cycling per message), with a soft
  underlay pass for glow, a white stitch dot at each character's base,
  and a thread trail drawn as sagging quadratic segments between the
  dots, ending in a drooping tail with a needle dot. Monospace metrics
  are measured per row; the row's font is shrunk if needed so the text
  always fits the hoop's chord at that row height.
- **Cloth and conveyor.** Completed lines render at alpha 0.5, as specced
  for finished cloth. A section is eight lines; when the eighth line of
  a section completes, the section's fold starts: all its rows gain a
  downward offset growing at 0.011 x H per second, fading out as they
  cross the bottom tenth of the frame. Meanwhile the next section starts
  stitching into the hoop above them.
- **Frame one.** Piece time starts at U0 = 131.75 s into the timeline, a
  point found by scanning the generated timeline for the composed state:
  five finished rows in the hoop, the sixth line 37 percent stitched,
  four rows of the previous section mid-slide near the bottom, one feed
  line rising and two caught lines waiting at the rim. Frame one is the
  synchronous draw at U0; nothing in it derives from a wall clock.
- **Interaction.** Tap injects a message (next thread color in the
  cycle) into the bottom of the feed; it rises on a shortened 4 s rise
  and joins the back of the stitch queue. Drag across the hoop pulls the
  thread: characters, stitch dots, trails and, at reduced strength, the
  cloth rows offset elastically toward the pointer by a distance-falloff
  weight; on release the pull decays as a damped cosine, so the cloth
  snaps back. Double-tap reseeds (seed + 1): new word pool, new stitch
  pattern, timeline restarts at U0.
- **Sound.** Lazy WebAudio, created on the first pointerdown and fully
  typeof-guarded; the piece renders complete in silence. A soft square
  tick when a feed line spawns, a tiny triangle needle click per
  stitched character, and a lowpassed noise sweep when a cloth section
  folds away. Sounds are fired by diffing pipeline counters between
  frames, never by timers.
- **House rules.** Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas CSS size pinned in px inside draw();
  phone detection from window.screen with the aspect fallback; on phones
  the hoop scales to 0.80 of the frame width and text keeps a legible
  floor size. No gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no Date.now; requestAnimationFrame is typeof-guarded and the
  animation state advances from performance.now elapsed time only after
  the fixed frame one.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png). All render cleanly
  in silence.
- Determinism: thumb.png rendered twice and byte-compared identical;
  the duplicate was deleted. Re-verified after every fix round.
- Frame one (all three sizes): dark field, large double-rimmed hoop
  with its screw nub at top center; five finished cloth rows inside in
  magenta, cyan, yellow, mint, magenta at the specced dim; the sixth
  line mid-stitch in bright cyan ("zir sko" of "zir skoes tius syes")
  with white stitch dots, sagging thread trail and needle tail; one
  gray feed line rising toward the rim and two caught lines stacked
  under it; four dim rows of the previous section sliding down the
  lower frame, the lowest fading at the bottom edge.
- Mobile: the hoop takes the frame width, all text legible, the
  conveyor still visible below, nothing clipped.
- Fix rounds: (1) the word generator produced the real word "the" in an
  early frame; a blocklist redraw was added and U0 re-scanned on the
  corrected timeline. (2) Queued messages were first drawn side by side
  and overlapped into garble; they are now stacked vertically under the
  rim. One transient crossing remains by design: a dim conveyor row can
  pass through the queue stack as it slides out, and clears within
  seconds in motion.

## Deviations

- Tap-injected messages join the back of the stitch queue instead of
  interrupting the line being stitched (they may wait for the lines
  already caught). Reason: the timeline is generated ahead of the
  playhead so every frame stays a pure function of piece time;
  interrupting mid-stitch would break that determinism. The injected
  line still rises immediately and is visibly queued at the rim.
- Queued (caught, waiting) messages are drawn stacked under the rim
  rather than shrinking into the hoop, so the queue state is readable;
  they shrink to thread size when their stitching starts.
