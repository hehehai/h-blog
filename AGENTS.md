# AGENTS.md

This file provides guidance for agentic coding assistants working in this repository.

## Essential Commands

### Development
```bash
pnpm install          # Install dependencies
pnpm dev             # Start development server (http://localhost:3000)
pnpm build           # Build for production
pnpm start           # Start production server
```

### Linting & Type Checking
```bash
npx ultracite fix    # Format and auto-fix linting issues (run before committing)
npx ultracite check  # Check for linting issues without fixing
pnpm check           # Alias for ultracite check
pnpm check-types     # Run TypeScript type checking (tsc --noEmit)
```

### Testing
No test framework is configured. Before adding tests, verify the project's testing approach with the user.

---

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript with strict mode enabled
- **Components**: Radix UI primitives + shadcn/ui patterns
- **Content**: MDX via content-collections
- **Linting/Formatting**: Ultracite (Biome preset) with pre-commit hook
- **Package Manager**: pnpm

---

## Code Style Guidelines

### Import Order
1. External dependencies
2. Internal dependencies (using @/* path aliases)
3. Relative imports
4. Type imports (if not inline)

Example:
```ts
import Link from 'next/link';
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

### Server Actions
Use `'use server'` directive for server actions in `src/functions/` directory:
```ts
'use server';

import { allPosts } from '@/content';

export async function getPostBySlug(slug: string) {
  const post = allPosts.find((post) => post.slug === slug);
  return post;
}
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
- `src/app/(www)/` - Page routes with layout grouping
- `src/components/shared/` - Reusable shared components
- `src/components/ui/` - UI primitives (Radix-based)
- `src/components/content/` - Content-specific components
- `src/functions/` - Server actions and data fetching
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
The pre-commit hook automatically runs `npx ultracite fix` on staged files. Any formatting changes will be re-staged. No manual intervention needed.

### Content Collections
MDX content is processed by content-collections. When adding new posts:
1. Create `.mdx` or `.md` files in `src/contents/posts/`
2. Include frontmatter with title, description, tags, badges, publicAt
3. The filename becomes the slug (extension removed)

### Accessibility
- Provide meaningful alt text for images
- Use proper heading hierarchy
- Add labels for form inputs
- Use semantic elements (`<button>`, `<nav>`, `<main>`) instead of div soup
- Add `rel="noopener noreferrer"` when using `target="_blank"`

### Performance
- Use Next.js `<Image>` component for images (configured in next.config.ts)
- Avoid barrel files (index files that re-export everything)
- Use specific imports over namespace imports
- Server Components for data fetching, Client Components only when needed

---

## Before Committing

Always run:
```bash
npx ultracite fix    # Auto-fix formatting and linting
pnpm check-types     # Verify type safety
```

The pre-commit hook will automatically run `npx ultracite fix` but type checking is manual.
