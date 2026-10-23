# 程序员 AI Coding 进阶实战

**Learn AI Coding · 在真实代码库里，用 AI 完成一次可审查、可验证的需求交付。**

[![课程已完结](https://img.shields.io/badge/课程-已完结-16a34a)](docs/course/README.md)
[![完整文章](https://img.shields.io/badge/完整文章-42_篇-2563eb)](docs/course/README.md)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](LICENSE)

一套面向有开发经验程序员的完整开源课程。42 篇图文内容覆盖 Agent 工作机制、工具工作台、上下文工程、SDD / OpenSpec、测试与调试、Skill / Superpowers、MCP 和综合实战；两个可运行项目保留需求、规格、实现、测试与复盘过程。

**[开始阅读](docs/course/README.md) · [学习地图](docs/course/00-%E5%AF%BC%E8%AF%BB%E4%B8%8E%E5%AD%A6%E4%B9%A0%E5%9C%B0%E5%9B%BE/00-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%A6%82%E4%BD%95%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0-AI-Coding.md) · [业务实战](personal-productivity-app/README.md) · [工作流工具](ai-coding-workflow-kit/README.md) · [参与贡献](CONTRIBUTING.md)**

## 学完能做什么

- 让 Agent 接手陌生代码库，产出可复查的代码地图、搜索结论和任务上下文。
- 把一句需求变成规格、设计和小任务，用 OpenSpec 管理变更。
- 用小 diff、失败测试、调试记录和审查证据约束 AI 的实现。
- 把重复流程做成 Skill，明确 MCP 与只读工具的权限边界。
- 完成一次业务需求，把交付经验沉淀到自己的工程规则里。

## 学习路线

![程序员 AI Coding 学习路线](docs/assets/diagrams/png/00-ai-coding-learning-map.png)

| 模块 | 内容 | 动手后应得到什么 |
| --- | --- | --- |
| 00 | [导读与学习地图](docs/course/README.md#module-00) | 明确学习目标，选择第一条动手路线 |
| 01 | [AI Coding 底层心智](docs/course/README.md#module-01) | 理解 Agent 循环，判断任务与风险边界 |
| 02 | [程序员工具工作台](docs/course/README.md#module-02) | 组织 App、CLI、IDE、终端与测试反馈 |
| 03 | [上下文工程与代码库理解](docs/course/README.md#module-03) | 生成可复查的代码地图、搜索记录与任务上下文 |
| 04 | [SDD 与 OpenSpec 实战](docs/course/README.md#module-04) | 把需求写成规格、设计和可审查的小任务 |
| 05 | [小步开发测试与调试闭环](docs/course/README.md#module-05) | 用小 diff、测试、调试证据和 CLI 合同验证结果 |
| 06 | [Skill Superpowers 与工作流固化](docs/course/README.md#module-06) | 用 Skill、Superpowers、MCP 固化可复用流程 |
| 07 | [综合实战与资产沉淀](docs/course/README.md#module-07) | 完成真实业务需求，沉淀规则和交付记录 |
| 08 | [个人工程资产](docs/course/README.md#module-08) | 建立个人工程资产，承接团队协作 |

课程目录提供全部文章全文、前后章节导航和实践链接。可以从 [程序员如何系统学习 AI Coding](docs/course/00-%E5%AF%BC%E8%AF%BB%E4%B8%8E%E5%AD%A6%E4%B9%A0%E5%9C%B0%E5%9B%BE/00-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%A6%82%E4%BD%95%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0-AI-Coding.md) 顺序开始，也可以先做 [OpenSpec 业务实战](docs/course/04-SDD-%E4%B8%8E-OpenSpec-%E5%AE%9E%E6%88%98/21-%E6%A8%A1%E5%9D%97%E5%AE%9E%E6%88%98-%E7%94%A8-OpenSpec-CLI-%E6%8E%A8%E8%BF%9B%E4%B8%80%E6%AC%A1%E7%9C%9F%E5%AE%9E%E4%BA%A7%E5%93%81%E9%9C%80%E6%B1%82.md) 或 [CLI 交互改造](docs/course/05-%E5%B0%8F%E6%AD%A5%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E4%B8%8E%E8%B0%83%E8%AF%95%E9%97%AD%E7%8E%AF/28-%E6%A8%A1%E5%9D%97%E5%AE%9E%E6%88%98-%E7%94%A8-AI-%E5%AE%8C%E6%88%90%E4%B8%80%E6%AC%A1-CLI-%E4%BA%A4%E4%BA%92%E6%94%B9%E9%80%A0.md)，再回到对应原理。

## 十分钟开始动手

阅读文章无需安装工具。运行示例准备 Git 和 Node.js 20 或更高版本；两个项目均使用 Node 内置能力，无需安装第三方依赖。

```bash
git clone https://github.com/DavidDingXu/learn-ai-coding.git
cd learn-ai-coding/personal-productivity-app
npm test
npm run dev
```

打开 `http://127.0.0.1:4173`，调整每日容量，观察任务进入今日计划还是顺延列表。命令适用于 macOS、Windows 和 Linux。

在另一个终端体验工作流工具：

```bash
cd learn-ai-coding/ai-coding-workflow-kit
npm test
node src/cli.js codemap --root .
node src/cli.js context-audit --root .
```

## 两条实践主线

| 项目 | 实践问题 | 建议从哪里看 |
| --- | --- | --- |
| [个人效率助手](personal-productivity-app/README.md) | 今日计划、逾期顺延、每日容量；用 OpenSpec、测试和页面完成业务交付 | [需求进入与规格](personal-productivity-app/dev-process/01-openspec-today-plan-rollover.md)、[完整交付过程](personal-productivity-app/dev-process/03-end-to-end-today-plan-delivery.md) |
| [AI Coding Workflow Kit](ai-coding-workflow-kit/README.md) | 代码地图、任务上下文、CLI 合同、只读工具与验证记录 | [陌生模块接手](ai-coding-workflow-kit/dev-process/01-module-onboarding.md)、[只读工具边界](ai-coding-workflow-kit/dev-process/05-readonly-tool-boundary.md) |

`dev-process/` 保留需求范围、方案取舍、验证与复盘；`openspec/` 保留变更包。建议把文章、过程记录、测试和最终实现放在一起看，再选一个自己的项目需求练习。

## 适合谁

适合已掌握 Git、命令行、测试和基本工程结构，正在用 AI 修改真实项目的程序员。示例业务项目覆盖领域逻辑和结果页；工具项目用于理解工作流，迁移到实际产品时仍需补齐自己的接口、持久化和权限要求。

## 目录结构

```text
docs/course/                  42 篇完整文章、目录与章节导航
docs/assets/                  正文插图和可编辑图源
personal-productivity-app/    业务需求、OpenSpec、实现与测试
ai-coding-workflow-kit/       CLI、上下文与验证工具
```

## 勘误与贡献

欢迎提交文章勘误、复现问题和实践案例。请提供章节、工具版本、最小复现和观察到的结果，具体方式见 [贡献指南](CONTRIBUTING.md)。全文、插图和示例代码按 [Apache License 2.0](LICENSE) 开放，引用或改编时请保留来源与授权声明。

## 相关课程

| 课程 | 适合谁 | 学习重点 |
| --- | --- | --- |
| [程序员 AI Coding 进阶实战](README.md) | 已有开发经验的程序员 | 上下文、SDD、测试调试、Skill 与完整需求交付 |
| [AI Coding 团队化实战](https://github.com/DavidDingXu/ai-coding-for-teams) | 技术负责人、架构师、研发效能团队 | 共享运行时、团队规则、验证治理与协作 |
| [Java AI 应用开发实战](https://github.com/DavidDingXu/learn-java-ai) | Java / Spring Boot 后端工程师 | 模型调用、RAG、受控 Agent 与生产接入 |
