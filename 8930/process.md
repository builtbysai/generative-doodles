# №8930 · Silent Score — process notes

## Concept statement
A polar waveform ring that reads as a song being performed, with no audio
anywhere in the page. A parametric "ghost track" (summed sines on a seed:
four-on-the-floor kick, 8th-note bassline, three-partial drifting pad, sparse
melody blips) is composed in time; the full 16-beat loop is laid around the
circle like the groove of a record. A playhead orbits the loop, a bright
comet trail shows the part being "played now," and a real rolling-average
beat detector listens to the ghost bass (fast envelope follower vs a
~1.5-beat rolling average, fire at 1.55x with a 0.55-beat cooldown) and fires
visible pulse events: expanding ripple rings, a kick swell of the whole ring,
beat beads flaring on the hidden grid, and the BPM tag flashing. Since the
ghost kicks are composed exactly on the grid, every detected pulse lands
exactly on the hidden BPM. A small legend names the BPM so the point lands:
viewers watch an unheard song keep perfect time.

## Seed mechanics
- `mulberry32` PRNG. Seed → BPM (84..126, even), kick accent map, kick
  sub "frequency", one off-beat ghost note position, 32-step bassline
  semitone pattern with rests, pad partials + drift rates, melody blip
  times/pitches/widths, and one of four restrained palettes
  (bone waveform + one ember accent on warm dark ground).
- The ring is drawn from smooth *envelopes* (kick/bass/pad/melody bumps),
  not from the raw carriers, so it reads as music rather than static.
- Default seed 893006 → 120 BPM, warm amber palette.
- `?seed=` loads a shared song; tap/click mints a new random song and
  writes `?seed=` into the URL. `prefers-reduced-motion` renders one still
  frame. No libraries, no network, no audio nodes of any kind.

## How it differs from used families
Read the full "Used concept families" ledger before building. Closest
relatives considered and rejected as conflicts:
- №9015 Oscillons: layered Lissajous waveform traces on dark. Mine is ONE
  polar ring, and the subject is not waveform drawing but an unheard song
  with beat-detection pulse events landing on a hidden BPM grid.
- №8963 (one series driving ribbon geometry + striker timing): a Tenney
  pitch-rhythm instrument with a falling striker, retired; mine has no
  striker, no pitch mapping, no audio at all.
- Audio-reactive families (typed voronoi agents, 8940–8960 tuning pieces)
  all involve real sound; this piece is explicitly silent.
Family name recorded: "ghost-track beat-detected polar ring".

## What I tried and rejected
1. **Raw carrier waveform on the ring** (60 Hz kick sine etc.): rendered as
   fine zigzag static, read as noise. Killed it; the ring now shows
   envelope-level structure (thumps, groove, swell), which reads as music.
2. **One-sided kick envelopes**: produced shark-fin spikes, gear-like.
   Replaced with symmetric gaussian hills centered on each beat.
3. **Two extra construction circles** at 0.62/1.38 R0: read as clutter.
   Kept only the hairline staff circle at R0.
4. **Wide slow ripple pulses** (1.4 s, out to 3x R0): invisible mush.
   Tightened to 0.9 s, R0*1.04 → 1.49, brighter stroke.
5. **Reduced-motion path** initially still called `requestAnimationFrame`
   inside `frame()`, so it animated anyway. Fixed with a `frame.frozen` flag.

## QA log
- Rig: own Chrome on remote-debugging port 9364 (first launch on 9364 never
  opened the port; restarted with the working flag set `--disable-gpu
  --no-first-run --disable-component-update` and it came up). Egress proxy
  127.0.0.1:8123 healthy (http 200).
- Iterated over 5 desktop captures, each actually viewed: ring presence,
  bump roundness, trail legibility, caption placement.
- `cdp_exceptions.py` on the final build: exit 0, no exceptions/errors.
- 1280x800 desktop: no overflow, ring fills frame, caption legible.
- 390x844 mobile: no scroll, no overflow, all copy legible
  (`qa-mobile-390x844.png`).
- Seeds viewed: 893006 (default, 120 BPM warm), 42071 (106 BPM), 777
  (112 BPM indigo, `qa-seed777-desktop.png`), 504382 (86 BPM silver-blue
  after a real click-reseed). All render cleanly; click-reseed works and
  rewrites `?seed=`.
- Thumb: 720x720 capture of the real piece at the default seed (`thumb.png`),
  viewed and kept.
- Static checks: no `<audio>`/WebAudio anywhere (the one "audio" hit is a
  code comment), no em dashes, no date strings, no absolute URLs in visible
  copy, viewport meta present.

## Revision 2026-10-04 (Hans: "Improve 8930")
Visual analysis: the ring was a 1.2px hairline at 42% — nearly invisible on
phones/daylight; the playhead comet whispered instead of performing; beat
pulses were hard to see; the center was void; caption crowded the ring.
Worse, a real bug: `pal.accent` is hex ("#e0a458") but was interpolated into
`rgba(...)` strings — invalid, so EVERY accent glow (trail, playhead, beads,
pulses) had been silently rendering nothing since launch. The piece had been
performing without its lighting.
Changes:
- Fixed the hex-in-rgba bug (new `pal.accentRgb` triplet); all accent glows
  now actually render.
- Ring: 1.6px at 55% + soft bone glow — present but calm.
- Playhead: 5.5px dot, stronger glow, halo breath, 2-beat comet trail.
- Beat pulses: retuned twice — first pass (0.85 alpha) created a permanent
  second ring (beats every 0.5s at 120bpm outlasted the 0.9s fade); final:
  0.55s life, 0.5 peak alpha — the ring breathes with the beat.
- Center record label: ghostly BPM numerals + "BPM · GHOST BASS" in a hairline
  circle (font scales with R0 for mobile); anchors the void, deepens the
  vinyl metaphor.
- Layout: R0 0.375→0.355, ring lifted, caption clears the waveform.
QA: cdp_exceptions.py exit 0 at 1280x800, 390x844, and ?seed=777 (indigo
palette). Thumb recaptured from the revised build. Reduced-motion still path
untouched and intact.
