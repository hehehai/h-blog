# 浏览器逐页回归记录

日期：2026-10-12。使用真实 Chromium **153.0.8010.12（headless）**，通过临时 Playwright
脚本打开页面、滚动、点击、输入、切换主题、检查 iframe，并复核逐页截图；不是仅检查构建或 HTTP 状态。
未向仓库加入测试框架或浏览器依赖，未提交、推送或部署。

## 范围与结果

| 检查 | 实际覆盖 / 结果 |
| --- | --- |
| 页面 | 首页、关于、项目、照片、文章列表，以及全部 24 篇文章，共 29 个有效 URL |
| 桌面 / 手机 | 1440×960、390×844；29×2 = 58 次最终逐页验收，全部 HTTP 200 |
| 窄屏 | 320px 下五个主要页面；系统深色偏好，无全页横向溢出 |
| 内容 / 资源 | 正文、元信息、页脚、图片；最终扫描无站内资源失败、损坏或仍未加载的页面图片 |
| 客户端导航 | 从列表逐一点击全部 24 篇文章，检查正文和标题；返回、前进、刷新、404 返回首页 |
| 链接 | 24 篇文章区域的 377 个外链具备 href；291 个同页锚点目标存在；实际打开 MDN 新窗口并确认 opener 为空 |
| 主题 / 交互 | 桌面与手机的主题持久化、六类页面深色外观、FAQ 展开/收起、键盘 Enter、标题锚点 |
| 沙盒 | 25 个预览实际渲染：18 个 Motion/Radix、3 个静态 CSS、2 个高度示例、2 个 Vue 虚拟列表示例 |
| 演示操作 | 编辑后更新预览、滑块/选择器、剪贴板动画、卡片切换、透视、通知退出、拖动重排序、箭头选择、盒模型尺寸、Vue 折叠、CSS hover |
| 无 JavaScript | 全部 24 篇文章在禁用 JS 的浏览器中有可见正文，不再停留在加载提示 |
| 照片 | 真实接口显示 12 张图片；另用浏览器响应夹具检查限流倒计时、重试忙态/禁用、恢复、旧数据、空数据及超时 |
| 非页面端点 | robots.txt、sitemap.xml、manifest.webmanifest 均为 200；未知路径、未知文章、非法 slug 为真实 404 |
| 开发模式 | 新 SSR 入口在开发服务中，普通文章和含演示文章均通过启用/禁用 JS 检查 |

桌面使用 zh-CN / Asia/Shanghai，手机使用 en-US / America/Los_Angeles；文章日期输出一致。
页面逐步滚动至底部检查资源和溢出，首屏截图额外等待正文完成加载，避免将短暂加载态当成最终页面。

## 发现并修复的六类问题

### 1. MDX 外链没有 href

`ElementLink` 解构了 href，却没有传给外链分支的 `<a>`，造成视觉上像链接但不能跳转。
已补回 href，保留安全的 target/rel；验证了所有文章中的外链属性与真实 MDN 跳转。

文件：`src/components/shared/mdx/elements/link.tsx`。

### 2. 320px 页面被强制撑到 360px

全局 html 的 min-width 导致整页超出小屏幕。将下限调整为 320px，不用 overflow-hidden 掩盖内容。
五个主要页面已复测，保留同一 320px 视口的前后截图。

文件：`src/styles/globals.css`。

### 3. 箭头选择沙盒的 React key 警告

为映射的 Item 增加稳定 key，并移除 App.js 示例中不必要的 TS 参数注解。
实际点击第三项、键盘选择第二项；箭头位置更新，相关 React 警告消失。

文件：`src/components/content/framer-motion/layout/sandpack-arrow-list.tsx`。

### 4. 高度示例的 React DOM 属性警告

仅修正实际运行的 React 示例中的两处 class → className，保留 Vue 示例的 class。
同时修正 Vue 编辑文件的 active 拼写。盒模型切换实测 offsetHeight 从 260px 变为 200px，
Vue 折叠可展开/收起。没有批量改写文章正文。

文件：`src/contents/posts/how-to-get-the-height-of-a-hidden-element.mdx`。

### 5. 预渲染正文依赖流式脚本才能显示

此前 HTML 中虽然存在完整正文，却位于待插入的隐藏流式片段；禁用 JS 后浏览器只显示
“正在加载文章…”。仅在 HTML 字符串中搜索正文不能发现这个问题。

新增 `src/server.tsx`，并同时接入 Vite Start 与 Wrangler：

- 在交给任何流读取器前等待 React `allReady`。
- 设置 `progressiveChunkSize: Infinity`，避免较大的已完成边界仍被拆成隐藏片段。
- 保留 TanStack 的状态码、响应头、nonce、注水合并与清理机制。
- 传播请求取消，HTML 渲染有 30 秒上限；异常时清理 SSR 状态。

取舍：本博客选择先完成 HTML 再输出，放弃渐进 HTML 的早期首字节优势。未来增加较慢的
服务端 Suspense 数据源时应重新评估。客户端仍按文章加载，未改回全量 MDX 打包；
单独比较这项 SSR 调整前后，103 个客户端资源的文件名和哈希完全一致。

禁用 JS 后 24 篇文章均有可见正文，随后验证了水合、客户端导航、演示、404 和开发入口。

文件：`src/server.tsx`、`vite.config.ts`、`wrangler.jsonc`。三者必须配套保留。

### 6. 照片后台重试没有显示忙态

浏览器故障注入确认：router.invalidate 的后台加载期间，路由全局 isLoading 为 false，
但匹配路由的 isFetching 为 loader，原按钮仍显示可点击的“重试加载照片”。
状态判断现同时包含匹配路由的请求状态。复测中按钮显示“正在重试…”，disabled 与
aria-busy 均生效，成功响应后恢复照片。

文件：`src/components/shared/photo/photo-status.tsx`。

## 控制台与测试边界

- 最终逐页扫描及交互检查没有未捕获的页面异常或站内 HTTP 失败。
- CodeSandbox 的 `/cdn-cgi/rum` 遥测接口存在 404，部分轮次的 `col.csbops.io/data/sandpack`
  出现连接关闭。原始日志保留，未屏蔽请求或删除告警；与示例功能验证分开判断。
  后续已核对 SDK 与运行时，没有公开遥测关闭选项；调查与可选方案见 [遥测问题说明](sandpack-telemetry.md)。
  此项尚未修复，不将方案待确认写成已通过。
- 实际照片成功加载与故障夹具分别记录。夹具只替换浏览器收到的 RPC 响应，**不是本轮真实 GitHub 故障**，
  不修改生产代码或服务端缓存；后台故障机制另见此前 workerd 验证。
- 两个 Vue 虚拟列表示例展示文章所处的“首次渲染”阶段：验证 30 项与虚拟滚动空间，
  不把它们当作完整虚拟列表实现。完整项目仍通过 StackBlitz 外链打开。
- 没有宣称真实手机硬件、Safari/Firefox、全部控件组合或所有外站内容均通过。
  第三方外链逐个具备 href，不等于所有外部目标都做了可用性巡检。
- 截图来自真实页面；对照图仅排版、缩放或按原视口裁切，没有重绘页面内容。

## 最终质量检查与交付状态

修复后重新构建，类型检查、Ultracite 检查、git diff --check 和 Wrangler deploy --dry-run 通过。
本轮不重新宣称依赖审计清零：braces 的本地缓解和未修复版本告警状态没有改变。

原 `h-blog-release-handoff-20261012T071511Z.tar.gz` 是本轮修复之前的快照，**不包含这些修复**。
后续提交或部署以当前工作区及本记录为准，不要直接使用旧交付包发布。
远程 CI、独立预览部署和生产切换仍未执行。
