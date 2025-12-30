import { authServer } from "@/lib/auth";
import { Header } from "./header";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { me } = await authServer.verifySession();

  return (
    <section className="flex min-h-screen flex-col">
      <Header user={me} />
      {children}
    </section>
  );
}
