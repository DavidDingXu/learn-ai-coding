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

如果文章或需求只是在讲“新增一个工具命令”“执行一个脚本”“整理一份上下文”，先问：

```text
这个改动解决了哪个用户、业务或产品问题？
读者能否迁移到自己的订单、任务、工单、审批、账单、内容、权限项目里？
```

如果答案不清楚，它只能作为工具样例，不能作为综合实战主线。

### 规则 2：OpenSpec 不是风格，是可执行命令和仓库产物

讲 OpenSpec 时至少要有：

- `openspec --version`
- `openspec init`
- `openspec new change`
- `openspec instructions`
- `openspec validate`
- `openspec status` 或 `openspec instructions apply`
- 实际生成的 `openspec/changes/<change>/`

只写 proposal、design、tasks 的形状，不足以算 OpenSpec 实战。

### 规则 3：Superpowers 文章必须写清当前入口

如果当前环境里的命令文件已经标注 deprecated，就不能继续把旧 slash command 当推荐入口。

规则记录只保留对读者有用的结论：文章应写当前 Skill 触发、触发条件和证据要求，而不是把过期命令写成固定流程。

### 规则 4：完成前必须有新鲜验证

“已经跑过测试”不是完成证据。

完成前至少重新跑：

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
- 某次文章排版策略。
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
