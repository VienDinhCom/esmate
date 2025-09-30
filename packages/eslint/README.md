# @esmate/eslint

ESLint configuration for humans with support for React, Vue, Svelte, Astro, Tailwind CSS, and more.

## Installation

```bash
npm install -D @esmate/eslint eslint
```

If you are using [ESMate CLI](https://www.npmjs.com/package/esmate), it's built-in, so only need to install `eslint`.

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
