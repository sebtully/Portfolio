// Run against a production preview with Node 22+ and installed Edge/Chrome:
// CREATIVE_TEST_URL=http://localhost:3009 node --experimental-strip-types scripts/check-creative-ai-playback.mjs
import assert from 'node:assert/strict';
import { Browser, sleep } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import { creativeAIProjects } from '../data/creative-ai-projects.ts';

const origin = process.env.CREATIVE_TEST_URL || 'http://localhost:3009';
const browser = await Browser.launch();
const pages = [];
const timers = `(() => {
  const pending = new Map(), schedule = window.setTimeout.bind(window), cancel = window.clearTimeout.bind(window);
  window.setTimeout = (callback, delay, ...args) => {
    if (![2000, 800, 15000].includes(delay) || typeof callback !== 'function') return schedule(callback, delay, ...args);
    let id; id = schedule(() => { pending.delete(id); callback(...args); }, delay === 15000 && window.__fastAITimeout ? 150 : delay);
    pending.set(id, delay); return id;
  };
  window.clearTimeout = id => { pending.delete(id); cancel(id); };
  window.__aiTimers = () => [...pending.values()];
  const scroll = Element.prototype.scrollIntoView;
  window.__aiScrolls = [];
  Element.prototype.scrollIntoView = function(options) {
    if (this.matches('.creative-ai-result')) window.__aiScrolls.push(options);
    return scroll.call(this, options);
  };
})();`;
async function waitFor(page, condition, message, limit = 10000) {
  const until = Date.now() + limit;
  while (Date.now() < until) {
    if (await page.eval(condition)) return;
    await sleep(25);
  }
  throw new Error(`${message}: ${JSON.stringify(await page.eval(() => ({ timers: window.__aiTimers(), sendDisabled: document.querySelector('.creative-ai-send')?.disabled, loading: !!document.querySelector('.creative-ai-loading'), error: !!document.querySelector('.creative-ai-load-error'), versions: !!document.querySelector('.creative-ai-versions') })))}`);
}
async function open(options = {}, mode = 'continue') {
  const page = await browser.newPage(options);
  pages.push(page);
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: timers });
  await page.send('Network.enable');
  await page.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.send('Fetch.enable', { patterns: [{ resourceType: 'Image', urlPattern: '*' }] });
  const requests = [];
  const network = { mode, pending: [] };
  browser.on(page.sessionId, 'Fetch.requestPaused', event => {
    if (decodeURIComponent(event.request.url).includes('/media/creative/ai/')) {
      requests.push(event.request.url);
      if (network.mode === 'hold') { network.pending.push(event.requestId); return; }
      if (network.mode === 'fail') { void page.send('Fetch.failRequest', { requestId: event.requestId, errorReason: 'Failed' }); return; }
    }
    void page.send('Fetch.continueRequest', { requestId: event.requestId });
  });
  network.release = async () => {
    network.mode = 'continue';
    for (const requestId of network.pending.splice(0)) await page.send('Fetch.continueRequest', { requestId });
  };
  await page.goto(`${origin}/creative`);
  await page.eval(() => document.querySelector('.creative-ai-composer').scrollIntoView({ block: 'center', behavior: 'instant' }));
  if (!options.reducedMotion) await waitFor(page, () => Boolean(document.querySelector('.creative-ai-composer [data-slot="typing-text"]')), 'prompt did not hydrate');
  return { page, requests, network };
}
const send = page => page.eval(() => document.querySelector('.creative-ai-send').click());
const height = page => page.eval(() => document.querySelector('.creative-ai-image-frame').getBoundingClientRect().height);
const ready = page => waitFor(page, () => Boolean(document.querySelector('.creative-ai-versions')), 'versions did not appear');
const screenshot = async (page, name) => {
  if (process.env.CREATIVE_SCREENSHOTS) await page.screenshot({ path: `${process.env.CREATIVE_SCREENSHOTS}/${name}.jpg` });
};

try {
  const { page, requests, network } = await open({}, 'hold');
  assert.equal(requests.length, 0, 'no AI image fetched before send');
  await page.eval(() => { for (let i = 0; i < 8; i++) document.querySelector('.creative-ai-send').click(); });
  await waitFor(page, () => Boolean(document.querySelector('.creative-ai-loading')), 'loading did not start');
  assert.equal(await page.eval(() => document.querySelector('.creative-ai-loading').textContent), 'Billedet tager form…');
  const initialHeight = await height(page);
  assert.equal(await page.eval(() => document.querySelector('.creative-ai-send').disabled), true);
  assert.equal(await page.eval(() => Boolean(document.querySelector('.creative-ai-spinner'))), true);
  assert.equal(await page.eval(() => document.querySelector('.creative-ai-composer-text').textContent), creativeAIProjects[0].displayPrompt);
  await waitFor(page, () => Math.abs(document.querySelector('.creative-ai-image-frame').getBoundingClientRect().top - 32) < 2, 'send did not scroll to the image');
  assert.deepEqual(await page.eval(() => window.__aiScrolls), [{ behavior: 'smooth', block: 'start' }]);
  await screenshot(page, 'ai-playback-loading-desktop');
  await sleep(2200);
  assert.equal(requests.length, 1, 'repeated clicks must not duplicate preload');
  assert.equal(await page.eval(() => document.querySelector('.creative-ai-main-image').dataset.revealed), 'false', 'slow image must stay hidden after two seconds');
  assert.equal(await page.eval(() => Boolean(document.querySelector('.creative-ai-versions,.creative-ai-process'))), false);
  await network.release();
  await waitFor(page, () => document.querySelector('.creative-ai-main-image').dataset.revealed === 'true', 'loaded image not revealed');
  assert.equal(await page.eval(() => Boolean(document.querySelector('.creative-ai-versions'))), false, 'versions must wait for 800 ms reveal');
  assert.notEqual(await page.eval(() => getComputedStyle(document.querySelector('.creative-ai-image')).filter), 'blur(0px)');
  await ready(page);
  const delays = await page.eval(() => [...document.querySelectorAll('.creative-ai-thumbnail')].map(button => getComputedStyle(button).animationDelay));
  assert.deepEqual(delays, ['0s', '0.16s', '0.32s', '0.48s']);
  assert.equal(await page.eval(() => getComputedStyle(document.querySelectorAll('.creative-ai-thumbnail')[3]).visibility), 'hidden');
  await sleep(220);
  assert.equal(await page.eval(() => getComputedStyle(document.querySelectorAll('.creative-ai-thumbnail')[0]).visibility), 'visible');
  assert.equal(await page.eval(() => getComputedStyle(document.querySelectorAll('.creative-ai-thumbnail')[3]).visibility), 'hidden');
  await sleep(900);
  assert.equal(await height(page), initialHeight);
  assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.creative-ai-image')).filter), 'none');
  assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.creative-ai-process')).visibility), 'visible');
  assert.equal(await page.eval(() => document.querySelector('.creative-ai-main-image img').naturalWidth > 0), true);
  assert.deepEqual(await page.eval(() => window.__aiTimers()), []);
  await page.eval(() => document.querySelector('.creative-ai-versions').scrollIntoView({ block: 'end', behavior: 'instant' }));
  await screenshot(page, 'ai-playback-result-desktop');
  console.log('PASS: preload gating, repeated send, 800 ms blur, sequential versions, stable frame and cleared timers');

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    const frameHeight = await height(page);
    for (const [index, iteration] of creativeAIProjects[0].iterations.entries()) {
      await page.eval(index => {
        window.__previousVersionImage = document.querySelector('.creative-ai-image img');
        document.querySelectorAll('.creative-ai-thumbnail')[index].click();
      }, index);
      assert.equal(await page.eval(() => document.querySelector('.creative-ai-image img') === window.__previousVersionImage), true, 'version changes must preserve the image element');
      assert.equal(await page.eval(() => Boolean(document.querySelector('#ai-process .creative-ai-loading,#ai-process .creative-ai-spinner,#ai-process [data-slot="blur"]'))), false, 'version changes must not replay loading or blur');
      assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.creative-ai-main-image')).transitionDuration), '0s');
      await waitFor(page, () => {
        const image = document.querySelector('.creative-ai-image img');
        return image?.complete && image.naturalWidth > 0;
      }, 'version failed to load');
      assert.equal(await height(page), frameHeight);
      assert.equal(await page.eval(() => document.querySelector('.creative-ai-version-info h4').textContent), iteration.label);
      assert.equal(await page.eval(() => document.querySelectorAll('.creative-ai-thumbnail[aria-pressed="true"]').length), 1);
      assert.equal(await page.eval(() => getComputedStyle(document.querySelector('.creative-ai-image img')).objectFit), 'contain');
    }
    assert.equal(await page.eval(() => document.documentElement.scrollWidth > innerWidth), false);
    if (width === 390) {
      await sleep(850);
      await page.eval(() => document.querySelector('.creative-ai-versions').scrollIntoView({ block: 'end', behavior: 'instant' }));
      await screenshot(page, 'ai-playback-result-mobile');
    }
  }
  console.log('PASS: versions and corresponding details work at 1440, 768, 390 and 320 px without crop or overflow');
  assert.equal(await page.eval(() => window.__aiScrolls.length), 1, 'version changes must not scroll again');

  const { page: reduced } = await open({ width: 390, reducedMotion: true });
  await reduced.eval(() => document.querySelector('.creative-ai-send').focus());
  const start = Date.now();
  await reduced.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13 });
  await reduced.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter' });
  await ready(reduced);
  assert.deepEqual(await reduced.eval(() => window.__aiScrolls), [{ behavior: 'instant', block: 'start' }]);
  assert.ok(await reduced.eval(() => Math.abs(document.querySelector('.creative-ai-image-frame').getBoundingClientRect().top - 32) < 2));
  assert.ok(Date.now() - start < 1800, 'reduced motion must skip artificial delay');
  assert.equal(await reduced.eval(() => document.querySelector('#ai-process').getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length), 0);
  await reduced.eval(() => document.querySelectorAll('.creative-ai-thumbnail')[3].focus());
  await reduced.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13 });
  await reduced.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter' });
  assert.equal(await reduced.eval(() => document.querySelectorAll('.creative-ai-thumbnail')[3].getAttribute('aria-pressed')), 'true');
  console.log('PASS: reduced motion skips waiting, shimmer, rotation and stagger; keyboard send/version selection works');

  const { page: error, network: failedNetwork } = await open({}, 'fail');
  await send(error);
  const errorHeight = await height(error);
  await waitFor(error, () => Boolean(document.querySelector('.creative-ai-load-error button')), 'missing retry after network failure');
  assert.equal(await error.eval(() => Boolean(document.querySelector('.creative-ai-spinner'))), false);
  failedNetwork.mode = 'continue';
  await error.eval(() => document.querySelector('.creative-ai-load-error button').click());
  await sleep(400);
  assert.equal(await error.eval(() => document.querySelector('.creative-ai-main-image').dataset.revealed), 'false', 'cached image must still respect playback delay');
  await ready(error);
  assert.equal(await height(error), errorHeight);
  console.log('PASS: failed image has retry, retry respects minimum delay and preserves frame');

  const { page: timeout, network: stalled } = await open({}, 'hold');
  await timeout.eval(() => { window.__fastAITimeout = true; });
  await send(timeout);
  await waitFor(timeout, () => Boolean(document.querySelector('.creative-ai-load-error')), 'stalled image did not time out');
  assert.deepEqual(await timeout.eval(() => window.__aiTimers()), []);
  await stalled.release();
  await sleep(200);
  assert.equal(await timeout.eval(() => document.querySelector('.creative-ai-main-image').dataset.revealed), 'false', 'late image must not override error');

  const { page: skip, network: skipped } = await open({}, 'hold');
  await send(skip);
  await waitFor(skip, () => window.__aiTimers().length > 0, 'missing active playback timer');
  await skip.eval(() => document.querySelector('.creative-ai-skip').click());
  assert.deepEqual(await skip.eval(() => window.__aiTimers()), []);
  await skipped.release();
  await sleep(300);
  assert.equal(await skip.eval(() => Boolean(document.querySelector('.creative-ai-result:not([hidden])'))), false);
  await send(skip);
  await ready(skip);
  assert.equal(await skip.eval(() => Boolean(document.querySelector('.creative-ai-versions'))), true);
  assert.deepEqual(pages.flatMap(page => page.consoleErrors), []);
  console.log('PASS: timeout, late decode, skip/unmount cleanup and subsequent send; no browser exceptions');
} finally { await browser.close(); }
