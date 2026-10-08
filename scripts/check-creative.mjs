import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getCreativeVideo } from '../lib/creative-media.ts';
import { creativeProjects } from '../data/creative-projects.ts';

test('missing media and directories produce placeholders', () => {
  assert.equal(getCreativeVideo('__missing_video_check__.mp4').available, false);
  assert.equal(getCreativeVideo('.').available, false);
});

test('existing files are detected and media URLs are encoded', () => {
  assert.equal(getCreativeVideo('README.md').available, true);
  assert.equal(getCreativeVideo('a video.mp4').src, '/media/creative/a%20video.mp4');
});

test('project slugs and video filenames are unique', () => {
  assert.equal(new Set(creativeProjects.map(({ slug }) => slug)).size, creativeProjects.length);
  for (const project of creativeProjects) {
    assert.ok(project.videos.length > 0);
    assert.equal(new Set(project.videos.map(({ filename }) => filename)).size, project.videos.length);
  }
});

// Run against a production server: CREATIVE_TEST_URL=http://localhost:3100.
if (process.env.CREATIVE_TEST_URL) {
  const origin = process.env.CREATIVE_TEST_URL;

  test('creative pages render without JavaScript and preserve the developer route', async () => {
    for (const route of ['/creative', '/creative/cat-teen']) {
      const response = await fetch(new URL(route, origin));
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, /<main id="creative-main"/);
      assert.match(html, /sebastiantully@gmail\.com/);
      assert.doesNotMatch(html, /<title>[^<]*Full Stack/);
      assert.match(html, /CAT Teen Campaign/);
      if (creativeProjects[0].videos.every(({ filename }) => !getCreativeVideo(filename).available)) {
        assert.match(html, /Video afventer/);
        assert.doesNotMatch(html, /<video[\s>]/);
      }
    }
    const home = await fetch(new URL('/', origin));
    assert.equal(home.status, 200);
    const html = await home.text();
    assert.match(html, /Hej, mit navn er Sebastian/);
    assert.doesNotMatch(html, /class="creative-shell"/);
    assert.equal((await fetch(new URL('/creative/unknown-project', origin))).status, 404);
  });
}
