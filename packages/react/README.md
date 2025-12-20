# @esmate/react

## React Hooks

### useImmutableState

React state hook that uses [immer](https://github.com/immerjs/immer) to create the next immutable state by mutating the
current one.

```tsx
import { useImmutableState } from "@esmate/react";

interface State {
  name: string;
  age: number;
}

export function Counter() {
  const [state, setState] = useImmutableState<State>({
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

### useSearchParams

React sensor hook that tracks browser's location search param.

```tsx
import { useSearchParams } from "@esmate/react";

export function Search() {
  const searchParams = useSearchParams();

  return <div>{searchParams.get("q")}</div>;
}
```

#### Caveats/Gotchas

When using a hash router, like `react-router`'s
[`<HashRouter>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md),
this hook won't be able to read the search parameters as they are considered part of the hash of the URL by browsers.
