import { ReactNode } from "react";
import { AuthLayout } from "@frontend/components/layouts/auth-layout";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <AuthLayout>{props.children}</AuthLayout>;
}
