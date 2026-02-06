import { TanStackDevtools as DevTools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export function TanStackDevTools() {
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <DevTools
      config={{
        position: "bottom-left",
      }}
      plugins={[
        {
          name: "Tanstack Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
        {
          name: "Tanstack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
      ]}
    />
  );
}
