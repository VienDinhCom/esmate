# @esmate/eslint

ESLint configuration for humans with support for React, Vue, Svelte, Astro, Tailwind CSS, and more.

## Installation

```bash
npm install -D @esmate/eslint eslint
```

Check out [ESMate CLI](https://www.npmjs.com/package/esmate) for better integration with
[Prettier](https://github.com/VienDinhCom/esmate/tree/main/packages/prettier)

## Usage

Define your ESLint configuration in a `eslint.config.js` file:

```ts
// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  react: true,
  // vue: true,
  // astro: true,
  // tanstack: {
  //   query: true,
  //   router: true,
  // },
  ignores: [],
});
```

[@esmate/eslint](https://www.npmjs.com/package/@esmate/eslint) is a wrapper around **@antfu/eslint-config** with
customizations to ensure compatibility with [@esmate/prettier](https://www.npmjs.com/package/@esmate/prettier) by
default.

Check out [@antfu/eslint-config](https://www.npmjs.com/package/@antfu/eslint-config) to see all available options for
React, Vue, Astro, Svelte, and more.

Run ESLint to check your code:

```bash
eslint .
```

Automatically fix formatting issues:

```bash
eslint --write .
```
