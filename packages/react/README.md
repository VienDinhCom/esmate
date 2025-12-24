# @esmate/react

A collection of React components, hooks combining the power of Alibaba's ahooks library with custom ESMate utilities for
modern React development.

## Alibaba Hooks

Import hooks from the popular [ahooks](https://ahooks.js.org/hooks/) library through a convenient subpath:

```tsx
import { usePagination, useRequest } from "@esmate/react/ahooks";
```

📚 **Documentation**: [ahooks reference](https://ahooks.js.org/hooks/)

## ESMate Hooks

Custom hooks developed by [ESMate](https://github.com/viendinhcom/esmate) for common React patterns:

```tsx
import { useImmerState, useSearchParams } from "@esmate/react/hooks";
```

📚 **Documentation**: [View source](https://github.com/VienDinhCom/esmate/tree/main/packages/react/src/hooks)

### `useImmerState()`

A state management hook powered by [immer](https://github.com/immerjs/immer) that enables immutable state updates
through a mutable API. Write simpler, more intuitive state updates without manually spreading objects.

```tsx
import { useImmerState } from "@esmate/react/hooks";

interface State {
  name: string;
  age: number;
}

export function Counter() {
  const [state, setState] = useImmerState<State>({
    name: "John",
    age: 30,
  });

  return (
    <div>
      <p>
        Name: {state.name}, Age: {state.age}
      </p>
      <button
        onClick={() =>
          setState((draft) => {
            draft.age += 1;
          })
        }
        type="button"
      >
        Change Age
      </button>
    </div>
  );
}
```

### `useSearchParams()`

A sensor hook that reactively tracks URL search parameters, automatically updating when the browser's location changes.

```tsx
import { useSearchParams } from "@esmate/react/hooks";

export function Search() {
  const searchParams = useSearchParams();
  return <div>{searchParams.get("q")}</div>;
}
```

**Note:** This hook is incompatible with hash-based routing (such as react-router's `<HashRouter>`). Since search
parameters in hash routes are treated as part of the URL hash by browsers, they cannot be accessed through this hook.
