# 贡献指南

欢迎提交文章勘误、图示或链接修正、可复现的示例问题，以及有明确边界的实践案例。

## 文章与图片

请说明章节、原文位置、观察到的问题和修改依据。技术结论优先附官方文档或最小复现；实践案例请脱敏。修改正文后同步目录、章节导航和受影响的图示，插图优先保留可编辑图源。

在仓库根目录使用 Node.js 20 或更高版本运行：

```bash
node scripts/check-course.mjs
```

检查会核对完整文章、目录、导航、图片和仓库内链接。

## 代码与实践记录

行为修改应有能说明问题的回归测试，并同步相应的 OpenSpec 与 `dev-process/` 记录。分别进入相关项目运行：

```bash
cd personal-productivity-app
npm test
```

```bash
cd ai-coding-workflow-kit
npm test
```

两个项目均不需要第三方运行依赖。命令适用于 macOS、Windows 和 Linux；跨平台行为存在差异时，请在 Pull Request 中注明测试范围。

## 提交 Pull Request

保持改动聚焦，在说明中写清问题、改动和实际执行的验证。请保留已有来源和授权声明，不提交密钥、私人记录或未经脱敏的日志。提交内容按项目的 [Apache License 2.0](LICENSE) 提供。
