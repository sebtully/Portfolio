import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readdirSync, readFileSync } from 'node:fs';
import { getCreativeVideo } from '../lib/creative-media.ts';
import { creativeProjects } from '../data/creative-projects.ts';
import { developerSkills } from '../data/skills.ts';

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

test('Caretoons uses the original external video and the local poster', () => {
  const project = creativeProjects.find(({ slug }) => slug === 'caretoons');
  assert.ok(project);
  assert.equal(project.title, 'Caretoons – Freelance');
  assert.deepEqual(project.roles, ['Freelance']);
  const video = project.videos[0];
  assert.equal(video.filename, 'https://faks.dk/wp-content/uploads/2025/04/FAKS_mand_full.mp4');
  assert.equal(video.width / video.height, 16 / 9);
  assert.deepEqual(getCreativeVideo(video.filename, video.poster), {
    src: video.filename,
    available: true,
    poster: '/media/creative/Caretoons%20projekt%201.jpg'
  });
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

test('all original creative videos are connected with exact filenames and existing posters', () => {
  const files = readdirSync(new URL('../public/media/creative/', import.meta.url));
  const videos = creativeProjects.flatMap(({ videos }) => videos);
  assert.deepEqual(videos.map(({ filename }) => filename).filter((filename) => !filename.startsWith('https://')).sort(), files.filter((file) => file.endsWith('.mp4')).sort());
  for (const video of videos) {
    assert.ok(getCreativeVideo(video.filename).available, video.filename);
    if (video.poster) assert.ok(files.includes(video.poster), video.poster);
  }
});

// Run against a production server: CREATIVE_TEST_URL=http://localhost:3100.
if (process.env.CREATIVE_TEST_URL) {
  const origin = process.env.CREATIVE_TEST_URL;

  test('production server bundles do not duplicate static creative media', () => {
    for (const route of ['creative', 'creative/[slug]']) {
      const manifest = JSON.parse(readFileSync(new URL(`../.next/server/app/${route}/page.js.nft.json`, import.meta.url), 'utf8'));
      assert.ok(manifest.files.every((file) => !file.includes('/public/media/creative/')), route);
    }
  });

  test('creative navigation numbers match section labels and anchors', async () => {
    const expected = [
      { id: 'work', nav: 'Work (01)', label: '01 / SELECTED WORK' },
      { id: 'about', nav: 'About (02)', label: '02 / ABOUT' },
      { id: 'contact', nav: 'Contact (03)', label: '03 / CONTACT' }
    ];
    for (const route of ['/creative', ...creativeProjects.map(({ slug }) => `/creative/${slug}`)]) {
      const response = await fetch(new URL(route, origin));
      assert.equal(response.status, 200);
      const html = (await response.text()).replace(/<!--.*?-->/gs, '');
      const nav = html.match(/<nav\b[^>]*aria-label="Kreativ portfolio"[^>]*>(.*?)<\/nav>/s)?.[1];
      assert.ok(nav, route);
      for (const section of expected) {
        const link = nav.match(new RegExp(`<a\\b[^>]*href="/creative#${section.id}"[^>]*>(.*?)</a>`, 's'))?.[1];
        assert.ok(link, `${route}: ${section.id}`);
        assert.equal(link.replace(/<[^>]+>/g, '').trim(), section.nav);
        if (route === '/creative' || section.id === 'contact') {
          assert.equal((html.match(new RegExp(`id="${section.id}"`, 'g')) ?? []).length, 1);
          const label = html.match(new RegExp(`<(?:section|footer) id="${section.id}"[^>]*>\\s*<div class="creative-section-label"><span>(.*?)</span>`, 's'))?.[1];
          assert.equal(label, section.label);
        }
      }
    }
  });

  test('JS Danmark hides its encoded top strip on both pages and Caretoons appears in experience', async () => {
    for (const route of ['/creative', '/creative/js-danmark-project-1']) {
      const html = await (await fetch(new URL(route, origin))).text();
      const video = html.match(/<video\b([^>]*)>\s*<source src="\/media\/creative\/JsDanmark%20-%20Project%201\.mp4"/);
      assert.ok(video, route);
      assert.match(video[1], /width="1920" height="1080"/);
      const clip = video[1].match(/clip-path:inset\(([\d.]+)% 0 0\)/);
      assert.ok(clip, route);
      assert.ok(Math.abs(Number(clip[1]) - 10 / 1080 * 100) < 0.0001);
      if (route === '/creative') {
        assert.match(html, /<h4>Caretoons<\/h4><p>Freelance · Animation \/ Visuelt indhold<\/p><\/div><span>2024<\/span>/);
      }
    }
  });

  test('creative pages render without JavaScript and preserve the developer route', async () => {
    for (const route of ['/creative', ...creativeProjects.map(({ slug }) => `/creative/${slug}`)]) {
      const response = await fetch(new URL(route, origin));
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.match(html, /<main id="creative-main"/);
      assert.match(html, /sebastiantully@gmail\.com/);
      assert.doesNotMatch(html, /<title>[^<]*Full Stack/);
      assert.doesNotMatch(html, /Graphic Designer/i);
      assert.match(html, /Video Editor &amp; Graphic Creative/);
      if (route === '/creative') assert.match(html, /alt="Portræt af Sebastian Tully Schmidt"/);
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
    assert.match(html, /id="kompetencer"/);
    for (const { items } of developerSkills) {
      for (const skill of items) assert.ok(html.includes(skill), `Missing developer skill: ${skill}`);
    }
    assert.equal((await fetch(new URL('/creative/unknown-project', origin))).status, 404);
  });

  test('available video and poster URLs work, including filenames with spaces and byte ranges', async () => {
    for (const project of creativeProjects) {
      for (const video of project.videos) {
        const media = getCreativeVideo(video.filename, video.poster);
        if (!media.available) continue;
        if (video.poster) {
          assert.ok(media.poster, `Missing poster: ${video.filename}`);
          const poster = await fetch(new URL(media.poster, origin));
          assert.equal(poster.status, 200);
          assert.match(poster.headers.get('content-type'), /image\/jpeg/);
          await poster.arrayBuffer();
        }
        if (video.filename.startsWith('https://')) continue;
        const response = await fetch(new URL(media.src, origin), { headers: { Range: 'bytes=0-1023' } });
        assert.equal(response.status, 206, media.src);
        assert.match(response.headers.get('content-type'), /video\/mp4/);
        assert.equal((await response.arrayBuffer()).byteLength, 1024);
      }
    }
  });
}
