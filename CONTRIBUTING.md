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

保持改动聚焦，在说明中写清问题、改动和实际执行的验证。请保留已有来源和授权声明，不提交密钥、私人记录或未经脱敏的日志。提交内容按项目的 [许可说明](LICENSING.md) 提供。

贡献的文章与插图采用 CC BY-NC-SA 4.0，贡献的代码采用 PolyForm Noncommercial 1.0.0；详见 [许可说明](LICENSING.md)。

## 目录与内容维护

`docs/course/` 存放课程正文，`docs/assets/` 存放插图；两个配套项目各自维护运行说明和测试；`tools/site/`、`tools/book/` 分别构建阅读站和电子书。

文章顺序和链接以 `docs/course/catalog.json` 为准，根目录 README 展示每篇文章。修改文章后运行课程检查；书稿编排与电子书构建见 [网站与电子书构建说明](docs/BUILD.md)。
