// export.js - Stage 8 (Stage 13e: offline export).
//
// OFFLINE: the export steps the animation frame by frame at a fixed
// timestep (no real-time dependency), encodes with WebCodecs
// VideoEncoder + Mp4Muxer, and renders the audio offline
// (OfflineAudioContext) and muxes it in. The live MediaRecorder
// path is gone: it recorded wall time, dropped frames under load,
// and stalled headless (see stage12/VERIFY-12.md).
//
// The piece pauses during the export (the clock is stopped and
// resumed around the render) so the live beat does not jump ahead
// by the export's wall duration. The export starts from the live
// beat and covers exactly `seconds` of routine time, video and
// audio from the same beat range.
//
// Codec preference: H.264 High first, then Main, then VP9, then
// AV1. Audio: AAC first, then Opus (AAC encoding is unavailable in
// headless Chromium, so headless exports carry Opus). The chosen
// codecs are reported in the result; the file is always .mp4.
//
// NOTE for the integrator: exportClip resizes the RENDERER to the
// export size but does not touch the camera - if the export aspect
// differs from the window's, update the camera aspect before calling
// exportClip (and restore it after) or the frames will be stretched.

import { Muxer, ArrayBufferTarget } from './vendor/mp4-muxer.mjs';

const VIDEO_CODECS = [
  'avc1.640033', // H.264 High, level 5.1
  'avc1.4d0033', // H.264 Main
  'avc1.640028', // H.264 High, level 4.0
  'vp09.00.10.08',
  'av01.0.05M.08',
];
const AUDIO_CODECS = ['mp4a.40.2', 'opus'];
const FPS = 30;
const VIDEO_BITRATE = 16_000_000;
const AUDIO_BITRATE = 128_000;
const SAMPLE_RATE = 48000;
const KEYFRAME_EVERY_S = 2;

function muxerVideoCodec(codec) {
  if (codec.startsWith('avc1')) return 'avc';
  if (codec.startsWith('vp09')) return 'vp9';
  if (codec.startsWith('av01')) return 'av1';
  return null;
}
function muxerAudioCodec(codec) {
  if (codec === 'mp4a.40.2') return 'aac';
  if (codec === 'opus') return 'opus';
  return null;
}

async function pickVideoCodec(width, height) {
  if (typeof VideoEncoder === 'undefined') return null;
  for (const codec of VIDEO_CODECS) {
    try {
      const r = await VideoEncoder.isConfigSupported({
        codec, width, height, bitrate: VIDEO_BITRATE, framerate: FPS,
      });
      if (r.supported) return codec;
    } catch (e) { /* try the next codec */ }
  }
  return null;
}

async function pickAudioCodec() {
  if (typeof AudioEncoder === 'undefined') return null;
  for (const codec of AUDIO_CODECS) {
    try {
      const r = await AudioEncoder.isConfigSupported({
        codec, sampleRate: SAMPLE_RATE, numberOfChannels: 2, bitrate: AUDIO_BITRATE,
      });
      if (r.supported) return codec;
    } catch (e) { /* try the next codec */ }
  }
  return null;
}

export function createExporter({ renderer, clock, renderFrame, audio }) {
  const canvas = renderer.domElement;
  const isSupported = typeof VideoEncoder !== 'undefined'
    && typeof VideoFrame !== 'undefined'
    && typeof window.OfflineAudioContext !== 'undefined';
  const mimeType = 'video/mp4';
  let lastCodec = null;
  let lastAudioCodec = null;

  // Render `seconds` of the piece offline at width x height, from
  // the live beat. Resolves to { blob, mimeType, durationMs, frames,
  // codec, audioCodec } (frames is a real count now, and audioCodec
  // is null when no audio encoder was available). Rejects with a
  // clear Error when encoding is unsupported or the render fails;
  // never resolves with an empty file.
  async function exportClip({ seconds = 30, width = 1920, height = 1080,
    onProgress } = {}) {
    if (!isSupported) {
      throw new Error('export not supported in this browser '
        + '(WebCodecs VideoEncoder unavailable)');
    }
    if (!(seconds > 0)) throw new Error('export seconds must be > 0');
    if (typeof renderFrame !== 'function') {
      throw new Error('exporter needs renderFrame to step the animation');
    }

    // The export covers exactly `seconds` of routine time from the
    // live beat, video and audio from the same beat range.
    const startBeat = clock.beatNow();
    const bpm = clock.bpm;
    const frames = Math.round(seconds * FPS);
    const beatsPerFrame = (bpm / 60) / FPS;
    const totalBeats = frames * beatsPerFrame;

    // Remember the renderer's size + pixel ratio; restore both in a
    // finally so a failed export never leaves the piece resized.
    const prevRatio = renderer.getPixelRatio();
    const prevW = canvas.width / prevRatio;
    const prevH = canvas.height / prevRatio;
    const wasStarted = clock.started;

    let muxer = null;
    let venc = null;
    let aenc = null;
    let vencError = null;
    let aencError = null;
    let videoCodec = null;
    let audioCodec = null;
    // Pause the live piece FIRST, before the codec probing and the
    // resize: both can take seconds on a slow rasterizer, and the
    // beat must not jump ahead by the export's wall duration. The
    // finally resumes the clock, so a failed export still unpauses.
    if (wasStarted) clock.stop();
    try {
      videoCodec = await pickVideoCodec(width, height);
      if (!videoCodec) {
        throw new Error('no supported video codec (tried H.264, VP9, AV1)');
      }
      audioCodec = await pickAudioCodec(); // null = video-only

      // The export is exactly width x height: force pixel ratio 1,
      // or a high-DPR device records at 2x (3840x2160 for a 1080p
      // export). Restored in the finally.
      renderer.setPixelRatio(1);
      renderer.setSize(width, height);

      muxer = new Muxer({
        target: new ArrayBufferTarget(),
        video: { codec: muxerVideoCodec(videoCodec), width, height },
        ...(audioCodec ? {
          audio: { codec: muxerAudioCodec(audioCodec),
                   sampleRate: SAMPLE_RATE, numberOfChannels: 2 },
        } : {}),
        fastStart: 'in-memory',
      });

      // Video: step the animation frame by frame at a fixed
      // timestep. Each frame is rendered and captured synchronously
      // in the same task, so the live loop (which skips rendering
      // while exporting) cannot interleave a different frame.
      const t0 = performance.now();
      venc = new VideoEncoder({
        output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
        error: (e) => { vencError = e; },
      });
      venc.configure({
        codec: videoCodec, width, height,
        bitrate: VIDEO_BITRATE, framerate: FPS,
      });
      for (let i = 0; i < frames; i++) {
        renderFrame(startBeat + i * beatsPerFrame, true);
        const vf = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / FPS) });
        venc.encode(vf, { keyFrame: i % (FPS * KEYFRAME_EVERY_S) === 0 });
        vf.close();
        // Backpressure: keep the encode queue bounded.
        if (venc.encodeQueueSize > 24) await venc.flush();
        if (typeof onProgress === 'function' && i % FPS === 0) onProgress(i / FPS);
        // Yield to the event loop occasionally so the progress text
        // repaints and the page stays responsive.
        if (i % 60 === 0) await new Promise((r) => setTimeout(r, 0));
      }
      await venc.flush();
      if (vencError) throw new Error('VideoEncoder error: ' + vencError.message);
      venc.close();

      // Audio: render the same beat range offline, encode, mux.
      if (audioCodec && audio && typeof audio.renderOffline === 'function') {
        const buffer = await audio.renderOffline({
          startBeat, beats: totalBeats, bpm, sampleRate: SAMPLE_RATE,
        });
        aenc = new AudioEncoder({
          output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
          error: (e) => { aencError = e; },
        });
        aenc.configure({
          codec: audioCodec, sampleRate: SAMPLE_RATE,
          numberOfChannels: 2, bitrate: AUDIO_BITRATE,
        });
        const FRAMES_PER_CHUNK = 4096;
        const ch0 = buffer.getChannelData(0);
        const ch1 = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : ch0;
        for (let off = 0; off < buffer.length; off += FRAMES_PER_CHUNK) {
          const n = Math.min(FRAMES_PER_CHUNK, buffer.length - off);
          const data = new Float32Array(n * 2);
          data.set(ch0.subarray(off, off + n), 0);
          data.set(ch1.subarray(off, off + n), n);
          const ad = new AudioData({
            format: 'f32-planar', sampleRate: SAMPLE_RATE,
            numberOfFrames: n, numberOfChannels: 2,
            timestamp: Math.round(off * 1e6 / SAMPLE_RATE), data,
          });
          aenc.encode(ad);
          ad.close();
        }
        await aenc.flush();
        if (aencError) throw new Error('AudioEncoder error: ' + aencError.message);
        aenc.close();
      }

      muxer.finalize();
      const durationMs = Math.round(performance.now() - t0);
      const blob = new Blob([muxer.target.buffer], { type: mimeType });
      if (blob.size === 0) {
        throw new Error('export produced an empty file (0 bytes)');
      }
      lastCodec = videoCodec;
      lastAudioCodec = audioCodec;
      return { blob, mimeType, durationMs, frames, codec: videoCodec, audioCodec };
    } finally {
      if (venc && venc.state !== 'closed') { try { venc.close(); } catch (e) { /* already closed */ } }
      if (aenc && aenc.state !== 'closed') { try { aenc.close(); } catch (e) { /* already closed */ } }
      renderer.setPixelRatio(prevRatio);
      renderer.setSize(prevW, prevH);
      if (wasStarted) clock.resume();
    }
  }

  return {
    exportClip,
    mimeType,
    isSupported,
    get codec() { return lastCodec; },
    get audioCodec() { return lastAudioCodec; },
  };
}
