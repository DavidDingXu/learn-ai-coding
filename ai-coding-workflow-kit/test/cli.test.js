import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runCli(args) {
  return spawnSync('node', ['src/cli.js', ...args], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8'
  });
}

test('prints available commands for unknown command', () => {
  const result = runCli(['unknown']);

  assert.notEqual(result.status, 0);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /Unknown command: unknown/);
  assert.match(result.stderr, /Commands: codemap, context-audit, task-context, context-pack, verify-ledger/);
});

test('prints a context audit for the current project', () => {
  const result = runCli(['context-audit', '--root', '.']);

  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  assert.match(result.stdout, /# Context Audit/);
  assert.match(result.stdout, /Files Agent Should Read First/);
  assert.match(result.stdout, /Human Review Required/);
});

test('requires a file when verifying a ledger', () => {
  const result = runCli(['verify-ledger']);

  assert.notEqual(result.status, 0);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /--file is required/);
});
