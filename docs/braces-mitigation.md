# braces 递归深度风险的本地缓解

## 状态与范围

2026-10-12 复查 npm 与 GitHub 公告时，`braces` latest 仍为 `3.0.3`，
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
尚无官方修复版本。关联 [上游 issue #70](https://github.com/micromatch/braces/issues/70)
仍然开放。

本项目通过 pnpm `patchedDependencies` 对 **确切的 `braces@3.0.3`** 应用本地补丁：

- 补丁文件：`patches/braces@3.0.3.patch`。
- 依赖路径：`ultracite → fast-glob / find-workspaces → micromatch → braces`。
- 属于开发检查工具链，不是博客处理 HTTP 请求时的解析器。
- 保留原包版本、许可证和其他依赖，不冒充已发布的官方修复版。
- 不设置 audit ignore，也不通过改版本号隐藏漏洞。

**这是有明确边界的本地缓解，不是上游官方修复，也不表示所有 glob 输入都安全。**
全量版本审计仍可能报告该 high；生产依赖审计应继续为零。

## 补丁行为

只修改原包的 5 个文件：`constants.js`、`parse.js`、`compile.js`、`expand.js`、`stringify.js`。

1. 增加固定的 `MAX_DEPTH = 100`，保留原有 `MAX_LENGTH = 10000`。
2. parser 使用实际容器栈，同时限制 `{}`、`()` 以及二者混合的嵌套，避免只数花括号留下绕过路径。
3. 超过 100 层时尽早抛出明确的 `SyntaxError`，而不是继续消耗递归栈。
4. compile / expand / stringify 的递归行走也有深度保护，防止调用者直接传入深层 AST 绕过 parser。
   使用内部递归计数，不信任 AST 自带的 `depth` 字段。
5. 不改变引号、转义和方括号内字面量的处理，也不增加可放宽保护的 `maxDepth` 选项。
   `maxLength` / `rangeLimit` 的现有语义保留。

兼容性取舍：超过 100 层的结构性嵌套现在会被拒绝，即使某个 Node/V8 环境原先能处理它。
这不是普通项目 glob 的必要能力。受控的非法输入错误仍需调用者正常处理；不承诺 CLI 对
任何无效输入都返回成功。补丁不负责全面校验任意畸形 AST，也不解决平坦组合展开造成的
输出量爆炸、所有 ReDoS 或其他独立问题。仍应只给开发工具传递可信的 glob 参数。

## 验证方法与已验证内容

未向项目添加测试框架；使用临时脚本、独立子进程和临时 Git fixture 手动验收。

- 原版与补丁版来自同一份 npm 3.0.3 源码，不修改共享 store 中的原版文件。
- 栈溢出阈值随 Node/V8/JIT 状态变化。为了可重复对照，恶意输入检查运行在
  Node 24.21.0 的独立子进程中，设置 **512 KiB 栈预算、128 MiB 堆上限和 5 秒超时**。
  没有修改机器或应用进程的栈设置。
- 原版 default / compile / expand 对低于 10,000 字符上限的深层模式复现
  `RangeError: Maximum call stack size exceeded`。
- 同样条件下，补丁版拒绝深层花括号、圆括号、混合、未闭合模式，返回明确的深度错误。
- parse / compile / expand / stringify / 默认入口验证了 100 层通过、101 层拒绝。
- 验证直接传入深层 AST 和 child 节点循环的 AST 不能绕过对应 walker 的深度保护。
- 验证提高 `maxLength`、传入很大的 `maxDepth` 或关闭 `rangeLimit` 不会关闭该保护。
- **8,580 组正常模式/选项/API 前后对照结果一致**，包含项目实际扩展名 glob、范围、嵌套、
  引号、转义、方括号字面量、空项及重复项；正常差分检查使用默认栈设置。
- 安装补丁后，重复上述验证；通过 Ultracite 的真实依赖解析链确认实际加载的是带 patch hash
  的 braces，而不是只验证临时编辑目录。
- 在真实 micromatch / fast-glob 消费链中验证深层输入被拒绝，正常 glob 仍能发现 148 个项目源文件。
- 从不含 node_modules / 生成产物的源码副本冻结安装，再次确认解析到带 patch hash 的包，
  并通过完整构建、类型检查和 Lint。
- 实际 Husky hook 在独立 Git fixture 中通过部分暂存检查：只格式化暂存内容，保留未暂存行和其他文件。
- 安装补丁后复查审计：生产依赖零告警；全量仍为 1 个 braces high，退出码仍为 1。

## 安装与人工复核

补丁与 lockfile 必须一起保留，不能只复制修改后的 node_modules。
`.gitattributes` 仅对补丁文件固定 LF，并允许 unified diff 空白上下文行必需的空格；
这不改变应用源文件的空白检查，也不是审计忽略规则。

```sh
vp install --frozen-lockfile
vp run check
vp run check-types
vp build
vp env exec pnpm why braces
```

可在项目根目录执行以下最小检查，确认实际消费链中的补丁仍生效：

```sh
vp env exec node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';

const fromUltracite = createRequire(realpathSync('node_modules/ultracite/package.json'));
const fromGlob = createRequire(fromUltracite.resolve('fast-glob'));
const fromMicromatch = createRequire(fromGlob.resolve('micromatch'));
const braces = fromMicromatch('braces');

assert.deepEqual(braces.expand('src/*.{ts,tsx}'), ['src/*.ts', 'src/*.tsx']);
assert.throws(
  () => braces.compile('{'.repeat(101) + 'a' + '}'.repeat(101)),
  { name: 'SyntaxError', message: /Nesting depth.*100/ }
);
console.log('Depth guard active:', fromMicromatch.resolve('braces'));
JS
```

随后检查审计结果，而不是忽略它：

```sh
vp env exec pnpm audit --prod
vp env exec pnpm audit
```

第二条命令预计仍可能因 `braces@3.0.3` 返回非零；版本扫描不能证明本地补丁是否充分，
也不能替代对补丁本身的审核和回归。

## 后续维护与移除

1. 跟踪官方修复版本或消费方移除该依赖；不要扩大此补丁的版本匹配范围。
2. 有官方修复后，先验证新版本能拒绝对应深层输入、正常模式结果及工具链行为，再移除
   `patchedDependencies` 条目与补丁文件，重新生成 lockfile 并执行冻结安装。
3. 若上游依赖结构变化导致补丁不再适用，应让安装明确失败并复核，不启用跳过失败补丁的选项。
4. 升级消费工具后重新检查实际解析路径；此补丁不修改其他工具内联打包的未知副本。
5. 修改依赖后重启已有检查/开发进程，避免继续使用内存中已加载的旧模块。

本轮未提交项目代码、推送、部署或对远程服务运行攻击输入。
