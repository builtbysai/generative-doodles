# If the Quicksort Were Visible (No.1681, KG2)

Driver: a familiar algorithm is asked Golid's question, what would it look like if the element nobody parameterizes were made variable, and the viewer watches the crude tool become the aesthetic object. The same quicksort of the same 96 bars runs live in both halves in sync, thin slate bars on paper on the left, stacked Bauhaus slabs with isometric depth on the right, and each cycle varies one knob: pivot-wave speed, then pivot distance, then the coloring rule.

## Mechanism

A real quicksort (Lomuto partition) runs on a seeded 96-bar array. The pivot function is swappable per cycle: a spatial wave whose phase is a sine of the partition-call count (speed 0.7 or 2.6 radians per call), a fixed distance from the partition edge (edge, middle, or far), or median-of-three for the color-rule cycles. The full op trace (pivot, compare, swap, partition) is recorded once per cycle and played back at 60 ops per second as a pure function of time, so the frame at any second is reproducible. When the trace ends the array holds sorted for 2.5 seconds, then re-shuffles from a new seed (1681 + cycle * 7919) and the next parameterization begins.

Both halves read the same playback state: same array, same pivot, same op count. The left half draws thin bars in dark slate #2B2F36 on paper #EFE9DC with the pivot in signal red #C0392B, a red tick over the most recent comparison, and monospace readouts for compare count, swap count, pivot value and index, and recursion depth. The right half colors bars by the current rule (by value quartile, by swap age, or by recursion depth) in cobalt, vermilion, ochre, and teal on cream, draws each bar as a slab with a lighter top face and darker side face, leaves fading marks where the last 24 swap events landed, and glows the pivot with flat nested rects. A caption plate names the parameterized element this cycle, for example "PARAMETER: PIVOT WAVE SPEED 0.7". Flat fills throughout, no gradients.

## Timing

Cycle 0 runs 1,175 ops, about 19.6 seconds of sorting plus a 2.5 second sorted hold. Frame one is fixed at t = 4.0 seconds, 240 ops into cycle 0, mid-sort. The animation loop advances a clock from there; the draw is a pure function of that clock, so re-rendering the thumb is byte-identical.

## Asserted counts

96 bars, values 1 through 96 exactly once per cycle. Cycle 0 trace: 1,175 ops, verified by a probe to end with the array fully sorted. Both halves share one trace, so the two renders can never drift apart.

## Deviations

None from the prompt's mechanism. The prompt's "comparison-distance" is realized as pivot distance from the partition edge (edge, middle, far), since the pivot is the element whose position the wave and distance knobs both move; the coloring rule cycles by value, then swap age, then recursion depth, in that order. The pivot glow uses flat nested rects rather than a blur, keeping the no-gradient rule.

## Interaction

Watch only. No input, no click-to-reload. The sort runs continuously and re-shuffles itself.
