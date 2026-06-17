import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCodeMapMarkdown, renderContextAuditMarkdown, summarizeFiles } from '../src/lib/codemap.js';

test('summarizes source, tests, docs, configs, and top directories', () => {
  const summary = summarizeFiles([
    'README.md',
    'AGENTS.md',
    'package.json',
    'src/order.ts',
    'src/payment.ts',
    'tests/order.test.ts',
    'docs/api.md'
  ]);

  assert.equal(summary.totalFiles, 7);
  assert.deepEqual(summary.sourceFiles, ['src/order.ts', 'src/payment.ts', 'tests/order.test.ts']);
  assert.deepEqual(summary.testFiles, ['tests/order.test.ts']);
  assert.deepEqual(summary.docs, ['README.md', 'AGENTS.md', 'docs/api.md']);
  assert.deepEqual(summary.configs, ['package.json']);
  assert.ok(summary.topDirectories.some((item) => item.directory === 'src' && item.count === 2));
});

test('renders markdown with files AI should inspect first', () => {
  const markdown = renderCodeMapMarkdown(summarizeFiles([
    'README.md',
    'package.json',
    'tests/order.test.ts'
  ]));

  assert.match(markdown, /# Code Map/);
  assert.match(markdown, /`README.md`/);
  assert.match(markdown, /`package.json`/);
  assert.match(markdown, /`tests\/order.test.ts`/);
});

test('renders a context audit for agent-generated context review', () => {
  const markdown = renderContextAuditMarkdown(summarizeFiles([
    'README.md',
    'AGENTS.md',
    'package.json',
    'src/order.ts',
    'src/generated/api.ts',
    'dist/bundle.js',
    'legacy/order.ts',
    'tests/order.test.ts'
  ]));

  assert.match(markdown, /# Context Audit/);
  assert.match(markdown, /Files Agent Should Read First/);
  assert.match(markdown, /`AGENTS.md`/);
  assert.match(markdown, /Paths To Treat Carefully/);
  assert.match(markdown, /`src\/generated\/api.ts`/);
  assert.match(markdown, /`dist\/bundle.js`/);
  assert.match(markdown, /`legacy\/order.ts`/);
  assert.match(markdown, /Human Review Required/);
  assert.match(markdown, /real runtime entry/);
  assert.match(markdown, /focused verification command/);
});
