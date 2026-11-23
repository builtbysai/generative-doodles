// audio.js - Stage 6: WebAudio engine (kick/bass loop + a note per touch).
//
// Sound is OFF by default: no AudioContext exists until enable() is
// called from a user gesture ("Tap for sound"). All synthesis, no
// samples, no assets.
//
// Touches come from the ball drive's segment data (never hardcoded):
// every internal segment boundary is a hand touch (release if a free
// flight starts there, catch otherwise), plus each bounce segment's
// floor-contact time (tB, in seconds -> beats via the routine BEAT).
// One extra entry: a spin accent at beat 12.0 (kind 'accent'). The
// ball is carried through the whole spin move + around the world
// (control 8.50-15.06), so the spin family has no physical touch in
// this routine - the accent at the spin's completion (beat 12) gives
// the bell timbre its voice. Remove it if the parent disagrees.
//
// Scheduling uses a lookahead scheduler (25 ms tick, 0.1 s lookahead).
// Beat times are converted to AudioContext time fresh on every
// scheduling call from the two live clocks, so no stored offset can
// drift: ctxTime = ctx.currentTime + (perfMs - performance.now())/1000.
//
// Stage 13e: enable() attaches the AudioContext to the beat clock,
// so the animation time is driven by the audio clock (sound and
// motion share one clock). The synth primitives take an explicit
// context + destination, so renderOffline() renders the same sound
// into an OfflineAudioContext for the export.
import { BEAT, ROUTINE_BEATS } from '../stage2/routine.js';

// Move name -> note family. Explicit: every routine move maps to one
// of the four timbres.
export const MOVE_FAMILY = {
  'Control dribble': 'dribble',
  'Retrieval dribble': 'dribble',
  'Crossover': 'crossover',
  'Between the legs': 'crossover',
  'Behind the back': 'crossover',
  'Spin move': 'spin',
  'Around the world': 'spin',
  'Finger spin': 'finger-spin',
};

const FREE_KINDS = new Set(['bounce', 'direct', 'path', 'snatch']);
const TICK_MS = 25;
const LOOKAHEAD_S = 0.1;
const SPIN_ACCENT_BEAT = 12.0;

export function createAudioEngine({ clock, ballDrive, routine }) {
  // ---- touch list (one 24-beat loop) ----
  const touches = [];
  const segs = ballDrive.segs;
  const boundaries = new Set();
  for (const s of segs) {
    if (s.t0 > 0) boundaries.add(s.t0);
    if (s.t1 < ROUTINE_BEATS) boundaries.add(s.t1);
  }
  for (const b of [...boundaries].sort((a, b) => a - b)) {
    const prev = segs.find((s) => s.t1 === b);
    const next = segs.find((s) => s.t0 === b);
    // A free flight starting here means the hand pushes: release.
    // Otherwise the ball arrives: catch (including fingertip placement
    // at 18.50 and the gather at 23.00).
    const kind = next && FREE_KINDS.has(next.kind) ? 'release' : 'catch';
    touches.push({ beat: b, kind });
  }
  for (const s of segs) {
    if (s.kind === 'bounce') touches.push({ beat: s.t0 + s.tB / BEAT, kind: 'bounce' });
  }
  touches.push({ beat: SPIN_ACCENT_BEAT, kind: 'accent' });
  touches.sort((a, b) => a.beat - b.beat);
  for (const t of touches) {
    t.move = routine.moveAt(t.beat).name;
    t.family = MOVE_FAMILY[t.move] || 'dribble';
  }

  // ---- engine state ----
  let ctx = null;
  let master = null;
  let timer = null;
  let muted = false;
  let nextBeat = 0;        // next integer beat to schedule (kick/bass)
  let nextTouchIdx = 0;    // index into sectionTouches, within nextTouchLoop
  let nextTouchLoop = 0;   // which section pass the next touch is in
  // Routine section (Stage 8): the touch stream plays only the touches
  // inside [start, end) and repeats them with that period. The kick/
  // bass follow the absolute beat grid and are unchanged. Default is
  // the full 24-beat loop, which reproduces the Stage 6 behaviour.
  let section = { start: 0, end: ROUTINE_BEATS };
  let sectionTouches = touches;
  const scheduledLog = [];

  // performance.now() ms -> AudioContext seconds, from the live clocks.
  function toCtxTime(perfMs) {
    return ctx.currentTime + (perfMs - performance.now()) / 1000;
  }

  // ---- synthesis primitives (Stage 13e: context + destination are
  // parameters, so the same timbres render live AND offline — the
  // live tick() passes (ctx, master), renderOffline() passes an
  // OfflineAudioContext and its master gain. Identical sound.)
  function env(gain, t, peak, dur) {
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }

  function tone(ac, dest, { type, freq, freqEnd, peak, dur, t, filterFreq }) {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    env(g, t, peak, dur);
    if (filterFreq) {
      const f = ac.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = filterFreq;
      o.connect(f).connect(g);
    } else {
      o.connect(g);
    }
    g.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  function kick(ac, dest, t) {
    tone(ac, dest, { type: 'sine', freq: 120, freqEnd: 40, peak: 0.9, dur: 0.25, t });
  }

  function bass(ac, dest, t) {
    tone(ac, dest, { type: 'sawtooth', freq: 55, peak: 0.25, dur: 0.4, t, filterFreq: 300 });
  }

  // The four touch timbres, one per move family.
  function note(ac, dest, family, t) {
    if (family === 'dribble') tone(ac, dest, { type: 'sine', freq: 90, peak: 0.7, dur: 0.18, t });
    else if (family === 'crossover') tone(ac, dest, { type: 'triangle', freq: 330, peak: 0.5, dur: 0.12, t });
    else if (family === 'spin') {
      tone(ac, dest, { type: 'sine', freq: 520, peak: 0.45, dur: 0.4, t });
      tone(ac, dest, { type: 'sine', freq: 1560, peak: 0.15, dur: 0.4, t });
    } else { // finger-spin: chime
      tone(ac, dest, { type: 'sine', freq: 880, peak: 0.4, dur: 0.5, t });
      tone(ac, dest, { type: 'sine', freq: 4400, peak: 0.08, dur: 0.5, t });
    }
  }

  function tick() {
    if (!ctx || ctx.state !== 'running' || !clock.started) return;
    const horizonPerf = performance.now() + LOOKAHEAD_S * 1000;
    // Kick on every beat; bass on even beats (2-beat pattern).
    while (clock.timeAtBeat(nextBeat) <= horizonPerf) {
      const t = toCtxTime(clock.timeAtBeat(nextBeat));
      if (t > ctx.currentTime) {
        kick(ctx, master, t);
        if (nextBeat % 2 === 0) bass(ctx, master, t);
      }
      nextBeat++;
    }
    // One note per touch, at its beat time. A touch at routine beat L
    // in the section sounds at absolute beats L + k * period (the
    // looped beat maps back to L at exactly those absolutes).
    const period = section.end - section.start;
    while (sectionTouches.length > 0) {
      const touch = sectionTouches[nextTouchIdx];
      const absBeat = nextTouchLoop * period + touch.beat;
      if (clock.timeAtBeat(absBeat) > horizonPerf) break;
      const t = toCtxTime(clock.timeAtBeat(absBeat));
      const marginMs = (t - ctx.currentTime) * 1000;
      if (t > ctx.currentTime) {
        note(ctx, master, touch.family, t);
        scheduledLog.push({
          beat: +absBeat.toFixed(2), family: touch.family,
          scheduledAtCtxTime: +t.toFixed(3), marginMs: +marginMs.toFixed(1),
        });
      }
      nextTouchIdx++;
      if (nextTouchIdx >= sectionTouches.length) {
        nextTouchIdx = 0;
        nextTouchLoop++;
      }
    }
  }

  // ---- lifecycle (standing rule): suspend on hide/blur/close. ----
  function onVisibility() {
    if (!ctx) return;
    if (document.hidden) void suspend();
    else if (!muted) void resume();
  }
  function onBlur() { if (ctx) void suspend(); }
  function onFocus() { if (ctx && !muted) void resume(); }
  function onPageHide() { if (ctx) void suspend(); }

  async function suspend() {
    if (ctx && ctx.state === 'running') {
      // The clock notes the suspend instant so its perf continuation
      // loses nothing (Stage 13e).
      clock.noteAudioSuspended();
      await ctx.suspend();
    }
  }

  async function resume() {
    if (ctx && ctx.state === 'suspended' && !muted) await ctx.resume();
  }

  // Anchor the scheduler at the clock's current beat. The kick anchor
  // (nextBeat) is only reset on a fresh enable: re-anchoring it on a
  // section change would double-schedule a kick already inside the
  // lookahead. The touch stream re-anchors either way (a touch already
  // inside the lookahead may sound once at +6 dB on a section change;
  // the window is 100 ms and touches are >= 50 ms apart, so at most
  // one note is affected).
  function anchorScheduler(anchorKicks) {
    const now = clock.beatAt(performance.now());
    const period = section.end - section.start;
    if (anchorKicks) nextBeat = Math.ceil(now);
    nextTouchLoop = Math.floor((now - section.start) / period);
    nextTouchIdx = sectionTouches.findIndex(
      (t) => nextTouchLoop * period + t.beat >= now);
    if (nextTouchIdx === -1) { nextTouchIdx = 0; nextTouchLoop++; }
  }

  // Switch the routine section (Stage 8). Filters the touch stream to
  // [start, end) and re-anchors it if the engine is running; the
  // kick/bass grid is untouched.
  function setSection(next) {
    section = { start: next.start, end: next.end };
    sectionTouches = touches.filter(
      (t) => t.beat >= section.start && t.beat < section.end);
    if (ctx) anchorScheduler(false);
  }

  async function enable() {
    if (ctx) { await resume(); return; }
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.8;
    master.connect(ctx.destination);
    // Stage 13e: the audio clock drives the animation from here on.
    clock.attachAudio(ctx);
    anchorScheduler(true);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    window.addEventListener('pagehide', onPageHide);
    timer = setInterval(tick, TICK_MS);
    await ctx.resume();
  }

  function setMuted(m) {
    muted = !!m;
    if (master) master.gain.value = muted ? 0 : 0.8;
    if (muted) void suspend();
    else void resume();
  }

  async function disable() {
    if (timer) { clearInterval(timer); timer = null; }
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('blur', onBlur);
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('pagehide', onPageHide);
    if (ctx) { await ctx.close().catch(() => {}); ctx = null; master = null; }
    clock.detachAudio();
  }

  // ---- offline render (Stage 13e: for the export) ----
  // Render the same sound the live engine would play over the beat
  // range [startBeat, startBeat + beats), deterministically, into an
  // OfflineAudioContext: kick on every beat, bass on even beats, one
  // note per touch in the current section (repeated with the section
  // period, exactly like the live scheduler). Returns the rendered
  // AudioBuffer. A 50 ms fade-out at the end avoids a click at the
  // cut; the live engine has no fade because it never cuts.
  async function renderOffline({ startBeat, beats, bpm, sampleRate = 48000 }) {
    const seconds = beats * (60 / bpm);
    const ac = new OfflineAudioContext(2, Math.ceil(seconds * sampleRate), sampleRate);
    const dest = ac.createGain();
    dest.gain.value = 0.8;
    dest.connect(ac.destination);
    dest.gain.setValueAtTime(0.8, Math.max(0, seconds - 0.05));
    dest.gain.linearRampToValueAtTime(0.0001, seconds);
    const spb = 60 / bpm;
    const tOf = (absBeat) => (absBeat - startBeat) * spb;
    for (let b = Math.ceil(startBeat); b < startBeat + beats; b++) {
      const t = tOf(b);
      kick(ac, dest, t);
      if (b % 2 === 0) bass(ac, dest, t);
    }
    const period = section.end - section.start;
    for (let L = Math.floor((startBeat - section.start) / period); ; L++) {
      if (L * period + section.start >= startBeat + beats) break;
      for (const touch of sectionTouches) {
        const abs = L * period + touch.beat;
        if (abs >= startBeat && abs < startBeat + beats) {
          note(ac, dest, touch.family, tOf(abs));
        }
      }
    }
    return ac.startRendering();
  }

  return {
    enable,
    disable,
    get enabled() { return ctx !== null; },
    get state() { return ctx ? ctx.state : 'none'; },
    // Read-only probe for the drift measurement (measure-6): the live
    // AudioContext clock, or null before enable(). No behaviour change.
    get ctxTime() { return ctx ? ctx.currentTime : null; },
    get muted() { return muted; },
    setMuted,
    suspend,
    resume,
    get touches() { return sectionTouches; },
    get section() { return { ...section }; },
    setSection,
    renderOffline,
    get scheduledLog() { return scheduledLog; },
  };
}
