# Blank Windows : Rafaël Rozendaal (2016)

**Site:** http://www.blankwindows.com/
**Author:** Rafaël Rozendaal, 2016. Code by Reinier Feijen (Box of Chocolates).
Part of the Family Collection Klinkhamer series, alongside trashloop.com
(2015) and crossdivisions.com (2016).
**Status:** 2026-09-25, technique-deep. The live site timed out from this
session's network (redirect to https, then hang), so its current pixels were
not inspected live. Concept, construction, and reception documented from
contemporary writeups (Gizmodo, Creative Manila), and the core mechanic
re-rendered locally in plain DOM and visually inspected: a pile of
macOS-chrome windows, pointer drag, and procedural replenishment (frames
inspected at 1280x800).

## What it is

A page full of nothing but blank macOS-style windows, overlapping in a pile,
all draggable, all resizable. The stated game: drag them off-screen and dig
down to the bottom of the pile. There is no bottom. The windows are
procedurally generated, so the pile is literally endless. Gizmodo's
contemporary review called it "the digital equivalent of a Tootsie Pop,
except you never get to the chocolate center."

## The technique

The whole thing is DOM, no canvas. Each window is a div with macOS chrome:
traffic-light dots, a subtle title-bar gradient, rounded corners, a soft
multi-layer drop shadow. Sizes are randomized within sensible bounds, and
initial positions are scattered so they read as a casually dumped pile
rather than a grid. Dragging is pointer-event math, x and y offsets plus
z-index bumping on grab. The load-bearing trick is the replenishment rule:
every finished drag spawns a fresh window at the back of the stack, so the
visitor can never excavate the pile. What feels like an infinite pre-built
stack is really a fixed handful of live windows over a spawner.

My re-render confirmed the aesthetic requirements: the windows only read as
"real" if the chrome is close to macOS, which means the traffic lights need
their darker rims, the bar needs a very light warm gradient, and the shadow
needs to be soft and long. On a slightly warm gray page the pile looks
tactile. Make the shadows too sharp or the gray too cool and it reads as a
mockup instead of a toy.

## What makes it sing

The joke is the interface itself. Every visitor already knows how to drag a
window, so there is zero onboarding, and the absence of any content is the
content. The endlessness is the punchline: the page promises a bottom and
structurally cannot deliver one. It is Rozendaal's family-collection formula
working at its purest: take one familiar browser object, remove its purpose,
and let the visitor's own habits supply the interaction.

## Avoid-list

Endless-content-as-punchline is exactly as strong as the thing being
endless. A pile of nothing works once; a pile of anything with even mild
novelty in it would stop being funny and start being inventory management.
Do not ship "endless X" unless the endlessness IS the joke.

## Seeds

72. **Tray Archaeology** : the pile, but every window has one faint ghost
    of content: a half-faded dialog fragment, a progress bar at 87 percent,
    a single line of terminal output. The visitor digs hoping the next one
    explains the last one, and it never does. Success: someone drags twenty
    windows deep and still finds nothing that resolves.
73. **Gravity Windows** : same macOS-chrome windows, but they are physics
    bodies in a verlet sim: drag and fling them, they tumble, stack, and
    slide off each other with real momentum. The endless spawner keeps
    feeding new ones from the top of the viewport. Success: flinging a
    window across the screen knocks three others into a believable tumble.
