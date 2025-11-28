import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AuthLayout(props: Props) {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">{props.children}</div>;
}
