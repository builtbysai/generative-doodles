# №1092 — Hand Dust

Marco Tempest study block MT5 (PP253): the onformative "Magic and Storytelling" particle systems — a faint procedural body on a dark stage, filled with gold dust, its two hands trailing bright dust, and a scored burst finale. Tempest's hand-tracked dust without the Kinect cosplay: the silhouette is a soft shape, never a skeleton.

## Mechanism

- **Simulation (sanctioned sim exception):** fixed timestep dt = 1/60 in the rAF loop, all state from a seeded mulberry32 RNG. Frame one is the state after a fixed synchronous **pre-roll of 18 simulated seconds**, so the thumbnail is reproducible byte-for-byte. Pool of 760 particles in five types.
- **The silhouette:** a soft humanoid outline built from a mirrored half-outline point set, drawn as a smoothed filled path (#141419 at 0.6, plus a 1.045× halo pass at 0.22). Center stage, 60% of frame height. No joints, no skeleton.
- **System (a) — global dust:** gold #E8C77D at ≤0.5 alpha. Spawns are rejection-sampled against a ray-cast point-in-polygon test on the silhouette outline, so dust only exists inside the depth-field; drift is a seeded curl-ish flow (sums of sines over position and time, per-particle phase). A mote that drifts outside the silhouette is faded out early.
- **System (b) — hand emitters:** two hand points ride choreographed Lissajous paths whose frequencies are all integer cycles per 60 s, so the loop closes. Hands are damped springs (k = 42, c = 11) toward their targets, which gives the light lag. Each hand sheds cream #F5E6C8 trail particles with velocity inheritance (0.35× hand velocity plus jitter), 1.1–1.9 s lives, drawn as points with per-particle alpha — no canvas-fade trails anywhere.
- **System (c) — bursts:** act 3 only, one family per cue: typographic fragments at 43.5 s (16 serif glyphs from the right hand, each dissolving inside 2 s — the only text-like marks in the piece, as specced), a fireball bloom at 49.5 s (42 orange #FF9B4A particles from the left hand), bullet streaks at 55.5 s (12 pale-blue #BFE3FF segments fanned upward from the right hand).
- **Acts:** the 60 s loop runs dust field (0–20 s) / hand spells (20–40 s, wider amplitude, denser trails) / burst finale (40–60 s). Hand amplitude and spawn rates ease between acts. A small diamond cue marker at top-center flashes at each act boundary; three pips at top-left mark the current act.
- **Interaction:** watch-only by default. Drag conducts: the right hand's spring target becomes the pointer (clamped to the stage) and its emitter follows with lag; on release it returns to its choreographed path. The left hand always holds its choreography. Sound: none — the prompt specs none, so the piece is silent.

## House rules applied

Visual Viewport sizing with visualViewport + window resize listeners; canvas CSS size pinned in draw; phone detection via window.screen (min dimension < 700) with aspect fallback; square stage centered and full-bleed, page ground is the stage black. No offscreen canvas, no canvas gradients, no ctx.filter, no shadowBlur, no createElement, no AudioContext, no getUserMedia (grep-verified clean). Palette held to spec: #050508 stage, #141419 silhouette, #E8C77D dust, #FFFFFF/#F5E6C8 emitters, #FF9B4A fireball, #BFE3FF bullets.

## QA

- Rendered with the house renderer at 1280×800 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- **Pre-roll used: 18 s** (1080 fixed steps at dt = 1/60).
- Frame one (t = 18 s, late act 1): near-black stage; the faint soft silhouette stands center, filled with drifting gold dust; both hand emitters burn white with cream trails along their paths — the left hand swung out left of the body mid-gesture, the right hand at the body's right edge. Cue diamond rests dim at top-center; act pip 1 lit.
- Thumb rendered twice and compared with `cmp`: **byte-identical**; the duplicate was deleted.
- One refinement round: trail spawn rate, lifetime, size and alpha were raised after the first render, where the cream trails read too faint against the dust field.
