# 03 OpenSpec Context Pack Record

## Real Demand

AI 接手任务时，经常需要一份紧凑交接材料：任务目标、相关文件、代码地图和验证提示。已有 `codemap` 和 `task-context`，但需要人工拼接。

本次需求是新增只读 `context-pack` 命令：

```text
把任务上下文、代码地图和验证提示组合成 Markdown。
只读仓库文件。
输出到 stdout。
不写文件，不执行项目命令，不访问网络。
```

## Method Used

使用 OpenSpec 式变更包管理需求：

```text
openspec/changes/context-pack-readonly/proposal.md
openspec/changes/context-pack-readonly/design.md
openspec/changes/context-pack-readonly/tasks.md
openspec/changes/context-pack-readonly/specs/cli/spec.md
```

## Proposal Summary

为什么做：

```text
codemap 和 task-context 已经能生成局部材料，但 AI 任务交接需要一份组合输出。
```

做什么：

```text
新增 context-pack 命令。
组合 task context 和 code map。
输出只读边界。
验证命令作为提示，不由工具执行。
```

不做什么：

```text
不做 MCP server。
不写文件。
不执行测试或 shell 命令。
不访问 Issue、浏览器、数据库或网络文档。
```

## Design Decision

复用已有函数，而不是重新做索引：

```text
createTaskContext
buildCodeMap
renderCodeMapMarkdown
```

原因：

- 避免新增复杂索引模型。
- 让 diff 集中在组合层。
- 保持只读边界清楚。

## Implementation Plan

```text
1. 新增 createContextPack。
2. 在 CLI 增加 context-pack 命令。
3. 增加 context-pack 测试。
4. 更新 README。
5. 更新 CLI spec。
6. 运行 npm test。
```

## Files Changed

```text
src/lib/context-pack.js
src/cli.js
test/context-pack.test.js
test/cli.test.js
README.md
openspec/specs/cli/spec.md
```

## Verification

```bash
npm test
node src/cli.js context-pack --title "Inspect CLI contract" --files "src/cli.js,test/cli.test.js" --done "npm test"
```

当前测试基线：

```text
tests 12
pass 12
fail 0
```

## Review Finding

新增 `context-pack` 后，未知命令帮助里的命令列表也必须同步。否则 CLI 合同和真实入口会漂移。

## Reusable Rule

OpenSpec 式变更包不是为了多建目录，而是让 AI 在动手前区分：当前事实、目标行为、设计取舍、执行任务和验证证据。
