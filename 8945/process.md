# №8945 · Eight Minutes (2026-07-08)

Seed: 248 (Eight Minutes, from the fog activation grammar)

Concept: eight minutes of fog, every half hour. The piece only exists
inside its windows (minutes :00-:08 and :30-:38 of each hour) and is
only a countdown between them. Absence gets a shape: a log of observed
activations persists in localStorage and reads like a tide table. Test
hooks ?window=force and ?window=closed hold each state for inspection
(documented here, harmless in the gallery).

Technique notes:
- Real clock schedule computed from Date; open/close transitions write
  the localStorage log (last 40 entries).
- Window state: drifting fog banks (sprite particles, slow advection),
  "FOG WINDOW · LIVE" with remaining time. Closed state: large tabular
  countdown, next-window time, faint fog residue, tide table of the last
  8 observed fogs.
- QA: window state captured live (real clock was inside a window) plus
  forced hooks; desktop 1280x800 and mobile 390x844 inspected, zero
  console/page exceptions. Thumbnail at 1280x720 via ?window=force.
