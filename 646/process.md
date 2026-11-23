# №1987 The Wash Does the Story

- Title: The Wash Does the Story
- Prompt code: MC4 / PP1234
- Study: #259 mateo-villanueva-brandt
- Gallery date: 2007-06-21, shown as "2007 · 06 · 21"
- Interaction cue: Tap to re-light the room.

## What the piece does

A staged interior, desk with books and a jug on the left, a tall mirror at centre right, a fringed chair at the far right, flattened by grade into a single deep-blue field. The room sits in loose thirds, the mirror is the brightest plane, and a diagonal light shaft falls from the top right with dust drifting through it, almost still. The scene is drawn in luminance, 0 to 1, and one colour-grade function maps every luminance through the current wash ramp, so the whole picture is a single monochrome field with soft edges and deep shadows. Tap re-lights the room: the wash cycles deep blue, ember, bone white, bottle green, and back to blue, with a slow 2.5 second crossfade. The set itself never changes, and there is no reseed and no reload.

## FIRST_T and cycle

FIRST_T is 6 seconds. At frame one the wash is deep blue at rest, and the dust is mid-drift. No wall clock or Date enters the animation state. All randomness is seeded (mulberry32 with SEED 1987, plus a deterministic hash noise). Dust motes fall slowly down the shaft at 0.012 to 0.032 of the shaft per second, with a gentle sideways sway, wrapping at the floor. The twinkle is a slow sine near 0.3 Hz, far below the 14 Hz flicker limit. With prefers-reduced-motion, the first frame stays still.

## Interaction

Tap (pointerdown on the canvas) advances one wash in the fixed order, crossfading over 2.5 seconds. The caption ink flips per wash, light ink on the dark washes, dark ink on the bone-white wash, so the copy stays readable on every wash. Never click-to-reload. Visual only, no WebAudio, no autoplay.

## QA hook

`?t=<seconds>` and `?seed=<seconds>` set the virtual clock at load. `window.__draw(t)` drives draw with a virtual clock. `window.__piece1987` exposes firstT, the wash list, washIndex(), washName(), washAt(t), tap(t), and redraw(t).

## Deviations from the prompt

None. The prompt asks for a staged interior flattened by grade into one deep-blue field, room in loose thirds, mirror as the brightest plane, dust drifting almost still, tap cycling a curated wash list with a slow crossfade, and no multi-colour grading, realistic rendering, or change to the set. All of that is built as specced. One implementation note: the grade is applied per shape through a single grade function mapping luminance through the current wash ramp, rather than a post-process pixel pass, so the piece stays cheap enough to animate every frame.

## Probes

Time probes, desktop 1280x900, all distinct, dust visibly moved:

- probe-t6.png, t=6, md5 95248ea658f3927f652ca51c2b3453e6
- probe-t30.png, t=30, md5 98ca91c8d3ee11285708ec07932f9a1a
- probe-t90.png, t=90, md5 22d239f065f439a7916fe097c04cb6ec

Tap probes, one session at 720x720, taps at t=6, 12, 18, 24. Each tap moved to the next wash in the fixed order, verified by washName(), and each mid-fade frame differs from its settled frame:

- Tap 1, ember, mid-fade t=7.2 md5 2a2d1e3d48ae69faef8e261d8c8e2200, settled t=10 md5 be3735847546d827b54bebf8272dcf0c
- Tap 2, bone white, mid-fade t=13.2 md5 5815256c0154fb83a80473f973f2362c, settled t=16 md5 5c24e0885924664bed5e06d2e3e4d695
- Tap 3, bottle green, mid-fade t=19.2 md5 faa05119192c1d760cefa8335b002276, settled t=22 md5 b1c0d478e7078e6c3838938a705af8eb
- Tap 4, deep blue, mid-fade t=25.2 md5 4fcb3ce02435682d3caf60464e0beb56, settled t=28 md5 eccc8bd284e6428baed88fb6ba715c60

All three settled wash renders were visually inspected: ember, bone white, and bottle green each read as a clean monochrome field with the set unchanged and the caption readable.

Thumb determinism: thumb.png rendered twice at 720x720, md5 6e3bc36e79890d73cfab412ca7a9d2f0 both times.

Gate renders, all visually inspected:

- render-desktop.png, 1280x900, md5 95248ea658f3927f652ca51c2b3453e6
- render-mobile.png, 390x844, md5 5c0df220615fb0ed6584c79f3e12c7fd
- thumb.png, 720x720, md5 6e3bc36e79890d73cfab412ca7a9d2f0

## Fix rounds

1. Chair geometry. First build placed the chair back from 0.46H to 0.68H, so the seat band sat on the floor line and the legs had negative height, and the fringe hung below the floor. The chair read as a tall cabinet. Fixed by shortening the back to 0.44H to 0.60H, so the seat, short legs, and fringe sit above the floor line. Re-gated all three sizes after the fix, all clean.

Total fix rounds: 1.

## Known warts

- The floor takes up the lower third of the frame and is mostly empty dark wash, with only the shaft pool and the two furniture shadows breaking it. That matches the prompt, shadows deep, but the bottom of the frame is quiet.
- The mirror reflection is deliberately unreadable, a soft desk slab and faint fringe ticks, so at thumb size it can read as a plain band at the bottom of the glass.
- Dust motes are small and sparse at thumb size, only a few are visible in the shaft.
