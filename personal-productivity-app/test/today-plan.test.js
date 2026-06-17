import assert from 'node:assert/strict';
import test from 'node:test';
import { buildTodayPlan } from '../src/today-plan.js';

const today = '2026-06-16';

test('carries overdue unfinished tasks into today plan before today tasks', () => {
  const plan = buildTodayPlan({
    date: today,
    capacityMinutes: 120,
    tasks: [
      task({ id: 'today-1', title: '写周报', dueDate: today, priority: 'medium', estimateMinutes: 30 }),
      task({ id: 'overdue-1', title: '补发票', dueDate: '2026-06-14', priority: 'high', estimateMinutes: 20 }),
      task({ id: 'future-1', title: '准备分享', dueDate: '2026-06-18', priority: 'high', estimateMinutes: 30 })
    ]
  });

  assert.deepEqual(plan.items.map((item) => item.id), ['overdue-1', 'today-1']);
  assert.equal(plan.items[0].reason, 'overdue');
  assert.equal(plan.items[1].reason, 'due-today');
});

test('does not include completed or blocked tasks', () => {
  const plan = buildTodayPlan({
    date: today,
    capacityMinutes: 120,
    tasks: [
      task({ id: 'done-1', dueDate: '2026-06-15', status: 'done', estimateMinutes: 20 }),
      task({ id: 'blocked-1', dueDate: '2026-06-15', status: 'blocked', estimateMinutes: 20 }),
      task({ id: 'open-1', dueDate: '2026-06-15', status: 'open', estimateMinutes: 20 })
    ]
  });

  assert.deepEqual(plan.items.map((item) => item.id), ['open-1']);
});

test('respects daily capacity and returns overflow as deferred tasks', () => {
  const plan = buildTodayPlan({
    date: today,
    capacityMinutes: 60,
    tasks: [
      task({ id: 'overdue-high', dueDate: '2026-06-14', priority: 'high', estimateMinutes: 40 }),
      task({ id: 'today-high', dueDate: today, priority: 'high', estimateMinutes: 30 }),
      task({ id: 'today-low', dueDate: today, priority: 'low', estimateMinutes: 20 })
    ]
  });

  assert.deepEqual(plan.items.map((item) => item.id), ['overdue-high', 'today-low']);
  assert.deepEqual(plan.deferred.map((item) => item.id), ['today-high']);
  assert.equal(plan.usedMinutes, 60);
  assert.equal(plan.remainingMinutes, 0);
});

test('sorts overdue tasks by priority before due date age', () => {
  const plan = buildTodayPlan({
    date: today,
    capacityMinutes: 120,
    tasks: [
      task({ id: 'old-low', dueDate: '2026-06-10', priority: 'low', estimateMinutes: 10 }),
      task({ id: 'new-high', dueDate: '2026-06-15', priority: 'high', estimateMinutes: 10 }),
      task({ id: 'old-medium', dueDate: '2026-06-11', priority: 'medium', estimateMinutes: 10 })
    ]
  });

  assert.deepEqual(plan.items.map((item) => item.id), ['new-high', 'old-medium', 'old-low']);
});

test('rejects invalid plan inputs before generating a plan', () => {
  assert.throws(
    () => buildTodayPlan({ date: '2026/06/16', capacityMinutes: 60, tasks: [] }),
    /date must be an ISO date string/
  );

  assert.throws(
    () => buildTodayPlan({ date: today, capacityMinutes: -1, tasks: [] }),
    /capacityMinutes must be a non-negative number/
  );

  assert.throws(
    () =>
      buildTodayPlan({
        date: today,
        capacityMinutes: 60,
        tasks: [task({ id: 'bad-estimate', dueDate: today, estimateMinutes: -10 })]
      }),
    /task estimateMinutes must be a non-negative number/
  );
});

function task(overrides) {
  return {
    id: overrides.id,
    title: overrides.title ?? overrides.id,
    dueDate: overrides.dueDate,
    status: overrides.status ?? 'open',
    priority: overrides.priority ?? 'medium',
    estimateMinutes: overrides.estimateMinutes ?? 30
  };
}
