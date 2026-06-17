## 1. Red Test

- [x] 1.1 Run `npm test` and record the missing implementation failure.

## 2. Core Implementation

- [x] 2.1 Add `src/today-plan.js` and export `buildTodayPlan`.
- [x] 2.2 Filter eligible tasks to open overdue and due-today tasks only.
- [x] 2.3 Sort eligible tasks by overdue status, priority, due date, and stable id fallback.
- [x] 2.4 Apply daily capacity and return `items`, `deferred`, `usedMinutes`, and `remainingMinutes`.
- [x] 2.5 Validate date and estimate inputs at the domain boundary.

## 3. Verification

- [x] 3.1 Run `npm test` and confirm the OpenSpec scenarios are covered by passing tests.
- [x] 3.2 Capture the implementation command sequence in `dev-process/01-openspec-today-plan-rollover.md`.
