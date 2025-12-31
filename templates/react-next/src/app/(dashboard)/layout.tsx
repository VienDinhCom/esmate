import { authServer } from "@/lib/auth";
import { Header } from "./header";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const auth = await authServer.authenticate();

  return (
    <section className="flex min-h-screen flex-col">
      <Header user={auth.user} />
      {children}
    </section>
  );
}
