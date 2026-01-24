# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project aims to follow Semantic Versioning.

## [Unreleased]
### Added
- 代码块顶部工具栏：显示语言类型、行数、UTF-8 编码提示与复制按钮
- 引入 callout 语法糖解析管线：`remark-directive` + `remark-callout`
- 新增 `src/plugins/remark-callout.mjs`，将 `:::type[title]` 转换为 callout DOM 协议
- 新增 Shiki transformer：构建时注入代码块工具栏结构（`src/plugins/shiki-toolbar.mjs`）
- 新增语言图标映射工具与图标依赖（`src/utils/lang-icons.mjs`）
- 新增 Figure/Caption 最薄样式支持（`src/styles/components/figure.css`），并由 `global.css` 聚合
- 新增代码块样式拆分（`src/styles/components/code-block.css`），由 `global.css` 聚合
- 新增 GitHub Actions 轻量 CI：build + check:callout（含 check:figure 可选）
- 新增本地聚合命令 `npm run ci`（build + check:callout + check:figure）
- 新增客户端交互脚本目录 `src/scripts/`（bits 搜索、侧栏主题/阅读模式）
- 新增 bits 搜索索引端点 `/bits/index.json`（静态生成，可缓存）
- bits 搜索新增状态提示（aria-live）与降级提示

### Changed
- 代码块颜色变量体系重构：新增 `--code-header-bg`、`--code-content-bg`、`--code-border`、`--code-text`、`--code-action-hover-bg`；旧 `--code-bg` 保留为兼容别名
- Astro Markdown 管线接入 callout 语法糖插件（`remarkPlugins` 顺序：directive → callout）
- 代码块工具栏由运行时注入改为构建时生成，结构调整为 `div.code-block > div.code-toolbar + pre`
- 常见语言图标优先使用 logos（hover 恢复彩色），其余语言保持单色图标
- 语言图标别名补充（`rs` → `rust`），logos 优先候选调整为 icon 变体
- Markdown 指南新增语法糖渲染示例与标准语法测试集
- 文档补充 callout 语法与降级规则（README / DECISIONS / AI-GUIDE）
- README 明确 callout 语法边界（仅标准标题写法，禁止参数化）
- 增加最小回归检查脚本 `npm run check:callout`
- Markdown 指南新增 Figure/Caption 示例（img/picture + 可选 figcaption）
- README 增加 Figure/Caption 推荐写法说明
- README 增加 Content Blocks 清单（Callout / Figure 协议概览）
- `.prose` 排版规则拆分到 `src/styles/components/prose.css`
- 正文代码块新增行号（CSS），并提供复制按钮（JS 渐进增强）
- 复制按钮改为事件委托，仅负责激活与复制逻辑
- 行号对齐/间距细调，隐藏正文代码块纵向滚动条
- figcaption 使用文楷字体并限定在 `.prose` 范围
- 补充 `picture > img` 响应式约束，避免图片溢出
- docs/changelog 重命名为 docs/change_archives
- 统一代码字体入口为 `--font-mono`（`global.css`），`prose` 只负责排版表现
- 侧栏底部图标提示样式统一为浅色面板风格，并使用文楷字体显示提示文本
- 阅读模式图标更新为“书本 + 中轴线”风格，进入/退出态保持一致
- bits 搜索与侧栏主题/阅读模式脚本由内联迁移至 TS 模块（Vite 编译）
- 非沉浸页阅读模式按钮改为禁用并提示
- bits 搜索索引从 HTML 移出，改为 JSON 懒加载
- bits 搜索索引加入纯文本摘要（截断）以支持关键词检索

### Fixed
- 修复暗色模式下纯文本代码块（无 token span）文字不可读的问题
- 修复代码块语言图标 viewBox 计算错误导致的裁切/缩放异常
- 修复阅读模式退出按钮在正文标题下方错位的问题
- 修复行内代码换行导致背景/边框断裂的问题

## Pre-release（未发布历史）

### Added
- 新增最薄 `Callout.astro` 组件，统一输出 callout 结构与属性

### Changed
- callout 图标渲染改为 `.callout-title::before`，支持 `data-icon` 覆盖与 `data-icon="none"`
- callout 样式迁移到 `src/styles/components/callout.css`，`global.css` 使用 `@import` 聚合

### Added
- 增加 `@astrojs/check` 与 `typescript` 依赖以支持 `astro check`
- **夜间模式**：支持浅色/深色主题切换
  - 使用 `data-theme="dark"` 属性切换
  - 自动跟随系统偏好，支持手动切换
  - 切换按钮位于侧栏底部，带无障碍支持（`aria-pressed`、`aria-label`）
  - Shiki 代码高亮双主题（`github-light` / `github-dark`）
- 侧栏底部新增阅读模式与 RSS 按钮（黑白图标、悬停提示），阅读模式全站入口，文章/Kids 页支持沉浸阅读与退出按钮
- Kids 页面 TOC 区域折叠指示器（三角形图标，展开/折叠时旋转）
- Initial Astro theme scaffold with fixed sidebar + content layout.
- Routes: `/`, `/posts/`, `/essay/`, `/bits/`, `/kids/`, `/about/`.
- Content Collections: `posts`, `essay`, `bits`, `kids`.
- Bits draft generator: `npm run new:bit`.
- RSS endpoints: `/rss.xml`, `/posts/rss.xml`, `/essay/rss.xml`.

### Changed
- callout 样式改为极简竖线形态，移除背景/边框/标题分隔线
- callout 图标改为 `.callout-icon` 钩子，CSS mask 提供 SVG；tip 使用 Lucide sparkles 并设为低饱和绿
- 更新 Markdown 指南中的 callout 示例结构
- 正文图片统一最大宽度为 75% 并居中显示（`.prose img`）
- kids 示例内容替换为可开源保留的原创示例
- 配色调整为暖色调（Stone 色系）
- TOC 区域行间距增加（`gap: 14px`，一级标题间距 `20px`）
- 引用和代码块背景色改用 CSS 变量，适配夜间模式
- 引用样式优化：去除斜体，调整内边距
- 深色模式下 badge 与 bits 搜索按钮配色更统一，提升可读性
- 统一列表页标题结构，新增 `.page-header` 组件（主标题+副标题单行显示）
- 调整背景色为 `#fffefc`（米白色）
- 侧栏标题 hover 效果移除颜色变化，只保留放大
- 导航链接 hover 效果改为向左平移

### Fixed
- 修复 `astro check` 类型检查错误（隐式 `any`、DOM 类型收窄、kids TOC 类型推断）
- 修正文档指引路径（AI-GUIDE 指向 docs）
- 修复引用内 `<p>` 标签默认 margin 导致的高度问题
- 修复深色模式代码块背景未切换、日间高亮被覆盖的问题

### Removed
- 清理未使用的 CSS 样式（`.bits-hero`、`.kids-subtitle`）
