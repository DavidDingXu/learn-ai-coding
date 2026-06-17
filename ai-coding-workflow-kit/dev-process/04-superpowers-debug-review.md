# 04 Superpowers Debug Review Record

## Real Demand

AI 在调试和评审时容易跳步骤：

```text
没复现就改。
没看 diff 就总结。
测试失败就归因环境。
修完没有重新验证。
review 只写摘要不列风险。
```

本次需求不是新增业务功能，而是把调试和评审流程固化成可复用工作流，让后续 AI 接手项目时按固定纪律工作。

## Method Used

使用 Superpowers 风格流程：

```text
systematic-debugging
requesting-code-review
verification-before-completion
receiving-code-review
```

项目内不复制插件源码，只记录如何把这些流程用于本项目。

## Debug Workflow

当 `npm test` 失败时，Agent 必须按这个顺序工作：

```text
1. 复现同一条命令。
2. 记录第一个失败断言。
3. 对照最近 diff。
4. 提出一个假设。
5. 用最小命令验证假设。
6. 只改根因文件。
7. 重新运行失败命令和相关回归命令。
8. 写验证记录。
```

## Review Workflow

当需求进入审查时，Agent 必须先看事实：

```text
git diff --stat
git diff -- src/cli.js test/cli.test.js README.md
npm test
```

评审输出必须包含：

```text
发现的问题。
文件和位置。
为什么影响真实用户或验证证据。
建议修复。
没有覆盖的残余风险。
```

## Applied Example

在 `context-pack` 需求里，review 重点不是“代码是否漂亮”，而是：

```text
只读边界是否写进输出。
CLI 是否只输出 stdout。
未知命令帮助是否包含 context-pack。
README 是否有可运行命令。
测试是否覆盖组合输出。
```

## Completion Gate

任何“完成”结论前必须有新鲜证据：

```bash
npm test
node src/cli.js context-pack --title "Inspect CLI contract" --files "src/cli.js,test/cli.test.js" --done "npm test"
git diff --stat
```

## Reusable Rule

Skill / Superpowers 的价值不在于工具名，而在于把高风险节点的顺序固定下来：先复现、再定位、再小改、再验证、再总结风险。

