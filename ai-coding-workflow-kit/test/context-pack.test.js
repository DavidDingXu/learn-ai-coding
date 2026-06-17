import assert from 'node:assert/strict';
import test from 'node:test';
import { createContextPack } from '../src/lib/context-pack.js';

test('creates a read-only context pack with task context and code map', async () => {
  const markdown = await createContextPack({
    root: '.',
    title: 'Inspect CLI contract',
    files: 'src/cli.js,test/cli.test.js',
    constraints: 'read-only, no network',
    done: 'npm test'
  });

  assert.match(markdown, /# Context Pack: Inspect CLI contract/);
  assert.match(markdown, /## Read-Only Boundary/);
  assert.match(markdown, /Does not edit files/);
  assert.match(markdown, /# Task Context: Inspect CLI contract/);
  assert.match(markdown, /# Code Map/);
  assert.match(markdown, /Verification Handoff/);
});

test('requires a title for context packs', async () => {
  await assert.rejects(() => createContextPack({ root: '.' }), /--title is required/);
});
