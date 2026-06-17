const PRIORITY_RANK = {
  high: 0,
  medium: 1,
  low: 2
};

const DEFAULT_PRIORITY_RANK = PRIORITY_RANK.medium;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function buildTodayPlan({ date, capacityMinutes = 0, tasks = [] } = {}) {
  const targetDate = normalizeDate(date, 'date');
  const capacity = normalizeCapacity(capacityMinutes);

  if (!Array.isArray(tasks)) {
    throw new TypeError('tasks must be an array');
  }

  const candidates = tasks
    .filter((task) => isEligibleTask(task, targetDate))
    .map((task) => ({
      ...task,
      estimateMinutes: normalizeEstimate(task.estimateMinutes),
      reason: task.dueDate < targetDate ? 'overdue' : 'due-today'
    }))
    .sort(compareTasks);

  const items = [];
  const deferred = [];
  let usedMinutes = 0;

  for (const task of candidates) {
    if (usedMinutes + task.estimateMinutes <= capacity) {
      items.push(task);
      usedMinutes += task.estimateMinutes;
    } else {
      deferred.push(task);
    }
  }

  return {
    date: targetDate,
    capacityMinutes: capacity,
    usedMinutes,
    remainingMinutes: capacity - usedMinutes,
    items,
    deferred
  };
}

function isEligibleTask(task, targetDate) {
  return (
    task &&
    task.status === 'open' &&
    isIsoDate(task.dueDate) &&
    task.dueDate <= targetDate
  );
}

function compareTasks(left, right) {
  return (
    compareReason(left, right) ||
    comparePriority(left, right) ||
    left.dueDate.localeCompare(right.dueDate) ||
    String(left.id ?? '').localeCompare(String(right.id ?? ''))
  );
}

function compareReason(left, right) {
  return reasonRank(left.reason) - reasonRank(right.reason);
}

function comparePriority(left, right) {
  return priorityRank(left.priority) - priorityRank(right.priority);
}

function reasonRank(reason) {
  return reason === 'overdue' ? 0 : 1;
}

function priorityRank(priority) {
  return PRIORITY_RANK[priority] ?? DEFAULT_PRIORITY_RANK;
}

function normalizeDate(value, fieldName) {
  if (!isIsoDate(value)) {
    throw new TypeError(`${fieldName} must be an ISO date string in YYYY-MM-DD format`);
  }

  return value;
}

function isIsoDate(value) {
  return typeof value === 'string' && ISO_DATE_PATTERN.test(value);
}

function normalizeCapacity(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError('capacityMinutes must be a non-negative number');
  }

  return value;
}

function normalizeEstimate(value) {
  if (value === undefined || value === null) {
    return 0;
  }

  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError('task estimateMinutes must be a non-negative number');
  }

  return value;
}
