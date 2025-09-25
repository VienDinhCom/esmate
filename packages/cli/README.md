# esmate

[esmate](https://github.com/viendinhcom/esmate) is a lightweight CLI tool designed to simplify common
JavaScript/TypeScript project tasks like formatting, linting, and running custom task sequences. If you are familiar
with Deno, you will be happy with esmate.

- 🧹 Lint with ESLint
- 🔧 Format code with Prettier
- 🛠️ Define and run custom tasks (series and parallel)
- ⚡ Fast and minimal configuration

## Installation

```bash
npm install -D esmate
```

## Usage

### Format Code

First, you need to install Prettier:

```bash
npm install -D prettier @esmate/prettier
```

Define your Prettier configuration in a `prettier.config.js` file:

```ts
// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/global.css",
  },
  ignores: [],
});
```

Check out [@esmate/prettier](https://www.npmjs.com/package/@esmate/prettier) to see all available options for Tailwind,
React, Vue, Astro, Svelte, and more.

Run Prettier to check your code:

```bash
esmate fmt --check
```

Automatically fix formatting issues:

```bash
esmate fmt
```

### Lint Code

First, you need to install ESLint:

```bash
npm install -D eslint @esmate/eslint
```

Define your ESLint configuration in a `eslintrc.config.js` file:

```ts
// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  react: true,
  ignores: [],
});
```

Check out [@esmate/eslint](https://www.npmjs.com/package/@esmate/eslint) to see all available options for React, Vue,
Astro, Svelte, and more.

Run ESLint to check for code issues:

```bash
esmate lint
```

Automatically fix linting issues:

```bash
esmate lint --fix
```

### Task Runner

Tasks are defined in your `package.json` under a `tasks` field.

#### Sequential Execution

Run tasks in order, one after another.

**Syntax 1: Single command string**

```json
{
  "tasks": {
    "build": "tsc && vite build"
  }
}
```

**Syntax 2: Array of commands**

```json
{
  "tasks": {
    "build": ["tsc", "vite build"]
  }
}
```

Run the task:

```bash
esmate task build
```

#### Parallel Execution

Run multiple tasks at the same time.

```json
{
  "tasks": {
    "dev": {
      "scripts": "tsc --watch",
      "styles": "sass --watch input.scss output.css"
    }
  }
}
```

Run the task:

```bash
esmate task dev
```
