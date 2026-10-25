'use strict';
// Optional integration QA: install Playwright in the execution environment.
// Serve the repo, or set BASE_URL to the deployed 9108/ URL.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const expectedScripts = [...fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  .matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const base = process.env.BASE_URL || 'http://127.0.0.1:8000/9108/';

// Instrument browser APIs before the artwork starts; no production debug HUD
// or mutable global state is needed in the shipped page.
function instrument() {
  window.qa = { frames: 0, audioStarts: 0 };
  const arc = CanvasRenderingContext2D.prototype.arc;
  CanvasRenderingContext2D.prototype.arc = function (x, y, r, ...args) {
    if (r === 14) {
      const m = this.getTransform(), dpr = Math.min(2, devicePixelRatio || 1);
      qa.ballPixel = { x: (m.a*x+m.c*y+m.e)/dpr, y: (m.b*x+m.d*y+m.f)/dpr };
    }
    return arc.call(this, x, y, r, ...args);
  };
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = fn => raf.call(window, t => { qa.frames++; fn(t); });
  const AC = window.AudioContext;
  window.AudioContext = function (...args) {
    const ac = new AC(...args);
    qa.audio = ac;
    const create = ac.createOscillator.bind(ac);
    ac.createOscillator = () => {
      const o = create(), start = o.start.bind(o);
      o.start = (...a) => { qa.audioStarts++; return start(...a); };
      return o;
    };
    return ac;
  };
  Object.defineProperty(window, 'SIM9108', {
    configurable: true,
    set(v) {
      const build = v.buildEndless;
      v.buildEndless = (...args) => { const w = build(...args); qa.world = w; return w; };
      Object.defineProperty(window, 'SIM9108', { value: v });
    }
  });
}

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
    headless: true, args: ['--no-sandbox']
  });
  try {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({
        viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
        deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile
      });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(instrument);
      await page.goto(base + '?seed=7');
      if (process.env.VERIFY_SOURCE === '1') {
        assert.deepEqual(await page.evaluate(() => Array.from(document.scripts, s => s.textContent)),
          expectedScripts, 'browser received the exact local inline modules');
      }
      await page.waitForTimeout(1000);
      assert.equal(await page.evaluate(() => qa.audioStarts), 0, 'gesture-gated audio');
      await page.locator('#sound').click();
      await page.waitForTimeout(6500);
      await page.screenshot({ path: '/tmp/9108-' + (mobile ? 'mobile' : 'desktop') + '.png' });
      const result = await page.evaluate(() => ({
        frames: qa.frames, audioStarts: qa.audioStarts, audioState: qa.audio?.state,
        time: qa.world.t,
        machines: qa.world.events.filter(e => /capture|release/.test(e.type)),
        scroll: document.documentElement.scrollWidth > innerWidth
      }));
      assert.equal(errors.length, 0, 'no browser errors');
      assert.equal(result.audioState, 'running');
      assert(result.audioStarts > 0, 'sound scheduled after click');
      assert(result.frames > 200, 'sustained animation');
      assert.equal(result.scroll, false, 'no horizontal overflow');
      assert(result.machines.some(e => e.type === 'release'), 'first carrier completes');
      console.log(JSON.stringify({ mobile, errors, ...result }));
      await page.keyboard.press('Space');
      const frozen = await page.evaluate(() => qa.world.t);
      await page.waitForTimeout(200);
      assert.equal(await page.evaluate(() => qa.world.t), frozen, 'pause freezes physics');
      const pixel = await page.evaluate(() => qa.ballPixel);
      await page.mouse.move(pixel.x, pixel.y);
      await page.mouse.down();
      await page.mouse.move(pixel.x + 12, pixel.y + 8);
      assert(await page.evaluate(() => !!qa.world.nudge), 'near-ball drag attaches');
      await page.locator('canvas').dispatchEvent('pointercancel');
      assert.equal(await page.evaluate(() => qa.world.nudge), null, 'cancel releases nudge');
      await page.mouse.up();
      await page.close();
    }
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 }, reducedMotion: 'reduce'
    });
    await page.addInitScript(instrument);
    await page.goto(base);
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => qa.world.t), 0, 'reduced motion starts still');
    await page.locator('canvas').click({ position: { x: 30, y: 30 } });
    await page.waitForTimeout(300);
    assert(await page.evaluate(() => qa.world.t) > .1, 'gesture can resume reduced motion');
    assert.equal(await page.evaluate(() => qa.world.nudge), null, 'remote gesture cannot grab ball');
    console.log('PASS reduced-motion pause, gesture resume and remote pointer exclusion');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
