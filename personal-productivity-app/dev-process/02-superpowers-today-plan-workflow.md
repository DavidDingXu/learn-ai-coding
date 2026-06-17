# Superpowers 实战记录：用 Skill 链约束今日计划需求

## 需求背景

需求来自个人效率助手：

```text
今日计划要自动纳入逾期未完成任务，并在每日容量限制下返回可执行清单和顺延列表。
```

这个需求有几条必须守住的业务约束：

- 逾期任务不能丢。
- 当天计划不能排爆。
- 已完成和阻塞任务不能占用今日容量。
- 高优先级逾期任务要比低优先级旧任务更靠前。
- 代码必须能被测试和 review 复核。

## Superpowers 入口核对

当前工作区使用 Skill 触发，涉及：

- `superpowers:test-driven-development`
- `superpowers:systematic-debugging`
- `superpowers:requesting-code-review`
- `superpowers:receiving-code-review`
- `superpowers:verification-before-completion`
- `superpowers:writing-plans`

同时核对到早期 slash command 已提示改用对应 Skill。因此本文不把 `/brainstorm`、`/write-plan`、`/execute-plan` 当成当前推荐入口。真实使用时按平台能力触发对应 Skill 或等价流程。

## 本次使用的 Skill 链

本需求的工作流是：

```text
OpenSpec change
  -> superpowers:test-driven-development
  -> superpowers:systematic-debugging
  -> superpowers:requesting-code-review
  -> superpowers:verification-before-completion
  -> superpowers:receiving-code-review
```

分工如下：

- OpenSpec：约束需求合同、设计边界和任务列表。
- TDD：实现前先写测试并看到红灯。
- systematic-debugging：测试失败时先读错误、复现、定位根因，不直接猜修复。
- requesting-code-review：实现完成后按需求、diff、测试证据审查风险。
- verification-before-completion：完成前必须跑新鲜验证命令。
- receiving-code-review：收到 review 后按“必须修 / 可选修 / 不处理”分类，不把 review 变成新需求。

## TDD 红灯

测试文件先存在：

```text
test/today-plan.test.js
```

第一次运行：

```bash
npm test
```

红灯：

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'<repo>/personal-productivity-app/src/today-plan.js'
```

这个红灯说明测试已经指向一个缺失的生产实现。它不是语法错误，也不是无意义失败。

## systematic-debugging 怎么介入

红灯出现后，不能直接“补一个文件试试”。

按 systematic-debugging 做到三件事：

1. 读错误：`ERR_MODULE_NOT_FOUND`。
2. 复现命令：`npm test`。
3. 对照当前文件：`test/today-plan.test.js` 引入 `../src/today-plan.js`，但项目没有 `src/today-plan.js`。

根因判断：

```text
测试已经定义了业务行为，缺失的是领域函数实现文件。
```

修复范围因此被限定为：

- 新增 `src/today-plan.js`。
- 不改测试语义。
- 不引入 UI、数据库、CLI 或外部依赖。

## 实现后的验证

新增实现：

```text
src/today-plan.js
```

再次运行：

```bash
npm test
```

输出：

```text
✔ carries overdue unfinished tasks into today plan before today tasks
✔ does not include completed or blocked tasks
✔ respects daily capacity and returns overflow as deferred tasks
✔ sorts overdue tasks by priority before due date age
✔ rejects invalid plan inputs before generating a plan
ℹ pass 5
ℹ fail 0
```

这个输出对应 Superpowers 调试阶段的领域函数交付。当前仓库后来补了结果页和页面演示测试，完整 `npm test` 会包含 7 个测试。

这里的重点不是“测试通过”四个字，而是测试名称直接映射业务规则：

- 逾期任务是否纳入今日计划。
- 完成/阻塞任务是否被排除。
- 容量是否生效。
- 逾期任务排序是否符合产品优先级。
- 输入边界是否被拒绝。

## requesting-code-review 检查点

本次 review 不看“代码是否优雅”这种空泛问题，先看行为风险：

```text
需求：今日计划纳入逾期任务，但不排爆当天容量。
变更文件：
- src/today-plan.js
- test/today-plan.test.js
- openspec/changes/today-plan-overdue-rollover/*

重点检查：
1. status 过滤是否误收 done / blocked。
2. future dueDate 是否被错误纳入。
3. overdue 是否一定排在 due-today 前。
4. priority 是否优先于 dueDate age。
5. capacity 是否会超过。
6. deferred 是否保留放不下的候选任务。
7. 输入校验是否覆盖日期、容量、估时。
8. 实现是否引入了 spec 没要求的 UI、I/O、依赖或系统时间。
```

这类 review 才能帮助真实项目发现行为回归。

## verification-before-completion 新鲜证据

完成前必须重新跑：

```bash
openspec validate today-plan-overdue-rollover --strict --json --no-interactive
npm test
openspec instructions apply --change today-plan-overdue-rollover --json
```

本次结果：

- OpenSpec strict validate：`passed: 1, failed: 0`
- Node test：该阶段 `pass 5, fail 0`；当前仓库完整测试包含页面演示测试，运行结果为 `pass 7, fail 0`
- OpenSpec apply：`total 8, complete 8, remaining 0`

这些输出比“已完成”更有价值。

## receiving-code-review 的处理边界

如果 review 后收到意见，先分类：

- 必须修：违反 OpenSpec spec、测试缺口、容量超限、排序错误、状态误收。
- 可选修：命名更清晰、局部拆函数、错误文案优化。
- 不处理：新增 UI、接数据库、做复杂排程算法、加入提醒系统。

原因很简单：本次需求的合同是领域函数。超出合同的意见可以记录，但不能混进当前 diff。

## 迁移到你的项目

你可以不用 Superpowers 插件，但这条链路要保留：

```text
需求合同 -> 红灯测试 -> 根因定位 -> 小实现 -> review 检查点 -> 新鲜验证 -> 处理 review
```

对业务需求尤其要注意：

- Skill 不负责替你定义产品边界，spec 才负责。
- Debug Skill 不负责帮你猜，负责阻止你没证据就改。
- Review Skill 不负责夸你写得好，负责发现行为风险。
- Verification Skill 不负责复述旧输出，负责要求新鲜命令证据。

## 当前证据文件

- OpenSpec 记录：`openspec/changes/today-plan-overdue-rollover/`
- 过程记录：`dev-process/01-openspec-today-plan-rollover.md`
- 实现：`src/today-plan.js`
- 测试：`test/today-plan.test.js`
