# 端到端实战记录：今日计划逾期顺延需求

## 需求一句话

个人效率助手每天生成今日计划时，要把逾期未完成任务带回今天，但不能超过当天容量；放不下的任务要进入顺延列表。

## 需求边界

本次做：

- 领域函数 `buildTodayPlan`。
- 逾期任务和当天任务的候选选择。
- 完成、阻塞、未来任务过滤。
- 优先级和日期排序。
- 容量约束和 deferred 输出。
- 今日计划结果页。
- 容量调节后的即时重算。
- 业务规则测试。
- OpenSpec change 和过程记录。

本次不做：

- API。
- 数据库存储。
- 用户账号。
- 日历同步。
- 复杂排程算法。

## 上下文

当前项目：

```text
personal-productivity-app
```

关键文件：

```text
README.md
package.json
index.html
styles.css
src/ui.js
src/today-plan-demo.js
test/today-plan.test.js
test/today-plan-demo.test.js
openspec/changes/today-plan-overdue-rollover/proposal.md
openspec/changes/today-plan-overdue-rollover/specs/today-plan/spec.md
openspec/changes/today-plan-overdue-rollover/design.md
openspec/changes/today-plan-overdue-rollover/tasks.md
```

OpenSpec 初始化命令：

```bash
openspec init --tools codex .
```

OpenSpec 创建 change：

```bash
openspec new change today-plan-overdue-rollover \
  --description "今日计划自动纳入逾期未完成任务，并在每日容量限制下给出顺延列表。" \
  --goal "让个人效率助手每天生成可执行的今日计划，避免逾期任务丢失或一天被排爆。" \
  --json
```

## 规格

需求被拆成三个 requirement：

```text
Generate today's executable plan
Respect daily capacity
Prioritize overdue work predictably
```

这些 requirement 对应测试：

```text
carries overdue unfinished tasks into today plan before today tasks
does not include completed or blocked tasks
respects daily capacity and returns overflow as deferred tasks
sorts overdue tasks by priority before due date age
rejects invalid plan inputs before generating a plan
```

## 开发过程

先跑红灯：

```bash
npm test
```

红灯：

```text
ERR_MODULE_NOT_FOUND: Cannot find module 'src/today-plan.js'
```

实现：

```text
src/today-plan.js
```

关键设计：

- 不使用系统时间，调用方传入 `date`。
- 不访问外部资源，保持纯函数。
- 日期先用 `YYYY-MM-DD` 字符串，调用方负责时区归一。
- 任务只接受 `status: "open"`。
- 候选任务按 `overdue -> due-today` 排序。
- 同类任务按 `high -> medium -> low` 排序。
- 容量扫描时放不下的任务进入 `deferred`，继续尝试后续小任务。

## 验证

```bash
openspec validate today-plan-overdue-rollover --strict --json --no-interactive
```

结果：

```text
passed: 1
failed: 0
```

```bash
npm test
```

结果：

```text
tests 5
pass 5
fail 0
```

补最终结果展示后，当前测试结果是：

```text
tests 7
pass 7
fail 0
```

页面验证：

```bash
npm run dev
```

打开：

```text
http://127.0.0.1:4173
```

默认 90 分钟容量：

```text
今日执行：补齐客户发票资料、回复客户验收问题、写本周项目进展
顺延列表：整理版本发布说明
未进入计划：准备下周路线评审、提交差旅报销、等待法务反馈合同条款
```

容量调到 60 分钟：

```text
今日执行：补齐客户发票资料、写本周项目进展
顺延列表：回复客户验收问题、整理版本发布说明
已安排：55 分钟
剩余：5 分钟
```

```bash
openspec instructions apply --change today-plan-overdue-rollover --json
```

结果：

```text
total: 8
complete: 8
remaining: 0
state: all_done
```

## 交付复盘

这次实战能迁移到真实项目的不是“个人效率助手”这个题材，而是这条链路：

```text
业务需求 -> OpenSpec change -> 测试红灯 -> 领域实现 -> 测试绿灯 -> 结果页展示 -> 页面验证 -> OpenSpec tasks 完成 -> 复盘沉淀
```

真实项目里可以替换成：

- 订单超时自动关闭。
- 会员权益到期提醒。
- 工单 SLA 升级。
- 审批流逾期催办。
- 账单分期到期滚动。

只要需求有状态、日期、优先级、容量或边界条件，这套写法都能迁移。

## 当前交付证据

- `dev-process/01-openspec-today-plan-rollover.md`
- `dev-process/02-superpowers-today-plan-workflow.md`
- `openspec/changes/today-plan-overdue-rollover/`
- `src/today-plan.js`
- `src/today-plan-demo.js`
- `src/ui.js`
- `index.html`
- `test/today-plan.test.js`
- `test/today-plan-demo.test.js`
