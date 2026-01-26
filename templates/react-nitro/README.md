# ESMate React Nitro

ESMate React Nitro is a high-performance, full-stack SaaS template built with Nitro, Vite, and React. It provides a
modern developer experience with end-to-end type safety, powerful routing, and a complete authentication system.

This template is built with:

- **Backend**: [Nitro](https://v3.nitro.build/) – An extremely fast and lightweight web server engine for the backend.
- **Frontend**: [Vite](https://vite.dev/) + [React](https://react.dev/) – A lightning-fast frontend development
  experience.
- **Routing**: [TanStack Router](https://tanstack.com/router) – Type-safe, declarative routing for React.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework.
- **Authentication**: [Better Auth](https://www.better-auth.com/) – A complete open-source authentication solution.
- **API**: [oRPC](https://orpc.unnoq.com/) – End-to-end type-safe API framework.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) – A lightweight and performant TypeScript ORM.
- **Tooling**: [ESMate](https://github.com/viendinhcom/esmate) – A modern task runner and CLI for easier project
  management.

## Features

- ✅ Fast development with Nitro & Vite
- ✅ Type-safe routing with TanStack Router
- ✅ End-to-end type safety with oRPC
- ✅ Complete authentication flow with Better Auth
- ✅ Database integration with Drizzle ORM and SQLite
- ✅ Modern UI with Tailwind CSS
- ✅ Unit testing with Vitest
- ✅ Built-in task runner with ESMate

## Getting Started

### Installation

1.  **Create a new project:**

    ```bash
    npx create-esmate --template react-nitro
    ```

    Change into the new project directory:

    ```bash
    cd [new-project-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file by copying the `sample.env` file:

    ```bash
    cp sample.env .env
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will run migrations and start the development server. Open [http://localhost:3000](http://localhost:3000) (or
    the port shown in your terminal) to see the result.

## Available Scripts

- `npm run dev`: Runs database migrations and starts the Nitro + Vite development environment.
- `npm run build`: Performs type checking and creates a production build.
- `npm run start`: Previews the production build locally.
- `npm run test`: Runs unit tests using Vitest.
- `npm run fix`: Automatically fixes code formatting and linting issues.
- `npm run check`: Checks the codebase for formatting and linting errors.

## Deploying

Nitro can be deployed to many different providers (Vercel, Netlify, Cloudflare Workers, etc.). Check out the
[Nitro deployment documentation](https://v3.nitro.build/deploy) for more information.
