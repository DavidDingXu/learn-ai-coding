## Context

当前项目是个人效率助手的领域逻辑样例。用户每天早上生成“今日计划”时，最常见的问题不是任务不存在，而是历史未完成任务被新计划覆盖，或者系统把所有逾期事项一次性塞进今天。

本次只实现可复用的计划生成函数，不绑定 UI、数据库或后端任务调度。这样可以让 Web 页面、移动端和后端提醒任务复用同一套业务规则。

## Goals / Non-Goals

**Goals:**

- 提供 `buildTodayPlan` 领域函数，输入日期、容量和任务列表，输出今日任务、顺延任务、已用时间和剩余时间。
- 用测试覆盖逾期顺延、状态过滤、容量约束和排序规则。
- 保持实现无外部依赖，便于读者迁移到已有项目。

**Non-Goals:**

- 不实现任务 CRUD、账号系统、持久化、接口层或 UI。
- 不处理跨时区日期转换。输入日期先使用 `YYYY-MM-DD` 字符串，由调用方保证已经归一到用户本地日期。
- 不做复杂排程优化。容量选择采用可解释的顺序扫描，先保证产品规则稳定、测试可读。

## Decisions

### Decision: Use a pure domain function

`buildTodayPlan` 使用普通 JavaScript 函数实现，不读取文件、不访问网络、不依赖系统时间。

Rationale: 今日计划规则属于业务核心逻辑。纯函数更容易被测试覆盖，也更适合后续放进 API、前端状态管理或定时任务。

Alternative considered: 直接实现 CLI 或页面交互。这个方案会让实战看起来更完整，但会把重点从业务规则转移到展示层，降低读者迁移价值。

### Decision: Treat task status explicitly

只有 `status: "open"` 的任务参与计划。`done` 和 `blocked` 都不进入今日计划。

Rationale: 已完成任务不需要再执行；阻塞任务需要解除阻塞或提醒，不应该占用当天可执行容量。

Alternative considered: 把 blocked 放入 deferred。这个方案容易让“顺延”列表混入不可执行事项，后续 UI 和提醒策略会更混乱。

### Decision: Overdue before due-today, priority before age

候选任务先按任务类型排序：逾期任务优先于当天到期任务。逾期任务内部先看优先级，再看 dueDate。

Rationale: 产品目标是避免历史承诺继续丢失，但也不能让很老的低优任务压过近期高优任务。

Alternative considered: 完全按 dueDate 从旧到新排序。这个方案简单，但会让低价值旧任务长期占据计划顶部。

### Decision: Greedy capacity selection with deferred output

系统按排序后的候选列表扫描，能放进容量就加入 `items`，放不下就进入 `deferred`，并继续尝试后续更小任务。

Rationale: 真实用户希望今天的计划尽量填满，但也需要看到哪些高优任务因为容量不足被顺延。继续扫描后续小任务，可以避免 30 分钟任务放不下时，后面的 20 分钟任务也被无意义丢掉。

Alternative considered: 遇到第一个放不下的任务就停止。这个方案更严格，但会浪费可用容量。

## Risks / Trade-offs

- [Risk] 使用 `YYYY-MM-DD` 字符串比较日期，调用方如果传入非标准日期会得到错误结果。→ Mitigation: 在函数入口校验日期格式，不接受模糊日期。
- [Risk] 贪心选择不是全局最优排程。→ Mitigation: 当前产品目标是可解释的个人计划，不是数学最优排程；后续如需优化可单独扩展规格。
- [Risk] 任务估时缺失或异常会影响容量计算。→ Mitigation: 对 `estimateMinutes` 做非负数校验，缺失值按 0 处理，不让异常值扩大容量。

## Migration Plan

这是新增领域函数，不涉及已有数据迁移。

落地步骤：

1. 先跑测试，确认当前缺少实现的红灯。
2. 新增 `src/today-plan.js`。
3. 跑 `npm test`，确认规格场景绿灯。
4. 后续如接入 UI 或 API，只复用函数输出，不复制排序和容量逻辑。

## Open Questions

- 是否需要把 `blocked` 任务单独输出为 `blocked` 列表，供 UI 做提醒。
- 是否需要引入用户自定义优先级权重。
- 是否需要把“今日计划容量”拆成工作、生活、学习等不同桶。
