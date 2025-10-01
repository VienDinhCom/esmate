# @esmate/shadcn

Supercharge your UI development with Shadcn—components, hooks, and styles all in one package.

- 🔧 **Zero Config**: Works out of the box with Tailwind and pre-styled themes like `new-york.css`.
- 🧩 **Ready-to-Use UI**: Composable Shadcn components via `@esmate/shadcn/ui/*`, no boilerplate needed.
- ⚙️ **Built-in Hooks**: Includes smart hooks like `useIsMobile` and `useZodForm` for fast logic handling.
- 🛠 **Useful Utilities**: Handy functions like `cn` for class merging, all in one place.
- 🎨 **Customizable Styles**: Easy theming with design tokens, dark mode, and editable base styles.
- 📦 **Bundled Deps**: Re-exports `zod`, `react-hook-form`, and more—no extra installs needed.

## Installation

Install the package that includes `shadcn@3.x.x`:

```sh
npm install @esmate/shadcn tailwindcss
```

or

```sh
pnpm install @esmate/shadcn tailwindcss
```

Import a style in your `./src/global.css`:

```css
@import "tailwindcss";

@source "../node_modules/@esmate/shadcn";
@import "@esmate/shadcn/styles/new-york.css";
```

Start using components:

```tsx
import { Button } from "@esmate/shadcn/components/ui/button";

import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
```

## Usage

### UI Components

All Shadcn [UI components](https://ui.shadcn.com/docs/components/) are available via `@esmate/shadcn/ui/*` imports.

```typescript
import { Button } from "@esmate/shadcn/components/ui/button";

import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
```

### Utils

All Shadcn utils are available via `@esmate/shadcn/utils` imports.

```typescript
import { cn } from "@esmate/shadcn/utils";
```

### Hooks

All Shadcn hooks are available via `@esmate/shadcn/hooks/*` imports.

```typescript
import { useIsMobile } from "@esmate/shadcn/hooks/use-mobile";
```

`@esmate/shadcn/hooks/*` also includes custom hooks, such as React Hook Form integrated with Zod support, like this:

```typescript
import { z } from "@esmate/shadcn/zod";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignIn() {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    console.log({ email, password });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" {...form.register("email")} />
        <input type="password" {...form.register("password")} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
```

### Styles

All Shadcn default styles are available via `@esmate/shadcn/styles/*` imports.

```css
@import "@esmate/shadcn/styles/new-york.css";
```

If you want to create your own styles, the package includes a base style that's ready for customization.

```css
@import "@esmate/shadcn/styles/base.css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.645 0.246 16.439);
  --primary-foreground: oklch(0.969 0.015 12.422);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.645 0.246 16.439);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.141 0.005 285.823);
  --sidebar-primary: oklch(0.645 0.246 16.439);
  --sidebar-primary-foreground: oklch(0.969 0.015 12.422);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.645 0.246 16.439);
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.645 0.246 16.439);
  --primary-foreground: oklch(0.969 0.015 12.422);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.645 0.246 16.439);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.21 0.006 285.885);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.645 0.246 16.439);
  --sidebar-primary-foreground: oklch(0.969 0.015 12.422);
  --sidebar-accent: oklch(0.274 0.006 286.033);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.645 0.246 16.439);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

To create themes, check out [Shadcn Themes](https://ui.shadcn.com/themes) or [Tweakcn Themes](https://tweakcn.com/) for
easy theme generation.

### Exports

Shadcn includes many dependencies that can be tricky to manage in a project. That’s why I created this package: to
bundle them all in one place. I’ve re-exported everything for you, making the dependencies reusable and saving you from
having to install each dependency individually.

```typescript
import { useForm } from "@esmate/shadcn/pkgs/react-hook-form";
import { zodResolver } from "@esmate/shadcn/pkgs/hookform/resolvers";
import { z } from "@esmate/shadcn/pkgs/zod";

// You can check src/lib or dist/lib to find more modules
```
