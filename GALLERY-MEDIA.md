# Gallery media contract

The wall is a browseable artwork collection, not a runtime for every artwork. The source of truth remains `pieces.json`; keep existing numbered folders and the publishing lanes intact. Deleted entries must never be resurrected.

## Media levels

1. **Still** — required for every piece. Use the actual artwork rendered at a deliberate, representative seed/time. Default `<n>/thumb.png`; an explicit relative `thumb` path can select a compact SVG or other image. Aim for 480–720px and a compressed poster, ideally below 150 KB. Do not insert UI, titles, placeholders or promotional copy into thumbnails. The current gallery queues visible and near-visible images with a bounded request count; archive images remain lazy-loaded.
2. **Motion** — optional, only when the motion itself is integral to the piece. Provide a lightweight, silent, script-free animated SVG at `<n>/motion.svg`, using matching artwork geometry and a seamless loop (not a fake screenshot effect). Register `motionThumb` with the relative numbered path. The wall mounts at most one after a deliberate desktop mouse hover, and removes it on exit, drag, scroll, pause, reduced motion, data saver, backgrounding or opening the viewer. Touch uses the still and explicit selection. No audio in wall previews. Prefer compact assets; avoid embedded raster frames, remote assets and unbounded animations. A future video format should be muted, playsinline, preload=none and share the same single-preview budget.
3. **Live** — optional, explicit `livePreview: true` only after auditing the piece for embedding. The selected artwork gets a single isolated sandboxed iframe when the viewer chooses Try piece. No frames in the moving wall, no automatic live launch. The viewer always preserves a full-page link. Closing, changing artwork, or backgrounding destroys the frame. Legacy pieces remain full-page only until audited.

## Metadata

```json
{
  "n": 5003,
  "title": "Phase Loom",
  "date": "2015 · 09 · 23",
  "note": "A concise description of the actual work and its interaction.",
  "thumb": "5003/thumb.svg",
  "aspect": 1,
  "motionThumb": "5003/motion.svg",
  "livePreview": true
}
```

`aspect` is the actual poster width divided by height (optional; old entries keep their existing presentation). `motionThumb` and `livePreview` are independently optional, never inferred from descriptions. The wall uses stills even for audio pieces. Omit optional fields when the media is absent or the artwork is not audited. Do not require retrofitting legacy entries.

## Embedded artwork checklist

- Self-contained HTML without cross-origin dependencies, storage requirements or top-level navigation. The frame intentionally grants scripts but not same-origin privileges, popups or forms.
- Accept `?preview=1` as an optional performance hint. Bound backing resolution and prefer a modest frame budget; keep the full-page experience intact.
- Respect reduced motion and stop animation work when hidden; cap delta time on resume. No new expensive computation every frame unless necessary.
- Sound starts **only** after an explicit in-artwork user gesture. Do not rely on autoplay or play audio from the wall. Keep gain conservative, suspend on blur/visibility loss/pagehide, and never resume if muted. Frame destruction is the gallery's last line of cleanup.
- Mouse and touch gestures belong to the artwork only after entering the live viewer. The wall's drag/scroll gestures remain gallery gestures.
- Test mobile and desktop, multiple seeds, still and motion equivalence, keyboard operation, missing assets, navigation, frame teardown, and sound opt-in. A new media flag is not a substitute for artistic review.

The gallery must stay useful even when optional media fails to load. Keep the interface artwork-first: no badges, loading dashboards, decorative indicators or obligatory instructional overlays.
