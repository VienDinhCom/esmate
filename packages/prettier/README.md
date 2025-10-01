# @esmate/prettier

Prettier configuration for humans with support for React, Vue, Svelte, Astro, Tailwind CSS, and more.

## Installation

```bash
npm install -D @esmate/prettier prettier
```

Check out [ESMate CLI](https://www.npmjs.com/package/esmate) for better integration with
[ESLint](https://github.com/VienDinhCom/esmate/tree/main/packages/eslint)

## Usage

Define your Prettier configuration in a `prettier.config.js` file:

```ts
// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  // astro: true,
  // svelte: true,

  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/global.css",
  },
  ignores: [],
});
```

Run Prettier to check your code:

```bash
prettier --check .
```

Automatically fix formatting issues:

```bash
prettier --write .
```
