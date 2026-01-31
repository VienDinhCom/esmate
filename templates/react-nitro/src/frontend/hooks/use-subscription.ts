import { useCallback, useEffect, useRef, useState } from "react";

export interface Options<TOutput, TError = Error> {
  subscribe: (signal: AbortSignal) => Promise<AsyncIterable<TOutput>>;
  onStarted?: () => void;
  onData?: (data: TOutput) => void;
  onError?: (error: TError) => void;
  onComplete?: () => void;
  enabled?: boolean;
}

export interface Result<TOutput, TError = Error> {
  status: "idle" | "connecting" | "pending" | "error";
  data: TOutput | undefined;
  error: TError | null;
  reset: () => void;
}

export function useSubscription<TOutput, TError = Error>(options: Options<TOutput, TError>): Result<TOutput, TError> {
  const { subscribe, ...restOptions } = options;
  const enabled = restOptions.enabled ?? true;

  const [status, setStatus] = useState<Result<TOutput, TError>["status"]>("idle");
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<TError | null>(null);

  const optionsRef = useRef(restOptions);
  optionsRef.current = restOptions;

  const subscribeRef = useRef(subscribe);
  subscribeRef.current = subscribe;

  const reset = useCallback(() => {
    setStatus("idle");
    setData(undefined);
    setError(null);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const controller = new AbortController();

    const execute = async () => {
      setStatus("connecting");
      optionsRef.current.onStarted?.();

      try {
        const iterator = await subscribeRef.current(controller.signal);

        if (controller.signal.aborted) {
          return;
        }

        setStatus("pending");

        for await (const item of iterator) {
          if (controller.signal.aborted) {
            break;
          }
          setData(item);
          optionsRef.current.onData?.(item);
        }

        if (!controller.signal.aborted) {
          optionsRef.current.onComplete?.();
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        const error = err as TError;
        setError(error);
        setStatus("error");
        optionsRef.current.onError?.(error);
      }
    };

    execute();

    return () => {
      controller.abort();
    };
  }, [enabled]);

  return { status, data, error, reset };
}
