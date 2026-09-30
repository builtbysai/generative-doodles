# №8964 · Fusion Threshold — process notes

## Seed
264 "Fusion Threshold" (from the CANON's attack-density arch: 88 attacks/s,
then fusion into a band).

## Concept
An accelerating dot field that deliberately crosses the point where discrete
marks fuse into continuous tone. Marks are emitted at an exponentially growing
rate (1.5 marks/s doubling on a 1.16^t curve); persistence trails do the
fusing. The piece watches for the phase change, flips a red FUSED tag, stamps
the measured rate, and keeps a three-entry history of past fusions. The cycle
ends deliberately past fusion, holding the solid band before re-seeding.

## Technique
Raw canvas 2D with 'lighter' compositing and a 0.10-alpha fade rect per frame
(the fuser). Fractional emitter accumulator for exact rates. Dots carry seeded
smooth-noise vertical jitter. Zero DOM animation; the meter is a plain readout.
Click re-seeds palette and jitter.
