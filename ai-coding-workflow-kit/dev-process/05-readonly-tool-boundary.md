# 05 Read-Only Tool Boundary Record

## Real Demand

在 AI Coding 中，给 Agent 接外部工具前，必须先确认工具边界。很多 MCP 接入失败不是协议问题，而是工具一开始就没有定义清楚能读什么、能写什么、能不能执行命令。

本次需求是先做一个只读项目工具 `context-pack`，再判断是否值得包装成 MCP。

## Method Used

先做本地 CLI 安全内核：

```text
输入：title、files、done、root。
读取：仓库内文件和目录结构。
输出：Markdown。
禁止：写文件、执行命令、访问网络。
```

## Boundary Checklist

```text
能读什么？
- root 下的文件树和指定文件路径。

能写什么？
- 什么都不写，只输出 stdout。

能执行什么？
- 不执行项目命令，只把验证命令写成提醒。

能联网吗？
- 不能。

失败时怎么表现？
- 参数缺失走 CLI 错误路径。

输出怎么验证？
- 测试检查只读边界文本、task context、code map 和 done 提示。
```

## Files

```text
src/lib/context-pack.js
src/cli.js
test/context-pack.test.js
README.md
openspec/changes/context-pack-readonly/*
```

## Verification

```bash
npm test
node src/cli.js context-pack --title "Inspect CLI contract" --files "src/cli.js,test/cli.test.js" --done "npm test"
```

## MCP Decision

当前不包装 MCP。

原因：

```text
本地 CLI 已经能稳定输出上下文包。
还没有多个客户端复用这个能力的需求。
还没有外部资源接入需求。
权限边界仍应保持只读。
```

如果未来要包装 MCP，必须先补：

```text
工具 schema。
根目录访问限制。
路径逃逸测试。
错误返回格式。
调用日志。
只读权限说明。
```

## Reusable Rule

MCP 之前先做可验证的只读核心。协议化之前，先证明输入、输出、权限和失败边界都清楚。

