# @esmate/react

## React Hooks

### useImmutableState

React state hook that uses [immer](https://github.com/immerjs/immer) to create a new state object.

```tsx
import { useImmutableState } from "@esmate/react/hooks/use-immutable-state";

interface Person {
  name: string;
  age: number;
}

export function Counter() {
  const [person, setPerson] = useImmutableState<Person>({
    name: "John",
    age: 30,
  });

  return (
    <button
      onClick={() =>
        setPerson((draft) => {
          draft.age += 1;
        })
      }
      type="button"
    >
      Change Age
    </button>
  );
}
```

### useSearchParams

React sensor hook that tracks browser's location search param.

```tsx
import { useSearchParams } from "@esmate/react/hooks/use-search-params";

export function Search() {
  const searchParams = useSearchParams();

  return <div>{searchParams.get("q")}</div>;
}
```

#### Caveats/Gotchas

When using a hash router, like `react-router`'s
[`<HashRouter>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md),
this hook won't be able to read the search parameters as they are considered part of the hash of the URL by browsers.
