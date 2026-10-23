# AI Coding Workflow Kit 开发案例

这里记录配套工具从问题到交付的过程：接手陌生模块、修复 CLI 合同、准备任务上下文、限制只读工具权限，以及将验证结果沉淀为规则。

阅读时可以先看需求和验收标准，再对照涉及的文件、变更与验证证据。每份记录对应具体案例，采用其中的方法前，请先核对自己项目的约束。

## 案例索引

| 记录 | 真实触发问题 | 使用的方法 |
|---|---|---|
| `01-module-onboarding.md` | 第一次接手陌生 CLI 工具，不能直接让 AI 开改 | 上下文侦察、代码地图、任务上下文包 |
| `02-cli-contract-change.md` | CLI 用户可见错误提示、退出码和 README 命令需要稳定 | 小 diff、测试先行、验证记录 |
| `03-openspec-context-pack.md` | AI 接手任务前需要一份只读上下文交接材料 | OpenSpec 式 proposal/design/tasks |
| `04-superpowers-debug-review.md` | AI 调试和评审容易跳步骤，需要把流程固化 | Superpowers / Skill 工作流 |
| `05-readonly-tool-boundary.md` | 在接外部工具前，必须先明确只读能力和权限边界 | 外部工具接入边界 |
| `06-end-to-end-context-pack-delivery.md` | 从需求到交付完整实现 `context-pack`，并保留证据链 | 全链路交付复盘 |
| `07-rule-asset-sedimentation.md` | 交付后判断哪些经验写入规则库，哪些只留任务记录 | 规则库、检查清单、复盘资产 |
