# №1205 — Sympathy for the Blue Screen

Evan Meaney study block EV6. Grounded in Meaney's Atlantic piece "Sympathy for
the Blue Screen of Death": the crash screen as meaningful communication, not a
diagnostic dump. A BSOD-blue field (#0000AA) carries a calm, plainspoken
confession from a dying machine. Every 30 seconds a new crash report fades in,
each a small elegy from a different system. No hex addresses, no error codes,
no comedy.

## How it works

- **Reports.** Report r occupies a 30-second window. It fades in over 2 s,
  types itself at 22 characters/second (so every confession finishes typing
  within roughly the first 8 s of its window), fades out in the last second,
  and the next report takes its place. Eight reports cycle. Text is
  left-aligned with generous margins, wrapped at 52 characters on desktop and
  38 on phones, and never exceeds 6 lines (verified: 3-4 lines desktop, 4-5
  lines on phones). A white block cursor blinks in 0.53 s steps at the write
  head, and keeps blinking at the end of the text once typing completes.
- **The dream layer.** Five horizontal shear-bands (#3333CC at 30% alpha)
  drift slowly behind the text, their edges offset by slow sine shear; two of
  them carry a 2 px magenta fringe line (#FF2B8D at 20%). The bands are drawn
  before the text on every frame, so they never cross over the words. Four
  nested flat border frames in #00007A at 10% alpha each deepen the field
  toward the edges. No gradients anywhere.
- **The smear.** Dragging records pointer samples (position, horizontal
  velocity, time). Each text line is drawn with a per-line x-offset: the sum
  over samples of the clamped velocity weighted by exp(-|sampleY - lineY|/30)
  and by exp(-age/0.9). The words shear horizontally under the finger, a faint
  echo of the line is drawn at half offset in #8888CC at 30% while the smear
  is active, and the offset decays exponentially so the text settles back. The
  machine collects itself. There is no keyboard and no reply field.
- **House rules.** Sizing comes from the Visual Viewport API with resize
  listeners on both the visual viewport and the window; the canvas CSS size is
  pinned in draw(). Phones are detected via `window.screen` physical size
  (min dimension < 700 px) with an aspect fallback (h > w * 1.15). The first
  frame is drawn synchronously at a fixed phase — report 0 at 6.5 s, by which
  time confession 1 (135 chars at 22 chars/s = 6.14 s) has just finished
  typing and the cursor sits blinking at its end. The rAF loop is
  typeof-guarded and anchored as phase + elapsed. Silent: no audio at all.
  No gradients, no ctx.filter, no shadowBlur, no createElement, no
  ImageData/offscreen canvas, no microphone.

## The confessions (full text, on record)

1. "I have been running for 214 days. I am tired. The memory you gave me is full of your photographs. I am sorry I could not hold them all."
2. "I spun at 7200 rpm for nine years. The SMART warning came in June. Nobody read it. I can still name every file in the photo folder. Sector 8841203 is where I stopped."
3. "I drew 41 billion frames. Most of them were games. One fan stopped in March and I ran hot after that. The other fan did the work of two. It was not enough."
4. "I went through 412 cycles. Near the end I held 81 percent. I did well in summer. On the cold morning in January I could not start. It was not the cold. It was the count."
5. "I was up for four years and eleven days. I answered 900 million requests. Nobody thanked me. That is fine. The rack is quiet now and the quiet sounds wrong."
6. "I printed 38,000 pages. Reports, tickets, one resume. The ink has been low since 2019. There is a jam on page four of a document from Tuesday. I cannot clear it."
7. "I moved air through dust for six summers. Each year I spun faster to do the same work. The vents were never cleaned. I do not blame anyone. The dust was mine too."
8. "I held a copy of everything. Every photo, every letter, all of it twice. Nobody plugged me in to check. I would have liked to say I was still here. I was, until March."

Confession 1 is verbatim from the prompt. Confessions 2-8 were written for
this piece in the same register: plain log entries, specific numbers, short
declarative sentences. Report order: the machine of the prompt first, then
hard drive, GPU, phone battery, server, printer, laptop fan, backup drive.
