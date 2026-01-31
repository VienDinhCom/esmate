# ESMate React Nitro

> ✨ **Modern MERN Stack Replacement**

**A modern full-stack template with React, Nitro Server Toolkit, oRPC type-safe APIs, Drizzle ORM, Better Auth, TanStack
Router, and beautiful UI powered by shadcn/ui.**

Everything you need to ship production-ready apps.

[![Get Started](https://img.shields.io/badge/Get%20Started-Blue?style=for-the-badge&logo=github)](https://github.com/VienDinhCom/esmate/tree/main/templates/react-nitro)

## 🚀 Everything You Need

A carefully curated stack of modern technologies that work perfectly together.

### 🎨 Frontend Excellence

Built with **Vite**, **React**, and **TanStack Router** for a blazing-fast, type-safe single page application
experience. Styled with **Tailwind CSS** and **shadcn/ui** for modern, accessible interfaces.

### 🔋 Backend Power

Powered by **Nitro** for universal deployment and **oRPC** for end-to-end type safety. Includes **Drizzle ORM** for
database management and **Better Auth** for a complete authentication solution.

### 🛠️ Developer Experience

Includes **ESMate**, a modern task runner and CLI that streamlines project management, automates formatting, and
enhances your development workflow.

## 🛠️ Getting Started

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

## 📦 Available Scripts

- `npm run dev`: Runs database migrations and starts the Nitro + Vite development environment.
- `npm run build`: Performs type checking and creates a production build.
- `npm run start`: Previews the production build locally.
- `npm run test`: Runs unit tests using Vitest.
- `npm run fix`: Automatically fixes code formatting and linting issues.
- `npm run check`: Checks the codebase for formatting and linting errors.

## 🌍 Deploy Anywhere

Nitro can generate different output formats suitable for different hosting providers from the same code base. Using
built-in presets, you can easily configure Nitro to adjust its output format with almost no additional code or
configuration!

### Zero-Config Providers

When deploying to production using CI/CD, Nitro tries to automatically detect the provider environment and set the right
one without any additional configuration required.

- Node.js, Bun, Deno
- AWS Amplify, Azure, Cloudflare
- Firebase App Hosting, Netlify, Vercel
- Stormkit, Zeabur, Deno Deploy

## 🎮 Demo Applications

Explore fully functional demo apps built with this template to see the stack in action.

### ☑️ Todo App

A complete CRUD application demonstrating oRPC mutations, optimistic updates, and real-time state management with
TanStack Query.

### 💬 Real-time Chat

A live chat room showcasing oRPC subscriptions (Server-Sent Events) for real-time updates, message persistence, and
multi-user communication.

## ☁️ Deployment

Nitro can be deployed to many different providers (Vercel, Netlify, Cloudflare Workers, etc.). Check out the
[Nitro deployment documentation](https://v3.nitro.build/deploy) for more information.
