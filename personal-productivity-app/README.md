# Personal Productivity App

这个 module 用一个小型业务需求展示 AI Coding 的完整链路。

需求很具体：个人效率助手每天生成“今日计划”时，要把昨天或更早没完成的任务带回今天；但系统不能把所有历史任务都塞进当天计划，必须尊重当天可投入时间。

## 当前实现

```text
index.html
styles.css
src/today-plan.js
src/today-plan-demo.js
src/ui.js
test/today-plan.test.js
openspec/
dev-process/
```

- `index.html`：今日计划结果页。
- `styles.css`：页面样式。
- `src/today-plan.js`：今日计划生成规则。
- `src/today-plan-demo.js`：页面演示数据，复用今日计划生成规则。
- `src/ui.js`：页面渲染和容量调节交互。
- `test/today-plan.test.js`：业务规则测试。
- `openspec/`：OpenSpec 变更包，记录需求、设计、任务和规格。
- `dev-process/`：实战过程记录，保留上下文、实现范围、验证和复盘。

## 业务规则

`buildTodayPlan` 会根据目标日期和每日容量生成结果：

- 逾期未完成任务进入今日候选。
- 当天到期任务进入今日候选。
- 已完成、阻塞、未来任务不进入今日计划。
- 逾期任务优先于当天任务。
- 同类任务按优先级、日期和 `id` 稳定排序。
- 放不进当天容量的任务进入 `deferred`。

## 运行

查看页面：

```bash
npm run dev
```

打开：

```text
http://127.0.0.1:4173
```

运行测试：

```bash
npm test
```

期望结果：

```text
tests 7
pass 7
fail 0
```

## 建议阅读顺序

1. 先看 `dev-process/01-openspec-today-plan-rollover.md`，了解需求如何进入 OpenSpec 变更包。
2. 打开 `index.html`，看最终页面如何展示今日计划、顺延列表和容量变化。
3. 再看 `test/today-plan.test.js` 和 `test/today-plan-demo.test.js`，确认测试覆盖了哪些业务边界和展示数据。
4. 最后看 `src/today-plan.js`，对照实现是否满足测试和规格。

如果想动手改，可以先调整页面上的每日容量，观察任务如何进入今日计划或顺延列表；再改一个测试里的 `capacityMinutes` 或 `priority`，运行 `npm test` 看业务规则是否仍然成立。

## 边界

这个 module 只覆盖领域逻辑和一个结果展示页。真实产品还需要接口、持久化、用户账号、提醒系统和日历集成，这些都不在当前样例里。
