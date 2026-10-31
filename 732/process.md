# No.732 Cork Commons

EXPANSION #89 paul-ramirez-jonas, prompt block 5 "Cork Commons", after The Commons (2011).

## Concept

A riderless horse in flat cork stands on a plain ground, in profile, at the scale of a monument and the simplicity of a logo. It is a public surface: tap it and you pin a small colored note carrying a short community-board message, with a black pushpin head. The pinning is the toll, and the horse pays for it. Cork flakes puff off around every pin, fall, and settle into a drift on the ground. As the 60 second cycle advances, the silhouette erodes in small bites around the pin clusters, thinning at its edges. When the cycle turns, the horse stands fresh again with the notes gone, but the drift of flakes stays on the ground as the memory of its use. Tap the ground and the drift is swept away. Nothing here is flesh: the erosion is cork flaking off a cork statue, dry and quiet.

## Construction

- Silhouette: two hand-plotted point lists in local units (y 0 at the ear tip, 1 at the hooves), a body polygon and a tail polygon overlapping the croup, both filled with the same flat cork so the union reads as one profile. Head, one ear spike, four legs, tail. A single ground-colored eye dot keeps the head readable at thumbnail size. Speckle is a fixed-seed scatter of small darker squares, tested against the polygons with a plain ray-cast and clipped to the silhouette by a single path containing both subpaths, so the clip is the union.
- Layout: ground line at 80% of frame height; hooves rest on it exactly. Horse height is 70% of frame height on desktop and 70% of the smaller dimension on phones (window.screen test, aspect fallback). Canvas is sized from the Visual Viewport API with resize listeners on both visualViewport and window, and its CSS size is pinned in px inside every draw.
- Pins: a pointer tap inside either polygon (same ray-cast test) records a pin. Its color, message, tilt, scallop sites and flake puff all come from one mulberry32 stream seeded by cycle index and pin count, so the state is a closed-form replay of the recorded taps. The note lands with a 0.35 s easeOutBack bounce. Messages are seeded community phrases, the only text in the piece besides the title.
- Flakes: seven cork-dark squares per pin leave the surface on closed-form parabolas (seeded velocity, fixed gravity, landing time solved analytically). Once landed they rest in the drift, persisting across cycles, capped at 420. A tap below the ground line clears the whole flake list: the sweep.
- Erosion: at pin time, up to three bite sites are chosen on the outline near the pin (nearest outline point plus nearby vertices, kept apart). Each site is a ground-colored disc whose radius grows from zero on a staggered schedule as the cycle advances. Maximum bite radius is 0.034 local units and at most three bites serve one pin, which keeps the loss local to pin clusters and the horse readable, inside the prompt's roughly 35 percent budget.
- Determinism: frame one is the synchronous draw at cycle 0, t=0, before any loop starts: whole horse, no notes, empty drift. The loop never reads Date.now(); elapsed time comes from performance.now() offset at load, and requestAnimationFrame is typeof-guarded. An inert ?seed=tNN hook (the series QA convention) pre-records three demo pins so forced renders can inspect the pinned, eroded state; it does nothing in the gallery.

## Deviations

- Renderer adaptation (required): the prompt specifies an offscreen mask buffer that pins erase pixels from. The QA renderer has no offscreen canvas and no document.createElement, so the horse is a vector path instead, and erosion is drawn as ground-colored scallop discs over the outline near each pin, with positions precomputed from the pin and the cycle clock. The visible behavior matches the prompt: material disappears at the edges around pin clusters, progressively, while the silhouette stays legible.
- One eye dot is drawn. The prompt asks for a clean profile, almost a logo; a logo horse still needs its head to read at 720 px, and the single dot does that without anatomy. Recorded here as a deliberate choice.
- Erosion is driven by pins only, so an untouched horse stays whole through its cycle. That follows the prompt's mechanism (the public's pins are what erode it) rather than adding ambient decay the prompt does not describe.

## QA log

- Rendered with render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- Fix round 1: the first desktop render showed the ear as a detached shard. The polygon's closing edge from the crest to the ear tip cut across the head and left the ear as a sliver. The head outline was re-plotted so the crest climbs through intermediate points to a proper ear base, and the ear is one integrated spike; legs were also thickened slightly. All renders redone and the byte-compare re-run after the fix.
- Frame one read-back (all three sizes): whole cork horse in profile on the ground line, speckle visible across the body, ear and eye reading clearly, no notes, empty drift, nothing clipped on mobile.
- Forced-state check (throwaway render at t=45 via the inert hook, deleted after reading): three pinned notes with legible messages and pushpin heads, scallop bites eaten into the topline near the pins, and a drift of settled flakes on the ground under the horse. The full mechanic reads in one frame.
- Grep audit: no Date.now, no Math.random, no createElement, no AudioContext, no external URLs, no em dashes in code, comments, or note messages.
