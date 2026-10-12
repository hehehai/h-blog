<div align="center">

<h1>Hehehai Blog</h1>
🤗 我的博客 - hehehai blog
<br/>

![image](https://github.com/hehehai/h-blog/assets/12692552/300edd03-1463-45f8-81da-792d151f1554)
![image](https://github.com/hehehai/h-blog/assets/12692552/158da803-d1aa-43f2-a970-34c55aa3a2f6)

</div>

## ⌨️ 安装&运行

博客使用 TanStack Start、TanStack Router 和 VitePlus，部署到 Cloudflare Workers。

先按 [VitePlus 官方指南](https://viteplus.dev/guide/) 安装 `vp`。项目通过
`.node-version` 固定 Node.js，通过 `packageManager` 固定 pnpm，通过
`pnpm-workspace.yaml` 固定 VitePlus 及其 Vite core 版本。

```shell
vp install --frozen-lockfile
vp dev
```

打开 `http://localhost:3000`。已有的 `pnpm dev`、`pnpm build`、`pnpm preview`
命令仍然可用，底层统一调用 VitePlus。

生产构建和质量检查：

```shell
# 首次检出先构建，以生成 content-collections 类型和路由树。
vp build
vp run check-types
vp run check
```

保留 Ultracite/Biome 和 Husky；`vp run check` 执行项目的质量检查脚本，
**不是** VitePlus 内置的 `vp check`。暂不使用 `vp fmt` 重排全仓库格式。
提交钩子使用 `vp staged` 处理已暂存的受支持文件，保留未暂存改动；需要 Git 2.32+。
仓库尚未配置测试套件，构建成功不代表浏览器交互回归已完成。

Cloudflare Workers 本地生产预览与部署：

```shell
vp preview
# 验收预览后手动执行；需要 Cloudflare 部署权限。
vp run deploy
```

环境变量文件 `.env` 是可选的。CI 只检查和构建，不自动部署。
`src/server.tsx` 同时由 Vite Start 和 Wrangler 使用；等待完整 HTML 后输出，避免预渲染文章
依赖流式脚本才能显示。保留客户端文章分包，HTML 渲染取消及 30 秒上限仍生效。

## 内容约定

- 在 `src/contents/posts/` 添加 `.md` 或 `.mdx`，可用子目录归类。
- 文件名（不含扩展名）就是 slug，使用 1–200 个英文字母、数字、`-` 或 `_`。
  子目录不进入 URL，同名文章会导致构建失败。
- `publicAt` 使用有效的 `YYYY-MM-DD`，统一按 UTC 处理。
- 构建直接扫描文章清单预渲染，不依赖链接爬取。文章源码按需加载，正文保留 SSR。
- `lastModified` 优先使用完整 Git 历史；源码归档、浅克隆或未提交的新文章使用
  发布日期兜底。需要准确修改日期时请完整检出 Git 历史。
- 开发态内容生成后会刷新页面，保证标题、文章列表和 SEO 同步更新；临时交互状态
  可能重置。

## 动态数据与演示

- 照片使用 Workers Cache API：正常数据缓存 5 分钟；上游失败时最多使用 24 小时内的旧数据。
  失败默认等待 60 秒再试，并遵守 GitHub 的 Retry-After / 配额重置时间；页面会显示状态和重试入口。
  缓存是数据中心本地的最佳努力保护，不是全局限流器；无需新增存储绑定。
- React / Motion / Radix 沙盒通过 `src/lib/sandbox-dependencies.ts` 跟随项目清单中的版本，
  使用 React 19 的 `createRoot`，不再保留 React 17 / Motion 6 兼容环境。
  沙盒中的 Tailwind 浏览器运行时也与项目 Tailwind 版本同步。
- 当前站点不启用跨源隔离。需要隔离的 StackBlitz 项目提供外部打开入口，保留初始文件选择；
  不为了单个示例改变全站响应头。

## 依赖更新

```shell
vp update --latest
vp install --frozen-lockfile
vp build
vp run check-types
vp run check
```

VitePlus 与 Vite core 的 catalog 必须成对更新，不要将 core 别名替换成独立 Vite。
pnpm 保留 24 小时新包冷静期；本次仅经确认放行了确切的 Radix / Zod 版本，未全局关闭保护。
包管理器与 Node.js 的版本 pin 需要单独审阅，沙盒专用的 Stitches 版本也需在集中配置中检查。
`braces@3.0.3` 使用版本绑定的本地深度防护补丁；升级时不要跳过补丁失败，先确认上游修复。
补丁不是官方修复，版本审计仍可能告警，详见 [本地缓解说明](docs/braces-mitigation.md)。

升级版本、兼容修复及剩余审计告警见 [依赖升级记录](docs/dependency-upgrade.md)。
迁移范围、验证记录及后续工作见 [迁移记录](docs/migration-to-viteplus.md)。
最终交付范围、发布关卡和回滚原则见 [交付清单](docs/release-handoff.md)。
逐页浏览器验收及本轮修复见 [浏览器回归记录](docs/browser-regression.md)。
