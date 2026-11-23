// beat-clock.js - Stage 6: master beat clock for the piece.
// (Stage 13e: the audio clock is the timebase when attached.)
//
// One timebase, one absolute beat that never wraps. The routine
// (24-beat loop), the street cycle (16 beats), the camera cuts, and
// the paint wipe all derive their beat from this clock, so a tempo
// change re-times everything together with no reload and no drift.
//
// TIMEBASE. By default the timebase is performance.now(). When an
// AudioContext is attached (audio.enable() does this), the timebase
// is the audio clock: the beat is derived from ctx.currentTime, so
// sound and motion share one clock and can never drift apart. The
// public API stays in performance.now() milliseconds (every caller
// passes perf timestamps): beatAt/timeAtBeat convert through the
// live audio<->perf offset, measured fresh on every call, so no
// stored offset can go stale.
//
// TRANSITIONS re-anchor, so the beat never jumps:
// - attach/detach: re-anchor at the current beat on the new timebase.
// - suspend: the audio clock freezes; the beat continues on a
//   performance.now() continuation from the freeze point (the piece
//   keeps playing while muted).
// - resume: the drift resync - re-anchor at the continued beat on
//   the audio clock, which takes over again from exactly where the
//   continuation left it.
//
// Tempo changes re-anchor: beats elapsed are preserved, only the rate
// changes, so the beat never jumps.

export const MIN_BPM = 60;
export const MAX_BPM = 180;
export const DEFAULT_BPM = 144;

export function createBeatClock({ bpm = DEFAULT_BPM } = {}) {
  let rate = Math.min(MAX_BPM, Math.max(MIN_BPM, bpm));
  let anchorBeat = 0;  // beat at anchorSec
  let anchorSec = 0;   // seconds, in the ACTIVE timebase's domain
  let started = false;

  // Audio timebase (null = performance.now()).
  let audioCtx = null;
  let prevCtxState = null;   // 'running' | 'suspended' | null
  let freezeAudioSec = 0;    // ctx.currentTime at the freeze
  let freezePerfMs = 0;      // performance.now() at the freeze

  const secPerBeat = () => 60 / rate;

  // Live audio<->perf offset in seconds (audioSec - perfSec),
  // measured fresh on every call. Also runs the suspend/resume
  // transition handling: on resume, the drift resync re-anchors at
  // the continued beat on the audio clock. While the audio clock is
  // suspended the offset is frozen at the freeze point, so perf
  // timestamps map to the continued audio time.
  function syncOffset() {
    if (!audioCtx) return 0;
    const state = audioCtx.state;
    if (state === 'running') {
      if (prevCtxState === 'suspended') {
        // Drift resync: the audio clock is running again after a
        // suspension. Preserve the beat the perf continuation
        // reached, and re-anchor on the audio clock from there.
        const continuedSec = freezeAudioSec + (performance.now() - freezePerfMs) / 1000;
        if (started) anchorBeat += (continuedSec - anchorSec) / secPerBeat();
        anchorSec = audioCtx.currentTime;
      }
      prevCtxState = 'running';
      return audioCtx.currentTime - performance.now() / 1000;
    }
    // Suspended (or closed): capture the freeze point once, then
    // hold the offset fixed so the beat continues on perf time.
    if (prevCtxState !== 'suspended') {
      freezeAudioSec = audioCtx.currentTime;
      freezePerfMs = performance.now();
      prevCtxState = 'suspended';
    }
    return freezeAudioSec - freezePerfMs / 1000;
  }

  function start(nowMs = performance.now()) {
    anchorBeat = 0;
    anchorSec = nowMs / 1000 + syncOffset();
    started = true;
  }

  function stop(nowMs = performance.now()) {
    // Freeze the beat at the stop instant (beatAt returns anchorBeat
    // while stopped, so the anchor must BE the current beat).
    if (started) anchorBeat = beatAt(nowMs);
    started = false;
  }

  // Resume after stop(): continue from the frozen beat (start()
  // would reset to beat 0). Used by the offline export, which
  // pauses the piece while it renders so the live beat does not
  // jump ahead by the export's wall duration.
  function resume(nowMs = performance.now()) {
    anchorSec = nowMs / 1000 + syncOffset();
    started = true;
  }

  function setBpm(next, nowMs = performance.now()) {
    next = Math.min(MAX_BPM, Math.max(MIN_BPM, next));
    if (started) {
      // Re-anchor at the current beat: elapsed beats are preserved,
      // the rate changes from here on. No jump, no drift. The offset
      // is measured once for both the beat and the anchor, so the
      // two cannot disagree by the offset's jitter.
      const t = nowMs / 1000 + syncOffset();
      anchorBeat = anchorBeat + (t - anchorSec) / secPerBeat();
      anchorSec = t;
    }
    rate = next;
  }

  // Jump the piece to a beat (Stage 8 move selection): re-anchor at
  // the given absolute beat, preserving the rate. Before start() the
  // anchor is stored (beatAt returns it); start() resets to 0, so
  // jumps belong after start.
  function setBeat(beat, nowMs = performance.now()) {
    anchorBeat = beat;
    anchorSec = nowMs / 1000 + syncOffset();
  }

  // Absolute beat at a performance.now() timestamp (0 before start).
  function beatAt(nowMs) {
    if (!started) return anchorBeat;
    const t = nowMs / 1000 + syncOffset();
    return anchorBeat + (t - anchorSec) / secPerBeat();
  }

  // Absolute beat right now, from the active timebase.
  function beatNow() {
    if (!started) return anchorBeat;
    return beatAt(performance.now());
  }

  // performance.now() timestamp (ms) at which a beat falls.
  function timeAtBeat(beat) {
    const t = anchorSec + (beat - anchorBeat) * secPerBeat();
    return (t - syncOffset()) * 1000;
  }

  // Attach an AudioContext as the timebase: the beat is derived from
  // ctx.currentTime from here on. Re-anchors at the current beat, so
  // the beat never jumps. Pass null (or detachAudio()) to go back to
  // performance.now().
  function attachAudio(ctx) {
    if (audioCtx === ctx) return;
    const beat = started ? beatNow() : anchorBeat;
    audioCtx = ctx;
    prevCtxState = null;
    anchorBeat = beat;
    anchorSec = ctx ? ctx.currentTime : performance.now() / 1000;
  }

  function detachAudio() { attachAudio(null); }

  // The audio engine calls this synchronously when it initiates a
  // suspend (mute, hide, blur): the freeze point is captured at the
  // suspend instant, so the perf continuation loses nothing. Without
  // the note, the freeze is captured on the next clock read instead
  // (a stall of at most one frame, never a jump).
  function noteAudioSuspended() {
    if (!audioCtx) return;
    freezeAudioSec = audioCtx.currentTime;
    freezePerfMs = performance.now();
    prevCtxState = 'suspended';
  }

  return {
    get bpm() { return rate; },
    setBpm,
    setBeat,
    beatAt,
    beatNow,
    timeAtBeat,
    start,
    stop,
    resume,
    attachAudio,
    detachAudio,
    noteAudioSuspended,
    get started() { return started; },
    get audioAttached() { return audioCtx !== null; },
  };
}
