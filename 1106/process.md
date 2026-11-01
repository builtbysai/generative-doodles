# №1106 — One Sculpture Per Viewer

Daniel Franke study block DF3: *Spatial Soundsculpture* (~2010). A dark room, a handheld portal, and a sculpture that exists only through the frame — individually linked to each observer, so no two viewers ever see the same one.

## The piece

- **Room.** Full-bleed `#05060A`. Fourteen faint AR-style marker glyphs (corner brackets, plus-in-square, diamonds, double squares, circled X, triangles) in `#2E3540` are scattered down the left and right walls, seeded per room.
- **Portal.** A thin pale ring (`#EDE8DA`) with an inner hairline, diagonal handle ticks, screw dots and a small bottom grip — the handheld frame. It occupies ~35% of the frame. Unattended, it drifts on a slow closed-form Lissajous path.
- **Sculpture.** Visible *only* inside a circular clip at the portal. A radial crystal of 28 ridges grows from a bright core: kite facets, spokes and tip nodes in `#7FD4FF` / `#B8E6FF`, over layered flat-alpha glow discs, with a faint web joining neighbouring tips. No gradients anywhere.

## The singular rule

Ridge length and brightness come from an analytic spectrum function
`S(i, t, seedHash)`, where `seedHash` mixes the room seed, the sculpture seed
and the portal's position quantized to a 25-unit grid. Move the frame and the
hash changes, so the sculpture regenerates as a different crystal — the form is
a function of (place, sound-model), never of a live analyser. A slow breathing
term (4.4 s) swells the whole crystal; every 23 s a closed-form "loud peak"
swell passes, and during it the strongest ridge tips tint amber (`#E8A020`) —
the audio bloom.

## Interaction

- **Drag** — carry the portal; the sculpture re-forms continuously as the position hash changes. On release the frame eases back onto its drift path over ~1 s.
- **Tap** — freeze the current sculpture (hash + spectrum time held) for 10 s as a specimen, then it releases.
- **Double-tap** — new room: markers and sculpture seed are reseeded.
- Never click-to-reload.

## Sound

A real WebAudio layer (three detuned oscillators, 96 / 144.5 / 192.3 Hz, through an LFO-modulated gain and an analyser) starts lazily inside the first pointer gesture, typeof-guarded, never autoplays. The geometry deliberately never reads the analyser — the piece is complete and identical with the sound off.

## House rules / determinism

- Canvas sized from the Visual Viewport API with resize listeners on `visualViewport` and `window`; `canvas.style.width/height` pinned in px on every draw; phone detection via `window.screen` (min dimension < 700) with a `h > w * 1.15` aspect fallback (portal grows slightly on phones).
- First frame is drawn synchronously at a fixed phase (t = 20 s: portal right-of-center on its drift path, crystal fully formed, no swell active so the sculpture reads pure blue); the rAF loop, guarded by a `typeof` check, continues from phase + elapsed.
- No offscreen canvas, no gradients, no `ctx.filter`, no `shadowBlur`, no `createElement`, no microphone, no visible text beyond the `<title>`.

## QA

Rendered with the house renderer at 1280×800, 390×844 and 720×720. Frame one shows the near-black room, faint glyphs on both walls, the pale portal ring, and the luminous blue crystalline sculpture inside the portal only. Thumb rendered twice at 720×720 and compared with `cmp`: **byte-identical**.
