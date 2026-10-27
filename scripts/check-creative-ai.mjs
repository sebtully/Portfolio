import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hasCreativeAIImage, creativeAIProjects } from '../data/creative-ai-projects.ts';

// Test-only metadata; no fixture is published as portfolio work.
const image = { src: '/media/creative/ai/test.jpg', alt: 'Testbillede', width: 1200, height: 900 };

test('missing or invalid image metadata cannot be used in playback', () => {
  assert.equal(hasCreativeAIImage(image), true);
  for (const invalid of [undefined, { ...image, width: 0 }, { ...image, height: Infinity }, { ...image, alt: '' }, { ...image, src: '/media/creative/other.jpg' }]) {
    assert.equal(hasCreativeAIImage(invalid), false);
  }
});

test('full version prompts match the case source and revisions branch from v01', async () => {
  const { readFile } = await import('node:fs/promises');
  const doc = (await readFile(new URL('../public/Text/creative-ai-case.md', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
  const project = creativeAIProjects.find(({ id }) => id === 'papirblomster-dagslys');
  assert.ok(project);
  assert.ok(project.displayPrompt.length < 220);
  assert.equal(project.iterations.length, 4);
  for (const [index, iteration] of project.iterations.entries()) {
    const version = `v0${index + 1}`;
    const start = doc.indexOf(`## ${version} —`);
    const end = doc.indexOf('\n## ', start + 1);
    const fullPrompt = doc.slice(start, end < 0 ? undefined : end).split('### Anvendt prompt')[1].trim();
    assert.equal(project.prompts.find(({ id }) => id === iteration.promptId).text, fullPrompt);
    assert.ok(iteration.rationale);
    if (index > 0) assert.equal(iteration.parentId, project.iterations[0].id);
  }
});

test('published AI data uses unique IDs, valid links and documented saved files', async () => {
  const { stat } = await import('node:fs/promises');
  assert.equal(new Set(creativeAIProjects.map(({ id }) => id)).size, creativeAIProjects.length);
  for (const item of creativeAIProjects) {
    assert.ok(['self-initiated', 'client'].includes(item.origin));
    assert.equal(new Set(item.prompts.map(({ id }) => id)).size, item.prompts.length);
    assert.equal(new Set(item.iterations.map(({ id }) => id)).size, item.iterations.length);
    if (item.result) assert.ok(item.iterations.some(({ id }) => id === item.result.iterationId));
    for (const iteration of item.iterations) {
      if (iteration.promptId) assert.ok(item.prompts.some(({ id }) => id === iteration.promptId));
      if (iteration.parentId) assert.ok(item.iterations.some(({ id }) => id === iteration.parentId));
      if (iteration.image) {
        assert.ok(hasCreativeAIImage(iteration.image));
        assert.ok((await stat(new URL(`../public${iteration.image.src}`, import.meta.url))).isFile());
      }
    }
  }
});
