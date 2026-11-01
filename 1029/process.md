# No.1029 "The Inside, Honored"

Study #126 tomoaki-yanagisawa, PP190 "Disassembled" — the Syn disassemble-and-rebuild method as a pure piece: an opened device on a dark workbench, still thinking.

## Concept

A device lies taken apart on a deep charcoal bench, top-down, its components laid out in a careful museum grid: extracted control boards with amber traces and glowing nodes, a few cylindrical capacitors, a coiled ribbon cable in one cell. At the center sits a slightly larger microcontroller board, the heart, marked by the layout's only red: a status LED. The disassembly is not a death. Pulses of light travel the copper traces continuously; each board keeps its own rhythm, and the rhythms phase-lock in waves across the grid, the heart leading. The autopsy is a portrait, and the portrait is alive.

The palette is a real bench and nothing else: amber signals (#FFD97A pulses on #D8A545 traces) on dark green solder-mask (#1B2A1E boards, #1E3324 heart), charcoal bench (#101013), gray capacitor bodies with silver caps, a quiet gray ribbon. No rainbow, no RGB-gamer glow.

Interaction: drag probes the circuit (a pulse is injected at the finger, the probed board's phase nudges toward the heart, the wave re-forms); tap a board to isolate its rhythm for about eight seconds while the others dim; double-tap reseeds the device with a new layout and new trace paths. Sound, after the first gesture: soft electric ticks as pulses arrive at the ends of their traces, a rising shimmer when the grid's phases agree, a bright blip per probe.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Layout is procedural from seed 1029190 (mulberry32): a 4x3 grid on desktop, 3x4 on phones (the heart stays the center cell either way). Each cell holds a board, a capacitor cluster, or the ribbon coil; two capacitor cells and one ribbon cell are drawn by seeded lot from the non-heart cells.
- Traces are Manhattan random walks between 5-7 seeded nodes per board, stored as polylines in board-fraction space with cumulative arc lengths; node dots are drawn where traces meet. The heart carries a second trace bus. Boards have seeded inset rectangles and silver corner screws: the spacing and the screws are the honor of the disassembly, not decoration.
- Coupling model: every board is a phase oscillator. The heart runs at the base rate (0.42 Hz); other boards are detuned by a seeded factor of 0.85-1.15. Each fixed 120 Hz step integrates a Kuramoto-style update: a board's phase velocity is its own omega plus K=0.55 times the mean sine pull of its grid neighbors, plus KH=0.30 times the sine pull toward the heart's phase, so the heart leads and agreement travels as waves across the layout rather than snapping in everywhere at once. The draw layer reads the same state honestly: a board washes faint amber in proportion to cos^6 of its phase difference from the heart, so the phase-lock waves are visible as sweeps of agreement.
- Pulses: each board spawns a pulse on its main trace at every half-cycle phase wrap (the heart also spawns on its second bus). A pulse travels its trace at constant arc-length speed (full traversal about 1.15 s), drawn as a bright dot with a small layered-alpha halo and a short lit segment of trace beneath it. Pulse completion fires the tick sound (throttled, gesture-gated).
- The heart's LED brightness follows its own phase (cos^3 envelope) with a floor so the leader is always visibly alive, plus a flash term on its pulse spawns.
- Determinism: frame one is the synchronous draw after exactly 2400 fixed steps (20 s at 120 Hz) from the seeded build. No `Date.now()` in any drawn state; the live loop uses rAF elapsed time only to count fixed steps, capped. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; glows are layered flat-alpha circles.
- Viewport: canvas size from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px every draw. Phone detection via `window.screen` physical size (min dimension < 700 px) with the aspect fallback (h > w*1.15) only. Page ground is the bench tone.
- Audio is lazy and typeof-guarded: the AudioContext is created only inside a pointer gesture; tick and shimmer paths no-op until it exists. Visual is complete in silence.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (desktop), 390x844 (mobile), 720x720 (thumb). All render cleanly in silence.
- Determinism: thumb rendered twice and byte-compared with `cmp`: identical. Duplicate render deleted.
- Read-back, desktop: twelve-cell grid on charcoal: nine boards with amber Manhattan traces and node dots, bright pulses visible as lit trace segments (top-left, top-center, right-middle boards), the larger heart board at center with two trace buses, four capacitors with silver caps bottom center-right and three at left-middle, the ribbon coil top-right. Corner screws on every board. Nothing clipped.
- Fix round: at the first read-back the heart's red LED landed near a phase trough at frame one and read as a dim brown dot. The LED envelope gained a floor (0.35) plus a spawn-flash term and a slightly larger radius; trace base alpha raised 0.55 to 0.68. Re-rendered: the LED now reads clearly red at frame one on all sizes, traces brighter.
- Read-back, mobile (390x844): the grid reflows to 3 columns by 4 rows, heart at the true center with LED visible, boards tall and legible, ribbon coil left-middle, capacitors right-middle and bottom-center. Nothing clipped.
- Read-back, thumb (720x720): same composition as desktop, LED red, pulses lit on several traces.

## Deviations

- Phone grid is 3 columns by 4 rows instead of a scaled-down 4x3, per the brief's allowance, so boards stay legible at 390 px wide; the heart remains the center cell and the component count is unchanged.
- Pulses spawn on half-cycle phase wraps (twice per period per board) rather than once per cycle: at one spawn per cycle the bench read as mostly idle at frame one despite the running sim; the doubled rate keeps the "signals running" claim visibly true without changing the coupling model.
- The LED has a brightness floor: a pure phase envelope left it near-dark at the deterministic frame one (see QA log). The floor keeps the leader legible; the blink rhythm still comes from its own phase.
