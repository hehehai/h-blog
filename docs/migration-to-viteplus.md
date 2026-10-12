# TanStack Start / VitePlus 迁移记录

## 范围与基线

本次从仓库已有的 TanStack Start 实现继续迁移，没有重写页面或更换内容系统。

| 基线 | 提交 | 用途 |
| --- | --- | --- |
| Next.js | `faa0974` | 独立 worktree 安装、生产构建、启动和浏览器对照 |
| Start + Vite | `8c0f0ab` | 本次修改前的类型检查、Lint、构建和 HTML 基线 |
| Start + VitePlus | 当前工作区 | 工具链接入及发现的 Workers/SSR 兼容性修复 |

此前的 `9b875d0` 已完成主体框架迁移；`787a0f4` 配置 Workers；
`8c0f0ab` 将 MDX 改为构建期编译。本记录不将这些已有实现计为本次新增。

## 本次完成

### 工具链

- 用官方 `vp migrate --no-interactive --no-agent --no-editor --no-hooks` 迁移，
  随后审查并收敛生成的配置。
- VitePlus 固定为 `1.0.0`，通过 `pnpm-workspace.yaml` 的 catalog 和 override
  将 Vite 消费方统一到 `@voidzero-dev/vite-plus-core@1.0.0`。
- `vite.config.ts` 使用 `vite-plus` 的 `defineConfig` / `lazyPlugins`，保留
  Cloudflare、MDX、content-collections、Tailwind、Start 和 React 插件链。
- `dev`、`build`、`preview` 使用 VitePlus；保留 pnpm 脚本入口。
- `.node-version` 固定 Node.js `24.21.0`；pnpm 保持 `10.14.0`。
- 保留 Ultracite/Biome 和 Husky，删除迁移器额外生成的 lint/format 配置，
  不进行全仓库格式重排。使用 `vp run check`，而不是内置 `vp check`。
- 新增只检查、不部署的 GitHub Actions 工作流。完整检出 Git 历史以计算文章
  `lastModified`，先构建生成内容类型和路由树，再进行类型和质量检查。

### SSR / Workers 修复

| 问题 | 原因 | 修复 |
| --- | --- | --- |
| 预渲染页脚年份为 1970，浏览器 hydration 报错 | Workers 模块初始化阶段读取时钟 | 在 Server Function 请求处理阶段取 UTC 年份，通过布局 loader 序列化给客户端 |
| 中文浏览器中文章日期 hydration 报错 | `toLocaleDateString()` 使用服务端和浏览器各自的默认语言/时区 | 统一以 UTC 的 `YYYY/M/D` 格式输出，列表和详情复用同一函数 |
| 照片页成功响应但无相册 | Workers 请求没有 GitHub 要求的 User-Agent，403 被转换为空数组 | 显式发送 User-Agent、Accept、API 版本；设置 10 秒超时；失败进入错误边界，不伪装成空相册 |

照片接口问题已独立复现：相同 GitHub 请求不带 User-Agent 返回 403，带上后返回
200 和 2 个相册。修复后的 Workers 预览页面包含“明长城遗址”和“上下华严寺”。

## 本地验证结果

以下为实际执行记录，不代表远程 CI 或生产部署已经运行。

| 检查 | 结果 |
| --- | --- |
| 旧 Next.js 冻结锁文件安装和生产构建 | 通过 |
| 修改前 Start + Vite 的 check / check-types / build | 全部通过 |
| VitePlus 冻结锁文件安装 | 通过 |
| 清除本次生成的内容类型、构建产物和 TS 缓存后重建 | Node.js 24.21.0 下通过 |
| `vp run check-types` | 通过 |
| `vp run check` | 通过 |
| `git diff --check` | 通过 |
| Workers 生产预览 | 通过 |
| `vp exec wrangler deploy --dry-run` | 通过，仅本地打包，不上传 |
| 24 篇文章的静态 HTML 覆盖 | 24/24 |
| 桌面 1440×1000 / 手机 390×844 | 首页、列表、文章、关于、项目、照片及文章 404 均检查 |
| 文章 hydration | 24 篇在 zh-CN / Asia/Shanghai 下均无 pageerror |
| 跨语言/时区 | 首页、列表、文章在 en-US / America/Los_Angeles 下无 pageerror |
| 明暗模式 | 切换、刷新后持久化均通过 |
| 客户端导航 | 首页 → 列表 → 文章，无整页刷新；浏览器返回正常 |
| 状态码 | 有效页面 200，未知页面和未知文章 404 |
| SEO 端点 | robots.txt、sitemap.xml、manifest.webmanifest 均可访问 |

浏览器检查使用临时目录中的 Playwright 和本机 Chromium，没有向项目引入测试框架。
404 检查中浏览器记录的预期 HTTP 404 资源错误不计为 hydration 错误。
第三方 Sandpack/StackBlitz 的所有编辑运行行为尚未逐项验收。

### 对照说明

1. **只替换工具链时**：28 个实际静态 HTML 文件的正文、title、meta 和 canonical
   与 Start + Vite 基线一致。构建日志报告 29 个路径，是因为 `/posts` 和
   `/posts/` 写入同一静态文件。
2. **加入修复后**：年份由错误的 1970 恢复为构建/请求年份，文章日期统一显示为
   `YYYY/M/D`；照片恢复为真实相册。这些属于有意修复，不能再宣称所有 HTML 完全不变。
3. **对比 Next.js**：页面布局基本保持；Start 已有逐页 SEO、canonical 和 sitemap。
   旧 Next.js 基线的 `/sitemap.xml` 返回 404，这不是本次工具链新增的差异。
4. **渲染策略**：旧 Next.js 的照片为静态页、文章详情为动态页；当前 Start 的照片
   为动态 SSR、文章为预渲染。这是已有框架迁移的策略变化，应在发布验收中保留关注。
5. **性能口径**：仅工具链切换前后，首页 HTML 直接引用的 JS entry + modulepreload
   原始字节数从 502,602 到 502,561；不包含递归依赖、懒加载、压缩传输或真实性能指标，
   不能据此宣称加载速度提升。

## 复现

```sh
vp install --frozen-lockfile
vp build
vp run check-types
vp run check
vp preview --host 127.0.0.1 --port 4173 --strictPort
```

另一个终端中：

```sh
curl -I http://127.0.0.1:4173/
curl -I http://127.0.0.1:4173/posts/no-such-post
curl -I http://127.0.0.1:4173/robots.txt
curl -I http://127.0.0.1:4173/sitemap.xml
curl -I http://127.0.0.1:4173/manifest.webmanifest
vp exec wrangler deploy --dry-run
```

静态页在本地 Workers 预览中可能先重定向到尾斜线 URL；使用 `curl -L` 跟随跳转。
浏览器分别用中文/英文语言、不同系统时区检查文章日期和 Console，再验证明暗模式、
导航、返回、直接刷新及照片页。

## 第二轮：内容管线与按文章加载

维护者选择继续手动验收，因此本轮仍未引入测试套件或将临时检查脚本加入 CI。

### 已完成

- **明确预渲染路径**：`scripts/content.ts` 扫描全部 `.md` / `.mdx` 源文件，
  为 Start 的 `pages` 显式提供文章路径；关闭链接爬取，保留静态路由自动发现。
  支持子目录归类，但 URL 仍使用文件名。重复 slug 或不合法文件名直接阻止构建。
- **统一文件名约定**：slug 为 1–200 个英文字母、数字、`-` 或 `_`，不包含扩展名。
  现有 24 篇文章 URL 均未变化。子目录不进入 URL，不能创建同名的 `.md` / `.mdx`。
- **服务端校验**：Zod 校验真实请求数据，不再仅做 TypeScript 类型断言。
  文章分页 `limit` 为 1–1000 的整数（默认 10），`offset` 为非负安全整数（默认 0）；
  照片 `page` 为 1–1000 的整数（默认 1）。字符串数字、负数、小数、越界值被拒绝。
  非法文章 URL 在路由层返回 404，而不是把参数校验异常显示为服务端错误。
- **日期兜底**：`publicAt` 必须是合法的 `YYYY-MM-DD`，明确按 UTC 解析。
  完整 Git 历史优先提供最后修改日期，且不早于发布日期；无 Git、浅克隆、
  新建未提交文件或 Git 命令失败时使用发布日期。移除仅以路径为键的持久缓存，
  不使用每次检出都会改变的 mtime 或当前时间。移除不再使用的 `zx` 依赖。
- **MDX 按文章拆包**：用模块级 lazy 组件注册表加载当前文章，保留 SSR 正文及
  Suspense 边界；详情 Server Function 只返回元数据，不再重复传输原始 MDX 源码。
- **开发态内容刷新**：正文支持 React HMR；内容集合完成生成后刷新页面，以同步
  Server Function 背后的标题、日期、列表和 SEO。此刷新会重置页面临时交互状态，
  只在开发模式启用。

### 本轮验证

- 临时逻辑检查覆盖参数默认值、边界、类型、非法 slug、嵌套文件和重复 slug。
- 用临时 Git 仓库验证完整历史、浅克隆、无仓库、未提交文件及日期下限。
- 在不带 `.git` 的源码副本中完成生产构建，24 篇文章的修改日期均稳定回退到发布日期。
- 临时添加子目录 `.md` 文章，验证开发态可访问、正文和标题变更可更新，且不依赖
  爬链即可预渲染；未提交新文章的日期有效。验证后已删除临时文章。
- 非法日期 `2024-02-31` 的构建实际失败，没有静默丢弃文章。
- 从浏览器调用真实开发态 RPC 验证非法参数被服务端拒绝；非法路径和未知文章返回 404。
- 浏览器禁用 JavaScript 时，CSS clip-path 文章的正文仍可见，没有遗留加载占位。
- 请求记录确认访问字符长度文章时加载对应文章 chunk，没有同时请求 CSS clip-path、
  Framer Motion guide、NextAuth email OTP 等其他文章 chunk。
- 24 篇文章再次通过 hydration 检查，并回归跨语言/时区、主题切换、客户端导航和返回。

### 体积对照（相对第一轮完成时）

| 指标 | 改造前 | 改造后 |
| --- | ---: | ---: |
| 文章路由公共 JS chunk | 1,084,264 B | 43,984 B |
| 全部客户端 JS 总和 | 3,489,761 B | 3,495,401 B |
| 客户端 JS chunk 数 | 77 | 101 |
| CSS clip-path 文章 HTML | 57,930 B | 47,084 B |
| Framer Motion layout 文章 HTML | 132,125 B | 110,853 B |

以上为未压缩构建文件大小。拆包减少单次访问加载的无关文章，并非删除内容；
全部 JS 总量略增，公共 chunk 的降幅不能当作首屏总流量或加载耗时的降幅。

## 第三轮：照片故障处理与交互演示

### 照片数据策略

- `src/lib/server/photo-service.ts` 在请求处理阶段使用 Workers Cache API，按页缓存。
  不新增 KV / Durable Objects 绑定，也不跨请求共享 fetch Promise。
- 成功数据 **5 分钟内直接复用**；更新失败时可使用 **最长 24 小时**的最后成功数据。
  再次写入失败状态不会延长旧照片寿命，等待请求过程中跨过期限也会丢弃过期数据。
- 上游请求保留 **10 秒超时**。失败默认冷却 **60 秒**；尊重 `Retry-After`（秒数或
  HTTP 日期），配额耗尽时也等待 `X-RateLimit-Reset`。冷却期间服务端不再次请求同一页。
- 对 GitHub JSON 做运行时校验，处理 `body: null`；Markdown 元数据支持 LF / CRLF。
  图片仅接受 HTTP(S) URL，标签颜色为空时有明确兜底。
- 页面区分“成功但没有照片”“仍有旧照片”“完全不可用”，提供原因说明、倒计时和重试。
  重试通过 router invalidation 重新加载，但不绕过服务端冷却。失败不会被当成空列表。
- Cache API 不存在、读写失败或内容损坏时退化为实时请求，不能保证该状态下的请求节流。
  **此缓存是数据中心本地、最佳努力的保护，不是全局分布式限流器**；并发冷缓存也可能
  产生多个上游请求。如需严格的全局配额保护，需另外评估边缘限流规则或 Durable Objects。

验证采用独立 Miniflare/workerd 实例、真实 Cache API 和可控的模拟 GitHub 上游，覆盖：
首次加载、缓存命中、旧数据兜底、24 小时边界、请求过程中数据过期、403/429/500/503、
两种 Retry-After、配额重置、真实 10 秒超时、坏 JSON/错误结构、空列表、空正文、冷却后恢复、
分页隔离。另用临时脚本验证 Cache API 缺失/损坏/失败及换行解析。

浏览器通过模拟序列化 RPC 响应，操作真实照片路由和组件，验证了禁用按钮、倒计时、重试后
恢复、旧照片仍然显示以及手机端超时提示。浏览器倒计时使用缩短的模拟响应，生产默认仍为
60 秒。真实 GitHub 数据也已在 Workers 生产预览中验证。
这些故障是受控注入，并非声称 GitHub 当时实际发生了故障。

### 演示兼容性修复

1. **旧 Framer Motion 沙盒**：Sandpack 当前 React 模板默认使用 React 19，而教程明确
   使用 Framer Motion 6.2.4。实际对照发现通知退出后节点残留、动画生命周期异常。
   将这组教程的沙盒统一固定到 React / ReactDOM 17.0.2 和 legacy render 入口后，
   通知会正确退出并从 DOM 移除。配置集中在 `sandpack-runtime.ts`，博客本身仍为 React 19，
   其他沙盒不受影响。
2. **StackBlitz 降级**：真实项目编辑器能打开，但内嵌运行显示
   `Unable to run Embedded Project`，原因是博客没有跨源隔离响应头。
   不为单个演示贸然更改全站 COOP/COEP 策略；在非隔离环境显示明确说明和安全的外部打开链接，
   保留项目及 `openFile` 参数。实际验证外部编辑页可打开且其 `crossOriginIsolated` 为 true。
   这不等于已验证所有浏览器上的远端项目执行结果。
   若以后显式配置跨源隔离，组件仍可尝试 SDK 嵌入，并提供加载失败提示；SDK 替换的 DOM
   被限制在独立容器内，卸载时清理。该隔离分支需随部署策略另外验收。

### 生产预览中的交互回归

- 12 个 Motion Sandpack 预览全部实际渲染（guide 5 个、advanced 4 个、layout 3 个）。
- 静态 Sandpack 编辑 HTML 后预览更新，挂载期间切换主题正常。
- Spring 滑块、easing 选择、AnimatePresence 卡片切换、布局位置和动画开关可操作。
- 通知沙盒删除、任务勾选/删除/添加、原生 Motion 拖拽重排序通过。
- StackBlitz 降级入口、外部编辑页打开、客户端离开再返回通过；无重复 iframe。
- 再次检查 24 篇文章、主要页面、照片页以及跨语言/时区的移动端页面，没有 pageerror。
- 构建、类型检查、Lint、Wrangler dry-run 再次通过。临时验收使用 4174 端口，避免占用
  其他项目正在使用的 4173；复现时请使用空闲端口并保持浏览器/curl 地址一致。

以上是明确列出的手动回归范围，不代表穷尽所有演示控件组合、浏览器或第三方服务故障。
没有添加测试套件、提交、推送或执行生产部署。

## 第四轮：统一升级依赖

维护者进一步授权直接升级到 npm 最新稳定版并处理大版本兼容问题。
已升级 pnpm 12、VitePlus 1.1、Motion 14、Ultracite 8、React 19.3 及其他直接依赖；
第三轮的 React 17 / Motion 6 沙盒兼容方案已移除，运行示例现在跟随项目版本。
上文第三轮内容保留为历史排查记录，不代表当前依赖配置。

详细版本、32 个经批准的确切版本冷静期例外、兼容修复、Husky 暂存边界验证，
以及开发工具链中尚无上游修复的 braces 告警，见 [依赖升级记录](dependency-upgrade.md)。

## 第五轮：开发工具链递归深度防护

上游仍未发布 braces 修复版，本项目对确切的 `braces@3.0.3` 应用版本绑定的本地补丁，
同时保护 parser 和递归 AST 行走，限制异常嵌套。正常模式进行了 8,580 组前后对照，
并检查了实际 micromatch / fast-glob 消费链。没有改包版本或忽略审计告警。

这是有边界的本地缓解，不代替官方修复和可信输入策略；完整版本审计仍保留对应 high。
具体实现、可重复检查与未来移除方式见 [braces 本地缓解](braces-mitigation.md)。

## 后续任务（尚未完成）

- [ ] 如要求 StackBlitz 必须内嵌运行，单独决定跨源隔离部署策略，并回归其他跨源资源。
- [ ] 持久化自动化测试暂缓：维护者已选择继续手动验收，新增前需另行确认。
- [ ] 跟踪 braces 的 GHSA-vfj7-8cjw-p6xm 官方修复，验证后移除本地补丁；生产依赖审计已通过，但全量版本审计仍有告警。
- [ ] 远程 CI、Cloudflare 预览部署、真实性能和 SEO 抓取验收。
- [ ] 确认生产回滚目标和恢复流程后再切换流量。

## 发布与回滚约束

本次没有提交、推送、切换域名或部署生产。CI 不自动部署。

正式发布前需记录当前生产平台、部署 ID、域名路由和运行时配置；保留原部署。
优先发布独立预览地址完成验收，再执行经授权的生产发布。
工具链变更可通过恢复此次修改前的提交、锁文件和构建配置回退；生产故障应先切回
已保留的上一部署，而不是临时重新构建旧代码。如果同时更换部署平台，还需恢复原域名路由。
