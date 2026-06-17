import test from 'node:test';
import assert from 'node:assert/strict';
import { createTaskContext } from '../src/lib/task-context.js';

test('creates a task context package from explicit fields', () => {
  const markdown = createTaskContext({
    title: 'Fix order status rollback',
    goal: 'Prevent paid orders from moving back to pending.',
    files: 'src/order.ts,test/order.test.ts',
    constraints: 'Do not change public API,Do not add dependencies',
    done: 'npm test,manual checkout flow passes'
  });

  assert.match(markdown, /# Task Context: Fix order status rollback/);
  assert.match(markdown, /Prevent paid orders/);
  assert.match(markdown, /src\/order.ts/);
  assert.match(markdown, /Do not change public API/);
  assert.match(markdown, /manual checkout flow passes/);
});

test('requires a title', () => {
  assert.throws(() => createTaskContext({}), /title is required/);
});
