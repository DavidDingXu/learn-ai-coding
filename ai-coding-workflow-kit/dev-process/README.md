# AI Coding Workflow Kit Development Process Records

这个目录保存配套工程中工具 module 的真实需求开发过程记录。

这里的“真实需求”不是为了文章临时造一个能跑的命令，而是开发工作中会真实遇到的问题：接手陌生模块、修复用户可见合同、给 AI 准备任务上下文、控制只读工具边界、固化调试评审流程、交付后沉淀规则。

它不是命令清单，也不是文章素材归档。每份记录都要回答：

```text
这次真实需求是什么？
为什么要做？
进入代码前读了哪些文件？
用什么方式约束 AI：上下文包、spec、plan、Skill、人工检查？
实际改了哪些文件？
怎么验证？
审查时发现了什么风险？
哪些经验值得沉淀？
```

正式实战文章只能基于这些过程记录展开。只执行一个 CLI 命令、贴一段输出、说明工具能跑，不算真实实战。

## Records

| 记录 | 真实触发问题 | 使用的方法 |
|---|---|---|
| `01-module-onboarding.md` | 第一次接手陌生 CLI 工具，不能直接让 AI 开改 | 上下文侦察、代码地图、任务上下文包 |
| `02-cli-contract-change.md` | CLI 用户可见错误提示、退出码和 README 命令需要稳定 | 小 diff、测试先行、验证记录 |
| `03-openspec-context-pack.md` | AI 接手任务前需要一份只读上下文交接材料 | OpenSpec 式 proposal/design/tasks |
| `04-superpowers-debug-review.md` | AI 调试和评审容易跳步骤，需要把流程固化 | Superpowers / Skill 工作流 |
| `05-readonly-tool-boundary.md` | 在接外部工具前，必须先明确只读能力和权限边界 | 外部工具接入边界 |
| `06-end-to-end-context-pack-delivery.md` | 从需求到交付完整实现 `context-pack`，并保留证据链 | 全链路交付复盘 |
| `07-rule-asset-sedimentation.md` | 交付后判断哪些经验写入规则库，哪些只留任务记录 | 规则库、检查清单、复盘资产 |
