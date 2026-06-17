# 01 Module Onboarding Record

## Real Demand

一个程序员第一次接手 `ai-coding-workflow-kit`，准备让 AI 帮忙改进 CLI 工具，但不能一上来就授权 AI 修改代码。

目标不是“跑一下项目看看结果”，而是建立一份可复查的接手记录，让后续小 diff 有明确入口、边界和验证命令。

## Starting Request

```text
我想让 AI 帮我改进这个 AI Coding 工具项目。先不要改代码，先搞清楚项目结构、CLI 入口、测试覆盖和第一个安全的小改动应该从哪里开始。
```

## Method Used

- 主工作面：能访问仓库并运行只读命令的 Agent。
- 人工复核：检查 Agent 给出的入口、测试、禁止修改范围和验证命令。
- 过程材料：代码地图、上下文审计、任务上下文包。

## Context Scouting

先读这些文件，不进入实现：

```text
README.md
package.json
src/cli.js
src/lib/codemap.js
src/lib/task-context.js
src/lib/verification-ledger.js
test/cli.test.js
test/codemap.test.js
```

需要回答的问题：

```text
项目提供哪些 CLI 命令？
每个命令的用户可见输出是什么？
当前测试覆盖哪些行为？
哪些目录只是 examples 或 openspec 材料？
第一个小改动应该避开什么？
```

## AI Handoff Prompt

```text
你现在只做仓库侦察，不改文件。

请阅读 README.md、package.json、src/cli.js、src/lib/*.js 和 test/*.test.js，
输出一份接手记录：
1. CLI 当前命令列表。
2. 每个命令对应的实现文件和测试文件。
3. 第一个小改动建议。
4. 禁止修改范围。
5. 最小验证命令。

如果证据不足，必须写“未确认”，不要猜。
```

## Human Review

复核时发现：

- `src/cli.js` 是命令分发入口。
- `src/lib/*.js` 是功能边界，不应该在接手阶段重构。
- `examples/` 是验证记录样例，不是生产输入。
- `openspec/` 是规格材料，不是运行时代码。
- 当前最小验证命令是 `npm test`，目标命令验证要按具体需求补充。

## First Safe Change Candidate

第一个小改动不选“重构 CLI”，而选用户可见且可测试的合同：

```text
补齐未知命令和缺参数时的 stdout/stderr/exit code 行为。
```

理由：

- 范围集中在 `src/cli.js` 和 `test/cli.test.js`。
- 有清晰用户可见行为。
- 可以用进程级测试验证。
- 不需要引入新依赖。

## Verification Baseline

进入实现前先跑：

```bash
npm test
```

当前基线：

```text
tests 12
pass 12
fail 0
```

## Reusable Rule

陌生模块的第一步不是让 AI 改代码，而是让它生成可检查的接手记录。人复核入口、测试、禁止修改范围和验证命令后，才授权第一个小 diff。

