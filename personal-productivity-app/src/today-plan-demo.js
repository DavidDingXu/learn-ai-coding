import { buildTodayPlan } from './today-plan.js';

const DEMO_DATE = '2026-06-16';

const DEMO_TASKS = [
  {
    id: 'invoice',
    title: '补齐客户发票资料',
    dueDate: '2026-06-14',
    status: 'open',
    priority: 'high',
    estimateMinutes: 35
  },
  {
    id: 'weekly-report',
    title: '写本周项目进展',
    dueDate: DEMO_DATE,
    status: 'open',
    priority: 'medium',
    estimateMinutes: 20
  },
  {
    id: 'customer-reply',
    title: '回复客户验收问题',
    dueDate: '2026-06-15',
    status: 'open',
    priority: 'low',
    estimateMinutes: 35
  },
  {
    id: 'release-notes',
    title: '整理版本发布说明',
    dueDate: DEMO_DATE,
    status: 'open',
    priority: 'high',
    estimateMinutes: 45
  },
  {
    id: 'roadmap-review',
    title: '准备下周路线评审',
    dueDate: '2026-06-18',
    status: 'open',
    priority: 'high',
    estimateMinutes: 40
  },
  {
    id: 'expense-done',
    title: '提交差旅报销',
    dueDate: '2026-06-13',
    status: 'done',
    priority: 'medium',
    estimateMinutes: 15
  },
  {
    id: 'blocked-contract',
    title: '等待法务反馈合同条款',
    dueDate: '2026-06-12',
    status: 'blocked',
    priority: 'high',
    estimateMinutes: 30
  }
];

export function createTodayPlanDemo({ capacityMinutes = 90 } = {}) {
  const plan = buildTodayPlan({
    date: DEMO_DATE,
    capacityMinutes,
    tasks: DEMO_TASKS
  });

  const visibleTaskIds = new Set([
    ...plan.items.map((task) => task.id),
    ...plan.deferred.map((task) => task.id)
  ]);

  return {
    ...plan,
    sourceTasks: DEMO_TASKS.map(copyTask),
    excluded: DEMO_TASKS.filter((task) => !visibleTaskIds.has(task.id)).map(copyTask)
  };
}

function copyTask(task) {
  return { ...task };
}
