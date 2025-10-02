import { useEffect, useState } from "react";

import { isBrowser, off, on } from "./misc/util";

function getValueFromLocation(): URLSearchParams {
  if (isBrowser) {
    return new URLSearchParams(window.location.search);
  }

  return new URLSearchParams("?");
}

export function useSearchParam(): URLSearchParams {
  const [value, setValue] = useState<URLSearchParams>(() => getValueFromLocation());

  useEffect(() => {
    const onChange = (): void => {
      setValue(getValueFromLocation);
    };

    on(window, "popstate", onChange);
    on(window, "pushstate", onChange);
    on(window, "replacestate", onChange);

    return () => {
      off(window, "popstate", onChange);
      off(window, "pushstate", onChange);
      off(window, "replacestate", onChange);
    };
  }, []);

  return value;
}
