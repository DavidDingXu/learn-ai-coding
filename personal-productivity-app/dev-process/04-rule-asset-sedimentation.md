# 规则沉淀记录：从今日计划需求沉淀个人 AI Coding 规则

## 交付后观察

今日计划逾期顺延需求暴露了几类可复用问题：

- 业务需求容易被写成工具流程，而不是用户可感知行为。
- AI 容易先实现，再补说明，导致 spec 失去约束力。
- 测试如果不先红灯，就很难证明它真的约束了新行为。
- 完成汇报如果只写“测试通过”，review 很难知道哪些业务风险被覆盖。
- 只有过程记录和函数测试还不够，业务实战需要能看到用户可见的最终结果。
- Skill 如果只写名字，不说明触发条件和证据要求，就会变成口号。

## 候选规则

### 规则 1：实战需求必须先写用户可见行为

如果需求只是在讲“新增一个工具命令”“执行一个脚本”“整理一份上下文”，先问：

```text
这个改动解决了哪个用户、业务或产品问题？
用户在什么操作下会观察到行为变化，验收时如何确认？
```

如果答案不清楚，先补齐需求和验收标准，再决定是否实现。

### 规则 2：OpenSpec 不是风格，是可执行命令和仓库产物

使用 OpenSpec 管理变更时，核对工具版本、变更产物和校验结果：

- `openspec --version`
- `openspec init`
- `openspec new change`
- `openspec instructions`
- `openspec validate`
- `openspec status` 或 `openspec instructions apply`
- 实际生成的 `openspec/changes/<change>/`

proposal、design、tasks 应关联同一个变更，并与实际实现和校验结果一致。

### 规则 3：工具入口应与安装版本一致

如果当前环境里的命令文件已经标注 deprecated，就不能继续把旧 slash command 当推荐入口。

记录当前版本支持的 Skill 入口、触发条件和证据要求，升级工具后核对这些约定。

### 规则 4：验证证据必须对应当前改动

记录验证对应的代码状态和结果。相关代码与环境未变时可复用已有记录；有影响时再运行对应检查，例如：

```bash
npm test
npm run dev
openspec validate <change> --strict --json --no-interactive
openspec instructions apply --change <change> --json
```

并记录：

```text
pass/fail 数量
页面关键状态和交互结果
OpenSpec validate 是否通过
tasks 是否全部 complete
```

### 规则 5：规则沉淀只沉淀可复用边界

不要沉淀：

- 某个 demo 的命令名。
- 某个临时目录路径。
- 某次临时展示方式。
- 某次临时判断口径。

应该沉淀：

- 哪类需求必须用 spec。
- 哪类失败必须走 systematic-debugging。
- 哪些完成声明必须先跑验证。
- 哪些 review 意见属于当前 scope，哪些应另开需求。
- 哪些业务实战必须补用户可见结果页或截图证据。

## 落地位置建议

项目事实放：

```text
AGENTS.md
openspec/specs/
README.md
```

跨项目流程放：

```text
个人 Skill
Superpowers Skill 使用记录
dev-process/
```

可执行证据放：

```text
test/
scripts/
verification ledger
```

## 本次已落地资产

- OpenSpec change：`openspec/changes/today-plan-overdue-rollover/`
- 业务测试：`test/today-plan.test.js`
- 页面演示测试：`test/today-plan-demo.test.js`
- 领域实现：`src/today-plan.js`
- 结果页：`index.html`
- 页面渲染：`src/ui.js`
- 页面演示数据：`src/today-plan-demo.js`
- OpenSpec 过程记录：`dev-process/01-openspec-today-plan-rollover.md`
- Superpowers 过程记录：`dev-process/02-superpowers-today-plan-workflow.md`
- 端到端过程记录：`dev-process/03-end-to-end-today-plan-delivery.md`
