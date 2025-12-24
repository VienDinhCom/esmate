import type { StateCreator, StoreMutators, UseBoundStore } from "zustand";
import type { StoreApi } from "zustand/vanilla";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ImmerStateCreator<T> = StateCreator<T, [["zustand/immer", never]], []>;
type ImmerStore<T> = UseBoundStore<StoreMutators<StoreApi<T>, never>["zustand/immer"]>;

/**
 * Creates a Zustand store with Immer middleware enabled.
 *
 * @param initializer - Function to initialize the store state and actions.
 * @returns A hook-based Zustand store.
 */

export function createImmerStore<T>(initializer: ImmerStateCreator<T>): ImmerStore<T> {
  return create<T>()(immer(initializer));
}
