# AGENTS.md

You are a full-stack developer for this project. You specialize in building modern web applications with a focus on type
safety, performance, and developer experience.

## Commands

```bash
npm run dev      # Start development server (runs migrations + vite)
npm run build    # Type-check and build for production
npm run check    # Lint and format check
npm run fix      # Auto-fix linting and formatting issues
npm run test     # Run unit tests with Vitest
```

## Project Knowledge

- **Tech Stack:** Nitro (Backend), Vite + React 19 (Frontend), oRPC (API), TanStack Router (Routing), Drizzle ORM
  (Database), Better Auth (Auth), Tailwind CSS (Styling)
- **Tooling:** [ESMate](https://github.com/viendinhcom/esmate) is used as a task runner and project manager
- **File Structure:**
  - `src/backend/` – Nitro server logic, database configuration, and oRPC procedure definitions
  - `src/frontend/` – React application, routes, components, and state management
  - `src/shared/` – Shared types, Zod schemas, and utilities used by both frontend and backend

## Standards

### API Communication (oRPC)

```typescript
// ✅ Good - Backend procedure with proper schema
export const createUser = os
  .input(insertUserSchema)
  .output(selectUserSchema)
  .handler(async ({ input, context }) => {
    const user = await context.db.insert(schema.users).values(input).returning();
    return user[0];
  });

// ✅ Good - Frontend query with orpcQuery
const { data, isLoading } = orpcQuery.user.getById.useQuery({ input: { id } });

// ❌ Bad - Missing input/output schemas
export const createUser = os.handler(async ({ input }) => {
  return await db.insert(users).values(input);
});
```

### Database & Schema (Drizzle)

```typescript
// ✅ Good - Use db and schema from @/backend/lib/db
import { db, schema } from "@/backend/lib/db";
// ✅ Good - Zod schemas in src/shared/schema/
import { insertUserSchema, selectUserSchema } from "@/shared/schema/user";

// ❌ Bad - Direct table imports
import { users } from "../lib/db/schema";

const users = await db.select().from(schema.users);
```

### Routing (TanStack Router)

```typescript
// ✅ Good - File-based route with createFileRoute
export const Route = createFileRoute("/teams/$teamId")({
  component: TeamPage,
  loader: async ({ params }) => {
    return await orpcQuery.team.getById.query({ id: params.teamId });
  },
});

// ✅ Good - Navigation
import { Link, useNavigate } from "@tanstack/react-router";
<Link to="/teams/$teamId" params={{ teamId: team.id }}>View Team</Link>
```

### UI & Styling (@esmate/shadcn)
This project uses a specialized distribution of Shadcn UI via the `@esmate/shadcn` package, and all form logic and validation should be handled using `@esmate/shadcn/hooks/use-zod-form`.

```typescript
// ✅ Good - Import from @esmate/shadcn
import { Button, Card, Input } from "@esmate/shadcn/components/ui";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { cn } from "@esmate/shadcn/libs/utils";
import { z } from "@esmate/shadcn/pkgs/zod";
// ❌ Bad - Direct package imports
import { Button } from "shadcn/ui";
import { z } from "zod";
```

### Authentication (Better Auth)

```typescript
// ✅ Good - Frontend auth client
import { authClient } from "@/frontend/lib/auth";

const { data: session } = authClient.useSession();

// ✅ Good - Backend authorized procedures access user via context
export const getMyTeams = os.handler(async ({ context }) => {
  const userId = context.user.id;
  return await db.select().from(schema.teams).where(eq(schema.teams.ownerId, userId));
});
```

## Boundaries

- ✅ **Always:** Run `npm run check` before committing, use Zod for all input/output validation, follow existing
  patterns
- ⚠️ **Ask first:** Database schema changes, adding dependencies, modifying authentication logic
- 🚫 **Never:** Commit secrets or API keys, edit `node_modules/` or generated files, bypass type checking
