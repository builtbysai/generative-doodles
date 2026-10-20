# No.431 First Light

After Yael Hofri's Menorah Magic mechanism (EXPANSION #46, prompt YAE7): a brass menorah at dusk on deep indigo night, its nine candles lighting one by one, each flame a small warm halo. Ceremonial and quiet. No other objects, no garnish, no text anywhere in the piece.

## Concept

The prompt's lighting ceremony is the piece. On load the candles light one at a time, each flame growing from ember to full with a halo bloom; once all nine are lit they sway gently together; then the ceremony begins again. The piece treats the subject with the sincerity the prompt asks for: restraint is the design. A double-tap replays the lighting from dark.

## Construction

One canvas, design space 1280x900, CENTRED fit: the menorah keeps its shape at any size and the page ground is the night indigo, so the letterboxing reads as more night (and, below the table line, more table; both fills run far past the design edges so no seam shows on a tall phone).

Palette only: night #1B2340, brass #C9A24B, brass shadow #8A6A2E, flame #FFC83D, core #FFF3D6, halo #F5A623 (flat alpha steps), table #2A1F3D, ember #F08C3C. Flat colour only: no gradients, no shadowBlur, no offscreen canvas. The prompt's one earned radial gradient (the flame halos) is rendered flat per the house rule, as 3 stepped flat-alpha concentric discs (radii 66/45/28 scaled by bloom, alphas 0.05/0.09/0.14).

Menorah geometry: central stem with two quiet shadow rings and a ringed knob; a stepped base (dome over two foot steps) standing on the dark table edge at y=780; 8 branch arcs as symmetric bezier pairs (four per side, outer branches meeting the stem lower so the arcs nest), each drawn as a shadow pass offset (3,4) under a brass pass; the shamash raised at the centre of the stem. Each candle is a brass cup, a short cream stick, and a wick. The menorah spans y=226 (shamash wick) to y=780, centred at x=640.

Ceremony timing (36s master loop, asserted in code):

| candle | position | slot (s) | fully lit (s) |
|---|---|---|---|
| 0 | shamash, centre, raised | 0.0 | 1.2 |
| 1 | branch, far left | 1.2 | 2.4 |
| 2 | branch | 2.4 | 3.6 |
| 3 | branch | 3.6 | 4.8 |
| 4 | branch, inner left | 4.8 | 6.0 |
| 5 | branch, inner right | 6.0 | 7.2 |
| 6 | branch | 7.2 | 8.4 |
| 7 | branch | 8.4 | 9.6 |
| 8 | branch, far right | 9.6 | 10.8 |

Growth is 1.2s smoothstepped per candle: dark, then an ember dot at the wick (growth below 0.45), then the teardrop flame scaling in, its halo blooming with the same growth value. All nine fully alight by 10.8s; from there to the seam (36s) all nine sway together, and at the seam the flames go dark and the ceremony restarts.

Flames: teardrops (outer #FFC83D, pale core #FFF3D6 at half scale) with per-flame fixed phases. Sway is one cycle per 2s (18 per loop), leaning the tip up to 3.4px at full growth. Flicker is 2-phase: a 2s sine and a 1.2s sine summed into the flame height (amplitudes 0.045 and 0.032); both periods divide the 36s loop exactly, so the seam is clean.

Interaction: watch-only apart from double-tap, which rewinds the piece clock to the loop seam so the phase is 0 and the ceremony replays from dark. Tap timing is read from the anchored piece clock, never a wall clock.

Determinism: frame one is drawn synchronously at the constant phase T = 9.0s, mid-ceremony: seven candles fully lit, the eighth (slot 8.4) at half growth, the ninth still dark. The clock is anchored at that offset and advances in fixed 1/60 ticks; rAF is typeof-guarded. State is a pure function of the phase plus the double-tap history.

## QA log

Rendered with render-piece.js (node-canvas):

- qa-desktop.png (1280x900): mid-ceremony as specced. Seven full flames with stepped halos, the eighth flame at half height with a small halo, the ninth candle dark. Branches nest symmetrically, shamash raised at centre, base and knob read cleanly, table edge quiet. No text, no garnish.
- thumb.png (720x720): the whole menorah inside the square with night above and table below; flames and halos legible at gallery size. Rendered twice from the shipped script: byte-identical.
- qa-mobile.png (390x844): centred fit keeps the complete menorah; page ground continues the night above and the table below with no seam (the background/table fills were extended well past the design edges after the first pass showed the table band ending mid-screen).
- Probes via the house seed pattern (not shipped behaviour): ?seed=dark starts at T=0.4s, only the shamash kindling (ember flame, small halo), the other eight sticks unlit; ?seed=lit starts at T=20s, all nine flames lit and haloed.
