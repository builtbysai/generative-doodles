# №1298 "Interrupted Factory" (karen-kraven KK3, PP465)

## Prompt
A dim room with 3-5 oversized sewing apparatuses — thread stands taller
than a viewer, a single giant needle angled like a blade — built from bare
steel. Some are mid-task (a thread line glows taut); one is half-covered by
a dust cover that slipped mid-pull; a spider web grows slowly in one
corner. Grounded in Kraven's grief-era: Woman sitting at the machine,
thinking (2019, needle "enlarged to the size of a weapon") and Lull (2021,
"interrupted work... or possibly liquidation had begun", "spider...
time-makers"). Palette: machine steel #8A8D94; dust-cover canvas #CFC7B8;
thread glow #E4B04A (the only warm light); dark room #1C1D21; web silver
#A9AEB8 (barely visible); warning red #8C2F28 (one small detail: a thread
spool). Wide landscape; apparatuses in a loose row receding slightly; the
giant needle foreground right, cropped by the frame; the web top-left;
negative space above the machines matters as much as the machines.

## How it is built
- Four apparatuses in a loose row, scales 1.00 / 0.92 / 0.84 / 0.76:
  a thread stand (with the single warning-red spool), a sewing machine on
  a table, a second thread stand, a second machine. All bare-steel
  silhouettes: rods and crossbars, table slabs, column-and-arm bodies with
  needle bars. Floor line at 0.82H; the wall above stays empty except for
  the web.
- Giant needle foreground right: eye slot near the top end, long tapered
  shaft, point at the far end exiting the frame bottom edge. A tool first;
  a weapon only by scale.
- Watch-only, 90-second cycle, one state machine per apparatus:
  WORK (thread taut, glowing, faint 7 Hz vibration) -> IDLE (thread sags,
  sag easing in over 5 s) -> COVERED (canvas cover descends and swallows
  it) -> HALTED (cover retracts over 6 s, thread hangs slack to a small
  coil). Phase offsets (0 / 35 / 58 / 76 s) stagger the cycle so frame one
  shows one WORK, one IDLE, one half-covered, one HALTED, and never all
  four covered at once.
- The slipped cover: the second stand's cover stops at 55% extent instead
  of full, bottom edge slanting — the cover that slipped mid-pull.
- Swerve: at loop time 60-70 s, one seeded apparatus (loop 0: apparatus
  2) snaps its thread taut and quivers at 9 Hz, then relaxes — the
  stranger terrain. It overrides IDLE/HALTED thread display, never a
  covered one.
- Web: seeded fan of radial threads from the top-left corner plus arcs
  between neighbours, drawn barely visible in silver. Count is a
  closed-form function of piece time: 5 threads at frame one, +1 per
  90-second cycle, capped at 14 — it grows and never resets, without any
  accumulated frame state.
- Reseeds (swerve apparatus, cover descent durations) use a seeded
  mulberry32 sequence keyed by loop index, never Math.random.

## House adaptations
- Frame one draws synchronously at exactly t = 0 via a boot flag; the
  rAF clock starts only with the loop (plain function declaration, armed
  from the real scheduler — the №1278 lesson, invisible to the QA
  renderer which defines no rAF).
- All motion is a closed-form function of piece time and recorded events;
  the web count is a closed-form function of loop count.
- Thread glow is layered flat-alpha passes, no shadowBlur, no gradients.
  Dots use paired arcs with a moveTo before every batched arc.
  No visible text except `<title>`. Silent, no audio, no microphone.
- Phone: full-bleed room, page ground in the room color; checked at
  390 wide.

## QA
- Desktop 1280x900, mobile 390x844, thumb 720x720 all inspected.
  Frame one: stand with glowing taut gold thread and red spool; machine
  with sagging idle thread; stand under the slipped half-cover (rod
  visible below); halted machine with slack thread; giant needle
  foreground right with eye slot; faint web fan top-left.
- Forced-time probes (temp copies, discarded): t = 20 shows A0 WORK gold,
  A1 half-covered, A2 HALTED slack, A3 WORK gold; t = 65 shows A0 fully
  covered, A1 WORK gold, A2 swerving taut gold (swerve override over
  IDLE), A3 cover just starting. State machine confirmed.
- Fix rounds: (1) first render hid the halted machine entirely — its
  offset sat exactly on the COVERED/HALTED boundary with cover still at
  full extent; offset moved 70 -> 76 so frame one shows it uncovered and
  still. (2) First covers spanned the whole slot width and read as blank
  walls; narrowed to the apparatus's own width (0.62 of slot) centered.
  (3) First web hugged the frame edges and barely registered; rebuilt as
  a fan on an arc reaching into the room. (4) First needle ended inside
  the frame; re-anchored so its point exits the bottom edge.
- Thumb rendered three times at 720x720, `cmp` byte-identical, and
  identical to the shipped thumb.png.
- index.html md5: 6facdad22984ed0d1eb127069a6685ed
