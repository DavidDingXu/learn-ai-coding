import { createTodayPlanDemo } from './today-plan-demo.js';

const reasonLabels = {
  overdue: '逾期带回',
  'due-today': '今日到期'
};

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低'
};

const statusLabels = {
  open: '未完成',
  done: '已完成',
  blocked: '阻塞'
};

const capacityInput = document.querySelector('#capacity');
const capacityValue = document.querySelector('#capacity-value');
const usedValue = document.querySelector('#used-value');
const remainingValue = document.querySelector('#remaining-value');
const scheduledList = document.querySelector('#scheduled-list');
const deferredList = document.querySelector('#deferred-list');
const excludedList = document.querySelector('#excluded-list');
const sourceList = document.querySelector('#source-list');
const progressBar = document.querySelector('#capacity-progress');
const emptyDeferred = document.querySelector('#empty-deferred');

capacityInput.addEventListener('input', () => {
  render(Number(capacityInput.value));
});

render(Number(capacityInput.value));

function render(capacityMinutes) {
  const demo = createTodayPlanDemo({ capacityMinutes });
  const progress = demo.capacityMinutes === 0 ? 0 : Math.round((demo.usedMinutes / demo.capacityMinutes) * 100);

  capacityValue.textContent = `${demo.capacityMinutes} 分钟`;
  usedValue.textContent = `${demo.usedMinutes} 分钟`;
  remainingValue.textContent = `${demo.remainingMinutes} 分钟`;
  progressBar.style.width = `${Math.min(progress, 100)}%`;

  renderTaskList(scheduledList, demo.items, 'scheduled');
  renderTaskList(deferredList, demo.deferred, 'deferred');
  renderTaskList(excludedList, demo.excluded, 'excluded');
  renderTaskList(sourceList, demo.sourceTasks, 'source');
  emptyDeferred.hidden = demo.deferred.length > 0;
}

function renderTaskList(target, tasks, variant) {
  target.replaceChildren(...tasks.map((task) => renderTask(task, variant)));
}

function renderTask(task, variant) {
  const item = document.createElement('li');
  item.className = `task task-${variant}`;

  const titleRow = document.createElement('div');
  titleRow.className = 'task-title-row';

  const title = document.createElement('strong');
  title.textContent = task.title;

  const estimate = document.createElement('span');
  estimate.className = 'task-estimate';
  estimate.textContent = `${task.estimateMinutes} 分钟`;

  titleRow.append(title, estimate);

  const meta = document.createElement('div');
  meta.className = 'task-meta';
  meta.append(
    createPill(`截止 ${task.dueDate}`),
    createPill(`优先级 ${priorityLabels[task.priority] ?? task.priority}`),
    createPill(reasonLabels[task.reason] ?? statusLabels[task.status] ?? task.status)
  );

  item.append(titleRow, meta);
  return item;
}

function createPill(text) {
  const pill = document.createElement('span');
  pill.className = 'pill';
  pill.textContent = text;
  return pill;
}
