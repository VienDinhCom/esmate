import type { Dispatch, SetStateAction } from "react";

import { produce } from "immer";
import { useState } from "react";

export function useImmutableState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);

  const updateState: Dispatch<SetStateAction<T>> = (action) => {
    if (typeof action === "function") {
      setState((prev) => produce(prev, action as (draft: T) => void | T));
    } else {
      setState(produce(action, (draft) => draft));
    }
  };

  return [state, updateState];
}

// import type { Dispatch, SetStateAction } from "react";

// import { useState } from "react";

// export function useImmutableState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
//   const [state, setState] = useState<T>(initialState);

//   const updateState: Dispatch<SetStateAction<T>> = (action) => {
//     if (typeof action === "function") {
//       setState((prev) => {
//         const draft = structuredClone(prev);

//         return (action as (prevState: T) => T)(draft);
//       });
//     } else {
//       const draft = structuredClone(action);

//       setState(draft);
//     }
//   };

//   return [state, updateState];
// }
