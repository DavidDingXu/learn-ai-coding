# 07 Rule Asset Sedimentation Record

## Real Demand

一次 AI Coding 交付结束后，需要判断哪些经验应该沉淀为长期资产，哪些只是当前项目的临时记录。

本次从 `context-pack` 交付中沉淀个人规则库。

## Source Delivery

来源需求：

```text
新增只读 context-pack 命令，帮助 AI 接手任务前生成紧凑上下文包。
```

来源过程：

```text
dev-process/03-openspec-context-pack.md
dev-process/05-readonly-tool-boundary.md
dev-process/06-end-to-end-context-pack-delivery.md
```

## What To Keep

适合沉淀为长期规则：

```text
新增工具前先写只读边界。
CLI 交互要验证 stdout、stderr、exit code。
README 命令属于用户路径。
未知命令帮助要和实际命令列表同步。
完成前必须有新鲜验证证据。
OpenSpec 式变更包要区分当前事实、目标行为、设计取舍和任务。
```

适合沉淀为检查清单：

```text
需求是否有非目标？
AI 是否读过真实入口和测试？
diff 是否只落在任务范围？
验证命令是否覆盖用户可见行为？
文档命令是否能运行？
残余风险是否写出来？
```

## What Not To Keep

不进入全局规则：

```text
context-pack 这个具体命令名。
当前测试数量。
当前文件路径。
当前文章叙述顺序。
当前 OpenSpec change 名称。
```

这些只保留在项目过程记录里。

## Suggested Rule Text

```text
当 AI Coding 任务涉及 CLI、脚本、外部工具或 MCP 接入时，先要求 Agent 写清输入、输出、读写权限、失败行为和验证命令。未写清边界前，不授权实现。
```

```text
完成报告必须包含：实际修改文件、验证命令和结果、未覆盖场景、需要人工复核的风险。只有一句“已完成”不接受。
```

## Reusable Rule

资产沉淀不是把一次任务的所有细节写进全局规则，而是提取可迁移、可验证、反复出现的工程纪律。
