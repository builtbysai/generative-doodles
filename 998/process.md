# No.998 - The Model Watches

Study #122 satoshi-horii, PP159 "Beyond Perception" (Rhizomatiks): the AI's own learning process turned into the artwork. No robots, no brains, no glowing eyes - the pipeline is the subject, and the learning is simulated honestly: a closed-form loss curve and generations that visibly improve are the piece.

## Concept

A dark training room split down the middle. Left: TRAINING DATA, an archive wall of seeded generative scribbles (spirals, waves, zigzags, closed loops, wandering walks, hatch studies) drawn one per second into a 6-column grid, piling dense, older rows dimming. Right: GENERATIONS. A stack of five layer bars lights in sequence through each 4-second forward pass, and each pass produces a new generation: a composition built from actual recent archive scribbles, redrawn and corrupted by noise whose amplitude is the model's current loss. Early generations are magenta, jittered and broken toward noise; late generations are mint and nearly faithful. A thin white loss curve falls along the bottom of the right half, and every 30 seconds the best generation is pinned, amber-framed, to a gallery strip along the very bottom. The piece watches itself learn.

## Construction

Single self-contained canvas 2D page, no external assets, no visible text (title tag only). Everything drawn is a closed-form function of piece time plus a recorded list of visitor events; nothing is frame-integrated.

- Archive: scribble index i appears at t = i+1 seconds. Each scribble is generated on demand from a mulberry32 stream seeded by its index (six rotating study types), so the pool is unlimited and identical on every visit. The wall shows the most recent 72 cells; rows older than 24 entries dim to 0.65 alpha, older than 48 to 0.45.
- Loss: loss(tm) = 0.95 * exp(-0.02 * tm) * 0.965^floor(tm/4), where tm is model time (time since the last reset). The exponential gives the smooth fall; the per-pass factor gives the small step drops visible in the chart. Skill = 1 - loss.
- Generations: pass p starts at model time 4p and uses the loss at its own start. It picks 7 archive scribbles that existed at pass start (visitor-curated ones first, then a seeded walk back through the most recent 26), and redraws each into a seeded slot of the generation square. Corruption is per-point seeded jitter (amplitude loss * 0.17 of the square) plus per-segment dropping (probability loss * 0.45), so high loss breaks strokes into fragments and low loss leaves them clean. Above loss 0.55 a few extra stray fragments spray in, standing in for near-noise early output. Stroke color blends magenta (255,79,216) to mint (125,249,198) by skill. Checkpoint thumbnails reuse the exact same stroke data, scaled down - same generation, smaller frame.
- Checkpoints: at model times 30, 60, 90... the generation in effect is pinned to the bottom strip with an amber frame. They persist across model resets, one row per epoch's schedule.
- Layer bars: five bars beside the generation panel; within each pass they fill in sequence (lit at 0.45 alpha once passed, full cyan while active).
- Interaction, all recorded as timestamped events and folded back into the closed-form state: tap the generation to inspect it full-frame for 10 s; drag across the archive to curate (selected cells get a small amber tick, are preferred in future generations' training picks, and each curation event permanently multiplies subsequent loss by 0.97); double-tap resets the model (loss and passes restart, archive and checkpoints kept).
- Sound, lazily created on the first pointer gesture and fully typeof-guarded: a soft square-blip pencil tick per new scribble, a rising triangle tone per layer bar, a sine chime at each new generation whose pitch rises as loss falls (300 Hz at high loss to 1700 Hz at low), and a warm pin click per checkpoint. The QA renderer runs silent and the visual piece is complete without audio.
- Determinism: frame one is the synchronous draw at fixed offset T0 = 38 s (38 scribbles, pass 9 mid-flight with bars 3 of 5 engaged, loss about 0.32, first checkpoint pinned). The animation loop is anchored as T0 plus elapsed time since load; the start timestamp never feeds the drawn state of the first frame. Canvas sizing uses the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas style width/height in px every frame; phone detection uses window.screen's smaller dimension (< 700 px) with the height > width * 1.15 aspect test as fallback only. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no microphone.

## QA log

- Rendered with the house node-canvas renderer (no rAF, no AudioContext in that environment): qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png at 720x720, all clean and silent.
- Determinism: thumb.png rendered twice and compared with cmp - byte-identical. The duplicate was deleted.
- Desktop read-back: left half a dense wall of 38 gray scribble cells in six columns (spirals, waves, zigzags, loops, walks, hatches clearly distinct); right half a large panel of pale blue-mint strokes that are recognizably the same scribble vocabulary, jittered and broken at mid-training loss; five layer bars beside it with two dim-lit, one bright cyan active, two dark; the white loss curve falling with visible per-pass steps across the right half's bottom; one amber-framed checkpoint thumbnail in the bottom strip. Matches the frame-one spec.
- Thumb read-back: same composition at 720x720, nothing clipped, checkpoint and active bar legible.
- Mobile read-back: split stays side-by-side at 390 wide, archive grid vertically centered in its half, generation panel and bars legible, loss curve and bottom strip intact, no clipping. Page ground is the room tone per the dark phone rule.

## Deviations

- Archive window: the wall displays the most recent 72 scribbles rather than literally every mark forever; past a few minutes of runtime an unbounded wall would shrink cells below legibility. Older rows dim in two steps before leaving the window, preserving the "piling archive" read. Recorded here because the prompt describes open-ended accumulation.
- The checkpoint is the generation in effect at the checkpoint time (the latest pass), which is also the lowest-loss generation so far by construction, since loss falls monotonically within an epoch. "Best" and "latest" coincide in this simulation; no separate scoring pass is faked.
- Curation's training effect is implemented exactly as briefed in the build spec: selected scribbles are preferred in generation picks (up to 4 slots) and each curation event applies a small permanent loss reduction (x0.97) from its event time onward, inside the current epoch only.
- Audio clarity mapping is a pitch/brightness rise on a single sine chime rather than a literal filter sweep over noise; the loss-to-clarity relationship is preserved and audible.
