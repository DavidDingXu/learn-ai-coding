# 程序员 AI Coding 进阶实战：配套代码

这是《程序员 AI Coding 进阶实战》的配套代码仓库。仓库里保留两类可运行样例：一个业务需求 module，一个 AI Coding 工作流工具 module。

这些代码不是完整产品模板，也不是生产级框架。重点是让读者能看到一件真实开发任务如何从需求、上下文、规格、实现、测试、页面结果走到验证记录。

## 目录

```text
.
├── personal-productivity-app/   # 业务需求 module
└── ai-coding-workflow-kit/      # AI Coding 工作流工具 module
```

## 快速运行

两个 module 独立运行。业务 module 可以打开页面，也可以执行测试；工具 module 主要通过 CLI 和测试观察行为。

```bash
cd personal-productivity-app
npm run dev
```

```bash
cd personal-productivity-app
npm test
```

```bash
cd ai-coding-workflow-kit
npm test
```

当前只需要在具体 module 内运行命令，仓库根目录没有安装步骤。

## personal-productivity-app

这个 module 承载业务需求实战：个人效率助手生成“今日计划”时，自动纳入逾期未完成任务，并在每日容量限制下返回顺延列表。

你可以从这里看到：

- 怎么把一个口语化产品需求收敛成明确的业务边界。
- 怎么用 OpenSpec 变更包记录需求、设计、任务和验证。
- 怎么用测试约束 AI 生成的实现。
- 怎么用页面展示最终的今日计划、顺延列表和容量变化。
- 怎么把一次交付沉淀成后续可复用的规则。

入口文档：[personal-productivity-app/README.md](personal-productivity-app/README.md)

## ai-coding-workflow-kit

这个 module 承载 AI Coding 工作流样例：代码地图、任务上下文包、只读上下文包、验证记录和 CLI 合同。

你可以从这里看到：

- AI 接手陌生模块前，怎么先生成可复查的代码地图。
- 一次需求开始前，怎么组织任务上下文。
- 只读工具应该如何限制权限边界。
- CLI 改造时怎么同时看 stdout、stderr、exit code 和 README 示例。
- AI 声称完成后，怎么检查是否留下了验证证据。

入口文档：[ai-coding-workflow-kit/README.md](ai-coding-workflow-kit/README.md)

## 过程记录

两个 module 都保留 `dev-process/` 目录。它们不是额外说明文档，而是每次实战对应的过程记录，包括任务背景、上下文侦察、规格或计划、实现范围、验证结果和遗留风险。

读文章时，如果只看最终代码，很容易错过真正重要的部分：需求如何被缩小，哪些范围被拒绝，测试为什么这么写，以及完成前到底跑了哪些验证。

## 边界

- `personal-productivity-app` 包含领域逻辑和结果展示页，不包含接口、数据库和账号系统。
- `ai-coding-workflow-kit` 是仓库内使用的小工具，不替代专业代码索引、测试平台或 CI 系统。
- 示例代码可以迁移思路，不建议原样塞进生产项目。
