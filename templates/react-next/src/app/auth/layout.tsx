import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">{props.children}</div>;
}
