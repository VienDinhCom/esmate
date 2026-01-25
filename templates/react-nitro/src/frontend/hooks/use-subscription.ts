import { useEffect, useState } from "react";

interface Options<T> {
  fn: (signal: AbortSignal) => Promise<AsyncIterable<T>>;
  onData: (data: T) => void;
  deps?: React.DependencyList;
}

export function useSubscription<T>(options: Options<T>) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError(null);
        const iterator = await options.fn(controller.signal);
        for await (const item of iterator) {
          options.onData(item);
        }
      } catch (err) {
        setError(err as Error);
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options.deps);

  return { error };
}
