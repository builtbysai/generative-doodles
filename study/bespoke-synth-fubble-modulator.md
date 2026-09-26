# Bespoke Synth FubbleModule: Study Notes

**Date:** 2026-09-26
**Source:** github.com/BespokeSynth/BespokeSynth, Source/FubbleModule.h
(149 lines) and Source/FubbleModule.cpp (563 lines), read verbatim.
**Doorway:** the fubbles hop in the Olivia Jack / Hydra study. Olivia Jack
presented "drawing as an interface for live-codeable functions" at the
NIME 2020 workshop; Ryan Challinor saw the talk and built the fubble
modulator into Bespoke Synth the same year. The module's own header bar
renders the attribution: `(concept by @_ojack_)`.

**Depth: technique-deep.** Full source read end to end; the record,
playback, mutation, and render mechanics are all confirmed from the code,
and the Poll() drift behavior was simulated locally and visually
inspected. Honest gap: Bespoke Synth itself was not run (it is a JUCE /
openFrameworks desktop app, no headless audio rig here), so the module's
live UI was not seen in motion; the visuals below are reconstructed from
the DrawModule code.

## What it is

A modulator you draw. Inside a fubble module is a pad; you drag a gesture
on it and the gesture becomes a looping function of time, available as two
separate modulation outputs, horizontal and vertical. Patch the H output to
a filter cutoff and the V output to a reverb send and one drawn squiggle
drives two parameters through one shared timeline.

## The mechanics, from the source

**Recording.** On mouse-down inside the pad (`OnClicked`, left button),
`Clear()` wipes the old curves and `RecordPoint()` starts firing every
frame from `Poll()`. Each frame appends one `CurvePoint(time, coord)` to
the H curve (time, x) and one to the V curve (time, y), with time measured
in transport measures from the drag start. The gesture's length IS the
loop length: `mLength` is the drag duration. Stop drawing and the loop
closes at exactly the duration of your hand.

**Playback.** `GetPlaybackTime` takes transport time minus the record
offset, multiplies by the speed slider (0.1 to 10x), and wraps with fmod
over `mLength`. Each axis's `Value()` evaluates its curve at the playback
time and maps 0..1 to the target parameter's range. Optionally the length
quantizes to a note interval (8n through 64), so the loop snaps to the
grid. The draw area renders the combined path as a white line, a playback
dot riding it, the per-axis timeline strips below, and a moving lineX
playhead over them. The target parameter names are printed rotated along
the pad edges.

**Live mode.** Right-drag (`mIsRightClicking`) skips recording entirely:
the axis is active and `Value()` returns the live pointer position. The
pointer becomes the modulator with no loop, no history. Same pad, two
instruments: draw-then-loop with the left button, play-it-live with the
right.

**The mutate engine.** This is the part that elevates it past a drawn LFO.
When you are not drawing, and "mutate amount" is above zero, every frame
`Poll()` walks all recorded points and nudges each one by
`ofMap(perlin3(x, y, time), 0, 1, -strength, strength) * 0.003`, sampling
two separate 3D Perlin fields (red channel drives H, blue drives V, shown
as a 30x30 colored grid behind the curve when active). Points that drift
out of [0, 1] get a spring-back pull. The drawn gesture literally wanders:
at strength 1.2 over 20 seconds my simulation showed the loop-the-loop
path shearing coherently into a new shape, never repeating, never quite
leaving. The "mutate warp" and "mutate noise" sliders set the field's
spatial scale and time speed; "reseed" picks a new field. This is the
fubbles concept in its strongest form: the function is a drawing, and the
drawing is alive.

**Persistence.** Curves, recorded flags, length, and record offset all
serialize into the save state (rev 3), so a drawn modulation survives
reload.

## What sings

The core loop is the oldest livecoding idea made physical: your hand is
the function. Recording captures time as well as shape (a slow part of
the gesture plays slow), the H/V split means one gesture is two
instruments, and the mutate engine means the loop never goes stale. The
right-click live mode collapsing record and perform into one pad is the
kind of UI decision that only exists because the author performs.

## Seeds for future pieces

- 106, 107, 108 appended to FUTURE_PIECES.md.

Evidence: /tmp/stiles/FubbleModule.h, FubbleModule.cpp, rerender script +
B_fubble_mutation.png.
