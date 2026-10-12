# AGENTS.md

This file provides guidance for agentic coding assistants working in this repository.

## Essential Commands

### Development
```bash
vp install --frozen-lockfile # Install pinned dependencies
vp dev                      # Start development server (http://localhost:3000)
vp build                    # Build for production and generate content/route types
vp preview                  # Preview production in the local Workers runtime
# pnpm dev/build/preview remain aliases for these VitePlus commands.
```

### Linting & Type Checking
```bash
vp exec ultracite fix # Format and auto-fix linting issues (run before committing)
vp run check         # Run Ultracite/Biome (NOT the built-in vp check)
vp run check-types   # Run TypeScript type checking (tsc --noEmit)
# On a clean checkout, run vp build first to generate required types.
# Keep Ultracite/Biome and Husky; do not run vp fmt across the repository.
```

### Testing
No test framework is configured. The maintainer chose manual migration validation (temporary scripts and browser checks), not a new test suite. Before adding persistent tests, confirm the approach again.

---

## Tech Stack

- **Framework**: TanStack Start with TanStack Router
- **Build toolchain**: VitePlus (version and matching Vite core alias managed in pnpm-workspace.yaml)
- **Runtime**: Node.js pinned in .node-version; production runs on Cloudflare Workers
- **HTML rendering**: src/server.tsx is wired through both Vite Start and Wrangler. Wait for React allReady before reading the stream and keep progressiveChunkSize infinite so prerendered article bodies work without JS. Preserve abort/timeout cleanup and client-side MDX splitting; see docs/browser-regression.md
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript with strict mode enabled
- **Components**: Radix UI primitives + shadcn/ui patterns
- **Content**: MDX via content-collections
- **Linting/Formatting**: Ultracite (Biome preset) with pre-commit hook
- **Package Manager**: pnpm, pinned in package.json (currently v12)
- **Embedded demos**: React/Motion/Radix versions derive from package.json via src/lib/sandbox-dependencies.ts; do not restore the React 17 / Motion 6 workaround
- **Dependency security**: Keep the 24-hour release-age policy. Exceptions must be exact versions approved for the upgrade, never broad package-name or wildcard bypasses. See docs/dependency-upgrade.md and docs/braces-mitigation.md for the development-only advisory and version-bound local mitigation. Do not drop or bypass patchedDependencies merely to make an upgrade install; verify an upstream fix before removing the patch

---

## Code Style Guidelines

### Import Order
1. External dependencies
2. Internal dependencies (using @/* path aliases)
3. Relative imports
4. Type imports (if not inline)

Example:
```ts
import { Link } from '@tanstack/react-router';
import { allPosts } from '@/content';
import Footer from '@/components/shared/layout/footer';
import type { ReactNode } from 'react';
```

### Path Aliases
- `@/*` → `./src/*`
- `@/content` → `./.content-collections/generated` (generated MDX content)
- `@/tailwind.config` → `./tailwind.config.ts`

### Components
- Use function components with `export default function` for page components
- Use `export function` for reusable components
- Use `React.forwardRef` with explicit `displayName` when refs are needed
- Use `cva` (class-variance-authority) for variant-based component styling
- Don't define components inside other components
- Server components should be async and fetch data directly

Example (with variants):
```ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    // ...
  }
);
Button.displayName = 'Button';
```

### Server Functions
Use TanStack Start's `createServerFn` for server-only data access in `src/functions/`:
```ts
import { createServerFn } from '@tanstack/react-start';
import { allPosts } from '@/content';

export const getPostBySlug = createServerFn({ method: 'GET' })
  .validator((data: { slug: string }) => data)
  .handler(({ data }) => allPosts.find((post) => post.slug === data.slug));
```

### Types
- Use explicit types for function parameters and return values
- Use `type` for object shapes, `interface` for component props when extending HTML attributes
- Use `unknown` over `any`
- Extract types using `Awaited<ReturnType<T>>` when deriving from async functions

### Styling
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes
- Follow the component pattern: `className={cn('base-classes', className)}`
- Use semantic HTML elements with proper ARIA attributes
- Dark mode support via `dark:` prefix

### Error Handling
- Use try-catch blocks in async functions
- Throw `Error` objects with descriptive messages
- Use early returns to reduce nesting
- Remove console.log/debugger before committing

### File Organization
- `src/routes/` - File-based routes, layouts, and server endpoints
- `src/components/shared/` - Reusable shared components
- `src/components/ui/` - UI primitives (Radix-based)
- `src/components/content/` - Content-specific components
- `src/functions/` - Server functions and data fetching
- `src/lib/` - Utilities and configurations
- `src/contents/` - MDX content files
- `contents/posts/` - Blog post MDX files

### Naming Conventions
- Components: PascalCase (`PostItem.tsx`, `Footer.tsx`)
- Functions: camelCase (`getPostBySlug`, `queryPosts`)
- Constants: UPPER_SNAKE_CASE for truly global constants
- Types/Interfaces: PascalCase (`QueryPostItem`, `ButtonProps`)
- Files: kebab-case for components (`post-item.tsx`), camelCase for utilities (`utils.ts`)

### Pre-Commit Hook
Husky runs `vp staged`, which applies `vp exec ultracite fix` only to staged Biome-supported files. VitePlus manages backup/restoration for partially staged files; do not reintroduce manual stash/pop or blanket git add logic. Staged checks require Git >= 2.32 and the Node versions declared in package.json.

### Content Collections
MDX content is processed by content-collections. When adding new posts:
1. Create `.mdx` or `.md` files in `src/contents/posts/` (subdirectories are supported)
2. Include frontmatter with title, description, tags, badges, publicAt; publicAt must be a valid YYYY-MM-DD date
3. The filename becomes the slug (extension removed): 1–200 ASCII letters, digits, hyphens or underscores. Slugs must be unique across subdirectories and extensions
4. Build-time scanning explicitly prerenders every article; do not restore link crawling as the sole discovery mechanism
5. Last-modified dates use full Git history, or the publication date when history is absent/shallow. Keep Node-only content utilities in scripts/, never in application runtime imports

### Accessibility
- Provide meaningful alt text for images
- Use proper heading hierarchy
- Add labels for form inputs
- Use semantic elements (`<button>`, `<nav>`, `<main>`) instead of div soup
- Add `rel="noopener noreferrer"` when using `target="_blank"`

### Performance
- Use `@unpic/react` or an equivalent image component for application images
- Avoid barrel files (index files that re-export everything)
- Use specific imports over namespace imports
- Server Components for data fetching, Client Components only when needed

---

## Before Committing

Always run:
```bash
vp exec ultracite fix # Auto-fix formatting and linting
vp run check-types   # Verify type safety
```

The pre-commit hook runs `vp staged` but type checking is manual.
