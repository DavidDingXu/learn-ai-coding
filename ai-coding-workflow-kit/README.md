# AI Coding Workflow Kit

这个 module 提供一组仓库内使用的小工具，用来演示 AI Coding 里的上下文、权限和验证问题。

它不是通用 CLI 框架，也不替代代码索引平台。它的价值在于把几个常见动作做成可运行命令：生成代码地图、整理任务上下文、打包只读材料、检查验证记录。

## 运行

```bash
npm test
```

期望结果：

```text
tests 12
pass 12
fail 0
```

## 命令

生成代码地图：

```bash
node src/cli.js codemap --root .
```

生成上下文审计报告：

```bash
node src/cli.js context-audit --root .
```

生成任务上下文包：

```bash
node src/cli.js task-context \
  --title "修复订单状态回退问题" \
  --files "src/order.ts,test/order.test.ts"
```

生成只读上下文包：

```bash
node src/cli.js context-pack \
  --title "改进 CLI 错误提示" \
  --files "src/cli.js,test/cli.test.js" \
  --done "npm test"
```

校验验证记录：

```bash
node src/cli.js verify-ledger --file examples/verification-ledger.pass.md
```

查看失败示例：

```bash
node src/cli.js verify-ledger --file examples/verification-ledger.fail.md
```

失败示例会返回非 0 退出码，适合用来观察 CLI 合同和测试断言。

## 目录

```text
src/                  # CLI 和工具实现
test/                 # node:test 测试
examples/             # 验证记录样例
openspec/             # CLI 相关变更包
dev-process/          # 实战过程记录
```

## 适合观察的问题

- AI 接手陌生仓库前，代码地图能给出哪些入口和测试线索。
- Agent 动手前，人应该检查哪些上下文风险。
- 任务上下文包应该写目标、约束、相关文件和完成定义。
- 只读工具只读文件，不写文件、不执行项目命令、不访问网络。
- 验证记录不能只写“已完成”，必须留下命令、结果或人工确认依据。

## 边界

- `codemap` 是轻量目录扫描，不解析完整 AST。
- `context-audit` 是启发式报告，不证明真实运行路径。
- `context-pack` 只读仓库文件。
- `verify-ledger` 只检查记录格式和证据线索，不判断业务是否真的正确。
- 这些命令用于理解工作流，可以迁移思路，不建议原样作为生产工具发布。
