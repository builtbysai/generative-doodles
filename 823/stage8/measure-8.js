// measure-8.js — Stage 8 verification suite (settings + export).
//
// - controlChecklist(): every control, one by one — set a non-default
//   value, verify the effect on the live stack, restore the default.
//   Also verifies the routine does NOT restart on a re-skin (the
//   clock's beat stays continuous across a settings change).
// - reskinTiming(): a stroke-size change applies within 1 frame
//   (synchronous in set(); verified by checking the texture identity
//   immediately after set(), before the next frame).
// - presetRoundTrip(): save -> change everything -> load -> deep-equal.
// - formatLayout(): for each format, the canvas + panel fit the
//   viewport with no horizontal overflow.
// - exportCheck(): the full 30 s export at 1920x1080 with a
//   distinctive palette (candy + crimson kit), then decode the file
//   in-page (video element + canvas sampling) and check the frames
//   carry the palette. Runs ~35 s; call it last.

import { savePreset, loadPreset } from './presets.js';

export function installMeasure8(ctx) {
  const { THREE, player, routine, ballDrive, sceneManager, clock, audio,
    settings, exporter, heroMesh, heroHull, ballHull, halftone, renderer,
    scene, camera, sun, hemi, renderFrame, applyFormat, onExport } = ctx;

  const results = [];
  function check(name, ok, detail) {
    results.push({ name, ok: !!ok, detail: detail || '' });
    return !!ok;
  }

  // Sample the jersey colour: the first torso vertex above the
  // jersey/shorts split (TORSO_JERSEY_Y = 1.13). The part ranges are
  // named by part (torso, pelvis, ...), not by kit piece.
  function jerseyColor() {
    const attr = heroMesh.geometry.getAttribute('color');
    const pos = heroMesh.geometry.getAttribute('position');
    const [start, count] = player.partRanges.torso;
    for (let i = start; i < start + count; i++) {
      if (pos.getY(i) >= 1.13) {
        return [attr.getX(i), attr.getY(i), attr.getZ(i)].map((v) => +v.toFixed(3));
      }
    }
    return null;
  }

  function controlChecklist() {
    return (async () => {
    const before = settings.get();
    const beat0 = clock.beatAt(performance.now());

    // 1. stroke size: the brush texture object changes.
    const tex0 = heroMesh.material.map;
    settings.set({ strokeSize: 1.5 });
    check('strokeSize re-skins', heroMesh.material.map !== tex0, 'texture identity changed');
    settings.set({ strokeSize: 1.0 });

    // 2. density: the brush texture object changes.
    const tex1 = heroMesh.material.map;
    settings.set({ density: 0.5 });
    check('density re-skins', heroMesh.material.map !== tex1, 'texture identity changed');
    settings.set({ density: 1.0 });

    // 3. disorder: the erosion uniform changes (mirrored mapping).
    settings.set({ disorder: 0.2 });
    const uErode = heroHull.material.userData.uErode.value;
    check('disorder sets uErode', Math.abs(uErode - 1.36) < 0.01, `uErode ${uErode.toFixed(2)} (expect 1.36)`);
    settings.set({ disorder: 0.78 });

    // 4. tempo: the clock rate changes.
    settings.set({ tempo: 100 });
    check('tempo sets bpm', clock.bpm === 100, `bpm ${clock.bpm}`);
    settings.set({ tempo: 144 });

    // 5. kit: the jersey vertices change colour.
    const c0 = jerseyColor();
    settings.set({ kit: 'crimson' });
    const c1 = jerseyColor();
    check('kit recolours', JSON.stringify(c0) !== JSON.stringify(c1), `jersey ${c0} -> ${c1}`);
    settings.set({ kit: 'teal' });

    // 5b. kit: the stroke mesh rebuilds with the new kit colours
    // (stale strokes were the open 13c limitation). Crimson jersey
    // #991b1b is ~linear (0.32, 0.01, 0.01); strokes carry it with
    // 0.9-1.1 jitter and a 0.72 dark factor on 15%.
    const sm0 = player.group.getObjectByName('strokeMesh');
    settings.set({ kit: 'crimson' });
    const sm1 = player.group.getObjectByName('strokeMesh');
    let crimsonVerts = 0;
    const ac = sm1.geometry.getAttribute('aColor');
    for (let i = 0; i < ac.count; i++) {
      const r = ac.getX(i), g = ac.getY(i), b = ac.getZ(i);
      if (r > 0.2 && r < 0.42 && g < 0.05 && b < 0.05) crimsonVerts++;
    }
    check('kit rebuilds strokes', sm1 !== sm0 && crimsonVerts > 100,
      `mesh ${sm1 !== sm0 ? 'rebuilt' : 'same'}, ${crimsonVerts} crimson verts`);
    settings.set({ kit: 'teal' });

    // 6. ball: the ball texture object changes.
    const ballTex0 = player.ball.material.map;
    settings.set({ ball: 'pink' });
    check('ball recolours', player.ball.material.map !== ballTex0, 'ball texture identity changed');
    settings.set({ ball: 'orange' });

    // 7. palette: paper + ink change.
    settings.set({ palette: 'noir' });
    check('palette sets paper', sceneManager.paper === 0xe8e8e8, `paper 0x${sceneManager.paper.toString(16)}`);
    check('palette sets ink', heroHull.material.color.getHex() === 0x000000, 'hull ink #000000');
    settings.set({ palette: 'golden' });

    // 8. camera mode: the camera moves (director -> fixed is a jump).
    renderFrame(clock.beatAt(performance.now()), false);
    const posDir = camera.position.clone();
    settings.set({ cameraMode: 'fixed' });
    renderFrame(clock.beatAt(performance.now()), false);
    const posFixed = camera.position.clone();
    check('cameraMode fixed moves camera', posFixed.distanceTo(posDir) > 0.1,
      `moved ${posFixed.distanceTo(posDir).toFixed(2)} m`);
    check('cameraMode fixed pose', Math.abs(posFixed.x) < 0.01 && Math.abs(posFixed.z - 6) < 0.01,
      `(${posFixed.x.toFixed(2)}, ${posFixed.y.toFixed(2)}, ${posFixed.z.toFixed(2)})`);
    settings.set({ cameraMode: 'tracking' });
    renderFrame(clock.beatAt(performance.now()), false);
    const posTrack = camera.position.clone();
    check('cameraMode tracking moves camera', posTrack.distanceTo(posFixed) > 0.1,
      `moved ${posTrack.distanceTo(posFixed).toFixed(2)} m`);
    settings.set({ cameraMode: 'director' });

    // 9. lighting: the sun changes (applyLighting runs per frame; call
    // it directly here to observe the effect without a render).
    settings.set({ lighting: 'dusk' });
    settings.applyLighting();
    check('lighting sets sun', sun.color.getHex() === 0xff8a5c && Math.abs(sun.intensity - 1.6) < 0.01,
      `sun 0x${sun.color.getHex().toString(16)} / ${sun.intensity}`);
    settings.set({ lighting: 'auto' });

    // 10. move: the clock jumps to the move's start.
    settings.set({ move: 'Finger spin' });
    const beatAfterJump = clock.beatAt(performance.now());
    check('move jumps clock', Math.abs(beatAfterJump - 18) < 0.5, `beat ${beatAfterJump.toFixed(2)} (expect ~18)`);
    check('move trigger consumed', settings.get().move === 'full', `stored '${settings.get().move}'`);

    // 11. routine: the audio touches filter to the section.
    settings.set({ routine: 'finger' });
    const touches = audio.touches.map((t) => t.beat);
    check('routine filters touches', touches.length === 4 && touches.every((b) => b >= 18 && b < 24),
      `${touches.length} touches [${touches.join(', ')}]`);
    settings.set({ routine: 'full' });

    // 12. format: the renderer resizes.
    const size0 = { w: renderer.domElement.width, h: renderer.domElement.height };
    settings.set({ format: '9:16' });
    const size1 = { w: renderer.domElement.width, h: renderer.domElement.height };
    check('format resizes', size1.w !== size0.w || size1.h !== size0.h,
      `${size0.w}x${size0.h} -> ${size1.w}x${size1.h}`);
    settings.set({ format: '16:9' });

    // 13. sound: turn it on (enables the engine), then off (mutes).
    // The stored default is already false, so setting false alone is
    // a no-op (set() skips unchanged keys) — the on-then-off sequence
    // is the real test.
    settings.set({ sound: true });
    await new Promise((r) => setTimeout(r, 300));
    const enabledAfterOn = audio.enabled;
    settings.set({ sound: false });
    check('sound on enables', enabledAfterOn === true, `enabled ${enabledAfterOn}`);
    check('sound off mutes', audio.muted === true, `muted ${audio.muted}`);

    // 14. The routine did not restart: the clock's beat advanced by
    // the wall time, not reset. (The move jump above moved it to 18;
    // measure continuity from there.)
    const beatA = clock.beatAt(performance.now());
    settings.set({ strokeSize: 1.2 });
    settings.set({ strokeSize: 1.0 });
    const beatB = clock.beatAt(performance.now());
    check('re-skin does not restart routine', beatB >= beatA && beatB - beatA < 0.5,
      `beat ${beatA.toFixed(2)} -> ${beatB.toFixed(2)}`);

    // Defaults restored?
    const after = settings.get();
    const defaultsOk = JSON.stringify(after) === JSON.stringify(before);
    check('defaults restored', defaultsOk, defaultsOk ? '' : JSON.stringify(after));
    return { checks: results, passed: results.filter((r) => r.ok).length, total: results.length };
    })();
  }

  function reskinTiming() {
    // set() applies synchronously: the texture identity changes in the
    // same call, before any frame renders. (1 frame = 16.7 ms; the
    // change lands in <1 ms.)
    const t0 = performance.now();
    const tex0 = heroMesh.material.map;
    settings.set({ strokeSize: 1.8 });
    const changed = heroMesh.material.map !== tex0;
    const ms = performance.now() - t0;
    settings.set({ strokeSize: 1.0 });
    return { changedSynchronously: changed, applyMs: +ms.toFixed(2) };
  }

  function presetRoundTrip() {
    const original = settings.get();
    const saved = savePreset(settings);
    // Change everything, then load back.
    settings.set({
      strokeSize: 1.5, density: 0.5, disorder: 0.2, tempo: 100,
      kit: 'crimson', ball: 'pink', palette: 'candy',
      cameraMode: 'fixed', lighting: 'night', routine: 'spin', format: '1:1',
    });
    const res = loadPreset(saved, settings);
    const restored = settings.get();
    return {
      ok: res.ok,
      identical: JSON.stringify(restored) === JSON.stringify(original),
      applied: res.applied,
    };
  }

  function formatLayout() {
    const out = {};
    const scrollW = document.documentElement.scrollWidth;
    const viewW = window.innerWidth;
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    out.viewportW = viewW;
    out.scrollWidth = scrollW;
    out.noHorizontalOverflow = scrollW <= viewW + 1;
    out.canvasFits = rect.right <= viewW + 1 && rect.bottom <= window.innerHeight + 1;
    out.canvasSize = [Math.round(rect.width), Math.round(rect.height)];
    out.format = settings.get().format;
    return out;
  }

  // The full export check: 30 s at 1920x1080 with a distinctive
  // palette (candy paper + crimson kit), then decode the file in-page
  // and sample frames for the palette. Restores defaults after.
  //
  // Stage 13e: the export starts from a FIXED beat (0), not the live
  // beat. The crimson probe is street-lighting-dependent: on the
  // coney-island street (dim blue night light, sun 1.2) the red
  // jersey renders nearly black and NO loop beat carries crimson
  // (0–45 px at exportCheck scale — see stage13/VERIFY-13e.md §7),
  // and the dumbo/soho streets are marginal at several beats. From a
  // random live start beat the three samples are a lottery (the
  // first 13e run failed 659/17/3 with two samples on dim streets).
  // From beat 0 the samples land on known-good combos (t=2: street
  // 0 loop 4.8; t=15: street 2 loop 12; t=28: street 0 loop 19.2),
  // so the check tests the export, not the clock. The export code
  // itself is start-beat-agnostic (it steps from wherever it starts).
  async function exportCheck() {
    settings.set({ palette: 'candy', kit: 'crimson' });
    clock.setBeat(0);
    renderFrame(0, true);
    const { blob, mimeType, durationMs } = await onExport();
    settings.set({ palette: 'golden', kit: 'teal' });
    // Decode: load the blob into a video element, seek to 3 times,
    // draw to canvas, sample the paper colour at the frame's top.
    const url = URL.createObjectURL(blob);
    const video = document.createElement('video');
    video.muted = true;
    video.src = url;
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = resolve;
      video.onerror = () => reject(new Error('video decode failed'));
    });
    const cv = document.createElement('canvas');
    cv.width = 480; cv.height = 270;
    const g = cv.getContext('2d');
    // The kit probe: count CRIMSON pixels (the crimson jersey
    // #991b1b = R 153, G 27, B 27). The default teal kit has no
    // crimson; the orange ball (G 114) and the gold sky (G high)
    // do not match the test (R > 120, G < 80, B < 80), so any
    // crimson in the frames proves the export carries the settings.
    // (The first version sampled the paper at the frame's top — wrong
    // probe: the top of the frame is SKY, not paper, and the paper
    // only shows at the wipe's edges early in a street.)
    const samples = [];
    for (const t of [2, 15, 28]) {
      video.currentTime = Math.min(t, video.duration - 0.1);
      await new Promise((r) => { video.onseeked = r; });
      g.drawImage(video, 0, 0, 480, 270);
      const d = g.getImageData(0, 0, 480, 270).data;
      let crimson = 0;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 120 && d[i + 1] < 80 && d[i + 2] < 80) crimson++;
      }
      samples.push({ t, crimsonPx: crimson, crimsonPct: +(100 * crimson / (480 * 270)).toFixed(2) });
    }
    URL.revokeObjectURL(url);
    // Majority, not all three: the finger-spin close-ups (beats 18-22,
    // ballTarget) frame the ball on the fingertip, not the torso, so a
    // sample landing in one legitimately has no crimson. Two of three
    // with crimson proves the export carries the settings.
    const carrying = samples.filter((s) => s.crimsonPx > 100).length;
    return {
      blobBytes: blob.size,
      mimeType,
      durationMs,
      videoDurationS: +video.duration.toFixed(1),
      videoSize: [video.videoWidth, video.videoHeight],
      samples,
      framesCarryPalette: carrying >= 2,
    };
  }

  return { controlChecklist, reskinTiming, presetRoundTrip, formatLayout, exportCheck };
}
