# 06 End-to-End Context Pack Delivery Record

## Real Demand

新增 `context-pack` 命令，让 AI 接手任务时能拿到一份只读上下文包。

这次记录展示完整 AI Coding 需求链路，而不是只展示命令输出。

## Workflow

```text
1. 需求进入：用户需要一份 AI 接手任务的紧凑交接材料。
2. 上下文侦察：确认已有 codemap 和 task-context。
3. 规格约束：用 OpenSpec 式变更包写 proposal/design/tasks。
4. 计划拆解：先组合现有能力，不做新索引模型。
5. 实现：新增 context-pack lib 和 CLI 分支。
6. 测试：补 context-pack 输出测试和 CLI 合同测试。
7. 文档：README 增加可运行命令和边界说明。
8. 审查：确认只读边界、命令列表、README 和测试一致。
9. 验证：跑自动测试和目标 CLI 命令。
10. 沉淀：把只读工具边界写入过程记录。
```

## Task Card

```text
目标：
新增 context-pack 命令，输出任务上下文 + 代码地图 + 验证提醒。

范围：
- src/lib/context-pack.js
- src/cli.js
- test/context-pack.test.js
- test/cli.test.js
- README.md
- openspec/specs/cli/spec.md

非目标：
- 不做 MCP server。
- 不写文件。
- 不执行测试命令。
- 不访问外部系统。

完成定义：
- npm test 通过。
- context-pack 输出包含只读边界。
- README 有真实可运行命令。
- CLI spec 包含 context-pack。
```

## Implementation Evidence

新增文件：

```text
src/lib/context-pack.js
test/context-pack.test.js
```

修改文件：

```text
src/cli.js
test/cli.test.js
README.md
openspec/specs/cli/spec.md
```

## Verification Evidence

```bash
npm test
```

当前结果：

```text
tests 12
pass 12
fail 0
```

目标命令：

```bash
node src/cli.js context-pack --title "Inspect CLI contract" --files "src/cli.js,test/cli.test.js" --done "npm test"
```

应该看到：

```text
Read-only boundary
Task Context
Code Map
Verification reminders
```

## Review Notes

审查重点：

- `context-pack` 是否只组合现有能力。
- 输出是否明确“不执行命令”。
- CLI 未知命令帮助是否包含新命令。
- README 是否同步。
- 测试是否覆盖只读边界。

## Residual Risk

- 没有做路径逃逸安全测试，因为当前 CLI 面向本地可信仓库。
- 没有做 MCP schema，因为本次明确不做 MCP server。
- README 命令仍需要人工抽查，后续可以增加文档命令测试。

## Reusable Rule

端到端实战要留下完整链路：需求、上下文、规格、计划、实现、测试、审查、验证、残余风险和资产沉淀。只展示命令输出不是实战。
