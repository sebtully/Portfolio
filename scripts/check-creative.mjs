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
  assert.equal(getCreativeVideo('README.md', '__missing_poster__.jpg').poster, undefined);
  assert.equal(getCreativeVideo('README.md', 'README.md').poster, '/media/creative/README.md');
});

test('project slugs and video filenames are unique', () => {
  assert.equal(new Set(creativeProjects.map(({ slug }) => slug)).size, creativeProjects.length);
  for (const project of creativeProjects) {
    assert.ok(project.videos.length > 0);
    assert.equal(new Set(project.videos.map(({ filename }) => filename)).size, project.videos.length);
    for (const video of project.videos) {
      assert.ok(Number.isInteger(video.width) && video.width > 0);
      assert.ok(Number.isInteger(video.height) && video.height > 0);
    }
  }
});

// Run against a production server: CREATIVE_TEST_URL=http://localhost:3100.
if (process.env.CREATIVE_TEST_URL) {
  const origin = process.env.CREATIVE_TEST_URL;

  test('creative pages render without JavaScript and preserve the developer route', async () => {
    for (const route of ['/creative', ...creativeProjects.map(({ slug }) => `/creative/${slug}`)]) {
      const response = await fetch(new URL(route, origin));
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, /<main id="creative-main"/);
      assert.match(html, /sebastiantully@gmail\.com/);
      assert.doesNotMatch(html, /<title>[^<]*Full Stack/);
      const projects = route === '/creative' ? creativeProjects : creativeProjects.filter(({ slug }) => route.endsWith(`/${slug}`));
      const videos = projects.flatMap(({ videos }) => route === '/creative' ? videos.slice(0, 1) : videos);
      for (const project of projects) assert.ok(html.includes(project.title), project.title);
      assert.equal((html.match(/<video[\s>]/g) ?? []).length, videos.filter(({ filename }) => getCreativeVideo(filename).available).length);
      if (videos.every(({ filename }) => !getCreativeVideo(filename).available)) {
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

  test('available video and poster URLs work, including filenames with spaces and byte ranges', async () => {
    for (const project of creativeProjects) {
      for (const video of project.videos) {
        const media = getCreativeVideo(video.filename, video.poster);
        if (!media.available) continue;
        assert.ok(media.poster, `Missing poster: ${video.filename}`);
        const poster = await fetch(new URL(media.poster, origin));
        assert.equal(poster.status, 200);
        assert.match(poster.headers.get('content-type'), /image\/jpeg/);
        await poster.arrayBuffer();
        const response = await fetch(new URL(media.src, origin), { headers: { Range: 'bytes=0-1023' } });
        assert.equal(response.status, 206, media.src);
        assert.match(response.headers.get('content-type'), /video\/mp4/);
        assert.equal((await response.arrayBuffer()).byteLength, 1024);
      }
    }
  });
}
