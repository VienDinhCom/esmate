# @esmate/react

## React Hooks

### useSearchParam

React sensor hook that tracks browser's location search param.

```tsx
import { useSearchParam } from "@esmate/react/hooks/use-search-param";

export function Search() {
  const searchParams = useSearchParam();

  return <div>{searchParams.get("q")}</div>;
}
```

#### Caveats/Gotchas

When using a hash router, like `react-router`'s
[`<HashRouter>`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md),
this hook won't be able to read the search parameters as they are considered part of the hash of the URL by browsers.
