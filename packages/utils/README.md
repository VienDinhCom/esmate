# @esmate/utils

A comprehensive utility library that consolidates powerful tools for modern JavaScript/TypeScript development. This
package provides convenient access to es-toolkit, lodash-compatible functions, math operations, and string manipulation
utilities through a unified interface.

## Installation

```bash
npm install @esmate/utils
```

---

## ESToolkit Utilities

Access [es-toolkit](https://es-toolkit.dev/reference/array/at.html) functions through the main package export.

```ts
import { delay, invariant } from "@esmate/utils";
```

📚 **Documentation**: [es-toolkit reference](https://es-toolkit.dev/reference/array/at.html)

---

## Lodash Utilities

Access [lodash](https://lodash.com/docs) functions reimplemented using es-toolkit's compatibility mode for familiar,
drop-in replacements.

```ts
import { chunk, debounce } from "@esmate/utils/lodash";
```

📚 **Documentation**: [Lodash compatibility reference](https://es-toolkit.dev/compatibility.html)

---

## Math Utilities

Leverage the full power of [math.js](https://mathjs.org/docs/index.html) for mathematical operations and calculations.

```ts
import { round, sqrt } from "@esmate/utils/math";
```

📚 **Documentation**: [math.js reference](https://mathjs.org/docs/index.html)

---

## String Utilities

Access **string** utilities for common string operations.

```ts
import { fixTypos, titleize } from "@esmate/utils/string";
```

📚 **Documentation**: [View source](https://github.com/VienDinhCom/esmate/blob/main/packages/utils/src/string.ts)

### `titleize()`

Converts strings to proper title case using the [title](https://www.npmjs.com/package/title) package.

```ts
import { titleize } from "@esmate/utils/string";

const title = titleize("hello world"); // "Hello World"

const chicagoTitle = titleize("love of my life", { style: "chicago" }); // "Love of My Life"

const specialTitle = titleize("i love ESMate", { special: ["ESMate"] }); // "I Love ESMate"
```

### `fixTypos()`

Automatically corrects common typographical errors using [typopo](https://www.npmjs.com/package/typopo).

```ts
import { fixTypos } from "@esmate/utils/string";

const result = fixTypos("This  is a   text with typos..."); // "This is a text with typos…"
```

---
