# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project aims to follow Semantic Versioning.

## [Unreleased]
### Added
### Changed
### Fixed

## [0.1.1] - 2026-01-29
### Added
- 新增 `netlify.toml` 固化 Netlify 构建与发布参数
- README 一键部署增加部署后检查清单
### Changed
- `SITE_URL` 缺失时不再输出 canonical/og:url（避免相对 URL 被判错）
- 生产环境未设置 `SITE_URL` 时输出警告日志
- 一键部署说明补充 `SITE_URL` 对 canonical/og:url 与 RSS 的作用
- README 补充演示链接与截图，并调整 CI 徽章样式
- package.json 补充开源元信息（license/repository/bugs/homepage）并标记为可发布
- 侧栏英文引言文案更新
- 页脚年份改为自动区间（2025–当前年）
- 移动端侧栏图标组收紧间距并右对齐（避免顶部遮挡）
- 首页 Hero 图改为本地 `astro:assets` 图片输出，新增多格式（AVIF/WebP）与更精确 sizes；LCP 优先级由 `isLCP` 控制
- LXGW WenKai Lite 字体改为三段子集（latin/common/ext）并使用 unicode-range 按需加载，移除大字体 preload；新增字体构建脚本与可提交子集文件
- Noto Serif SC 改为自托管并子集化（400/600），移除 Google Fonts 依赖
### Fixed
- `robots.txt` 移除误导性的 sitemap 注释
- 桌面端导航链接点击区域由整行收敛到文本范围

## [0.1.0] - 2026-01-28 (Pre-release)
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
- 移动端/平板新增右下角回到顶部按钮（滚动阈值显示，JS 渐进增强）
- 文章详情新增上下篇导航（仅在同栏目内按日期排序）

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
- 移动端断点分档：≤900 通用移动化，641–900 平板微调，≤640 手机紧凑
- 移动端导航/列表/Bits 控件/页头布局调整，减少溢出与错位
- 移动端 `.prose img` 放宽到 92–100%，代码块工具栏在手机端允许换行并隐藏次要信息
- 移动端触控命中区提升（44px）与安全区内边距适配（sidebar/content）
- 列表/卡片密度与页头节奏轻量收紧，引用与 callout 内边距在移动端更紧凑
- 移动端导航当前页提示增强（下划线更显眼），代码块工具栏语言标签字号下调
- figcaption 最大宽度约束（32rem）并在移动端略微缩小字号
- 移动端细节尺寸抽象为 CSS 变量（`--tap-min-h` / `--pad-x` / `--card-pad` / `--quote-pad` / `--header-gap`）
- bits 工具条布局与间距调整：搜索/按钮同一行、控件高度统一、留白更紧凑
- posts 归档移动端改为标题下方同一行展示完整日期与标签，并优化条目间距
- kids 目录在 ≤640 改为 3 列，并随断点自动折叠/展开
- 拆分 `global.css`：新增 layout/lists/bits 组件样式文件，仍以 `global.css` 为唯一入口
- 调整 `global.css` 的 `@import` 顺序（layout → lists → bits → prose → figure → callout → code-block）
- Kids TOC 监听改用 `matchMedia.addEventListener`；复制按钮兜底收敛为兼容路径
- bits 图片在平板宽度限制最大宽度，避免撑满卡片容器
- 移动端与平板页首留白收紧（sidebar/content 顶部 padding 下调）
- 阅读模式退出按钮在移动端滚动超阈值时切换为浮层，阈值内保留原位入口
- 平板端 figure/picture 图片统一收紧到 92% 宽度

### Fixed
- 修复暗色模式下纯文本代码块（无 token span）文字不可读的问题
- 修复代码块语言图标 viewBox 计算错误导致的裁切/缩放异常
- 修复阅读模式退出按钮在正文标题下方错位的问题
- 修复行内代码换行导致背景/边框断裂的问题
- 修复小屏下长行内容撑宽导致页面横向滚动与正文截断的问题

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
