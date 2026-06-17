# OpenSpec 实战记录：今日计划自动纳入逾期任务

## 业务需求

个人效率助手每天早上生成“今日计划”。如果用户昨天或更早的任务没有完成，系统要把这些任务带回今天；但不能把所有历史任务无脑塞进今天，必须尊重当天可投入时间。

本次需求目标：

- 逾期未完成任务自动进入今日候选。
- 当天到期任务也进入今日候选。
- 已完成、阻塞、未来任务不进入今日计划。
- 今日计划不能超过 `capacityMinutes`。
- 放不下的候选任务返回到 `deferred`，供后续提醒或顺延。

## 本机 OpenSpec 环境

```bash
node --version
# v24.14.1

npm --version
# 11.11.0

npm view @fission-ai/openspec name version bin engines --json
# {
#   "name": "@fission-ai/openspec",
#   "version": "1.4.1",
#   "bin": {
#     "openspec": "bin/openspec.js"
#   },
#   "engines": {
#     "node": ">=20.19.0"
#   }
# }

npm install -g @fission-ai/openspec
# added 80 packages in 7s

openspec --version
# 1.4.1
```

## 初始化项目

```bash
openspec init --tools codex .
```

关键输出：

```text
OpenSpec Setup Complete

Created: Codex
5 skills and 5 commands in .codex/
Config: skipped (non-interactive mode)

Getting started:
  Start your first change: /opsx:propose "your idea"
```

这一步不是“写成 OpenSpec 式材料”，而是让 OpenSpec 真实生成项目里的 `.codex/skills` 和 `openspec/` 结构。

## 创建 change

```bash
openspec new change today-plan-overdue-rollover \
  --description "今日计划自动纳入逾期未完成任务，并在每日容量限制下给出顺延列表。" \
  --goal "让个人效率助手每天生成可执行的今日计划，避免逾期任务丢失或一天被排爆。" \
  --json
```

关键输出：

```json
{
  "change": {
    "id": "today-plan-overdue-rollover",
    "path": "openspec/changes/today-plan-overdue-rollover",
    "schema": "spec-driven"
  }
}
```

## 读取 OpenSpec 的产物顺序

```bash
openspec status --change today-plan-overdue-rollover --json
```

关键结论：

- schema：`spec-driven`
- 工作流：`proposal -> specs/design -> tasks`
- apply 前置：`tasks`
- action context：`repo-local`
- allowed edit root：当前 `personal-productivity-app`

OpenSpec 给出的下一步是：

```text
Run openspec instructions proposal --change "today-plan-overdue-rollover" --json before writing that artifact.
```

## 逐项生成 artifacts

先读取 `proposal` 指令：

```bash
openspec instructions proposal --change today-plan-overdue-rollover --json
```

写入：

- `openspec/changes/today-plan-overdue-rollover/proposal.md`

再读取并写入 specs/design：

```bash
openspec instructions specs --change today-plan-overdue-rollover --json
openspec instructions design --change today-plan-overdue-rollover --json
```

写入：

- `openspec/changes/today-plan-overdue-rollover/specs/today-plan/spec.md`
- `openspec/changes/today-plan-overdue-rollover/design.md`

严格校验：

```bash
openspec validate today-plan-overdue-rollover --strict --json --no-interactive
```

关键输出：

```json
{
  "summary": {
    "totals": {
      "items": 1,
      "passed": 1,
      "failed": 0
    }
  }
}
```

读取并写入 tasks：

```bash
openspec instructions tasks --change today-plan-overdue-rollover --json
```

写入：

- `openspec/changes/today-plan-overdue-rollover/tasks.md`

OpenSpec apply instructions 可以解析出 8 个任务：

```bash
openspec instructions apply --change today-plan-overdue-rollover --json
```

关键输出：

```json
{
  "progress": {
    "total": 8,
    "complete": 0,
    "remaining": 8
  },
  "state": "ready"
}
```

## TDD 红灯

先跑测试，不先写实现：

```bash
npm test
```

红灯：

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'<repo>/personal-productivity-app/src/today-plan.js'
```

这个失败是有价值的：测试已经表达了业务期望，但实现还不存在。

## 实现

新增：

- `src/today-plan.js`

核心规则：

- `status === "open"` 才能进入候选。
- `dueDate < date` 标记为 `overdue`。
- `dueDate === date` 标记为 `due-today`。
- 逾期任务排在当天任务之前。
- 同类任务内按 `high -> medium -> low` 排序。
- 优先级相同再按 `dueDate` 和 `id` 稳定排序。
- 能放进容量的进入 `items`，放不下的进入 `deferred`。
- 输出 `usedMinutes` 和 `remainingMinutes`。

## 绿灯

```bash
npm test
```

最终输出：

```text
✔ carries overdue unfinished tasks into today plan before today tasks
✔ does not include completed or blocked tasks
✔ respects daily capacity and returns overflow as deferred tasks
✔ sorts overdue tasks by priority before due date age
✔ rejects invalid plan inputs before generating a plan
ℹ pass 5
ℹ fail 0
```

这个输出对应 OpenSpec 阶段的领域函数交付。当前仓库后来补了结果页和页面演示测试，完整 `npm test` 会包含 7 个测试。

## 当前落地文件

- `README.md`：产品背景和项目边界。
- `openspec/changes/today-plan-overdue-rollover/proposal.md`：为什么做。
- `openspec/changes/today-plan-overdue-rollover/specs/today-plan/spec.md`：可测试需求。
- `openspec/changes/today-plan-overdue-rollover/design.md`：实现决策和边界。
- `openspec/changes/today-plan-overdue-rollover/tasks.md`：可跟踪任务。
- `test/today-plan.test.js`：业务规则测试。
- `src/today-plan.js`：领域逻辑实现。

## 迁移到真实项目时要保留的部分

- 保留 OpenSpec change 目录，不要只保留代码 diff。
- 每个需求至少有一个能被测试映射的 `Requirement + Scenario`。
- 实现前先跑红灯，避免“AI 说完成了但没有证据”。
- tasks 要在实现中勾选，方便 code review 时看需求、实现和验证是否一致。
- 业务规则放在可复用领域函数里，UI/API 只做适配。
