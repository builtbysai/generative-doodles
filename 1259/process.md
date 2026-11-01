# №1259 — Making Time (Boredom Engine)

Esther Hz study block EH4, after *Making Time* (2018, PlatteForum): an immersive happening where Boredom Engagement Specialists checked guests' cell phones at the door, under a surveillance camera, next to a clock contraption — "hope you weren't too too bored." This piece is that happening as a surveillance feed you cannot enter for free: the ritual gate is the piece, and boredom is the performance.

## What it is

- **The room.** A fixed surveillance angle on an empty gallery corner: two wall planes meeting at a back corner, floor boards converging on it, an empty picture frame with a wall label on the right wall, a desk with blank feedback forms at left, a filing tray on a stand at right. Dressing: corner brackets, a grey-green grade, a scanline band drifting down the frame, and a `REC 00:00:00` readout that counts the piece's own elapsed time (fiction furniture — never the real clock). The camera never moves.
- **The clock contraption.** A brass-rimmed dial on a dark back panel, an exposed three-gear train below it, and a pendulum. The gears mesh properly: teeth 12 / 8 / 16 with ωB = −ωA·12/8 and ωC = −ωB·8/16 (ωA = one rev per 30 s), phases offset by half a tooth so the teeth interleave. Once running, time is visibly being *made*: the minute hand sweeps a full turn per 60 s, the hour hand turns at 1/12 that rate, and the second hand steps once per second with a small decaying overshoot shake — the tick, shown.
- **The specialists.** Three little suited figures (dark suit, white shirt triangle, plain head; the wall-starer is drawn from behind, no shirt) who enter from the edges at performance-times 2 s, 9 s and 17 s and then loop three ritual blocks — walk to the clock and adjust it (arm up, 4 s), walk to the empty frame and stare at the wall (8 s), walk to the desk, pick up a form, carry it to the tray and file it (the tray stack grows). Each specialist runs the blocks in a rotated order at a slightly different speed, so the three are almost never standing on the same spot. Boredom is mostly standing: between blocks they return to a waiting spot and stand. All walking is stepped at 6 fps; all positions are closed-form functions of performance time — no frame-integrated state.
- **Feedback forms.** Every filed form lands in the tray, counted in closed form from the segment schedules (first cycle ≈ 80 s, steady cycle ≈ 66 s; spec 0's first drop lands 75.2 s into its first cycle).

## The gate and interaction

- **The ritual gate.** The piece does not start until you check your phone. Frame one is the invitation: empty room, clock hands at 12, gears and pendulum still, a phone icon pulsing in a brass outline at center with a marching dashed arrow pointing at the dashed **PHONES** drop-box, top-left. Drag the phone into the box and it slides in, shrinks, and earns a brass tick; only then do the clock and specialists start, on performance time measured from the drop. There is no other way in: taps before the gate do nothing, a missed drop sends the phone gliding back to center, and the gate never re-arms.
- **Tap** (after the gate) files a feedback form: a paper plane launches from bottom-left, drifts across the room on a sine path over 6 s, and lands in the tray (stack +1). At most 3 planes airborne at once.
- **Drag** (after the gate) nudges the nearest specialist: it ambles to the dragged point (2.5 s), stands there a moment (2.5 s), then ambles back into its script (1.5 s blend). Recorded as an event and evaluated in closed form, like everything else.

## House adaptations

The prompt's optional audio tick ships silent — the tick is the second hand's overshoot shake. Everything is flat shapes in the brief's palette (surveillance grey #8A8A86, gallery white #ECE9E2, clock brass #A87F3F, suits #2A2A28, form paper #D8D2C2); no gradients, no blur, no pixel machinery. Tone kept deadpan: nothing menaces, nothing creeps — the camera is just on, the way it is in a gallery.

## Determinism

First frame is drawn synchronously at **t = 0**: the gate state itself — still clock at 12:00, gears at their meshed rest phases, pendulum hanging straight, phone at rest center (640, 544 at 1280×800) with pulse phase sin(0), REC at 00:00:00. The rAF loop (typeof-guarded) is anchored as elapsed-since-load. The performance runs on performance time (piece time minus the drop instant), so its timeline is identical whenever the visitor performs the ritual. All variation is seeded integer hashes (seed from `?seed=`, default 1259); no unseeded randomness, no real-clock content.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in draw(); phone layout via `window.screen` min dimension < 700 with aspect fallback (drop-box and phone keep tappable minimums, the wall frame widens). Silent; no microphone; no external assets. Visible text is only the fiction's furniture: "PHONES" and the REC counter.

## QA

Rendered with the house node-canvas renderer. Frame one verified at desktop (1280×800), thumb (720×720) and mobile (390×844): surveillance corner, dashed PHONES box top-left, phone pulsing low-center with the dashed arrow to the box, clock at 12 with all three meshed gears and the hanging pendulum, desk and tray in place, REC 00:00:00. Token scan clean of unseeded randomness, element creation, pixel buffers/offscreen canvas, canvas filters, blur, and audio/mic APIs.

**Gate harness** (the piece driven through its own pointer handlers against node-canvas, 20 assertions, all passing): boots closed and empty; pre-gate tap ignored; missed drop leaves the gate closed and the phone returns to center; drop in the box opens the gate and the tick appears after the 0.5 s slide; performance time runs from the drop; all 3 specialists entered by pt = 20 s; tap files a form and the plane lands 6 s later; airborne planes cap at 3; a post-gate drag nudges without stopping the performance; filed count is monotonic and reaches 8 by pt = 200 s; gear ratios exact to 1e-12. A harness snapshot at pt = 26 s shows the checked phone in its box, the clock running (minute hand at 26 minutes), and the three specialists distributed — one walking to the clock, one waiting by the tray with a form already filed in it, one staring at the empty frame.

Thumb rendered twice at 720×720: **byte-identical** (cmp pass, duplicate deleted). index.html md5 4434b7aaae73d3ed0ac292a904d1815c.
