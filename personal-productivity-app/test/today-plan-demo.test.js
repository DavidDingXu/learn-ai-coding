import assert from 'node:assert/strict';
import test from 'node:test';
import { createTodayPlanDemo } from '../src/today-plan-demo.js';

test('creates a visible demo plan with scheduled and deferred tasks', () => {
  const demo = createTodayPlanDemo({ capacityMinutes: 90 });

  assert.equal(demo.date, '2026-06-16');
  assert.equal(demo.capacityMinutes, 90);
  assert.equal(demo.usedMinutes, 90);
  assert.equal(demo.remainingMinutes, 0);
  assert.deepEqual(
    demo.items.map((item) => item.id),
    ['invoice', 'customer-reply', 'weekly-report']
  );
  assert.deepEqual(
    demo.deferred.map((item) => item.id),
    ['release-notes']
  );
  assert.deepEqual(
    demo.excluded.map((item) => item.id),
    ['roadmap-review', 'expense-done', 'blocked-contract']
  );
});

test('recomputes deferred tasks when daily capacity changes', () => {
  const demo = createTodayPlanDemo({ capacityMinutes: 60 });

  assert.equal(demo.usedMinutes, 55);
  assert.equal(demo.remainingMinutes, 5);
  assert.deepEqual(
    demo.items.map((item) => item.id),
    ['invoice', 'weekly-report']
  );
  assert.deepEqual(
    demo.deferred.map((item) => item.id),
    ['customer-reply', 'release-notes']
  );
});
