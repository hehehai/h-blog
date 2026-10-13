# 品牌、圆角与 MDX 加载修正

日期：2026-10-13。基线提交：`3f1366c`。以下为提交前验收记录；本轮没有新增依赖、测试框架或修改依赖锁、安全补丁、SSR 入口，未执行生产部署。

## 视觉与操作

- 导航 logo 使用现有 `public/favicon.svg` 的同一组图形，通过 SVG fragment 引用，不维护另一套路径。悬停 / 键盘聚焦时括号轻微展开，减少动效偏好下不移动。
- 文章和关于页使用用户提供的头像。保留图片内容与署名，转换为 512×512 WebP，约 17KB；固定显示尺寸避免头像加载改变布局。
- `main` 是跳过导航和回顶的程序焦点目标，不是可点击控件。只移除它的巨大 outline，链接、按钮和输入框仍保留键盘焦点提示。
- 页脚移到内容宽度容器之外，背景和分隔线真正全宽，内部与页头使用相同边距；为右下角固定按钮预留底部空间。
- 菜单移动到右下角，保持真正的 44×44 圆形，不在悬停时变成长胶囊；弹层从约 340×462 缩为 248×308，支持短屏滚动。
- 菜单中的 GitHub、X、Threads 使用图标与可访问标签；页脚保留文字名称。Threads URL 为用户指定的 `https://www.threads.com/@hskread`，同时加入网站结构化数据。

## Loading 不等于纯客户端渲染

当前安装版本为 TanStack Start **1.168.61**、TanStack Router **1.170.42**、`@mdx-js/rollup` **3.1.1**。本项目已经在构建时将 MDX 编译为 ESM / React 组件，并在首个请求和预渲染时输出完整正文。不是浏览器拿到原始 Markdown 后才开始解析。

问题有两个阶段：

1. **站内导航**先完成元信息 loader，再由正文组件开始动态导入 MDX，形成二次异步边界。原有文章 / 页面骨架会让内容短暂被替换。
2. **首次水合**也需要文章的 JS。弱网实测表明，即使 HTML 已有完整正文，组件悬挂、未规范化的路径键值或待导航路径引发的重挂载，仍可能把这段 HTML 清空。单纯把 fallback 改为 `null` 不够。

### 修正

- 使用 TanStack 公开的 `lazyRouteComponent().preload()`，复用框架的导入去重、错误处理和更新部署后的缺失模块处理。
- 文章 loader 并行等待元信息与正文代码；意图预取也准备正文。路由完成后一次展示文章，不先展示空正文。
- Start 的客户端水合和服务端初始化都支持等待 `getRouter()`。将工厂改为异步，仅在客户端启动时预加载 URL 对应的文章，再完成水合；服务器仍由 route loader 准备正文。
- `main` 的动画键使用已提交、去除尾斜杠的路径，不因静态文件服务补 `/` 或新的待加载地址而抛弃已显示的内容 / 搜索条件。
- 移除替换整页的默认骨架；真实慢请求期间保留旧页面和轻量顶部进度提示。不是假装网络请求即时完成。
- 保留 `src/server.tsx` 的 `allReady`、无限 `progressiveChunkSize`、请求取消和 30 秒清理。MDX 仍按文章拆分，组件或源码不放进 loader 的序列化数据。

取舍：首次文章水合会等待当前文章代码，交互控件的激活也可能稍后完成，但 SSR 正文和普通链接已经可用。页面内导航仍是客户端路由，这是 Start 的正常工作方式，不等于首屏正文依赖客户端渲染。

### 是否换库

暂不需要。官方 MDX 文档支持 Vite / Rollup 的构建时编译，并要求插件在 React 插件前的 `pre` 阶段执行；本项目符合这个做法。TanStack 的 Markdown 指南部分示例使用浏览器 `useEffect` 转换文本，适合展示另一种 Markdown 流程，不能直接照搬来替代包含 React 演示的 MDX。

`next-mdx-remote` 的 Next.js 接入方式、运行时编译 / 求值或改成另一套内容处理库，都不能自动解决路由与水合时序；反而增加迁移成本。当前不为消除一次 loading 而升级版本或更换库。

## 圆角方案

使用现有 `border-radius`，对站点 UI 和正文媒体渐进增强为 `corner-shape: squircle`。它属于尚未广泛 Baseline 的 CSS 能力，使用 `@supports` 检测；不支持时自然回退原有圆角。

圆形按钮、头像、图片上的圆形操作入口显式保持 `round`。不把学习用的 Motion / CSS 演示统一改成 squircle，以免改变文章讲解的图形。

不需要 Tailwind Plus、JS 圆角库、SVG 动态裁剪计算或包裹每个元素的 React 组件。新增的 `src/styles/corners.css` 只负责这个增强层。

## 验收

在本地 Workers 生产预览（4187）使用真实 Chromium 153 验证，临时脚本不进入仓库。

- 107 项记录：桌面 / 手机的 29 个 URL 共 58 次、24 篇禁用 JS 阅读、一项原生 FAQ / 导航验证、24 篇客户端进入 / 返回。无页面异常、站内失败、整页横向溢出或损坏图片。
- 21 项响应式记录：1440、390、320 宽度下六类页面及菜单尺寸 / 图标 / 页脚全宽；另检查 320×480 弹层不越界。
- 21 项交互通过：favicon 图形 / 动效、紧凑右下圆按钮、图标标签 / Threads / 新窗口安全、主题 / Esc / 导航、代码复制、水合后事件、头像、锚点刷新、回顶 / 焦点、全宽页脚与避免遮挡、减少动效、圆角降级。
- 延迟当前文章 JS：首屏在水合未完成时仍有 **9261 字符的可见 SSR 正文**。
- 延迟客户端目标 MDX：旧列表仍保留 `Radix` 搜索和一条结果，只出现顶部进度；释放后标题与正文一同完成，进度消失。
- 首页面资源记录没有请求任何文章 chunk；直接访问 Radix 文章只请求该文章的 MDX chunk，没有恢复全量 MDX 打包。
- 九个代表性 CSS / Radix 沙盒预览实际有内容。不是对全部沙盒控件组合、第三方可用性或所有浏览器的重新审计；此前遥测问题没有在本轮修改或屏蔽。
- 圆角降级通过浏览器 CSS 响应夹具禁用增强块验证，不等同于真实 Safari / Firefox 测试。
- 构建、类型、Ultracite 和差异检查通过。没有宣称性能分数改善或生产部署完成。

## 参考

- [TanStack Start Selective SSR](https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr)
- [TanStack Router Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack lazyRouteComponent](https://tanstack.com/router/latest/docs/framework/react/api/router/lazyRouteComponentFunction)
- [TanStack Start Client Entry Point](https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point)
- [MDX Getting Started / Vite](https://mdxjs.com/docs/getting-started/#vite)
- [MDN corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape)
