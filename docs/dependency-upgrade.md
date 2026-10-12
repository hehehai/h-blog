# 依赖统一升级记录

## 范围

2026-10-12 核对 npm `latest` 稳定标签并更新所有直接依赖，不受原有大版本范围限制。
升级前的三轮 Start / VitePlus 迁移改动完整保留；未提交、推送或部署。
维护者继续选择临时脚本和浏览器手动验收，不新增测试套件。

共核对 63 个直接依赖声明：其中 34 项版本提升，另同步更新 VitePlus / core 两个 catalog
版本及包管理器。其余声明已是查询时的最新稳定版。这里的“最新”是本次 registry 快照，
不代表未来自动接受任何大版本。

## 主要版本变化

| 依赖 | 升级前 | 升级后 |
| --- | --- | --- |
| pnpm | 10.14.0 | 12.11.2 |
| VitePlus / core | 1.0.0 | 1.1.0 |
| Motion（应用） | 13.1.0 | 14.1.0 |
| Ultracite | 7.10.5 | 8.0.0 |
| actions/checkout | v4 | v7.0.1（提交 SHA 固定） |
| React / ReactDOM | 19.2.8 | 19.3.0 |
| TanStack Start | 1.168.48 | 1.168.61 |
| TanStack Router | 1.170.31 | 1.170.42 |
| Cloudflare Vite 插件 | 1.53.0 | 1.63.1 |
| Wrangler | 4.124.0 | 4.149.0 |
| Biome | 2.5.9 | 2.5.15 |
| React Vite 插件 | 6.0.5 | 6.1.2 |
| content-collections core / vite | 0.15.2 / 0.3.0 | 0.15.3 / 0.3.1 |
| lucide-react | 1.33.0 | 1.55.0 |
| tailwind-merge | 3.6.0 | 3.7.0 |
| Zod | 4.4.3 | 4.6.6 |
| Radix Slot / Select / Slider | 1.3.3 / 2.3.7 / 1.4.7 | 1.5.0 / 2.4.0 / 1.6.0 |
| Radix Dialog / Popover / Tooltip | 1.1.23 / 1.1.23 / 1.2.16 | 1.3.0 / 1.3.0 / 1.4.0 |
| Motion 沙盒的 Framer Motion | 6.2.4 | 14.1.0 |
| Motion 沙盒的 React / ReactDOM | 17.0.2 | 19.3.0 |
| 沙盒 Stitches | 1.2.5 / ^1.2.7 | 1.2.8 |
| Radix 沙盒的 lucide-react | ^0.487.0 | 1.55.0 |

其余 Radix primitives、React 类型、Node 类型和 react-intersection-observer 也已更新到
查询时的 latest。Tailwind 4.3.3、TypeScript 7.0.2、Sandpack 2.20.0、StackBlitz SDK 1.11.1、
Embla 8.6.0 等当时已是最新，因此没有人为改版本号或引入预发布版本。

VitePlus 1.1.0 的官方 bundle 使用 Vite 8.3.3、Vitest 5.0.3 等固定组合。
没有为了单独追赶上游 Vite 8.3.4 而破坏 core 别名，也没有无差别覆盖所有传递依赖的大版本。
Node 继续使用 `.node-version` 中的 24.21.0，Workers compatibility date 保持不变；
升级构建工具不等于必须同步切换运行时兼容语义。没有改机器上其他项目使用的全局 CLI。
CI 的 checkout 同步升级到 latest v7.0.1 并固定提交 SHA，保留完整历史、关闭凭据持久化；
使用 Node 24 action runtime，要求 Actions Runner >= 2.327.1。setup-vp v1.21.2 已是 latest。
远程 GitHub Actions 尚未运行，配置检查和本地等价命令通过不等于远程 CI 已通过。

## 兼容性处理

### pnpm 12

- 使用新的 `allowBuilds` 明确允许 esbuild / workerd 的必要安装脚本，拒绝 es5-ext 脚本。
- 保留 `minimumReleaseAge: 1440`。维护者明确选择按版本放行当天的新包，因此只加入
  32 个精确 Radix / Zod 版本（包括 Radix 对齐的内部依赖），不使用通配符或全局关闭。
  这些版本分别发布于 2026-10-11 / 12；到 2026-10-13 冷静期结束后可再次验证安装并清理例外。
- 没有自动批准依赖包附带的 agent skills，原有项目指令保持独立。
- pnpm 12 的 store / 环境变量策略与旧版本不同，临时验收使用独立 store，未修改全局配置。
- Husky 保留，但钩子改用 VitePlus 的 `vp staged` 调用 Ultracite，只处理已暂存的受支持文件。
  移除对 npx 和手写 stash/pop/重新暂存流程的依赖，防止混入未暂存内容。
  在隔离 Git fixture 中调用实际 hook，已验证格式化暂存内容、保留部分暂存文件中的未暂存行、
  不修改其他未暂存文件，以及正确清理备份；未修改项目暂存区或提交项目代码。
  相应提高 Node 22 的最低版本到 22.22.1，Node 24 pin 不变；Git 至少需要 2.32。

### 应用代码

- 新 TanStack Router 将错误对象类型收紧为 `unknown`。错误页先归一化，再读取 name/message，
  非 Error 值显示可理解的兜底提示。
- Motion 改用 `useMotionValueEvent` 管理订阅，替代渲染过程中调用 `onChange` 导致的重复订阅；
  同时清理动画定时器。
- 修复透视演示将 `show` 布尔值透传到 DOM 的问题，改为合法的 Motion variants 和 animate 状态。
- Ultracite 8 继续使用现有 Biome preset，没有同时引入第二套格式化规则或重写 agent 配置。

### 嵌入演示

- 删除第三轮的 React 17 / Motion 6 兼容配置，统一使用现代 `createRoot` + StrictMode。
- `src/lib/sandbox-dependencies.ts` 从 package.json 派生 React、Motion、Radix、图标和
  tailwind-merge 的版本，移除各个示例中分散的旧版本声明。
- 去掉 caret/tilde 后将具体版本交给 Sandpack，避免 iframe 每次加载时独立漂移到更新版本。
  Stitches 仅用于沙盒，集中固定为其 latest 1.2.8；它没有新的稳定大版本可升。
- 沙盒 Tailwind 从旧 `@tailwindcss/ui` CSS 改为与项目一致的 Tailwind 4 浏览器运行时。
  使用明确的 `.js` 入口，兼容 Sandpack 静态模板按扩展名识别资源的行为。
- 文章原文和历史代码讲解不批量改写；更新的是实际运行的示例。

## 安全审计

1. **已修复 GHSA-rj75-hqrm-r3gf**：最新 typography 仍固定旧的 postcss-selector-parser 6。
   对该依赖边设置定向 override 到 7.1.6，避免全局改变其他包的解析器，构建验证其兼容性。
   上游 typography 更新后应复查并移除此 override。
2. **仍有 1 个 high 告警：GHSA-vfj7-8cjw-p6xm**。路径为
   `ultracite → fast-glob / find-workspaces → micromatch → braces@3.0.3`。
   它是深层嵌套 glob 导致堆栈耗尽的 DoS，当前仅属于开发检查工具链；应用不把用户输入交给它。
   公告标明修复版本尚未发布，不能通过升级到不存在的版本解决。
   后续收尾已为确切的 3.0.3 加入本地递归深度防护补丁，并验证实际消费链及正常模式兼容性；
   细节、边界与移除条件见 [braces 本地缓解](braces-mitigation.md)。
   没有隐藏/忽略告警，也没有冒充官方修复版。仍只应使用可信 glob，并跟踪上游修复。

生产依赖审计为 **0 告警**；即使已应用本地缓解，完整版本审计仍会因上述 high 返回非零，
不能宣称全量审计通过。
VitePlus 的 yuku 原生绑定及 Sandpack 间接引入的 intersection-observer 仍有上游弃用提示，
它们不是本次直接依赖版本遗漏，也不等同于已发现的运行时漏洞。

## 验证与后续更新

使用以下顺序，首次检出先生成内容和路由类型：

```sh
vp install --frozen-lockfile
vp build
vp run check-types
vp run check
vp env exec pnpm peers check
vp env exec pnpm audit --prod
vp preview --host 127.0.0.1 --port 4393 --strictPort
vp exec wrangler deploy --dry-run
```

当前已验证：

- 从不带 node_modules / 生成产物的源码副本冻结安装、完整构建、类型检查。
- 生产预览中 24 篇文章、主要页面、跨语言/时区的手机页面及照片状态 UI 回归。
- 18 个 Motion / Radix 沙盒实际渲染，以及编辑预览、主题切换、通知退出、重排序等代表性交互。
- 剪贴板动画的 MotionValue 更新和透视 variants 切换；无 `show` 布尔属性泄漏到 DOM。
- 照片服务在新 workerd 中的缓存、限流冷却、超时、坏 JSON 与恢复逻辑。
- 错误页对 Error、null、数字、字符串、普通对象的 SSR 渲染与消息转义。
- 参数校验、文章清单、完整/缺失/浅克隆 Git 历史及新文章日期兜底。
- peer dependency 检查无问题；生产依赖审计无告警；完整审计保留上述未修复 high。
- Husky 实际钩子的暂存与未暂存边界（使用独立临时 Git 仓库）。
- `git diff --check`、类型/Lint 检查以及 Wrangler 部署 dry-run；没有实际部署。

测试使用实际浏览器 / workerd 和临时脚本，故障注入与真实外部服务访问分别记录。
本地预览/开发服务采用不同 HTTP 端口且串行启动，避免 Cloudflare 默认 inspector 自动选端口时
发生竞争；未修改其他项目的进程或全局调试配置。

后续升级运行 `vp update --latest`，审查 VitePlus / core 配对、发布冷静期及 peer 警告，
然后重新跑构建、类型检查和浏览器验收。不要仅依据安装成功或版本号判断兼容。
