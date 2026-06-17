# 02 CLI Contract Change Record

## Real Demand

CLI 工具的用户可见行为需要稳定。未知命令、缺参数、验证失败这些路径会被人和脚本消费，不能只靠库函数测试。

本次需求是补齐 CLI 进程级合同：

```text
未知命令必须失败并输出可读命令列表。
verify-ledger 缺少 --file 必须失败。
verify-ledger 校验失败时 exit code 必须为 1。
README 中的命令必须引用仓库里真实存在的文件。
```

## Method Used

- 计划方式：先写行为合同，再写测试。
- 实现方式：小 diff，只碰 CLI 分发、CLI 进程测试和 README。
- 验证方式：`node --test` 加手动命令。

## Task Card

```text
目标：
补齐 CLI 用户可见交互合同，保证 stdout、stderr、exit code 和 README 示例可验证。

范围：
- src/cli.js
- test/cli.test.js
- README.md

非目标：
- 不引入 commander/yargs。
- 不重做 CLI 架构。
- 不改变成功命令的 Markdown 输出格式。
- 不修改 lib 层业务函数。

完成定义：
- npm test 通过。
- 未知命令、缺 --file、失败 ledger 三条路径有进程级测试。
- README 示例命令引用真实存在的 examples 文件。
```

## TDD Record

先补进程级测试：

```text
test/cli.test.js
```

覆盖行为：

```text
node src/cli.js unknown
node src/cli.js verify-ledger
node src/cli.js verify-ledger --file examples/verification-ledger.fail.md
```

期望：

- 未知命令：非 0 退出码，stderr 包含命令列表。
- 缺 `--file`：非 0 退出码，stderr 包含 `--file is required`。
- 失败 ledger：exit code 为 1，stdout 保留报告。

## Implementation Notes

实现只在 `src/cli.js` 做最小调整：

- 明确未知命令分支。
- 错误写 stderr。
- 保留成功命令 stdout。
- 不引入新依赖。

README 只同步真实可运行命令：

```text
examples/verification-ledger.pass.md
examples/verification-ledger.fail.md
```

## Review Checklist

审查 diff 时只看四件事：

```text
是否改了成功命令输出？
是否把 stderr/stdout 混用？
是否引入不必要依赖？
README 命令是否真能运行？
```

## Verification

```bash
npm test
node src/cli.js unknown
node src/cli.js verify-ledger
node src/cli.js verify-ledger --file examples/verification-ledger.pass.md
node src/cli.js verify-ledger --file examples/verification-ledger.fail.md
```

当前基线：

```text
tests 12
pass 12
fail 0
```

## Residual Risk

- README 命令没有单独文档测试，只靠人工命令复核。
- CLI 当前仍是手写 parser，后续命令增多时要重新评估是否需要框架。

## Reusable Rule

CLI 改造要把 stdout、stderr、exit code、README 示例当作产品界面处理。测试绿不等于用户路径已验证。

